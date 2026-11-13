/**
 * События игры
 */
import log from "./logs.js";

import io from "socket.io-client";

import ui from "./engine/ui/ui.js";

import signIn from "./scenes/signin";

import account from "./account";


export default {init, add, on, off, disconnect, isKicked}

// Подключение к серверу
let serverSocket = null;

let logged = false;

// Ждём ввода логина, чтобы не открывать форму повторно на каждый hello
let signingIn = false;

// Вошли с тем же логином в другом окне - сами не переподключаемся, иначе окна выбивают друг друга
let kicked = false;

let onLogged = null;

// Событие входа: 'login' - в игру, 'chat-login' - только в чат (страница chat.html)
let loginEvent = 'login';


/**
 * Инитим игровые события. Обработчики сокета навешиваются один раз, переподключение делает socket.io
 */
function init(callback, event) {
    onLogged = callback;
    loginEvent = event || 'login';

    if (serverSocket) return;

    serverSocket = io(window.GAME_SERVER_URL || "http://server.games.q-dev.ru");

    log('Подключаемся к серверу');

    on("server", (eventName, type, data)=>{

        if (type !== "hello" || logged) return;

        if(!(data.version && data.version <= 0.19)) {
            ui.waitScreen.show('Жми Ctrl-F5');
            return;
        }

        if (signingIn) return;
        signingIn = true;

        //Получаем от пользователя аккаунт (из localStorage или через форму)
        signIn.start(function (account) {
            signingIn = false;

            // Пока вводили логин, соединение могло оборваться: тогда войдём по следующему hello
            if (serverSocket.connected) {
                add(loginEvent, account);
            }
        });
    });

    //После успешного входа (если неуспешный - сервер опять пошлет hello)
    on('logged', (eventName, type, data) => {
        if (type === 'success' && !logged) {
            logged = true;
            onLogged();
        }

        // Неверный пароль: сохраненный вход забываем и спрашиваем заново
        if (type === 'fail' && !logged && !signingIn) {
            account.signout();
            signingIn = true;

            signIn.start(function (account) {
                signingIn = false;

                if (serverSocket.connected) {
                    add(loginEvent, account);
                }
            }, data && data.message);
        }
    });

    on("another-coming", () => {
        kicked = true;
        ui.waitScreen.show('Вы вошли в другом окне. Обновите страницу, чтобы играть здесь');
    });

    // Действия при серверных проблемах
    serverSocket.on('connect_error', function () {
        log('Ошибка подключения к серверу');
    });

    serverSocket.on("disconnect", function (reason) {
        log('Вы отключены от сервера');

        logged = false;

        if (kicked) return;

        ui.waitScreen.show();

        // После обрыва сети socket.io переподключается сам, а после отключения сервером или клиентом (выход) - нет
        if (reason === 'io server disconnect' || reason === 'io client disconnect') {
            setTimeout(() => serverSocket.connect(), 1000);
        }
    });
}


// Обработчики по событиям. На сокет для каждого события вешается один слушатель, который их вызывает
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

    if(eventName in handlers===false){
        handlers[eventName] = [];

        serverSocket.on(eventName, (data) => dispatch(eventName, data));
    }
    handlers[eventName].push(callback);
}


// Событие с сервера - всем текущим обработчикам
function dispatch(eventName, data) {
    try{
        data = JSON.parse(data)
    }
    catch (e){}

    let type = data && data.type ? data.type : "simple";

    // Если в данных события есть поле message - выведем в лог
    data && data.message && log(data.message);

    // Копия: обработчик может отписаться во время вызова
    for (const h of [...handlers[eventName]]) {
        h(eventName, type, data);
    }
}


/**
 * Отписка. Без handler - от всех обработчиков события
 */
function off(eventName, handler) {
    if(eventName in handlers===false) return;

    handlers[eventName] = handler
        ? handlers[eventName].filter((value) => value !== handler)
        : [];
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


function isKicked() {
    return kicked;
}
