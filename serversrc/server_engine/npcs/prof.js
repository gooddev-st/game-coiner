/**
 * Профессор Npc
 */
module.exports = Prof;


const Heal = require("./heal");
const Weapon = require("../weapons").Pistol;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    VIEW_DISTANCE = 350,
    ATTACK_DISTANCE = 150;

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
function Prof(ID, x, y, room_id) {

    Heal.call(this, ID, x, y, room_id, characters.CHARACTER_MAN);

    this.fraction = 'human';

    this.width = WIDTH;
    this.height = HEIGHT;
    this.speed = SPEED;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Weapon();

}

Prof.prototype = Object.create(Heal.prototype);
