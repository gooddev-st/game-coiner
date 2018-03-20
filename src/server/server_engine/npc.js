/**
 * Модуль Npc (NotPlayerCharacter)
 * @type {Npc}
 */
module.exports = Npc;


const rooms = require("./rooms.js");

const sound_event = require('./sound_event.js');//звуковые события


/**
 * Константы персонажей
 */
const characters = require('./characters.js');

const
    NPC_WIDTH = 44.0,
    NPC_HEIGHT = 44.0,
    NPC_SPEED = 100;


/**
 * Возвращает случайного персонажа
 * @returns {*} character_id
 */
function getRandomCharacter() {

    const randomArray = [
        characters.CHARACTER_DOC,
        characters.CHARACTER_MAN,
        characters.CHARACTER_GOB,
        characters.CHARACTER_GIRL,
        characters.CHARACTER_BLOND,
        characters.CHARACTER_MAG,
    ];

    let key = Math.floor(Math.random() * randomArray.length);

    return randomArray[key];
}


function randomTarget(room) {
    return {
        x: room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right),
        y: room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom)
    };
}


/**
 * Npc
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @param character_id
 * @param speed
 * @constructor
 */
function Npc(ID, x, y, room_id, character_id, speed) {
    this.x = x;
    this.y = y;



    this.character_id = character_id || getRandomCharacter();
    this.room_id = room_id;
    this.state = 'run';

    this.width = NPC_WIDTH;
    this.height = NPC_HEIGHT;
    this.speed = speed==undefined ? NPC_SPEED : speed;

    this.ID = ID;

    //Есть ли изменения для отсылки
    this.changed = true;

    this.target = null; //Позиция куда идет

    this.content = null; //Что съел последнее
}


/**
 * Поглощение лута
 * @param loot
 */
Npc.prototype.eating = function (loot) {
    this.content = loot;

    sound_event.add('npc_eat_coin', this.room_id, this.x, this.y);

    this.changed = true;
}


/**
 * Телепортация
 * @param loot
 */
Npc.prototype.teleport = function (teleport) {
    this.room_id = teleport.target.room_id;
    this.x = teleport.target.x;
    this.y = teleport.target.y;

    this.target = null;

    //sound
    sound_event.add("teleport", teleport.room_id, teleport.x, teleport.y);
    sound_event.add("teleport", teleport.target.room_id, teleport.target.x, teleport.target.y);

    this.changed = true;
}


/**
 * Движение игрока по контроллеру в комнате
 * @param room
 * @param step
 */
Npc.prototype.run = function (room, step) {

    //Сохраним старую позицию, чтоб понимать - движется ли
    let x = this.x, y = this.y;

    // если есть цель
    if (this.target) {

        //Если закончили движение - сбросим цель
        if(
            this.x === this.target.x &&
            this.y === this.target.y
        ){
            this.target = null;
        }

        //иначе движемся
        else{
            let target = this.target,
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
    // Если нет цели - зададим случайную
    else{
        this.target = randomTarget(room);
    }


    // Если уперлись в границу - остановимся и поправим цель
    if (this.x < 0 + room.dead_zone_left) {
        this.x = 0 + room.dead_zone_left;
        this.target && (this.target.x = this.x);
    }
    if (this.y < 0 + room.dead_zone_top) {
        this.y = 0 + room.dead_zone_top;
        this.target && (this.target.y = this.y);
    }
    if (this.x + this.width > (room.width - room.dead_zone_right)) {
        this.x = room.width - room.dead_zone_right - this.width;
        this.target && (this.target.x = this.x);
    }
    if (this.y + this.height > (room.height - room.dead_zone_bottom)) {
        this.y = room.height - room.dead_zone_bottom - this.height;
        this.target && (this.target.y = this.y);
    }

    if(this.x != x || this.y != y) this.changed = true;
};


/**
 * Возвращает информацию о мобе
 * @returns {{ID: *, x: *, y: *, character_id: *, state: *, room_id: *, width: *, height: *}}
 */
Npc.prototype.info = function(){
    return {
        ID: this.ID,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        room_id: this.room_id,

        width: this.width,
        height: this.height
    }
};
