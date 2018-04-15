/**
 * Гоблин Npc
 */
module.exports = Gob;


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
 * Гоблин
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Gob(ID, x, y, room_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_GOB);

    this.width = WIDTH;
    this.height = HEIGHT;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.initSpeed(SPEED);

    this.weapons['weapon1'] = new Claws(30);
}

Gob.prototype = Object.create(Npc.prototype);
