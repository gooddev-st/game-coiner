import events from "../events";


/**
 * Умения / эффекты
 */
export default {start, stop}


// html-елементы

const skillsPanel = document.getElementById("skills-panel");

const skillsElements = {
    skill1: document.getElementById("skill1-veko"),
    skill2: document.getElementById("skill2-veko"),
    skill3: document.getElementById("skill3-veko"),
    skill4: document.getElementById("skill4-veko"),
    skill5: document.getElementById("skill5-veko"),
    skill6: document.getElementById("skill6-veko"),
    skill7: document.getElementById("skill7-veko"),
    skill8: document.getElementById("skill8-veko"),
    skill9: document.getElementById("skill9-veko"),
    skill10: document.getElementById("skill10-veko"),
};
const allSkills = document.querySelectorAll(".skill");



function start() {
    //Покажем
    skillsPanel.style.display = 'block';

    skillsPanel.addEventListener('mouseup', onMouseUp, false);
    skillsPanel.addEventListener('mousedown', onMouseDown, false);

    events.on('skills', (eventName, type, data)=>{
        if(type==='update'){
            for(const skill_id in data) {
                if (skillsElements[skill_id]) {

                    let skill = skillsElements[skill_id];

                    //Иконка соответствующая умению
                    let iconElement = skill.parentElement.querySelector('.skill-icon');
                    iconElement.className="";
                    iconElement.classList.add('skill-icon');
                    iconElement.classList.add(data[skill_id].icon);


                    const classList = skill.classList;

                    while (classList.length > 0) {
                        classList.remove(classList.item(0));
                    }

                    classList.add("veko");
                    classList.add("value" + Math.floor(data[skill_id].value / 10) * 10);
                }
            }
        }
    });
}

function stop() {
    skillsPanel.removeEventListener('mousedown', onMouseDo, false);
    skillsPanel.removeEventListener('mouseup', onMouseUp, false);
    skillsPanel.style.display = 'none';
}


function onMouseDown(e){
    let target = e.target || e.srcElement;

    if(
        target.classList.contains("skill-icon") ||
        target.classList.contains("veko")){
        target = target.parentElement;
    }

    if(
        target.classList.contains("skill")
    ){
        if(!target.classList.contains("active")){
            allSkills.forEach(skill => skill.classList.remove("active"));
            target.classList.add("active");

            //Запросим переключение текущего скила
            events.add('skill-change', target.id);
        }
        events.add("keydown", "fire");
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}

//По mouseup
function onMouseUp(e){

    let target = e.target || e.srcElement;

    if(
        target.classList.contains("skill-icon") ||
        target.classList.contains("veko")){
        target = target.parentElement;
    }

    if(
        target.classList.contains("skill")
    ){
        events.add("keyup", "fire");
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}

