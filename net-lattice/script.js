(function () {
    'use strict';

    /* Footer year */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Avatar fallback */
    var avatarImg = document.getElementById('avatarImg');
    var avatarFallback = document.getElementById('avatarFallback');

    if (avatarImg && avatarFallback) {
        avatarImg.addEventListener('error', function () {
            avatarImg.style.display = 'none';
            avatarFallback.classList.add('is-visible');
        });

        if (!avatarImg.complete || avatarImg.naturalWidth === 0) {
            avatarImg.addEventListener('load', function () {
                avatarFallback.classList.remove('is-visible');
            });
        }
    }

    /* Mobile navigation */
    var menuToggle = document.getElementById('menuToggle');
    var primaryNav = document.getElementById('primaryNav');
    var navLinks = document.querySelectorAll('.nav-link');

    function closeMenu() {
        if (!menuToggle || !primaryNav) return;
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        primaryNav.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        if (!menuToggle || !primaryNav) return;
        menuToggle.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close menu');
        primaryNav.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', function () {
            var isOpen = primaryNav.classList.contains('is-open');
            isOpen ? closeMenu() : openMenu();
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    /* Active nav on scroll */
    var sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        var scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            var link = document.querySelector('.nav-link[href="#' + id + '"]');

            if (scrollY >= top && scrollY < top + height && link) {
                navLinks.forEach(function (l) { l.classList.remove('active'); });
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    /* Scroll reveal */
    var revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* Contact form validation */
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        var nameError = document.getElementById('nameError');
        var emailError = document.getElementById('emailError');
        var messageError = document.getElementById('messageError');
        var formSuccess = document.getElementById('formSuccess');

        function validateName() {
            var value = nameInput.value.trim();
            if (!value) {
                nameError.textContent = 'Name is required.';
                nameInput.classList.add('is-invalid');
                return false;
            }
            if (value.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters.';
                nameInput.classList.add('is-invalid');
                return false;
            }
            nameError.textContent = '';
            nameInput.classList.remove('is-invalid');
            return true;
        }

        function validateEmail() {
            var value = emailInput.value.trim();
            var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                emailError.textContent = 'Email is required.';
                emailInput.classList.add('is-invalid');
                return false;
            }
            if (!pattern.test(value)) {
                emailError.textContent = 'Enter a valid email address.';
                emailInput.classList.add('is-invalid');
                return false;
            }
            emailError.textContent = '';
            emailInput.classList.remove('is-invalid');
            return true;
        }

        function validateMessage() {
            var value = messageInput.value.trim();
            if (!value) {
                messageError.textContent = 'Message is required.';
                messageInput.classList.add('is-invalid');
                return false;
            }
            if (value.length < 10) {
                messageError.textContent = 'Message must be at least 10 characters.';
                messageInput.classList.add('is-invalid');
                return false;
            }
            messageError.textContent = '';
            messageInput.classList.remove('is-invalid');
            return true;
        }

        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        messageInput.addEventListener('blur', validateMessage);

        [nameInput, emailInput, messageInput].forEach(function (input) {
            input.addEventListener('input', function () {
                input.classList.remove('is-invalid');
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            formSuccess.hidden = true;

            var valid = validateName() & validateEmail() & validateMessage();

            if (valid) {
                formSuccess.hidden = false;
                contactForm.reset();
            }
        });
    }
})();
