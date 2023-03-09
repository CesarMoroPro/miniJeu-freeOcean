export function windowDevice() {
        //console.log("Fichier window.js chargé, fonction windowDevice() initialisée");

        //* Je récupère la hauteur de la fenêtre du support qui consulte le site
        let windowHeight = window.innerHeight;
        //console.log(windowHeight);
        //* Je récupère la balise <body>
        let body = document.querySelector('body');
        
        //* Je lui définis une hauteur correspondant à la hauteur de la fenêtre du support
        body.style.height = windowHeight + 'px';
}