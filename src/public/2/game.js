import KeysController from './engine/controller.js';
import Map from './engine/map.js';
import Camera from './engine/camera.js';
import Sprite from './engine/sprite.js';
import Character from "./engine/character.js";
import Player from './engine/player.js';
import Loot from './engine/loot.js';
import Sound from './engine/sound.js';

const
    FPS = 30,
    INTERVAL = 1000/FPS, //в миллисекундах
    STEP = INTERVAL/1000,//в секундах

    KEYS_ARROW = 1,//Управление стрелками
    KEYS_WASD = 2;//Управление кнопками W A S D

/**
 * class Game
 */
export default class {

    constructor(){

        //Клавиатурные контроллеры
        let controllerWASD = new KeysController(KEYS_WASD),
            controllerArrows = new KeysController(KEYS_ARROW);

        //Картинки спрайтов
        let sprites_image = document.getElementById('sprites'),
            sprites_image2 = document.getElementById('sprites2'),
            sprites_image_coins = document.getElementById('coins');;

        /*
         *   Скины персонажей
         */

        //Доктор
        let char_doctor = new Character([
            new Sprite(sprites_image, 0, 224, 32, 32),
        ]);
        char_doctor.setStateSprites('run', [
            new Sprite(sprites_image, 32, 224, 32, 32),
            new Sprite(sprites_image, 64, 224, 32, 32),
        ]);

        //Какой-то мужик с фанариком
        let char_man = new Character([
            new Sprite(sprites_image2, 7, 140, 50, 50)
        ]);
        char_man.setStateSprites('run', [
            new Sprite(sprites_image2, 200, 140, 50, 50),
            new Sprite(sprites_image2, 455, 140, 50, 50),
        ]);

        //Золотая монета
        let gold_coin = new Character([
            new Sprite(sprites_image_coins, 0, 0, 32, 32),
            new Sprite(sprites_image_coins, 32, 0, 32, 32),
            new Sprite(sprites_image_coins, 64, 0, 32, 32),
            new Sprite(sprites_image_coins, 96, 0, 32, 32),
            new Sprite(sprites_image_coins, 128, 0, 32, 32),
            new Sprite(sprites_image_coins, 160, 0, 32, 32),
            new Sprite(sprites_image_coins, 192, 0, 32, 32),
            new Sprite(sprites_image_coins, 224, 0, 32, 32),
        ]);

        this.map = new Map(1000, 1000);

        this.eat1Sound = new Sound('sound/eat1.mp3');
        this.eat2Sound = new Sound('sound/eat2.mp3');

        let
            player1 = new Player(300, 200, char_doctor, controllerWASD, 'doc'),
            player2 = new Player(600, 200, char_man, controllerArrows, 'man');

        this.units = [
            player1,
            player2
        ];

        this.camera = new Camera(0,0, document.getElementById("canvas"), player1);
        this.camera2 = new Camera(400,0, document.getElementById("canvas2"), player2);

        this.loots = [
            new Loot(450, 300, gold_coin),
            new Loot(450, 400, gold_coin)
        ];
        this.doc_score_table = document.getElementById("doc_coins_count");
        this.man_score_table = document.getElementById("man_coins_count");
    }

    //Сбор монеток
    harvesting(){

        //Перебираем монеты
        for(let i=0; i<this.loots.length;i++){
            let toucher = [];

            //Перебираем юниты
            for(let j=0;j<this.units.length;j++){

                //если юнит - игрок
                if(this.units[j] instanceof Player){
                    //если он коснулся монеты
                    if(this.units[j].isTouch(this.loots[i])){
                        //добавим его в коснувшиеся
                        toucher.push(this.units[j]);
                    }
                }
            }

            //Если монету собрали - переместим в случайное место(типа убрали и создали новую)
            if(toucher.length>0){
                this.loots[i].x = Math.floor(this.loots[i].width/2 + Math.random() * (this.map.width-this.loots[i].width));
                this.loots[i].y = Math.floor(this.loots[i].height/2 + Math.random() * (this.map.height-this.loots[i].height));
            }

            //Если один коснувшийся - ему плюс
            if(toucher.length==1){
                toucher[0].coins_count++;
                console.log('игрок '+toucher[0].name + ' получил монету');

                if(toucher[0].name=='doc'){
                    this.doc_score_table.innerHTML=toucher[0].coins_count;
                    this.eat1Sound.play();
                }
                else{
                    this.man_score_table.innerHTML=toucher[0].coins_count;
                    this.eat2Sound.play();
                }
            }
            //Если одновременно коснулись больше одного игрока - разыграем
            else if(toucher.length>1){
                let winer = Math.floor(Math.random()*toucher.length);
                //победившему - плюс
                toucher[winer].coins_count++;
                console.log('игрок '+toucher[winer].name + ' получил монету');
                //и вякнем звуком
                if(toucher[winer].name=='doc'){
                    this.doc_score_table.innerHTML=toucher[winer].coins_count;
                    this.eat1Sound.play();
                }
                else{
                    this.man_score_table.innerHTML=toucher[winer].coins_count;
                    this.eat2Sound.play();
                }
            }
        }
    }

    run(){
        //Юниты
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].run(this.map, STEP);
        }

        //Лут
        for (let i = 0; i < this.loots.length; i++) {
            this.loots[i].run(STEP);
        }

        //Камеры
        this.camera.run(this.map);
        this.camera2.run(this.map);

        this.harvesting()
    }

    draw(camera){
        this.map.draw(camera);

        for (let i = 0; i < this.loots.length; i++) {
            this.loots[i].draw(camera);
        }
        for (let i = 0; i < this.units.length; i++) {
            this.units[i].draw(camera);
        }
    }

    start() {
        const game = this;
        setInterval(function () {

            //Перемещение
            game.run();

            //Отрисовка
            game.draw(game.camera);
            game.draw(game.camera2);

        }, INTERVAL);
    }
}