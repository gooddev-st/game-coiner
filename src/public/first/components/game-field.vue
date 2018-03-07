<template>
    <div class="game-field"
         ref="field">
        <div class="tile"
             v-for="i in rows*columns"
             :style="'background-color: '+tilesStyles[i]"></div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "game-field",
        data() {
            return {
                columns: 20,
                rows: 20,
                tilesStyles: new Array(500)
            }
        },
        methods: {
            randomColor() {
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
            }
        },
        created(){
            this.randomTable();
        },
        mounted(){
            setInterval(() => {
                this.randomTable();
            }, 1000);
        }
    }
</script>

<style lang="scss" scoped>
    $columns: 20;
    $rows: 20;
    $tile_width: 100vw/$columns;
    $tile_height: 100vh/$rows;
    .game-field {
        z-index: 10;
        position: fixed;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        width: $tile_width*$columns;
        background-color: lightgray;
        .tile{
            float: left;
            font-size: 10px;
            width: $tile_width;
            height: $tile_height;
            border-radius: 20%;
        }
    }
</style>