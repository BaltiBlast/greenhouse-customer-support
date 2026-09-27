# AGENTS.md : API

## Périmètre

Ces instructions s'appliquent à l'application backend située dans `api`.
Les instructions du fichier `AGENTS.md` à la racine du dépôt restent applicables.

## Technologies

- Node.js
- Express
- npm Workspace

Le backend utilise exclusivement les ES Modules :

- utiliser `import` et `export` ;
- inclure l'extension des fichiers locaux dans les imports ;
- ne jamais utiliser CommonJS (`require`, `module.exports` ou `exports`).

Ne pas ajouter de framework, de base de données ou de dépendance sans vérifier
les choix déjà présents dans le workspace et sans que la demande le nécessite.

## Organisation

L'API suit une architecture modulaire orientée fonctionnalité :

```text
api/
├── config/       # Chargement et validation de la configuration
├── data/         # Connexion, mappers et schemas de persistance
│   ├── mappers/  # Mappers et requêtes vers la base de données
│   ├── schemas/  # Définition des schemas Mongoose
│   └── database.js
├── middlewares/  # Middlewares Express transversaux
├── modules/      # Fonctionnalités métier
├── app.*         # Création et configuration de l'application Express
├── server.*      # Démarrage du serveur HTTP
└── package.json
```

- `app.*` configure Express et exporte l'application sans démarrer l'écoute.
- `server.*` charge la configuration et démarre le serveur.
- Une fonctionnalité métier doit être placée dans `modules/<fonctionnalite>`.
- La logique de persistance doit rester dans `data`.
- Les préoccupations transversales ne doivent pas être placées dans un module
  métier arbitraire.

## Routage des instructions

Avant de modifier un module métier, consulter `modules/AGENTS.md`.

Avant de modifier l'accès aux données, consulter `data/AGENTS.md`, puis le
fichier `AGENTS.md` du sous-dossier concerné.

Lorsqu'une demande touche plusieurs périmètres, consulter tous les fichiers
`AGENTS.md` concernés avant de commencer les modifications.

## Dépendances entre les couches

Le flux habituel est :

```text
routes → controllers → services → accès aux données
```

- Une route ne contient pas de logique métier.
- Un controller adapte la requête et la réponse HTTP.
- Un service porte les règles métier et reste indépendant d'Express autant que
  possible.
- La couche d'accès aux données ne dépend ni d'Express ni des controllers.
- Éviter les dépendances circulaires entre modules.

## Routing

- Le fichier `*.routes.js` de chaque module doit être importé dans
  `api/router.js`.
- `api/router.js` regroupe tous les routers de tous les modules.
- Les routes des modules ne doivent jamais être déclarées directement dans
  `app.js`.
- `app.js` utilise uniquement le router central pour monter les routes de l'API.

Chaque fichier `*.routes.js` doit :

- créer un router Express ;
- déclarer les routes du module ;
- appeler les controllers du module ;
- exporter le router du module.

## API et sécurité

- Valider toutes les données provenant du client avant leur utilisation.
- Retourner directement un tableau JSON lorsqu'une route expose plusieurs
  ressources et un objet JSON lorsqu'elle expose une ressource unique.
- Ne pas envelopper ces données dans une propriété portant le nom de la
  ressource.
- Ne jamais exposer une stack trace, un secret ou une donnée interne dans une
  réponse HTTP.
- Centraliser la gestion des erreurs Express dans un middleware dédié.
- Charger les secrets depuis l'environnement et ne jamais versionner `.env`.
- Appliquer les contrôles d'authentification et d'autorisation avant la logique
  métier protégée.

## Authentification et sessions

- Utiliser des sessions serveur avec `express-session`.
- Stocker les sessions dans MongoDB avec `connect-mongo`.
- Transmettre uniquement l'identifiant de session dans un cookie `HttpOnly`,
  `SameSite=Lax` et `Secure` en production.
- Utiliser Argon2id pour le hachage et la vérification des mots de passe.
- Ne jamais exposer un hash de mot de passe dans une réponse HTTP.
- Ne pas ajouter de route publique d'inscription sans décision explicite.
- Charger le secret de session depuis l'environnement.

## Modifications et validation

- Limiter les modifications au périmètre demandé.
- Examiner les conventions et les scripts existants avant de créer un fichier.
- Ne pas modifier `package.json` ou le lockfile sauf si la tâche le nécessite.
- Après une modification, exécuter les scripts pertinents définis dans le
  `package.json` du workspace : tests, lint, vérification des types et build.
- Si aucun test automatisé pertinent n'existe, signaler clairement ce qui a été
  vérifié manuellement.
