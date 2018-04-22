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

    //Для определения "свой-чужой"
    this.fraction = 'human';

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
    this.baseSpeed = data.speed;
    this.speed = data.speed;


    this.score = data.score ? data.score : 0;
    this.level = data.level ? data.level : 1;

    this.levelupValue = TO_LEVELS[this.level] - TO_LEVELS[this.level - 1];
    this.levelupCounter = this.score - TO_LEVELS[this.level - 1];

    this.coins_count = data.coins_count ? data.coins_count : 0;

    //TODO: maxHealth по уровню игрока
    this.maxHealth = data.maxHealth;
    this.health = data.health;


    this.skills = {};
    this.currentSkill = null;


    this.makeEffects = {};
    this.effects = {};

    this.armor = 25;
    this.protect = 0;
    this.damage = 0;

    this.freeze = false;

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

    this.skills['skill1'] = {id: 'push', icon: 'push', value: 0.0, increment: 150.0};
    this.skills['skill2'] = {id: 'freeze', icon: 'freeze', value: 0.0, increment: 25.0};
    this.skills['skill3'] = {id: 'holera', icon: 'holera', value: 0.0, increment: 50.0};
    this.skills['skill4'] = {id: 'shield', icon: 'shield', value: 100.0, increment: 10.0};
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

    events.one(this.socket, "room", "change", {
        room: room.info(),
        players: players.listInRoom(room.ID, this.ID)
    });


    //Отправим игроков. Кроме самого
    /*players.each((playerID, player)=>{
        if(playerID !== this.ID) {
            events.one(this.socket, "room", "player-create", {info: player.commonInfo()});
        }
    });*/

    events.not_me(this.socket, "server", "info", {message: "Пришел игрок[" + this.name + "]"});


    //Заявим, что пришел игрок
    events.room_not_me(this.room_id, this.ID, "room", "player-create", {info: this.commonInfo()});


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
            case "skill1":
                this.fire("skill1");
                break;
            case "skill2":
                this.fire("skill2");
                break;
            case "skill3":
                this.fire("skill3");
                break;
            case "skill4":
                this.fire("skill4");
                break;
            case "skill5":
                this.fire("skill5");
                break;
            case "skill6":
                this.fire("skill6");
                break;
            case "skill7":
                this.fire("skill7");
                break;
            case "skill8":
                this.fire("skill8");
                break;
            case "skill9":
                this.fire("skill9");
                break;
            case "skill10":
                this.fire("skill10");
                break;
        }
    });

    this.socket.on('hero-target', (target) => {

        this.controller.click = target;

    });

    this.socket.on('mouse-down-left', (target) => {

        this.controller.mouseLeft = true;

    });

    this.socket.on('mouse-up-left', (target) => {

        this.controller.mouseLeft = false;

    });

    this.socket.on('controllerReset', _ => {
        this.controller.left = false;
        this.controller.up = false;
        this.controller.right = false;
        this.controller.down = false;
        this.controller.click = null;
        this.controller.mouseLeft = false;
        this.target = false;
    });

    this.socket.on('skill-change',(skill_id)=>{
        if(this.skills[skill_id]){
            this.currentSkill = skill_id;
        }
    });
};

Player.prototype.fire = function (skillID) {
    let skill;

    if(!skillID) {
        if (!this.currentSkill || !this.skills[this.currentSkill]) return;

        skill = this.skills[this.currentSkill];
    }
    else{
        if(!this.skills[skillID]) return;

        skill = this.skills[skillID];
    }

    if(skill.value === 100.0) {
        skill.value = 0.0;
        events.one(this.socket, "skills", "update", this.skills);


        if(skill.id==='push') {

            //Сбрасываем заморозку
            delete this.effects['freeze'];


            effects.push('push', {from: {room_id: this.room_id, x: this.x, y: this.y}, author: this});

            events.room(this.room_id, 'entity', 'push-effect', {
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

        if(skill.id==='shield'){
            effects.push('shield', {author: this});

            sound_event.add('shield-effect', this.room_id, this.x, this.y);
        }


    }
};


/**
 * Получаем и сбрасываем "цель по клику"
 */
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

    this.hit(-20);

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

        const sounds = [
            'eat_coin0',
            'eat_coin1',
            'eat_coin2',
            'eat_coin3',
            'eat_coin4',
        ];

        let eat_sound = eat_sounds[loot.character_id] || sounds[Math.floor(Math.random()*sounds.length)];

        sound_event.add(eat_sound, this.room_id, x, y);
    }

    this.levelupValue = TO_LEVELS[this.level] - TO_LEVELS[this.level - 1];
    this.levelupCounter = this.score - TO_LEVELS[this.level - 1];

    events.room(loot.room_id, "entity", "remove-coin", {room_id: loot.room_id, x: x, y: y});

    db.updateAvatar(this.info());
    this.changed = true;
};


/**
 * Смена комнаты
 * @param room_id - id новой комнаты
 */
Player.prototype.changeRoom = function (room_id) {

    players.each((i, it)=>{
        if(it.ID!==this.ID) {
            //Отправим в старую комнату "уход"
            if (it.room_id === this.room_id) {
                events.one(it.socket, "room", "player-leave", {room_id: this.room_id, ID: this.ID, message: "Плеер "+this.name+" покинул комнату"});
            }
            //Отправим в новую комнату "приход"
            if (it.room_id === room_id) {
                events.one(it.socket, "room", "player-create", {info: this.commonInfo(), message: "В комнату вошел "+this.name});
            }
        }
    });


    let room = rooms.get(room_id);

    events.one(this.socket, "room", "change", {
        room: room.info(),
        players: players.listInRoom(room.ID, this.ID)
    });

    this.room_id = room_id;
};


/**
 * Телепортация
 * @param teleport
 */
Player.prototype.teleport = function (teleport) {
    this.x = teleport.target.x;
    this.y = teleport.target.y;

    //Сбросим цель движения
    this.target = null;

    //Если перемещаемся в другую комнату - закажем смену
    if(this.room_id !== teleport.target.room_id){

        this.changeRoom(teleport.target.room_id);
    }

    //sound
    sound_event.add("teleport", teleport.room_id, teleport.x, teleport.y);
    sound_event.add("teleport", teleport.target.room_id, teleport.target.x, teleport.target.y);

    let
        x = this.x + this.width/2,
        y = this.y + 1;
    events.room(teleport.target.room_id, 'entity', 'teleport-target', {
        room_id: teleport.target.room_id,
        x: x,
        y: y,
    });

    db.updateAvatar(this.info());
    this.changed = true;
};


/**
 * Умения восстанавливаются
 */
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

    //Умерев - умрем
    if(this.die){
        this.makeDie();
    }

    this.updateSkillsValues();

    this.runEffects();

    let oldPos = {x: this.x, y: this.y},
        oldState = this.state,
        oldHealth = this.health;

    let target = this.calculateTarget();
    if(target) this.target = target;

    //Если станилка - сбросим цель
    if(this.freeze){

        this.target = false;

        this.freeze = false;
    }

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

    //Защита щита
    if(this.damage > 0) {
        this.damage -= this.armor;
        this.damage -= this.protect;
        if(this.damage < 0) this.damage = 0;
    }
    this.protect = 0;

    this.health -= this.damage;
    this.damage = 0;

    if(this.health > this.maxHealth) this.health = this.maxHealth;

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


/**
 * Умирание
 */
Player.prototype.makeDie = function(){
    this.die = false;
    this.damage = 0;
    this.protect = 0;
    this.health = this.maxHealth;
    for(let effectID in this.effects) delete this.effects[effectID];
    this.state = 'default';
    this.target = null;

    this.onDie();

    sound_event.add("hero_death", this.room_id, this.x, this.y);

    this.x = 100;
    this.y = 100;

    //Сменим комнату
    this.changeRoom("finish");

    sound_event.add("hero_death", this.room_id, this.x, this.y);

    let
        x = this.x + this.width/2,
        y = this.y + 1;
    events.room(this.room_id, 'entity', 'teleport-target', {
        room_id: this.room_id,
        x: x,
        y: y,
    });

    db.updateAvatar(this.info());
    this.changed = true;
};


Player.prototype.runEffects = function () {

    if (this.effects) {

        for(let effectID in this.effects){
            this.effects[effectID].run(this);
        }

    }
};


//Рассчитаем цель
Player.prototype.calculateTarget = function(){
    // если есть клик
    let click = this.getClick();

    let target;
    /*target = this.targetEffects();
    if(target) return target;*/

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

        //Щит
        if("shield" in this.effects){
            return this.effects.shield.run(this);
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

        maxHealth: this.maxHealth,
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

        maxHealth: this.maxHealth,
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

        maxHealth: this.maxHealth,
        health: this.health,

        speed: this.speed,

        room_id: this.room_id,

        width: this.width,
        height: this.height,

        effects: effects,
    }
};


Player.prototype.destroy = function(){

    events.not_me(this.socket, "server", "info", {message: "Игрок["+this.name+"] покинул этот мир"});

    events.room_not_me(this.room_id, this.ID, "room", "player-leave", {room_id: this.room_id, ID: this.ID});

    this.socket.removeAllListeners();

    db.updateAvatar(this.info());
};


Player.prototype.onDie = function() {
    let
        room = rooms.get(this.room_id),
        grave_id = Math.floor(Math.random()*characters.SPRITESET_GRAVES.size);

    room.addCartoon(this.x+20, this.y, characters.SPRITESET_GRAVES.ID, grave_id, 60.0);
};