"use strict";

/*
=========================================================
   PERSONAL DEVELOPER PORTFOLIO
   Vanilla JavaScript
=========================================================
*/


/* =========================================================
   DOM HELPERS
========================================================= */

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

    if (scrollPosition > 30) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

    if (scrollPosition > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

window.addEventListener("scroll", handleScroll, {
    passive: true
});

handleScroll();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = $("#menuToggle");
const primaryNavigation = $("#primaryNavigation");
const navLinks = $$(".nav-link");

function toggleMenu() {

    const isOpen =
        primaryNavigation.classList.toggle("open");

    menuToggle.classList.toggle(
        "active",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}

menuToggle.addEventListener(
    "click",
    toggleMenu
);


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (
            primaryNavigation.classList.contains("open")
        ) {
            toggleMenu();
        }

    });

});


/* Close menu with Escape */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        primaryNavigation.classList.contains("open")
    ) {
        toggleMenu();
        menuToggle.focus();
    }

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

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
   ACTIVE NAVIGATION
========================================================= */

const sections = $$(
    "main section[id]"
);

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.id;

                navLinks.forEach((link) => {

                    const isActive =
                        link.getAttribute("href") === `#${id}`;

                    link.classList.toggle(
                        "active",
                        isActive
                    );

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    $$(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px"
        }
    );

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   HERO TYPING ANIMATION
========================================================= */

const heroTyping =
    $("#heroTyping");

const typingWords = [
    "scale.",
    "perform.",
    "stay reliable.",
    "feel effortless.",
    "solve real problems."
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeHeroText() {

    if (!heroTyping) {
        return;
    }

    const currentWord =
        typingWords[wordIndex];

    if (!deleting) {

        characterIndex++;

        heroTyping.textContent =
            currentWord.slice(
                0,
                characterIndex
            );

        if (
            characterIndex >=
            currentWord.length
        ) {
            deleting = true;

            setTimeout(
                typeHeroText,
                1800
            );

            return;
        }

    } else {

        characterIndex--;

        heroTyping.textContent =
            currentWord.slice(
                0,
                characterIndex
            );

        if (characterIndex <= 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                typingWords.length;
        }

    }

    const delay =
        deleting
            ? 35
            : 75;

    setTimeout(
        typeHeroText,
        delay
    );
}

setTimeout(
    typeHeroText,
    1000
);


/* =========================================================
   TERMINAL TYPING
========================================================= */

const terminalTyping =
    $("#terminalTyping");

const terminalCommands = [
    "git status",
    "npm run build",
    "docker compose up",
    "git push origin main",
    "deploy --production"
];

let commandIndex = 0;
let commandCharacter = 0;

function typeTerminalCommand() {

    if (!terminalTyping) {
        return;
    }

    const command =
        terminalCommands[commandIndex];

    terminalTyping.textContent =
        command.slice(
            0,
            commandCharacter
        );

    commandCharacter++;

    if (
        commandCharacter >
        command.length
    ) {

        setTimeout(() => {

            commandCharacter = 0;

            commandIndex =
                (commandIndex + 1) %
                terminalCommands.length;

            typeTerminalCommand();

        }, 1800);

        return;
    }

    setTimeout(
        typeTerminalCommand,
        65
    );
}

setTimeout(
    typeTerminalCommand,
    1800
);


/* =========================================================
   GITHUB CONTRIBUTION GRAPH
========================================================= */

const contributionGraph =
    $("#contributionGraph");


function createContributionGraph() {

    if (!contributionGraph) {
        return;
    }

    const fragment =
        document.createDocumentFragment();

    const totalCells =
        52 * 7;

    for (
        let index = 0;
        index < totalCells;
        index++
    ) {

        const cell =
            document.createElement("span");

        cell.className =
            "contribution-cell";

        /*
         * Placeholder activity data.
         *
         * Later, this section can be replaced
         * with real GitHub API data.
         */

        const random =
            Math.random();

        let level = 0;

        if (random > 0.78) {
            level = 4;
        } else if (random > 0.64) {
            level = 3;
        } else if (random > 0.47) {
            level = 2;
        } else if (random > 0.32) {
            level = 1;
        }

        if (level > 0) {
            cell.classList.add(
                `level-${level}`
            );
        }

        cell.title =
            `${Math.floor(
                Math.random() * 10
            )} contributions`;

        fragment.appendChild(cell);
    }

    contributionGraph.appendChild(
        fragment
    );
}

createContributionGraph();


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

const contactForm =
    $("#contactForm");

const formSuccess =
    $("#formSuccess");


const formFields = {
    name: {
        input: $("#name"),
        error: $("#nameError"),
        validate(value) {
            return value.trim().length >= 2;
        },
        message:
            "Please enter at least 2 characters."
    },

    email: {
        input: $("#email"),
        error: $("#emailError"),
        validate(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                value.trim()
            );
        },
        message:
            "Please enter a valid email address."
    },

    message: {
        input: $("#message"),
        error: $("#messageError"),
        validate(value) {
            return value.trim().length >= 15;
        },
        message:
            "Please enter at least 15 characters."
    }
};


function validateField(field) {

    const {
        input,
        error,
        validate,
        message
    } = field;

    const group =
        input.closest(".form-group");

    const valid =
        validate(input.value);

    group.classList.toggle(
        "invalid",
        !valid
    );

    error.textContent =
        valid
            ? ""
            : message;

    return valid;
}


Object.values(formFields).forEach(
    (field) => {

        field.input.addEventListener(
            "blur",
            () => {
                validateField(field);
            }
        );

        field.input.addEventListener(
            "input",
            () => {

                if (
                    field.input
                        .closest(".form-group")
                        .classList
                        .contains("invalid")
                ) {
                    validateField(field);
                }

            }
        );

    }
);


contactForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        formSuccess.classList.remove(
            "show"
        );

        const results =
            Object.values(formFields)
                .map(validateField);

        const isValid =
            results.every(Boolean);

        if (!isValid) {

            const firstInvalid =
                Object.values(formFields)
                    .find(
                        (field) =>
                            !field.validate(
                                field.input.value
                            )
                    );

            if (firstInvalid) {
                firstInvalid.input.focus();
            }

            return;
        }

        /*
         * No backend is connected.
         *
         * This simulates successful
         * client-side submission.
         */

        formSuccess.classList.add(
            "show"
        );

        contactForm.reset();

        Object.values(formFields)
            .forEach((field) => {

                field.input
                    .closest(".form-group")
                    .classList.remove(
                        "invalid"
                    );

                field.error.textContent = "";
            });

        setTimeout(() => {

            formSuccess.classList.remove(
                "show"
            );

        }, 5000);

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   PROJECT CARD POINTER GLOW
========================================================= */

const projectCards =
    $$(".project-card");


projectCards.forEach((card) => {

    card.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }
    );

});


/* =========================================================
   KEYBOARD FRIENDLY EXTERNAL LINKS
========================================================= */

$$('a[href="#"]').forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {
            event.preventDefault();
        }
    );

});


/* =========================================================
   OPTIONAL GITHUB API STRUCTURE
========================================================= */

/*
    Future GitHub API integration can be added here.

    Example architecture:

    async function loadGitHubData(username) {

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        if (!response.ok) {
            throw new Error(
                "GitHub request failed."
            );
        }

        const data =
            await response.json();

        // Update:
        // repositories
        // followers
        // avatar
        // etc.
    }

    IMPORTANT:
    For production, use a backend/serverless
    endpoint if you need private or rate-limited
    GitHub data.
*/


/* =========================================================
   PERFORMANCE
========================================================= */

/*
 * Pause decorative animations when the page
 * is hidden in another browser tab.
 */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {
            document.documentElement
                .style
                .setProperty(
                    "--animation-play-state",
                    "paused"
                );
        } else {
            document.documentElement
                .style
                .setProperty(
                    "--animation-play-state",
                    "running"
                );
        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);

/* Show initials when avatar image is missing */
$$(".portrait-photo, .profile-photo, .github-avatar img").forEach((img) => {
    img.addEventListener("error", () => {
        img.style.display = "none";
        const fallback = img.parentElement.querySelector(
            ".portrait-fallback, .avatar-fallback"
        );
        if (fallback) {
            fallback.style.display = "grid";
        }
    });
});

console.log(
    "%c// Code Terminal portfolio initialized",
    "color:#00ff88;font-family:monospace;font-weight:bold;"
);
