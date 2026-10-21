"use strict";

const pages = {
  en: {
    title: "Neo Orbital Meditation",
    tagline: "Ancient Practice, Modern Peace",
    eyebrow: "The practice",
    introTitle: "Quiet in the mind",
    welcome: "Welcome. This is a place for those who are tired of the endless stream of thoughts and want to finally hear the silence within.",
    paragraphs: [
      "Neo Orbital Meditation (NOM) is an original practice rooted in the ancient idea of the “Microcosmic Orbit.” It preserves what matters most: the gentle movement of attention around the body in a circle, without haste or effort. And it adds what was missing: a mantra.",
      "Usually, when we try to guide our attention through the body, the mind carries on with a life of its own. It throws up thoughts, clings to pleasant sensations and leads us astray. A mantra changes this. It gently overloads the brain’s habitual background mode—that inner chatter—and shifts the mind into a different state. Attention moves, and thoughts grow quiet. You become fully immersed in the process."
    ],
    mantraTitle: "A word that is yours alone",
    mantra: "The main secret of the practice lies in the mantra itself. It needs to be neutral: a word that evokes no images, memories or emotions. That is why there are no universal mantras here. The word is chosen individually, taking into account a person’s character, temperament and even the particularities of their speech. Over time, the person filters out what does not fit. What remains is a word that resonates with them alone. It is not shared with anyone: this keeps it clear and free of associations.",
    benefitsTitle: "What the practice offers",
    benefits: ["A pause in unnecessary thoughts and clarity of mind", "Deep relaxation of the body", "A gentle, flowing movement of energy through the body", "Concentration without strain"],
    closing: "The practice is simple and accessible to everyone. All you need is quiet, a comfortable position and a willingness to try.",
    manifest: "Created for those who are tired of anxiety, want to quickly calm down, reset the mind, and relax the body without spending hours in the lotus position — practicing a proven method here and now.",
    heroButtons: ["Mindful Breathing", "Spinal Alignment", "Energetic Flow"],
    nav: ["The practice", "The mantra", "Benefits", "Contact"],
    footer: "Neo Orbital Meditation",
    skip: "Skip to content",
    practiceKicker: "Neo Orbital Meditation",
    mantraKicker: "At the heart of the practice",
    benefitsKicker: "Gently, without strain",
    footerNote: "A practice of quiet, attention and connection with the body.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    top: "Back to top"
  },
  ru: {
    title: "Неоорбитальная медитация",
    tagline: "Древняя практика. Современное спокойствие.",
    eyebrow: "О практике",
    introTitle: "Тишина в уме",
    welcome: "Добро пожаловать. Это место для тех, кто устал от бесконечного потока мыслей и хочет наконец услышать тишину внутри себя.",
    paragraphs: [
      "Неоорбитальная медитация (НОМ) — авторская практика, выросшая из древней идеи «Малой космической орбиты». В ней сохранено главное: плавное движение внимания по телу, по кругу, без спешки и усилий. И добавлено то, чего не хватало: мантра.",
      "Обычно, когда мы пытаемся вести внимание по телу, ум продолжает жить своей жизнью. Он подбрасывает мысли, цепляется за приятные ощущения, уводит в сторону. Мантра меняет это. Она мягко перегружает привычный фоновый режим мозга, ту самую внутреннюю болтовню, и переключает ум в другое состояние. Внимание движется, а мысли затихают. Ты оказываешься целиком внутри процесса."
    ],
    mantraTitle: "Слово только для тебя",
    mantra: "Главный секрет практики в самой мантре. Она должна быть нейтральной: словом, которое не вызывает ни образов, ни воспоминаний, ни эмоций. Поэтому универсальных мантр здесь не бывает. Слово подбирается индивидуально, с учетом характера, темперамента и даже особенностей речи, и человек постепенно сам отсеивает то, что не подходит. В итоге остается слово, которое звучит только для него. Его не называют никому: так оно остается чистым и ни с чем не связывается.",
    benefitsTitle: "Что дает практика",
    benefits: ["Остановку лишних мыслей и ясность в голове", "Глубокое расслабление тела", "Мягкое, плавное движение энергии по телу", "Концентрацию без напряжения"],
    manifest: "Сделано для тех, кто устал от тревог, хочет быстро успокоиться, перезагрузить ум, расслабить тело, не тратя на это долгие часы в позе лотоса, и хочет практиковать проверенный метод здесь и сейчас.",
    closing: "Практика проста и доступна каждому. Нужны только тишина, удобное положение и желание попробовать.",
    heroButtons: ["Осознанное дыхание", "Выравнивание позвоночника", "Поток энергии"],
    nav: ["О практике", "Мантра", "Преимущества", "Контакты"],
    footer: "Неоорбитальная медитация",
    skip: "Перейти к содержимому",
    practiceKicker: "Неоорбитальная медитация",
    mantraKicker: "Главное в практике",
    benefitsKicker: "Мягко и без напряжения",
    footerNote: "Практика тишины, внимания и контакта с телом.",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    top: "Наверх"
  }
};

const sections = {
  ru: [
    { id: "author", navLabel: "Об авторе", title: "Мой путь к простой практике", paragraphs: ["Меня зовут Олег. Я занимаюсь медитацией больше десяти лет. За это время я попробовал множество методов, соединял разные практики и искал подход, который был бы одновременно глубоким и несложным.", "Так появилась неоорбитальная медитация: сочетание мантры и плавного кругового движения внимания по телу. По моему опыту, именно это сочетание помогает меньше увлекаться потоком мыслей и полнее чувствовать тело.", "Мне важно, чтобы практика не превращалась в годы попыток разобраться в сложной теории. Я делюсь тем, к чему пришёл сам: простым подходом к внутренней тишине и внимательному контакту с телом."] },
    { id: "approach", navLabel: "Подход", title: "Без сложных поз и лишних усилий", paragraphs: ["Для этой практики не обязательно сидеть в позе лотоса. Её можно выполнять лёжа, сидя или стоя — в удобном для себя положении.", "В основе подхода — мантра и движение внимания. В моём опыте они дополняют друг друга: мысли постепенно успокаиваются, внимание возвращается к телу, а телесные ощущения становятся более заметными.", "Эту сторону практики я описываю как работу с энергией: мягкое движение, ощущаемое внутри тела. Это язык моего личного опыта, а не требование испытать какое-то определённое состояние."] },
    { id: "online", navLabel: "Онлайн", title: "Знакомство с практикой — онлайн", paragraphs: ["Сейчас я делюсь подходом и рекомендациями по практике только онлайн, без личных встреч.", "Здесь можно познакомиться с идеей неоорбитальной медитации, ролью мантры и движением внимания по телу. Для знакомства с подходом не нужно годами изучать теорию — важнее простота и готовность прислушаться к собственным ощущениям."] }
  ],
  en: [
    { id: "author", navLabel: "About Oleg", title: "My path to a simpler practice", paragraphs: ["My name is Oleg. I have been practising meditation for more than ten years. Along the way, I explored many methods, combined different practices and looked for an approach that could be both deep and uncomplicated.", "That search led to Neo Orbital Meditation: a combination of a mantra and the gentle, circular movement of attention through the body. In my experience, this combination helps me become less absorbed in the stream of thoughts and more aware of the body.", "I believe practice need not become years of trying to understand complex theory. I share what I have arrived at through my own exploration: a simple approach to inner quiet and an attentive connection with the body."] },
    { id: "approach", navLabel: "Approach", title: "No complicated poses. No forcing.", paragraphs: ["You do not have to sit in the lotus position. You can practise lying down, sitting or standing, in a position that feels comfortable for you.", "The approach brings together a mantra and the movement of attention. In my experience, they complement each other: thoughts gradually settle, attention returns to the body and physical sensations become more noticeable.", "I describe this aspect of the practice as working with energy: a gentle movement felt within the body. This is the language of my personal experience, not a requirement to reach a particular state."] },
    { id: "online", navLabel: "Online", title: "Explore the practice online", paragraphs: ["For now, I share this approach and practice recommendations entirely online, without in-person meetings.", "Here you can explore the idea behind Neo Orbital Meditation, the role of the mantra and the movement of attention through the body. Getting to know the approach does not require years of studying theory: simplicity and a willingness to notice your own experience matter more."] }
  ]
};

const contacts = { email: "olegzzl@zohomail.eu" };
const byId = (id) => document.getElementById(id);
const create = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function renderParagraphs(container, paragraphs) {
  container.replaceChildren();
  paragraphs.forEach((text) => container.append(create("p", "", text)));
}

function renderNav(lang, copy) {
  const navItems = [
    { href: "#practice", label: copy.nav[0] },
    { href: "#mantra", label: copy.nav[1] },
    { href: "#benefits", label: copy.nav[2] },
    ...sections[lang].map((section) => ({ href: `#${section.id}`, label: section.navLabel })),
    { href: "#contact", label: copy.nav[3] }
  ];
  const list = byId("nav-list");
  list.replaceChildren();
  navItems.forEach(({ href, label }) => {
    const li = create("li");
    const a = create("a", "", label);
    a.href = href;
    a.addEventListener("click", closeMenu);
    li.append(a);
    list.append(li);
  });
}

function renderHeroButtons(copy) {
  const targets = ["#practice", "#approach", "#benefits"];
  const group = byId("hero-buttons");
  group.replaceChildren();
  copy.heroButtons.forEach((label, index) => {
    const a = create("a", "hero-button", label);
    a.href = targets[index];
    group.append(a);
  });
}

function renderExtraSections(lang) {
  const holder = byId("extra-sections");
  holder.replaceChildren();
  sections[lang].forEach((section) => {
    const article = create("section", "extra-section");
    article.id = section.id;
    article.setAttribute("aria-labelledby", `${section.id}-title`);
    const kicker = create("p", "section-kicker", section.navLabel);
    const title = create("h2", "", section.title);
    title.id = `${section.id}-title`;
    const prose = create("div", "prose");
    renderParagraphs(prose, section.paragraphs);
    article.append(kicker, title, prose);
    holder.append(article);
  });
}

function closeMenu() {
  const toggle = byId("menu-toggle");
  const nav = byId("primary-nav");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", pages[currentLanguage].menuOpen);
  nav.classList.remove("is-open");
}

let currentLanguage = "ru";
function setLanguage(lang) {
  if (!pages[lang]) return;
  currentLanguage = lang;
  const copy = pages[lang];
  document.documentElement.lang = lang;
  document.title = copy.title;
  document.querySelector('meta[name="description"]').content = lang === "ru"
    ? "Неоорбитальная медитация — авторская практика внимания, мантры и внутренней тишины. Онлайн-знакомство с практикой Олега."
    : "Neo Orbital Meditation — an original practice of attention, mantra and inner quiet. Explore Oleg’s approach online.";
  byId("hero-title").textContent = copy.title;
  byId("hero-tagline").textContent = copy.tagline;
  byId("hero-eyebrow").textContent = copy.eyebrow;
  byId("intro-title").textContent = copy.introTitle;
  byId("welcome").textContent = copy.welcome;
  renderParagraphs(byId("intro-paragraphs"), copy.paragraphs);
  byId("mantra-title").textContent = copy.mantraTitle;
  byId("mantra-copy").textContent = copy.mantra;
  byId("benefits-title").textContent = copy.benefitsTitle;
  byId("benefits-list").replaceChildren(...copy.benefits.map((benefit) => create("li", "", benefit)));
  byId("practice-kicker").textContent = copy.practiceKicker;
  byId("mantra-kicker").textContent = copy.mantraKicker;
  byId("benefits-kicker").textContent = copy.benefitsKicker;
  const manifestEl = byId("manifest-text");
  if (manifestEl) manifestEl.textContent = copy.manifest;
  const emailEl = byId("contact-email");
  if (emailEl) {
    emailEl.textContent = contacts.email;
    emailEl.href = `mailto:${contacts.email}`;
  }
  byId("footer-brand").textContent = copy.footer;
  byId("footer-note").textContent = copy.footerNote;
  byId("skip").textContent = copy.skip;
  document.querySelector(".scroll-cue").setAttribute("aria-label", copy.nav[0]);
  document.querySelector(".back-to-top").setAttribute("aria-label", copy.top);
  document.querySelector(".primary-nav").setAttribute("aria-label", copy.nav[0]);
  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === lang;
    button.setAttribute("aria-pressed", String(active));
  });
  renderNav(lang, copy);
  renderHeroButtons(copy);
  renderExtraSections(lang);
  closeMenu();
  try { localStorage.setItem("nom-language", lang); } catch (_) { /* Local storage may be disabled. */ }
}

byId("menu-toggle").addEventListener("click", () => {
  const toggle = byId("menu-toggle");
  const nav = byId("primary-nav");
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? pages[currentLanguage].menuClose : pages[currentLanguage].menuOpen);
  nav.classList.toggle("is-open", open);
});
document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

let initialLanguage = "ru";
try {
  const savedLanguage = localStorage.getItem("nom-language");
  if (savedLanguage === "en" || savedLanguage === "ru") initialLanguage = savedLanguage;
} catch (_) { /* The default is Russian. */ }
setLanguage(initialLanguage);
