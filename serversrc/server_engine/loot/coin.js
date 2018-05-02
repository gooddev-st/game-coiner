/**
 * Монеты
 */
module.exports = Coin;

const characters = require("../characters");
const Loot = require("./loot");
const events = require("../events");

const
    COIN_WIDTH = 44,
    COIN_HEIGHT = 22;

function Coin(ID, room_id, x, y, content) {

    if(content==undefined) content = 1;

    let character_id = characters.CHARACTER_COIN_COPPER;

    switch (content){
        case 1:
            character_id = characters.CHARACTER_COIN_COPPER;
            break;
        case 2:
        case 3:
            character_id = characters.CHARACTER_COIN_SILVER;
            break;
        case 4:
        case 5:
            character_id = characters.CHARACTER_COIN;
            break;
        case 6:
            character_id = characters.CHARACTER_CRYSTAL_GREY;
            break;
        case 7:
            character_id = characters.CHARACTER_CRYSTAL_GREEN;
            break;
        case 8:
            character_id = characters.CHARACTER_CRYSTAL_BLUE;
            break;
        case 9:
            character_id = characters.CHARACTER_CRYSTAL_MAGENTA;
            break;
        case 10:
        case 11:
            character_id = characters.CHARACTER_CRYSTAL_YELLOW;
            break;
        default:
            character_id = characters.CHARACTER_CRYSTAL_RED;
            break;
    }

    Loot.call(this, ID, room_id, x, y, character_id, 'coin', COIN_WIDTH, COIN_HEIGHT, content);

}

Coin.prototype = Object.create(Loot.prototype);


Coin.prototype.kill = function () {
    events.room(this.room_id, "entity", "remove-coin", {room_id: this.room_id, x: this.x, y: this.y});
    Loot.prototype.kill.apply(this);

};