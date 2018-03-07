import Sprite from "./sprite";

/**
 * @class Character - Персонаж
 */
export default class Character{
    constructor(sprites_array){
        this.sprites = {
            default: sprites_array
        };
    }

    draw(context, x, y, width, height, action, spriteNum){
        if(!action || !this.sprites[action]){
            action = 'default'
        }
        if(!spriteNum) spriteNum = 0;

        if(!this.sprites[action] || !this.sprites[action][spriteNum]) return false;

        this.drawSprite(
            context,
            this.sprites[action][spriteNum],
            x,
            y,
            width,
            height
        );
        this.currentStep++;
    }

    drawSprite(context, sprite, x, y, width, height){
        context.drawImage(
            sprite.image,
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

    setStateSprites(state, sprites_array){
        this.sprites[state] = sprites_array;
    }
}
