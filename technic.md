# Déroulement technique du jeu

## 1. AU CHARGEMENT DE LA PAGE

* Les règles du jeu sont affichées avant la div `click-player`.
* Il y a un bouton `Play now`.
* Le bateau est en position `--0` et les animaux sont en position `this.--0`.
* Le bouton `Draw a card` est déjà présent mais non cliquable et grisé.
* La carte est vide.

## 2. LANCEMENT DE LA PARTIE

* Étape 1 : Le joueur doit cliquer sur le bouton `Play now` pour lancer une partie.
* Étape 2 : Lorsque le bouton `Play now` est cliqué :
    * Le bouton `play now` disparait.
    * La partie commence.
    * Le bouton `Draw a card` est dégrisé et cliquable.
* Étape 3 : Le joueur doit cliquer sur le bouton `Draw a card` :
    * Une carte apparaît.
    * Une carte est rattachée à une action (cf actions.md).
    * Cette action se déclenche et donne un résultat visible.
* Étape 4 : Si la `carte Océan` apparaît :
    * Le bouton `Draw a card` n'est plus cliquable, et devient grisé.
    * Une div apparaît avec les animaux encore piégés.
    * Le joueur clique sur l'animal qu'il veut libérer.
    * Lorsque l'animal est cliqué, la div disparaît.
    * L'animal est libéré (+pouvoir si pieuvre);
    * Le bouton `Draw a card` n'est plus grisé et redevient cliquable.
* RÉPÉTER LES ÉTAPES 2 À 4 JUSQU'À LA FIN DE LA PARTIE.

## 3. FIN DE LA PARTIE

* La partie se termine dans deux cas :
    * Le bateau atteint le filet qui n'est pas vide => le joueur perd.
    * Le filet est vide avant que la bateau n'arrive => le joueur gagne.
* Un message de fin de partie et de succès ou échec s'affiche.
* Le bouton `Draw a card` redevient non cliquable et grisé.
* Le bouton `Play now` réapparaît.

## 4. NOUVELLE PARTIE
* RÉPÉTER LES ÉTAPES 1 À 3.