/**
 * Игроки
 */

const users = {};

/**
 *
 * @param id
 * @returns User
 */
module.exports.get = function(id) {

    if(id in users) {
        return users[id];
    }

    return false;

};


module.exports.add = function(id, player) {
    users[id] = player;
};


module.exports.each = function (callback) {
    for(const id in users){
        callback(id, users[id]);
    }
};


module.exports.list = function () {
    return users;
};


module.exports.remove = function (id) {
    if(id in users) {
        delete users[id];
    }
};

module.exports.count = function () {
    return Object.keys(users).length;
};
