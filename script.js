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
