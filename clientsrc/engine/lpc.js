/**
 * Lpc - Стандартный анимированый юнит
 */

import spriteMap from './spritemap'


export default class {
    constructor(imageFileName){
        this.filename = imageFileName;
        this.loading = false;
        this.image = null;
        this.width = 100;
        this.height = 100;
    }

    load(){
        if(this.loading) return;

        let image = new Image();

        image.onload = _ => {
            this.loading = false;
            this.image = image;
        };

        image.onerror = _ => {
            this.loading = false;
        };

        image.src = this.filename;
        this.loading = true;
    }

    /**
     * Количество фреймов анимации
     * @param state
     * @param direction
     * @returns {number}
     */
    framesCount(state, direction){
        if(
            !state ||
            !direction ||
            !spriteMap.states[state] ||
            !spriteMap.states[state][direction]
        ) return 0;

        return spriteMap.states[state][direction].length;
    }


    /**
     * Рисуем LPC
     * @param context
     * @param x
     * @param y
     * @param state
     * @param direction
     * @param frameNum
     * @param width
     * @param height
     */
    draw(context, x, y, state, direction, frameNum, width, height){

        if(!this.image){
            this.load();
            return;
        }

        if(!state || !spriteMap.states[state]){
            state = 'default';
        }

        if(!direction || !spriteMap.states[state][direction]){
            direction = 'south';
        }

        if(!frameNum) frameNum = 0;

        if(
            !spriteMap.states[state] ||
            !spriteMap.states[state][direction] ||
            !spriteMap.states[state][direction][frameNum]
        ) return;

        //Обрезка отрисовки вне канвы TODO: резать по камере
        if(x + this.width > 0 && x < context.canvas.width && y + this.height > 0 && y < context.canvas.height) {


            // Рисуем кадр
            this.drawFrame(
                context,
                this.image,
                spriteMap.states[state][direction][frameNum],
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
     * @param image
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