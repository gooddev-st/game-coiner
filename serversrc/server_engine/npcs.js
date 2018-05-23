/**
 * Мобы
 */
module.exports = NpcsList;

const Npc = require("./npcs/npc");
const Gob = require("./npcs/gob");
const Prof = require("./npcs/prof");
const Dead = require("./npcs/dead");
const Doc = require("./npcs/doc");
const Mag = require("./npcs/mag");
const Skeleton = require("./npcs/skeleton");
const Kroko = require("./npcs/kroko");
const Koil = require("./npcs/koil");
const Gunner = require("./npcs/gunner");
const Juk = require("./npcs/juk");
const Darka = require("./npcs/darka");
const Ork = require("./npcs/ork");
const Elf = require("./npcs/elf");
const Pirat = require("./npcs/pirat");

/**
 * Генерация имени моба
 * @type {number}
 */
let counter_for_naming = 0;

const getName = function () {
    counter_for_naming++;
    return 'npc' + counter_for_naming;
};


function NpcsList() {
    this.npcs = {};

}


NpcsList.prototype.add = function (room_id, population_id, x, y, npc_id) {


    let ID = getName();

    switch(npc_id){
        case "pirat":
            this.npcs[ID] = new Pirat(ID, x, y, room_id, population_id);
            break;
        case "elf":
            this.npcs[ID] = new Elf(ID, x, y, room_id, population_id);
            break;
        case "ork":
            this.npcs[ID] = new Ork(ID, x, y, room_id, population_id);
            break;
        case "darka":
            this.npcs[ID] = new Darka(ID, x, y, room_id, population_id);
            break;
        case "juk":
            this.npcs[ID] = new Juk(ID, x, y, room_id, population_id);
            break;
        case "gunner":
            this.npcs[ID] = new Gunner(ID, x, y, room_id, population_id);
            break;
        case "koil":
            this.npcs[ID] = new Koil(ID, x, y, room_id, population_id);
            break;
        case "kroko":
            this.npcs[ID] = new Kroko(ID, x, y, room_id, population_id);
            break;
        case "skeleton":
            this.npcs[ID] = new Skeleton(ID, x, y, room_id, population_id);
            break;
        case "mag":
            this.npcs[ID] = new Mag(ID, x, y, room_id, population_id);
            break;
        case "doc":
            this.npcs[ID] = new Doc(ID, x, y, room_id, population_id);
            break;
        case "dead":
            this.npcs[ID] = new Dead(ID, x, y, room_id, population_id);
            break;
        case "prof":
            this.npcs[ID] = new Prof(ID, x, y, room_id, population_id);
            break;
        case "gob":
            this.npcs[ID] = new Gob(ID, x, y, room_id, population_id);
            break;
        default:
            //TODO: убрать. Создавать только по типу
            //character_id === npc_id
            this.npcs[ID] = new Npc(ID, x, y, room_id, npc_id, population_id);
            break;
    }

    return this.npcs[ID];
};


NpcsList.prototype.remove = function (id) {
    if (id in this.npcs) {
        delete this.npcs[id];
    }
};


NpcsList.prototype.get = function (id) {
    if (id in this.npcs) {
        return this.npcs[id];
    }
};


NpcsList.prototype.each = function (callback) {
    for (const i in this.npcs) {
        callback(i, this.npcs[i]);
    }
};


NpcsList.prototype.toArray = function () {
    const npcsArray = [];
    for (const i in this.npcs) {
        npcsArray.push(this.npcs[i]);
    }
    return npcsArray;
};


NpcsList.prototype.list = function () {
    return this.npcs;
};


NpcsList.prototype.size = function () {
    return Object.keys(this.npcs).length;
};


NpcsList.prototype.listInfo = function () {
    let npcsInfo = [];
    this.each((i, it)=>{
        npcsInfo.push(it.info());
    });
    return npcsInfo;
};


/**
 * Моб ближайший к позиции. Соответствующий условию
 * @param room_id
 * @param x
 * @param y
 * @param conditionFunc
 * @param self
 * @returns {*}
 */
NpcsList.prototype.nearest = function(room_id, x, y, conditionFunc, self) {

    let distances = [];

    // Соберем в массив всех подходящих мобов в этой комнате
    this.each((ID, npc)=>{
        if(
            npc.room_id===room_id &&
            (!conditionFunc || conditionFunc(npc, self))
        ) {
            let
                xdiff = Math.abs(npc.x - x),
                ydiff = Math.abs(npc.y - y);

            distances.push({
                id: ID,
                // Расстояние до
                distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
                // Расположение
                pos: {x: npc.x, y: npc.y}
            });
        }
    });

    if(distances.length>0){

        // Найдем индекс минимального значения
        let min_index = distances.reduce(
            (prev, value, i, array) => {
                return value.distance < array[prev].distance ? i : prev;
            }, 0
        );

        return distances[min_index];
    }

    return null;
}
