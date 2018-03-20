/**
 * Игра в монеты
 * - Серверная часть
 */

module.exports.run = run;

const rooms = require('./rooms.js');
const npcs = require('./npcs.js');
const Player = require('./player.js');
// const Coin = require('./loot.js');
const sound_event = require('./sound_event.js');//звуковые события

// const characters = require('./characters.js');
const events = require('./events.js');

const db = require('./db.js');

const log = require("./log.js");

const
    FPS = 30,
    INTERVAL = 1000/FPS, //в миллисекундах
    STEP = INTERVAL/1000;//в секундах

const
    PLAYER_START_X = 1000,
    PLAYER_START_Y = 1000;


    var cio = null;
        mainTimer = null,
        players = require("./players.js");//,// игроки

function run(io){
    cio = io;

    start();

    //При новом подключении игрока
    io.on('connection', (socket) => {

        let player = null;

        events.one(socket, "server", "hello", {type: "hello", message: "Добро пожаловать на сервер игры в монеты"});

        socket.on('login', (playerID) => {


            login(playerID, socket, (playerID, addedPlayer) => {
                player = addedPlayer;
            });

        });

        socket.on('disconnect', () => {
            if(player)
            {
                logout(player.ID);
            }

        });
    });
}


//логин
function login(login, socket, callback) {
    let player;

    // Если есть с таким логином - отдаем этого
    if(player = players.get(login)){

        //Старого дисконектим
        events.one(player.socket, 'payer', 'disconnected', {message: "Кто-то вошел с тем же логином"});
        player.socket.disconnect(true);

        //Пристегиваем к плееру новый сокет
        player.reset(socket);

        callback(login, player);
    }
    else{

        //Посмотрим в БД
        db.get(login, (res)=>{
            if(res.length>0){
                const data = res[0];
                player = new Player(
                    login, socket, data.x, data.y,
                    data.room_id, data.coins_count, data.level, data.levelupCounter,
                    data.character_id,
                    data.speed
                );
            }
            else{
                player = new Player(login, socket, PLAYER_START_X, PLAYER_START_Y, 'paradise');
            }
            players.add(login, player);

            // log('создан новый ' + name + '. ' + socket.id);
            db.save(player.allInfo());

            callback(login, player);
        });

    }
}


function logout(login) {
    let player;


    if(player = players.get(login)){

        player.destroy();

        players.remove(login);
    }
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
        players.each((playerID, player)=>{
            player.run( rooms.get(player.room_id), STEP );
        });

        //Движем мобов
        npcs.each((ID, npc)=>{
            npc.run( rooms.get(npc.room_id), STEP );
        });

        //Проверим как там монеты
        //TODO: добавить мобов к поедальщикам
        rooms.each((room_id, room)=>{
            room.lootEach((id, loot)=>{
                loot.touch(players.list(), room);
            });
        });
        rooms.each((room_id, room)=>{
            room.lootEach((id, loot)=>{
                loot.touch(npcs.list(), room);
            });
        });

        //Проверим как там телепорты
        rooms.each((room_id, room)=>{
            room.teleportsEach((id, teleport)=>{
                teleport.touch(players.list(), room);
            });
        });
        rooms.each((room_id, room)=>{
            room.teleportsEach((id, teleport)=>{
                teleport.touch(npcs.list(), room);
            });
        });

        //Шлем информацию о плеерах
        players.each((playerID, player)=>{

            if(player.changed) {
                //самому
                events.one(player.socket, "hero", "hero-info", {info: player.allInfo()});

                //остальным только общую
                events.common(player.socket, "room", "player-info", {info: player.commonInfo()});
                player.changed = false;

            }
        });

        //Шлем информацию о мобах
        npcs.each((ID, npc)=>{

            if(npc.changed) {

                events.common(cio, "room", "npc-info", {info: npc.info()}, true);
                npc.changed = false;

            }
        });


        //Шлем информацию о монетах
        rooms.each((room_id, room)=> {
            room.lootEach((id, loot) => {
                if (loot.changed) {
                    events.common(cio, "room", "loot-info", {info: loot.info()}, true);
                    loot.changed = false;
                }
            });
        });


        //Шлем информацию о телепортах
        rooms.each((room_id, room)=> {
            room.teleportsEach((id, teleport) => {
                if (teleport.changed) {
                    events.common(cio, "room", "teleport-info", {info: teleport.info()}, true);
                    teleport.changed = false;
                }
            });
        });

        //Шлем информацию о звуковых событиях
        let evs = sound_event.list();
        for(let i in evs){
            events.common(cio, "sound", "notice", {info: evs[i]}, true);
        }
        sound_event.reset();



    }, INTERVAL)
}


//Остановка ( из админ-панели, если будет:) )
function stop(){
    clearInterval(this.mainTimer);
}
