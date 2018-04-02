const rooms = require("../rooms");

module.exports = Push;
/**
 * Эффект толчка
 * @param from
 * @param author
 * @constructor
 */
function Push(from, author) {
    this.from = from;
    this.speed = 2300;
    this.duration = 0.1;
    this.distance = 100;
    this.entity = 'push-effect';
    this.sound = 'push-effect';
    this.author = author;

    this.started = false;

    this.faza = 0.0;
}

Push.prototype.attach = function(targets){

    for(let id in targets){

        //Если разные комнаты, то не воздействует
        if(this.from.room_id !== targets[id].room_id) continue;

        //На себя не применяем вообще
        if(targets[id].ID === this.author.ID) continue;

        //TODO: Проверка условий эффекта (например расстояние до источника)

        //Если этот эффект ещё не применен
        if ('push' in targets[id].effects===false) {

            //Проверим условия
            //Расстояние до источника
            let
                dx = targets[id].x - this.from.x,
                dy = targets[id].y - this.from.y,
                distance = Math.sqrt(dx*dx + dy*dy);

            if(distance <= this.distance) {

                //Применим
                targets[id].effects.push = new Push(this.from, this.author);
            }
        }
    }
};


Push.prototype.run = function (target) {
    //На автора не действует
    if(this.author.ID===target.ID){
        delete target.effects.push;
        return null;
    }


    if(!this.started){
        this.started = true;

        //В начале сохраним скорость цели
        // this.oldSpeed = target.speed;

        //И её начальную позицию
        this.oldX = target.x;
        this.oldY = target.y;

        //Зададим цели скорость эффекта
        // target.speed = this.speed;
    }

    if (this.faza < this.duration) {

        this.faza += STEP;

        //Если источник под целью сдвинем цель в случайном направлении
        if(this.from.x === target.x && this.from.y === target.y){
            target.x += Math.random()*10 - 5;
            target.y += Math.random()*10 - 5;
        }

        //Вектор перемещения
        let increment = this.speed * STEP,
            x = target.x - this.from.x,
            y = target.y - this.from.y,
            l = Math.sqrt(x * x + y * y),
            x_increment = increment * x / l,
            y_increment = increment * y / l;

        target.x += x_increment;
        target.y += y_increment;
        target.change = true;
        return null;
    }

    //По окончании восстановим скорость
    // target.speed = this.oldSpeed;

    //Сбросим цель движения
    target.target = false;

    //И выроним монету в начальной позиции
    if(target.coins_count) {
        target.coins_count--;
        let room = rooms.get(target.room_id);
        room.addCoin(this.oldX, this.oldY);
    }

    //Отнимем здоровья
    //TODO: Отнимать в зависимости от защиты
    target.hit(50);

    //Удалим эффект
    delete target.effects.push;
    target.change = true;

    return null;
};