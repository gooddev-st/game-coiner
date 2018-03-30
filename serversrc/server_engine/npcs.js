/**
 * Мобы
 */

const NPC_SPEED = 100;

const Npc = require("./npc.js");


const npcs = {};


/**
 * Генерация имени моба
 * @type {number}
 */
let counter_for_naming = 0;

function getName() {
    counter_for_naming++;
    return 'npc' + counter_for_naming;
}


module.exports.add = function (room_id, x, y, character_id) {
    let ID = getName();
    npcs[ID] = new Npc(ID, x, y, room_id, character_id, NPC_SPEED);
    return npcs[ID];
}


module.exports.remove = function (id) {
    if (id in npcs) {
        delete npcs[id];
    }
}


module.exports.get = function (id) {
    if (id in npcs) {
        return npcs[id];
    }
}


module.exports.each = function (callback) {
    for (const i in npcs) {
        callback(i, npcs[i]);
    }
}


module.exports.toArray = function () {
    const npcsArray = [];
    for (const i in npcs) {
        npcsArray.push(npcs[i]);
    }
    return npcsArray;
}


module.exports.list = function () {
    return npcs;
}
