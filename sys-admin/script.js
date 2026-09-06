(function () {
  'use strict';

  /* ── Avatar fallback (SA) ── */
  function initAvatarFallback() {
    document.querySelectorAll('.avatar-img').forEach(function (img) {
      var wrap = img.parentElement;
      var fallback = wrap.querySelector('.avatar-fallback');
      var initials = img.dataset.fallback || 'SA';

      function showFallback() {
        img.style.display = 'none';
        if (fallback) {
          fallback.textContent = initials;
          fallback.hidden = false;
        }
      }

      img.addEventListener('error', showFallback);

      if (img.complete && img.naturalWidth === 0) {
        showFallback();
      }
    });
  }

  /* ── Mobile nav ── */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    var header = document.getElementById('header');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('scroll', function () {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }
    }, { passive: true });
  }

  /* ── Active nav link ── */
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ── Scroll reveal ── */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ── Back to top ── */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.hidden = window.scrollY <= 600;
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Contact form validation ── */
  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var rules = {
      name: function (v) { return v.trim().length >= 2 || 'Name must be at least 2 characters.'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.'; },
      subject: function (v) { return v.trim().length >= 3 || 'Subject must be at least 3 characters.'; },
      message: function (v) { return v.trim().length >= 10 || 'Message must be at least 10 characters.'; }
    };

    function showError(field, msg) {
      var input = form.querySelector('[name="' + field + '"]');
      var errEl = form.querySelector('.form-error[data-for="' + field + '"]');
      if (input) input.classList.add('error');
      if (errEl) errEl.textContent = msg;
    }

    function clearErrors() {
      form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
      form.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var valid = true;
      Object.keys(rules).forEach(function (field) {
        var input = form.querySelector('[name="' + field + '"]');
        var result = rules[field](input ? input.value : '');
        if (result !== true) {
          showError(field, result);
          valid = false;
        }
      });

      if (valid) {
        var success = document.getElementById('formSuccess');
        if (success) success.hidden = false;
        form.reset();
        setTimeout(function () {
          if (success) success.hidden = true;
        }, 5000);
      }
    });

    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('error');
        var errEl = form.querySelector('.form-error[data-for="' + input.name + '"]');
        if (errEl) errEl.textContent = '';
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initAvatarFallback();
    initNav();
    initActiveNav();
    initReveal();
    initBackToTop();
    initForm();
  });
})();
