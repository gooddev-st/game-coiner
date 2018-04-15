/**
 * Мертвец Npc
 */
module.exports = Dead;


const Npc = require("./npc");
const Claws = require("../weapons").Claws;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 80,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 50;

/**
 * Npc
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @param character_id - персонаж или массив возможных персонажей
 * @param speed
 * @constructor
 */
function Dead(ID, x, y, room_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_DEAD);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.speed = SPEED;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.maxHealth = 1000;
    this.health = 1000;

    this.armor = 0;

    this.weapons['weapon1'] = new Claws(75, 100);
    this.currentWeapon = 'weapon1';
}

Dead.prototype = Object.create(Npc.prototype);
