/**
 * Необходимость обновить клиент
 */


const needUpdateElement = document.getElementById("need-update");


export default {show, hide}


function show(title) {
    if(title){
        let titleElement = waitScreenElement.querySelector('.title');
        if(titleElement){
            titleElement.innerHTML = title;
        }
    }
    waitScreenElement.style.display = 'block';
}

function hide() {
    waitScreenElement.style.display = 'none'
}
