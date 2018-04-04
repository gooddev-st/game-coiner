/**
 * Мир. Генерирует то, что для всех комнат - нпц
 */

const rooms = require("./rooms.js");
const npcs = require("./npcs.js");
const events = require('./events.js');

require('./constants')();


let NPCS_MAX_LIMIT = 300;

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

    // Создаем несколько мобов для начала
    for(let i=0;i<NPC_COUNT;i++) {

        //TODO: Рандомить позицию по создаваемому мобу
        let pos = randomPlace(44, 22);
        npcs.add(pos.room_id, pos.x, pos.y);
    }
};


module.exports.run = function () {

    //По игровому таймеру
    if(generation_faza > generation_interval){
        generation_faza -= generation_interval;

        //Если не превышен лимит
        if(npcs.toArray().length < NPCS_MAX_LIMIT) {

            //Создаем моба
            let pos = randomPlace(44, 22),
                room = rooms.get(pos.room_id),
                npc = npcs.add(pos.room_id, pos.x, pos.y, room.possible_npc_chars);

            events.common("room", "npc-create", {info: npc.info()});
        }
    }
    generation_faza += STEP
};


//Удаляем "мертвых"
module.exports.cleanUp = function () {
    npcs.each(function(i, it){
        if(it.isDie()){
            it.onDie();
            npcs.remove(it.ID);
            events.common("room", "npc-remove", {info: it.info()});
        }
    });
};