/**
 * Service worker пушей чата: показывает уведомление о новом сообщении, по клику открывает чат
 */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));


self.addEventListener('push', (event) => {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    }
    catch (e) {
        data = {body: event.data ? event.data.text() : ''};
    }

    event.waitUntil(self.registration.showNotification(data.title || 'Чат', {
        body: data.body || 'Новое сообщение',
        icon: 'i/chat-icon-192.png',
        badge: 'i/chat-badge-72.png',
        // Одно уведомление на чат: новое заменяет старое, но снова звенит
        tag: 'chat',
        renotify: true,
        data: {url: data.url || '/chat.html'},
    }));
});


self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const url = new URL(event.notification.data && event.notification.data.url || '/chat.html', self.location.origin).href;

    // Уже открытая вкладка с чатом или игрой - на передний план, иначе открываем чат
    event.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then((windows) => {
        const open = windows.find((client) => /\/(chat|game)\.html/.test(client.url));
        return open ? open.focus() : self.clients.openWindow(url);
    }));
});
