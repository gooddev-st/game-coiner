import Controls from './controller.js';

/**
 * @class Camera
 */
export default class {
    constructor(x, y, canvas, follower){
        this.x = x;
        this.y = y;
        this.width = canvas.width;
        this.height = canvas.height;

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.speed = 200;

        this.follower = follower;
    }

    run(map, param, step){
        if(this.follower){
            return this.runFollow(map, this.follower);
        }
        if(param instanceof Controls){
            return this.runControl(map, param, step);
        }
    }

    runFollow(map, player){

        let deadZone = {
            x: 200,
            y: 200
        };
        //Следуем за плеером
        if(player.x - this.x > this.width - deadZone.x) {
            this.x = player.x - this.width + deadZone.x;
        }
        else if(player.x < this.x + deadZone.x) {
            this.x = player.x - deadZone.x;
        }

        if(player.y - this.y > this.height - deadZone.y) {
            this.y = player.y - this.height + deadZone.y;
        }
        else if(player.y < this.y + deadZone.y) {
            this.y = player.y - deadZone.y;
        }

        //Не выходим за границы карты
        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x + this.width > map.width)
            this.x = map.width - this.width;
        if(this.y + this.height > map.height)
            this.y = map.height - this.height;
    }

    runControl(map, controls, step){
        if(controls.left){
            this.x -= this.speed*step;
        }
        if(controls.up){
            this.y -= this.speed*step;
        }
        if(controls.right){
            this.x += this.speed*step;
        }
        if(controls.down){
            this.y += this.speed*step;
        }

        //Не выходим за границы карты
        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x + this.width > map.width)
            this.x = map.width - this.width;
        if(this.y + this.height > map.height)
            this.y = map.height - this.height;
    }
}