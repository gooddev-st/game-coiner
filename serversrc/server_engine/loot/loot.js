/**
 * Лут
 */
module.exports = Loot;

const
    DEFAULT_LOOT_WIDTH = 44,
    DEFAULT_LOOT_HEIGHT = 22;

function Loot(ID, room_id, x, y, character_id, type, width, height, content) {

    this.ID = ID;

    this.type = type;

    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.width = width || DEFAULT_LOOT_WIDTH;
    this.height = height || DEFAULT_LOOT_HEIGHT;

    this.character_id = character_id;

    this.changed = true;

    this.content = content || 1;

    //Признак "удалите меня"
    this.die = false;
}

Loot.prototype.info = function(){
    return {
        ID: this.ID,
        room_id: this.room_id,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        character_id: this.character_id
    }
}

//Соприкосновение с "собирателями"
Loot.prototype.touch = function(players){
    let touchers = [];

    for(let i in players){
        //Если разные комнаты, то не касаются
        if(this.room_id !== players[i].room_id) continue;

        //Если "касателю" такой лут не нужен - не касаются
        if(!players[i].needed(this)) continue;

        if(isTouch(this, players[i])){
            touchers.push(players[i]);
        }
    }

    if(touchers.length===0) return;

    //Если коснулись - засчитаем монету
    let winner = 0;
    //если коснулись более одного - разыграем
    if(touchers.length>1){
        winner = Math.floor(Math.random()*touchers.length);
    }

    touchers[winner].eating(this);

    //Пометим на удаление
    this.kill();
};


Loot.prototype.kill = function() {
    this.die = true;
};


Loot.prototype.isDie = function() {
    return this.die;
};


function isTouch(coin, player){
    return coin.x < player.x + player.width
        &&
        coin.x + coin.width > player.x
        &&
        coin.y - coin.height < player.y
        &&
        coin.y > player.y - player.height;

}