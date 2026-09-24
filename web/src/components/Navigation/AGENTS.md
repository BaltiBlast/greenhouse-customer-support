# AGENTS.md : Navigation

## Recherche client

- La recherche client s'ouvre dans une fenêtre modale pilotée par l'état React.
- La modale et ses styles restent regroupés dans `sections/ClientSearchModal`.
- Charger les clients depuis le service du domaine client à l'ouverture de la
  modale et annuler la requête si elle est fermée avant la réponse.
- Le filtrage local porte uniquement sur le nom et le prénom.
- Un clic sur un résultat ferme la modale et navigue vers
  `/clients/:clientId`.
- La modale se ferme avec son bouton, un clic sur l'arrière-plan ou la touche
  `Échap`.
- Sur mobile, la recherche reste accessible directement dans la barre avec une
  icône seule et l'ouverture de la recherche ferme d'abord le menu latéral.

## Navigation mobile

- Afficher dans la barre, à droite du logo : la recherche, l'ajout et le menu
  burger, sous forme de boutons compacts.
- Conserver une zone interactive d'au moins `44px` pour chaque bouton.
- Réserver le panneau latéral aux routes de navigation et au contrôle du thème.
- Afficher les routes `/clients` et `/events` dans la navigation principale sur
  ordinateur et dans le panneau latéral sur mobile.
- Ne pas déplacer la recherche ou l'ajout dans le panneau latéral.

## Ajout rapide

- Le bouton d'ajout ouvre un dropdown simple contenant `Client` et `Événement`.
- Chaque action redirige directement vers son formulaire de création.
- La création d'un événement utilise `/events/new` et son type est choisi dans
  le formulaire.
- Le dropdown se ferme après la sélection d'une action ou un clic extérieur.
- Ne pas ajouter de fermeture avec la touche `Échap`.

## Sections

- `sections/ClientSearchModal` contient exclusivement la recherche client.
- `sections/AddMenu` contient exclusivement les actions de création.
- `sections/ThemeToggle` contient exclusivement le contrôle du thème utilisé
  par la navigation.
- Une section reste interne à `Navigation` et ne doit pas être importée par un
  autre composant.
