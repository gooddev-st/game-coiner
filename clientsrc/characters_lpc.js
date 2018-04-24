/**
 * Персонажи (LPC)
 */
import Lpc from "./engine/lpc";

const lpcs = {};

const lpcs_src = {
    'vitaly': 'i/lpc/levon.png',
    'elfka': 'i/lpc/elfka.png',
};

for(let id in lpcs_src){
    add(id, lpcs_src[id]);
}

export default {get}

function get(ID) {
    return lpcs[ID];
}

function add(ID, filename) {
    lpcs[ID] = new Lpc(filename);
}