/**
 * Кактус
 */
module.exports = Kaktoos;

const characters = require("../characters");
const Loot = require("./loot");

const
    KAKTOOS_WIDTH = 31,
    KAKTOOS_HEIGHT = 30;

function Kaktoos(room_id, x, y, content) {

    if(content==undefined) content = 13;

    let character_id = characters.CHARACTER_KAKTOOS;

    switch (content){
        case 13:
            character_id = characters.CHARACTER_KAKTOOS;
            break;
        default:
            character_id = characters.CHARACTER_KAKTOOS;
            break;
    }

    Loot.call(this, room_id, x, y, character_id, 'kaktoos', KAKTOOS_WIDTH, KAKTOOS_HEIGHT, content);

}

Kaktoos.prototype = Object.create(Loot.prototype);
