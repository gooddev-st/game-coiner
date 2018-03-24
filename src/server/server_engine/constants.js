module.exports = constants;

function constants() {

    this.FPS = 30;
    this.INTERVAL = 1000/this.FPS; //в миллисекундах
    this.STEP = this.INTERVAL/1000;//в секундах

    this.PLAYER_START_X = 1000;
    this.PLAYER_START_Y = 1000;
    this.PLAYER_START_ROOM = 'paradise';
    this.PLAYER_START_SPEED = 200;
    this.PLAYER_START_HEALTH = 100;
}