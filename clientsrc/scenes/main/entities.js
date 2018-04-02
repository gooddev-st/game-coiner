import characters from "../../characters";
import Entity from "./entity";

export default {add, addFromSet, addOne, remove, reset, size, each}

const entities = [];

//Создает
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

//Добавляет созданную
function addOne(entity) {
    entities.push(entity);
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
