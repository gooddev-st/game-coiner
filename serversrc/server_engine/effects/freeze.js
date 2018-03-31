const rooms = require("../rooms");

module.exports = Freeze;
/**
 * Эффект толчка
 * @param from
 * @param author
 * @constructor
 */
function Freeze(from, author) {
    this.name = 'freeze';

    this.from = from;
    this.speed = 0;
    this.duration = 1.0;
    this.distance = 200;
    this.entity = 'freeze-effect';
    this.sound = 'freeze-effect';
    this.author = author;

    this.started = false;

    this.faza = 0.0;
}

Freeze.prototype.attach = function(targets){

    for(let id in targets){

        //Если разные комнаты, то не воздействует
        if(this.from.room_id !== targets[id].room_id) continue;

        //На себя не применяем вообще
        if(targets[id].ID === this.author.ID) continue;

        //Если этот эффект ещё не применен
        if (this.name in targets[id].effects===false) {

            //Проверим условия
            //Расстояние до источника
            let
                dx = targets[id].x - this.from.x,
                dy = targets[id].y - this.from.y,
                distance = Math.sqrt(dx*dx + dy*dy);

            if(distance <= this.distance) {

                //Применим
                targets[id].effects[this.name] = new Freeze(this.from, this.author);
            }
        }
    }
};


Freeze.prototype.run = function (target) {
    //На автора не действует
    if(this.author.ID===target.ID){
        delete target.effects[this.name];
        return null;
    }


    if(!this.started){
        this.started = true;

        //В начале сохраним скорость цели
        this.oldSpeed = target.speed;

        //Зададим цели скорость эффекта
        target.speed = this.speed;
    }

    if (this.faza < this.duration) {

        this.faza += STEP;

        return {
            x: target.x,
            y: target.y
        };
    }

    //По окончании восстановим скорость
    target.speed = this.oldSpeed;

    //Сбросим цель движения
    target.target = false;

    //Отнимем здоровья
    //TODO: Отнимать в зависимости от защиты
    target.health -= 5;

    //Удалим эффект
    delete target.effects[this.name];

    return null;
};