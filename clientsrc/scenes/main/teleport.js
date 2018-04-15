import characters from "../../characters";

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

    set(info){

        if(this.state !== info.state){
            this.faza = 0;
            this.currentSpriteNum = 0;
            this.state = info.state;
        }

        this.target = {
            room_id: info.target.room_id,
            x: info.target.x,
            y: info.target.y
        };
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

        //Пятно цвета соответствующее комнате
        const rooms_colors = {
            'start': 'rgba(255, 255, 0, 0.8)',
            'forest': 'rgba(150, 220, 20, 0.8)',
            'hell': 'rgba(255, 0, 57, 0.8)',
            'paradise': 'rgba(0, 150, 255, 0.8)',
            'pandora': 'rgba(0, 150, 0, 0.8)',
            'tartar': 'rgba(55, 55, 0, 0.8)',
            'sea': 'rgba(170, 45, 210, 0.8)',
        };


        let color = rooms_colors[this.target.room_id];
        if(color == undefined) color = 'rgba(0, 0, 0, 0.0)';

        camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = color;
        camera.context.ellipse(x + this.width/2+10, y+this.height-11, 10, 4, 0, 0, 2 * Math.PI);
        camera.context.fill();
        camera.context.restore();

        // Рисуем пятно коллизий
        /*camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = "rgba(255,255,67,0.4)";
        camera.context.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
        camera.context.rect(x, y, this.character.width, this.character.height);
        camera.context.stroke();
        camera.context.restore();*/
    }

    drawSpot(){

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