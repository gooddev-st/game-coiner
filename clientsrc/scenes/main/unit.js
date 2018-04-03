/**
 * @class Unit
 *
 */
import {STEP} from "../../constants";
import characters from "../../characters";
import entities from "./entities";
import Entity from "./entity";

const CHARACTER_DEFAULT = 'blond';

const MAX_HEALTH = 100;

export default class Unit{
    /**
     * Конструктор
     * @param data
     */
    constructor(data, isHero){

        if(isHero){
            this.isHero = true;
        }

        this.room_id = data.room_id;

        this.x = data.x;
        this.y = data.y;

        this.width = data.width;
        this.height = data.height;

        this.character = characters.get(data.character_id) || characters.get(CHARACTER_DEFAULT);

        this.state = data.state || 'default';

        this.name = data.name;

        this.level = data.level;
        this.coins_count = data.coins_count;
        this.levelupValue = data.levelupValue;
        this.levelupCounter = data.levelupCounter;

        this.health = data.health;

        this.effects = [];//TODO: Применять при создании

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
        this.character = characters.get(data.character_id) || characters.get(CHARACTER_DEFAULT);

        this.name = data.name;

        if(this.state !== data.state){
            this.faza = 0;
            this.currentSpriteNum = 0;
        }
        this.state = data.state;

        this.level = data.level;
        this.coins_count = data.coins_count;
        this.levelupValue = data.levelupValue;
        this.levelupCounter = data.levelupCounter;

        this.health = data.health;

        this.updateEffects(data.effects);

    }

    updateEffects(effects){
        let existsEffect = {};

        for(let i in effects){
            //Если новый эффект - создадим
            if(effects[i] in this.effects===false) {

                if (effects[i] === 'freeze') {
                    let entity = new Entity(this.x + this.width / 2, this.y + 18, characters.get('freeze'), 0.0, 0.0);
                    this.effects[effects[i]] = entity;
                    entities.addOne(entity);
                }

                if (effects[i] === 'holera') {
                    let entity = new Entity(this.x + this.width / 2, this.y + 18, characters.get('blackboom_big'), 0.0, 0.0);
                    this.effects[effects[i]] = entity;
                    entities.addOne(entity);
                }

            }
            existsEffect[effects[i]] = true;
        }

        //По окончании эффекта - уберем
        for(let effectID in this.effects){
            if(effectID in existsEffect===false){
                this.effects[effectID].kill();
                delete this.effects[effectID];

            }
        }

    }

    animate(){
        //Анимация
        this.faza += this.animateSpeed * STEP;
        this.currentSpriteNum = Math.floor(this.faza);


        if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length) {
            this.faza = 0;
            this.currentSpriteNum = 0;
        }

        //Анимация эффектов
        for(let i in this.effects){
            this.effects[i].x = this.x+this.width/2;
            this.effects[i].y = this.y+18;
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

        this.drawShadow(camera.context, x, y);

        this.drawCharacter(camera.context, x, y);

        // Рисуем имя
        if(this.level!=undefined) {

            this.drawName(camera.context, x, y-55, this.name, this.level, this.isHero);
        }

        // Если есть - рисуем индикатор
        if(this.health!=undefined) {

            let volume;

            volume = Math.floor(this.health*100/MAX_HEALTH);

            this.drawVolume(camera.context, x, y - 50, volume);
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
     * @param level
     * @param isHero
     */
    drawName(context, sx, sy, name, level, isHero){

        let paddingColor = "rgba(0,0,0,0.3)";
        if(isHero){
            paddingColor = "rgba(0,200,40,0.4)";
        }

        context.save();

        //Имя
        context.font = "14px sans-serif";
        let textWidth = context.measureText(name).width;

        //Уровень
        context.font = "bold 12px Arial";
        let textLevelWidth = context.measureText(level).width;

        //Считаем размеры
        let padWidth = textWidth + textLevelWidth + 2;

        let lx = sx+(this.width - padWidth)/2,
            x = lx + textLevelWidth + 2,
            ly = sy,
            y = sy;


        context.beginPath();
        context.fillStyle = paddingColor;
        context.arc(lx-2, y-12+18/2, 18/2, Math.PI/2, -Math.PI/2);
        context.arc(lx-2+padWidth, y-12+18/2, 18/2, -Math.PI/2, Math.PI/2);
        context.rect(lx-2, y-12, padWidth, 18);
        context.fill();
        context.beginPath();

        context.font = "14px sans-serif";
        context.fillStyle = "yellow";
        context.fillText(name,x,y);

        context.font = "bold 12px Arial";
        context.fillStyle = "white";
        context.fillText(level,lx,ly);

        context.restore();
    }


    drawShadow(context, x, y){

        let
            shadowColor1 = "rgba(0,0,0,0.1)",
            shadowColor2 = "rgba(0,0,0,0.15)",
            shadowColor3 = "rgba(0,0,0,0.2)";

        context.save();

        context.beginPath();
        context.fillStyle = shadowColor1;
        context.ellipse(x + this.width/2, y+this.height-2, 20, 10, 0, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.fillStyle = shadowColor2;
        context.ellipse(x + this.width/2, y+this.height-2, 17, 8, 0, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.fillStyle = shadowColor2;
        context.ellipse(x + this.width/2, y+this.height-2, 15, 7, 0, 0, 2 * Math.PI);
        context.fill();

        context.restore();
    }


    destroy(){
        for(let effectID in this.effects){
            this.effects[effectID].kill();
            delete this.effects[effectID];
        }
    }
}