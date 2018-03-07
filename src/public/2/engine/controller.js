import events from '../events.js'
/**
 * @class Controls
 */
export default class KeysController {
    constructor(id){
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.init( this.getKeys(id) );
    }

    getKeys(id){
        switch(id){
            case 2:
                return{
                    LEFT: 65, //A
                    UP: 87, //W
                    RIGHT: 68, //D
                    DOWN: 83 // S
                };

            default:
                return {
                    LEFT: 37, //Left
                    UP: 38, //Up
                    RIGHT: 39, //Right
                    DOWN: 40 //Down
                };
        }
    }
    
    init(keys){
        const controls = this;

        window.addEventListener("keydown", function(e){
            switch(e.keyCode)
            {

                case keys.LEFT: // left arrow
                    controls.left = true;
                    events.emit('keydown', 'left');
                    break;
                case keys.UP: // up arrow
                    controls.up = true;
                    events.emit('keydown', 'up');
                    break;
                case keys.RIGHT: // right arrow
                    controls.right = true;
                    events.emit('keydown', 'right');
                    break;
                case keys.DOWN: // down arrow
                    controls.down = true;
                    events.emit('keydown', 'down');
                    break;
            }
        }, false);

        window.addEventListener("keyup", function(e){
            switch(e.keyCode)
            {
                case keys.LEFT:
                    controls.left = false;
                    events.emit('keyup', 'left');
                    break;
                case keys.UP:
                    controls.up = false;
                    events.emit('keyup', 'up');
                    break;
                case keys.RIGHT:
                    controls.right = false;
                    events.emit('keyup', 'right');
                    break;
                case keys.DOWN:
                    controls.down = false;
                    events.emit('keyup', 'down');
                    break;
                // case 32: // пробел для паузы
                //     Game.togglePause();
                //     break;
            }
        }, false);
    }
}