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
    // Random number représentant un index du tableau cardsList
    let randomCard;
    // Bouton Draw a card
    let newCardBtn          = document.querySelector('.cardBtn');
    // Tableau contenant tous les "personnages" du jeu, leur quantité, et le cas échéant leur classe dans le code source
    let cardsList           = 
                            [
                                ['boat', 1,],
                                ['ocean', 1],
                                ['octopus', 2, 'octopus'], // ['nom, quantité, classe html]
                                ['turtle', 4, 'turtle'],
                                ['fish', 8, 'fish'],
                                ['shark', 3, 'shark'],
                                ['dolphin', 3, 'dolphin']
                            ]




    //! STEP 5 ==============================================================================================
    //* Déclaration des FONCTIONS D'ACTIONS des personnages

    //* Lorsque la carte BATEAU sera tirée, son action sera déclenchée
    function boatAction() {

        // Je récupère la div suivante de même niveau (.boat)
        let nextFocusedElement = focusedElement.nextElementSibling;
        // Je utilise la div qui contient la classe "focused" 
        // Elle a déjà été récupérée en variable globale
        // Et supprime la classe "focused" de cette div
        focusedElement.classList.remove("focused");
        // Puis j'ajoute la classe "focused" à la div suivante 
        nextFocusedElement.classList.add("focused");
        // ET j'attribue la valeur de nextFocusedElement à focusedElement !
        // sinon le code ne fonctionnera plus puisqu'il n'y aura plus d'élément
        // focusedElement contenant la classe "focused"
        focusedElement = nextFocusedElement;
        // Je n'oublie pas de changer la valeur du booléen permettant de bloquer le recul du bateau ou non
        boatPosition0 = false;
    };

    //* Lorsque la carte OCÉAN sera tirée, son action sera déclenchée
    function oceanAction() {

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

        //* 4 - Insertion des animaux restants
        // Je boucle sur le tableau à partir de la PIEUVRE (index 2)
        for(let i = 2; i < cardsList.length; i++){

            // Si la quantité de ces éléments est supérieure à 0
            if(cardsList[i][1] > 0) {
                
                // Alors la div de l'élément [i] peut être créée dans la popup
                let popupAnimal = document.createElement('div');
                // J'insère cette div animal dans la div popupInPopupOcean
                popupInPopupOcean.append(popupAnimal);
                // J'ajoute à cette div la classe popup-animal
                popupAnimal.classList.add('popup-animal', cardsList[i][2]);
                console.log(popupAnimal);
                // Je rends la div cliquable en lui assignant un évènement qui correspond à sa fonction d'action
                // popupAnimal.addEventListener('click', animalAction(cardsList[i]));

                
            }
        }
    }

    //* Lorsque la carte PIEUVRE sera tirée, ses deux actions seront déclenchées
    function octopusAction() {
        //? FONCTION N°1 : Suppression d'une pieuvre
        (function freeOctopus(){
                        
            // Récupération du premier élément Octopus
            let octopusEl = document.querySelector('.octopus');
            // Suppression de l'élément Octopus dans le code source 
            //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
            // node.removeChild(child)
            net.removeChild(octopusEl);
            // Je supprime une quantité de l'objet octopus
            cardsList[2][1] -=1;
        })();

        //? FONCTION N°2 : Faire reculer le bateau d'une case
        (function backBoat() {
            
            // On stocke dans une variable focusElement qui contient la classe "boat--0"
            let focusedElementPosition0 = focusedElement.classList.contains('boat--0');

            // Pour faire reculer le bateau, il ne doit pas être en position 0 (donc pas en true)
            // Si le booléen est sur true, ou si l'élément courant contient la classe "boat--0",
            // le bateau ne recule pas
            if(boatPosition0 === false || focusedElementPosition0 == false){
                // alors le bateau peut reculer
                // J'utilise la variable globale focusedElement
                // pour récupérer l'élément précédent
                let previousFocusedElement = focusedElement.previousElementSibling;
                // Je supprime la classe "focused" de l'élément courant
                focusedElement.classList.remove("focused");
                // J'ajoute la classe "focused" à son élément précédent
                previousFocusedElement.classList.add("focused");
                // J'attribue la valeur de l'élément précédent à la variable focusedElement
                // pour qu'elle soit encore utilisable
                focusedElement = previousFocusedElement;
            }
        })();
    }

    //* Lorsqu'une autre carte sera tirée, son action se déclenchera
    function animalAction(param) {
               
            // Récupération du premier élément de chaque animal restant
            let fishEl = document.querySelector('.fish');
            let sharkEl = document.querySelector('.shark');
            let dolphinEl = document.querySelector('.dolphin');
            let turtleEl = document.querySelector('.turtle');
            // Suppression de l'élément courant dans le code source
            //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
            // node.removeChild(child)
            net.removeChild(cardsList[param]+'El');
            // Je supprime une quantité de l'objet animal
            cardsList[param][1] -=1;
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
    //* Déclaration de la fonction HANDLER
    function handleRandomCard() {
            
        randomCard              = Math.floor(Math.random() * (cardsList.length));
        let resultCardDiv       = document.querySelector('#resultCard');

        // J'incrémente le contenu de ma variable dans ma div
        resultCardDiv.textContent = randomCard;
        // Et je laisse un délai d'une demi-seconde entre l'apparition de la carte et son action dans le jeu
        setTimeout(actions(randomCard), 500);
    }


    //! STEP 2 ==============================================================================================
    //* Création des INTERACTIONS UTILISATEURS
    newCardBtn.addEventListener('click', handleRandomCard);

}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);