/**
 * Комнаты
 */
module.exports.get = get;
module.exports.each = each;
module.exports.toArray = toArray;


const Room = require("./rooms/room");
const RandomRoom = require("./rooms/random");
const LoadedRoom = require("./rooms/loaded");
const FinishRoom = require("./rooms/finish");
require('./constants.js')();


const roomsSettings = [
    {
        ID: 'start',
        type: 'random',
        width: 2000,
        height: 2000,

        environment_id: 1,
        entities_num: 30,

        dead_zone_left: 10,
        dead_zone_top: 65,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 50,
        coins_max_limit: 50,
        coins_generate_interval: 0.3,

        teleports_num: 6,
        cartoons_num: 20,

        populations: {
            'gob': {maxNum:5, interval: 20.0},
            'prof': {maxNum:1, interval: 10.0},
        },
    },

    {
        ID: 'forest',
        type: 'random',
        width: 2000,
        height: 2000,

        environment_id: 0,
        entities_num: 250,

        dead_zone_left: 10,
        dead_zone_top: 65,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 30,
        coins_max_limit: 30,
        coins_generate_interval: 2.0,

        teleports_num: 4,
        cartoons_num: 100,

        populations: {
            'gob': {maxNum:2, interval: 10.0},
            'skeleton': {maxNum:6, interval: 10.0},
            'doc': {maxNum:1, interval: 30.0},
        },
    },

    {
        ID: 'hell',
        type: 'random',
        width: 800,
        height: 800,

        environment_id: 2,
        entities_num: 100,

        dead_zone_left: 10,
        dead_zone_top: 10,
        dead_zone_right: 10,
        dead_zone_bottom: 10,

        coins_num: 25,
        coins_max_limit: 145,
        coins_generate_interval: 0.4,

        teleports_num: 1,
        cartoons_num: 10,

        populations: {
            'prof': {maxNum:1, interval: 100.0},
            'kroko': {maxNum:3, interval: 10.0},
            'koil': {maxNum:3, interval: 7.0},
        },
    },

    {
        ID: 'paradise',
        type: 'random',
        width: 1000,
        height: 3000,

        environment_id: 3,
        entities_num: 100,

        dead_zone_left: 10,
        dead_zone_top: 65,
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
    },

    {
        ID: 'pandora',
        type: 'random',
        width: 3000,
        height: 400,

        environment_id: 4,
        entities_num: 1000,

        dead_zone_left: 10,
        dead_zone_top: 10,
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
    },

    {
        ID: 'tartar',
        type: 'random',
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
        coins_generate_interval: 0.3,

        teleports_num: 15,
        cartoons_num: 130,

        populations: {
            'skeleton': {maxNum:5, interval: 5.0},
            'dead': {maxNum:5, interval: 5.0},
            'mag': {maxNum:5, interval: 5.0},
        },
    },

    {
        ID: 'sea',
        type: 'random',
        width: 3000,
        height: 3000,

        environment_id: 7,
        entities_num: 140,

        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,

        coins_num: 60,
        coins_max_limit: 60,
        coins_generate_interval: 0.3,

        teleports_num: 15,
        cartoons_num: 0,

        populations: {
            'darka': {maxNum: 15, interval: 5.0},
            'ork': {maxNum: 5, interval: 5.0},
            'elf': {maxNum: 5, interval: 5.0},
            'pirat': {maxNum: 5, interval: 5.0},
            // 'doc': {maxNum: 2, interval: 5.0},
        },
    },

    {
        ID: 'finish',
        type: 'finish',
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
    },

    {
        ID: 'glade',
        type: 'loaded',

        file: 'glade.json',

        coins_num: 10,
        coins_max_limit: 10,
        coins_generate_interval: 20.0,
    },
];

const rooms = {};


//Породим комнаты на основе настроек
for(const i in roomsSettings){

    let settings = roomsSettings[i];

    let type = settings.type || 'easy';
    switch (type) {
        case 'loaded':
            rooms[settings.ID] = new LoadedRoom(settings);
            break;
        case 'random':
            rooms[settings.ID] = new RandomRoom(settings);
            break;
        case 'finish':
            rooms[settings.ID] = new FinishRoom(settings);
            break;
        default:
            rooms[settings.ID] = new Room(settings);
            break;
    }
}


//Инитим комнаты (После того как список комнат готов)
for(const i in rooms){

    rooms[i].initialize();
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
