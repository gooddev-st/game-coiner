import Vue from 'vue/dist/vue.js'

// import fieldZero from './components/game-field.vue'
// import field from './components/game-pad.vue'
import field from './components/game-rocks.vue'
import singleSpot from  './components/single-spot.vue'

new Vue({
    el: '#app',
    components: {
        field,
        singleSpot
    },
    data: {
        hello: 'Hello, Q-Dev!',
        spotPosition:{
            left: 119,
            top: 49
        },
        columns: 20,
        active: false,
        start_menu_need: true,
        timer: null,
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
    methods:{
        setSpotPosition(event) {
            let left = event.clientX,
                top = event.clientY;
            this.spotPosition = {left:left, top: top};
        },
        activate(){
            var field = this.$refs['game_field'];
            this.timer = setInterval(() => {

                let width = field.clientWidth,
                    height = field.clientHeight,
                    left = Math.ceil(Math.random()*width),
                    top = Math.ceil(Math.random()*height);
                this.spotPosition = {left:left, top: top};

            }, 500);
        },
        deactivate(){
            clearInterval(this.timer);
            this.timer = null;
        },
    },
    mounted(){

    }
});