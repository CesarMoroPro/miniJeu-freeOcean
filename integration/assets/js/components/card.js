export function cardInit() {
    
    //* Déclaration des variables
    let newCardBtn         = document.querySelector('.cardBtn');
    let cardsList          = ['boat', 'ocean', 'redOctopus', 'orangeTurtle', 'blueFish', 'greenShark', 'purpleDolphin'];



    //* Création des interactions utilisateurs
    newCardBtn.addEventListener('click', handleRandomCard);



    //* Déclaration de la logique et les fonctions contenant les actions déclenchées
    function handleRandomCard() {
        let randomCard          = Math.floor(Math.random() * (cardsList.length + 1));
        let resultCardDiv       = document.querySelector('#resultCard');

        //* J'incrémente le contenu de ma variable dans ma div
        resultCardDiv.textContent = randomCard;

        (function cardsAction() {
            if(randomCard == false) {
                (function boatAction() {
                    
                })();
            } else if(randomCard === "1") {

            } else if(randomCard === "2") {

            } else if(randomCard >= "3") {

            }
        })()

    }
}


//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', cardInit);