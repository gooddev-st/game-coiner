/**
 * Скелет Npc
 */
module.exports = Skeleton;


const Npc = require("./npc");
const Weapon = require("../weapons").Slime;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    ATTACK_SPEED = 150,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;

/**
 * Скелет
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Skeleton(ID, x, y, room_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_SKELETON);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.initSpeed(SPEED, ATTACK_SPEED);

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Weapon();
}

Skeleton.prototype = Object.create(Npc.prototype);
