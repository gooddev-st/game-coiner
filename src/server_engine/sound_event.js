/**
 * Добавим звуковое событие
 * @param ID - событие "eat1", "eat2"
 * @param room_id - комната события
 * @param x - расположение события
 * @param y - расположение события
 */
exports.add = function(ID, room_id, x, y){
    // if(ID in known){
        events.push({ID: ID, room_id: room_id, x: x, y: y});
    // }
};

/**
 * Массив с событиями
 * @returns {Array}
 */
exports.list = function () {
    return events;
};

exports.reset = function () {
    events = [];
};


var events = [];

const known = [
    "eat1",
    "eat2",
];
