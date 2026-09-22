# AGENTS.md — Thèmes

## Périmètre

Ces instructions s'appliquent à `web/src/theme` et complètent celles du
`AGENTS.md` racine et de `web/AGENTS.md`.

## Fonctionnement

- L'application propose uniquement les préférences `light` et `dark`.
- La préférence est conservée dans `localStorage`.
- Lors de la première visite, le thème du système détermine le thème initial.
- Après la première interaction, le choix explicite de la coach est conservé.
- Le thème actif est appliqué avec l'attribut `data-theme` sur l'élément
  `<html>`.
- Le thème est initialisé avant le rendu React afin de limiter un changement de
  couleur visible au chargement.

## Responsabilités

- `theme.js` contient les fonctions indépendantes de React.
- `ThemeProvider.jsx` expose le thème actif et permet de le modifier.
- `useTheme.js` constitue le seul accès au contexte depuis un composant.
- Ne pas lire ou modifier directement `localStorage` depuis un composant.
- Ne pas modifier directement `data-theme` en dehors de `theme.js`.
- Les couleurs sont définies sous forme de variables sémantiques dans
  `src/styles/globals.css`.
- Toute nouvelle préférence ou stratégie de thème doit être discutée avant son
  ajout.
