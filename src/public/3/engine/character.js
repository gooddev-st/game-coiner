/**
 * @class Character - Персонаж
 */
export default class Character{

    constructor(sprite, width, height){
        this.sprite = sprite;

        this.width = width || sprite.width;
        this.height = height || sprite.height;
    }


    /**
     * Отрисовка персонажа
     * @param context - куда рисуем
     * @param x
     * @param y
     * @param width
     * @param height
     * @param state
     * @param frameNum - номер кадра анимации
     */
    draw(context, x, y, state, frameNum, width, height){

        if(!state || !this.sprite.states[state]){
            state = 'default'
        }
        if(!frameNum) frameNum = 0;

        if(!this.sprite.states[state] || !this.sprite.states[state][frameNum]) return;


        //Обрезка отрисовки вне канвы TODO: резать по камере
        if(x + this.width > 0 && x < context.canvas.width && y + this.height > 0 && y < context.canvas.height) {


            // Рисуем кадр
            this.drawFrame(
                context,
                this.sprite.image,
                this.sprite.states[state][frameNum],
                x,
                y,
                this.width,
                this.height
            );
        }
    }


    /**
     * Рисуем кадр анимации
     * @param context
     * @param sprite
     * @param x
     * @param y
     * @param width
     * @param height
     */
    drawFrame(context, image, sprite, x, y, width, height){

        if(width>0 && height>0) {

            let scaleX = sprite.width / width,
                scaleY = sprite.height / height;

            let sx = sprite.x, sy = sprite.y, sw = sprite.width, sh = sprite.height;
            let dx = x, dy = y, dw = width, dh = height;

            if (x < 0) {
                dx = 0;
                dw = width + x;
                sx -= Math.floor(x * scaleX);
                sw = Math.floor(dw * scaleX);
            }
            if (y < 0) {
                dy = 0;
                dh = height + y;
                sy -= Math.floor(y * scaleY);
                sh = Math.floor(dh * scaleY);
            }

            if (dw > context.canvas.width - dx) {
                dw = context.canvas.width - dx;
                sw = Math.floor(dw * scaleX);
            }

            if (dh > context.canvas.height - dy) {
                dh = context.canvas.height - dy;
                sh = Math.floor(dh * scaleY);
            }

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