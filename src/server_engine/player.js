const
    PLAYER_WIDTH = 44,
    PLAYER_HEIGHT = 44,
    PLAYER_SPEED = 200;

module.exports = Player;

function Player(playerID, socket, x, y, character_id, room_id) {
    this.x = x;
    this.y = y;
    this.character_id = character_id;
    this.room_id = room_id;
    this.state = 'default';
    this.coins_count = 0;

    this.socket = socket;
    this.ID = playerID;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.speed = PLAYER_SPEED;

    this.online = true;

    //Есть ли изменения для отсылки
    this.changed = true;

    this.controller = {
        up: false,
        left: false,
        right: false,
        down: false,
    };
}

Player.prototype.reset = function (socket) {
    this.socket = socket;
    this.controller.up = false;
    this.controller.left = false;
    this.controller.right = false;
    this.controller.down = false;

    this.online = true;
};

Player.prototype.run = function (room, step) {
    if (this.controller.left || this.controller.up || this.controller.right || this.controller.down) {
        this.changed = true;
        this.state = 'run';
    }
    else if(this.state != 'default'){
        this.changed = true;
        this.state = 'default';
    }

    if (this.controller.left) {
        this.x -= this.speed * step;
    }
    if (this.controller.up) {
        this.y -= this.speed * step;
    }
    if (this.controller.right) {
        this.x += this.speed * step;
    }
    if (this.controller.down) {
        this.y += this.speed * step;
    }

    if (this.x - this.width / 2 < 0 + room.dead_zone_left) {
        this.x = this.width / 2 + room.dead_zone_left;
    }
    if (this.y - this.height / 2 < 0 + room.dead_zone_top) {
        this.y = this.height / 2 + room.dead_zone_top;
    }
    if (this.x + this.width / 2 > (room.width - room.dead_zone_right)) {
        this.x = room.width - room.dead_zone_right - this.width / 2;
    }
    if (this.y + this.height / 2 > (room.height - room.dead_zone_bottom)) {
        this.y = room.height - room.dead_zone_bottom - this.height / 2;
    }
};

Player.prototype.commonInfo = function(){
    return {
        ID: this.ID,
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,
        coins_count: this.coins_count,
        room_id: this.room_id,

        online: this.online,
    }
};

Player.prototype.allInfo = function(){
    return {
        x: this.x,
        y: this.y,
        character_id: this.character_id,
        state: this.state,
        coins_count: this.coins_count,
        room_id: this.room_id
    }
};