<template>
    <div class="game-pad">
        <canvas
                ref="canvas"></canvas>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "game-pad",
        data() {
            return {
                columns: 20,
                rows: 10,
                updateInterval: 1000,
                canvas: null,
                $canvas: null,
                viewPort:{
                    width: 400,
                    height: 300
                },
                timer: null
            }
        },
        computed: {
            tileWidth() {
                return Math.floor(this.viewPort.width / this.columns);
            },
            tileHeight() {
                return Math.floor(this.viewPort.height / this.rows);
            }
        },
        methods: {
            showBar(x, y, color) {
                let ctx = this.canvas;
                ctx.beginPath();
                ctx.rect(x, y, this.tileWidth, this.tileHeight);
                ctx.fillStyle = color;
                ctx.fill();
            },
            showMap(){
                for(let i=0;i<this.rows;i++) {
                    for(let j=0;j<this.columns;j++) {

                        let x = j * this.tileWidth,
                            y = i * this.tileHeight,
                            color = this.randomCSScolor();
                        this.showBar(x, y, color);

                    }
                }
            },
            randomCSScolor(){
                let r = 120+Math.ceil(Math.random()*10),
                    g = 220+Math.ceil(Math.random()*16),
                    b = 200+Math.ceil(Math.random()*5);
                return 'rgb('+r+','+g+','+b+')';
            },
            randomTable(){
                var ar = new Array(this.tilesStyles.length);
                for(let i=0;i<this.tilesStyles.length;i++){
                    ar[i] = this.randomColor();
                }
                this.tilesStyles = ar;
            },
            run(){
                this.updateViewPort();



                this.showMap();
            },
            init(){
                this.$canvas = this.$refs.canvas;
                this.canvas = this.$canvas.getContext('2d');

                this.updateViewPort();
                this.showMap();
            },
            updateViewPort(){
                this.$canvas.width = this.$canvas.parentElement.clientWidth;
                this.$canvas.height = this.$canvas.parentElement.clientHeight;
                this.viewPort.width = this.$canvas.width;
                this.viewPort.height = this.$canvas.height;
            },
            activate(){
                this.timer = setInterval(() => {
                    this.run();
                }, this.updateInterval);
            },
            deactivate(){
                clearInterval(this.timer);
            }
        },
        mounted(){
            this.init();
            this.activate()
        }
    }
</script>

<style scoped>
    .game-pad {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: lightgray;
    }
</style>