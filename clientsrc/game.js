import ui from "./engine/ui/ui.js";

import events from "./events.js";

import sceneChoice from "./scenes/choice"
import sceneMain from "./scenes/main/index.js"


/**
 * Основной класс клиента игры
 * class Game
 */
export default {run}


    /**
     * Запуск основного цикла
     */
    function run() {

        // Пишем "Загрузка"
        ui.waitScreen.show('Старт игры');


        // Подключаемся к серверу
        events.init(function () {

            //выбор персонажа, если не выбран
            // sceneChoice.start(_=>{

                // Стартуем основную сцену
                sceneMain.start(_ => {

                    gameover();

                });

            // });
        });



    }


    function gameover(){
        // Выбитое другим окном сообщение не перетираем
        if (events.isKicked()) return;

        ui.waitScreen.show('Game Over');
    }
