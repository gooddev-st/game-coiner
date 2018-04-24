import unit from "../../../scenes/main/unit";


/**
 * Окно информации о выбранном юните
 */
export default {start, stop, update, test_update}


// html-елементы в которые покажем информацию о герое/игре

const panelElement = document.getElementById("unit-panel");
const nameElement = document.getElementById("unit-name");
const healthElement = document.getElementById("unit-health");
const canvas = document.getElementById("unit-preview");

const testElement = document.getElementById("test-text");



function start() {
    // panelElement.style.display = 'block';
}
function stop(){

}


/**
 * Показ информации о юните
 * @param info
 */
function update(unit){

    panelElement.style.display = unit ? 'block' : 'none';

    if(!unit) return;

    let name = unit.name || unit.ID;
    nameElement && (nameElement.innerText = name);
    healthElement && (healthElement.innerText = unit.health);

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    unit.drawCharacter && unit.drawCharacter(context, 20, 50);
}

function test_update(text) {
    testElement && (testElement.innerText = text);
}