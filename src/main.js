const express = require('express');
const app  = express();
const http = require('http').Server(app);
const io   = require('socket.io')(http);

//Отдаем статику (включая клиентские скрипты)
app.use(express.static('public'));

//Подключения
const sockets = [];
const players_sockets = [];

function emit_common_event(event_name, data) {
    for(let s of sockets) {
        s.emit(event_name, data);
    }
    console.log(data);
}

function log(message) {
    console.log(message);
}

//При новом подключении
io.on('connection', (socket) => {

    //Сохраним подключившегося
    sockets.push(socket);

    //Отправим приветствие
    socket.emit("hello", "Добро пожяловать на сервер игры в монеты");


    socket.on('disconnect', (data) => {
        sockets.splice(sockets.indexOf(socket), 1)
        emit_common_event('message', 'А кто ушел?');
    });

    socket.on('keydown', (data) => {
        log('Нажата клавиша '+data);
    });

    socket.on('keyup', (data) => {
        log('Клавиша '+data+' отжата');
    });
});

setInterval(function () {
    // emit_common_event('message', 'Прошла секунда');
}, 1000)

http.listen(3000, () => {
    console.log('Сервер слушает порт 3000');
});