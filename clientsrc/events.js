/**
 * События игры
 */
import account from "./account";

export default {init, add, on, off}

// Серверный сокет
import io from "socket.io-client";

import log from "./logs.js";

import ui from "./engine/ui/ui.js";

// Подключение к серверу
let serverSocket = null;


/**
 * Инитим игровые события
 */
function init() {
    if(!serverSocket) {
        serverSocket = io("http://server.games.q-dev.ru");
    }
    serverSocket.connect();

    // Действия при серверных проблемах
    serverSocket.on('connect_error', function () {
        log('Ошибка подключения к серверу');
    });


    serverSocket.on("disconnect", function () {
        log('от сервера поступил disconnect');
        log('Вы отключены от сервера');

        ui.waitScreen.show();

        setTimeout(function () {
            init();
        }, 500);
    });

}


const handlers = {};

/**
 * Добавление игрового события
 * @param eventName
 * @param data
 */
function add(eventName, data) {

    // Если есть локальные обработчики - вызовем
    runHandlers(eventName, data);

    // шлем событие на сервер
    serverSocket.emit(eventName, data)
}


function on(eventName, callback) {

    //Сохраним на случай если события возникнут локально
    if(eventName in handlers===false){
        handlers[eventName] = [];
    }
    handlers[eventName].push(callback);


    serverSocket.on(eventName, (data)=>{
        try{
            data = JSON.parse(data)
        }
        catch (e){}
        let type = data.type ? data.type : "simple";

        // Если в данных события есть поле message - выведем в лог
        data.message && log(data.message/* + ' (Событие '+event+'.'+type+')'*/);

        // Отладка событий без message
        // data.message || log(' (Событие '+event+'.'+type+')');

        callback(eventName, type, data);
    });
}

function off(eventName, handler) {
    if(eventName in handlers && handlers[eventName]===handler){
        delete handlers[eventName];
    }

    serverSocket.off(eventName, handler);
}


// Запуск для локальных событий
function runHandlers(eventName, data) {
    //Если есть обработчики - запускаем
    if(eventName in handlers){
        for(const h of handlers[eventName]){
            h(eventName, data);
        }
    }

    if(eventName==="signout"){
        account.signout();
    }


}