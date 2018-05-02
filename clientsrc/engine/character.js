/**
 * @class Character - Персонаж
 */
export default class Character{

    constructor(sprite, width, height){
        this.sprite = sprite;

        this.width = width || sprite.width;
        this.height = height || sprite.height;
    }

    framesCount(state, direction){
        if(!state || !this.sprite.states[state]){
            return 0;
        }

        return this.sprite.states[state].length;
    }


    /**
     * Отрисовка персонажа
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

        if(!state || !this.sprite.states[state]){
            state = 'default'
        }
        if(!frameNum) frameNum = 0;

        if(!this.sprite.states[state] || !this.sprite.states[state][frameNum]) return;

        let _x = x, _y = y;
        if(this.sprite.top!=undefined){
            _y += this.sprite.top;
        }
        if(this.sprite.left!=undefined){
            _x += this.sprite.left;
        }

        //Обрезка отрисовки вне канвы TODO: резать по камере
        if(_x + this.width > 0 && _x < context.canvas.width && _y + this.height > 0 && _y < context.canvas.height) {


            // Рисуем кадр
            this.drawFrame(
                context,
                this.sprite.image,
                this.sprite.states[state][frameNum],
                _x,
                _y,
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

        if(image && width>0 && height>0) {

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