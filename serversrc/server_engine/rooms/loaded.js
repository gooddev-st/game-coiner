/**
 * Загружаемая комната
 * (из Tile Map Editor)
 */

const fs = require('fs');
const path = require('path');
const log = require('../log');
module.exports = LoadedRoom;

const Room = require("./room");
const events = require('../events.js');

require("../constants")();


function LoadedRoom(settings) {
    Room.call(this, settings);

    this.mapFile = settings.file;

    this.isLoaded = false;

    this.width = 1300;
    this.height = 1400;

    this.bariers = [];

    this.coins_max_limit = settings.coins_max_limit;
    this.coins_num = settings.coins_num;

    //Для генерации монет
    this.generation_faza = 0.0;
    this.generation_interval = settings.coins_generate_interval || COINS_GENERATE_INTERVAL;

    //Популяции мобов
    this.populations = settings.populations;
}

LoadedRoom.prototype = Object.create(Room.prototype);

/**
 * Загрузка карты
 */
LoadedRoom.prototype.load = function (callback) {

    fs.readFile(
        path.resolve("../static/maps/", this.mapFile),
        "utf8",
        (err, data) => {

            let map;

            if(err){
                log('Ошибка загрузки комнаты');
                log(err);
                process.exit(err.errno);
                return;
            }
            try {
                map = JSON.parse(data);
            }
            catch (e){
                log('Ошибка разбора комнаты');
                log(e);
                process.exit(1);
            }

            //Разберем файл
            this.parseMap(map);

            this.isLoaded = true;

            callback();
        }
    );
};


LoadedRoom.prototype.parseMap = function (map) {
    this.width = map.width*map.tilewidth;
    this.height = map.height*map.tileheight;

    this.tileWidth = map.tilewidth;
    this.tileHeight = map.tileheight;

    let bariersLayer = map.layers.find((it, i)=>{
        return (it.type==="objectgroup" && it.name==="bariers" && it.objects);
    });


    //Преграды
    if(bariersLayer){
        for(let i in bariersLayer.objects){
            let bar = bariersLayer.objects[i];

            this.bariers.push({left: bar.x, top: bar.y, right: bar.x+bar.width, bottom: bar.y+bar.height});
        }
    }
};


LoadedRoom.prototype.initialize = function () {

    let target = {
        room_id: PLAYER_START_ROOM,
        x: PLAYER_START_X,
        y: PLAYER_START_Y,
    };

    this.load(()=>{

        this.randomLoot(this.coins_num);
        // this.addCartoons(this.cartoons_num);

        this.generateNpcs();
    });




    if(this.ID==='finish'){
        //На стартовую
        this.addTeleport( 3000, 750, null, target, 'normal');
    }
    else {
        //На стартовую
        this.addTeleport(50, 100, null, target, 'normal');
        if(this.ID!=='labirint') {
            this.addTeleport(142, 100, null, {room_id: 'labirint', x: 400, y: 400}, 'normal');
        }
        else{
            this.addTeleport(142, 100, null, {room_id: 'glade', x: 400, y: 400}, 'normal');
        }
    }

};


LoadedRoom.prototype.info = function(){
    const infoData = Room.prototype.info.call(this);
    infoData.map_file = this.mapFile;
    return infoData;
};





/**
 * Случайная позиция на карте (с учетом размера спрайта, чтоб не выпирал)
 * @param width - ширина размещаемого спрайта
 * @param height - высота размещаемого спрайта
 * @returns {{x: *, y: *}}
 */
LoadedRoom.prototype.randomPos = function(width, height){
    return {
        x: this.dead_zone_left + Math.random() * (this.width - this.dead_zone_left - this.dead_zone_right - width),
        y: this.dead_zone_top + Math.random() * (this.height - this.dead_zone_top - this.dead_zone_bottom - height),
    }
};



LoadedRoom.prototype.randomLoot = function(num, width, height){

    let lootWidth = width==undefined ? 44 : width,
        lootHeight = height==undefined ? 22 : height,
        content, pos;

    for(let i = 0; i<num; i++){
        content = 1 + Math.floor(Math.random()*5);//Случайная стоимость от 1 до 5
        pos = this.randomPos(lootWidth, lootHeight);

        //TODO: выталкивать лут с барьеров

        this.loot.add('coin', this.ID, pos.x, pos.y, content);
    }

    /*for(let i = 0; i<num; i++){
        let content = 13,// + Math.floor(Math.random()*5),
            pos = this.randomPos(41, 40);

        this.loot.add('kaktoos', this.ID, pos.x, pos.y, content);
    }*/
};





//Генерим мобов
LoadedRoom.prototype.generateNpcs = function (){

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


LoadedRoom.prototype.update = function (){
    //Рождаем мобов с заданным интервалом
    this.genNpcs();


    //Рождаем монеты
    this.genCoins();

    Room.prototype.update.call(this);
};





//Порождаем монеты с заданным интервалом
LoadedRoom.prototype.genCoins = function () {

    if(this.generation_faza > this.generation_interval){
        this.generation_faza -= this.generation_interval;

        //Если не превышен лимит для комнаты
        if(this.loot.size() < this.coins_max_limit) {

            //Создаем монету
            let content = 1 + Math.floor(Math.random()*5),
                pos = this.randomPos(44, 22);

            let coin = this.loot.add('coin', this.ID, pos.x, pos.y, content);

            events.room(this.ID, "room", "loot-create", {info: coin.info()});
        }
    }
    this.generation_faza += STEP;
};


//Порождаем мобов с заданным интервалом
LoadedRoom.prototype.genNpcs = function () {
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