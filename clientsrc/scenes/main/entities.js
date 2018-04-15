import characters from "../../characters";
import Entity from "./entity";
import log from "../../logs";

export default {add, addFromSet, addOne, remove, reset, size, each, removeByID}

const entities = [];

//Создает
function add(ID, x, y, character_id, lifetime, faza) {
    entities.push(
        new Entity(ID, x, y, characters.get(character_id), lifetime, faza)
    );
}

function addFromSet(ID, x, y, setID, sprite_id, lifetime, faza) {
    entities.push(
        new Entity(ID, x, y, characters.getFromSet(setID, sprite_id), lifetime, faza)
    );
}

//Добавляет созданную
function addOne(entity) {
    entities.push(entity);
}

function remove(index) {
    if(index in entities) {
        entities.splice(index, 1);
    }
}

function removeByID(ID) {
    let index = entities.findIndex(it=>{return it.ID===ID});
    if(index!==-1 && index in entities) {
        entities.splice(index, 1);
    }
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
