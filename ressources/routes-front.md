# Routes du frontend

## Objectif

Ce document recense les routes prévues pour l'application frontend et décrit le
rôle de chaque page.

L'application doit rester simple à utiliser sur mobile, tablette et ordinateur.
La navigation principale est volontairement limitée. Les pages de création, de
modification et de détail sont accessibles depuis les actions proposées dans les
pages principales.

## Navigation principale

La navigation principale contient deux entrées :

- Tableau de bord ;
- Clients.

## Routes

### `/login`

Affiche le formulaire permettant à la coach de se connecter à l'application.
Cette page est accessible uniquement lorsqu'aucune session valide n'est active.

### `/`

Affiche le planning principal. La coach consulte par défaut la journée actuelle,
peut choisir une autre date ou une semaine complète, puis filtrer les coachings
et les cours collectifs. La vue hebdomadaire utilise une grille sur ordinateur
et une liste regroupée par journée sur mobile.

### `/clients`

Affiche la liste des clients sportifs. Cette page permet de rechercher un client,
d'ouvrir sa fiche et d'accéder à la création d'un nouveau client.

### `/clients/new`

Affiche le formulaire de création d'un client sportif.

### `/clients/:clientId`

Affiche la fiche complète d'un client : informations générales, objectifs,
éléments utiles à l'adaptation de l'accompagnement, mesures et historique des
séances individuelles.

### `/clients/:clientId/edit`

Affiche le formulaire de modification du client. Cette route réutilise le même
composant de page et la même structure de formulaire que la création.

### `/events/new`

Affiche le formulaire de création d'un événement. La coach choisit son type dans
le formulaire, puis renseigne les informations propres à un coaching individuel
ou à un cours collectif.

### `/events/:eventId`

Affiche les détails d'un événement existant. Le contenu présenté dépend de son
type : coaching individuel ou cours collectif. Aucun statut de rendez-vous ou
compte rendu obligatoire n'est imposé.

### `/events/:eventId/edit`

Affiche le formulaire de modification correspondant au type de l'événement. Un
coaching individuel et un cours collectif conservent leurs champs et leurs
règles propres, tandis que la route s'appuie sur l'identifiant commun de
l'événement.

### `*`

Affiche la page 404 lorsqu'aucune route ne correspond à l'adresse demandée. Elle
permet de revenir simplement vers le tableau de bord.

## Principes de navigation

- Les formulaires importants utilisent des pages dédiées plutôt que de grandes
  fenêtres modales.
- Les formats de cours comme HIIT, AMRAP, TABATA ou EMOM ne possèdent pas de
  route dédiée : ils sont configurés dans une partie du cours collectif.
- Les mesures, objectifs et informations de santé ne possèdent pas de page
  indépendante : ils appartiennent à la fiche du client.
- Une route de création et sa route de modification peuvent réutiliser le même
  composant de page lorsque leur fonctionnement est similaire.
- Toute nouvelle route doit être ajoutée à ce document avec sa finalité avant
  d'être intégrée au routeur React.
