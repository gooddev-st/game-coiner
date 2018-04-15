/**
 * Гад
 */
module.exports = Gad;

const characters = require("../characters");
const Loot = require("./loot");

const
    GAD_WIDTH = 32,
    GAD_HEIGHT = 32;

function Gad(room_id, x, y, content) {

    if(content==undefined) content = 100;

    let character_id = characters.CHARACTER_GAD;

    switch (content){
        case 100:
            character_id = characters.CHARACTER_GAD;
            break;
        default:
            character_id = characters.CHARACTER_GAD;
            break;
    }

    Loot.call(this, room_id, x, y, character_id, 'gad', GAD_WIDTH, GAD_HEIGHT, content);

}

Gad.prototype = Object.create(Loot.prototype);
