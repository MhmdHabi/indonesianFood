import "regenerator-runtime";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "../styles/main.css";
import "../styles/responsive.css";
import "../styles/restaurant-detail.css";
import "../styles/favorite-restaurant.css";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const START = 10;
const NUMBER_OF_IMAGES = 100;

const app = new App();
document.querySelectorAll('a[href="/"], a#drawer-home-link').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = "/";
    app.renderPage();
  });
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", async () => {
  app.renderPage();
  await swRegister();
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
