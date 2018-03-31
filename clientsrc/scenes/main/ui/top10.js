import events from "../../../events";

let active = false;


/**
 * Окно ТОП-10
 */
export default {start, stop, isActive, show, hide}


// html-елементы в которые покажем информацию

const top10Element = document.getElementById("top10-panel");
const top10ContentElement = document.getElementById("top10-panel-content");



function start() {
    top10Element.addEventListener('mouseup', onClick, false);

    events.on("keyup", (eventName, keyCode)=>{
        if(keyCode==="statistic"){
            if(isActive()){
                hide();
            }
            else{
                show();
            }
        }
    });

    events.on("server", update);

}
function stop(){
    top10Element.removeEventListener('mouseup', onClick, false);
    events.off("server", update);
}

function show() {
    top10Element.style.right = 0;
    active = true;
}

function hide() {
    active = false;
    top10Element.style.right = '-196px';
}

function isActive() {
    return active;
}


function onClick(e){

    if (isActive()) {
        hide();
    }
    else {
        show();
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}


/**
 * Показ информации
 */
function update(eventName, type, data) {
    if(type==="statistic"){
        if(Array.isArray(data.info)){
            let content = '';
            data.info.forEach((player)=>{
                //log(player.ID + ' - ' + player.level);
                content += '\
                    <div class="row">\
                        <div class="label">'+player.ID + ':</div>\
                        <div id="hero_speed" class="value">'+player.score+'</div>\
                    </div>\
';
                top10ContentElement.innerHTML = content;
            });
        }
    }
}