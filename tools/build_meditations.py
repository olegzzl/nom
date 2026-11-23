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
STYLE_VERSION = "20"

SOCIALS = """      <nav class="social social--header" aria-label="РЎРѕС†СЃРµС‚Рё РІ С€Р°РїРєРµ">
        <a href="https://www.youtube.com/@spokum" target="_blank" rel="noopener noreferrer" title="YouTube - @spokum" aria-label="YouTube - @spokum"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg></a>
        <a href="https://www.facebook.com/spokum.space" target="_blank" rel="noopener noreferrer" title="Facebook - spokum.space" aria-label="Facebook - spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.9 20v-7.8h2.6l.4-3h-3V9.3c0-.9.25-1.5 1.55-1.5h1.65V5.1c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.03H7v3h2.55V22h3.35Z"/></svg></a>
        <a href="https://www.tiktok.com/@spokum.space" target="_blank" rel="noopener noreferrer" title="TikTok - @spokum.space" aria-label="TikTok - @spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16.6 3h-2.7v12.2c0 1.2-.75 2-1.85 2-1 0-1.8-.7-1.8-1.7 0-1.1.9-1.7 2.1-1.5v-2.8c-2.8-.1-4.8 1.7-4.8 4.3 0 2.5 1.9 4.3 4.4 4.3 2.7 0 4.6-2 4.6-4.7V9.9c1 .6 2.1.9 3.3.8V8c-1.9-.3-3-1.7-3.3-3.6V3Z"/></svg></a>
        <a href="https://www.instagram.com/spokum.space/" target="_blank" rel="noopener noreferrer" title="Instagram - spokum.space" aria-label="Instagram - spokum.space"><svg viewBox="0 0 24 24" style="fill:none" stroke="currentColor" stroke-width="1.9" aria-hidden="true" focusable="false"><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none"/></svg></a>
      </nav>"""

HEADER_TG = """      <a class="header-tg" href="https://t.me/spokum_chat" target="_blank" rel="noopener noreferrer" title="Telegram - @spokum_chat" aria-label="Telegram-чат сообщества"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .26Z"/></svg></a>"""

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
        "name": "Neo Orbital Meditation",
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
        "name": "Neo Orbital Meditation",
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
  <meta property="og:site_name" content="Neo Orbital Meditation">
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
      <a href="https://www.youtube.com/@spokum" target="_blank" rel="noopener noreferrer" title="YouTube - @spokum" aria-label="YouTube - @spokum"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg></a>
      <a href="https://www.facebook.com/spokum.space" target="_blank" rel="noopener noreferrer" title="Facebook - spokum.space" aria-label="Facebook - spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.9 20v-7.8h2.6l.4-3h-3V9.3c0-.9.25-1.5 1.55-1.5h1.65V5.1c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2v2.03H7v3h2.55V22h3.35Z"/></svg></a>
      <a href="https://www.tiktok.com/@spokum.space" target="_blank" rel="noopener noreferrer" title="TikTok - @spokum.space" aria-label="TikTok - @spokum.space"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16.6 3h-2.7v12.2c0 1.2-.75 2-1.85 2-1 0-1.8-.7-1.8-1.7 0-1.1.9-1.7 2.1-1.5v-2.8c-2.8-.1-4.8 1.7-4.8 4.3 0 2.5 1.9 4.3 4.4 4.3 2.7 0 4.6-2 4.6-4.7V9.9c1 .6 2.1.9 3.3.8V8c-1.9-.3-3-1.7-3.3-3.6V3Z"/></svg></a>
      <a href="https://www.instagram.com/spokum.space/" target="_blank" rel="noopener noreferrer" title="Instagram - spokum.space" aria-label="Instagram - spokum.space"><svg viewBox="0 0 24 24" style="fill:none" stroke="currentColor" stroke-width="1.9" aria-hidden="true" focusable="false"><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none"/></svg></a>
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
