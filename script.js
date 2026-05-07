const header = document.querySelector(".site-header");
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

let lastScrollY = window.scrollY;
let scrollTimer;

// burger menu
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navMenu.classList.toggle("active");
  header.classList.toggle("menu-open");

  const isExpanded = burger.classList.contains("active");
  burger.setAttribute("aria-expanded", isExpanded);
});

// close menu when a link is clicked on mobile
document.querySelectorAll(".nav-center a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navMenu.classList.remove("active");
    header.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// header behavior on scroll
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // solid header after scrolling a bit
  if (currentScrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // do not auto-hide while mobile menu is open
  if (!header.classList.contains("menu-open")) {
    // show when scrolling up
    if (currentScrollY < lastScrollY || currentScrollY <= 50) {
      header.classList.remove("hide");
    }

    // hide when scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 220) {
      header.classList.add("hide");
    }

    // hide after scrolling stops
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (window.scrollY > 120 && !header.classList.contains("menu-open")) {
        header.classList.add("hide");
      }
    }, 1200);
  }

  lastScrollY = currentScrollY;
});

/*==============*/
/* CURRENT YEAR */
/*==============*/

document.getElementById("year").textContent = new Date().getFullYear();

/*==============*/
/*   CAROUSEL   */
/*==============*/

const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const images = carousel.querySelectorAll(".carousel-img");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const barsContainer = carousel.querySelector(".carousel-bars");

  let currentIndex = 0;

  images.forEach((_, index) => {
    const bar = document.createElement("button");
    bar.classList.add("carousel-bar");
    bar.type = "button";

    if (index === 0) bar.classList.add("active");

    bar.addEventListener("click", () => {
      currentIndex = index;
      showImage(currentIndex);
    });

    barsContainer.appendChild(bar);
  });

  const bars = carousel.querySelectorAll(".carousel-bar");

  function showImage(index) {
    images.forEach((img) => img.classList.remove("active"));
    bars.forEach((bar) => bar.classList.remove("active"));

    images[index].classList.add("active");
    bars[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }

    showImage(currentIndex);
  });
});

/*=======================*/
/* LIGHTBOX IMAGE OPENER */
/*=======================*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("lightbox-close");

const nextBtn = document.querySelector(".next-lightbox");
const prevBtn = document.querySelector(".prev-lightbox");

const images = document.querySelectorAll(
  ".bespoke-garden-design img, .garden-item img, .carousel-img, .before-after-grid img, .img-opener",
);

let currentIndex = 0;

function showImage(index) {
  lightboxImg.src = images[index].src;
  lightboxImg.alt = images[index].alt || "";
}

function openLightbox(index) {
  currentIndex = index;

  showImage(currentIndex);

  lightbox.classList.add("active");
}

function closeLightbox() {
  lightbox.classList.remove("active");
}

function showNextImage() {
  currentIndex++;

  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
}

function showPrevImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showImage(currentIndex);
}

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    openLightbox(index);
  });
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showNextImage();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showPrevImage();
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeLightbox();
  }

  if (e.key === "ArrowRight") {
    showNextImage();
  }

  if (e.key === "ArrowLeft") {
    showPrevImage();
  }
});

/*===================*/
/* SCREEN PRE-LOADER */
/*===================*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // already shown during this browser session
  if (sessionStorage.getItem("aurumPreloaderShown")) {
    preloader.style.display = "none";
    return;
  }

  // first visit this session
  sessionStorage.setItem("aurumPreloaderShown", "true");

  // fade out loader
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 4000);
});
