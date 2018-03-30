/**
 * @class Entity
 *
 */
import {STEP} from "../constants";

export default class Entity{

    constructor(x, y, character, lifetime, faza){

        this.x = x;
        this.y = y;

        this.character = character;

        // время жизни
        this.lifetime = lifetime;

        this.immortal = lifetime > 0.0 ? false : true;

        this.width = this.character.width;
        this.height = this.character.height;

        this.animateSpeed = this.character.sprite.speed;
        if(!this.animateSpeed) this.animateSpeed = 14;
        this.faza = faza || 0;
        this.currentSpriteNum = 0;

        this.state = "default";

        this.die = false;
    }

    isDie(){
        return this.die;
    }

    kill(){
        this.die = true;
    }

    update(){

        if(!this.immortal) {

            if (this.lifetime > 0) {
                this.lifetime -= STEP;
            }
            else {
                this.lifetime = 0;
                this.die = true;
            }

        }
    }

    animate(){
        //Анимация
        this.faza += this.animateSpeed * STEP;
        this.currentSpriteNum = Math.floor(this.faza);


        if(!this.character) return false;

        if(!this.character.sprite.states[this.state]){
            this.state = 'default';
        }
        if(!this.character.sprite.states[this.state]){
            return false;
        }


        if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length) {
            this.faza = 0;
            this.currentSpriteNum = 0;
        }
    }

    draw(camera){
        if(!this.character) return false;

        if(!this.character.sprite.states[this.state]){
            this.state = 'default';
        }
        if(!this.character.sprite.states[this.state]){
            return false;
        }

        let x = this.x - camera.x - this.width/2,
            y = this.y - camera.y - this.height/2;

        // не рисуем вне камеры
        if(
            x < -this.character.width ||
            y < -this.character.height ||
            x > camera.width ||
            y > camera.height
        ) {
            return true;
        }

        this.drawCharacter(camera.context, x, y);
    }


    drawCharacter(context, sx, sy){
        let x = sx - (this.character.width-this.width)/2,
            y = sy - (this.character.height-this.height);

        this.character.draw(context, x, y, this.state, this.currentSpriteNum, this.width, this.height);
    }
}