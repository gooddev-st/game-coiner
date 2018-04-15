/**
 * Оружие
 */
module.exports = {
    Claws: Claws,
    Curezzler: Curezzler,
};

const sound_event = require('./sound_event');//звуковые события

/**
 * Базовый класс
 * @constructor
 */
function Weapon() {
    this.id = 'weapon';
    this.hitPoints = 1;
    this.value = 0.0;
    this.increment = 100.0;
    this.sound = 'weapon-claws1';
}

Weapon.prototype.getSound = function() {
    if(this.sound instanceof Array) {
        return this.sound[Math.floor(Math.random() * this.sound.length)];
    }
    return  this.sound;
};

Weapon.prototype.bah = function(target) {
    if(this.value < 100.0) {
        this.value += this.increment*STEP;
        return;
    }

    this.value = 0.0;

    sound_event.add(this.getSound(), target.room_id, target.x, target.y);

    target.hit(this.hitPoints);
};

/**
 * Когти
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Claws(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'claws';
    this.hitPoints = hitPoints || 35;
    this.increment = increment || 200.0;
    this.sound = ['weapon-claws1', 'weapon-claws2', 'weapon-claws3'];
}
Claws.prototype = Object.create(Weapon.prototype);

/**
 * Лечилка
 * @param hitPoints
 * @constructor
 */
function Curezzler(hitPoints) {
    Weapon.call(this);
    this.id = 'curezzler';
    this.hitPoints = hitPoints || -10;
    this.increment = 200.0;
    this.sound = 'heal-up';
}
Curezzler.prototype = Object.create(Weapon.prototype);