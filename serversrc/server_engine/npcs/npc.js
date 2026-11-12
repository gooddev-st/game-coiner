/**
 * Модуль Npc (NotPlayerCharacter) - базовый Npc
 * @type {Npc}
 */
module.exports = Npc;


const events = require("../events.js");
const rooms = require("../rooms.js");
const players = require("../players.js");
const log = require("../log");
require("../constants")();

const sound_event = require('../sound_event.js');//звуковые события

const findpath = require('../lib/findpath'),
    collisions = require('../lib/collisions');

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
    ATTACK_DISTANCE = 50,
    PATH_REPLAN_DISTANCE = 30, // смещение цели, после которого путь пересчитывается
    PATH_REPLAN_INTERVAL = 0.3; // в секундах, минимальная пауза между пересчетами


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
 * @param population_id
 * @constructor
 */
function Npc(ID, x, y, room_id, character_id, population_id) {

    this.ID = ID;
    this.type = 'npc';

    //Для определения "свой-чужой"
    this.fraction = 'monsters';

    this.x = x;
    this.y = y;

    if(population_id!=undefined){
        this.population_id = population_id;
    }

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
    this.direction = 'south';

    this.width = NPC_WIDTH;
    this.height = NPC_HEIGHT;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.attackSpeed =  NPC_SPEED;
    this.normalSpeed =  NPC_SPEED;
    this.speed =  NPC_SPEED;

    this.maxHealth = 100;
    this.health = 100;

    //Есть ли изменения для отсылки
    this.changed = true;

    this.target = null; //Позиция куда идет

    this.path = []; //Точки пути к цели в обход препятствий
    this.pathGoal = null; //Цель, для которой рассчитан путь
    this.pathRoomId = null;
    this.pathAge = Math.random() * PATH_REPLAN_INTERVAL; //Случайная фаза, чтобы мобы не пересчитывали пути в один тик

    this.targetOfAttack = null; //Позиция куда идет

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

    this.neededLoot = {'coin':1};

    // Лут, к которому не подойти из-за препятствий (ID), и лут текущей цели
    this.unreachableLoot = new Set();
    this.targetLootId = null;
}

/**
 * Установка скоростей
 * @param normalSpeed
 * @param attackSpeed
 */
Npc.prototype.initSpeed = function (normalSpeed, attackSpeed) {
    this.normalSpeed = normalSpeed;
    if(this.normalSpeed == undefined) this.normalSpeed = NPC_SPEED;

    this.attackSpeed = attackSpeed;
    if(this.attackSpeed == undefined) this.attackSpeed = this.normalSpeed;
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
    this.targetOfAttack = null;

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
 */
Npc.prototype.update = function () {

    //Сохраним старое, чтоб понимать - изменился ли
    let oldPos = {x: this.x, y: this.y},
        oldState = this.state,
        oldHealth = this.health;

    this.runEffects();

    //Цель движения
    let target = this.calculateTarget();
    if(target) this.target = target;

    //Посчитаем цель атаки
    this.targetOfAttack = this.calculateTargetOfAttack();

    if(this.freeze){

        this.target = null;

        this.freeze = false;
    }

    //Движемся
    this.move();

    //Скорректируем позицию по препятствиям
    this.correctPosition();

    //Выставим направление юнита
    this.setDirection();

    //применим урон
    this.applyDamage();

    //"Умрем" если нет здоровья
    //TODO: Умирать анимировано
    if (this.health <= 0) {
        this.health = 0;
        this.kill();
    }

    //Если не сдвинулись даже на пиксель - сбросим путь
    if(Math.floor(this.x) === Math.floor(oldPos.x) && Math.floor(this.y) === Math.floor(oldPos.y)){
        this.target = null;

        // Шли к луту и не сдвинулись - ближе не подойти, иначе будем выбирать его вечно
        if (this.targetLootId && !this.targetOfAttack) {
            this.unreachableLoot.add(this.targetLootId);
        }
    }

    //Проверим - не умерла ли цель атаки
    if(this.targetOfAttack && this.targetOfAttack.isDie()){
        this.targetOfAttack = null;
    }

    //Выставим состояние
    this.setState();


    if(this.x !== oldPos.x || this.y !== oldPos.y || this.state !== oldState || this.health !== oldHealth){
        this.changed = true;
    }

};


/**
 * Поправить позицию по препятствиям
 */
Npc.prototype.correctPosition = function () {

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


Npc.prototype.runEffects = function () {

    if (this.effects) {

        for(let effectID in this.effects){
            this.effects[effectID].run(this);
        }

    }
};


Npc.prototype.calculateTarget = function() {
    let target;

    this.targetLootId = null;

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
    target = this.targetLoot();
    if(target) return target;

    // Иначе - шляемся
    if(!this.target) return this.targetRandom();

    return null;


};


/**
 * Необходимость лута
 * @param loot
 * @returns {boolean}
 */
Npc.prototype.needed = function (loot) {
    return !!this.neededLoot[loot.type];
};


/**
 * "Подходящесть" лута для движения к нему
 * @param target
 * @param self
 * @returns {*}
 */
Npc.prototype.targetLootCondition = function(target, self) {
    return self.needed(target) && !self.unreachableLoot.has(target.ID);
};

Npc.prototype.targetLoot = function() {

    const room = rooms.get(this.room_id);

    if(!room || !room.loot.size()) return false;

    this.forgetEatenLoot(room);

    let nearest = room.loot.nearest(this.room_id, this.x, this.y, this.targetLootCondition, this);

    if(!nearest) return null;

    // Если в поле зрения - идем к луту
    if(nearest.distance <= this.viewDistance){
        this.targetLootId = nearest.id;
        return nearest.pos;
    }

    return null;

};

// Убираем из недостижимого съеденный лут и лут другой комнаты
Npc.prototype.forgetEatenLoot = function (room) {
    if (this.unreachableLoot.size < 20) return;

    for (const id of this.unreachableLoot) {
        if (!room.loot.get(id)) this.unreachableLoot.delete(id);
    }
};


/**
 * Условие пригодности игрока как цели
 * @param target
 * @param self
 * @returns {boolean}
 */
const playerCondition = function (target, self) {
    //По умолчанию - годятся все из другой фракции
    return (target.fraction!==self.fraction);
};

/**
 * Условие пригодности моба как цели
 * @param target
 * @param self - сам моб
 * @returns {boolean}
 */
const npcCondition = function(target, self) {
    //По умолчанию - годятся все которые не он же и из другой фракции
    return (target.ID!==self.ID && target.fraction!==self.fraction);
};

Npc.prototype.targetPlayerCondition = playerCondition;

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

            this.freeze = true;

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


Npc.prototype.targetNpcCondition = npcCondition;

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

/**
 * Шаримся (гуляем по локации)
 * @returns {{x: *, y: *}}
 */
Npc.prototype.targetRandom = function () {

    const room = rooms.get(this.room_id);

    let location = room.populations[this.population_id].location;

    return room.randomPos(this.width, this.height, location);
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

//Рассчитаем цель атаки
Npc.prototype.calculateTargetOfAttack = function(){

    let targetOfAttack;

    targetOfAttack = this.targetOfAttackPlayer();
    if (targetOfAttack) return targetOfAttack;

    targetOfAttack = this.targetOfAttackNpc();
    if (targetOfAttack) return targetOfAttack;

    return null;
};


/**
 * Условие пригодности моба как цели атаки
 * @param target
 * @param self
 * @returns {boolean}
 */
Npc.prototype.targetOfAttackNpcCondition = npcCondition;

Npc.prototype.targetOfAttackNpc = function() {

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


Npc.prototype.targetOfAttackPlayerCondition = playerCondition;

Npc.prototype.targetOfAttackPlayer = function() {

    let nearest = players.nearest(this.room_id, this.x, this.y, this.targetOfAttackPlayerCondition, this);

    if(!nearest) return null;

    //Подошли на расстояние атаки - атакуем
    if(nearest.distance <= this.attackDistance) {

        let npc = players.get(nearest.id);

        this.bah(npc);

        return npc;
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
        direction: this.direction,

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

    let content = this.content;
    this.content = 0;

    //если что-то накопил - выроним мешок
    if (content > 0) {

        room.addSack(this.x, this.y+3, content);
    }

    //Поставим могилку
    let grave_id = Math.floor(Math.random()*characters.SPRITESET_GRAVES.size);
    room.addCartoon(this.x+20, this.y, characters.SPRITESET_GRAVES.ID, grave_id, 60.0);
};


/**
 * Выставим направление юнита
 */
Npc.prototype.setDirection = function() {
    let target;
    //Если есть цель атаки - повернемся к ней
    if(this.targetOfAttack) {
        target = {x: this.targetOfAttack.x, y: this.targetOfAttack.y}
    }
    //иначе если есть - к ближайшей точке пути или цели движения
    else if(this.target){
        target = this.path.length ? this.path[0] : this.target;
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
 * Выставим состояние юнита
 */
Npc.prototype.setState = function() {
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
            this.state = 'thrust';
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


/**
 * Движем юнит
 */
Npc.prototype.move = function() {
    if (!this.target) {
        this.resetPath();
        return;
    }

    this.updatePath();

    // Пути нет - стоим, пересчитаем позже
    if (!this.path.length) {
        this.target = null;
        return;
    }

    // Проходим весь шаг, даже если по дороге миновали точку пути
    let rest = this.speed * STEP;

    while (rest > 0 && this.path.length) {
        const point = this.path[0],
            x = point.x - this.x,
            y = point.y - this.y,
            l = Math.sqrt(x * x + y * y);

        if (l <= rest) {
            this.x = point.x;
            this.y = point.y;
            this.path.shift();
            rest -= l;
        }
        else {
            this.x += rest * x / l;
            this.y += rest * y / l;
            rest = 0;
        }
    }

    //Дошли до цели - сбросим её
    if (!this.path.length) {
        this.target = null;
        this.resetPath();
    }
};


/**
 * Пересчет пути к цели, если она заметно сместилась
 */
Npc.prototype.updatePath = function () {
    const target = this.target,
        goal = this.pathGoal,
        shift = goal ? Math.hypot(target.x - goal.x, target.y - goal.y) : Infinity;

    this.pathAge += STEP;

    const needReplan = !goal ||
        this.pathRoomId !== this.room_id ||
        (shift > PATH_REPLAN_DISTANCE && this.pathAge >= PATH_REPLAN_INTERVAL);

    if (needReplan) {
        const room = rooms.get(this.room_id);

        this.path = findpath.findPath(room, {x: this.x, y: this.y}, {x: target.x, y: target.y}, this.width, this.height);
        this.pathGoal = {x: target.x, y: target.y};
        this.pathRoomId = this.room_id;
        this.pathAge -= PATH_REPLAN_INTERVAL * Math.floor(this.pathAge / PATH_REPLAN_INTERVAL);
    }
    else if (shift > 0 && this.path.length) {
        this.path[this.path.length - 1] = {x: target.x, y: target.y};
    }
};


Npc.prototype.resetPath = function () {
    this.path = [];
    this.pathGoal = null;
};


/**
 * Применим урон
 */
Npc.prototype.applyDamage = function () {
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
};
