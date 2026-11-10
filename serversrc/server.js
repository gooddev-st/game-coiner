const game_server = require('./server_engine/game');


const {Server} = require('socket.io');

// Клиент загружается с другого хоста, поэтому разрешаем подключения с любого origin
const io = new Server(3000, {cors: {origin: '*'}});

game_server.run(io);

console.log('Сервер работает');