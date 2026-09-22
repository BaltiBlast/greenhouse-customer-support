# AGENTS.md — Frontend

## Périmètre

Ces instructions s'appliquent à l'application frontend située dans `web` et
complètent celles du `AGENTS.md` racine. Les fichiers `AGENTS.md` plus
spécifiques présents dans `src` restent applicables à leur périmètre.

## Technologies

- Utiliser React avec Vite.
- Utiliser JavaScript et JSX, sans TypeScript.
- Utiliser exclusivement les ES Modules avec `import` et `export`.
- Inclure l'extension des fichiers locaux dans les imports.
- Ne jamais utiliser CommonJS (`require`, `module.exports` ou `exports`).
- Ne pas ajouter de dépendance sans besoin concret et validé.

## Architecture

- `src/pages` contient les pages associées aux routes.
- `src/components` contient uniquement les composants réellement partagés.
- `src/services` centralise les communications avec l'API.
- `src/styles` contient le reset, les variables et les styles globaux.
- `src/theme` contient la gestion des thèmes clair et sombre.
- `src/assets` contient les ressources statiques importées par l'application.
- `public/icons` contient les favicons et les icônes destinées au manifeste web.
- Consulter le fichier `AGENTS.md` du dossier concerné avant toute modification.

## Routage

- Utiliser React Router en mode déclaratif.
- Placer `BrowserRouter` uniquement dans `src/main.jsx`.
- Centraliser les déclarations `Routes` et `Route` dans `src/App.jsx` tant que
  leur complexité ne justifie pas une organisation dédiée.
- Chaque route fonctionnelle doit afficher un composant provenant de
  `src/pages`.
- Ne pas déclarer de route dans un composant partagé ou dans une section.
- Utiliser `Link` ou `NavLink` pour la navigation interne.
- Ne pas utiliser une balise `<a>` pour naviguer vers une route interne.
- Conserver le chargement et l'orchestration des données dans le composant
  principal de la page ; ne pas introduire de `loader` ou d'`action` React
  Router sans décision explicite.

## Validation

- Exécuter `npm run build --workspace=web` après une modification du code
  frontend susceptible d'affecter la compilation.
- Signaler clairement toute validation non exécutée ou toute erreur restante.
