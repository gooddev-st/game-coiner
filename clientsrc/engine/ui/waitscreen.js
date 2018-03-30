/**
 * Экран загрузки
 */


const waitScreenElement = document.getElementById("loading");


export default {show, hide}


function show() {
    waitScreenElement.style.display = 'block';
}

function hide() {
    waitScreenElement.style.display = 'none'
}
