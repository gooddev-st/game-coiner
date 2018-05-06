import AnimatedTile from "../../engine/animated_tile";

/**
 * @class EntityTiled
 *
 */

export default class EntityTiled{


    constructor(imageManager, tile, x, y){

        this.x = x;
        this.y = y;

        this.imageManager = imageManager;
        this.tile = tile;

        this.width = this.tile.width;
        this.height = this.tile.height;

        this.lastUpdate = (new Date()).getTime();
        this.currentFrameID = 0;
        this.faza = 0;

    }


    animate(){

        let frame;

        //Если не анимированная - ничего не делаем
        if(!this.tile.frames.length) return;

        if(this.currentFrameID > 0){}

        //Если начало анимации - берем нулевой кадр
        if(this.currentFrameID < 0 || this.currentFrameID >= this.tile.frames.length){
            this.currentFrameID = 0;
            frame = this.tile.getFrame(0);
            this.faza += frame.duration;
            return;
        }

        //Получим прошедшее время
        let now = (new Date()).getTime(),
            step = now - this.lastUpdate;
        this.lastUpdate = now;

        //Проверим надо ли менять кадр
        this.faza -= step;
        while(this.faza < 0){
            this.currentFrameID = this.tile.getNextFrameID(this.currentFrameID);
            frame = this.tile.getFrame(this.currentFrameID);
            if(!frame) return;
            this.faza += frame.duration;
        }
    }


    draw(camera){
        if((!this.tile) || !this.imageManager) return false;

        let x = this.x - camera.x,
            y = this.y - camera.y;

        // не рисуем вне камеры
        if(
            x < - this.tile.height ||
            y < 0 ||
            x > camera.width ||
            y > camera.height+this.tile.height
        ) {
            return true;
        }

        this.drawTile(camera.context, x, y);

        if(camera.isShowCollision){
            this.drawBox(camera, x, y);
        }
    }


    drawTile(context, sx, sy){
        let x = sx, y = sy - this.tile.height;
        this.tile.draw(context, this.imageManager, x, y, this.currentFrameID);
    }

    drawBox(camera, x, y){
        //Рисуем пятно расположения
        camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = "rgba(255,255,67,0.4)";
        camera.context.fillRect(x, y-this.height, this.width, this.height);
        camera.context.rect(x, y-this.tile.height, this.tile.width, this.tile.height);
        camera.context.stroke();

        camera.context.beginPath();
        camera.context.fillStyle = "rgba(255,0,0,0.8)";
        camera.context.arc(x, y, 2, 0, Math.PI*2);
        camera.context.fill();

        camera.context.restore();
    }
}