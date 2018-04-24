import events from "../../../events";


/**
 * Умения / эффекты
 */
export default {start, stop}


// html-елементы

const skillsPanel = document.getElementById("skills-panel");

const skillsElements = {
    skill1: document.getElementById("skill1"),
    skill2: document.getElementById("skill2"),
    skill3: document.getElementById("skill3"),
    skill4: document.getElementById("skill4"),
    skill5: document.getElementById("skill5"),
    skill6: document.getElementById("skill6"),
    skill7: document.getElementById("skill7"),
    skill8: document.getElementById("skill8"),
    skill9: document.getElementById("skill9"),
    skill10: document.getElementById("skill10"),
};
const allSkills = document.querySelectorAll(".skill");



function start() {
    //Покажем
    skillsPanel.style.display = 'block';

    skillsPanel.addEventListener('mouseup', onMouseUp, false);
    skillsPanel.addEventListener('mousedown', onMouseDown, false);
    skillsPanel.addEventListener('touchend', onMouseUp, false);
    skillsPanel.addEventListener('touchstart', onMouseDown, false);

    //Если смена умения - сменим
    events.on('skill-change', (eventName,ID)=>selectSkill(ID));


    //Обновление иконок и готовности умений
    events.on('skills', (eventName, type, data)=>{
        if(type==='update'){
            for(const skill_id in data) {
                if (skillsElements[skill_id]) {

                    let skill = skillsElements[skill_id];

                    //Иконка соответствующая умению
                    let iconElement = skill.querySelector('.skill-icon');
                    //"Веко" умения
                    let vekoElement = skill.querySelector('.veko');
                    iconElement.className="";
                    iconElement.classList.add('skill-icon');
                    iconElement.classList.add(data[skill_id].icon);


                    const classList = vekoElement.classList;

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
    skillsPanel.removeEventListener('mousedown', onMouseDown, false);
    skillsPanel.removeEventListener('mouseup', onMouseUp, false);
    skillsPanel.removeEventListener('touchstart', onMouseDown, false);
    skillsPanel.removeEventListener('touchend', onMouseUp, false);
    skillsPanel.style.display = 'none';
}


function selectSkill(ID) {
    if(skillsElements[ID]){
        allSkills.forEach(skill => skill.classList.remove("active"));
        skillsElements[ID].classList.add("active");
    }

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

