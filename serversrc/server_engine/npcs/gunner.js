/**
 * Стрелок Npc
 */
module.exports = Gunner;


const Npc = require("./npc");
const Claws = require("../weapons").Claws;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;

/**
 * Стрелок
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Gunner(ID, x, y, room_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_GUNNER);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.speed = SPEED;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Claws();
}

Gunner.prototype = Object.create(Npc.prototype);
