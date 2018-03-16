/**
 * Комнаты
 */
module.exports.get = get;
module.exports.each = each;


const Room = require("./room.js");


const rooms = {
    'start-room': new Room({
        ID: 'start-room',
        width: 3000,
        height: 3000,
        environment_id: 1,
        dead_zone_left: 40,
        dead_zone_top: 40,
        dead_zone_right: 40,
        dead_zone_bottom: 40,
    }),

    'paradise': new Room({
        ID: 'paradise',
        width: 2000,
        height: 2000,
        environment_id: 0,
        dead_zone_left: 40,
        dead_zone_top: 40,
        dead_zone_right: 40,
        dead_zone_bottom: 40,
    }),
};

function get(room_id){
    if(room_id in rooms){
        return rooms[room_id];
    }

    return rooms['paradise'];
}


function each(callback) {
    for(const i in rooms){
        callback(i, rooms[i]);
    }
}
