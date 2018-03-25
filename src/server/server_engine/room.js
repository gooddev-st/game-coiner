module.exports = Room;

const characters = require("./characters.js");
const rooms = require("./rooms.js");
const Cartoon = require("./cartoon.js");
const Coin = require("./loot.js");
const Teleport = require("./teleport.js");
const events = require('./events.js');

require('./constants')();


const ENVIRONMENTS = {
    0: {
        cartoonsSpriteset: characters.SPRITESET_BELWOOD,
    },
    1: {
        cartoonsSpriteset: characters.SPRITESET_DESERT,
    },
    2: {
        cartoonsSpriteset: characters.SPRITESET_BELWOOD,
    },
    3: {
        cartoonsSpriteset: characters.SPRITESET_BUSHS,
    },
    4: {
        cartoonsSpriteset: characters.SPRITESET_BELWOOD,
    },
};


function Room(settings) {
    this.ID = settings.ID;

    this.width = settings.width;
    this.height = settings.height;

    this.environment_id = settings.environment_id;
    this.entities_num = settings.entities_num;

    this.dead_zone_left = settings.dead_zone_left;
    this.dead_zone_top = settings.dead_zone_top;
    this.dead_zone_right = settings.dead_zone_right;
    this.dead_zone_bottom = settings.dead_zone_bottom;

    this.cartoons = [];
    this.loot = [];
    this.teleports = [];

    this.cartoons_num = settings.cartoons_num;
    this.teleports_num = settings.teleports_num;

    this.coins_max_limit = settings.coins_max_limit;
    this.coins_num = settings.coins_num;

    //Для генерации монет
    this.generation_faza = 0.0;
    this.generation_interval = settings.coins_generate_interval || COINS_GENERATE_INTERVAL;
    this.possible_coins_chars = [
        characters.CHARACTER_COIN,
        characters.CHARACTER_COIN_SILVER,
        characters.CHARACTER_COIN_COPPER,
    ];

    this.randomLoot(this.coins_num);
    this.randomCartoons(this.cartoons_num);
}

Room.prototype.randomPos = function(width, height){
    return {
        x: this.dead_zone_left + Math.random() * (this.width - this.dead_zone_left - this.dead_zone_right - width),
        y: this.dead_zone_top + Math.random() * (this.height - this.dead_zone_top - this.dead_zone_bottom - height),
    }
};

Room.prototype.randomCartoons = function(num){
    let spriteset = ENVIRONMENTS[this.environment_id].cartoonsSpriteset;

    for(let i = 0; i<num; i++){
        let sprite_id = Math.floor(Math.random()*spriteset.size),
            pos = this.randomPos(44, 22);

        this.cartoons.push(new Cartoon(this.ID, pos.x, pos.y, spriteset.ID, sprite_id));
    }
};

Room.prototype.randomLoot = function(num){

    for(let i = 0; i<num; i++){
        let character_id = this.possible_coins_chars[Math.floor(Math.random()*this.possible_coins_chars.length)],
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
        if(this.loot.length < this.coins_max_limit) {

            //Создаем монету
            let character_id = this.possible_coins_chars[Math.floor(Math.random() * this.possible_coins_chars.length)],
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
        entities_num: this.entities_num,
        cartoons: this.cartoons,
        loot: this.loot,
        teleports: this.teleports
    };
}