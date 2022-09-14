export function cardInit() {

    //! STEP 1 ==============================================================================================
    //* Déclaration des VARIABLES
    // Booléen utile pour bloquer le recul du bateau s'il est sur sa première position
    // Cette variable est à true lorsque le bateau est en position initiale (0)
    let boatPosition0       = true;
    // Élément BOAT focused
    let focusedElement      = document.querySelector('.focused');
    // Filet
    let net                 = document.querySelector('#net');
    // Div game-space
    let gameSpace           = document.getElementById('game-space');
    // Je récupère la div no-popup
    let noPopup             = document.getElementById('no-popup');
    // Je crée une div pour le message de fin de partie
    let endDiv              = document.createElement('div');
    // Random number représentant un index du tableau cardsList
    let randomCard;
    // Bouton Draw a card
    let newCardBtn          = document.querySelector('.cardBtn');
    // Tableau contenant tous les "personnages" du jeu, leur quantité, et le cas échéant leur classe dans le code source, leur nom en français, et le chemin vers leur image (depuis index.html) (chemin non dynamique) 
    let cardsList           = 
                            [
                                ['boat',    1, 'EMPTY',     'bateau',   'img src="./assets/img/bateau.jpeg"'],
                                ['ocean',   1, 'EMPTY',     'océan',    'img src="./assets/img/ocean.png"'],
                                ['octopus', 2, 'octopus',   'pieuvre',  'img src="./assets/img/pieuvre.png"'], // ['nom', quantité, 'classe html', 'nom en français', 'chemin vers image']
                                ['turtle',  4, 'turtle',    'tortue',   'img src="./assets/img/tortue.jpg"'],
                                ['fish',    8, 'fish',      'poisson',  'img src="./assets/img/poisson.jpg"'],
                                ['shark',   3, 'shark',     'requin',   'img src="./assets/img/requin.jpg"'],
                                ['dolphin', 3, 'dolphin',   'dauphin',  'img src="./assets/img/dauphin.png"']
                            ]

    // Stockage de la quantité totale d'animaux dans le filet
    let total               = 0;
    // Je boucle sur le tableau cardsList index 1 pour additionner toutes les quantités
    for(let i = 2; i < cardsList.length; i++){
        total                       = total + cardsList[i][1];
        // Total = 20
    }
    // Donc ici, total = 20

    //! STEP 7 ==============================================================================================
    // Fonction déclenchée après avoir cliqué sur le bouton "Rejouer"
    function replayFunction() {
        // Au click sur le bouton replay,
        // Je recharge le contenu de la page
        location.reload();
    }


    //! STEP 6 ==============================================================================================
    // Fonctionnalité déclenchée en cas de victoire du joueur
    function stopGame() {

        // Je désactive l'écouteur d'événements sur le bouton tirer une carte
        newCardBtn.removeEventListener('click', handleRandomCard);
        // Je grise le bouton pour tirer une carte mais je le laisse visible
        newCardBtn.classList.add('desactivated');
        // Je cache le plateau de jeu
        noPopup.classList.add('inactive');
        // J'ajoute la div endDiv dans gameSpace
        gameSpace.append(endDiv);
        // Et je lui ajoute la classe "end-div"
        endDiv.classList.add('end-div');

        // Si le filet est vide
        if(total === 0){
            // J'ajoute le texte de victoire + un bouton REJOUER
            endDiv.innerHTML="<p class=\"victory\">Tous les animaux ont été libérés avant l'arrivée du bateau, super ! <br> Tu devrais penser à soutenir et encourager Sea Shepherd !</p><p class=\"refresh\">Actualise la page pour rejouer</p><!--<p class=\"btn replay\">Rejouer</p>-->";
        }
        // Sinon, si le filet est à 1 ou plus quand le bateau l'atteint 
        else if(total > 0){
            // J'ajoute le texte de défaite + un bouton REJOUER
            endDiv.innerHTML="<p class=\"failed\">Le bateau est arrivé avant que tous les animaux ne soient libérés... Malheureusement, c'est perdu.</p><p class=\"refresh\">Actualise la page pour rejouer</p><!--<p class=\"btn replay\">Rejouer</p>-->";
        }

        // // Je récupère l'élément dont la classe est "replay"
        // let replay = document.querySelector('.replay');
        // // AEL : au click, je lance la fonction replay();
        // replay.addEventListener('click', replayFunction);
    }


    //! STEP 5 ==============================================================================================
    //* Déclaration des FONCTIONS D'ACTIONS des personnages

    //* Lorsque la carte BATEAU sera tirée, son action sera déclenchée
    function boatAction() {

        //* 1 - Faire avancer le bateau puisque le jeu commence avec le bateau en position 0
        // Je récupère la div contenant la balise img du bateau
        // Récupérer de manière globale fait buguer la suppression, donc cette ligne est doublée, ici et dans la fonction backBoat() de octopusAction()
        let boatMiniDiv        = document.querySelector('.boat-mini-div');
        // Je supprime la div boatMiniDiv pour supprimer la balise img
        boatMiniDiv.remove();
        // Puis je récupère la div suivante de même niveau que "focused" (.boat)
        let nextFocusedElement = focusedElement.nextElementSibling;
        // J'utilise la div qui contient la classe "focused" 
        // Elle a déjà été récupérée en variable globale

        // Je supprime la classe "focused" de cette div
        focusedElement.classList.remove("focused");

        // J'ajoute à l'élément suivant le code source de la balise img bateau + sa classe "boat-mini"
        nextFocusedElement.innerHTML="<div class=\"boat-mini-div\"><img src=\"./assets/img/bateau.jpeg\" class=\"boat-mini\"></div>";
        // Puis j'ajoute la classe "focused" à l'élément suivant
        nextFocusedElement.classList.add("focused");

        // ET j'attribue la valeur de nextFocusedElement à focusedElement !
        // sinon le code ne fonctionnera plus puisqu'il n'y aura plus d'élément
        // focusedElement contenant la classe "focused"
        focusedElement = nextFocusedElement;
        // Je n'oublie pas de changer la valeur du booléen permettant de bloquer le recul du bateau ou non
        boatPosition0 = false;                
    }

    function winBoatAction() {

        // Je retire la classe "focused" sur le "focusedElement"
        focusedElement.classList.remove('focused');
        // J'ajoute la classe "blodd-net" sur le filet "net"
        net.classList.add('blood-net');
        // Je déclenche la fonction de défaite après un court délai
        setTimeout(stopGame, 1000);
    }

    //* Lorsque la carte OCÉAN sera tirée, son action sera déclenchée
    function oceanAction() {
        //* L'action Océan consiste à laisser le choix à l'utilisateur : quel animal restant encore dans le filet il veut libérer
        //TODO Si le filet comporte plusieurs sortes d'animaux, alors déclenche la fonction animalAction(i) ou octopusAction(), selon le clic utilisateur
        //TODO Si le filet ne comporte plus qu'une sorte d'animal, alors son action est déclenchée directement sans ouvrir de popup choix utilisateur

        // Alors le code popupOcean pour le choix de l'utilisateur peut être lancé
        //* 0 - Désactiver le clic sur le bouton "tirer une carte"
        // Supprimer l'écouteur d'événement
        newCardBtn.removeEventListener('click', handleRandomCard);
        newCardBtn.style.cursor="default";
        newCardBtn.classList.add('desactivated');
        
        //* 1 - Masquer la div no-popup
        noPopup.classList.add('inactive');
        
        //* 2 - Présenter une div à l'utilisateur
        // Je crée une nouvelle div
        let popupOcean = document.createElement('div');
        // J'insère cette nouvelle div noPopup dans la div gameSpace
        gameSpace.append(popupOcean);
        // J'ajoute à cette nouvelle div créée la classe popup-open
        popupOcean.classList.add('popup-open');
        // Un titre annonce au joueur qu'il doit choisir un animal à libérer
        let popupOceanTitle = document.createElement('p');
        popupOceanTitle.textContent = "Choisis quel animal tu veux libérer";
        popupOcean.append(popupOceanTitle);

        //* 3 - Insérer dans la div popupOcean une div sous le titre
        // Je crée une nouvelle div destinnée à contenir les animaux encore en jeu dans la div popupOcean
        let popupInPopupOceanUnderTitle = document.createElement('div');
        // J'insère cette nouvelle div dans la div popupOcean après le titre
        popupOceanTitle.append(popupInPopupOceanUnderTitle);
        // J'ajoute la classe popup-in-popup-ocean
        popupInPopupOceanUnderTitle.classList.add('popup-in-popup-ocean')

        //* 4 - Insertion des animaux restants
        // Je boucle sur le tableau à partir de la PIEUVRE (index 2)
        for(let i = 2; i < cardsList.length; i++){

            // Si la quantité de ces éléments est supérieure à 0
            if(cardsList[i][1] > 0) {
                
                // Alors la div de l'élément [i] peut être créée dans la popup
                let popupAnimal = document.createElement('div');
                // J'insère cette div animal dans la div popupInPopupOceanUnderTitle
                popupInPopupOceanUnderTitle.append(popupAnimal);
                // J'ajoute à cette div la classe popup-animal, et la classe "nom de l'animal"
                popupAnimal.classList.add('popup-animal', cardsList[i][2]);
                popupAnimal.innerHTML = "<" + cardsList[i][4] + "class=\"popup-animal-mini\">";

                //* 5 - Rendre cliquables les divs animales
                popupAnimal.addEventListener('click', () => {
                    popupOcean.remove();
                    noPopup.classList.remove('inactive');
                    newCardBtn.classList.remove('desactivated');
                    newCardBtn.addEventListener('click', handleRandomCard);
                    if(popupAnimal.classList.contains('octopus')){
                        octopusAction();
                    } else {
                        animalAction(i);
                    }
                });
            }
        }
    }

    //* Lorsque la carte PIEUVRE sera tirée, ses deux actions seront déclenchées
    function octopusAction() {

        if(cardsList[2][1] > 0){
            // Les fonctions des PIEUVRES ne sont disponibles que si des pieuvres sont encore piégées
            //? STEP 1 : Faire reculer OU NON le bateau selon sa position
            (function backBoat() {

                // On stocke dans une variable focusElement qui contient la classe "boat--0"
                let focusedElementPosition0 = focusedElement.classList.contains('boat--0');

                // Pour faire reculer le bateau, il ne doit pas être en position 0 (donc pas en true) et il doit encore y avoir une pieuvre à libérer
                // Si la quantité de pieuvre est > 0
                // ET Si le booléen est sur false, donc pas en position initiale,
                // OU si l'élément courant ne contient pas la classe "boat--0",
                // le bateau peut reculer
                if(boatPosition0 === false || focusedElementPosition0 == false){
                    // alors le bateau peut reculer
                    // J'utilise la variable globale focusedElement
                    // pour récupérer l'élément précédent
                    let previousFocusedElement = focusedElement.previousElementSibling;
                    // Je supprime la classe "focused" de l'élément courant
                    focusedElement.classList.remove("focused");
                    // Je récupère la div contenant la balise img du bateau
                    // Récupérer de manière globale fait buguer la suppression, donc cette ligne est doublée, ici et dans la fonction boatAction()
                    let boatMiniDiv        = document.querySelector('.boat-mini-div');
                    // Je supprime la balise img bateau
                    boatMiniDiv.remove();

                    // J'ajoute la classe "focused" à son élément précédent
                    previousFocusedElement.classList.add("focused");
                    // Ainsi que le code source de la balise img bateau
                    previousFocusedElement.innerHTML="<div class=\"boat-mini-div\"><img src=\"./assets/img/bateau.jpeg\" class=\"boat-mini\"></div>";

                    // J'attribue la valeur de l'élément précédent à la variable focusedElement
                    // pour qu'elle soit encore utilisable
                    focusedElement = previousFocusedElement;
                    if(focusedElementPosition0 == true){
                        boatPosition0 = true;
                    };
                };
            })();
        };
        
        //? STEP 2 : Suppression d'une pieuvre OU Création d'une div alerte
        if(cardsList[2][1] > 0){

            (function freeOctopus(){ // Suppression d'une pieuvre
                // Récupération du premier élément Octopus
                let octopusEl = document.querySelector('.octopus');
                // Suppression de l'élément Octopus dans le code source 
                //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                // node.removeChild(child)
                net.removeChild(octopusEl);
                // Je supprime une quantité de l'objet octopus
                cardsList[2][1] -= 1;
                total -= 1;
                if(total === 0){
                    stopGame();
                }
            })();
        } else if(cardsList[2][1] === 0){ 
            // Création d'une alerte
            //* 0 - Désactiver le clic sur le bouton "tirer une carte"
            // Supprimer l'écouteur d'événement
            newCardBtn.removeEventListener('click', handleRandomCard);
            
            //* 1 - Masquer la div no-popup
            // Je récupère la div no-popup
            let noPopup = document.getElementById('no-popup');
            // Masque cette div
            noPopup.classList.add('inactive');

            //* 2 - Créer la nouvelle div et son contenu
            // Je crée une nouvelle div de message d'alerte
            let alert = document.createElement('div');
            // Je lui donne une classe
            alert.classList.add('popup-open');
            // J'ajoute dans cette div le texte de l'alerte
            alert.textContent = "Il n'y a plus de pieuvres à libérer";
            
            //* 3 - Insérer cette div
            gameSpace.append(alert);
            // Je change le curseur pour signaler à l'utilisateur que l'alerte est entièrement cliquable
            alert.style.cursor="pointer";
            // J'ajoute un événement au clic sur l'alerte
            alert.addEventListener('click', () => {
                // Je supprime la div alert
                alert.remove();
                // Et je supprime la classe inactive de noPopup pour que le plateau de jeu soit de nouveau visible
                noPopup.classList.remove('inactive');
                // Réactiver le clic sur le bouton "tirer une carte"
                newCardBtn.addEventListener('click', handleRandomCard);
            })
        }
    }

    //* Lorsqu'une autre carte sera tirée (poisson, tortue, requin ou dauphin), son action se déclenchera
    function animalAction(param) {
           
        // Je boucle sur le tableau à partir de la TORTUE (index 3)
        for(let i = 3; i < cardsList.length; i++){

            // Si la quantité de l'élément est supérieur à 0 ET si l'index du tableau parcouru vaut le paramètre randomCard
            if(cardsList[i][1] > 0 && i === param) {

                // Alors je stocke les éléments ayant la classe correspondant à l'index 0 de randomCard (soit la valeur nom)
                // J'utilise query selector pour obtenir une node list
                let elementsToRemove = document.querySelectorAll('.' + cardsList[i][0]);
                // Je supprime un élément de cette liste
                //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                // D'où l'intérêt d'avoir récupéré ces éléments en node list avec query selector
                // node.removeChild(child)
                net.removeChild(elementsToRemove[0]);
                // Puis je supprime une quantité de l'animal retiré
                cardsList[param][1] -= 1;
                total -= 1;
                if(total === 0){
                    stopGame();
                }

            } else if(cardsList[i][1] === 0 && i === param){ // Création d'une alerte
                //* 0 - Désactiver le clic sur le bouton "tirer une carte"
                // Supprimer l'écouteur d'événement
                newCardBtn.removeEventListener('click', handleRandomCard);
                
                //* 1 - Masquer la div no-popup
                // Je récupère la div no-popup
                let noPopup = document.getElementById('no-popup');
                // Masque cette div
                noPopup.classList.add('inactive');
    
                //* 2 - Créer la nouvelle div et son contenu
                // Je crée une nouvelle div de message d'alerte
                let alert = document.createElement('div');
                // Je lui donne une classe
                alert.classList.add('popup-open');
                // J'ajoute dans cette div le texte de l'alerte
                alert.textContent = "Il n'y a plus de " + cardsList[randomCard][3] + " à libérer";
                
                //* 3 - Insérer cette div
                gameSpace.append(alert);
                // Je change le curseur pour signaler à l'utilisateur que l'alerte est entièrement cliquable
                alert.style.cursor="pointer";
                // J'ajoute un événement au clic sur l'alerte
                alert.addEventListener('click', () => {
                    // Je supprime la div alert
                    alert.remove();
                    // Et je supprime la classe inactive de noPopup pour que le plateau de jeu soit de nouveau visible
                    noPopup.classList.remove('inactive');
                    // Je réactive le clic sur le bouton "tirer une carte"
                    newCardBtn.addEventListener('click', handleRandomCard);
                })
            }
        } 
    }


    //! STEP 4 ==============================================================================================
    //* Déclaration de la fonction actions() déclenchée après la fonction du clic
    // Selon la valeur du paramètre randomCard
    function actions(param){

        if(param == false){
            boatAction();
        } else if(param === 1){
            oceanAction();
        } else if(param === 2){
            octopusAction();
        } else if(param >=3){
            animalAction(randomCard);
        }
                
    }


    //! STEP 3 ==============================================================================================    
    //* Déclaration de la fonction RANDOM CARD
    function handleRandomCard() {

            randomCard              = Math.floor(Math.random() * (cardsList.length));
            let resultCardDiv       = document.querySelector('#resultCard');

            // J'incrémente le contenu de ma variable dans ma div
            // Ici, résultat écrit : resultCardDiv.textContent = cardsList[randomCard][3];
            // Là, résultat avec une image
            resultCardDiv.innerHTML="<" + cardsList[randomCard][4] + "class=\"result-card-poufff\">";

            // Si randomCard vaut false (donc le bateau est tiré)
            // ET SI "focusedElement" contient la classe "boat--5"
            // ET SI la quantité dans le filet "total" est supérieur à 0
            if(focusedElement.classList.contains('boat--5') && total > 0 && randomCard == false){
                // Je désactive le clic sur ce même bouton
                newCardBtn.removeEventListener('click', handleRandomCard);
                // Je change la classe sur le bouton "tirer une carte" pour le griser
                newCardBtn.classList.add('desactivated');
                
                // Puis je déclenche l'action précise du bateau qui gagne
                winBoatAction();
            } else {
                // Sinon, je déclenche les actions normales
                // Je laisse un délai d'une demi-seconde entre l'apparition de la carte et son action dans le jeu
                // Juste histoire d'améliorer l'UX
                actions(randomCard);
            }
    }


    //! STEP 2 ==============================================================================================
    //* Création des INTERACTIONS UTILISATEURS
    // Au clic sur le bouton "tirer une carte", le handler Total() est déclenché
    newCardBtn.addEventListener('click', handleRandomCard);
}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);