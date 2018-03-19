/**
 * Комнаты
 */
module.exports.get = get;
module.exports.each = each;
module.exports.toArray = toArray;


const Room = require("./room.js");


const rooms = {
    'start-room': new Room({
        ID: 'start-room',
        width: 3000,
        height: 4000,
        environment_id: 1,
        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,
    }),

    'paradise': new Room({
        ID: 'paradise',
        width: 2000,
        height: 3000,
        environment_id: 0,
        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,
    }),

    'sonnorack': new Room({
        ID: 'sonnorack',
        width: 600,
        height: 600,
        environment_id: 2,
        dead_zone_left: 10,
        dead_zone_top: 80,
        dead_zone_right: 10,
        dead_zone_bottom: 0,
    }),
};

for(const i in rooms){
    rooms[i].randomTeleports(6);
}

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


function toArray() {
    const roomsArray = [];
    for(const i in rooms){
        roomsArray.push(rooms[i]);
    }
    return roomsArray;
}
