# AGENTS.md : Frontend

## Périmètre

Ces instructions s'appliquent à l'application frontend située dans `web` et
complètent celles du `AGENTS.md` racine. Les fichiers `AGENTS.md` plus
spécifiques présents dans `src` restent applicables à leur périmètre.

## Technologies

- Utiliser React avec Vite.
- Utiliser React Hook Form pour les formulaires applicatifs.
- Utiliser JavaScript et JSX, sans TypeScript.
- Utiliser exclusivement les ES Modules avec `import` et `export`.
- Inclure l'extension des fichiers locaux dans les imports.
- Ne jamais utiliser CommonJS (`require`, `module.exports` ou `exports`).
- Ne pas ajouter de dépendance sans besoin concret et validé.

## Architecture

- `src/pages` contient les pages associées aux routes.
- `src/components` contient uniquement les composants réellement partagés.
- `src/data` centralise les données statiques utilisées par plusieurs pages.
- `src/services` centralise les communications avec l'API.
- `src/styles` contient le reset, les variables et les styles globaux.
- `src/theme` contient la gestion des thèmes clair et sombre.
- `src/assets` contient les ressources statiques importées par l'application.
- `public/icons` contient les favicons et les icônes destinées au manifeste web.
- Consulter le fichier `AGENTS.md` du dossier concerné avant toute modification.

## Routage

- Utiliser React Router en mode déclaratif.
- Écrire tous les segments de route en anglais, même lorsque les libellés
  visibles dans l'interface sont en français.
- Utiliser des segments en minuscules et en kebab-case lorsqu'ils contiennent
  plusieurs mots, par exemple `/group-classes`.
- Utiliser `new` pour une création et `edit` pour une modification.
- Nommer les paramètres dynamiques en anglais et en camelCase, par exemple
  `:clientId`, `:sessionId` ou `:classId`.
- Construire les routes de détail avec l'identifiant technique unique et
  persistant de la ressource, jamais avec son nom ou un libellé métier.
- Placer `BrowserRouter` uniquement dans `src/main.jsx`.
- Centraliser les déclarations `Routes` et `Route` dans `src/App.jsx` tant que
  leur complexité ne justifie pas une organisation dédiée.
- Chaque route fonctionnelle doit afficher un composant provenant de
  `src/pages`.
- Ne pas déclarer de route dans un composant partagé ou dans une section.
- Utiliser `Link` ou `NavLink` pour la navigation interne.
- Ne pas utiliser une balise `<a>` pour naviguer vers une route interne.
- Réinitialiser globalement la position de défilement en haut de la page à
  chaque changement de chemin avec le composant `ScrollToTop`.
- Conserver le chargement et l'orchestration des données dans le composant
  principal de la page ; ne pas introduire de `loader` ou d'`action` React
  Router sans décision explicite.

## Validation

- Exécuter `npm run build --workspace=web` après une modification du code
  frontend susceptible d'affecter la compilation.
- Signaler clairement toute validation non exécutée ou toute erreur restante.
