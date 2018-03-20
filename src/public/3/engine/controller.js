/**
 * Контроллер - клавиши и мышь
 * TODO: может команды меню тоже событиями
 */


// подключим события
import events from './events.js'


// Варианты управления
const
    KEYS_ARROW = {
        LEFT: 37, //Left
        UP: 38, //Up
        RIGHT: 39, //Right
        DOWN: 40 //Down
    },//Управление стрелками

    KEYS_WASD = {
        LEFT: 65, //A
        UP: 87, //W
        RIGHT: 68, //D
        DOWN: 83 // S
    };//Управление кнопками W A S D

// По-умолчанию управляем стрелками
//TODO: функция смены управления
let keys = KEYS_ARROW;

let clickPad = null;



export default {start, stop, setClickPad}


/**
 * Запустим контроллер
 */
function start() {

    // Если окно потеряло фокус
    window.addEventListener("blur", onWindowBlur, false);

    // Нажата клавиша
    document.addEventListener("keydown", onKeydown, false);

    // Отжата клавиша
    document.addEventListener("keyup", onKeyup, false);

    window.addEventListener("click", onClick, false);
}


/**
 * Остановим контроллер
 */
function stop() {

    window.removeEventListener("blur", onWindowBlur, false);
    document.removeEventListener("keydown", onKeydown, false);
    document.removeEventListener("keyup", onKeyup, false);
}


function setClickPad(_clickPad) {
    clickPad = _clickPad;
}

/**
 * При нажатии клавиши
 * @param e
 */
function onKeydown(e) {
    switch (e.keyCode) {

        case keys.LEFT: // left arrow
            events.add('keydown', 'left');
            break;
        case keys.UP: // up arrow
            events.add('keydown', 'up');
            break;
        case keys.RIGHT: // right arrow
            events.add('keydown', 'right');
            break;
        case keys.DOWN: // down arrow
            events.add('keydown', 'down');
            break;
    }
}


/**
 * При отжатии клавиши
 * @param e
 */
function onKeyup(e) {
    switch (e.keyCode) {
        case keys.LEFT:
            events.add('keyup', 'left');
            break;
        case keys.UP:
            events.add('keyup', 'up');
            break;
        case keys.RIGHT:
            events.add('keyup', 'right');
            break;
        case keys.DOWN:
            events.add('keyup', 'down');
            break;
        // case 32: // пробел для паузы
        //     Game.togglePause();
        //     break;
    }
}


/**
 * При клике
 * @param e
 */
function onClick(e) {

    // Если есть по чем кликать отправим событие
    if(clickPad) {
        events.add('target', {x: e.clientX + clickPad.x, y: e.clientY + clickPad.y});
    }
}


/**
 * Если окно потеряло фокус
 */
function onWindowBlur() {
    // отожмем все клавиши
    events.add('keyup', 'left');
    events.add('keyup', 'up');
    events.add('keyup', 'right');
    events.add('keyup', 'down');

    // очистим цель мыши
    events.add('target', null);
}