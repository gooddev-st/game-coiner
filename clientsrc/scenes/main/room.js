//Настройки рандомных цветов комнаты

import sprites from "../../sprites";

import ENVIRONMENTS from './environments';
/**
 * @class Room
 */
export default class {
    constructor(width, height, environment_id, entities_num){
        this.width = width;
        this.height = height;
        this.environment_id = environment_id;
        this.entities_num = entities_num;
        this.image = null;

        this.generate();
    }

    randomCSScolor(environment_id){
        let e = ENVIRONMENTS[environment_id];
        let r = e.r.start + Math.floor(Math.random() * e.r.rand ),
            g = e.g.start + Math.floor(Math.random() * e.g.rand),
            b = e.b.start + Math.floor(Math.random() * e.b.rand);
        return 'rgb('+r+','+g+','+b+')';
    }

    generate(){
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        ctx.save();

        this.generateRandomBack(ctx);

        this.generateCartoon(ctx);

        ctx.restore();

        // Сохраним картинкой
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL("image/png");

    }

    generateRandomBack(ctx){

        const
            tileWidth = 22.0,
            tileHeight = 22.0,
            rows = Math.floor(this.width/tileWidth) + 1,
            columns = Math.floor(this.height/tileHeight) + 1;

        for (let x = 0.0, i = 0; i < rows; x+=tileHeight, i++) {
            for (let y = 0, j=0; j < columns; y+=tileWidth, j++) {
                ctx.beginPath();
                ctx.fillStyle = this.randomCSScolor(this.environment_id);
                ctx.fillRect(x, y, tileWidth, tileHeight);
                // ctx.closePath();
            }
        }
    }

    generateCartoon(ctx){
        const env = ENVIRONMENTS[this.environment_id];

        const spr = sprites[env.entitiesSprites];

        //Сгенерим деревья
        for(let i = 0; i<this.entities_num; i++){

            //Случайная плитка из набора
            let id = Math.floor(Math.random()*spr.states.default.length);
            let tile = spr.states.default[id];

            //Случайные координаты
            let xx = Math.floor(Math.random()*(this.width + tile.width)/10)*10 - tile.width;
            let yy = Math.floor(Math.random()*(this.height + tile.height)/10)*10 - tile.height;
            let w = tile.width, h = tile.height, sx = tile.x, sy = tile.y;


            //Обрезка по границам комнаты

            if(xx < this.width && xx > -tile.width && yy < this.height && yy > -tile.height) {

                if(xx < 0){w += xx;sx -= xx;xx = 0;}

                if(yy < 0){h += yy;sy -= yy;yy = 0;}

                if (xx > this.width - tile.width) {
                    w = this.width - xx;
                }

                if (yy > this.height - tile.height) {
                    h = this.height - yy;
                }

                ctx.drawImage(spr.image, sx, sy, w, h, xx, yy, w, h);
            }

        }
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