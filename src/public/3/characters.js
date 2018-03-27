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