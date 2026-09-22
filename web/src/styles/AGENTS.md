# AGENTS.md — Styles globaux

## Périmètre

Ces instructions s'appliquent aux fichiers situés dans `web/src/styles` et
complètent les instructions du `AGENTS.md` racine et de `web/AGENTS.md`.

## Responsabilité

Ce dossier contient uniquement :

- les règles de reset communes à toute l'application ;
- les variables et valeurs visuelles globales ;
- les styles réellement applicables à l'ensemble de l'application.

- Placer les normalisations du navigateur dans `reset.css`.
- Placer les variables CSS et les règles globales dans `globals.css`.
- Ne pas placer ici un style propre à une page, une section ou un composant.
- Les styles spécifiques doivent rester dans le CSS Module colocalisé avec
  l'élément concerné.
- Ne pas ajouter de nouvelle valeur globale lorsqu'une valeur existante répond
  déjà au besoin.
