export function cardInit() {
    
    //* Déclaration des variables
    //* Bouton Draw a card
    let newCardBtn          = document.querySelector('.cardBtn');
    //* Tableau des éléments
    let cardsList           = ['boat', 'ocean', 'redOctopus', 'orangeTurtle', 'blueFish', 'greenShark', 'purpleDolphin'];
    //* Élément BOAT focused
    let focusedElement      = document.querySelector('.focused');
    //* Filet
    let net                 = document.querySelector('#net');
    //* Booléen utile pour bloquer le recul du bateau s'il est sur sa première position
    //* Cette variable est à true lorsque le bateau est en position initiale (0)
    let boatPosition0       = true;



    //* Création des interactions utilisateurs
    newCardBtn.addEventListener('click', handleRandomCard);



    //* Déclaration de la logique et les fonctions contenant les actions déclenchées
    function handleRandomCard() {
        let randomCard          = Math.floor(Math.random() * (cardsList.length + 1));
        let resultCardDiv       = document.querySelector('#resultCard');

        //* J'incrémente le contenu de ma variable dans ma div
        resultCardDiv.textContent = randomCard;
        //* Et je laisse un délai d'une seconde entre l'apparition de la carte et son action dans le jeu
        setTimeout(cardsAction, 1000);

        //* Puis je lance l'action selon le résultat de la carte
        //* le numéro sorti par randomCard correspond à un index du tableau cardsList.
        function cardsAction() {
            //* Si le numéro random est égal à 0
            //* donc si la condition est False puisque 0 vaut False
            if(randomCard == false) {

                //* puisque l'index 0 du tableau correspond au bateau
                //* alors on déclenche l'action du bateau (element BOAT)
                (function boatAction() {

                    //* On récupère la div suivante de même niveau (.boat)
                    let nextFocusedElement = focusedElement.nextElementSibling;
                    //* On utilise la div qui contient la classe "focused" 
                    //* Elle a déjà été récupérée en variable globale
                    //* Et supprime la classe "focused" de cette div
                    focusedElement.classList.remove("focused");
                    //* Puis on ajoute la classe "focused" à la div suivante 
                    nextFocusedElement.classList.add("focused");
                    //* ET on attribue la valeur de nextFocusedElement à focusedElement !
                    //* sinon le code ne fonctionnera plus puisqu'il n'y aura plus d'élément
                    //* focusedElement contenant la classe "focused"
                    focusedElement = nextFocusedElement;

                    //! Je n'oublie pas de changer la valeur du booléen permettant de bloquer le recul du bateau ou non
                    boatPosition0 = false;
                })();

            //* Si le random number vaut 1
            } else if(randomCard === 1) {
                //* Alors il correspond à l'élément à l'index 1 dans le tableau (océan)
                //* Donc il déclenche la fonction d'action Océan
                (function oceanAction() {

                    //* Une popup apparait à l'écran

                    //* Un titre annonce au joueur qu'il doit choisir un animal à libérer

                    //* l'animal libéré déclenche l'action associée
                })();

            //* si le random number vaut 2
            } else if(randomCard === 2) {
                //* Il correspond à la pieuvre dans le tableau
                //* donc il déclenche ses actions
                (function octopusAction() {

                    //? FONCTION N°1 : Suppression d'une pieuvre
                    //* Récupération du premier élément Octopus
                    let octopus = document.querySelector('.octopus');
                    //* Suppression de l'élément Octopus dans le code source 
                    //! Pour le supprimer, il faut passer par le noeud parent qui a déjà été récupéré en global : variable "net"
                    //* node.removeChild(child)
                    net.removeChild(octopus);

                    //? FONCTION N°2 : Faire reculer le bateau d'une case
                    //* J'utilise la variable focusedElement déjà récupérée
                    //* Je récupère son élément précedent
                    let previousFocusedElement = focusedElement.previousElementSibling;

                    //* Si focusedElement n'a pas de previousFocusedElement
                    //* alors focusedElement ne change pas d'élément
                    //! J'utilise le booléan déclaré en variable glogale
                    //* Si sa valeur est à false, le recul du bateau est possible
                    if(boatPosition0 === false) {

                        //* Je supprime la classe "focused" de l'élément focusedElement
                        focusedElement.classList.remove("focused");
                        //* J'ajoute la classe "focused" à son élément précédent
                        previousFocusedElement.classList.add("focused");
                        //* J'attribue la valeur de l'élément précédent à la variable focusedElement
                        //* pour qu'elle soit encore utilisable
                        focusedElement = previousFocusedElement;

                        //! Je n'oublie pas de passer le booléen à true si le bateau est en position initiale (0)
                        //* Ce qui empêchera un bug en ciblant l'élément précédent du DOM qui est le filet
                        //* Pour connaître l'emplacement courant de focusedElement, je cible tous les éléments qui ont la classe .boat
                        let boats = querySelectorAll('.boat');
                        //* Pour chaque élément de cette liste, je vérifie s'ils contiennent ou non la classe spécifique
                        //* du bateau en position initiale (0)
                        boats.forEach(element => {
                            
                            //* Si l'élément courant de la liste boats contient la classe focused ET la classe boat--0
                            if(element.classList.contains('boat--0') && element.classList.contains('focused')) {
                                //* alors le booléan boatPosition0 doit être passé à true
                                boatPosition0 = true;
                            };
                        });
                    }
                })();

            } else if(randomCard >= 3) {
                (function animalAction() {
                    
                })();

            }
        }

    }
}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);