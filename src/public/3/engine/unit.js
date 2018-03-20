/**
 * @class Unit
 *
 */
import {STEP} from "../constants";

export default class Unit{
    /**
     * Конструктор
     * @param room_id
     * @param x
     * @param y
     * @param character
     * @param name
     * @param state
     * @param level
     * @param coins_count
     * @param levelupCounter
     * @param width
     * @param height
     */
    constructor(room_id, x, y, width, height, character, name, state, level, coins_count, levelupCounter){
        this.room_id = room_id;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = character;

        this.state = state;

        this.name = name;

        this.level = level;
        this.coins_count = coins_count;
        this.levelupCounter = levelupCounter;

        this.animateSpeed = 14; //TODO: вынести в character
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    /**
     * Установка параметров юнита
     * @param room_id
     * @param x
     * @param y
     * @param character
     * @param name
     * @param state
     * @param level
     * @param coins_count
     * @param levelupCounter
     */
    set(room_id, x, y, character, name, state, level, coins_count, levelupCounter){
        this.room_id = room_id;
        this.x = x;
        this.y = y;
        this.character = character;

        this.name = name;

        this.state = state;

        this.level = level;
        this.coins_count = coins_count;
        this.levelupCounter = levelupCounter;

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
        if(this.levelupCounter!=undefined && this.levelupCounter!=null) {
            let volume = Math.floor(10 - this.levelupCounter % 11) * 10;
            this.drawVolume(camera.context, x, y, volume);
        }

        // Если есть - рисуем уровень
        if(this.level!=undefined && this.level!=null) {
            this.drawLevel(camera.context, x, y, this.level);
        }

        // Рисуем имя
        if(this.level!=undefined && this.level!=null) {
            this.drawName(camera.context, x, y, this.name);
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

        let volumeWidth = 70;
        let volumeHeight = 9;
        let volumeX = x + (this.width - volumeWidth)/2;
        let volumeY = y - 50;


        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(volumeX, volumeY, Math.floor(volumeWidth*value/100), volumeHeight);
        context.rect(volumeX-1, volumeY-1, volumeWidth+2, volumeHeight+2);
        context.stroke();
        context.restore();
    }


    /**
     * Рисуем уровень
     * @param context
     * @param sx
     * @param sy
     * @param level
     */
    drawLevel(context, sx, sy, level){

        let textWidth = context.measureText(level).width,
            x = sx + (this.width - textWidth)/2,
            y = sy - 42;

        context.save();
        context.font = "bold 11px Arial";
        context.fillStyle = "white";
        context.fillText(level,x,y);
        context.restore();
    }


    /**
     * Рисуем имя
     * @param context
     * @param sx
     * @param sy
     * @param name
     */
    drawName(context, sx, sy, name){

        context.save();
        context.fillStyle = "yellow";

        context.font = "14px sans-serif";

        let textWidth = context.measureText(name).width,
            x = sx + (this.width - textWidth)/2,
            y = sy - 60;

        context.fillText(name,x,y);
        context.restore();
    }
}