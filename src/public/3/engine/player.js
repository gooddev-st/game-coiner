import Unit from './unit.js'
/**
 * @class Player
 */
export default class {
    constructor(unit, controllerKeys, socket){
        this.unit = unit;

        this.controllerKeys = controllerKeys;

        controllerKeys && this.initController(socket);
    }

    set(room_id, x, y, character, state, coins_count){
        this.unit.set(room_id, x, y, character, state, coins_count)
    }

    run(event, data){

    }

    animate(step){
        this.unit.animate(step);
    }

    draw(camera){
        this.unit.draw(camera);
    }

    initController(socket){
        const keys = this.controllerKeys;

        //Если окно потеряло фокус - отожмем все клавиши
        window.addEventListener("blur", function(e){
            socket.emit('keyup', 'left');
            socket.emit('keyup', 'up');
            socket.emit('keyup', 'right');
            socket.emit('keyup', 'down');
        });

        window.addEventListener("keydown", function(e){
            switch(e.keyCode)
            {

                case keys.LEFT: // left arrow
                    socket.emit('keydown', 'left');
                    // console.log('нажата влево')
                    break;
                case keys.UP: // up arrow
                    socket.emit('keydown', 'up');
                    break;
                case keys.RIGHT: // right arrow
                    socket.emit('keydown', 'right');
                    break;
                case keys.DOWN: // down arrow
                    socket.emit('keydown', 'down');
                    break;
            }
        }, false);

        window.addEventListener("keyup", function(e){
            switch(e.keyCode)
            {
                case keys.LEFT:
                    socket.emit('keyup', 'left');
                    break;
                case keys.UP:
                    socket.emit('keyup', 'up');
                    break;
                case keys.RIGHT:
                    socket.emit('keyup', 'right');
                    break;
                case keys.DOWN:
                    socket.emit('keyup', 'down');
                    break;
                // case 32: // пробел для паузы
                //     Game.togglePause();
                //     break;
            }
        }, false);
    }
}