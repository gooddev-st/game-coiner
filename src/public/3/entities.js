import characters from "./characters";
import spritesets from "./spritesets";

export default {add, addFromSet, remove, reset, size, each}

import Entity from "./engine/entity";
import Character from "./engine/character";
import sprites from "./sprites";

const entities = [];


function add(x, y, ID, lifetime, faza) {
    entities.push(
        new Entity(x, y, characters.get(ID), lifetime, faza)
    );
}

function addFromSet(x, y, setID, ID, lifetime, faza) {
    entities.push(
        new Entity(x, y, characters.getFromSet(setID, ID), lifetime, faza)
    );
}

function remove(index) {
    entities.splice(index, 1);
}

function reset() {
    entities.length = 0;
}

function size() {
    return entities.length;
}

function each(callback) {
    entities.forEach(callback);
}
