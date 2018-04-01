/**
 * Пользователь
 */
module.exports = User;

require('./constants.js')();

const Player = require("./player");
const players = require("./players");

const events = require("./events.js");

/**
 * User - Пользователь
 * @param account
 * @param socket
 * @param data
 * @constructor
 */
function User(account, socket, data) {

    this.login = account.login;
    this.password = account.password;
    this.socket = socket;

    this.avatarID = data ? data.current_avatar : null;

    this.avatar = null;
}


User.prototype.makeAvatar = function (avatarData) {

    //Не пересоздаем
    if(this.avatar){
        return;
    }

    this.avatar = new Player( this.avatarID, this.login, this.socket, avatarData );

};



/**
 * Сброс при подключении другого пользователя
 * @param socket
 */
User.prototype.reset = function (socket) {
    this.socket = socket;

    this.avatar && this.avatar.reset();
};
