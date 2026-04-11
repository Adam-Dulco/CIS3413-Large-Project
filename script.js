/* HAMBURGER MENU */

const toggle = document.querySelector(".nav-toggle");
const navCenter = document.querySelector(".nav-center");

toggle.addEventListener("click", () => {
  const isOpen = navCenter.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", isOpen);
});

// Close menu when a link is clicked
navCenter.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navCenter.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
  });
});
