/**
 * Латный Npc
 */
module.exports = Juk;


const Npc = require("./npc");
const Claws = require("../weapons").Claws;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    ATTACK_SPEED = 250,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;

/**
 * Латный
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Juk(ID, x, y, room_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_JUK);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.initSpeed(SPEED, ATTACK_SPEED);

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Claws(40);
}

Juk.prototype = Object.create(Npc.prototype);
