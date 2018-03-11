/**
 * Модуль игрока
 * @type {Player}
 */
module.exports = Player;

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
 * Игрок
 * @param playerID
 * @param socket
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Player(playerID, socket, x, y, room_id) {
    this.x = x;
    this.y = y;
    this.character_id = Math.floor(Math.random()*2) ==1 ? characters.CHARACTER_DOC : characters.CHARACTER_MAN;
    this.room_id = room_id;
    this.state = 'default';

    this.socket = socket;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = PLAYER_SPEED;

    this.ID = playerID;
    this.levelupCounter = 10;
    this.level = 1;
    this.coins_count = 0;

    this.online = true;

    //Есть ли изменения для отсылки
    this.changed = true;

    this.controller = {
        up: false,
        left: false,
        right: false,
        down: false,
        target: null, //Позиция клика мышкой куда идти
    };
}

/**
 * Сброс плеера при подключении другого пользователя
 * @param socket
 */
Player.prototype.reset = function (socket) {
    this.socket = socket;
    this.controller.up = false;
    this.controller.left = false;
    this.controller.right = false;
    this.controller.down = false;
    this.controller.target = null;

    this.online = true;
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

    }
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
    if (this.x - this.width / 2 < 0 + room.dead_zone_left) {
        this.x = this.width / 2 + room.dead_zone_left;
        this.controller.target && (this.controller.target.x = this.x);
    }
    if (this.y - this.height / 2 < 0 + room.dead_zone_top) {
        this.y = this.height / 2 + room.dead_zone_top;
        this.controller.target && (this.controller.target.y = this.y);
    }
    if (this.x + this.width / 2 > (room.width - room.dead_zone_right)) {
        this.x = room.width - room.dead_zone_right - this.width / 2;
        this.controller.target && (this.controller.target.x = this.x);
    }
    if (this.y + this.height / 2 > (room.height - room.dead_zone_bottom)) {
        this.y = room.height - room.dead_zone_bottom - this.height / 2;
        this.controller.target && (this.controller.target.y = this.y);
    }
};

/**
 * Возвращает общедоступную информацию об игроке
 * @returns {{ID: *, x: *, y: *, character_id: *, state: *, coins_count: *, level: *, room_id: *, online: *}}
 */
Player.prototype.commonInfo = function(){
    return {
        ID: this.ID,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        coins_count: this.coins_count,
        level: this.level,
        room_id: this.room_id,

        online: this.online,
    }
};

/**
 * Возвращает информацию об игроке для самого игрока
 * @returns {{x: *, y: *, character_id: *, state: *, coins_count: *, level: *, levelupCounter: *, room_id: *}}
 */
Player.prototype.allInfo = function(){
    return {
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        coins_count: this.coins_count,
        level: this.level,
        levelupCounter: this.levelupCounter,

        room_id: this.room_id
    }
};