const events = require("./events");

module.exports = Coin;

const
    COIN_WIDTH = 44,
    COIN_HEIGHT = 22;

function Coin(room_id, x, y, character_id) {

    //TODO: Потенциальная проблема. Может и совпасть
    this.ID = 'loot'+Math.floor(Math.random()*65536);

    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.width = COIN_WIDTH;
    this.height = COIN_HEIGHT;

    this.character_id = character_id;

    this.changed = true;

    //Признак "удалите меня"
    this.die = false;
}

Coin.prototype.info = function(){
    return {
        ID: this.ID,
        room_id: this.room_id,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        touched: this.changed,
        character_id: this.character_id
    }
}

//Определение соприкосновения с объектом(монетой)
Coin.prototype.touch = function(players, room){
    let touchers = [];

    for(let i in players){
        //Если разные комнаты, то не касаются
        if(this.room_id != players[i].room_id) continue;

        if(isTouch(this, players[i])){
            touchers.push(players[i]);
        }
    }

    if(touchers.length==0) return;

    //Если коснулись - засчитаем монету
    let winner = 0;
    //если коснулись более одного - разыграем
    if(touchers.length>1){
        winner = Math.floor(Math.random()*touchers.length);
    }
    touchers[winner].eating(this);

    //Пометим на удаление
    this.die = true;
};


Coin.prototype.isDie = function() {
    return this.die;
};


function isTouch(coin, player){
    if (
        coin.x < player.x + player.width
        &&
        coin.x + coin.width > player.x
        &&
        coin.y < player.y + player.height
        &&
        coin.height + coin.y > player.y
    ) {
        return true;
    }
    return false;
}