// ---------- Menu mobile ----------
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ---------- Thème clair / sombre ----------
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeBtn.textContent = "Mode clair";
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "Mode sombre";
  }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ---------- Texte qui s'écrit dans le terminal ----------
const phrases = [
  "Étudiante en informatique",
  "Je construis des sites web",
  "Je cherche un stage",
];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typed.textContent = phrases[0];
} else {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];
    charIndex += deleting ? -1 : 1;
    typed.textContent = current.slice(0, charIndex);

    let delay = deleting ? 40 : 80;
    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

// ---------- Formulaire de contact ----------
// Ouvre le logiciel de messagerie avec le message pré-rempli.
// Remplace l'adresse ci-dessous par la tienne.
const MON_EMAIL = "ton.email@exemple.com";

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent("Message depuis ton portfolio – " + name);
  const body = encodeURIComponent(message + "\n\n" + name + " (" + email + ")");
  window.location.href = "mailto:" + MON_EMAIL + "?subject=" + subject + "&body=" + body;

  document.getElementById("formStatus").textContent =
    "Ton application de messagerie s'ouvre. Envoie le message depuis celle-ci.";
});

// ---------- Année du pied de page ----------
document.getElementById("year").textContent = new Date().getFullYear();
