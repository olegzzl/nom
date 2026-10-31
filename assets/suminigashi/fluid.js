/* InkFluid — двумерная несжимаемая жидкость на видеокарте.
   Поля в float-текстурах, каждый проход — рисование квада в очередной буфер.
   Математика и все числа: Stable Fluids (Stam, 1999) плюс vorticity confinement
   (Fedkiw, 2001). Значения подобраны так, чтобы совпадать с эталоном один в один. */
(function (global) {
  'use strict';

  var SH = global.InkShaders;

  /* ---------- числа ---------- */

  var SIM_RES = 256;          // сетка скорости и давления
  var DYE_RES = 1280;         // сетка красителя
  var PRESSURE_ITER = 28;     // итераций Якоби
  var VEL_DISSIPATION = 0.16;
  var SPLAT_RADIUS = 0.0026;

  var DROP_RADIUS = 0.045;    // радиус капли
  var RING_INTERVAL = 280;    // мс между ударами капли
  var RING_STRENGTH = 0.4;    // плотность чётных колец
  var RING_ALT = [1, 1, 1];   // нечётные кольца — нейтральные

  var COMB_TEETH = 9;         // зубьев у гребня
  var COMB_SPACING = 0.05;    // расстояние между ними

  /* Нормы, при которых поведение совпадает с эталоном один в один.
     Все толчки воды масштабируются отношением force / REF_FORCE,
     весь пигмент — отношением flow / REF_FLOW. Поэтому на крайнем левом
     положении ползунков не остаётся ни движения, ни краски. */
  var REF_FORCE = 4800;
  var REF_FLOW = 0.14;

  /* Общий множитель силы. 0.5 — вода толкается вдвое мягче, чем в эталоне:
     там она сносит краску быстрее, чем хочется для этой страницы.
     Действует на всё, что двигает воду: кисть, капля, гребень, тихий поток. */
  var FORCE_GAIN = 0.5;

  var PAPER = '#efeae0';

  function hexRgb (hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }

  /* sRGB → линейное: только в линейном пространстве плотность складывается. */
  function toLinear (v) {
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  /* Цвет → плотность. Перед логарифмом цвет переводится в линейное пространство,
     а самые тёмные каналы подрезаются на 0.012 — иначе логарифм уходит в бесконечность. */
  function absorb (rgb, strength) {
    var s = strength == null ? 1 : strength;
    var floor = 0.012;
    return rgb.map(function (v) {
      return -Math.log(Math.max(toLinear(v), floor)) * s;
    });
  }

  function scale3 (v, s) { return [v[0] * s, v[1] * s, v[2] * s]; }

  /* Поправка на пропорции окна: по иксу координаты растянуты. */
  function aspectFix (dx, dy, aspect) {
    return aspect < 1 ? [dx * aspect, dy] : [dx, dy / aspect];
  }

  function InkFluid (canvas, options) {
    var o = this.o = Object.assign({
      paper: PAPER,
      inks: ['#1a1a1f', '#16407a', '#c8372d', '#2e6e52'],
      quality: 0
    }, options || {});

    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    if (!this.gl) throw new Error('webgl2');

    var gl = this.gl;
    if (!gl.getExtension('EXT_color_buffer_float') && !gl.getExtension('EXT_color_buffer_half_float')) {
      throw new Error('float-textures');
    }

    this.params = { flow: 0.14, curl: 14, fade: 0.07, force: 4800 };
    this.tool = 'brush';
    this.inkMode = 'cycle';
    this.inkCycleIdx = 0;
    this.inks = o.inks.map(hexRgb);
    this.quality = o.quality;

    this.pointers = new Map();
    this.contextLost = false;
    this.washing = 0;
    this.hasUndo = false;
    this.lastImpulse = 0;
    this._standing = false;
    this.onUndoChange = null;
    this.onStroke = null;

    this.dye = null;
    this.velocity = null;
    this.pressure = null;
    this.divergence = null;
    this.curlRT = null;
    this.undoFBO = null;

    this.paperRgb = hexRgb(o.paper);
    this._initGL();
    this.resize();
    this.seed();
    this._bindInput();
  }

  InkFluid.prototype = {

    /* ---------- инициализация ---------- */

    _initGL: function () {
      var gl = this.gl;

      this.baseVS = this._shader(gl.VERTEX_SHADER, SH.baseVertex);
      this.programs = {};
      ['advection', 'splat', 'ring', 'curl', 'vorticity', 'divergence',
       'pressure', 'gradient', 'clear', 'copy', 'display'].forEach(function (name) {
        this.programs[name] = this._program(name);
      }, this);

      var quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

      var idx = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      gl.disable(gl.BLEND);
      gl.disable(gl.DEPTH_TEST);
    },

    _shader: function (type, source) {
      var gl = this.gl;
      var sh = gl.createShader(type);
      gl.shaderSource(sh, source);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error('shader: ' + gl.getShaderInfoLog(sh));
      }
      return sh;
    },

    _program: function (name) {
      var gl = this.gl;
      var fs = this._shader(gl.FRAGMENT_SHADER, SH[name]);
      var p = gl.createProgram();
      gl.attachShader(p, this.baseVS);
      gl.attachShader(p, fs);
      gl.bindAttribLocation(p, 0, 'aPosition');
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error('link ' + name + ': ' + gl.getProgramInfoLog(p));
      }
      var uniforms = {};
      var count = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < count; i++) {
        var info = gl.getActiveUniform(p, i);
        uniforms[info.name] = gl.getUniformLocation(p, info.name);
      }
      return { program: p, u: uniforms };
    },

    /* ---------- буферы ---------- */

    _resolution: function (base) {
      var gl = this.gl;
      var aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspect < 1) aspect = 1 / aspect;
      var min = Math.round(base);
      var max = Math.round(base * aspect);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { w: max, h: min }
        : { w: min, h: max };
    },

    _fbo: function (w, h) {
      var gl = this.gl;
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);

      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error('float-target');
      }

      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture: texture,
        fbo: fbo,
        width: w,
        height: h,
        texelX: 1 / w,
        texelY: 1 / h,
        attach: function (unit) {
          gl.activeTexture(gl.TEXTURE0 + unit);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return unit;
        }
      };
    },

    _double: function (w, h) {
      var a = this._fbo(w, h);
      var b = this._fbo(w, h);
      return {
        width: w,
        height: h,
        texelX: a.texelX,
        texelY: a.texelY,
        get read () { return a; },
        get write () { return b; },
        swap: function () { var t = a; a = b; b = t; }
      };
    },

    _free: function (target) {
      var gl = this.gl;
      if (!target) return;
      if (target.read) { this._free(target.read); this._free(target.write); return; }
      gl.deleteTexture(target.texture);
      gl.deleteFramebuffer(target.fbo);
    },

    _rebuild: function () {
      var q = QUALITY[Math.min(this.quality, QUALITY.length - 1)];
      var sim = this._resolution(q.sim);
      var dye = this._resolution(q.dye);
      var oldDye = this.dye;

      this.velocity = this._double(sim.w, sim.h);
      this.pressure = this._double(sim.w, sim.h);
      this.divergence = this._fbo(sim.w, sim.h);
      this.curlRT = this._fbo(sim.w, sim.h);
      this.dye = this._double(dye.w, dye.h);
      this.undoFBO = this._fbo(dye.w, dye.h);

      if (oldDye) {
        this._copy(oldDye.read.texture, this.dye.write);
        this.dye.swap();
        this._free(oldDye);
      }

      this.iterations = q.iter;
      this.hasUndo = false;
      if (this.onUndoChange) this.onUndoChange(false);
    },

    resize: function () {
      var dpr = Math.min(global.devicePixelRatio || 1, 2);
      var cw = this.canvas.clientWidth || global.innerWidth;
      var ch = this.canvas.clientHeight || global.innerHeight;
      var w = Math.max(1, Math.round(cw * dpr));
      var h = Math.max(1, Math.round(ch * dpr));
      if (w === this.canvas.width && h === this.canvas.height && this.dye) return false;
      this.canvas.width = w;
      this.canvas.height = h;
      this._rebuild();
      return true;
    },

    setQuality: function (level) {
      if (level === this.quality) return;
      this.quality = level;
      this._rebuild();
    },

    /* Текущая сила с учётом общего множителя. */
    _force: function () {
      return this.params.force * FORCE_GAIN;
    },

    /* ---------- рисование ---------- */

    _blit: function (target) {
      var gl = this.gl;
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    },

    _copy: function (texture, target) {
      var gl = this.gl;
      var p = this.programs.copy;
      gl.useProgram(p.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(p.u.uTexture, 0);
      this._blit(target);
    },

    /* ---------- пятна ---------- */

    splatVelocity: function (x, y, dx, dy, scale) {
      if (!dx && !dy) return;
      this.lastImpulse = performance.now();
      var gl = this.gl;
      var p = this.programs.splat;
      gl.useProgram(p.program);
      gl.uniform1i(p.u.uTarget, this.velocity.read.attach(0));
      gl.uniform1f(p.u.aspectRatio, this.canvas.width / this.canvas.height);
      gl.uniform2f(p.u.point, x, y);
      gl.uniform3f(p.u.color, dx, dy, 0);
      gl.uniform1f(p.u.radius, SPLAT_RADIUS * (scale == null ? 1 : scale));
      this._blit(this.velocity.write);
      this.velocity.swap();
    },

    splatDye: function (x, y, color, scale) {
      if (!color[0] && !color[1] && !color[2]) return;
      var gl = this.gl;
      var p = this.programs.splat;
      gl.useProgram(p.program);
      gl.uniform1i(p.u.uTarget, this.dye.read.attach(0));
      gl.uniform1f(p.u.aspectRatio, this.canvas.width / this.canvas.height);
      gl.uniform2f(p.u.point, x, y);
      gl.uniform3f(p.u.color, color[0], color[1], color[2]);
      gl.uniform1f(p.u.radius, SPLAT_RADIUS * (scale == null ? 1 : scale));
      this._blit(this.dye.write);
      this.dye.swap();
    },

    /* ---------- капля ---------- */

    dropDisc: function (x, y, color) {
      if (!color[0] && !color[1] && !color[2]) return;
      var gl = this.gl;
      var p = this.programs.ring;
      gl.useProgram(p.program);
      gl.uniform1i(p.u.uTarget, this.dye.read.attach(0));
      gl.uniform1f(p.u.uAspect, this.canvas.width / this.canvas.height);
      gl.uniform2f(p.u.uPoint, x, y);
      gl.uniform1f(p.u.uRadius, DROP_RADIUS);
      gl.uniform1f(p.u.uEdge, 1.5 * this.dye.texelY);
      gl.uniform3f(p.u.uColor, color[0], color[1], color[2]);
      this._blit(this.dye.write);
      this.dye.swap();
    },

    /* Капля: сгусток пигмента плюс лёгкий толчок в случайную сторону.
       И пигмент, и толчок подчиняются ползункам: flow и force. */
    dropInk: function (x, y, rgb, strength) {
      var s = strength == null ? 1 : strength;

      var flowK = this.params.flow / REF_FLOW;
      if (flowK > 0) this.splatDye(x, y, absorb(rgb, s * 0.22 * flowK), 1);

      var forceK = this._force() / REF_FORCE;
      if (forceK > 0) {
        var a = Math.random() * Math.PI * 2;
        var v = (60 + Math.random() * 80) * forceK;
        this.splatVelocity(x, y, Math.cos(a) * v, Math.sin(a) * v, 1.2);
      }
    },

    ringTick: function (p) {
      var even = p.ringPhase % 2 === 0;
      /* цвет обязан двигаться дальше даже при нулевой плотности */
      var ink = this.currentInk(true);
      p.ringPhase++;

      var k = this.params.flow / REF_FLOW;
      if (k <= 0) return;

      this.dropDisc(p.x, p.y, even ? scale3(absorb(ink, RING_STRENGTH), k) : scale3(RING_ALT, k));
    },

    /* Гребень: ряд толчков поперёк движения, по числу зубьев. */
    comb: function (x, y, dx, dy) {
      var aspect = this.canvas.width / this.canvas.height;
      var ax = dx * aspect;
      var ay = dy;
      var len = Math.sqrt(ax * ax + ay * ay);
      if (len < 1e-5) return;

      var nx = -ay / len;
      var ny = ax / len;
      var v = aspectFix(dx, dy, aspect);
      var f = this._force();
      var fx = v[0] * f * 1.1;
      var fy = v[1] * f * 1.1;

      for (var i = 0; i < COMB_TEETH; i++) {
        var off = (i - (COMB_TEETH - 1) / 2) * COMB_SPACING;
        this.splatVelocity(x + nx * off / aspect, y + ny * off, fx, fy, 0.55);
      }
    },

    stir: function (x, y, dx, dy, scale) {
      var k = this._force() / REF_FORCE;
      if (k <= 0) return;
      this.splatVelocity(x, y, dx * k, dy * k, scale);
    },

    /* ---------- чернила ---------- */

    currentInk: function (advance) {
      if (this.inkMode === 'cycle') {
        var c = this.inks[this.inkCycleIdx % this.inks.length];
        if (advance) this.inkCycleIdx++;
        return c;
      }
      return this.inks[this.inkMode] || this.inks[0];
    },

    setInk: function (mode) { this.inkMode = mode; },

    setPalette: function (hexes) {
      this.inks = hexes.map(hexRgb);
      this.inkCycleIdx = 0;
    },

    /* ---------- история ---------- */

    snapshot: function () {
      this._copy(this.dye.read.texture, this.undoFBO);
      this.hasUndo = true;
      if (this.onUndoChange) this.onUndoChange(true);
    },

    undo: function () {
      if (!this.hasUndo) return false;
      this._copy(this.undoFBO.texture, this.dye.write);
      this.dye.swap();
      this.hasUndo = false;
      if (this.onUndoChange) this.onUndoChange(false);
      return true;
    },

    wash: function () {
      this.snapshot();
      this.washing = 1.6;
    },

    /* ---------- кадр ---------- */

    tick: function (dt) {
      if (!this.beginFrame(performance.now())) return;
      this.simulate(dt);
      this.present();
    },

    beginFrame: function (now) {
      if (this.contextLost) return false;
      this._applyPointers(now);
      return true;
    },

    simulate: function (dt) {
      if (this.contextLost) return;
      this._step(dt);
    },

    present: function () {
      if (this.contextLost) return;
      this.draw();
    },

    _step: function (dt) {
      var gl = this.gl;
      var P = this.programs;
      var v = this.velocity;
      var p;

      /* Сила на нуле — вода встаёт. Гасим остатки течения и дальше только
         растворяем пигмент, если задано растворение. Иначе краска
         продолжает уезжать при внешне выключенных регуляторах. */
      var standing = this.params.force <= 0 && (performance.now() - this.lastImpulse) > 100;

      if (standing) {
        if (!this._standing) {
          this._standing = true;
          [v.read, v.write].forEach(function (t) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
          });
        }
        if (this.params.fade > 0) {
          p = P.clear;
          gl.useProgram(p.program);
          gl.uniform1i(p.u.uTexture, this.dye.read.attach(0));
          gl.uniform1f(p.u.value, 1 / (1 + this.params.fade * dt));
          this._blit(this.dye.write);
          this.dye.swap();
        }
        return;
      }
      this._standing = false;

      p = P.curl;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uVelocity, v.read.attach(0));
      this._blit(this.curlRT);

      p = P.vorticity;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uVelocity, v.read.attach(0));
      gl.uniform1i(p.u.uCurl, this.curlRT.attach(1));
      gl.uniform1f(p.u.curl, this.params.curl);
      gl.uniform1f(p.u.dt, dt);
      this._blit(v.write);
      v.swap();

      p = P.divergence;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uVelocity, v.read.attach(0));
      this._blit(this.divergence);

      p = P.clear;
      gl.useProgram(p.program);
      gl.uniform1i(p.u.uTexture, this.pressure.read.attach(0));
      gl.uniform1f(p.u.value, 0.8);
      this._blit(this.pressure.write);
      this.pressure.swap();

      p = P.pressure;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uDivergence, this.divergence.attach(0));
      for (var i = 0; i < this.iterations; i++) {
        gl.uniform1i(p.u.uPressure, this.pressure.read.attach(1));
        this._blit(this.pressure.write);
        this.pressure.swap();
      }

      p = P.gradient;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uPressure, this.pressure.read.attach(0));
      gl.uniform1i(p.u.uVelocity, v.read.attach(1));
      this._blit(v.write);
      v.swap();

      p = P.advection;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uVelocity, v.read.attach(0));
      gl.uniform1i(p.u.uSource, v.read.attach(0));
      gl.uniform1f(p.u.dt, dt);
      gl.uniform1f(p.u.dissipation, VEL_DISSIPATION);
      this._blit(v.write);
      v.swap();

      if (this.washing > 0) this.washing -= dt;

      p = P.advection;
      gl.useProgram(p.program);
      gl.uniform2f(p.u.texelSize, v.texelX, v.texelY);
      gl.uniform1i(p.u.uVelocity, v.read.attach(0));
      gl.uniform1i(p.u.uSource, this.dye.read.attach(1));
      gl.uniform1f(p.u.dt, dt);
      gl.uniform1f(p.u.dissipation, this.params.fade + (this.washing > 0 ? 2.4 : 0));
      this._blit(this.dye.write);
      this.dye.swap();
    },

    draw: function () {
      var gl = this.gl;
      var p = this.programs.display;
      gl.useProgram(p.program);
      gl.uniform1i(p.u.uDye, this.dye.read.attach(0));
      gl.uniform3f(p.u.uPaper, this.paperRgb[0], this.paperRgb[1], this.paperRgb[2]);
      this._blit(null);
    },

    /* ---------- ввод ---------- */

    _bindInput: function () {
      var self = this;
      var c = this.canvas;

      function local (e) {
        var r = c.getBoundingClientRect();
        return {
          x: (e.clientX - r.left) / r.width,
          y: 1 - (e.clientY - r.top) / r.height
        };
      }

      c.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (self.contextLost) return;

        var anyDown = false;
        self.pointers.forEach(function (p) { if (p.down) anyDown = true; });
        if (!anyDown) self.snapshot();
        if (self.onStroke) self.onStroke();

        var pt = local(e);
        var p = {
          down: true,
          moved: false,
          x: pt.x,
          y: pt.y,
          px: pt.x,
          py: pt.y,
          color: self.currentInk(self.tool !== 'ring'),
          ringAt: performance.now() + RING_INTERVAL,
          ringPhase: 0,
          isMouse: e.pointerType === 'mouse'
        };
        self.pointers.set(e.pointerId, p);

        if (self.tool === 'brush') self.dropInk(pt.x, pt.y, p.color, 0.6 + Math.random() * 0.3);
        else if (self.tool === 'ring') self.ringTick(p);

        if (c.setPointerCapture) { try { c.setPointerCapture(e.pointerId); } catch (err) {} }
      }, { passive: false });

      c.addEventListener('pointermove', function (e) {
        var pt = local(e);
        var p = self.pointers.get(e.pointerId);
        if (!p) {
          if (e.pointerType === 'mouse') {
            self.pointers.set(e.pointerId, {
              down: false, moved: false, x: pt.x, y: pt.y, px: pt.x, py: pt.y,
              color: self.currentInk(false), ringAt: 0, ringPhase: 0, isMouse: true
            });
          }
          return;
        }
        p.px = p.x; p.py = p.y;
        p.x = pt.x; p.y = pt.y;
        p.moved = true;
      }, { passive: true });

      function release (e) {
        var p = self.pointers.get(e.pointerId);
        if (!p) return;
        if (p.isMouse) p.down = false;
        else self.pointers.delete(e.pointerId);
      }

      global.addEventListener('pointerup', release);
      global.addEventListener('pointercancel', release);

      c.addEventListener('pointerleave', function (e) {
        if (e.pointerType === 'mouse') self.pointers.delete(e.pointerId);
      });

      c.addEventListener('webglcontextlost', function (e) {
        e.preventDefault();
        self.contextLost = true;
      });

      c.addEventListener('webglcontextrestored', function () {
        self.contextLost = false;
        self._rebuild();
        self.seed();
      });
    },

    _applyPointers: function (now) {
      var self = this;
      var aspect = this.canvas.width / this.canvas.height;

      this.pointers.forEach(function (p) {
        if (p.down && self.tool === 'ring' && now > p.ringAt) {
          self.ringTick(p);
          p.ringAt = now + RING_INTERVAL;
        }

        if (!p.moved) return;
        p.moved = false;

        var dx = p.x - p.px;
        var dy = p.y - p.py;
        if (Math.abs(dx) + Math.abs(dy) < 1e-6) return;

        if (p.down && self.tool === 'comb') {
          self.comb(p.x, p.y, dx, dy);
          return;
        }

        var v = aspectFix(dx, dy, aspect);
        var k = self._force() * (p.down ? 1 : 1.7);
        self.splatVelocity(p.x, p.y, v[0] * k, v[1] * k, p.down ? 2 : 2.6);

        if (p.down && self.tool === 'brush') {
          var t = Math.min(Math.sqrt(v[0] * v[0] + v[1] * v[1]) * 26, 1);
          if (t > 0.04) {
            self.splatDye(p.x, p.y, absorb(p.color, t * self.params.flow), 1.5);
          }
        }
      });
    },

    /* ---------- стартовая композиция ---------- */

    seed: function () {
      var inks = this.inks;
      var n = inks.length;
      var self = this;
      this.inkCycleIdx = 0;
      this.dropInk(0.38, 0.58, inks[0], 0.75);
      setTimeout(function () { if (!self.contextLost) self.dropInk(0.62, 0.42, inks[1 % n], 0.6); }, 450);
      setTimeout(function () { if (!self.contextLost) self.dropInk(0.5, 0.62, inks[2 % n], 0.5); }, 950);
    },

    /* ---------- экспорт ---------- */

    toBlob: function () {
      var self = this;
      this.draw();
      return new Promise(function (resolve, reject) {
        self.canvas.toBlob(function (blob) {
          if (blob) resolve(blob); else reject(new Error('blob'));
        }, 'image/png');
      });
    },

    setTool: function (tool) { this.tool = tool; },

    setParam: function (name, value) { this.params[name] = value; }
  };

  var QUALITY = [
    { dye: DYE_RES, sim: SIM_RES, iter: PRESSURE_ITER },
    { dye: 1024, sim: 192, iter: 22 },
    { dye: 768, sim: 128, iter: 16 }
  ];

  InkFluid.absorb = absorb;
  InkFluid.hexRgb = hexRgb;

  global.InkFluid = InkFluid;

})(window);
