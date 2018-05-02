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
    }

    draw(camera){
        if(!this.tile || !this.imageManager) return false;

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
        this.tile.draw(context, this.imageManager, x, y);
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