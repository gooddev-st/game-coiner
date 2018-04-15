/**
 * Модуль Npc (NotPlayerCharacter) - базовый Npc
 * @type {Npc}
 */
module.exports = Npc;


const events = require("../events.js");
const rooms = require("../rooms.js");
const players = require("../players.js");
const log = require("../log");

const sound_event = require('../sound_event.js');//звуковые события

const Claws = require("../weapons").Claws;

/**
 * Константы персонажей
 */
const characters = require('../characters.js');

const
    NPC_WIDTH = 44.0,
    NPC_HEIGHT = 44.0,
    NPC_SPEED = 100,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;


/**
 * Возвращает случайного персонажа
 * @param possible_characters
 * @returns {*}
 */
function getRandomCharacter(possible_characters) {

    const randomArray = possible_characters || [
        characters.CHARACTER_DOC,
        characters.CHARACTER_MAN,
        characters.CHARACTER_GOB,
        characters.CHARACTER_SKELETON,
        characters.CHARACTER_KROKO,
        characters.CHARACTER_KOIL,
        characters.CHARACTER_DEAD,
        characters.CHARACTER_GUNNER,
        characters.CHARACTER_JUK,
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
 * @constructor
 */
function Npc(ID, x, y, room_id, character_id) {
    this.x = x;
    this.y = y;

    if(character_id){

        if(Array.isArray(character_id)){
            this.character_id = getRandomCharacter(character_id);
        }
        else{
            this.character_id = character_id;
        }
    }
    else{
        this.character_id = getRandomCharacter();
    }

    this.room_id = room_id;
    this.state = 'run';

    this.width = NPC_WIDTH;
    this.height = NPC_HEIGHT;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.attackSpeed =  NPC_SPEED;
    this.normalSpeed =  NPC_SPEED;
    this.speed =  NPC_SPEED;

    this.maxHealth = 100;
    this.health = 100;

    this.ID = ID;

    //Для определения "свой-чужой"
    this.fraction = 'monsters';

    //Есть ли изменения для отсылки
    this.changed = true;

    this.target = null; //Позиция куда идет

    this.content = []; //Съеденное

    this.effects = {}; //Эффекты



    this.weapons = {}; // Оружие
    this.currentWeapon = null;


    this.armor = 0;
    this.protect = 0;
    this.damage = 0;

    this.freeze = false;

    this.die = false;

    this.weapons['weapon1'] = new Claws(35);
    this.currentWeapon = 'weapon1';
}

/**
 * Установка скоростей
 * @param normalSpeed
 * @param attackSpeed
 */
Npc.prototype.initSpeed = function (normalSpeed, attackSpeed) {
    this.normalSpeed = normalSpeed || NPC_SPEED;
    this.attackSpeed = attackSpeed || this.normalSpeed;
    this.speed = this.normalSpeed;
};


Npc.prototype.bah = function (target) {
    if(!this.currentWeapon || !this.weapons[this.currentWeapon]) return;

    const weapon = this.weapons[this.currentWeapon];

    weapon.bah(target);
};


/**
 * Поглощение лута
 * @param loot
 */
Npc.prototype.eating = function (loot) {
    if(this.content<12) {
        this.content++;
        // this.content.push(loot.character_id);
    }

    this.hit(-10);

    sound_event.add('npc_eat_coin', this.room_id, this.x, this.y);

    this.changed = true;
};


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
    events.room(teleport.target.room_id, 'entity', 'teleport-target', {
        room_id: teleport.target.room_id,
        x: x,
        y: y,
    });

    this.changed = true;
}



/**
 * Удар по мобу
 * @param hitPoints
 */
Npc.prototype.hit = function (hitPoints) {
    this.damage += hitPoints;
};


/**
 * Движение игрока по контроллеру в комнате
 * @param room
 * @param step
 */
Npc.prototype.run = function (room, step) {

    //Сохраним старое, чтоб понимать - изменился ли
    let oldX = this.x, oldY = this.y, oldState = this.state, oldHealth = this.health;

    this.runEffects();

    let target = this.calculateTarget(room);
    if(target) this.target = target;

    if(this.freeze){

        this.target = false;

        this.freeze = false;
    }

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


    if(this.damage > 0) {
        this.damage -= this.armor;
        this.damage -= this.protect;
        if(this.damage < 0) this.damage = 0;
    }
    this.protect = 0;

    //Применим урон (если с минусом - лечение)
    this.health -= this.damage;
    this.damage = 0;

    if(this.health > this.maxHealth) this.health = this.maxHealth;

    //"Умрем" если нет здоровья
    //TODO: Умирать анимировано
    if (this.health <= 0) {
        this.health = 0;
        this.kill();
    }

    //Выставим состояние
    if(this.target){
        this.state = 'run';
    }
    else{
        this.state = 'default';
    }


    if(this.x !== oldX || this.y !== oldY || this.state !== oldState || this.health !== oldHealth){
        this.changed = true;
    }

};


Npc.prototype.runEffects = function () {

    if (this.effects) {

        for(let effectID in this.effects){
            this.effects[effectID].run(this);
        }

    }
};


Npc.prototype.calculateTarget = function(room) {
    let target;

    /*// Эффекты движения
    target = this.targetEffects();
    if(target) return target;*/

    // Идем к ближнему подходящему игроку (в поле зрения)
    target = this.targetPlayer();
    if(target) return target;

    // Идем к ближнему подходящему мобу (в поле зрения)
    target = this.targetNpc();
    if(target) return target;

    // Иначе пойдем за ближайшей монетой
    target = this.targetCoin(room);
    if(target) return target;

    // Иначе - шляемся
    if(!this.target) return this.targetRandom(room);

    return null;


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

    // Найдем индекс минимального значения
    let min_index = distances.reduce(
        (prev, value, i, array) => {
            return value.distance < array[prev].distance ? i : prev;
        }, 0
    );

    // Если в поле зрения - идем к луту
    if(distances[min_index].distance <= this.viewDistance){
        return distances[min_index].pos;
    }

    return null;

};

/**
 * Условие пригодности плеера как цели
 * @param target
 * @returns {boolean}
 */
Npc.prototype.targetPlayerCondition = function(target, self) {
    //По умолчанию - годятся все
    return true;
};

/**
 * Если поблизости подходящий плеер - идем к нему
 * @returns {*}
 */
Npc.prototype.targetPlayer = function() {

    let nearest = players.nearest(this.room_id, this.x, this.y, this.targetPlayerCondition, this);

    if(!nearest) return null;

    // Если в поле зрения - идем к игроку
    if(nearest.distance <= this.viewDistance){

        //Включаем атакующую скорость
        this.speed = this.attackSpeed;

        //Подошли на расстояние атаки - атакуем
        if(nearest.distance <= this.attackDistance) {

            let player = players.get(nearest.id);

            this.freeze = true;

            this.bah(player);

            return null;//{x: this.x, y: this.y};
        }
        else{
            return nearest.pos;
        }
    }

    //Включаем нормальную скорость
    this.speed = this.normalSpeed;

    return null;

};


/**
 * Условие пригодности моба как цели
 * @param target
 * @param self - сам моб
 * @returns {boolean}
 */
Npc.prototype.targetNpcCondition = function(target, self) {
    //По умолчанию - годятся все которые не он же и из другой фракции
    return (target.ID!==self.ID && target.fraction!==self.fraction);
};

/**
 * Если поблизости подходящий моб - идем к нему
 * @returns {*}
 */
Npc.prototype.targetNpc = function() {

    let room = rooms.get(this.room_id),
        npcs = room.npcs;

    let nearest = npcs.nearest(this.room_id, this.x, this.y, this.targetNpcCondition, this);

    if(!nearest) return null;

    // Если в поле зрения - идем к
    if(nearest.distance <= this.viewDistance){

        //Включаем атакующую скорость
        this.speed = this.attackSpeed;

        //Подошли на расстояние атаки - атакуем
        if(nearest.distance <= this.attackDistance) {

            let npc = npcs.get(nearest.id);

            this.freeze = true;

            this.bah(npc);

            return null;
        }
        else{
            return nearest.pos;
        }
    }

    //Включаем нормальную скорость
    this.speed = this.normalSpeed;

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

        //Толчок
        if("push" in this.effects){
            return this.effects.push.run(this);
        }
        //Заморозка
        if("freeze" in this.effects){
            return this.effects.freeze.run(this);
        }

        //Холера
        if("holera" in this.effects){
            return this.effects.holera.run(this);
        }

        //Щит
        if("shield" in this.effects){
            return this.effects.shield.run(this);
        }

    }

    return null;
};

/**
 * Возвращает информацию о мобе
 * @returns {{ID: *, x: *, y: *, character_id: *, state: *, room_id: *, width: *, height: *}}
 */
Npc.prototype.info = function(){
    const effects = [];

    for(let effectID in this.effects){
        effects.push(effectID);
    }

    return {
        ID: this.ID,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        room_id: this.room_id,

        width: this.width,
        height: this.height,

        content: this.content,

        maxHealth: this.maxHealth,
        health: this.health,

        effects: effects,
    }
};

Npc.prototype.isDie = function() {
    return this.die;
};

Npc.prototype.kill = function() {
    this.die = true;
};

Npc.prototype.onDie = function() {
    let room = rooms.get(this.room_id);

    //Выроним кристалл
    //со всем, что накопил
    let content = this.content;
    this.content = 0;

    //если что-то накопил - выроним
    if (content > 0) {

        room.addCoin(this.x, this.y+3, content);
    }

    //Поставим могилку
    let grave_id = Math.floor(Math.random()*characters.SPRITESET_GRAVES.size);
    room.addCartoon(this.x+20, this.y, characters.SPRITESET_GRAVES.ID, grave_id, 60.0);
};
