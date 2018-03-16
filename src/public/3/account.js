export default {getUser, setUser, signout}

function getUser() {
    return localStorage.getItem('gamelogin');
}

function setUser(login) {
    localStorage.setItem('gamelogin', login);
}

function signout() {
    localStorage.removeItem('gamelogin');
}