import Unit from './unit.js'
/**
 * @class Player
 */
export default class {
    constructor(unit, controllerKeys, clickPad, socket){
        this.unit = unit;

        this.controllerKeys = controllerKeys;

        this.clickPad = clickPad;

        controllerKeys && this.initController(socket);

        clickPad && this.initClickPad(socket);
    }

    set(room_id, x, y, character, state, coins_count, level, levelupCounter){
        this.unit.set(room_id, x, y, character, state, coins_count, level, levelupCounter)
    }

    run(event, data){

    }

    animate(step){
        this.unit.animate(step);
    }

    draw(camera){
        this.unit.draw(camera);
    }

    initClickPad(socket){
        const clickPad = this.clickPad;
        window.addEventListener("click", function(e){
            socket.emit('target', {x: e.clientX + clickPad.x, y: e.clientY + clickPad.y});
        });
    }

    initController(socket){
        const keys = this.controllerKeys;

        //Если окно потеряло фокус - отожмем все клавиши
        window.addEventListener("blur", function(e){
            socket.emit('keyup', 'left');
            socket.emit('keyup', 'up');
            socket.emit('keyup', 'right');
            socket.emit('keyup', 'down');
            socket.emit('target', null);
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