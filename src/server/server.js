const express = require('express');
const app  = express();
const http = require('http').Server(app);
const io   = require('socket.io')(http);
const game_server = require('./server_engine/game');

http.listen(3000, () => {
    console.log('Сервер слушает порт 3000');
});

//Отдаем статику (включая клиентские скрипты)
app.use(express.static('../public'));

//Стартуем игру
game_server.run(io);