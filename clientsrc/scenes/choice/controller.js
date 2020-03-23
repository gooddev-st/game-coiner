/**
 * Контроллер - клавиши и мышь
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

    SPACE: 32, //Огонь!

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
    window.addEventListener("touchstart", onMouseDown, false);
    window.addEventListener("touchend", onMouseUp, false);
    window.addEventListener("contextmenu", e=>e.preventDefault(), false);

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
    window.removeEventListener("touchstart", onMouseDown, false);
    window.removeEventListener("touchend", onMouseUp, false);
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
        events.add('click', {x: x, y: y});

    }
}

//Мышь нажали
function onMouseDown(e) {

    // Если есть по чем кликать отправим событие
    if(clickPad) {
        //targetTouches
        let x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;

        //Если касание и оно одно
        if(e.changedTouches && e.changedTouches.length>=1){
            x = e.changedTouches[0].pageX + clickPad.x;
            y = e.changedTouches[0].pageY + clickPad.y;
            events.add('mouse-down-left', {x: x, y: y});
        }

        else if(e.button === 0 || e.button===1) {
            events.add('mouse-down-left', {x: x, y: y});
        }
        else if(e.button === 2){
            events.add('mouse-down-right', {x: x, y: y});
            e.preventDefault();
        }
    }
}

//Мышь отпустили
function onMouseUp(e) {

    // Если есть по чем кликать отправим событие
    if(clickPad) {
        let x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;

        //Если касание и оно одно
        if(e.changedTouches && e.changedTouches.length>=1){
            x = e.changedTouches[0].pageX + clickPad.x;
            y = e.changedTouches[0].pageY + clickPad.y;
            events.add('mouse-up-left', {x: x, y: y});
        }
        else if(e.button === 0 || e.button===1) {
            events.add('mouse-up-left', {x: x, y: y});
        }
        else if(e.button === 2){
            events.add('mouse-up-right', {x: x, y: y});
            e.preventDefault();
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
