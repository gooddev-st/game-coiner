import ui from "./engine/ui/ui.js";

import account from "./account.js";

import events from "./events.js"

import signIn from "./scenes/signin";

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
        ui.waitScreen.show();


        // Подключаемся к серверу
        events.init();

        events.on("server", (event, type, data)=>{

            if (type == "hello") {

                let login = account.getUser();

                if(!login) {

                    // запросим логин
                    signIn.start(login, (login) => {

                        // Получив сохраним
                        account.setUser(login);

                        start(login);

                    });
                }
                else{
                    start(login);
                }
            }

        });

    }


    function start(login) {
        // отправим логин серверу
        events.add('login', login);

        // Стартуем основную сцену
        sceneMain.start(() => {

            gameover();
        });
    }


    function gameover(){
        ui.waitScreen.show();
    }
