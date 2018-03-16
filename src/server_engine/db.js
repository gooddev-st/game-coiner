const mysql = require('mysql');

module.exports.save = save;
module.exports.get = get;

// console.log(process.env);

var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});


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

    connection.query("INSERT INTO users SET ?", d, function (err, res) {
        if(err){
            console.log("Ошибка записи игрока "+data.ID)
        }
        else{
            // console.log("user create")
        }
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

    const query = connection.query("UPDATE users SET ? WHERE ID=?", [d, d.ID], function (err, res) {
        if(err){
            console.log(err);

            console.log("Ошибка записи игрока "+data.ID)
            console.log(query.sql);
        }
        else{
            // console.log("user update")
        }
    });
}

function save(data) {

    get(data.ID, (err, res)=>{
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
    connection.query("SELECT * FROM users WHERE ID=?", [id], function (err, res, fields) {
        if(err){
            console.log("Ошибка записи игрока "+data.ID)
        }
        else{
            callback(err, res);
        }
    });
}