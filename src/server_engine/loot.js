module.exports = Coin;

const
    COIN_WIDTH = 44,
    COIN_HEIGHT = 44;

function Coin(room_id, x, y, character_id) {
    this.ID = 'loot'+Math.floor(Math.random()*65536);

    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.width = COIN_WIDTH;
    this.height = COIN_HEIGHT;

    this.character_id = character_id;

    this.changed = true;
}
Coin.prototype.info = function(){
    return {
        ID: this.ID,
        room_id: this.room_id,
        x: this.x,
        y: this.y,
        character_id: this.character_id
    }
}

//Определение соприкосновения с объектом(монетой)
Coin.prototype.touch = function(players, room){
    let touchers = [];

    for(let i in players){
        if(isTouch(this, players[i])){
            touchers.push(players[i]);
        }
    }

    if(touchers.length==0) return;

    //Если коснулись - засчитаем монету и переместим
    let winner = 0;
    //если коснулись более одного - разыграем
    if(touchers.length>1){
        winner = Math.floor(Math.random()*touchers.length);
    }
    touchers[winner].coins_count++;

    //переместим (будто удалим и создадим новую)
    this.x = Math.floor(room.dead_zone_left + Math.random()*(room.width - room.dead_zone_left - room.dead_zone_right));
    this.y = Math.floor(room.dead_zone_top + Math.random()*(room.height - room.dead_zone_top - room.dead_zone_bottom));
    this.changed = true;
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