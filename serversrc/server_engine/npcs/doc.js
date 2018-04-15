/**
 * Доктор Npc
 */
module.exports = Doc;


const Npc = require("./npc");
const Curezzler = require("../weapons").Curezzler;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;

/**
 * Доктор
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Doc(ID, x, y, room_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_DOC);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.speed = SPEED;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.health = 1000;
    this.maxHealth = 1000;

    this.armor = 0;

    this.weapons['weapon1'] = new Curezzler();
}

Doc.prototype = Object.create(Npc.prototype);

/**
 * Условие пригодности плеера как цели
 * @param target
 * @returns {boolean}
 */
Doc.prototype.targetPlayerCondition = function(target) {
    //Будем идти только к нездоровым игрокам
    return target.health < target.maxHealth;
};