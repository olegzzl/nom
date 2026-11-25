# -*- coding: utf-8 -*-
"""РЎР±РѕСЂРєР° СЃС‚СЂР°РЅРёС† РјРµРґРёС‚Р°С†РёР№ РёР· content/ru.py, content/uk.py, content/en.py.

Р—Р°РїСѓСЃРє:  python tools/build_meditations.py

РџРёС€РµС‚ meditations.html, meditations-uk.html, meditations-en.html.
РўРµРєСЃС‚С‹ Р¶РёРІСѓС‚ С‚РѕР»СЊРєРѕ РІ content/*.py: РїСЂР°РІСЊС‚Рµ РёС… Рё РїРµСЂРµСЃРѕР±РёСЂР°Р№С‚Рµ СЃС‚СЂР°РЅРёС†С‹.
Р•СЃР»Рё РІ site.json Р·Р°РїРѕР»РЅРµРЅ base_url, РґРѕР±Р°РІР»СЏСЋС‚СЃСЏ canonical, hreflang,
Р°Р±СЃРѕР»СЋС‚РЅС‹Рµ OG-Р°РґСЂРµСЃР° Рё sitemap.xml.
"""

from __future__ import annotations

import html
import importlib.util
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")
SITE_FILE = os.path.join(ROOT, "site.json")
STYLE_VERSION = "26"

SOCIALS = """      <nav class="social social--header" aria-label="РЎРѕС†СЃРµС‚Рё РІ С€Р°РїРєРµ">
        <a href="https://www.youtube.com/@spokum" target="_blank" rel="noopener noreferrer" title="YouTube - @spokum" aria-label="YouTube - @spokum"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        <a href="https://www.facebook.com/spokum.space" target="_blank" rel="noopener noreferrer" title="Facebook - spokum.space" aria-label="Facebook - spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg></a>
        <a href="https://www.tiktok.com/@spokum.space" target="_blank" rel="noopener noreferrer" title="TikTok - @spokum.space" aria-label="TikTok - @spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
        <a href="https://www.instagram.com/spokum.space/" target="_blank" rel="noopener noreferrer" title="Instagram - spokum.space" aria-label="Instagram - spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg></a>
      </nav>"""

HEADER_TG = """      <a class="header-tg" href="https://t.me/spokum_chat" target="_blank" rel="noopener noreferrer" title="Telegram - @spokum_chat" aria-label="Telegram-чат сообщества"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg></a>"""

LANG_FILES = [("ru", "meditations.html", "RU"), ("uk", "meditations-uk.html", "UA"), ("en", "meditations-en.html", "EN")]

# РїРѕСЂСЏРґРѕРє РєРЅРѕРїРѕРє РІ С€Р°РїРєРµ: СѓРєСЂР°РёРЅСЃРєР°СЏ, СЂСѓСЃСЃРєР°СЏ, Р°РЅРіР»РёР№СЃРєР°СЏ
LANG_ORDER = ["ru", "uk", "en"]

MENU_SCRIPT = """  <script src="nav.js?v=2"></script>
  <script>
    (function () {
      var toggle = document.getElementById("menu-toggle");
      var nav = document.getElementById("primary-nav");
      if (!toggle || !nav) return;
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "%(close)s" : "%(open)s");
        nav.classList.toggle("is-open", open);
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          toggle.setAttribute("aria-label", "%(open)s");
          nav.classList.remove("is-open");
        });
      });
    })();
  </script>"""


def esc(text: str) -> str:
    return html.escape(text, quote=False)


def attr(text: str) -> str:
    return html.escape(text, quote=True)


def load(code: str) -> dict:
    path = os.path.join(CONTENT, f"{code}.py")
    spec = importlib.util.spec_from_file_location(f"content_{code}", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.LANG


def site_config() -> dict:
    if not os.path.exists(SITE_FILE):
        return {"base_url": "", "name": "Neo Orbital Meditation"}
    with open(SITE_FILE, "r", encoding="utf-8") as fh:
        return json.load(fh)


def language_switch(active: str, base_url: str) -> str:
    files = {code: (file, label) for code, file, label in LANG_FILES}
    items = []
    for code in LANG_ORDER:
        file, label = files[code]
        current = ' aria-current="page"' if code == active else ""
        items.append(f'        <a href="{file}" hreflang="{code}" lang="{code}"{current}>{label}</a>')
    return (
        '      <div class="language-switch" role="group" aria-label="Language / РЇР·С‹Рє">\n'
        + "\n".join(items)
        + "\n      </div>"
    )


def practice_html(practice: dict, copy: dict, index: int) -> str:
    ui = copy["ui"]
    flip = " practice--flip" if index % 2 == 1 else ""
    origin = "\n".join(f"            <p>{esc(p)}</p>" for p in practice["origin"])
    how = "\n".join(f"            <p>{esc(p)}</p>" for p in practice["how"])
    steps = "\n".join(f"              <li>{esc(s)}</li>" for s in practice["steps"])
    progress = "\n".join(f"              <li>{esc(p)}</li>" for p in practice["progress"])
    level = ui.get(f'level_{practice["level"]}', practice["level"])

    return f"""          <article class="practice{flip}" id="{practice['id']}" aria-labelledby="{practice['id']}-title">
            <figure class="practice-media">
              <img src="assets/meditations/{practice['image']}-700.webp"
                   srcset="assets/meditations/{practice['image']}-700.webp 700w, assets/meditations/{practice['image']}-1400.webp 1400w"
                   sizes="(max-width: 900px) 100vw, 520px" width="1400" height="1050"
                   alt="{attr(practice['alt'])}" loading="lazy" decoding="async">
            </figure>
            <div class="practice-body">
              <p class="practice-kicker">{practice['num']} / {esc(practice['kicker'])}</p>
              <h3 id="{practice['id']}-title">{esc(practice['name'])}</h3>
              <p class="practice-lead">{esc(practice['lead'])}</p>
            <div class="practice-prose">
{origin}
            </div>
              <h4 class="practice-sub">{esc(ui['how_inner_title'])}</h4>
            <div class="practice-prose practice-prose--how">
{how}
            </div>
              <h4 class="practice-sub">{esc(ui['steps_title'])}</h4>
              <ol class="steps">
{steps}
              </ol>
              <div class="practice-progress">
                <h4 class="practice-sub">{esc(ui['progress_title'])}</h4>
                <ul class="progress-list">
{progress}
                </ul>
              </div>
              <p class="practice-meta">
                <span>{esc(ui['time_label'])}: {esc(practice['time'])}</span>
                <span>{esc(ui['place_label'])}: {esc(practice['place'])}</span>
                <span>{esc(ui['level_label'])}: {esc(level)}</span>
              </p>
            </div>
          </article>"""


def groups_html(copy: dict) -> str:
    out = []
    counter = 0
    for group in copy["groups"]:
        articles = "\n".join(practice_html(p, copy, counter + i) for i, p in enumerate(group["practices"]))
        counter += len(group["practices"])
        out.append(f"""        <section class="practice-group" id="{group['id']}" aria-labelledby="{group['id']}-title">
          <header class="group-head">
            <span class="group-num">{group['num']}</span>
            <h2 id="{group['id']}-title">{esc(group['title'])}</h2>
            <p class="group-sub">{esc(group['subtitle'])}</p>
          </header>
{articles}
        </section>""")
    return "\n\n".join(out)


def index_html(copy: dict) -> str:
    items = []
    for group in copy["groups"]:
        for p in group["practices"]:
            items.append(
                f'            <li><a class="med-index-link" href="#{p["id"]}">'
                f'<span class="med-index-num">{p["num"]}</span>'
                f'<span class="med-index-name">{esc(p["name"])}</span></a></li>'
            )
    return "\n".join(items)


def how_html(copy: dict) -> str:
    cards = "\n".join(
        f'          <li class="how-card"><h3>{esc(c["t"])}</h3><p>{esc(c["d"])}</p></li>'
        for c in copy["ui"]["how"]
    )
    return cards


def faq_html(copy: dict) -> str:
    items = []
    for item in copy["ui"]["faq"]:
        items.append(
            f"""          <details class="faq-item">
            <summary>{esc(item['q'])}</summary>
            <p>{esc(item['a'])}</p>
          </details>"""
        )
    return "\n".join(items)


def jsonld(copy: dict, config: dict, exercises: list[str]) -> str:
    base = config.get("base_url", "").rstrip("/")
    code = copy["code"]
    page = f"{base}/{copy['file']}" if base else ""
    og = f"{base}/assets/og/meditations-{code}.jpg" if base else f"assets/og/meditations-{code}.jpg"
    hashes = [p["id"] for g in copy["groups"] for p in g["practices"]]

    organization = {
        "@type": "Organization",
        "@id": f"{base}/#organization" if base else "#organization",
        "name": copy["ui"]["footer_brand"],
        "alternateName": ["NOM", "Неоорбитальная медитация", "Неоорбітальна медитація"],
        "url": base + "/" if base else "",
        "logo": {"@type": "ImageObject", "url": f"{base}/assets/logo-your-mind.webp" if base else "assets/logo-your-mind.webp"},
        "email": "olegzzl@zohomail.eu",
        "sameAs": [
            "https://www.youtube.com/@spokum",
            "https://www.facebook.com/spokum.space",
            "https://www.tiktok.com/@spokum.space",
            "https://www.instagram.com/spokum.space/",
            "https://t.me/spokum_chat",
        ],
    }

    website = {
        "@type": "WebSite",
        "@id": f"{base}/#website" if base else "#website",
        "name": copy["ui"]["footer_brand"],
        "inLanguage": ["ru", "uk", "en"],
    }
    if base:
        website["url"] = base + "/"
    website["publisher"] = {"@id": organization["@id"]}

    collection = {
        "@type": "CollectionPage",
        "@id": page + "#page" if page else "#page",
        "name": copy["meta"]["title"],
        "description": copy["meta"]["description"],
        "inLanguage": code,
        "isPartOf": {"@id": website["@id"]},
        "publisher": {"@id": organization["@id"]},
        "primaryImageOfPage": {"@type": "ImageObject", "url": og, "width": 1200, "height": 630},
        "mainEntity": {"@id": "#practice-list"},
    }
    if page:
        collection["url"] = page

    item_list = {
        "@type": "ItemList",
        "@id": "#practice-list",
        "name": copy["ui"]["h1"],
        "numberOfItems": len(exercises),
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": i + 1,
                "name": name,
                "url": (page + "#" + hashes[i]) if page else "#" + hashes[i],
            }
            for i, name in enumerate(exercises)
        ],
    }

    breadcrumb = {
        "@type": "BreadcrumbList",
        "@id": "#breadcrumbs",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": copy["ui"]["home"]},
            {"@type": "ListItem", "position": 2, "name": copy["ui"]["h1"]},
        ],
    }
    if base:
        breadcrumb["itemListElement"][0]["item"] = base + "/"
        breadcrumb["itemListElement"][1]["item"] = page

    faq = {
        "@type": "FAQPage",
        "@id": "#faq",
        "inLanguage": code,
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["q"],
                "acceptedAnswer": {"@type": "Answer", "text": item["a"]},
            }
            for item in copy["ui"]["faq"]
        ],
    }

    data = {"@context": "https://schema.org", "@graph": [organization, website, collection, item_list, breadcrumb, faq]}
    return json.dumps(data, ensure_ascii=False, indent=2)


def page(copy: dict, config: dict) -> str:
    ui = copy["ui"]
    code = copy["code"]
    base = config.get("base_url", "").rstrip("/")
    page_url = f"{base}/{copy['file']}" if base else ""
    og_image = f"{base}/assets/og/meditations-{code}.jpg" if base else f"assets/og/meditations-{code}.jpg"

    alternates = []
    if base:
        alternates.append(f'  <link rel="canonical" href="{page_url}">')
        for alt_code, alt_file, _ in LANG_FILES:
            alternates.append(f'  <link rel="alternate" hreflang="{alt_code}" href="{base}/{alt_file}">')
        alternates.append(f'  <link rel="alternate" hreflang="x-default" href="{base}/meditations.html">')

    exercises = [p["name"] for g in copy["groups"] for p in g["practices"]]
    hashes = [p["id"] for g in copy["groups"] for p in g["practices"]]

    meta_extra = "\n".join(alternates)
    keywords_meta = (
        f'  <meta name="keywords" content="{attr(copy["meta"]["keywords"])}">'
        if copy["meta"].get("keywords") else ""
    )
    og_url = f'\n  <meta property="og:url" content="{page_url}">' if page_url else ""

    return f"""<!doctype html>
<html lang="{code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#061f30">
  <meta name="color-scheme" content="dark">
  <meta name="format-detection" content="telephone=no">
  <title>{esc(copy['meta']['title'])}</title>
  <meta name="description" content="{attr(copy['meta']['description'])}">
{keywords_meta}
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="google-site-verification" content="X3x_r4cE2_QVfyAKcidiihhfKGlvc1Is_DU5hhui4Nc">
  <link rel="icon" href="assets/neo-orbital-enso-header.webp" type="image/webp">
  <link rel="preload" href="assets/neo-orbital-enso-header.webp" as="image" type="image/webp">
{meta_extra}
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="{esc(ui['footer_brand'])}">
  <meta property="og:locale" content="{'ru_RU' if code == 'ru' else 'uk_UA' if code == 'uk' else 'en_US'}">
  <meta property="og:title" content="{attr(copy['meta']['og_title'])}">
  <meta property="og:description" content="{attr(copy['meta']['og_desc'])}">{og_url}
  <meta property="og:image" content="{og_image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{attr(copy['meta']['og_title'])}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{attr(copy['meta']['og_title'])}">
  <meta name="twitter:description" content="{attr(copy['meta']['og_desc'])}">
  <meta name="twitter:image" content="{og_image}">
  <link rel="stylesheet" href="styles.css?v={STYLE_VERSION}">
  <script type="application/ld+json">
{jsonld(copy, config, exercises)}
  </script>
</head>
<body class="page-meditations">
  <a class="skip-link" id="skip" href="#meditations-content">{esc(ui['skip'])}</a>

  <header class="site-header">
    <a class="brand" href="{'index.html' if code == 'ru' else 'index-' + code + '.html'}" aria-label="{attr(ui['brand_home'])}">
      <span>N</span><span class="brand-orbit">O</span><span>M</span>
    </a>
    <nav class="primary-nav" id="primary-nav" aria-label="{attr(ui['nav_label'])}">
      <ul id="nav-list"></ul>
    </nav>
    <div class="header-actions">
{language_switch(code, base)}
{HEADER_TG}
{SOCIALS}
      <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="{attr(ui['menu_open'])}">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main id="meditations-content">
    <section class="med-hero" aria-labelledby="med-title">
      <div class="med-hero-art" aria-hidden="true">
        <img src="assets/neo-orbital-enso-header.webp" alt="" width="1024" height="1024" fetchpriority="high">
      </div>
      <div class="med-hero-copy">
        <p class="eyebrow">{esc(ui['eyebrow'])}</p>
        <h1 id="med-title">{esc(ui['h1'])}</h1>
        <p class="med-hero-lead">{esc(ui['lead'])}</p>
        <div class="hero-rule" aria-hidden="true"></div>
      </div>
    </section>

    <div class="page-content">
      <section class="med-index-section" aria-labelledby="med-index-title">
        <h2 class="med-index-title" id="med-index-title">{esc(ui['index_title'])}</h2>
        <ul class="med-index" id="med-index">
{index_html(copy)}
        </ul>
      </section>

      <section class="med-how" id="how" aria-labelledby="how-title">
        <p class="section-kicker">{esc(ui['how_kicker'])}</p>
        <h2 id="how-title">{esc(ui['how_title'])}</h2>
        <p class="med-how-lead">{esc(ui['how_lead'])}</p>
        <ul class="how-list">
{how_html(copy)}
        </ul>
      </section>

      <section class="med-evidence" aria-labelledby="evidence-title">
        <div class="med-evidence-inner">
          <p class="section-kicker">{esc(ui['evidence_kicker'])}</p>
          <h2 id="evidence-title">{esc(ui['evidence_title'])}</h2>
          {"".join(f'<p>{esc(p)}</p>' for p in ui['evidence'])}
        </div>
      </section>

      <div id="med-groups">
{groups_html(copy)}
      </div>

      <section class="med-faq" aria-labelledby="faq-title">
        <p class="section-kicker">{esc(ui['faq_kicker'])}</p>
        <h2 id="faq-title">{esc(ui['faq_title'])}</h2>
        <div class="faq-list">
{faq_html(copy)}
        </div>
      </section>

      <section class="med-closing" aria-labelledby="closing-title">
        <p class="section-kicker">{esc(ui['closing_kicker'])}</p>
        <h2 id="closing-title">{esc(ui['closing_title'])}</h2>
        <p class="lead">{esc(ui['closing_text'])}</p>
        <p class="med-disclaimer">{esc(ui['disclaimer'])}</p>
      </section>

      <section class="manifest-section" id="contact" aria-labelledby="manifest-text">
        <div class="manifest-banner">
          <p class="manifest-text" id="manifest-text">{esc(ui['manifest'])}</p>
        </div>
        <div class="contact-email-wrap">
          <span class="contact-email-label">Email:</span>
          <a class="contact-email-link" href="mailto:olegzzl@zohomail.eu">olegzzl@zohomail.eu</a>
        </div>
      </section>
    </div>
  </main>

  <footer class="site-footer">
    <a class="footer-brand" href="{'index.html' if code == 'ru' else 'index-' + code + '.html'}">{esc(ui['footer_brand'])}</a>
    <p class="footer-note">{esc(ui['footer_note'])}</p>
    <nav class="social social--footer" aria-label="РЎРѕС†СЃРµС‚Рё РІ РїРѕРґРІР°Р»Рµ">
      <a href="https://www.youtube.com/@spokum" target="_blank" rel="noopener noreferrer" title="YouTube - @spokum" aria-label="YouTube - @spokum"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
      <a href="https://www.facebook.com/spokum.space" target="_blank" rel="noopener noreferrer" title="Facebook - spokum.space" aria-label="Facebook - spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg></a>
      <a href="https://www.tiktok.com/@spokum.space" target="_blank" rel="noopener noreferrer" title="TikTok - @spokum.space" aria-label="TikTok - @spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
      <a href="https://www.instagram.com/spokum.space/" target="_blank" rel="noopener noreferrer" title="Instagram - spokum.space" aria-label="Instagram - spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg></a>
    </nav>
    <a class="back-to-top" href="#meditations-content" aria-label="{attr(ui['top'])}">↑</a>
  </footer>

{MENU_SCRIPT % {'open': ui['menu_open'], 'close': ui['menu_close']}}
</body>
</html>
"""


def write_sitemap(config: dict) -> None:
    base = config.get("base_url", "").rstrip("/")
    robots = ["User-agent: *", "Allow: /", ""]
    if not base:
        robots.append("# sitemap.xml РїРѕСЏРІРёС‚СЃСЏ Р·РґРµСЃСЊ, РєРѕРіРґР° РІ site.json Р±СѓРґРµС‚ СѓРєР°Р·Р°РЅ base_url")
        with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8", newline="\n") as fh:
            fh.write("\n".join(robots) + "\n")
        print("sitemap: base_url РЅРµ Р·Р°РґР°РЅ РІ site.json, С„Р°Р№Р» РЅРµ СЃРѕР·РґР°РЅ")
        return
    pages = [("", ["ru", "uk", "en"]), ("meditations.html", ["ru"]), ("meditations-uk.html", ["uk"]), ("meditations-en.html", ["en"]), ("suminigashi.html", ["ru"])]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.w3.org/1999/sitemap" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for page, langs in pages:
        loc = f"{base}/{page}" if page else f"{base}/"
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        for lang in langs:
            alt = f"{base}/{page}" if page else f"{base}/"
            lines.append(f'    <xhtml:link rel="alternate" hreflang="{lang}" href="{alt}"/>')
        lines.append("  </url>")
    lines.append("</urlset>")
    with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines) + "\n")
    robots.append(f"Sitemap: {base}/sitemap.xml")
    with open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(robots) + "\n")
    print("sitemap.xml + robots.txt written")


def main() -> None:
    config = site_config()
    for code, _, _ in LANG_FILES:
        copy = load(code)
        output = page(copy, config)
        path = os.path.join(ROOT, copy["file"])
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(output)
        print(f"{copy['file']}: {len(output)} bytes")
    # sitemap.xml, robots.txt и .nojekyll собирает tools/seo_patch.py
    print("sitemap: запустите python tools/seo_patch.py")


if __name__ == "__main__":
    main()
