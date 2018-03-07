<template>
    <div class="game-rocks">
        <canvas ref="canvas"></canvas>
        <slot></slot>
    </div>
</template>

<script>
    import Engine from '../game_engine/engine.js'

    export default {
        name: "game-pad",
        props: {
            active: Boolean,
        },
        data() {
            return {
                columns: 30,
                rows: 15,
                updateInterval: 100,
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
                return Math.round(this.viewPort.width / this.columns);
            },
            tileHeight() {
                return Math.round(this.viewPort.height / this.rows);
            }
        },
        watch: {
            active: function (newActive, oldActive) {
                if(newActive){
                    if(!this.timer) {
                        this.activate();
                    }
                }
                else this.deactivate();
            }
        },
        methods: {
            showBar(x, y, color) {
                let ctx = this.canvas;
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
            },
            showStep(x, step){
                for(let i=0;i<this.rows;i++) {
                    let y = i * this.tileHeight,
                        color = step[i];
                    this.showBar(x, y, color);
                }
            },
            showMap(){
                for(let i=0;i<this.columns;i++) {

                    let x = (this.columns - i - 1) * this.tileWidth,
                        step = Engine.getStep(i);
                    if(step) {
                        this.showStep(x, step);
                    }
                }
            },
            randomCSScolor(){
                let r = 20+Math.ceil(Math.random()*10),
                    g = 20+Math.ceil(Math.random()*16),
                    b = 100+Math.ceil(Math.random()*5);
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

                this.generateStep();

                this.showMap();
            },
            init(){
                this.$canvas = this.$refs.canvas;
                this.canvas = this.$canvas.getContext('2d');

                for(let i=0;i<this.columns;i++) {
                    this.generateStep();
                }

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
                this.timer = null;
            },
            generateStep(){
                //В шаг - цвета для новой колонки
                var ar = [];
                for(let i=0;i<this.rows;i++){
                    var color = this.randomCSScolor();
                    ar.push(color);
                }
                Engine.newStep(ar);
            }
        },
        mounted(){
            this.init();
            // this.activate()
        }
    }
</script>

<style scoped>
    .game-rocks {
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