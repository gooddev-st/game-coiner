module.exports = Block;

const rooms = require('./rooms.js');

function Block(ID, room_id, x, y, width, height, character_id) {
    this.ID = ID;

    this.type = 'block'

    this.room_id = room_id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.character_id = character_id;
}


Block.prototype.isTouch = function(toucher){
    return (
        this.x < toucher.x + toucher.width
        &&
        this.x + this.width > toucher.x
        &&
        this.y < toucher.y + toucher.height
        &&
        this.height + this.y > toucher.y
    );
};


/**
 * Отфильтруем соприкоснувшихся из массива
 * @param players
 * @returns {Array}
 */
Block.prototype.filterTouchers = function(players){
    let touchers = [];

    for(let i in players){
        //Если разные комнаты, то не касаются
        if(this.room_id !== players[i].room_id) continue;

        if(this.isTouch(this, players[i])){
            touchers.push(players[i]);
        }
    }

    return touchers;
};


/**
 * Пересечение с вектором движения
 *  возвращает конечную точку движения
 * @param begin
 * @param end
 * @returns {boolean}
 */
Block.prototype.crossingWay = function(begin, end){
    let bar = {left: this.x, top: this.y, right: this.x+this.width, bottom: this.y+this.height};

    let beginInside = this.inside(begin.x, begin.y, bar),
        endInside = this.inside(end.x, end.y, bar);

    //Если нет пересечения - вернем end
    if(beginInside === endInside)
        return end;

    if(endInside){
        //левая граница
        //TODO: доделать

    }
};

/**
 * Проверка нахождения точки внутри блока
 * @param x
 * @param y
 * @param bar
 * @returns {boolean}
 */
Block.prototype.inside = function(x, y, bar) {
    return (x >= bar.left && x < bar.right && y >= bar.top && y < bar.bottom);
}


Block.prototype.info = function(){
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