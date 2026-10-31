"use strict";

/* Единый источник шапки сайта.
   Подключается на всех страницах, чтобы меню не расходилось.
   Чтобы поменять пункт меню — правь LABELS и TARGETS здесь, в одном месте. */

(function (global) {
  var MAIN_PAGE = { ru: "index.html", en: "index-en.html", uk: "index-uk.html" };

  /* Подписи пунктов. Порядок одинаковый во всех языках.
     Suminigashi не переводится: страница так называется на любом языке. */
  var LABELS = {
    ru: ["О практике", "Техника", "Медитации и техники успокоения", "Suminigashi", "Контакты"],
    en: ["The practice", "Technique", "Meditations and calming techniques", "Suminigashi", "Contact"],
    uk: ["Про практику", "Техніка", "Медитації й техніки заспокоєння", "Suminigashi", "Контакти"]
  };

  /* Куда ведёт каждый пункт: якорь на главной или отдельная страница. */
  var TARGETS = ["#concept", "#technique", "meditations.html", "suminigashi.html", "#contact"];

  /* Текущая страница — по имени файла в адресе. На главной вернёт null. */
  function pageFile() {
    var file = (location.pathname.split("/").pop() || "").toLowerCase();
    return TARGETS.indexOf(file) >= 0 ? file : null;
  }

  function items(lang, currentPage) {
    var key = LABELS[lang] ? lang : "ru";
    var base = MAIN_PAGE[key];
    var secondary = !!currentPage;
    return TARGETS.map(function (target, index) {
      var href = target;
      if (secondary && target.charAt(0) === "#") href = base + target;
      return {
        label: LABELS[key][index],
        href: href,
        current: currentPage === target
      };
    });
  }

  function render(list, options) {
    if (!list) return null;
    var opts = options || {};
    var lang = opts.lang || document.documentElement.lang || "ru";
    /* fromMeditations оставляем для старых вызовов, current — универсальный */
    var current = opts.current !== undefined
      ? opts.current
      : (opts.fromMeditations ? "meditations.html" : pageFile());

    list.textContent = "";
    items(lang, current).forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      if (item.current) a.setAttribute("aria-current", "page");
      li.append(a);
      list.append(li);
    });
    return list;
  }

  function renderSelf() {
    render(document.getElementById("nav-list"), {});
  }

  /* Логотип в шапке: справа от NOM, ведёт на YouTube. */
  var YOUTUBE = "https://www.youtube.com/@spokum";

  function renderHeaderLogo() {
    var header = document.querySelector(".site-header");
    if (!header || header.querySelector(".brand-logo")) return;
    var brand = header.querySelector(".brand");
    if (!brand) return;

    var group = document.createElement("div");
    group.className = "brand-group";
    brand.parentNode.insertBefore(group, brand);
    group.append(brand);

    var link = document.createElement("a");
    link.className = "brand-logo";
    link.href = YOUTUBE;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "YouTube - @spokum";
    link.setAttribute("aria-label", "YouTube - @spokum");

    var img = document.createElement("img");
    img.src = "assets/logo-your-mind.webp";
    img.alt = "";
    img.width = 48;
    img.height = 48;
    img.decoding = "async";

    link.append(img);
    group.append(link);
  }

  function boot() {
    renderHeaderLogo();
    renderSelf();
  }

  global.NOMNav = { labels: LABELS, targets: TARGETS, items: items, render: render };

  if (document.getElementById("nav-list")) {
    /* список уже в разметке — рисуем сразу, чтобы обработчики страницы
       нашли готовые ссылки */
    boot();
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);
