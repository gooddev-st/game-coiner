/**
 * @class Unit
 *
 */
import {STEP} from "../constants";
import characters from "../characters";

const CHARACTER_DEFAULT = 'blond';

const MAX_HEALTH = 100;

export default class Unit{
    /**
     * Конструктор
     * @param data
     */
    constructor(data){

        this.room_id = data.room_id;

        this.x = data.x;
        this.y = data.y;

        this.width = data.width;
        this.height = data.height;

        this.character = characters[data.character_id] || characters[CHARACTER_DEFAULT];

        this.state = data.state || 'default';

        this.name = data.ID;

        this.level = data.level;
        this.coins_count = data.coins_count;
        this.levelupValue = data.levelupValue;
        this.levelupCounter = data.levelupCounter;

        this.health = data.health;

        this.animateSpeed = 14; //TODO: вынести в character
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    /**
     * Установка параметров юнита
     * @param data
     */
    set(data){

        this.room_id = data.room_id;
        this.x = data.x;
        this.y = data.y;
        this.character = characters[data.character_id] || characters[CHARACTER_DEFAULT];

        this.name = data.ID;

        this.state = data.state;

        this.level = data.level;
        this.coins_count = data.coins_count;
        this.levelupValue = data.levelupValue;
        this.levelupCounter = data.levelupCounter;

        this.health = data.health;

    }

    animate(){
        //Анимация
        this.faza += this.animateSpeed * STEP;
        this.currentSpriteNum = Math.floor(this.faza);


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
        if(
            x < -this.character.width ||
            y < -this.character.height ||
            x > camera.width ||
            y > camera.height
        ) {
            return true;
        }

        this.drawCharacter(camera.context, x, y);


        // Если есть - рисуем индикатор
        if(this.health!=undefined) {

            let volume;

                volume = Math.floor(this.health*100/MAX_HEALTH);

            this.drawVolume(camera.context, x, y - 50, volume);
        }

        let ly = this.levelupCounter!=undefined ? y-60 : y-50;

        // Рисуем имя
        if(this.level!=undefined) {
            this.drawName(camera.context, x, ly, this.name, this.level);
        }
    }


    drawCharacter(context, sx, sy){
        let x = sx - (this.character.width-this.width)/2,
            y = sy - (this.character.height-this.height);

        this.character.draw(context, x, y, this.state, this.currentSpriteNum, this.width, this.height);

        // Рисуем пятно коллизий
        /*context.save();
        context.beginPath();
        context.fillStyle = "rgba(255,255,67,0.4)";
        context.fillRect(sx, sy, this.width, this.height);
        context.rect(x, y, this.character.width, this.character.height);
        context.stroke();
        context.restore();*/
    }


    /**
     * Рисуем индикатор
     * @param context
     * @param x
     * @param y
     * @param value
     */
    drawVolume(context, x, y, value){

        let volumeWidth = 50;
        let volumeHeight = 4;
        let volumeX = x + (this.width - volumeWidth)/2;
        let volumeY = y;


        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(volumeX, volumeY, Math.floor(volumeWidth*value/100), volumeHeight);
        context.rect(volumeX-1, volumeY-1, volumeWidth+2, volumeHeight+2);
        context.stroke();
        context.restore();
    }


    /**
     * Рисуем имя
     * @param context
     * @param sx
     * @param sy
     * @param name
     */
    drawName(context, sx, sy, name, level){

        context.save();

        //Имя
        context.fillStyle = "yellow";
        context.font = "14px sans-serif";

        let textWidth = context.measureText(name).width,
            x = sx + (this.width - textWidth)/2,
            y = sy;

        context.fillText(name,x,y);

        //Уровень
        let textLevelWidth = context.measureText(level).width,
            lx = x - 2 - textLevelWidth,
            ly = y;

        context.font = "bold 12px Arial";
        context.fillStyle = "white";
        context.fillText(level,lx,ly);

        context.restore();
    }
}