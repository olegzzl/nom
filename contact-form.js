"use strict";

/* Форма в контактном блоке.
   Бэкенда нет: по кнопке собираем письмо и открываем почтовый клиент
   с уже заполненными темой и текстом. Отправляет письмо сам человек. */

(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var EMAIL = "olegzzl@zohomail.eu";
  var status = form.querySelector(".form-status");

  function say(text) {
    if (status) status.textContent = text;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = (form.elements.name.value || "").trim();
    var message = (form.elements.message.value || "").trim();

    if (!name || !message) {
      say(form.dataset.errorText || "Заполните имя и сообщение.");
      return;
    }

    var subject = (form.dataset.subject || "Сообщение с сайта") + ": " + name;
    var body = name + "\n\n" + message;
    var href =
      "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = href;
    say(form.dataset.sentText || "Открываю почтовый клиент.");
  });
})();
