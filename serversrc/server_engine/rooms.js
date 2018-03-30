/**
 * Комнаты
 */
module.exports.get = get;
module.exports.each = each;
module.exports.toArray = toArray;


const Room = require("./room.js");


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

        coins_num: 200,
        coins_max_limit: 100,
        coins_generate_interval: 0.3,

        teleports_num: 26,
        cartoons_num: 20,
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

        teleports_num: 10,
        cartoons_num: 100,
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

        teleports_num: 3,
        cartoons_num: 10,
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

        coins_num: 0,
        coins_max_limit: 0,
        coins_generate_interval: 20.0,

        teleports_num: 30,
        cartoons_num: 130,
    }),
};

for(const i in rooms){
    rooms[i].randomTeleports(rooms[i].teleports_num);
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
