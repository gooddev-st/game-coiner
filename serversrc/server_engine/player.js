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

const Weapon = require("./weapons").Sword;

const sound_event = require('./sound_event.js');//звуковые события

const findpath = require('./lib/findpath'),
    collisions = require('./lib/collisions');


/**
 * Константы персонажей
 */
const characters = require('./characters.js');

const
    PLAYER_WIDTH = 44.0,
    PLAYER_HEIGHT = 44.0,
    SPEED = 400,
    VIEW_DISTANCE = 50,
    ATTACK_DISTANCE = 50,

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
    this.type = 'player';

    //Для определения "свой-чужой"
    this.fraction = 'human';

    this.name = name;
    this.socket = socket;

    this.room_id = data.room_id;
    this.x = data.x;
    this.y = data.y;

    this.target = null;// Позиция куда идти

    //Путь движения
    this.path = [];

    this.targetOfAttack = null;

    this.character_id = data.character_id || getRandomCharacter();
    this.state = 'default';
    this.direction = 'south';

    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;

    //TODO: скорости на основе уровня игрока
    this.attackSpeed =  data.attack_speed;
    this.normalSpeed =  data.normal_speed;
    this.speed = data.speed;

    this.viewDistance = VIEW_DISTANCE;
    //TODO: Расстояние атаки от оружия
    this.attackDistance = ATTACK_DISTANCE;


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


    // this.makeEffects = {};
    this.effects = {};

    this.weapons = {}; // Оружие
    this.currentWeapon = null;

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
        ctrl: false,
        mouseLeft: false,
        mouseRight: false,
        click: null,
    };

    this.skills['skill1'] = {id: 'push', icon: 'push', value: 0.0, increment: 150.0};
    this.skills['skill2'] = {id: 'freeze', icon: 'freeze', value: 0.0, increment: 25.0};
    this.skills['skill3'] = {id: 'holera', icon: 'holera', value: 0.0, increment: 50.0};
    this.skills['skill4'] = {id: 'shield', icon: 'shield', value: 100.0, increment: 10.0};
    this.currentSkill = 'skill1';

    this.weapons['weapon1'] = new Weapon(30);
    this.currentWeapon = 'weapon1';

    this.neededLoot = {'coin':1, 'sack':1};

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
            case "ctrl":
                this.controller.ctrl = true;
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
            case "ctrl":
                this.controller.ctrl = false;
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
        this.controller.ctrl = false;
        this.controller.click = null;
        this.controller.mouseLeft = false;
        this.target = null;
        this.path = [];
        this.targetOfAttack = null;
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
                x: this.x,
                y: this.y - 1,
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
    this.controller.ctrl = false;
    this.target = null;
    this.path = [];
    this.targetOfAttack = null;
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
    //TODO: с уровнем добавлять плюшек
    if(this.score >= TO_LEVELS[this.level]){
        this.level++;

        //Увеличим скорость
        this.normalSpeed += 50;
        //    только не слишком
        if(this.normalSpeed>400) this.normalSpeed = 400;

        this.attackSpeed = this.normalSpeed;
        this.speed = this.normalSpeed;

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
    this.path = [];
    this.targetOfAttack = null;

    //Если перемещаемся в другую комнату - закажем смену
    if(this.room_id !== teleport.target.room_id){

        this.changeRoom(teleport.target.room_id);
    }

    //sound
    sound_event.add("teleport", teleport.room_id, teleport.x, teleport.y);
    sound_event.add("teleport", teleport.target.room_id, teleport.target.x, teleport.target.y);

    let
        x = this.x - this.width,
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
 * Удар текущим оружием
 * @param target
 */
Player.prototype.bah = function (target) {
    if(!this.currentWeapon || !this.weapons[this.currentWeapon]) return;

    const weapon = this.weapons[this.currentWeapon];

    weapon.bah(target);
};


/**
 * Движение игрока по контроллеру в комнате
 * @param room
 * @param step
 */
Player.prototype.update = function () {

    //Сохраняем, чтобы понять, что изменился
    let oldPos = {x: this.x, y: this.y},
        oldState = this.state,
        oldHealth = this.health;

    //Умерев - умрем
    if(this.die){
        this.makeDie();
    }

    //Восстановление энергии скилов
    this.updateSkillsValues();

    //Применим на себя эффекты
    this.runEffects();

    //Посчитаем цель движения
    let target = this.calculateTarget();
    if(target) this.target = target;

    //Посчитаем цель атаки
    this.targetOfAttack = this.calculateTargetOfAttack();

    //Если станилка - сбросим цель
    if(this.freeze){

        this.target = false;
        this.path = [];

        this.freeze = false;
    }


    this.setDirection();

    //Движемся
    this.move();

    //Проверка не перешли ли преграды и норм ли цель
    this.correctPosition();


    //Проверим - не умерла ли цель атаки
    if(this.targetOfAttack && this.targetOfAttack.isDie()){
        this.targetOfAttack = null;
    }

    //Выставим состояние
    this.setState();

    this.applyDamage();

    //"Умрем" если нет здоровья
    //TODO: умирать анимировано
    if (this.health <= 0) {
        this.health = 0;
        this.kill();
    }


    //Если не сдвинулись даже на пиксель - сбросим путь
    if(Math.floor(this.x) === Math.floor(oldPos.x) && Math.floor(this.y) === Math.floor(oldPos.y)){
        this.path = [];
    }


    if (
        this.x !== oldPos.x || this.y !== oldPos.y ||
        this.state !== oldState ||
        this.health !== oldHealth
    ) {
        this.changed = true;
    }
};


function isTouch(barier, player){
    if (
        barier.left < player.x + player.width
        &&
        barier.right > player.x
        &&
        barier.top < player.y
        &&
        barier.bottom > player.y - player.height
    ) {
        return true;
    }
    return false;
}

/**
 * Поправим позицию по границам карты
 */
Player.prototype.correctMapBorder = function() {
    let room = rooms.get(this.room_id);
    // Если уперлись в границу - остановимся и поправим цель
    //TODO: поправлять путь
    if (this.x < 0 + room.dead_zone_left) {
        this.x = 0 + room.dead_zone_left;
        this.target && (this.target.x = this.x);
    }
    if (this.y - this.height < 0 + room.dead_zone_top) {
        this.y = 0 + this.height + room.dead_zone_top;
        this.target && (this.target.y = this.y);
    }
    if (this.x + this.width > (room.width - room.dead_zone_right)) {
        this.x = room.width - room.dead_zone_right - this.width;
        this.target && (this.target.x = this.x);
    }
    if (this.y > (room.height - room.dead_zone_bottom)) {
        this.y = room.height - room.dead_zone_bottom;
        this.target && (this.target.y = this.y);
    }
};

/**
 * Поправим позицию по препятствию
 * @param barier
 */
Player.prototype.correctTouch = function(barier) {
    let
        deepTop = this.y - barier.top,
        deepBottom = barier.bottom - (this.y-this.height),
        deepLeft = this.x + this.width - barier.left,
        deepRight = barier.right - this.x;

    let minDeep = Math.min(deepLeft, deepRight, deepTop, deepBottom);


    //  Выталкиваем по приоритетам
    //вверх
    if(deepTop===minDeep){
        this.y = barier.top - 1;
        this.target && (this.target.y = this.y);
    }
    else if(deepLeft===minDeep){
        this.x = barier.left - this.width - 1;
        this.target && (this.target.x = this.x);
    }
    else if(deepBottom===minDeep){
        this.y = barier.bottom + this.height + 1;
        this.target && (this.target.y = this.y);
    }
    else{
        this.x = barier.right + 1;
        this.target && (this.target.x = this.x);
    }
};


/**
 * Скорректируем цель движения по препятствиям
 */
Player.prototype.correctPosition = function(){
    const room = rooms.get(this.room_id);

    //Столкновение с препятствиями
    if(room.bariers) {
        for (let i in room.bariers){
            if(collisions.touchBar(this, room.bariers[i])){
                collisions.correctBarTouch(this, room.bariers[i]);
            }
        }
    }

    // Если уперлись в границу карты
    collisions.correctByRoomBorder(this, room);
};


Player.prototype.kill = function(){
    this.die = true;
};


Player.prototype.isDie = function(){
    return this.die;
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
    this.direction = 'south';
    this.target = null;

    this.onDie();

    sound_event.add("hero_death", this.room_id, this.x, this.y);

    this.x = 100;
    this.y = 750;

    //Сменим комнату
    this.changeRoom("finish");

    sound_event.add("hero_death", this.room_id, this.x, this.y);

    let
        x = this.x - this.width,
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


//Рассчитаем цель перемещения
Player.prototype.calculateTarget = function(){
    let target;

    // если есть клик
    let click = this.getClick();
    if(click){
        this.path = this.calculatePath(click);
    }

    //Движем с клавиатуры
    target = this.targetKeyboard();
    if(target){
        this.path = [];
        return target;
    }



    //Движемся по пути
    target = this.targetPath();
    if(target) return target;

    // Если нет цели - идем к ближнему подходящему мобу (в поле зрения)
    /*if(!this.target) {
        target = this.targetNpc();
        if (target) return target;
    }*/

    return null;
};


/**
 * Движение с клавиш
 * @returns {*}
 */
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


/**
 * Вычисление пути движения
 * @param pos
 * @returns {*[]}
 */
Player.prototype.calculatePath = function (pos) {
    if (pos) {
        //Отцентрировано по центру игрока
        const finish = {
            x: pos.x - this.width / 2,
            y: pos.y + this.height / 2
        };

        return findpath.findPath(rooms.get(this.room_id), {x: this.x, y: this.y}, finish, this.width, this.height);
    }
};


/**
 * Движение по пути
 * @returns {*}
 */
Player.prototype.targetPath = function(){

    if (this.path.length) {

        //Закончили шаг пути - удалим
        if(this.x===this.path[0].x && this.y===this.path[0].y){
            this.path.shift();
        }

        //Пустой путь
        if(!this.path.length){
            return null;
        }

        //На основании текущего куска пути посчитаем шаг
        let target = {x: this.x, y: this.y},
            increment = this.speed * STEP,
            dx = this.path[0].x - this.x,
            dy = this.path[0].y - this.y,
            l = Math.sqrt(dx * dx + dy * dy),
            x_increment = increment * dx / l,
            y_increment = increment * dy / l;

        if (Math.abs(x_increment) > Math.abs(dx)) x_increment = dx;
        if (Math.abs(y_increment) > Math.abs(dy)) y_increment = dy;

        target.x = this.x + x_increment;
        target.y = this.y + y_increment;

        return target;

    }

    return null;
};


/**
 * Условие пригодности как цели
 * @param target
 * @param self - игрок
 * @returns {boolean}
 */
Player.prototype.targetNpcCondition = function(target, self) {
    //По умолчанию - годятся все которые не он же и из другой фракции
    return (target.ID!==self.ID && target.fraction!==self.fraction);
};

/**
 * Если поблизости подходящий моб - идем к нему
 * @returns {*}
 */
Player.prototype.targetNpc = function() {

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

            this.freeze = true;

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

//Рассчитаем цель атаки
Player.prototype.calculateTargetOfAttack = function(){

    let targetOfAttack;

    targetOfAttack = this.targetOfAttackNpc();
    if (targetOfAttack) return targetOfAttack;

    return null;
};


/**
 * Условие пригодности как цели атаки
 * @param target
 * @param self - игрок
 * @returns {boolean}
 */
Player.prototype.targetOfAttackNpcCondition = function(target, self) {
    //По умолчанию - годятся все которые не он же и из другой фракции
    return (target.ID!==self.ID && target.fraction!==self.fraction);
};


Player.prototype.targetOfAttackNpc = function() {

    let room = rooms.get(this.room_id),
        npcs = room.npcs;

    let nearest = npcs.nearest(this.room_id, this.x, this.y, this.targetOfAttackNpcCondition, this);

    if(!nearest) return null;

    //Подошли на расстояние атаки - атакуем
    if(nearest.distance <= this.attackDistance) {

        let npc = npcs.get(nearest.id);

        this.bah(npc);

        return npc;
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
        normal_speed: this.normalSpeed,
        attack_speed: this.attackSpeed,

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
        direction: this.direction,

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
        direction: this.direction,

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


Player.prototype.setDirection = function() {
    let target;
    //Если есть цель атаки - повернемся к ней
    if(this.targetOfAttack) {
        target = {x: this.targetOfAttack.x, y: this.targetOfAttack.y}
    }
    //иначе если есть - к цели движения
    else if(this.target){
        target = {x: this.target.x, y: this.target.y}
    }
    else{
        return;
    }

    let x_increment = target.x - this.x,
        y_increment = target.y - this.y;

    if(x_increment===0 && y_increment===0){
        return;
    }

    //Выставим направление
    if(Math.abs(x_increment) > Math.abs(y_increment)){
        if(x_increment > 0){
            this.direction = 'east';
        }
        else{
            this.direction = 'west';
        }
    }
    else{
        if(y_increment > 0){
            this.direction = 'south';
        }
        else{
            this.direction = 'north';
        }
    }
};

/**
 * Необходимость лута
 * @param loot
 * @returns {boolean}
 */
Player.prototype.needed = function (loot) {
    return !!this.neededLoot[loot.type];
};


/**
 * Выставим состояние юнита
 */
Player.prototype.setState = function () {
    if(this.targetOfAttack){

        const weaponType = this.weapons[this.currentWeapon].type;
        //состояние атаки в зависимости от типа оружия
        if(weaponType==='gun'){
            this.state = 'shoot';
        }
        else if(weaponType==='spear'){
            this.state = 'thrust';
        }
        else if(weaponType==='magic'){
            this.state = 'spellcast';
        }
        else{
            this.state = 'slash';
        }

    }
    else if(this.target){
        this.state = 'run';
    }
    else{
        this.state = 'default';
    }
};

Player.prototype.move = function () {
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
                dx = this.target.x - this.x,
                dy = this.target.y - this.y,
                l = Math.sqrt(dx * dx + dy * dy),
                x_increment = increment * dx / l,
                y_increment = increment * dy / l;

            if (Math.abs(x_increment) > Math.abs(dx)) x_increment = dx;
            if (Math.abs(y_increment) > Math.abs(dy)) y_increment = dy;

            this.x += x_increment;
            this.y += y_increment;
        }

    }
};

Player.prototype.applyDamage = function () {
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
};
