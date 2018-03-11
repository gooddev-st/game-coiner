/**
 * @class Loot
 */
export default class {
    constructor(room_id, x, y, character, ID){
        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = 44;
        this.height = 44;

        this.character = character;

        this.state = 'default';

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    set(room_id, x, y, character, ID){
        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;
        this.character = character;
    }

    draw(camera){
        //TODO: как-то не так анимация. Переделать
        if(!this.character) return false;

        if(!this.character.sprite.states[this.state]){
            this.state = 'default'
        }
        if(!this.character.sprite.states[this.state]){
            return false;
        }

        let x = (this.x-this.width/2) - camera.x,
            y = (this.y-this.height/2) - camera.y;

        this.character.draw(camera.context, x, y, this.width, this.height, this.state, this.currentSpriteNum);
    }

    animate(step){
        this.faza += this.animateSpeed * step;
        this.currentSpriteNum = Math.floor(this.faza);

        if(this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length){
            this.faza = 0;
            this.currentSpriteNum = 0;
        }
    }
}