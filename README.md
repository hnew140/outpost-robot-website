# Outpost Robot — Coming Soon

Landing page statique (HTML/CSS/JS, aucune dépendance à installer).

## Configurer les liens et l'emailing

Tout se passe en haut de `script.js`, dans le bloc `CONFIG` :

- `launchDateISO` — date/heure de lancement utilisée par le compte à rebours.
- `discordUrl`, `steamUrl`, `questUrl` — laisser vide tant que le lien n'existe pas (le bouton reste grisé "Bientôt disponible"), renseigner l'URL une fois prête pour l'activer automatiquement.
- `emailFormAction` — URL du formulaire d'inscription Mailchimp ou Brevo. Vide = mode démo (le formulaire valide l'email et affiche un message de confirmation mais n'envoie rien).
  - Mailchimp : récupère l'URL "action" de ton formulaire embarqué (Audience > Signup forms > Embedded forms).
  - Brevo : récupère l'URL de ton formulaire dans Contacts > Formulaires.
  - Le champ envoyé s'appelle `EMAIL` (convention Mailchimp) — si Brevo attend un autre nom de champ, ajuste-le dans `script.js`.

## Aperçu en local

Ouvre simplement `index.html` dans un navigateur, ou lance un petit serveur local :

```bash
npx serve .
```

## Déploiement

Le site est statique, il se déploie tel quel sur Vercel ou Hostinger (déjà pris selon le tracker marketing) :

- **Vercel** : `npx vercel` depuis ce dossier, ou glisser-déposer le dossier sur vercel.com.
- **Hostinger** : upload des 4 fichiers (`index.html`, `style.css`, `script.js`, ce `README.md` n'est pas nécessaire en ligne) via le gestionnaire de fichiers ou FTP.
