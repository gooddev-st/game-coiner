/**
 * События клиента/клиенту
 */
module.exports.one = emit;
module.exports.common = emit_common_event;


const log = require("./log.js");


function emit(socket, eventName, type, data) {
    data.type = type;
    let json_data = JSON.stringify(data);

    socket.emit(eventName, json_data);
}


function emit_common_event(socket, eventName, type, data, fromIO) {
    data.type = type;
    let json_data = JSON.stringify(data);

    fromIO || socket.broadcast.emit(eventName, json_data);
    fromIO && socket.emit(eventName, json_data);

    //Логируем сообщения у которых есть message
    data.message && log(data.message);
}