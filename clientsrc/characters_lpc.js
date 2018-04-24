/**
 * Персонажи (LPC)
 */
import Lpc from "./engine/lpc";

const lpcs = {};

const lpcs_src = {
    'blond': 'i/lpc/blond.png',
    'girl': 'i/lpc/girl.png',
    'vitaly': 'i/lpc/elf.png',
    'levon': 'i/lpc/levon.png',
    'katy': 'i/lpc/katy.png',
    'kroko': 'i/lpc/Drake_fem.png',
    'koil': 'i/lpc/Drake_male.png',
    'elf': 'i/lpc/elfwhite.png',
    'darka': 'i/lpc/darka.png',
    'ork': 'i/lpc/ork.png',
    'skeleton': 'i/lpc/skeleton.png',
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