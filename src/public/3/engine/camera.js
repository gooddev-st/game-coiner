/**
 * Модуль камеры
 */

const MAX_DEADZONE_X = 200;
const MAX_DEADZONE_Y = 200;

/**
 * @class Camera
 */
export default class {
    constructor(x, y, canvas, follower){
        this.x = x;
        this.y = y;
        this.width = canvas.width;
        this.height = canvas.height;

        this.deadZone = {
            x: MAX_DEADZONE_X,
            y: MAX_DEADZONE_Y
        };

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.speed = 200;

        this.follower = follower;
    }

    resize(){

        let width = window.innerWidth;
        let height = window.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        let x = this.x - Math.floor((width - this.width)/2);
        let y = this.y - Math.floor((height - this.height)/2);
        if(x < 0) x = 0;
        if(y<0) y = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }

    run(room){

        if(this.follower){
            return this.runFollow(room, this.follower);
        }
    }

    setFollower(follower){
        this.follower = follower;
    }

    runFollow(room, player){

        /**
         * Пересчитаем "мертвые зоны"
         */

        // Берем половину камеры
        this.deadZone.x = Math.floor(this.width/2);
        this.deadZone.y = Math.floor(this.height/2);


        // Учтем, что комната может быть меньше камеры
        if(room.width < this.canvas.width){
            this.deadZone.x = Math.floor((room.width - this.canvas.width)/2);
        }
        if(room.height < this.canvas.height){
            this.deadZone.y = Math.floor((room.height - this.canvas.height)/2);
        }

        // Не делаем очень большие "мертвые зоны"
        if(this.deadZone.x > MAX_DEADZONE_X){
            this.deadZone.x = MAX_DEADZONE_X;
        }
        if(this.deadZone.y > MAX_DEADZONE_Y){
            this.deadZone.y = MAX_DEADZONE_Y;
        }


        /**
         * Следуем за плеером
         */
        if(player.x - this.x > this.width - this.deadZone.x) {
            this.x = player.x - this.width + this.deadZone.x;
        }
        else if(player.x < this.x + this.deadZone.x) {
            this.x = player.x - this.deadZone.x;
        }

        if(player.y - this.y > this.height - this.deadZone.y) {
            this.y = player.y - this.height + this.deadZone.y;
        }
        else if(player.y < this.y + this.deadZone.y) {
            this.y = player.y - this.deadZone.y;
        }

        /**
         * Не выходим за границы карты
         */
        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x + this.width > room.width)
            this.x = room.width - this.width;
        if(this.y + this.height > room.height)
            this.y = room.height - this.height;


        /**
         * Если камера больше карты - добавим смещение
         */
        if(this.width > room.width)
            this.x += (this.width - room.width)/2;
        if(this.height > room.height)
            this.y += (this.height - room.height)/2;


    }
}