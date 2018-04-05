export default {item, add, remove, reset, toArray}


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
        if(!units[i].isHero) delete units[i];
    }
}

function toArray() {
    let unitsArray = [];
    for(const i in units){
        unitsArray.push(units[i]);
    }
    return unitsArray;
}
