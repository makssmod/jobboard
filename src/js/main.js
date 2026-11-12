// LR2: markup only. The burger keeps aria-expanded in sync with the menu state;
// the visual open/closed menu is styled in LR3, data loading comes in LR4.
const burger = document.querySelector(".header__burger");
const nav = document.getElementById("main-nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    burger.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    nav.classList.toggle("nav--open", !isOpen);
  });
}
