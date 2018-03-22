import characters from "./characters";

export default {add, remove, reset, size, each}

import Entity from "./engine/entity";

const entities = [];


function add(x, y, ID, lifetime) {
    entities.push(
        new Entity(x, y, characters[ID], lifetime)
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
