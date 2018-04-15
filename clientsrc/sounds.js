import Sound from "./engine/sound.js";

const sounds = {
    "level_up": new Sound('sound/cash.mp3'),

    "npc_eat_coin": new Sound('sound/coin/coin3.wav', 0.1),
    "eat_coin_gold": new Sound('sound/coin/coin.wav', 0.2),
    "eat_coin_silver": new Sound('sound/coin/eat2.mp3', 0.2),
    "eat_coin_copper": new Sound('sound/coin/eat1.mp3', 0.4),
    "eat_coin0": new Sound('sound/coin/coin4.wav'),
    "eat_coin1": new Sound('sound/coin/coin5.wav'),
    "eat_coin2": new Sound('sound/coin/coin6.wav'),
    "eat_coin3": new Sound('sound/coin/coin7.wav'),
    "eat_coin4": new Sound('sound/coin/coin8.wav'),

    "teleport": new Sound('sound/teleport/flaunch.wav', 0.1),
    "push-effect": new Sound('sound/hit/dropLeather.ogg'),
    "freeze-effect": new Sound('sound/hit/frost.wav'),
    "holera-effect": new Sound('sound/hit/holera.wav'),
    "shield-effect": new Sound('sound/shield.wav'),
    "weapon-claws1": new Sound('sound/hit/claws1.wav'),
    "weapon-claws2": new Sound('sound/hit/claws2.wav'),
    "weapon-claws3": new Sound('sound/hit/claws3.wav'),

    "weapon-chewing1": new Sound('sound/hit/bite-small.wav'),
    "weapon-chewing2": new Sound('sound/hit/bite-small2.wav'),
    "weapon-chewing3": new Sound('sound/hit/bite-small3.wav'),

    "weapon-paw1": new Sound('sound/hit/mnstr6.wav'),
    "weapon-paw2": new Sound('sound/hit/mnstr10.wav'),
    "weapon-paw3": new Sound('sound/hit/mnstr12.wav'),
    "weapon-paw4": new Sound('sound/hit/mnstr15.wav'),

    "weapon-slime1": new Sound('sound/hit/slime1.wav'),
    "weapon-slime2": new Sound('sound/hit/slime2.wav'),
    "weapon-slime3": new Sound('sound/hit/slime3.wav'),
    "weapon-slime4": new Sound('sound/hit/slime4.wav'),

    "weapon-sword1": new Sound('sound/hit/sword1.wav'),
    "weapon-sword2": new Sound('sound/hit/sword2.wav'),
    "weapon-sword3": new Sound('sound/hit/sword3.wav'),

    "weapon-pistol1": new Sound('sound/hit/pistol.wav'),

    "weapon-shotgun1": new Sound('sound/hit/shotgun.wav'),

    "heal-up": new Sound('sound/hit/insect.ogg', 1.0),
};

export default sounds;

window.addEventListener("click", playAll);

function playAll() {
    for(let i in sounds) {
        sounds[i].init();
    }
    window.removeEventListener("click", playAll);
}