import io from './node_modules/socket.io-client';

const
    A = 1;

/**
 * object Events
 */
export default {
    socket: null,
    init(){
        this.socket = io.connect('http://games.q-dev.ru');
        this.socket.on("hello", function(serverData) {
            console.log(serverData);
        });
        this.socket.on("message", function(serverData) {
            console.log(serverData);
        });
    },
    emit(event, data){
        this.socket.emit(event, data);
    }
}