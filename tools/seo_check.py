# -*- coding: utf-8 -*-
"""Проверка SEO-разметки статического сайта.

Запуск:  python tools/seo_check.py

Проверяет заголовки и описания, canonical/hreflang, JSON-LD, один H1,
дубли id, alt у картинок, локальные ссылки и sitemap.xml.
"""

from __future__ import annotations

import json
import os
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from urllib.parse import urlparse

from lxml import html as lxml_html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = [
    "index.html",
    "index-uk.html",
    "index-en.html",
    "meditations.html",
    "meditations-uk.html",
    "meditations-en.html",
    "suminigashi.html",
]
BASE = "https://neorbital.vercel.app"

errors: list[str] = []
warnings: list[str] = []


def text_of(node) -> str:
    return " ".join(node.text_content().split()) if node is not None else ""


def local_from_url(url: str) -> str:
    if url == BASE + "/":
        return "index.html"
    if url.startswith(BASE + "/"):
        return url[len(BASE) + 1:]
    return ""


def check_page(name: str) -> None:
    path = os.path.join(ROOT, name)
    with open(path, "r", encoding="utf-8") as fh:
        raw = fh.read()
    doc = lxml_html.fromstring(raw)

    title = text_of(doc.find(".//title"))
    desc_node = doc.xpath('//meta[@name="description"]')
    desc = desc_node[0].get("content", "") if desc_node else ""
    if not title:
        errors.append(f"{name}: нет <title>")
    elif not (30 <= len(title) <= 65):
        warnings.append(f"{name}: title {len(title)} символов — {title}")
    if not desc:
        errors.append(f"{name}: нет meta description")
    elif not (70 <= len(desc) <= 175):
        warnings.append(f"{name}: description {len(desc)} символов")

    h1 = doc.xpath("//h1")
    if len(h1) != 1:
        errors.append(f"{name}: H1 найден {len(h1)} раз")

    ids = [el.get("id") for el in doc.xpath("//*[@id]")]
    dupes = [key for key, count in Counter(ids).items() if count > 1]
    if dupes:
        errors.append(f"{name}: дубли id — {', '.join(dupes)}")

    canonical = doc.xpath('//link[@rel="canonical"]')
    if len(canonical) != 1:
        errors.append(f"{name}: canonical найден {len(canonical)} раз")
    else:
        href = canonical[0].get("href", "")
        if not href.startswith("https://"):
            errors.append(f"{name}: canonical не абсолютный — {href}")
        current_canonical = href

        alternates = doc.xpath('//link[@rel="alternate"][@hreflang]')
        if name != "suminigashi.html":
            langs = {link.get("hreflang") for link in alternates}
            if not {"ru", "uk", "en", "x-default"}.issubset(langs):
                errors.append(f"{name}: неполный набор hreflang — {sorted(langs)}")
        lang = doc.get("lang", "ru")
        for link in alternates:
            target_url = link.get("href", "")
            target_file = local_from_url(target_url)
            if not target_file or not os.path.exists(os.path.join(ROOT, target_file)):
                errors.append(f"{name}: hreflang ведёт на несуществующий файл — {target_url}")
                continue
            with open(os.path.join(ROOT, target_file), "r", encoding="utf-8") as fh:
                target_raw = fh.read()
            back = f'hreflang="{lang}" href="{current_canonical}"'
            if back not in target_raw:
                errors.append(f"{name}: нет взаимного hreflang с {target_file}")

    og_image = doc.xpath('//meta[@property="og:image"]')
    if not og_image:
        errors.append(f"{name}: нет og:image")
    else:
        local_image = local_from_url(og_image[0].get("content", ""))
        if not local_image or not os.path.exists(os.path.join(ROOT, local_image)):
            errors.append(f"{name}: og:image не найден — {og_image[0].get('content')}")

    page_text = " ".join(text_of(doc).split())

    for img in doc.xpath("//img"):
        if img.get("alt") is None:
            errors.append(f"{name}: img без alt — {img.get('src')}")

    for link in doc.xpath("//a[@href]"):
        href = link.get("href", "")
        if not href or href.startswith(("#", "mailto:", "tel:", "http:", "https:", "javascript:")):
            continue
        target = href.split("#", 1)[0].split("?", 1)[0]
        if target and not os.path.exists(os.path.join(ROOT, target)):
            errors.append(f"{name}: битая ссылка — {href}")

    for script in doc.xpath('//script[@type="application/ld+json"]'):
        try:
            data = json.loads(script.text or "")
        except json.JSONDecodeError as exc:
            errors.append(f"{name}: JSON-LD не разбирается — {exc}")
            continue
        types = []
        graph = data.get("@graph", [data])
        for node in graph:
            types.append(node.get("@type"))
            if node.get("@type") == "FAQPage":
                for item in node.get("mainEntity", []):
                    question = item.get("name", "")
                    answer = item.get("acceptedAnswer", {}).get("text", "")
                    if question not in page_text:
                        errors.append(f"{name}: вопроса нет в тексте — {question[:60]}")
                    if answer and answer[:70] not in page_text:
                        errors.append(f"{name}: ответа нет в тексте — {answer[:60]}")
        print(f"  JSON-LD: {', '.join(str(t) for t in types)}")


def check_sitemap() -> None:
    path = os.path.join(ROOT, "sitemap.xml")
    if not os.path.exists(path):
        errors.append("sitemap.xml: файла нет")
        return
    tree = ET.parse(path)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9", "xhtml": "http://www.w3.org/1999/xhtml"}
    urls = tree.getroot().findall("sm:url", ns)
    print(f"  sitemap.xml: {len(urls)} URL")
    for url in urls:
        loc = url.findtext("sm:loc", namespaces=ns)
        if not loc or not loc.startswith(BASE):
            errors.append(f"sitemap.xml: плохой loc — {loc}")
        alternates = url.findall("xhtml:link", ns)
        if len(alternates) == 0 and not loc.endswith("suminigashi.html"):
            warnings.append(f"sitemap.xml: нет hreflang у {loc}")


def main() -> None:
    for name in PAGES:
        print(f"\n{name}")
        check_page(name)
    print("\nsitemap.xml")
    check_sitemap()

    if warnings:
        print("\nПРЕДУПРЕЖДЕНИЯ")
        for item in warnings:
            print(" -", item)
    if errors:
        print("\nОШИБКИ")
        for item in errors:
            print(" -", item)
        sys.exit(1)
    print("\nOK: ошибок нет.")


if __name__ == "__main__":
    main()
