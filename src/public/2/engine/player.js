/**
 * @class Unit
 */
export default class {
    constructor(startx, starty, character, controller, name){
        this.x = startx;
        this.y = starty;

        this.speed = 200;

        this.width = 44;
        this.height = 44;

        this.character = character;

        this.controller = controller;

        this.state = 'default';

        this.name = name;
        this.coins_count = 0;

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;
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

        this.character.draw(camera.context, x, y, this.width, this.height, this.state, this.currentSpriteNum);
    }

    run(map, step){
        if(this.controller.left || this.controller.up || this.controller.right || this.controller.down){
            if(this.character.sprites['run']) {
                this.state = 'run';
            }
        }
        else{
            this.state = 'default';
        }

        if(this.controller.left){
            this.x -= this.speed*step;
        }
        if(this.controller.up){
            this.y -= this.speed*step;
        }
        if(this.controller.right){
            this.x += this.speed*step;
        }
        if(this.controller.down){
            this.y += this.speed*step;
        }

        if(this.x - this.width/2 < 0){
            this.x = this.width/2;
        }
        if(this.y - this.height/2 < 0){
            this.y = this.height/2;
        }
        if(this.x + this.width/2 >map.width){
            this.x = map.width - this.width/2;
        }
        if(this.y + this.height/2 >map.height){
            this.y = map.height - this.height/2;
        }

        //Анимация
        this.faza += this.animateSpeed * step;
        this.currentSpriteNum = Math.floor(this.faza);


        if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprites[this.state].length) {
            this.faza = 0;
            this.currentSpriteNum = 0;
        }
    }

    //Определение соприкосновения с объектом(монетой)
    isTouch(loot){
        if (
            this.x < loot.x + loot.width
            &&
            this.x + this.width > loot.x
            &&
            this.y < loot.y + loot.height
            &&
            this.height + this.y > loot.y
        ) {
            return true;
        }
        return false;
    }
}