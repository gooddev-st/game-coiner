module.exports = Teleport;

const sound_event = require('./sound_event.js');//звуковые события

const
    WIDTH = 70,
    HEIGHT = 30;

function Teleport(room_id, x, y, character_id, target) {
    this.ID = 'teleport'+Math.floor(Math.random()*65536);

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
}

Teleport.prototype.run = function(step){

    let oldState = this.state;

    if(this.workTime>0){
        this.workTime -= step;
        this.state = 'run';
    }

    if(this.workTime <= 0){
        this.workTime = 0;
        this.state = 'default';
    }

    if(this.state !== oldState){
        this.changed = true;
    }
}


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
}

//Определение соприкосновения с игроками
Teleport.prototype.touch = function(players, room){
    let touchers = [];

    for(let i in players){
        //Если разные комнаты, то не касаются
        if(this.room_id != players[i].room_id) continue;

        if(isTouch(this, players[i])){
            touchers.push(players[i]);
        }
    }

    if(touchers.length==0) return;

    //Если коснулись - переместим коснувшихся
    for(let i in touchers){


        if(
            //Если моб (нет "счета")
            (touchers[i].score ==undefined &&
                //и телепорт никто не активировал
                this.workTime<=0) ||

            //или игрок от 4-го уровня
            (touchers[i].level>=4 &&
            //и телепорт никто не активировал
            this.workTime<=0) ||

            //или игрок меньше 4-го уровня
            (touchers[i].level<4 &&
                //и телепорт кто-то активировал
                this.workTime>0)
        ) {

            // Переместим
            touchers[i].teleport(this);

            this.workTime = 3.0; //Активируем на 3 секунды

        }
    }

    this.changed = true;
};


function isTouch(item, player){
    if (
        item.x < player.x + player.width
        &&
        item.x + item.width > player.x
        &&
        item.y < player.y + player.height
        &&
        item.height + item.y > player.y
    ) {
        return true;
    }
    return false;
}