import account from "../account";

export default {start, stop};


const login_panelElement = document.getElementById("login-panel");
const login_formElement = document.getElementById("login-form");
const login_inputElement = document.getElementById("login-input");
const password_inputElement = document.getElementById("password-input");


let finalCallback = null;

let
    timeout = null,
    timeout_p = null;


// Выведем окно авторизации. Модальное
function start(callback) {

    finalCallback = callback;

    //Получим из локал стора
    let userAccount = account.get();

    //если есть - ок
    if(userAccount) {
        finalCallback(userAccount);
    }
    //иначе - запросим
    else{

        document.addEventListener("click", clickHandler, false);
        document.addEventListener("keyup", keyupHandler, false);

        show();

        login_inputElement.focus();
    }
    
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

    //Если Enter и без проблем
    if(key===13 && validate(login_inputElement.value, password_inputElement.value)){

        stop();
        // Получив сохраним
        const accountData = {login: login_inputElement.value, password: password_inputElement.value};
        account.set(accountData);
        
        finalCallback(accountData);

    }
    //Если таб - по-умолчанию
    else if (key===9){

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
function validate(login, password) {

    if(login.length===0) {
        login_inputElement.focus();
        login_inputElement.style.backgroundColor = '#ff0008';
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            login_inputElement.style.backgroundColor = '#f4cb4a';
        }, 200);
        
        return false;
    }

    if(password.length===0) {
        password_inputElement.focus();
        password_inputElement.style.backgroundColor = '#ff0008';
        clearTimeout(timeout_p);
        timeout_p = setTimeout(function () {
            password_inputElement.style.backgroundColor = '#f4cb4a';
        }, 200);

        return false;
    }
    
    return true;

}


// Обработка кликов
function clickHandler(e) {
    let target = e.target || e.srcElement;


    // Если нажали "Войти" и логин норм - запустим функцию входа
    if(target.id==='login-button' && validate(login_inputElement.value, password_inputElement.value)){

        stop();

        const accountData = {login: login_inputElement.value, password: password_inputElement.value};
        account.set(accountData);

        finalCallback(accountData);
    }
    else if(target.id==='login-input' || target.id==='password-input'){

    }
    else {
        if(login_inputElement.value==='') {
            login_inputElement.focus();
        }
        else if(password_inputElement.value===''){
            password_inputElement.focus();
        }
        else {
            login_inputElement.focus();
        }
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