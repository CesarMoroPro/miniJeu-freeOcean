 function alertNoMoreAnimal(paramAnimal) {
 
        // Création d'une alerte
        //* 0 - Désactiver le clic sur le bouton "tirer une carte"
        // Supprimer l'écouteur d'événement
        newCardBtn.removeEventListener('click', handleRandomCard);
        // Je récupère le bouton pour pouvoir retirer une carte
        let okayButton1 = document.querySelector('.okay-button-1');
        // Je supprime sa classe "display-none"
        okayButton1.classList.remove('display-none');
        
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
        alert.innerHTML = "<p style=\"color: white\">Il n'y a plus de " + paramAnimal + "à libérer</p><div class=\"okay-button\">Ok, je retire</div>";
        
        //* 3 - Insérer cette div
        gameSpace.append(alert);

        //* 4 - Je récupère les boutons qui ont la classe "okay-button"
        let okayButtons = document.querySelectorAll('.okay-button');
        // Je déclenche un événement au clic sur ces boutons
        okayButtons.forEach(element => {
                element.style.cursor="pointer";
                element.addEventListener('click', () => {
                element.classList.add('display-none');
                okayButton1.classList.add('display-none');
                alert.remove();
                noPopup.classList.remove('inactive');
                newCardBtn.addEventListener('click', handleRandomCard);
                });
        })
 }