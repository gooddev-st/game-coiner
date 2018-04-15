/**
 * Игроки
 */

module.exports.get = get;
module.exports.add = add;
module.exports.each = each;
module.exports.list = list;
module.exports.remove = remove;
module.exports.count = count;
module.exports.nearest = nearest;

const players = {};


function get(playerID) {

    if(playerID in players) {
        return players[playerID];
    }

    return false;

}


function add(playerID, player) {
    players[playerID] = player;
}


function each(callback) {
    for(const playerID in players){
        callback(playerID, players[playerID]);
    }
}


function list() {
    return players;
}


module.exports.listInRoom = function(room_id, playerID) {
    if(this.count()) {
        let playersInRoom = {};
        for(let id in players){
            if(players[id].room_id === room_id && id!==playerID){
                playersInRoom[id] = players[id].commonInfo();
            }
        }
        return playersInRoom;
    }
    return {};
};


function remove(playerID) {
    if(playerID in players) {
        delete players[playerID];
    }
}

function count() {
    return Object.keys(players).length;
}


/**
 * Игрок ближайший к позиции. Соответствующий условию
 * @param room_id
 * @param x
 * @param y
 * @param conditionFunc
 * @returns {*}
 */
function nearest(room_id, x, y, conditionFunc) {

    let distances = [];

    // Соберем в массив всех игроков в этой комнате
    each((ID, player)=>{
        if(
            player.room_id===room_id &&
            (!conditionFunc || conditionFunc(player))
        ) {
            let
                xdiff = Math.abs(player.x - x),
                ydiff = Math.abs(player.y - y);

            distances.push({
                //Игрок
                id: ID,
                // Расстояние до игрока
                distance: Math.sqrt(xdiff * xdiff + ydiff * ydiff),
                // Его расположение
                pos: {x: player.x, y: player.y}
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
}