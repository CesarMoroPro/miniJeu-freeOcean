export function startBtn() {

    //* Déclarations des variables
    let playNowBtn      = document.querySelector('.startBtn');
    let newCardBtn      = document.querySelector('.cardBtn');
    let resultDiv       = document.querySelector('#result');


    //* Création des interactions utilisateurs
    playNowBtn.addEventListener('click', handleStartGame);


    //* Déclaration de la logique et les fonctions contenant les actions déclenchées
    function handleStartGame() {
        playNowBtn.classList.replace('active', 'inactive');
        newCardBtn.classList.replace('inactive', 'active');
        resultDiv.classList.replace('inactive', 'active');
    }
}



//* Application de ce code lorsque le DOM complet est chargé avec succès.
window.addEventListener('DOMContentLoaded', startBtn);