export function cardInit() {
    
    //* Déclaration des variables
    let newCardBtn          = document.querySelector('.cardBtn');
    let cardsList           = ['boat', 'ocean', 'redOctopus', 'orangeTurtle', 'blueFish', 'greenShark', 'purpleDolphin'];
    let focusedElement      = document.querySelector('.focused');
    


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
                })();

            } else if(randomCard === "1") {
                (function oceanAction() {

                })();

            } else if(randomCard === "2") {
                (function octopusAction() {

                })();

            } else if(randomCard >= "3") {
                (function animalAction() {
                    
                })();

            }
        }

    }
}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);