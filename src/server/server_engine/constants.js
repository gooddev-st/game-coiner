module.exports = constants;

function constants() {

    this.FPS = 30;
    this.INTERVAL = 1000/this.FPS; //в миллисекундах
    this.STEP = this.INTERVAL/1000;//в секундах

    this.PLAYER_START_X = 500;
    this.PLAYER_START_Y = 500;
    this.PLAYER_START_ROOM = 'start';
    this.PLAYER_START_SPEED = 200;
    this.PLAYER_START_HEALTH = 100;

    this.COINS_GENERATE_INTERVAL = 2.0;

    this.TELEPORT_RANDOM_TARGET = true;
}