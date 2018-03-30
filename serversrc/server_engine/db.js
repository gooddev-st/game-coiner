const mysql = require('mysql');

module.exports.save = save;
module.exports.get = get;
module.exports.getStatistic = getStatistic;


var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    connectionLimit: 100,
});


function query(sql, props) {

    return new Promise((resolve, reject)=>{

        pool.getConnection((err, connection)=>{

            connection.query(sql, props, (err, res)=>{
                if(err){
                    reject(err);
                    // return cb(err);
                }
                else{
                    resolve(res);
                    // return cb(res);
                }
            });

            connection.release()
        });
    });
}


function create(data) {

    query("INSERT INTO users SET ?", data)
        .then(()=>{})
        .catch((err)=>{
            console.log("Ошибка записи игрока "+data.ID)
            console.log(err);
        });
}

function update(data) {

    query("UPDATE users SET ? WHERE ID=?", [data, data.ID])
        .then(()=>{})
        .catch( (err)=>{

        console.log("Ошибка записи игрока "+data.ID)
        console.log(err);
    });
}

function save(data) {

    get(data.ID, (res)=>{

        const d = {
            ID: data.ID,

            room_id: data.room_id,
            x: data.x,
            y: data.y,

            score: data.score,
            level: data.level,

            character_id: data.character_id,

            coins_count: data.coins_count,
            health: data.health,

            speed: data.speed,

        };

        if(res.length){
            update(d);
        }
        else{
            create(d);
        }
    });
}

//
function get(id, callback) {
    query("SELECT * FROM users WHERE ID=?", [id])
        .then((res)=>{
            callback(res);
        })
        .catch((err)=> {
            console.log("Ошибка чтения игрока " + id);
            console.log(err);
        });
}

/**
 * Статистика сервера
 * @param callback: function(info:object)
 */
function getStatistic(callback) {
    query("SELECT ID, level, score FROM users ORDER BY score DESC LIMIT 10")
        .then((res)=>{
            callback(res);
        })
        .catch((err)=> {
            console.log("Ошибка чтения статистики ");
            console.log(err);
        });
}