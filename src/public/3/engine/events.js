/**
 * События игры
 */
import account from "../account";

export default {init, add}

// Серверный сокет
import io from "socket.io-client";

import log from "../logs.js";
import units from "../units";
import ui from "./ui/ui";

// Подключение к серверу
let serverSocket = null;


/**
 * Инитим игровые события
 * @param game
 * @param eventHandler
 */
function init(game, eventHandler) {
    serverSocket = io();

    // Действия при серверных проблемах
    serverSocket.on('connect_error', function () {
        log('Ошибка подключения к серверу');
    });


    serverSocket.on("disconnect", function () {
        log('от сервера поступил disconnect');
        log('Вы отключены от сервера');

        //TODO: удалять обработчики событий

        units.reset();
        game.loots = {};
        game.hero = null;

        ui.waitScreen.show();

        setTimeout(function () {
            init(game, eventHandler);
        }, 500);
    });


    // События отправляемые в основной обработчик
    for(let event of ["server", "room", "hero", "sound", "reconnect"]) {

        serverSocket.on(event, function(data){
            try{
                data = JSON.parse(data)
            }
            catch (e){}
            let type = data.type ? data.type : "simple";

            eventHandler(game, event, type, data);
        });
    }

}


/**
 * Добавление игрового события
 * @param eventName
 * @param data
 */
function add(eventName, data) {

    if(eventName=="signout"){
        account.signout();
    }

    // шлем событие на сервер
    serverSocket.emit(eventName, data)
}