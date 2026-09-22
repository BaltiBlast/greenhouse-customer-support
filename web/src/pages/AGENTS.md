# AGENTS.md — Pages

## Périmètre

Ces instructions s'appliquent à toutes les pages situées dans `web/src/pages`
et complètent les instructions du `AGENTS.md` racine.

## Organisation

Chaque page possède son propre dossier et regroupe les ressources qui lui sont
spécifiques :

```text
pages/
└── nom-page/
    ├── NomPage.page.jsx
    ├── NomPage.module.css
    ├── NomPage.data.js        # si des données statiques sont nécessaires
    └── sections/              # si la page doit être découpée en sections
        └── NomSection/
            ├── NomSection.jsx
            └── NomSection.module.css
```

- Ne créer que les fichiers et dossiers nécessaires à la page.
- Conserver dans le dossier de la page les sections, styles et données qui ne
  sont utilisés que par celle-ci.
- Déplacer une section vers les composants partagés uniquement lorsqu'elle est
  réellement utilisée par plusieurs pages.
- Utiliser un CSS Module colocalisé pour les styles propres à une page ou à un
  composant.
- Nommer le fichier JSX principal avec le suffixe `.page.jsx`, par exemple
  `Tickets.page.jsx`.
- Nommer son CSS Module sans répéter le suffixe `page`, par exemple
  `Tickets.module.css`.
- Le composant React exporté conserve un nom explicite avec le suffixe `Page`,
  par exemple `TicketsPage`.

## Composition

- Le composant principal de la page assemble ses différentes sections.
- Créer un composant de section lorsque cela améliore réellement la lisibilité,
  l'isolation des responsabilités ou la réutilisation.
- Ne pas extraire un composant pour un fragment de JSX trivial.
- Une section propre à une page reste dans le dossier `sections` de cette
  page.

## Logique

- Le composant principal de la page orchestre la logique propre à l'ensemble de
  la page : chargement des données, état partagé entre plusieurs sections,
  coordination des actions et gestion des états globaux de chargement ou
  d'erreur.
- Transmettre aux sections les données et actions nécessaires avec des props
  explicites.
- Conserver une logique strictement locale dans le composant qui la possède,
  lorsqu'elle n'affecte aucune autre section de la page.
- Extraire une logique complexe dans un hook dédié lorsqu'elle nuit à la
  lisibilité du composant principal.
- Ne pas placer dans une page une logique générique déjà disponible ailleurs.

## Données statiques

- Placer les données statiques spécifiques à une page dans un fichier
  `*.data.js` situé à sa racine.
- Exporter des structures simples et explicites.
- Ne pas utiliser un fichier de données pour stocker un état modifiable ou une
  donnée reçue depuis l'API.
- Déplacer une donnée vers un emplacement partagé uniquement lorsqu'elle est
  utilisée par plusieurs pages.
