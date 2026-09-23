# AGENTS.md — Composants partagés

## Périmètre

Ces instructions s'appliquent aux composants situés dans `web/src/components`
et complètent les instructions du `AGENTS.md` racine.

## Responsabilité

Le dossier `components` contient uniquement des éléments réutilisables dans
plusieurs pages ou plusieurs parties indépendantes de l'application.

- Ne pas placer une page dans ce dossier.
- Ne pas utiliser un composant partagé comme substitut à un composant de page.
- Une page reste responsable de la composition générale et de la logique liée à
  sa route.
- Une partie utilisée par une seule page reste dans le dossier `sections` de
  cette page.
- Lorsqu'une section devient réellement réutilisable, la déplacer dans ce
  dossier et lui donner une interface générique.

## Organisation

Chaque composant possède son propre dossier et regroupe uniquement ses
ressources nécessaires :

```text
components/
└── NomComposant/
    ├── NomComposant.jsx
    ├── NomComposant.module.css  # si des styles sont nécessaires
    ├── NomComposant.data.js     # si des données statiques sont nécessaires
    └── sections/                # si le composant doit être découpé
```

- Ne créer que les fichiers et sous-dossiers réellement nécessaires.
- Colocaliser le JSX, les styles, les données statiques et les éléments internes
  propres au composant.
- Ne pas créer un composant pour un fragment de JSX trivial.
- Utiliser des noms explicites décrivant le rôle de l'élément.

## Logique

- Le composant principal exporté doit être la dernière déclaration de niveau
  module dans son fichier.
- Placer les petites fonctions et les petits composants strictement internes
  au-dessus du composant principal.
- Déplacer un élément interne dans un fichier dédié lorsqu'il possède sa propre
  logique, ses propres ressources ou qu'il nuit à la lisibilité du composant
  principal.
- Ne rien déclarer sous le composant principal exporté.
- Le composant principal orchestre la logique partagée par ses éléments
  internes.
- Une logique strictement locale reste dans l'élément interne qui la possède.
- Extraire une logique complexe dans un hook dédié lorsqu'elle nuit à la
  lisibilité du composant.
- Recevoir les données et les actions propres au contexte par des props
  explicites.
- Ne pas dépendre directement de la structure interne d'une page particulière.
- Éviter d'intégrer dans un composant partagé une règle métier propre à une seule
  page.

## Styles et données

- Utiliser un CSS Module colocalisé uniquement lorsque le composant nécessite
  des styles propres.
- Placer les données statiques propres au composant dans un fichier
  `NomComposant.data.js` uniquement si cela améliore la lisibilité.
- Ne jamais placer dans un fichier de données statiques un état modifiable ou
  des données reçues depuis l'API.
