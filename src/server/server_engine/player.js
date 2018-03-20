/**
 * Модуль игрока
 * @type {Player}
 */
module.exports = Player;


const events = require("./events.js");
const players = require("./players.js");
const rooms = require("./rooms.js");
const npcs = require("./npcs.js");

const db = require('./db.js');

const sound_event = require('./sound_event.js');//звуковые события


/**
 * Константы персонажей
 */
const characters = require('./characters.js');

const
    PLAYER_WIDTH = 44.0,
    PLAYER_HEIGHT = 44.0,
    PLAYER_SPEED = 200,

    SIN_45 = Math.sin(45.0);


/**
 * Возвращает случайного персонажа
 * @returns {*} character_id
 */
function getRandomCharacter() {

    const randomArray = [
        characters.CHARACTER_DOC,
        characters.CHARACTER_MAN,
        // characters.CHARACTER_GOB,
        characters.CHARACTER_GIRL,
        characters.CHARACTER_BLOND,
        characters.CHARACTER_MAG,
    ];

    let key = Math.floor(Math.random() * randomArray.length);

    return randomArray[key];
}


/**
 * Игрок
 * @param playerID
 * @param socket
 * @param x
 * @param y
 * @param room_id
 * @param coins_count
 * @param level
 * @param levelupCounter
 * @param character_id
 * @constructor
 */
function Player(playerID, socket, x, y, room_id, coins_count, level, levelupCounter, character_id, speed) {
    this.x = x;
    this.y = y;



    this.character_id = character_id || getRandomCharacter();
    this.room_id = room_id;
    this.state = 'default';

    this.socket = socket;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = speed==undefined ? PLAYER_SPEED : speed;

    this.ID = playerID;

    this.levelupCounter = 10;
    if(levelupCounter!=undefined) this.levelupCounter = levelupCounter;

    this.level = level || 1;
    this.coins_count = coins_count==undefined ? 0 : coins_count;

    //Есть ли изменения для отсылки
    this.changed = true;

    this.controller = {
        up: false,
        left: false,
        right: false,
        down: false,
        target: null, //Позиция клика мышкой куда идти
    };

    this.init();
}



Player.prototype.init = function () {

    //Отправим героя
    events.one(this.socket, "hero", "hero-create", {info: this.allInfo(), message: "Выдан герой "+this.ID});

    //Отправим комнату, в которой герой
    let room = rooms.get(this.room_id);

    events.one(this.socket, "room", "change", {room: room.info(), message: "Выдана Комната"});


    //Отправим игроков. Кроме самого
    players.each((playerID, player)=>{
        if(playerID != this.ID) {
            events.one(this.socket, "room", "player-create", {info: player.commonInfo()});
        }
    });
    events.one(this.socket, "hero", "info", {message: "Выданы игроки"});

    //Отправим мобов
    npcs.each((ID, npc)=>{
        events.one(this.socket, "room", "npc-create", {info: npc.info()});
    });
    events.one(this.socket, "hero", "info", {message: "Выданы мобы"});


    //Заявим, что пришел игрок
    events.common(this.socket, "room", "player-create", {info: this.commonInfo(), message: "Пришел игрок[" + this.ID + "]"});


    //Навесим обработчики
    this.socket.on('keydown', (key_name) => {
        switch(key_name){

            case "left":
                this.controller.left = true;
                break;
            case "up":
                this.controller.up = true;
                break;
            case "right":
                this.controller.right = true;
                break;
            case "down":
                this.controller.down = true;
                break;
        }
        // log('Нажата клавиша '+key_name);
    });

    this.socket.on('keyup', (key_name) => {
        switch(key_name){
            case "left":
                this.controller.left = false;
                break;
            case "up":
                this.controller.up = false;
                break;
            case "right":
                this.controller.right = false;
                break;
            case "down":
                this.controller.down = false;
                break;
        }
        // log('Клавиша '+key_name+' отжата');
    });

    this.socket.on('target', (target) => {
        if(
            !target ||
            (target.x == this.x && target.y == this.y)
        ){
            this.controller.target = null;
        }
        else{
            this.controller.target = target;
        }
    });

    this.socket.on('signout', (data) => {
        this.socket.disconnect(true);
        db.save(this.allInfo());
    });
};



/**
 * Сброс плеера при подключении другого пользователя
 * @param socket
 */
Player.prototype.reset = function (socket) {
    this.socket = socket;

    //Сбросим кнопки и цель движения
    this.controller.up = false;
    this.controller.left = false;
    this.controller.right = false;
    this.controller.down = false;
    this.controller.target = null;
};


/**
 * Поглощение лута
 * @param loot
 */
Player.prototype.eating = function (loot) {
    this.coins_count++;

    this.levelupCounter--;

    //Левелап (LevelUp)
    if(this.levelupCounter==0){
        this.levelupCounter = 10;
        this.level++;

        //Увеличим скорость
        this.speed += 50;
        //    только не слишком
        if(this.speed>400) this.speed = 400;

        sound_event.add('level_up', this.room_id, this.x, this.y);
    }
    else {

        //sound
        let eat_sounds = {
            "coin_gold": "eat_coin_gold",
            "coin_silver": "eat_coin_silver",
            "coin_copper": "eat_coin_copper",
        };

        let eat_sound = eat_sounds[loot.character_id] || eat_sounds["coin_copper"]

        sound_event.add(eat_sound, this.room_id, this.x, this.y);
    }

    db.save(this.allInfo());
    this.changed = true;
}


/**
 * Телепортация
 * @param loot
 */
Player.prototype.teleport = function (teleport) {
    this.room_id = teleport.target.room_id;
    this.x = teleport.target.x;
    this.y = teleport.target.y;

    this.controller.target = null;

    //Если перемещаемся в другую комнату - закажем смену
    if(teleport.target.room_id != teleport.room_id){
        let room = rooms.get(this.room_id);

        events.one(this.socket, "room", "change", {room: room.info(), message: "Выдана Комната"});

    }

    //sound
    sound_event.add("teleport", teleport.room_id, teleport.x, teleport.y);
    sound_event.add("teleport", teleport.target.room_id, teleport.target.x, teleport.target.y);

    db.save(this.allInfo());
    this.changed = true;
}


/**
 * Движение игрока по контроллеру в комнате
 * @param room
 * @param step
 */
Player.prototype.run = function (room, step) {


    if (
        this.controller.left ||
        this.controller.up ||
        this.controller.right ||
        this.controller.down
    ) {
        this.controller.target = null;
    }
    if (
        this.controller.left ||
        this.controller.up ||
        this.controller.right ||
        this.controller.down ||
        this.controller.target
    ) {
        this.state = 'run';

        this.changed = true;
    }
    else {
        if (this.state != 'default') {
            this.state = 'default';

            this.changed = true;
        }
    }

    // если есть цель
    if (this.controller.target) {

        //Если закончили движение - сбросим цель
        if(
            this.x == this.controller.target.x &&
            this.y == this.controller.target.y
        ){
            this.controller.target = null;
        }

        //иначе движемся
        else{
            let target = this.controller.target,
                inctement = this.speed * step,
                x = target.x - this.x,
                y = target.y - this.y,
                l = Math.sqrt(x * x + y * y),
                x_increment = inctement * x / l,
                y_increment = inctement * y / l;

            if(Math.abs(x_increment) > Math.abs(x)) x_increment = x;
            if(Math.abs(y_increment) > Math.abs(y)) y_increment = y;

            this.x += x_increment;
            this.y += y_increment;
        }

    }

    let
        dx = 0,
        dy = 0;

    if (this.controller.left) {
        dx = -this.speed * step;
    }
    if (this.controller.up) {
        dy = -this.speed * step;
    }
    if (this.controller.right) {
        dx = this.speed * step;
    }
    if (this.controller.down) {
        dy = this.speed * step;
    }

    if(Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        //Посчитаем перемещение
        let tx = (Math.abs(dy) > 0 ? SIN_45 : 1.0) * dx;
        let ty = (Math.abs(dx) > 0 ? SIN_45 : 1.0) * dy;
        this.x += tx;
        this.y += ty;
    }


    // Если уперлись в границу - остановимся и поправим цель
    if (this.x < 0 + room.dead_zone_left) {
        this.x = 0 + room.dead_zone_left;
        this.controller.target && (this.controller.target.x = this.x);
    }
    if (this.y < 0 + room.dead_zone_top) {
        this.y = 0 + room.dead_zone_top;
        this.controller.target && (this.controller.target.y = this.y);
    }
    if (this.x + this.width > (room.width - room.dead_zone_right)) {
        this.x = room.width - room.dead_zone_right - this.width;
        this.controller.target && (this.controller.target.x = this.x);
    }
    if (this.y + this.height > (room.height - room.dead_zone_bottom)) {
        this.y = room.height - room.dead_zone_bottom - this.height;
        this.controller.target && (this.controller.target.y = this.y);
    }
};


/**
 * Возвращает общедоступную информацию об игроке
 * @returns {{ID: *, x: *, y: *, character_id: *, state: *, level: *, room_id: *}}
 */
Player.prototype.commonInfo = function(){
    return {
        ID: this.ID,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        level: this.level,
        room_id: this.room_id,

        width: this.width,
        height: this.height
    }
};


/**
 * Возвращает информацию об игроке для самого игрока
 * @returns {{x: *, y: *, character_id: *, state: *, coins_count: *, level: *, levelupCounter: *, room_id: *}}
 */
Player.prototype.allInfo = function(){
    return {
        ID: this.ID,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        coins_count: this.coins_count,
        level: this.level,
        levelupCounter: this.levelupCounter,

        speed: this.speed,

        room_id: this.room_id,

        width: this.width,
        height: this.height
    }
};

Player.prototype.destroy = function(){

    events.common(this.socket, "room", "player-leave", {room_id: this.room_id, ID: this.ID, message: "Игрок["+this.ID+"] покинул этот мир"});

    this.socket.removeAllListeners();

    db.save(this.allInfo());
};
