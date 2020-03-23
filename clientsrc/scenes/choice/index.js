import * as constants from "../../constants";
import events from "../../events";
import log from '../../logs';
import Camera from "../main/camera";
import controller from "./controller";
import Unit from "../main/unit";
import ui from "./ui";
import back from "./back";

let callBack = null;
let interval = null;
let camera = null;
let units = [];

export default {start}

function start(callback){

    callBack = callback;

    //когда выбор окончен
    events.on('end-choice', stop);

    events.on('keyup', onKeyUp);

    const canvas = document.getElementById("canvas");
    // Создадим камеру по "канве"
    camera = new Camera(0, 0, canvas);

    units.push(
        new Unit({
            room_id: null,
            x: camera.width/2 - 100,
            y: 200,
            width: 64,
            height: 64,
            character_id: 'blond',
            state: 'spellcast',
            coins_count: 0,
            levelupValue: 100,
            levelupCounter: 100,
        })
    );

    units.push(
        new Unit({
            room_id: null,
            x: camera.width/2 + 68,
            y: 200,
            width: 64,
            height: 64,
            character_id: 'girl',
            state: 'spellcast',
            coins_count: 0,
            levelupValue: 100,
            levelupCounter: 100,
        })
    );

    controller.start();
    controller.setClickPad(camera);

    // изменяем камеру под окно
    camera.resize();

    //При ресайзе окна браузера - изменяем камеру под окно
    window.addEventListener('resize', () => {camera.resize();});

    ui.waitScreen.hide();
    ui.choiceText.show();
    interval = setInterval(_ => {

        update();


        // Отрисовка
        draw(camera);


    }, constants.INTERVAL);
    log('Выбор запущен')
}

function stop() {
    log('Выбор окончен');
    save();
    interval && clearInterval(interval);
    camera = null;
    events.off('keyup', onKeyUp);
    events.off('end-choice', stop);
    controller.stop();
    ui.choiceText.hide();
    callBack();
}

function update() {
    units.forEach((it)=>{it.animate()});
    camera.update();
}

function draw(camera) {
    back.draw(camera);
    units.forEach((it)=>{it.draw(camera)});
}

function save() {
    log('Выбор сохранен');
}

function onKeyUp(event, key) {
    if(key==='fire'){
        events.add('end-choice');
    }
}
