"use strict";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* Footer year */
const yearEl = $("#year");
if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}

/* Header scroll */
const siteHeader = $(".site-header");
const backToTop = $("#backToTop");

function handleScroll() {
    const y = window.scrollY;
    siteHeader.classList.toggle("scrolled", y > 30);
    backToTop.classList.toggle("show", y > 500);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

/* Mobile navigation */
const menuToggle = $("#menuToggle");
const primaryNavigation = $("#primaryNavigation");
const navLinks = $$(".nav-link");

function toggleMenu() {
    const isOpen = primaryNavigation.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

menuToggle.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (primaryNavigation.classList.contains("open")) {
            toggleMenu();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNavigation.classList.contains("open")) {
        toggleMenu();
        menuToggle.focus();
    }
});

/* Smooth scroll */
$$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") {
            event.preventDefault();
            return;
        }
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* Active navigation */
const sections = $$("main section[id]");
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    },
    { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

/* Scroll reveal */
const revealElements = $$(".reveal");
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));

/* Avatar race fallback */
const avatar = $(".avatar-img");
const fallback = $(".avatar-fallback");

if (avatar && fallback) {
    let settled = false;

    function showFallback() {
        if (settled) return;
        settled = true;
        avatar.setAttribute("hidden", "");
        fallback.removeAttribute("hidden");
    }

    function showAvatar() {
        if (settled) return;
        settled = true;
        fallback.setAttribute("hidden", "");
        avatar.removeAttribute("hidden");
    }

    avatar.addEventListener("error", showFallback);

    avatar.addEventListener("load", () => {
        if (avatar.naturalWidth > 0) showAvatar();
        else showFallback();
    });

    if (avatar.complete) {
        if (avatar.naturalWidth > 0) showAvatar();
        else showFallback();
    }
}

/* Contact form validation */
const contactForm = $("#contactForm");
const formSuccess = $("#formSuccess");

const formFields = {
    name: {
        input: $("#name"),
        error: $("#nameError"),
        validate(value) {
            return value.trim().length >= 2;
        },
        message: "Please enter at least 2 characters."
    },
    email: {
        input: $("#email"),
        error: $("#emailError"),
        validate(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        },
        message: "Please enter a valid email address."
    },
    message: {
        input: $("#message"),
        error: $("#messageError"),
        validate(value) {
            return value.trim().length >= 15;
        },
        message: "Please enter at least 15 characters."
    }
};

function validateField(field) {
    const { input, error, validate, message } = field;
    const group = input.closest(".form-group");
    const valid = validate(input.value);
    group.classList.toggle("invalid", !valid);
    error.textContent = valid ? "" : message;
    return valid;
}

Object.values(formFields).forEach((field) => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
        if (field.input.closest(".form-group").classList.contains("invalid")) {
            validateField(field);
        }
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSuccess.classList.remove("show");

    const results = Object.values(formFields).map(validateField);
    if (!results.every(Boolean)) {
        const firstInvalid = Object.values(formFields).find(
            (field) => !field.validate(field.input.value)
        );
        if (firstInvalid) firstInvalid.input.focus();
        return;
    }

    formSuccess.classList.add("show");
    contactForm.reset();
    Object.values(formFields).forEach((field) => {
        field.input.closest(".form-group").classList.remove("invalid");
        field.error.textContent = "";
    });

    setTimeout(() => formSuccess.classList.remove("show"), 5000);
});

/* Back to top */
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.documentElement.classList.add("js-enabled");
