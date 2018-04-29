/**
 * Лечебные Npc - базовый
 */
module.exports = Heal;


const Npc = require("./npc");
const Curezzler = require("../weapons").Curezzler;
const Claws = require("../weapons").Claws;
const characters = require('../characters.js');
const log = require('../log');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 100;

/**
 * Лечебный Npc
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @param character_id
 * @constructor
 */
function Heal(ID, x, y, room_id, character_id) {

    Npc.call(this, ID, x, y, room_id, character_id || characters.CHARACTER_DOC);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.speed = SPEED;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.health = 1000;
    this.maxHealth = 1000;

    //Задача - вылечить себя на 100%
    this.taskSelfHealth = false;

    this.armor = 20;

    this.weapons['weapon1'] = new Claws(30);
    this.weapons['weapon2'] = new Curezzler();
    this.weapons['weapon3'] = new Curezzler(-100);
}

Heal.prototype = Object.create(Npc.prototype);


const playerCondition = function (target, self) {
    //Будем идти к нездоровым игрокам нашей фракции
    // или к игрокам враждебной фракции
    return (
        (target.fraction===self.fraction && target.health < target.maxHealth) ||
        target.fraction!== self.fraction
    );
};

Heal.prototype.targetPlayerCondition = playerCondition;
Heal.prototype.targetOfAttackPlayerCondition = playerCondition;

/**
 * Условие пригодности моба как цели
 * @param target
 * @param self
 * @returns {boolean}
 */
const npcCondition = function (target, self) {
    //Если здоровья меньше половины (и рядом нет нездоровых игроков)
    //поставим задачу вылечиться на 100%
    if(self.health < self.maxHealth/2){
        self.taskSelfHealth = true;
    }
    if(self.health >= self.maxHealth){
        self.taskSelfHealth = false;
    }

    //Будем идти к нездоровым мобам нашей фракции
    // или к мобам враждебной фракции

    return (
        (target.ID===self.ID && (target.health < target.maxHealth/2 || self.taskSelfHealth)) ||
        (target.ID!==self.ID && target.fraction===self.fraction && target.health < target.maxHealth) ||
        target.fraction!== self.fraction
    );
};

Heal.prototype.targetNpcCondition = npcCondition;
Heal.prototype.targetOfAttackNpcCondition = npcCondition;

Heal.prototype.bah = function(target){
    //"Чужих" бъем
    let weapon = this.weapons['weapon1'];
    this.currentWeapon = 'weapon1';

    // log(weapon);

    //Для себя - СУПЕРлечение
    if(target.ID===this.ID){
        weapon = this.weapons['weapon3'];
        this.currentWeapon = 'weapon3';
    }
    //Для "своих" - лечение
    else if(target.fraction===this.fraction){
        weapon = this.weapons['weapon2'];
        this.currentWeapon = 'weapon2';
    }

    if(!weapon) return;

    weapon.bah(target);
};