/**
 * @class Character - Персонаж
 */
export default class Character{
    constructor(sprites_array){
        this.sprites = {
            default: sprites_array
        };
    }

    draw(context, x, y, width, height, action, spriteNum, level, volume){
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

        if(volume!=undefined) {
            this.drawHealth(
                context,
                x,
                y,
                width,
                height,
                volume
            );
        }

        if(level!=undefined) {
            this.drawLevel(
                context,
                x,
                y,
                width,
                height,
                level
            );
        }

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

    drawHealth(context, x, y, width, height, value){

        let healthWidth = width - 10;

        if(healthWidth<10) healthWidth = 10;

        let healthX = Math.floor((width - healthWidth)/2) + x;

        let healthHeight = Math.floor(height/8);

        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(healthX, y-7, Math.floor(healthWidth*value/100), healthHeight);
        context.rect(healthX-1, y-8, healthWidth+2, healthHeight+2);
        context.stroke();
        context.restore();
    }

    drawLevel(context, x, y, width, height, level){

        context.save();
        context.font = "14px Arial";
        context.fillStyle = "blue";
        context.fillText(level,x,y-10);
        context.restore();
    }

    setStateSprites(state, sprites_array){
        this.sprites[state] = sprites_array;
    }
}