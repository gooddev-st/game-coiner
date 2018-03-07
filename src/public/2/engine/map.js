/**
 * @class Map
 */
export default class {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.image = null;

        this.generate();
    }
    randomCSScolor(){
        let r = 120+Math.floor(Math.random()*10),
            g = 120+Math.floor(Math.random()*16),
            b = 100+Math.floor(Math.random()*5);
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
                ctx.fillStyle = this.randomCSScolor();
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

        let sw = camera.canvas.width,
            sh = camera.canvas.height,
            dx = 0,
            dy = 0,
            dw,
            dh;

        if(this.image.width - camera.x < sw){
            sw = this.image.width - camera.x;
        }
        if(this.image.height - camera.y < sh){
            sh = this.image.height - camera.y;
        }

        dw = sw;
        dh = sh;

        camera.context.drawImage(this.image, camera.x, camera.y, sw, sh, dx, dy, dw, dh);
    }
}