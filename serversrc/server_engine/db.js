const mysql = require('mysql2');
const moment = require('moment');
const log = require('./log');


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: 100,
});

/**
 * Обвязка для удобства
 * @param sql
 * @param props
 * @returns {Promise<any>}
 */
function query(sql, props) {

    return new Promise((resolve, reject)=>{

        pool.getConnection((err, connection)=>{

            connection.query(sql, props, (err, res)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            });

            connection.release()
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
        log(account.login);
        callback([]);
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