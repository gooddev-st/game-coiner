/**
 * Чат на весь сервер. Доступен пользователям с флагом user.chat_allowed
 */
module.exports = {join, leave};

const db = require('./db.js');
const events = require('./events.js');
const log = require('./log.js');

const MAX_LENGTH = 500; // в символах, эмодзи - один символ
const HISTORY_LIMIT = 100;
const MIN_INTERVAL = 1000; // мс между отправками и правками одного пользователя

// Подключенные к чату: логин -> сокеты (игра и отдельная страница чата могут быть открыты одновременно)
const members = new Map();
// Время последней отправки или правки: логин -> мс
const lastAction = new Map();


/**
 * Подключить соединение к чату после входа
 * @param login
 * @param socket
 */
function join(login, socket) {
    if (!members.has(login)) members.set(login, new Set());
    members.get(login).add(socket);
    sendOnline();

    socket.on('chat', (request) => {
        // Отключенное от чата соединение больше не пишет
        if (!isMember(login, socket) || !request || typeof request !== 'object') return;

        handle(login, socket, request).catch((err) => {
            log('Ошибка чата: ' + err.message);
            reply(socket, 'error', {message: 'Не удалось выполнить действие в чате'});
        });
    });
}


/**
 * Отключить соединение от чата при его закрытии
 * @param login
 * @param socket
 */
function leave(login, socket) {
    if (!isMember(login, socket)) return;

    const sockets = members.get(login);
    sockets.delete(socket);
    if (!sockets.size) members.delete(login);

    sendOnline();
}


function isMember(login, socket) {
    return !!members.get(login) && members.get(login).has(socket);
}


async function handle(login, socket, request) {
    switch (request.action) {
        case 'history': {
            const beforeId = Number(request.beforeId) || null,
                messages = await db.chatHistory(beforeId, HISTORY_LIMIT + 1),
                more = messages.length > HISTORY_LIMIT;

            if (more) messages.shift();

            reply(socket, 'history', {messages: messages.map(format), more, older: !!beforeId, me: login});
            reply(socket, 'online', {users: [...members.keys()]});
            return;
        }

        case 'send': {
            const text = check(login, socket, request.text);
            if (text === null) return;

            broadcast('message', {item: format(await db.chatAdd(login, text))});
            return;
        }

        case 'edit': {
            const text = check(login, socket, request.text);
            if (text === null) return;

            const message = await db.chatEdit(Number(request.id), login, text);
            if (message) broadcast('edited', {item: format(message)});
            return;
        }

        case 'delete': {
            const id = Number(request.id);
            if (await db.chatDelete(id, login)) broadcast('deleted', {id});
            return;
        }
    }
}


/**
 * Нормализованный текст сообщения или null, если отправлять нельзя (причину получит автор)
 */
function check(login, socket, raw) {
    if (typeof raw !== 'string') return null;

    // Переводы строк оставляем, остальные управляющие символы убираем
    const text = raw.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '').trim();

    if (!text) return null;

    if ([...text].length > MAX_LENGTH) {
        reply(socket, 'error', {message: `Сообщение длиннее ${MAX_LENGTH} символов`});
        return null;
    }

    const now = Date.now();
    if (now - (lastAction.get(login) || 0) < MIN_INTERVAL) {
        reply(socket, 'error', {message: 'Слишком часто, подождите секунду'});
        return null;
    }
    lastAction.set(login, now);

    return text;
}


function format(row) {
    return {
        id: row.id,
        login: row.login,
        text: row.text,
        created: row.created_at,
        edited: row.edited_at,
    };
}


function reply(socket, type, data) {
    events.one(socket, 'chat', type, data);
}


function broadcast(type, data) {
    for (const sockets of members.values()) {
        for (const socket of sockets) {
            reply(socket, type, Object.assign({}, data));
        }
    }
}


function sendOnline() {
    broadcast('online', {users: [...members.keys()]});
}
