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
