// Fill these in as they become available — see README.md for details on each.
const CONFIG = {
  launchDateISO: "2027-01-15T00:00:00+01:00",
  discordUrl: "https://discord.gg/kXcv6tB7h",
  steamUrl: "",
  questUrl: "",
  // MailerLite embedded form's "Share url" (Forms > Embedded forms > your form > Share url).
  // Leave empty to hide the signup form.
  mailerliteFormUrl: "https://preview.mailerlite.io/forms/2662876/199687236661282228/share",
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

// --- Email form (MailerLite hosted form, embedded via iframe) ---
const mailerliteFrame = document.getElementById("mailerliteFrame");
if (CONFIG.mailerliteFormUrl) {
  mailerliteFrame.src = CONFIG.mailerliteFormUrl;
} else {
  mailerliteFrame.closest(".email-section").style.display = "none";
}
