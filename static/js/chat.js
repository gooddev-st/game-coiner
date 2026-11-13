/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./account.js"
/*!********************!*\
  !*** ./account.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  get,
  set,
  signout
});
function get() {
  if (!localStorage.getItem('game_account_login') || !localStorage.getItem('game_account_password')) return null;
  return {
    login: localStorage.getItem('game_account_login'),
    password: localStorage.getItem('game_account_password')
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

/***/ },

/***/ "./engine/ui/ui.js"
/*!*************************!*\
  !*** ./engine/ui/ui.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _waitscreen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./waitscreen */ "./engine/ui/waitscreen.js");
/**
 * Интерфейс пользователя
 */

// Экран загрузки

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  waitScreen: _waitscreen__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ },

/***/ "./engine/ui/waitscreen.js"
/*!*********************************!*\
  !*** ./engine/ui/waitscreen.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Экран загрузки
 */

const waitScreenElement = document.getElementById("loading");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  show,
  hide
});
function show(title) {
  if (title) {
    let titleElement = waitScreenElement.querySelector('.title');
    if (titleElement) {
      titleElement.innerHTML = title;
    }
  }
  waitScreenElement.style.display = 'block';
}
function hide() {
  waitScreenElement.style.display = 'none';
}

/***/ },

/***/ "./events.js"
/*!*******************!*\
  !*** ./events.js ***!
  \*******************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _logs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logs.js */ "./logs.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/esm/index.js");
/* harmony import */ var _engine_ui_ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine/ui/ui.js */ "./engine/ui/ui.js");
/* harmony import */ var _scenes_signin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/signin */ "./scenes/signin.js");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./account */ "./account.js");
/**
 * События игры
 */





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  init,
  add,
  on,
  off,
  disconnect,
  isKicked
});

// Подключение к серверу
let serverSocket = null;
let logged = false;

// Ждём ввода логина, чтобы не открывать форму повторно на каждый hello
let signingIn = false;

// Вошли с тем же логином в другом окне - сами не переподключаемся, иначе окна выбивают друг друга
let kicked = false;
let onLogged = null;

// Событие входа: 'login' - в игру, 'chat-login' - только в чат (страница chat.html)
let loginEvent = 'login';

/**
 * Инитим игровые события. Обработчики сокета навешиваются один раз, переподключение делает socket.io
 */
function init(callback, event) {
  onLogged = callback;
  loginEvent = event || 'login';
  if (serverSocket) return;
  serverSocket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__["default"])(window.GAME_SERVER_URL || "http://server.games.q-dev.ru");
  (0,_logs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Подключаемся к серверу');
  on("server", (eventName, type, data) => {
    if (type !== "hello" || logged) return;
    if (!(data.version && data.version <= 0.19)) {
      _engine_ui_ui_js__WEBPACK_IMPORTED_MODULE_2__["default"].waitScreen.show('Жми Ctrl-F5');
      return;
    }
    if (signingIn) return;
    signingIn = true;

    //Получаем от пользователя аккаунт (из localStorage или через форму)
    _scenes_signin__WEBPACK_IMPORTED_MODULE_3__["default"].start(function (account) {
      signingIn = false;

      // Пока вводили логин, соединение могло оборваться: тогда войдём по следующему hello
      if (serverSocket.connected) {
        add(loginEvent, account);
      }
    });
  });

  //После успешного входа (если неуспешный - сервер опять пошлет hello)
  on('logged', (eventName, type, data) => {
    if (type === 'success' && !logged) {
      logged = true;
      onLogged();
    }

    // Неверный пароль: сохраненный вход забываем и спрашиваем заново
    if (type === 'fail' && !logged && !signingIn) {
      _account__WEBPACK_IMPORTED_MODULE_4__["default"].signout();
      signingIn = true;
      _scenes_signin__WEBPACK_IMPORTED_MODULE_3__["default"].start(function (account) {
        signingIn = false;
        if (serverSocket.connected) {
          add(loginEvent, account);
        }
      }, data && data.message);
    }
  });
  on("another-coming", () => {
    kicked = true;
    _engine_ui_ui_js__WEBPACK_IMPORTED_MODULE_2__["default"].waitScreen.show('Вы вошли в другом окне. Обновите страницу, чтобы играть здесь');
  });

  // Действия при серверных проблемах
  serverSocket.on('connect_error', function () {
    (0,_logs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Ошибка подключения к серверу');
  });
  serverSocket.on("disconnect", function (reason) {
    (0,_logs_js__WEBPACK_IMPORTED_MODULE_0__["default"])('Вы отключены от сервера');
    logged = false;
    if (kicked) return;
    _engine_ui_ui_js__WEBPACK_IMPORTED_MODULE_2__["default"].waitScreen.show();

    // После обрыва сети socket.io переподключается сам, а после отключения сервером или клиентом (выход) - нет
    if (reason === 'io server disconnect' || reason === 'io client disconnect') {
      setTimeout(() => serverSocket.connect(), 1000);
    }
  });
}

// Обработчики по событиям. На сокет для каждого события вешается один слушатель, который их вызывает
const handlers = {};

/**
 * Добавление игрового события
 * @param eventName
 * @param data
 */
function add(eventName, data) {
  // Если есть локальные обработчики - вызовем
  runHandlers(eventName, data);

  // шлем событие на сервер
  serverSocket.emit(eventName, data);
}
function on(eventName, callback) {
  if (eventName in handlers === false) {
    handlers[eventName] = [];
    serverSocket.on(eventName, data => dispatch(eventName, data));
  }
  handlers[eventName].push(callback);
}

// Событие с сервера - всем текущим обработчикам
function dispatch(eventName, data) {
  try {
    data = JSON.parse(data);
  } catch (e) {}
  let type = data && data.type ? data.type : "simple";

  // Если в данных события есть поле message - выведем в лог
  data && data.message && (0,_logs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data.message);

  // Копия: обработчик может отписаться во время вызова
  for (const h of [...handlers[eventName]]) {
    h(eventName, type, data);
  }
}

/**
 * Отписка. Без handler - от всех обработчиков события
 */
function off(eventName, handler) {
  if (eventName in handlers === false) return;
  handlers[eventName] = handler ? handlers[eventName].filter(value => value !== handler) : [];
}

// Запуск для локальных событий
function runHandlers(eventName, data) {
  //Если есть обработчики - запускаем
  if (eventName in handlers) {
    for (const h of handlers[eventName]) {
      h(eventName, data);
    }
  }
}
function disconnect() {
  serverSocket.close();
}
function isKicked() {
  return kicked;
}

/***/ },

/***/ "./logs.js"
/*!*****************!*\
  !*** ./logs.js ***!
  \*****************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Логирование
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (log);
const $logs = document.getElementById('logs');
function log(msg) {
  $logs.innerHTML += '<div class="msg">' + msg + '</div>';
  $logs.parentElement.scrollTop = $logs.scrollHeight;
  console.log(msg);
}
;

/***/ },

/***/ "./scenes/main/ui/chat.js"
/*!********************************!*\
  !*** ./scenes/main/ui/chat.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../events */ "./events.js");


/**
 * Чат на весь сервер. Панель показывается, только если сервер ответил историей (чат разрешен пользователю)
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  start,
  stop
});
const MAX_LENGTH = 500;
// Если полный список эмодзи не загрузился
const FALLBACK_EMOJI = ['😀', '😂', '🤣', '😊', '😍', '😘', '😎', '🤔', '😏', '😢', '😭', '😡', '😱', '🤯', '😴', '🙄', '👍', '👎', '👏', '🙏', '💪', '🤝', '👋', '✌️', '❤️', '🔥', '⭐', '🎉', '💰', '⚔️', '🛡️', '💀'];
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
const baseTitle = document.title;

// На телефоне Enter переносит строку, отправка - кнопкой
const touchInput = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
const MAX_INPUT_HEIGHT = 140;

// Отдельная страница: панель всегда развернута
let standalone = false;
let me = null,
  messages = new Map(),
  // id -> элемент сообщения
  hasMore = false,
  loadingOlder = false,
  unread = 0,
  editingId = null,
  pinnedToBottom = true;
function start(options) {
  standalone = !!(options && options.standalone);
  reset();
  if (standalone) panel.classList.remove('collapsed');
  _events__WEBPACK_IMPORTED_MODULE_0__["default"].on('chat', onServer);

  // Панель не пропускает мышь и касания в игру
  ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'touchmove', 'wheel'].forEach(name => {
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
  window.addEventListener('resize', onResize, false);
  if (touchInput) input.placeholder = 'Сообщение';
  _events__WEBPACK_IMPORTED_MODULE_0__["default"].add('chat', {
    action: 'history'
  });
}
function stop() {
  _events__WEBPACK_IMPORTED_MODULE_0__["default"].off('chat', onServer);
  ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'touchmove', 'wheel'].forEach(name => {
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
  window.removeEventListener('resize', onResize, false);
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
    data.messages.forEach(item => list.appendChild(render(item)));

    // Пустое значение - вид панели задает CSS (в игре блок, на отдельной странице flex)
    panel.style.display = '';
    updateCounter();
    if (!isCollapsed()) scrollToBottom();
    return;
  }

  // Более старые - сверху, не сдвигая видимое
  const height = list.scrollHeight;
  const fragment = document.createDocumentFragment();
  data.messages.filter(item => !messages.has(item.id)).forEach(item => fragment.appendChild(render(item)));
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
    pad = n => String(n).padStart(2, '0'),
    time = pad(date.getHours()) + ':' + pad(date.getMinutes());
  return date.toDateString() === new Date().toDateString() ? time : pad(date.getDate()) + '.' + pad(date.getMonth() + 1) + ' ' + time;
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
  } else {
    input.blur();
  }
}
function scrollToBottom() {
  list.scrollTop = list.scrollHeight;
}
function onScroll() {
  pinnedToBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40;
  if (list.scrollTop > 30 || !hasMore || loadingOlder || !list.firstElementChild) return;
  loadingOlder = true;
  _events__WEBPACK_IMPORTED_MODULE_0__["default"].add('chat', {
    action: 'history',
    beforeId: Number(list.firstElementChild.dataset.id)
  });
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
      _events__WEBPACK_IMPORTED_MODULE_0__["default"].add('chat', {
        action: 'delete',
        id
      });
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
    _events__WEBPACK_IMPORTED_MODULE_0__["default"].add('chat', {
      action: 'edit',
      id: editingId,
      text
    });
    cancelEdit();
  } else {
    _events__WEBPACK_IMPORTED_MODULE_0__["default"].add('chat', {
      action: 'send',
      text
    });
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
  } else if (e.key === 'Escape') {
    if (editingId !== null) cancelEdit();else input.blur();
  }
}

// Enter вне поля ввода - открыть чат и перейти к вводу
function onDocumentKeydown(e) {
  if (e.key !== 'Enter' || panel.style.display === 'none') return;
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  e.preventDefault();
  if (isCollapsed()) toggle();else input.focus();
}

/*
 * Палитра эмодзи: вкладки категорий, недавние и поиск. Список грузится при первом открытии
 */
let emojiGroups = null,
  // [{name, icon, emojis: [[эмодзи, строка поиска]]}]
  emojiTab = 0,
  // -1 - недавние
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
  fetch(EMOJI_URL).then(response => response.json()).then(data => data.groups).catch(() => [{
    name: 'Смайлы',
    icon: '😀',
    emojis: FALLBACK_EMOJI.map(emoji => [emoji, ''])
  }]).then(groups => {
    emojiGroups = groups;
    emojiTab = readRecent().length ? -1 : 0;
    renderEmojiTabs();
    renderEmojiGrid();
  });
}
function renderEmojiTabs() {
  emojiTabs.textContent = '';
  const tabs = [{
    icon: '🕘',
    name: 'Недавние',
    index: -1
  }].concat(emojiGroups.map((group, index) => ({
    icon: group.icon,
    name: group.name,
    index
  })));
  tabs.forEach(tab => {
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
        if (parts.every(part => text.indexOf(' ' + part) >= 0)) list.push(emoji);
        if (list.length >= SEARCH_LIMIT) break;
      }
    }
  } else {
    list = emojiTab === -1 ? readRecent() : emojiGroups[emojiTab].emojis.map(item => item[0]);
  }
  emojiGrid.textContent = '';
  if (!list.length) {
    emojiGrid.textContent = query ? 'Ничего не найдено' : 'Здесь появятся смайлы, которые вы отправляли';
    return;
  }
  const fragment = document.createDocumentFragment();
  list.forEach(emoji => {
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
  } else if (e.key === 'Escape') {
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
  } catch (e) {
    return [];
  }
}
function rememberRecent(emoji) {
  const list = [emoji].concat(readRecent().filter(item => item !== emoji)).slice(0, RECENT_LIMIT);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  } catch (e) {}
}
function stopPropagation(e) {
  e.stopPropagation();
}

/***/ },

/***/ "./scenes/signin.js"
/*!**************************!*\
  !*** ./scenes/signin.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../account */ "./account.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  start,
  stop
});
const login_panelElement = document.getElementById("login-panel");
const login_formElement = document.getElementById("login-form");
const login_inputElement = document.getElementById("login-input");
const password_inputElement = document.getElementById("password-input");
const login_errorElement = document.getElementById("login-error");
let finalCallback = null;
let timeout = null,
  timeout_p = null;

// Выведем окно авторизации. Модальное. error - причина, по которой спрашиваем снова
function start(callback, error) {
  finalCallback = callback;
  login_errorElement.textContent = error || '';

  //Получим из локал стора
  let userAccount = _account__WEBPACK_IMPORTED_MODULE_0__["default"].get();

  //если есть - ок
  if (userAccount) {
    finalCallback(userAccount);
  }
  //иначе - запросим
  else {
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
  if (key === 13 && validate(login_inputElement.value, password_inputElement.value)) {
    stop();
    // Получив сохраним
    const accountData = {
      login: login_inputElement.value,
      password: password_inputElement.value
    };
    _account__WEBPACK_IMPORTED_MODULE_0__["default"].set(accountData);
    finalCallback(accountData);
  }
  //Если таб - по-умолчанию
  else if (key === 9) {} else if (
  // Пароль - любые символы, логин - буквы (в том числе кириллица), цифры и немного знаков
  obj === password_inputElement ? obj.value.length <= 64 : /^[a-zA-Zа-яА-ЯёЁ0-9 +.\-_:"()]*$/.test(obj.value) && obj.value.length <= 20) {
    obj.defaultValue = obj.value;
    login_inputElement.style.backgroundColor = '#f4cb4a';
  } else obj.value = obj.defaultValue;
}

// Проверка введенного и индикация ошибки
function validate(login, password) {
  if (login.length === 0) {
    login_inputElement.focus();
    login_inputElement.style.backgroundColor = '#ff0008';
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      login_inputElement.style.backgroundColor = '#f4cb4a';
    }, 200);
    return false;
  }
  if (password.length === 0) {
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
  if (target.id === 'login-button' && validate(login_inputElement.value, password_inputElement.value)) {
    stop();
    const accountData = {
      login: login_inputElement.value,
      password: password_inputElement.value
    };
    _account__WEBPACK_IMPORTED_MODULE_0__["default"].set(accountData);
    finalCallback(accountData);
  } else if (target.id === 'login-input' || target.id === 'password-input') {} else {
    if (login_inputElement.value === '') {
      login_inputElement.focus();
    } else if (password_inputElement.value === '') {
      password_inputElement.focus();
    } else {
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

/***/ },

/***/ "./node_modules/debug/src/browser.js"
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	let m;

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	// eslint-disable-next-line no-return-assign
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG') ;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ },

/***/ "./node_modules/debug/src/common.js"
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		const split = (typeof namespaces === 'string' ? namespaces : '')
			.trim()
			.replace(/\s+/g, ',')
			.split(',')
			.filter(Boolean);

		for (const ns of split) {
			if (ns[0] === '-') {
				createDebug.skips.push(ns.slice(1));
			} else {
				createDebug.names.push(ns);
			}
		}
	}

	/**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */
	function matchesTemplate(search, template) {
		let searchIndex = 0;
		let templateIndex = 0;
		let starIndex = -1;
		let matchIndex = 0;

		while (searchIndex < search.length) {
			if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
				// Match character or proceed with wildcard
				if (template[templateIndex] === '*') {
					starIndex = templateIndex;
					matchIndex = searchIndex;
					templateIndex++; // Skip the '*'
				} else {
					searchIndex++;
					templateIndex++;
				}
			} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
				// Backtrack to the last '*' and try to match more characters
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else {
				return false; // No match
			}
		}

		// Handle trailing '*' in template
		while (templateIndex < template.length && template[templateIndex] === '*') {
			templateIndex++;
		}

		return templateIndex === template.length;
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names,
			...createDebug.skips.map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		for (const skip of createDebug.skips) {
			if (matchesTemplate(name, skip)) {
				return false;
			}
		}

		for (const ns of createDebug.names) {
			if (matchesTemplate(name, ns)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ },

/***/ "./node_modules/ms/index.js"
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
(module) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ },

/***/ "./node_modules/@socket.io/component-emitter/lib/esm/index.js"
/*!********************************************************************!*\
  !*** ./node_modules/@socket.io/component-emitter/lib/esm/index.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Emitter: () => (/* binding */ Emitter)
/* harmony export */ });
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/contrib/has-cors.js"
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/has-cors.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasCORS: () => (/* binding */ hasCORS)
/* harmony export */ });
// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
const hasCORS = value;


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js"
/*!********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseqs.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair.slice(1).join('='));
    }
    return qry;
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js"
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseuri.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    if (str.length > 8000) {
        throw "URI too long";
    }
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/globals.js"
/*!************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/globals.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCookieJar: () => (/* binding */ createCookieJar),
/* harmony export */   defaultBinaryType: () => (/* binding */ defaultBinaryType),
/* harmony export */   globalThisShim: () => (/* binding */ globalThisShim),
/* harmony export */   nextTick: () => (/* binding */ nextTick)
/* harmony export */ });
const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return (cb) => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
const globalThisShim = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();
const defaultBinaryType = "arraybuffer";
function createCookieJar() { }


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fetch: () => (/* reexport safe */ _transports_polling_fetch_js__WEBPACK_IMPORTED_MODULE_6__.Fetch),
/* harmony export */   NodeWebSocket: () => (/* reexport safe */ _transports_websocket_node_js__WEBPACK_IMPORTED_MODULE_8__.WS),
/* harmony export */   NodeXHR: () => (/* reexport safe */ _transports_polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_7__.XHR),
/* harmony export */   Socket: () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket),
/* harmony export */   Transport: () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.Transport),
/* harmony export */   TransportError: () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.TransportError),
/* harmony export */   WebSocket: () => (/* reexport safe */ _transports_websocket_node_js__WEBPACK_IMPORTED_MODULE_8__.WS),
/* harmony export */   WebTransport: () => (/* reexport safe */ _transports_webtransport_js__WEBPACK_IMPORTED_MODULE_9__.WT),
/* harmony export */   XHR: () => (/* reexport safe */ _transports_polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_7__.XHR),
/* harmony export */   installTimerFunctions: () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_3__.installTimerFunctions),
/* harmony export */   nextTick: () => (/* reexport safe */ _globals_node_js__WEBPACK_IMPORTED_MODULE_5__.nextTick),
/* harmony export */   parse: () => (/* reexport safe */ _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__.parse),
/* harmony export */   protocol: () => (/* binding */ protocol),
/* harmony export */   transports: () => (/* reexport safe */ _transports_index_js__WEBPACK_IMPORTED_MODULE_2__.transports)
/* harmony export */ });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./node_modules/engine.io-client/build/esm/socket.js");
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/esm/transports/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/parseuri.js */ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");
/* harmony import */ var _transports_polling_fetch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transports/polling-fetch.js */ "./node_modules/engine.io-client/build/esm/transports/polling-fetch.js");
/* harmony import */ var _transports_polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transports/polling-xhr.js */ "./node_modules/engine.io-client/build/esm/transports/polling-xhr.js");
/* harmony import */ var _transports_websocket_node_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transports/websocket.js */ "./node_modules/engine.io-client/build/esm/transports/websocket.js");
/* harmony import */ var _transports_webtransport_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./transports/webtransport.js */ "./node_modules/engine.io-client/build/esm/transports/webtransport.js");


const protocol = _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket.protocol;













/***/ },

/***/ "./node_modules/engine.io-client/build/esm/socket.js"
/*!***********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/socket.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Socket: () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/esm/transports/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contrib/parseqs.js */ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js");
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseuri.js */ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");







const withEventListeners = typeof addEventListener === "function" &&
    typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
    // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
    // script, so we create one single event listener here which will forward the event to the socket instances
    addEventListener("offline", () => {
        OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
    }, false);
}
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket, or WebTransport.
 *
 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
 * low-level transport, it will try to upgrade to a better transport.
 *
 * @example
 * import { Socket } from "engine.io-client";
 *
 * const socket = new Socket();
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 */
class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
    constructor(uri, opts = {}) {
        var _a, _b;
        super();
        this.binaryType = _globals_node_js__WEBPACK_IMPORTED_MODULE_6__.defaultBinaryType;
        this.writeBuffer = [];
        this._prevBufferLen = 0;
        this._upgrades = [];
        this._pingInterval = -1;
        this._pingTimeout = -1;
        this._maxPayload = -1;
        /**
         * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
         * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
         */
        this._pingTimeoutTime = Infinity;
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            const parsedUri = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(uri);
            opts.hostname = parsedUri.host;
            opts.secure =
                parsedUri.protocol === "https" || parsedUri.protocol === "wss";
            opts.port = parsedUri.port;
            if (parsedUri.query)
                opts.query = parsedUri.query;
        }
        else if (opts.host) {
            opts.hostname = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(opts.host).host;
        }
        ;(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        if (opts.transportImplementations && opts.transports) {
            throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");
        }
        if (opts.transportImplementations ||
            (((_a = opts.transports) === null || _a === void 0 ? void 0 : _a.length) && typeof opts.transports[0] === "function")) {
            // 'transports' option as an array of transport implementations is kept for backward compatibility
            this.transports = [];
            this._transportsByName = Object.create(null);
            ((_b = opts.transportImplementations) !== null && _b !== void 0 ? _b : opts.transports).forEach((t) => {
                const transportName = t.prototype.name;
                this.transports.push(transportName);
                this._transportsByName[transportName] = t;
            });
        }
        else {
            this.transports = opts.transports
                ? [...opts.transports]
                : ["polling", "websocket", "webtransport"];
            this._transportsByName = _transports_index_js__WEBPACK_IMPORTED_MODULE_0__.transports;
        }
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024,
            },
            transportOptions: {},
            closeOnBeforeunload: false,
        }, opts);
        this.opts.path =
            this.opts.path.replace(/\/$/, "") +
                (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__.decode)(this.opts.query);
        }
        if (withEventListeners) {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this._beforeunloadEventListener = () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this._beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this._offlineEventListener = () => {
                    this._onClose("transport close", {
                        description: "network connection lost",
                    });
                };
                OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
            }
        }
        if (this.opts.withCredentials) {
            this._cookieJar = (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_6__.createCookieJar)();
        }
        this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port,
        }, this.opts.transportOptions[name]);
        return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    _open() {
        if (this.transports.length === 0) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        const transportName = this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1
            ? "websocket"
            : this.transports[0];
        this.readyState = "opening";
        const transport = this.createTransport(transportName);
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this._onDrain.bind(this))
            .on("packet", this._onPacket.bind(this))
            .on("error", this._onError.bind(this))
            .on("close", (reason) => this._onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    _probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", (msg) => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err) => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this._upgrades.indexOf("webtransport") !== -1 &&
            name !== "webtransport") {
            // favor WebTransport
            this.setTimeoutFn(() => {
                if (!failed) {
                    transport.open();
                }
            }, 200);
        }
        else {
            transport.open();
        }
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        if ("open" === this.readyState && this.opts.upgrade) {
            for (let i = 0; i < this._upgrades.length; i++) {
                this._probe(this._upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    _onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this._sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    this._resetPingTimeout();
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this._onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this._upgrades = this._filterUpgrades(data.upgrades);
        this._pingInterval = data.pingInterval;
        this._pingTimeout = data.pingTimeout;
        this._maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    _resetPingTimeout() {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        const delay = this._pingInterval + this._pingTimeout;
        this._pingTimeoutTime = Date.now() + delay;
        this._pingTimeoutTimer = this.setTimeoutFn(() => {
            this._onClose("ping timeout");
        }, delay);
        if (this.opts.autoUnref) {
            this._pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    _onDrain() {
        this.writeBuffer.splice(0, this._prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this._prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this._getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this._prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    _getWritablePackets() {
        const shouldCheckPayloadSize = this._maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.byteLength)(data);
            }
            if (i > 0 && payloadSize > this._maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */
    /* private */ _hasPingExpired() {
        if (!this._pingTimeoutTime)
            return true;
        const hasExpired = Date.now() > this._pingTimeoutTime;
        if (hasExpired) {
            this._pingTimeoutTime = 0;
            (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_6__.nextTick)(() => {
                this._onClose("ping timeout");
            }, this.setTimeoutFn);
        }
        return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    send(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type - packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    _sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options,
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
        const close = () => {
            this._onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    _onError(err) {
        Socket.priorWebsocketSuccess = false;
        if (this.opts.tryAllTransports &&
            this.transports.length > 1 &&
            this.readyState === "opening") {
            this.transports.shift();
            return this._open();
        }
        this.emitReserved("error", err);
        this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    _onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this._pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (withEventListeners) {
                if (this._beforeunloadEventListener) {
                    removeEventListener("beforeunload", this._beforeunloadEventListener, false);
                }
                if (this._offlineEventListener) {
                    const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
                    if (i !== -1) {
                        OFFLINE_EVENT_LISTENERS.splice(i, 1);
                    }
                }
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this._prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    _filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        for (let i = 0; i < upgrades.length; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
Socket.protocol = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transport.js"
/*!**************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transport.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transport: () => (/* binding */ Transport),
/* harmony export */   TransportError: () => (/* binding */ TransportError)
/* harmony export */ });
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseqs.js */ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js");




class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */
    open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */
    close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
        const packet = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_0__.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) { }
    createUri(schema, query = {}) {
        return (schema +
            "://" +
            this._hostname() +
            this._port() +
            this.opts.path +
            this._query(query));
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port &&
            ((this.opts.secure && Number(this.opts.port) !== 443) ||
                (!this.opts.secure && Number(this.opts.port) !== 80))) {
            return ":" + this.opts.port;
        }
        else {
            return "";
        }
    }
    _query(query) {
        const encodedQuery = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__.encode)(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transports/index.js"
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/index.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transports: () => (/* binding */ transports)
/* harmony export */ });
/* harmony import */ var _polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling-xhr.node.js */ "./node_modules/engine.io-client/build/esm/transports/polling-xhr.js");
/* harmony import */ var _websocket_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket.node.js */ "./node_modules/engine.io-client/build/esm/transports/websocket.js");
/* harmony import */ var _webtransport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webtransport.js */ "./node_modules/engine.io-client/build/esm/transports/webtransport.js");



const transports = {
    websocket: _websocket_node_js__WEBPACK_IMPORTED_MODULE_1__.WS,
    webtransport: _webtransport_js__WEBPACK_IMPORTED_MODULE_2__.WT,
    polling: _polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_0__.XHR,
};


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transports/polling-fetch.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling-fetch.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fetch: () => (/* binding */ Fetch)
/* harmony export */ });
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/esm/transports/polling.js");

/**
 * HTTP long-polling based on the built-in `fetch()` method.
 *
 * Usage: browser, Node.js (since v18), Deno, Bun
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * @see https://caniuse.com/fetch
 * @see https://nodejs.org/api/globals.html#fetch
 */
class Fetch extends _polling_js__WEBPACK_IMPORTED_MODULE_0__.Polling {
    doPoll() {
        this._fetch()
            .then((res) => {
            if (!res.ok) {
                return this.onError("fetch read error", res.status, res);
            }
            res.text().then((data) => this.onData(data));
        })
            .catch((err) => {
            this.onError("fetch read error", err);
        });
    }
    doWrite(data, callback) {
        this._fetch(data)
            .then((res) => {
            if (!res.ok) {
                return this.onError("fetch write error", res.status, res);
            }
            callback();
        })
            .catch((err) => {
            this.onError("fetch write error", err);
        });
    }
    _fetch(data) {
        var _a;
        const isPost = data !== undefined;
        const headers = new Headers(this.opts.extraHeaders);
        if (isPost) {
            headers.set("content-type", "text/plain;charset=UTF-8");
        }
        (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
        return fetch(this.uri(), {
            method: isPost ? "POST" : "GET",
            body: isPost ? data : null,
            headers,
            credentials: this.opts.withCredentials ? "include" : "omit",
        }).then((res) => {
            var _a;
            // @ts-ignore getSetCookie() was added in Node.js v19.7.0
            (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(res.headers.getSetCookie());
            return res;
        });
    }
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transports/polling-xhr.js"
/*!***************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling-xhr.js ***!
  \***************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseXHR: () => (/* binding */ BaseXHR),
/* harmony export */   Request: () => (/* binding */ Request),
/* harmony export */   XHR: () => (/* binding */ XHR)
/* harmony export */ });
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/esm/transports/polling.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");
/* harmony import */ var _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contrib/has-cors.js */ "./node_modules/engine.io-client/build/esm/contrib/has-cors.js");





function empty() { }
class BaseXHR extends _polling_js__WEBPACK_IMPORTED_MODULE_0__.Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
        }
    }
    /**
     * Sends data.
     *
     * @param {String} data - data to send.
     * @param {Function} fn - called upon flush.
     * @private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data,
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(createRequest, uri, opts) {
        super();
        this.createRequest = createRequest;
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this._opts = opts;
        this._method = opts.method || "GET";
        this._uri = uri;
        this._data = undefined !== opts.data ? opts.data : null;
        this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    _create() {
        var _a;
        const opts = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.pick)(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this._opts.xd;
        const xhr = (this._xhr = this.createRequest(opts));
        try {
            xhr.open(this._method, this._uri, true);
            try {
                if (this._opts.extraHeaders) {
                    // @ts-ignore
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this._opts.extraHeaders) {
                        if (this._opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this._method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this._opts.withCredentials;
            }
            if (this._opts.requestTimeout) {
                xhr.timeout = this._opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                var _a;
                if (xhr.readyState === 3) {
                    (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(
                    // @ts-ignore
                    xhr.getResponseHeader("set-cookie"));
                }
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this._onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this._onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this._data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this._onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this._index = Request.requestsCount++;
            Request.requests[this._index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    _onError(err) {
        this.emitReserved("error", err, this._xhr);
        this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    _cleanup(fromError) {
        if ("undefined" === typeof this._xhr || null === this._xhr) {
            return;
        }
        this._xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this._xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this._index];
        }
        this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    _onLoad() {
        const data = this._xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this._cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
        this._cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}
const hasXHR2 = (function () {
    const xhr = newRequest({
        xdomain: false,
    });
    return xhr && xhr.responseType !== null;
})();
/**
 * HTTP long-polling based on the built-in `XMLHttpRequest` object.
 *
 * Usage: browser
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
class XHR extends BaseXHR {
    constructor(opts) {
        super(opts);
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd }, this.opts);
        return new Request(newRequest, this.uri(), opts);
    }
}
function newRequest(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_4__.hasCORS)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transports/polling.js"
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling.js ***!
  \***********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Polling: () => (/* binding */ Polling)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");



class Polling extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    constructor() {
        super(...arguments);
        this._polling = false;
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
        this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this._polling || !this.writable) {
            let total = 0;
            if (this._polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    _poll() {
        this._polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
        const callback = (packet) => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this._polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this._poll();
            }
            else {
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
        this.writable = false;
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePayload)(packets, (data) => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.randomString)();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transports/websocket.js"
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/websocket.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseWS: () => (/* binding */ BaseWS),
/* harmony export */   WS: () => (/* binding */ WS)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");




// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class BaseWS extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    get name() {
        return "websocket";
    }
    doOpen() {
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws = this.createSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent) => this.onClose({
            description: "websocket connection closed",
            context: closeEvent,
        });
        this.ws.onmessage = (ev) => this.onData(ev.data);
        this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePacket)(packet, this.supportsBinary, (data) => {
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    this.doWrite(packet, data);
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.onerror = () => { };
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.randomString)();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}
const WebSocketCtor = _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim.WebSocket || _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim.MozWebSocket;
/**
 * WebSocket transport based on the built-in `WebSocket` object.
 *
 * Usage: browser, Node.js (since v21), Deno, Bun
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @see https://caniuse.com/mdn-api_websocket
 * @see https://nodejs.org/api/globals.html#websocket
 */
class WS extends BaseWS {
    createSocket(uri, protocols, opts) {
        return !isReactNative
            ? protocols
                ? new WebSocketCtor(uri, protocols)
                : new WebSocketCtor(uri)
            : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
        this.ws.send(data);
    }
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/transports/webtransport.js"
/*!****************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/webtransport.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WT: () => (/* binding */ WT)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");



/**
 * WebTransport transport based on the built-in `WebTransport` object.
 *
 * Usage: browser, Node.js (with the `@fails-components/webtransport` package)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
 * @see https://caniuse.com/webtransport
 */
class WT extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    get name() {
        return "webtransport";
    }
    doOpen() {
        try {
            // @ts-ignore
            this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this._transport.closed
            .then(() => {
            this.onClose();
        })
            .catch((err) => {
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this._transport.ready.then(() => {
            this._transport.createBidirectionalStream().then((stream) => {
                const decoderStream = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.createPacketDecoderStream)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                const reader = stream.readable.pipeThrough(decoderStream).getReader();
                const encoderStream = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.createPacketEncoderStream)();
                encoderStream.readable.pipeTo(stream.writable);
                this._writer = encoderStream.writable.getWriter();
                const read = () => {
                    reader
                        .read()
                        .then(({ done, value }) => {
                        if (done) {
                            return;
                        }
                        this.onPacket(value);
                        read();
                    })
                        .catch((err) => {
                    });
                };
                read();
                const packet = { type: "open" };
                if (this.query.sid) {
                    packet.data = `{"sid":"${this.query.sid}"}`;
                }
                this._writer.write(packet).then(() => this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            this._writer.write(packet).then(() => {
                if (lastPacket) {
                    (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        var _a;
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}


/***/ },

/***/ "./node_modules/engine.io-client/build/esm/util.js"
/*!*********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/util.js ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   byteLength: () => (/* binding */ byteLength),
/* harmony export */   installTimerFunctions: () => (/* binding */ installTimerFunctions),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   randomString: () => (/* binding */ randomString)
/* harmony export */ });
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    }
    else {
        obj.setTimeoutFn = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
        obj.clearTimeoutFn = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}
/**
 * Generates a random 8-characters string.
 */
function randomString() {
    return (Date.now().toString(36).substring(3) +
        Math.random().toString(36).substring(2, 5));
}


/***/ },

/***/ "./node_modules/engine.io-parser/build/esm/commons.js"
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/commons.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_PACKET: () => (/* binding */ ERROR_PACKET),
/* harmony export */   PACKET_TYPES: () => (/* binding */ PACKET_TYPES),
/* harmony export */   PACKET_TYPES_REVERSE: () => (/* binding */ PACKET_TYPES_REVERSE)
/* harmony export */ });
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };



/***/ },

/***/ "./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
const encode = (arraybuffer) => {
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
const decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};


/***/ },

/***/ "./node_modules/engine.io-parser/build/esm/decodePacket.browser.js"
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/decodePacket.browser.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodePacket: () => (/* binding */ decodePacket)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");
/* harmony import */ var _contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contrib/base64-arraybuffer.js */ "./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js");


const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType),
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType),
        };
    }
    const packetType = _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return _commons_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1),
        }
        : {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0,_contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            if (data instanceof Blob) {
                // from WebSocket + binaryType "blob"
                return data;
            }
            else {
                // from HTTP long-polling or WebTransport
                return new Blob([data]);
            }
        case "arraybuffer":
        default:
            if (data instanceof ArrayBuffer) {
                // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
                return data;
            }
            else {
                // from WebTransport (Uint8Array)
                return data.buffer;
            }
    }
};


/***/ },

/***/ "./node_modules/engine.io-parser/build/esm/encodePacket.browser.js"
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/encodePacket.browser.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodePacket: () => (/* binding */ encodePacket),
/* harmony export */   encodePacketToBinary: () => (/* binding */ encodePacketToBinary)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");

const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
function toArray(data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    else {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
        return packet.data.arrayBuffer().then(toArray).then(callback);
    }
    else if (withNativeArrayBuffer &&
        (packet.data instanceof ArrayBuffer || isView(packet.data))) {
        return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded) => {
        if (!TEXT_ENCODER) {
            TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
    });
}



/***/ },

/***/ "./node_modules/engine.io-parser/build/esm/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPacketDecoderStream: () => (/* binding */ createPacketDecoderStream),
/* harmony export */   createPacketEncoderStream: () => (/* binding */ createPacketEncoderStream),
/* harmony export */   decodePacket: () => (/* reexport safe */ _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket),
/* harmony export */   decodePayload: () => (/* binding */ decodePayload),
/* harmony export */   encodePacket: () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket),
/* harmony export */   encodePayload: () => (/* binding */ encodePayload),
/* harmony export */   protocol: () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encodePacket.js */ "./node_modules/engine.io-parser/build/esm/encodePacket.browser.js");
/* harmony import */ var _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decodePacket.js */ "./node_modules/engine.io-parser/build/esm/decodePacket.browser.js");
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");



const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket)(packet, false, (encodedPacket) => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
function createPacketEncoderStream() {
    return new TransformStream({
        transform(packet, controller) {
            (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacketToBinary)(packet, (encodedPacket) => {
                const payloadLength = encodedPacket.length;
                let header;
                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
                if (payloadLength < 126) {
                    header = new Uint8Array(1);
                    new DataView(header.buffer).setUint8(0, payloadLength);
                }
                else if (payloadLength < 65536) {
                    header = new Uint8Array(3);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 126);
                    view.setUint16(1, payloadLength);
                }
                else {
                    header = new Uint8Array(9);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 127);
                    view.setBigUint64(1, BigInt(payloadLength));
                }
                // first bit indicates whether the payload is plain text (0) or binary (1)
                if (packet.data && typeof packet.data !== "string") {
                    header[0] |= 0x80;
                }
                controller.enqueue(header);
                controller.enqueue(encodedPacket);
            });
        },
    });
}
let TEXT_DECODER;
function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
        return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i = 0; i < size; i++) {
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
            chunks.shift();
            j = 0;
        }
    }
    if (chunks.length && j < chunks[0].length) {
        chunks[0] = chunks[0].slice(j);
    }
    return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
        TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0 /* State.READ_HEADER */;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
        transform(chunk, controller) {
            chunks.push(chunk);
            while (true) {
                if (state === 0 /* State.READ_HEADER */) {
                    if (totalLength(chunks) < 1) {
                        break;
                    }
                    const header = concatChunks(chunks, 1);
                    isBinary = (header[0] & 0x80) === 0x80;
                    expectedLength = header[0] & 0x7f;
                    if (expectedLength < 126) {
                        state = 3 /* State.READ_PAYLOAD */;
                    }
                    else if (expectedLength === 126) {
                        state = 1 /* State.READ_EXTENDED_LENGTH_16 */;
                    }
                    else {
                        state = 2 /* State.READ_EXTENDED_LENGTH_64 */;
                    }
                }
                else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */) {
                    if (totalLength(chunks) < 2) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 2);
                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
                    state = 3 /* State.READ_PAYLOAD */;
                }
                else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */) {
                    if (totalLength(chunks) < 8) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 8);
                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
                    const n = view.getUint32(0);
                    if (n > Math.pow(2, 53 - 32) - 1) {
                        // the maximum safe integer in JavaScript is 2^53 - 1
                        controller.enqueue(_commons_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_PACKET);
                        break;
                    }
                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
                    state = 3 /* State.READ_PAYLOAD */;
                }
                else {
                    if (totalLength(chunks) < expectedLength) {
                        break;
                    }
                    const data = concatChunks(chunks, expectedLength);
                    controller.enqueue((0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
                    state = 0 /* State.READ_HEADER */;
                }
                if (expectedLength === 0 || expectedLength > maxPayload) {
                    controller.enqueue(_commons_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_PACKET);
                    break;
                }
            }
        },
    });
}
const protocol = 4;



/***/ },

/***/ "./node_modules/socket.io-client/build/esm/contrib/backo2.js"
/*!*******************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/contrib/backo2.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backoff: () => (/* binding */ Backoff)
/* harmony export */ });
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};


/***/ },

/***/ "./node_modules/socket.io-client/build/esm/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/index.js ***!
  \**********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fetch: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.Fetch),
/* harmony export */   Manager: () => (/* reexport safe */ _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager),
/* harmony export */   NodeWebSocket: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.NodeWebSocket),
/* harmony export */   NodeXHR: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.NodeXHR),
/* harmony export */   Socket: () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket),
/* harmony export */   WebSocket: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.WebSocket),
/* harmony export */   WebTransport: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.WebTransport),
/* harmony export */   XHR: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.XHR),
/* harmony export */   connect: () => (/* binding */ lookup),
/* harmony export */   "default": () => (/* binding */ lookup),
/* harmony export */   io: () => (/* binding */ lookup),
/* harmony export */   protocol: () => (/* reexport safe */ socket_io_parser__WEBPACK_IMPORTED_MODULE_3__.protocol)
/* harmony export */ });
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url.js */ "./node_modules/socket.io-client/build/esm/url.js");
/* harmony import */ var _manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager.js */ "./node_modules/socket.io-client/build/esm/manager.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/esm/socket.js");
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm-debug/index.js");
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");



/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0,_url_js__WEBPACK_IMPORTED_MODULE_0__.url)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager,
    Socket: _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */




/***/ },

/***/ "./node_modules/socket.io-client/build/esm/manager.js"
/*!************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/manager.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Manager: () => (/* binding */ Manager)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/esm/socket.js");
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm-debug/index.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/esm/on.js");
/* harmony import */ var _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/backo2.js */ "./node_modules/socket.io-client/build/esm/contrib/backo2.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");






class Manager extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__.Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || socket_io_parser__WEBPACK_IMPORTED_MODULE_2__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        if (!v) {
            this.skipReconnect = true;
        }
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new engine_io_client__WEBPACK_IMPORTED_MODULE_0__.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        const onError = (err) => {
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "ping", this.onping.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "data", this.ondata.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", this.onerror.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "close", this.onclose.bind(this)), 
        // @ts-ignore
        (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        try {
            this.decoder.add(data);
        }
        catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        ;(0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new _socket_js__WEBPACK_IMPORTED_MODULE_1__.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */
    onclose(reason, description) {
        var _a;
        this.cleanup();
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}


/***/ },

/***/ "./node_modules/socket.io-client/build/esm/on.js"
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/on.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   on: () => (/* binding */ on)
/* harmony export */ });
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}


/***/ },

/***/ "./node_modules/socket.io-client/build/esm/socket.js"
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/socket.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Socket: () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm-debug/index.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/esm/on.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");



/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__.Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */
        this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */
        this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */
        this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */
        this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */
        this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */
        this._queueSeq = 0;
        this.ids = 0;
        /**
         * A map containing acknowledgement handlers.
         *
         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
         *
         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
         * - `const value = await socket.emitWithAck("test")`
         *
         * From those that don't:
         *
         * - `socket.emit("test", (value) => { ... });`
         *
         * In the first case, the handlers will be called with an error when:
         *
         * - the timeout is reached
         * - the socket gets disconnected
         *
         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
         * an acknowledgement from the server.
         *
         * @private
         */
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "open", this.onopen.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "packet", this.onpacket.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "error", this.onerror.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
        var _a, _b, _c;
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
        const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
        const discardPacket = this.flags.volatile && !isTransportWritable;
        if (discardPacket) {
        }
        else if (isConnected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        const fn = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, args);
        };
        fn.withError = true;
        this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
        return new Promise((resolve, reject) => {
            const fn = (arg1, arg2) => {
                return arg1 ? reject(arg1) : resolve(arg2);
            };
            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({ fromQueue: true }, this.flags),
        };
        args.push((err, ...responseArgs) => {
            if (packet !== this._queue[0]) {
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            }
            else {
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this._sendConnectPacket(data);
            });
        }
        else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
        this.packet({
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
                : data,
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
        this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */
    _clearAcks() {
        Object.keys(this.acks).forEach((id) => {
            const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
            if (!isBuffered) {
                // note: handlers that do not accept an error as first argument are ignored here
                const ack = this.acks[id];
                delete this.acks[id];
                if (ack.withError) {
                    ack.call(this, new Error("socket has been disconnected"));
                }
            }
        });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT:
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK:
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack !== "function") {
            return;
        }
        delete this.acks[packet.id];
        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
        if (ack.withError) {
            packet.data.unshift(null);
        }
        // @ts-ignore
        ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this._drainQueue(true);
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}


/***/ },

/***/ "./node_modules/socket.io-client/build/esm/url.js"
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/url.js ***!
  \********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   url: () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.parse)(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}


/***/ },

/***/ "./node_modules/socket.io-parser/build/esm-debug/binary.js"
/*!*****************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm-debug/binary.js ***!
  \*****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deconstructPacket: () => (/* binding */ deconstructPacket),
/* harmony export */   reconstructPacket: () => (/* binding */ reconstructPacket)
/* harmony export */ });
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/esm-debug/is-binary.js");

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers, toJSON) {
    if (!data)
        return data;
    if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_0__.isBinary)(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        if (data.toJSON && typeof data.toJSON === "function" && !toJSON) {
            return _deconstructPacket(data.toJSON(), buffers, true);
        }
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ },

/***/ "./node_modules/socket.io-parser/build/esm-debug/index.js"
/*!****************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm-debug/index.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Decoder: () => (/* binding */ Decoder),
/* harmony export */   Encoder: () => (/* binding */ Encoder),
/* harmony export */   PacketType: () => (/* binding */ PacketType),
/* harmony export */   isPacketValid: () => (/* binding */ isPacketValid),
/* harmony export */   protocol: () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/socket.io-parser/build/esm-debug/binary.js");
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/esm-debug/is-binary.js");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js");



 // debug()
const debug = debug__WEBPACK_IMPORTED_MODULE_3__("socket.io-parser"); // debug()
/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = [
    "connect", // used on the client side
    "connect_error", // used on the client side
    "disconnect", // used on both sides
    "disconnecting", // used on the server side
    "newListener", // used by the Node.js EventEmitter
    "removeListener", // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.hasBinary)(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id,
                });
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.deconstructPacket)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__.Emitter {
    /**
     * Decoder constructor
     */
    constructor(opts) {
        super();
        this.opts = Object.assign({
            reviver: undefined,
            maxAttachments: 10,
        }, typeof opts === "function" ? { reviver: opts } : opts);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.isBinary)(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            const n = Number(buf);
            if (!isInteger(n) || n < 1) {
                throw new Error("Illegal attachments");
            }
            else if (n > this.opts.maxAttachments) {
                throw new Error("too many attachments");
            }
            p.attachments = n;
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.opts.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return (Array.isArray(payload) &&
                    (typeof payload[0] === "number" ||
                        (typeof payload[0] === "string" &&
                            RESERVED_EVENTS.indexOf(payload[0]) === -1)));
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.reconstructPacket)(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}
function isNamespaceValid(nsp) {
    return typeof nsp === "string";
}
// see https://caniuse.com/mdn-javascript_builtins_number_isinteger
const isInteger = Number.isInteger ||
    function (value) {
        return (typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value);
    };
function isAckIdValid(id) {
    return id === undefined || isInteger(id);
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
    switch (type) {
        case PacketType.CONNECT:
            return payload === undefined || isObject(payload);
        case PacketType.DISCONNECT:
            return payload === undefined;
        case PacketType.EVENT:
            return (Array.isArray(payload) &&
                (typeof payload[0] === "number" ||
                    (typeof payload[0] === "string" &&
                        RESERVED_EVENTS.indexOf(payload[0]) === -1)));
        case PacketType.ACK:
            return Array.isArray(payload);
        case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || isObject(payload);
        default:
            return false;
    }
}
function isPacketValid(packet) {
    return (isNamespaceValid(packet.nsp) &&
        isAckIdValid(packet.id) &&
        isDataValid(packet.type, packet.data));
}


/***/ },

/***/ "./node_modules/socket.io-parser/build/esm-debug/is-binary.js"
/*!********************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm-debug/is-binary.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBinary: () => (/* binding */ hasBinary),
/* harmony export */   isBinary: () => (/* binding */ isBinary)
/* harmony export */ });
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./chat-page.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./events.js");
/* harmony import */ var _engine_ui_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/ui/ui */ "./engine/ui/ui.js");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account */ "./account.js");
/* harmony import */ var _scenes_main_ui_chat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scenes/main/ui/chat */ "./scenes/main/ui/chat.js");
/**
 * Отдельная страница чата (chat.html) - для отладки. Входит только в чат, персонаж в игре не появляется
 */




window.onload = function () {
  _engine_ui_ui__WEBPACK_IMPORTED_MODULE_1__["default"].waitScreen.show('Подключение');
  _events__WEBPACK_IMPORTED_MODULE_0__["default"].init(function () {
    _engine_ui_ui__WEBPACK_IMPORTED_MODULE_1__["default"].waitScreen.hide();

    // После переподключения - заново
    _scenes_main_ui_chat__WEBPACK_IMPORTED_MODULE_3__["default"].stop();
    _scenes_main_ui_chat__WEBPACK_IMPORTED_MODULE_3__["default"].start({
      standalone: true
    });
  }, 'chat-login');
  document.getElementById('chat-signout').addEventListener('click', function () {
    _account__WEBPACK_IMPORTED_MODULE_2__["default"].signout();
    window.location.reload();
  }, false);
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyw0Q0FBNEM7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQ0FBRSwwQ0FBMEMsMENBQUUsMENBQTBDLDBDQUFFLDRDQUE0QywwQ0FBRTtBQUMvSjtBQUNBLFFBQVEsMENBQUU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyREFBUTtBQUNoQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw4Q0FBTTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0RBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDRCQUE0QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isd0RBQVU7QUFDNUI7QUFDQSxrQ0FBa0MsMENBQTBDO0FBQzVFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsd0RBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsd0RBQVU7QUFDM0IsaUJBQWlCLHdEQUFVO0FBQzNCO0FBQ0E7QUFDQSxpQkFBaUIsd0RBQVU7QUFDM0IsaUJBQWlCLHdEQUFVO0FBQzNCO0FBQ0E7QUFDQSxpQkFBaUIsd0RBQVU7QUFDM0I7QUFDQTtBQUNBLGlCQUFpQix3REFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0RBQVU7QUFDaEM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsY0FBYztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixNQUFNLHdEQUFVLGFBQWE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixNQUFNO0FBQ2xDLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE1BQU07QUFDeEMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE1BQU07QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ1M7QUFFeEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZO0VBRXhCLHFEQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7RUFFakMsK0NBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWTtJQUNwQixxREFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFFcEI7SUFDQSw0REFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1gsNERBQUksQ0FBQyxLQUFLLENBQUM7TUFBQyxVQUFVLEVBQUU7SUFBSSxDQUFDLENBQUM7RUFDbEMsQ0FBQyxFQUFFLFlBQVksQ0FBQztFQUVoQixRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQzFFLGdEQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUM1QixDQUFDLEVBQUUsS0FBSyxDQUFDO0FBQ2IsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vMi8uL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vMi8uL2VuZ2luZS91aS91aS5qcyIsIndlYnBhY2s6Ly8yLy4vZW5naW5lL3VpL3dhaXRzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vMi8uL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8yLy4vbG9ncy5qcyIsIndlYnBhY2s6Ly8yLy4vc2NlbmVzL21haW4vdWkvY2hhdC5qcyIsIndlYnBhY2s6Ly8yLy4vc2NlbmVzL3NpZ25pbi5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlci9saWIvZXNtL2luZGV4LmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9oYXMtY29ycy5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2Vxcy5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2V1cmkuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9nbG9iYWxzLmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLWZldGNoLmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvcG9sbGluZy5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy93ZWJ0cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS91dGlsLmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vY29tbW9ucy5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2NvbnRyaWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZGVjb2RlUGFja2V0LmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9lbmNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9iYWNrbzIuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vMi8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9vbi5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL3VybC5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtLWRlYnVnL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8yLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtLWRlYnVnL2luZGV4LmpzIiwid2VicGFjazovLzIvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20tZGVidWcvaXMtYmluYXJ5LmpzIiwid2VicGFjazovLzIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8yLy4vY2hhdC1wYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtnZXQsIHNldCwgc2lnbm91dH1cblxuZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmKFxuICAgICAgICAhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpIHx8XG4gICAgICAgICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZV9hY2NvdW50X3Bhc3N3b3JkJylcbiAgICApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9naW46IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfbG9naW4nKSxcbiAgICAgICAgcGFzc3dvcmQ6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzZXQoYWNjb3VudCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lX2FjY291bnRfbG9naW4nLCBhY2NvdW50LmxvZ2luKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZV9hY2NvdW50X3Bhc3N3b3JkJywgYWNjb3VudC5wYXNzd29yZCk7XG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKTtcbn0iLCIvKipcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cbiAqL1xuXG4vLyDQrdC60YDQsNC9INC30LDQs9GA0YPQt9C60LhcbmltcG9ydCB3YWl0U2NyZWVuIGZyb20gJy4vd2FpdHNjcmVlbidcblxuXG5leHBvcnQgZGVmYXVsdCB7d2FpdFNjcmVlbn0iLCIvKipcbiAqINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuICovXG5cblxuY29uc3Qgd2FpdFNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdcIik7XG5cblxuZXhwb3J0IGRlZmF1bHQge3Nob3csIGhpZGV9XG5cblxuZnVuY3Rpb24gc2hvdyh0aXRsZSkge1xuICAgIGlmKHRpdGxlKXtcbiAgICAgICAgbGV0IHRpdGxlRWxlbWVudCA9IHdhaXRTY3JlZW5FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aXRsZScpO1xuICAgICAgICBpZih0aXRsZUVsZW1lbnQpe1xuICAgICAgICAgICAgdGl0bGVFbGVtZW50LmlubmVySFRNTCA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdhaXRTY3JlZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIHdhaXRTY3JlZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cbiIsIi8qKlxuICog0KHQvtCx0YvRgtC40Y8g0LjQs9GA0YtcbiAqL1xuaW1wb3J0IGxvZyBmcm9tIFwiLi9sb2dzLmpzXCI7XG5cbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuXG5pbXBvcnQgdWkgZnJvbSBcIi4vZW5naW5lL3VpL3VpLmpzXCI7XG5cbmltcG9ydCBzaWduSW4gZnJvbSBcIi4vc2NlbmVzL3NpZ25pblwiO1xuXG5pbXBvcnQgYWNjb3VudCBmcm9tIFwiLi9hY2NvdW50XCI7XG5cblxuZXhwb3J0IGRlZmF1bHQge2luaXQsIGFkZCwgb24sIG9mZiwgZGlzY29ubmVjdCwgaXNLaWNrZWR9XG5cbi8vINCf0L7QtNC60LvRjtGH0LXQvdC40LUg0Log0YHQtdGA0LLQtdGA0YNcbmxldCBzZXJ2ZXJTb2NrZXQgPSBudWxsO1xuXG5sZXQgbG9nZ2VkID0gZmFsc2U7XG5cbi8vINCW0LTRkdC8INCy0LLQvtC00LAg0LvQvtCz0LjQvdCwLCDRh9GC0L7QsdGLINC90LUg0L7RgtC60YDRi9Cy0LDRgtGMINGE0L7RgNC80YMg0L/QvtCy0YLQvtGA0L3QviDQvdCwINC60LDQttC00YvQuSBoZWxsb1xubGV0IHNpZ25pbmdJbiA9IGZhbHNlO1xuXG4vLyDQktC+0YjQu9C4INGBINGC0LXQvCDQttC1INC70L7Qs9C40L3QvtC8INCyINC00YDRg9Cz0L7QvCDQvtC60L3QtSAtINGB0LDQvNC4INC90LUg0L/QtdGA0LXQv9C+0LTQutC70Y7Rh9Cw0LXQvNGB0Y8sINC40L3QsNGH0LUg0L7QutC90LAg0LLRi9Cx0LjQstCw0Y7RgiDQtNGA0YPQsyDQtNGA0YPQs9CwXG5sZXQga2lja2VkID0gZmFsc2U7XG5cbmxldCBvbkxvZ2dlZCA9IG51bGw7XG5cbi8vINCh0L7QsdGL0YLQuNC1INCy0YXQvtC00LA6ICdsb2dpbicgLSDQsiDQuNCz0YDRgywgJ2NoYXQtbG9naW4nIC0g0YLQvtC70YzQutC+INCyINGH0LDRgiAo0YHRgtGA0LDQvdC40YbQsCBjaGF0Lmh0bWwpXG5sZXQgbG9naW5FdmVudCA9ICdsb2dpbic7XG5cblxuLyoqXG4gKiDQmNC90LjRgtC40Lwg0LjQs9GA0L7QstGL0LUg0YHQvtCx0YvRgtC40Y8uINCe0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YHQvtC60LXRgtCwINC90LDQstC10YjQuNCy0LDRjtGC0YHRjyDQvtC00LjQvSDRgNCw0LcsINC/0LXRgNC10L/QvtC00LrQu9GO0YfQtdC90LjQtSDQtNC10LvQsNC10YIgc29ja2V0LmlvXG4gKi9cbmZ1bmN0aW9uIGluaXQoY2FsbGJhY2ssIGV2ZW50KSB7XG4gICAgb25Mb2dnZWQgPSBjYWxsYmFjaztcbiAgICBsb2dpbkV2ZW50ID0gZXZlbnQgfHwgJ2xvZ2luJztcblxuICAgIGlmIChzZXJ2ZXJTb2NrZXQpIHJldHVybjtcblxuICAgIHNlcnZlclNvY2tldCA9IGlvKHdpbmRvdy5HQU1FX1NFUlZFUl9VUkwgfHwgXCJodHRwOi8vc2VydmVyLmdhbWVzLnEtZGV2LnJ1XCIpO1xuXG4gICAgbG9nKCfQn9C+0LTQutC70Y7Rh9Cw0LXQvNGB0Y8g0Log0YHQtdGA0LLQtdGA0YMnKTtcblxuICAgIG9uKFwic2VydmVyXCIsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpPT57XG5cbiAgICAgICAgaWYgKHR5cGUgIT09IFwiaGVsbG9cIiB8fCBsb2dnZWQpIHJldHVybjtcblxuICAgICAgICBpZighKGRhdGEudmVyc2lvbiAmJiBkYXRhLnZlcnNpb24gPD0gMC4xOSkpIHtcbiAgICAgICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygn0JbQvNC4IEN0cmwtRjUnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWduaW5nSW4pIHJldHVybjtcbiAgICAgICAgc2lnbmluZ0luID0gdHJ1ZTtcblxuICAgICAgICAvL9Cf0L7Qu9GD0YfQsNC10Lwg0L7RgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0LDQutC60LDRg9C90YIgKNC40LcgbG9jYWxTdG9yYWdlINC40LvQuCDRh9C10YDQtdC3INGE0L7RgNC80YMpXG4gICAgICAgIHNpZ25Jbi5zdGFydChmdW5jdGlvbiAoYWNjb3VudCkge1xuICAgICAgICAgICAgc2lnbmluZ0luID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vINCf0L7QutCwINCy0LLQvtC00LjQu9C4INC70L7Qs9C40L0sINGB0L7QtdC00LjQvdC10L3QuNC1INC80L7Qs9C70L4g0L7QsdC+0YDQstCw0YLRjNGB0Y86INGC0L7Qs9C00LAg0LLQvtC50LTRkdC8INC/0L4g0YHQu9C10LTRg9GO0YnQtdC80YMgaGVsbG9cbiAgICAgICAgICAgIGlmIChzZXJ2ZXJTb2NrZXQuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgYWRkKGxvZ2luRXZlbnQsIGFjY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8v0J/QvtGB0LvQtSDRg9GB0L/QtdGI0L3QvtCz0L4g0LLRhdC+0LTQsCAo0LXRgdC70Lgg0L3QtdGD0YHQv9C10YjQvdGL0LkgLSDRgdC10YDQstC10YAg0L7Qv9GP0YLRjCDQv9C+0YjQu9C10YIgaGVsbG8pXG4gICAgb24oJ2xvZ2dlZCcsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdWNjZXNzJyAmJiAhbG9nZ2VkKSB7XG4gICAgICAgICAgICBsb2dnZWQgPSB0cnVlO1xuICAgICAgICAgICAgb25Mb2dnZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCd0LXQstC10YDQvdGL0Lkg0L/QsNGA0L7Qu9GMOiDRgdC+0YXRgNCw0L3QtdC90L3Ri9C5INCy0YXQvtC0INC30LDQsdGL0LLQsNC10Lwg0Lgg0YHQv9GA0LDRiNC40LLQsNC10Lwg0LfQsNC90L7QstC+XG4gICAgICAgIGlmICh0eXBlID09PSAnZmFpbCcgJiYgIWxvZ2dlZCAmJiAhc2lnbmluZ0luKSB7XG4gICAgICAgICAgICBhY2NvdW50LnNpZ25vdXQoKTtcbiAgICAgICAgICAgIHNpZ25pbmdJbiA9IHRydWU7XG5cbiAgICAgICAgICAgIHNpZ25Jbi5zdGFydChmdW5jdGlvbiAoYWNjb3VudCkge1xuICAgICAgICAgICAgICAgIHNpZ25pbmdJbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZlclNvY2tldC5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkKGxvZ2luRXZlbnQsIGFjY291bnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGRhdGEgJiYgZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb24oXCJhbm90aGVyLWNvbWluZ1wiLCAoKSA9PiB7XG4gICAgICAgIGtpY2tlZCA9IHRydWU7XG4gICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygn0JLRiyDQstC+0YjQu9C4INCyINC00YDRg9Cz0L7QvCDQvtC60L3QtS4g0J7QsdC90L7QstC40YLQtSDRgdGC0YDQsNC90LjRhtGDLCDRh9GC0L7QsdGLINC40LPRgNCw0YLRjCDQt9C00LXRgdGMJyk7XG4gICAgfSk7XG5cbiAgICAvLyDQlNC10LnRgdGC0LLQuNGPINC/0YDQuCDRgdC10YDQstC10YDQvdGL0YUg0L/RgNC+0LHQu9C10LzQsNGFXG4gICAgc2VydmVyU29ja2V0Lm9uKCdjb25uZWN0X2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2coJ9Ce0YjQuNCx0LrQsCDQv9C+0LTQutC70Y7Rh9C10L3QuNGPINC6INGB0LXRgNCy0LXRgNGDJyk7XG4gICAgfSk7XG5cbiAgICBzZXJ2ZXJTb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgbG9nKCfQktGLINC+0YLQutC70Y7Rh9C10L3RiyDQvtGCINGB0LXRgNCy0LXRgNCwJyk7XG5cbiAgICAgICAgbG9nZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGtpY2tlZCkgcmV0dXJuO1xuXG4gICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygpO1xuXG4gICAgICAgIC8vINCf0L7RgdC70LUg0L7QsdGA0YvQstCwINGB0LXRgtC4IHNvY2tldC5pbyDQv9C10YDQtdC/0L7QtNC60LvRjtGH0LDQtdGC0YHRjyDRgdCw0LwsINCwINC/0L7RgdC70LUg0L7RgtC60LvRjtGH0LXQvdC40Y8g0YHQtdGA0LLQtdGA0L7QvCDQuNC70Lgg0LrQu9C40LXQvdGC0L7QvCAo0LLRi9GF0L7QtCkgLSDQvdC10YJcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gJ2lvIHNlcnZlciBkaXNjb25uZWN0JyB8fCByZWFzb24gPT09ICdpbyBjbGllbnQgZGlzY29ubmVjdCcpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2VydmVyU29ja2V0LmNvbm5lY3QoKSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG4vLyDQntCx0YDQsNCx0L7RgtGH0LjQutC4INC/0L4g0YHQvtCx0YvRgtC40Y/QvC4g0J3QsCDRgdC+0LrQtdGCINC00LvRjyDQutCw0LbQtNC+0LPQviDRgdC+0LHRi9GC0LjRjyDQstC10YjQsNC10YLRgdGPINC+0LTQuNC9INGB0LvRg9GI0LDRgtC10LvRjCwg0LrQvtGC0L7RgNGL0Lkg0LjRhSDQstGL0LfRi9Cy0LDQtdGCXG5jb25zdCBoYW5kbGVycyA9IHt9O1xuXG4vKipcbiAqINCU0L7QsdCw0LLQu9C10L3QuNC1INC40LPRgNC+0LLQvtCz0L4g0YHQvtCx0YvRgtC40Y9cbiAqIEBwYXJhbSBldmVudE5hbWVcbiAqIEBwYXJhbSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGFkZChldmVudE5hbWUsIGRhdGEpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC70L7QutCw0LvRjNC90YvQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4IC0g0LLRi9C30L7QstC10LxcbiAgICBydW5IYW5kbGVycyhldmVudE5hbWUsIGRhdGEpO1xuXG4gICAgLy8g0YjQu9C10Lwg0YHQvtCx0YvRgtC40LUg0L3QsCDRgdC10YDQstC10YBcbiAgICBzZXJ2ZXJTb2NrZXQuZW1pdChldmVudE5hbWUsIGRhdGEpXG59XG5cblxuZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuXG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzPT09ZmFsc2Upe1xuICAgICAgICBoYW5kbGVyc1tldmVudE5hbWVdID0gW107XG5cbiAgICAgICAgc2VydmVyU29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGEpID0+IGRpc3BhdGNoKGV2ZW50TmFtZSwgZGF0YSkpO1xuICAgIH1cbiAgICBoYW5kbGVyc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xufVxuXG5cbi8vINCh0L7QsdGL0YLQuNC1INGBINGB0LXRgNCy0LXRgNCwIC0g0LLRgdC10Lwg0YLQtdC60YPRidC40Lwg0L7QsdGA0LDQsdC+0YLRh9C40LrQsNC8XG5mdW5jdGlvbiBkaXNwYXRjaChldmVudE5hbWUsIGRhdGEpIHtcbiAgICB0cnl7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpXG4gICAgfVxuICAgIGNhdGNoIChlKXt9XG5cbiAgICBsZXQgdHlwZSA9IGRhdGEgJiYgZGF0YS50eXBlID8gZGF0YS50eXBlIDogXCJzaW1wbGVcIjtcblxuICAgIC8vINCV0YHQu9C4INCyINC00LDQvdC90YvRhSDRgdC+0LHRi9GC0LjRjyDQtdGB0YLRjCDQv9C+0LvQtSBtZXNzYWdlIC0g0LLRi9Cy0LXQtNC10Lwg0LIg0LvQvtCzXG4gICAgZGF0YSAmJiBkYXRhLm1lc3NhZ2UgJiYgbG9nKGRhdGEubWVzc2FnZSk7XG5cbiAgICAvLyDQmtC+0L/QuNGPOiDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQvNC+0LbQtdGCINC+0YLQv9C40YHQsNGC0YzRgdGPINCy0L4g0LLRgNC10LzRjyDQstGL0LfQvtCy0LBcbiAgICBmb3IgKGNvbnN0IGggb2YgWy4uLmhhbmRsZXJzW2V2ZW50TmFtZV1dKSB7XG4gICAgICAgIGgoZXZlbnROYW1lLCB0eXBlLCBkYXRhKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiDQntGC0L/QuNGB0LrQsC4g0JHQtdC3IGhhbmRsZXIgLSDQvtGCINCy0YHQtdGFINC+0LHRgNCw0LHQvtGC0YfQuNC60L7QsiDRgdC+0LHRi9GC0LjRj1xuICovXG5mdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzPT09ZmFsc2UpIHJldHVybjtcblxuICAgIGhhbmRsZXJzW2V2ZW50TmFtZV0gPSBoYW5kbGVyXG4gICAgICAgID8gaGFuZGxlcnNbZXZlbnROYW1lXS5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPT0gaGFuZGxlcilcbiAgICAgICAgOiBbXTtcbn1cblxuXG4vLyDQl9Cw0L/Rg9GB0Log0LTQu9GPINC70L7QutCw0LvRjNC90YvRhSDRgdC+0LHRi9GC0LjQuVxuZnVuY3Rpb24gcnVuSGFuZGxlcnMoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgLy/QldGB0LvQuCDQtdGB0YLRjCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4IC0g0LfQsNC/0YPRgdC60LDQtdC8XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzKXtcbiAgICAgICAgZm9yKGNvbnN0IGggb2YgaGFuZGxlcnNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICBoKGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICBzZXJ2ZXJTb2NrZXQuY2xvc2UoKTtcbn1cblxuXG5mdW5jdGlvbiBpc0tpY2tlZCgpIHtcbiAgICByZXR1cm4ga2lja2VkO1xufVxuIiwiLyoqXG4gKiDQm9C+0LPQuNGA0L7QstCw0L3QuNC1XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuXG5jb25zdCAkbG9ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dzJyk7XG5cbmZ1bmN0aW9uIGxvZyhtc2cpIHtcbiAgICAkbG9ncy5pbm5lckhUTUwgKz0gJzxkaXYgY2xhc3M9XCJtc2dcIj4nK21zZysnPC9kaXY+JztcbiAgICAkbG9ncy5wYXJlbnRFbGVtZW50LnNjcm9sbFRvcCA9ICRsb2dzLnNjcm9sbEhlaWdodDtcbiAgICBjb25zb2xlLmxvZyhtc2cpO1xufTsiLCJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi9ldmVudHNcIjtcblxuLyoqXG4gKiDQp9Cw0YIg0L3QsCDQstC10YHRjCDRgdC10YDQstC10YAuINCf0LDQvdC10LvRjCDQv9C+0LrQsNC30YvQstCw0LXRgtGB0Y8sINGC0L7Qu9GM0LrQviDQtdGB0LvQuCDRgdC10YDQstC10YAg0L7RgtCy0LXRgtC40Lsg0LjRgdGC0L7RgNC40LXQuSAo0YfQsNGCINGA0LDQt9GA0LXRiNC10L0g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GOKVxuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9XG5cblxuY29uc3QgTUFYX0xFTkdUSCA9IDUwMDtcbi8vINCV0YHQu9C4INC/0L7Qu9C90YvQuSDRgdC/0LjRgdC+0Log0Y3QvNC+0LTQt9C4INC90LUg0LfQsNCz0YDRg9C30LjQu9GB0Y9cbmNvbnN0IEZBTExCQUNLX0VNT0pJID0gWyfwn5iAJywgJ/CfmIInLCAn8J+koycsICfwn5iKJywgJ/CfmI0nLCAn8J+YmCcsICfwn5iOJywgJ/CfpJQnLCAn8J+YjycsICfwn5iiJywgJ/CfmK0nLCAn8J+YoScsICfwn5ixJywgJ/CfpK8nLCAn8J+YtCcsICfwn5mEJyxcbiAgICAn8J+RjScsICfwn5GOJywgJ/CfkY8nLCAn8J+ZjycsICfwn5KqJywgJ/CfpJ0nLCAn8J+RiycsICfinIzvuI8nLCAn4p2k77iPJywgJ/CflKUnLCAn4q2QJywgJ/CfjoknLCAn8J+SsCcsICfimpTvuI8nLCAn8J+boe+4jycsICfwn5KAJ107XG5jb25zdCBFTU9KSV9VUkwgPSAnZGF0YS9lbW9qaS5qc29uP3Y9Mic7XG5jb25zdCBSRUNFTlRfS0VZID0gJ2NoYXRfZW1vamlfcmVjZW50JztcbmNvbnN0IFJFQ0VOVF9MSU1JVCA9IDQwO1xuY29uc3QgU0VBUkNIX0xJTUlUID0gMzAwO1xuY29uc3QgVVJMX1BBVFRFUk4gPSAvaHR0cHM/OlxcL1xcL1teXFxzPD5cIiddKy9nO1xuXG5jb25zdCBwYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1wYW5lbFwiKTtcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1oZWFkZXJcIik7XG5jb25zdCB1bnJlYWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGF0LXVucmVhZFwiKTtcbmNvbnN0IG9ubGluZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXQtb25saW5lXCIpO1xuY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1tZXNzYWdlc1wiKTtcbmNvbnN0IGVtb2ppUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXQtZW1vamlcIik7XG5jb25zdCBlbW9qaUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1lbW9qaS1idXR0b25cIik7XG5jb25zdCBlZGl0aW5nRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1lZGl0aW5nXCIpO1xuY29uc3QgZWRpdENhbmNlbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1lZGl0LWNhbmNlbFwiKTtcbmNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGF0LWlucHV0XCIpO1xuY29uc3Qgc2VuZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1zZW5kXCIpO1xuY29uc3QgY291bnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdC1jb3VudGVyXCIpO1xuXG5jb25zdCBiYXNlVGl0bGUgPSBkb2N1bWVudC50aXRsZTtcblxuLy8g0J3QsCDRgtC10LvQtdGE0L7QvdC1IEVudGVyINC/0LXRgNC10L3QvtGB0LjRgiDRgdGC0YDQvtC60YMsINC+0YLQv9GA0LDQstC60LAgLSDQutC90L7Qv9C60L7QuVxuY29uc3QgdG91Y2hJbnB1dCA9IHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocG9pbnRlcjogY29hcnNlKScpLm1hdGNoZXM7XG5jb25zdCBNQVhfSU5QVVRfSEVJR0hUID0gMTQwO1xuXG4vLyDQntGC0LTQtdC70YzQvdCw0Y8g0YHRgtGA0LDQvdC40YbQsDog0L/QsNC90LXQu9GMINCy0YHQtdCz0LTQsCDRgNCw0LfQstC10YDQvdGD0YLQsFxubGV0IHN0YW5kYWxvbmUgPSBmYWxzZTtcblxubGV0IG1lID0gbnVsbCxcbiAgICBtZXNzYWdlcyA9IG5ldyBNYXAoKSwgLy8gaWQgLT4g0Y3Qu9C10LzQtdC90YIg0YHQvtC+0LHRidC10L3QuNGPXG4gICAgaGFzTW9yZSA9IGZhbHNlLFxuICAgIGxvYWRpbmdPbGRlciA9IGZhbHNlLFxuICAgIHVucmVhZCA9IDAsXG4gICAgZWRpdGluZ0lkID0gbnVsbCxcbiAgICBwaW5uZWRUb0JvdHRvbSA9IHRydWU7XG5cblxuZnVuY3Rpb24gc3RhcnQob3B0aW9ucykge1xuICAgIHN0YW5kYWxvbmUgPSAhIShvcHRpb25zICYmIG9wdGlvbnMuc3RhbmRhbG9uZSk7XG4gICAgcmVzZXQoKTtcblxuICAgIGlmIChzdGFuZGFsb25lKSBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzZWQnKTtcblxuICAgIGV2ZW50cy5vbignY2hhdCcsIG9uU2VydmVyKTtcblxuICAgIC8vINCf0LDQvdC10LvRjCDQvdC1INC/0YDQvtC/0YPRgdC60LDQtdGCINC80YvRiNGMINC4INC60LDRgdCw0L3QuNGPINCyINC40LPRgNGDXG4gICAgWydtb3VzZWRvd24nLCAnbW91c2V1cCcsICdjbGljaycsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZScsICd3aGVlbCddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgcGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBzdG9wUHJvcGFnYXRpb24sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZSwgZmFsc2UpO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25MaXN0Q2xpY2ssIGZhbHNlKTtcbiAgICBlbW9qaUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUVtb2ppLCBmYWxzZSk7XG4gICAgZW1vamlQYW5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRW1vamlDbGljaywgZmFsc2UpO1xuICAgIGVkaXRDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYW5jZWxFZGl0LCBmYWxzZSk7XG4gICAgc2VuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdCwgZmFsc2UpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbklucHV0S2V5ZG93biwgZmFsc2UpO1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlQ291bnRlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkRvY3VtZW50S2V5ZG93biwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBtYXJrUmVhZCwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSwgZmFsc2UpO1xuXG4gICAgaWYgKHRvdWNoSW5wdXQpIGlucHV0LnBsYWNlaG9sZGVyID0gJ9Ch0L7QvtCx0YnQtdC90LjQtSc7XG5cbiAgICBldmVudHMuYWRkKCdjaGF0Jywge2FjdGlvbjogJ2hpc3RvcnknfSk7XG59XG5cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBldmVudHMub2ZmKCdjaGF0Jywgb25TZXJ2ZXIpO1xuXG4gICAgWydtb3VzZWRvd24nLCAnbW91c2V1cCcsICdjbGljaycsICd0b3VjaHN0YXJ0JywgJ3RvdWNoZW5kJywgJ3RvdWNobW92ZScsICd3aGVlbCddLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgcGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBzdG9wUHJvcGFnYXRpb24sIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZSwgZmFsc2UpO1xuICAgIGxpc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcbiAgICBsaXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25MaXN0Q2xpY2ssIGZhbHNlKTtcbiAgICBlbW9qaUJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUVtb2ppLCBmYWxzZSk7XG4gICAgZW1vamlQYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRW1vamlDbGljaywgZmFsc2UpO1xuICAgIGVkaXRDYW5jZWxCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjYW5jZWxFZGl0LCBmYWxzZSk7XG4gICAgc2VuZEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1Ym1pdCwgZmFsc2UpO1xuICAgIGlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbklucHV0S2V5ZG93biwgZmFsc2UpO1xuICAgIGlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlQ291bnRlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkRvY3VtZW50S2V5ZG93biwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBtYXJrUmVhZCwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSwgZmFsc2UpO1xuXG4gICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBkb2N1bWVudC50aXRsZSA9IGJhc2VUaXRsZTtcbn1cblxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBtZSA9IG51bGw7XG4gICAgbWVzc2FnZXMgPSBuZXcgTWFwKCk7XG4gICAgaGFzTW9yZSA9IGZhbHNlO1xuICAgIGxvYWRpbmdPbGRlciA9IGZhbHNlO1xuICAgIHVucmVhZCA9IDA7XG4gICAgbGlzdC50ZXh0Q29udGVudCA9ICcnO1xuICAgIHVucmVhZEVsZW1lbnQudGV4dENvbnRlbnQgPSAnJztcbiAgICBjYW5jZWxFZGl0KCk7XG59XG5cblxuLy8g0KHQvtCx0YvRgtC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcbmZ1bmN0aW9uIG9uU2VydmVyKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdoaXN0b3J5JzpcbiAgICAgICAgICAgIG9uSGlzdG9yeShkYXRhKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgIGFkZE1lc3NhZ2UoZGF0YS5pdGVtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdlZGl0ZWQnOlxuICAgICAgICAgICAgdXBkYXRlTWVzc2FnZShkYXRhLml0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlbGV0ZWQnOlxuICAgICAgICAgICAgcmVtb3ZlTWVzc2FnZShkYXRhLmlkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvbmxpbmUnOlxuICAgICAgICAgICAgc2hvd09ubGluZShkYXRhLnVzZXJzIHx8IFtdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBvbkhpc3RvcnkoZGF0YSkge1xuICAgIG1lID0gZGF0YS5tZTtcbiAgICBoYXNNb3JlID0gZGF0YS5tb3JlO1xuXG4gICAgaWYgKCFkYXRhLm9sZGVyKSB7XG4gICAgICAgIGxpc3QudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgbWVzc2FnZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaCgoaXRlbSkgPT4gbGlzdC5hcHBlbmRDaGlsZChyZW5kZXIoaXRlbSkpKTtcblxuICAgICAgICAvLyDQn9GD0YHRgtC+0LUg0LfQvdCw0YfQtdC90LjQtSAtINCy0LjQtCDQv9Cw0L3QtdC70Lgg0LfQsNC00LDQtdGCIENTUyAo0LIg0LjQs9GA0LUg0LHQu9C+0LosINC90LAg0L7RgtC00LXQu9GM0L3QvtC5INGB0YLRgNCw0L3QuNGG0LUgZmxleClcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB1cGRhdGVDb3VudGVyKCk7XG4gICAgICAgIGlmICghaXNDb2xsYXBzZWQoKSkgc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vINCR0L7Qu9C10LUg0YHRgtCw0YDRi9C1IC0g0YHQstC10YDRhdGDLCDQvdC1INGB0LTQstC40LPQsNGPINCy0LjQtNC40LzQvtC1XG4gICAgY29uc3QgaGVpZ2h0ID0gbGlzdC5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgZGF0YS5tZXNzYWdlcy5maWx0ZXIoKGl0ZW0pID0+ICFtZXNzYWdlcy5oYXMoaXRlbS5pZCkpLmZvckVhY2goKGl0ZW0pID0+IGZyYWdtZW50LmFwcGVuZENoaWxkKHJlbmRlcihpdGVtKSkpO1xuICAgIGxpc3QuaW5zZXJ0QmVmb3JlKGZyYWdtZW50LCBsaXN0LmZpcnN0Q2hpbGQpO1xuICAgIGxpc3Quc2Nyb2xsVG9wICs9IGxpc3Quc2Nyb2xsSGVpZ2h0IC0gaGVpZ2h0O1xuXG4gICAgbG9hZGluZ09sZGVyID0gZmFsc2U7XG59XG5cblxuZnVuY3Rpb24gYWRkTWVzc2FnZShpdGVtKSB7XG4gICAgaWYgKG1lc3NhZ2VzLmhhcyhpdGVtLmlkKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgYXRCb3R0b20gPSBsaXN0LnNjcm9sbEhlaWdodCAtIGxpc3Quc2Nyb2xsVG9wIC0gbGlzdC5jbGllbnRIZWlnaHQgPCA0MDtcblxuICAgIGxpc3QuYXBwZW5kQ2hpbGQocmVuZGVyKGl0ZW0pKTtcblxuICAgIGlmIChpdGVtLmxvZ2luID09PSBtZSB8fCBhdEJvdHRvbSkgc2Nyb2xsVG9Cb3R0b20oKTtcblxuICAgIGlmIChpdGVtLmxvZ2luICE9PSBtZSAmJiAoaXNDb2xsYXBzZWQoKSB8fCBkb2N1bWVudC5oaWRkZW4pKSB7XG4gICAgICAgIHVucmVhZCsrO1xuICAgICAgICBzaG93VW5yZWFkKCk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZU1lc3NhZ2UoaXRlbSkge1xuICAgIGNvbnN0IG9sZCA9IG1lc3NhZ2VzLmdldChpdGVtLmlkKTtcbiAgICBpZiAob2xkKSBvbGQucmVwbGFjZVdpdGgocmVuZGVyKGl0ZW0pKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVNZXNzYWdlKGlkKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IG1lc3NhZ2VzLmdldChpZCk7XG4gICAgaWYgKCFlbGVtZW50KSByZXR1cm47XG5cbiAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIG1lc3NhZ2VzLmRlbGV0ZShpZCk7XG5cbiAgICBpZiAoZWRpdGluZ0lkID09PSBpZCkgY2FuY2VsRWRpdCgpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbmRlcihpdGVtKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2NoYXQtbXNnJyArIChpdGVtLmxvZ2luID09PSBtZSA/ICcgb3duJyA6ICcnKTtcbiAgICBlbGVtZW50LmRhdGFzZXQuaWQgPSBpdGVtLmlkO1xuICAgIGVsZW1lbnQuY2hhdEl0ZW0gPSBpdGVtO1xuXG4gICAgY29uc3QgbWV0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1ldGEuY2xhc3NOYW1lID0gJ2NoYXQtbWV0YSc7XG5cbiAgICBjb25zdCBhdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgYXV0aG9yLmNsYXNzTmFtZSA9ICdjaGF0LWF1dGhvcic7XG4gICAgYXV0aG9yLnRleHRDb250ZW50ID0gaXRlbS5sb2dpbjtcbiAgICBtZXRhLmFwcGVuZENoaWxkKGF1dGhvcik7XG5cbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHRpbWUudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKGl0ZW0uY3JlYXRlZCkgKyAoaXRlbS5lZGl0ZWQgPyAnICjQuNC30LzQtdC90LXQvdC+KScgOiAnJyk7XG4gICAgbWV0YS5hcHBlbmRDaGlsZCh0aW1lKTtcblxuICAgIGlmIChpdGVtLmxvZ2luID09PSBtZSkge1xuICAgICAgICBjb25zdCBhY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBhY3Rpb25zLmNsYXNzTmFtZSA9ICdjaGF0LWFjdGlvbnMnO1xuICAgICAgICBhY3Rpb25zLmFwcGVuZENoaWxkKGJ1dHRvbignY2hhdC1lZGl0JywgJ+KcjicsICfQmNC30LzQtdC90LjRgtGMJykpO1xuICAgICAgICBhY3Rpb25zLmFwcGVuZENoaWxkKGJ1dHRvbignY2hhdC1kZWxldGUnLCAn4pyVJywgJ9Cj0LTQsNC70LjRgtGMJykpO1xuICAgICAgICBtZXRhLmFwcGVuZENoaWxkKGFjdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZXh0LmNsYXNzTmFtZSA9ICdjaGF0LXRleHQnO1xuICAgIGFwcGVuZFRleHQodGV4dCwgaXRlbS50ZXh0KTtcblxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobWV0YSk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgIG1lc3NhZ2VzLnNldChpdGVtLmlkLCBlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5cbmZ1bmN0aW9uIGJ1dHRvbihjbGFzc05hbWUsIGxhYmVsLCB0aXRsZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBlbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgZWxlbWVudC50aXRsZSA9IHRpdGxlO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG5cbi8vINCi0LXQutGB0YIg0YEg0LrQu9C40LrQsNCx0LXQu9GM0L3Ri9C80Lgg0YHRgdGL0LvQutCw0LzQuC4g0KLQvtC70YzQutC+IHRleHRDb250ZW50INC4INGD0LfQu9GLIC0gSFRNTCDQuNC3INGB0L7QvtCx0YnQtdC90LjRjyDQvdC1INCy0YvQv9C+0LvQvdGP0LXRgtGB0Y9cbmZ1bmN0aW9uIGFwcGVuZFRleHQoZWxlbWVudCwgdGV4dCkge1xuICAgIGxldCBsYXN0ID0gMDtcblxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgdGV4dC5tYXRjaEFsbChVUkxfUEFUVEVSTikpIHtcbiAgICAgICAgLy8g0JfQvdCw0LrQuCDQv9GA0LXQv9C40L3QsNC90LjRjyDQsiDQutC+0L3RhtC1INC+0LHRi9GH0L3QviDQvdC1INGH0LDRgdGC0Ywg0YHRgdGL0LvQutC4XG4gICAgICAgIGNvbnN0IHVybCA9IG1hdGNoWzBdLnJlcGxhY2UoL1suLCE/OzopXSskLywgJycpO1xuXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dC5zbGljZShsYXN0LCBtYXRjaC5pbmRleCkpKTtcblxuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGxpbmsudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgICAgIGxpbmsucmVsID0gJ25vb3BlbmVyIG5vcmVmZXJyZXInO1xuICAgICAgICBsaW5rLnRleHRDb250ZW50ID0gdXJsO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmspO1xuXG4gICAgICAgIGxhc3QgPSBtYXRjaC5pbmRleCArIHVybC5sZW5ndGg7XG4gICAgfVxuXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0LnNsaWNlKGxhc3QpKSk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VGltZSh2YWx1ZSkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSksXG4gICAgICAgIHBhZCA9IChuKSA9PiBTdHJpbmcobikucGFkU3RhcnQoMiwgJzAnKSxcbiAgICAgICAgdGltZSA9IHBhZChkYXRlLmdldEhvdXJzKCkpICsgJzonICsgcGFkKGRhdGUuZ2V0TWludXRlcygpKTtcblxuICAgIHJldHVybiBkYXRlLnRvRGF0ZVN0cmluZygpID09PSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpID9cbiAgICAgICAgdGltZSA6XG4gICAgICAgIHBhZChkYXRlLmdldERhdGUoKSkgKyAnLicgKyBwYWQoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnICcgKyB0aW1lO1xufVxuXG5cbmZ1bmN0aW9uIHNob3dPbmxpbmUodXNlcnMpIHtcbiAgICBvbmxpbmVFbGVtZW50LnRleHRDb250ZW50ID0gdXNlcnMubGVuZ3RoID8gJ9CyINGB0LXRgtC4OiAnICsgdXNlcnMuam9pbignLCAnKSA6ICcnO1xuICAgIG9ubGluZUVsZW1lbnQudGl0bGUgPSB1c2Vycy5qb2luKCdcXG4nKTtcbn1cblxuXG5mdW5jdGlvbiBzaG93VW5yZWFkKCkge1xuICAgIHVucmVhZEVsZW1lbnQudGV4dENvbnRlbnQgPSB1bnJlYWQgPyBTdHJpbmcodW5yZWFkKSA6ICcnO1xuICAgIGRvY3VtZW50LnRpdGxlID0gdW5yZWFkID8gJygnICsgdW5yZWFkICsgJykgJyArIGJhc2VUaXRsZSA6IGJhc2VUaXRsZTtcbn1cblxuXG5mdW5jdGlvbiBtYXJrUmVhZCgpIHtcbiAgICBpZiAoaXNDb2xsYXBzZWQoKSB8fCBkb2N1bWVudC5oaWRkZW4pIHJldHVybjtcblxuICAgIHVucmVhZCA9IDA7XG4gICAgc2hvd1VucmVhZCgpO1xufVxuXG5cbmZ1bmN0aW9uIGlzQ29sbGFwc2VkKCkge1xuICAgIHJldHVybiBwYW5lbC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNlZCcpO1xufVxuXG5cbmZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICBpZiAoc3RhbmRhbG9uZSkgcmV0dXJuO1xuXG4gICAgcGFuZWwuY2xhc3NMaXN0LnRvZ2dsZSgnY29sbGFwc2VkJyk7XG5cbiAgICBpZiAoIWlzQ29sbGFwc2VkKCkpIHtcbiAgICAgICAgdXBkYXRlQ291bnRlcigpO1xuICAgICAgICBzY3JvbGxUb0JvdHRvbSgpO1xuICAgICAgICBtYXJrUmVhZCgpO1xuICAgICAgICBpbnB1dC5mb2N1cygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5wdXQuYmx1cigpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBzY3JvbGxUb0JvdHRvbSgpIHtcbiAgICBsaXN0LnNjcm9sbFRvcCA9IGxpc3Quc2Nyb2xsSGVpZ2h0O1xufVxuXG5cbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICAgIHBpbm5lZFRvQm90dG9tID0gbGlzdC5zY3JvbGxIZWlnaHQgLSBsaXN0LnNjcm9sbFRvcCAtIGxpc3QuY2xpZW50SGVpZ2h0IDwgNDA7XG5cbiAgICBpZiAobGlzdC5zY3JvbGxUb3AgPiAzMCB8fCAhaGFzTW9yZSB8fCBsb2FkaW5nT2xkZXIgfHwgIWxpc3QuZmlyc3RFbGVtZW50Q2hpbGQpIHJldHVybjtcblxuICAgIGxvYWRpbmdPbGRlciA9IHRydWU7XG4gICAgZXZlbnRzLmFkZCgnY2hhdCcsIHthY3Rpb246ICdoaXN0b3J5JywgYmVmb3JlSWQ6IE51bWJlcihsaXN0LmZpcnN0RWxlbWVudENoaWxkLmRhdGFzZXQuaWQpfSk7XG59XG5cblxuZnVuY3Rpb24gb25MaXN0Q2xpY2soZSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuY2hhdC1tc2cnKTtcbiAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGlkID0gTnVtYmVyKGVsZW1lbnQuZGF0YXNldC5pZCk7XG5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGF0LWVkaXQnKSkge1xuICAgICAgICBzdGFydEVkaXQoaWQsIGVsZW1lbnQuY2hhdEl0ZW0udGV4dCk7XG4gICAgfVxuXG4gICAgLy8g0KPQtNCw0LvQtdC90LjQtSAtINC/0L4g0LLRgtC+0YDQvtC80YMg0LrQu9C40LrRgywg0YfRgtC+0LHRiyDQvdC1INGD0LTQsNC70LjRgtGMINGB0LvRg9GH0LDQudC90L5cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGF0LWRlbGV0ZScpKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm0nKSkge1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnY2hhdCcsIHthY3Rpb246ICdkZWxldGUnLCBpZH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnY29uZmlybScpO1xuICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbmZpcm0nKTtcbiAgICAgICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSAn0KPQtNCw0LvQuNGC0Yw/JztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdjb25maXJtJyk7XG4gICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbmZpcm0nKTtcbiAgICAgICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gJ+KclSc7XG4gICAgICAgIH0sIDMwMDApO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBzdGFydEVkaXQoaWQsIHRleHQpIHtcbiAgICBlZGl0aW5nSWQgPSBpZDtcbiAgICBlZGl0aW5nRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBpbnB1dC52YWx1ZSA9IHRleHQ7XG4gICAgdXBkYXRlQ291bnRlcigpO1xuICAgIGlucHV0LmZvY3VzKCk7XG59XG5cblxuZnVuY3Rpb24gY2FuY2VsRWRpdCgpIHtcbiAgICBjb25zdCB3YXNFZGl0aW5nID0gZWRpdGluZ0lkICE9PSBudWxsO1xuXG4gICAgZWRpdGluZ0lkID0gbnVsbDtcbiAgICBlZGl0aW5nRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgaWYgKHdhc0VkaXRpbmcpIGlucHV0LnZhbHVlID0gJyc7XG4gICAgdXBkYXRlQ291bnRlcigpO1xufVxuXG5cbmZ1bmN0aW9uIHN1Ym1pdCgpIHtcbiAgICBjb25zdCB0ZXh0ID0gaW5wdXQudmFsdWUudHJpbSgpO1xuXG4gICAgaWYgKCF0ZXh0IHx8IFsuLi50ZXh0XS5sZW5ndGggPiBNQVhfTEVOR1RIKSByZXR1cm47XG5cbiAgICBpZiAoZWRpdGluZ0lkICE9PSBudWxsKSB7XG4gICAgICAgIGV2ZW50cy5hZGQoJ2NoYXQnLCB7YWN0aW9uOiAnZWRpdCcsIGlkOiBlZGl0aW5nSWQsIHRleHR9KTtcbiAgICAgICAgY2FuY2VsRWRpdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXZlbnRzLmFkZCgnY2hhdCcsIHthY3Rpb246ICdzZW5kJywgdGV4dH0pO1xuICAgIH1cblxuICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgdXBkYXRlQ291bnRlcigpO1xuICAgIGVtb2ppUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuXG5mdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IFsuLi5pbnB1dC52YWx1ZS50cmltKCldLmxlbmd0aDtcblxuICAgIGNvdW50ZXIudGV4dENvbnRlbnQgPSBsZW5ndGggPiBNQVhfTEVOR1RIIC0gMTAwID8gbGVuZ3RoICsgJyAvICcgKyBNQVhfTEVOR1RIIDogJyc7XG4gICAgY291bnRlci5jbGFzc0xpc3QudG9nZ2xlKCdvdmVyJywgbGVuZ3RoID4gTUFYX0xFTkdUSCk7XG5cbiAgICAvLyDQn9C+0LvQtSDRgNCw0YHRgtC10YIg0L/QviDRgtC10LrRgdGC0YMg0LTQviBNQVhfSU5QVVRfSEVJR0hULCDQtNCw0LvRjNGI0LUgLSDQv9GA0L7QutGA0YPRgtC60LBcbiAgICAvLyDQoyDRgdC60YDRi9GC0L7QuSDQv9Cw0L3QtdC70Lgg0LLRi9GB0L7RgtCwIDAgLSDRgtC+0LPQtNCwINC+0YHRgtCw0LLQu9GP0LXQvCDQstGL0YHQvtGC0YMg0LjQtyBDU1NcbiAgICBpbnB1dC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgaW5wdXQuc3R5bGUuaGVpZ2h0ID0gaW5wdXQuc2Nyb2xsSGVpZ2h0ID8gTWF0aC5taW4oaW5wdXQuc2Nyb2xsSGVpZ2h0ICsgMiwgTUFYX0lOUFVUX0hFSUdIVCkgKyAncHgnIDogJyc7XG59XG5cblxuLy8g0JrQu9Cw0LLQuNCw0YLRg9GA0LAg0YLQtdC70LXRhNC+0L3QsCDQuNC70Lgg0L/QvtCy0L7RgNC+0YIg0Y3QutGA0LDQvdCwINC80LXQvdGP0Y7RgiDQstGL0YHQvtGC0YMgLSDQvtGB0YLQsNC10LzRgdGPINGDINC/0L7RgdC70LXQtNC90LjRhSDRgdC+0L7QsdGJ0LXQvdC40LlcbmZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICAgIGlmIChwaW5uZWRUb0JvdHRvbSkgc2Nyb2xsVG9Cb3R0b20oKTtcbn1cblxuXG5mdW5jdGlvbiBvbklucHV0S2V5ZG93bihlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmICFlLnNoaWZ0S2V5ICYmICF0b3VjaElucHV0KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3VibWl0KCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBpZiAoZWRpdGluZ0lkICE9PSBudWxsKSBjYW5jZWxFZGl0KCk7XG4gICAgICAgIGVsc2UgaW5wdXQuYmx1cigpO1xuICAgIH1cbn1cblxuXG4vLyBFbnRlciDQstC90LUg0L/QvtC70Y8g0LLQstC+0LTQsCAtINC+0YLQutGA0YvRgtGMINGH0LDRgiDQuCDQv9C10YDQtdC50YLQuCDQuiDQstCy0L7QtNGDXG5mdW5jdGlvbiBvbkRvY3VtZW50S2V5ZG93bihlKSB7XG4gICAgaWYgKGUua2V5ICE9PSAnRW50ZXInIHx8IHBhbmVsLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykgcmV0dXJuO1xuICAgIGlmIChlLnRhcmdldCAmJiAoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKGlzQ29sbGFwc2VkKCkpIHRvZ2dsZSgpO1xuICAgIGVsc2UgaW5wdXQuZm9jdXMoKTtcbn1cblxuXG4vKlxuICog0J/QsNC70LjRgtGA0LAg0Y3QvNC+0LTQt9C4OiDQstC60LvQsNC00LrQuCDQutCw0YLQtdCz0L7RgNC40LksINC90LXQtNCw0LLQvdC40LUg0Lgg0L/QvtC40YHQui4g0KHQv9C40YHQvtC6INCz0YDRg9C30LjRgtGB0Y8g0L/RgNC4INC/0LXRgNCy0L7QvCDQvtGC0LrRgNGL0YLQuNC4XG4gKi9cbmxldCBlbW9qaUdyb3VwcyA9IG51bGwsIC8vIFt7bmFtZSwgaWNvbiwgZW1vamlzOiBbW9GN0LzQvtC00LfQuCwg0YHRgtGA0L7QutCwINC/0L7QuNGB0LrQsF1dfV1cbiAgICBlbW9qaVRhYiA9IDAsIC8vIC0xIC0g0L3QtdC00LDQstC90LjQtVxuICAgIGVtb2ppVGFicyA9IG51bGwsXG4gICAgZW1vamlTZWFyY2ggPSBudWxsLFxuICAgIGVtb2ppR3JpZCA9IG51bGw7XG5cblxuZnVuY3Rpb24gdG9nZ2xlRW1vamkoKSB7XG4gICAgaWYgKCFlbW9qaUdyaWQpIGJ1aWxkRW1vamlQYW5lbCgpO1xuXG4gICAgY29uc3Qgc2hvdyA9IGVtb2ppUGFuZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnO1xuICAgIGVtb2ppUGFuZWwuc3R5bGUuZGlzcGxheSA9IHNob3cgPyAnJyA6ICdub25lJztcbn1cblxuXG5mdW5jdGlvbiBidWlsZEVtb2ppUGFuZWwoKSB7XG4gICAgZW1vamlUYWJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW1vamlUYWJzLmNsYXNzTmFtZSA9ICdjaGF0LWVtb2ppLXRhYnMnO1xuXG4gICAgZW1vamlTZWFyY2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGVtb2ppU2VhcmNoLmNsYXNzTmFtZSA9ICdjaGF0LWVtb2ppLXNlYXJjaCc7XG4gICAgZW1vamlTZWFyY2gudHlwZSA9ICdzZWFyY2gnO1xuICAgIGVtb2ppU2VhcmNoLnBsYWNlaG9sZGVyID0gJ9Cf0L7QuNGB0Lo6INGB0LzQtdGFLCDQutC+0YIsINC/0LjRhtGG0LAsIGZsYWfigKYnO1xuICAgIGVtb2ppU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgcmVuZGVyRW1vamlHcmlkLCBmYWxzZSk7XG4gICAgZW1vamlTZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uRW1vamlTZWFyY2hLZXlkb3duLCBmYWxzZSk7XG5cbiAgICBlbW9qaUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbW9qaUdyaWQuY2xhc3NOYW1lID0gJ2NoYXQtZW1vamktZ3JpZCc7XG4gICAgZW1vamlHcmlkLnRleHRDb250ZW50ID0gJ9CX0LDQs9GA0YPQt9C60LDigKYnO1xuXG4gICAgZW1vamlQYW5lbC5hcHBlbmRDaGlsZChlbW9qaVRhYnMpO1xuICAgIGVtb2ppUGFuZWwuYXBwZW5kQ2hpbGQoZW1vamlTZWFyY2gpO1xuICAgIGVtb2ppUGFuZWwuYXBwZW5kQ2hpbGQoZW1vamlHcmlkKTtcblxuICAgIGZldGNoKEVNT0pJX1VSTClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiBkYXRhLmdyb3VwcylcbiAgICAgICAgLmNhdGNoKCgpID0+IFt7bmFtZTogJ9Ch0LzQsNC50LvRiycsIGljb246ICfwn5iAJywgZW1vamlzOiBGQUxMQkFDS19FTU9KSS5tYXAoKGVtb2ppKSA9PiBbZW1vamksICcnXSl9XSlcbiAgICAgICAgLnRoZW4oKGdyb3VwcykgPT4ge1xuICAgICAgICAgICAgZW1vamlHcm91cHMgPSBncm91cHM7XG4gICAgICAgICAgICBlbW9qaVRhYiA9IHJlYWRSZWNlbnQoKS5sZW5ndGggPyAtMSA6IDA7XG4gICAgICAgICAgICByZW5kZXJFbW9qaVRhYnMoKTtcbiAgICAgICAgICAgIHJlbmRlckVtb2ppR3JpZCgpO1xuICAgICAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiByZW5kZXJFbW9qaVRhYnMoKSB7XG4gICAgZW1vamlUYWJzLnRleHRDb250ZW50ID0gJyc7XG5cbiAgICBjb25zdCB0YWJzID0gW3tpY29uOiAn8J+VmCcsIG5hbWU6ICfQndC10LTQsNCy0L3QuNC1JywgaW5kZXg6IC0xfV0uY29uY2F0KGVtb2ppR3JvdXBzLm1hcCgoZ3JvdXAsIGluZGV4KSA9PiAoe2ljb246IGdyb3VwLmljb24sIG5hbWU6IGdyb3VwLm5hbWUsIGluZGV4fSkpKTtcblxuICAgIHRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBidXR0b24oJ2NoYXQtZW1vamktdGFiJyArICh0YWIuaW5kZXggPT09IGVtb2ppVGFiID8gJyBhY3RpdmUnIDogJycpLCB0YWIuaWNvbiwgdGFiLm5hbWUpO1xuICAgICAgICBlbGVtZW50LmRhdGFzZXQudGFiID0gdGFiLmluZGV4O1xuICAgICAgICBlbW9qaVRhYnMuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfSk7XG59XG5cblxuZnVuY3Rpb24gcmVuZGVyRW1vamlHcmlkKCkge1xuICAgIGlmICghZW1vamlHcm91cHMpIHJldHVybjtcblxuICAgIGNvbnN0IHF1ZXJ5ID0gZW1vamlTZWFyY2gudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGxpc3Q7XG5cbiAgICBpZiAocXVlcnkpIHtcbiAgICAgICAgLy8g0JrQsNC20LTQvtC1INGB0LvQvtCy0L4g0LfQsNC/0YDQvtGB0LAgLSDQvdCw0YfQsNC70L4g0L7QtNC90L7Qs9C+INC40Lcg0YHQu9C+0LIg0L3QsNC30LLQsNC90LjRjzogwqvRgNCw0LfQstC10LTQtdC90LjQtSDRgNGD0LrCuywgwqvQutC+0YLCuywgwqvRhNC10LnRgcK7XG4gICAgICAgIGNvbnN0IHBhcnRzID0gcXVlcnkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgbGlzdCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGVtb2ppR3JvdXBzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtlbW9qaSwgd29yZHNdIG9mIGdyb3VwLmVtb2ppcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSAnICcgKyB3b3JkcztcbiAgICAgICAgICAgICAgICBpZiAocGFydHMuZXZlcnkoKHBhcnQpID0+IHRleHQuaW5kZXhPZignICcgKyBwYXJ0KSA+PSAwKSkgbGlzdC5wdXNoKGVtb2ppKTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPj0gU0VBUkNIX0xJTUlUKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGlzdCA9IGVtb2ppVGFiID09PSAtMSA/IHJlYWRSZWNlbnQoKSA6IGVtb2ppR3JvdXBzW2Vtb2ppVGFiXS5lbW9qaXMubWFwKChpdGVtKSA9PiBpdGVtWzBdKTtcbiAgICB9XG5cbiAgICBlbW9qaUdyaWQudGV4dENvbnRlbnQgPSAnJztcblxuICAgIGlmICghbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgZW1vamlHcmlkLnRleHRDb250ZW50ID0gcXVlcnkgPyAn0J3QuNGH0LXQs9C+INC90LUg0L3QsNC50LTQtdC90L4nIDogJ9CX0LTQtdGB0Ywg0L/QvtGP0LLRj9GC0YHRjyDRgdC80LDQudC70YssINC60L7RgtC+0YDRi9C1INCy0Ysg0L7RgtC/0YDQsNCy0LvRj9C70LgnO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGlzdC5mb3JFYWNoKChlbW9qaSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYnV0dG9uKCdjaGF0LWVtb2ppLWl0ZW0nLCBlbW9qaSwgJycpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9KTtcbiAgICBlbW9qaUdyaWQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgIGVtb2ppR3JpZC5zY3JvbGxUb3AgPSAwO1xufVxuXG5cbmZ1bmN0aW9uIG9uRW1vamlDbGljayhlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uJyk7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybjtcblxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGF0LWVtb2ppLXRhYicpKSB7XG4gICAgICAgIGVtb2ppVGFiID0gTnVtYmVyKHRhcmdldC5kYXRhc2V0LnRhYik7XG4gICAgICAgIGVtb2ppU2VhcmNoLnZhbHVlID0gJyc7XG4gICAgICAgIHJlbmRlckVtb2ppVGFicygpO1xuICAgICAgICByZW5kZXJFbW9qaUdyaWQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjaGF0LWVtb2ppLWl0ZW0nKSkge1xuICAgICAgICBpbnNlcnRFbW9qaSh0YXJnZXQudGV4dENvbnRlbnQpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBvbkVtb2ppU2VhcmNoS2V5ZG93bihlKSB7XG4gICAgLy8gRW50ZXIgLSDQv9C10YDQstGL0Lkg0L3QsNC50LTQtdC90L3Ri9C5LCBFc2MgLSDQt9Cw0LrRgNGL0YLRjCDQv9Cw0LvQuNGC0YDRg1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gZW1vamlHcmlkLnF1ZXJ5U2VsZWN0b3IoJy5jaGF0LWVtb2ppLWl0ZW0nKTtcbiAgICAgICAgaWYgKGZpcnN0KSBpbnNlcnRFbW9qaShmaXJzdC50ZXh0Q29udGVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgICAgICBlbW9qaVBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgfVxufVxuXG5cbi8vINCS0YHRgtCw0LLQu9GP0LXQvCDQsiDQv9C+0LfQuNGG0LjRjiDQutGD0YDRgdC+0YDQsFxuZnVuY3Rpb24gaW5zZXJ0RW1vamkoZW1vamkpIHtcbiAgICBjb25zdCBzdGFydCA9IGlucHV0LnNlbGVjdGlvblN0YXJ0LFxuICAgICAgICBlbmQgPSBpbnB1dC5zZWxlY3Rpb25FbmQ7XG5cbiAgICBpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlLnNsaWNlKDAsIHN0YXJ0KSArIGVtb2ppICsgaW5wdXQudmFsdWUuc2xpY2UoZW5kKTtcbiAgICBpbnB1dC5zZWxlY3Rpb25TdGFydCA9IGlucHV0LnNlbGVjdGlvbkVuZCA9IHN0YXJ0ICsgZW1vamkubGVuZ3RoO1xuICAgIGlmICghdG91Y2hJbnB1dCkgaW5wdXQuZm9jdXMoKTtcbiAgICB1cGRhdGVDb3VudGVyKCk7XG5cbiAgICByZW1lbWJlclJlY2VudChlbW9qaSk7XG59XG5cblxuLy8g0J3QtdC00LDQstC90LjQtSDRhdGA0LDQvdGP0YLRgdGPINCyINCx0YDQsNGD0LfQtdGA0LUuIGxvY2FsU3RvcmFnZSDQvNC+0LbQtdGCINCx0YvRgtGMINC90LXQtNC+0YHRgtGD0L/QtdC9ICjQv9GA0LjQstCw0YLQvdGL0Lkg0YDQtdC20LjQvCkgLSDRgtC+0LPQtNCwINCx0LXQtyDQvdC40YVcbmZ1bmN0aW9uIHJlYWRSZWNlbnQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGlzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oUkVDRU5UX0tFWSkpO1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShsaXN0KSA/IGxpc3QgOiBbXTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiByZW1lbWJlclJlY2VudChlbW9qaSkge1xuICAgIGNvbnN0IGxpc3QgPSBbZW1vamldLmNvbmNhdChyZWFkUmVjZW50KCkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBlbW9qaSkpLnNsaWNlKDAsIFJFQ0VOVF9MSU1JVCk7XG5cbiAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShSRUNFTlRfS0VZLCBKU09OLnN0cmluZ2lmeShsaXN0KSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7fVxufVxuXG5cbmZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbn1cbiIsImltcG9ydCBhY2NvdW50IGZyb20gXCIuLi9hY2NvdW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcH07XG5cblxuY29uc3QgbG9naW5fcGFuZWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1wYW5lbFwiKTtcbmNvbnN0IGxvZ2luX2Zvcm1FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1mb3JtXCIpO1xuY29uc3QgbG9naW5faW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1pbnB1dFwiKTtcbmNvbnN0IHBhc3N3b3JkX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmQtaW5wdXRcIik7XG5jb25zdCBsb2dpbl9lcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLWVycm9yXCIpO1xuXG5cbmxldCBmaW5hbENhbGxiYWNrID0gbnVsbDtcblxubGV0XG4gICAgdGltZW91dCA9IG51bGwsXG4gICAgdGltZW91dF9wID0gbnVsbDtcblxuXG4vLyDQktGL0LLQtdC00LXQvCDQvtC60L3QviDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LiDQnNC+0LTQsNC70YzQvdC+0LUuIGVycm9yIC0g0L/RgNC40YfQuNC90LAsINC/0L4g0LrQvtGC0L7RgNC+0Lkg0YHQv9GA0LDRiNC40LLQsNC10Lwg0YHQvdC+0LLQsFxuZnVuY3Rpb24gc3RhcnQoY2FsbGJhY2ssIGVycm9yKSB7XG5cbiAgICBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICBsb2dpbl9lcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvciB8fCAnJztcblxuICAgIC8v0J/QvtC70YPRh9C40Lwg0LjQtyDQu9C+0LrQsNC7INGB0YLQvtGA0LBcbiAgICBsZXQgdXNlckFjY291bnQgPSBhY2NvdW50LmdldCgpO1xuXG4gICAgLy/QtdGB0LvQuCDQtdGB0YLRjCAtINC+0LpcbiAgICBpZih1c2VyQWNjb3VudCkge1xuICAgICAgICBmaW5hbENhbGxiYWNrKHVzZXJBY2NvdW50KTtcbiAgICB9XG4gICAgLy/QuNC90LDRh9C1IC0g0LfQsNC/0YDQvtGB0LjQvFxuICAgIGVsc2V7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5dXBIYW5kbGVyLCBmYWxzZSk7XG5cbiAgICAgICAgc2hvdygpO1xuXG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBcbn1cblxuXG4vLyDQl9Cw0LrRgNC+0LXQvCDQvtC60L3QviDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4XG5mdW5jdGlvbiBzdG9wKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5dXBIYW5kbGVyLCBmYWxzZSk7XG4gICAgaGlkZSgpO1xufVxuXG5cbi8vINCe0LHRgNCw0LHQvtGC0YfQuNC6INC60LvQsNCy0LjRiFxuZnVuY3Rpb24ga2V5dXBIYW5kbGVyKGUpIHtcbiAgICBsZXQgb2JqID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGxldCBrZXkgPSBlLmtleUNvZGU7XG5cbiAgICAvL9CV0YHQu9C4IEVudGVyINC4INCx0LXQtyDQv9GA0L7QsdC70LXQvFxuICAgIGlmKGtleT09PTEzICYmIHZhbGlkYXRlKGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSwgcGFzc3dvcmRfaW5wdXRFbGVtZW50LnZhbHVlKSl7XG5cbiAgICAgICAgc3RvcCgpO1xuICAgICAgICAvLyDQn9C+0LvRg9GH0LjQsiDRgdC+0YXRgNCw0L3QuNC8XG4gICAgICAgIGNvbnN0IGFjY291bnREYXRhID0ge2xvZ2luOiBsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWUsIHBhc3N3b3JkOiBwYXNzd29yZF9pbnB1dEVsZW1lbnQudmFsdWV9O1xuICAgICAgICBhY2NvdW50LnNldChhY2NvdW50RGF0YSk7XG4gICAgICAgIFxuICAgICAgICBmaW5hbENhbGxiYWNrKGFjY291bnREYXRhKTtcblxuICAgIH1cbiAgICAvL9CV0YHQu9C4INGC0LDQsSAtINC/0L4t0YPQvNC+0LvRh9Cw0L3QuNGOXG4gICAgZWxzZSBpZiAoa2V5PT09OSl7XG5cbiAgICB9XG5cbiAgICBlbHNlIGlmIChcbiAgICAgICAgLy8g0J/QsNGA0L7Qu9GMIC0g0LvRjtCx0YvQtSDRgdC40LzQstC+0LvRiywg0LvQvtCz0LjQvSAtINCx0YPQutCy0YsgKNCyINGC0L7QvCDRh9C40YHQu9C1INC60LjRgNC40LvQu9C40YbQsCksINGG0LjRhNGA0Ysg0Lgg0L3QtdC80L3QvtCz0L4g0LfQvdCw0LrQvtCyXG4gICAgICAgIG9iaiA9PT0gcGFzc3dvcmRfaW5wdXRFbGVtZW50ID9cbiAgICAgICAgICAgIG9iai52YWx1ZS5sZW5ndGggPD0gNjQgOlxuICAgICAgICAgICAgL15bYS16QS1a0LAt0Y/QkC3Qr9GR0IEwLTkgKy5cXC1fOlwiKCldKiQvLnRlc3Qob2JqLnZhbHVlKSAmJiBvYmoudmFsdWUubGVuZ3RoIDw9IDIwXG4gICAgKSB7XG4gICAgICAgIG9iai5kZWZhdWx0VmFsdWUgPSBvYmoudmFsdWU7XG5cbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRjYjRhJztcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBvYmoudmFsdWUgPSBvYmouZGVmYXVsdFZhbHVlO1xufVxuXG4vLyDQn9GA0L7QstC10YDQutCwINCy0LLQtdC00LXQvdC90L7Qs9C+INC4INC40L3QtNC40LrQsNGG0LjRjyDQvtGI0LjQsdC60LhcbmZ1bmN0aW9uIHZhbGlkYXRlKGxvZ2luLCBwYXNzd29yZCkge1xuXG4gICAgaWYobG9naW4ubGVuZ3RoPT09MCkge1xuICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmYwMDA4JztcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNGNiNGEnO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHBhc3N3b3JkLmxlbmd0aD09PTApIHtcbiAgICAgICAgcGFzc3dvcmRfaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmMDAwOCc7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0X3ApO1xuICAgICAgICB0aW1lb3V0X3AgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y0Y2I0YSc7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5cbi8vINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutC+0LJcbmZ1bmN0aW9uIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuXG4gICAgLy8g0JXRgdC70Lgg0L3QsNC20LDQu9C4IFwi0JLQvtC50YLQuFwiINC4INC70L7Qs9C40L0g0L3QvtGA0LwgLSDQt9Cw0L/Rg9GB0YLQuNC8INGE0YPQvdC60YbQuNGOINCy0YXQvtC00LBcbiAgICBpZih0YXJnZXQuaWQ9PT0nbG9naW4tYnV0dG9uJyAmJiB2YWxpZGF0ZShsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWUsIHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZSkpe1xuXG4gICAgICAgIHN0b3AoKTtcblxuICAgICAgICBjb25zdCBhY2NvdW50RGF0YSA9IHtsb2dpbjogbG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRfaW5wdXRFbGVtZW50LnZhbHVlfTtcbiAgICAgICAgYWNjb3VudC5zZXQoYWNjb3VudERhdGEpO1xuXG4gICAgICAgIGZpbmFsQ2FsbGJhY2soYWNjb3VudERhdGEpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRhcmdldC5pZD09PSdsb2dpbi1pbnB1dCcgfHwgdGFyZ2V0LmlkPT09J3Bhc3N3b3JkLWlucHV0Jyl7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZT09PScnKSB7XG4gICAgICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZT09PScnKXtcbiAgICAgICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8v0J/QvtC60LDQt9Cw0YLRjCDQvtC60L3QviDQstGF0L7QtNCwXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIGxvZ2luX3BhbmVsRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBsb2dpbl9mb3JtRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuLy/RgdC60YDRi9GC0Ywg0L7QutC90L4g0LLRhdC+0LTQsFxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBsb2dpbl9wYW5lbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsb2dpbl9mb3JtRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9IGxvY2Fsc3RvcmFnZSgpO1xuZXhwb3J0cy5kZXN0cm95ID0gKCgpID0+IHtcblx0bGV0IHdhcm5lZCA9IGZhbHNlO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKCF3YXJuZWQpIHtcblx0XHRcdHdhcm5lZCA9IHRydWU7XG5cdFx0XHRjb25zb2xlLndhcm4oJ0luc3RhbmNlIG1ldGhvZCBgZGVidWcuZGVzdHJveSgpYCBpcyBkZXByZWNhdGVkIGFuZCBubyBsb25nZXIgZG9lcyBhbnl0aGluZy4gSXQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24gb2YgYGRlYnVnYC4nKTtcblx0XHR9XG5cdH07XG59KSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcblx0JyMwMDAwQ0MnLFxuXHQnIzAwMDBGRicsXG5cdCcjMDAzM0NDJyxcblx0JyMwMDMzRkYnLFxuXHQnIzAwNjZDQycsXG5cdCcjMDA2NkZGJyxcblx0JyMwMDk5Q0MnLFxuXHQnIzAwOTlGRicsXG5cdCcjMDBDQzAwJyxcblx0JyMwMENDMzMnLFxuXHQnIzAwQ0M2NicsXG5cdCcjMDBDQzk5Jyxcblx0JyMwMENDQ0MnLFxuXHQnIzAwQ0NGRicsXG5cdCcjMzMwMENDJyxcblx0JyMzMzAwRkYnLFxuXHQnIzMzMzNDQycsXG5cdCcjMzMzM0ZGJyxcblx0JyMzMzY2Q0MnLFxuXHQnIzMzNjZGRicsXG5cdCcjMzM5OUNDJyxcblx0JyMzMzk5RkYnLFxuXHQnIzMzQ0MwMCcsXG5cdCcjMzNDQzMzJyxcblx0JyMzM0NDNjYnLFxuXHQnIzMzQ0M5OScsXG5cdCcjMzNDQ0NDJyxcblx0JyMzM0NDRkYnLFxuXHQnIzY2MDBDQycsXG5cdCcjNjYwMEZGJyxcblx0JyM2NjMzQ0MnLFxuXHQnIzY2MzNGRicsXG5cdCcjNjZDQzAwJyxcblx0JyM2NkNDMzMnLFxuXHQnIzk5MDBDQycsXG5cdCcjOTkwMEZGJyxcblx0JyM5OTMzQ0MnLFxuXHQnIzk5MzNGRicsXG5cdCcjOTlDQzAwJyxcblx0JyM5OUNDMzMnLFxuXHQnI0NDMDAwMCcsXG5cdCcjQ0MwMDMzJyxcblx0JyNDQzAwNjYnLFxuXHQnI0NDMDA5OScsXG5cdCcjQ0MwMENDJyxcblx0JyNDQzAwRkYnLFxuXHQnI0NDMzMwMCcsXG5cdCcjQ0MzMzMzJyxcblx0JyNDQzMzNjYnLFxuXHQnI0NDMzM5OScsXG5cdCcjQ0MzM0NDJyxcblx0JyNDQzMzRkYnLFxuXHQnI0NDNjYwMCcsXG5cdCcjQ0M2NjMzJyxcblx0JyNDQzk5MDAnLFxuXHQnI0NDOTkzMycsXG5cdCcjQ0NDQzAwJyxcblx0JyNDQ0NDMzMnLFxuXHQnI0ZGMDAwMCcsXG5cdCcjRkYwMDMzJyxcblx0JyNGRjAwNjYnLFxuXHQnI0ZGMDA5OScsXG5cdCcjRkYwMENDJyxcblx0JyNGRjAwRkYnLFxuXHQnI0ZGMzMwMCcsXG5cdCcjRkYzMzMzJyxcblx0JyNGRjMzNjYnLFxuXHQnI0ZGMzM5OScsXG5cdCcjRkYzM0NDJyxcblx0JyNGRjMzRkYnLFxuXHQnI0ZGNjYwMCcsXG5cdCcjRkY2NjMzJyxcblx0JyNGRjk5MDAnLFxuXHQnI0ZGOTkzMycsXG5cdCcjRkZDQzAwJyxcblx0JyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG5cdC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcblx0Ly8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2Vcblx0Ly8gZXhwbGljaXRseVxuXHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgKHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicgfHwgd2luZG93LnByb2Nlc3MuX19ud2pzKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Ly8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuXHRpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRsZXQgbTtcblxuXHQvLyBJcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuXHQvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmV0dXJuLWFzc2lnblxuXHRyZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcblx0XHQvLyBJcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG5cdFx0KHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcblx0XHQvLyBJcyBmaXJlZm94ID49IHYzMT9cblx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiAobSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pKSAmJiBwYXJzZUludChtWzFdLCAxMCkgPj0gMzEpIHx8XG5cdFx0Ly8gRG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG5cdGFyZ3NbMF0gPSAodGhpcy51c2VDb2xvcnMgPyAnJWMnIDogJycpICtcblx0XHR0aGlzLm5hbWVzcGFjZSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyAlYycgOiAnICcpICtcblx0XHRhcmdzWzBdICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnJWMgJyA6ICcgJykgK1xuXHRcdCcrJyArIG1vZHVsZS5leHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cblx0aWYgKCF0aGlzLnVzZUNvbG9ycykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuXHRhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKTtcblxuXHQvLyBUaGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuXHQvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG5cdC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuXHRsZXQgaW5kZXggPSAwO1xuXHRsZXQgbGFzdEMgPSAwO1xuXHRhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgbWF0Y2ggPT4ge1xuXHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpbmRleCsrO1xuXHRcdGlmIChtYXRjaCA9PT0gJyVjJykge1xuXHRcdFx0Ly8gV2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG5cdFx0XHQvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuXHRcdFx0bGFzdEMgPSBpbmRleDtcblx0XHR9XG5cdH0pO1xuXG5cdGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmRlYnVnKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICogSWYgYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhdmFpbGFibGUsIGZhbGxzIGJhY2tcbiAqIHRvIGBjb25zb2xlLmxvZ2AuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5sb2cgPSBjb25zb2xlLmRlYnVnIHx8IGNvbnNvbGUubG9nIHx8ICgoKSA9PiB7fSk7XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0dHJ5IHtcblx0XHRpZiAobmFtZXNwYWNlcykge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnNldEl0ZW0oJ2RlYnVnJywgbmFtZXNwYWNlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbG9hZCgpIHtcblx0bGV0IHI7XG5cdHRyeSB7XG5cdFx0ciA9IGV4cG9ydHMuc3RvcmFnZS5nZXRJdGVtKCdkZWJ1ZycpIHx8IGV4cG9ydHMuc3RvcmFnZS5nZXRJdGVtKCdERUJVRycpIDtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblx0Y3JlYXRlRGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cblx0T2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y3JlYXRlRGVidWdba2V5XSA9IGVudltrZXldO1xuXHR9KTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZGVidWcgaW5zdGFuY2UgdG8gYmUgY29sb3JlZFxuXHQqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IEFuIEFOU0kgY29sb3IgY29kZSBmb3IgdGhlIGdpdmVuIG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcblx0XHRsZXQgaGFzaCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzcGFjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVEZWJ1Zy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBjcmVhdGVEZWJ1Zy5jb2xvcnMubGVuZ3RoXTtcblx0fVxuXHRjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvciA9IHNlbGVjdENvbG9yO1xuXG5cdC8qKlxuXHQqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXHRcdGxldCBwcmV2VGltZTtcblx0XHRsZXQgZW5hYmxlT3ZlcnJpZGUgPSBudWxsO1xuXHRcdGxldCBuYW1lc3BhY2VzQ2FjaGU7XG5cdFx0bGV0IGVuYWJsZWRDYWNoZTtcblxuXHRcdGZ1bmN0aW9uIGRlYnVnKC4uLmFyZ3MpIHtcblx0XHRcdC8vIERpc2FibGVkP1xuXHRcdFx0aWYgKCFkZWJ1Zy5lbmFibGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc2VsZiA9IGRlYnVnO1xuXG5cdFx0XHQvLyBTZXQgYGRpZmZgIHRpbWVzdGFtcFxuXHRcdFx0Y29uc3QgY3VyciA9IE51bWJlcihuZXcgRGF0ZSgpKTtcblx0XHRcdGNvbnN0IG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcblx0XHRcdHNlbGYuZGlmZiA9IG1zO1xuXHRcdFx0c2VsZi5wcmV2ID0gcHJldlRpbWU7XG5cdFx0XHRzZWxmLmN1cnIgPSBjdXJyO1xuXHRcdFx0cHJldlRpbWUgPSBjdXJyO1xuXG5cdFx0XHRhcmdzWzBdID0gY3JlYXRlRGVidWcuY29lcmNlKGFyZ3NbMF0pO1xuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdC8vIEFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG5cdFx0XHRcdGFyZ3MudW5zaGlmdCgnJU8nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgKG1hdGNoLCBmb3JtYXQpID0+IHtcblx0XHRcdFx0Ly8gSWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuXHRcdFx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdFx0XHRyZXR1cm4gJyUnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdGNvbnN0IGZvcm1hdHRlciA9IGNyZWF0ZURlYnVnLmZvcm1hdHRlcnNbZm9ybWF0XTtcblx0XHRcdFx0aWYgKHR5cGVvZiBmb3JtYXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBhcmdzW2luZGV4XTtcblx0XHRcdFx0XHRtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cblx0XHRcdFx0XHQvLyBOb3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG5cdFx0XHRcdFx0YXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdGluZGV4LS07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG5cdFx0XHRjcmVhdGVEZWJ1Zy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cblx0XHRcdGNvbnN0IGxvZ0ZuID0gc2VsZi5sb2cgfHwgY3JlYXRlRGVidWcubG9nO1xuXHRcdFx0bG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cdFx0fVxuXG5cdFx0ZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXHRcdGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuXHRcdGRlYnVnLmNvbG9yID0gY3JlYXRlRGVidWcuc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7XG5cdFx0ZGVidWcuZGVzdHJveSA9IGNyZWF0ZURlYnVnLmRlc3Ryb3k7IC8vIFhYWCBUZW1wb3JhcnkuIFdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRlYnVnLCAnZW5hYmxlZCcsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiAoKSA9PiB7XG5cdFx0XHRcdGlmIChlbmFibGVPdmVycmlkZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBlbmFibGVPdmVycmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmFtZXNwYWNlc0NhY2hlICE9PSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzKSB7XG5cdFx0XHRcdFx0bmFtZXNwYWNlc0NhY2hlID0gY3JlYXRlRGVidWcubmFtZXNwYWNlcztcblx0XHRcdFx0XHRlbmFibGVkQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKG5hbWVzcGFjZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZW5hYmxlZENhY2hlO1xuXHRcdFx0fSxcblx0XHRcdHNldDogdiA9PiB7XG5cdFx0XHRcdGVuYWJsZU92ZXJyaWRlID0gdjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG5cdFx0aWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVidWc7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblx0XHRjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzID0gbmFtZXNwYWNlcztcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJylcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9cXHMrL2csICcsJylcblx0XHRcdC5zcGxpdCgnLCcpXG5cdFx0XHQuZmlsdGVyKEJvb2xlYW4pO1xuXG5cdFx0Zm9yIChjb25zdCBucyBvZiBzcGxpdCkge1xuXHRcdFx0aWYgKG5zWzBdID09PSAnLScpIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcuc2tpcHMucHVzaChucy5zbGljZSgxKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5uYW1lcy5wdXNoKG5zKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBzdHJpbmcgbWF0Y2hlcyBhIG5hbWVzcGFjZSB0ZW1wbGF0ZSwgaG9ub3Jpbmdcblx0ICogYXN0ZXJpc2tzIGFzIHdpbGRjYXJkcy5cblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cdGZ1bmN0aW9uIG1hdGNoZXNUZW1wbGF0ZShzZWFyY2gsIHRlbXBsYXRlKSB7XG5cdFx0bGV0IHNlYXJjaEluZGV4ID0gMDtcblx0XHRsZXQgdGVtcGxhdGVJbmRleCA9IDA7XG5cdFx0bGV0IHN0YXJJbmRleCA9IC0xO1xuXHRcdGxldCBtYXRjaEluZGV4ID0gMDtcblxuXHRcdHdoaWxlIChzZWFyY2hJbmRleCA8IHNlYXJjaC5sZW5ndGgpIHtcblx0XHRcdGlmICh0ZW1wbGF0ZUluZGV4IDwgdGVtcGxhdGUubGVuZ3RoICYmICh0ZW1wbGF0ZVt0ZW1wbGF0ZUluZGV4XSA9PT0gc2VhcmNoW3NlYXJjaEluZGV4XSB8fCB0ZW1wbGF0ZVt0ZW1wbGF0ZUluZGV4XSA9PT0gJyonKSkge1xuXHRcdFx0XHQvLyBNYXRjaCBjaGFyYWN0ZXIgb3IgcHJvY2VlZCB3aXRoIHdpbGRjYXJkXG5cdFx0XHRcdGlmICh0ZW1wbGF0ZVt0ZW1wbGF0ZUluZGV4XSA9PT0gJyonKSB7XG5cdFx0XHRcdFx0c3RhckluZGV4ID0gdGVtcGxhdGVJbmRleDtcblx0XHRcdFx0XHRtYXRjaEluZGV4ID0gc2VhcmNoSW5kZXg7XG5cdFx0XHRcdFx0dGVtcGxhdGVJbmRleCsrOyAvLyBTa2lwIHRoZSAnKidcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzZWFyY2hJbmRleCsrO1xuXHRcdFx0XHRcdHRlbXBsYXRlSW5kZXgrKztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChzdGFySW5kZXggIT09IC0xKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmVnYXRlZC1jb25kaXRpb25cblx0XHRcdFx0Ly8gQmFja3RyYWNrIHRvIHRoZSBsYXN0ICcqJyBhbmQgdHJ5IHRvIG1hdGNoIG1vcmUgY2hhcmFjdGVyc1xuXHRcdFx0XHR0ZW1wbGF0ZUluZGV4ID0gc3RhckluZGV4ICsgMTtcblx0XHRcdFx0bWF0Y2hJbmRleCsrO1xuXHRcdFx0XHRzZWFyY2hJbmRleCA9IG1hdGNoSW5kZXg7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vIE5vIG1hdGNoXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIHRyYWlsaW5nICcqJyBpbiB0ZW1wbGF0ZVxuXHRcdHdoaWxlICh0ZW1wbGF0ZUluZGV4IDwgdGVtcGxhdGUubGVuZ3RoICYmIHRlbXBsYXRlW3RlbXBsYXRlSW5kZXhdID09PSAnKicpIHtcblx0XHRcdHRlbXBsYXRlSW5kZXgrKztcblx0XHR9XG5cblx0XHRyZXR1cm4gdGVtcGxhdGVJbmRleCA9PT0gdGVtcGxhdGUubGVuZ3RoO1xuXHR9XG5cblx0LyoqXG5cdCogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG5cdCpcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBkaXNhYmxlKCkge1xuXHRcdGNvbnN0IG5hbWVzcGFjZXMgPSBbXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5uYW1lcyxcblx0XHRcdC4uLmNyZWF0ZURlYnVnLnNraXBzLm1hcChuYW1lc3BhY2UgPT4gJy0nICsgbmFtZXNwYWNlKVxuXHRcdF0uam9pbignLCcpO1xuXHRcdGNyZWF0ZURlYnVnLmVuYWJsZSgnJyk7XG5cdFx0cmV0dXJuIG5hbWVzcGFjZXM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuXHQqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG5cdFx0Zm9yIChjb25zdCBza2lwIG9mIGNyZWF0ZURlYnVnLnNraXBzKSB7XG5cdFx0XHRpZiAobWF0Y2hlc1RlbXBsYXRlKG5hbWUsIHNraXApKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IG5zIG9mIGNyZWF0ZURlYnVnLm5hbWVzKSB7XG5cdFx0XHRpZiAobWF0Y2hlc1RlbXBsYXRlKG5hbWUsIG5zKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0KiBDb2VyY2UgYHZhbGAuXG5cdCpcblx0KiBAcGFyYW0ge01peGVkfSB2YWxcblx0KiBAcmV0dXJuIHtNaXhlZH1cblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuXHRcdGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0cmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXG5cdC8qKlxuXHQqIFhYWCBETyBOT1QgVVNFLiBUaGlzIGlzIGEgdGVtcG9yYXJ5IHN0dWIgZnVuY3Rpb24uXG5cdCogWFhYIEl0IFdJTEwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXHQqL1xuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHR9XG5cblx0Y3JlYXRlRGVidWcuZW5hYmxlKGNyZWF0ZURlYnVnLmxvYWQoKSk7XG5cblx0cmV0dXJuIGNyZWF0ZURlYnVnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwO1xuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB3ID0gZCAqIDc7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwiLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcbiAgICAucHVzaChmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIGZ1bmN0aW9uIG9uKCkge1xuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIG9uLmZuID0gZm47XG4gIHRoaXMub24oZXZlbnQsIG9uKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgLy8gYWxsXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHNwZWNpZmljIGV2ZW50XG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG5cbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICB2YXIgY2I7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2IgPSBjYWxsYmFja3NbaV07XG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgZXZlbnQgc3BlY2lmaWMgYXJyYXlzIGZvciBldmVudCB0eXBlcyB0aGF0IG5vXG4gIC8vIG9uZSBpcyBzdWJzY3JpYmVkIGZvciB0byBhdm9pZCBtZW1vcnkgbGVhay5cbiAgaWYgKGNhbGxiYWNrcy5sZW5ndGggPT09IDApIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gIH1cblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGFsaWFzIHVzZWQgZm9yIHJlc2VydmVkIGV2ZW50cyAocHJvdGVjdGVkIG1ldGhvZClcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXRSZXNlcnZlZCA9IEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwiLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY29tcG9uZW50L2hhcy1jb3JzXG5sZXQgdmFsdWUgPSBmYWxzZTtcbnRyeSB7XG4gICAgdmFsdWUgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufVxuY2F0Y2ggKGVycikge1xuICAgIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbn1cbmV4cG9ydCBjb25zdCBoYXNDT1JTID0gdmFsdWU7XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9xdWVyeXN0cmluZ1xuLyoqXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXG4gKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShvYmopIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgc3RyICs9ICcmJztcbiAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuLyoqXG4gKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHFzKSB7XG4gICAgbGV0IHFyeSA9IHt9O1xuICAgIGxldCBwYWlycyA9IHFzLnNwbGl0KCcmJyk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDEpLmpvaW4oJz0nKSk7XG4gICAgfVxuICAgIHJldHVybiBxcnk7XG59XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9wYXJzZXVyaVxuLyoqXG4gKiBQYXJzZXMgYSBVUklcbiAqXG4gKiBOb3RlOiB3ZSBjb3VsZCBhbHNvIGhhdmUgdXNlZCB0aGUgYnVpbHQtaW4gVVJMIG9iamVjdCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLlxuICpcbiAqIFNlZTpcbiAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTFxuICogLSBodHRwczovL2Nhbml1c2UuY29tL3VybFxuICogLSBodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjMzk4NiNhcHBlbmRpeC1CXG4gKlxuICogSGlzdG9yeSBvZiB0aGUgcGFyc2UoKSBtZXRob2Q6XG4gKiAtIGZpcnN0IGNvbW1pdDogaHR0cHM6Ly9naXRodWIuY29tL3NvY2tldGlvL3NvY2tldC5pby1jbGllbnQvY29tbWl0LzRlZTFkNWQ5NGIzOTA2YTljMDUyYjQ1OWYxYTgxOGIxNWYzOGY5MWNcbiAqIC0gZXhwb3J0IGludG8gaXRzIG93biBtb2R1bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9lbmdpbmUuaW8tY2xpZW50L2NvbW1pdC9kZTJjNTYxZTQ1NjRlZmViNzhmMWJkYjFiYTM5ZWY4MWIyODIyY2IzXG4gKiAtIHJlaW1wb3J0OiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vZW5naW5lLmlvLWNsaWVudC9jb21taXQvZGYzMjI3N2MzZjZkNjIyZWVjNWVkMDlmNDkzY2FlM2YzMzkxZDI0MlxuICpcbiAqIEBhdXRob3IgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+IChNSVQgbGljZW5zZSlcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5jb25zdCByZSA9IC9eKD86KD8hW146QFxcLz8jXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QFxcLz8jXSopKD86OihbXjpAXFwvPyNdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xuY29uc3QgcGFydHMgPSBbXG4gICAgJ3NvdXJjZScsICdwcm90b2NvbCcsICdhdXRob3JpdHknLCAndXNlckluZm8nLCAndXNlcicsICdwYXNzd29yZCcsICdob3N0JywgJ3BvcnQnLCAncmVsYXRpdmUnLCAncGF0aCcsICdkaXJlY3RvcnknLCAnZmlsZScsICdxdWVyeScsICdhbmNob3InXG5dO1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICAgIGlmIChzdHIubGVuZ3RoID4gODAwMCkge1xuICAgICAgICB0aHJvdyBcIlVSSSB0b28gbG9uZ1wiO1xuICAgIH1cbiAgICBjb25zdCBzcmMgPSBzdHIsIGIgPSBzdHIuaW5kZXhPZignWycpLCBlID0gc3RyLmluZGV4T2YoJ10nKTtcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuICAgIGxldCBtID0gcmUuZXhlYyhzdHIgfHwgJycpLCB1cmkgPSB7fSwgaSA9IDE0O1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgfVxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuICAgIHVyaS5wYXRoTmFtZXMgPSBwYXRoTmFtZXModXJpLCB1cmlbJ3BhdGgnXSk7XG4gICAgdXJpLnF1ZXJ5S2V5ID0gcXVlcnlLZXkodXJpLCB1cmlbJ3F1ZXJ5J10pO1xuICAgIHJldHVybiB1cmk7XG59XG5mdW5jdGlvbiBwYXRoTmFtZXMob2JqLCBwYXRoKSB7XG4gICAgY29uc3QgcmVneCA9IC9cXC97Miw5fS9nLCBuYW1lcyA9IHBhdGgucmVwbGFjZShyZWd4LCBcIi9cIikuc3BsaXQoXCIvXCIpO1xuICAgIGlmIChwYXRoLnNsaWNlKDAsIDEpID09ICcvJyB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBuYW1lcy5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIGlmIChwYXRoLnNsaWNlKC0xKSA9PSAnLycpIHtcbiAgICAgICAgbmFtZXMuc3BsaWNlKG5hbWVzLmxlbmd0aCAtIDEsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG59XG5mdW5jdGlvbiBxdWVyeUtleSh1cmksIHF1ZXJ5KSB7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIHF1ZXJ5LnJlcGxhY2UoLyg/Ol58JikoW14mPV0qKT0/KFteJl0qKS9nLCBmdW5jdGlvbiAoJDAsICQxLCAkMikge1xuICAgICAgICBpZiAoJDEpIHtcbiAgICAgICAgICAgIGRhdGFbJDFdID0gJDI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cbiIsImV4cG9ydCBjb25zdCBuZXh0VGljayA9ICgoKSA9PiB7XG4gICAgY29uc3QgaXNQcm9taXNlQXZhaWxhYmxlID0gdHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgUHJvbWlzZS5yZXNvbHZlID09PSBcImZ1bmN0aW9uXCI7XG4gICAgaWYgKGlzUHJvbWlzZUF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gKGNiKSA9PiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGNiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoY2IsIHNldFRpbWVvdXRGbikgPT4gc2V0VGltZW91dEZuKGNiLCAwKTtcbiAgICB9XG59KSgpO1xuZXhwb3J0IGNvbnN0IGdsb2JhbFRoaXNTaGltID0gKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4gICAgfVxufSkoKTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0QmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb29raWVKYXIoKSB7IH1cbiIsImltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuZXhwb3J0IHsgU29ja2V0IH07XG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSBTb2NrZXQucHJvdG9jb2w7XG5leHBvcnQgeyBUcmFuc3BvcnQsIFRyYW5zcG9ydEVycm9yLCB9IGZyb20gXCIuL3RyYW5zcG9ydC5qc1wiO1xuZXhwb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmV4cG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmV4cG9ydCB7IHBhcnNlIH0gZnJvbSBcIi4vY29udHJpYi9wYXJzZXVyaS5qc1wiO1xuZXhwb3J0IHsgbmV4dFRpY2sgfSBmcm9tIFwiLi9nbG9iYWxzLm5vZGUuanNcIjtcbmV4cG9ydCB7IEZldGNoIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9wb2xsaW5nLWZldGNoLmpzXCI7XG5leHBvcnQgeyBYSFIgYXMgTm9kZVhIUiB9IGZyb20gXCIuL3RyYW5zcG9ydHMvcG9sbGluZy14aHIubm9kZS5qc1wiO1xuZXhwb3J0IHsgWEhSIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qc1wiO1xuZXhwb3J0IHsgV1MgYXMgTm9kZVdlYlNvY2tldCB9IGZyb20gXCIuL3RyYW5zcG9ydHMvd2Vic29ja2V0Lm5vZGUuanNcIjtcbmV4cG9ydCB7IFdTIGFzIFdlYlNvY2tldCB9IGZyb20gXCIuL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzXCI7XG5leHBvcnQgeyBXVCBhcyBXZWJUcmFuc3BvcnQgfSBmcm9tIFwiLi90cmFuc3BvcnRzL3dlYnRyYW5zcG9ydC5qc1wiO1xuIiwiaW1wb3J0IHsgdHJhbnNwb3J0cyBhcyBERUZBVUxUX1RSQU5TUE9SVFMgfSBmcm9tIFwiLi90cmFuc3BvcnRzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIGJ5dGVMZW5ndGggfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBkZWNvZGUgfSBmcm9tIFwiLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcIi4vY29udHJpYi9wYXJzZXVyaS5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBwcm90b2NvbCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBjcmVhdGVDb29raWVKYXIsIGRlZmF1bHRCaW5hcnlUeXBlLCBuZXh0VGljaywgfSBmcm9tIFwiLi9nbG9iYWxzLm5vZGUuanNcIjtcbmNvbnN0IHdpdGhFdmVudExpc3RlbmVycyA9IHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICB0eXBlb2YgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgT0ZGTElORV9FVkVOVF9MSVNURU5FUlMgPSBbXTtcbmlmICh3aXRoRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAvLyB3aXRoaW4gYSBTZXJ2aWNlV29ya2VyLCBhbnkgZXZlbnQgaGFuZGxlciBmb3IgdGhlICdvZmZsaW5lJyBldmVudCBtdXN0IGJlIGFkZGVkIG9uIHRoZSBpbml0aWFsIGV2YWx1YXRpb24gb2YgdGhlXG4gICAgLy8gc2NyaXB0LCBzbyB3ZSBjcmVhdGUgb25lIHNpbmdsZSBldmVudCBsaXN0ZW5lciBoZXJlIHdoaWNoIHdpbGwgZm9yd2FyZCB0aGUgZXZlbnQgdG8gdGhlIHNvY2tldCBpbnN0YW5jZXNcbiAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCAoKSA9PiB7XG4gICAgICAgIE9GRkxJTkVfRVZFTlRfTElTVEVORVJTLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcigpKTtcbiAgICB9LCBmYWxzZSk7XG59XG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgYSBXZWJTb2NrZXQtbGlrZSBpbnRlcmZhY2UgdG8gY29ubmVjdCB0byBhbiBFbmdpbmUuSU8gc2VydmVyLiBUaGUgY29ubmVjdGlvbiB3aWxsIGJlIGVzdGFibGlzaGVkXG4gKiB3aXRoIG9uZSBvZiB0aGUgYXZhaWxhYmxlIGxvdy1sZXZlbCB0cmFuc3BvcnRzLCBsaWtlIEhUVFAgbG9uZy1wb2xsaW5nLCBXZWJTb2NrZXQsIG9yIFdlYlRyYW5zcG9ydC5cbiAqXG4gKiBUaGlzIGNsYXNzIGNvbWVzIHdpdGggYW4gdXBncmFkZSBtZWNoYW5pc20sIHdoaWNoIG1lYW5zIHRoYXQgb25jZSB0aGUgY29ubmVjdGlvbiBpcyBlc3RhYmxpc2hlZCB3aXRoIHRoZSBmaXJzdFxuICogbG93LWxldmVsIHRyYW5zcG9ydCwgaXQgd2lsbCB0cnkgdG8gdXBncmFkZSB0byBhIGJldHRlciB0cmFuc3BvcnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IFNvY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tY2xpZW50XCI7XG4gKlxuICogY29uc3Qgc29ja2V0ID0gbmV3IFNvY2tldCgpO1xuICpcbiAqIHNvY2tldC5vbihcIm9wZW5cIiwgKCkgPT4ge1xuICogICBzb2NrZXQuc2VuZChcImhlbGxvXCIpO1xuICogfSk7XG4gKlxuICovXG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzID0ge30pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iaW5hcnlUeXBlID0gZGVmYXVsdEJpbmFyeVR5cGU7XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5fcHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMuX3VwZ3JhZGVzID0gW107XG4gICAgICAgIHRoaXMuX3BpbmdJbnRlcnZhbCA9IC0xO1xuICAgICAgICB0aGlzLl9waW5nVGltZW91dCA9IC0xO1xuICAgICAgICB0aGlzLl9tYXhQYXlsb2FkID0gLTE7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXhwaXJhdGlvbiB0aW1lc3RhbXAgb2YgdGhlIHtAbGluayBfcGluZ1RpbWVvdXRUaW1lcn0gb2JqZWN0IGlzIHRyYWNrZWQsIGluIGNhc2UgdGhlIHRpbWVyIGlzIHRocm90dGxlZCBhbmQgdGhlXG4gICAgICAgICAqIGNhbGxiYWNrIGlzIG5vdCBmaXJlZCBvbiB0aW1lLiBUaGlzIGNhbiBoYXBwZW4gZm9yIGV4YW1wbGUgd2hlbiBhIGxhcHRvcCBpcyBzdXNwZW5kZWQgb3Igd2hlbiBhIHBob25lIGlzIGxvY2tlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0VGltZSA9IEluZmluaXR5O1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFVyaSA9IHBhcnNlKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2VkVXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9XG4gICAgICAgICAgICAgICAgcGFyc2VkVXJpLnByb3RvY29sID09PSBcImh0dHBzXCIgfHwgcGFyc2VkVXJpLnByb3RvY29sID09PSBcIndzc1wiO1xuICAgICAgICAgICAgb3B0cy5wb3J0ID0gcGFyc2VkVXJpLnBvcnQ7XG4gICAgICAgICAgICBpZiAocGFyc2VkVXJpLnF1ZXJ5KVxuICAgICAgICAgICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWRVcmkucXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2Uob3B0cy5ob3N0KS5ob3N0O1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5zZWN1cmUgPVxuICAgICAgICAgICAgbnVsbCAhPSBvcHRzLnNlY3VyZVxuICAgICAgICAgICAgICAgID8gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBcImh0dHBzOlwiID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgaWYgKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCkge1xuICAgICAgICAgICAgLy8gaWYgbm8gcG9ydCBpcyBzcGVjaWZpZWQgbWFudWFsbHksIHVzZSB0aGUgcHJvdG9jb2wgZGVmYXVsdFxuICAgICAgICAgICAgb3B0cy5wb3J0ID0gdGhpcy5zZWN1cmUgPyBcIjQ0M1wiIDogXCI4MFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgPVxuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgPyBsb2NhdGlvbi5ob3N0bmFtZSA6IFwibG9jYWxob3N0XCIpO1xuICAgICAgICB0aGlzLnBvcnQgPVxuICAgICAgICAgICAgb3B0cy5wb3J0IHx8XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhdGlvbi5wb3J0XG4gICAgICAgICAgICAgICAgICAgID8gbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuc2VjdXJlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiNDQzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCI4MFwiKTtcbiAgICAgICAgaWYgKG9wdHMudHJhbnNwb3J0SW1wbGVtZW50YXRpb25zICYmIG9wdHMudHJhbnNwb3J0cykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3BlY2lmeWluZyBib3RoICd0cmFuc3BvcnRJbXBsZW1lbnRhdGlvbnMnIGFuZCAndHJhbnNwb3J0cycgb3B0aW9ucyBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRzLnRyYW5zcG9ydEltcGxlbWVudGF0aW9ucyB8fFxuICAgICAgICAgICAgKCgoX2EgPSBvcHRzLnRyYW5zcG9ydHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpICYmIHR5cGVvZiBvcHRzLnRyYW5zcG9ydHNbMF0gPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgICAgICAgIC8vICd0cmFuc3BvcnRzJyBvcHRpb24gYXMgYW4gYXJyYXkgb2YgdHJhbnNwb3J0IGltcGxlbWVudGF0aW9ucyBpcyBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydHNCeU5hbWUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgICAgKChfYiA9IG9wdHMudHJhbnNwb3J0SW1wbGVtZW50YXRpb25zKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBvcHRzLnRyYW5zcG9ydHMpLmZvckVhY2goKHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc3BvcnROYW1lID0gdC5wcm90b3R5cGUubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMucHVzaCh0cmFuc3BvcnROYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc3BvcnRzQnlOYW1lW3RyYW5zcG9ydE5hbWVdID0gdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzXG4gICAgICAgICAgICAgICAgPyBbLi4ub3B0cy50cmFuc3BvcnRzXVxuICAgICAgICAgICAgICAgIDogW1wicG9sbGluZ1wiLCBcIndlYnNvY2tldFwiLCBcIndlYnRyYW5zcG9ydFwiXTtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydHNCeU5hbWUgPSBERUZBVUxUX1RSQU5TUE9SVFM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBwYXRoOiBcIi9lbmdpbmUuaW9cIixcbiAgICAgICAgICAgIGFnZW50OiBmYWxzZSxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgICAgICAgICB1cGdyYWRlOiB0cnVlLFxuICAgICAgICAgICAgdGltZXN0YW1wUGFyYW06IFwidFwiLFxuICAgICAgICAgICAgcmVtZW1iZXJVcGdyYWRlOiBmYWxzZSxcbiAgICAgICAgICAgIGFkZFRyYWlsaW5nU2xhc2g6IHRydWUsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFuc3BvcnRPcHRpb25zOiB7fSxcbiAgICAgICAgICAgIGNsb3NlT25CZWZvcmV1bmxvYWQ6IGZhbHNlLFxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPVxuICAgICAgICAgICAgdGhpcy5vcHRzLnBhdGgucmVwbGFjZSgvXFwvJC8sIFwiXCIpICtcbiAgICAgICAgICAgICAgICAodGhpcy5vcHRzLmFkZFRyYWlsaW5nU2xhc2ggPyBcIi9cIiA6IFwiXCIpO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5xdWVyeSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5vcHRzLnF1ZXJ5ID0gZGVjb2RlKHRoaXMub3B0cy5xdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpdGhFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbG9zZU9uQmVmb3JldW5sb2FkKSB7XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCBjbG9zZXMgdGhlIGNvbm5lY3Rpb24gd2hlbiB0aGUgXCJiZWZvcmV1bmxvYWRcIiBldmVudCBpcyBlbWl0dGVkIGJ1dCBub3QgQ2hyb21lLiBUaGlzIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlcyBldmVyeSBicm93c2VyIGJlaGF2ZXMgdGhlIHNhbWUgKG5vIFwiZGlzY29ubmVjdFwiIGV2ZW50IGF0IHRoZSBTb2NrZXQuSU8gbGV2ZWwgd2hlbiB0aGUgcGFnZSBpc1xuICAgICAgICAgICAgICAgIC8vIGNsb3NlZC9yZWxvYWRlZClcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmV1bmxvYWRFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbGVudGx5IGNsb3NlIHRoZSB0cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCB0aGlzLl9iZWZvcmV1bmxvYWRFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0bmFtZSAhPT0gXCJsb2NhbGhvc3RcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZmxpbmVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm5ldHdvcmsgY29ubmVjdGlvbiBsb3N0XCIsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgT0ZGTElORV9FVkVOVF9MSVNURU5FUlMucHVzaCh0aGlzLl9vZmZsaW5lRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0cy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2Nvb2tpZUphciA9IGNyZWF0ZUNvb2tpZUphcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0cmFuc3BvcnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlVHJhbnNwb3J0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMucXVlcnkpO1xuICAgICAgICAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbiAgICAgICAgcXVlcnkuRUlPID0gcHJvdG9jb2w7XG4gICAgICAgIC8vIHRyYW5zcG9ydCBuYW1lXG4gICAgICAgIHF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7XG4gICAgICAgIC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuICAgICAgICBpZiAodGhpcy5pZClcbiAgICAgICAgICAgIHF1ZXJ5LnNpZCA9IHRoaXMuaWQ7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMsIHtcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgc29ja2V0OiB0aGlzLFxuICAgICAgICAgICAgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUsXG4gICAgICAgICAgICBzZWN1cmU6IHRoaXMuc2VjdXJlLFxuICAgICAgICAgICAgcG9ydDogdGhpcy5wb3J0LFxuICAgICAgICB9LCB0aGlzLm9wdHMudHJhbnNwb3J0T3B0aW9uc1tuYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5fdHJhbnNwb3J0c0J5TmFtZVtuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb3BlbigpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgXCJObyB0cmFuc3BvcnRzIGF2YWlsYWJsZVwiKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zcG9ydE5hbWUgPSB0aGlzLm9wdHMucmVtZW1iZXJVcGdyYWRlICYmXG4gICAgICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMuaW5kZXhPZihcIndlYnNvY2tldFwiKSAhPT0gLTFcbiAgICAgICAgICAgID8gXCJ3ZWJzb2NrZXRcIlxuICAgICAgICAgICAgOiB0aGlzLnRyYW5zcG9ydHNbMF07XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICBjb25zdCB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh0cmFuc3BvcnROYW1lKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQuIERpc2FibGVzIHRoZSBleGlzdGluZyBvbmUgKGlmIGFueSkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMuX29uRHJhaW4uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcInBhY2tldFwiLCB0aGlzLl9vblBhY2tldC5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgdGhpcy5fb25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKHJlYXNvbikgPT4gdGhpcy5fb25DbG9zZShcInRyYW5zcG9ydCBjbG9zZVwiLCByZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0cmFuc3BvcnQgbmFtZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Byb2JlKG5hbWUpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUpO1xuICAgICAgICBsZXQgZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb25UcmFuc3BvcnRPcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInBpbmdcIiwgZGF0YTogXCJwcm9iZVwiIH1dKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5vbmNlKFwicGFja2V0XCIsIChtc2cpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXCJwcm9iZSBlcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwidXBncmFkZUVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gb25UcmFuc3BvcnRDbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJ0cmFuc3BvcnQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgICAgICAgICAgb25lcnJvcihcInNvY2tldCBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb251cGdyYWRlKHRvKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0ICYmIHRvLm5hbWUgIT09IHRyYW5zcG9ydC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gdGhlIHRyYW5zcG9ydCBhbmQgb24gc2VsZlxuICAgICAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwib3BlblwiLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoXCJjbG9zZVwiLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwiY2xvc2VcIiwgb25jbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGluZ1wiLCBvbnVwZ3JhZGUpO1xuICAgICAgICB9O1xuICAgICAgICB0cmFuc3BvcnQub25jZShcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJlcnJvclwiLCBvbmVycm9yKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJjbG9zZVwiLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICAgICAgdGhpcy5vbmNlKFwiY2xvc2VcIiwgb25jbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcInVwZ3JhZGluZ1wiLCBvbnVwZ3JhZGUpO1xuICAgICAgICBpZiAodGhpcy5fdXBncmFkZXMuaW5kZXhPZihcIndlYnRyYW5zcG9ydFwiKSAhPT0gLTEgJiZcbiAgICAgICAgICAgIG5hbWUgIT09IFwid2VidHJhbnNwb3J0XCIpIHtcbiAgICAgICAgICAgIC8vIGZhdm9yIFdlYlRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZmFpbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25PcGVuKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IFwid2Vic29ja2V0XCIgPT09IHRoaXMudHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLm9wdHMudXBncmFkZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl91cGdyYWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2JlKHRoaXMuX3VwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFwic2VydmVyIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci5jb2RlID0gcGFja2V0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uSGFuZHNoYWtlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoYW5kc2hha2VcIiwgZGF0YSk7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMuX3VwZ3JhZGVzID0gdGhpcy5fZmlsdGVyVXBncmFkZXMoZGF0YS51cGdyYWRlcyk7XG4gICAgICAgIHRoaXMuX3BpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICAgICAgICB0aGlzLl9waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX21heFBheWxvYWQgPSBkYXRhLm1heFBheWxvYWQ7XG4gICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5fcmVzZXRQaW5nVGltZW91dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuZCByZXNldHMgcGluZyB0aW1lb3V0IHRpbWVyIGJhc2VkIG9uIHNlcnZlciBwaW5ncy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jlc2V0UGluZ1RpbWVvdXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5fcGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5fcGluZ0ludGVydmFsICsgdGhpcy5fcGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0VGltZSA9IERhdGUubm93KCkgKyBkZWxheTtcbiAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0VGltZXIudW5yZWYoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25EcmFpbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5fcHJldkJ1ZmZlckxlbik7XG4gICAgICAgIC8vIHNldHRpbmcgcHJldkJ1ZmZlckxlbiA9IDAgaXMgdmVyeSBpbXBvcnRhbnRcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4gICAgICAgIC8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG4gICAgICAgIHRoaXMuX3ByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZmx1c2goKSB7XG4gICAgICAgIGlmIChcImNsb3NlZFwiICE9PSB0aGlzLnJlYWR5U3RhdGUgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmXG4gICAgICAgICAgICAhdGhpcy51cGdyYWRpbmcgJiZcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrZXRzID0gdGhpcy5fZ2V0V3JpdGFibGVQYWNrZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHBhY2tldHMpO1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgICAgICAgICB0aGlzLl9wcmV2QnVmZmVyTGVuID0gcGFja2V0cy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImZsdXNoXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuc3VyZSB0aGUgZW5jb2RlZCBzaXplIG9mIHRoZSB3cml0ZUJ1ZmZlciBpcyBiZWxvdyB0aGUgbWF4UGF5bG9hZCB2YWx1ZSBzZW50IGJ5IHRoZSBzZXJ2ZXIgKG9ubHkgZm9yIEhUVFBcbiAgICAgKiBsb25nLXBvbGxpbmcpXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRXcml0YWJsZVBhY2tldHMoKSB7XG4gICAgICAgIGNvbnN0IHNob3VsZENoZWNrUGF5bG9hZFNpemUgPSB0aGlzLl9tYXhQYXlsb2FkICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5uYW1lID09PSBcInBvbGxpbmdcIiAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGggPiAxO1xuICAgICAgICBpZiAoIXNob3VsZENoZWNrUGF5bG9hZFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXlsb2FkU2l6ZSA9IDE7IC8vIGZpcnN0IHBhY2tldCB0eXBlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMud3JpdGVCdWZmZXJbaV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBwYXlsb2FkU2l6ZSA+IHRoaXMuX21heFBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlci5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBheWxvYWRTaXplICs9IDI7IC8vIHNlcGFyYXRvciArIHBhY2tldCB0eXBlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVCdWZmZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBoZWFydGJlYXQgdGltZXIgaGFzIGV4cGlyZWQgYnV0IHRoZSBzb2NrZXQgaGFzIG5vdCB5ZXQgYmVlbiBub3RpZmllZC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHRoaXMgbWV0aG9kIGlzIHByaXZhdGUgZm9yIG5vdyBiZWNhdXNlIGl0IGRvZXMgbm90IHJlYWxseSBmaXQgdGhlIFdlYlNvY2tldCBBUEksIGJ1dCBpZiB3ZSBwdXQgaXQgaW4gdGhlXG4gICAgICogYHdyaXRlKClgIG1ldGhvZCB0aGVuIHRoZSBtZXNzYWdlIHdvdWxkIG5vdCBiZSBidWZmZXJlZCBieSB0aGUgU29ja2V0LklPIGNsaWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICAvKiBwcml2YXRlICovIF9oYXNQaW5nRXhwaXJlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9waW5nVGltZW91dFRpbWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgaGFzRXhwaXJlZCA9IERhdGUubm93KCkgPiB0aGlzLl9waW5nVGltZW91dFRpbWU7XG4gICAgICAgIGlmIChoYXNFeHBpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9waW5nVGltZW91dFRpbWUgPSAwO1xuICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc0V4cGlyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgLSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgd3JpdGUobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLl9zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZS4gQWxpYXMgb2Yge0BsaW5rIFNvY2tldCN3cml0ZX0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIC0gbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHNlbmQobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLl9zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBwYWNrZXQgdHlwZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NlbmRQYWNrZXQodHlwZSwgZGF0YSwgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZuID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBvcHRpb25zLmNvbXByZXNzID0gZmFsc2UgIT09IG9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRDcmVhdGVcIiwgcGFja2V0KTtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgIGlmIChmbilcbiAgICAgICAgICAgIHRoaXMub25jZShcImZsdXNoXCIsIGZuKTtcbiAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25DbG9zZShcImZvcmNlZCBjbG9zZVwiKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNsZWFudXBBbmRDbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHdhaXRGb3JVcGdyYWRlID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMub25jZShcInVwZ3JhZGVcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub25jZShcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NpbmdcIjtcbiAgICAgICAgICAgIGlmICh0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcImRyYWluXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGVycm9yXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkVycm9yKGVycikge1xuICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm9wdHMudHJ5QWxsVHJhbnNwb3J0cyAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9PT0gXCJvcGVuaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5zaGlmdCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wZW4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMuX29uQ2xvc2UoXCJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25DbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBjbGVhciB0aW1lcnNcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5fcGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgICAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycyhcImNsb3NlXCIpO1xuICAgICAgICAgICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBpZiAod2l0aEV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2JlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCB0aGlzLl9iZWZvcmV1bmxvYWRFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vZmZsaW5lRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpID0gT0ZGTElORV9FVkVOVF9MSVNURU5FUlMuaW5kZXhPZih0aGlzLl9vZmZsaW5lRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgT0ZGTElORV9FVkVOVF9MSVNURU5FUlMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgICAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbHRlcnMgdXBncmFkZXMsIHJldHVybmluZyBvbmx5IHRob3NlIG1hdGNoaW5nIGNsaWVudCB0cmFuc3BvcnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gdXBncmFkZXMgLSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9maWx0ZXJVcGdyYWRlcyh1cGdyYWRlcykge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXBncmFkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh+dGhpcy50cmFuc3BvcnRzLmluZGV4T2YodXBncmFkZXNbaV0pKVxuICAgICAgICAgICAgICAgIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG4gICAgfVxufVxuU29ja2V0LnByb3RvY29sID0gcHJvdG9jb2w7XG4iLCJpbXBvcnQgeyBkZWNvZGVQYWNrZXQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBlbmNvZGUgfSBmcm9tIFwiLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHJlYXNvbik7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJUcmFuc3BvcnRFcnJvclwiO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSAhb3B0cy5mb3JjZUJhc2U2NDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgZXJyb3IgY29udGV4dFxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRXJyb3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkge1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBuZXcgVHJhbnNwb3J0RXJyb3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgdGhpcy5kb09wZW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5pbmdcIiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBtdWx0aXBsZSBwYWNrZXRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICAgICAqL1xuICAgIHNlbmQocGFja2V0cykge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgaGFwcGVuIGlmIHRoZSB0cmFuc3BvcnQgd2FzIHNpbGVudGx5IGNsb3NlZCBpbiB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBvcGVuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25PcGVuKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICBjb25zdCBwYWNrZXQgPSBkZWNvZGVQYWNrZXQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvblBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uQ2xvc2UoZGV0YWlscykge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCBkZXRhaWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGF1c2VzIHRoZSB0cmFuc3BvcnQsIGluIG9yZGVyIG5vdCB0byBsb3NlIHBhY2tldHMgZHVyaW5nIGFuIHVwZ3JhZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb25QYXVzZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHsgfVxuICAgIGNyZWF0ZVVyaShzY2hlbWEsIHF1ZXJ5ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIChzY2hlbWEgK1xuICAgICAgICAgICAgXCI6Ly9cIiArXG4gICAgICAgICAgICB0aGlzLl9ob3N0bmFtZSgpICtcbiAgICAgICAgICAgIHRoaXMuX3BvcnQoKSArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICB0aGlzLl9xdWVyeShxdWVyeSkpO1xuICAgIH1cbiAgICBfaG9zdG5hbWUoKSB7XG4gICAgICAgIGNvbnN0IGhvc3RuYW1lID0gdGhpcy5vcHRzLmhvc3RuYW1lO1xuICAgICAgICByZXR1cm4gaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gaG9zdG5hbWUgOiBcIltcIiArIGhvc3RuYW1lICsgXCJdXCI7XG4gICAgfVxuICAgIF9wb3J0KCkge1xuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgodGhpcy5vcHRzLnNlY3VyZSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgICAgICAgICAgICAgKCF0aGlzLm9wdHMuc2VjdXJlICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3F1ZXJ5KHF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIHJldHVybiBlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFhIUiB9IGZyb20gXCIuL3BvbGxpbmcteGhyLm5vZGUuanNcIjtcbmltcG9ydCB7IFdTIH0gZnJvbSBcIi4vd2Vic29ja2V0Lm5vZGUuanNcIjtcbmltcG9ydCB7IFdUIH0gZnJvbSBcIi4vd2VidHJhbnNwb3J0LmpzXCI7XG5leHBvcnQgY29uc3QgdHJhbnNwb3J0cyA9IHtcbiAgICB3ZWJzb2NrZXQ6IFdTLFxuICAgIHdlYnRyYW5zcG9ydDogV1QsXG4gICAgcG9sbGluZzogWEhSLFxufTtcbiIsImltcG9ydCB7IFBvbGxpbmcgfSBmcm9tIFwiLi9wb2xsaW5nLmpzXCI7XG4vKipcbiAqIEhUVFAgbG9uZy1wb2xsaW5nIGJhc2VkIG9uIHRoZSBidWlsdC1pbiBgZmV0Y2goKWAgbWV0aG9kLlxuICpcbiAqIFVzYWdlOiBicm93c2VyLCBOb2RlLmpzIChzaW5jZSB2MTgpLCBEZW5vLCBCdW5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9mZXRjaFxuICogQHNlZSBodHRwczovL2Nhbml1c2UuY29tL2ZldGNoXG4gKiBAc2VlIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZ2xvYmFscy5odG1sI2ZldGNoXG4gKi9cbmV4cG9ydCBjbGFzcyBGZXRjaCBleHRlbmRzIFBvbGxpbmcge1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgdGhpcy5fZmV0Y2goKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbkVycm9yKFwiZmV0Y2ggcmVhZCBlcnJvclwiLCByZXMuc3RhdHVzLCByZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzLnRleHQoKS50aGVuKChkYXRhKSA9PiB0aGlzLm9uRGF0YShkYXRhKSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwiZmV0Y2ggcmVhZCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG9Xcml0ZShkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9mZXRjaChkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbkVycm9yKFwiZmV0Y2ggd3JpdGUgZXJyb3JcIiwgcmVzLnN0YXR1cywgcmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwiZmV0Y2ggd3JpdGUgZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9mZXRjaChkYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgaXNQb3N0ID0gZGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnModGhpcy5vcHRzLmV4dHJhSGVhZGVycyk7XG4gICAgICAgIGlmIChpc1Bvc3QpIHtcbiAgICAgICAgICAgIGhlYWRlcnMuc2V0KFwiY29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICB9XG4gICAgICAgIChfYSA9IHRoaXMuc29ja2V0Ll9jb29raWVKYXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hcHBlbmRDb29raWVzKGhlYWRlcnMpO1xuICAgICAgICByZXR1cm4gZmV0Y2godGhpcy51cmkoKSwge1xuICAgICAgICAgICAgbWV0aG9kOiBpc1Bvc3QgPyBcIlBPU1RcIiA6IFwiR0VUXCIsXG4gICAgICAgICAgICBib2R5OiBpc1Bvc3QgPyBkYXRhIDogbnVsbCxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogdGhpcy5vcHRzLndpdGhDcmVkZW50aWFscyA/IFwiaW5jbHVkZVwiIDogXCJvbWl0XCIsXG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBnZXRTZXRDb29raWUoKSB3YXMgYWRkZWQgaW4gTm9kZS5qcyB2MTkuNy4wXG4gICAgICAgICAgICAoX2EgPSB0aGlzLnNvY2tldC5fY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyc2VDb29raWVzKHJlcy5oZWFkZXJzLmdldFNldENvb2tpZSgpKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBvbGxpbmcgfSBmcm9tIFwiLi9wb2xsaW5nLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucywgcGljayB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4uL2dsb2JhbHMubm9kZS5qc1wiO1xuaW1wb3J0IHsgaGFzQ09SUyB9IGZyb20gXCIuLi9jb250cmliL2hhcy1jb3JzLmpzXCI7XG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuZXhwb3J0IGNsYXNzIEJhc2VYSFIgZXh0ZW5kcyBQb2xsaW5nIHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhY2thZ2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zdCBpc1NTTCA9IFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgbGV0IHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuICAgICAgICAgICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueGQgPVxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgLSBkYXRhIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvV3JpdGUoZGF0YSwgZm4pIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKFwic3VjY2Vzc1wiLCBmbik7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsICh4aHJTdGF0dXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcInhociBwb3N0IGVycm9yXCIsIHhoclN0YXR1cywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkb1BvbGwoKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICAgICAgICByZXEub24oXCJkYXRhXCIsIHRoaXMub25EYXRhLmJpbmQodGhpcykpO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCAoeGhyU3RhdHVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9sbCBlcnJvclwiLCB4aHJTdGF0dXMsIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wb2xsWGhyID0gcmVxO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNyZWF0ZVJlcXVlc3QsIHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0O1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuX29wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLl9tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgICAgICB0aGlzLl91cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gICAgICAgIHRoaXMuX2NyZWF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NyZWF0ZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBvcHRzID0gcGljayh0aGlzLl9vcHRzLCBcImFnZW50XCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJhdXRvVW5yZWZcIik7XG4gICAgICAgIG9wdHMueGRvbWFpbiA9ICEhdGhpcy5fb3B0cy54ZDtcbiAgICAgICAgY29uc3QgeGhyID0gKHRoaXMuX3hociA9IHRoaXMuY3JlYXRlUmVxdWVzdChvcHRzKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB4aHIub3Blbih0aGlzLl9tZXRob2QsIHRoaXMuX3VyaSwgdHJ1ZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLl9vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdHMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5fb3B0cy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgaWYgKFwiUE9TVFwiID09PSB0aGlzLl9tZXRob2QpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcIiovKlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIChfYSA9IHRoaXMuX29wdHMuY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkQ29va2llcyh4aHIpO1xuICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5fb3B0cy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0cy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5fb3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLl9vcHRzLmNvb2tpZUphcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcnNlQ29va2llcyhcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJzZXQtY29va2llXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKDIwMCA9PT0geGhyLnN0YXR1cyB8fCAxMjIzID09PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uTG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvcih0eXBlb2YgeGhyLnN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKHRoaXMuX2RhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZnJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgICAgIC8vIGFuZCB0aHVzIHRoZSAnZXJyb3InIGV2ZW50IGNhbiBvbmx5IGJlIG9ubHkgYm91bmQgKmFmdGVyKiB0aGlzIGV4Y2VwdGlvblxuICAgICAgICAgICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvcihlKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuX2luZGV4XSA9IHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkVycm9yKGVycikge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVyciwgdGhpcy5feGhyKTtcbiAgICAgICAgdGhpcy5fY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLl94aHIgfHwgbnVsbCA9PT0gdGhpcy5feGhyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3hoci5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuX2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl94aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5feGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgaWYgKGRhdGEgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZGF0YVwiLCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwic3VjY2Vzc1wiKTtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBYm9ydHMgdGhlIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIGFib3J0KCkge1xuICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IGhhc1hIUjIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHhociA9IG5ld1JlcXVlc3Qoe1xuICAgICAgICB4ZG9tYWluOiBmYWxzZSxcbiAgICB9KTtcbiAgICByZXR1cm4geGhyICYmIHhoci5yZXNwb25zZVR5cGUgIT09IG51bGw7XG59KSgpO1xuLyoqXG4gKiBIVFRQIGxvbmctcG9sbGluZyBiYXNlZCBvbiB0aGUgYnVpbHQtaW4gYFhNTEh0dHBSZXF1ZXN0YCBvYmplY3QuXG4gKlxuICogVXNhZ2U6IGJyb3dzZXJcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdFxuICovXG5leHBvcnQgY2xhc3MgWEhSIGV4dGVuZHMgQmFzZVhIUiB7XG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgY29uc3QgZm9yY2VCYXNlNjQgPSBvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQ7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBoYXNYSFIyICYmICFmb3JjZUJhc2U2NDtcbiAgICB9XG4gICAgcmVxdWVzdChvcHRzID0ge30pIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCB7IHhkOiB0aGlzLnhkIH0sIHRoaXMub3B0cyk7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdChuZXdSZXF1ZXN0LCB0aGlzLnVyaSgpLCBvcHRzKTtcbiAgICB9XG59XG5mdW5jdGlvbiBuZXdSZXF1ZXN0KG9wdHMpIHtcbiAgICBjb25zdCB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuICAgIC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxuICAgIHRyeSB7XG4gICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKCF4ZG9tYWluIHx8IGhhc0NPUlMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHsgfVxuICAgIGlmICgheGRvbWFpbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBnbG9iYWxUaGlzW1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIildKFwiTWljcm9zb2Z0LlhNTEhUVFBcIik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IHJhbmRvbVN0cmluZyB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBlbmNvZGVQYXlsb2FkLCBkZWNvZGVQYXlsb2FkIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBQb2xsaW5nIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fcG9sbGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZG9PcGVuKCkge1xuICAgICAgICB0aGlzLl9wb2xsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhdXNlcyBwb2xsaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25QYXVzZSAtIGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgcGF1c2Uob25QYXVzZSkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcInBhdXNpbmdcIjtcbiAgICAgICAgY29uc3QgcGF1c2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcInBhdXNlZFwiO1xuICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fcG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgdG90YWwrKztcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJwb2xsQ29tcGxldGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMud3JpdGFibGUpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcImRyYWluXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3BvbGwoKSB7XG4gICAgICAgIHRoaXMuX3BvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHBhY2tldCkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgICAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgcGFja2V0LnR5cGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICAgICAgICAgIGlmIChcImNsb3NlXCIgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKHsgZGVzY3JpcHRpb246IFwidHJhbnNwb3J0IGNsb3NlZCBieSB0aGUgc2VydmVyXCIgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBkZWNvZGUgcGF5bG9hZFxuICAgICAgICBkZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgICAgICAgdGhpcy5fcG9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwb2xsQ29tcGxldGVcIik7XG4gICAgICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZShbeyB0eXBlOiBcImNsb3NlXCIgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgICAgICAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwib3BlblwiLCBjbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0cyAtIGRhdGEgcGFja2V0c1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgZW5jb2RlUGF5bG9hZChwYWNrZXRzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb1dyaXRlKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcImh0dHBzXCIgOiBcImh0dHBcIjtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICAgICAgICAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuICAgICAgICBpZiAoZmFsc2UgIT09IHRoaXMub3B0cy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgICAgICAgICAgcXVlcnlbdGhpcy5vcHRzLnRpbWVzdGFtcFBhcmFtXSA9IHJhbmRvbVN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVyaShzY2hlbWEsIHF1ZXJ5KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBUcmFuc3BvcnQgfSBmcm9tIFwiLi4vdHJhbnNwb3J0LmpzXCI7XG5pbXBvcnQgeyBwaWNrLCByYW5kb21TdHJpbmcgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMsIG5leHRUaWNrIH0gZnJvbSBcIi4uL2dsb2JhbHMubm9kZS5qc1wiO1xuLy8gZGV0ZWN0IFJlYWN0TmF0aXZlIGVudmlyb25tZW50XG5jb25zdCBpc1JlYWN0TmF0aXZlID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gXCJzdHJpbmdcIiAmJlxuICAgIG5hdmlnYXRvci5wcm9kdWN0LnRvTG93ZXJDYXNlKCkgPT09IFwicmVhY3RuYXRpdmVcIjtcbmV4cG9ydCBjbGFzcyBCYXNlV1MgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJ3ZWJzb2NrZXRcIjtcbiAgICB9XG4gICAgZG9PcGVuKCkge1xuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICBjb25zdCBwcm90b2NvbHMgPSB0aGlzLm9wdHMucHJvdG9jb2xzO1xuICAgICAgICAvLyBSZWFjdCBOYXRpdmUgb25seSBzdXBwb3J0cyB0aGUgJ2hlYWRlcnMnIG9wdGlvbiwgYW5kIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIGFueXRoaW5nIGVsc2UgaXMgcGFzc2VkXG4gICAgICAgIGNvbnN0IG9wdHMgPSBpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGVyTWVzc2FnZURlZmxhdGVcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImxvY2FsQWRkcmVzc1wiLCBcInByb3RvY29sVmVyc2lvblwiLCBcIm9yaWdpblwiLCBcIm1heFBheWxvYWRcIiwgXCJmYW1pbHlcIiwgXCJjaGVja1NlcnZlcklkZW50aXR5XCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5vcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53cyA9IHRoaXMuY3JlYXRlU29ja2V0KHVyaSwgcHJvdG9jb2xzLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9IHRoaXMuc29ja2V0LmJpbmFyeVR5cGU7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMud3MuX3NvY2tldC51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gKGNsb3NlRXZlbnQpID0+IHRoaXMub25DbG9zZSh7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBjbG9zZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IGNsb3NlRXZlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IChldikgPT4gdGhpcy5vbkRhdGEoZXYuZGF0YSk7XG4gICAgICAgIHRoaXMud3Mub25lcnJvciA9IChlKSA9PiB0aGlzLm9uRXJyb3IoXCJ3ZWJzb2NrZXQgZXJyb3JcIiwgZSk7XG4gICAgfVxuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAgICAgICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCB0aGlzLnN1cHBvcnRzQmluYXJ5LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9Xcml0ZShwYWNrZXQsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmYWtlIGRyYWluXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSAoKSA9PiB7IH07XG4gICAgICAgICAgICB0aGlzLndzLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLndzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG4gICAgICAgIGlmICh0aGlzLm9wdHMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICAgICAgICAgIHF1ZXJ5W3RoaXMub3B0cy50aW1lc3RhbXBQYXJhbV0gPSByYW5kb21TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVyaShzY2hlbWEsIHF1ZXJ5KTtcbiAgICB9XG59XG5jb25zdCBXZWJTb2NrZXRDdG9yID0gZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG4vKipcbiAqIFdlYlNvY2tldCB0cmFuc3BvcnQgYmFzZWQgb24gdGhlIGJ1aWx0LWluIGBXZWJTb2NrZXRgIG9iamVjdC5cbiAqXG4gKiBVc2FnZTogYnJvd3NlciwgTm9kZS5qcyAoc2luY2UgdjIxKSwgRGVubywgQnVuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0XG4gKiBAc2VlIGh0dHBzOi8vY2FuaXVzZS5jb20vbWRuLWFwaV93ZWJzb2NrZXRcbiAqIEBzZWUgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9nbG9iYWxzLmh0bWwjd2Vic29ja2V0XG4gKi9cbmV4cG9ydCBjbGFzcyBXUyBleHRlbmRzIEJhc2VXUyB7XG4gICAgY3JlYXRlU29ja2V0KHVyaSwgcHJvdG9jb2xzLCBvcHRzKSB7XG4gICAgICAgIHJldHVybiAhaXNSZWFjdE5hdGl2ZVxuICAgICAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXRDdG9yKHVyaSwgcHJvdG9jb2xzKVxuICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldEN0b3IodXJpKVxuICAgICAgICAgICAgOiBuZXcgV2ViU29ja2V0Q3Rvcih1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgfVxuICAgIGRvV3JpdGUoX3BhY2tldCwgZGF0YSkge1xuICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgbmV4dFRpY2sgfSBmcm9tIFwiLi4vZ2xvYmFscy5ub2RlLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtLCBjcmVhdGVQYWNrZXRFbmNvZGVyU3RyZWFtLCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG4vKipcbiAqIFdlYlRyYW5zcG9ydCB0cmFuc3BvcnQgYmFzZWQgb24gdGhlIGJ1aWx0LWluIGBXZWJUcmFuc3BvcnRgIG9iamVjdC5cbiAqXG4gKiBVc2FnZTogYnJvd3NlciwgTm9kZS5qcyAod2l0aCB0aGUgYEBmYWlscy1jb21wb25lbnRzL3dlYnRyYW5zcG9ydGAgcGFja2FnZSlcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJUcmFuc3BvcnRcbiAqIEBzZWUgaHR0cHM6Ly9jYW5pdXNlLmNvbS93ZWJ0cmFuc3BvcnRcbiAqL1xuZXhwb3J0IGNsYXNzIFdUIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwid2VidHJhbnNwb3J0XCI7XG4gICAgfVxuICAgIGRvT3BlbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IG5ldyBXZWJUcmFuc3BvcnQodGhpcy5jcmVhdGVVcmkoXCJodHRwc1wiKSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbdGhpcy5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90cmFuc3BvcnQuY2xvc2VkXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ3ZWJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG5vdGU6IHdlIGNvdWxkIGhhdmUgdXNlZCBhc3luYy9hd2FpdCwgYnV0IHRoYXQgd291bGQgcmVxdWlyZSBzb21lIGFkZGl0aW9uYWwgcG9seWZpbGxzXG4gICAgICAgIHRoaXMuX3RyYW5zcG9ydC5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydC5jcmVhdGVCaWRpcmVjdGlvbmFsU3RyZWFtKCkudGhlbigoc3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVjb2RlclN0cmVhbSA9IGNyZWF0ZVBhY2tldERlY29kZXJTdHJlYW0oTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IHN0cmVhbS5yZWFkYWJsZS5waXBlVGhyb3VnaChkZWNvZGVyU3RyZWFtKS5nZXRSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmNvZGVyU3RyZWFtID0gY3JlYXRlUGFja2V0RW5jb2RlclN0cmVhbSgpO1xuICAgICAgICAgICAgICAgIGVuY29kZXJTdHJlYW0ucmVhZGFibGUucGlwZVRvKHN0cmVhbS53cml0YWJsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVyID0gZW5jb2RlclN0cmVhbS53cml0YWJsZS5nZXRXcml0ZXIoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWFkKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh7IGRvbmUsIHZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblBhY2tldCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJlYWQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYWNrZXQgPSB7IHR5cGU6IFwib3BlblwiIH07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucXVlcnkuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhY2tldC5kYXRhID0gYHtcInNpZFwiOlwiJHt0aGlzLnF1ZXJ5LnNpZH1cIn1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl93cml0ZXIud3JpdGUocGFja2V0KS50aGVuKCgpID0+IHRoaXMub25PcGVuKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrZXQgPSBwYWNrZXRzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGFzdFBhY2tldCA9IGkgPT09IHBhY2tldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHRoaXMuX3dyaXRlci53cml0ZShwYWNrZXQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0UGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5fdHJhbnNwb3J0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xvc2UoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4vZ2xvYmFscy5ub2RlLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBnbG9iYWxUaGlzLnNldFRpbWVvdXQ7XG5jb25zdCBOQVRJVkVfQ0xFQVJfVElNRU9VVCA9IGdsb2JhbFRoaXMuY2xlYXJUaW1lb3V0O1xuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGxUaW1lckZ1bmN0aW9ucyhvYmosIG9wdHMpIHtcbiAgICBpZiAob3B0cy51c2VOYXRpdmVUaW1lcnMpIHtcbiAgICAgICAgb2JqLnNldFRpbWVvdXRGbiA9IE5BVElWRV9TRVRfVElNRU9VVC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBOQVRJVkVfQ0xFQVJfVElNRU9VVC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb2JqLnNldFRpbWVvdXRGbiA9IGdsb2JhbFRoaXMuc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBnbG9iYWxUaGlzLmNsZWFyVGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgIH1cbn1cbi8vIGJhc2U2NCBlbmNvZGVkIGJ1ZmZlcnMgYXJlIGFib3V0IDMzJSBiaWdnZXIgKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NClcbmNvbnN0IEJBU0U2NF9PVkVSSEVBRCA9IDEuMzM7XG4vLyB3ZSBjb3VsZCBhbHNvIGhhdmUgdXNlZCBgbmV3IEJsb2IoW29ial0pLnNpemVgLCBidXQgaXQgaXNuJ3Qgc3VwcG9ydGVkIGluIElFOVxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVMZW5ndGgob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHV0ZjhMZW5ndGgob2JqKTtcbiAgICB9XG4gICAgLy8gYXJyYXlidWZmZXIgb3IgYmxvYlxuICAgIHJldHVybiBNYXRoLmNlaWwoKG9iai5ieXRlTGVuZ3RoIHx8IG9iai5zaXplKSAqIEJBU0U2NF9PVkVSSEVBRCk7XG59XG5mdW5jdGlvbiB1dGY4TGVuZ3RoKHN0cikge1xuICAgIGxldCBjID0gMCwgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHN0ci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ZDgwMCB8fCBjID49IDB4ZTAwMCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBsZW5ndGggKz0gNDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gOC1jaGFyYWN0ZXJzIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVN0cmluZygpIHtcbiAgICByZXR1cm4gKERhdGUubm93KCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygzKSArXG4gICAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA1KSk7XG59XG4iLCJjb25zdCBQQUNLRVRfVFlQRVMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBubyBNYXAgPSBubyBwb2x5ZmlsbFxuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcbmNvbnN0IFBBQ0tFVF9UWVBFU19SRVZFUlNFID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbk9iamVjdC5rZXlzKFBBQ0tFVF9UWVBFUykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgUEFDS0VUX1RZUEVTX1JFVkVSU0VbUEFDS0VUX1RZUEVTW2tleV1dID0ga2V5O1xufSk7XG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuZXhwb3J0IHsgUEFDS0VUX1RZUEVTLCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgRVJST1JfUEFDS0VUIH07XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9iYXNlNjQtYXJyYXlidWZmZXJcbmNvbnN0IGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuY29uc3QgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG5leHBvcnQgY29uc3QgZW5jb2RlID0gKGFycmF5YnVmZmVyKSA9PiB7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuICAgIGlmIChsZW4gJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JztcbiAgICB9XG4gICAgcmV0dXJuIGJhc2U2NDtcbn07XG5leHBvcnQgY29uc3QgZGVjb2RlID0gKGJhc2U2NCkgPT4ge1xuICAgIGxldCBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAyKV07XG4gICAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAzKV07XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG59O1xuIiwiaW1wb3J0IHsgRVJST1JfUEFDS0VULCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5pbXBvcnQgeyBkZWNvZGUgfSBmcm9tIFwiLi9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qc1wiO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5leHBvcnQgY29uc3QgZGVjb2RlUGFja2V0ID0gKGVuY29kZWRQYWNrZXQsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAodHlwZW9mIGVuY29kZWRQYWNrZXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgZGF0YTogbWFwQmluYXJ5KGVuY29kZWRQYWNrZXQsIGJpbmFyeVR5cGUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gZW5jb2RlZFBhY2tldC5jaGFyQXQoMCk7XG4gICAgaWYgKHR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IGRlY29kZUJhc2U2NFBhY2tldChlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKSwgYmluYXJ5VHlwZSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXTtcbiAgICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksXG4gICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICB0eXBlOiBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXSxcbiAgICAgICAgfTtcbn07XG5jb25zdCBkZWNvZGVCYXNlNjRQYWNrZXQgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGJhc2U2NDogdHJ1ZSwgZGF0YSB9OyAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgfVxufTtcbmNvbnN0IG1hcEJpbmFyeSA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgc3dpdGNoIChiaW5hcnlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIFdlYlNvY2tldCArIGJpbmFyeVR5cGUgXCJibG9iXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gSFRUUCBsb25nLXBvbGxpbmcgb3IgV2ViVHJhbnNwb3J0XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gSFRUUCBsb25nLXBvbGxpbmcgKGJhc2U2NCkgb3IgV2ViU29ja2V0ICsgYmluYXJ5VHlwZSBcImFycmF5YnVmZmVyXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gV2ViVHJhbnNwb3J0IChVaW50OEFycmF5KVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgUEFDS0VUX1RZUEVTIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuY29uc3Qgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBCbG9iICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbi8vIEFycmF5QnVmZmVyLmlzVmlldyBtZXRob2QgaXMgbm90IGRlZmluZWQgaW4gSUUxMFxuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iaiAmJiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgZW5jb2RlUGFja2V0ID0gKHsgdHlwZSwgZGF0YSB9LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KGRhdGEsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcoZGF0YSkpKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChuZXcgQmxvYihbZGF0YV0pLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgcmV0dXJuIGNhbGxiYWNrKFBBQ0tFVF9UWVBFU1t0eXBlXSArIChkYXRhIHx8IFwiXCIpKTtcbn07XG5jb25zdCBlbmNvZGVCbG9iQXNCYXNlNjQgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZpbGVSZWFkZXIucmVzdWx0LnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgY2FsbGJhY2soXCJiXCIgKyAoY29udGVudCB8fCBcIlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4gZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGRhdGEpO1xufTtcbmZ1bmN0aW9uIHRvQXJyYXkoZGF0YSkge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpO1xuICAgIH1cbn1cbmxldCBURVhUX0VOQ09ERVI7XG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlUGFja2V0VG9CaW5hcnkocGFja2V0LCBjYWxsYmFjaykge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHBhY2tldC5kYXRhLmFycmF5QnVmZmVyKCkudGhlbih0b0FycmF5KS50aGVuKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmXG4gICAgICAgIChwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhwYWNrZXQuZGF0YSkpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0b0FycmF5KHBhY2tldC5kYXRhKSk7XG4gICAgfVxuICAgIGVuY29kZVBhY2tldChwYWNrZXQsIGZhbHNlLCAoZW5jb2RlZCkgPT4ge1xuICAgICAgICBpZiAoIVRFWFRfRU5DT0RFUikge1xuICAgICAgICAgICAgVEVYVF9FTkNPREVSID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soVEVYVF9FTkNPREVSLmVuY29kZShlbmNvZGVkKSk7XG4gICAgfSk7XG59XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQgfTtcbiIsImltcG9ydCB7IGVuY29kZVBhY2tldCwgZW5jb2RlUGFja2V0VG9CaW5hcnkgfSBmcm9tIFwiLi9lbmNvZGVQYWNrZXQuanNcIjtcbmltcG9ydCB7IGRlY29kZVBhY2tldCB9IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuaW1wb3J0IHsgRVJST1JfUEFDS0VULCB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmNvbnN0IFNFUEFSQVRPUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMzApOyAvLyBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGVsaW1pdGVyI0FTQ0lJX2RlbGltaXRlZF90ZXh0XG5jb25zdCBlbmNvZGVQYXlsb2FkID0gKHBhY2tldHMsIGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gc29tZSBwYWNrZXRzIG1heSBiZSBhZGRlZCB0byB0aGUgYXJyYXkgd2hpbGUgZW5jb2RpbmcsIHNvIHRoZSBpbml0aWFsIGxlbmd0aCBtdXN0IGJlIHNhdmVkXG4gICAgY29uc3QgbGVuZ3RoID0gcGFja2V0cy5sZW5ndGg7XG4gICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHBhY2tldHMuZm9yRWFjaCgocGFja2V0LCBpKSA9PiB7XG4gICAgICAgIC8vIGZvcmNlIGJhc2U2NCBlbmNvZGluZyBmb3IgYmluYXJ5IHBhY2tldHNcbiAgICAgICAgZW5jb2RlUGFja2V0KHBhY2tldCwgZmFsc2UsIChlbmNvZGVkUGFja2V0KSA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYWNrZXRFbmNvZGVyU3RyZWFtKCkge1xuICAgIHJldHVybiBuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgICAgdHJhbnNmb3JtKHBhY2tldCwgY29udHJvbGxlcikge1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0VG9CaW5hcnkocGFja2V0LCAoZW5jb2RlZFBhY2tldCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRMZW5ndGggPSBlbmNvZGVkUGFja2V0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyO1xuICAgICAgICAgICAgICAgIC8vIGluc3BpcmVkIGJ5IHRoZSBXZWJTb2NrZXQgZm9ybWF0OiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0c19BUEkvV3JpdGluZ19XZWJTb2NrZXRfc2VydmVycyNkZWNvZGluZ19wYXlsb2FkX2xlbmd0aFxuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkTGVuZ3RoIDwgMTI2KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGF0YVZpZXcoaGVhZGVyLmJ1ZmZlcikuc2V0VWludDgoMCwgcGF5bG9hZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBheWxvYWRMZW5ndGggPCA2NTUzNikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSBuZXcgVWludDhBcnJheSgzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXIuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgwLCAxMjYpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQxNigxLCBwYXlsb2FkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KDAsIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0QmlnVWludDY0KDEsIEJpZ0ludChwYXlsb2FkTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IGJpdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBwbGFpbiB0ZXh0ICgwKSBvciBiaW5hcnkgKDEpXG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5kYXRhICYmIHR5cGVvZiBwYWNrZXQuZGF0YSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJbMF0gfD0gMHg4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGhlYWRlcik7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGVuY29kZWRQYWNrZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5sZXQgVEVYVF9ERUNPREVSO1xuZnVuY3Rpb24gdG90YWxMZW5ndGgoY2h1bmtzKSB7XG4gICAgcmV0dXJuIGNodW5rcy5yZWR1Y2UoKGFjYywgY2h1bmspID0+IGFjYyArIGNodW5rLmxlbmd0aCwgMCk7XG59XG5mdW5jdGlvbiBjb25jYXRDaHVua3MoY2h1bmtzLCBzaXplKSB7XG4gICAgaWYgKGNodW5rc1swXS5sZW5ndGggPT09IHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGNodW5rcy5zaGlmdCgpO1xuICAgIH1cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBsZXQgaiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgYnVmZmVyW2ldID0gY2h1bmtzWzBdW2orK107XG4gICAgICAgIGlmIChqID09PSBjaHVua3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaHVua3Muc2hpZnQoKTtcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaHVua3MubGVuZ3RoICYmIGogPCBjaHVua3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGNodW5rc1swXSA9IGNodW5rc1swXS5zbGljZShqKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtKG1heFBheWxvYWQsIGJpbmFyeVR5cGUpIHtcbiAgICBpZiAoIVRFWFRfREVDT0RFUikge1xuICAgICAgICBURVhUX0RFQ09ERVIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICB9XG4gICAgY29uc3QgY2h1bmtzID0gW107XG4gICAgbGV0IHN0YXRlID0gMCAvKiBTdGF0ZS5SRUFEX0hFQURFUiAqLztcbiAgICBsZXQgZXhwZWN0ZWRMZW5ndGggPSAtMTtcbiAgICBsZXQgaXNCaW5hcnkgPSBmYWxzZTtcbiAgICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbSh7XG4gICAgICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IDAgLyogU3RhdGUuUkVBRF9IRUFERVIgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsTGVuZ3RoKGNodW5rcykgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBjb25jYXRDaHVua3MoY2h1bmtzLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaXNCaW5hcnkgPSAoaGVhZGVyWzBdICYgMHg4MCkgPT09IDB4ODA7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkTGVuZ3RoID0gaGVhZGVyWzBdICYgMHg3ZjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGVjdGVkTGVuZ3RoIDwgMTI2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDMgLyogU3RhdGUuUkVBRF9QQVlMT0FEICovO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV4cGVjdGVkTGVuZ3RoID09PSAxMjYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMSAvKiBTdGF0ZS5SRUFEX0VYVEVOREVEX0xFTkdUSF8xNiAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMiAvKiBTdGF0ZS5SRUFEX0VYVEVOREVEX0xFTkdUSF82NCAqLztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdGF0ZSA9PT0gMSAvKiBTdGF0ZS5SRUFEX0VYVEVOREVEX0xFTkdUSF8xNiAqLykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxMZW5ndGgoY2h1bmtzKSA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlckFycmF5ID0gY29uY2F0Q2h1bmtzKGNodW5rcywgMik7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkTGVuZ3RoID0gbmV3IERhdGFWaWV3KGhlYWRlckFycmF5LmJ1ZmZlciwgaGVhZGVyQXJyYXkuYnl0ZU9mZnNldCwgaGVhZGVyQXJyYXkubGVuZ3RoKS5nZXRVaW50MTYoMCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMyAvKiBTdGF0ZS5SRUFEX1BBWUxPQUQgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlID09PSAyIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzY0ICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbExlbmd0aChjaHVua3MpIDwgOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyQXJyYXkgPSBjb25jYXRDaHVua3MoY2h1bmtzLCA4KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXJBcnJheS5idWZmZXIsIGhlYWRlckFycmF5LmJ5dGVPZmZzZXQsIGhlYWRlckFycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG4gPSB2aWV3LmdldFVpbnQzMigwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gPiBNYXRoLnBvdygyLCA1MyAtIDMyKSAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBtYXhpbXVtIHNhZmUgaW50ZWdlciBpbiBKYXZhU2NyaXB0IGlzIDJeNTMgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoRVJST1JfUEFDS0VUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkTGVuZ3RoID0gbiAqIE1hdGgucG93KDIsIDMyKSArIHZpZXcuZ2V0VWludDMyKDQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDMgLyogU3RhdGUuUkVBRF9QQVlMT0FEICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsTGVuZ3RoKGNodW5rcykgPCBleHBlY3RlZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGNvbmNhdENodW5rcyhjaHVua3MsIGV4cGVjdGVkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGRlY29kZVBhY2tldChpc0JpbmFyeSA/IGRhdGEgOiBURVhUX0RFQ09ERVIuZGVjb2RlKGRhdGEpLCBiaW5hcnlUeXBlKSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMCAvKiBTdGF0ZS5SRUFEX0hFQURFUiAqLztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGV4cGVjdGVkTGVuZ3RoID09PSAwIHx8IGV4cGVjdGVkTGVuZ3RoID4gbWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoRVJST1JfUEFDS0VUKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xufVxuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gNDtcbmV4cG9ydCB7IGVuY29kZVBhY2tldCwgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGFja2V0LCBkZWNvZGVQYXlsb2FkLCB9O1xuIiwiLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICAgIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICAgIGlmICh0aGlzLmppdHRlcikge1xuICAgICAgICB2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICAgICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbiAobWluKSB7XG4gICAgdGhpcy5tcyA9IG1pbjtcbn07XG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uIChtYXgpIHtcbiAgICB0aGlzLm1heCA9IG1heDtcbn07XG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24gKGppdHRlcikge1xuICAgIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcbiIsImltcG9ydCB7IHVybCB9IGZyb20gXCIuL3VybC5qc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuL21hbmFnZXIuanNcIjtcbmltcG9ydCB7IFNvY2tldCwgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbi8qKlxuICogTWFuYWdlcnMgY2FjaGUuXG4gKi9cbmNvbnN0IGNhY2hlID0ge307XG5mdW5jdGlvbiBsb29rdXAodXJpLCBvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgdXJpID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBjb25zdCBwYXJzZWQgPSB1cmwodXJpLCBvcHRzLnBhdGggfHwgXCIvc29ja2V0LmlvXCIpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gICAgY29uc3QgaWQgPSBwYXJzZWQuaWQ7XG4gICAgY29uc3QgcGF0aCA9IHBhcnNlZC5wYXRoO1xuICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF1bXCJuc3BzXCJdO1xuICAgIGNvbnN0IG5ld0Nvbm5lY3Rpb24gPSBvcHRzLmZvcmNlTmV3IHx8XG4gICAgICAgIG9wdHNbXCJmb3JjZSBuZXcgY29ubmVjdGlvblwiXSB8fFxuICAgICAgICBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHxcbiAgICAgICAgc2FtZU5hbWVzcGFjZTtcbiAgICBsZXQgaW87XG4gICAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICAgICAgaW8gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgICAgICAgIGNhY2hlW2lkXSA9IG5ldyBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaW8gPSBjYWNoZVtpZF07XG4gICAgfVxuICAgIGlmIChwYXJzZWQucXVlcnkgJiYgIW9wdHMucXVlcnkpIHtcbiAgICAgICAgb3B0cy5xdWVyeSA9IHBhcnNlZC5xdWVyeUtleTtcbiAgICB9XG4gICAgcmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCwgb3B0cyk7XG59XG4vLyBzbyB0aGF0IFwibG9va3VwXCIgY2FuIGJlIHVzZWQgYm90aCBhcyBhIGZ1bmN0aW9uIChlLmcuIGBpbyguLi4pYCkgYW5kIGFzIGFcbi8vIG5hbWVzcGFjZSAoZS5nLiBgaW8uY29ubmVjdCguLi4pYCksIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5PYmplY3QuYXNzaWduKGxvb2t1cCwge1xuICAgIE1hbmFnZXIsXG4gICAgU29ja2V0LFxuICAgIGlvOiBsb29rdXAsXG4gICAgY29ubmVjdDogbG9va3VwLFxufSk7XG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgeyBwcm90b2NvbCB9IGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG4vKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgeyBNYW5hZ2VyLCBTb2NrZXQsIGxvb2t1cCBhcyBpbywgbG9va3VwIGFzIGNvbm5lY3QsIGxvb2t1cCBhcyBkZWZhdWx0LCB9O1xuZXhwb3J0IHsgRmV0Y2gsIE5vZGVYSFIsIFhIUiwgTm9kZVdlYlNvY2tldCwgV2ViU29ja2V0LCBXZWJUcmFuc3BvcnQsIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbiIsImltcG9ydCB7IFNvY2tldCBhcyBFbmdpbmUsIGluc3RhbGxUaW1lckZ1bmN0aW9ucywgbmV4dFRpY2ssIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0ICogYXMgcGFyc2VyIGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBvbiB9IGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgeyBCYWNrb2ZmIH0gZnJvbSBcIi4vY29udHJpYi9iYWNrbzIuanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIsIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmV4cG9ydCBjbGFzcyBNYW5hZ2VyIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uc3BzID0ge307XG4gICAgICAgIHRoaXMuc3VicyA9IFtdO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIG9wdHMucGF0aCA9IG9wdHMucGF0aCB8fCBcIi9zb2NrZXQuaW9cIjtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgICAgICAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKChfYSA9IG9wdHMucmFuZG9taXphdGlvbkZhY3RvcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMC41KTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe1xuICAgICAgICAgICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgICAgICAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICAgICAgICAgIGppdHRlcjogdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgY29uc3QgX3BhcnNlciA9IG9wdHMucGFyc2VyIHx8IHBhcnNlcjtcbiAgICAgICAgdGhpcy5lbmNvZGVyID0gbmV3IF9wYXJzZXIuRW5jb2RlcigpO1xuICAgICAgICB0aGlzLmRlY29kZXIgPSBuZXcgX3BhcnNlci5EZWNvZGVyKCk7XG4gICAgICAgIHRoaXMuX2F1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvQ29ubmVjdClcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb24odikge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uQXR0ZW1wdHModikge1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheSh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNaW4odik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByYW5kb21pemF0aW9uRmFjdG9yKHYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7XG4gICAgICAgIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRKaXR0ZXIodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheU1heCh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNYXgodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aW1lb3V0KHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gICAgICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG1heWJlUmVjb25uZWN0T25PcGVuKCkge1xuICAgICAgICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gICAgICAgIGlmICghdGhpcy5fcmVjb25uZWN0aW5nICYmXG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgICAgICAgICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gb3B0aW9uYWwsIGNhbGxiYWNrXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oZm4pIHtcbiAgICAgICAgaWYgKH50aGlzLl9yZWFkeVN0YXRlLmluZGV4T2YoXCJvcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuICAgICAgICAvLyBlbWl0IGBvcGVuYFxuICAgICAgICBjb25zdCBvcGVuU3ViRGVzdHJveSA9IG9uKHNvY2tldCwgXCJvcGVuXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25vcGVuKCk7XG4gICAgICAgICAgICBmbiAmJiBmbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb25FcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgICB0aGlzLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCBvbkVycm9yKTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcInRpbWVvdXRcIikpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnMucHVzaChvcGVuU3ViRGVzdHJveSk7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBvcGVuKClcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KGZuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4oZm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICAvLyBjbGVhciBvbGQgc3Vic1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgLy8gbWFyayBhcyBvcGVuXG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgICAgICAvLyBhZGQgbmV3IHN1YnNcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgXCJwaW5nXCIsIHRoaXMub25waW5nLmJpbmQodGhpcykpLCBvbihzb2NrZXQsIFwiZGF0YVwiLCB0aGlzLm9uZGF0YS5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSwgXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb24odGhpcy5kZWNvZGVyLCBcImRlY29kZWRcIiwgdGhpcy5vbmRlY29kZWQuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHBpbmcuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGluZygpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRhdGEoZGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwicGFyc2UgZXJyb3JcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGVjb2RlZChwYWNrZXQpIHtcbiAgICAgICAgLy8gdGhlIG5leHRUaWNrIGNhbGwgcHJldmVudHMgYW4gZXhjZXB0aW9uIGluIGEgdXNlci1wcm92aWRlZCBldmVudCBsaXN0ZW5lciBmcm9tIHRyaWdnZXJpbmcgYSBkaXNjb25uZWN0aW9uIGR1ZSB0byBhIFwicGFyc2UgZXJyb3JcIlxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb2NrZXQobnNwLCBvcHRzKSB7XG4gICAgICAgIGxldCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2F1dG9Db25uZWN0ICYmICFzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICBzb2NrZXQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc3Ryb3koc29ja2V0KSB7XG4gICAgICAgIGNvbnN0IG5zcHMgPSBPYmplY3Qua2V5cyh0aGlzLm5zcHMpO1xuICAgICAgICBmb3IgKGNvbnN0IG5zcCBvZiBuc3BzKSB7XG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW46XG4gICAgICpcbiAgICAgKiAtIHRoZSBsb3ctbGV2ZWwgZW5naW5lIGlzIGNsb3NlZFxuICAgICAqIC0gdGhlIHBhcnNlciBlbmNvdW50ZXJlZCBhIGJhZGx5IGZvcm1hdHRlZCBwYWNrZXRcbiAgICAgKiAtIGFsbCBzb2NrZXRzIGFyZSBkaXNjb25uZWN0ZWRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIChfYSA9IHRoaXMuZW5naW5lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9mYWlsZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucmVjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0XCIsIGF0dGVtcHQpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBvbihvYmosIGV2LCBmbikge1xuICAgIG9iai5vbihldiwgZm4pO1xuICAgIHJldHVybiBmdW5jdGlvbiBzdWJEZXN0cm95KCkge1xuICAgICAgICBvYmoub2ZmKGV2LCBmbik7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFBhY2tldFR5cGUgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG4vKipcbiAqIEEgU29ja2V0IGlzIHRoZSBmdW5kYW1lbnRhbCBjbGFzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgc2VydmVyLlxuICpcbiAqIEEgU29ja2V0IGJlbG9uZ3MgdG8gYSBjZXJ0YWluIE5hbWVzcGFjZSAoYnkgZGVmYXVsdCAvKSBhbmQgdXNlcyBhbiB1bmRlcmx5aW5nIHtAbGluayBNYW5hZ2VyfSB0byBjb21tdW5pY2F0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAqXG4gKiBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAqICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XG4gKiB9KTtcbiAqXG4gKiAvLyBzZW5kIGFuIGV2ZW50IHRvIHRoZSBzZXJ2ZXJcbiAqIHNvY2tldC5lbWl0KFwiZm9vXCIsIFwiYmFyXCIpO1xuICpcbiAqIHNvY2tldC5vbihcImZvb2JhclwiLCAoKSA9PiB7XG4gKiAgIC8vIGFuIGV2ZW50IHdhcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXJcbiAqIH0pO1xuICpcbiAqIC8vIHVwb24gZGlzY29ubmVjdGlvblxuICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKGBkaXNjb25uZWN0ZWQgZHVlIHRvICR7cmVhc29ufWApO1xuICogfSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbywgbnNwLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBzb2NrZXQgaXMgY3VycmVudGx5IGNvbm5lY3RlZCB0byB0aGUgc2VydmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAgICAgKlxuICAgICAgICAgKiBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAgICAgICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuY29ubmVjdGVkKTsgLy8gdHJ1ZVxuICAgICAgICAgKiB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmNvbm5lY3RlZCk7IC8vIGZhbHNlXG4gICAgICAgICAqIH0pO1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIGNvbm5lY3Rpb24gc3RhdGUgd2FzIHJlY292ZXJlZCBhZnRlciBhIHRlbXBvcmFyeSBkaXNjb25uZWN0aW9uLiBJbiB0aGF0IGNhc2UsIGFueSBtaXNzZWQgcGFja2V0cyB3aWxsXG4gICAgICAgICAqIGJlIHRyYW5zbWl0dGVkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY292ZXJlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnVmZmVyIGZvciBwYWNrZXRzIHJlY2VpdmVkIGJlZm9yZSB0aGUgQ09OTkVDVCBwYWNrZXRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnVmZmVyIGZvciBwYWNrZXRzIHRoYXQgd2lsbCBiZSBzZW50IG9uY2UgdGhlIHNvY2tldCBpcyBjb25uZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHF1ZXVlIG9mIHBhY2tldHMgdG8gYmUgc2VudCB3aXRoIHJldHJ5IGluIGNhc2Ugb2YgZmFpbHVyZS5cbiAgICAgICAgICpcbiAgICAgICAgICogUGFja2V0cyBhcmUgc2VudCBvbmUgYnkgb25lLCBlYWNoIHdhaXRpbmcgZm9yIHRoZSBzZXJ2ZXIgYWNrbm93bGVkZ2VtZW50LCBpbiBvcmRlciB0byBndWFyYW50ZWUgdGhlIGRlbGl2ZXJ5IG9yZGVyLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcXVldWUgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc2VxdWVuY2UgdG8gZ2VuZXJhdGUgdGhlIElEIG9mIHRoZSB7QGxpbmsgUXVldWVkUGFja2V0fS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3F1ZXVlU2VxID0gMDtcbiAgICAgICAgdGhpcy5pZHMgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBtYXAgY29udGFpbmluZyBhY2tub3dsZWRnZW1lbnQgaGFuZGxlcnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBgd2l0aEVycm9yYCBhdHRyaWJ1dGUgaXMgdXNlZCB0byBkaWZmZXJlbnRpYXRlIGhhbmRsZXJzIHRoYXQgYWNjZXB0IGFuIGVycm9yIGFzIGZpcnN0IGFyZ3VtZW50OlxuICAgICAgICAgKlxuICAgICAgICAgKiAtIGBzb2NrZXQuZW1pdChcInRlc3RcIiwgKGVyciwgdmFsdWUpID0+IHsgLi4uIH0pYCB3aXRoIGBhY2tUaW1lb3V0YCBvcHRpb25cbiAgICAgICAgICogLSBgc29ja2V0LnRpbWVvdXQoNTAwMCkuZW1pdChcInRlc3RcIiwgKGVyciwgdmFsdWUpID0+IHsgLi4uIH0pYFxuICAgICAgICAgKiAtIGBjb25zdCB2YWx1ZSA9IGF3YWl0IHNvY2tldC5lbWl0V2l0aEFjayhcInRlc3RcIilgXG4gICAgICAgICAqXG4gICAgICAgICAqIEZyb20gdGhvc2UgdGhhdCBkb24ndDpcbiAgICAgICAgICpcbiAgICAgICAgICogLSBgc29ja2V0LmVtaXQoXCJ0ZXN0XCIsICh2YWx1ZSkgPT4geyAuLi4gfSk7YFxuICAgICAgICAgKlxuICAgICAgICAgKiBJbiB0aGUgZmlyc3QgY2FzZSwgdGhlIGhhbmRsZXJzIHdpbGwgYmUgY2FsbGVkIHdpdGggYW4gZXJyb3Igd2hlbjpcbiAgICAgICAgICpcbiAgICAgICAgICogLSB0aGUgdGltZW91dCBpcyByZWFjaGVkXG4gICAgICAgICAqIC0gdGhlIHNvY2tldCBnZXRzIGRpc2Nvbm5lY3RlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBJbiB0aGUgc2Vjb25kIGNhc2UsIHRoZSBoYW5kbGVycyB3aWxsIGJlIHNpbXBseSBkaXNjYXJkZWQgdXBvbiBkaXNjb25uZWN0aW9uLCBzaW5jZSB0aGUgY2xpZW50IHdpbGwgbmV2ZXIgcmVjZWl2ZVxuICAgICAgICAgKiBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5pby5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgc29ja2V0IGlzIGN1cnJlbnRseSBkaXNjb25uZWN0ZWRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImNvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmRpc2Nvbm5lY3RlZCk7IC8vIGZhbHNlXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQub24oXCJkaXNjb25uZWN0XCIsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5kaXNjb25uZWN0ZWQpOyAvLyB0cnVlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZ2V0IGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbm5lY3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbihpbywgXCJvcGVuXCIsIHRoaXMub25vcGVuLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIFNvY2tldCB3aWxsIHRyeSB0byByZWNvbm5lY3Qgd2hlbiBpdHMgTWFuYWdlciBjb25uZWN0cyBvciByZWNvbm5lY3RzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAqXG4gICAgICogY29uc29sZS5sb2coc29ja2V0LmFjdGl2ZSk7IC8vIHRydWVcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKHJlYXNvbikgPT4ge1xuICAgICAqICAgaWYgKHJlYXNvbiA9PT0gXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKSB7XG4gICAgICogICAgIC8vIHRoZSBkaXNjb25uZWN0aW9uIHdhcyBpbml0aWF0ZWQgYnkgdGhlIHNlcnZlciwgeW91IG5lZWQgdG8gbWFudWFsbHkgcmVjb25uZWN0XG4gICAgICogICAgIGNvbnNvbGUubG9nKHNvY2tldC5hY3RpdmUpOyAvLyBmYWxzZVxuICAgICAqICAgfVxuICAgICAqICAgLy8gZWxzZSB0aGUgc29ja2V0IHdpbGwgYXV0b21hdGljYWxseSB0cnkgdG8gcmVjb25uZWN0XG4gICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuYWN0aXZlKTsgLy8gdHJ1ZVxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGdldCBhY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3VicztcbiAgICB9XG4gICAgLyoqXG4gICAgICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKHtcbiAgICAgKiAgIGF1dG9Db25uZWN0OiBmYWxzZVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogc29ja2V0LmNvbm5lY3QoKTtcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlvW1wiX3JlY29ubmVjdGluZ1wiXSlcbiAgICAgICAgICAgIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMuaW8uX3JlYWR5U3RhdGUpXG4gICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBjb25uZWN0KCl9LlxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBtaW1pY3MgdGhlIFdlYlNvY2tldC5zZW5kKCkgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0L3NlbmRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnNlbmQoXCJoZWxsb1wiKTtcbiAgICAgKlxuICAgICAqIC8vIHRoaXMgaXMgZXF1aXZhbGVudCB0b1xuICAgICAqIHNvY2tldC5lbWl0KFwibWVzc2FnZVwiLCBcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgc2VuZCguLi5hcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGBlbWl0YC5cbiAgICAgKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCBcIndvcmxkXCIpO1xuICAgICAqXG4gICAgICogLy8gYWxsIHNlcmlhbGl6YWJsZSBkYXRhc3RydWN0dXJlcyBhcmUgc3VwcG9ydGVkIChubyBuZWVkIHRvIGNhbGwgSlNPTi5zdHJpbmdpZnkpXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCAxLCBcIjJcIiwgeyAzOiBbXCI0XCJdLCA1OiBVaW50OEFycmF5LmZyb20oWzZdKSB9KTtcbiAgICAgKlxuICAgICAqIC8vIHdpdGggYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlclxuICAgICAqIHNvY2tldC5lbWl0KFwiaGVsbG9cIiwgXCJ3b3JsZFwiLCAodmFsKSA9PiB7XG4gICAgICogICAvLyAuLi5cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGVtaXQoZXYsIC4uLmFyZ3MpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGlmIChSRVNFUlZFRF9FVkVOVFMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGV2LnRvU3RyaW5nKCkgKyAnXCIgaXMgYSByZXNlcnZlZCBldmVudCBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncy51bnNoaWZ0KGV2KTtcbiAgICAgICAgaWYgKHRoaXMuX29wdHMucmV0cmllcyAmJiAhdGhpcy5mbGFncy5mcm9tUXVldWUgJiYgIXRoaXMuZmxhZ3Mudm9sYXRpbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFRvUXVldWUoYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkVWRU5ULFxuICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgfTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSB0aGlzLmZsYWdzLmNvbXByZXNzICE9PSBmYWxzZTtcbiAgICAgICAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5pZHMrKztcbiAgICAgICAgICAgIGNvbnN0IGFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckFja0NhbGxiYWNrKGlkLCBhY2spO1xuICAgICAgICAgICAgcGFja2V0LmlkID0gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNUcmFuc3BvcnRXcml0YWJsZSA9IChfYiA9IChfYSA9IHRoaXMuaW8uZW5naW5lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHJhbnNwb3J0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gdGhpcy5jb25uZWN0ZWQgJiYgISgoX2MgPSB0aGlzLmlvLmVuZ2luZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLl9oYXNQaW5nRXhwaXJlZCgpKTtcbiAgICAgICAgY29uc3QgZGlzY2FyZFBhY2tldCA9IHRoaXMuZmxhZ3Mudm9sYXRpbGUgJiYgIWlzVHJhbnNwb3J0V3JpdGFibGU7XG4gICAgICAgIGlmIChkaXNjYXJkUGFja2V0KSB7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KTtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHBhY2tldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlZ2lzdGVyQWNrQ2FsbGJhY2soaWQsIGFjaykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHRpbWVvdXQgPSAoX2EgPSB0aGlzLmZsYWdzLnRpbWVvdXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX29wdHMuYWNrVGltZW91dDtcbiAgICAgICAgaWYgKHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hY2tzW2lkXSA9IGFjaztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5pby5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1tpZF07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbmRCdWZmZXJbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNrLmNhbGwodGhpcywgbmV3IEVycm9yKFwib3BlcmF0aW9uIGhhcyB0aW1lZCBvdXRcIikpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgY29uc3QgZm4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5pby5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICBhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIGZuLndpdGhFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuYWNrc1tpZF0gPSBmbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgYW5kIHdhaXRzIGZvciBhbiBhY2tub3dsZWRnZW1lbnRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gd2l0aG91dCB0aW1lb3V0XG4gICAgICogY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2NrZXQuZW1pdFdpdGhBY2soXCJoZWxsb1wiLCBcIndvcmxkXCIpO1xuICAgICAqXG4gICAgICogLy8gd2l0aCBhIHNwZWNpZmljIHRpbWVvdXRcbiAgICAgKiB0cnkge1xuICAgICAqICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2NrZXQudGltZW91dCgxMDAwKS5lbWl0V2l0aEFjayhcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICogfSBjYXRjaCAoZXJyKSB7XG4gICAgICogICAvLyB0aGUgc2VydmVyIGRpZCBub3QgYWNrbm93bGVkZ2UgdGhlIGV2ZW50IGluIHRoZSBnaXZlbiBkZWxheVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc2VydmVyIGFja25vd2xlZGdlcyB0aGUgZXZlbnRcbiAgICAgKi9cbiAgICBlbWl0V2l0aEFjayhldiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm4gPSAoYXJnMSwgYXJnMikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmcxID8gcmVqZWN0KGFyZzEpIDogcmVzb2x2ZShhcmcyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmbi53aXRoRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgYXJncy5wdXNoKGZuKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChldiwgLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHBhY2tldCB0byB0aGUgcXVldWUuXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb1F1ZXVlKGFyZ3MpIHtcbiAgICAgICAgbGV0IGFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5fcXVldWVTZXErKyxcbiAgICAgICAgICAgIHRyeUNvdW50OiAwLFxuICAgICAgICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgZmxhZ3M6IE9iamVjdC5hc3NpZ24oeyBmcm9tUXVldWU6IHRydWUgfSwgdGhpcy5mbGFncyksXG4gICAgICAgIH07XG4gICAgICAgIGFyZ3MucHVzaCgoZXJyLCAuLi5yZXNwb25zZUFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmIChwYWNrZXQgIT09IHRoaXMuX3F1ZXVlWzBdKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBoYXNFcnJvciA9IGVyciAhPT0gbnVsbDtcbiAgICAgICAgICAgIGlmIChoYXNFcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQudHJ5Q291bnQgPiB0aGlzLl9vcHRzLnJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgYWNrKG51bGwsIC4uLnJlc3BvbnNlQXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFja2V0LnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kcmFpblF1ZXVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9xdWV1ZS5wdXNoKHBhY2tldCk7XG4gICAgICAgIHRoaXMuX2RyYWluUXVldWUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCB0aGUgZmlyc3QgcGFja2V0IG9mIHRoZSBxdWV1ZSwgYW5kIHdhaXQgZm9yIGFuIGFja25vd2xlZGdlbWVudCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIGZvcmNlIC0gd2hldGhlciB0byByZXNlbmQgYSBwYWNrZXQgdGhhdCBoYXMgbm90IGJlZW4gYWNrbm93bGVkZ2VkIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZHJhaW5RdWV1ZShmb3JjZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQgfHwgdGhpcy5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFja2V0ID0gdGhpcy5fcXVldWVbMF07XG4gICAgICAgIGlmIChwYWNrZXQucGVuZGluZyAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwYWNrZXQucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHBhY2tldC50cnlDb3VudCsrO1xuICAgICAgICB0aGlzLmZsYWdzID0gcGFja2V0LmZsYWdzO1xuICAgICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgcGFja2V0LmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRDb25uZWN0UGFja2V0KGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZW5kQ29ubmVjdFBhY2tldCh0aGlzLmF1dGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgQ09OTkVDVCBwYWNrZXQgdG8gaW5pdGlhdGUgdGhlIFNvY2tldC5JTyBzZXNzaW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zZW5kQ29ubmVjdFBhY2tldChkYXRhKSB7XG4gICAgICAgIHRoaXMucGFja2V0KHtcbiAgICAgICAgICAgIHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuX3BpZFxuICAgICAgICAgICAgICAgID8gT2JqZWN0LmFzc2lnbih7IHBpZDogdGhpcy5fcGlkLCBvZmZzZXQ6IHRoaXMuX2xhc3RPZmZzZXQgfSwgZGF0YSlcbiAgICAgICAgICAgICAgICA6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgb3IgbWFuYWdlciBgZXJyb3JgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVyclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZGlzY29ubmVjdFwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5fY2xlYXJBY2tzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgYWNrbm93bGVkZ2VtZW50IGhhbmRsZXJzIHVwb24gZGlzY29ubmVjdGlvbiwgc2luY2UgdGhlIGNsaWVudCB3aWxsIG5ldmVyIHJlY2VpdmUgYW4gYWNrbm93bGVkZ2VtZW50IGZyb21cbiAgICAgKiB0aGUgc2VydmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2xlYXJBY2tzKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmFja3MpLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0J1ZmZlcmVkID0gdGhpcy5zZW5kQnVmZmVyLnNvbWUoKHBhY2tldCkgPT4gU3RyaW5nKHBhY2tldC5pZCkgPT09IGlkKTtcbiAgICAgICAgICAgIGlmICghaXNCdWZmZXJlZCkge1xuICAgICAgICAgICAgICAgIC8vIG5vdGU6IGhhbmRsZXJzIHRoYXQgZG8gbm90IGFjY2VwdCBhbiBlcnJvciBhcyBmaXJzdCBhcmd1bWVudCBhcmUgaWdub3JlZCBoZXJlXG4gICAgICAgICAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgICAgICBpZiAoYWNrLndpdGhFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBhY2suY2FsbCh0aGlzLCBuZXcgRXJyb3IoXCJzb2NrZXQgaGFzIGJlZW4gZGlzY29ubmVjdGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25jb25uZWN0KHBhY2tldC5kYXRhLnNpZCwgcGFja2V0LmRhdGEucGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBuZXcgRXJyb3IoXCJJdCBzZWVtcyB5b3UgYXJlIHRyeWluZyB0byByZWFjaCBhIFNvY2tldC5JTyBzZXJ2ZXIgaW4gdjIueCB3aXRoIGEgdjMueCBjbGllbnQsIGJ1dCB0aGV5IGFyZSBub3QgY29tcGF0aWJsZSAobW9yZSBpbmZvcm1hdGlvbiBoZXJlOiBodHRwczovL3NvY2tldC5pby9kb2NzL3YzL21pZ3JhdGluZy1mcm9tLTIteC10by0zLTAvKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkVWRU5UOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKHBhY2tldC5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGVyci5kYXRhID0gcGFja2V0LmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZXZlbnQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKE9iamVjdC5mcmVlemUoYXJncykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVtaXRFdmVudChhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlMaXN0ZW5lcnMgJiYgdGhpcy5fYW55TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGlmICh0aGlzLl9waWQgJiYgYXJncy5sZW5ndGggJiYgdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fbGFzdE9mZnNldCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhY2soaWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBzZW50ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAoc2VudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkFDSyxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWRnZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmFjayhwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIGlmICh0eXBlb2YgYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgRklYTUUgYWNrIGlzIGluY29ycmVjdGx5IGluZmVycmVkIGFzICduZXZlcidcbiAgICAgICAgaWYgKGFjay53aXRoRXJyb3IpIHtcbiAgICAgICAgICAgIHBhY2tldC5kYXRhLnVuc2hpZnQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhY2suYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jb25uZWN0KGlkLCBwaWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnJlY292ZXJlZCA9IHBpZCAmJiB0aGlzLl9waWQgPT09IHBpZDtcbiAgICAgICAgdGhpcy5fcGlkID0gcGlkOyAvLyBkZWZpbmVkIG9ubHkgaWYgY29ubmVjdGlvbiBzdGF0ZSByZWNvdmVyeSBpcyBlbmFibGVkXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbiAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSh0cnVlKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBlbWl0QnVmZmVyZWQoKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5mb3JFYWNoKChhcmdzKSA9PiB0aGlzLmVtaXRFdmVudChhcmdzKSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgocGFja2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICAgICAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICAgICAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICAgICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICAgICAgdGhpcy5zdWJzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW9bXCJfZGVzdHJveVwiXSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS4gSW4gdGhhdCBjYXNlLCB0aGUgc29ja2V0IHdpbGwgbm90IHRyeSB0byByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIGlzIHRoZSBsYXN0IGFjdGl2ZSBTb2NrZXQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBNYW5hZ2VyfSwgdGhlIGxvdy1sZXZlbCBjb25uZWN0aW9uIHdpbGwgYmUgY2xvc2VkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gICAgICogICAvLyBjb25zb2xlLmxvZyhyZWFzb24pOyBwcmludHMgXCJpbyBjbGllbnQgZGlzY29ubmVjdFwiXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuRElTQ09OTkVDVCB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gY2xpZW50IGRpc2Nvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgZGlzY29ubmVjdCgpfS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5jb21wcmVzcyhmYWxzZSkuZW1pdChcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogQHBhcmFtIGNvbXByZXNzIC0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBjb21wcmVzcyhjb21wcmVzcykge1xuICAgICAgICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBldmVudCBtZXNzYWdlIHdpbGwgYmUgZHJvcHBlZCB3aGVuIHRoaXMgc29ja2V0IGlzIG5vdFxuICAgICAqIHJlYWR5IHRvIHNlbmQgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC52b2xhdGlsZS5lbWl0KFwiaGVsbG9cIik7IC8vIHRoZSBzZXJ2ZXIgbWF5IG9yIG1heSBub3QgcmVjZWl2ZSBpdFxuICAgICAqXG4gICAgICogQHJldHVybnMgc2VsZlxuICAgICAqL1xuICAgIGdldCB2b2xhdGlsZSgpIHtcbiAgICAgICAgdGhpcy5mbGFncy52b2xhdGlsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW4gdGhlXG4gICAgICogZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgd2l0aG91dCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyOlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQudGltZW91dCg1MDAwKS5lbWl0KFwibXktZXZlbnRcIiwgKGVycikgPT4ge1xuICAgICAqICAgaWYgKGVycikge1xuICAgICAqICAgICAvLyB0aGUgc2VydmVyIGRpZCBub3QgYWNrbm93bGVkZ2UgdGhlIGV2ZW50IGluIHRoZSBnaXZlbiBkZWxheVxuICAgICAqICAgfVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHJldHVybnMgc2VsZlxuICAgICAqL1xuICAgIHRpbWVvdXQodGltZW91dCkge1xuICAgICAgICB0aGlzLmZsYWdzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQub25BbnkoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgZ290ICR7ZXZlbnR9YCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBvbkFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnByZXBlbmRBbnkoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgZ290IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcmVwZW5kQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGNhdGNoQWxsTGlzdGVuZXIgPSAoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBnb3QgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBzb2NrZXQub25BbnkoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyByZW1vdmUgYSBzcGVjaWZpYyBsaXN0ZW5lclxuICAgICAqIHNvY2tldC5vZmZBbnkoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyBvciByZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqIHNvY2tldC5vZmZBbnkoKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIG9mZkFueShsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueUxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogTm90ZTogYWNrbm93bGVkZ2VtZW50cyBzZW50IHRvIHRoZSBzZXJ2ZXIgYXJlIG5vdCBpbmNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgc2VudCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgb25BbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIE5vdGU6IGFja25vd2xlZGdlbWVudHMgc2VudCB0byB0aGUgc2VydmVyIGFyZSBub3QgaW5jbHVkZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgc2VudCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgcHJlcGVuZEFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGNhdGNoQWxsTGlzdGVuZXIgPSAoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBzZW50IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyByZW1vdmUgYSBzcGVjaWZpYyBsaXN0ZW5lclxuICAgICAqIHNvY2tldC5vZmZBbnlPdXRnb2luZyhjYXRjaEFsbExpc3RlbmVyKTtcbiAgICAgKlxuICAgICAqIC8vIG9yIHJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICogc29ja2V0Lm9mZkFueU91dGdvaW5nKCk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gW2xpc3RlbmVyXSAtIHRoZSBjYXRjaC1hbGwgbGlzdGVuZXIgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIG9mZkFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55T3V0Z29pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggcGFja2V0IHNlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyAmJiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbi8qKlxuICogVVJMIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0gdXJpIC0gdXJsXG4gKiBAcGFyYW0gcGF0aCAtIHRoZSByZXF1ZXN0IHBhdGggb2YgdGhlIGNvbm5lY3Rpb25cbiAqIEBwYXJhbSBsb2MgLSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxuICogICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVybCh1cmksIHBhdGggPSBcIlwiLCBsb2MpIHtcbiAgICBsZXQgb2JqID0gdXJpO1xuICAgIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gICAgbG9jID0gbG9jIHx8ICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24pO1xuICAgIGlmIChudWxsID09IHVyaSlcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgbG9jLmhvc3Q7XG4gICAgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMSkpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBsb2MpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBcImh0dHBzOi8vXCIgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGFyc2VcbiAgICAgICAgb2JqID0gcGFyc2UodXJpKTtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gICAgaWYgKCFvYmoucG9ydCkge1xuICAgICAgICBpZiAoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI4MFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjQ0M1wiO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9iai5wYXRoID0gb2JqLnBhdGggfHwgXCIvXCI7XG4gICAgY29uc3QgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoXCI6XCIpICE9PSAtMTtcbiAgICBjb25zdCBob3N0ID0gaXB2NiA/IFwiW1wiICsgb2JqLmhvc3QgKyBcIl1cIiA6IG9iai5ob3N0O1xuICAgIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyBcIjovL1wiICsgaG9zdCArIFwiOlwiICsgb2JqLnBvcnQgKyBwYXRoO1xuICAgIC8vIGRlZmluZSBocmVmXG4gICAgb2JqLmhyZWYgPVxuICAgICAgICBvYmoucHJvdG9jb2wgK1xuICAgICAgICAgICAgXCI6Ly9cIiArXG4gICAgICAgICAgICBob3N0ICtcbiAgICAgICAgICAgIChsb2MgJiYgbG9jLnBvcnQgPT09IG9iai5wb3J0ID8gXCJcIiA6IFwiOlwiICsgb2JqLnBvcnQpO1xuICAgIHJldHVybiBvYmo7XG59XG4iLCJpbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGaWxlIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbnN0cnVjdFBhY2tldChwYWNrZXQpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG4gICAgY29uc3QgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICAgIGNvbnN0IHBhY2sgPSBwYWNrZXQ7XG4gICAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG59XG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycywgdG9KU09OKSB7XG4gICAgaWYgKCFkYXRhKVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICBpZiAoaXNCaW5hcnkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB7IF9wbGFjZWhvbGRlcjogdHJ1ZSwgbnVtOiBidWZmZXJzLmxlbmd0aCB9O1xuICAgICAgICBidWZmZXJzLnB1c2goZGF0YSk7XG4gICAgICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBjb25zdCBuZXdEYXRhID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdEYXRhW2ldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICBpZiAoZGF0YS50b0pTT04gJiYgdHlwZW9mIGRhdGEudG9KU09OID09PSBcImZ1bmN0aW9uXCIgJiYgIXRvSlNPTikge1xuICAgICAgICAgICAgcmV0dXJuIF9kZWNvbnN0cnVjdFBhY2tldChkYXRhLnRvSlNPTigpLCBidWZmZXJzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdEYXRhID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSkge1xuICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn1cbi8qKlxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LCBidWZmZXJzKSB7XG4gICAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICAgIGRlbGV0ZSBwYWNrZXQuYXR0YWNobWVudHM7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgICByZXR1cm4gcGFja2V0O1xufVxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlzSW5kZXhWYWxpZCA9IHR5cGVvZiBkYXRhLm51bSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPj0gMCAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPCBidWZmZXJzLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzSW5kZXhWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGRlY29uc3RydWN0UGFja2V0LCByZWNvbnN0cnVjdFBhY2tldCB9IGZyb20gXCIuL2JpbmFyeS5qc1wiO1xuaW1wb3J0IHsgaXNCaW5hcnksIGhhc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuaW1wb3J0IGRlYnVnTW9kdWxlIGZyb20gXCJkZWJ1Z1wiOyAvLyBkZWJ1ZygpXG5jb25zdCBkZWJ1ZyA9IGRlYnVnTW9kdWxlKFwic29ja2V0LmlvLXBhcnNlclwiKTsgLy8gZGVidWcoKVxuLyoqXG4gKiBUaGVzZSBzdHJpbmdzIG11c3Qgbm90IGJlIHVzZWQgYXMgZXZlbnQgbmFtZXMsIGFzIHRoZXkgaGF2ZSBhIHNwZWNpYWwgbWVhbmluZy5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gW1xuICAgIFwiY29ubmVjdFwiLCAvLyB1c2VkIG9uIHRoZSBjbGllbnQgc2lkZVxuICAgIFwiY29ubmVjdF9lcnJvclwiLCAvLyB1c2VkIG9uIHRoZSBjbGllbnQgc2lkZVxuICAgIFwiZGlzY29ubmVjdFwiLCAvLyB1c2VkIG9uIGJvdGggc2lkZXNcbiAgICBcImRpc2Nvbm5lY3RpbmdcIiwgLy8gdXNlZCBvbiB0aGUgc2VydmVyIHNpZGVcbiAgICBcIm5ld0xpc3RlbmVyXCIsIC8vIHVzZWQgYnkgdGhlIE5vZGUuanMgRXZlbnRFbWl0dGVyXG4gICAgXCJyZW1vdmVMaXN0ZW5lclwiLCAvLyB1c2VkIGJ5IHRoZSBOb2RlLmpzIEV2ZW50RW1pdHRlclxuXTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDU7XG5leHBvcnQgdmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUXCJdID0gMF0gPSBcIkNPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJESVNDT05ORUNUXCJdID0gMV0gPSBcIkRJU0NPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJFVkVOVFwiXSA9IDJdID0gXCJFVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkFDS1wiXSA9IDNdID0gXCJBQ0tcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUX0VSUk9SXCJdID0gNF0gPSBcIkNPTk5FQ1RfRVJST1JcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfRVZFTlRcIl0gPSA1XSA9IFwiQklOQVJZX0VWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0FDS1wiXSA9IDZdID0gXCJCSU5BUllfQUNLXCI7XG59KShQYWNrZXRUeXBlIHx8IChQYWNrZXRUeXBlID0ge30pKTtcbi8qKlxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxuICovXG5leHBvcnQgY2xhc3MgRW5jb2RlciB7XG4gICAgLyoqXG4gICAgICogRW5jb2RlciBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVwbGFjZXIgLSBjdXN0b20gcmVwbGFjZXIgdG8gcGFzcyBkb3duIHRvIEpTT04ucGFyc2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsYWNlcikge1xuICAgICAgICB0aGlzLnJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICAgICAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAgICAgKi9cbiAgICBlbmNvZGUob2JqKSB7XG4gICAgICAgIGRlYnVnKFwiZW5jb2RpbmcgcGFja2V0ICVqXCIsIG9iaik7XG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVCB8fCBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5BQ0spIHtcbiAgICAgICAgICAgIGlmIChoYXNCaW5hcnkob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZUFzQmluYXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gUGFja2V0VHlwZS5CSU5BUllfRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogUGFja2V0VHlwZS5CSU5BUllfQUNLLFxuICAgICAgICAgICAgICAgICAgICBuc3A6IG9iai5uc3AsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9iai5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBpZDogb2JqLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdGhpcy5lbmNvZGVBc1N0cmluZyhvYmopXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gICAgICovXG4gICAgZW5jb2RlQXNTdHJpbmcob2JqKSB7XG4gICAgICAgIC8vIGZpcnN0IGlzIHR5cGVcbiAgICAgICAgbGV0IHN0ciA9IFwiXCIgKyBvYmoudHlwZTtcbiAgICAgICAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIG9iai50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyBcIi1cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gICAgICAgIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICAgICAgICBpZiAob2JqLm5zcCAmJiBcIi9cIiAhPT0gb2JqLm5zcCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5uc3AgKyBcIixcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGpzb24gZGF0YVxuICAgICAgICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgICAgICAgICAgc3RyICs9IEpTT04uc3RyaW5naWZ5KG9iai5kYXRhLCB0aGlzLnJlcGxhY2VyKTtcbiAgICAgICAgfVxuICAgICAgICBkZWJ1ZyhcImVuY29kZWQgJWogYXMgJXNcIiwgb2JqLCBzdHIpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAgICAgKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXG4gICAgICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gICAgICovXG4gICAgZW5jb2RlQXNCaW5hcnkob2JqKSB7XG4gICAgICAgIGNvbnN0IGRlY29uc3RydWN0aW9uID0gZGVjb25zdHJ1Y3RQYWNrZXQob2JqKTtcbiAgICAgICAgY29uc3QgcGFjayA9IHRoaXMuZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTtcbiAgICAgICAgY29uc3QgYnVmZmVycyA9IGRlY29uc3RydWN0aW9uLmJ1ZmZlcnM7XG4gICAgICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcnM7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xuICAgIH1cbn1cbi8qKlxuICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVjb2RlclxuICovXG5leHBvcnQgY2xhc3MgRGVjb2RlciBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIERlY29kZXIgY29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcmV2aXZlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbWF4QXR0YWNobWVudHM6IDEwLFxuICAgICAgICB9LCB0eXBlb2Ygb3B0cyA9PT0gXCJmdW5jdGlvblwiID8geyByZXZpdmVyOiBvcHRzIH0gOiBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhbiBlbmNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICAgICAqL1xuICAgIGFkZChvYmopIHtcbiAgICAgICAgbGV0IHBhY2tldDtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgcGxhaW50ZXh0IGRhdGEgd2hlbiByZWNvbnN0cnVjdGluZyBhIHBhY2tldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhY2tldCA9IHRoaXMuZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBjb25zdCBpc0JpbmFyeUV2ZW50ID0gcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UO1xuICAgICAgICAgICAgaWYgKGlzQmluYXJ5RXZlbnQgfHwgcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgICAgIHBhY2tldC50eXBlID0gaXNCaW5hcnlFdmVudCA/IFBhY2tldFR5cGUuRVZFTlQgOiBQYWNrZXRUeXBlLkFDSztcbiAgICAgICAgICAgICAgICAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQmluYXJ5KG9iaikgfHwgb2JqLmJhc2U2NCkge1xuICAgICAgICAgICAgLy8gcmF3IGJpbmFyeSBkYXRhXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHR5cGU6IFwiICsgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAgICAgKi9cbiAgICBkZWNvZGVTdHJpbmcoc3RyKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgLy8gbG9vayB1cCB0eXBlXG4gICAgICAgIGNvbnN0IHAgPSB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIoc3RyLmNoYXJBdCgwKSksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChQYWNrZXRUeXBlW3AudHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biBwYWNrZXQgdHlwZSBcIiArIHAudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICAgICAgICBpZiAocC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVCB8fFxuICAgICAgICAgICAgcC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9PSBcIi1cIiAmJiBpICE9IHN0ci5sZW5ndGgpIHsgfVxuICAgICAgICAgICAgY29uc3QgYnVmID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgICAgICBpZiAoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBhdHRhY2htZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG4gPSBOdW1iZXIoYnVmKTtcbiAgICAgICAgICAgIGlmICghaXNJbnRlZ2VyKG4pIHx8IG4gPCAxKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBhdHRhY2htZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG4gPiB0aGlzLm9wdHMubWF4QXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbWFueSBhdHRhY2htZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuYXR0YWNobWVudHMgPSBuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gICAgICAgIGlmIChcIi9cIiA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKFwiLFwiID09PSBjKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLm5zcCA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcC5uc3AgPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGlkXG4gICAgICAgIGNvbnN0IG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgICAgICAgaWYgKFwiXCIgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmlkID0gTnVtYmVyKHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudHJ5UGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgICAgICAgICBpZiAoRGVjb2Rlci5pc1BheWxvYWRWYWxpZChwLnR5cGUsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgcGF5bG9hZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWJ1ZyhcImRlY29kZWQgJXMgYXMgJWpcIiwgc3RyLCBwKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHRyeVBhcnNlKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLCB0aGlzLm9wdHMucmV2aXZlcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNQYXlsb2FkVmFsaWQodHlwZSwgcGF5bG9hZCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc09iamVjdChwYXlsb2FkKTtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5ESVNDT05ORUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVF9FUlJPUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJlxuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgcGF5bG9hZFswXSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJFU0VSVkVEX0VWRU5UUy5pbmRleE9mKHBheWxvYWRbMF0pID09PSAtMSkpKTtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG1hbmFnZXIgb2YgYSBiaW5hcnkgZXZlbnQncyAnYnVmZmVyIHNlcXVlbmNlJy4gU2hvdWxkXG4gKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xuICogZGVjb2RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIEJpbmFyeVJlY29uc3RydWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhY2tldCkge1xuICAgICAgICB0aGlzLnBhY2tldCA9IHBhY2tldDtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgICAgIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gICAgICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAgICAgKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxuICAgICAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHRha2VCaW5hcnlEYXRhKGJpbkRhdGEpIHtcbiAgICAgICAgdGhpcy5idWZmZXJzLnB1c2goYmluRGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cykge1xuICAgICAgICAgICAgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgICAgICAgICBjb25zdCBwYWNrZXQgPSByZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHBhY2tldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICAgICAqL1xuICAgIGZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVjb25QYWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gaXNOYW1lc3BhY2VWYWxpZChuc3ApIHtcbiAgICByZXR1cm4gdHlwZW9mIG5zcCA9PT0gXCJzdHJpbmdcIjtcbn1cbi8vIHNlZSBodHRwczovL2Nhbml1c2UuY29tL21kbi1qYXZhc2NyaXB0X2J1aWx0aW5zX251bWJlcl9pc2ludGVnZXJcbmNvbnN0IGlzSW50ZWdlciA9IE51bWJlci5pc0ludGVnZXIgfHxcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgICAgIGlzRmluaXRlKHZhbHVlKSAmJlxuICAgICAgICAgICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKTtcbiAgICB9O1xuZnVuY3Rpb24gaXNBY2tJZFZhbGlkKGlkKSB7XG4gICAgcmV0dXJuIGlkID09PSB1bmRlZmluZWQgfHwgaXNJbnRlZ2VyKGlkKTtcbn1cbi8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NTExMjgxL2NoZWNrLWlmLWEtdmFsdWUtaXMtYW4tb2JqZWN0LWluLWphdmFzY3JpcHRcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG5mdW5jdGlvbiBpc0RhdGFWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZCB8fCBpc09iamVjdChwYXlsb2FkKTtcbiAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBwYXlsb2FkWzBdID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBSRVNFUlZFRF9FVkVOVFMuaW5kZXhPZihwYXlsb2FkWzBdKSA9PT0gLTEpKSk7XG4gICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFja2V0VmFsaWQocGFja2V0KSB7XG4gICAgcmV0dXJuIChpc05hbWVzcGFjZVZhbGlkKHBhY2tldC5uc3ApICYmXG4gICAgICAgIGlzQWNrSWRWYWxpZChwYWNrZXQuaWQpICYmXG4gICAgICAgIGlzRGF0YVZhbGlkKHBhY2tldC50eXBlLCBwYWNrZXQuZGF0YSkpO1xufVxuIiwiY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1ZpZXcgPSAob2JqKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIEZpbGUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEZpbGUpID09PSBcIltvYmplY3QgRmlsZUNvbnN0cnVjdG9yXVwiKTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIEJ1ZmZlciwgYW4gQXJyYXlCdWZmZXIsIGEgQmxvYiBvciBhIEZpbGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmluYXJ5KG9iaikge1xuICAgIHJldHVybiAoKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KG9iaikpKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNCaW5hcnkob2JqLCB0b0pTT04pIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChoYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGlzQmluYXJ5KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvYmoudG9KU09OICYmXG4gICAgICAgIHR5cGVvZiBvYmoudG9KU09OID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBoYXNCaW5hcnkob2JqW2tleV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICog0J7RgtC00LXQu9GM0L3QsNGPINGB0YLRgNCw0L3QuNGG0LAg0YfQsNGC0LAgKGNoYXQuaHRtbCkgLSDQtNC70Y8g0L7RgtC70LDQtNC60LguINCS0YXQvtC00LjRgiDRgtC+0LvRjNC60L4g0LIg0YfQsNGCLCDQv9C10YDRgdC+0L3QsNC2INCyINC40LPRgNC1INC90LUg0L/QvtGP0LLQu9GP0LXRgtGB0Y9cbiAqL1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cydcbmltcG9ydCB1aSBmcm9tICcuL2VuZ2luZS91aS91aSdcbmltcG9ydCBhY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBjaGF0IGZyb20gJy4vc2NlbmVzL21haW4vdWkvY2hhdCdcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHVpLndhaXRTY3JlZW4uc2hvdygn0J/QvtC00LrQu9GO0YfQtdC90LjQtScpO1xuXG4gICAgZXZlbnRzLmluaXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB1aS53YWl0U2NyZWVuLmhpZGUoKTtcblxuICAgICAgICAvLyDQn9C+0YHQu9C1INC/0LXRgNC10L/QvtC00LrQu9GO0YfQtdC90LjRjyAtINC30LDQvdC+0LLQvlxuICAgICAgICBjaGF0LnN0b3AoKTtcbiAgICAgICAgY2hhdC5zdGFydCh7c3RhbmRhbG9uZTogdHJ1ZX0pO1xuICAgIH0sICdjaGF0LWxvZ2luJyk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdC1zaWdub3V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFjY291bnQuc2lnbm91dCgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSwgZmFsc2UpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==