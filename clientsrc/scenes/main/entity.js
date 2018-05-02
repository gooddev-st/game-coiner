/**
 * @class Entity
 *
 */
import {STEP} from "../../constants";

export default class Entity{


    constructor(ID, x, y, character, lifetime, faza, type){
        this.ID = ID;

        this.type = type || 'character';

        this.x = x;
        this.y = y;

        this.character = character;

        // время жизни
        this.lifetime = lifetime;

        this.immortal = (lifetime <= 0.0);

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

        //Рисуем пятно расположения
        if(camera.isShowCollision) {
            this.drawBox(camera, x, y);
        }
    }


    drawCharacter(camera, sx, sy){
        let x = sx - (this.character.width-this.width)/2,
            y = sy - this.character.height;

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
}