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


function remove(playerID) {
    if(playerID in players) {
        delete players[playerID];
    }
}

function count() {
    return Object.keys(players).length;
}