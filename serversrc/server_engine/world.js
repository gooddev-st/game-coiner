/**
 * Мир. Генерирует то, что для всех комнат - нпц
 */

const rooms = require("./rooms.js");
const npcs = require("./npcs.js");
const events = require('./events.js');

require('./constants')();


let NPCS_MAX_LIMIT = 100;

const NPC_COUNT = 0;

let generation_faza = 0.0;
let generation_interval = 5.0;


/**
 * Случайное положение в мире
 * width и height нужны, чтобы не вылазили за границы мира
 * @param width
 * @param height
 * @returns {{room_id, x: *, y: *}}
 */
function randomPlace(width, height){

    let
        roomsArray = rooms.toArray(),
        room_id = roomsArray[Math.floor(Math.random()*roomsArray.length)].ID;

    //Цели в финишной комнате - в стартовую
    if(room_id==='finish'){
        room_id = 'start';
    }

    let room = rooms.get(room_id);

    return {
        room_id: room_id,
        x: room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right - width),
        y: room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom - height),
    }
};


/**
 * Установки мира
 */
module.exports.init = function () {

};


module.exports.run = function () {

};


//Удаляем "мертвых"
module.exports.cleanUp = function () {

};