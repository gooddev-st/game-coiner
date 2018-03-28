/**
 * Игра в монеты
 * - Серверная часть
 */

module.exports.run = run;

//Константы
require('./constants.js')();

const Player = require('./player.js');
const events = require('./events.js');
const sound_event = require('./sound_event.js');//звуковые события

const world = require('./world.js');
const rooms = require('./rooms.js');
const npcs = require('./npcs.js');
const players = require("./players.js");//,// игроки
const effects = require("./effects.js");

const db = require('./db.js');

const log = require("./log.js");


    var mainTimer = null;


function run(io){

    events.init(io);

    world.setup();

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
            let data;

            if(res.length>0){
                data = res[0];
            }
            else{
                //Для нового игрока
                data = {
                    x: PLAYER_START_X,
                    y: PLAYER_START_Y,
                    room_id: PLAYER_START_ROOM,

                    score: 0,
                    level: 1,

                    character_id: false, //Выдаст случайный
                    speed: PLAYER_START_SPEED,

                    coins_count: 0,

                    health: PLAYER_START_HEALTH,
                };
            }

            player = new Player( login, socket, data );

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

        //Мир "живет"
        world.cleanUp();
        world.run();

        //Комнаты "живут"
        rooms.each((room_id, room)=>{
            room.cleanUp();
            room.run();
        });

        //Соберем цели воздействия
        const targets = Object.assign( {},

            players.list(),//игроки
            npcs.list()//мобы

        );

        //Применим к ним эффекты
        for(let i=0;i<effects.size(); i++){

            let effect = effects.shift();
            if(effect!=undefined) {
                effect.attach(targets);
            }
        }

        //Движем плееров
        players.each((playerID, player)=>{
            player.run( rooms.get(player.room_id) );
        });

        //Движем мобов
        npcs.each((ID, npc)=>{
            npc.run( rooms.get(npc.room_id), STEP );
        });

        //Проверим как там монеты
        rooms.each((room_id, room)=>{
            room.lootEach((id, loot)=>{

                loot.touch(
                    Object.assign( {},

                        players.list(),
                        npcs.list()

                    ),
                    room);
            });
        });

        //Проверим как там телепорты
        rooms.each((room_id, room)=>{
            room.teleportsEach((id, teleport)=>{

                teleport.run(STEP);

                teleport.touch( Object.assign({},

                    players.list(),
                    npcs.list()

                    ),
                    room);
            });
        });

        //Шлем информацию о плеерах
        players.each((playerID, player)=>{

            if(player.changed) {
                //самому
                events.one(player.socket, "hero", "hero-info", {info: player.allInfo()});

                //остальным только общую
                events.not_me(player.socket, "room", "player-info", {info: player.commonInfo()});
                player.changed = false;

            }
        });

        //Шлем информацию о мобах
        npcs.each((ID, npc)=>{

            if(npc.changed) {

                events.common("room", "npc-info", {info: npc.info()});
                npc.changed = false;

            }
        });


        //Шлем информацию о монетах
        rooms.each((room_id, room)=> {
            room.lootEach((id, loot) => {
                if (loot.changed) {
                    events.common("room", "loot-info", {info: loot.info()});
                    loot.changed = false;
                }
            });
        });


        //Шлем информацию о телепортах
        rooms.each((room_id, room)=> {
            room.teleportsEach((id, teleport) => {
                if (teleport.changed) {
                    events.common("room", "teleport-info", {info: teleport.info()});
                    teleport.changed = false;
                }
            });
        });

        //Шлем информацию о звуковых событиях
        let evs = sound_event.list();
        for(let i in evs){
            events.common("sound", "notice", {info: evs[i]});
        }
        sound_event.reset();



    }, INTERVAL);


    // Периодическая отсылка статистики
    this.statisticTimer = setInterval(_=>{
        db.getStatistic((info)=>{
            events.common("server", "statistic", {info: info});
        });

    }, 10000);
}


//Остановка ( из админ-панели, если будет:) )
function stop(){
    clearInterval(this.mainTimer);
    clearInterval(this.statisticTimer);
}
