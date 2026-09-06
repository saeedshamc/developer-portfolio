"use strict";

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

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
  navLinks.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

$$(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* Avatar fallback */
function setupAvatar(img) {
  const fallback = img.nextElementSibling;
  const initials = img.dataset.fallback || "SD";

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

/* Counter animation */
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const isDecimal = String(target).includes(".");

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = isDecimal ? target.toFixed(1) : target;
    }
  }

  requestAnimationFrame(tick);
}

const counterEls = $$("[data-count]");

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseFloat(entry.target.dataset.count);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach((el) => counterObserver.observe(el));
} else {
  counterEls.forEach((el) => {
    el.textContent = el.dataset.count;
  });
}

/* Active nav link on scroll */
const sections = $$("section[id]");
const navAnchors = $$(".nav-links a[href^='#']");

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* Contact form validation */
const form = $("#contactForm");
const nameInput = $("#name");
const emailInput = $("#email");
const priorityInput = $("#priority");
const messageInput = $("#message");
const nameError = $("#nameError");
const emailError = $("#emailError");
const priorityError = $("#priorityError");
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
    valid = setFieldState(nameInput, nameError, "Name is required.");
  } else if (nameVal.length < 2) {
    valid = setFieldState(nameInput, nameError, "Name must be at least 2 characters.");
  } else {
    setFieldState(nameInput, nameError, "");
  }

  const emailVal = emailInput.value.trim();
  if (!emailVal) {
    valid = setFieldState(emailInput, emailError, "Email is required.") && valid;
  } else if (!validateEmail(emailVal)) {
    valid = setFieldState(emailInput, emailError, "Enter a valid email address.") && valid;
  } else {
    setFieldState(emailInput, emailError, "");
  }

  const priorityVal = priorityInput.value;
  if (!priorityVal) {
    valid = setFieldState(priorityInput, priorityError, "Please select a priority.") && valid;
  } else {
    setFieldState(priorityInput, priorityError, "");
  }

  const msgVal = messageInput.value.trim();
  if (!msgVal) {
    valid = setFieldState(messageInput, messageError, "Message is required.") && valid;
  } else if (msgVal.length < 10) {
    valid = setFieldState(messageInput, messageError, "Message must be at least 10 characters.") && valid;
  } else {
    setFieldState(messageInput, messageError, "");
  }

  return valid;
}

[nameInput, emailInput, priorityInput, messageInput].forEach((input) => {
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

/* Footer year */
const yearEl = $("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
