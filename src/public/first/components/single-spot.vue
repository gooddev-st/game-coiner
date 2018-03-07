<template>
    <div class="single-spot" :style="position" @click="chose()"></div>
</template>

<script>
    export default {
        name: "single-spot",
        props: {
            value: Object,
        },
        data() {
            return {
                width: 50,
                height: 50
            }
        },
        computed: {
            position() {
                return 'left: '+(this.value.left-this.width/2)+'px; top: '+(this.value.top-this.height/2)+'px;';
            }
        },
        methods: {
            chose() {
                alert('Чё се ты мастер?!');
            }
        },
    }
</script>

<style scoped>
    .single-spot{
        width: 50px;
        height: 50px;
        z-index: 5;
        position: fixed;
        background-color: red;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        transition: all .4s ease-in-out;
    }
</style>