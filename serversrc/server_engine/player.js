/**
 *
 * Модуль игрока
 * @type {Player}
 */
module.exports = Player;

require('./constants.js')();

const log = require('./log');

const events = require("./events.js");
const players = require("./players.js");
const rooms = require("./rooms.js");
const npcs = require("./npcs.js");
const effects = require("./effects.js");

const db = require('./db.js');

const sound_event = require('./sound_event.js');//звуковые события


/**
 * Константы персонажей
 */
const characters = require('./characters.js');

const
    PLAYER_WIDTH = 44.0,
    PLAYER_HEIGHT = 44.0,

    SIN_45 = Math.sin(45.0);

const
    // Таблица уровней игроков
    TO_LEVELS = [0,
        10, 40, 100, 200, 350, 600, 900, 1400, 2200,
        3600, 4900, 6000, 8300, 11000, 15200, 18900, 25000, 40000, 100000,
        1000000, 2000000, 5000000, 10000000
    ];


/**
 * Возвращает случайного персонажа
 * @returns {*} character_id
 */
function getRandomCharacter() {

    const randomArray = [
        characters.CHARACTER_GIRL,
        characters.CHARACTER_BLOND,
        characters.CHARACTER_MAG,
    ];

    let key = Math.floor(Math.random() * randomArray.length);

    return randomArray[key];
}


/**
 * Игрок
 * @param id
 * @param name
 * @param socket
 * @param data
 * @constructor
 */
function Player(id, name, socket, data) {

    this.db_id = id
    this.ID = 'avatar'+id;
    this.name = name;
    this.socket = socket;

    this.room_id = data.room_id;
    this.x = data.x;
    this.y = data.y;

    this.target = null;// Позиция куда идти

    this.character_id = data.character_id || getRandomCharacter();
    this.state = 'default';

    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = data.speed;


    this.score = data.score ? data.score : 0;
    this.level = data.level ? data.level : 1;

    this.levelupValue = TO_LEVELS[this.level] - TO_LEVELS[this.level - 1];
    this.levelupCounter = this.score - TO_LEVELS[this.level - 1];

    this.coins_count = data.coins_count ? data.coins_count : 0;
    this.health = data.health;


    this.skills = {};
    this.currentSkill = null;


    this.makeEffects = {};
    this.effects = {};

    this.damage = 0;

    //Есть ли изменения для отсылки
    this.changed = true;

    /**
     * Контроллер
     */
    this.controller = {
        up: false,
        left: false,
        right: false,
        down: false,
        mouseLeft: false,
        mouseRight: false,
        click: null,
    };

    this.skills['skill1'] = {id: 'push', icon: 'push', value: 0.0, increment: 100.0};
    this.skills['skill2'] = {id: 'freeze', icon: 'freeze', value: 0.0, increment: 100.0};
    this.skills['skill3'] = {id: 'holera', icon: 'holera', value: 0.0, increment: 50.0};
    this.currentSkill = 'skill1';

    this.alredyInit = false;
}



Player.prototype.init = function () {

    if(this.alredyInit) return;
    this.alredyInit = true;

    //Отправим героя
    events.one(this.socket, "hero", "hero-create", {info: this.allInfo(), message: "Выдан герой "+this.name});

    //Отправим комнату, в которой герой
    let room = rooms.get(this.room_id);

    //Если нет такой комнаты - переместим в стартовую
    if(room===false){
        this.room_id = PLAYER_START_ROOM;
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
        room = rooms.get(this.room_id);
    }

    events.one(this.socket, "room", "change", {room: room.info(), message: "Выдана Комната"});


    //Отправим игроков. Кроме самого
    players.each((playerID, player)=>{
        if(playerID !== this.ID) {
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
    events.not_me(this.socket, "room", "player-create", {info: this.commonInfo(), message: "Пришел игрок[" + this.name + "]"});


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
            case "fire":
                this.fire();
                break;
        }
    });

    this.socket.on('mouse-down-left', (target) => {

        this.controller.mouseLeft = true;

    });

    this.socket.on('mouse-up-left', (target) => {

        //Если случился - отметим клик
        if(this.controller.mouseLeft){

            this.controller.click = target;
        }

        this.controller.mouseLeft = false;

    });

    this.socket.on('controllerReset', _ => {
        this.controller.left = false;
        this.controller.up = false;
        this.controller.right = false;
        this.controller.down = false;
        this.controller.click = false;
        this.target = false;
    });

    this.socket.on('skill-change',(skill_id)=>{
        if(this.skills[skill_id]){
            this.currentSkill = skill_id;
        }
    });
};

Player.prototype.fire = function () {

    if(!this.currentSkill || !this.skills[this.currentSkill]) return;

    const skill = this.skills[this.currentSkill];

    if(skill.value === 100.0) {
        skill.value = 0.0;
        events.one(this.socket, "skills", "update", this.skills);


        if(skill.id==='push') {
            effects.push('push', {from: {room_id: this.room_id, x: this.x, y: this.y}, author: this});

            events.common('entity', 'push-effect', {
                room_id: this.room_id,
                x: this.x + 20,
                y: this.y + 30,
            });

            sound_event.add('push-effect', this.room_id, this.x, this.y);
        }

        if(skill.id==='freeze'){
            effects.push('freeze', {from: {room_id: this.room_id, x: this.x, y: this.y}, author: this});

            sound_event.add('freeze-effect', this.room_id, this.x, this.y);
        }

        if(skill.id==='holera'){
            effects.push('holera', {from: {room_id: this.room_id, x: this.x, y: this.y}, author: this});

            sound_event.add('holera-effect', this.room_id, this.x, this.y);
        }


    }
};


Player.prototype.getClick = function () {
    let click = this.controller.click;
    this.controller.click = null;
    return click;
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
    this.target = null;
};


/**
 * Поглощение лута
 * @param loot
 */
Player.prototype.eating = function (loot) {

    let
        x = loot.x + loot.width/2,
        y = loot.y - loot.height/2;

    this.coins_count += loot.content;
    this.score += loot.content;
    this.hit(-50);

    //Левелап (LevelUp)
    if(this.score >= TO_LEVELS[this.level]){
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

        sound_event.add(eat_sound, this.room_id, x, y);
    }

    this.levelupValue = TO_LEVELS[this.level] - TO_LEVELS[this.level - 1];
    this.levelupCounter = this.score - TO_LEVELS[this.level - 1];

    events.common("entity", "remove-coin", {room_id: loot.room_id, x: x, y: y});

    db.updateAvatar(this.info());
    this.changed = true;
}


/**
 * Телепортация
 * @param teleport
 */
Player.prototype.teleport = function (teleport) {
    this.room_id = teleport.target.room_id;
    this.x = teleport.target.x;
    this.y = teleport.target.y;

    this.target = null;

    //Если перемещаемся в другую комнату - закажем смену
    if(teleport.target.room_id != teleport.room_id){
        let room = rooms.get(this.room_id);

        events.one(this.socket, "room", "change", {room: room.info()});

    }

    //sound
    sound_event.add("teleport", teleport.room_id, teleport.x, teleport.y);
    sound_event.add("teleport", teleport.target.room_id, teleport.target.x, teleport.target.y);

    let
        x = this.x + this.width/2,
        y = this.y + 1;
    events.common('entity', 'teleport-target', {
        room_id: teleport.target.room_id,
        x: x,
        y: y,
    });

    db.updateAvatar(this.info());
    this.changed = true;
};


/**
 * Применение созданных игроком эффектов (например толчок)
 */
/*Player.prototype.attachEffects = function (units){

    //Для всех создаваемых эффектов
    for(let effect_id in this.makeEffects) {

        //Если для эффекта есть звук - отправим событие



        for(let unit_id in units){

            //Если разные комнаты, то не воздействует
            if(this.room_id !== units[unit_id].room_id) continue;

            //Пока на себя не применяем вообще
            if(this.ID === units[unit_id].ID) continue;

            //TODO: Проверка условий эффекта (например расстояние до источника)

            //Если этот эффект ещё не применен
            if (effect_id in units[unit_id].effects===false) {

                //Проверим условия
                //Расстояние до источника
                let
                    dx = units[unit_id].x - this.x,
                    dy = units[unit_id].y - this.y,
                    distance = Math.sqrt(dx*dx + dy*dy);

                if(distance <= this.makeEffects[effect_id].distance) {

                    //Применим
                    //Склонируем эффект TODO: Классами чтоль эффекты сделать?!
                    units[unit_id].effects[effect_id] = {};
                    for (let key in this.makeEffects[effect_id]) {
                        units[unit_id].effects[effect_id][key] = this.makeEffects[effect_id][key];
                    }
                }
            }

        //}
        }
        //После всех - удалим создаваемый эффект
        delete this.makeEffects[effect_id];
    }
};*/


Player.prototype.updateSkillsValues = function () {
    let changed = false;

    for(let skill_id in this.skills){
        let oldValue = this.skills[skill_id].value;

        this.skills[skill_id].value += this.skills[skill_id].increment*STEP;
        if(this.skills[skill_id].value > 100.0){
            this.skills[skill_id].value = 100.0;
        }

        if(this.skills[skill_id].value != oldValue){
            changed = true;
        }
    }

    if(changed) events.one(this.socket, "skills", "update", this.skills);
};

/**
 * Удар по игроку
 * @param hitPoints
 */
Player.prototype.hit = function (hitPoints) {
    //TODO: Защита, щиты и пр.
    this.damage += hitPoints;
};


/**
 * Движение игрока по контроллеру в комнате
 * @param room
 * @param step
 */
Player.prototype.run = function (room) {

    this.updateSkillsValues();

    let oldPos = {x: this.x, y: this.y},
        oldState = this.state,
        oldHealth = this.health;

    let target = this.calculateTarget();
    if(target) this.target = target;


    //Если есть цель
    if (this.target) {

        //Если уже пришли - сбросим цель
        if(
            this.x === this.target.x &&
            this.y === this.target.y
        ){
            this.target = null;
        }
        //Иначе - движемся
        else {

            let increment = this.speed * STEP,
                x = this.target.x - this.x,
                y = this.target.y - this.y,
                l = Math.sqrt(x * x + y * y),
                x_increment = increment * x / l,
                y_increment = increment * y / l;

            if (Math.abs(x_increment) > Math.abs(x)) x_increment = x;
            if (Math.abs(y_increment) > Math.abs(y)) y_increment = y;

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

    //Проверка цели

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


    //Применим урон (если с минусом - лечение)
    this.health -= this.damage;
    this.damage = 0;

    if(this.health > 100) this.health = 100;

    //"Умрем" если нет здоровья
    //TODO: умирать анимировано
    if (this.health <= 0) {
        this.health = 0;
        this.kill();
    }


    if (
        this.x !== oldPos.x || this.y !== oldPos.y ||
        this.state !== oldState ||
        this.health !== oldHealth
    ) {
        this.changed = true;
    }
};


Player.prototype.kill = function(){
    this.die = true;
};


//Рассчитаем цель
Player.prototype.calculateTarget = function(){
    // если есть клик
    let click = this.getClick();

    let target;
    target = this.targetEffects();
    if(target) return target;

    target = this.targetKeyboard();
    if(target) return target;

    target = this.targetMouse(click);
    if(target) return target;

    return null;
};


Player.prototype.targetKeyboard = function(){
    let
        dx = 0,
        dy = 0;

    if (this.controller.left) {
        dx -= this.speed * STEP;
    }
    if (this.controller.up) {
        dy -= this.speed * STEP;
    }
    if (this.controller.right) {
        dx += this.speed * STEP;
    }
    if (this.controller.down) {
        dy += this.speed * STEP;
    }

    if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {

        //Посчитаем перемещение
        let tx = (Math.abs(dy) > 0 ? SIN_45 : 1.0) * dx;
        let ty = (Math.abs(dx) > 0 ? SIN_45 : 1.0) * dy;

        return {
            x: this.x + tx,
            y: this.y + ty
        };
    }

    return null;
};


Player.prototype.targetMouse = function(pos){

    if (pos) {

        //Отцентрировано по центру игрока
        return {
            x: pos.x - this.width / 2,
            y: pos.y - this.height / 2
        };

    }

    return null;
};


Player.prototype.targetEffects = function(){

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

    }

    return null;
};


/**
 * Возвращает информацию об игроке для db
 */
Player.prototype.info = function(){
    return {
        id: this.db_id,
        name: this.name,
        character_id: this.character_id,

        coins_count: this.coins_count,

        level: this.level,
        score: this.score,

        speed: this.speed,

        room_id: this.room_id,
        x: this.x,
        y: this.y,

        health: this.health,
    }
};


/**
 * Возвращает общедоступную информацию об игроке
 * @returns {{ID: *, x: *, y: *, character_id: *, state: *, level: *, room_id: *}}
 */
Player.prototype.commonInfo = function(){
    const effects = [];

    for(let effectID in this.effects){
        effects.push(effectID);
    }

    return {
        ID: this.ID,
        name: this.name,

        room_id: this.room_id,
        x: this.x,
        y: this.y,

        width: this.width,
        height: this.height,

        character_id: this.character_id,
        state: this.state,

        level: this.level,

        health: this.health,

        effects: effects,
    }
};


/**
 * Возвращает информацию об игроке для самого игрока
 * @returns {{ID: *, x: *, y: *, character_id: *, state: *, coins_count: *, score: *, level: *, levelupValue: *, levelupCounter: *, speed: *, room_id: *, width: *, height: *}}
 */
Player.prototype.allInfo = function(){
    const effects = [];

    for(let effectID in this.effects){
        effects.push(effectID);
    }

    return {
        ID: this.ID,
        name: this.name,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,

        coins_count: this.coins_count,
        score: this.score,
        level: this.level,
        levelupValue: this.levelupValue,
        levelupCounter: this.levelupCounter,

        health: this.health,

        speed: this.speed,

        room_id: this.room_id,

        width: this.width,
        height: this.height,

        effects: effects,
    }
};


Player.prototype.destroy = function(){

    events.not_me(this.socket, "room", "player-leave", {room_id: this.room_id, ID: this.ID, message: "Игрок["+this.name+"] покинул этот мир"});

    this.socket.removeAllListeners();

    db.updateAvatar(this.info());
};


Player.prototype.onDie = function() {

};