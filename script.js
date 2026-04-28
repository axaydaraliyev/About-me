const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

setTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Menyuni yopish" : "Menyuni ochish");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

function setTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "Light mode yoqish" : "Dark mode yoqish");
}

function closeMenu() {
  menu.classList.remove("is-open");
  body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menyuni ochish");
}
