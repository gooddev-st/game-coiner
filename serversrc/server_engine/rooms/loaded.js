module.exports = LoadedRoom;

const Room = require("./room");
const Coin = require("../loot/coin");
const Cartoon = require("../cartoon");
const rooms = require("../rooms");
const events = require('../events.js');
const ENVIRONMENTS = require("./environments");


function LoadedRoom(settings) {
    Room.call(this, settings);

    this.entities_num = settings.entities_num;

    this.cartoons_num = settings.cartoons_num;
    this.teleports_num = settings.teleports_num;

    this.coins_max_limit = settings.coins_max_limit;
    this.coins_num = settings.coins_num;

    //Для генерации монет
    this.generation_faza = 0.0;
    this.generation_interval = settings.coins_generate_interval || COINS_GENERATE_INTERVAL;

    //Популяции мобов
    this.populations = settings.populations;

    this.randomLoot(this.coins_num);
    this.randomCartoons(this.cartoons_num);

    this.generateNpcs();
}

RandomRoom.prototype = Object.create(Room.prototype);


RandomRoom.prototype.initialize = function () {
    this.randomTeleports(this.teleports_num);
};

/**
 * Случайная позиция на карте (с учетом размера спрайта, чтоб не выпирал)
 * @param width - ширина размещаемого спрайта
 * @param height - высота размещаемого спрайта
 * @returns {{x: *, y: *}}
 */
RandomRoom.prototype.randomPos = function(width, height){
    return {
        x: this.dead_zone_left + Math.random() * (this.width - this.dead_zone_left - this.dead_zone_right - width),
        y: this.dead_zone_top + Math.random() * (this.height - this.dead_zone_top - this.dead_zone_bottom - height),
    }
};


RandomRoom.prototype.randomCartoons = function(num){
    let spriteset = ENVIRONMENTS[this.environment_id].cartoonsSpriteset;

    for(let i = 0; i<num; i++){
        let sprite_id = Math.floor(Math.random()*spriteset.size),
            pos = this.randomPos(44, 22);

        this.cartoons.push(new Cartoon(this.ID, pos.x, pos.y, spriteset.ID, sprite_id));
    }
};


RandomRoom.prototype.randomLoot = function(num){

    for(let i = 0; i<num; i++){
        let content = 1 + Math.floor(Math.random()*5),
            pos = this.randomPos(44, 22);

        this.loot.push(new Coin(this.ID, pos.x, pos.y, content));
    }

    /*for(let i = 0; i<num; i++){
        let content = 13,// + Math.floor(Math.random()*5),
            pos = this.randomPos(41, 40);

        this.loot.push(new Kaktoos(this.ID, pos.x, pos.y, content));
    }*/
};


RandomRoom.prototype.randomTeleports = function(num){

    for(let i = 0; i<num; i++){
        let pos = this.randomPos(70,30);

        let roomsArray = rooms.toArray(),
            room_id = roomsArray[Math.floor(Math.random()*roomsArray.length)].ID;

        //Цели в финишной комнате - в стартовую
        if(room_id==='finish'){
            room_id = 'start';
        }

        let
            room = rooms.get(room_id),
            target = {
                room_id: room_id,
                x: room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right),
                y: room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom),
            };

        this.addTeleport(pos.x, pos.y, null, target)
    }
};


RandomRoom.prototype.run = function () {


    //Рождаем мобов с заданным интервалом
    this.genNpcs();


    //Рождаем монеты
    this.genCoins();


    //Движем мобов
    this.npcs.each((ID, npc)=>{
        npc.run( this, STEP );
    });
};


//Генерим мобов
RandomRoom.prototype.generateNpcs = function (){

    if(!this.populations) return;

    //Все виды мобов
    for(let character_id in this.populations){

        //До максимального количества
        for(let i=0; i<this.populations[character_id].maxNum;i++){
            let pos = this.randomPos(100, 100);
            this.npcs.add(this.ID, pos.x, pos.y, character_id);
        }

        //Отметим сколько их теперь
        this.populations[character_id].num = this.populations[character_id].maxNum;
        //Инитим таймер рождений
        this.populations[character_id].faza = this.populations[character_id].maxNum;
    }
};


//Порождаем монеты с заданным интервалом
RandomRoom.prototype.genCoins = function () {

    if(this.generation_faza > this.generation_interval){
        this.generation_faza -= this.generation_interval;

        //Если не превышен лимит для комнаты
        if(this.loot.length < this.coins_max_limit) {

            //Создаем монету
            let content = 1 + Math.floor(Math.random()*5),
                pos = this.randomPos(44, 22);

            let coin = new Coin(this.ID, pos.x, pos.y, content);
            this.loot.push(coin);

            events.room(this.ID, "room", "loot-create", {info: coin.info()});
        }
    }
    this.generation_faza += STEP;
};


//Порождаем мобов с заданным интервалом
RandomRoom.prototype.genNpcs = function () {
    if(!this.populations) return;

    if(Object.keys(this.populations).length===0) return;

    //Для каждого типа
    for(let character_id in this.populations) {

        let character = this.populations[character_id];

        //По игровому таймеру. Предполагается, что не больше одного за тик
        if (character.faza > character.interval) {
            character.faza -= character.interval;

            //Если не превышен лимит
            if (character.num < character.maxNum) {

                //Создаем моба
                let pos = this.randomPos(44, 22),
                    npc = this.npcs.add(this.ID, pos.x, pos.y, character_id);
                character.num++;

                events.room(this.ID, "room", "npc-create", {info: npc.info()});
            }
        }
        character.faza += STEP;
    }
};


RandomRoom.prototype.info = function(){
    const infoData = Room.prototype.info.call(this);
    infoData.entities_num = this.entities_num;
    return infoData;
};
