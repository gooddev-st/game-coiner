module.exports = Room;

const characters = require("./characters.js");
const rooms = require("./rooms.js");
const Coin = require("./loot.js");
const Teleport = require("./teleport.js");
const events = require('./events.js');

require('./constants')();

function Room(settings) {
    this.ID = settings.ID;
    this.width = settings.width;
    this.height = settings.height;
    this.environment_id = settings.environment_id;
    this.dead_zone_left = settings.dead_zone_left;
    this.dead_zone_top = settings.dead_zone_top;
    this.dead_zone_right = settings.dead_zone_right;
    this.dead_zone_bottom = settings.dead_zone_bottom;

    this.loot = [];
    this.teleports = [];

    this.coins_num_max = settings.coins_num;
    this.coins_num = settings.coins_num;

    this.teleports_num = settings.teleports_num;

    //Генерация монет
    this.generation_faza = 0.0;
    this.generation_interval = 2.0;
    this.possible_chars = [
        characters.CHARACTER_COIN,
        characters.CHARACTER_COIN_SILVER,
        characters.CHARACTER_COIN_COPPER,
    ];

    this.randomLoot(this.coins_num);
}

Room.prototype.randomPos = function(width, height){
    return {
        x: this.dead_zone_left + Math.random() * (this.width - this.dead_zone_left - this.dead_zone_right - width),
        y: this.dead_zone_top + Math.random() * (this.height - this.dead_zone_top - this.dead_zone_bottom - height),
    }
};

Room.prototype.randomLoot = function(num){

    for(let i = 0; i<num; i++){
        let character_id = this.possible_chars[Math.floor(Math.random()*this.possible_chars.length)],
            pos = this.randomPos(44, 22);

        this.loot.push(new Coin(this.ID, pos.x, pos.y, character_id));
    }
};

Room.prototype.randomTeleports = function(num){
    let possible_chars = [
            characters.CHARACTER_TELEPORT,
        ];

    for(let i = 0; i<num; i++){
        let pos = this.randomPos(70,30),
            character_id = possible_chars[Math.floor(Math.random()*possible_chars.length)];

        let roomsArray = rooms.toArray(),
            room_id = roomsArray[Math.floor(Math.random()*roomsArray.length)].ID,
            room = rooms.get(room_id),
            target = {
                room_id: room_id,
                x: room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right),
                y: room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom),
            };

        this.teleports.push(new Teleport(this.ID, pos.x, pos.y, character_id, target));
    }
};

Room.prototype.lootEach = function(callback){
    for(const i in this.loot){
        callback(i, this.loot[i]);
    }
};

Room.prototype.teleportsEach = function(callback){
    for(const i in this.teleports){
        callback(i, this.teleports[i]);
    }
};


Room.prototype.run = function () {

    //По игровому таймеру
    if(this.generation_faza > this.generation_interval){
        this.generation_faza -= this.generation_interval;

        //Если не превышен лимит для комнаты
        if(this.loot.length < this.coins_num_max) {
            //Создаем монету
            let character_id = this.possible_chars[Math.floor(Math.random() * this.possible_chars.length)],
                pos = this.randomPos(44, 22);

            let coin = new Coin(this.ID, pos.x, pos.y, character_id);
            this.loot.push(coin);

            events.common("room", "loot-create", {info: coin.info()});
        }
    }
    this.generation_faza += STEP
};

//Удаляем "мертвые" монеты
Room.prototype.cleanUp = function () {
    this.lootEach((i, it)=>{
        if(it.isDie()){
            this.loot.splice(i, 1);
            events.common("room", "loot-remove", {info: it.info()});
        }
    });
};


Room.prototype.info = function(){
    return {
        ID: this.ID,
        width: this.width,
        height: this.height,
        environment_id: this.environment_id,
        loot: this.loot,
        teleports: this.teleports
    };
}