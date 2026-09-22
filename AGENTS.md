# AGENTS.md

## Projet

Ce dépôt est un monorepo npm Workspaces composé de :

- `web` : application frontend React.
- `api` : API Node.js avec Express.
- `packages` : bibliothèques internes partagées.

## Routage des instructions

Avant toute analyse ou modification :

- Pour une demande concernant le frontend, consulter et respecter
  `web/AGENTS.md`.
- Pour une demande concernant le backend, consulter et respecter
  `api/AGENTS.md`.
- Pour une demande concernant du code partagé, consulter et respecter
  `packages/AGENTS.md`.
- Pour une demande qui touche plusieurs parties, consulter tous les
  `AGENTS.md` concernés.

Les instructions les plus proches des fichiers concernés complètent les
présentes instructions et ont priorité en cas de règle plus spécifique.

## Règles générales

- Utiliser npm et npm Workspaces.
- Exécuter les validations pertinentes après chaque modification.
- Ne pas modifier une application lorsqu’une demande ne concerne que l’autre.
- Ne pas dupliquer dans une application du code appartenant à un package partagé.
- Ne jamais versionner de secret ou de fichier `.env`.
- Mettre à jour la documentation lorsqu’un changement modifie l’utilisation ou
  l’architecture du projet.

## Conventions de nommage des commits

Utiliser le format suivant :

```text
type(périmètre): description courte à l'infinitif
```

Le périmètre est obligatoire :

- `api` pour une modification du backend ;
- `web` pour une modification du frontend ;
- `shared` pour une modification limitée aux packages partagés ;
- `repo` pour une modification transversale concernant le monorepo.

Utiliser le type correspondant à la nature du changement :

- `feat` pour une nouvelle fonctionnalité ;
- `fix` pour une correction fonctionnelle ou technique ;
- `hotfix` pour une correction urgente destinée à la production ;
- `bug` pour la correction ciblée d'un bug identifié ;
- `docs` pour la documentation uniquement ;
- `chore` pour la maintenance, la configuration ou l'outillage ;
- `refactor` pour une restructuration sans changement fonctionnel.

Exemples :

```text
feat(api): ajouter la création des tickets
fix(web): corriger l'affichage du formulaire mobile
hotfix(api): empêcher la création de tickets sans utilisateur
bug(web): corriger la fermeture de la fenêtre modale
chore(repo): initialiser les workspaces npm
```

Lorsqu'un commit modifie à la fois l'API et le web, utiliser le périmètre `repo`
et décrire clairement le changement transversal. Écrire la description en
minuscules, sans point final, et conserver un commit centré sur un seul objectif.
