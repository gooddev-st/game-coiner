//Картонные декорации

module.exports = Cartoon;

function Cartoon(room_id, x, y, spriteset_id, sprite_id) {

    //TODO: Потенциальная проблема. Может и совпасть
    this.ID = 'cartoon'+Math.floor(Math.random()*65536);

    this.room_id = room_id;
    this.x = x;
    this.y = y;

    this.spriteset_id = spriteset_id;
    this.sprite_id = sprite_id;
}

Cartoon.prototype.info = function(){
    return {
        ID: this.ID,
        room_id: this.room_id,
        x: this.x,
        y: this.y,
        spriteset_id: this.spriteset_id,
        sprite_id: this.sprite_id
    }
};