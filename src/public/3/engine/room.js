//Настройки рандомных цветов комнаты

const ENVIRONMENTS = {
    0: {
        r: {start: 120, rand: 10},
        g: {start: 120, rand: 16},
        b: {start: 100, rand: 5},
    },
    1: {
        r: {start: 70, rand: 16},
        g: {start: 100, rand: 23},
        b: {start: 100, rand: 5},
    },
};
/**
 * @class Room
 */
export default class {
    constructor(width, height, environment_id){
        this.width = width;
        this.height = height;
        this.environment_id = environment_id;
        this.image = null;

        this.generate();
    }
    randomCSScolor(environment_id){
        let e = ENVIRONMENTS[environment_id];
        let r = e.r.start + Math.floor(Math.random() * e.r.rand ),
            g = e.g.start + Math.floor(Math.random() * e.g.rand),
            b = e.b.start + Math.floor(Math.random() * e.b.rand);
        return 'rgb('+r+','+g+','+b+')';
    }
    generate(){
        var ctx = document.createElement("canvas").getContext("2d"),
            tileWidth = 22,
            tileHeight = 22;
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        var rows = Math.floor(this.width/tileWidth) + 1;
        var columns = Math.floor(this.height/tileHeight) + 1;

        ctx.save();

        for (var x = 0, i = 0; i < rows; x+=tileHeight, i++) {
            for (var y = 0, j=0; j < columns; y+=tileWidth, j++) {
                ctx.beginPath();
                ctx.fillStyle = this.randomCSScolor(this.environment_id);
                ctx.fillRect(x, y, tileWidth, tileHeight);
                ctx.closePath();
            }
        }

        ctx.restore();

        // store the generate map as this image texture
        this.image = new Image();
        this.image.src = ctx.canvas.toDataURL("image/png");

        // clear context
        ctx = null;
    }
    draw(camera){
        if(!this.image) return false;

        var
            sx = 0,
            sy = 0,
            sw = this.width,
            sh = this.height,
            dx = 0,
            dy = 0,
            dw = camera.width,
            dh = camera.height;

        if(camera.width < this.width) {
            sx = camera.x;
            sw = camera.width;
        }
        else{
            // dx = -camera.x;
            dx = Math.floor((camera.width - this.width)/2);
            dw = this.width;
        }

        if(camera.height < this.height) {
            sy = camera.y;
            sh = camera.height;
        }
        else{
            // dy = -camera.y;
            dy = Math.floor((camera.height - this.height)/2);
            dh = this.height;
        }

        /*    var
                sx = camera.x,
                sy = camera.y,
                sw = camera.width,
                sh = camera.height,
                dx = 0,
                dy = 0,
                dw,
                dh;

            if (this.image.width - camera.x < sw) {
                sw = this.image.width - camera.x;
            }
            if (this.image.height - camera.y < sh) {
                sh = this.image.height - camera.y;
            }

            dw = sw;
            dh = sh;
        }
        else{
            var
                sx = 0,
                sy
        }*/

        camera.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}