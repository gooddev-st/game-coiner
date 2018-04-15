/**
 * Доктор Npc
 */
module.exports = Doc;


const Heal = require("./heal");
const Weapon = require("../weapons").Shotgun;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 100;

/**
 * Доктор
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Doc(ID, x, y, room_id) {

    Heal.call(this, ID, x, y, room_id, characters.CHARACTER_DOC);

    this.fraction = 'human';

    this.width = WIDTH;
    this.height = HEIGHT;
    this.speed = SPEED;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Weapon();
}

Doc.prototype = Object.create(Heal.prototype);
