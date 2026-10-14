# Outpost Robot — Coming Soon

Landing page statique (HTML/CSS/JS, aucune dépendance à installer), en ligne sur https://outpostrobot.com.

## Liens et formulaire

Tout se passe en haut de `script.js`, dans le bloc `CONFIG` :

- `discordUrl`, `steamUrl`, `questUrl` — laisser vide tant que le lien n'existe pas (la carte reste grisée « Bientôt disponible »). Une fois l'URL renseignée, la carte s'active et affiche « Rejoindre » (Discord) ou « Wishlist » (Steam / Meta Quest).
- `mailerliteFormUrl` — « Share url » du formulaire MailerLite (Forms > Embedded forms). Il s'affiche dans une iframe. Vide = la section est masquée.

Le design du formulaire (couleurs, textes) se règle dans MailerLite, pas dans ce dépôt.

## Fichiers

- `index.html`, `style.css`, `script.js` — le site (FR/EN, texte dans les attributs `data-fr` / `data-en`).
- `404.html` — page d'erreur affichée par GitHub Pages.
- `fonts/` — polices Inter et Orbitron hébergées ici (licence OFL), pas de requête vers Google.
- `og-image.jpg` (1200×630) — aperçu affiché quand le lien est partagé (Discord, X, etc.).
- `favicon.ico`, `favicon-192.png`, `apple-touch-icon.png` — icônes, générées depuis l'illustration du robot.
- `robots.txt`, `sitemap.xml` — référencement.

Après une modification de `style.css` ou `script.js`, incrémente `?v=` dans `index.html` et `404.html` pour forcer les navigateurs à recharger.

## Aperçu en local

Ouvre `index.html` dans un navigateur, ou lance un petit serveur local (`python -m http.server` ou `npx serve .`).

## Déploiement

Hébergé gratuitement sur GitHub Pages (branche `main`, racine). Chaque `git push` met le site à jour en une à deux minutes. Le domaine `outpostrobot.com` est déclaré dans le fichier `CNAME` et dans la zone DNS OVH.
