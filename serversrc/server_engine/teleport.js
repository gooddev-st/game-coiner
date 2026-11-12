module.exports = Teleport;

const rooms = require('./rooms.js');
require('./constants')();

const
    WIDTH = 70,
    HEIGHT = 50,
    // Сколько секунд игрок должен простоять центром на телепорте, чтобы его перенесло. Проход насквозь короче
    STAND_TIME = 0.5;

function Teleport(room_id, x, y, character_id, target, type) {
    this.ID = 'teleport'+Math.floor(Math.random()*65536);
    this.type = type || 'random';

    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.width = WIDTH;
    this.height = HEIGHT;
    this.state = 'default';

    this.workTime = 0;

    this.character_id = character_id;

    this.target = {
        room_id: target.room_id,
        x: target.x,
        y: target.y
    };

    this.changed = true;

    // Сколько уже стоят на телепорте: ID игрока -> секунды
    this.standing = new Map();
}

Teleport.prototype.run = function(step){

    let oldState = this.state;

    if(this.workTime>0){
        this.workTime -= step;
        this.state = 'run';
    }

    if(this.workTime <= 0 && this.state==='run'){

        this.workTime = 0;

        this.state = 'default';

        if(this.type==='random' && this.room_id!=='finish') {
            //По деактивации - изменим цель на случайную
            this.randomizeTarget();
        }
    }

    if(this.state !== oldState){
        this.changed = true;
    }
};


Teleport.prototype.randomizeTarget = function(){
    let roomsArray = rooms.toArray(),
        room_id = roomsArray[Math.floor(Math.random() * roomsArray.length)].ID;

    //Цели в финишной комнате - в стартовую
    if(room_id==='finish'){
        room_id = 'start';
    }

    let room = rooms.get(room_id),
        pos = room.randomPos(this.width, this.height);

    // В загружаемых комнатах не выходим внутри препятствия
    if (room.correctPosition) {
        room.correctPosition(pos, this.width, this.height);
    }

    this.target = {
        room_id: room_id,
        x: pos.x,
        y: pos.y,
    };
};


Teleport.prototype.info = function(){
    return {
        ID: this.ID,
        room_id: this.room_id,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        state: this.state,
        touched: this.changed,
        character_id: this.character_id,
        target: this.target
    }
};

//Определение соприкосновения с игроками
Teleport.prototype.touch = function(players){
    let touchers = [];

    for(let i in players){
        //Если разные комнаты, то не касаются
        if(this.room_id !== players[i].room_id) continue;

        if(isStanding(this, players[i])){
            touchers.push(players[i]);
        }
    }

    // Сошедших с телепорта забываем
    const standing = new Map();
    for (const player of touchers) {
        standing.set(player.ID, (this.standing.get(player.ID) || 0) + STEP);
    }
    this.standing = standing;

    if(touchers.length===0) return;

    //Переместим тех, кто простоял достаточно
    for(let i in touchers){

        //Если телепорт активен
        if(this.workTime<=0 && this.standing.get(touchers[i].ID) >= STAND_TIME) {

            // Переместим
            touchers[i].teleport(this);
            this.standing.delete(touchers[i].ID);

            this.workTime = 3.0; //деактивируем на 3 секунды

        }
    }

    this.changed = true;
};


// Центр игрока внутри телепорта (y у объектов - нижний край)
function isStanding(item, player){
    const x = player.x + player.width / 2,
        y = player.y - player.height / 2;

    return item.x < x && x < item.x + item.width && item.y - item.height < y && y < item.y;
}