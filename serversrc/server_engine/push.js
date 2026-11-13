/**
 * Пуши чата (Web Push). Ключи VAPID - из окружения (прод) или из serversrc/.vapid.json (создается при первом локальном запуске)
 */
module.exports = {publicKey, send};

const fs = require('fs');
const path = require('path');
const webpush = require('web-push');

const db = require('./db.js');
const log = require('./log.js');

const KEYS_FILE = path.join(__dirname, '../.vapid.json');
const BODY_LENGTH = 100; // символов текста в уведомлении
const TTL = 24 * 60 * 60; // секунд, сколько push-сервис хранит пуш для выключенного устройства

const keys = loadKeys();

if (keys) {
    webpush.setVapidDetails(process.env.VAPID_SUBJECT || 'https://game.good-dev.tech', keys.publicKey, keys.privateKey);
}


function loadKeys() {
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
        return {publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY};
    }

    // На проде без ключей пуши просто выключены: новые ключи сделали бы недействительными все подписки
    if (process.env.NODE_ENV === 'production') {
        log('Пуши выключены: нет VAPID_PUBLIC_KEY и VAPID_PRIVATE_KEY');
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'));
    }
    catch (e) {
        const generated = webpush.generateVAPIDKeys();
        fs.writeFileSync(KEYS_FILE, JSON.stringify(generated));
        log('Созданы локальные ключи VAPID: ' + KEYS_FILE);
        return generated;
    }
}


/**
 * Публичный ключ для подписки в браузере, null - если пуши выключены
 */
function publicKey() {
    return keys ? keys.publicKey : null;
}


/**
 * Разослать пуш о сообщении всем подписчикам, кроме тех, у кого чат сейчас перед глазами
 * @param item - сообщение чата
 * @param exceptLogins - автор и те, у кого открыт видимый чат
 */
async function send(item, exceptLogins) {
    if (!keys) return;

    const text = [...item.text];
    const payload = JSON.stringify({
        title: item.login,
        body: text.length > BODY_LENGTH ? text.slice(0, BODY_LENGTH).join('') + '…' : item.text,
        url: '/chat.html',
    });

    const subscriptions = await db.pushSubscriptions(exceptLogins);

    await Promise.all(subscriptions.map((row) => {
        const subscription = {endpoint: row.endpoint, keys: {p256dh: row.p256dh, auth: row.auth}};

        return webpush.sendNotification(subscription, payload, {TTL})
            .catch((err) => {
                // Подписка отозвана или браузер удален - больше не шлем
                if (err.statusCode === 404 || err.statusCode === 410) {
                    return db.pushUnsubscribe(row.endpoint);
                }
                log('Ошибка пуша для ' + row.login + ': ' + (err.statusCode || err.message));
            });
    }));
}
