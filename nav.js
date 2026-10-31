"use strict";

/* Единый источник шапки сайта.
   Подключается на всех страницах, чтобы меню не расходилось.
   Чтобы поменять пункт меню — правь LABELS и TARGETS здесь, в одном месте. */

(function (global) {
  var MAIN_PAGE = { ru: "index.html", en: "index-en.html", uk: "index-uk.html" };

  /* Подписи пунктов. Порядок одинаковый во всех языках. */
  var LABELS = {
    ru: ["Концепция", "Техника", "Медитации и техники успокоения", "Контакты"],
    en: ["Concept", "Technique", "Meditations and calming techniques", "Contact"],
    uk: ["Концепція", "Техніка", "Медитації й техніки заспокоєння", "Контакти"]
  };

  /* Куда ведёт каждый пункт: якорь на главной или отдельная страница. */
  var TARGETS = ["#concept", "#technique", "meditations.html", "#contact"];

  function items(lang, fromMeditations) {
    var key = LABELS[lang] ? lang : "ru";
    var base = MAIN_PAGE[key];
    return TARGETS.map(function (target, index) {
      var href = target;
      if (fromMeditations && target.charAt(0) === "#") href = base + target;
      return {
        label: LABELS[key][index],
        href: href,
        current: fromMeditations && target === "meditations.html"
      };
    });
  }

  function render(list, options) {
    if (!list) return null;
    var opts = options || {};
    var lang = opts.lang || document.documentElement.lang || "ru";
    var fromMeditations = !!opts.fromMeditations;

    list.textContent = "";
    items(lang, fromMeditations).forEach(function (item) {
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

  global.NOMNav = { labels: LABELS, targets: TARGETS, items: items, render: render };

  /* На статических страницах меню рисуется сразу после загрузки файла. */
  if (!document.getElementById("meditations-content")) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", renderSelf);
    } else {
      renderSelf();
    }
  }
})(window);
