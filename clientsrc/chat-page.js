/**
 * Отдельная страница чата (chat.html) - для отладки. Входит только в чат, персонаж в игре не появляется
 */
import events from './events'
import ui from './engine/ui/ui'
import account from './account'
import chat from './scenes/main/ui/chat'

window.onload = function () {

    ui.waitScreen.show('Подключение');

    events.init(function () {
        ui.waitScreen.hide();

        // После переподключения - заново
        chat.stop();
        chat.start({standalone: true});
    }, 'chat-login');

    // При выходе выключаем пуши в этом браузере, чтобы не приходили сообщения прежнего пользователя
    document.getElementById('chat-signout').addEventListener('click', function () {
        chat.disablePush().then(function () {
            account.signout();
            window.location.reload();
        });
    }, false);
};
