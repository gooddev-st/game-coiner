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
     */
    constructor(room_id, x, y, character, name, state, level, coins_count, levelupCounter){
        this.room_id = room_id;

        this.x = x;
        this.y = y;

        this.width = 100;
        this.height = 100;

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

        let x = (this.x-this.width/2) - camera.x,
            y = (this.y-this.height/2) - camera.y;

        this.character.draw(camera.context, x, y, this.width, this.height, this.state, this.currentSpriteNum);


        // Если есть - рисуем индикатор
        if(this.levelupCounter!=undefined && this.levelupCounter!=null) {
            let volume = Math.floor(10 - this.levelupCounter % 11) * 10;
            this.drawVolume(camera.context, x, y, this.width, this.height, volume);
        }

        // Если есть - рисуем уровень
        if(this.level!=undefined && this.level!=null) {
            this.drawLevel(camera.context, x, y, this.width, this.height, this.level);
        }

        // Рисуем имя
        if(this.level!=undefined && this.level!=null) {
            this.drawName(camera.context, x, y, this.width, this.height, this.name);
        }
    }

    /**
     * Рисуем индикатор
     * @param context
     * @param x
     * @param y
     * @param width
     * @param height
     * @param value
     */
    drawVolume(context, x, y, width, height, value){

        let volumeWidth = width - 50;

        if(volumeWidth<10) volumeWidth = 10;

        let healthX = Math.floor((width - volumeWidth)/2) + x;

        let healthHeight = Math.floor(height/15);

        context.save();
        context.beginPath();
        context.fillStyle = "red";
        context.fillRect(healthX, y, Math.floor(volumeWidth*value/100), healthHeight);
        context.rect(healthX-1, y-1, volumeWidth+2, healthHeight+2);
        context.stroke();
        context.restore();
    }


    /**
     * Рисуем уровень
     * @param context
     * @param x
     * @param y
     * @param width
     * @param height
     * @param level
     */
    drawLevel(context, x, y, width, height, level){

        context.save();
        context.font = "14px Arial";
        context.fillStyle = "blue";
        context.fillText(level,x,y+7);
        context.restore();
    }


    /**
     * Рисуем имя
     * @param context
     * @param x
     * @param y
     * @param width
     * @param height
     * @param name
     */
    drawName(context, x, y, width, height, name){

        context.save();
        context.fillStyle = "yellow";

        context.font = "14px sans-serif";

        let textWidth = context.measureText(name).width,
            textX = x + Math.floor((width - textWidth)/2);

        context.fillText(name,textX,y-10);
        context.restore();
    }
}