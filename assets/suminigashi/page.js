/* Suminigashi — интерфейс страницы: инструменты, палитры, перебор цветов, тихий поток.
   Логика та же, что в отдельном проекте; здесь добавлена только подпись элементов
   на трёх языках сайта и привязка к сцене под шапкой. */
(function () {
  'use strict';

  var STEP = 1 / 60;

  var PALETTES = [
    { label: 'Traditional', colors: ['#1a1a1f', '#16407a', '#c8372d', '#2e6e52'] },
    { label: 'Ebru',        colors: ['#14213d', '#2a9d8f', '#9b2226', '#bc6c25'] },
    { label: 'Sunset',      colors: ['#7209b7', '#d00000', '#e85d04', '#ffba08'] },
    { label: 'Neon',        colors: ['#f72585', '#00b4d8', '#70e000', '#7209b7'] }
  ];

  var DICT = {
    ru: {
      hint: 'Проведите по воде',
      brush: 'Кисть', rings: 'Кольцо', comb: 'Гребень',
      flow: 'Плотность', curl: 'Закрутка', fade: 'Растворение', force: 'Сила',
      auto: 'Поток', wash: 'Смыть', undo: 'Отменить', save: 'Сохранить',
      cycle: 'Перебор цветов', palette: 'Сменить палитру',
      tools: 'Инструмент', inks: 'Чернила', collapse: 'Свернуть панель',
      fallbackTitle: 'Вода не налилась',
      fallbackText: 'Этой странице нужен WebGL 2 и видеокарта, которая умеет считать в половинной точности. Попробуйте свежий Chrome, Edge, Safari или Firefox.',
      fallbackBrowser: 'Браузер не дал WebGL 2. Включите аппаратное ускорение в настройках или откройте страницу в другом браузере.',
      fallbackFloat: 'Видеокарта не умеет считать в половинной точности — а без этого вода не нальётся.'
    },
    en: {
      hint: 'Draw on the water',
      brush: 'Brush', rings: 'Rings', comb: 'Comb',
      flow: 'Density', curl: 'Swirl', fade: 'Fade', force: 'Force',
      auto: 'Auto flow', wash: 'Wash', undo: 'Undo', save: 'Save',
      cycle: 'Cycle colours', palette: 'Change palette',
      tools: 'Tool', inks: 'Ink', collapse: 'Collapse panel',
      fallbackTitle: 'No water',
      fallbackText: 'This page needs WebGL 2 and a GPU that can render to half-float textures. Try a recent Chrome, Edge, Safari or Firefox.',
      fallbackBrowser: 'The browser refused WebGL 2. Turn on hardware acceleration or open the page in another browser.',
      fallbackFloat: 'This GPU cannot render to half-float textures, so the water cannot fill.'
    },
    uk: {
      hint: 'Проведіть по воді',
      brush: 'Пензель', rings: 'Кільце', comb: 'Гребінь',
      flow: 'Щільність', curl: 'Закрутка', fade: 'Розчинення', force: 'Сила',
      auto: 'Потік', wash: 'Змити', undo: 'Скасувати', save: 'Зберегти',
      cycle: 'Перебір кольорів', palette: 'Змінити палітру',
      tools: 'Інструмент', inks: 'Чорнило', collapse: 'Згорнути панель',
      fallbackTitle: 'Вода не налилася',
      fallbackText: 'Цій сторінці потрібен WebGL 2 і відеокарта, яка вміє рахувати в половинній точності. Спробуйте свіжий Chrome, Edge, Safari або Firefox.',
      fallbackBrowser: 'Браузер не дав WebGL 2. Увімкніть апаратне прискорення або відкрийте сторінку в іншому браузері.',
      fallbackFloat: 'Відеокарта не вміє рахувати в половинній точності — без цього вода не налиється.'
    }
  };

  var lang = (document.documentElement.lang || 'ru').slice(0, 2).toLowerCase();
  if (!DICT[lang]) lang = 'ru';
  var T = DICT[lang];

  var canvas = document.getElementById('water');
  var hint = document.getElementById('hint');
  var dock = document.getElementById('ink-dock');
  var undoBtn = document.getElementById('undo');

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarse = matchMedia('(pointer: coarse)').matches;

  /* ---------------------------------------------------------------- вода */

  var ink;
  try {
    ink = new window.InkFluid(canvas, {
      paper: '#efeae0',
      inks: PALETTES[0].colors,
      quality: coarse || (navigator.deviceMemory || 8) <= 4 ? 1 : 0
    });
  } catch (err) {
    showFallback(err && err.message);
    return;
  }

  window.NOMInk = ink;

  ink.onUndoChange = function (available) { undoBtn.disabled = !available; };
  ink.onStroke = function () {
    hint.classList.add('is-gone');
    lastInteraction = performance.now();
    welcomeDrops = false;
  };

  function showFallback (reason) {
    var box = document.getElementById('ink-fallback');
    var title = document.getElementById('ink-fallback-title');
    var text = document.getElementById('ink-fallback-text');
    if (title) title.textContent = T.fallbackTitle;
    if (reason === 'webgl2') text.textContent = T.fallbackBrowser;
    else if (reason === 'float-textures') text.textContent = T.fallbackFloat;
    else text.textContent = T.fallbackText;
    box.hidden = false;
  }

  /* ------------------------------------------------------------- палитры */

  var paletteIdx = 0;
  var paletteBtn = document.getElementById('palette');
  var inkButtons = Array.prototype.slice.call(document.querySelectorAll('[data-ink]'));
  var cycleBtn = document.getElementById('ink-cycle');

  function paintSwatches () {
    var colors = PALETTES[paletteIdx].colors;
    inkButtons.forEach(function (btn, i) {
      btn.style.background = colors[i];
      btn.setAttribute('aria-label', colors[i]);
    });
    cycleBtn.style.background = 'conic-gradient(' +
      colors[0] + ' 0 25%, ' + colors[1] + ' 0 50%, ' +
      colors[2] + ' 0 75%, ' + colors[3] + ' 0 100%)';
    cycleBtn.setAttribute('aria-label', T.cycle);
    paletteBtn.textContent = PALETTES[paletteIdx].label;
    paletteBtn.setAttribute('title', T.palette);
  }

  function selectInk (mode) {
    ink.setInk(mode);
    cycleBtn.classList.toggle('is-active', mode === 'cycle');
    cycleBtn.setAttribute('aria-pressed', mode === 'cycle' ? 'true' : 'false');
    inkButtons.forEach(function (b, i) {
      var on = mode === i;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function applyPalette () {
    ink.setPalette(PALETTES[paletteIdx].colors);
    paintSwatches();
    selectInk('cycle');
  }

  cycleBtn.addEventListener('click', function () { selectInk('cycle'); });

  inkButtons.forEach(function (btn, i) {
    btn.addEventListener('click', function () { selectInk(i); });
  });

  paletteBtn.addEventListener('click', function () {
    paletteIdx = (paletteIdx + 1) % PALETTES.length;
    applyPalette();
  });

  /* ------------------------------------------------------------- панель */

  var toolButtons = Array.prototype.slice.call(document.querySelectorAll('[data-tool]'));
  toolButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toolButtons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      ink.setTool(btn.dataset.tool);
      canvas.dataset.tool = btn.dataset.tool;
    });
  });

  var flow = document.getElementById('flow');
  var curl = document.getElementById('curl');
  var fade = document.getElementById('fade');
  var force = document.getElementById('force');

  flow.addEventListener('input', function () { ink.setParam('flow', parseFloat(flow.value)); });
  curl.addEventListener('input', function () { ink.setParam('curl', parseFloat(curl.value)); });
  fade.addEventListener('input', function () { ink.setParam('fade', parseFloat(fade.value)); });
  force.addEventListener('input', function () { ink.setParam('force', parseFloat(force.value)); });

  document.getElementById('wash').addEventListener('click', function () { ink.wash(); });
  undoBtn.addEventListener('click', function () { ink.undo(); });

  var autoBtn = document.getElementById('auto');
  autoBtn.addEventListener('click', function () {
    autoFlow = !autoFlow;
    autoBtn.classList.toggle('is-active', autoFlow);
    autoBtn.setAttribute('aria-pressed', autoFlow ? 'true' : 'false');
    if (autoFlow) welcomeDrops = false;
  });

  function download (blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 8000);
  }

  document.getElementById('save').addEventListener('click', function () {
    ink.toBlob().then(function (blob) {
      var d = new Date();
      var p = function (n) { return String(n).padStart(2, '0'); };
      var stamp = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
        '-' + p(d.getHours()) + p(d.getMinutes());
      download(blob, 'suminigashi-' + stamp + '.png');
    }).catch(function () {});
  });

  var collapse = document.getElementById('collapse');
  collapse.addEventListener('click', function () {
    var closed = dock.classList.toggle('is-closed');
    collapse.setAttribute('aria-expanded', closed ? 'false' : 'true');
  });

  /* --------------------------------------------------------- тихий поток */

  var lastInteraction = performance.now();
  var nextDrop = 1200;
  var nextStir = 2600;
  var welcomeDrops = true;
  var autoFlow = false;

  function colours () {
    return PALETTES[paletteIdx].colors.map(window.InkFluid.hexRgb);
  }

  function autoUpdate (now, dt) {
    if (!autoFlow && !welcomeDrops) return;

    var idle = now - lastInteraction > 3000;
    var list = colours();

    nextDrop -= dt * 1000;
    if (idle && nextDrop <= 0) {
      var x = 0.14 + Math.random() * 0.72;
      var y = 0.16 + Math.random() * 0.68;
      ink.dropInk(x, y, list[Math.floor(Math.random() * list.length)], 0.8 + Math.random() * 0.7);

      if (Math.random() < 0.3) {
        var c2 = list[Math.floor(Math.random() * list.length)];
        var x2 = Math.min(Math.max(x + (Math.random() - 0.5) * 0.16, 0.08), 0.92);
        var y2 = Math.min(Math.max(y + (Math.random() - 0.5) * 0.16, 0.08), 0.92);
        setTimeout(function () {
          if (!ink.contextLost) ink.dropInk(x2, y2, c2, 0.5 + Math.random() * 0.4);
        }, 220 + Math.random() * 300);
      }

      nextDrop = (reduced ? 6500 : 2600) + Math.random() * 2600;
    }

    nextStir -= dt * 1000;
    if (!reduced && nextStir <= 0) {
      var t = now * 1.2e-4;
      var sx = 0.5 + Math.sin(t * 1.7) * 0.3;
      var sy = 0.5 + Math.cos(t * 1.1) * 0.3;
      var angle = t * 6 + Math.random() * 1.5;
      ink.stir(sx, sy, Math.cos(angle) * 130, Math.sin(angle) * 130, 14);
      nextStir = 700;
    }
  }

  /* ------------------------------------------------------------- цикл */

  var last = performance.now();
  var acc = 0;
  var raf = 0;
  var sampleFrames = 0;
  var sampleTime = 0;
  var startedAt = performance.now();

  function loop (now) {
    raf = requestAnimationFrame(loop);

    var dt = (now - last) / 1000;
    last = now;
    if (dt <= 0 || dt > 1) return;

    acc += dt;
    if (acc > STEP * 3) acc = STEP;

    if (!ink.beginFrame(now)) return;

    var steps = 0;
    while (acc >= STEP && steps < 2) {
      autoUpdate(now, STEP);
      ink.simulate(STEP);
      acc -= STEP;
      steps++;
    }

    ink.present();

    sampleFrames++;
    sampleTime += dt;
    if (sampleFrames >= 90) {
      var avg = sampleTime / sampleFrames;
      sampleFrames = 0;
      sampleTime = 0;
      if (now - startedAt > 3000 && avg > 0.04 && ink.quality < 2) {
        ink.setQuality(ink.quality + 1);
      }
    }
  }

  function start () {
    if (raf) return;
    last = performance.now();
    acc = 0;
    raf = requestAnimationFrame(loop);
  }

  function stop () {
    if (!raf) return;
    cancelAnimationFrame(raf);
    raf = 0;
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  window.addEventListener('resize', function () { ink.resize(); });
  window.addEventListener('orientationchange', function () {
    setTimeout(function () { ink.resize(); }, 250);
  });

  /* ------------------------------------------------------------- подписи */

  function applyI18n () {
    var nodes = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute('data-i18n');
      if (T[key]) el.textContent = T[key];
    });
    var aria = document.querySelectorAll('[data-i18n-aria]');
    Array.prototype.forEach.call(aria, function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (T[key]) el.setAttribute('aria-label', T[key]);
    });
    document.title = 'Suminigashi | ' + (lang === 'en' ? 'Neo Orbital Meditation' : lang === 'uk' ? 'Неоорбітальна медитація' : 'Неоорбитальная медитация');

    Array.prototype.forEach.call(document.querySelectorAll('[data-language]'), function (a) {
      if (a.getAttribute('data-language') === lang) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  applyI18n();
  applyPalette();
  start();

})();
