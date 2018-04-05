/**
 * Игра в монеты
 * - Серверная часть
 */

module.exports.run = run;

//Константы
require('./constants.js')();

const User = require('./user');
const events = require('./events.js');
const sound_event = require('./sound_event.js');//звуковые события

const world = require('./world.js');
const rooms = require('./rooms.js');
const npcs = require('./npcs.js');
const users = require("./users"); //Пользователи
const players = require("./players.js");//,// игроки
const effects = require("./effects.js");

const db = require('./db.js');

const log = require("./log.js");


    var mainTimer = null;


/**
 * Старт игры
 * @param io
 */
function run(io) {

    events.init(io);

    world.init();

    start();

    //При новом подключении
    io.on('connection', (socket) => {

        let user = null;

        //Отправим приветствие (уведомление об ожидании логина)
        events.one(socket, "server", "hello", {message: "Добро пожаловать на сервер игры в монеты"});

        //При получении логина
        socket.on('login', (account) => {

            login(account, socket, (addedUser, message) => {
                user = addedUser;

                db.updateUser(user.login);

                events.one(socket, "logged", "success", {message: message});

                //При получении запроса на аватара
                socket.on('need-avatar', _ => {


                    //"Покажем" аватара клиенту
                    user.avatar.init();

                    players.add(user.avatar.ID, user.avatar);
                });
            });

        });

        socket.on('disconnect', () => {
            if (user) {
                db.updateUser(user.login);
                user.avatar && user.avatar.destroy();

                players.remove(user.avatar.ID);

                if(users.get(user.login)){
                    users.remove(user.login);
                }
            }

        });
    });
}


//логин
function login(account, socket, callback) {


    let user = users.get(account.login);

    // Если есть вошедший с таким логином и сокетом - отдаем этого
    if(user && socket===user.socket){

        callback(user, "пользователь уже авторизован");

    }
    else{

        //Посмотрим в БД такого пользователя (типа авторизация)
        db.getUser(account, (res)=>{
            let userData;

            //Если есть
            if(res.length>0){

                //Если уже вошли с таким акком и это не тот же
                // - дисконнектим старого и коннектим нового
                if(user){
                    events.one(user.socket, 'another-coming', 'simple', {message: "Кто-то вошел с тем же логином"});
                    user.socket.disconnect(true);

                    //Пристегиваем к пользователю новый сокет
                    user.reset(socket);
                }

                userData = {
                    current_avatar: res[0].current_avatar
                };

                user = new User( account, socket, userData );

                db.getAvatar(user.avatarID, (res)=>{
                    user.makeAvatar(res[0]);

                    users.add(account.login, user);

                    callback(user, "успешный вход");
                });
            }

            //Если нет - создадим и вернем
                //TODO: Тут можно сделать выбор аватара
            else{

                //Параметры нового аватара
                const avatarData = {
                    name: account.login,
                    character_id: false, //Выдаст случайный

                    coins_count: 0,

                    level: 1,
                    score: 0,

                    speed: PLAYER_START_SPEED,

                    room_id: PLAYER_START_ROOM,
                    x: PLAYER_START_X,
                    y: PLAYER_START_Y,

                    health: PLAYER_START_HEALTH,

                };

                log('Создадим аватара');
                log(avatarData);

                //Создадим аватара
                db.createAvatar(avatarData, (avatarID) => {

                    //Создадим пользователя
                    //TODO: тут можно бы ругаться на отсутствие игрока или уже существующий логин
                    db.createUser(account, avatarID);

                    userData = {
                        current_avatar: avatarID,
                    };

                    user = new User(account, socket, userData);

                    avatarData.ID = 'avatar'+avatarID;
                    user.makeAvatar(avatarData);

                    users.add(account.login, user);

                    log('создан новый пользователь: [' + account.login + ']');

                    callback(user, "создан новый пользователь");
                });

            }
        });

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
        const targets = Object.assign( {}, players.list() );//игроки

        rooms.each((room_id, room)=>{
            Object.assign( targets,
                room.npcs.list() //мобы
            );
        });

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


        //Проверим как там монеты
        rooms.each((room_id, room)=>{
            room.lootEach((id, loot)=>{

                loot.touch(targets, room);

            });
        });

        //Проверим как там телепорты
        rooms.each((room_id, room)=>{
            room.teleportsEach((id, teleport)=>{

                teleport.run(STEP);

                teleport.touch( players.list(), room);
            });
        });

        //Шлем информацию о плеерах
        //TODO: общую слать сразу обо всех измененных всем
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
        //TODO: слать сразу обо всех измененных всем
        rooms.each((room_id, room)=>{
            room.npcs.each((ID, npc)=>{

                if(npc.changed) {

                    events.common("room", "npc-info", {info: npc.info()});
                    npc.changed = false;

                }
            });
        });


        //Шлем информацию о монетах
        //TODO: слать сразу обо всех измененных всем
        rooms.each((room_id, room)=> {
            room.lootEach((id, loot) => {
                if (loot.changed) {
                    events.common("room", "loot-info", {info: loot.info()});
                    loot.changed = false;
                }
            });
        });


        //Шлем информацию о телепортах
        //TODO: слать сразу обо всех измененных всем
        rooms.each((room_id, room)=> {
            room.teleportsEach((id, teleport) => {
                if (teleport.changed) {
                    events.common("room", "teleport-info", {info: teleport.info()});
                    teleport.changed = false;
                }
            });
        });

        //Шлем информацию о звуковых событиях
        //TODO: слать сразу обо всех всем
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
