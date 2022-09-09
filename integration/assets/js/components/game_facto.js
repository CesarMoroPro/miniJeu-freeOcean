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
    let gameSpace = document.getElementById('game-space');
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
                // 0 DONE - Désactiver le clic sur ma bouton pour tirer une carte
                // 1 DONE - Masquer la div no-popup
                // 2 DONE - Présenter une div à l'utilisateur
                // 3 DONE - Connaître quels animaux sont encore dans le filet (donc nb > 0)
                // 4 DONE - Insérer dans cette div des divs de chaque animal restant
                // 5 - Rendre cliquable les div animales
                // 6 - ADE : au click :
                    // 1 - Faire disparaître la div de choix d'animal à libérer
                    // 2 - Lancer la fonction correspondante selon l'animal cliqué
                    // 3 - Réactiver le clic sur le bouton pour tirer une carte

        //* 0 - Désactiver le clic sur le bouton "tirer une carte"
        // Supprimer l'écouteur d'événement
        newCardBtn.removeEventListener('click', handleRandomCard);
        
        //* 1 - Masquer la div no-popup
        // Je récupère la div no-popup
        let noPopup = document.getElementById('no-popup');
        // Masque cette div
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
        popupOceanTitle.textContent = "Choose which animal you want to get free";
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
                popupAnimal.textContent = cardsList[i][0];

                //* 5 - Rendre cliquables les divs animales


                // // Indépendemment, je fais de même pour les pieuvres
                // let allOctopuses = document.querySelector('.octopus');
                // // Je boucle sur le tableau fourni pour les pieuvres
                // allOctopuses.forEach(element => {
                //     element.addEventListener('click', () => {
                //         // Pour chaque élément pieuvre, j'ajoute un écouteur au clic
                //         // Je ferme la div océan
                //         popupOcean.remove();
                //         // Je rends visible la div "no-popup"
                //         noPopup.classList.remove("inactive");
                //         // Et je déclenche la fonction de la pieuvre
                //         octopusAction();
                //     });
                // });

                // Afin de pouvoir boucler sur un tableau, je récupère toutes les divs qui ont la classe "popup-animal"
                // let allDivsAnimals = document.getElementsByClassName('popup-animal');
                // allDivsAnimals.addEventListener('click', () => {
                //     // Je ferme la div océan
                //     popupOcean.remove();
                //     // Je rends visible la div "no-popup"
                //     noPopup.classList.remove("inactive");
                //     // Et l'action se déclenche en fonction de l'animal cliqué
                //     if(div.classList.contains(cardsList[i][2])){
                //         animalAction(cardsList[i]);
                //     }
                // })
            }
        }
    }

    //* Lorsque la carte PIEUVRE sera tirée, ses deux actions seront déclenchées
    function octopusAction() {

        // Les fonctions des PIEUVRES ne sont disponibles que si des pieuvres sont encore piégées
        //? STEP 1 : Faire reculer OU NON le bateau selon sa position ou s'il reste des pieuvres
        (function backBoat() {

            // On stocke dans une variable focusElement qui contient la classe "boat--0"
            let focusedElementPosition0 = focusedElement.classList.contains('boat--0');

            // Pour faire reculer le bateau, il ne doit pas être en position 0 (donc pas en true) et il doit encore y avoir une pieuvre à libérer
            // Si la quantité de pieuvre est > 0
            // ET Si le booléen est sur false, 
            // OU si l'élément courant ne contient pas la classe "boat--0",
            // le bateau peut reculer
            if(cardsList[2][1] > 0 && boatPosition0 === false || focusedElementPosition0 == false){
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
            } else if(focusedElementPosition0 === true){
                focusedElement = focusedElement;
            }
        })();
        
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
                cardsList[2][1] -=1;
            })();
        } else { // Création d'une alerte
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
            alert.textContent = "There is no more octopus to free";
            
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
                alert.textContent = "There is no more " + cardsList[randomCard][0] + " to free";
                
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
        resultCardDiv.textContent = cardsList[randomCard][0];
        // Et je laisse un délai d'une demi-seconde entre l'apparition de la carte et son action dans le jeu
        setTimeout(actions(randomCard), 500);
    }


    //! STEP 2 ==============================================================================================
    //* Création des INTERACTIONS UTILISATEURS
    newCardBtn.addEventListener('click', handleRandomCard);

}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);