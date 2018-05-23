/**
 * Тёмная магичка Npc
 */
module.exports = Darka;


const Heal = require("./heal");
const Weapon = require("../weapons").Magicsword;
const Weapon3 = require("../weapons").Curezzler;
const characters = require('../characters.js');

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    ATTACK_SPEED = 150,
    VIEW_DISTANCE = 250,
    ATTACK_DISTANCE = 100;

/**
 * Доктор
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @param population_id
 * @constructor
 */
function Darka(ID, x, y, room_id, population_id) {

    Heal.call(this, ID, x, y, room_id, characters.CHARACTER_DARKA, population_id);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.initSpeed(SPEED, ATTACK_SPEED);

    this.health = 100;
    this.maxHealth = 100;

    this.armor = 0;

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.weapons['weapon1'] = new Weapon(30,200);
    this.weapons['weapon3'] = new Weapon3(-20,200);
}

Darka.prototype = Object.create(Heal.prototype);
