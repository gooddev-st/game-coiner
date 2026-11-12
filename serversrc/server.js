const http = require('http');
const game_server = require('./server_engine/game');


const {Server} = require('socket.io');

const PORT = Number(process.env.PORT) || 3000;
// Без HOST слушаем все интерфейсы (нужно в Docker), на VPS за nginx - 127.0.0.1
const HOST = process.env.HOST || undefined;

const httpServer = http.createServer();

// Клиент загружается с другого хоста, поэтому разрешаем подключения с любого origin
const io = new Server(httpServer, {cors: {origin: '*'}});

game_server.run(io);

httpServer.listen(PORT, HOST, () => {
    console.log('Сервер работает');
});
