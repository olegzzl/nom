# -*- coding: utf-8 -*-
"""OG-картинки 1200x630 для страниц сайта.

Запуск:  python tools/make_og.py
Результат: assets/og/*.jpg
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OG_DIR = os.path.join(ROOT, "assets", "og")
ENSO = os.path.join(ROOT, "assets", "neo-orbital-enso-header.webp")

NIGHT = (6, 31, 48)
GOLD = (209, 187, 126)
IVORY = (245, 239, 217)
MUTED = (232, 224, 204)

SERIF_BOLD = r"C:\Windows\Fonts\georgiab.ttf"
SERIF = r"C:\Windows\Fonts\georgia.ttf"
SANS = r"C:\Windows\Fonts\segoeuil.ttf"


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def wrap(draw, text, font, width):
    words = text.split()
    lines, line = [], ""
    for word in words:
        probe = f"{line} {word}".strip()
        if draw.textlength(probe, font=font) <= width or not line:
            line = probe
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def ink_art(size, rnd_seed=3):
    """Кольца чернил на воде для карточки Suminigashi."""
    import random

    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    rnd = random.Random(rnd_seed)
    cx, cy = size * 0.52, size * 0.46
    for i in range(46):
        r = size * (0.06 + 0.44 * (i / 46) ** 1.25) + rnd.uniform(-size * 0.01, size * 0.01)
        squash = rnd.uniform(0.82, 1.0)
        colour = lerp((214, 190, 128), (92, 140, 148), rnd.random())
        width = max(1, round(size * rnd.uniform(0.0015, 0.004)))
        draw.ellipse(
            [cx - r, cy - r * squash, cx + r, cy + r * squash],
            outline=colour + (rnd.randint(70, 165),),
            width=width,
        )
    return layer.filter(ImageFilter.GaussianBlur(size * 0.004))


def og_image(title, subtitle, out_name, ring_side="right", art="enso"):
    W, H = 1200, 630
    canvas = Image.new("RGB", (W, H), NIGHT)
    px = canvas.load()
    for y in range(H):
        for x in range(W):
            t = (x / W) * 0.55 + (y / H) * 0.45
            px[x, y] = lerp(NIGHT, (3, 20, 32), min(1.0, t * 0.9))

    haze = Image.open(ENSO).convert("RGB").resize((900, 900), Image.LANCZOS).filter(ImageFilter.GaussianBlur(60))
    haze_mask = Image.new("L", (900, 900), 0)
    ImageDraw.Draw(haze_mask).ellipse([40, 40, 860, 860], fill=90)
    haze_mask = haze_mask.filter(ImageFilter.GaussianBlur(90))
    canvas.paste(haze, (W - 620 if ring_side == "right" else -280, -140), haze_mask)

    if art == "ink":
        rings = ink_art(760)
        canvas.paste(rings, (W - 620, -40), rings)
    else:
        ring = Image.open(ENSO).convert("RGB").resize((760, 760), Image.LANCZOS)
        radial = Image.radial_gradient("L").resize((760, 760), Image.LANCZOS)
        canvas.paste(ring, (W - 500 if ring_side == "right" else -300, -60), ImageOps.invert(radial).point(lambda v: int(v * 0.92)))

    draw = ImageDraw.Draw(canvas)
    f_brand = ImageFont.truetype(SANS, 24)
    f_title = ImageFont.truetype(SERIF_BOLD, 60)
    f_sub = ImageFont.truetype(SERIF, 26)

    left, top = 78, 158
    text_width = 600 if ring_side == "right" else W - left * 2

    x = left
    for ch in "NEO ORBITAL MEDITATION":
        draw.text((x, 80), ch, font=f_brand, fill=GOLD, anchor="ls")
        x += draw.textlength(ch, font=f_brand) + 5

    draw.line([left, top - 34, left + 64, top - 34], fill=GOLD, width=2)

    y = top
    for line in wrap(draw, title, f_title, text_width):
        draw.text((left, y), line, font=f_title, fill=IVORY)
        y += 72
    y += 16
    for line in wrap(draw, subtitle, f_sub, text_width):
        draw.text((left, y), line, font=f_sub, fill=MUTED)
        y += 38

    canvas.save(os.path.join(OG_DIR, out_name), "JPEG", quality=88, optimize=True)


def make_og():
    os.makedirs(OG_DIR, exist_ok=True)
    og_image("Медитации и техники успокоения", "Одиннадцать практик: что это, откуда пришло, что даёт и как делать", "meditations-ru.jpg")
    og_image("Медитації й техніки заспокоєння", "Одинадцять практик: що це, звідки прийшло, що дає і як робити", "meditations-uk.jpg")
    og_image("Meditations and calming techniques", "Eleven practices: what they are, where they come from, what they give", "meditations-en.jpg")
    og_image("Неоорбитальная медитация", "Практика успокоения ума и внутреннего сосредоточения", "home-ru.jpg", ring_side="left")
    og_image("Неоорбітальна медитація", "Практика заспокоєння розуму й внутрішнього зосередження", "home-uk.jpg", ring_side="left")
    og_image("Neo Orbital Meditation", "A practice of calming the mind and inner focus", "home-en.jpg", ring_side="left")
    og_image("Suminigashi", "Чернила на воде: кольца, капли и волокна в интерактивной практике", "suminigashi-ru.jpg", art="ink")


if __name__ == "__main__":
    make_og()
    print("og done")
