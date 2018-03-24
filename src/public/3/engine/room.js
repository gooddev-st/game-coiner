//Настройки рандомных цветов комнаты

import sprites from "../sprites.js";

const ENVIRONMENTS = {
    0: {
        r: {start: 120, rand: 10},
        g: {start: 120, rand: 16},
        b: {start: 100, rand: 5},
    },
    1: {
        r: {start: 70, rand: 16},
        g: {start: 100, rand: 23},
        b: {start: 100, rand: 5},
    },
    2: {
        r: {start: 210, rand: 45},
        g: {start: 30, rand: 75},
        b: {start: 30, rand: 75},
    },
    3: {
        r: {start: 10, rand: 12},
        g: {start: 130, rand: 20},
        b: {start: 210, rand: 45},
    },
    4: {
        r: {start: 150, rand: 12},
        g: {start: 90, rand: 20},
        b: {start: 40, rand: 12},
    },
};
/**
 * @class Room
 */
export default class {
    constructor(width, height, environment_id){
        this.width = width;
        this.height = height;
        this.environment_id = environment_id;
        this.image = null;

        this.generate(Math.floor(width/50 + height/50));
    }

    randomCSScolor(environment_id){
        let e = ENVIRONMENTS[environment_id];
        let r = e.r.start + Math.floor(Math.random() * e.r.rand ),
            g = e.g.start + Math.floor(Math.random() * e.g.rand),
            b = e.b.start + Math.floor(Math.random() * e.b.rand);
        return 'rgb('+r+','+g+','+b+')';
    }

    generate(trees_num){
        var ctx = document.createElement("canvas").getContext("2d"),
            tileWidth = 22,
            tileHeight = 22;
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        var rows = Math.floor(this.width/tileWidth) + 1;
        var columns = Math.floor(this.height/tileHeight) + 1;

        ctx.save();

        for (var x = 0, i = 0; i < rows; x+=tileHeight, i++) {
            for (var y = 0, j=0; j < columns; y+=tileWidth, j++) {
                ctx.beginPath();
                ctx.fillStyle = this.randomCSScolor(this.environment_id);
                ctx.fillRect(x, y, tileWidth, tileHeight);
                ctx.closePath();
            }
        }

        //Сгенерим деревья
        for(let i = 0; i<trees_num; i++){
            let id = Math.floor(Math.random()*sprites.trees.states.default.length),

                tile = sprites.trees.states.default[id],

                x = Math.random()*(this.width + 2*tile.width) - tile.width,
                y = Math.random()*(this.height + 2*tile.height) - tile.height,
                w = tile.width, h = tile.height, sx = tile.x, sy = tile.y;



            if(x < 0){w += x;sx -= x;x = 0;}
            if(y < 0){h += y;sy -= y;y = 0;}
            if(x >= this.width - tile.width){ w = x - (this.width - tile.width);}
            if(y >= this.height - tile.height){ h = y - (this.height - tile.height);}

            ctx.drawImage(sprites.trees.image, sx, sy, w, h, x, y, w, h);

        }

        //Сгенерим кусты
        /*for(let i = 0; i<trees_num; i++){
            let id = Math.floor(Math.random()*sprites.bushs.states.default.length),

                tile = sprites.bushs.states.default[id],

                x = Math.random()*(this.width + tile.width) - tile.width,
                y = Math.random()*(this.height + tile.height) - tile.height,
                w = tile.width, h = tile.height, sx = tile.x, sy = tile.y;

            if(x < 0){w += x;sx -= x;x = 0;}
            if(y < 0){h += y;sy -= y;y = 0;}
            if(x >= this.width - tile.width){ w = x - (this.width - tile.width);}
            if(y >= this.height - tile.height){ h = y - (this.height - tile.height);}

            ctx.drawImage(sprites.bushs.image, sx, sy, w, h, x, y, w, h);

        }*/

        ctx.restore();

        // Сохраним картинкой
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL("image/png");


        ctx = null;
    }

    draw(camera){

        camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = '#9f8e60';
        camera.context.fillRect(0, 0, camera.width, camera.height);
        camera.context.closePath();
        camera.context.restore();

        if(!this.image) return false;

        var
            sx = 0,
            sy = 0,
            sw = this.width,
            sh = this.height,
            dx = 0,
            dy = 0,
            dw = camera.width,
            dh = camera.height;

        if(camera.width < this.width) {
            sx = camera.x;
            sw = camera.width;
        }
        else{
            // dx = -camera.x;
            dx = Math.floor((camera.width - this.width)/2);
            dw = this.width;
        }

        if(camera.height < this.height) {
            sy = camera.y;
            sh = camera.height;
        }
        else{
            // dy = -camera.y;
            dy = Math.floor((camera.height - this.height)/2);
            dh = this.height;
        }

        camera.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}