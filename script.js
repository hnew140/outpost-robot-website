// Fill these in as they become available — see README.md for details on each.
const CONFIG = {
  launchDateISO: "2027-01-15T00:00:00+01:00",
  discordUrl: "https://discord.gg/kXcv6tB7h",
  steamUrl: "",
  questUrl: "",
  // Mailchimp/Brevo embedded-form action URL. Leave empty to run in demo mode
  // (the form validates and shows a success message but sends nothing).
  emailFormAction: "",
};

document.getElementById("year").textContent = new Date().getFullYear();

// --- Language toggle ---
const LANG_KEY = "outpostrobot_lang";
let currentLang = "fr";
try {
  currentLang = localStorage.getItem(LANG_KEY) || "fr";
} catch (e) {}

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-" + lang + "]").forEach((el) => {
    el.textContent = el.getAttribute("data-" + lang);
  });
  document.querySelectorAll("[data-" + lang + "-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", el.getAttribute("data-" + lang + "-placeholder"));
  });
  document.getElementById("langToggle").textContent = lang === "fr" ? "EN" : "FR";
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
}

document.getElementById("langToggle").addEventListener("click", () => {
  applyLang(currentLang === "fr" ? "en" : "fr");
});

applyLang(currentLang);

// --- Countdown ---
const launchDate = new Date(CONFIG.launchDateISO).getTime();

function updateCountdown() {
  const diff = launchDate - Date.now();
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds"),
  };
  if (diff <= 0) {
    els.days.textContent = els.hours.textContent = els.minutes.textContent = els.seconds.textContent = "00";
    return;
  }
  const day = Math.floor(diff / 86400000);
  const hour = Math.floor((diff % 86400000) / 3600000);
  const minute = Math.floor((diff % 3600000) / 60000);
  const second = Math.floor((diff % 60000) / 1000);
  els.days.textContent = String(day);
  els.hours.textContent = String(hour).padStart(2, "0");
  els.minutes.textContent = String(minute).padStart(2, "0");
  els.seconds.textContent = String(second).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// --- Link cards (Steam / Meta Quest / Discord) ---
function wireLink(elementId, url) {
  const el = document.getElementById(elementId);
  if (url) {
    el.href = url;
    el.classList.remove("is-disabled");
  }
}

wireLink("steamLink", CONFIG.steamUrl);
wireLink("questLink", CONFIG.questUrl);
wireLink("discordLink", CONFIG.discordUrl);

// --- Email form ---
const emailForm = document.getElementById("emailForm");
const emailFeedback = document.getElementById("emailFeedback");
const feedbackText = {
  fr: { ok: "Merci ! Tu seras prévenu au lancement.", err: "Adresse email invalide.", demo: "Merci ! (mode démo — connecte un service d'emailing dans script.js pour collecter réellement les adresses)" },
  en: { ok: "Thanks! You'll be notified at launch.", err: "Invalid email address.", demo: "Thanks! (demo mode — wire up an email service in script.js to actually collect addresses)" },
};

emailForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("emailInput").value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  emailFeedback.classList.remove("is-error");

  if (!isValid) {
    emailFeedback.textContent = feedbackText[currentLang].err;
    emailFeedback.classList.add("is-error");
    return;
  }

  if (!CONFIG.emailFormAction) {
    emailFeedback.textContent = feedbackText[currentLang].demo;
    emailForm.reset();
    return;
  }

  try {
    // no-cors: most embedded-signup endpoints (Mailchimp, Brevo) don't return
    // CORS headers, so the response is opaque — we treat any non-throw as success.
    await fetch(CONFIG.emailFormAction, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ EMAIL: email }),
    });
    emailFeedback.textContent = feedbackText[currentLang].ok;
    emailForm.reset();
  } catch (err) {
    emailFeedback.textContent = feedbackText[currentLang].err;
    emailFeedback.classList.add("is-error");
  }
});
