/* GLSL ES 1.00. Работает в контексте WebGL2 (обратная совместимость шейдерного языка).
   Все проходы считаются на одном полноэкранном кваде: четыре вершины, два треугольника. */
window.InkShaders = {

baseVertex: `
precision highp float;

attribute vec2 aPosition;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform vec2 texelSize;

void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,

/* Полулагранжева адвекция: точка «уезжает» вдоль поля скоростей назад по времени,
   значение берётся из предыдущего кадра с билинейной фильтрацией текстуры. */
advection: `
precision highp float;

varying vec2 vUv;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;

void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = texture2D(uSource, coord);
    float decay = 1.0 + dissipation * dt;
    gl_FragColor = result / decay;
}
`,

/* Гауссово пятно: импульс в поле скоростей или мазок пигмента. */
splat: `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;

void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
}
`,

/* Капля. Фиксированный радиус, тонкая кромка и вытягивание плёнки к кромке:
   всё, что лежит дальше диска, притягивается к нему, поэтому каждый следующий
   удар капли выдавливает предыдущий слой наружу и появляются кольца. */
ring: `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTarget;
uniform float uAspect;
uniform float uRadius;
uniform float uEdge;
uniform vec2 uPoint;
uniform vec3 uColor;

void main () {
    vec2 p = vUv - uPoint;
    p.x *= uAspect;
    float d = length(p);

    /* сжатие радиуса внутрь: на кромке — ноль, дальше — почти единица */
    float k = d > uRadius ? sqrt(max(0.0, 1.0 - (uRadius * uRadius) / max(d * d, 1e-12))) : 0.0;
    vec2 src = p * k;
    src.x /= uAspect;

    vec3 pushed = texture2D(uTarget, uPoint + src).rgb;
    float inside = 1.0 - smoothstep(uRadius - uEdge, uRadius + uEdge, d);

    gl_FragColor = vec4(mix(pushed, uColor, inside), 1.0);
}
`,

/* Завихрённость: антисимметричная разность поперечных компонент скорости. */
curl: `
precision highp float;

varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;

void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`,

/* Vorticity confinement: возвращает мелкие вихри, съеденные численной диффузией.
   Не физическая сила, а художественная поправка. */
vorticity: `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;

void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;

    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;

    vec2 velocity = texture2D(uVelocity, vUv).xy + force * dt;
    gl_FragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
}
`,

/* Дивергенция с условием непротекания на стенках: нормальная компонента
   на границе отражается с обратным знаком. */
divergence: `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uVelocity;

void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;

    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }

    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}
`,

/* Итерация Якоби для уравнения Пуассона. Двадцать восемь таких проходов
   приближают решение с точностью, достаточной, чтобы картинка не «разъезжалась». */
pressure: `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`,

/* Проекция Гельмгольца: вычитаем градиент давления — поле становится соленоидальным. */
gradient: `
precision highp float;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`,

/* Умножение поля на константу: затухание давления и смывание пигмента. */
clear: `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform float value;

void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
}
`,

copy: `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;

void main () {
    gl_FragColor = texture2D(uTexture, vUv);
}
`,

/* Бумага. Пигмент хранится как оптическая плотность, а не как цвет:
   слой чернил поглощает свет по закону Бера — Ламберта, поэтому наложения
   темнеют сами собой, а не усредняются. */
display: `
precision highp float;

varying vec2 vUv;

uniform sampler2D uDye;
uniform vec3 uPaper;

float hash (vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise (vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main () {
    /* три октавы волокна: 0.028 / 0.022 / 0.018 на 420 / 180 / 60 */
    float fiber = (vnoise(vUv * 420.0) - 0.5) * 0.028
                + (vnoise(vUv * 180.0) - 0.5) * 0.022
                + (vnoise(vUv * 60.0)  - 0.5) * 0.018;

    vec3 A = texture2D(uDye, vUv).rgb;
    vec3 col = uPaper * exp(-A) + fiber;

    vec2 uv2 = vUv * (1.0 - vUv.yx);
    float vign = pow(uv2.x * uv2.y * 15.0, 0.18);
    col *= 0.92 + 0.08 * vign;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

};
