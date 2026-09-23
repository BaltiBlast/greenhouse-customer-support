# AGENTS.md — Navigation

## Recherche client

- La recherche client s'ouvre dans une fenêtre modale pilotée par l'état React.
- La modale, ses styles et ses données fictives restent regroupés dans
  `sections/ClientSearchModal` jusqu'au branchement de l'API.
- Lors du branchement de l'API, les données fictives sont remplacées par un
  service du domaine client.
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
- Ne pas déplacer la recherche ou l'ajout dans le panneau latéral.

## Sections

- `sections/ClientSearchModal` contient exclusivement la recherche client.
- `sections/ThemeToggle` contient exclusivement le contrôle du thème utilisé
  par la navigation.
- Une section reste interne à `Navigation` et ne doit pas être importée par un
  autre composant.
