import Character from "./engine/character.js";
import sprites from "./sprites.js";


const
    doc = new Character(sprites.doc),
    prof = new Character(sprites.prof),
    gob = new Character(sprites.gob),
    girl = new Character(sprites.girl),
    blond = new Character(sprites.blond),
    mag = new Character(sprites.mag),

    coin_gold = new Character(sprites.coin_gold),
    coin_silver = new Character(sprites.coin_silver),
    coin_copper = new Character(sprites.coin_copper);

export default {doc, prof, gob, girl, blond, mag, coin_gold, coin_silver, coin_copper}

