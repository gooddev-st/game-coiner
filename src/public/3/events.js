import io from './node_modules/socket.io-client';

const
    EVENTS = [
        "server",
        "room",
        "player"
    ];

/**
 * object Events
 */
export default {
    socket: null,
    init(it, funcEventHandler){
        this.socket = io.connect('http://games.q-dev.ru');

        for(let event of EVENTS) {
            this.socket.on(event, function(data){
                try{
                    data = JSON.parse(data)
                }
                catch (e){

                }
                let type = data.type ? data.type : "unknown";

                funcEventHandler(it, event, type, data);
            });
        }
    },
    emit(event, data){
        this.socket.emit(event, data);
    }
}