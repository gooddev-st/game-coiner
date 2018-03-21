import * as constants from "../../constants";
import log from "../../logs"
import Camera from "../../engine/camera";
import units from "../../units";
import events from "../../engine/events";
import hero from '../../engine/hero';
import characters from "../../characters";
import Unit from "../../engine/unit";
import Teleport from "../../engine/teleport";
import Room from "../../engine/room";
import Loot from "../../engine/loot";
import ui from "../../engine/ui/ui";
import controller from "../../engine/controller";
import sounds from "../../sounds";

/**
 * Основная сцена - собственно игра
 */
export default {start, stop}

// Запустим по окончании игры
let
    finalCallback = null,
    interval = null;

let rooms = {},
    room_id = null,
    room = null,

    // Камера. Совмещена со въюпортом
    camera = null,
    loots = {},
    teleports = {};


function start(callback) {
    finalCallback = callback;

    rooms = {};

    // Текущая комната. id и сама
    room_id = null;
    room = null;

    // Весь лут
    loots = {};

    // Телепорты
    teleports = {};


    const canvas = document.getElementById("canvas");
    // Создадим камеру по "канве"
    camera = new Camera(0, 0, canvas);
    // изменяем камеру под окно
    camera.resize();

    //При ресайзе окна браузера - изменяем камеру под окно
    window.addEventListener('resize', () => {camera.resize();});


    events.on("disconnect", ()=>{
        stop();
        units.reset();
        loots = {};
        hero.unit = null;
    });

    events.on("reconnect", onReconnect);
    events.on("room", onRoom);
    events.on("hero", onHero);
    events.on("sound", onSound);


    /**
     * Основной цикл
     */
    interval = setInterval(() => {

        // Перемещение, управляемое на клиенте
        update();


        // Анимация
        animate();


        // Отрисовка
        draw(camera);


    }, constants.INTERVAL);
}

function stop() {
    clearInterval(interval);
    events.off("reconnect", onReconnect);
    events.off("room", onRoom);
    events.off("hero");
    events.off("sound");

    finalCallback();
}

function onReconnect(event, type, data) {
    log('от сервера поступил reconnect');
    units.reset();
    loots = {};
    hero.unit = null;
}

/**
 * События "room"
 * @param event
 * @param type
 * @param data
 */
function onRoom(event, type, data) {

    // Получение комнаты
    if(type=="change") {
        try {
            if(!data.room) throw "Ошибка получения с сервера";

            var room = data.room;

            if (room.ID==undefined || !room.width || !room.height || room.environment_id==undefined) throw "Ошибка получения с сервера";

            roomInit(room);
        }
        catch (e){
            log("Ошибка получения Комнаты. "+e);
            log(data);
        }
    }


    // Создание нового игрока
    if(type=="player-create") { //TODO: переименовать в unit-create
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined ||
                info.state == undefined ||
                info.level == undefined
            ) throw "Ошибка получения с сервера";


            let character = characters[info.character_id] || characters["man"];

            const unit = new Unit(info.room_id, info.x, info.y, info.width, info.height, character, info.ID, info.state, info.level);
            units.add(info.ID, unit);
        }
        catch (e){
            log("Ошибка получения игрока. "+e);
            log(data);
        }
    }


    // Информация об игроке
    if(type=="player-info") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined ||
                info.state == undefined ||
                info.level == undefined
            ) throw "Ошибка получения с сервера";

            let unit = units.item(info.ID);
            if(unit) {

                let character = characters[info.character_id] || characters["man"]

                unit.set(info.room_id, info.x, info.y, character, info.ID, info.state, info.level);
            }
        }
        catch (e){
            log("Ошибка обновления игрока. "+e);
            log(data);
        }
    }


    // Игрок ушел
    if(type=="player-leave") {
        try {
            if(!data.ID) throw "Ошибка получения с сервера";

            if(data.room_id==room_id) {
                units.remove(data.ID);
            }
        }
        catch (e){
            log("Ошибка удаления игрока. "+e);
            log(data);
        }
    }


    // Информация о луте
    if(type=="loot-info") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined
            ) throw "Ошибка получения с сервера";

            if(info.room_id==room_id) {

                let character = characters[info.character_id] || characters["gold_coin"]

                if (info.ID in loots) {
                    loots[info.ID].set(info.room_id, info.x, info.y, character, info.ID);
                }
            }
        }
        catch (e){
            log("Ошибка получения лута. "+e);
            log(data);
        }
    }


    // Информация о телепортах
    if(type=="teleport-info") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.room_id == undefined ||
                info.state == undefined
            ) throw "Ошибка получения с сервера";

            if(info.room_id==room_id) {

                if (info.ID in teleports) {
                    teleports[info.ID].set(info.state);
                }
            }
        }
        catch (e){
            log("Ошибка получения телепорта. "+e);
            log(data);
        }
    }


    // Создание нового моба
    if(type=="npc-create") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined ||
                info.state == undefined
            ) throw "Ошибка получения с сервера";


            let character = characters[info.character_id] || characters["gob"];

            const unit = new Unit(info.room_id, info.x, info.y, info.width, info.height, character, info.ID, info.state);
            units.add(info.ID, unit);
        }
        catch (e){
            log("Ошибка получения моба. "+e);
            log(data);
        }
    }


    // Информация о мобе
    if(type=="npc-info") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined ||
                info.state == undefined
            ) throw "Ошибка получения с сервера";

            let unit = units.item(info.ID);
            if(unit) {

                let character = characters[info.character_id] || characters["gob"]

                unit.set(info.room_id, info.x, info.y, character, info.ID, info.state);
            }
        }
        catch (e){
            log("Ошибка обновления моба. "+e);
            log(data);
        }
    }
}

function onHero(event, type, data) {

    // Создание героя при входе
    if(type=="hero-create") {

        try {

            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined ||
                info.state == undefined ||
                info.coins_count == undefined ||
                info.level == undefined ||
                info.levelupCounter == undefined ||
                info.speed == undefined
            ) throw "Ошибка получения с сервера";

            const character = characters[info.character_id] || characters["doc"];

            if(!hero.unit) {
                hero.unit = new Unit(info.room_id, info.x, info.y, info.width, info.height, character, '['+info.ID+']', info.state, info.level, info.coins_count, info.levelupCounter);
            }
            else{
                hero.unit.set(info.room_id, info.x, info.y, character, '['+info.ID+']', info.state, info.level, info.coins_count, info.levelupCounter);
            }

            units.add('['+info.ID+']', hero.unit);

            hero.speed = info.speed;

            ui.heroInfo.start();
            ui.heroInfo.update(info);

            ui.waitScreen.hide();

            controller.start();
            controller.setClickPad(camera);

            //Если ткущая комната отсутствует или не та - шлем на сервер запрос
            if(!room_id || room_id != info.room_id) {
                room_id = null;
                events.add('need-room', info.room_id);
            }
            camera && camera.setFollower(hero.unit);
        }
        catch (e){
            log("Ошибка создания Героя. "+e);
            log(data);
        }
    }


    // Информация о герое
    if(type=="hero-info") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.character_id == undefined ||
                info.room_id == undefined ||
                info.state == undefined ||
                info.coins_count == undefined ||
                info.level == undefined ||
                info.levelupCounter == undefined ||
                info.speed == undefined
            ) throw "Ошибка получения с сервера";

            const character = characters[info.character_id] || characters["doc"]
            hero.unit.set(info.room_id, info.x, info.y, character, '['+info.ID+']', info.state, info.level, info.coins_count, info.levelupCounter);

            hero.speed = info.speed;

            ui.heroInfo.update(info, info.ID);
        }
        catch (e){
            log("Ошибка обновления Героя. "+e);
            log(data);
        }
    }
}

function onSound(event, type, data) {
    // звуковые уведомления
    if(type=="notice") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.room_id == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.ID == undefined
            ) throw "Ошибка получения с сервера";

            if(hero && hero.unit && hero.unit.room_id == info.room_id) { //TODO: не юнит, а камера
                if(info.ID in sounds) {
                    //TODO: по info.x, info.y определять как далеко от hero и делать громкость
                    sounds[info.ID].play();
                }
            }
        }
        catch (e){
            log("Ошибка звука. "+e);
            log(data);
        }
    }
}

/**
 * Перемещение на клиенте
 *  то, что не управляется с сервера. Например камера
 */
function update(){

    //Камера
    camera && camera.run(room);

}


/**
 * Анимация
 */
function animate(){

    //Юниты (включая самого героя)
    for (const unit of units.toArray()) {
        if(unit.room_id==room_id) {
            unit.animate();
        }
    }

    //Лут
    for (let i in loots) {
        loots[i].animate(constants.STEP);
    }

    //Телепорты
    for (let i in teleports) {
        teleports[i].animate(constants.STEP);
    }

}


/**
 * Отрисовка на камеру
 * @param camera
 * TODO: порядок отрисовки!
 */
function draw(camera){

    // Комната
    room && room.draw(camera);

    // Телепорты
    for (let i in teleports) {
        teleports[i].draw(camera);
    }


    let renderArray = [];

    // Лут
    for (let i in loots) {
        let item = loots[i];
        renderArray.push({y: item.y, item: item});
    }

    //Юниты
    let ua = units.toArray();

    for (let unit of units.toArray()) {
        if(unit.room_id==room_id) {
            renderArray.push({y: unit.y, item: unit});
        }
    }

    renderArray.sort((a, b)=>{
        return a.y - b.y;
    });

    for(let i in renderArray){
        renderArray[i].item.draw(camera);
    }

}



/**
 * Установка отображаемой комнаты
 * @param ID
 * @param width
 * @param height
 * @param environment_id
 */
function roomInit(settings){

    //Зачистим если не впервой
    for(let i in loots){ delete loots[i];}
    for(let i in teleports){ delete teleports[i];}
    loots = {};
    teleports = {};
    room = null;


    room_id = settings.ID;

    // Сделаем комнату или возмем из кеша
    if(settings.ID in rooms){
        room = rooms[settings.ID];
    }
    else{
        room = new Room(settings.width, settings.height, settings.environment_id);
        rooms[settings.ID] = room;
    }

    if('loot' in settings){
        for(const item of settings.loot){

            let character = characters[item.character_id] || characters["coin_gold"]

            loots[item.ID] = new Loot(room_id, item.x, item.y, character, item.ID, item.width, item.height);
        }
    }

    if('teleports' in settings){
        for(const item of settings.teleports){

            let character = characters[item.character_id] || characters["teleport"]

            teleports[item.ID] = new Teleport(room_id, item.x, item.y, character, item.ID, item.target, item.state, item.width, item.height);
        }
    }
}