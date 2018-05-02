/**
 * Загружаемая комната
 * (из Tile Map Editor)
 */

const fs = require('fs');
const path = require('path');
const log = require('../log');
module.exports = LoadedRoom;

const Room = require("./room");
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

    // this.addLoot(this.coins_num);
    // this.addCartoons(this.cartoons_num);

    // this.addNpcs();
}

LoadedRoom.prototype = Object.create(Room.prototype);

/**
 * Загрузка карты
 */
LoadedRoom.prototype.load = function () {

    fs.readFile(
        path.resolve("../static/maps/", this.mapFile),
        "utf8",
        (err, data) => {

            let map;

            if(err){
                log(err);
                process.exit(err.errno);
                return;
            }
            try {
                map = JSON.parse(data);
            }
            catch (e){
                log(e);
                process.exit(1);
            }

            //Разберем файл
            this.parseMap(map);

            this.isLoaded = true;
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


    this.load();


    let target = {
        room_id: PLAYER_START_ROOM,
        x: PLAYER_START_X,
        y: PLAYER_START_Y,
    };

    //На стартовую
    this.addTeleport(50, 100, null, target, 'normal');
};


LoadedRoom.prototype.info = function(){
    const infoData = Room.prototype.info.call(this);
    infoData.map_file = this.mapFile;
    return infoData;
};