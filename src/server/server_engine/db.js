const mysql = require('mysql');

module.exports.save = save;
module.exports.get = get;


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
    const d = {
        ID: data.ID,
        character_id: data.character_id,
        coins_count: data.coins_count,
        level: data.level,
        levelupCounter: data.levelupCounter,

        speed: data.speed,

        room_id: data.room_id,
        x: data.x,
        y: data.y

    };

    query("INSERT INTO users SET ?", d)
        .then(()=>{})
        .catch((err)=>{
            console.log("Ошибка записи игрока "+data.ID)
            console.log(err);
        });
}

function update(data) {
    const d = {
        ID: data.ID,
        character_id: data.character_id,
        coins_count: data.coins_count,
        level: data.level,
        levelupCounter: data.levelupCounter,

        speed: data.speed,

        room_id: data.room_id,
        x: data.x,
        y: data.y

    };

    query("UPDATE users SET ? WHERE ID=?", [d, d.ID])
        .then(()=>{})
        .catch( (err)=>{

        console.log("Ошибка записи игрока "+data.ID)
        console.log(err);
    });
}

function save(data) {

    get(data.ID, (res)=>{
        if(res.length){
            update(data);
        }
        else{
            create(data);
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