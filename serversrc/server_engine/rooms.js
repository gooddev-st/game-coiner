/**
 * Комнаты
 */
module.exports.get = get;
module.exports.each = each;
module.exports.toArray = toArray;


const Room = require("./room.js");
const characters = require("./characters");
require('./constants.js')();


const rooms = {
    'start': new Room({
        ID: 'start',
        width: 2000,
        height: 2000,

        environment_id: 1,
        entities_num: 30,

        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 100,
        coins_max_limit: 100,
        coins_generate_interval: 0.3,

        teleports_num: 6,
        cartoons_num: 20,

        populations: {
            'gob': {maxNum:20, interval: 20.0},
            'prof': {maxNum:5, interval: 10.0},
        },
    }),

    'forest': new Room({
        ID: 'forest',
        width: 2000,
        height: 2000,

        environment_id: 0,
        entities_num: 250,

        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 30,
        coins_max_limit: 30,
        coins_generate_interval: 2.0,

        teleports_num: 4,
        cartoons_num: 100,

        populations: {
            'gob': {maxNum:2, interval: 10.0},
            'skeleton': {maxNum:12, interval: 10.0},
            'doc': {maxNum:1, interval: 30.0},
        },
    }),

    'hell': new Room({
        ID: 'hell',
        width: 800,
        height: 800,

        environment_id: 2,
        entities_num: 100,

        dead_zone_left: 10,
        dead_zone_top: 60,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 25,
        coins_max_limit: 145,
        coins_generate_interval: 0.4,

        teleports_num: 1,
        cartoons_num: 10,

        populations: {
            'kroko': {maxNum:3, interval: 10.0},
            'koil': {maxNum:3, interval: 7.0},
        },
    }),

    'paradise': new Room({
        ID: 'paradise',
        width: 400,
        height: 3000,

        environment_id: 3,
        entities_num: 100,

        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 30,
        coins_max_limit: 30,
        coins_generate_interval: 0.5,

        teleports_num: 4,
        cartoons_num: 10,

        populations: {
            'juk': {maxNum:6, interval: 10.0},
        },
    }),

    'pandora': new Room({
        ID: 'pandora',
        width: 3000,
        height: 400,

        environment_id: 4,
        entities_num: 3000,

        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 30,
        coins_max_limit: 30,
        coins_generate_interval: 2.0,

        teleports_num: 4,
        cartoons_num: 10,

        populations: {
            'gunner': {maxNum:8, interval: 10.0},
        },
    }),

    'tartar': new Room({
        ID: 'tartar',
        width: 3000,
        height: 3000,

        environment_id: 5,
        entities_num: 750,

        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 260,
        coins_max_limit: 260,
        coins_generate_interval: 1.0,

        teleports_num: 15,
        cartoons_num: 130,

        populations: {
            'skeleton': {maxNum:20, interval: 30.0},
            'dead': {maxNum:20, interval: 30.0},
            'mag': {maxNum:20, interval: 30.0},
        },
    }),

    'finish': new Room({
        ID: 'finish',
        width: 3000,
        height: 200,

        environment_id: 6,
        entities_num: 0,

        dead_zone_left: 10,
        dead_zone_top: 10,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 0,
        coins_max_limit: 0,
        coins_generate_interval: 20.0,

        teleports_num: 1,
        cartoons_num: 0,
    }),
};

//Рандомные телепорты
for(const i in rooms){

    //Кроме телепорта из финишной комнаты
    if(i==='finish'){
        let target = {
            room_id: PLAYER_START_ROOM,
            x: PLAYER_START_X,
            y: PLAYER_START_Y,
        };

        //Из финишной - один - в стартовую
        rooms[i].addTeleport('finish', rooms[i].width - 100, 100, null, target)
    }
    else {
        rooms[i].randomTeleports(rooms[i].teleports_num);
    }
}

function get(room_id){
    if(room_id in rooms){
        return rooms[room_id];
    }

    return false;
}


function each(callback) {
    for(const i in rooms){
        callback(i, rooms[i]);
    }
}


function toArray() {
    const roomsArray = [];
    for(const i in rooms){
        roomsArray.push(rooms[i]);
    }
    return roomsArray;
}
