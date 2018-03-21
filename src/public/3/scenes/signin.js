export default {start, stop};


const login_panelElement = document.getElementById("login-panel");
const login_formElement = document.getElementById("login-form");
const login_inputElement = document.getElementById("login-input");


let finalCallback = null;

let timeout = null;


// Выведем окно авторизации. Модальное
function start(login, callback) {

    finalCallback = callback;

    if(login && login_inputElement){
        login_inputElement.value = login
    }

    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keyup", keyupHandler, false);

    show();

    login_inputElement.focus();
}


// Закроем окно авторизации
function stop() {
    document.removeEventListener("click", clickHandler, false);
    document.removeEventListener("keyup", keyupHandler, false);
    hide();
}


// Обработчик клавиш
function keyupHandler(e) {
    let obj = e.target || e.srcElement;
    let key = e.keyCode;

    if(key==13 && validate(login_inputElement.value)){

        stop();
        finalCallback(login_inputElement.value);

    }
    else if (
        //символы разрешенные в логине
    /^[a-zA-Z0-9 +.\-_:"()]*?$/.test(obj.value) &&
    obj.value.length < 10 // Максимальная длина логина
    ) {
        obj.defaultValue = obj.value;

        login_inputElement.style.backgroundColor = '#f4cb4a';
    }
    else
        obj.value = obj.defaultValue;
}

// Проверка введенного и индикация ошибки
function validate(login) {

    if(login.length>0) return true;


    login_inputElement.style.backgroundColor='#ff0008';
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        login_inputElement.style.backgroundColor='#f4cb4a';
    }, 200);

}

// Обработка кликов
function clickHandler(e) {
    let target = e.target || e.srcElement;


    // Если нажали "Войти" и логин норм - запустим функцию входа
    if(target.id=='login-button' && validate(login_inputElement.value)){

        stop();

        finalCallback(login_inputElement.value);
    }
    else {
        login_inputElement.focus();
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
}

//Показать окно входа
function show() {
    login_panelElement.style.display = 'block';
    login_formElement.style.display = 'block';
}

//скрыть окно входа
function hide() {
    login_panelElement.style.display = 'none';
    login_formElement.style.display = 'none';
}