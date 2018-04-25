/**
 * Мешок дропа
 */
module.exports = Sack;

const characters = require("../characters");
const Loot = require("./loot");

const
    WIDTH = 28,
    HEIGHT = 35;

function Sack(room_id, x, y, content) {

    if(content==undefined) content = 1;

    let character_id = characters.CHARACTER_SACK;

    Loot.call(this, room_id, x, y, character_id, 'sack', WIDTH, HEIGHT, content);

}

Sack.prototype = Object.create(Loot.prototype);
