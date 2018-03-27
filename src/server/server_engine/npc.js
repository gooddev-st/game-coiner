/**
 * Модуль Npc (NotPlayerCharacter)
 * @type {Npc}
 */
module.exports = Npc;


const events = require("./events.js");
const rooms = require("./rooms.js");
const npcs = require("./npcs.js");
const players = require("./players.js");

const sound_event = require('./sound_event.js');//звуковые события


/**
 * Константы персонажей
 */
const characters = require('./characters.js');

const
    NPC_WIDTH = 44.0,
    NPC_HEIGHT = 44.0,
    NPC_SPEED = 100,
    VIEW_DISTANCE = 250;
    ATTACK_DISTANCE = 50;


/**
 * Возвращает случайного персонажа
 * @returns {*} character_id
 */
function getRandomCharacter() {

    const randomArray = [
        characters.CHARACTER_DOC,
        characters.CHARACTER_MAN,
        characters.CHARACTER_GOB,
        characters.CHARACTER_SKELETON,
    ];

    let key = Math.floor(Math.random() * randomArray.length);

    return randomArray[key];
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

    this.content = []; //Съеденное

    this.effects = {}; //Эффекты
}


/**
 * Поглощение лута
 * @param loot
 */
Npc.prototype.eating = function (loot) {
    if(this.content.length<12) {
        this.content.push(loot.character_id);
    }

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

    let
        x = this.x + this.width/2,
        y = this.y;
    events.common('entity', 'teleport-target', {
        room_id: teleport.target.room_id,
        x: x,
        y: y,
    });

    this.changed = true;
}


/**
 * Движение игрока по контроллеру в комнате
 * @param room
 * @param step
 */
Npc.prototype.run = function (room, step) {

    //Сохраним старую позицию, чтоб понимать - движется ли
    let oldX = this.x, oldY = this.y, oldState = this.state;

    let target = this.calculateTarget(room);
    if(target) this.target = target;

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

    //Выставим состояние
    if(this.target){
        this.state = 'run';
    }
    else{
        this.state = 'default';
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

    if(this.x !== oldX || this.y !== oldY || this.state !== oldState){
        this.changed = true;
    }
};



Npc.prototype.calculateTarget = function(room) {
    let target;

    // Эффекты движения
    target = this.targetEffects();
    if(target) return target;

    // Идем к ближнему игроку (в поле зрения)
    target = this.targetPlayer(room);
    if(target) return target;

    // Иначе пойдем за ближайшей монетой
    target = this.targetCoin(room);
    if(target) return target;

    // Иначе - шляемся
    if(!this.target) return this.targetRandom(room);

    return null;


};


//Разбегание мобов (Не нужно)
Npc.prototype.targetSplit = function(room) {
    const MIN_DISTANCE = 44;


    if(!room) return false;

    let distances = [];

    // Соберем в массив всех мобов (без этого)
    npcs.each((i, npc)=>{

        if(npc.ID!==this.ID) {

            let
                x = npc.x,
                y = npc.y,
                xdiff = Math.abs(x - this.x),
                ydiff = Math.abs(y - this.y);

            distances.push({
                // Расстояние до моба
                distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
                // Его расположение
                pos: {x: x, y: y}
            });
        }
    });

    // Найдем индекс минимального значения
    let min_index = distances.reduce(
        (prev, value, i, array) => {
            return value.distance < array[prev].distance ? i : prev;
        }, 0
    );

    if(distances[min_index].distance < MIN_DISTANCE) {
        let
            xdiff = distances[min_index].pos.x - this.x,
            ydiff = distances[min_index].pos.y - this.y;

        // Если очень близко пусть разбегаются рандомно
        if(Math.abs(xdiff) < 1 && Math.abs(ydiff) < 1){
            xdiff = -MIN_DISTANCE + Math.random()*(MIN_DISTANCE+MIN_DISTANCE);
        }
        let
            x = this.x - xdiff * MIN_DISTANCE,
            y = this.y - ydiff * MIN_DISTANCE;
        return {x: x, y: y};
    }

    return false;
};

Npc.prototype.targetCoin = function(room) {

    if(!room || !room.loot.length) return false;

    let distances = [];

    // Соберем в массив все монеты
    for(const i in room.loot){
        let
            x = room.loot[i].x,
            y = room.loot[i].y,
            xdiff = Math.abs(x - this.x),
            ydiff = Math.abs(y - this.y);

        distances.push({
            // Расстояние до монеты
            distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
            // Её расположение
            pos: {x: x, y: y}
        });
    }

    // Добавим туда же все телепорты
    /*for(const i in room.teleports){
        let
            x = room.teleports[i].x,
            y = room.teleports[i].y,
            xdiff = Math.abs(x - this.x),
            ydiff = Math.abs(y - this.y);

        distances.push({
            // Расстояние до монеты
            distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
            // Её расположение
            pos: {x: x, y: y}
        });
    }*/

    // Найдем индекс минимального значения
    let min_index = distances.reduce(
        (prev, value, i, array) => {
            return value.distance < array[prev].distance ? i : prev;
        }, 0
    );

    // Если в поле зрения - идем к луту
    if(distances[min_index].distance <= VIEW_DISTANCE){
        return distances[min_index].pos;
    }

    return null;

};

Npc.prototype.targetPlayer = function(room) {

    if(!room || !players.count()) return false;

    let distances = [];

    // Соберем в массив всех игроков в этой комнате
    players.each((ID, player)=>{
        if(player.room_id===this.room_id) {
            let
                x = player.x,
                y = player.y,
                xdiff = Math.abs(x - this.x),
                ydiff = Math.abs(y - this.y);

            distances.push({
                // Расстояние до игрока
                distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
                // Его расположение
                pos: {x: x, y: y}
            });
        }
    });

    if(distances.length>0){

        // Найдем индекс минимального значения
        let min_index = distances.reduce(
            (prev, value, i, array) => {
                return value.distance < array[prev].distance ? i : prev;
            }, 0
        );

        // Если в поле зрения - идем к игроку
        if(distances[min_index].distance <= VIEW_DISTANCE){

            //Подошли на расстояние атаки - стоп
            if(distances[min_index].distance >= ATTACK_DISTANCE) {
                return distances[min_index].pos;
            }
            else{
                return {x: this.x, y: this.y};
            }
        }
    }

    return null;

};


Npc.prototype.targetRandom = function (room) {
    return {
        x: room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right-this.width),
        y: room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom-this.height)
    };
};





Npc.prototype.targetEffects = function(){

    if (this.effects) {

        //Толчок из определенной точки с заданной скоростью и временем
        if("push" in this.effects){

            if(!this.effects.push.oldSpeed){
                //В начале сохраним скорость цели
                this.effects.push.oldSpeed = this.speed;
                //И её начальную позицию
                this.effects.push.oldX = this.x;
                this.effects.push.oldY = this.y;

                this.effects.push.faza = 0.0;
                this.speed = this.effects.push.speed;
            }

            if (this.effects.push.faza < this.effects.push.duration) {

                this.effects.push.faza += STEP;

                let from = this.effects.push.from;

                //Если источник под целью сдвинем цель в случайном направлении
                if(from.x === this.x && from.y === this.y){
                    this.x += Math.random()*10 - 5;
                    this.y += Math.random()*10 - 5;
                }

                //Вектор перемещения
                let increment = this.speed * STEP,
                    x = this.x - from.x,
                    y = this.y - from.y,
                    l = Math.sqrt(x * x + y * y),
                    x_increment = increment * x / l,
                    y_increment = increment * y / l;

                return {
                    x: this.x + x_increment,
                    y: this.y + y_increment
                };
            }

            //По окончании восстановим скорость
            this.speed = this.effects.push.oldSpeed;

            //И выроним кристалл в начальной позиции
            //со всем, что накопил
            let content = 0;
            this.content.forEach(character_id=> {
                //TODO: если съеденное не монета - ронять предмет
                let coin = this.content.shift();
                content++;
            });

            //если что-то накопил - выроним
            let crystal_character_id = characters.CHARACTER_CRYSTAL_BLUE;
            if(content>0) {
                if(content < 2){
                    crystal_character_id = characters.CHARACTER_CRYSTAL_BLUE;
                }
                else if(content >= 2 && content < 4){
                    crystal_character_id = characters.CHARACTER_CRYSTAL_GREEN;
                }
                else if(content >= 4 && content < 6){
                    crystal_character_id = characters.CHARACTER_CRYSTAL_GREY;
                }
                else if(content >= 6 && content < 8){
                    crystal_character_id = characters.CHARACTER_CRYSTAL_RED;
                }
                else if(content >= 8 && content < 10){
                    crystal_character_id = characters.CHARACTER_CRYSTAL_MAGENTA;
                }
                else if(content >= 10 && content < 12){
                    crystal_character_id = characters.CHARACTER_CRYSTAL_YELLOW;
                }
                let room = rooms.get(this.room_id);

                room.addCoin(this.effects.push.oldX, this.effects.push.oldY, crystal_character_id, content);
            }

            delete this.effects.push;
        }

    }

    return null;
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
