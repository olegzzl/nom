# -*- coding: utf-8 -*-
"""SEO-блоки для главных страниц и Suminigashi.

Вставляет между маркерами <!-- seo:start --> и <!-- seo:end -->:
robots, canonical и hreflang (если в site.json задан base_url),
Open Graph, Twitter Card и JSON-LD.

Запуск:  python tools/patch_heads.py
"""

from __future__ import annotations

import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
START = "  <!-- seo:start -->"
END = "  <!-- seo:end -->"

PAGES = [
    {
        "file": "index.html",
        "lang": "ru",
        "locale": "ru_RU",
        "og_title": "Неоорбитальная медитация: практика и техника",
        "og_desc": "Полная инструкция: идея практики, выбор мантры, траектория движения внимания по телу, режим занятий и завершение.",
        "image": "home-ru.jpg",
        "type": "website",
        "jsonld": "home",
    },
    {
        "file": "index-uk.html",
        "lang": "uk",
        "locale": "uk_UA",
        "og_title": "Неоорбітальна медитація: практика і техніка",
        "og_desc": "Повна інструкція: ідея практики, вибір мантри, траєкторія руху уваги тілом, режим занять і завершення.",
        "image": "home-uk.jpg",
        "type": "website",
        "jsonld": "home",
    },
    {
        "file": "index-en.html",
        "lang": "en",
        "locale": "en_US",
        "og_title": "Neo Orbital Meditation: practice and technique",
        "og_desc": "The full instruction: the idea behind the practice, choosing a mantra, the path of attention through the body, the routine and the closing.",
        "image": "home-en.jpg",
        "type": "website",
        "jsonld": "home",
    },
    {
        "file": "suminigashi.html",
        "lang": "ru",
        "locale": "ru_RU",
        "og_title": "Suminigashi: чернила на воде",
        "og_desc": "Интерактивная практика: проведите по поверхности, и краска поплывёт кольцами и волокнами.",
        "image": "suminigashi-ru.jpg",
        "type": "website",
        "jsonld": "page",
    },
]

ALTERNATES = {"index.html": "index-uk.html", "index-uk.html": "index.html"}


def site_base() -> str:
    path = os.path.join(ROOT, "site.json")
    if not os.path.exists(path):
        return ""
    with open(path, "r", encoding="utf-8") as fh:
        return json.load(fh).get("base_url", "").rstrip("/")


def jsonld(kind: str, page: dict, base: str) -> str:
    url = f"{base}/{page['file']}" if base else ""
    website = {
        "@type": "WebSite",
        "@id": f"{base}/#website" if base else "#website",
        "name": "Neo Orbital Meditation",
        "inLanguage": ["ru", "uk", "en"],
    }
    if base:
        website["url"] = base + "/"
    webpage = {
        "@type": "WebPage",
        "@id": (url + "#page") if url else "#page",
        "name": page["og_title"],
        "description": page["og_desc"],
        "inLanguage": page["lang"],
        "isPartOf": {"@id": website["@id"]},
    }
    if url:
        webpage["url"] = url
    graph = [website, webpage]
    if kind == "page":
        crumbs = {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Главная"},
                {"@type": "ListItem", "position": 2, "name": "Suminigashi"},
            ],
        }
        if base:
            crumbs["itemListElement"][0]["item"] = base + "/"
            crumbs["itemListElement"][1]["item"] = url
        graph.append(crumbs)
    data = {"@context": "https://schema.org", "@graph": graph}
    return json.dumps(data, ensure_ascii=False, indent=2).replace("\n", "\n  ")


def block(page: dict, base: str, pages: list[dict]) -> str:
    url = f"{base}/{page['file']}" if base else ""
    image = f"{base}/assets/og/{page['image']}" if base else f"assets/og/{page['image']}"
    lines = [START]
    lines.append('  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">')
    if base and page["file"].startswith("index"):
        lines.append(f'  <link rel="canonical" href="{url}">')
        for other in pages:
            if other["file"].startswith("index"):
                lines.append(f'  <link rel="alternate" hreflang="{other["lang"]}" href="{base}/{other["file"]}">')
        lines.append(f'  <link rel="alternate" hreflang="x-default" href="{base}/index.html">')
    elif base:
        lines.append(f'  <link rel="canonical" href="{url}">')
    lines.append(f'  <meta property="og:type" content="{page["type"]}">')
    lines.append('  <meta property="og:site_name" content="Neo Orbital Meditation">')
    lines.append(f'  <meta property="og:locale" content="{page["locale"]}">')
    lines.append(f'  <meta property="og:title" content="{page["og_title"]}">')
    lines.append(f'  <meta property="og:description" content="{page["og_desc"]}">')
    if url:
        lines.append(f'  <meta property="og:url" content="{url}">')
    lines.append(f'  <meta property="og:image" content="{image}">')
    lines.append('  <meta property="og:image:width" content="1200">')
    lines.append('  <meta property="og:image:height" content="630">')
    lines.append(f'  <meta property="og:image:alt" content="{page["og_title"]}">')
    lines.append('  <meta name="twitter:card" content="summary_large_image">')
    lines.append(f'  <meta name="twitter:title" content="{page["og_title"]}">')
    lines.append(f'  <meta name="twitter:description" content="{page["og_desc"]}">')
    lines.append(f'  <meta name="twitter:image" content="{image}">')
    lines.append('  <script type="application/ld+json">')
    lines.append("  " + jsonld(page["jsonld"], page, base))
    lines.append("  </script>")
    lines.append(END)
    return "\n".join(lines)


def main() -> None:
    base = site_base()
    for page in PAGES:
        path = os.path.join(ROOT, page["file"])
        with open(path, "r", encoding="utf-8", newline="") as fh:
            text = fh.read()
        new_block = block(page, base, PAGES).replace("\n", "\r\n")
        if START in text and END in text:
            start = text.index(START)
            end = text.index(END) + len(END)
            text = text[:start] + new_block + text[end:]
        else:
            text = text.replace("</head>", new_block + "\r\n</head>", 1)
        with open(path, "w", encoding="utf-8", newline="") as fh:
            fh.write(text)
        print(f"{page['file']}: seo block ok")


if __name__ == "__main__":
    main()
