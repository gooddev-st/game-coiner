import Sprite from "./engine/sprite";
import Character from "./engine/character.js";
import sprites from "./sprites.js";

export default function characters() {

    var characters = {

        "doc": new Character(sprites.doc),

        "prof": new Character(sprites.prof),

        "gob": new Character(sprites.gob),

        "coin_gold": new Character(sprites.coin_gold),
        "coin_silver": new Character(sprites.coin_silver),
        "coin_copper": new Character(sprites.coin_copper),
    };

    return characters;
}