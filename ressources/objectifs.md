# Objectifs du projet

## Présentation

L'application est destinée à une coach sportive qui souhaite gérer le suivi de
ses clients sportifs, leurs séances individuelles et la préparation de ses cours
collectifs.

Les personnes accompagnées sont toujours désignées comme des **clients** ou des
**sportifs**, jamais comme des patients. La coach n'est pas médecin. Les
informations relatives à la santé servent uniquement à mieux connaître les
clients et à adapter leur accompagnement sportif.

## Utilisation et accès

- La coach est la seule personne à accéder à l'application et à l'utiliser pour
  le moment.
- Les clients ne possèdent pas de compte et n'accèdent pas à l'application.
- La coach saisit elle-même toutes les informations.
- Aucun système de rôles distincts n'est nécessaire pour le moment.
- L'architecture devra pouvoir évoluer vers une utilisation par plusieurs
  coachs.
- Des clients mineurs pourront potentiellement être suivis.

## Suivi des clients sportifs

### Informations générales

- Conserver les informations d'identité utiles, notamment le nom et le prénom.
- Ne pas conserver les coordonnées classiques pour le moment.
- Conserver un contact d'urgence.
- Permettre de renseigner les objectifs du client.
- Les objectifs ne possèdent pas d'échéance.
- Les marges de progression entre différentes mesures pourront être ajoutées
  ultérieurement.

### Santé et adaptation de l'accompagnement

- Conserver les informations utiles à l'adaptation de l'accompagnement sportif.
- Structurer les informations selon des catégories plutôt que dans une seule
  note libre.
- Prévoir notamment les maladies, pathologies, limitations, blessures, douleurs,
  contre-indications ou adaptations nécessaires.
- Permettre de noter une évolution lorsqu'elle a un impact sur
  l'accompagnement.
- Ne pas effectuer de suivi, d'interprétation ou de diagnostic médical.
- Conserver uniquement la mention de possibles troubles alimentaires, sans
  entrer dans des détails médicaux.
- Limiter les informations enregistrées à ce qui est nécessaire pour adapter et
  sécuriser la pratique sportive.

### Mesures et évolution

- Prévoir un historique permettant de suivre l'évolution du client lors de
  nouvelles mesures ou pesées.
- Les mesures pourront notamment concerner la taille, le poids, la masse grasse
  et la masse musculaire.
- La liste définitive des mesures à conserver reste à déterminer.
- La méthode ou l'appareil utilisé pour effectuer une mesure ne doit pas être
  conservé pour le moment.

## Séances individuelles

- Conserver l'historique des séances individuelles de chaque client.
- Chaque séance possède une date.
- Conserver les exercices réalisés pendant la séance.
- Permettre de renseigner le ressenti du client de manière facultative.
- Permettre à la coach d'ajouter une note facultative.
- Ne pas imposer de statut indiquant si la séance est prévue, réalisée, annulée
  ou à compléter.
- Ne pas imposer la saisie d'un avis, d'un ressenti ou d'un compte rendu après
  une séance.
- Permettre à la coach de revenir sur une ancienne séance pour ajouter ou
  modifier des informations.

## Cours collectifs

### Calendrier

- Chaque cours collectif correspond à un créneau possédant une date précise.
- Mettre à disposition un calendrier.
- Permettre à la coach de visualiser ses créneaux et les cours prévus pour une
  journée ou une semaine.
- Permettre de naviguer librement vers des dates passées ou futures.
- Permettre d'ouvrir et de modifier un ancien cours ou coaching depuis le
  calendrier, notamment pour ajouter une information oubliée.
- Le calendrier ne gère pas, pour le moment, les inscriptions, les capacités,
  les listes d'attente ou les performances des participants.

### Structure des cours

- Un cours collectif peut être entièrement personnalisé.
- Un cours peut suivre un format connu comme HIIT, AMRAP, TABATA, EMOM ou
  You Go I Go.
- Un cours contient une ou plusieurs parties ordonnées.
- Chaque partie peut elle-même suivre un format particulier.
- La composition d'un cours reste libre : aucun enchaînement fixe de parties ne
  doit être imposé.
- Chaque partie contient les mouvements à réaliser et leurs objectifs.

### Configuration d'une partie

Selon le besoin, une partie peut définir :

- une durée totale ;
- un nombre de tours ;
- un temps de travail ;
- un temps de repos ;
- une limite de temps ;
- un fonctionnement individuel ou en équipe ;
- un fonctionnement synchronisé ou non ;
- un temps de récupération avant la partie suivante.

Tous ces paramètres ne sont pas obligatoires pour chaque partie. Leur
utilisation dépend du format choisi et du contenu du cours.

### Mouvements et objectifs

Un mouvement peut être associé à un ou plusieurs objectifs exprimés avec les
unités suivantes :

- répétitions ;
- durée ;
- distance ;
- calories ;
- charge ;
- nombre de tours ;
- objectif libre.

La coach connaît les mouvements et transmet elle-même les consignes aux
participants. Il n'est donc pas nécessaire, pour le moment, de prévoir :

- une bibliothèque de mouvements ;
- des descriptions détaillées ou des vidéos ;
- des variantes par niveau ;
- un mode chronomètre en direct ;
- l'enregistrement des performances individuelles ou par équipe.

## Fonctionnalités non retenues pour le moment

- Comptes et accès pour les clients.
- Gestion de plusieurs rôles.
- Duplication des cours ou des parties.
- Réorganisation par glisser-déposer.
- Gestion des inscriptions aux cours collectifs.
- Capacité maximale et liste d'attente.
- Chronomètre ou déroulement de séance en direct.
- Suivi des performances obtenues pendant les cours collectifs.
- Export ou suppression des données directement par le client.

## Points à définir ultérieurement

- La liste exacte des mesures physiques à historiser.
- Les catégories définitives des informations de santé et d'adaptation.
- Le niveau de préparation nécessaire à une future gestion multi-coachs.
- Les règles spécifiques à appliquer pour le suivi de clients mineurs.
- Les règles de conservation, d'archivage et de suppression des données
  personnelles et des informations sensibles.
