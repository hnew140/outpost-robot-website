// Fill these in as they become available — see README.md for details on each.
const CONFIG = {
  discordUrl: "https://discord.gg/fBwEQkXWgV",
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

// --- Link cards (Steam / Meta Quest / Discord) ---
function wireLink(elementId, url, activeLabel) {
  const el = document.getElementById(elementId);
  if (!url) return;
  el.href = url;
  el.classList.remove("is-disabled");
  const status = el.querySelector(".link-status");
  if (status && activeLabel) {
    status.setAttribute("data-fr", activeLabel.fr);
    status.setAttribute("data-en", activeLabel.en);
  }
}

wireLink("steamLink", CONFIG.steamUrl, { fr: "Wishlist", en: "Wishlist" });
wireLink("questLink", CONFIG.questUrl, { fr: "Wishlist", en: "Wishlist" });
wireLink("discordLink", CONFIG.discordUrl, { fr: "Rejoindre", en: "Join" });
wireLink("heroDiscord", CONFIG.discordUrl);
applyLang(currentLang);

// --- Email form (MailerLite hosted form, embedded via iframe) ---
const mailerliteFrame = document.getElementById("mailerliteFrame");
if (CONFIG.mailerliteFormUrl) {
  mailerliteFrame.src = CONFIG.mailerliteFormUrl;
} else {
  mailerliteFrame.closest(".email-section").style.display = "none";
}
