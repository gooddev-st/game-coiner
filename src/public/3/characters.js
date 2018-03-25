import Character from "./engine/character.js";
import sprites from "./sprites";
import spritesets from "./spritesets";

const characters = {};

const charactersets = {};

for(let id in sprites){
    add(id, sprites[id]);
}
for(let sprite_id in spritesets){
    for(let id=0; id<spritesets[sprite_id].length;id++){
        addToSet(sprite_id, id, spritesets[sprite_id][id]);
    }
}

/*const
    doc = new Character(sprites.doc),
    prof = new Character(sprites.prof),
    gob = new Character(sprites.gob),
    girl = new Character(sprites.girl),
    blond = new Character(sprites.blond),
    mag = new Character(sprites.mag),


    teleport = new Character(sprites.teleport),

    coin_gold = new Character(sprites.coin_gold),
    coin_silver = new Character(sprites.coin_silver),
    coin_copper = new Character(sprites.coin_copper),

    pointer = new Character(sprites.pointer),

    boom = new Character(sprites.boom),
    boom1 = new Character(sprites.boom1),
    boom2 = new Character(sprites.boom2),
    barier = new Character(sprites.barier);*/

// export default {doc, prof, gob, girl, blond, mag, teleport, coin_gold, coin_silver, coin_copper, pointer, boom, boom1, boom2, barier}
export default {get, getFromSet}

function get(ID) {
    return characters[ID];
}

function getFromSet(setID, ID) {
    return charactersets[setID][ID];
}

function add(ID, sprite) {
    characters[ID] = new Character(sprite);
}

function addToSet(setID, ID, sprite) {
    if(setID in charactersets===false){
        charactersets[setID] = [];
    }
    charactersets[setID].push(new Character(sprite));
}