/**
 * @class Unit
 */
export default class {
    constructor(room_id, startx, starty, character, name, state, coins_count){
        this.room_id = room_id;

        this.x = startx;
        this.y = starty;

        this.speed = 90;

        this.width = 44;
        this.height = 44;

        this.character = character;

        this.state = state;

        this.name = name;

        this.coins_count = coins_count;

        //Если 10 и больше - покажем полное
        if(coins_count>10) coins_count = 10;
        this.volume = Math.floor(coins_count*100/10)

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    set(room_id, x, y, character, state, coins_count){
        this.room_id = room_id;
        this.x = x;
        this.y = y;
        this.character = character;

        this.state = state;
        this.coins_count = coins_count;

        //Если 10 и больше - покажем полное
        if(coins_count>10) coins_count = 10;
        this.volume = Math.floor(coins_count*100/10)
    }

    animate(step){
        //Анимация
        this.faza += this.animateSpeed * step;
        this.currentSpriteNum = Math.floor(this.faza);


        if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprites[this.state].length) {
            this.faza = 0;
            this.currentSpriteNum = 0;
        }
    }

    draw(camera){
        if(!this.character) return false;

        if(!this.character.sprites[this.state]){
            this.state = 'default';
        }
        if(!this.character.sprites[this.state]){
            return false;
        }

        let x = (this.x-this.width/2) - camera.x,
            y = (this.y-this.height/2) - camera.y;

        this.character.draw(camera.context, x, y, this.width, this.height, this.state, this.currentSpriteNum, this.volume);
    }
}