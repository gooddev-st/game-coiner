import * as constants from './constants.js'
import Room from './engine/room.js';
import Camera from './engine/camera.js';
import Unit from './engine/unit.js';
import Player from './engine/player.js';
import Loot from './engine/loot.js';
import Sound from './engine/sound.js';

import characters from "./characters.js";
import io from "socket.io-client";

const $logs = document.getElementById('logs');
const log = function (msg) {
    $logs.innerHTML += '<div class="msg">'+msg+'</div>';
    console.log(msg);
}


/**
 * class Game
 */
export default class {

    constructor(){
        /*
         *   Скины персонажей
         */
        this.characters = characters();

        this.eat1Sound = new Sound('sound/eat1.mp3');
        this.eat2Sound = new Sound('sound/eat2.mp3');

        this.room_id = null;
        this.room = null;
        this.camera = null;

        this.units = {};
        this.loots = {};

        this.connected = false;
        this.socket = null;

        //Если в локальных данных нет пароля - создадим рандомный
        this.login = localStorage.getItem('login');
        if(!this.login) {
            this.login = 'login' + Math.floor(Math.random() * 400);
            localStorage.setItem('login', this.login);
        }

        this.scoreElement = document.getElementById("coins_count");

        //Создадим камеру по "канве"
        this.camera = new Camera(0, 0, canvas);
        this.camera.resize();

        const game = this;
        window.addEventListener('resize', function () {
            game.camera.resize();
        });

        //Подключимся к серверу
        this.connectToServer();
    }

    connectToServer(){
        const
            EVENTS = [
                "server",
                "room",
                "player"
            ];

        var game = this;

        this.socket = io();

        this.socket.on('connect_error', function () {
            log('Ошибка подключения к серверу');
        });

        this.socket.on('disconnect', function () {
            log('Вы отключены от сервера');
        });

        this.socket.on('reconnect', function () {
            log('от сервера поступил reconnect');
        });

        for(let event of EVENTS) {
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

    emit(event_name, data){
        this.socket && this.socket.emit(event_name, data)
    }

    roomInit(ID, width, height, environment_id){
        this.room_id = ID;
        this.room = new Room(width, height, environment_id);
    }

    playerInit(room_id, x, y, character_id, state, coins_count){

        let character = this.characters[character_id] || this.characters["doc"]

        const unit = new Unit(room_id, x, y, character, 'Hero', state, coins_count);

        this.hero = new Player(unit, constants.KEYS_ARROW, this.socket);

        this.units['hero'] = this.hero;

        this.camera && this.camera.setFollower(this.hero.unit);
    }

    playerSet(room_id, x, y, character_id, state, coins_count){

        let character = this.characters[character_id] || this.characters["doc"]

        this.hero.set(room_id, x, y, character, state, coins_count);
    }

    //Сбор монеток TODO: перетащить на сервер
    harvesting(){

        //Перебираем монеты
        for(let i=0; i<this.loots.length;i++){
            let toucher = [];

            //Перебираем юниты
            for(let j=0;j<this.units.length;j++){

                //если юнит - игрок
                if(this.units[j] instanceof Player){
                    //если он коснулся монеты
                    if(this.units[j].isTouch(this.loots[i])){
                        //добавим его в коснувшиеся
                        toucher.push(this.units[j]);
                    }
                }
            }

            //Если монету собрали - переместим в случайное место(типа убрали и создали новую)
            if(toucher.length>0){
                this.loots[i].x = Math.floor(this.loots[i].width/2 + Math.random() * (this.map.width-this.loots[i].width));
                this.loots[i].y = Math.floor(this.loots[i].height/2 + Math.random() * (this.map.height-this.loots[i].height));
            }

            //Если один коснувшийся - ему плюс
            if(toucher.length==1){
                toucher[0].coins_count++;
                console.log('игрок '+toucher[0].name + ' получил монету');

                if(toucher[0].name=='doc'){
                    this.doc_score_table.innerHTML=toucher[0].coins_count;
                    this.eat1Sound.play();
                }
                else{
                    this.man_score_table.innerHTML=toucher[0].coins_count;
                    this.eat2Sound.play();
                }
            }
            //Если одновременно коснулись больше одного игрока - разыграем
            else if(toucher.length>1){
                let winer = Math.floor(Math.random()*toucher.length);
                //победившему - плюс
                toucher[winer].coins_count++;
                console.log('игрок '+toucher[winer].name + ' получил монету');
                //и вякнем звуком
                if(toucher[winer].name=='doc'){
                    this.doc_score_table.innerHTML=toucher[winer].coins_count;
                    this.eat1Sound.play();
                }
                else{
                    this.man_score_table.innerHTML=toucher[winer].coins_count;
                    this.eat2Sound.play();
                }
            }
        }
    }

    run(){
        //Юниты
        /*for (let i = 0; i < this.units.length; i++) {
            this.units[i].run(this.room, constants.STEP);
        }*/

        //Лут
        for (let i = 0; i < this.loots.length; i++) {
            this.loots[i].run(constants.STEP);
        }

        //Камеры
        this.camera && this.camera.run(this.room);

        this.harvesting()
    }

    animate(){
        //Юниты
        for (let i in this.units) {
            this.units[i].animate(constants.STEP);
        }
        //Лут
        for (let i in this.loots) {
            this.loots[i].animate(constants.STEP);
        }
    }

    draw(camera){
        this.room && this.room.draw(camera);

        for (let i in this.loots) {
            this.loots[i].draw(camera);
        }
        for (let i in this.units) {
            this.units[i].draw(camera);
        }
    }

    start() {
        const game = this;
        setInterval(function () {

            //Перемещение
            game.run();

            //Перемещение
            game.animate();

            //Отрисовка
            game.draw(game.camera);

        }, constants.INTERVAL);
    }

    //Обработчик событий
    eventHandler(it, event, type, data){
        data.message && log(data.message + ' (Событие '+event+'.'+type+')');
        // data.message || log(' (Событие '+event+'.'+type+')');

        if(event=="server") {
            if (type == "hello") {
                //TODO: переделать в нормальную авторизацию
                it.emit('login', it.login);
            }
        }
        if(event=="room"){
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
                        info.coins_count == undefined
                    ) throw "Ошибка получения с сервера";

                    let character = it.characters[info.character_id] || it.characters["man"]

                    const player = new Unit(info.room_id, info.x, info.y, character, 'Игрок['+info.ID+']', info.state, info.coins_count);
                    it.units[info.ID] = player;
                }
                catch (e){
                    log("Ошибка получения игрока. "+e);
                    log(data);
                }
            }
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
                        info.coins_count == undefined
                    ) throw "Ошибка получения с сервера";

                    let character = it.characters[info.character_id] || it.characters["man"]

                    if(info.ID in it.units) {
                        it.units[info.ID].set(info.room_id, info.x, info.y, character, info.state, info.coins_count);
                    }
                }
                catch (e){
                    log("Ошибка обновления игрока. "+e);
                    log(data);
                }
            }
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

                    let character = it.characters[info.character_id] || it.characters["gold_coin"]

                    const loot = new Loot(info.room_id, info.x, info.y, character, info.ID);
                    it.loots[info.ID] = loot;
                }
                catch (e){
                    log("Ошибка получения лута. "+e);
                    log(data);
                }
            }

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

        if(event=="player"){
            if(type=="hero-create") {
                try {
                    if(it.hero) throw "Герой уже создан";
                    if(!data.info) throw "Ошибка получения с сервера";

                    var info = data.info;

                    if (
                        info.x == undefined ||
                        info.y == undefined ||
                        info.character_id == undefined ||
                        info.room_id == undefined ||
                        info.state == undefined ||
                        info.coins_count == undefined
                    ) throw "Ошибка получения с сервера";

                    it.playerInit(info.room_id, info.x, info.y, info.character_id, info.state, info.coins_count);
                    it.showScore(info.coins_count);
                }
                catch (e){
                    log("Ошибка создания Героя. "+e);
                    log(data);
                }
            }
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
                        info.coins_count == undefined
                    ) throw "Ошибка получения с сервера";

                    it.playerSet(info.room_id, info.x, info.y, info.character_id, info.state, info.coins_count);
                    it.showScore(info.coins_count);
                }
                catch (e){
                    log("Ошибка обновления Героя. "+e);
                    log(data);
                }
            }
        }
    }

    showScore(score){
        this.scoreElement && (this.scoreElement.innerText = score);
    }
}