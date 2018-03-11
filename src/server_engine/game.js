/**
 * Игра в монеты
 * - Серверная часть
 */
module.exports.run = run;

const Player = require('./player.js');
const Coin = require('./loot.js');
const sound_event = require('./sound_event.js');//звуковые события

const characters = require('./characters.js');


const log = function (msg) {
    console.log(msg);
};

const
    FPS = 30,
    INTERVAL = 1000/FPS, //в миллисекундах
    STEP = INTERVAL/1000;//в секундах

const
    LOOT_COUNT = 30;

const
    PLAYER_START_X = 1000,
    PLAYER_START_Y = 1000;


    var cio = null;
        mainTimer = null,
        players = [],//только игроки
        loots = [];//лут

function run(io){
    cio = io;

    generateLoots(0, LOOT_COUNT);

    start();

    //При новом подключении игрока
    io.on('connection', (socket) => {
        var player = null;

        emit(socket, "server", "hello", {type: "hello", message: "Добро пожаловать на сервер игры в монеты"});

        socket.on('login', (name) => {
            // log('попытка логина ' + name);
            if (player) return;

            // Если есть с таким логином - отдаем
            // TODO: авторизация будет тут
            if(name in players){
                player = players[name];

                //Если кто-то вошел с тем же логином - старого дисконектим
                emit(player.socket, 'payer', 'disconnected', {message: "Кто-то вошел с тем же логином"})
                player.socket.disconnect(true);

                player.reset(socket);
            }
            else{
                // Логина нет? - создади игрока с таким логином
                // TODO: регистрация будет тут
                player = new Player(name, socket, PLAYER_START_X, PLAYER_START_Y, 0);
                players[name] = player;
                // log('создан новый ' + name + '. ' + socket.id);
            }

            //Отправим героя
            emit(player.socket, "player", "hero-create", {info: player.allInfo(), message: "Создаем героя "+player.ID});


            //Отправим комнату, в которой герой
            let room = getRoom(player.room_id);
            emit(player.socket, "room", "change", {room: room, message: "Выдана Комната"});


            //Отправим игроков. Которые в Онлайн. В той же комнате. Кроме самого
            for (let i in players) {
                let p = players[i];
                 if(p.online && p.ID != player.ID && p.room_id == player.room_id) {
                    emit(player.socket, "room", "player-create", {info: p.commonInfo()});
                }
            }
            emit(player.socket, "player", "info", {message: "Выданы игроки"});


            //Отправим лут. В той же комнате
            for (let i in loots) {
                let l = loots[i];
                 if(l.room_id == player.room_id) {
                    emit(player.socket, "room", "loot-create", {info: l.info()});
                }
            }
            emit(player.socket, "player", "info", {message: "Выдан лут"});


            //Заявим, что пришел игрок
            emit_common_event(socket, "room", "player-create", {info: player.commonInfo(), message: "Пришел игрок[" + player.ID + "]"});

            socket.on('keydown', (key_name) => {
                switch(key_name){

                    case "left":
                        player.controller.left = true;
                        break;
                    case "up":
                        player.controller.up = true;
                        break;
                    case "right":
                        player.controller.right = true;
                        break;
                    case "down":
                        player.controller.down = true;
                        break;
                }
                // log('Нажата клавиша '+key_name);
            });

            socket.on('keyup', (key_name) => {
                switch(key_name){
                    case "left":
                        player.controller.left = false;
                        break;
                    case "up":
                        player.controller.up = false;
                        break;
                    case "right":
                        player.controller.right = false;
                        break;
                    case "down":
                        player.controller.down = false;
                        break;
                }
                // log('Клавиша '+key_name+' отжата');
            });

            socket.on('target', (target) => {
                if(
                    !target ||
                    (target.x == player.x && target.y == player.y)
                ){
                    player.controller.target = null;
                }
                else{
                    player.controller.target = target;
                }
            });

        });

        socket.on('disconnect', () => {
            if(player)
            {
                player.online = false;
                // players.splice(players.indexOf(player), 1);
                emit_common_event(socket, "room", "player-leave", {ID: player.ID, message: "Игрок["+player.ID+"] покинул этот мир"});
            }
        });
    });
}

/**
 * Запуск основного цикла
 */
function start(){

    this.mainTimer = setInterval(function () {

        /*
         * Основной цикл
         */

        //Движем плееров
        for(let i in players){
            let player = players[i];
            player.run( getRoom(player.room_id), STEP );
        }

        //Проверим как там монеты
        for(let i in loots){
            let loot = loots[i];
            loot.touch(players, getRoom(loot.room_id));
        }

        //Шлем информацию о плеерах
        for(let i in players){
            let player = players[i];
            if(player.changed) {
                //самому
                emit(player.socket, 'player', "hero-info", {info: player.allInfo()});

                //остальным только общую
                emit_common_event(player.socket, "room", "player-info", {info: player.commonInfo()});
                player.changed = false;
            }
        }

        //Шлем информацию о монетах
        for(let i in loots){
            let loot = loots[i];
            if(loot.changed) {
                emit_common_event(cio, "room", "loot-info", {info: loot.info()}, true);
                loot.changed = false;
            }
        }

        //Шлем информацию о звуковых событиях
        let events = sound_event.get();
        for(let i in events){
            emit_common_event(cio, "sound", "notice", {info: events[i]}, true);
        }
        sound_event.reset();



    }, INTERVAL)
}

//Остановка ( из админ-панели, если будет:) )
function stop(){
    clearInterval(this.mainTimer);
}

function getRoom(room_id){
    switch (room_id) {
        case 1:
            return {
                ID: 'room1',
                width: 3000,
                height: 3000,
                environment_id: 1,
                dead_zone_left: 40,
                dead_zone_top: 40,
                dead_zone_right: 40,
                dead_zone_bottom: 40,
            };
        default:
            return {
                ID: 'room0',
                width: 2000,
                height: 2000,
                environment_id: 0,
                dead_zone_left: 40,
                dead_zone_top: 40,
                dead_zone_right: 40,
                dead_zone_bottom: 40,
            };
    }
}

function generateLoots(room_id, num) {
    let room = getRoom(room_id),
        posible_chars = [
            characters.CHARACTER_COIN,
            characters.CHARACTER_COIN_SILVER,
            characters.CHARACTER_COIN_COPPER,
        ];

    for(let i = 0; i<num; i++){
        let x = room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right),
            y = room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom),
            character_id = posible_chars[Math.floor(Math.random()*posible_chars.length)];

        loots.push(new Coin(room_id, x, y, character_id));
    }
}

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

    data.message && log(data.message);
}