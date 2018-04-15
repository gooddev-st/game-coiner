/**
 * Оружие
 */
module.exports = {
    Claws: Claws,
    Chewing: Chewing,
    Paw: Paw,
    Slime: Slime,
    Sword: Sword,
    Pistol: Pistol,
    Shotgun: Shotgun,
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
 * Жевание
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Chewing(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'chewing';
    this.hitPoints = hitPoints || 40;
    this.increment = increment || 150.0;
    this.sound = ['weapon-chewing1', 'weapon-chewing2', 'weapon-chewing3'];
}
Chewing.prototype = Object.create(Weapon.prototype);

/**
 * Лапа
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Paw(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'paw';
    this.hitPoints = hitPoints || 45;
    this.increment = increment || 100.0;
    this.sound = ['weapon-paw1', 'weapon-paw2', 'weapon-paw3', 'weapon-paw4'];
}
Paw.prototype = Object.create(Weapon.prototype);

/**
 * Слизь
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Slime(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'slime';
    this.hitPoints = hitPoints || 30;
    this.increment = increment || 400.0;
    this.sound = ['weapon-slime1', 'weapon-slime2', 'weapon-slime3', 'weapon-slime4'];
}
Slime.prototype = Object.create(Weapon.prototype);

/**
 * Меч
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Sword(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'sword';
    this.hitPoints = hitPoints || 32;
    this.increment = increment || 350.0;
    this.sound = ['weapon-sword1', 'weapon-sword2', 'weapon-sword3'];
}
Sword.prototype = Object.create(Weapon.prototype);

/**
 * Пистолет
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Pistol(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'pistol';
    this.hitPoints = hitPoints || 50;
    this.increment = increment || 200.0;
    this.sound = ['weapon-pistol1'];
}
Pistol.prototype = Object.create(Weapon.prototype);

/**
 * Обрез
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Shotgun(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'shotgun';
    this.hitPoints = hitPoints || 100;
    this.increment = increment || 100.0;
    this.sound = ['weapon-shotgun1'];
}
Shotgun.prototype = Object.create(Weapon.prototype);

/**
 * Лечилка
 * @param hitPoints
 * @param increment
 * @constructor
 */
function Curezzler(hitPoints, increment) {
    Weapon.call(this);
    this.id = 'curezzler';
    this.hitPoints = hitPoints || -10;
    this.increment = increment || 200.0;
    this.sound = 'heal-up';
}
Curezzler.prototype = Object.create(Weapon.prototype);