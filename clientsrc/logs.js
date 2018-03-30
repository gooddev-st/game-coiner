/**
 * Логирование
 */
export default log

const $logs = document.getElementById('logs');

function log(msg) {
    $logs.innerHTML += '<div class="msg">'+msg+'</div>';
    $logs.parentElement.scrollTop = $logs.scrollHeight;
    console.log(msg);
};