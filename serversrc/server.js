const game_server = require('./server_engine/game');


const io   = require('socket.io').listen(3000);

game_server.run(io);

console.log('Сервер работает');