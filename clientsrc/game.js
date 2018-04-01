import ui from "./engine/ui/ui.js";

import events from "./events.js";

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

            //TODO: Перед стартом - выбор персонажа, если не выбран

            // Стартуем основную сцену
            sceneMain.start(_ => {

                gameover();
            });
        });



    }


    function gameover(){
        ui.waitScreen.show('Game Over');
    }
