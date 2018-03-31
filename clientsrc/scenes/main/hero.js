import Unit from './unit.js'

/**
 * Hero - главный герой
 */

/**
 * Юнит героя
 * @type {Unit|null}
 */
let unit = null;

/**
 * Скорость перемещения
 * @type {number}
 */
let speed = 0;


export default {unit, speed, animate, draw}

function animate() {
    this.unit.animate();
}

function draw(camera) {
    this.unit.draw(camera);
}
