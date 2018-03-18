/**
 * @class Character - Персонаж
 */
export default class Character{

    constructor(sprite){
        this.sprite = sprite;

        this.width = sprite.width;
        this.height = sprite.height;
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
    draw(context, x, y, state, frameNum, width, height){

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
            this.width,
            this.height
        );
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

}