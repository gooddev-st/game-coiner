/**
 * TileManager
 */
export default class {
    constructor(){

        this.tiles = {};
    }

    add(gid, tile){

        this.tiles[gid] = tile;

        return gid;
    }

    get(gid){
        return this.tiles[gid];
    }
}