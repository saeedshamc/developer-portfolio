(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Avatar error + complete race fallback */
  var avatar = document.querySelector(".avatar-img");
  var fallback = document.querySelector(".avatar-fallback");

  if (avatar && fallback) {
    var settled = false;

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

    if (avatar.complete) {
      if (avatar.naturalWidth > 0) {
        showAvatar();
      } else {
        showFallback();
      }
    } else {
      avatar.addEventListener("load", function () {
        if (avatar.naturalWidth > 0) showAvatar();
        else showFallback();
      });
    }
  }

  /* Contact form validation */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameInput = form.querySelector("#name");
  var emailInput = form.querySelector("#email");
  var messageInput = form.querySelector("#message");
  var statusEl = form.querySelector(".form-status");

  function setError(input, message) {
    var field = input.closest(".field");
    var errEl = field ? field.querySelector(".field-error") : null;
    input.classList.toggle("invalid", !!message);
    if (errEl) errEl.textContent = message;
  }

  function validateName() {
    var val = nameInput.value.trim();
    if (!val) { setError(nameInput, "Name is required."); return false; }
    if (val.length < 2) { setError(nameInput, "Name must be at least 2 characters."); return false; }
    setError(nameInput, "");
    return true;
  }

  function validateEmail() {
    var val = emailInput.value.trim();
    if (!val) { setError(emailInput, "Email is required."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError(emailInput, "Enter a valid email address.");
      return false;
    }
    setError(emailInput, "");
    return true;
  }

  function validateMessage() {
    var val = messageInput.value.trim();
    if (!val) { setError(messageInput, "Message is required."); return false; }
    if (val.length < 10) { setError(messageInput, "Message must be at least 10 characters."); return false; }
    setError(messageInput, "");
    return true;
  }

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.textContent = "";
    statusEl.className = "form-status";

    var ok = validateName() && validateEmail() && validateMessage();
    if (!ok) {
      statusEl.textContent = "Please fix the errors above.";
      statusEl.classList.add("error");
      return;
    }

    statusEl.textContent = "Message sent — thank you!";
    statusEl.classList.add("success");
    form.reset();
    [nameInput, emailInput, messageInput].forEach(function (input) {
      input.classList.remove("invalid");
    });
  });
})();
