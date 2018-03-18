import log from "./logs.js"

import * as constants from './constants.js';

import ui from './engine/ui/ui.js';

import events from './engine/events.js'

import Room from './engine/room.js';
import Camera from './engine/camera.js';
import Unit from './engine/unit.js';
import hero from './engine/hero.js';
import Loot from './engine/loot.js';
import Teleport from './engine/teleport.js';

import Sound from './engine/sound.js';

import characters from "./characters.js";

// Все юниты
import units from "./units.js";

import controller from "./engine/controller.js";
import account from "./account.js";


/**
 * Основной класс клиента игры
 * class Game
 */
export default class Game{

    constructor(){

        // Доступные звуки
        // TODO: вынести в модуль
        this.sounds = {
            "eat_coin": new Sound('sound/coin/coin.wav'),
            "teleport": new Sound('sound/teleport/flaunch.wav'),
        };

        this.rooms = {};

        // Текущая комната. id и сама
        this.room_id = null;
        this.room = null;

        // Камера. Совмещена со въюпортом
        this.camera = null;

        // Весь лут
        this.loots = {};

        // Телепорты
        this.teleports = {};

        // Создадим камеру по "канве" из html
        const canvas = document.getElementById("canvas");
        this.camera = new Camera(0, 0, canvas);
        // изменяем камеру под окно
        this.camera.resize();

        //При ресайзе окна браузера - изменяем камеру под окно
        const game = this;
        window.addEventListener('resize', function () {
            game.camera.resize();
        });

        // Пишем "Загрузка"
        ui.waitScreen.show();

        // Подключаемся к серверу
        events.init(this, this.eventHandler );

    }

    run(){

    }


    /**
     * Установка отображаемой комнаты
     * @param ID
     * @param width
     * @param height
     * @param environment_id
     */
    roomInit(settings){

        //Зачистим если не впервой
        for(let i in this.loots){ delete this.loots[i];}
        for(let i in this.teleports){ delete this.teleports[i];}
        this.loots = {};
        this.teleports = {};
        this.room && delete this.room;


        this.room_id = settings.ID;

        // Сделаем комнату или возмем из кеша
        if(settings.ID in this.rooms){
            this.room = this.rooms[settings.ID];
        }
        else{
            this.room = new Room(settings.width, settings.height, settings.environment_id);
            this.rooms[settings.ID] = this.room;
        }

        if('loot' in settings){
            for(const item of settings.loot){

                let character = characters[item.character_id] || characters["coin_gold"]

                this.loots[item.ID] = new Loot(this.room_id, item.x, item.y, character, item.ID, item.width, item.height);
            }
        }

        if('teleports' in settings){
            for(const item of settings.teleports){

                let character = characters[item.character_id] || characters["teleport"]

                this.teleports[item.ID] = new Teleport(this.room_id, item.x, item.y, character, item.ID, item.target, item.state, item.width, item.height);
            }
        }
    }


    /**
     * Перемещение на клиенте
     *  то, что не управляется с сервера. Например камера
     */
    update(){

        //Камера
        this.camera && this.camera.run(this.room);

    }


    /**
     * Анимация
     */
    animate(){

        //Юниты (включая самого героя)
        units.animate();

        //Лут
        for (let i in this.loots) {
            this.loots[i].animate(constants.STEP);
        }

        //Телепорты
        for (let i in this.teleports) {
            this.teleports[i].animate(constants.STEP);
        }

    }


    /**
     * Отрисовка на камеру
     * @param camera
     * TODO: порядок отрисовки!
     */
    draw(camera){

        // Комната
        this.room && this.room.draw(camera);

        // Телепорты
        for (let i in this.teleports) {
            this.teleports[i].draw(camera);
        }


        // Лут
        for (let i in this.loots) {
            this.loots[i].draw(camera);
        }


        this.room && units.draw(camera, this.room_id);

    }


    /**
     * Запуск основного цикла
     */
    start() {
        // Сохраним tis
        const game = this;


        /**
         * Основной цикл
         */
        setInterval(function () {

            // Перемещение, управляемое на клиенте
            game.update();


            // Анимация
            game.animate();


            // Отрисовка
            game.draw(game.camera);


        }, constants.INTERVAL);

    }

    /**
     * Основной обработчик событий
     * @param it - this от Game
     * @param event - событие
     * @param type - тип серверного события
     * @param data - данные события
     */
    eventHandler(it, event, type, data){

        // Если в данных события есть поле message - выведем в лог
        data.message && log(data.message/* + ' (Событие '+event+'.'+type+')'*/);

        // Отладка событий без message
        // data.message || log(' (Событие '+event+'.'+type+')');


        if(event=="reconnect"){
            log('от сервера поступил reconnect');
            units.reset();
            it.loots = {};
            it.hero = null;
        }


        /**
         * События "server"
         */
        if(event=="server") {

            // Приветствие от сервера
            if (type == "hello") {

                // Возьмем логин из локальных данных браузера
                let login = account.getUser();

                //Если логин уже есть
                if(login!=null) {

                    // отправим логин серверу
                    events.add('login', login);

                }
                // Если логина нет
                else {

                    // Запросим ввод логина
                    ui.login.init( (login) => {

                        // Получив сохраним
                        account.setUser(login);

                        // и отправим логин серверу
                        events.add('login', login);
                    });
                }
            }
        }


        /**
         * События "room"
         */
        if(event=="room"){


            // Получение комнаты
            if(type=="change") {
                try {
                    if(!data.room) throw "Ошибка получения с сервера";

                    var room = data.room;

                    if (room.ID==undefined || !room.width || !room.height || room.environment_id==undefined) throw "Ошибка получения с сервера";

                    it.roomInit(room);
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

                    const unit = new Unit(info.room_id, info.x, info.y, character, info.ID, info.state, info.level, info.width, info.height);
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

                    if(data.room_id==it.room_id) {
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

                    if(info.room_id==it.room_id) {

                        let character = characters[info.character_id] || characters["gold_coin"]

                        if (info.ID in it.loots) {
                            it.loots[info.ID].set(info.room_id, info.x, info.y, character, info.ID);
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

                    if(info.room_id==it.room_id) {

                        if (info.ID in it.teleports) {
                            it.teleports[info.ID].set(info.state);
                        }
                    }
                }
                catch (e){
                    log("Ошибка получения телепорта. "+e);
                    log(data);
                }
            }

        }


        /**
         * События "hero" - события героя
         */
        if(event=="hero"){


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
                        hero.unit = new Unit(info.room_id, info.x, info.y, character, '['+info.ID+']', info.state, info.level, info.coins_count, info.levelupCounter, info.width, info.height);
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
                    controller.setClickPad(it.camera);

                    //Если ткущая комната отсутствует или не та - шлем на сервер запрос
                    if(!it.room_id || it.room_id != info.room_id) {
                        it.room_id = null;
                        events.add('need-room', info.room_id);
                    }
                    it.camera && it.camera.setFollower(hero.unit);
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

                    ui.heroInfo.update(info, it.login);
                }
                catch (e){
                    log("Ошибка обновления Героя. "+e);
                    log(data);
                }
            }

        }


        /**
         * События "sound"
         */
        if(event=="sound"){


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

                    if(hero.unit.room_id == info.room_id) { //TODO: не юнит, а камера
                        if(info.ID in it.sounds) {
                            //TODO: по info.x, info.y определять как далеко от this.hero и делать громкость
                            it.sounds[info.ID].play();
                        }
                    }
                }
                catch (e){
                    log("Ошибка звука. "+e);
                    log(data);
                }
            }

        }
    }

}