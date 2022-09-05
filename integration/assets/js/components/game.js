export function cardInit() {
    
    //* Déclaration des variables
    // Bouton Draw a card
    let newCardBtn          = document.querySelector('.cardBtn');
    // Tableau des éléments
    let cardsList           = ['boat', 'ocean', 'redOctopus', 'orangeTurtle', 'blueFish', 'greenShark', 'purpleDolphin'];
    // Nombre d'unités par animal
    let nbOctopus           = 2;
    let nbFish              = 8;
    let nbShark             = 3;
    let nbDolphin           = 3;
    let nbTurtle            = 4;
    // Élément BOAT focused
    let focusedElement      = document.querySelector('.focused');
    // Filet
    let net                 = document.querySelector('#net');
    // Booléen utile pour bloquer le recul du bateau s'il est sur sa première position
    // Cette variable est à true lorsque le bateau est en position initiale (0)
    let boatPosition0       = true;
    // Random number représentant un index du tableau cardsList
    let randomCard;



    //* Création des interactions utilisateurs
    newCardBtn.addEventListener('click', handleRandomCard);



    //* Déclaration de la logique et les fonctions contenant les actions déclenchées
    function handleRandomCard() {
        
        randomCard          = Math.floor(Math.random() * (cardsList.length));
        let resultCardDiv       = document.querySelector('#resultCard');

        // J'incrémente le contenu de ma variable dans ma div
        resultCardDiv.textContent = randomCard;
        // Et je laisse un délai d'une demi-seconde entre l'apparition de la carte et son action dans le jeu
        setTimeout(cardsAction, 500);
    }
        

    function cardsAction() {
        // le numéro sorti par randomCard correspond à un index du tableau cardsList.

        //=========================================================
        //* Si le numéro random est égal à 0 (bateau)
        // donc si la condition est False puisque 0 vaut False
        if(randomCard == false) {

            // puisque l'index 0 du tableau correspond au bateau
            // alors on déclenche l'action du bateau (element BOAT)
            (function boatAction() {

                // On récupère la div suivante de même niveau (.boat)
                let nextFocusedElement = focusedElement.nextElementSibling;
                // On utilise la div qui contient la classe "focused" 
                // Elle a déjà été récupérée en variable globale
                // Et supprime la classe "focused" de cette div
                focusedElement.classList.remove("focused");
                // Puis on ajoute la classe "focused" à la div suivante 
                nextFocusedElement.classList.add("focused");
                // ET on attribue la valeur de nextFocusedElement à focusedElement !
                // sinon le code ne fonctionnera plus puisqu'il n'y aura plus d'élément
                // focusedElement contenant la classe "focused"
                focusedElement = nextFocusedElement;

                //! Je n'oublie pas de changer la valeur du booléen permettant de bloquer le recul du bateau ou non
                boatPosition0 = false;
            })();


        //=========================================================
        //* Si le random number vaut 1 (océan)
        } else if(randomCard === 1) {
            // Alors il correspond à l'élément à l'index 1 dans le tableau (océan)
            // Donc il déclenche la fonction d'action Océan

            //* L'action Océan consiste à laisser le choix à l'utilisateur : quel animal restant il veut libérer.
            // Il faut donc :
                // 1 DONE - Masquer la div no-popup
                // 2 DONE - Présenter une div à l'utilisateur
                // 3 DONE - Connaître quels animaux sont encore dans le filet (donc nb > 0)
                // 4 DONE - Insérer dans cette div des divs de chaque animal restant
                // 5 - Rendre cliquable les div animales
                // 6 - ADE : au click :
                        // 1 - Faire disparaître la div de choix d'animal à libérer
                        // 2 - Lancer la fonction correspondante selon l'animal cliqué
            (function oceanAction() {

                //* 1 - Masquer la div no-popup
                // Je récupère la div no-popup
                let noPopup = document.getElementById('no-popup');
                // Masque cette div
                noPopup.classList.add('inactive');
                
                //* 2 - Présenter une div à l'utilisateur
                // Je crée une nouvelle div
                let popupOcean = document.createElement('div');
                // Je récupère la div game-space
                // J'insère cette nouvelle div noPopup dans la div gameSpace
                let gameSpace = document.getElementById('game-space');
                gameSpace.append(popupOcean);
                // J'ajoute à cette nouvelle div créée la classe popup-open
                popupOcean.classList.add('popup-open');
                // Un titre annonce au joueur qu'il doit choisir un animal à libérer
                let popupOceanTitle = document.createElement('p');
                popupOceanTitle.textContent = "Choose which animal you want to get free";
                popupOcean.append(popupOceanTitle);

                //* 3 - Insérer dans la div popupOcean une div sous le titre
                // Je crée une nouvelle div destinnée à contenir les animaux encore en jeu dans la div popupOcean
                let popupInPopupOcean = document.createElement('div');
                // J'insère cette nouvelle div dans la div popupOcean après le titre
                popupOceanTitle.append(popupInPopupOcean);
                // J'ajoute la classe popup-in-popup-ocean
                popupInPopupOcean.classList.add('popup-in-popup-ocean')
                // Dans cette nouvelle popup, j'insère les animaux SI leur nombre est strictement supérieur à 0
                if(nbOctopus > 0){
                    // Je crée la div pour l'animal courant
                    let popupOctopus = document.createElement('div');
                    // J'insère cette div animal dans la div popupInPopupOcean
                    popupInPopupOcean.append(popupOctopus);
                    // J'ajoute à cette div la classe popup-animal
                    popupOctopus.classList.add('popup-animal');
                    // Je rends la div cliquable en lui assignant un évènement 
                    popupOctopus.addEventListener('click', octopusActions);
                }
                if(nbFish > 0){
                    // Je crée la div pour l'animal courant
                    let popupFish = document.createElement('div');
                    // J'insère cette div animal dans la div popupInPopupOcean
                    popupInPopupOcean.append(popupFish);
                    // J'ajoute à cette div la classe popup-animal
                    popupFish.classList.add('popup-animal');
                }
                if(nbShark > 0){
                    // Je crée la div pour l'animal courant
                    let popupShark = document.createElement('div');
                    // J'insère cette div animal dans la div popupInPopupOcean
                    popupInPopupOcean.append(popupShark);
                    // J'ajoute à cette div la classe popup-animal
                    popupShark.classList.add('popup-animal');
                }
                if(nbDolphin > 0){
                    // Je crée la div pour l'animal courant
                    let popupDolphin = document.createElement('div');
                    // J'insère cette div animal dans la div popupInPopupOcean
                    popupInPopupOcean.append(popupDolphin);
                    // J'ajoute à cette div la classe popup-animal
                    popupDolphin.classList.add('popup-animal');
                }
                if(nbTurtle > 0){
                    // Je crée la div pour l'animal courant
                    let popupTurtle = document.createElement('div');
                    // J'insère cette div animal dans la div popupInPopupOcean
                    popupInPopupOcean.append(popupTurtle);
                    // J'ajoute à cette div la classe popup-animal
                    popupTurtle.classList.add('popup-animal');
                }

                //* Au clique sur une des div animales, la fonction de cet animal s'active et la popupOcean disparait, et la div game-space réapparait
                // 
                
            })();


        //=========================================================
        //* Si le random number vaut 2 (pieuvre)
        } else if(randomCard === 2){

            if(nbOctopus > 0) {

                //* Il correspond à la pieuvre dans le tableau
                //* donc il déclenche ses deux actions
                //! Les actions se déclenchent SI une pieuvre est encore à libérer
                (function octopusActions() {

                    //? FONCTION N°1 : Suppression d'une pieuvre
                    (function freeOctopus(){
                        
                        //* Récupération du premier élément Octopus
                        let octopus = document.querySelector('.octopus');
                        //* Suppression de l'élément Octopus dans le code source 
                        //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                        //* node.removeChild(child)
                        net.removeChild(octopus);
                        //* Je supprime un élément de la quantité
                        nbOctopus -=1;
                    })();

                    //? FONCTION N°2 : Faire reculer le bateau d'une case
                    (function backBoat() {
                        
                        //* On stocke dans une variable focusElement qui contient la classe "boat--0"
                        let focusedElementPosition0 = focusedElement.classList.contains('boat--0');

                        //* Pour faire reculer le bateau, il ne doit pas être en position 0 (donc pas en true)
                        //* Si le booléen est sur true, ou si l'élément courant contient la classe "boat--0",
                        //* le bateau ne recule pas
                        if(boatPosition0 === true || focusedElementPosition0 == true){
                            console.log("Le bateau ne pas reculer plus loin");
                        } //* Sinon, si le booléen est à false ou si l'élément courant ne contient pas la classe "boat--0",
                        else if(boatPosition0 === false || focusedElementPosition0 == false){
                            //* alors le bateau peut reculer

                            //* J'utilise la variable globale focusedElement
                            //* pour récupérer l'élément précédent
                            let previousFocusedElement = focusedElement.previousElementSibling;

                            //* Je supprime la classe "focused" de l'élément courant
                            focusedElement.classList.remove("focused");
                            //* J'ajoute la classe "focused" à son élément précédent
                            previousFocusedElement.classList.add("focused");
                            //* J'attribue la valeur de l'élément précédent à la variable focusedElement
                            //* pour qu'elle soit encore utilisable
                            focusedElement = previousFocusedElement;
                        }
                    })();
                })();
            } else {
                window.alert("Il n'y a plus de pieuvre à libérer. Et le bâteau ne peut pas être retenu par les tentacules");
            }


        //=========================================================
        //* Si random number vaut 3 (tortue)
        } else if(randomCard === 3) {

            (function animalAction() {
                
                if(nbTurtle > 0) {

                    //* Il correspond à la tortue dans le tableau
                    (function turtleAction() {

                            //* Récupération du premier élément Turtle
                            let turtle = document.querySelector('.turtle');
                            //* Suppression de l'élément Turtle dans le code source 
                            //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                            //* node.removeChild(child)
                            net.removeChild(turtle);
                            //* Je supprime un élément de la quantité
                            nbTurtle -=1;
                    })();
                } else {
                    window.alert("Il n'y a plus de tortues à libérer");
                }
            })();


        //=========================================================
        //* Si random number vaut 4 (poisson)
        } else if(randomCard === 4) {

            (function animalAction() {
                
                if(nbFish > 0) {

                    //* Il correspond au poisson dans le tableau
                    (function fishAction() {

                            //* Récupération du premier élément Fish
                            let fish = document.querySelector('.fish');
                            //* Suppression de l'élément Fish dans le code source 
                            //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                            //* node.removeChild(child)
                            net.removeChild(fish);
                            //* Je supprime un élément de la quantité
                            nbFish -=1;
                    })();
                } else {
                    window.alert("Il n'y a plus de poissons à libérer");
                }
            })();


        //=========================================================
        //* Si random number vaut 5 (requin)
        } else if(randomCard === 5) {

            (function animalAction() {
                
                if(nbShark > 0) {

                    //* Il correspond au requin dans le tableau
                    (function sharkAction() {

                            //* Récupération du premier élément Shark
                            let shark = document.querySelector('.shark');
                            //* Suppression de l'élément Shark dans le code source 
                            //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                            //* node.removeChild(child)
                            net.removeChild(shark);
                            //* Je supprime un élément de la quantité
                            nbShark -=1;
                    })();
                } else {
                    window.alert("Il n'y a plus de requins à libérer");
                }
            })();

        
        //=========================================================
        //* Si random number vaut 6 (dauphin)
        } else if(randomCard === 6) {

            (function animalAction() {
                
                if(nbDolphin > 0) {

                    //* Il correspond au dauphin dans le tableau
                    (function dolphinAction() {

                            //* Récupération du premier élément Dolphin
                            let dolphin = document.querySelector('.dolphin');
                            //* Suppression de l'élément Dolphin dans le code source 
                            //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                            //* node.removeChild(child)
                            net.removeChild(dolphin);
                            //* Je supprime un élément de la quantité
                            nbDolphin -=1;
                    })();
                } else {
                    window.alert("Il n'y a plus de dauphins à libérer");
                }
            })();
        }
    }
}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);