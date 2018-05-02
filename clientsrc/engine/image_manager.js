/**
 * ImageManager
 */
export default class {
    constructor(base_url){

        this.base_url = base_url || '/i/';

        this.gidNext = 0;

        this.counter = 0;
        this.loadedCounter = 0;

        this.loaded = false;

        this.images = {};
    }

    add(url){
        this.counter++;

        let gid = this.gidNext++;

        let image = new Image();

        let self = this;
        image.onload = function () {
            self.loadedCounter++;
            self.images[gid] = image;

            if(self.counter===self.loadedCounter){
                self.loaded = true;
            }
        };

        image.src = this.base_url + url;

        return gid;
    }

    get(gid){
        return this.images[gid];
    }
}