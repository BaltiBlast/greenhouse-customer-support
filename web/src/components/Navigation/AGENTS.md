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

## Menu principal

- Afficher le bouton burger sur ordinateur et sur mobile.
- Conserver la recherche client directement dans la barre de navigation.
- Regrouper dans le panneau latéral les routes principales, les actions de
  création, le contrôle du thème, l'utilisateur courant et la déconnexion.
- Fermer le panneau après une navigation ou une déconnexion réussie.
- Conserver une zone interactive d'au moins `44px` pour chaque bouton.

## Ajout rapide

- Afficher les actions de création dans le panneau latéral.
- Chaque action redirige directement vers son formulaire de création et ferme
  le panneau.
- La création d'un événement utilise `/events/new` et son type est choisi dans
  le formulaire.

## Sections

- `sections/ClientSearchModal` contient exclusivement la recherche client.
- `sections/ThemeToggle` contient exclusivement le contrôle du thème utilisé
  par la navigation.
- Une section reste interne à `Navigation` et ne doit pas être importée par un
  autre composant.
