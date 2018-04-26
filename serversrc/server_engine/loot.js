/**
 * Лут
 */
//TODO: вынести базовый класс
module.exports = LootList;

const Coin = require("./loot/coin");
const Sack = require("./loot/sack");
const Kaktoos = require("./loot/kaktoos");



function LootList(namedPrefix){
    this.items = {};

    this.namedPrefix = namedPrefix;
    this.counter_for_naming = 0;

}

/**
 * Генерация имени лута
 * @type {number}
 */
LootList.prototype.getName = function () {
    this.counter_for_naming++;
    return (this.namedPrefix || 'item') + this.counter_for_naming;
};


LootList.prototype.add = function (loot_id, room_id, x, y, content) {


    let ID = this.getName();

    switch(loot_id){
        case "coin":
            this.items[ID] = new Coin(ID, room_id, x, y, content);
            break;
        case "sack":
            this.items[ID] = new Sack(ID, room_id, x, y, content);
            break;
        default:
            //TODO: убрать. Создавать только по типу
            this.items[ID] = new Coin(ID, room_id, x, y, 1);
            break;
    }

    return this.items[ID];
};


LootList.prototype.remove = function (id) {
    if (id in this.items) {
        delete this.items[id];
    }
};


LootList.prototype.get = function (id) {
    if (id in this.items) {
        return this.items[id];
    }
};


LootList.prototype.each = function (callback) {
    for (const i in this.items) {
        callback(i, this.items[i]);
    }
};


LootList.prototype.toArray = function () {
    const itemsArray = [];
    for (const i in this.items) {
        itemsArray.push(this.items[i]);
    }
    return itemsArray;
};


LootList.prototype.list = function () {
    return this.items;
};


LootList.prototype.size = function () {
    return Object.keys(this.items).length;
};


LootList.prototype.listInfo = function () {
    let itemsInfo = [];
    this.each((i, it)=>{
        itemsInfo.push(it.info());
    });
    return itemsInfo;
};


/**
 * Лут ближайший к позиции. Соответствующий условию
 * @param room_id
 * @param x
 * @param y
 * @param conditionFunc
 * @param self
 * @returns {*}
 */
LootList.prototype.nearest = function(room_id, x, y, conditionFunc, self) {

    let distances = [];

    // Соберем в массив всех подходящих мобов в этой комнате
    this.each((ID, item)=>{
        if(
            item.room_id===room_id &&
            (!conditionFunc || conditionFunc(item, self))
        ) {
            let
                xdiff = Math.abs(item.x - x),
                ydiff = Math.abs(item.y - y);

            distances.push({
                id: ID,
                // Расстояние до
                distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
                // Расположение
                pos: {x: item.x, y: item.y}
            });
        }
    });

    if(distances.length>0){

        // Найдем индекс минимального значения
        let min_index = distances.reduce(
            (prev, value, i, array) => {
                return value.distance < array[prev].distance ? i : prev;
            }, 0
        );

        return distances[min_index];
    }

    return null;
};
