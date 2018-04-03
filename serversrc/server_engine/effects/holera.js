const rooms = require("../rooms");

module.exports = Holera;
/**
 * Эффект Холера (вытягивает жизнь)
 * @param from
 * @param author
 * @constructor
 */
function Holera(from, author) {
    this.name = 'holera';

    this.from = from;
    this.duration = 2.0;
    this.distance = 200;
    this.entity = 'holera-effect';
    this.sound = 'holera-effect';
    this.author = author;

    this.started = false;

    this.faza = 0.0;
}

Holera.prototype.attach = function(targets){

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
                targets[id].effects[this.name] = new Holera(this.from, this.author);
                targets[id].changed = true;
            }
        }
    }
};


Holera.prototype.run = function (target) {
    //На автора не действует
    if(this.author.ID===target.ID){
        delete target.effects[this.name];
        return null;
    }


    if(!this.started){
        this.started = true;
    }

    if (this.faza < this.duration) {

        this.faza += STEP;

        //Отнимем здоровья
        target.hit(1);

        return null;
        /*return {
            x: target.x,
            y: target.y
        };*/
    }

    //Сбросим цель движения
    target.target = false;

    //Удалим эффект
    delete target.effects[this.name];
    target.changed = true;

    return null;
};