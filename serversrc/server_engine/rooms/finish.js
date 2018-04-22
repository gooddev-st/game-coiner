module.exports = FinishRoom;

const Room = require("./room");
require('../constants')();


function FinishRoom(settings) {
    Room.call(this, settings);
}

FinishRoom.prototype = Object.create(Room.prototype);

FinishRoom.prototype.initialize = function (){
    let target = {
        room_id: PLAYER_START_ROOM,
        x: PLAYER_START_X,
        y: PLAYER_START_Y,
    };

    //Из финишной - один - в стартовую
    this.addTeleport(this.width - 100, 100, null, target);
};


