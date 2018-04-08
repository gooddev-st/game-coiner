/**
 * Игроки
 */

module.exports.get = get;
module.exports.add = add;
module.exports.each = each;
module.exports.list = list;
module.exports.remove = remove;
module.exports.count = count;

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