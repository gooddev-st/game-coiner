import characters from "../../characters";

/**
 * @class Loot
 */
export default class {
    constructor(room_id, x, y, character_id, ID, width, height){
        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = characters.get(character_id) || characters.get('coin_gold');

        this.state = 'default';

        this.animateSpeed = this.character.sprite.speed;
        if(!this.animateSpeed) this.animateSpeed = 14;

        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    set(room_id, x, y, character_id, ID){
        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;
        this.character = characters.get(character_id) || characters.get('coin_gold');
    }

    draw(camera){
        if(!this.character) return false;

        if(!this.character.sprite.states[this.state]){
            this.state = 'default'
        }
        if(!this.character.sprite.states[this.state]){
            return false;
        }

        let x = this.x - camera.x,
            y = this.y - camera.y;


        // не рисуем вне камеры
        let xdiff = (this.width - this.character.width)/2;//выступ чарактера за объект
        if(
            x < - this.character.width  - xdiff||
            y < 0 ||
            x > camera.width + xdiff ||
            y > camera.height + this.character.height
        ) {
            return true;
        }


        this.drawCharacter(camera, x, y);

        if(camera.isShowCollision) {
            // Рисуем пятно коллизий
            this.drawBox(camera, x, y);
        }
    }


    drawCharacter(camera, x, y){
        x = x - (this.character.width-this.width)/2;
        y = y - this.character.height;
        this.character.draw(camera.context, x, y, this.state, null, this.currentSpriteNum, this.width, this.height);
    }


    drawBox(camera, x, y){

        let chx = x - (this.character.width-this.width)/2,
            chy = y - this.character.height;

        camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = "rgba(255,255,67,0.4)";
        camera.context.fillRect(x, y - this.height, this.width, this.height);
        camera.context.rect(chx, chy, this.character.width, this.character.height);
        camera.context.stroke();

        camera.context.beginPath();
        camera.context.fillStyle = "rgba(255,0,0,0.8)";
        camera.context.arc(x, y, 2, 0, Math.PI*2);
        camera.context.fill();

        camera.context.restore();
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