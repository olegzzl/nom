# -*- coding: utf-8 -*-
"""SEO-разметка главной и Suminigashi + sitemap.xml/robots.txt.

Что делает:
  * вставляет в <head> canonical, hreflang, robots, keywords, Open Graph,
    Twitter Card и JSON-LD (Organization, WebSite, WebPage, FAQPage);
  * добавляет на главную блоки «Какие бывают медитации», сравнение с ТМ
    и частые вопросы из content/home_seo.py;
  * собирает sitemap.xml со всеми языковыми версиями и robots.txt.

Запуск:  python tools/seo_patch.py
"""

from __future__ import annotations

import html
import importlib.util
import json
import os
import re
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")
SITE_FILE = os.path.join(ROOT, "site.json")

HEAD_START = "  <!-- seo:start -->"
HEAD_END = "  <!-- seo:end -->"
GOOGLE_VERIFICATION = "X3x_r4cE2_QVfyAKcidiihhfKGlvc1Is_DU5hhui4Nc"
BODY_START = "      <!-- seo-content:start -->"
BODY_END = "      <!-- seo-content:end -->"
STYLE_VERSION = "21"

SOCIALS = [
    "https://www.youtube.com/@spokum",
    "https://www.facebook.com/spokum.space",
    "https://www.tiktok.com/@spokum.space",
    "https://www.instagram.com/spokum.space/",
    "https://t.me/spokum_chat",
]


def esc(text: str) -> str:
    return html.escape(text, quote=False)


def attr(text: str) -> str:
    return html.escape(text, quote=True)


def site_config() -> dict:
    with open(SITE_FILE, "r", encoding="utf-8") as fh:
        return json.load(fh)


def load_seo() -> dict:
    path = os.path.join(CONTENT, "home_seo.py")
    spec = importlib.util.spec_from_file_location("home_seo", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.SEO


def page_url(base: str, file: str) -> str:
    if file in ("index.html", ""):
        return base + "/"
    return f"{base}/{file}"


def organization(base: str) -> dict:
    return {
        "@type": "Organization",
        "@id": base + "/#organization",
        "name": "Neo Orbital Meditation",
        "alternateName": ["NOM", "Неоорбитальная медитация", "Неоорбітальна медитація"],
        "url": base + "/",
        "logo": {
            "@type": "ImageObject",
            "url": base + "/assets/logo-your-mind.webp",
        },
        "email": "olegzzl@zohomail.eu",
        "sameAs": SOCIALS,
    }


def website(base: str) -> dict:
    return {
        "@type": "WebSite",
        "@id": base + "/#website",
        "url": base + "/",
        "name": "Neo Orbital Meditation",
        "alternateName": "NOM",
        "inLanguage": ["ru", "uk", "en"],
        "publisher": {"@id": base + "/#organization"},
    }


def faq_node(page: dict) -> dict:
    node = {
        "@type": "FAQPage",
        "@id": "#faq",
        "inLanguage": page["lang"],
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["q"],
                "acceptedAnswer": {"@type": "Answer", "text": item["a"]},
            }
            for item in next(s for s in page["sections"] if s["kind"] == "faq")["items"]
        ],
    }
    return node


def web_page(page: dict, base: str) -> dict:
    url = page_url(base, page["file"])
    node = {
        "@type": "WebPage",
        "@id": url + "#webpage",
        "url": url,
        "name": page["title"],
        "description": page["description"],
        "inLanguage": page["lang"],
        "isPartOf": {"@id": base + "/#website"},
        "about": {"@type": "Thing", "name": "Медитация" if page["lang"] != "en" else "Meditation"},
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": f"{base}/assets/og/{page['image']}",
            "width": 1200,
            "height": 630,
        },
        "dateModified": date.today().isoformat(),
        "publisher": {"@id": base + "/#organization"},
    }
    if any(s["kind"] == "faq" for s in page["sections"]):
        node["mainEntity"] = {"@id": url + "#faq"}
    return node


def head_block(page: dict, base: str) -> str:
    url = page_url(base, page["file"])
    image = f"{base}/assets/og/{page['image']}"
    lines = [HEAD_START]
    lines.append('  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">')
    lines.append(f'  <meta name="google-site-verification" content="{GOOGLE_VERIFICATION}">')
    lines.append(f'  <link rel="canonical" href="{url}">')
    for code, file in (("ru", "index.html"), ("uk", "index-uk.html"), ("en", "index-en.html")):
        lines.append(f'  <link rel="alternate" hreflang="{code}" href="{page_url(base, file)}">')
    lines.append(f'  <link rel="alternate" hreflang="x-default" href="{base}/">')
    lines.append(f'  <meta name="keywords" content="{attr(", ".join(page["keywords"]))}">')
    lines.append('  <meta name="author" content="Neo Orbital Meditation">')
    lines.append('  <meta name="publisher" content="Neo Orbital Meditation">')
    lines.append('  <meta name="color-scheme" content="dark">')
    lines.append('  <meta property="og:type" content="website">')
    lines.append('  <meta property="og:site_name" content="Neo Orbital Meditation">')
    lines.append(f'  <meta property="og:locale" content="{page["locale"]}">')
    for code, locale in (("ru", "ru_RU"), ("uk", "uk_UA"), ("en", "en_US")):
        if code != page["lang"]:
            lines.append(f'  <meta property="og:locale:alternate" content="{locale}">')
    lines.append(f'  <meta property="og:title" content="{attr(page["og_title"])}">')
    lines.append(f'  <meta property="og:description" content="{attr(page["og_desc"])}">')
    lines.append(f'  <meta property="og:url" content="{url}">')
    lines.append(f'  <meta property="og:image" content="{image}">')
    lines.append('  <meta property="og:image:type" content="image/jpeg">')
    lines.append('  <meta property="og:image:width" content="1200">')
    lines.append('  <meta property="og:image:height" content="630">')
    lines.append(f'  <meta property="og:image:alt" content="{attr(page["og_title"])}">')
    lines.append('  <meta name="twitter:card" content="summary_large_image">')
    lines.append(f'  <meta name="twitter:title" content="{attr(page["og_title"])}">')
    lines.append(f'  <meta name="twitter:description" content="{attr(page["og_desc"])}">')
    lines.append(f'  <meta name="twitter:image" content="{image}">')

    graph = [organization(base), website(base), web_page(page, base)]
    if any(s["kind"] == "faq" for s in page["sections"]):
        graph.append(faq_node(page))
    data = {"@context": "https://schema.org", "@graph": graph}
    lines.append('  <script type="application/ld+json">')
    lines.append("  " + json.dumps(data, ensure_ascii=False, indent=2).replace("\n", "\n  "))
    lines.append("  </script>")
    lines.append(HEAD_END)
    return "\n".join(lines)


def render_sections(page: dict) -> str:
    out = [BODY_START]
    for section in page["sections"]:
        sid = {"types": "types", "lessons": "lessons", "compare": "comparison", "faq": "faq"}[section["kind"]]
        out.append(f'      <section class="chapter" id="{sid}" aria-labelledby="{sid}-title">')
        out.append('        <div class="chapter-head">')
        out.append(f'          <p class="chapter-num" aria-hidden="true">{section["num"]}</p>')
        out.append("          <div>")
        out.append(f'            <p class="section-kicker">{esc(section["kicker"])}</p>')
        out.append(f'            <h2 id="{sid}-title">{esc(section["title"])}</h2>')
        out.append(f'            <p class="chapter-lead">{esc(section["lead"])}</p>')
        out.append("          </div>")
        out.append("        </div>")
        out.append('        <div class="chapter-body">')

        if section["kind"] in ("types", "lessons"):
            out.append('          <ul class="type-list">')
            for item in section["items"]:
                out.append('            <li class="type-card">')
                if item.get("label"):
                    out.append(f'              <p class="practice-kicker">{esc(item["label"])}</p>')
                out.append(f'              <h3>{esc(item["title"])}</h3>')
                out.append(f'              <p>{esc(item["text"])}</p>')
                out.append(f'              <a class="text-link" href="{attr(item["href"])}">{esc(item["link"])}</a>')
                out.append("            </li>")
            out.append("          </ul>")
            out.append(f'          <p class="note">{esc(section["note"])}</p>')
            out.append(f'          <p class="seo-cta"><a class="text-link" href="{attr(section["cta_href"])}">{esc(section["cta"])}</a></p>')

        elif section["kind"] == "compare":
            for paragraph in section["paragraphs"]:
                out.append(f"          <p>{esc(paragraph)}</p>")
            table = section["table"]
            out.append('          <div class="compare-wrap">')
            out.append('            <table class="compare">')
            out.append(f'              <caption>{esc(table["caption"])}</caption>')
            out.append("              <thead><tr>")
            for cell in table["head"]:
                out.append(f'                <th scope="col">{esc(cell)}</th>')
            out.append("              </tr></thead>")
            out.append("              <tbody>")
            for row in table["rows"]:
                out.append("                <tr>")
                out.append(f'                  <th scope="row">{esc(row[0])}</th>')
                for cell in row[1:]:
                    out.append(f"                  <td>{esc(cell)}</td>")
                out.append("                </tr>")
            out.append("              </tbody>")
            out.append("            </table>")
            out.append("          </div>")
            out.append(f'          <p class="note">{esc(section["note"])}</p>')

        elif section["kind"] == "faq":
            out.append('          <div class="faq-list faq-list--home">')
            for item in section["items"]:
                out.append('            <details class="faq-item">')
                out.append(f'              <summary>{esc(item["q"])}</summary>')
                out.append(f'              <p>{esc(item["a"])}</p>')
                out.append("            </details>")
            out.append("          </div>")

        out.append("        </div>")
        out.append("      </section>")
        out.append("")
    out.append(BODY_END)
    return "\n".join(out)


def patch_home(path: str, page: dict, base: str) -> None:
    with open(path, "r", encoding="utf-8", newline="") as fh:
        text = fh.read()

    text = re.sub(r"<title>.*?</title>", f"<title>{esc(page['title'])}</title>", text, count=1, flags=re.S)
    text = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{attr(page["description"])}">',
        text,
        count=1,
    )

    block = head_block(page, base).replace("\n", "\r\n" if "\r\n" in text else "\n")
    if HEAD_START in text and HEAD_END in text:
        start = text.index(HEAD_START)
        end = text.index(HEAD_END) + len(HEAD_END)
        text = text[:start] + block + text[end:]
    else:
        text = text.replace("</head>", block + "\r\n</head>" if "\r\n" in text else block + "\n</head>", 1)

    body = render_sections(page).replace("\n", "\r\n" if "\r\n" in text else "\n")
    if BODY_START in text and BODY_END in text:
        start = text.index(BODY_START)
        end = text.index(BODY_END) + len(BODY_END)
        text = text[:start] + body + text[end:]
    else:
        marker = '      <section class="chapter chapter--closing" id="closing"'
        if marker not in text:
            raise SystemExit(f"{path}: не найден блок closing для вставки SEO-секций")
        text = text.replace(marker, body + ("\r\n" if "\r\n" in text else "\n") + marker, 1)

    # заключение становится одиннадцатой главой
    text = re.sub(
        r'(<section class="chapter chapter--closing" id="closing"[\s\S]{0,400}?<p class="chapter-num" aria-hidden="true">)\d+(</p>)',
        r"\g<1>12\g<2>",
        text,
        count=1,
    )

    text = re.sub(r"styles\.css\?v=\d+", f"styles.css?v={STYLE_VERSION}", text)

    with open(path, "w", encoding="utf-8", newline="") as fh:
        fh.write(text)


def patch_suminigashi(path: str, base: str) -> None:
    with open(path, "r", encoding="utf-8", newline="") as fh:
        text = fh.read()
    url = base + "/suminigashi.html"
    image = base + "/assets/og/suminigashi-ru.jpg"
    graph = [
        organization(base),
        website(base),
        {
            "@type": "WebPage",
            "@id": url + "#webpage",
            "url": url,
            "name": "Suminigashi: чернила на воде",
            "description": "Интерактивная практика: проведите по поверхности, и краска поплывёт кольцами и волокнами.",
            "inLanguage": "ru",
            "isPartOf": {"@id": base + "/#website"},
            "primaryImageOfPage": {"@type": "ImageObject", "url": image, "width": 1200, "height": 630},
            "dateModified": date.today().isoformat(),
        },
        {
            "@type": "BreadcrumbList",
            "@id": url + "#breadcrumbs",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Главная", "item": base + "/"},
                {"@type": "ListItem", "position": 2, "name": "Suminigashi", "item": url},
            ],
        },
    ]
    block = [
        HEAD_START,
        '  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
        f'  <meta name="google-site-verification" content="{GOOGLE_VERIFICATION}">',
        f'  <link rel="canonical" href="{url}">',
        f'  <meta name="keywords" content="{attr("suminigashi, суминагаши, чернила на воде, медитативная практика, арт-медитация, успокоение")}">',
        '  <meta name="author" content="Neo Orbital Meditation">',
        '  <meta property="og:type" content="website">',
        '  <meta property="og:site_name" content="Neo Orbital Meditation">',
        '  <meta property="og:locale" content="ru_RU">',
        '  <meta property="og:title" content="Suminigashi: чернила на воде">',
        '  <meta property="og:description" content="Интерактивная практика: проведите по поверхности, и краска поплывёт кольцами и волокнами.">',
        f'  <meta property="og:url" content="{url}">',
        f'  <meta property="og:image" content="{image}">',
        '  <meta property="og:image:type" content="image/jpeg">',
        '  <meta property="og:image:width" content="1200">',
        '  <meta property="og:image:height" content="630">',
        '  <meta property="og:image:alt" content="Suminigashi: чернила на воде">',
        '  <meta name="twitter:card" content="summary_large_image">',
        '  <meta name="twitter:title" content="Suminigashi: чернила на воде">',
        '  <meta name="twitter:description" content="Интерактивная практика: проведите по поверхности, и краска поплывёт кольцами и волокнами.">',
        f'  <meta name="twitter:image" content="{image}">',
        '  <script type="application/ld+json">',
        "  " + json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=2).replace("\n", "\n  "),
        "  </script>",
        HEAD_END,
    ]
    block_text = "\n".join(block).replace("\n", "\r\n" if "\r\n" in text else "\n")
    if HEAD_START in text and HEAD_END in text:
        start = text.index(HEAD_START)
        end = text.index(HEAD_END) + len(HEAD_END)
        text = text[:start] + block_text + text[end:]
    else:
        text = text.replace("</head>", block_text + ("\r\n" if "\r\n" in text else "\n") + "</head>", 1)
    text = re.sub(r"styles\.css\?v=\d+", f"styles.css?v={STYLE_VERSION}", text)
    with open(path, "w", encoding="utf-8", newline="") as fh:
        fh.write(text)


def write_sitemap(base: str) -> None:
    today = date.today().isoformat()
    groups = [
        ("", [("ru", ""), ("uk", "index-uk.html"), ("en", "index-en.html")]),
        ("meditations.html", [("ru", "meditations.html"), ("uk", "meditations-uk.html"), ("en", "meditations-en.html")]),
        ("suminigashi.html", [("ru", "suminigashi.html")]),
    ]
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    for default_file, langs in groups:
        default_loc = base + "/" if default_file == "" else f"{base}/{default_file}"
        for code, file in langs:
            loc = base + "/" if file == "" else f"{base}/{file}"
            lines.append("  <url>")
            lines.append(f"    <loc>{loc}</loc>")
            lines.append(f"    <lastmod>{today}</lastmod>")
            if len(langs) > 1:
                for alt_code, alt_file in langs:
                    alt = base + "/" if alt_file == "" else f"{base}/{alt_file}"
                    lines.append(f'    <xhtml:link rel="alternate" hreflang="{alt_code}" href="{alt}"/>')
                lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{default_loc}"/>')
            lines.append("  </url>")
    lines.append("</urlset>")
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines) + "\n")

    with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(["User-agent: *", "Allow: /", "", f"Sitemap: {base}/sitemap.xml"]) + "\n")

    open(os.path.join(ROOT, ".nojekyll"), "w", encoding="utf-8").close()
    print("sitemap.xml, robots.txt, .nojekyll: ok")


def main() -> None:
    config = site_config()
    base = config.get("base_url", "").rstrip("/")
    if not base:
        raise SystemExit("site.json: не задан base_url")
    seo = load_seo()
    for code in ("ru", "uk", "en"):
        page = seo[code]
        path = os.path.join(ROOT, page["file"])
        patch_home(path, page, base)
        print(f"{page['file']}: meta + SEO-секции ok")
    patch_suminigashi(os.path.join(ROOT, "suminigashi.html"), base)
    print("suminigashi.html: meta ok")
    write_sitemap(base)


if __name__ == "__main__":
    main()
