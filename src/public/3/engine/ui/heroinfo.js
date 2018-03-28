import events from "../events";

/**
 * Окно информации о герое
 */
export default {start, stop, update}


// html-елементы в которые покажем информацию о герое/игре

const hero_infoElement = document.getElementById("hero-panel");
const hero_nameElement = document.getElementById("hero-name");
const scoreElement = document.getElementById("coins_count");
const levelElement = document.getElementById("hero_level");
const levelupcounterElement = document.getElementById("hero_levelupcounter");
const speedElement = document.getElementById("hero_speed");
const healthElement = document.getElementById("hero_health");



function start() {
    hero_infoElement.style.display = 'block';
    window.addEventListener('click', onClick, false);
}
function stop(){
    window.removeEventListener('click', onClick, false);
}


function onClick(e){

    let target = e.target || e.srcElement;

    if(target.id && target.id=="signout_button"){
        e.stopPropagation();
        e.preventDefault();

        //if(confirm("Точно выйти?")){
            events.add('signout', null);
        //}
        return false;
    }
}


/**
 * Показ информации о герое
 * @param info
 * @param login
 */
function update(info){
    hero_nameElement && (hero_nameElement.innerText = info.ID);
    scoreElement && (scoreElement.innerText = info.coins_count);
    levelElement && (levelElement.innerText = info.level);
    speedElement && (speedElement.innerText = info.speed);
    levelupcounterElement && (levelupcounterElement.innerText = info.levelupValue - info.levelupCounter);
    healthElement && (healthElement.innerText = info.health)
}