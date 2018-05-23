/**
 * Пират Npc
 */
module.exports = Pirat;


const Npc = require("./npc");
const Weapon = require("../weapons").Sword;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    ATTACK_SPEED = 150,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;

/**
 * Пират
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Pirat(ID, x, y, room_id, population_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_PIRAT, population_id);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.initSpeed(SPEED, ATTACK_SPEED);

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Weapon(37, 160);
}

Pirat.prototype = Object.create(Npc.prototype);
