import * as constants from './constants.js'

import io from "socket.io-client";

import Room from './engine/room.js';
import Camera from './engine/camera.js';
import Unit from './engine/unit.js';
import Player from './engine/player.js';
import Loot from './engine/loot.js';

import Sound from './engine/sound.js';

import characters from "./characters.js";

// Логирование TODO: вынести в модуль
const $logs = document.getElementById('logs');
const log = function (msg) {
    $logs.innerHTML += '<div class="msg">'+msg+'</div>';
    $logs.parentElement.scrollTop = $logs.scrollHeight;
    console.log(msg);
};


/**
 * Основной класс клиента игры
 * class Game
 */
export default class {

    constructor(){

        // Скины персонажей
        this.characters = characters();

        // Доступные звуки
        this.sounds = {
            "eat1": new Sound('sound/eat1.mp3'),
            "eat2": new Sound('sound/eat2.mp3'),
            "eat": new Sound('sound/beltHandle1.ogg'),
        };

        // Текущая комната. id и сама
        this.room_id = null;
        this.room = null;

        // Камера. Совмещена со въюпортом
        this.camera = null;

        // Герой. за которого играем
        this.hero = null;

        // Все юниты
        this.units = {};

        // Весь лут
        this.loots = {};

        // сокет подключения к серверу
        this.socket = null;


        /**
         * Получение и сохранение логина пользователя
         * TODO: сделать нормальную авторизацию
         */
        //Если в локальных данных нет пароля - создадим рандомный
        this.login = localStorage.getItem('login');
        if(!this.login) {
            this.login = 'login' + Math.floor(Math.random() * 400);
            localStorage.setItem('login', this.login);
        }


        // html-елемент в который покажем информацию о герое/игре
        this.scoreElement = document.getElementById("coins_count");
        // html-елемент "загрузка"
        this.loadingElement = document.getElementById("loading");


        // Создадим камеру по "канве" из html
        this.camera = new Camera(0, 0, canvas);
        // изменяем камеру под окно
        this.camera.resize();


        //При ресайзе окна браузера - изменяем камеру под окно
        const game = this;
        window.addEventListener('resize', function () {
            game.camera.resize();
        });


        //Подключимся к серверу
        this.connectToServer();

    }


    /**
     * Подключение к серверу игры
     */
    connectToServer(){
        // Сохраняем this
        var game = this;


        // Подключаемся к серверу
        this.socket = io();


        // Действия при серверных проблемах
        this.socket.on('connect_error', function () {
            log('Ошибка подключения к серверу');
        });

        this.socket.on('disconnect', function () {
            log('Вы отключены от сервера');
        });

        // При переподключении сбросим всё
        this.socket.on('reconnect', function () {
            log('от сервера поступил reconnect');
            game.units = {};
            game.loots = {};
            game.hero = null;
        });


        // События отправляемые в основной обработчик
        for(let event of ["server", "room", "player", "sound"]) {

            game.socket.on(event, function(data){
                try{
                    data = JSON.parse(data)
                }
                catch (e){}
                let type = data.type ? data.type : "unknown";

                game.eventHandler(game, event, type, data);
            });
        }
    }

    /**
     * Отсылка сообщения серверу
     * @param event_name
     * @param data
     */
    emit(event_name, data){
        this.socket && this.socket.emit(event_name, data)
    }


    /**
     * Установка отображаемой комнаты
     * @param ID
     * @param width
     * @param height
     * @param environment_id
     */
    roomInit(ID, width, height, environment_id){
        this.room_id = ID;

        this.room = new Room(width, height, environment_id);
    }


    /**
     * Установка героя
     * @param room_id
     * @param x
     * @param y
     * @param character_id
     * @param state
     * @param coins_count
     * @param level
     * @param levelupCounter
     */
    heroInit(room_id, x, y, character_id, state, coins_count, level, levelupCounter){

        //Если ткущая комната отсутствует или не та - шлем на сервер запрос
        if(!this.room_id || this.room_id != room_id) {
            this.room_id = null;
            this.emit('need-room', room_id);
        }

        let character = this.characters[character_id] || this.characters["doc"]

        const unit = new Unit(room_id, x, y, character, 'Hero', state, coins_count, level, levelupCounter);

        this.hero = new Player(unit, constants.KEYS_ARROW, this.camera, this.socket);

        this.units['hero'] = this.hero;

        this.camera && this.camera.setFollower(this.hero.unit);

        this.loadingElement.style.display = 'none';
    }

    /**
     * Обновление информации о герое
     * @param room_id
     * @param x
     * @param y
     * @param character_id
     * @param state
     * @param coins_count
     * @param level
     * @param levelupCounter
     */
    heroSet(room_id, x, y, character_id, state, coins_count, level, levelupCounter){

        let character = this.characters[character_id] || this.characters["doc"]

        this.hero.set(room_id, x, y, character, state, coins_count, level, levelupCounter);

    }


    /**
     * Перемещение на клиенте
     *  то, что не управляется с сервера. Например камера
     */
    run(){

        //Камеры
        this.camera && this.camera.run(this.room);

    }


    /**
     * Анимация
     */
    animate(){

        //Юниты (включая самого героя)
        for (let i in this.units) {
            this.units[i].animate(constants.STEP);
        }

        //Лут
        for (let i in this.loots) {
            this.loots[i].animate(constants.STEP);
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


        // Лут
        for (let i in this.loots) {
            this.loots[i].draw(camera);
        }


        for (let i in this.units) {
            this.units[i].draw(camera);
        }

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
            game.run();


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


        /**
         * События "server"
         */
        if(event=="server") {
            if (type == "hello") {
                //TODO: переделать в нормальную авторизацию
                it.emit('login', it.login);
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

                    if (!room.ID || !room.width || !room.height || room.environment_id==undefined) throw "Ошибка получения с сервера";

                    it.roomInit(room.ID, room.width, room.height, room.environment_id);
                }
                catch (e){
                    log("Ошибка получения Комнаты. "+e);
                    log(data);
                }
            }


            // Создание нового игрока
            if(type=="player-create") {
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
                        info.level == undefined
                    ) throw "Ошибка получения с сервера";

                    let character = it.characters[info.character_id] || it.characters["man"]

                    const player = new Unit(info.room_id, info.x, info.y, character, 'Игрок['+info.ID+']', info.state, info.coins_count, info.level);
                    it.units[info.ID] = player;
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
                        info.coins_count == undefined ||
                        info.level == undefined
                    ) throw "Ошибка получения с сервера";

                    let character = it.characters[info.character_id] || it.characters["man"]

                    if(info.ID in it.units) {
                        it.units[info.ID].set(info.room_id, info.x, info.y, character, info.state, info.coins_count, info.level);
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

                    if(data.ID in it.units) {
                        delete it.units[data.ID];
                    }
                }
                catch (e){
                    log("Ошибка удаления игрока. "+e);
                    log(data);
                }
            }


            // Создание лута
            if(type=="loot-create") {
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

                    let character = it.characters[info.character_id] || it.characters["coin_gold"]

                    const loot = new Loot(info.room_id, info.x, info.y, character, info.ID);
                    it.loots[info.ID] = loot;
                }
                catch (e){
                    log("Ошибка получения лута. "+e);
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

                    let character = it.characters[info.character_id] || it.characters["gold_coin"]

                    if(info.ID in it.loots) {
                        it.loots[info.ID].set(info.room_id, info.x, info.y, character, info.ID);
                    }
                }
                catch (e){
                    log("Ошибка получения лута. "+e);
                    log(data);
                }
            }

        }


        /**
         * События "player" - события героя
         * TODO: переименовать в "hero"
         */
        if(event=="player"){


            // Создание героя при входе
            if(type=="hero-create") {

                try {

                    if (!data.info) throw "Ошибка получения с сервера";

                    var info = data.info;

                    if (
                        info.x == undefined ||
                        info.y == undefined ||
                        info.character_id == undefined ||
                        info.room_id == undefined ||
                        info.state == undefined ||
                        info.coins_count == undefined ||
                        info.level == undefined ||
                        info.levelupCounter == undefined
                    ) throw "Ошибка получения с сервера";

                    if(!it.hero) {
                        it.heroInit(info.room_id, info.x, info.y, info.character_id, info.state, info.coins_count, info.level, info.levelupCounter);
                    }
                    else{
                        it.heroSet(info.room_id, info.x, info.y, info.character_id, info.state, info.coins_count, info.level, info.levelupCounter);
                    }

                    it.showScore(info.coins_count);
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
                        info.x == undefined ||
                        info.y == undefined ||
                        info.character_id == undefined ||
                        info.room_id == undefined ||
                        info.state == undefined ||
                        info.coins_count == undefined ||
                        info.level == undefined ||
                        info.levelupCounter == undefined
                    ) throw "Ошибка получения с сервера";

                    it.heroSet(info.room_id, info.x, info.y, info.character_id, info.state, info.coins_count, info.level, info.levelupCounter);
                    it.showScore(info.coins_count, info.level, info.levelupCounter);
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

                    if(it.hero.unit.room_id == info.room_id) {
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

    /**
     * Показ информации о герое/игре
     * @param score
     */
    showScore(score){
        this.scoreElement && (this.scoreElement.innerText = score);
    }
}