/**
 * Мобы
 */
module.exports.get = get;
module.exports.each = each;
module.exports.list = list;
module.exports.toArray = toArray;


const NPC_COUNT =40;
const NPC_SPEED = 100;


const rooms = require("./rooms.js");
const Npc = require("./npc.js");


const npcs = {};

// Случайные мобы на случайных картах
for(let i=0;i<NPC_COUNT;i++) {
    let
        roomsArray = rooms.toArray(),
        room_id = roomsArray[Math.floor(Math.random()*roomsArray.length)].ID,
        room = rooms.get(room_id),
        x = room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right),
        y = room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom),
        character_id = 'gob';

    npcs['npc'+i] = new Npc('npc'+i, x, y, room_id, character_id, NPC_SPEED);
}


function get(id){
    if(id in npcs){
        return npcs[id];
    }
}


function each(callback) {
    for(const i in npcs){
        callback(i, npcs[i]);
    }
}


function toArray() {
    const npcsArray = [];
    for(const i in npcs){
        npcsArray.push(npcs[i]);
    }
    return npcsArray;
}

function list() {
    return npcs;
}
