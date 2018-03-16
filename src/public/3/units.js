export default {item, add, remove, reset, animate, draw}


const units = {};

/**
 * Возвращает юнит по имени
 * @param ID
 * @returns Unit
 */
function item(ID) {
    return units[ID];
}

function add(ID, unit) {
    units[ID] = unit;
}

function remove(ID) {
    if(ID in units) delete units[ID];
}

function reset() {
    for(const i in units){
        delete units[i];
    }
}

function animate() {
    for(const i in units){
        units[i].animate();
    }
}

function draw(camera) {
    for(const i in units){
        units[i].draw(camera);
    }
}