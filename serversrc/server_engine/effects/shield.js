module.exports = Shield;
/**
 * Эффект Холера (вытягивает жизнь)
 * @param from
 * @param author
 * @constructor
 */
function Shield(author) {
    this.name = 'shield';

    this.duration = 5.0;//60.0*60.0*2.0;//2 часа

    this.protect = 500;

    this.entity = 'shield-effect';
    this.sound = 'shield-effect';
    this.author = author;

    this.started = false;

    this.faza = 0.0;
}

Shield.prototype.attach = function(targets){

    for(let id in targets){

        //На себя
        if(targets[id].ID === this.author.ID) {

            //Если этот эффект ещё не применен
            if (this.name in targets[id].effects === false) {
                //Применим
                targets[id].effects[this.name] = new Shield(this.from, this.author);
                targets[id].changed = true;
            }
        }
    }
};


Shield.prototype.run = function (target) {
    //Действует только на автора
    /*if(this.author.ID!==target.ID){
        delete target.effects[this.name];
        return null;
    }*/


    if(!this.started){
        this.started = true;
    }

    if (this.faza < this.duration) {

        this.faza += STEP;

        target.protect = this.protect;

        return null;
        /*return {
            x: target.x,
            y: target.y
        };*/
    }

    //Удалим эффект
    delete target.effects[this.name];

    target.protect = 0;

    target.changed = true;

    return null;
};