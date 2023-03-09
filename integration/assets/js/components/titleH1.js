export function titleInit() {
        console.log("Fichier titleH1.js chargé, fonction titleInit() initialisée");

        //* Je récupère le titre H1
        let h1 = document.querySelector('h1');
        //console.log(h1)

        /**
         * Définir un nombre aélatoire X pour la largeur
         * Puis un nombre aléatoire Y pour la hauteur
         * 
         * Toutes les Z secondes, déclencher une fonction.
         * 
         * Cette fonction appliquera un style css avec un transform sur la position.
         * La position sur la largeur prendra le nombre aléatoire X
         * La position sur la hauteur prendra le nombre aléatoire Y
         */

        //* J'initialise en global les nombres aléatoires et un tableau les regroupant
        let numberWidthNeg;
        let numberHeightNeg;
        let numberWidthPos;
        let numberHeightPos;
        let allNumbers = [];

        let numberOne;
        let numberTwo;

        //* Je définis la fonction generateNumbers()
        function generateNumbers() {

                //* Je définis un nombre aléatoire négatif pour la largeur
                numberWidthNeg = Math.floor(Math.random() * -300);
                // console.log(numberWidth);

                //* Je définis un nombre aléatoire positif pour la largeur
                numberWidthPos = Math.floor(Math.random() * 300);
                // console.log(numberWidth);

                //* Je définis un nombre aléatoire négatif pour la hauteur
                numberHeightNeg = Math.floor(Math.random() * -50);
                // console.log(numberHeight);

                //* Je définis un nombre aléatoire positif pour la hauteur
                numberHeightPos = Math.floor(Math.random() * 50);
                // console.log(numberHeight);

                //* Je met à jour le tableau avec ces 4 valeurs.
                // Il faut d'abord penser à vider le tableau entièrement à chaque passage, sinon les nouvelles valeurs s'ajouteront aux précédentes à chaque génération
                allNumbers.splice(0, allNumbers.length);
                // Puis je peux ajouter les 4 nouvelles valeurs dans ce tableau maintenant totalement vide
                allNumbers.push(numberWidthNeg, numberWidthPos, numberHeightNeg, numberHeightPos);
               // console.log(allNumbers);
                return allNumbers;
        };

        //* Je définis une fonction qui va choisir aléatoirement deux valeurs dans le tableau allNumbers
        // Elle va devoir s'auto-appeler
        function choose2Numbers() {
                // console.log('choose2Numbers');
                numberOne = Math.round(Math.random());
                numberTwo = Math.round(Math.random() + 2);
                
                return numberOne, numberTwo;
        };


        //* Je définis la fonction moveTitle()
        function moveTitle() {
                
                //* Maintenant que les coordonnées peuvent être modifiées aléatoirement, je peux les appliquer au titre
                // Je récupère la position width et height du titre h1
                let widthPosition = h1.offsetWidth;
                let heightPosition = h1.offsetHeight;
                // Je change leur valeur
                widthPosition += allNumbers[numberOne];
                heightPosition += allNumbers[numberTwo];
                // console.log(numberOne, numberTwo);
                // console.log(widthPosition, heightPosition);

                
                // h1.style.position = "absolute";
                // h1.style.left = widthPosition;
                // h1.style.top = heightPosition;

                //* Toutes les X secondes, moveTitle() fait appel à generateNumbers() pour générer des nombres aléatoires
                // Ils sont stockés dans le tableau allNumbers accessible grâce au return
                generateNumbers();
                choose2Numbers();
        }

        //* Je déclenche une première fois la fonction generateNumbers() (au chargement de la page)
        generateNumbers(); // Génère un tableau
        //* Je dois faire sélectionner deux données au hasard dans ce tableau
        // Je commence par créer des nombres aléatoire, une variable renvoyant 0 ou 1, et une autre renvoyant 2 ou 3 (pour les index du tableau)
        choose2Numbers();
        //* Je définis un setInterval() qui déclenche une fonction toutes les X secondes
        setInterval(moveTitle, 3000);
}