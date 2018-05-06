/**
 * @class Tile - Плитка (TODO: приделать анимацию)
 */
export default class Tile{

    constructor(tile){
        this.gid = tile.gid;
        this.imageGid = tile.imageGid;

        this.x = tile.x;
        this.y = tile.y;

        this.width = tile.width;
        this.height = tile.height;

        this.frames = [];
    }

    /**
     * Добавить кадр анимации
     * @param tile
     * @param duration
     */
    addFrame(tile, duration){
        this.frames.push({tile: tile, duration: duration});
    }


    /**
     * Возвращает кадр анимации
     * @param id
     * @returns {*}
     */
    getFrame(id){
        return this.frames.length ? this.frames[id] : {tile: this, duration: 100};
    }


    /**
     * Возвращает номер следующего кадра анимации
     * @param current_id
     * @returns {*}
     */
    getNextFrameID(current_id){
        let next_id = current_id + 1;
        if(next_id >= this.frames.length || next_id < 0){
            next_id = 0;
        }
        return next_id;
    }


    /**
     * Отрисовка
     * @param context
     * @param imageManager
     * @param x
     * @param y
     * @param frameID
     */
    draw(context, imageManager, x, y, frameID){

        let frame = this.getFrame(frameID),
            tile = frame.tile;

        let image = imageManager.get(tile.imageGid);

        //Обрезка отрисовки вне канвы TODO: резать по камере
        if(
            x + tile.width > 0 &&
            x < context.canvas.width &&
            y + tile.height > 0 &&
            y < context.canvas.height
        ) {


            // Рисуем кадр
            this.drawFrame(
                context,
                image,
                x,
                y,
                frameID
            );
        }
    }


    /**
     * Рисуем кадр
     * @param context
     * @param image
     * @param x
     * @param y
     * @param frameID
     */
    drawFrame(context, image, x, y, frameID){

        let frame = this.getFrame(frameID),
            tile = frame.tile;

        if(image && this.width>0 && this.height>0) {

            let sx = tile.x, sy = tile.y, sw = tile.width, sh = tile.height;
            let dx = x, dy = y, dw = this.width, dh = this.height;

            if (x < 0) {
                dx = 0;
                dw = this.width + x;
                sx -= Math.floor(x);
                sw = Math.floor(dw);
            }
            if (y < 0) {
                dy = 0;
                dh = this.height + y;
                sy -= Math.floor(y);
                sh = Math.floor(dh);
            }

            if (dw > context.canvas.width - dx) {
                dw = context.canvas.width - dx;
                sw = Math.floor(dw);
            }

            if (dh > context.canvas.height - dy) {
                dh = context.canvas.height - dy;
                sh = Math.floor(dh);
            }

            //Не рисуем с размером меньше или равным нулю
            if(sw>0&&sh>0&&dw>0&&dh>0) {

                context.drawImage(
                    image,
                    sx,
                    sy,
                    sw,
                    sh,
                    dx,
                    dy,
                    dw,
                    dh
                );
            }
        }
    }

}