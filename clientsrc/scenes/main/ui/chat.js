import events from "../../../events";

/**
 * Чат на весь сервер. Панель показывается, только если сервер ответил историей (чат разрешен пользователю)
 */
export default {start, stop}


const MAX_LENGTH = 500;
const EMOJI = ['😀', '😂', '🤣', '😊', '😍', '😘', '😎', '🤔', '😏', '😢', '😭', '😡', '😱', '🤯', '😴', '🙄',
    '👍', '👎', '👏', '🙏', '💪', '🤝', '👋', '✌️', '❤️', '🔥', '⭐', '🎉', '💰', '⚔️', '🛡️', '💀'];
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

const baseTitle = document.title;

// Отдельная страница: панель всегда развернута
let standalone = false;

let me = null,
    messages = new Map(), // id -> элемент сообщения
    hasMore = false,
    loadingOlder = false,
    unread = 0,
    editingId = null;


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

        panel.style.display = 'block';
        if (!isCollapsed()) scrollToBottom();
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
    if (list.scrollTop > 30 || !hasMore || loadingOlder || !list.firstElementChild) return;

    loadingOlder = true;
    events.add('chat', {action: 'history', beforeId: Number(list.firstElementChild.dataset.id)});
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
}


function onInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
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


function toggleEmoji() {
    if (!emojiPanel.childElementCount) {
        EMOJI.forEach((emoji) => emojiPanel.appendChild(button('', emoji, emoji)));
    }

    emojiPanel.style.display = emojiPanel.style.display === 'none' ? 'flex' : 'none';
}


function onEmojiClick(e) {
    if (e.target.tagName !== 'BUTTON') return;

    // Вставляем в позицию курсора
    const emoji = e.target.textContent,
        start = input.selectionStart,
        end = input.selectionEnd;

    input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
    input.selectionStart = input.selectionEnd = start + emoji.length;
    input.focus();
    updateCounter();
}


function stopPropagation(e) {
    e.stopPropagation();
}
