//! Import des composants JS
/**
 * Je choisis de bien fragmenter tous les composants
 */
import { startBtn } from './components/startBtn.js';
import { gameGlobal } from "./pages/game-global.js";
import { titleInit } from './components/titleH1.js';
import { windowDevice } from './components/window.js';

function init() {

        // console.log('Fichier main.js chargé et fonction init() initialisée');

        windowDevice();
        titleInit();
        startBtn();
        gameGlobal();
}

window.addEventListener('DOMContentLoaded', init);