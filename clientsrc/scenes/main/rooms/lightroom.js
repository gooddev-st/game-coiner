//Настройки рандомных цветов комнаты

import sprites from "../../../sprites";

import ENVIRONMENTS from './environments';
/**
 * @class LightRoom
 */
export default class {
    constructor(width, height, environment_id, entities_num){
        this.width = width;
        this.height = height;
        this.environment_id = environment_id;
        this.entities_num = entities_num;

        this.image = null;

        this.backTile = null;
        this.tileWidth = ENVIRONMENTS[this.environment_id].width || 100;
        this.tileHeight = ENVIRONMENTS[this.environment_id].height || 100;
        this.pixelWidth = ENVIRONMENTS[this.environment_id].pixelWidth || 2;
        this.pixelHeight = ENVIRONMENTS[this.environment_id].pixelHeight || 2;

        this.entities = [];

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
        this.generateRandomTile();

        this.generateMushrooms();
    }

    generateRandomTile(){
        const
            boxWidth = this.pixelWidth,
            boxHeight = this.pixelHeight,
            env = ENVIRONMENTS[this.environment_id],
            rows = Math.floor(env.width/boxWidth) + 1,
            columns = Math.floor(env.height/boxHeight) + 1;


        const canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        canvas.width = env.width;
        canvas.height = env.height;

        for (let x = 0.0, i = 0; i < rows; x+=boxWidth, i++) {
            for (let y = 0, j=0; j < columns; y+=boxHeight, j++) {
                ctx.beginPath();
                ctx.fillStyle = this.randomCSScolor(this.environment_id);
                ctx.fillRect(x, y, boxWidth, boxHeight);
                // ctx.closePath();
                /*ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillText(""+i+","+j, x, y);*/
            }
        }

        // Сохраним картинкой
        this.backTile = new Image();
        this.backTile.src = canvas.toDataURL("image/png");

    }

    /**
     * Грибочки всякие
     * @param ctx
     */
    generateMushrooms(){
        const env = ENVIRONMENTS[this.environment_id];

        const spr = sprites[env.entitiesSprites];

        //Сгенерим деревья
        for(let i = 0; i<this.entities_num; i++){

            //Случайная плитка из набора
            let id = Math.floor(Math.random()*spr.states.default.length);
            let tile = spr.states.default[id];
            let image = spr.image;

            //Случайные координаты
            let xx = Math.floor(Math.random()*(this.width + tile.width)/10)*10 - tile.width;
            let yy = Math.floor(Math.random()*(this.height + tile.height)/10)*10 - tile.height;

            this.entities.push({image: image, tile: tile, x: xx, y: yy});
        }
    }

    draw(camera){

        //Сплошной цвет
        camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = '#9f8e60';
        camera.context.fillRect(0, 0, camera.width, camera.height);
        camera.context.closePath();
        camera.context.restore();

        if(!this.backTile) return false;

        this.drawTiles(camera);

        this.drawMushrooms(camera);

    }

    drawTiles(camera){


        /**
         * Откуда куда рисуем
         */
        let
            //Определим откуда (координаты мира)
            sx = 0, sy = 0, sw = this.width, sh = this.height,
            //куда (координаты камеры) рисуем
            dx = 0, dy = 0, dw = camera.width, dh = camera.height;

        //Если ширина комнаты больше камеры
        if(camera.width < this.width) {
            //рисуем от позиции камеры на её ширину
            sx = camera.x;
            sw = camera.width;
        }
        //ширина комнаты меньше камеры
        else{
            // рисуем от 0 на ширину комнаты, центрируя комнату
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

        /**
         * Определим участок комнаты для отрисовки
         */
        let
            l = Math.floor(sx/this.tileWidth),
            t = Math.floor(sy/this.tileHeight),
            w = Math.ceil(dw/this.tileWidth)+2, //+2 - Чтоб наверняка
            h = Math.ceil(dh/this.tileHeight)+2; //+2 - Чтоб наверняка

        /**
         * Отрисуем плитки, обрезая если надо
         */
        for(let i=l;i<l+w;i++){
            for(let j=t;j<t+h;j++){

                let wtx = i*this.tileWidth,
                    wty = j*this.tileHeight,
                    tdx = i*this.tileWidth - camera.x,
                    tdy = j*this.tileHeight - camera.y,
                    tw = this.tileWidth,
                    th = this.tileHeight,
                    tx, ty;

                if(wtx < sx){
                    let crop = sx - wtx;
                    tx = crop;
                    tdx = tdx + crop;
                    tw = tw - crop;
                }
                else{
                    tx = 0;
                }
                if(wty < sy){
                    let crop = sy - wty;
                    ty = crop;
                    tdy = tdy + crop,
                    th = th - crop;
                }
                else{
                    ty = 0;
                }

                if(wtx+this.tileWidth > sx+sw){
                    let crop = wtx+this.tileWidth - (sx+sw);
                    tw = tw - crop;
                }

                if(wty+this.tileHeight > sy+sh){
                    let crop = wty+this.tileHeight - (sy+sh);
                    th = th - crop;
                }

                if(tw>0 && th>0) {
                    camera.context.drawImage(this.backTile, tx, ty, tw, th, tdx, tdy, tw, th);
                }

            }
        }
    }

    drawMushrooms(camera){

        if(!this.entities || this.entities instanceof Array===false) return;

        this.entities.forEach((it)=> {

            let tile = it.tile,
                image = it.image,
                x = it.x,
                y = it.y;
            let w = tile.width, h = tile.height, sx = tile.x, sy = tile.y;


            //Только то, что в камере
            if (
                x < camera.x+camera.width &&
                x > camera.x-tile.width &&
                y < camera.y+camera.height &&
                y > camera.y-tile.height) {

                //Обрезка по границам комнаты
                if(x < 0){w += x;sx -= x;x = 0;}

                if(y < 0){h += y;sy -= y;y = 0;}

                if (x > this.width - tile.width) {w = this.width - x;}

                if (y > this.height - tile.height) {h = this.height - y;}


                x = x - camera.x;
                y = y - camera.y;

                //Обрезка по границам камеры
                if (x < 0) {w += x;sx -= x;x = 0;}

                if (y < 0) {h += y;sy -= y;y = 0;}

                if (x > camera.width - w) {w = camera.width - x;}

                if (y > camera.height - h) {h = camera.height - y;}

                /*camera.context.rect(x, y, w, h);
                camera.context.stroke();*/
                camera.context.drawImage(image, sx, sy, w, h, x, y, w, h);
            }
        });
    }
}