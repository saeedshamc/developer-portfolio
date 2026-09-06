(function () {
  'use strict';

  function initAvatarFallback() {
    document.querySelectorAll('.avatar-img').forEach(function (img) {
      var wrap = img.parentElement;
      var fallback = wrap.querySelector('.avatar-fallback');
      var initials = img.dataset.fallback || 'RL';

      function showFallback() {
        img.style.display = 'none';
        if (fallback) {
          fallback.textContent = initials;
          fallback.hidden = false;
        }
      }

      img.addEventListener('error', showFallback);
      if (!img.complete || img.naturalWidth === 0) {
        if (img.complete) showFallback();
      }
    });
  }

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
        header.classList.toggle('scrolled', window.scrollY > 24);
      }
    }, { passive: true });
  }

  function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = anchor.getAttribute('href');
        if (id.length <= 1) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

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

  function initForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var rules = {
      name: function (v) { return v.trim().length >= 2 || 'Name must be at least 2 characters.'; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.'; },
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

  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initAvatarFallback();
    initNav();
    initSmoothNav();
    initActiveNav();
    initForm();
    initYear();
  });
})();
