const mysql = require('mysql2');
const moment = require('moment');
const log = require('./log');


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: 5,
});

/**
 * Обвязка для удобства
 * @param sql
 * @param props
 * @returns {Promise<any>}
 */
function query(sql, props) {

    return new Promise((resolve, reject)=>{

        // pool.query сам берет и возвращает соединение, ошибки подключения тоже попадают в err
        pool.query(sql, props, (err, res)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    });
}


/**
 * Создаем пользователя
 * @param account
 * @param avatarID
 */
module.exports.createUser = function (account, avatarID) {

    const data = {
        login: account.login,
        password: account.password,
        current_avatar: avatarID,
        lastvisit: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    query("INSERT INTO user SET ?", data)
        .then(()=>{})
        .catch((err)=>{
            log("Ошибка записи игрока "+data.ID);
            log(err);
        });
};


/**
 * Обновить время последнего визита пользователя
 * @param login
 */
module.exports.updateUser = function (login) {

    const lastvisit = moment().format("YYYY-MM-DD HH:mm:ss");

    query("UPDATE user SET lastvisit=? WHERE login=?", [lastvisit, login])
        .then(()=>{})
        .catch((err)=>{
            log("Ошибка обновления пользователя "+login);
            log(err);
        });
};


/**
 * Создаем аватар, возвращаем созданный id
 * @param data
 * @param callback
 */
module.exports.createAvatar = function(data, callback) {

    query("INSERT INTO avatar SET ?", data)
        .then((res)=>{
            callback(res.insertId);
        })
        .catch((err)=>{
            log("Ошибка создания аватара "+data.ID);
            log(err);
        });
};


module.exports.updateAvatar = function (data) {

    query("UPDATE avatar SET ? WHERE id=?", [data, data.id])
        .then(()=>{})
        .catch( (err)=>{

        log("Ошибка записи аватара "+data.ID);
        log(err);
    });
};


/**
 * Возвращает пользователя по login/password
 * @param account
 * @param callback
 */
module.exports.getUser = function(account, callback) {
    if(!account || !account.login || !account.password){
        log("Нет логина/пароля");
        callback([]);
        return;
    }

    query("SELECT\
          *\
        FROM user\
        WHERE login=?\
        AND password=?", [account.login, account.password])
        .then((res)=>{
            callback(res);
        })
        .catch((err)=> {
            log("Ошибка чтения игрока " + account.login);
            log(err);
            callback([]);
        });
};


/**
 * Возвращает аватара по id
 * @param id
 * @param callback
 */
module.exports.getAvatar = function (id, callback) {
    query("SELECT\
          *\
        FROM avatar\
        WHERE id=?", [id])
        .then((res)=>{
            callback(res);
        })
        .catch((err)=> {
            log("Ошибка чтения аватара " + id);
            log(err);
        });
};


/**
 * Статистика сервера
 * @param callback: function(info:object)
 */
module.exports.getStatistic = function(callback) {
    query("SELECT name AS ID, level, score FROM avatar ORDER BY score DESC LIMIT 10")
        .then((res)=>{
            callback(res);
        })
        .catch((err)=> {
            log("Ошибка чтения статистики ");
            log(err);
        });
};


/**
 * Есть ли пользователь с таким логином
 * @param login
 * @returns {Promise<boolean>}
 */
module.exports.userExists = function (login) {
    return query("SELECT id FROM user WHERE login=?", [login]).then((res) => res.length > 0);
};


const now = () => moment().format("YYYY-MM-DD HH:mm:ss");

const CHAT_FIELDS = "id, login, text, created_at, edited_at";


/**
 * Сообщения чата, новые - последними. beforeId - для подгрузки более старых
 * @returns {Promise<Array>}
 */
module.exports.chatHistory = function (beforeId, limit) {
    const where = beforeId ? "WHERE id < ?" : "",
        props = beforeId ? [beforeId, limit] : [limit];

    return query(`SELECT ${CHAT_FIELDS} FROM chat_message ${where} ORDER BY id DESC LIMIT ?`, props)
        .then((res) => res.reverse());
};


module.exports.chatAdd = function (login, text) {
    return query("INSERT INTO chat_message SET ?", {login, text, created_at: now()})
        .then((res) => module.exports.chatGet(res.insertId));
};


module.exports.chatGet = function (id) {
    return query(`SELECT ${CHAT_FIELDS} FROM chat_message WHERE id=?`, [id]).then((res) => res[0] || null);
};


/**
 * Правка своего сообщения. null - если сообщения нет или оно чужое
 */
module.exports.chatEdit = function (id, login, text) {
    return query("UPDATE chat_message SET text=?, edited_at=? WHERE id=? AND login=?", [text, now(), id, login])
        .then((res) => res.affectedRows ? module.exports.chatGet(id) : null);
};


/**
 * Удаление своего сообщения. false - если сообщения нет или оно чужое
 */
module.exports.chatDelete = function (id, login) {
    return query("DELETE FROM chat_message WHERE id=? AND login=?", [id, login])
        .then((res) => res.affectedRows > 0);
};
