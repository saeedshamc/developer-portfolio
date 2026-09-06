"use strict";

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

const STORAGE_KEY = "rtl-studio-lang";

const i18n = {
  en: {
    "meta.title": "RTL Studio | Developer Portfolio",
    "meta.description": "RTL Studio — Bilingual developer portfolio. Full-stack craft with FA/EN & RTL-first design.",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.role": "Full-Stack Developer · RTL & i18n Specialist",
    "hero.title": "Code that reads right — in every direction.",
    "hero.desc": "I build bilingual web products with polished RTL layouts, accessible interfaces, and production-grade full-stack architecture.",
    "hero.ctaProjects": "View Projects",
    "hero.ctaContact": "Get in Touch",
    "about.tag": "01 — About",
    "about.title": "Bridging languages, layouts, and logic.",
    "about.p1": "I'm a full-stack developer with 6+ years shipping web apps for Persian and English audiences. I care about typography rhythm, bidirectional CSS, and APIs that scale.",
    "about.p2": "From SaaS dashboards to e-commerce flows, I combine React, Node.js, and thoughtful i18n so every locale feels native — not translated as an afterthought.",
    "about.labelFocus": "Focus",
    "about.valueFocus": "RTL-first UI & bilingual products",
    "about.labelStack": "Stack",
    "about.valueStack": "React · Node.js · TypeScript · PostgreSQL",
    "about.labelBase": "Based",
    "about.valueBase": "Tehran · Remote worldwide",
    "skills.tag": "02 — Skills",
    "skills.title": "Full-stack craft with locale in mind.",
    "skills.c1.title": "Frontend & RTL",
    "skills.c1.desc": "Component systems, logical CSS properties, and locale-aware layouts that flip cleanly between LTR and RTL.",
    "skills.c2.title": "i18n & Design",
    "skills.c2.desc": "Translation workflows, font pairing, and UI patterns that respect Persian script and Latin typography side by side.",
    "skills.c3.title": "Backend & DevOps",
    "skills.c3.desc": "REST & GraphQL APIs, database design, caching, and containerized deployments on cloud infrastructure.",
    "projects.tag": "03 — Projects",
    "projects.title": "Selected work across locales.",
    "projects.p1.title": "Nava Commerce",
    "projects.p1.desc": "Bilingual e-commerce platform with RTL checkout, multi-currency support, and admin dashboard in FA/EN.",
    "projects.p2.title": "DirFlow CMS",
    "projects.p2.desc": "Headless CMS with automatic direction detection, content versioning, and Stripe billing for SaaS teams.",
    "projects.p3.title": "SignalBoard",
    "projects.p3.desc": "Real-time analytics dashboard with Persian date formatting, WebSocket feeds, and responsive RTL charts.",
    "contact.tag": "04 — Contact",
    "contact.title": "Let's build something bilingual.",
    "contact.desc": "Open to full-stack roles, RTL/i18n consulting, and product work that serves Persian-speaking markets.",
    "form.nameLabel": "Name",
    "form.namePlaceholder": "Your name",
    "form.emailLabel": "Email",
    "form.emailPlaceholder": "you@example.com",
    "form.messageLabel": "Message",
    "form.messagePlaceholder": "Tell me about your project…",
    "form.submit": "Send Message",
    "form.success": "Message sent — I'll get back to you soon.",
    "form.errorNameRequired": "Name is required.",
    "form.errorNameShort": "Name must be at least 2 characters.",
    "form.errorEmailRequired": "Email is required.",
    "form.errorEmailInvalid": "Enter a valid email address.",
    "form.errorMessageRequired": "Message is required.",
    "form.errorMessageShort": "Message must be at least 10 characters.",
    "footer.rights": "RTL Studio. Crafted with intent.",
    "aria.langToggle": "Switch language",
    "aria.navToggle": "Toggle navigation",
    "aria.avatar": "Profile photo"
  },
  fa: {
    "meta.title": "RTL Studio | پورتفولیوی توسعه‌دهنده",
    "meta.description": "RTL Studio — پورتفولیوی دوزبانه توسعه‌دهنده. مهندسی فول‌استک با طراحی FA/EN و RTL.",
    "nav.about": "درباره",
    "nav.skills": "مهارت‌ها",
    "nav.projects": "پروژه‌ها",
    "nav.contact": "تماس",
    "hero.role": "توسعه‌دهنده فول‌استک · متخصص RTL و i18n",
    "hero.title": "کدی که در هر جهتی درست خوانده می‌شود.",
    "hero.desc": "محصولات وب دوزبانه با چیدمان RTL دقیق، رابط کاربری در دسترس و معماری فول‌استک آماده تولید می‌سازم.",
    "hero.ctaProjects": "مشاهده پروژه‌ها",
    "hero.ctaContact": "ارتباط با من",
    "about.tag": "۰۱ — درباره",
    "about.title": "پل زدن میان زبان، چیدمان و منطق.",
    "about.p1": "من یک توسعه‌دهنده فول‌استک با بیش از ۶ سال تجربه در ساخت اپلیکیشن‌های وب برای مخاطبان فارسی و انگلیسی هستم. به ریتم تایپوگرافی، CSS دو‌جهته و APIهای مقیاس‌پذیر اهمیت می‌دهم.",
    "about.p2": "از داشبوردهای SaaS تا جریان‌های فروشگاهی، React، Node.js و i18n آگاهانه را ترکیب می‌کنم تا هر زبان بومی احساس شود — نه ترجمه‌ای پس از فکر.",
    "about.labelFocus": "تمرکز",
    "about.valueFocus": "رابط RTL و محصولات دوزبانه",
    "about.labelStack": "فناوری",
    "about.valueStack": "React · Node.js · TypeScript · PostgreSQL",
    "about.labelBase": "موقعیت",
    "about.valueBase": "تهران · دورکاری جهانی",
    "skills.tag": "۰۲ — مهارت‌ها",
    "skills.title": "مهارت فول‌استک با توجه به زبان.",
    "skills.c1.title": "فرانت‌اند و RTL",
    "skills.c1.desc": "سیستم کامپوننت، ویژگی‌های منطقی CSS و چیدمان‌های آگاه به زبان که بین LTR و RTL به‌درستی جابه‌جا می‌شوند.",
    "skills.c2.title": "i18n و طراحی",
    "skills.c2.desc": "جریان ترجمه، جفت‌سازی فونت و الگوهای UI که به خط فارسی و تایپوگرافی لاتین احترام می‌گذارند.",
    "skills.c3.title": "بک‌اند و DevOps",
    "skills.c3.desc": "APIهای REST و GraphQL، طراحی پایگاه داده، کش و استقرار کانتینری روی زیرساخت ابری.",
    "projects.tag": "۰۳ — پروژه‌ها",
    "projects.title": "نمونه کارها در زبان‌های مختلف.",
    "projects.p1.title": "نوا کامرس",
    "projects.p1.desc": "پلتفرم فروشگاهی دوزبانه با پرداخت RTL، پشتیبانی چندارزی و پنل مدیریت FA/EN.",
    "projects.p2.title": "DirFlow CMS",
    "projects.p2.desc": "CMS بدون سر با تشخیص خودکار جهت، نسخه‌بندی محتوا و صورتحساب Stripe برای تیم‌های SaaS.",
    "projects.p3.title": "SignalBoard",
    "projects.p3.desc": "داشبورد تحلیل بلادرنگ با فرمت تاریخ شمسی، فید WebSocket و نمودارهای RTL واکنش‌گرا.",
    "contact.tag": "۰۴ — تماس",
    "contact.title": "بیایید چیزی دوزبانه بسازیم.",
    "contact.desc": "آماده همکاری در نقش‌های فول‌استک، مشاوره RTL/i18n و محصولاتی که بازار فارسی‌زبان را هدف می‌گیرند.",
    "form.nameLabel": "نام",
    "form.namePlaceholder": "نام شما",
    "form.emailLabel": "ایمیل",
    "form.emailPlaceholder": "you@example.com",
    "form.messageLabel": "پیام",
    "form.messagePlaceholder": "درباره پروژه خود بنویسید…",
    "form.submit": "ارسال پیام",
    "form.success": "پیام ارسال شد — به‌زودی پاسخ می‌دهم.",
    "form.errorNameRequired": "نام الزامی است.",
    "form.errorNameShort": "نام باید حداقل ۲ کاراکتر باشد.",
    "form.errorEmailRequired": "ایمیل الزامی است.",
    "form.errorEmailInvalid": "یک آدرس ایمیل معتبر وارد کنید.",
    "form.errorMessageRequired": "پیام الزامی است.",
    "form.errorMessageShort": "پیام باید حداقل ۱۰ کاراکتر باشد.",
    "footer.rights": "RTL Studio. با دقت ساخته شده.",
    "aria.langToggle": "تغییر زبان",
    "aria.navToggle": "باز و بسته کردن منو",
    "aria.avatar": "عکس پروفایل"
  }
};

let currentLang = "fa";

function t(key) {
  return i18n[currentLang][key] ?? i18n.en[key] ?? key;
}

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  document.title = t("meta.title");

  const metaDesc = $('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t("meta.description"));

  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  $$("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key);
  });

  const avatar = $("#heroAvatar");
  if (avatar) avatar.alt = t("aria.avatar");

  const langToggle = $("#langToggle");
  if (langToggle) langToggle.setAttribute("aria-label", t("aria.langToggle"));

  const navToggle = $("#navToggle");
  if (navToggle) navToggle.setAttribute("aria-label", t("aria.navToggle"));

  try {
    sessionStorage.setItem(STORAGE_KEY, lang);
  } catch (_) {
    /* sessionStorage unavailable */
  }
}

function initLanguage() {
  let saved = null;
  try {
    saved = sessionStorage.getItem(STORAGE_KEY);
  } catch (_) {
    /* sessionStorage unavailable */
  }

  const browserLang = navigator.language?.startsWith("fa") ? "fa" : "en";
  setLanguage(saved && i18n[saved] ? saved : browserLang);
}

const langToggle = $("#langToggle");
if (langToggle) {
  langToggle.addEventListener("click", () => {
    setLanguage(currentLang === "fa" ? "en" : "fa");
  });
}

initLanguage();

/* Header scroll */
const header = $("#header");

function handleScroll() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

/* Mobile nav */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");

function closeMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  $$(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* Avatar fallback */
function setupAvatar(img) {
  const fallback = img.nextElementSibling;
  const initials = img.dataset.fallback || "RS";

  if (!fallback || !fallback.classList.contains("avatar-fallback")) return;

  fallback.textContent = initials;

  function showFallback() {
    img.style.display = "none";
    fallback.hidden = false;
  }

  if (!img.complete || img.naturalWidth === 0) {
    img.addEventListener("error", showFallback);
    img.addEventListener("load", () => {
      if (img.naturalWidth === 0) showFallback();
    });
    if (img.complete && img.naturalWidth === 0) showFallback();
  } else {
    img.addEventListener("error", showFallback);
  }
}

$$(".avatar-img").forEach(setupAvatar);

/* Scroll reveal */
const revealEls = $$(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add("visible"), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* Contact form validation */
const form = $("#contactForm");
const nameInput = $("#name");
const emailInput = $("#email");
const messageInput = $("#message");
const nameError = $("#nameError");
const emailError = $("#emailError");
const messageError = $("#messageError");
const formSuccess = $("#formSuccess");

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setFieldState(input, errorEl, message) {
  if (message) {
    input.classList.add("invalid");
    errorEl.textContent = message;
    return false;
  }
  input.classList.remove("invalid");
  errorEl.textContent = "";
  return true;
}

function validateForm() {
  let valid = true;

  const nameVal = nameInput.value.trim();
  if (!nameVal) {
    valid = setFieldState(nameInput, nameError, t("form.errorNameRequired"));
  } else if (nameVal.length < 2) {
    valid = setFieldState(nameInput, nameError, t("form.errorNameShort"));
  } else {
    setFieldState(nameInput, nameError, "");
  }

  const emailVal = emailInput.value.trim();
  if (!emailVal) {
    valid = setFieldState(emailInput, emailError, t("form.errorEmailRequired")) && valid;
  } else if (!validateEmail(emailVal)) {
    valid = setFieldState(emailInput, emailError, t("form.errorEmailInvalid")) && valid;
  } else {
    setFieldState(emailInput, emailError, "");
  }

  const msgVal = messageInput.value.trim();
  if (!msgVal) {
    valid = setFieldState(messageInput, messageError, t("form.errorMessageRequired")) && valid;
  } else if (msgVal.length < 10) {
    valid = setFieldState(messageInput, messageError, t("form.errorMessageShort")) && valid;
  } else {
    setFieldState(messageInput, messageError, "");
  }

  return valid;
}

if (form) {
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
      const errEl = $(`#${input.id}Error`);
      if (errEl) errEl.textContent = "";
      formSuccess.hidden = true;
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = true;

    if (!validateForm()) return;

    formSuccess.hidden = false;
    form.reset();
  });
}

/* Footer year */
const yearEl = $("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
