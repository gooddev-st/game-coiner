import Sound from "./engine/sound.js";

const sounds = {
    "level_up": new Sound('sound/cash.mp3'),
    "npc_eat_coin": new Sound('sound/coin/coin3.wav', 0.1),
    "eat_coin_gold": new Sound('sound/coin/coin.wav'),
    "eat_coin_silver": new Sound('sound/coin/eat2.mp3'),
    "eat_coin_copper": new Sound('sound/coin/eat1.mp3'),
    "teleport": new Sound('sound/teleport/flaunch.wav', 0.1),
    "push-effect": new Sound('sound/hit/dropLeather.ogg'),
    "freeze-effect": new Sound('sound/hit/frost.wav'),
    "holera-effect": new Sound('sound/hit/holera.wav'),
};

export default sounds;

window.addEventListener("click", playAll);

function playAll() {
    for(let i in sounds) {
        sounds[i].init();
    }
    window.removeEventListener("click", playAll);
}