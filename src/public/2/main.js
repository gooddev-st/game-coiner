import Game from './game.js'
import events from './events.js'

window.onload = function(){

    events.init();

    const game = new Game();

    game.start();

};