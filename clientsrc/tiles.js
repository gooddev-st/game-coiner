/**
 * Плитки
 */
import Tile from "./engine/tile";

const tiles = {};

export default {get, add}

function get(ID) {
    return tiles[ID];
}

function add(ID, tile) {
    tiles[ID] = new Tile(tile);
}