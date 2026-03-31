/*
  ============================================================
  Aurum Landscapes — script.js
  ============================================================
  Author:      Aurum Landscapes Digital
  Version:     2.0.0
  Description: All JavaScript for the Aurum Landscapes website.
               Extracted from index.html for clean separation.
  Sections:
    1.  Loading Screen
    2.  Custom Cursor
    3.  Navigation Scroll State
    4.  Mobile Menu Toggle
    5.  Page Routing (SPA)
    6.  Scroll Reveal (Intersection Observer)
    7.  FAQ Accordion
    8.  Contact Form Submission
    9.  Initial Nav State
    10. Delegated Cursor Hover
    11. Scroll Progress Bar
    12. Back to Top
    13. Floating Mobile CTA
    14. Page Transition Wrapper
    15. Parallax Hero Backgrounds
    16. Animated Counters
    17. Lightbox
    18. Touch Swipe (Lightbox)
    19. Animated Counters Init
    20. Parallax
    21. Portfolio Filter
    22. Article Modal
    23. Reveal Left/Right
    24. Image Band Entrance Animation
    25. Screen Reader Live Region
    26. Focus Trap
    27. Escape Key Handler
    28. Testimonial Carousel
  ============================================================
*/

/* ============================================================
       Loading screen
       ============================================================ */
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 2000);
});

/* ============================================================
       Custom cursor (progressive enhancement — pointer: fine)
       ============================================================ */
(function () {
  var dot = document.getElementById("cursorDot");
  var ring = document.getElementById("cursorRing");
  var mouseX = 0,
    mouseY = 0;
  var ringX = 0,
    ringY = 0;

  if (!dot || !ring) return;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  /* Smooth ring lag */
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Hover state on interactive elements */
  var hoverEls = document.querySelectorAll(
    "a, button, .portfolio-tile, .portfolio-item, .journal-card, .service-card, .team-card",
  );
  hoverEls.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-hover");
    });
  });
})();

/* ============================================================
       Navigation scroll state
       ============================================================ */
var nav = document.getElementById("siteNav");
window.addEventListener(
  "scroll",
  function () {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  },
  { passive: true },
);

/* ============================================================
       Mobile menu toggle
       ============================================================ */
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", function () {
  var isOpen = hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

/* ============================================================
       Page routing (SPA style)
       ============================================================ */
function showPage(pageId) {
  /* Hide all pages */
  var pages = document.querySelectorAll(".page");
  pages.forEach(function (p) {
    p.classList.remove("active");
  });

  /* Show requested page */
  var target = document.getElementById("page-" + pageId);
  if (target) {
    target.classList.add("active");
  }

  /* Update active nav link */
  var links = document.querySelectorAll(".nav__link");
  links.forEach(function (l) {
    l.classList.toggle("active", l.getAttribute("data-page") === pageId);
  });

  /* Scroll to top */
  window.scrollTo({ top: 0, behavior: "smooth" });

  /* Re-init scroll reveals for newly visible page */
  setTimeout(initReveal, 100);

  /* Nav coloring — ensure scrolled state on non-hero pages */
  if (pageId === "faq" || pageId === "journal") {
    nav.classList.add("scrolled");
  }
}

/* ============================================================
       Scroll reveal (Intersection Observer)
       ============================================================ */
function initReveal() {
  var reveals = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    /* Fallback for IE */
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
}

/* Init on page load */
document.addEventListener("DOMContentLoaded", initReveal);

/* Re-run on scroll (belt-and-braces for older browsers) */
window.addEventListener("scroll", initReveal, { passive: true });

/* ============================================================
       FAQ accordion
       ============================================================ */
function toggleFaq(btn) {
  var item = btn.closest(".faq-item");
  var isOpen = item.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen);
}

/* ============================================================
       Contact form submission (demo)
       ============================================================ */
function handleFormSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var success = document.getElementById("formSuccess");
  form.style.display = "none";
  success.style.display = "block";
  success.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ============================================================
       Initial nav state — transparent over hero
       ============================================================ */
nav.classList.remove("scrolled");

/* ============================================================
       Hover cursor re-bind on page change (delegated)
       ============================================================ */
document.addEventListener(
  "mouseenter",
  function (e) {
    var el = e.target;
    if (
      el &&
      (el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.classList.contains("portfolio-tile") ||
        el.classList.contains("journal-card") ||
        el.classList.contains("service-card"))
    ) {
      document.body.classList.add("cursor-hover");
    }
  },
  true,
);

document.addEventListener(
  "mouseleave",
  function (e) {
    var el = e.target;
    if (
      el &&
      (el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.classList.contains("portfolio-tile") ||
        el.classList.contains("portfolio-item") ||
        el.classList.contains("journal-card") ||
        el.classList.contains("service-card"))
    ) {
      document.body.classList.remove("cursor-hover");
    }
  },
  true,
);

/* ── Lightbox ────────────────────────────────────────────── */
var lightboxImages = [];
var lightboxIndex = 0;

function openLightbox(src, alt, title, sub, allImgs, idx) {
  lightboxImages = allImgs || [{ src: src, alt: alt, title: title, sub: sub }];
  lightboxIndex = idx || 0;
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function renderLightbox() {
  var item = lightboxImages[lightboxIndex];
  if (!item) return;
  var img = document.getElementById("lightboxImg");
  img.style.opacity = "0";
  img.src = item.src;
  img.alt = item.alt || "";
  img.onload = function () {
    img.style.transition = "opacity 0.3s";
    img.style.opacity = "1";
  };
  document.getElementById("lightboxTitle").textContent = item.title || "";
  document.getElementById("lightboxSub").textContent = item.sub || "";
  document.getElementById("lightboxCounter").textContent =
    lightboxIndex + 1 + " / " + lightboxImages.length;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

document
  .getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);
document.getElementById("lightbox").addEventListener("click", function (e) {
  if (e.target === this) closeLightbox();
});
document.getElementById("lightboxPrev").addEventListener("click", function () {
  lightboxIndex =
    (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  renderLightbox();
});
document.getElementById("lightboxNext").addEventListener("click", function () {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  renderLightbox();
});

/* Keyboard navigation for lightbox */
document.addEventListener("keydown", function (e) {
  var lb = document.getElementById("lightbox");
  if (!lb || !lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") {
    lightboxIndex =
      (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    renderLightbox();
  }
  if (e.key === "ArrowRight") {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    renderLightbox();
  }
});

/* Portfolio items → lightbox */
var portfolioData = [
  {
    src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1400&q=85",
    alt: "The Wiltshire Retreat",
    title: "The Wiltshire Retreat",
    sub: "Formal Garden Design",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1400&q=85",
    alt: "The Gloucestershire Spa",
    title: "The Gloucestershire Spa",
    sub: "Outdoor Living",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85",
    alt: "The Berkshire Pavilion",
    title: "The Berkshire Pavilion",
    sub: "Outdoor Entertaining",
  },
  {
    src: "https://images.unsplash.com/photo-1510598155888-84f38e62e4c8?w=1400&q=85",
    alt: "The Rose Garden",
    title: "The Rose Garden, Burford",
    sub: "Heritage Planting",
  },
  {
    src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&q=85",
    alt: "Walled Kitchen Garden",
    title: "The Walled Kitchen Garden",
    sub: "Kitchen Garden",
  },
  {
    src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1400&q=85",
    alt: "Warwickshire Water Garden",
    title: "The Warwickshire Water Garden",
    sub: "Water Garden",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1400&q=85",
    alt: "Evening Garden Lighting",
    title: "Evening Garden Lighting",
    sub: "Landscape Lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=85",
    alt: "The Worcestershire Terrace",
    title: "The Worcestershire Terrace",
    sub: "Contemporary Design",
  },
];

document.querySelectorAll(".portfolio-item").forEach(function (item, i) {
  item.style.cursor = "zoom-in";
  item.addEventListener("click", function () {
    openLightbox(
      null,
      null,
      null,
      null,
      portfolioData,
      i % portfolioData.length,
    );
  });
});

/* Touch swipe for lightbox */
(function () {
  var lb = document.getElementById("lightbox");
  if (!lb) return;
  var startX = null;
  lb.addEventListener(
    "touchstart",
    function (e) {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );
  lb.addEventListener(
    "touchend",
    function (e) {
      if (startX === null) return;
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        } else {
          lightboxIndex =
            (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        }
        renderLightbox();
      }
      startX = null;
    },
    { passive: true },
  );
})();

/* ── Animated counters ──────────────────────────────────── */
var countersDone = false;
function animateCounter(el, target, suffix, duration) {
  suffix = suffix || "";
  duration = duration || 1800;
  var numTarget = parseFloat(String(target).replace(/[^0-9.]/g, ""));
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var p = Math.min((ts - startTime) / duration, 1);
    var e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * numTarget) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = numTarget + suffix;
  }
  requestAnimationFrame(step);
}

function initCounters() {
  if (countersDone) return;
  var statNums = document.querySelectorAll(".stat__number");
  if (!statNums.length) return;
  var data = [
    { val: 30, suffix: "+" },
    { val: 180, suffix: "" },
    { val: 14, suffix: "" },
    { val: 8, suffix: "" },
  ];
  statNums.forEach(function (el, i) {
    if (data[i]) {
      el.textContent = "0" + data[i].suffix;
    }
  });
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !countersDone) {
          countersDone = true;
          statNums.forEach(function (el, i) {
            if (data[i])
              setTimeout(function () {
                animateCounter(el, data[i].val, data[i].suffix, 1600);
              }, i * 160);
          });
        }
      });
    },
    { threshold: 0.5 },
  );
  if (statNums[0]) obs.observe(statNums[0]);
}
document.addEventListener("DOMContentLoaded", initCounters);

/* ── Parallax hero backgrounds ──────────────────────────── */
function updateParallax() {
  var activePage = document.querySelector(".page.active");
  if (!activePage) return;
  var bg = activePage.querySelector(".hero__bg");
  if (!bg) return;
  var scrollY = window.scrollY;
  bg.style.transform = "scale(1.05) translateY(" + scrollY * 0.15 + "px)";
}
window.addEventListener("scroll", updateParallax, { passive: true });

/* ── Portfolio filter ────────────────────────────────────── */
document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    var filter = btn.getAttribute("data-filter") || "all";
    document.querySelectorAll(".portfolio-item").forEach(function (item) {
      var cat = item.getAttribute("data-cat") || "";
      var show = filter === "all" || cat === filter;
      item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      item.style.opacity = show ? "1" : "0.15";
      item.style.transform = show ? "scale(1)" : "scale(0.97)";
      item.style.pointerEvents = show ? "all" : "none";
    });
  });
});

/* ── Article modal ──────────────────────────────────────── */
var articleContent = {
  timeless: {
    img: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=1200&q=85",
    cat: "Garden Design",
    title: "The Art of Timeless Garden Design",
    author: "James Gold",
    date: "March 2025",
    body: "<p>A garden that endures is one designed with both art and intellect. The truly great gardens of England were conceived by designers who understood that a landscape must be composed like a piece of music: with rhythm, movement, tension, and resolution.</p><h4>Beginning with the Genius Loci</h4><p>Every great garden begins not with pencil and paper, but with an extended period of listening — attending to the genius loci, the spirit of the place. What does the site ask for? What is the quality of its light at different hours?</p><h4>Structure Before Softness</h4><p>The bones of the garden — its walls, paths, terraces, hedges, and water features — must be resolved before a single plant is chosen. A garden with weak structure looks chaotic regardless of how beautiful the planting is. Conversely, a garden with strong bones is magnificent even in the depths of winter.</p><div class='pull-quote'><p>\"The garden must earn its place in the landscape — it should feel as though it has always been there, and always will be.\"</p></div><h4>Planting for Time</h4><p>The most enduring gardens are planted with a thirty-year perspective, choosing species of proven longevity, understanding the eventual size of each specimen, and creating compositions that improve year upon year.</p>",
  },
  outdoor: {
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    cat: "Outdoor Living",
    title: "The Rise of Outdoor Living Spaces",
    author: "Sophie Harrington",
    date: "February 2025",
    body: "<p>The distinction between inside and outside has never been more fluid. For our clients at Aurum Landscapes, the garden is no longer simply a view from the drawing room — it is an extension of the house itself, with all the comfort and sophistication the interior demands.</p><h4>The Architecture of the Outdoors</h4><p>The most successful outdoor living spaces begin with architecture. A bespoke stone pavilion, designed in sympathy with the house and positioned to maximise views and shelter, creates a true room outdoors.</p><h4>The Outdoor Kitchen</h4><p>Of all the features we are commissioned to incorporate, the outdoor kitchen has risen most dramatically in popularity. At its finest, it is a fully equipped culinary space in natural stone with a wood-fired oven, large-format grill, refrigeration, and running water.</p><div class='pull-quote'><p>\"The garden is no longer a view from the drawing room — it is the drawing room.\"</p></div><h4>Water as the Central Motif</h4><p>An infinity pool correctly positioned to borrow the landscape beyond is perhaps the single most powerful gesture available to the luxury garden designer. When the pool water appears to merge with a distant valley, the effect is genuinely theatrical.</p>",
  },
  seasonal: {
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=85",
    cat: "Horticulture",
    title: "Seasonal Garden Guide: Autumn",
    author: "Oliver Marsh",
    date: "January 2025",
    body: "<p>Autumn is the garden's great finale — and its great preparation. The work we do between September and November determines the quality of next year's performance as much as anything we do in spring and summer.</p><h4>Bulb Planting</h4><p>The single most rewarding autumn task is the planting of spring bulbs. Think at scale: tens of thousands of narcissus naturalised in orchard grass, rivers of Camassia through a woodland garden, bold drifts of tulips in the borders. Restraint here is rarely rewarded.</p><h4>Structural Pruning</h4><p>With leaves fallen and structure revealed, autumn is the time to address deciduous trees and shrubs. It becomes possible to see the true form of a specimen and make pruning decisions with clarity and confidence.</p><div class='pull-quote'><p>\"The work we do in autumn determines the quality of next spring's performance.\"</p></div><h4>Soil Enrichment</h4><p>Apply generous quantities of well-rotted farmyard manure or compost to all borders. A 10cm mulch before the ground freezes will feed the soil through winter and suppress weeds in spring.</p>",
  },
};

function openArticleModal(key) {
  var data = articleContent[key];
  if (!data) return;
  var el = document.getElementById("articleModalContent");
  if (!el) return;
  el.innerHTML =
    '<img class="article-modal__img" src="' +
    data.img +
    '" alt="' +
    data.title +
    '" loading="lazy">' +
    '<span class="eyebrow">' +
    data.cat +
    "</span>" +
    '<h2 style="font-size:2rem;margin:0.6rem 0 1rem;font-weight:300;">' +
    data.title +
    "</h2>" +
    '<span class="gold-rule"></span>' +
    '<div style="display:flex;gap:1rem;margin:1rem 0 2rem;font-size:0.7rem;letter-spacing:0.1em;color:var(--text-muted);"><span>' +
    data.author +
    "</span><span>·</span><span>" +
    data.date +
    "</span></div>" +
    '<div class="article-modal__body">' +
    data.body +
    "</div>";
  var modal = document.getElementById("articleModal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeArticleModal() {
  var modal = document.getElementById("articleModal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

var am = document.getElementById("articleModal");
if (am) {
  am.addEventListener("click", function (e) {
    if (e.target === this) closeArticleModal();
  });
}

/* Bind journal cards */
var journalKeys = [
  "timeless",
  "outdoor",
  "seasonal",
  "timeless",
  "outdoor",
  "seasonal",
];
document.querySelectorAll(".journal-card").forEach(function (card, i) {
  card.style.cursor = "pointer";
  card.addEventListener("click", function () {
    openArticleModal(journalKeys[i] || "timeless");
  });
});

/* ── Reveal left/right ──────────────────────────────────── */
function initDirectionalReveal() {
  var els = document.querySelectorAll(
    ".reveal-left:not(.visible), .reveal-right:not(.visible)",
  );
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  els.forEach(function (el) {
    obs.observe(el);
  });
}
document.addEventListener("DOMContentLoaded", initDirectionalReveal);
window.addEventListener("scroll", initDirectionalReveal, { passive: true });

/* ── Image band entrance animation ─────────────────────── */
(function () {
  if (!("IntersectionObserver" in window)) return;
  var obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var img = entry.target.querySelector("img");
        if (!img) return;
        img.style.transition = entry.isIntersecting
          ? "transform 8s cubic-bezier(0.25,0.46,0.45,0.94)"
          : "none";
        img.style.transform = entry.isIntersecting ? "scale(1)" : "scale(1.04)";
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".image-band").forEach(function (b) {
    obs.observe(b);
  });
})();

/* ── Screen reader live region ──────────────────────────── */
var srLive = document.createElement("div");
srLive.setAttribute("aria-live", "polite");
srLive.setAttribute("aria-atomic", "true");
srLive.className = "sr-only";
srLive.style.cssText =
  "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;";
document.body.appendChild(srLive);

/* ── Focus trap for modals ──────────────────────────────── */
function trapFocus(modalEl) {
  if (!modalEl) return;
  modalEl.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var focusable = modalEl.querySelectorAll(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    var first = focusable[0],
      last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
trapFocus(document.getElementById("lightbox"));
trapFocus(document.getElementById("articleModal"));

/* ── Escape key closes any open modal ───────────────────── */
document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  closeArticleModal();
  var lb = document.getElementById("lightbox");
  if (lb && lb.classList.contains("open")) closeLightbox();
});

/* ── Scroll progress ────────────────────────────────────── */
var progressBar = document.getElementById("scrollProgress");
window.addEventListener(
  "scroll",
  function () {
    var s = window.scrollY,
      d = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar)
      progressBar.style.width = (d > 0 ? (s / d) * 100 : 0) + "%";
  },
  { passive: true },
);

/* ── Back to top ────────────────────────────────────────── */
var btt = document.getElementById("backToTop");
window.addEventListener(
  "scroll",
  function () {
    if (btt) btt.classList.toggle("visible", window.scrollY > 600);
  },
  { passive: true },
);
if (btt)
  btt.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

/* ── Float CTA ──────────────────────────────────────────── */
var floatCta = document.getElementById("floatCta");
window.addEventListener(
  "scroll",
  function () {
    if (floatCta) floatCta.classList.toggle("visible", window.scrollY > 400);
  },
  { passive: true },
);

/* ── Page transition wrapper ────────────────────────────── */
var pageTransition = document.getElementById("pageTransition");
var _origShowPage = showPage;
showPage = function (pageId) {
  if (!pageTransition) {
    _origShowPage(pageId);
    return;
  }
  pageTransition.style.transition =
    "transform 0.35s cubic-bezier(0.76,0,0.24,1)";
  pageTransition.style.transform = "translateY(0)";
  setTimeout(function () {
    _origShowPage(pageId);
    pageTransition.style.transform = "translateY(-100%)";
    setTimeout(function () {
      pageTransition.style.transform = "translateY(100%)";
      pageTransition.style.transition = "none";
    }, 400);
    setTimeout(function () {
      initCounters();
    }, 150);
  }, 300);
};

/* ── Testimonial Carousel Init ──────────────────────────── */
(function () {
  var track = document.getElementById("testimonialTrack");
  if (!track) return;
  var slides = track.querySelectorAll(".testimonial-slide");
  var dots = document.querySelectorAll(".testimonial-dot");
  var total = slides.length;
  var cur = 0;

  function goTo(n) {
    cur = ((n % total) + total) % total;
    track.style.transform = "translateX(-" + cur * 100 + "%)";
    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === cur);
      d.setAttribute("aria-selected", i === cur ? "true" : "false");
    });
  }

  dots.forEach(function (d, i) {
    d.addEventListener("click", function () {
      goTo(i);
    });
  });

  /* Touch swipe */
  var touchStartX = null;
  track.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    function (e) {
      if (touchStartX === null) return;
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
      touchStartX = null;
    },
    { passive: true },
  );

  /* Auto-advance */
  var timer = setInterval(function () {
    goTo(cur + 1);
  }, 6500);
  track.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });
  track.addEventListener("mouseleave", function () {
    timer = setInterval(function () {
      goTo(cur + 1);
    }, 6500);
  });
})();

/* ============================================================
   30. EVENT DELEGATION
       Replaces all inline onclick, onsubmit, onmouseover,
       onmouseout handlers that were previously in index.html.
       All behaviour is driven by data-* attributes.
   ============================================================ */

(function () {
  /* ── Navigation: data-page links (desktop nav, footer, CTAs) ── */
  /* Handles any element with data-page="X" anywhere in the document */
  document.addEventListener("click", function (e) {
    /* Find the closest ancestor (or self) that carries data-page */
    var target = e.target.closest("[data-page]");
    if (!target) return;

    e.preventDefault();

    var page = target.getAttribute("data-page");
    var mobile = target.getAttribute("data-mobile") === "true";

    if (page) showPage(page);
    if (mobile) closeMobile();
  });

  /* ── Article modal: data-article="KEY" ────────────────────── */
  document.addEventListener("click", function (e) {
    var target = e.target.closest("[data-article]");
    if (!target) return;
    var key = target.getAttribute("data-article");
    if (key) openArticleModal(key);
  });

  /* ── Consultation form submit ──────────────────────────────── */
  var consultationForm = document.getElementById("consultationForm");
  if (consultationForm) {
    consultationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmit(e);
    });
  }
})();

/* ============================================================
   31. CURSOR HOVER — delegated (replaces inline event handlers)
       Adds/removes cursor-hover class on body when pointer
       enters or leaves any interactive element.
   ============================================================ */
document.addEventListener(
  "mouseover",
  function (e) {
    var el = e.target.closest(
      "a, button, .portfolio-tile, .portfolio-item, .journal-card, .service-card, .team-card",
    );
    document.body.classList.toggle("cursor-hover", !!el);
  },
  { passive: true },
);
