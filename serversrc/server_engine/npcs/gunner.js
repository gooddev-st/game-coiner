/**
 * Стрелок Npc
 */
module.exports = Gunner;


const Npc = require("./npc");
const Weapon = require("../weapons").Pistol;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 100;

/**
 * Стрелок
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Gunner(ID, x, y, room_id, population_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_GUNNER, population_id);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.initSpeed(SPEED);

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Weapon(28, 300);
}

Gunner.prototype = Object.create(Npc.prototype);
