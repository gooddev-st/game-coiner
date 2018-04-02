const Push = require("./effects/push");
const Freeze = require("./effects/freeze");
const Holera = require("./effects/holera");

const effects = [];

//Добавить эффект
module.exports.push = function (name, properties) {
    if(name==="push"){
        effects.push(
            new Push(properties.from, properties.author)
        );
    }
    if(name==="freeze"){
        effects.push(
            new Freeze(properties.from, properties.author)
        );
    }
    if(name==="holera"){
        effects.push(
            new Holera(properties.from, properties.author)
        );
    }

};

/**
 * Выталкиваем начальный элемент
 * @returns {*}
 */
module.exports.shift = function () {
    return effects.shift();
};

module.exports.list = function () {
    return effects;
};

module.exports.size = function () {
    return effects.length;
};

