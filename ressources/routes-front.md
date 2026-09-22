# Routes du frontend

## Objectif

Ce document recense les routes prévues pour l'application frontend et décrit le
rôle de chaque page.

L'application doit rester simple à utiliser sur mobile, tablette et ordinateur.
La navigation principale est volontairement limitée. Les pages de création, de
modification et de détail sont accessibles depuis les actions proposées dans les
pages principales.

## Navigation principale

La navigation principale contient trois entrées :

- Tableau de bord ;
- Calendrier ;
- Clients.

## Routes

### `/connexion`

Affiche le formulaire permettant à la coach de se connecter à l'application.
Cette page est accessible uniquement lorsqu'aucune session valide n'est active.

### `/`

Affiche le tableau de bord. Il présente les informations utiles pour commencer
la journée : prochains créneaux, séances prévues et accès rapides aux actions
principales.

### `/calendrier`

Affiche les séances individuelles et les cours collectifs planifiés. La coach
peut consulter ses créneaux selon une vue adaptée à la journée ou à la semaine,
naviguer vers des dates passées ou futures et rouvrir un ancien élément pour le
modifier ou ajouter une information oubliée.

### `/clients`

Affiche la liste des clients sportifs. Cette page permet de rechercher un client,
d'ouvrir sa fiche et d'accéder à la création d'un nouveau client.

### `/clients/nouveau`

Affiche le formulaire de création d'un client sportif.

### `/clients/:clientId`

Affiche la fiche complète d'un client : informations générales, objectifs,
éléments utiles à l'adaptation de l'accompagnement, mesures et historique des
séances individuelles.

### `/clients/:clientId/modifier`

Affiche le formulaire de modification du client. Cette route réutilise le même
composant de page et la même structure de formulaire que la création.

### `/clients/:clientId/seances/nouvelle`

Affiche le formulaire permettant de préparer ou d'enregistrer une nouvelle
séance individuelle pour le client concerné.

### `/seances/:sessionId`

Affiche une séance individuelle existante. La coach peut consulter les exercices
réalisés, le ressenti facultatif du client et ses propres notes, puis modifier
ces informations si nécessaire. Aucun statut de rendez-vous ou compte rendu
obligatoire n'est imposé.

### `/cours/nouveau`

Affiche l'interface de création d'un cours collectif daté. La coach peut composer
librement le cours avec une ou plusieurs parties, leurs formats, leurs paramètres
et leurs mouvements.

### `/cours/:courseId`

Affiche un cours collectif existant et permet de modifier sa date, sa structure,
ses parties et ses mouvements. La création et la modification doivent partager
les mêmes composants et conventions.

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
