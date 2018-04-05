/**
 * Мобы
 */
module.exports = NpcsList;

const Npc = require("./npc.js");

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

NpcsList.prototype.add = function (room_id, x, y, character_id) {
    let ID = getName();
    this.npcs[ID] = new Npc(ID, x, y, room_id, character_id);
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
