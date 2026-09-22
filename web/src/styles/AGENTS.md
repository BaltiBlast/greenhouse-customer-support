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

## Variables globales

- Utiliser les variables `--space-*` pour les marges, paddings et espacements.
- Ne pas créer d'échelles distinctes pour les marges et les paddings.
- Utiliser `--font-family-base` pour la police principale de l'application.
- Utiliser les variables `--font-size-*` pour les tailles de texte.
- Utiliser les variables `--color-*` selon leur rôle sémantique afin que les
  styles restent compatibles avec les thèmes clair et sombre.
- Ne pas écrire directement une couleur propre au thème dans un CSS Module.
- Privilégier les variables existantes aux valeurs écrites directement dans les
  CSS Modules.
- Toute nouvelle catégorie de variable globale doit être discutée avant son
  ajout.
