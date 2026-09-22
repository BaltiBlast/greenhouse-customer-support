# AGENTS.md — Services API

## Périmètre

Ces instructions s'appliquent aux fichiers situés dans `web/src/services` et
complètent les instructions du `AGENTS.md` racine et de `web/AGENTS.md`.

## Responsabilités

Le dossier `services` centralise les communications entre le frontend et l'API.

- `api.js` contient le mécanisme HTTP commun à toutes les requêtes.
- Les autres services sont regroupés par domaine métier.
- Une page, une section ou un composant ne doit pas dupliquer la configuration
  HTTP commune.
- Ne pas placer de composant React, de hook ou de style dans ce dossier.
- Ne pas placer de logique de présentation dans un service.

## Client HTTP commun

Le fichier `api.js` est responsable de :

- préfixer les routes avec l'URL de l'API ;
- préparer les headers communs ;
- sérialiser les objets envoyés en JSON ;
- préserver les formats particuliers comme `FormData` ;
- lire les réponses JSON ou texte ;
- normaliser les erreurs HTTP ;
- gérer les réponses sans contenu.

Il ne doit connaître aucun domaine métier et ne doit pas contenir de route
spécifique aux tickets, utilisateurs ou autres ressources.

## Organisation par domaine

Créer un dossier uniquement lorsqu'un domaine métier est effectivement utilisé :

```text
services/
├── api.js
├── tickets/
│   └── tickets.api.js
└── users/
    └── users.api.js
```

- Un fichier `*.api.js` expose des fonctions décrivant les opérations du
  domaine, par exemple `getTickets`, `createTicket` ou `deleteTicket`.
- Ces fonctions construisent la route et les données de la requête, puis
  délèguent la communication à `apiRequest`.
- Créer uniquement les opérations nécessaires au besoin actuel.
- Conserver initialement les opérations d'un même domaine dans un seul fichier.
- Ne découper un domaine en plusieurs fichiers que lorsqu'un besoin réel le
  justifie et après validation de cette nouvelle organisation.
- Ne pas ajouter de règle métier ou d'état React dans les fichiers `*.api.js`.

## Utilisation

- Les pages et leurs sections importent des fonctions métier explicites depuis
  le service concerné.
- Éviter les appels directs à `fetch` en dehors de `api.js`.
- Ne jamais transmettre un secret depuis le frontend.
- Toute évolution concernant l'authentification, les cookies, les fichiers ou un
  format de réponse atypique doit être discutée avant de modifier le client
  commun.
