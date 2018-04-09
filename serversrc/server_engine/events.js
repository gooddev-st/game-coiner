/**
 * События клиента/клиенту
 */
module.exports.init = init;
module.exports.one = emit;
module.exports.not_me = emit_not_to_me;
module.exports.common = emit_common_event;


const log = require("./log");
const players = require("./players");


let serverSocket = null;


function init(io) {
    serverSocket = io;
}


function emit(socket, eventName, type, data) {
    data.type = type;
    let json_data = JSON.stringify(data);

    socket.emit(eventName, json_data);
}


function emit_not_to_me(socket, eventName, type, data) {
    data.type = type;
    let json_data = JSON.stringify(data);

    socket.broadcast.emit(eventName, json_data);

    //Логируем сообщения у которых есть message
    data.message && log(data.message);
}


function emit_common_event(eventName, type, data) {
    data.type = type;
    let json_data = JSON.stringify(data);


    serverSocket.emit(eventName, json_data);

    //Логируем сообщения у которых есть message
    data.message && log(data.message);
}

module.exports.room = function (room_id, eventName, type, data) {
    players.each((playerID, player)=>{
        if(player.room_id===room_id){
            emit(player.socket, eventName, type, data);
        }
    });
};

module.exports.room_not_me = function (room_id, playerID, eventName, type, data) {
    players.each((ID, player)=>{
        if(player.room_id===room_id && ID!==playerID){
            emit(player.socket, eventName, type, data);
        }
    });
};