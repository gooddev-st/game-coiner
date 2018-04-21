module.exports = Room;

const characters = require("../characters.js");
const rooms = require("../rooms.js");
const Cartoon = require("../cartoon.js");
const Coin = require("../loot/coin");
const Kaktoos = require("../loot/kaktoos");
const Gad = require("../loot/gad");
const Teleport = require("../teleport.js");
const events = require('../events.js');
const NpcsList = require('../npcs');

require('../constants')();


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
    5: {
        cartoonsSpriteset: characters.SPRITESET_CAMPFIRE,
    },
    6: {
        cartoonsSpriteset: characters.SPRITESET_CAMPFIRE,
    },
    7: {
        cartoonsSpriteset: characters.SPRITESET_BUSHS,
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

    this.npcs = new NpcsList();

    this.cartoons_num = settings.cartoons_num;
    this.teleports_num = settings.teleports_num;

    this.coins_max_limit = settings.coins_max_limit;
    this.coins_num = settings.coins_num;

    //Для генерации монет
    this.generation_faza = 0.0;
    this.generation_interval = settings.coins_generate_interval || COINS_GENERATE_INTERVAL;

    this.populations = settings.populations;

    this.randomLoot(this.coins_num);
    this.randomCartoons(this.cartoons_num);

    this.generateNpcs();
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


Room.prototype.randomTeleports = function(num){
    let possible_chars = [
            characters.CHARACTER_TELEPORT,
        ];

    for(let i = 0; i<num; i++){
        let pos = this.randomPos(70,30),
            character_id = possible_chars[Math.floor(Math.random()*possible_chars.length)];

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

        this.addTeleport(this.ID, pos.x, pos.y, character_id, target)
    }
};


/**
 * Добавить телепорт
 * @param room_id
 * @param x
 * @param y
 * @param character_id
 * @param target
 */
Room.prototype.addTeleport = function(room_id, x, y, character_id, target){

    this.teleports.push(new Teleport(room_id, x, y, character_id || characters.CHARACTER_TELEPORT, target));
};


Room.prototype.lootEach = function(callback){
    for(const i in this.loot){
        callback(i, this.loot[i]);
    }
};


Room.prototype.cartoonsEach = function(callback){
    for(const i in this.cartoons){
        callback(i, this.cartoons[i]);
    }
};

Room.prototype.lootInfo = function(){
    let lootInfo = [];
     this.lootEach((i, it)=>{
        lootInfo.push(it.info());
    });
    return lootInfo;
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


    //Рождаем мобов с заданным интервалом
    this.genNpcs();


    //Рождаем монеты
    this.genCoins();


    //Движем мобов
    this.npcs.each((ID, npc)=>{
        npc.run( this, STEP );
    });
};


Room.prototype.addCoin = function (x, y, content){

    let coin = new Coin(this.ID, x, y, content);
    this.loot.push(coin);

    events.room(this.ID, "room", "loot-create", {info: coin.info()});
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


//Генерим мобов
Room.prototype.generateNpcs = function (){

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
Room.prototype.genCoins = function () {

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
Room.prototype.genNpcs = function () {
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
    this.lootEach((i, it)=>{
        if(it.isDie()){
            this.loot.splice(i, 1);
            events.room(this.ID, "room", "loot-remove", {info: it.info()});
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
        width: this.width,
        height: this.height,
        environment_id: this.environment_id,
        entities_num: this.entities_num,
        cartoons: this.cartoons,
        loot: this.lootInfo(),
        teleports: this.teleportsInfo(),
        npcs: this.npcs.listInfo(),
    };
};
