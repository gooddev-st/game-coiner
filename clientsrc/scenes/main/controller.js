/**
 * Контроллер - клавиши и мышь
 * TODO: может команды меню тоже событиями
 */


// подключим события
import events from '../../events.js'


const keys = {
    LEFT: 37, //Left
    UP: 38, //Up
    RIGHT: 39, //Right
    DOWN: 40, //Down

    A: 65, //A
    W: 87, //W
    D: 68, //D
    S: 83, // S

    N1: 49,
    N2: 50,
    N3: 51,
    N4: 52,
    N5: 53,
    N6: 54,
    N7: 55,
    N8: 56,
    N9: 57,
    N0: 48,

    SPACE: 32, //Огонь!

    STATISTIC: 73 // "I"

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
    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mouseup", onMouseUp, false);
}


/**
 * Остановим контроллер
 */
function stop() {

    window.removeEventListener("blur", onWindowBlur, false);
    document.removeEventListener("keydown", onKeydown, false);
    document.removeEventListener("keyup", onKeyup, false);

    window.removeEventListener("click", onClick, false);
    window.removeEventListener("mousedown", onMouseDown, false);
    window.removeEventListener("mouseup", onMouseUp, false);
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
        case keys.SPACE:
            events.add('keydown', 'fire');
            break;
        case keys.N1:
            events.add('skill-change', 'skill1');
            break;
        case keys.N2:
            events.add('skill-change', 'skill2');
            break;
        case keys.N3:
            events.add('skill-change', 'skill3');
            break;
        case keys.N4:
            events.add('skill-change', 'skill4');
            break;
        case keys.N5:
            events.add('skill-change', 'skill5');
            break;
        case keys.N6:
            events.add('skill-change', 'skill6');
            break;
        case keys.N7:
            events.add('skill-change', 'skill7');
            break;
        case keys.N8:
            events.add('skill-change', 'skill8');
            break;
        case keys.N9:
            events.add('skill-change', 'skill9');
            break;
        case keys.N0:
            events.add('skill-change', 'skill10');
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
        case keys.SPACE:
            events.add('keyup', 'fire');
            break;
        case keys.STATISTIC:
            events.add('keyup', 'statistic');
            break;
        /*case keys.N1:
            events.add('keyup', 'skill1');
            break;
        case keys.N2:
            events.add('keyup', 'skill2');
            break;
        case keys.N3:
            events.add('keyup', 'skill3');
            break;
        case keys.N4:
            events.add('keyup', 'skill4');
            break;
        case keys.N5:
            events.add('keyup', 'skill5');
            break;
        case keys.N6:
            events.add('keyup', 'skill6');
            break;
        case keys.N7:
            events.add('keyup', 'skill7');
            break;
        case keys.N8:
            events.add('keyup', 'skill8');
            break;
        case keys.N9:
            events.add('keyup', 'skill9');
            break;
        case keys.N0:
            events.add('keyup', 'skill10');
            break;*/
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

//Мышь нажали
function onMouseDown(e) {

    // Если есть по чем кликать отправим событие
    if(clickPad) {
        let x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;

        if(e.button === 0 || e.button===1) {
            events.add('mouse-down-left', {x: x, y: y});
        }
        else if(e.button === 2){
            events.add('mouse-down-right', {x: x, y: y});
        }

    }
}

//Мышь отпустили
function onMouseUp(e) {

    // Если есть по чем кликать отправим событие
    if(clickPad) {
        let x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;

        if(e.button === 0 || e.button===1) {
            events.add('mouse-up-left', {x: x, y: y});
        }
        else if(e.button === 2){
            events.add('mouse-up-right', {x: x, y: y});
        }

    }
}


/**
 * Если окно потеряло фокус
 */
function onWindowBlur() {
    // отожмем все клавиши
    events.add('controllerReset', true);
}