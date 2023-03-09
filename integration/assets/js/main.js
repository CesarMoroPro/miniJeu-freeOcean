//! Import des composants JS
/**
 * Je choisis de bien fragmenter tous les composants
 */
import { startBtn } from './components/startBtn.js';
import { cardInit } from "./components/game_facto.js";
import { titleInit } from './components/titleH1.js';
import { windowDevice } from './components/window.js';

function init() {

        windowDevice();
        titleInit();
        startBtn();
        cardInit();
}

window.addEventListener('DOMContentLoaded', init);