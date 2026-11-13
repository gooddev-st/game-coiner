import * as constants from "../../constants";
import log from "../../logs"
import Camera from "./camera";
import units from "./units";
import events from "../../events";
import hero from './hero';
import Unit from "./unit";
import Teleport from "./teleport";
import LightRoom from "./rooms/lightroom";
import LoadedRoom from "./rooms/loadedroom";
import Loot from "./loot";
import ui from "./ui/ui";
import controller from "./controller";
import sounds from "../../sounds";
import entities from "./entities";
import account from "../../account";

/**
 * Основная сцена - собственно игра
 */
export default {start, stop}

// Запустим по окончании игры
let finalCallback = null;

let interval = null;

let started = false;

let rooms = {},
    room_id = null,
    room = null,

    // Камера. Совмещена со въюпортом
    camera = null,
    loots = {},
    teleports = {};

let currentUnit = null;


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
    window.addEventListener('resize', onResize);

    started = true;

    //Запросим аватара
    events.add('need-avatar');

    events.on("signout",()=>{
        account.signout();
        events.disconnect();
        stop()
    });

    events.on("disconnect", ()=>{
        stop();
    });

    events.on("reconnect", onReconnect);
    events.on("room", onRoom);
    events.on("hero", onHero);
    events.on("sound", onSound);

    //На клик мышью
    //TODO: в метод, в котором выделение юнита или отправка клика на сервер
    events.on("mouse-down-left", (eventName, pos)=>{
        if(pos) {
            entities.add(null, pos.x, pos.y+1, 'pointer', .35);
        }

        let unit = getPeekUnit(camera, pos.x, pos.y);

        //Если кликнули по юниту
        if(unit){

            //Если юнит уже выделен
            if(currentUnit.ID===unit.ID){
                //событие "цельмышью" для сервера
                events.add('hero-target', pos);

            }
            else {
                currentUnit = unit;
                //событие выбора игрока
                events.add('selectUnit', unit.ID);
            }
        }
        else{
            events.add('hero-target', pos);
        }
    });

    //Взрывы, визуальные эффекты и другое...
    events.on("entity", (eventName, type, data)=>{
        if(type==="remove-coin" && data.room_id===room_id){

            entities.add(null, data.x, data.y, 'boom1', .65);

        }

        if(type==="teleport-target" && data.room_id===room_id){

            entities.add(null, data.x, data.y, 'barier', 0.65);
        }

        if(type==="push-effect" && data.room_id===room_id){

            entities.add(null, data.x, data.y, 'push1', 0.15);
        }
    });

    ui.skills.start();

    ui.top10.start();

    ui.chat.start();


    /**
     * Основной цикл
     */
    interval = setInterval(_ => {

        // Перемещение, управляемое на клиенте
        update();


        // Отрисовка
        draw(camera);


        // Анимация
        animate();


    }, constants.INTERVAL);
}

function stop() {
    // При выходе stop вызывается дважды: из signout и из disconnect
    if (!started) return;
    started = false;

    clearInterval(interval);

    window.removeEventListener('resize', onResize);

    events.off("signout");
    events.off("disconnect");
    events.off("mouse-down-left");

    events.off("reconnect", onReconnect);
    events.off("room", onRoom);
    events.off("hero", onHero);
    events.off("sound", onSound);

    events.off("click");
    events.off("entity");
    events.off("coin");

    units.reset();
    loots = {};
    hero.unit = null;
    entities.reset();

    ui.skills.stop();
    ui.heroInfo.stop();
    ui.unitInfo.stop();

    ui.top10.stop();

    ui.chat.stop();

    finalCallback();
}

function onResize() {
    camera.resize();
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
    if(type==="change") {
        try {
            if(!data.room) throw "Ошибка получения с сервера";

            const room = data.room;

            if (
                room.ID==undefined ||
                room.type==undefined ||
                !room.width ||
                !room.height
            ) throw "Ошибка получения с сервера";

            roomInit(room, data.players, data.hero);
        }
        catch (e){
            log("Ошибка получения Комнаты. "+e);
            log(data);
        }
    }


    // Создание нового игрока
    if(type==="player-create") {
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

            const unit = new Unit(info);
            units.add(info.ID, unit);
        }
        catch (e){
            log("Ошибка получения игрока. "+e);
            log(data);
        }
    }


    // Информация об игроке
    if(type==="player-info") {
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

                unit.set(info);
            }
        }
        catch (e){
            log("Ошибка обновления игрока. "+e);
            log(data);
        }
    }


    // Игрок ушел
    if(type==="player-leave") {
        try {
            if(!data.ID) throw "Ошибка получения с сервера";

            let unit = units.item(data.ID);
            if(unit) {
                unit.destroy();
                units.remove(data.ID);
            }

        }
        catch (e){
            log("Ошибка удаления игрока. "+e);
            log(data);
        }
    }


    // Создание лута
    if(type==="loot-create") {
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

                if (info.ID in loots===false){
                    loots[info.ID] = new Loot(info.room_id, info.x, info.y, info.character_id, info.ID, info.width, info.height);
                }
                else {
                    loots[info.ID].set(info.room_id, info.x, info.y, info.character_id, info.ID);
                }
            }
        }
        catch (e){
            log("Ошибка получения лута. "+e);
            log(data);
        }
    }


    // Создание декорации
    if(type==="cartoon-create") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.x == undefined ||
                info.y == undefined ||
                info.spriteset_id == undefined ||
                info.sprite_id == undefined ||
                info.room_id == undefined
            ) throw "Ошибка получения с сервера";

            if(info.room_id==room_id) {

                entities.addFromSet(info.ID, info.x, info.y, info.spriteset_id, info.sprite_id, 0, 0);
            }
        }
        catch (e){
            log("Ошибка получения декорации. "+e);
            log(data);
        }
    }


    // Информация о комнате
    if(type==="all-info") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if('room_id' in info && info.room_id===room_id) {

                if ('npcs' in info) {
                    for (let id in info.npcs) {
                        let unit = units.item(id);
                        if (unit) {
                            unit.set(info.npcs[id]);
                        }
                    }
                }

                if ('loot' in info) {
                    for (let id in info.loot) {

                        if (id in loots) {
                            loots[id].set(info.loot[id].room_id, info.loot[id].x, info.loot[id].y, info.loot[id].character_id, id);
                        }
                    }
                }

                if ('teleports' in info) {
                    for (let id in info.teleports) {

                        if (id in teleports) {
                            teleports[id].set(info.teleports[id]);
                        }
                    }
                }
            }
        }
        catch (e){
            log("Ошибка обновления комнаты. "+e);
            log(data);
        }
    }


    // Удаление лута
    if(type==="loot-remove") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.room_id == undefined
            ) throw "Ошибка получения с сервера";

            if(info.room_id===room_id) {

                if (info.ID in loots) {
                    delete loots[info.ID];
                }
            }
        }
        catch (e){
            log("Ошибка удаления лута. "+e);
            log(data);
        }
    }


    // Удаление картонок
    if(type==="cartoon-remove") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.room_id == undefined
            ) throw "Ошибка получения с сервера";

            if(info.room_id===room_id) {

                entities.removeByID(info.ID);
            }
        }
        catch (e){
            log("Ошибка удаления картонки. "+e);
            log(data);
        }
    }


    // Создание нового моба
    if(type==="npc-create") {
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


            const unit = new Unit(info);
            units.add(info.ID, unit);
        }
        catch (e){
            log("Ошибка получения моба. "+e);
            log(data);
        }
    }

    // Удаление моба
    if(type==="npc-remove") {
        try {
            if(!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (
                info.ID == undefined ||
                info.room_id == undefined
            ) throw "Ошибка получения с сервера";

            let unit = units.item(info.ID);
            unit.destroy();
            units.remove(info.ID);

        }
        catch (e){
            log("Ошибка удаления моба. "+e);
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

            if(!hero.unit) {
                hero.unit = new Unit(info, true);
            }
            else{
                hero.unit.set(info);
            }

            units.add('['+info.ID+']', hero.unit);

            hero.speed = info.speed;

            ui.heroInfo.start();
            ui.heroInfo.update(info);

            currentUnit = hero.unit;
            ui.unitInfo.start();
            ui.unitInfo.update(currentUnit);

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

            hero.unit.set(info);

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
    camera && camera.update(room);

    if(currentUnit) {
        //Показать выбранного юнита в окне юнита
        ui.unitInfo && ui.unitInfo.update(currentUnit);
    }

    //Сущности
    entities.each((entity, index)=>{

        entity.update();

        //Удалим отработавшие сущности
        if(entity.isDie()){
            entities.remove(index);
        }
    });

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

    //Сущности
    entities.each( (entity) => {
        entity.animate();
    });

    //Комнатные сущности
    if(room && room.cartoons) {
        room.cartoons.forEach((cartoon) => {
            cartoon.animate && cartoon.animate();
        });
    };

}


/**
 * Отрисовка на камеру
 * @param camera
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
    for (let unit of units.toArray()) {
        if(unit.room_id==room_id) {
            renderArray.push({y: unit.y, item: unit});
        }
    }

    //Сущности
    entities.each( (item) => {
        renderArray.push({y: item.y, item: item});
    });

    //Комнатные сущности
    if(room && room.cartoons) {
        room.cartoons.forEach((item) => {
            renderArray.push({y: item.y, item: item});
        });
    };

    renderArray.sort((a, b)=>{
        return a.y - b.y;
    });

    for(let i in renderArray){
        renderArray[i].item.draw(camera);
    }

}


/**
 * Установка отображаемой комнаты
 * @param settings
 * @param players
 * @param hero
 */
function roomInit(settings, players, heroUnit){

    //Зачистим если не впервой
    for(let i in loots){ delete loots[i];}
    for(let i in teleports){ delete teleports[i];}
    loots = {};
    teleports = {};
    room = null;
    entities.reset();
    units.reset();


    room_id = settings.ID;

    // Сделаем комнату или возмем из кеша
    if(settings.ID in rooms){
        room = rooms[settings.ID];
    }
    else{
        if(settings.type==='loaded'){
            room = new LoadedRoom(settings);
        }
        else{
            room = new LightRoom(settings.width, settings.height, settings.environment_id, settings.entities_num);
        }

        rooms[settings.ID] = room;
    }

    if('cartoons' in settings){
        for(const item of settings.cartoons){
            entities.addFromSet(item.ID, item.x, item.y, item.spriteset_id, item.sprite_id, 0, Math.random());
        }
    }

    if('loot' in settings){
        for(const item of settings.loot){

            loots[item.ID] = new Loot(room_id, item.x, item.y, item.character_id, item.ID, item.width, item.height);
        }
    }

    if('teleports' in settings){
        for(const item of settings.teleports){

            teleports[item.ID] = new Teleport(room_id, item.x, item.y, item.character_id, item.ID, item.target, item.state, item.width, item.height);
        }
    }

    if('npcs' in settings){
        for(const item_id in settings.npcs){
            let item = settings.npcs[item_id];
            units.add(item.ID, new Unit(item));
        }
    }

    if(players){
        for(const item_id in players){
            let item = players[item_id];
            units.add(item.ID, new Unit(item));
        }
    }
}

function getPeekUnit(camera, x, y) {
    for (let unit of units.toArray()) {
        if(unit.inBox(camera, x, y)) {
            return unit;
        }
    }
}
