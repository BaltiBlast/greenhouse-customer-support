# AGENTS.md — Navigation

## Recherche client

- La recherche client s'ouvre dans une fenêtre modale pilotée par l'état React.
- Les données fictives restent dans `Navigation.data.js` jusqu'au branchement de
  l'API, puis elles sont remplacées par un service du domaine client.
- Le filtrage local porte uniquement sur le nom et le prénom.
- Un clic sur un résultat ferme la modale et navigue vers
  `/clients/:clientId`.
- La modale se ferme avec son bouton, un clic sur l'arrière-plan ou la touche
  `Échap`.
- Sur mobile, l'ouverture de la recherche ferme d'abord le menu latéral.

