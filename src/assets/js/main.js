// Kobzy — small progressive-enhancement scripts. Site works fully without JS.
(function () {
  "use strict";

  /* ---- Mobile navigation toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Car gallery: click a thumbnail to swap the main image ---- */
  var main = document.getElementById("galleryMain");
  var thumbs = document.querySelectorAll(".gallery-thumb");
  if (main && thumbs.length) {
    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var full = btn.getAttribute("data-full");
        if (!full) return;
        main.src = full;
        thumbs.forEach(function (t) { t.classList.remove("is-active"); });
        btn.classList.add("is-active");
      });
    });
  }
})();
