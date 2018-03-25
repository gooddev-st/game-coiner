import characters from "../characters";

/**
 * @class Teleport
 */
export default class {
    constructor(room_id, x, y, character_id, ID, target, state, width, height){
        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = characters.get(character_id) || characters.get('teleport');

        this.state = state;

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;

        this.target = {
            room_id: target.room_id,
            x: target.x,
            y: target.y
        }
    }

    set(state){

        if(this.state !== state){
            this.faza = 0;
            this.currentSpriteNum = 0;
            this.state = state;
        }
    }

    draw(camera){
        if(!this.character) return false;

        if(!this.character.sprite.states[this.state]){
            this.state = 'default'
        }
        if(!this.character.sprite.states[this.state]){
            return false;
        }

        let x = (this.x-(this.character.width-this.width)/2) - camera.x,
            y = (this.y-this.character.height+this.height) - camera.y;

        // не рисуем вне камеры
        if(
            x < -this.character.width ||
            y < -this.character.height ||
            x > camera.width ||
            y > camera.height
        ) {
            return true;
        }

        this.character.draw(camera.context, x, y, this.state, this.currentSpriteNum, this.width, this.height);

        // Рисуем пятно коллизий
        /*camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = "rgba(255,255,67,0.4)";
        camera.context.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
        camera.context.rect(x, y, this.character.width, this.character.height);
        camera.context.stroke();
        camera.context.restore();*/
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