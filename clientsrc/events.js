/**
 * События игры
 */
import log from "./logs.js";

import io from "socket.io-client";

import ui from "./engine/ui/ui.js";

import signIn from "./scenes/signin";


export default {init, add, on, off, disconnect}

// Подключение к серверу
let serverSocket = null;

let logged = false;


/**
 * Инитим игровые события
 */
function init(callback) {

    //Подключимся к серверу
    if(!serverSocket) {
        serverSocket = io("http://server.games.q-dev.ru");
    }

    log('Подключаемся к серверу');
    serverSocket.connect();

    on("server", (eventName, type, data)=>{

        if (type === "hello") {
            //Если ещё не вошли
            if (!logged) {

                if(data.version && data.version <= 0.19) {

                    //Получаем от пользователя аккаунт
                    signIn.start(function (account) {

                        // отправим аккаунт серверу
                        add('login', account);

                        //После успешного входа (Если неуспешный - сервер опять пошлет hello)
                        on('logged', (eventName, type, data) => {
                            if (type === 'success') {
                                logged = true;
                                off('logged');
                                callback();
                            }
                        });
                    });

                }
                else{
                    ui.waitScreen.show('Жми Ctrl-F5');
                }
            }
        }

    });

    // Действия при серверных проблемах
    serverSocket.on('connect_error', function () {
        log('Ошибка подключения к серверу');
    });


    serverSocket.on("disconnect", function () {
        log('от сервера поступил disconnect');
        log('Вы отключены от сервера');

        ui.waitScreen.show();
        logged = false;

        setTimeout(function () {
            init(callback);
        }, 1000);
    });


    on("another-coming", () => {
        log('Вы отключены от сервера');

        //TODO: Вместо экрана ожидания - Окно с кнопкой - подключиться - по которой init(callback);
        ui.waitScreen.show();
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
}


function disconnect() {
    serverSocket.close();
}