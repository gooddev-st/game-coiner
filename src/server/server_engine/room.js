module.exports = Room;

const characters = require("./characters.js");
const rooms = require("./rooms.js");
const Coin = require("./loot.js");
const Teleport = require("./teleport.js");

const LOOT_COUNT = 30;

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

    this.randomLoot(LOOT_COUNT);
}

Room.prototype.randomLoot = function(num){
    let possible_chars = [
            characters.CHARACTER_COIN,
            characters.CHARACTER_COIN_SILVER,
            characters.CHARACTER_COIN_COPPER,
        ];

    for(let i = 0; i<num; i++){
        let x = this.dead_zone_left + Math.random()*(this.width - this.dead_zone_left - this.dead_zone_right),
            y = this.dead_zone_top + Math.random()*(this.height - this.dead_zone_top - this.dead_zone_bottom),
            character_id = possible_chars[Math.floor(Math.random()*possible_chars.length)];

        this.loot.push(new Coin(this.ID, x, y, character_id));
    }
};

Room.prototype.randomTeleports = function(num){
    let possible_chars = [
            characters.CHARACTER_TELEPORT,
        ];

    for(let i = 0; i<num; i++){
        let x = this.dead_zone_left + Math.random()*(this.width - this.dead_zone_left - this.dead_zone_right),
            y = this.dead_zone_top + Math.random()*(this.height - this.dead_zone_top - this.dead_zone_bottom),
            character_id = possible_chars[Math.floor(Math.random()*possible_chars.length)];

        let roomsArray = rooms.toArray(),
            room_id = roomsArray[Math.floor(Math.random()*roomsArray.length)].ID,
            room = rooms.get(room_id),
            target = {
                room_id: room_id,
                x: room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right),
                y: room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom),
            };

        this.teleports.push(new Teleport(this.ID, x, y, character_id, target));
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