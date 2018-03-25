/**
 * Контроллер - клавиши и мышь
 * TODO: может команды меню тоже событиями
 */


// подключим события
import events from './events.js'


const keys = {
        LEFT: 37, //Left
        UP: 38, //Up
        RIGHT: 39, //Right
        DOWN: 40, //Down

        A: 65, //A
        W: 87, //W
        D: 68, //D
        S: 83, // S

        STATISTIC: 191 // "/"

    };

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

    window.removeEventListener("click", onClick, false);
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

        case keys.LEFT:
        case keys.A:
            events.add('keydown', 'left');
            break;
        case keys.UP:
        case keys.W:
            events.add('keydown', 'up');
            break;
        case keys.RIGHT:
        case keys.D:
            events.add('keydown', 'right');
            break;
        case keys.DOWN:
        case keys.S:
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
        case keys.A:
            events.add('keyup', 'left');
            break;
        case keys.UP:
        case keys.W:
            events.add('keyup', 'up');
            break;
        case keys.RIGHT:
        case keys.D:
            events.add('keyup', 'right');
            break;
        case keys.DOWN:
        case keys.S:
            events.add('keyup', 'down');
            break;
        case keys.STATISTIC:
            events.add('keyup', 'statistic');
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
        let x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;
        events.add('target', {x: x, y: y});
        events.add('click', {x: x, y: y});

    }
}


/**
 * Если окно потеряло фокус
 */
function onWindowBlur() {
    // отожмем все клавиши
    events.add('controllerReset', true);
}