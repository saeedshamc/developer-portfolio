"use strict";

/* =========================================================
   Py Atelier — Portfolio Scripts
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   Header scroll state
========================================================= */

const siteHeader = $(".site-header");
const backToTop = $("#backToTop");

function handleScroll() {
    const y = window.scrollY;

    if (siteHeader) {
        siteHeader.classList.toggle("scrolled", y > 30);
    }

    if (backToTop) {
        backToTop.classList.toggle("show", y > 500);
    }
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


/* =========================================================
   Mobile navigation
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

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNavigation.classList.contains("open")) {
        toggleMenu();
        menuToggle.focus();
    }
});


/* =========================================================
   Smooth scroll
========================================================= */

$$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* =========================================================
   Active navigation
========================================================= */

const sections = $$("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const id = entry.target.id;

            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );
            });
        });
    },
    { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));


/* =========================================================
   Scroll reveal
========================================================= */

const revealElements = $$(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

revealElements.forEach((element) => revealObserver.observe(element));


/* =========================================================
   Avatar image fallback
========================================================= */

function handleAvatarImage(img) {
    const fallback = img.parentElement.querySelector(
        ".portrait-fallback, .avatar-fallback"
    );

    const showFallback = () => {
        img.classList.remove("loaded");
        if (fallback) {
            fallback.style.display = "grid";
        }
    };

    const hideFallback = () => {
        img.classList.add("loaded");
        if (fallback) {
            fallback.style.display = "none";
        }
    };

    img.addEventListener("load", () => {
        if (img.naturalWidth > 0) {
            hideFallback();
        } else {
            showFallback();
        }
    });

    img.addEventListener("error", showFallback);

    if (img.complete) {
        if (img.naturalWidth > 0) {
            hideFallback();
        } else {
            showFallback();
        }
    }
}

$$(".portrait-photo").forEach(handleAvatarImage);


/* =========================================================
   Contact form validation
========================================================= */

const contactForm = $("#contactForm");
const formSuccess = $("#formSuccess");

const formFields = {
    name: {
        input: $("#name"),
        error: $("#nameError"),
        validate(value) {
            return value.trim().length >= 2;
        }
    },
    email: {
        input: $("#email"),
        error: $("#emailError"),
        validate(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        }
    },
    message: {
        input: $("#message"),
        error: $("#messageError"),
        validate(value) {
            return value.trim().length >= 10;
        }
    }
};

function setFieldState(field, isValid) {
    const group = field.input.closest(".form-group");
    group.classList.toggle("invalid", !isValid);
}

Object.values(formFields).forEach((field) => {
    field.input.addEventListener("input", () => {
        if (field.input.value.trim()) {
            setFieldState(field, field.validate(field.input.value));
        } else {
            field.input.closest(".form-group").classList.remove("invalid");
        }
    });

    field.input.addEventListener("blur", () => {
        if (field.input.value.trim()) {
            setFieldState(field, field.validate(field.input.value));
        }
    });
});

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        formSuccess.classList.remove("show");

        let isValid = true;

        Object.values(formFields).forEach((field) => {
            const valid = field.validate(field.input.value);
            setFieldState(field, valid);
            if (!valid) {
                isValid = false;
            }
        });

        if (!isValid) {
            const firstInvalid = Object.values(formFields).find(
                (field) => !field.validate(field.input.value)
            );
            firstInvalid.input.focus();
            return;
        }

        formSuccess.classList.add("show");
        contactForm.reset();

        Object.values(formFields).forEach((field) => {
            field.input.closest(".form-group").classList.remove("invalid");
        });

        setTimeout(() => {
            formSuccess.classList.remove("show");
        }, 5000);
    });
}


/* =========================================================
   Footer year
========================================================= */

const yearEl = $("#year");
if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}
