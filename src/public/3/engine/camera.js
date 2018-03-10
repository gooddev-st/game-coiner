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
            x: 200,
            y: 200
        };

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.speed = 200;

        this.follower = follower;
    }

    resize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

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

        this.deadZone.x = Math.floor(width/2)-50;
        this.deadZone.y = Math.floor(height/2)-50;

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

        //Следуем за плеером
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

        //Не выходим за границы карты
        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x + this.width > room.width)
            this.x = room.width - this.width;
        if(this.y + this.height > room.height)
            this.y = room.height - this.height;
    }
}