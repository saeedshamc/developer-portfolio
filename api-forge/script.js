"use strict";

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   Header scroll state
========================================================= */

const header = $("#header");
const backToTop = $("#backToTop");

function handleScroll() {
    const y = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", y > 30);
    }

    if (backToTop) {
        backToTop.classList.toggle("show", y > 500);
        backToTop.hidden = y <= 500;
    }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


/* =========================================================
   Mobile navigation
========================================================= */

const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
const navAnchors = $$(".nav-links a");

function toggleMenu() {
    const isOpen = navLinks.classList.toggle("open");

    navToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

navToggle.addEventListener("click", toggleMenu);

navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
            toggleMenu();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
        toggleMenu();
        navToggle.focus();
    }
});


/* =========================================================
   Active nav link on scroll
========================================================= */

const sections = $$("section[id]");

function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    let current = "";

    sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
            current = section.id;
        }
    });

    navAnchors.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${current}`);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();


/* =========================================================
   Scroll reveal
========================================================= */

const revealElements = $$(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const delay = entry.target.dataset.delay || 0;

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, Number(delay));

            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* =========================================================
   Avatar error fallback
========================================================= */

function setupAvatarFallback(img) {
    const wrap = img.closest(".avatar-wrap");

    if (!wrap) return;

    const fallback = wrap.querySelector(".avatar-fallback");
    const initials = img.dataset.fallback || "AF";

    if (fallback) {
        fallback.textContent = initials;
    }

    function showFallback() {
        img.style.display = "none";

        if (fallback) {
            fallback.hidden = false;
        }
    }

    img.addEventListener("error", showFallback);

    if (img.complete && img.naturalWidth === 0) {
        showFallback();
    }
}

$$(".avatar-img").forEach(setupAvatarFallback);


/* =========================================================
   Contact form validation
========================================================= */

const contactForm = $("#contactForm");
const formSuccess = $("#formSuccess");

const validators = {
    name(value) {
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
    },

    email(value) {
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Please enter a valid email address.";
        }
        return "";
    },

    subject(value) {
        if (!value.trim()) return "Subject is required.";
        return "";
    },

    message(value) {
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < 10) {
            return "Message must be at least 10 characters.";
        }
        return "";
    }
};

function showFieldError(name, message) {
    const input = contactForm.querySelector(`[name="${name}"]`);
    const errorEl = contactForm.querySelector(`.form-error[data-for="${name}"]`);

    if (input) {
        input.classList.toggle("invalid", Boolean(message));
    }

    if (errorEl) {
        errorEl.textContent = message;
    }
}

function validateField(name) {
    const input = contactForm.querySelector(`[name="${name}"]`);

    if (!input || !validators[name]) return true;

    const error = validators[name](input.value);
    showFieldError(name, error);

    return !error;
}

if (contactForm) {
    $$("input, textarea", contactForm).forEach((input) => {
        input.addEventListener("blur", () => {
            validateField(input.name);
        });

        input.addEventListener("input", () => {
            if (input.classList.contains("invalid")) {
                validateField(input.name);
            }
        });
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        formSuccess.hidden = true;

        const fields = ["name", "email", "subject", "message"];
        const results = fields.map((name) => validateField(name));

        if (results.every(Boolean)) {
            formSuccess.hidden = false;
            contactForm.reset();
            fields.forEach((name) => showFieldError(name, ""));
        } else {
            const firstInvalid = contactForm.querySelector(".invalid");

            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
    });
}


/* =========================================================
   Back to top
========================================================= */

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
