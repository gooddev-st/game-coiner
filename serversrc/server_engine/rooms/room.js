module.exports = Room;

const characters = require("../characters.js");
const Cartoon = require("../cartoon.js");
const Teleport = require("../teleport.js");
const events = require('../events.js');
const LootList = require('../loot.js');
const NpcsList = require('../npcs');

require('../constants')();


function Room(settings) {
    this.ID = settings.ID;
    this.type = settings.type;

    this.width = settings.width || 2000;
    this.height = settings.height || 2000;

    this.dead_zone_left = settings.dead_zone_left;
    this.dead_zone_top = settings.dead_zone_top;
    this.dead_zone_right = settings.dead_zone_right;
    this.dead_zone_bottom = settings.dead_zone_bottom;

    this.cartoons = [];
    this.loot = new LootList('loot');
    this.teleports = [];

    this.npcs = new NpcsList();

    this.environment_id = settings.environment_id;
}


/**
 * Инициализация комнаты
 * @param settings
 */
Room.prototype.initialize = function(){

};


/**
 * Добавить телепорт
 * @param room_id
 * @param x
 * @param y
 * @param character_id
 * @param target
 */
Room.prototype.addTeleport = function(x, y, character_id, target){

    this.teleports.push(new Teleport(this.ID, x, y, character_id || characters.CHARACTER_TELEPORT, target));
};


Room.prototype.lootEach = function(callback){
    this.loot.each(callback);
};


Room.prototype.cartoonsEach = function(callback){
    for(const i in this.cartoons){
        callback(i, this.cartoons[i]);
    }
};


Room.prototype.teleportsEach = function(callback){
    for(const i in this.teleports){
        callback(i, this.teleports[i]);
    }
};

Room.prototype.teleportsInfo = function(){
    let teleportsInfo = [];
     this.teleportsEach((i, it)=>{
        teleportsInfo.push(it.info());
    });
    return teleportsInfo;
};


Room.prototype.run = function () {

    //Движем мобов
    this.npcs.each((ID, npc)=>{
        npc.run( this, STEP );
    });
};


Room.prototype.addCoin = function (x, y, content){

    let coin = this.loot.add('coin', this.ID, x, y, content);

    events.room(this.ID, "room", "loot-create", {info: coin.info()});
};


Room.prototype.addSack = function (x, y, content){

    let item = this.loot.add('sack', this.ID, x, y, content);

    events.room(this.ID, "room", "loot-create", {info: item.info()});
};


Room.prototype.addCartoon = function (x, y, spriteset_id, sprite_id, lifeTime){

    if(!spriteset_id) {
        console.log('Пытаемся добавить картон с несуществующим spriteset_id')
    }
    if(!sprite_id) {
        sprite_id = 0;
    }

    let cartoon = new Cartoon(this.ID, x, y, spriteset_id, sprite_id, lifeTime);
    this.cartoons.push(cartoon);

    events.room(this.ID, "room", "cartoon-create", {info: cartoon.info()});
};


//Удаляем "мертвых"
Room.prototype.cleanUp = function () {

    //TODO: Удалаять одним событием всё

    let now = (new Date()).getTime();
    //Удаляем "мертвые" картонки
    this.cartoonsEach((i, it)=>{
        if(it.deathDateTime && it.deathDateTime <= now){
            this.cartoons.splice(i, 1);
            events.room(this.ID, "room", "cartoon-remove", {info: it.info()});
        }
    });

    //Удаляем "мертвые" монеты
    this.loot.each((i, it)=>{
        if(it.isDie()){

            events.room(this.ID, "room", "loot-remove", {info: it.info()});

            this.loot.remove(i);
        }
    });

    //Удаляем "мертвых" мобов
    this.npcs.each((i, it)=>{
        if(it.isDie()){
            it.onDie();
            this.npcs.remove(i);
            this.populations[it.character_id].num--;

            events.room(this.ID, "room", "npc-remove", {info: it.info()});

        }
    });
};


Room.prototype.info = function(){
    return {
        ID: this.ID,
        type: this.type,
        width: this.width,
        height: this.height,
        cartoons: this.cartoons,
        loot: this.loot.listInfo(),
        teleports: this.teleportsInfo(),
        npcs: this.npcs.listInfo(),
        environment_id: this.environment_id,
    };
};
