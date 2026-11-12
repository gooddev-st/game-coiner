/**
 * Маг Npc
 */
module.exports = Mag;


const Npc = require("./npc");
const Weapon = require("../weapons").MagicPaw;
const characters = require('../characters.js');
const players = require("../players.js");

const
    WIDTH = 44.0,
    HEIGHT = 44.0,
    SPEED = 100,
    ATTACK_SPEED = 400,
    VIEW_DISTANCE = 300,
    ATTACK_DISTANCE = 250,
    ESCAPE_DISTANCE = 150;

/**
 * Маг
 * @param ID
 * @param x
 * @param y
 * @param room_id
 * @constructor
 */
function Mag(ID, x, y, room_id, population_id) {

    Npc.call(this, ID, x, y, room_id, characters.CHARACTER_MAG, population_id);

    this.width = WIDTH;
    this.height = HEIGHT;
    this.initSpeed(SPEED, ATTACK_SPEED);

    this.viewDistance = VIEW_DISTANCE;
    this.attackDistance = ATTACK_DISTANCE;

    this.escapeDistance = ESCAPE_DISTANCE;

    this.weapons['weapon1'] = new Weapon(30);
}

Mag.prototype = Object.create(Npc.prototype);



/**
 * Если поблизости подходящий плеер - идем к нему
 * @returns {*}
 */
Mag.prototype.targetPlayer = function() {

    let nearest = players.nearest(this.room_id, this.x, this.y, this.reachableCondition(this.targetPlayerCondition), this);

    if(!nearest) return null;

    // Если в поле зрения - идем к игроку
    if(nearest.distance <= this.viewDistance){

        //Включаем атакующую скорость
        this.speed = this.attackSpeed;

        //Подошли на расстояние атаки - атакуем
        if(
            nearest.distance <= this.attackDistance &&
            nearest.distance > this.escapeDistance
        ) {

            this.freeze = true;

            return null;
        }
        else if(nearest.distance<=this.escapeDistance){
            //Вектор убегания
            let x = this.x - nearest.pos.x,
                y = this.y - nearest.pos.y;
            return {x: this.x + x, y: this.y + y};
        }
        else{
            this.targetEntityId = nearest.id;
            return nearest.pos;
        }
    }

    //Включаем нормальную скорость
    this.speed = this.normalSpeed;

    return null;

};
