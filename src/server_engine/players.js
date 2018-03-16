/**
 * Игроки
 */

module.exports.get = get;
module.exports.add = add;
module.exports.each = each;
module.exports.remove = remove;

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


function remove(playerID) {
    if(playerID in players) {
        delete players[playerID];
    }
}