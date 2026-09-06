"use strict";

/*
=========================================================
   Web Craft — Full Web Developer Portfolio
   Vanilla JavaScript
=========================================================
*/

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   HEADER SCROLL STATE
========================================================= */

const siteHeader = $(".site-header");
const backToTop = $("#backToTop");

function handleScroll() {
    const scrollPosition = window.scrollY;

    if (siteHeader) {
        siteHeader.classList.toggle("scrolled", scrollPosition > 30);
    }

    if (backToTop) {
        backToTop.classList.toggle("show", scrollPosition > 500);
    }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

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


/* =========================================================
   ACTIVE NAV LINK ON SCROLL
========================================================= */

const sections = $$("section[id]");

function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    let current = "";

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollY >= top && scrollY < top + height) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute("href").slice(1);
        link.classList.toggle("active", href === current);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = $$(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* =========================================================
   AVATAR FALLBACK
========================================================= */

const ownerAvatar = $("#ownerAvatar");
const avatarFallback = $("#avatarFallback");

function showAvatarFallback() {
    if (!ownerAvatar || !avatarFallback) return;
    ownerAvatar.classList.add("hidden");
    avatarFallback.classList.add("show");
}

if (ownerAvatar) {
    ownerAvatar.addEventListener("error", showAvatarFallback);

    if (ownerAvatar.complete && ownerAvatar.naturalWidth === 0) {
        showAvatarFallback();
    } else {
        ownerAvatar.addEventListener("load", () => {
            if (ownerAvatar.naturalWidth === 0) {
                showAvatarFallback();
            }
        });
    }
}


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

const contactForm = $("#contactForm");
const nameInput = $("#name");
const emailInput = $("#email");
const messageInput = $("#message");
const nameError = $("#nameError");
const emailError = $("#emailError");
const messageError = $("#messageError");
const formSuccess = $("#formSuccess");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(input, errorEl, message) {
    input.classList.toggle("invalid", Boolean(message));
    errorEl.textContent = message;
}

function validateName() {
    const value = nameInput.value.trim();

    if (!value) {
        setFieldError(nameInput, nameError, "Please enter your name.");
        return false;
    }

    if (value.length < 2) {
        setFieldError(nameInput, nameError, "Name must be at least 2 characters.");
        return false;
    }

    setFieldError(nameInput, nameError, "");
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();

    if (!value) {
        setFieldError(emailInput, emailError, "Please enter your email.");
        return false;
    }

    if (!emailPattern.test(value)) {
        setFieldError(emailInput, emailError, "Please enter a valid email address.");
        return false;
    }

    setFieldError(emailInput, emailError, "");
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();

    if (!value) {
        setFieldError(messageInput, messageError, "Please enter a message.");
        return false;
    }

    if (value.length < 10) {
        setFieldError(messageInput, messageError, "Message must be at least 10 characters.");
        return false;
    }

    setFieldError(messageInput, messageError, "");
    return true;
}

nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
messageInput.addEventListener("blur", validateMessage);

[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) {
            if (input === nameInput) validateName();
            if (input === emailInput) validateEmail();
            if (input === messageInput) validateMessage();
        }
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSuccess.hidden = true;

    const isValid =
        validateName() &&
        validateEmail() &&
        validateMessage();

    if (isValid) {
        formSuccess.hidden = false;
        contactForm.reset();
        [nameInput, emailInput, messageInput].forEach((input) => {
            input.classList.remove("invalid");
        });
    }
});


/* =========================================================
   FOOTER YEAR
========================================================= */

const yearEl = $("#year");

if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}
