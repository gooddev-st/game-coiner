export default {get, set, signout}

function get() {
    if(
        !localStorage.getItem('game_account_login') ||
        !localStorage.getItem('game_account_password')
    )
        return null;

    return {
        login: localStorage.getItem('game_account_login'),
        password: localStorage.getItem('game_account_password'),
    };
}

function set(account) {
    localStorage.setItem('game_account_login', account.login);
    localStorage.setItem('game_account_password', account.password);
}

function signout() {
    localStorage.removeItem('game_account_login');
    localStorage.removeItem('game_account_password');
}