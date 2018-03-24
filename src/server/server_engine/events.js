/**
 * События клиента/клиенту
 */
module.exports.init = init;
module.exports.one = emit;
module.exports.not_me = emit_not_to_me;
module.exports.common = emit_common_event;


const log = require("./log.js");


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