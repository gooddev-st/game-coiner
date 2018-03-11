/**
 * @class Character - Персонаж
 */
export default class Character{

    constructor(sprite){
        this.sprite = sprite;
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
     * @param unit_level
     * @param volume - значение индикатора
     */
    draw(context, x, y, width, height, state, frameNum, unit_level, volume){

        if(!state || !this.sprite.states[state]){
            state = 'default'
        }
        if(!frameNum) frameNum = 0;

        if(!this.sprite.states[state] || !this.sprite.states[state][frameNum]) return;


        // Рисуем кадр
        this.drawFrame(
            context,
            this.sprite.image,
            this.sprite.states[state][frameNum],
            x,
            y,
            width,
            height
        );


        // Если есть - рисуем индикатор
        if(volume!=undefined) {
            this.drawVolume(
                context,
                x,
                y,
                width,
                height,
                volume
            );
        }

        // Если есть - рисуем уровень
        if(unit_level!=undefined) {
            this.drawLevel(
                context,
                x,
                y,
                width,
                height,
                unit_level
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
        context.drawImage(
            image,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            x,
            y,
            width,
            height
        );
    }


    /**
     * Рисуем индикатор
     * @param context
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    drawVolume(context, x, y, width, height, value){

        let volumeWidth = width - 50;

        if(volumeWidth<10) volumeWidth = 10;

        let healthX = Math.floor((width - volumeWidth)/2) + x;

        let healthHeight = Math.floor(height/15);

        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(healthX, y-7, Math.floor(volumeWidth*value/100), healthHeight);
        context.rect(healthX-1, y-8, volumeWidth+2, healthHeight+2);
        context.stroke();
        context.restore();
    }


    /**
     * Рисуем уровень
     * @param context
     * @param x
     * @param y
     * @param width
     * @param height
     * @param level
     */
    drawLevel(context, x, y, width, height, level){

        context.save();
        context.font = "14px Arial";
        context.fillStyle = "blue";
        context.fillText(level,x,y-10);
        context.restore();
    }

}