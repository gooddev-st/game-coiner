import events from "../../../events";

/**
 * Чат на весь сервер. Панель показывается, только если сервер ответил историей (чат разрешен пользователю)
 */
export default {start, stop, disablePush}


const MAX_LENGTH = 500;
// Если полный список эмодзи не загрузился
const FALLBACK_EMOJI = ['😀', '😂', '🤣', '😊', '😍', '😘', '😎', '🤔', '😏', '😢', '😭', '😡', '😱', '🤯', '😴', '🙄',
    '👍', '👎', '👏', '🙏', '💪', '🤝', '👋', '✌️', '❤️', '🔥', '⭐', '🎉', '💰', '⚔️', '🛡️', '💀'];
const EMOJI_URL = 'data/emoji.json?v=2';
const RECENT_KEY = 'chat_emoji_recent';
const RECENT_LIMIT = 40;
const SEARCH_LIMIT = 300;
const URL_PATTERN = /https?:\/\/[^\s<>"']+/g;

const panel = document.getElementById("chat-panel");
const header = document.getElementById("chat-header");
const unreadElement = document.getElementById("chat-unread");
const onlineElement = document.getElementById("chat-online");
const list = document.getElementById("chat-messages");
const emojiPanel = document.getElementById("chat-emoji");
const emojiButton = document.getElementById("chat-emoji-button");
const editingElement = document.getElementById("chat-editing");
const editCancelButton = document.getElementById("chat-edit-cancel");
const input = document.getElementById("chat-input");
const sendButton = document.getElementById("chat-send");
const counter = document.getElementById("chat-counter");
const pushButton = document.getElementById("chat-push");

// Пуши: нужны service worker, Push API и HTTPS (или localhost). На iPhone - только для сайта на экране «Домой»
const pushSupported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window && window.isSecureContext;
const SW_URL = '/chat-sw.js';

const baseTitle = document.title;

// На телефоне Enter переносит строку, отправка - кнопкой
const touchInput = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
const MAX_INPUT_HEIGHT = 140;

// Отдельная страница: панель всегда развернута
let standalone = false;

let me = null,
    messages = new Map(), // id -> элемент сообщения
    hasMore = false,
    loadingOlder = false,
    unread = 0,
    editingId = null,
    pinnedToBottom = true,
    pushKey = null,
    pushBusy = false;


function start(options) {
    standalone = !!(options && options.standalone);
    reset();

    if (standalone) panel.classList.remove('collapsed');

    events.on('chat', onServer);

    // Панель не пропускает мышь и касания в игру
    ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'touchmove', 'wheel'].forEach((name) => {
        panel.addEventListener(name, stopPropagation, false);
    });

    header.addEventListener('click', toggle, false);
    list.addEventListener('scroll', onScroll, false);
    list.addEventListener('click', onListClick, false);
    emojiButton.addEventListener('click', toggleEmoji, false);
    emojiPanel.addEventListener('click', onEmojiClick, false);
    editCancelButton.addEventListener('click', cancelEdit, false);
    sendButton.addEventListener('click', submit, false);
    input.addEventListener('keydown', onInputKeydown, false);
    input.addEventListener('input', updateCounter, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
    document.addEventListener('visibilitychange', markRead, false);
    document.addEventListener('visibilitychange', sendVisibility, false);
    window.addEventListener('resize', onResize, false);
    pushButton.addEventListener('click', onPushClick, false);
    events.on('signout', disablePush);

    if (touchInput) input.placeholder = 'Сообщение';

    events.add('chat', {action: 'history'});
}


function stop() {
    events.off('chat', onServer);

    ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'touchmove', 'wheel'].forEach((name) => {
        panel.removeEventListener(name, stopPropagation, false);
    });

    header.removeEventListener('click', toggle, false);
    list.removeEventListener('scroll', onScroll, false);
    list.removeEventListener('click', onListClick, false);
    emojiButton.removeEventListener('click', toggleEmoji, false);
    emojiPanel.removeEventListener('click', onEmojiClick, false);
    editCancelButton.removeEventListener('click', cancelEdit, false);
    sendButton.removeEventListener('click', submit, false);
    input.removeEventListener('keydown', onInputKeydown, false);
    input.removeEventListener('input', updateCounter, false);
    document.removeEventListener('keydown', onDocumentKeydown, false);
    document.removeEventListener('visibilitychange', markRead, false);
    document.removeEventListener('visibilitychange', sendVisibility, false);
    window.removeEventListener('resize', onResize, false);
    pushButton.removeEventListener('click', onPushClick, false);
    events.off('signout', disablePush);

    panel.style.display = 'none';
    document.title = baseTitle;
}


function reset() {
    me = null;
    messages = new Map();
    hasMore = false;
    loadingOlder = false;
    unread = 0;
    list.textContent = '';
    unreadElement.textContent = '';
    cancelEdit();
}


// События с сервера
function onServer(eventName, type, data) {
    switch (type) {
        case 'history':
            onHistory(data);
            break;
        case 'message':
            addMessage(data.item);
            break;
        case 'edited':
            updateMessage(data.item);
            break;
        case 'deleted':
            removeMessage(data.id);
            break;
        case 'online':
            showOnline(data.users || []);
            break;
    }
}


function onHistory(data) {
    me = data.me;
    hasMore = data.more;

    if (!data.older) {
        list.textContent = '';
        messages = new Map();
        data.messages.forEach((item) => list.appendChild(render(item)));

        // Пустое значение - вид панели задает CSS (в игре блок, на отдельной странице flex)
        panel.style.display = '';
        updateCounter();
        if (!isCollapsed()) scrollToBottom();

        sendVisibility();
        pushKey = data.pushKey;
        setupPush();
        return;
    }

    // Более старые - сверху, не сдвигая видимое
    const height = list.scrollHeight;
    const fragment = document.createDocumentFragment();
    data.messages.filter((item) => !messages.has(item.id)).forEach((item) => fragment.appendChild(render(item)));
    list.insertBefore(fragment, list.firstChild);
    list.scrollTop += list.scrollHeight - height;

    loadingOlder = false;
}


function addMessage(item) {
    if (messages.has(item.id)) return;

    const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40;

    list.appendChild(render(item));

    if (item.login === me || atBottom) scrollToBottom();

    if (item.login !== me && (isCollapsed() || document.hidden)) {
        unread++;
        showUnread();
    }
}


function updateMessage(item) {
    const old = messages.get(item.id);
    if (old) old.replaceWith(render(item));
}


function removeMessage(id) {
    const element = messages.get(id);
    if (!element) return;

    element.remove();
    messages.delete(id);

    if (editingId === id) cancelEdit();
}


function render(item) {
    const element = document.createElement('div');
    element.className = 'chat-msg' + (item.login === me ? ' own' : '');
    element.dataset.id = item.id;
    element.chatItem = item;

    const meta = document.createElement('div');
    meta.className = 'chat-meta';

    const author = document.createElement('span');
    author.className = 'chat-author';
    author.textContent = item.login;
    meta.appendChild(author);

    const time = document.createElement('span');
    time.textContent = formatTime(item.created) + (item.edited ? ' (изменено)' : '');
    meta.appendChild(time);

    if (item.login === me) {
        const actions = document.createElement('span');
        actions.className = 'chat-actions';
        actions.appendChild(button('chat-edit', '✎', 'Изменить'));
        actions.appendChild(button('chat-delete', '✕', 'Удалить'));
        meta.appendChild(actions);
    }

    const text = document.createElement('div');
    text.className = 'chat-text';
    appendText(text, item.text);

    element.appendChild(meta);
    element.appendChild(text);

    messages.set(item.id, element);

    return element;
}


function button(className, label, title) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = className;
    element.textContent = label;
    element.title = title;
    return element;
}


// Текст с кликабельными ссылками. Только textContent и узлы - HTML из сообщения не выполняется
function appendText(element, text) {
    let last = 0;

    for (const match of text.matchAll(URL_PATTERN)) {
        // Знаки препинания в конце обычно не часть ссылки
        const url = match[0].replace(/[.,!?;:)]+$/, '');

        element.appendChild(document.createTextNode(text.slice(last, match.index)));

        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = url;
        element.appendChild(link);

        last = match.index + url.length;
    }

    element.appendChild(document.createTextNode(text.slice(last)));
}


function formatTime(value) {
    const date = new Date(value),
        pad = (n) => String(n).padStart(2, '0'),
        time = pad(date.getHours()) + ':' + pad(date.getMinutes());

    return date.toDateString() === new Date().toDateString() ?
        time :
        pad(date.getDate()) + '.' + pad(date.getMonth() + 1) + ' ' + time;
}


function showOnline(users) {
    onlineElement.textContent = users.length ? 'в сети: ' + users.join(', ') : '';
    onlineElement.title = users.join('\n');
}


function showUnread() {
    unreadElement.textContent = unread ? String(unread) : '';
    document.title = unread ? '(' + unread + ') ' + baseTitle : baseTitle;
}


function markRead() {
    if (isCollapsed() || document.hidden) return;

    unread = 0;
    showUnread();
}


function isCollapsed() {
    return panel.classList.contains('collapsed');
}


function toggle() {
    if (standalone) return;

    panel.classList.toggle('collapsed');

    if (!isCollapsed()) {
        updateCounter();
        scrollToBottom();
        markRead();
        input.focus();
    }
    else {
        input.blur();
    }
}


function scrollToBottom() {
    list.scrollTop = list.scrollHeight;
}


function onScroll() {
    pinnedToBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40;

    const oldest = list.querySelector('.chat-msg');
    if (list.scrollTop > 30 || !hasMore || loadingOlder || !oldest) return;

    loadingOlder = true;
    events.add('chat', {action: 'history', beforeId: Number(oldest.dataset.id)});
}


function onListClick(e) {
    const element = e.target.closest('.chat-msg');
    if (!element) return;

    const id = Number(element.dataset.id);

    if (e.target.classList.contains('chat-edit')) {
        startEdit(id, element.chatItem.text);
    }

    // Удаление - по второму клику, чтобы не удалить случайно
    if (e.target.classList.contains('chat-delete')) {
        if (e.target.classList.contains('confirm')) {
            events.add('chat', {action: 'delete', id});
            return;
        }

        e.target.classList.add('confirm');
        e.target.parentElement.classList.add('confirm');
        e.target.textContent = 'Удалить?';
        setTimeout(() => {
            e.target.classList.remove('confirm');
            e.target.parentElement.classList.remove('confirm');
            e.target.textContent = '✕';
        }, 3000);
    }
}


function startEdit(id, text) {
    editingId = id;
    editingElement.style.display = 'block';
    input.value = text;
    updateCounter();
    input.focus();
}


function cancelEdit() {
    const wasEditing = editingId !== null;

    editingId = null;
    editingElement.style.display = 'none';

    if (wasEditing) input.value = '';
    updateCounter();
}


function submit() {
    const text = input.value.trim();

    if (!text || [...text].length > MAX_LENGTH) return;

    if (editingId !== null) {
        events.add('chat', {action: 'edit', id: editingId, text});
        cancelEdit();
    }
    else {
        events.add('chat', {action: 'send', text});
    }

    input.value = '';
    updateCounter();
    emojiPanel.style.display = 'none';
}


function updateCounter() {
    const length = [...input.value.trim()].length;

    counter.textContent = length > MAX_LENGTH - 100 ? length + ' / ' + MAX_LENGTH : '';
    counter.classList.toggle('over', length > MAX_LENGTH);

    // Поле растет по тексту до MAX_INPUT_HEIGHT, дальше - прокрутка
    // У скрытой панели высота 0 - тогда оставляем высоту из CSS
    input.style.height = 'auto';
    input.style.height = input.scrollHeight ? Math.min(input.scrollHeight + 2, MAX_INPUT_HEIGHT) + 'px' : '';
}


// Клавиатура телефона или поворот экрана меняют высоту - остаемся у последних сообщений
function onResize() {
    if (pinnedToBottom) scrollToBottom();
}


function onInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !touchInput) {
        e.preventDefault();
        submit();
    }
    else if (e.key === 'Escape') {
        if (editingId !== null) cancelEdit();
        else input.blur();
    }
}


// Enter вне поля ввода - открыть чат и перейти к вводу
function onDocumentKeydown(e) {
    if (e.key !== 'Enter' || panel.style.display === 'none') return;
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    e.preventDefault();

    if (isCollapsed()) toggle();
    else input.focus();
}


/*
 * Палитра эмодзи: вкладки категорий, недавние и поиск. Список грузится при первом открытии
 */
let emojiGroups = null, // [{name, icon, emojis: [[эмодзи, строка поиска]]}]
    emojiTab = 0, // -1 - недавние
    emojiTabs = null,
    emojiSearch = null,
    emojiGrid = null;


function toggleEmoji() {
    if (!emojiGrid) buildEmojiPanel();

    const show = emojiPanel.style.display === 'none';
    emojiPanel.style.display = show ? '' : 'none';
}


function buildEmojiPanel() {
    emojiTabs = document.createElement('div');
    emojiTabs.className = 'chat-emoji-tabs';

    emojiSearch = document.createElement('input');
    emojiSearch.className = 'chat-emoji-search';
    emojiSearch.type = 'search';
    emojiSearch.placeholder = 'Поиск: смех, кот, пицца, flag…';
    emojiSearch.addEventListener('input', renderEmojiGrid, false);
    emojiSearch.addEventListener('keydown', onEmojiSearchKeydown, false);

    emojiGrid = document.createElement('div');
    emojiGrid.className = 'chat-emoji-grid';
    emojiGrid.textContent = 'Загрузка…';

    emojiPanel.appendChild(emojiTabs);
    emojiPanel.appendChild(emojiSearch);
    emojiPanel.appendChild(emojiGrid);

    fetch(EMOJI_URL)
        .then((response) => response.json())
        .then((data) => data.groups)
        .catch(() => [{name: 'Смайлы', icon: '😀', emojis: FALLBACK_EMOJI.map((emoji) => [emoji, ''])}])
        .then((groups) => {
            emojiGroups = groups;
            emojiTab = readRecent().length ? -1 : 0;
            renderEmojiTabs();
            renderEmojiGrid();
        });
}


function renderEmojiTabs() {
    emojiTabs.textContent = '';

    const tabs = [{icon: '🕘', name: 'Недавние', index: -1}].concat(emojiGroups.map((group, index) => ({icon: group.icon, name: group.name, index})));

    tabs.forEach((tab) => {
        const element = button('chat-emoji-tab' + (tab.index === emojiTab ? ' active' : ''), tab.icon, tab.name);
        element.dataset.tab = tab.index;
        emojiTabs.appendChild(element);
    });
}


function renderEmojiGrid() {
    if (!emojiGroups) return;

    const query = emojiSearch.value.trim().toLowerCase();
    let list;

    if (query) {
        // Каждое слово запроса - начало одного из слов названия: «разведение рук», «кот», «фейс»
        const parts = query.split(/\s+/);
        list = [];
        for (const group of emojiGroups) {
            for (const [emoji, words] of group.emojis) {
                const text = ' ' + words;
                if (parts.every((part) => text.indexOf(' ' + part) >= 0)) list.push(emoji);
                if (list.length >= SEARCH_LIMIT) break;
            }
        }
    }
    else {
        list = emojiTab === -1 ? readRecent() : emojiGroups[emojiTab].emojis.map((item) => item[0]);
    }

    emojiGrid.textContent = '';

    if (!list.length) {
        emojiGrid.textContent = query ? 'Ничего не найдено' : 'Здесь появятся смайлы, которые вы отправляли';
        return;
    }

    const fragment = document.createDocumentFragment();
    list.forEach((emoji) => {
        const element = button('chat-emoji-item', emoji, '');
        fragment.appendChild(element);
    });
    emojiGrid.appendChild(fragment);
    emojiGrid.scrollTop = 0;
}


function onEmojiClick(e) {
    const target = e.target.closest('button');
    if (!target) return;

    if (target.classList.contains('chat-emoji-tab')) {
        emojiTab = Number(target.dataset.tab);
        emojiSearch.value = '';
        renderEmojiTabs();
        renderEmojiGrid();
        return;
    }

    if (target.classList.contains('chat-emoji-item')) {
        insertEmoji(target.textContent);
    }
}


function onEmojiSearchKeydown(e) {
    // Enter - первый найденный, Esc - закрыть палитру
    if (e.key === 'Enter') {
        e.preventDefault();
        const first = emojiGrid.querySelector('.chat-emoji-item');
        if (first) insertEmoji(first.textContent);
    }
    else if (e.key === 'Escape') {
        emojiPanel.style.display = 'none';
        input.focus();
    }
}


// Вставляем в позицию курсора
function insertEmoji(emoji) {
    const start = input.selectionStart,
        end = input.selectionEnd;

    input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
    input.selectionStart = input.selectionEnd = start + emoji.length;
    if (!touchInput) input.focus();
    updateCounter();

    rememberRecent(emoji);
}


// Недавние хранятся в браузере. localStorage может быть недоступен (приватный режим) - тогда без них
function readRecent() {
    try {
        const list = JSON.parse(localStorage.getItem(RECENT_KEY));
        return Array.isArray(list) ? list : [];
    }
    catch (e) {
        return [];
    }
}


function rememberRecent(emoji) {
    const list = [emoji].concat(readRecent().filter((item) => item !== emoji)).slice(0, RECENT_LIMIT);

    try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(list));
    }
    catch (e) {}
}


/*
 * Пуши
 */

// Сервер не шлет пуши тем, у кого вкладка с чатом сейчас на экране
function sendVisibility() {
    events.add('chat', {action: 'visibility', visible: !document.hidden});
}


function setupPush() {
    if (!pushSupported || !pushKey) {
        pushButton.style.display = 'none';
        return;
    }

    pushButton.style.display = '';

    getSubscription().then((subscription) => {
        // Уже подписаны - напоминаем серверу, под каким логином (браузер мог сменить пользователя)
        if (subscription && Notification.permission === 'granted') {
            events.add('chat', {action: 'push-subscribe', subscription: subscription.toJSON()});
        }
        showPushState(subscription);
    }).catch(() => showPushState(null));
}


function getSubscription() {
    return navigator.serviceWorker.register(SW_URL)
        .then(() => navigator.serviceWorker.ready)
        .then((registration) => registration.pushManager.getSubscription());
}


function showPushState(subscription) {
    const on = !!subscription && Notification.permission === 'granted',
        denied = Notification.permission === 'denied';

    pushButton.textContent = on ? '🔔' : '🔕';
    pushButton.classList.toggle('on', on);
    pushButton.title = denied ?
        'Уведомления запрещены в настройках браузера для этого сайта' :
        (on ? 'Уведомления включены. Нажмите, чтобы выключить' : 'Включить уведомления о новых сообщениях');
}


function onPushClick(e) {
    // В игре клик по шапке сворачивает панель - кнопка не должна
    e.stopPropagation();

    if (pushBusy) return;
    pushBusy = true;

    getSubscription()
        .then((subscription) => subscription ? disablePush() : enablePush())
        .catch((err) => notice('Не удалось изменить уведомления: ' + err.message))
        .then(() => getSubscription())
        .then(showPushState, () => showPushState(null))
        .then(() => { pushBusy = false; });
}


function enablePush() {
    return Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
            notice('Уведомления не разрешены. Разрешить можно в настройках сайта в браузере');
            return;
        }

        return navigator.serviceWorker.ready
            .then((registration) => registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64ToBytes(pushKey),
            }))
            .then((subscription) => {
                events.add('chat', {action: 'push-subscribe', subscription: subscription.toJSON()});
                notice('Уведомления включены');
            });
    });
}


// Выключить пуши в этом браузере. Если сервер недоступен (выход из игры), подписку он удалит сам при следующей отправке
function disablePush() {
    if (!pushSupported) return Promise.resolve();

    return navigator.serviceWorker.getRegistration(SW_URL)
        .then((registration) => registration && registration.pushManager.getSubscription())
        .then((subscription) => {
            if (!subscription) return;

            events.add('chat', {action: 'push-unsubscribe', endpoint: subscription.endpoint});
            return subscription.unsubscribe();
        })
        .catch(() => {});
}


// Ключ VAPID приходит в base64url, Push API нужен массив байт
function base64ToBytes(value) {
    const base64 = (value + '='.repeat((4 - value.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/');
    return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}


// Служебная строка в ленте
function notice(text) {
    const element = document.createElement('div');
    element.className = 'chat-system';
    element.textContent = text;
    list.appendChild(element);
    scrollToBottom();
}


function stopPropagation(e) {
    e.stopPropagation();
}
