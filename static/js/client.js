/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./account.js":
/*!********************!*\
  !*** ./account.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = { get: get, set: set, signout: signout };


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

/***/ }),

/***/ "./characters.js":
/*!***********************!*\
  !*** ./characters.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _character = __webpack_require__(/*! ./engine/character.js */ "./engine/character.js");

var _character2 = _interopRequireDefault(_character);

var _sprites = __webpack_require__(/*! ./sprites */ "./sprites.js");

var _sprites2 = _interopRequireDefault(_sprites);

var _spritesets = __webpack_require__(/*! ./spritesets */ "./spritesets.js");

var _spritesets2 = _interopRequireDefault(_spritesets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var characters = {};

var charactersets = {};

for (var id in _sprites2.default) {
    add(id, _sprites2.default[id]);
}
for (var sprite_id in _spritesets2.default) {
    for (var _id = 0; _id < _spritesets2.default[sprite_id].length; _id++) {
        addToSet(sprite_id, _id, _spritesets2.default[sprite_id][_id]);
    }
}

exports.default = { get: get, getFromSet: getFromSet };


function get(ID) {
    return characters[ID];
}

function getFromSet(setID, ID) {
    return charactersets[setID][ID];
}

function add(ID, sprite) {
    characters[ID] = new _character2.default(sprite);
}

function addToSet(setID, ID, sprite) {
    if (setID in charactersets === false) {
        charactersets[setID] = [];
    }
    charactersets[setID].push(new _character2.default(sprite));
}

/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FPS = exports.FPS = 30,
    INTERVAL = exports.INTERVAL = 1000 / FPS,
    //в миллисекундах
STEP = exports.STEP = INTERVAL / 1000; //в секундах

/***/ }),

/***/ "./engine/character.js":
/*!*****************************!*\
  !*** ./engine/character.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Character - Персонаж
 */
var Character = function () {
    function Character(sprite, width, height) {
        _classCallCheck(this, Character);

        this.sprite = sprite;

        this.width = width || sprite.width;
        this.height = height || sprite.height;
    }

    /**
     * Отрисовка персонажа
     * @param context - куда рисуем
     * @param x
     * @param y
     * @param width
     * @param height
     * @param state
     * @param frameNum - номер кадра анимации
     */


    _createClass(Character, [{
        key: 'draw',
        value: function draw(context, x, y, state, frameNum, width, height) {

            if (!state || !this.sprite.states[state]) {
                state = 'default';
            }
            if (!frameNum) frameNum = 0;

            if (!this.sprite.states[state] || !this.sprite.states[state][frameNum]) return;

            //Обрезка отрисовки вне канвы TODO: резать по камере
            if (x + this.width > 0 && x < context.canvas.width && y + this.height > 0 && y < context.canvas.height) {

                // Рисуем кадр
                this.drawFrame(context, this.sprite.image, this.sprite.states[state][frameNum], x, y, this.width, this.height);
            }
        }

        /**
         * Рисуем кадр анимации
         * @param context
         * @param sprite
         * @param x
         * @param y
         * @param width
         * @param height
         */

    }, {
        key: 'drawFrame',
        value: function drawFrame(context, image, sprite, x, y, width, height) {

            if (width > 0 && height > 0) {

                var scaleX = sprite.width / width,
                    scaleY = sprite.height / height;

                var sx = sprite.x,
                    sy = sprite.y,
                    sw = sprite.width,
                    sh = sprite.height;
                var dx = x,
                    dy = y,
                    dw = width,
                    dh = height;

                if (x < 0) {
                    dx = 0;
                    dw = width + x;
                    sx -= Math.floor(x * scaleX);
                    sw = Math.floor(dw * scaleX);
                }
                if (y < 0) {
                    dy = 0;
                    dh = height + y;
                    sy -= Math.floor(y * scaleY);
                    sh = Math.floor(dh * scaleY);
                }

                if (dw > context.canvas.width - dx) {
                    dw = context.canvas.width - dx;
                    sw = Math.floor(dw * scaleX);
                }

                if (dh > context.canvas.height - dy) {
                    dh = context.canvas.height - dy;
                    sh = Math.floor(dh * scaleY);
                }

                //Не рисуем с размером меньше или равным нулю
                if (sw > 0 && sh > 0 && dw > 0 && dh > 0) {

                    context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
                }
            }
        }
    }]);

    return Character;
}();

exports.default = Character;

/***/ }),

/***/ "./engine/sound.js":
/*!*************************!*\
  !*** ./engine/sound.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(src) {
        _classCallCheck(this, _class);

        this.sound = document.createElement("audio");
        this.sound.volume = 0.4;
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    _createClass(_class, [{
        key: "play",
        value: function play() {
            if (this.sound.currentTime > 0) {
                this.sound.pause();
                this.sound.currentTime = 0;
            }

            this.sound.play();
        }
    }, {
        key: "stop",
        value: function stop() {
            this.sound.pause();
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./engine/ui/ui.js":
/*!*************************!*\
  !*** ./engine/ui/ui.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _waitscreen = __webpack_require__(/*! ./waitscreen */ "./engine/ui/waitscreen.js");

var _waitscreen2 = _interopRequireDefault(_waitscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { waitScreen: _waitscreen2.default }; /**
                                                         * Интерфейс пользователя
                                                         */

// Экран загрузки

/***/ }),

/***/ "./engine/ui/waitscreen.js":
/*!*********************************!*\
  !*** ./engine/ui/waitscreen.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Экран загрузки
 */

var waitScreenElement = document.getElementById("loading");

exports.default = { show: show, hide: hide };


function show(title) {
    if (title) {
        var titleElement = waitScreenElement.querySelector('.title');
        if (titleElement) {
            titleElement.innerHTML = title;
        }
    }
    waitScreenElement.style.display = 'block';
}

function hide() {
    waitScreenElement.style.display = 'none';
}

/***/ }),

/***/ "./events.js":
/*!*******************!*\
  !*** ./events.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logs = __webpack_require__(/*! ./logs.js */ "./logs.js");

var _logs2 = _interopRequireDefault(_logs);

var _socket = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");

var _socket2 = _interopRequireDefault(_socket);

var _ui = __webpack_require__(/*! ./engine/ui/ui.js */ "./engine/ui/ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _account = __webpack_require__(/*! ./account */ "./account.js");

var _account2 = _interopRequireDefault(_account);

var _signin = __webpack_require__(/*! ./scenes/signin */ "./scenes/signin.js");

var _signin2 = _interopRequireDefault(_signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { init: init, add: add, on: on, off: off, disconnect: disconnect

    // Подключение к серверу
}; /**
    * События игры
    */

var serverSocket = null;

var logged = false;

/**
 * Инитим игровые события
 */
function init(callback) {

    //Подключимся к серверу
    if (!serverSocket) {
        serverSocket = (0, _socket2.default)("http://server.games.q-dev.ru");
    }

    (0, _logs2.default)('Подключаемся к серверу');
    serverSocket.connect();

    on("server", function (eventName, type) {

        if (type === "hello") {
            //Если ещё не вошли
            if (!logged) {

                //Получаем от пользователя аккаунт
                _signin2.default.start(function (account) {

                    // отправим аккаунт серверу
                    add('login', account);

                    //После успешного входа (Если неуспешный - сервер опять пошлет hello)
                    on('logged', function (eventName, type, data) {
                        if (type === 'success') {
                            logged = true;
                            off('logged');
                            callback();
                        }
                    });
                });
            }
        }
    });

    // Действия при серверных проблемах
    serverSocket.on('connect_error', function () {
        (0, _logs2.default)('Ошибка подключения к серверу');
    });

    serverSocket.on("disconnect", function () {
        (0, _logs2.default)('от сервера поступил disconnect');
        (0, _logs2.default)('Вы отключены от сервера');

        _ui2.default.waitScreen.show();
        logged = false;

        setTimeout(function () {
            init(callback);
        }, 1000);
    });

    on("another-coming", function () {
        (0, _logs2.default)('Вы отключены от сервера');

        //TODO: Вместо экрана ожидания - Окно с кнопкой - подключиться - по которой init(callback);
        _ui2.default.waitScreen.show();
    });
}

var handlers = {};

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

    //Сохраним на случай если события возникнут локально
    if (eventName in handlers === false) {
        handlers[eventName] = [];
    }
    handlers[eventName].push(callback);

    serverSocket.on(eventName, function (data) {
        try {
            data = JSON.parse(data);
        } catch (e) {}
        var type = data.type ? data.type : "simple";

        // Если в данных события есть поле message - выведем в лог
        data.message && (0, _logs2.default)(data.message /* + ' (Событие '+event+'.'+type+')'*/);

        // Отладка событий без message
        // data.message || log(' (Событие '+event+'.'+type+')');

        callback(eventName, type, data);
    });
}

function off(eventName, handler) {
    if (eventName in handlers && handlers[eventName] === handler) {
        delete handlers[eventName];
    }

    serverSocket.off(eventName, handler);
}

// Запуск для локальных событий
function runHandlers(eventName, data) {
    //Если есть обработчики - запускаем
    if (eventName in handlers) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = handlers[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var h = _step.value;

                h(eventName, data);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}

function disconnect() {
    serverSocket.close();
}

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ui = __webpack_require__(/*! ./engine/ui/ui.js */ "./engine/ui/ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _events = __webpack_require__(/*! ./events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _index = __webpack_require__(/*! ./scenes/main/index.js */ "./scenes/main/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Основной класс клиента игры
 * class Game
 */
exports.default = { run: run

    /**
     * Запуск основного цикла
     */
};
function run() {

    // Пишем "Загрузка"
    _ui2.default.waitScreen.show('Старт игры');

    // Подключаемся к серверу
    _events2.default.init(function () {

        //TODO: Перед стартом - выбор персонажа, если не выбран

        // Стартуем основную сцену
        _index2.default.start(function (_) {

            gameover();
        });
    });
}

function gameover() {
    _ui2.default.waitScreen.show('Game Over');
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(/*! ./game */ "./game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {

    _game2.default.run();
};

/***/ }),

/***/ "./logs.js":
/*!*****************!*\
  !*** ./logs.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Логирование
 */
exports.default = log;


var $logs = document.getElementById('logs');

function log(msg) {
    $logs.innerHTML += '<div class="msg">' + msg + '</div>';
    $logs.parentElement.scrollTop = $logs.scrollHeight;
    console.log(msg);
};

/***/ }),

/***/ "./node_modules/after/index.js":
/*!*************************************!*\
  !*** ./node_modules/after/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),

/***/ "./node_modules/arraybuffer.slice/index.js":
/*!*************************************************!*\
  !*** ./node_modules/arraybuffer.slice/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};


/***/ }),

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

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

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),

/***/ "./node_modules/blob/index.js":
/*!************************************!*\
  !*** ./node_modules/blob/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/component-bind/index.js":
/*!**********************************************!*\
  !*** ./node_modules/component-bind/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

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
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

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


/***/ }),

/***/ "./node_modules/component-inherit/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-inherit/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

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
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node-libs-browser/node_modules/process/browser.js */ "./node_modules/node-libs-browser/node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/debug/src/debug.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/debug.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
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
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/engine.io-client/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(/*! ./socket */ "./node_modules/engine.io-client/lib/socket.js");

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/browser.js");


/***/ }),

/***/ "./node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:socket');
var index = __webpack_require__(/*! indexof */ "./node_modules/indexof/index.js");
var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/browser.js");
var parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (global.location && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(/*! ./transport */ "./node_modules/engine.io-client/lib/transport.js");
Socket.transports = __webpack_require__(/*! ./transports/index */ "./node_modules/engine.io-client/lib/transports/index.js");
Socket.parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/browser.js");

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0)
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/lib/transport.js":
/*!********************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/browser.js");
var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
var XHR = __webpack_require__(/*! ./polling-xhr */ "./node_modules/engine.io-client/lib/transports/polling-xhr.js");
var JSONP = __webpack_require__(/*! ./polling-jsonp */ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js");
var websocket = __webpack_require__(/*! ./websocket */ "./node_modules/engine.io-client/lib/transports/websocket.js");

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module requirements.
 */

var Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
var inherit = __webpack_require__(/*! component-inherit */ "./node_modules/component-inherit/index.js");

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
var Polling = __webpack_require__(/*! ./polling */ "./node_modules/engine.io-client/lib/transports/polling.js");
var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
var inherit = __webpack_require__(/*! component-inherit */ "./node_modules/component-inherit/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    if (this.supportsBinary) {
      xhr.responseType = 'arraybuffer';
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType !== 'application/octet-stream') {
              xhr.responseType = 'text';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      if (this.xhr.responseType === 'arraybuffer') {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
      }
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/browser.js");
var inherit = __webpack_require__(/*! component-inherit */ "./node_modules/component-inherit/index.js");
var yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "./node_modules/engine.io-client/lib/xmlhttprequest.js");
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};


/***/ }),

/***/ "./node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(/*! ../transport */ "./node_modules/engine.io-client/lib/transport.js");
var parser = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/lib/browser.js");
var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");
var inherit = __webpack_require__(/*! component-inherit */ "./node_modules/component-inherit/index.js");
var yeast = __webpack_require__(/*! yeast */ "./node_modules/yeast/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(/*! ws */ 0);
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************!*\
  !*** ./node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js");

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/debug/src/browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/node_modules/debug/src/browser.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/engine.io-client/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

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
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node-libs-browser/node_modules/process/browser.js */ "./node_modules/node-libs-browser/node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/engine.io-client/node_modules/debug/src/debug.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/node_modules/debug/src/debug.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
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
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var keys = __webpack_require__(/*! ./keys */ "./node_modules/engine.io-parser/lib/keys.js");
var hasBinary = __webpack_require__(/*! has-binary2 */ "./node_modules/has-binary2/index.js");
var sliceBuffer = __webpack_require__(/*! arraybuffer.slice */ "./node_modules/arraybuffer.slice/index.js");
var after = __webpack_require__(/*! after */ "./node_modules/after/index.js");
var utf8 = __webpack_require__(/*! ./utf8 */ "./node_modules/engine.io-parser/lib/utf8.js");

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = __webpack_require__(/*! base64-arraybuffer */ "./node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(/*! blob */ "./node_modules/blob/index.js");

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/engine.io-parser/lib/keys.js":
/*!***************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/keys.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),

/***/ "./node_modules/engine.io-parser/lib/utf8.js":
/*!***************************************************!*\
  !*** ./node_modules/engine.io-parser/lib/utf8.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return utf8;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key, hasOwnProperty, object; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/has-binary2/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-binary2/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");

var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof global.Buffer === 'function' && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
     (typeof global.ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
     (withNativeBlob && obj instanceof Blob) ||
     (withNativeFile && obj instanceof File)
    ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),

/***/ "./node_modules/indexof/index.js":
/*!***************************************!*\
  !*** ./node_modules/indexof/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
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

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
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
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
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
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
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
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/process/browser.js":
/*!************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/process/browser.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),

/***/ "./node_modules/socket.io-client/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/socket.io-client/lib/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__(/*! ./url */ "./node_modules/socket.io-client/lib/url.js");
var parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/index.js");
var Manager = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/lib/manager.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(/*! ./manager */ "./node_modules/socket.io-client/lib/manager.js");
exports.Socket = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/lib/socket.js");


/***/ }),

/***/ "./node_modules/socket.io-client/lib/manager.js":
/*!******************************************************!*\
  !*** ./node_modules/socket.io-client/lib/manager.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/lib/index.js");
var Socket = __webpack_require__(/*! ./socket */ "./node_modules/socket.io-client/lib/socket.js");
var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
var parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/index.js");
var on = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/lib/on.js");
var bind = __webpack_require__(/*! component-bind */ "./node_modules/component-bind/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('socket.io-client:manager');
var indexOf = __webpack_require__(/*! indexof */ "./node_modules/indexof/index.js");
var Backoff = __webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js");

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};


/***/ }),

/***/ "./node_modules/socket.io-client/lib/on.js":
/*!*************************************************!*\
  !*** ./node_modules/socket.io-client/lib/on.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}


/***/ }),

/***/ "./node_modules/socket.io-client/lib/socket.js":
/*!*****************************************************!*\
  !*** ./node_modules/socket.io-client/lib/socket.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/index.js");
var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
var toArray = __webpack_require__(/*! to-array */ "./node_modules/to-array/index.js");
var on = __webpack_require__(/*! ./on */ "./node_modules/socket.io-client/lib/on.js");
var bind = __webpack_require__(/*! component-bind */ "./node_modules/component-bind/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('socket.io-client:socket');
var parseqs = __webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js");

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = { type: parser.EVENT, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  if (packet.nsp !== this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};


/***/ }),

/***/ "./node_modules/socket.io-client/lib/url.js":
/*!**************************************************!*\
  !*** ./node_modules/socket.io-client/lib/url.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js");
var debug = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socket.io-parser/binary.js":
/*!*************************************************!*\
  !*** ./node_modules/socket.io-parser/binary.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
var isBuf = __webpack_require__(/*! ./is-buffer */ "./node_modules/socket.io-parser/is-buffer.js");
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
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
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socket.io-parser/index.js":
/*!************************************************!*\
  !*** ./node_modules/socket.io-parser/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(/*! debug */ "./node_modules/socket.io-parser/node_modules/debug/src/browser.js")('socket.io-parser');
var Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
var hasBin = __webpack_require__(/*! has-binary2 */ "./node_modules/has-binary2/index.js");
var binary = __webpack_require__(/*! ./binary */ "./node_modules/socket.io-parser/binary.js");
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js");
var isBuf = __webpack_require__(/*! ./is-buffer */ "./node_modules/socket.io-parser/is-buffer.js");

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  if ((obj.type === exports.EVENT || obj.type === exports.ACK) && hasBin(obj.data)) {
    obj.type = obj.type === exports.EVENT ? exports.BINARY_EVENT : exports.BINARY_ACK;
  }

  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    str += JSON.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}


/***/ }),

/***/ "./node_modules/socket.io-parser/is-buffer.js":
/*!****************************************************!*\
  !*** ./node_modules/socket.io-parser/is-buffer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && (obj instanceof ArrayBuffer || ArrayBuffer.isView(obj)));
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/socket.io-parser/node_modules/debug/src/browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/socket.io-parser/node_modules/debug/src/browser.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/socket.io-parser/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

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
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node-libs-browser/node_modules/process/browser.js */ "./node_modules/node-libs-browser/node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/socket.io-parser/node_modules/debug/src/debug.js":
/*!***********************************************************************!*\
  !*** ./node_modules/socket.io-parser/node_modules/debug/src/debug.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
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
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/to-array/index.js":
/*!****************************************!*\
  !*** ./node_modules/to-array/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "./scenes/main/camera.js":
/*!*******************************!*\
  !*** ./scenes/main/camera.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Модуль камеры
 */

var MAX_DEADZONE_X = 500;
var MAX_DEADZONE_Y = 500;

/**
 * @class Camera
 */

var _class = function () {
    function _class(x, y, canvas, follower) {
        _classCallCheck(this, _class);

        this.x = x;
        this.y = y;
        this.width = canvas.width;
        this.height = canvas.height;

        this.deadZone = {
            x: MAX_DEADZONE_X,
            y: MAX_DEADZONE_Y
        };

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.speed = 200;

        this.follower = follower;
    }

    _createClass(_class, [{
        key: "resize",
        value: function resize() {

            var width = window.innerWidth;
            var height = window.innerHeight;

            this.canvas.width = width;
            this.canvas.height = height;

            var x = this.x - Math.floor((width - this.width) / 2);
            var y = this.y - Math.floor((height - this.height) / 2);
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }, {
        key: "update",
        value: function update(room) {

            if (this.follower) {
                return this.runFollow(room, this.follower);
            }
        }
    }, {
        key: "setFollower",
        value: function setFollower(follower) {
            this.follower = follower;
        }
    }, {
        key: "runFollow",
        value: function runFollow(room, player) {

            /**
             * Пересчитаем "мертвые зоны"
             */

            // Берем половину камеры
            this.deadZone.x = Math.floor(this.width / 2);
            this.deadZone.y = Math.floor(this.height / 2);

            // Учтем, что комната может быть меньше камеры
            if (room.width < this.canvas.width) {
                this.deadZone.x = Math.floor((room.width - this.canvas.width) / 2);
            }
            if (room.height < this.canvas.height) {
                this.deadZone.y = Math.floor((room.height - this.canvas.height) / 2);
            }

            // Не делаем очень большие "мертвые зоны"
            if (this.deadZone.x > MAX_DEADZONE_X) {
                this.deadZone.x = MAX_DEADZONE_X;
            }
            if (this.deadZone.y > MAX_DEADZONE_Y) {
                this.deadZone.y = MAX_DEADZONE_Y;
            }

            /**
             * Следуем за плеером
             */
            if (player.x - this.x > this.width - this.deadZone.x) {
                this.x = player.x - this.width + this.deadZone.x;
            } else if (player.x < this.x + this.deadZone.x) {
                this.x = player.x - this.deadZone.x;
            }

            if (player.y - this.y > this.height - this.deadZone.y) {
                this.y = player.y - this.height + this.deadZone.y;
            } else if (player.y < this.y + this.deadZone.y) {
                this.y = player.y - this.deadZone.y;
            }

            /**
             * Не выходим за границы карты
             */
            if (this.x < 0) this.x = 0;
            if (this.y < 0) this.y = 0;
            if (this.x + this.width > room.width) this.x = room.width - this.width;
            if (this.y + this.height > room.height) this.y = room.height - this.height;

            /**
             * Если камера больше карты - добавим смещение
             */
            if (this.width > room.width) this.x += (this.width - room.width) / 2;
            if (this.height > room.height) this.y += (this.height - room.height) / 2;
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./scenes/main/controller.js":
/*!***********************************!*\
  !*** ./scenes/main/controller.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../../events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keys = {
    LEFT: 37, //Left
    UP: 38, //Up
    RIGHT: 39, //Right
    DOWN: 40, //Down

    A: 65, //A
    W: 87, //W
    D: 68, //D
    S: 83, // S

    N1: 49,
    N2: 50,
    N3: 51,
    N4: 52,
    N5: 53,
    N6: 54,
    N7: 55,
    N8: 56,
    N9: 57,
    N0: 48,

    SPACE: 32, //Огонь!

    STATISTIC: 73 // "I"

}; /**
    * Контроллер - клавиши и мышь
    * TODO: может команды меню тоже событиями
    */

// подключим события


var clickPad = null;

exports.default = { start: start, stop: stop, setClickPad: setClickPad

    /**
     * Запустим контроллер
     */
};
function start() {

    // Если окно потеряло фокус
    window.addEventListener("blur", onWindowBlur, false);

    // Нажата клавиша
    document.addEventListener("keydown", onKeydown, false);

    // Отжата клавиша
    document.addEventListener("keyup", onKeyup, false);

    window.addEventListener("click", onClick, false);
    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mouseup", onMouseUp, false);
}

/**
 * Остановим контроллер
 */
function stop() {

    window.removeEventListener("blur", onWindowBlur, false);
    document.removeEventListener("keydown", onKeydown, false);
    document.removeEventListener("keyup", onKeyup, false);

    window.removeEventListener("click", onClick, false);
    window.removeEventListener("mousedown", onMouseDown, false);
    window.removeEventListener("mouseup", onMouseUp, false);
}

function setClickPad(_clickPad) {
    clickPad = _clickPad;
}

/**
 * При нажатии клавиши
 * @param e
 */
function onKeydown(e) {
    switch (e.keyCode) {

        case keys.LEFT:
        case keys.A:
            _events2.default.add('keydown', 'left');
            break;
        case keys.UP:
        case keys.W:
            _events2.default.add('keydown', 'up');
            break;
        case keys.RIGHT:
        case keys.D:
            _events2.default.add('keydown', 'right');
            break;
        case keys.DOWN:
        case keys.S:
            _events2.default.add('keydown', 'down');
            break;
        case keys.SPACE:
            _events2.default.add('keydown', 'fire');
            break;
        case keys.N1:
            _events2.default.add('skill-change', 'skill1');
            break;
        case keys.N2:
            _events2.default.add('skill-change', 'skill2');
            break;
        case keys.N3:
            _events2.default.add('skill-change', 'skill3');
            break;
        case keys.N4:
            _events2.default.add('skill-change', 'skill4');
            break;
        case keys.N5:
            _events2.default.add('skill-change', 'skill5');
            break;
        case keys.N6:
            _events2.default.add('skill-change', 'skill6');
            break;
        case keys.N7:
            _events2.default.add('skill-change', 'skill7');
            break;
        case keys.N8:
            _events2.default.add('skill-change', 'skill8');
            break;
        case keys.N9:
            _events2.default.add('skill-change', 'skill9');
            break;
        case keys.N0:
            _events2.default.add('skill-change', 'skill10');
            break;
    }
}

/**
 * При отжатии клавиши
 * @param e
 */
function onKeyup(e) {
    switch (e.keyCode) {
        case keys.LEFT:
        case keys.A:
            _events2.default.add('keyup', 'left');
            break;
        case keys.UP:
        case keys.W:
            _events2.default.add('keyup', 'up');
            break;
        case keys.RIGHT:
        case keys.D:
            _events2.default.add('keyup', 'right');
            break;
        case keys.DOWN:
        case keys.S:
            _events2.default.add('keyup', 'down');
            break;
        case keys.SPACE:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.STATISTIC:
            _events2.default.add('keyup', 'statistic');
            break;
        /*case keys.N1:
            events.add('keyup', 'skill1');
            break;
        case keys.N2:
            events.add('keyup', 'skill2');
            break;
        case keys.N3:
            events.add('keyup', 'skill3');
            break;
        case keys.N4:
            events.add('keyup', 'skill4');
            break;
        case keys.N5:
            events.add('keyup', 'skill5');
            break;
        case keys.N6:
            events.add('keyup', 'skill6');
            break;
        case keys.N7:
            events.add('keyup', 'skill7');
            break;
        case keys.N8:
            events.add('keyup', 'skill8');
            break;
        case keys.N9:
            events.add('keyup', 'skill9');
            break;
        case keys.N0:
            events.add('keyup', 'skill10');
            break;*/
    }
}

/**
 * При клике
 * @param e
 */
function onClick(e) {

    // Если есть по чем кликать отправим событие
    if (clickPad) {
        var x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;
        _events2.default.add('target', { x: x, y: y });
        _events2.default.add('click', { x: x, y: y });
    }
}

//Мышь нажали
function onMouseDown(e) {

    // Если есть по чем кликать отправим событие
    if (clickPad) {
        var x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;

        if (e.button === 0 || e.button === 1) {
            _events2.default.add('mouse-down-left', { x: x, y: y });
        } else if (e.button === 2) {
            _events2.default.add('mouse-down-right', { x: x, y: y });
        }
    }
}

//Мышь отпустили
function onMouseUp(e) {

    // Если есть по чем кликать отправим событие
    if (clickPad) {
        var x = e.clientX + clickPad.x,
            y = e.clientY + clickPad.y;

        if (e.button === 0 || e.button === 1) {
            _events2.default.add('mouse-up-left', { x: x, y: y });
        } else if (e.button === 2) {
            _events2.default.add('mouse-up-right', { x: x, y: y });
        }
    }
}

/**
 * Если окно потеряло фокус
 */
function onWindowBlur() {
    // отожмем все клавиши
    _events2.default.add('controllerReset', true);
}

/***/ }),

/***/ "./scenes/main/entities.js":
/*!*********************************!*\
  !*** ./scenes/main/entities.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _characters = __webpack_require__(/*! ../../characters */ "./characters.js");

var _characters2 = _interopRequireDefault(_characters);

var _entity = __webpack_require__(/*! ./entity */ "./scenes/main/entity.js");

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { add: add, addFromSet: addFromSet, remove: remove, reset: reset, size: size, each: each };


var entities = [];

function add(x, y, ID, lifetime, faza) {
    entities.push(new _entity2.default(x, y, _characters2.default.get(ID), lifetime, faza));
}

function addFromSet(x, y, setID, ID, lifetime, faza) {
    entities.push(new _entity2.default(x, y, _characters2.default.getFromSet(setID, ID), lifetime, faza));
}

function remove(index) {
    entities.splice(index, 1);
}

function reset() {
    entities.length = 0;
}

function size() {
    return entities.length;
}

function each(callback) {
    entities.forEach(callback);
}

/***/ }),

/***/ "./scenes/main/entity.js":
/*!*******************************!*\
  !*** ./scenes/main/entity.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class Entity
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _constants = __webpack_require__(/*! ../../constants */ "./constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(x, y, character, lifetime, faza) {
        _classCallCheck(this, Entity);

        this.x = x;
        this.y = y;

        this.character = character;

        // время жизни
        this.lifetime = lifetime;

        this.immortal = lifetime > 0.0 ? false : true;

        this.width = this.character.width;
        this.height = this.character.height;

        this.animateSpeed = this.character.sprite.speed;
        if (!this.animateSpeed) this.animateSpeed = 14;
        this.faza = faza || 0;
        this.currentSpriteNum = 0;

        this.state = "default";

        this.die = false;
    }

    _createClass(Entity, [{
        key: "isDie",
        value: function isDie() {
            return this.die;
        }
    }, {
        key: "kill",
        value: function kill() {
            this.die = true;
        }
    }, {
        key: "update",
        value: function update() {

            if (!this.immortal) {

                if (this.lifetime > 0) {
                    this.lifetime -= _constants.STEP;
                } else {
                    this.lifetime = 0;
                    this.die = true;
                }
            }
        }
    }, {
        key: "animate",
        value: function animate() {
            //Анимация
            this.faza += this.animateSpeed * _constants.STEP;
            this.currentSpriteNum = Math.floor(this.faza);

            if (!this.character) return false;

            if (!this.character.sprite.states[this.state]) {
                this.state = 'default';
            }
            if (!this.character.sprite.states[this.state]) {
                return false;
            }

            if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length) {
                this.faza = 0;
                this.currentSpriteNum = 0;
            }
        }
    }, {
        key: "draw",
        value: function draw(camera) {
            if (!this.character) return false;

            if (!this.character.sprite.states[this.state]) {
                this.state = 'default';
            }
            if (!this.character.sprite.states[this.state]) {
                return false;
            }

            var x = this.x - camera.x - this.width / 2,
                y = this.y - camera.y - this.height / 2;

            // не рисуем вне камеры
            if (x < -this.character.width || y < -this.character.height || x > camera.width || y > camera.height) {
                return true;
            }

            this.drawCharacter(camera.context, x, y);
        }
    }, {
        key: "drawCharacter",
        value: function drawCharacter(context, sx, sy) {
            var x = sx - (this.character.width - this.width) / 2,
                y = sy - (this.character.height - this.height);

            this.character.draw(context, x, y, this.state, this.currentSpriteNum, this.width, this.height);
        }
    }]);

    return Entity;
}();

exports.default = Entity;

/***/ }),

/***/ "./scenes/main/hero.js":
/*!*****************************!*\
  !*** ./scenes/main/hero.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unit = __webpack_require__(/*! ./unit.js */ "./scenes/main/unit.js");

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Hero - главный герой
 */

/**
 * Юнит героя
 * @type {Unit|null}
 */
var unit = null;

/**
 * Скорость перемещения
 * @type {number}
 */
var speed = 0;

exports.default = { unit: unit, speed: speed, animate: animate, draw: draw };


function animate() {
  this.unit.animate();
}

function draw(camera) {
  this.unit.draw(camera);
}

/***/ }),

/***/ "./scenes/main/index.js":
/*!******************************!*\
  !*** ./scenes/main/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! ../../constants */ "./constants.js");

var constants = _interopRequireWildcard(_constants);

var _logs = __webpack_require__(/*! ../../logs */ "./logs.js");

var _logs2 = _interopRequireDefault(_logs);

var _camera = __webpack_require__(/*! ./camera */ "./scenes/main/camera.js");

var _camera2 = _interopRequireDefault(_camera);

var _units = __webpack_require__(/*! ./units */ "./scenes/main/units.js");

var _units2 = _interopRequireDefault(_units);

var _events = __webpack_require__(/*! ../../events */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _hero = __webpack_require__(/*! ./hero */ "./scenes/main/hero.js");

var _hero2 = _interopRequireDefault(_hero);

var _unit4 = __webpack_require__(/*! ./unit */ "./scenes/main/unit.js");

var _unit5 = _interopRequireDefault(_unit4);

var _teleport = __webpack_require__(/*! ./teleport */ "./scenes/main/teleport.js");

var _teleport2 = _interopRequireDefault(_teleport);

var _room = __webpack_require__(/*! ./room */ "./scenes/main/room.js");

var _room2 = _interopRequireDefault(_room);

var _loot = __webpack_require__(/*! ./loot */ "./scenes/main/loot.js");

var _loot2 = _interopRequireDefault(_loot);

var _ui = __webpack_require__(/*! ./ui/ui */ "./scenes/main/ui/ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _controller = __webpack_require__(/*! ./controller */ "./scenes/main/controller.js");

var _controller2 = _interopRequireDefault(_controller);

var _sounds = __webpack_require__(/*! ../../sounds */ "./sounds.js");

var _sounds2 = _interopRequireDefault(_sounds);

var _entities = __webpack_require__(/*! ./entities */ "./scenes/main/entities.js");

var _entities2 = _interopRequireDefault(_entities);

var _account = __webpack_require__(/*! ../../account */ "./account.js");

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Основная сцена - собственно игра
 */
exports.default = { start: start, stop: stop

    // Запустим по окончании игры
};
var finalCallback = null,
    interval = null;

var rooms = {},
    room_id = null,
    room = null,


// Камера. Совмещена со въюпортом
camera = null,
    loots = {},
    teleports = {};

function start(callback) {
    finalCallback = callback;

    rooms = {};

    // Текущая комната. id и сама
    room_id = null;
    room = null;

    // Весь лут
    loots = {};

    // Телепорты
    teleports = {};

    var canvas = document.getElementById("canvas");
    // Создадим камеру по "канве"
    camera = new _camera2.default(0, 0, canvas);
    // изменяем камеру под окно
    camera.resize();

    //При ресайзе окна браузера - изменяем камеру под окно
    window.addEventListener('resize', function () {
        camera.resize();
    });

    //Запросим аватара
    _events2.default.add('need-avatar');

    _events2.default.on("signout", function () {
        _account2.default.signout();
        _events2.default.disconnect();
        stop();
    });

    _events2.default.on("disconnect", function () {
        stop();
    });

    _events2.default.on("reconnect", onReconnect);
    _events2.default.on("room", onRoom);
    _events2.default.on("hero", onHero);
    _events2.default.on("sound", onSound);

    _events2.default.on("click", function (eventName, pos) {
        if (pos) {
            _entities2.default.add(pos.x, pos.y + 1, 'pointer', .35);
        }
    });

    _events2.default.on("entity", function (eventName, type, data) {
        if (type === "remove-coin" && data.room_id === room_id) {

            _entities2.default.add(data.x, data.y, 'boom1', .65);

            // entities.add(data.x, data.y, 'boom2', .55);
        }

        if (type === "teleport-target" && data.room_id === room_id) {

            _entities2.default.add(data.x, data.y, 'barier', 0.65);
        }

        if (type === "push-effect" && data.room_id === room_id) {

            _entities2.default.add(data.x, data.y, 'push1', 0.15);
        }
    });

    _ui2.default.skills.start();

    _ui2.default.top10.start();

    /**
     * Основной цикл
     */
    interval = setInterval(function (_) {

        // Перемещение, управляемое на клиенте
        update();

        // Отрисовка
        draw(camera);

        // Анимация
        animate();
    }, constants.INTERVAL);
}

function stop() {
    clearInterval(interval);

    _events2.default.off("reconnect", onReconnect);
    _events2.default.off("room", onRoom);
    _events2.default.off("hero");
    _events2.default.off("sound");

    _events2.default.off("click");
    _events2.default.off("coin");

    _units2.default.reset();
    loots = {};
    _hero2.default.unit = null;
    _entities2.default.reset();

    _ui2.default.skills.stop();

    _ui2.default.top10.stop();

    finalCallback();
}

function onReconnect(event, type, data) {
    (0, _logs2.default)('от сервера поступил reconnect');
    _units2.default.reset();
    loots = {};
    _hero2.default.unit = null;
}

/**
 * События "room"
 * @param event
 * @param type
 * @param data
 */
function onRoom(event, type, data) {

    // Получение комнаты
    if (type === "change") {
        try {
            if (!data.room) throw "Ошибка получения с сервера";

            var room = data.room;

            if (room.ID == undefined || !room.width || !room.height || room.environment_id == undefined) throw "Ошибка получения с сервера";

            roomInit(room);
        } catch (e) {
            (0, _logs2.default)("Ошибка получения Комнаты. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Создание нового игрока
    if (type === "player-create") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined || info.level == undefined) throw "Ошибка получения с сервера";

            var unit = new _unit5.default(info);
            _units2.default.add(info.ID, unit);
        } catch (e) {
            (0, _logs2.default)("Ошибка получения игрока. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация об игроке
    if (type === "player-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined || info.level == undefined) throw "Ошибка получения с сервера";

            var _unit = _units2.default.item(info.ID);
            if (_unit) {

                _unit.set(info);
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка обновления игрока. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Игрок ушел
    if (type === "player-leave") {
        try {
            if (!data.ID) throw "Ошибка получения с сервера";

            _units2.default.remove(data.ID);
        } catch (e) {
            (0, _logs2.default)("Ошибка удаления игрока. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Создание лута
    if (type === "loot-create") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            if (info.room_id == room_id) {

                if (info.ID in loots === false) {
                    loots[info.ID] = new _loot2.default(info.room_id, info.x, info.y, info.character_id, info.ID, info.width, info.height);
                } else {
                    loots[info.ID].set(info.room_id, info.x, info.y, info.character_id, info.ID);
                }
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка получения лута. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Создание декорации
    if (type === "cartoon-create") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.spriteset_id == undefined || info.sprite_id == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            if (info.room_id == room_id) {

                _entities2.default.addFromSet(info.x, info.y, info.spriteset_id, info.sprite_id, 0, 0);
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка получения декорации. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация о луте
    if (type === "loot-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            if (info.room_id == room_id) {

                if (info.ID in loots) {
                    loots[info.ID].set(info.room_id, info.x, info.y, info.character_id, info.ID);
                }
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка получения лута. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Удаление лута
    if (type === "loot-remove") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            if (info.room_id === room_id) {

                if (info.ID in loots) {
                    delete loots[info.ID];
                }
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка получения лута. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация о телепортах
    if (type == "teleport-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.room_id == undefined || info.state == undefined) throw "Ошибка получения с сервера";

            if (info.room_id == room_id) {

                if (info.ID in teleports) {
                    teleports[info.ID].set(info.state);
                }
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка получения телепорта. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Создание нового моба
    if (type == "npc-create") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined) throw "Ошибка получения с сервера";

            var _unit2 = new _unit5.default(info);
            _units2.default.add(info.ID, _unit2);
        } catch (e) {
            (0, _logs2.default)("Ошибка получения моба. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация о мобе
    if (type == "npc-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined) throw "Ошибка получения с сервера";

            var _unit3 = _units2.default.item(info.ID);
            if (_unit3) {

                _unit3.set(info);
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка обновления моба. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Удаление моба
    if (type === "npc-remove") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            _units2.default.remove(info.ID);
        } catch (e) {
            (0, _logs2.default)("Ошибка удаления моба. " + e);
            (0, _logs2.default)(data);
        }
    }
}

function onHero(event, type, data) {

    // Создание героя при входе
    if (type == "hero-create") {

        try {

            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined || info.coins_count == undefined || info.level == undefined || info.levelupCounter == undefined || info.speed == undefined) throw "Ошибка получения с сервера";

            if (!_hero2.default.unit) {
                _hero2.default.unit = new _unit5.default(info, true);
            } else {
                _hero2.default.unit.set(info);
            }

            _units2.default.add('[' + info.ID + ']', _hero2.default.unit);

            _hero2.default.speed = info.speed;

            _ui2.default.heroInfo.start();
            _ui2.default.heroInfo.update(info);

            _ui2.default.waitScreen.hide();

            _controller2.default.start();
            _controller2.default.setClickPad(camera);

            //Если ткущая комната отсутствует или не та - шлем на сервер запрос
            if (!room_id || room_id != info.room_id) {
                room_id = null;
                _events2.default.add('need-room', info.room_id);
            }
            camera && camera.setFollower(_hero2.default.unit);
        } catch (e) {
            (0, _logs2.default)("Ошибка создания Героя. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация о герое
    if (type == "hero-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined || info.coins_count == undefined || info.level == undefined || info.levelupCounter == undefined || info.speed == undefined) throw "Ошибка получения с сервера";

            _hero2.default.unit.set(info);

            _hero2.default.speed = info.speed;

            _ui2.default.heroInfo.update(info, info.ID);
        } catch (e) {
            (0, _logs2.default)("Ошибка обновления Героя. " + e);
            (0, _logs2.default)(data);
        }
    }
}

function onSound(event, type, data) {
    // звуковые уведомления
    if (type == "notice") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.room_id == undefined || info.x == undefined || info.y == undefined || info.ID == undefined) throw "Ошибка получения с сервера";

            if (_hero2.default && _hero2.default.unit && _hero2.default.unit.room_id == info.room_id) {
                //TODO: не юнит, а камера
                if (info.ID in _sounds2.default) {
                    //TODO: по info.x, info.y определять как далеко от hero и делать громкость
                    _sounds2.default[info.ID].play();
                }
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка звука. " + e);
            (0, _logs2.default)(data);
        }
    }
}

/**
 * Перемещение на клиенте
 *  то, что не управляется с сервера. Например камера
 */
function update() {

    //Камера
    camera && camera.update(room);

    //Сущности
    _entities2.default.each(function (entity, index) {

        entity.update();

        //Удалим отработавшие сущности
        if (entity.isDie()) {
            _entities2.default.remove(index);
        }
    });
}

/**
 * Анимация
 */
function animate() {

    //Юниты (включая самого героя)
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _units2.default.toArray()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var unit = _step.value;

            if (unit.room_id == room_id) {
                unit.animate();
            }
        }

        //Лут
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    for (var i in loots) {
        loots[i].animate(constants.STEP);
    }

    //Телепорты
    for (var _i in teleports) {
        teleports[_i].animate(constants.STEP);
    }

    //Сущности
    _entities2.default.each(function (entity) {
        entity.animate();
    });
}

/**
 * Отрисовка на камеру
 * @param camera
 * TODO: порядок отрисовки!
 */
function draw(camera) {

    // Комната
    room && room.draw(camera);

    // Телепорты
    for (var i in teleports) {
        teleports[i].draw(camera);
    }

    var renderArray = [];

    // Лут
    for (var _i2 in loots) {
        var item = loots[_i2];
        renderArray.push({ y: item.y, item: item });
    }

    //Юниты
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _units2.default.toArray()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var unit = _step2.value;

            if (unit.room_id == room_id) {
                renderArray.push({ y: unit.y, item: unit });
            }
        }

        //Сущности
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    _entities2.default.each(function (item) {
        renderArray.push({ y: item.y, item: item });
    });

    renderArray.sort(function (a, b) {
        return a.y - b.y;
    });

    for (var _i3 in renderArray) {
        renderArray[_i3].item.draw(camera);
    }
}

/**
 * Установка отображаемой комнаты
 * @param ID
 * @param width
 * @param height
 * @param environment_id
 */
function roomInit(settings) {

    //Зачистим если не впервой
    for (var i in loots) {
        delete loots[i];
    }
    for (var _i4 in teleports) {
        delete teleports[_i4];
    }
    loots = {};
    teleports = {};
    room = null;
    _entities2.default.reset();

    room_id = settings.ID;

    // Сделаем комнату или возмем из кеша
    if (settings.ID in rooms) {
        room = rooms[settings.ID];
    } else {
        room = new _room2.default(settings.width, settings.height, settings.environment_id, settings.entities_num);
        rooms[settings.ID] = room;
    }

    if ('cartoons' in settings) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = settings.cartoons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;

                _entities2.default.addFromSet(item.x, item.y, item.spriteset_id, item.sprite_id, 0, Math.random());
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }

    if ('loot' in settings) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = settings.loot[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _item = _step4.value;


                loots[_item.ID] = new _loot2.default(room_id, _item.x, _item.y, _item.character_id, _item.ID, _item.width, _item.height);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    }

    if ('teleports' in settings) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = settings.teleports[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var _item2 = _step5.value;


                teleports[_item2.ID] = new _teleport2.default(room_id, _item2.x, _item2.y, _item2.character_id, _item2.ID, _item2.target, _item2.state, _item2.width, _item2.height);
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }
    }
}

/***/ }),

/***/ "./scenes/main/loot.js":
/*!*****************************!*\
  !*** ./scenes/main/loot.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _characters = __webpack_require__(/*! ../../characters */ "./characters.js");

var _characters2 = _interopRequireDefault(_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Loot
 */
var _class = function () {
    function _class(room_id, x, y, character_id, ID, width, height) {
        _classCallCheck(this, _class);

        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = _characters2.default.get(character_id) || _characters2.default.get('coin_gold');

        this.state = 'default';

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    _createClass(_class, [{
        key: 'set',
        value: function set(room_id, x, y, character_id, ID) {
            this.ID = ID;
            this.room_id = room_id;
            this.x = x;
            this.y = y;
            this.character = _characters2.default.get(character_id) || _characters2.default.get('coin_gold');
        }
    }, {
        key: 'draw',
        value: function draw(camera) {
            if (!this.character) return false;

            if (!this.character.sprite.states[this.state]) {
                this.state = 'default';
            }
            if (!this.character.sprite.states[this.state]) {
                return false;
            }

            var x = this.x - (this.character.width - this.width) / 2 - camera.x,
                y = this.y - this.character.height + this.height - camera.y;

            // не рисуем вне камеры
            if (x < -this.character.width || y < -this.character.height || x > camera.width || y > camera.height) {
                return true;
            }

            this.character.draw(camera.context, x, y, this.state, this.currentSpriteNum, this.width, this.height);

            // Рисуем пятно коллизий
            /*camera.context.save();
            camera.context.beginPath();
            camera.context.fillStyle = "rgba(255,255,67,0.4)";
            camera.context.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
            camera.context.rect(x, y, this.character.width, this.character.height);
            camera.context.stroke();
            camera.context.restore();*/
        }
    }, {
        key: 'animate',
        value: function animate(step) {
            this.faza += this.animateSpeed * step;
            this.currentSpriteNum = Math.floor(this.faza);

            if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length) {
                this.faza = 0;
                this.currentSpriteNum = 0;
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./scenes/main/room.js":
/*!*****************************!*\
  !*** ./scenes/main/room.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //Настройки рандомных цветов комнаты

var _sprites = __webpack_require__(/*! ../../sprites */ "./sprites.js");

var _sprites2 = _interopRequireDefault(_sprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENVIRONMENTS = {
    0: {
        r: { start: 120, rand: 10 },
        g: { start: 120, rand: 16 },
        b: { start: 100, rand: 5 },
        // entitiesSprites: "grass",
        entitiesSprites: "andstones"
    },
    1: {
        r: { start: 239, rand: 16 },
        g: { start: 210, rand: 33 },
        b: { start: 100, rand: 25 },
        entitiesSprites: "desert"
    },
    2: {
        r: { start: 210, rand: 45 },
        g: { start: 30, rand: 75 },
        b: { start: 30, rand: 75 },
        entitiesSprites: "cool_plants"
    },
    3: {
        r: { start: 10, rand: 12 },
        g: { start: 130, rand: 20 },
        b: { start: 210, rand: 45 },
        entitiesSprites: "bushs"
    },
    4: {
        r: { start: 150, rand: 12 },
        g: { start: 90, rand: 20 },
        b: { start: 40, rand: 12 },
        entitiesSprites: "trees"
    },
    5: {
        r: { start: 0, rand: 30 },
        g: { start: 0, rand: 5 },
        b: { start: 0, rand: 5 },
        entitiesSprites: "dead_plants"
    }
};
/**
 * @class Room
 */

var _class = function () {
    function _class(width, height, environment_id, entities_num) {
        _classCallCheck(this, _class);

        this.width = width;
        this.height = height;
        this.environment_id = environment_id;
        this.entities_num = entities_num;
        this.image = null;

        this.generate(this.entities_num);
    }

    _createClass(_class, [{
        key: "randomCSScolor",
        value: function randomCSScolor(environment_id) {
            var e = ENVIRONMENTS[environment_id];
            var r = e.r.start + Math.floor(Math.random() * e.r.rand),
                g = e.g.start + Math.floor(Math.random() * e.g.rand),
                b = e.b.start + Math.floor(Math.random() * e.b.rand);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    }, {
        key: "generate",
        value: function generate(trees_num) {
            var ctx = document.createElement("canvas").getContext("2d"),
                tileWidth = 22,
                tileHeight = 22;
            ctx.canvas.width = this.width;
            ctx.canvas.height = this.height;

            var rows = Math.floor(this.width / tileWidth) + 1;
            var columns = Math.floor(this.height / tileHeight) + 1;

            ctx.save();

            for (var x = 0, i = 0; i < rows; x += tileHeight, i++) {
                for (var y = 0, j = 0; j < columns; y += tileWidth, j++) {
                    ctx.beginPath();
                    ctx.fillStyle = this.randomCSScolor(this.environment_id);
                    ctx.fillRect(x, y, tileWidth, tileHeight);
                    ctx.closePath();
                }
            }

            var env = ENVIRONMENTS[this.environment_id];

            var spr = _sprites2.default[env.entitiesSprites];

            //Сгенерим деревья
            for (var _i = 0; _i < trees_num; _i++) {

                //Случайная плитка из набора
                var id = Math.floor(Math.random() * spr.states.default.length);
                var tile = spr.states.default[id];

                //Случайные координаты
                var xx = Math.floor(Math.random() * (this.width + tile.width) / 10) * 10 - tile.width;
                var yy = Math.floor(Math.random() * (this.height + tile.height) / 10) * 10 - tile.height;
                var w = tile.width,
                    h = tile.height,
                    sx = tile.x,
                    sy = tile.y;

                //Обрезка по границам комнаты

                if (xx < this.width && xx > -tile.width && yy < this.height && yy > -tile.height) {

                    if (xx < 0) {
                        w += xx;sx -= xx;xx = 0;
                    }

                    if (yy < 0) {
                        h += yy;sy -= yy;yy = 0;
                    }

                    if (xx > this.width - tile.width) {
                        w = this.width - xx;
                    }

                    if (yy > this.height - tile.height) {
                        h = this.height - yy;
                    }

                    ctx.drawImage(spr.image, sx, sy, w, h, xx, yy, w, h);
                }
            }

            ctx.restore();

            // Сохраним картинкой
            this.image = new Image();
            this.image.src = ctx.canvas.toDataURL("image/png");
        }
    }, {
        key: "draw",
        value: function draw(camera) {

            camera.context.save();
            camera.context.beginPath();
            camera.context.fillStyle = '#9f8e60';
            camera.context.fillRect(0, 0, camera.width, camera.height);
            camera.context.closePath();
            camera.context.restore();

            if (!this.image) return false;

            var sx = 0,
                sy = 0,
                sw = this.width,
                sh = this.height,
                dx = 0,
                dy = 0,
                dw = camera.width,
                dh = camera.height;

            if (camera.width < this.width) {
                sx = camera.x;
                sw = camera.width;
            } else {
                // dx = -camera.x;
                dx = Math.floor((camera.width - this.width) / 2);
                dw = this.width;
            }

            if (camera.height < this.height) {
                sy = camera.y;
                sh = camera.height;
            } else {
                // dy = -camera.y;
                dy = Math.floor((camera.height - this.height) / 2);
                dh = this.height;
            }

            camera.context.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./scenes/main/teleport.js":
/*!*********************************!*\
  !*** ./scenes/main/teleport.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _characters = __webpack_require__(/*! ../../characters */ "./characters.js");

var _characters2 = _interopRequireDefault(_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Teleport
 */
var _class = function () {
    function _class(room_id, x, y, character_id, ID, target, state, width, height) {
        _classCallCheck(this, _class);

        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = _characters2.default.get(character_id) || _characters2.default.get('teleport');

        this.state = state;

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;

        this.target = {
            room_id: target.room_id,
            x: target.x,
            y: target.y
        };
    }

    _createClass(_class, [{
        key: 'set',
        value: function set(state) {

            if (this.state !== state) {
                this.faza = 0;
                this.currentSpriteNum = 0;
                this.state = state;
            }
        }
    }, {
        key: 'draw',
        value: function draw(camera) {
            if (!this.character) return false;

            if (!this.character.sprite.states[this.state]) {
                this.state = 'default';
            }
            if (!this.character.sprite.states[this.state]) {
                return false;
            }

            var x = this.x - (this.character.width - this.width) / 2 - camera.x,
                y = this.y - this.character.height + this.height - camera.y;

            // не рисуем вне камеры
            if (x < -this.character.width || y < -this.character.height || x > camera.width || y > camera.height) {
                return true;
            }

            this.character.draw(camera.context, x, y, this.state, this.currentSpriteNum, this.width, this.height);

            // Рисуем пятно коллизий
            /*camera.context.save();
            camera.context.beginPath();
            camera.context.fillStyle = "rgba(255,255,67,0.4)";
            camera.context.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
            camera.context.rect(x, y, this.character.width, this.character.height);
            camera.context.stroke();
            camera.context.restore();*/
        }
    }, {
        key: 'animate',
        value: function animate(step) {
            this.faza += this.animateSpeed * step;
            this.currentSpriteNum = Math.floor(this.faza);

            if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length) {
                this.faza = 0;
                this.currentSpriteNum = 0;
            }
        }
    }]);

    return _class;
}();

exports.default = _class;

/***/ }),

/***/ "./scenes/main/ui/heroinfo.js":
/*!************************************!*\
  !*** ./scenes/main/ui/heroinfo.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../../../events */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Окно информации о герое
 */
exports.default = { start: start, stop: stop, update: update

    // html-елементы в которые покажем информацию о герое/игре

};
var hero_infoElement = document.getElementById("hero-panel");
var hero_nameElement = document.getElementById("hero-name");
var scoreElement = document.getElementById("coins_count");
var levelElement = document.getElementById("hero_level");
var levelupcounterElement = document.getElementById("hero_levelupcounter");
var speedElement = document.getElementById("hero_speed");
var healthElement = document.getElementById("hero_health");

function start() {
    hero_infoElement.style.display = 'block';
    window.addEventListener('mouseup', onClick, false);
}
function stop() {
    window.removeEventListener('mouseup', onClick, false);
}

function onClick(e) {

    var target = e.target || e.srcElement;

    if (target.id && target.id === "signout_button") {
        e.stopPropagation();
        e.preventDefault();

        //if(confirm("Точно выйти?")){
        _events2.default.add('signout', null);
        //}
        return false;
    }
}

/**
 * Показ информации о герое
 * @param info
 * @param login
 */
function update(info) {
    hero_nameElement && (hero_nameElement.innerText = info.name);
    scoreElement && (scoreElement.innerText = info.coins_count);
    levelElement && (levelElement.innerText = info.level);
    speedElement && (speedElement.innerText = info.speed);
    levelupcounterElement && (levelupcounterElement.innerText = info.levelupValue - info.levelupCounter);
    healthElement && (healthElement.innerText = info.health);
}

/***/ }),

/***/ "./scenes/main/ui/skills.js":
/*!**********************************!*\
  !*** ./scenes/main/ui/skills.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../../../events */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Умения / эффекты
 */
exports.default = { start: start, stop: stop

    // html-елементы

};
var skillsPanel = document.getElementById("skills-panel");

var skillsElements = {
    skill1: document.getElementById("skill1"),
    skill2: document.getElementById("skill2"),
    skill3: document.getElementById("skill3"),
    skill4: document.getElementById("skill4"),
    skill5: document.getElementById("skill5"),
    skill6: document.getElementById("skill6"),
    skill7: document.getElementById("skill7"),
    skill8: document.getElementById("skill8"),
    skill9: document.getElementById("skill9"),
    skill10: document.getElementById("skill10")
};
var allSkills = document.querySelectorAll(".skill");

function start() {
    //Покажем
    skillsPanel.style.display = 'block';

    skillsPanel.addEventListener('mouseup', onMouseUp, false);
    skillsPanel.addEventListener('mousedown', onMouseDown, false);

    //Если смена умения - сменим
    _events2.default.on('skill-change', function (eventName, ID) {
        return selectSkill(ID);
    });

    //Обновление иконок и готовности умений
    _events2.default.on('skills', function (eventName, type, data) {
        if (type === 'update') {
            for (var skill_id in data) {
                if (skillsElements[skill_id]) {

                    var skill = skillsElements[skill_id];

                    //Иконка соответствующая умению
                    var iconElement = skill.querySelector('.skill-icon');
                    //"Веко" умения
                    var vekoElement = skill.querySelector('.veko');
                    iconElement.className = "";
                    iconElement.classList.add('skill-icon');
                    iconElement.classList.add(data[skill_id].icon);

                    var classList = vekoElement.classList;

                    while (classList.length > 0) {
                        classList.remove(classList.item(0));
                    }

                    classList.add("veko");
                    classList.add("value" + Math.floor(data[skill_id].value / 10) * 10);
                }
            }
        }
    });
}

function stop() {
    skillsPanel.removeEventListener('mousedown', onMouseDown, false);
    skillsPanel.removeEventListener('mouseup', onMouseUp, false);
    skillsPanel.style.display = 'none';
}

function selectSkill(ID) {
    if (skillsElements[ID]) {
        allSkills.forEach(function (skill) {
            return skill.classList.remove("active");
        });
        skillsElements[ID].classList.add("active");
    }
}

function onMouseDown(e) {
    var target = e.target || e.srcElement;

    if (target.classList.contains("skill-icon") || target.classList.contains("veko")) {
        target = target.parentElement;
    }

    if (target.classList.contains("skill")) {
        if (!target.classList.contains("active")) {
            _events2.default.add('skill-change', target.id);
        }
        _events2.default.add("keydown", "fire");
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}

//По mouseup
function onMouseUp(e) {

    var target = e.target || e.srcElement;

    if (target.classList.contains("skill-icon") || target.classList.contains("veko")) {
        target = target.parentElement;
    }

    if (target.classList.contains("skill")) {
        _events2.default.add("keyup", "fire");
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}

/***/ }),

/***/ "./scenes/main/ui/top10.js":
/*!*********************************!*\
  !*** ./scenes/main/ui/top10.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../../../events */ "./events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var active = false;

/**
 * Окно ТОП-10
 */
exports.default = { start: start, stop: stop, isActive: isActive, show: show, hide: hide

    // html-елементы в которые покажем информацию

};
var top10Element = document.getElementById("top10-panel");
var top10ContentElement = document.getElementById("top10-panel-content");

function start() {
    top10Element.addEventListener('mouseup', onClick, false);

    _events2.default.on("keyup", function (eventName, keyCode) {
        if (keyCode === "statistic") {
            if (isActive()) {
                hide();
            } else {
                show();
            }
        }
    });

    _events2.default.on("server", update);
}
function stop() {
    top10Element.removeEventListener('mouseup', onClick, false);
    _events2.default.off("server", update);
}

function show() {
    top10Element.style.right = 0;
    active = true;
}

function hide() {
    active = false;
    top10Element.style.right = '-196px';
}

function isActive() {
    return active;
}

function onClick(e) {

    if (isActive()) {
        hide();
    } else {
        show();
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
}

/**
 * Показ информации
 */
function update(eventName, type, data) {
    if (type === "statistic") {
        if (Array.isArray(data.info)) {
            var content = '';
            data.info.forEach(function (player) {
                //log(player.ID + ' - ' + player.level);
                content += '\
                    <div class="row">\
                        <div class="label">' + player.ID + ':</div>\
                        <div id="hero_speed" class="value">' + player.score + '</div>\
                    </div>\
';
                top10ContentElement.innerHTML = content;
            });
        }
    }
}

/***/ }),

/***/ "./scenes/main/ui/ui.js":
/*!******************************!*\
  !*** ./scenes/main/ui/ui.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _top = __webpack_require__(/*! ./top10 */ "./scenes/main/ui/top10.js");

var _top2 = _interopRequireDefault(_top);

var _heroinfo = __webpack_require__(/*! ./heroinfo.js */ "./scenes/main/ui/heroinfo.js");

var _heroinfo2 = _interopRequireDefault(_heroinfo);

var _skills = __webpack_require__(/*! ./skills.js */ "./scenes/main/ui/skills.js");

var _skills2 = _interopRequireDefault(_skills);

var _waitscreen = __webpack_require__(/*! ./waitscreen */ "./scenes/main/ui/waitscreen.js");

var _waitscreen2 = _interopRequireDefault(_waitscreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Панель умений
/**
 * Интерфейс пользователя
 */

// Окно Топ-10
exports.default = { heroInfo: _heroinfo2.default, skills: _skills2.default, top10: _top2.default, waitScreen: _waitscreen2.default };
// Экран загрузки

// Окно информации о герое

/***/ }),

/***/ "./scenes/main/ui/waitscreen.js":
/*!**************************************!*\
  !*** ./scenes/main/ui/waitscreen.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Экран загрузки
 */

var waitScreenElement = document.getElementById("loading");

exports.default = { show: show, hide: hide };


function show() {
    waitScreenElement.style.display = 'block';
}

function hide() {
    waitScreenElement.style.display = 'none';
}

/***/ }),

/***/ "./scenes/main/unit.js":
/*!*****************************!*\
  !*** ./scenes/main/unit.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class Unit
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _constants = __webpack_require__(/*! ../../constants */ "./constants.js");

var _characters = __webpack_require__(/*! ../../characters */ "./characters.js");

var _characters2 = _interopRequireDefault(_characters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CHARACTER_DEFAULT = 'blond';

var MAX_HEALTH = 100;

var Unit = function () {
    /**
     * Конструктор
     * @param data
     */
    function Unit(data, isHero) {
        _classCallCheck(this, Unit);

        if (isHero) {
            this.isHero = true;
        }

        this.room_id = data.room_id;

        this.x = data.x;
        this.y = data.y;

        this.width = data.width;
        this.height = data.height;

        this.character = _characters2.default.get(data.character_id) || _characters2.default.get(CHARACTER_DEFAULT);

        this.state = data.state || 'default';

        this.name = data.name;

        this.level = data.level;
        this.coins_count = data.coins_count;
        this.levelupValue = data.levelupValue;
        this.levelupCounter = data.levelupCounter;

        this.health = data.health;

        this.animateSpeed = 14; //TODO: вынести в character
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    /**
     * Установка параметров юнита
     * @param data
     */


    _createClass(Unit, [{
        key: "set",
        value: function set(data) {

            this.room_id = data.room_id;
            this.x = data.x;
            this.y = data.y;
            this.character = _characters2.default.get(data.character_id) || _characters2.default.get(CHARACTER_DEFAULT);

            this.name = data.name;

            if (this.state !== data.state) {
                this.faza = 0;
                this.currentSpriteNum = 0;
            }
            this.state = data.state;

            this.level = data.level;
            this.coins_count = data.coins_count;
            this.levelupValue = data.levelupValue;
            this.levelupCounter = data.levelupCounter;

            this.health = data.health;
        }
    }, {
        key: "animate",
        value: function animate() {
            //Анимация
            this.faza += this.animateSpeed * _constants.STEP;
            this.currentSpriteNum = Math.floor(this.faza);

            if (this.currentSpriteNum < 0 || this.currentSpriteNum >= this.character.sprite.states[this.state].length) {
                this.faza = 0;
                this.currentSpriteNum = 0;
            }
        }
    }, {
        key: "draw",
        value: function draw(camera) {
            if (!this.character) return false;

            if (!this.character.sprite.states[this.state]) {
                this.state = 'default';
            }
            if (!this.character.sprite.states[this.state]) {
                return false;
            }

            var x = this.x - camera.x,
                y = this.y - camera.y;

            // не рисуем вне камеры
            if (x < -this.character.width || y < -this.character.height || x > camera.width || y > camera.height) {
                return true;
            }

            this.drawShadow(camera.context, x, y);

            this.drawCharacter(camera.context, x, y);

            // Рисуем имя
            if (this.level != undefined) {

                this.drawName(camera.context, x, y - 55, this.name, this.level, this.isHero);
            }

            // Если есть - рисуем индикатор
            if (this.health != undefined) {

                var volume = void 0;

                volume = Math.floor(this.health * 100 / MAX_HEALTH);

                this.drawVolume(camera.context, x, y - 50, volume);
            }
        }
    }, {
        key: "drawCharacter",
        value: function drawCharacter(context, sx, sy) {
            var x = sx - (this.character.width - this.width) / 2,
                y = sy - (this.character.height - this.height);

            this.character.draw(context, x, y, this.state, this.currentSpriteNum, this.width, this.height);

            // Рисуем пятно коллизий
            /*context.save();
            context.beginPath();
            context.fillStyle = "rgba(255,255,67,0.4)";
            context.fillRect(sx, sy, this.width, this.height);
            context.rect(x, y, this.character.width, this.character.height);
            context.stroke();
            context.restore();*/
        }

        /**
         * Рисуем индикатор
         * @param context
         * @param x
         * @param y
         * @param value
         */

    }, {
        key: "drawVolume",
        value: function drawVolume(context, x, y, value) {

            var volumeWidth = 50;
            var volumeHeight = 4;
            var volumeX = x + (this.width - volumeWidth) / 2;
            var volumeY = y;

            context.save();
            context.beginPath();
            context.fillStyle = "red";
            context.fillRect(volumeX, volumeY, Math.floor(volumeWidth * value / 100), volumeHeight);
            context.rect(volumeX - 1, volumeY - 1, volumeWidth + 2, volumeHeight + 2);
            context.stroke();
            context.restore();
        }

        /**
         * Рисуем имя
         * @param context
         * @param sx
         * @param sy
         * @param name
         * @param level
         * @param isHero
         */

    }, {
        key: "drawName",
        value: function drawName(context, sx, sy, name, level, isHero) {

            var paddingColor = "rgba(0,0,0,0.3)";
            if (isHero) {
                paddingColor = "rgba(0,200,40,0.4)";
            }

            context.save();

            //Имя
            context.font = "14px sans-serif";
            var textWidth = context.measureText(name).width;

            //Уровень
            context.font = "bold 12px Arial";
            var textLevelWidth = context.measureText(level).width;

            //Считаем размеры
            var padWidth = textWidth + textLevelWidth + 2;

            var lx = sx + (this.width - padWidth) / 2,
                x = lx + textLevelWidth + 2,
                ly = sy,
                y = sy;

            context.beginPath();
            context.fillStyle = paddingColor;
            context.arc(lx - 2, y - 12 + 18 / 2, 18 / 2, Math.PI / 2, -Math.PI / 2);
            context.arc(lx - 2 + padWidth, y - 12 + 18 / 2, 18 / 2, -Math.PI / 2, Math.PI / 2);
            context.rect(lx - 2, y - 12, padWidth, 18);
            context.fill();
            context.beginPath();

            context.font = "14px sans-serif";
            context.fillStyle = "yellow";
            context.fillText(name, x, y);

            context.font = "bold 12px Arial";
            context.fillStyle = "white";
            context.fillText(level, lx, ly);

            context.restore();
        }
    }, {
        key: "drawShadow",
        value: function drawShadow(context, x, y) {

            var shadowColor1 = "rgba(0,0,0,0.1)",
                shadowColor2 = "rgba(0,0,0,0.15)",
                shadowColor3 = "rgba(0,0,0,0.2)";

            context.save();

            context.beginPath();
            context.fillStyle = shadowColor1;
            context.ellipse(x + this.width / 2, y + this.height - 2, 20, 10, 0, 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            context.fillStyle = shadowColor2;
            context.ellipse(x + this.width / 2, y + this.height - 2, 17, 8, 0, 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            context.fillStyle = shadowColor2;
            context.ellipse(x + this.width / 2, y + this.height - 2, 15, 7, 0, 0, 2 * Math.PI);
            context.fill();

            context.restore();
        }
    }]);

    return Unit;
}();

exports.default = Unit;

/***/ }),

/***/ "./scenes/main/units.js":
/*!******************************!*\
  !*** ./scenes/main/units.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = { item: item, add: add, remove: remove, reset: reset, toArray: toArray };


var units = {};

/**
 * Возвращает юнит по имени
 * @param ID
 * @returns Unit
 */
function item(ID) {
    return units[ID];
}

function add(ID, unit) {
    units[ID] = unit;
}

function remove(ID) {
    if (ID in units) delete units[ID];
}

function reset() {
    for (var i in units) {
        delete units[i];
    }
}

function toArray() {
    var unitsArray = [];
    for (var i in units) {
        unitsArray.push(units[i]);
    }
    return unitsArray;
}

/***/ }),

/***/ "./scenes/signin.js":
/*!**************************!*\
  !*** ./scenes/signin.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _account = __webpack_require__(/*! ../account */ "./account.js");

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { start: start, stop: stop };


var login_panelElement = document.getElementById("login-panel");
var login_formElement = document.getElementById("login-form");
var login_inputElement = document.getElementById("login-input");
var password_inputElement = document.getElementById("password-input");

var finalCallback = null;

var timeout = null,
    timeout_p = null;

// Выведем окно авторизации. Модальное
function start(callback) {

    finalCallback = callback;

    //Получим из локал стора
    var userAccount = _account2.default.get();

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
    var obj = e.target || e.srcElement;
    var key = e.keyCode;

    //Если Enter и без проблем
    if (key === 13 && validate(login_inputElement.value, password_inputElement.value)) {

        stop();
        // Получив сохраним
        var accountData = { login: login_inputElement.value, password: password_inputElement.value };
        _account2.default.set(accountData);

        finalCallback(accountData);
    }
    //Если таб - по-умолчанию
    else if (key === 9) {} else if (
        //символы разрешенные в логине
        /^[a-zA-Z0-9 +.\-_:"()]*?$/.test(obj.value) && obj.value.length < 10 // Максимальная длина логина
        ) {
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
    var target = e.target || e.srcElement;

    // Если нажали "Войти" и логин норм - запустим функцию входа
    if (target.id === 'login-button' && validate(login_inputElement.value, password_inputElement.value)) {

        stop();

        var accountData = { login: login_inputElement.value, password: password_inputElement.value };
        _account2.default.set(accountData);

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

/***/ }),

/***/ "./sounds.js":
/*!*******************!*\
  !*** ./sounds.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sound = __webpack_require__(/*! ./engine/sound.js */ "./engine/sound.js");

var _sound2 = _interopRequireDefault(_sound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    "level_up": new _sound2.default('sound/cash.mp3'),
    "npc_eat_coin": new _sound2.default('sound/coin/coin3.wav'),
    "eat_coin_gold": new _sound2.default('sound/coin/coin.wav'),
    "eat_coin_silver": new _sound2.default('sound/coin/eat2.mp3'),
    "eat_coin_copper": new _sound2.default('sound/coin/eat1.mp3'),
    "teleport": new _sound2.default('sound/teleport/flaunch.wav'),
    "push-effect": new _sound2.default('sound/hit/dropLeather.ogg')
};

/***/ }),

/***/ "./sprites.js":
/*!********************!*\
  !*** ./sprites.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Спрайты
 */

//Картинки
var s_doc = document.getElementById('s_doc'),
    s_prof = document.getElementById('s_prof'),
    s_gob = document.getElementById('s_gob'),
    s_girl = document.getElementById('s_girl'),
    s_blond = document.getElementById('s_blond'),
    s_mag = document.getElementById('s_mag'),
    s_teleport = document.getElementById('s_teleport'),
    s_coins = document.getElementById('s_coins'),
    t_trees = document.getElementById('t_trees'),
    t_bushs = document.getElementById('t_bushs'),
    t_plants = document.getElementById('t_plants'),
    s_pointer = document.getElementById('s_pointer'),
    s_boom = document.getElementById('s_boom'),
    s_boom1 = document.getElementById('s_boom1'),
    s_boom2 = document.getElementById('s_boom2'),
    s_barier = document.getElementById('s_barier'),
    s_push = document.getElementById('s_push'),
    s_crystals = document.getElementById('s_crystals'),
    s_skeleton = document.getElementById('s_skeleton'),
    s_katy = document.getElementById('s_katy'),
    s_levon = document.getElementById('s_levon'),
    s_vitaly = document.getElementById('s_vitaly'),
    t_cool_plants = document.getElementById('t_cool_plants'),
    t_andstones = document.getElementById('t_andstones');

/**
 * Доктор
 */
exports.doc = {
    "image": s_doc,
    "width": 64,
    "height": 64,

    "states": {
        "default": [{ "name": "doc1", "x": 0, "y": 0, "width": 32, "height": 32 }],

        "run": [{ "name": "doc1", "x": 0, "y": 0, "width": 32, "height": 32 }, { "name": "doc3", "x": 32, "y": 0, "width": 32, "height": 32 }, { "name": "doc1", "x": 0, "y": 0, "width": 32, "height": 32 }, { "name": "doc2", "x": 0, "y": 32, "width": 32, "height": 32 }]
    }

};

/**
 * Профессор
 */
exports.prof = {
    "image": s_prof,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "idle", "x": 0, "y": 128, "width": 64, "height": 64 }],

        "run": [
        // {"name": "idle", "x": 0, "y": 128, "width": 64, "height": 64},
        { "name": "run1", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "run2", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "run3", "x": 192, "y": 128, "width": 64, "height": 64 }, { "name": "run4", "x": 256, "y": 128, "width": 64, "height": 64 }, { "name": "run5", "x": 320, "y": 128, "width": 64, "height": 64 }, { "name": "run6", "x": 384, "y": 128, "width": 64, "height": 64 }, { "name": "run7", "x": 448, "y": 128, "width": 64, "height": 64 }, { "name": "run8", "x": 512, "y": 128, "width": 64, "height": 64 }]
    }

};

/**
 * Гоблин
 */
exports.gob = {
    "image": s_gob,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "gob1", "x": 130, "y": 0, "width": 65, "height": 65 }],

        "run": [{ "name": "gob2", "x": 0, "y": 0, "width": 65, "height": 65 }, { "name": "gob3", "x": 0, "y": 65, "width": 65, "height": 65 }, { "name": "gob4", "x": 65, "y": 0, "width": 65, "height": 65 }, { "name": "gob5", "x": 65, "y": 65, "width": 65, "height": 65 }, { "name": "gob6", "x": 0, "y": 130, "width": 65, "height": 65 }, { "name": "gob7", "x": 65, "y": 130, "width": 65, "height": 65 }]
    }

};

/**
 * Девочка
 */
exports.girl = {
    "image": s_girl,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "girl1", "x": 0, "y": 0, "width": 64, "height": 64 }],

        "run": [{ "name": "girl1", "x": 0, "y": 0, "width": 64, "height": 64 }, { "name": "girl2", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "girl3", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "girl4", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "girl5", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "girl6", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "girl7", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "girl8", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "girl9", "x": 128, "y": 128, "width": 64, "height": 64 }]
    }
};

/**
 * Блондин
 */
exports.blond = {
    "image": s_blond,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "blond1", "x": 0, "y": 0, "width": 64, "height": 64 }],

        "run": [{ "name": "blond1", "x": 0, "y": 0, "width": 64, "height": 64 }, { "name": "blond2", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "blond3", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "blond4", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "blond5", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "blond6", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "blond7", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "blond8", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "blond9", "x": 128, "y": 128, "width": 64, "height": 64 }]
    }
};

/**
 * Маг
 */
exports.mag = {
    "image": s_mag,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "mag1", "x": 0, "y": 0, "width": 64, "height": 64 }],

        "run": [{ "name": "mag1", "x": 0, "y": 0, "width": 64, "height": 64 }, { "name": "mag2", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "mag3", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "mag4", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "mag5", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "mag6", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "mag7", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "mag8", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "mag9", "x": 128, "y": 128, "width": 64, "height": 64 }]
    }
};

/**
 * Золотая монета
 */
exports.coin_gold = {
    "image": s_coins,
    "width": 44,
    "height": 44,

    "states": {
        "default": [{ "name": "gold1", "x": 224, "y": 64, "width": 32, "height": 32 }, { "name": "gold2", "x": 0, "y": 64, "width": 32, "height": 32 }, { "name": "gold3", "x": 32, "y": 64, "width": 32, "height": 32 }, { "name": "gold4", "x": 64, "y": 64, "width": 32, "height": 32 }, { "name": "gold5", "x": 96, "y": 64, "width": 32, "height": 32 }, { "name": "gold6", "x": 128, "y": 64, "width": 32, "height": 32 }, { "name": "gold7", "x": 160, "y": 64, "width": 32, "height": 32 }, { "name": "gold8", "x": 192, "y": 64, "width": 32, "height": 32 }]
    }
};

/**
 * Серебрянная монета
 */
exports.coin_silver = {
    "image": s_coins,
    "width": 44,
    "height": 44,

    "states": {
        "default": [{ "name": "silver1", "x": 0, "y": 32, "width": 32, "height": 32 }, { "name": "silver2", "x": 224, "y": 32, "width": 32, "height": 32 }, { "name": "silver3", "x": 32, "y": 32, "width": 32, "height": 32 }, { "name": "silver4", "x": 64, "y": 32, "width": 32, "height": 32 }, { "name": "silver5", "x": 96, "y": 32, "width": 32, "height": 32 }, { "name": "silver6", "x": 128, "y": 32, "width": 32, "height": 32 }, { "name": "silver7", "x": 160, "y": 32, "width": 32, "height": 32 }, { "name": "silver8", "x": 192, "y": 32, "width": 32, "height": 32 }]
    }
};

/**
 * Медная монета
 */
exports.coin_copper = {
    "image": s_coins,
    "width": 44,
    "height": 44,

    "states": {
        "default": [{ "name": "copper1", "x": 0, "y": 0, "width": 32, "height": 32 }, { "name": "copper2", "x": 32, "y": 0, "width": 32, "height": 32 }, { "name": "copper3", "x": 64, "y": 0, "width": 32, "height": 32 }, { "name": "copper4", "x": 96, "y": 0, "width": 32, "height": 32 }, { "name": "copper5", "x": 128, "y": 0, "width": 32, "height": 32 }, { "name": "copper6", "x": 160, "y": 0, "width": 32, "height": 32 }, { "name": "copper7", "x": 192, "y": 0, "width": 32, "height": 32 }, { "name": "copper8", "x": 224, "y": 0, "width": 32, "height": 32 }]
    }
};

/**
 * Трава
 */
exports.grass = {
    "image": t_trees,

    "states": {
        "default": [{ "name": "tree_46", "x": 218, "y": 91, "width": 76, "height": 90 }]
    }
};

/**
 * Деревья
 */
exports.trees = {
    "image": t_trees,

    "states": {
        "default": [{ "name": "tree_01", "x": 313, "y": 134, "width": 68, "height": 68 }, { "name": "tree_02", "x": 0, "y": 459, "width": 44, "height": 42 }, { "name": "tree_03", "x": 313, "y": 272, "width": 68, "height": 68 }, { "name": "tree_04", "x": 313, "y": 65, "width": 68, "height": 68 }, { "name": "tree_05", "x": 244, "y": 396, "width": 54, "height": 54 }, { "name": "tree_06", "x": 452, "y": 340, "width": 46, "height": 48 }, { "name": "tree_07", "x": 452, "y": 181, "width": 56, "height": 58 }, { "name": "tree_08", "x": 313, "y": 341, "width": 50, "height": 52 }, { "name": "tree_09", "x": 86, "y": 459, "width": 40, "height": 40 }, { "name": "tree_10", "x": 384, "y": 66, "width": 66, "height": 66 }, { "name": "tree_11", "x": 452, "y": 240, "width": 47, "height": 52 }, { "name": "tree_12", "x": 405, "y": 396, "width": 46, "height": 48 }, { "name": "tree_13", "x": 127, "y": 459, "width": 32, "height": 32 }, { "name": "tree_14", "x": 452, "y": 389, "width": 46, "height": 44 }, { "name": "tree_15", "x": 384, "y": 133, "width": 66, "height": 66 }, { "name": "tree_16", "x": 452, "y": 293, "width": 48, "height": 46 }, { "name": "tree_17", "x": 452, "y": 122, "width": 54, "height": 58 }, { "name": "tree_18", "x": 313, "y": 0, "width": 70, "height": 64 }, { "name": "tree_19", "x": 452, "y": 0, "width": 56, "height": 60 }, { "name": "tree_20", "x": 299, "y": 396, "width": 52, "height": 54 }, { "name": "tree_21", "x": 384, "y": 267, "width": 64, "height": 60 }, { "name": "tree_22", "x": 452, "y": 61, "width": 54, "height": 60 }, { "name": "tree_23", "x": 245, "y": 313, "width": 64, "height": 68 }, { "name": "tree_24", "x": 45, "y": 459, "width": 40, "height": 42 }, { "name": "tree_25", "x": 0, "y": 396, "width": 60, "height": 62 }, { "name": "tree_26", "x": 218, "y": 182, "width": 50, "height": 50 }, { "name": "tree_27", "x": 384, "y": 328, "width": 60, "height": 62 }, { "name": "tree_28", "x": 237, "y": 234, "width": 70, "height": 70 }, { "name": "tree_29", "x": 352, "y": 396, "width": 52, "height": 52 }, { "name": "tree_30", "x": 384, "y": 200, "width": 66, "height": 66 }, { "name": "tree_38", "x": 0, "y": 0, "width": 110, "height": 120 }, { "name": "tree_39", "x": 111, "y": 0, "width": 106, "height": 120 }, { "name": "tree_40", "x": 384, "y": 0, "width": 67, "height": 65 }, { "name": "tree_41", "x": 162, "y": 313, "width": 82, "height": 76 }, { "name": "tree_42", "x": 87, "y": 234, "width": 78, "height": 76 }, { "name": "tree_43", "x": 0, "y": 313, "width": 84, "height": 82 }, { "name": "tree_44", "x": 0, "y": 121, "width": 110, "height": 112 }, { "name": "tree_46", "x": 218, "y": 91, "width": 76, "height": 90 }, { "name": "tree_47", "x": 122, "y": 396, "width": 60, "height": 56 }, { "name": "tree_48", "x": 61, "y": 396, "width": 60, "height": 56 }, { "name": "tree_49", "x": 183, "y": 396, "width": 60, "height": 56 }, { "name": "tree_50", "x": 166, "y": 234, "width": 70, "height": 76 }, { "name": "tree_51", "x": 0, "y": 234, "width": 86, "height": 78 }, { "name": "tree_52", "x": 313, "y": 203, "width": 68, "height": 68 }, { "name": "tree_53", "x": 111, "y": 121, "width": 94, "height": 98 }, { "name": "tree_54", "x": 218, "y": 0, "width": 94, "height": 90 }, { "name": "tree_55", "x": 85, "y": 313, "width": 76, "height": 82 }]
    }
};

/**
 * Деревья и кусты
 */
exports.bushs = {
    "image": t_bushs,

    "states": {
        "default": [{ "name": "sprite1", "x": 103, "y": 100, "width": 25, "height": 30 }, { "name": "sprite2", "x": 103, "y": 60, "width": 30, "height": 39 }, { "name": "sprite5", "x": 156, "y": 119, "width": 15, "height": 13 }, { "name": "sprite6", "x": 103, "y": 40, "width": 21, "height": 19 }, { "name": "sprite7", "x": 136, "y": 119, "width": 19, "height": 19 }, { "name": "sprite8", "x": 103, "y": 0, "width": 32, "height": 39 }]
    }
};

/**
 * Пустынное
 */
exports.desert = {
    "image": t_plants,

    "states": {
        "default": [
        // {"name": "sprite7", "x": 198, "y": 201, "width": 27, "height": 58},
        { "name": "sprite13", "x": 198, "y": 293, "width": 31, "height": 30 }]
    }
};

/**
 * Странные деревья
 */
exports.belwood = {
    "image": t_plants,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 201, "width": 107, "height": 128 }, { "name": "sprite2", "x": 108, "y": 201, "width": 89, "height": 128 }, { "name": "sprite19", "x": 0, "y": 330, "width": 95, "height": 117 }, { "name": "sprite20", "x": 244, "y": 0, "width": 126, "height": 116 }]
    }
};

/**
 * Телепорт
 */
exports.teleport = {
    "image": s_teleport,
    "width": 90,
    "height": 49,

    "states": {
        "default": [{ "name": "idle", "x": 0, "y": 0, "width": 90, "height": 49 }],
        "run": [{ "name": "run1", "x": 0, "y": 49, "width": 90, "height": 49 }, { "name": "run2", "x": 0, "y": 98, "width": 90, "height": 49 }, { "name": "run3", "x": 90, "y": 0, "width": 90, "height": 49 }, { "name": "run4", "x": 90, "y": 49, "width": 90, "height": 49 }]
    }
};

/**
 * Указатель
 */
exports.pointer = {
    "image": s_pointer,
    "width": 64,
    "height": 64,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 201, "height": 201 }, { "name": "sprite2", "x": 201, "y": 0, "width": 201, "height": 201 }, { "name": "sprite3", "x": 402, "y": 0, "width": 201, "height": 201 }, { "name": "sprite4", "x": 603, "y": 0, "width": 201, "height": 201 }, { "name": "sprite5", "x": 804, "y": 0, "width": 201, "height": 201 }, { "name": "sprite6", "x": 0, "y": 201, "width": 201, "height": 201 }, { "name": "sprite7", "x": 201, "y": 201, "width": 201, "height": 201 }, { "name": "sprite8", "x": 402, "y": 201, "width": 201, "height": 201 }, { "name": "sprite9", "x": 603, "y": 201, "width": 201, "height": 201 }, { "name": "sprite10", "x": 804, "y": 201, "width": 201, "height": 201 }]
    }
};

/**
 * Взрыв
 */
exports.boom = {
    "image": s_boom,
    "width": 128,
    "height": 128,
    "speed": 30,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128 }, { "name": "sprite2", "x": 128, "y": 0, "width": 128, "height": 128 }, { "name": "sprite3", "x": 256, "y": 0, "width": 128, "height": 128 }, { "name": "sprite4", "x": 384, "y": 0, "width": 128, "height": 128 }, { "name": "sprite5", "x": 512, "y": 0, "width": 128, "height": 128 }, { "name": "sprite6", "x": 640, "y": 0, "width": 128, "height": 128 }, { "name": "sprite7", "x": 768, "y": 0, "width": 128, "height": 128 }, { "name": "sprite8", "x": 896, "y": 0, "width": 128, "height": 128 }, { "name": "sprite9", "x": 0, "y": 128, "width": 128, "height": 128 }, { "name": "sprite10", "x": 128, "y": 128, "width": 128, "height": 128 }, { "name": "sprite11", "x": 256, "y": 128, "width": 128, "height": 128 }, { "name": "sprite12", "x": 384, "y": 128, "width": 128, "height": 128 }, { "name": "sprite13", "x": 512, "y": 128, "width": 128, "height": 128 }, { "name": "sprite14", "x": 640, "y": 128, "width": 128, "height": 128 }, { "name": "sprite15", "x": 768, "y": 128, "width": 128, "height": 128 }, { "name": "sprite16", "x": 896, "y": 128, "width": 128, "height": 128 }, { "name": "sprite17", "x": 0, "y": 256, "width": 128, "height": 128 }, { "name": "sprite18", "x": 128, "y": 256, "width": 128, "height": 128 }, { "name": "sprite19", "x": 256, "y": 256, "width": 128, "height": 128 }, { "name": "sprite20", "x": 384, "y": 256, "width": 128, "height": 128 }, { "name": "sprite21", "x": 512, "y": 256, "width": 128, "height": 128 }, { "name": "sprite22", "x": 640, "y": 256, "width": 128, "height": 128 }, { "name": "sprite23", "x": 768, "y": 256, "width": 128, "height": 128 }, { "name": "sprite24", "x": 896, "y": 256, "width": 128, "height": 128 }, { "name": "sprite25", "x": 0, "y": 384, "width": 128, "height": 128 }, { "name": "sprite26", "x": 128, "y": 384, "width": 128, "height": 128 }, { "name": "sprite27", "x": 256, "y": 384, "width": 128, "height": 128 }, { "name": "sprite28", "x": 384, "y": 384, "width": 128, "height": 128 }, { "name": "sprite29", "x": 512, "y": 384, "width": 128, "height": 128 }, { "name": "sprite30", "x": 640, "y": 384, "width": 128, "height": 128 }, { "name": "sprite31", "x": 768, "y": 384, "width": 128, "height": 128 }, { "name": "sprite32", "x": 896, "y": 384, "width": 128, "height": 128 }, { "name": "sprite33", "x": 0, "y": 512, "width": 128, "height": 128 }, { "name": "sprite34", "x": 128, "y": 512, "width": 128, "height": 128 }, { "name": "sprite35", "x": 256, "y": 512, "width": 128, "height": 128 }, { "name": "sprite36", "x": 384, "y": 512, "width": 128, "height": 128 }, { "name": "sprite37", "x": 512, "y": 512, "width": 128, "height": 128 }, { "name": "sprite38", "x": 640, "y": 512, "width": 128, "height": 128 }, { "name": "sprite39", "x": 768, "y": 512, "width": 128, "height": 128 }, { "name": "sprite40", "x": 896, "y": 512, "width": 128, "height": 128 }, { "name": "sprite41", "x": 0, "y": 640, "width": 128, "height": 128 }, { "name": "sprite42", "x": 128, "y": 640, "width": 128, "height": 128 }, { "name": "sprite43", "x": 256, "y": 640, "width": 128, "height": 128 }, { "name": "sprite44", "x": 384, "y": 640, "width": 128, "height": 128 }, { "name": "sprite45", "x": 512, "y": 640, "width": 128, "height": 128 }, { "name": "sprite46", "x": 640, "y": 640, "width": 128, "height": 128 }, { "name": "sprite47", "x": 768, "y": 640, "width": 128, "height": 128 }, { "name": "sprite48", "x": 896, "y": 640, "width": 128, "height": 128 }, { "name": "sprite49", "x": 0, "y": 768, "width": 128, "height": 128 }, { "name": "sprite50", "x": 128, "y": 768, "width": 128, "height": 128 }, { "name": "sprite51", "x": 256, "y": 768, "width": 128, "height": 128 }, { "name": "sprite52", "x": 384, "y": 768, "width": 128, "height": 128 }, { "name": "sprite53", "x": 512, "y": 768, "width": 128, "height": 128 }, { "name": "sprite54", "x": 640, "y": 768, "width": 128, "height": 128 }, { "name": "sprite55", "x": 768, "y": 768, "width": 128, "height": 128 }, { "name": "sprite56", "x": 896, "y": 768, "width": 128, "height": 128 }, { "name": "sprite57", "x": 0, "y": 896, "width": 128, "height": 128 }, { "name": "sprite58", "x": 128, "y": 896, "width": 128, "height": 128 }, { "name": "sprite59", "x": 256, "y": 896, "width": 128, "height": 128 }, { "name": "sprite60", "x": 384, "y": 896, "width": 128, "height": 128 }, { "name": "sprite61", "x": 512, "y": 896, "width": 128, "height": 128 }, { "name": "sprite62", "x": 640, "y": 896, "width": 128, "height": 128 }, { "name": "sprite63", "x": 768, "y": 896, "width": 128, "height": 128 }, { "name": "sprite64", "x": 896, "y": 896, "width": 128, "height": 128 }]
    }
};

/**
 * Взрыв1
 */
exports.boom1 = {
    "image": s_boom1,
    "width": 64,
    "height": 64,
    "speed": 22,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128 }, { "name": "sprite2", "x": 128, "y": 0, "width": 128, "height": 128 }, { "name": "sprite3", "x": 256, "y": 0, "width": 128, "height": 128 }, { "name": "sprite4", "x": 384, "y": 0, "width": 128, "height": 128 }, { "name": "sprite5", "x": 0, "y": 128, "width": 128, "height": 128 }, { "name": "sprite6", "x": 128, "y": 128, "width": 128, "height": 128 }, { "name": "sprite7", "x": 256, "y": 128, "width": 128, "height": 128 }, { "name": "sprite8", "x": 384, "y": 128, "width": 128, "height": 128 }, { "name": "sprite9", "x": 0, "y": 256, "width": 128, "height": 128 }, { "name": "sprite10", "x": 128, "y": 256, "width": 128, "height": 128 }, { "name": "sprite11", "x": 256, "y": 256, "width": 128, "height": 128 }, { "name": "sprite12", "x": 384, "y": 256, "width": 128, "height": 128 }, { "name": "sprite13", "x": 0, "y": 384, "width": 128, "height": 128 }, { "name": "sprite14", "x": 128, "y": 384, "width": 128, "height": 128 }, { "name": "sprite15", "x": 256, "y": 384, "width": 128, "height": 128 }, { "name": "sprite16", "x": 384, "y": 384, "width": 128, "height": 128 }]
    }
};

/**
 * Взрыв2
 */
exports.boom2 = {
    "image": s_boom2,
    "width": 128,
    "height": 128,
    "speed": 28,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128 }, { "name": "sprite2", "x": 128, "y": 0, "width": 128, "height": 128 }, { "name": "sprite3", "x": 256, "y": 0, "width": 128, "height": 128 }, { "name": "sprite4", "x": 384, "y": 0, "width": 128, "height": 128 }, { "name": "sprite5", "x": 0, "y": 128, "width": 128, "height": 128 }, { "name": "sprite6", "x": 128, "y": 128, "width": 128, "height": 128 }, { "name": "sprite7", "x": 256, "y": 128, "width": 128, "height": 128 }, { "name": "sprite8", "x": 384, "y": 128, "width": 128, "height": 128 }, { "name": "sprite9", "x": 0, "y": 256, "width": 128, "height": 128 }, { "name": "sprite10", "x": 128, "y": 256, "width": 128, "height": 128 }, { "name": "sprite11", "x": 256, "y": 256, "width": 128, "height": 128 }, { "name": "sprite12", "x": 384, "y": 256, "width": 128, "height": 128 }, { "name": "sprite13", "x": 0, "y": 384, "width": 128, "height": 128 }, { "name": "sprite14", "x": 128, "y": 384, "width": 128, "height": 128 }, { "name": "sprite15", "x": 256, "y": 384, "width": 128, "height": 128 }, { "name": "sprite16", "x": 384, "y": 384, "width": 128, "height": 128 }]
    }
};

/**
 * Цель телепорта
 */
exports.barier = {
    "image": s_barier,
    "width": 128,
    "height": 128,
    "speed": 38,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 64, "height": 64 }, { "name": "sprite2", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "sprite3", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "sprite4", "x": 192, "y": 0, "width": 64, "height": 64 }, { "name": "sprite5", "x": 256, "y": 0, "width": 64, "height": 64 }, { "name": "sprite6", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "sprite7", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "sprite8", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "sprite9", "x": 192, "y": 64, "width": 64, "height": 64 }, { "name": "sprite10", "x": 256, "y": 64, "width": 64, "height": 64 }, { "name": "sprite11", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "sprite12", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite13", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "sprite14", "x": 192, "y": 128, "width": 64, "height": 64 }, { "name": "sprite15", "x": 256, "y": 128, "width": 64, "height": 64 }, { "name": "sprite16", "x": 0, "y": 192, "width": 64, "height": 64 }, { "name": "sprite17", "x": 64, "y": 192, "width": 64, "height": 64 }, { "name": "sprite18", "x": 128, "y": 192, "width": 64, "height": 64 }, { "name": "sprite19", "x": 192, "y": 192, "width": 64, "height": 64 }, { "name": "sprite20", "x": 256, "y": 192, "width": 64, "height": 64 }, { "name": "sprite21", "x": 0, "y": 256, "width": 64, "height": 64 }, { "name": "sprite22", "x": 64, "y": 256, "width": 64, "height": 64 }, { "name": "sprite23", "x": 128, "y": 256, "width": 64, "height": 64 }, { "name": "sprite24", "x": 192, "y": 256, "width": 64, "height": 64 }, { "name": "sprite25", "x": 256, "y": 256, "width": 64, "height": 64 }]
    }
};

/**
 * Эффект толчок
 */
exports.push1 = {
    "image": s_push,
    "width": 512,
    "height": 512,
    "speed": 30,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 64, "height": 64 },
        // {"name": "sprite2", "x": 0, "y": 64, "width": 64, "height": 64},
        // {"name": "sprite3", "x": 64, "y": 0, "width": 64, "height": 64},
        // {"name": "sprite4", "x": 64, "y": 64, "width": 64, "height": 64},
        // {"name": "sprite5", "x": 0, "y": 128, "width": 64, "height": 64},
        // {"name": "sprite6", "x": 64, "y": 128, "width": 64, "height": 64},
        { "name": "sprite7", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "sprite8", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "sprite9", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "sprite10", "x": 0, "y": 192, "width": 64, "height": 64 }]
    }
};
exports.blue_crystal = {
    "image": s_crystals,
    "width": 32,
    "height": 32,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite6", "x": 0, "y": 0, "width": 32, "height": 32 }, { "name": "sprite7", "x": 32, "y": 0, "width": 32, "height": 32 }, { "name": "sprite8", "x": 64, "y": 0, "width": 32, "height": 32 }, { "name": "sprite9", "x": 96, "y": 0, "width": 32, "height": 32 }, { "name": "sprite10", "x": 128, "y": 0, "width": 32, "height": 32 }, { "name": "sprite11", "x": 160, "y": 0, "width": 32, "height": 32 }, { "name": "sprite12", "x": 192, "y": 0, "width": 32, "height": 32 }, { "name": "sprite13", "x": 224, "y": 0, "width": 32, "height": 32 }]
    }
};

exports.green_crystal = {
    "image": s_crystals,
    "width": 32,
    "height": 32,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite14", "x": 0, "y": 32, "width": 32, "height": 32 }, { "name": "sprite15", "x": 32, "y": 32, "width": 32, "height": 32 }, { "name": "sprite16", "x": 64, "y": 32, "width": 32, "height": 32 }, { "name": "sprite17", "x": 96, "y": 32, "width": 32, "height": 32 }, { "name": "sprite18", "x": 128, "y": 32, "width": 32, "height": 32 }, { "name": "sprite19", "x": 160, "y": 32, "width": 32, "height": 32 }, { "name": "sprite20", "x": 192, "y": 32, "width": 32, "height": 32 }, { "name": "sprite21", "x": 224, "y": 32, "width": 32, "height": 32 }]
    }
};

exports.grey_crystal = {
    "image": s_crystals,
    "width": 32,
    "height": 32,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite22", "x": 0, "y": 64, "width": 32, "height": 32 }, { "name": "sprite23", "x": 32, "y": 64, "width": 32, "height": 32 }, { "name": "sprite24", "x": 64, "y": 64, "width": 32, "height": 32 }, { "name": "sprite25", "x": 96, "y": 64, "width": 32, "height": 32 }, { "name": "sprite26", "x": 128, "y": 64, "width": 32, "height": 32 }, { "name": "sprite27", "x": 160, "y": 64, "width": 32, "height": 32 }, { "name": "sprite28", "x": 192, "y": 64, "width": 32, "height": 32 }, { "name": "sprite29", "x": 224, "y": 64, "width": 32, "height": 32 }]
    }
};

exports.red_crystal = {
    "image": s_crystals,
    "width": 32,
    "height": 32,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite30", "x": 0, "y": 96, "width": 32, "height": 32 }, { "name": "sprite31", "x": 32, "y": 96, "width": 32, "height": 32 }, { "name": "sprite32", "x": 64, "y": 96, "width": 32, "height": 32 }, { "name": "sprite33", "x": 96, "y": 96, "width": 32, "height": 32 }, { "name": "sprite34", "x": 128, "y": 96, "width": 32, "height": 32 }, { "name": "sprite35", "x": 160, "y": 96, "width": 32, "height": 32 }, { "name": "sprite36", "x": 192, "y": 96, "width": 32, "height": 32 }, { "name": "sprite37", "x": 224, "y": 96, "width": 32, "height": 32 }]
    }
};

exports.magenta_crystal = {
    "image": s_crystals,
    "width": 32,
    "height": 32,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite38", "x": 0, "y": 128, "width": 32, "height": 32 }, { "name": "sprite39", "x": 32, "y": 128, "width": 32, "height": 32 }, { "name": "sprite40", "x": 64, "y": 128, "width": 32, "height": 32 }, { "name": "sprite41", "x": 96, "y": 128, "width": 32, "height": 32 }, { "name": "sprite42", "x": 128, "y": 128, "width": 32, "height": 32 }, { "name": "sprite43", "x": 160, "y": 128, "width": 32, "height": 32 }, { "name": "sprite44", "x": 192, "y": 128, "width": 32, "height": 32 }, { "name": "sprite45", "x": 224, "y": 128, "width": 32, "height": 32 }]
    }
};

exports.yellow_crystal = {
    "image": s_crystals,
    "width": 32,
    "height": 32,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite46", "x": 0, "y": 160, "width": 32, "height": 32 }, { "name": "sprite47", "x": 32, "y": 160, "width": 32, "height": 32 }, { "name": "sprite48", "x": 64, "y": 160, "width": 32, "height": 32 }, { "name": "sprite49", "x": 96, "y": 160, "width": 32, "height": 32 }, { "name": "sprite50", "x": 128, "y": 160, "width": 32, "height": 32 }, { "name": "sprite51", "x": 160, "y": 160, "width": 32, "height": 32 }, { "name": "sprite52", "x": 192, "y": 160, "width": 32, "height": 32 }, { "name": "sprite53", "x": 224, "y": 160, "width": 32, "height": 32 }]
    }
};

exports.skeleton = {
    "image": s_skeleton,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite79", "x": 0, "y": 0, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite80", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "sprite81", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "sprite82", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "sprite83", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "sprite84", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite85", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "sprite86", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "sprite87", "x": 128, "y": 128, "width": 64, "height": 64 }]
    }
};

exports.katy = {
    "image": s_katy,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite79", "x": 0, "y": 0, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite80", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "sprite81", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "sprite82", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "sprite83", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "sprite84", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite85", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "sprite86", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "sprite87", "x": 128, "y": 128, "width": 64, "height": 64 }]
    }
};

exports.levon = {
    "image": s_levon,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite79", "x": 0, "y": 0, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite80", "x": 0, "y": 64, "width": 64, "height": 64 }, { "name": "sprite81", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "sprite82", "x": 64, "y": 64, "width": 64, "height": 64 }, { "name": "sprite83", "x": 0, "y": 128, "width": 64, "height": 64 }, { "name": "sprite84", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite85", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "sprite86", "x": 128, "y": 64, "width": 64, "height": 64 }, { "name": "sprite87", "x": 128, "y": 128, "width": 64, "height": 64 }]
    }
};

exports.vitaly = {
    "image": s_vitaly,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64 }, { "name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64 }, { "name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64 }, { "name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64 }, { "name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64 }, { "name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64 }]
    }
};

/**
 * Классные деревья
 */
exports.cool_plants = {
    "image": t_cool_plants,

    "states": {
        "default": [{ "name": "foliage1", "x": 519, "y": 517, "width": 64, "height": 64 }, { "name": "foliage2_0", "x": 454, "y": 517, "width": 64, "height": 64 }, { "name": "foliage3_0", "x": 389, "y": 517, "width": 64, "height": 64 }, { "name": "foliage4", "x": 324, "y": 517, "width": 64, "height": 64 }, { "name": "foliage5", "x": 259, "y": 517, "width": 64, "height": 64 }, { "name": "foliage6", "x": 194, "y": 517, "width": 64, "height": 64 }, { "name": "foliage7", "x": 129, "y": 517, "width": 64, "height": 64 }, { "name": "foliage8", "x": 387, "y": 129, "width": 128, "height": 128 }, { "name": "foliage9", "x": 387, "y": 258, "width": 128, "height": 128 }, { "name": "palmtree1", "x": 0, "y": 388, "width": 128, "height": 128 }, { "name": "palmtree2", "x": 129, "y": 388, "width": 128, "height": 128 }, { "name": "palmtree3", "x": 129, "y": 0, "width": 128, "height": 128 }, { "name": "palmtree4", "x": 387, "y": 388, "width": 128, "height": 128 }, { "name": "palmtree5", "x": 516, "y": 0, "width": 128, "height": 128 }, { "name": "tree1_4", "x": 516, "y": 129, "width": 128, "height": 128 }, { "name": "tree2_1", "x": 516, "y": 258, "width": 128, "height": 128 }, { "name": "tree4", "x": 387, "y": 0, "width": 128, "height": 128 }, { "name": "tree5", "x": 258, "y": 259, "width": 128, "height": 128 }, { "name": "tree-strange", "x": 129, "y": 259, "width": 128, "height": 128 }, { "name": "palmtree6", "x": 0, "y": 0, "width": 128, "height": 129 }, { "name": "tree6", "x": 258, "y": 129, "width": 128, "height": 128 }, { "name": "tree7", "x": 258, "y": 0, "width": 128, "height": 128 }, { "name": "tree8", "x": 129, "y": 130, "width": 128, "height": 128 }, { "name": "tree9", "x": 516, "y": 387, "width": 128, "height": 97 }, { "name": "tree3", "x": 0, "y": 259, "width": 128, "height": 128 }]
    }
};

/**
 * Мертвые деревья
 */
exports.dead_plants = {
    "image": t_cool_plants,

    "states": {
        "default": [{ "name": "deadtree1_0", "x": 0, "y": 517, "width": 128, "height": 97 }, { "name": "deadtree2", "x": 258, "y": 388, "width": 128, "height": 128 }, { "name": "deadtree3", "x": 0, "y": 130, "width": 128, "height": 128 }]
    }
};

/**
 * Мертвые деревья
 */
exports.andstones = {
    "image": t_andstones,

    "states": {
        "default": [{ "name": "01", "x": 0, "y": 0, "width": 64, "height": 32 }, { "name": "02", "x": 0, "y": 33, "width": 64, "height": 32 }, { "name": "03", "x": 0, "y": 66, "width": 64, "height": 32 }, { "name": "04", "x": 65, "y": 0, "width": 64, "height": 32 }, { "name": "05", "x": 65, "y": 33, "width": 64, "height": 32 }, { "name": "06", "x": 65, "y": 66, "width": 64, "height": 32 }, { "name": "07", "x": 0, "y": 99, "width": 64, "height": 32 }, { "name": "08", "x": 65, "y": 99, "width": 64, "height": 32 }, { "name": "09", "x": 0, "y": 132, "width": 64, "height": 32 }, { "name": "10", "x": 65, "y": 132, "width": 64, "height": 32 }]
    }
};

/***/ }),

/***/ "./spritesets.js":
/*!***********************!*\
  !*** ./spritesets.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Наборы спрайтов
 */

//Картинки
var t_plants = document.getElementById('t_plants');
var s_graves = document.getElementById('s_graves');
var s_campfire = document.getElementById('s_campfire');

/**
 * Пустынное
 */
exports.desert = [{ "image": t_plants, "width": 27, "height": 58, "states": { "default": [{ "name": "sprite7", "x": 198, "y": 201, "width": 27, "height": 58 }] } }, { "image": t_plants, "width": 76, "height": 92, "states": { "default": [{ "name": "sprite14", "x": 233, "y": 330, "width": 76, "height": 92 }] } }, { "image": t_plants, "width": 60, "height": 87, "states": { "default": [{ "name": "sprite16", "x": 244, "y": 238, "width": 60, "height": 87 }] } }];

/**
 * Странные деревья
 */
exports.belwood = [{ "image": t_plants, "width": 107, "height": 128, "states": { "default": [{ "name": "sprite1", "x": 0, "y": 201, "width": 107, "height": 128 }] } }, { "image": t_plants, "width": 89, "height": 128, "states": { "default": [{ "name": "sprite2", "x": 108, "y": 201, "width": 89, "height": 128 }] } }, { "image": t_plants, "width": 95, "height": 117, "states": { "default": [{ "name": "sprite19", "x": 0, "y": 330, "width": 95, "height": 117 }] } }, { "image": t_plants, "width": 126, "height": 116, "states": { "default": [{ "name": "sprite20", "x": 244, "y": 0, "width": 126, "height": 116 }] } }];

/**
 * Деревья
 */
exports.bushs = [{ "image": t_bushs, "width": 113, "height": 118, "states": { "default": [{ "name": "sprite3", "x": 136, "y": 0, "width": 113, "height": 118 }] } }, { "image": t_bushs, "width": 102, "height": 140, "states": { "default": [{ "name": "sprite4", "x": 0, "y": 0, "width": 102, "height": 140 }] } }];

/**
 * Надгробья
 */
exports.graves = [{ "image": s_graves, "width": 22, "height": 32, "states": { "default": [{ "name": "sprite3", "x": 165, "y": 0, "width": 22, "height": 32 }] } }, { "image": s_graves, "width": 28, "height": 27, "states": { "default": [{ "name": "sprite5", "x": 98, "y": 2, "width": 28, "height": 27 }] } }];

/**
 * Костры
 */
exports.campfire = [{ "image": s_campfire, "width": 64, "height": 64, "states": { "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 64, "height": 64 }, { "name": "sprite2", "x": 64, "y": 0, "width": 64, "height": 64 }, { "name": "sprite3", "x": 128, "y": 0, "width": 64, "height": 64 }, { "name": "sprite4", "x": 192, "y": 0, "width": 64, "height": 64 }, { "name": "sprite5", "x": 256, "y": 0, "width": 64, "height": 64 }] } }];

/**
 * Классные деревья
 */
/*
exports.cool_plants = [
    {"image": t_cool_plants, "width": 128, "height": 97, "states": {"default": [{"name": "deadtree1_0", "x": 0, "y": 517, "width": 128, "height": 97}]}},
    {"image": t_cool_plants, "width": 128, "height": 128, "states": {"default": [{"name": "deadtree2", "x": 258, "y": 388, "width": 128, "height": 128}]}},
    {"image": t_cool_plants, "width": 128, "height": 128, "states": {"default": [{"name": "deadtree3", "x": 0, "y": 130, "width": 128, "height": 128}]}},
];*/

/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9jaGFyYWN0ZXJzLmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvY2hhcmFjdGVyLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS9zb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvdWkvdWkuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL3VpL3dhaXRzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWZ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWNrbzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ibG9iL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1pbmhlcml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy1qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL3V0ZjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNlcXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvdXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pcy1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vbG9vdC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi9yb29tLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3RlbGVwb3J0LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL2hlcm9pbmZvLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL3NraWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS90b3AxMC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS91aS5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS93YWl0c2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VuaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vdW5pdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL3NpZ25pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3ByaXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcHJpdGVzZXRzLmpzIiwid2VicGFjazovLy93cyAoaWdub3JlZCkiXSwibmFtZXMiOlsiZ2V0Iiwic2V0Iiwic2lnbm91dCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2dpbiIsInBhc3N3b3JkIiwiYWNjb3VudCIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNldHMiLCJpZCIsImFkZCIsInNwcml0ZV9pZCIsImxlbmd0aCIsImFkZFRvU2V0IiwiZ2V0RnJvbVNldCIsIklEIiwic2V0SUQiLCJzcHJpdGUiLCJwdXNoIiwiRlBTIiwiSU5URVJWQUwiLCJTVEVQIiwiQ2hhcmFjdGVyIiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwieCIsInkiLCJzdGF0ZSIsImZyYW1lTnVtIiwic3RhdGVzIiwiY2FudmFzIiwiZHJhd0ZyYW1lIiwiaW1hZ2UiLCJzY2FsZVgiLCJzY2FsZVkiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwic3JjIiwic291bmQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2b2x1bWUiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjdXJyZW50VGltZSIsInBhdXNlIiwicGxheSIsIndhaXRTY3JlZW4iLCJ3YWl0U2NyZWVuRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2hvdyIsImhpZGUiLCJ0aXRsZSIsInRpdGxlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJpbml0Iiwib24iLCJvZmYiLCJkaXNjb25uZWN0Iiwic2VydmVyU29ja2V0IiwibG9nZ2VkIiwiY2FsbGJhY2siLCJjb25uZWN0IiwiZXZlbnROYW1lIiwidHlwZSIsInN0YXJ0IiwiZGF0YSIsInNldFRpbWVvdXQiLCJoYW5kbGVycyIsInJ1bkhhbmRsZXJzIiwiZW1pdCIsIkpTT04iLCJwYXJzZSIsImUiLCJtZXNzYWdlIiwiaGFuZGxlciIsImgiLCJjbG9zZSIsInJ1biIsImdhbWVvdmVyIiwid2luZG93Iiwib25sb2FkIiwibG9nIiwiJGxvZ3MiLCJtc2ciLCJwYXJlbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY29uc29sZSIsIk1BWF9ERUFEWk9ORV9YIiwiTUFYX0RFQURaT05FX1kiLCJmb2xsb3dlciIsImRlYWRab25lIiwiZ2V0Q29udGV4dCIsInNwZWVkIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwicm9vbSIsInJ1bkZvbGxvdyIsInBsYXllciIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJBIiwiVyIsIkQiLCJTIiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJONSIsIk42IiwiTjciLCJOOCIsIk45IiwiTjAiLCJTUEFDRSIsIlNUQVRJU1RJQyIsImNsaWNrUGFkIiwic3RvcCIsInNldENsaWNrUGFkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uV2luZG93Qmx1ciIsIm9uS2V5ZG93biIsIm9uS2V5dXAiLCJvbkNsaWNrIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX2NsaWNrUGFkIiwia2V5Q29kZSIsImNsaWVudFgiLCJjbGllbnRZIiwiYnV0dG9uIiwiYWRkRnJvbVNldCIsInJlbW92ZSIsInJlc2V0Iiwic2l6ZSIsImVhY2giLCJlbnRpdGllcyIsImxpZmV0aW1lIiwiZmF6YSIsImluZGV4Iiwic3BsaWNlIiwiZm9yRWFjaCIsIkVudGl0eSIsImNoYXJhY3RlciIsImltbW9ydGFsIiwiYW5pbWF0ZVNwZWVkIiwiY3VycmVudFNwcml0ZU51bSIsImRpZSIsImNhbWVyYSIsImRyYXdDaGFyYWN0ZXIiLCJkcmF3IiwidW5pdCIsImFuaW1hdGUiLCJjb25zdGFudHMiLCJmaW5hbENhbGxiYWNrIiwiaW50ZXJ2YWwiLCJyb29tcyIsInJvb21faWQiLCJsb290cyIsInRlbGVwb3J0cyIsInJlc2l6ZSIsIm9uUmVjb25uZWN0Iiwib25Sb29tIiwib25IZXJvIiwib25Tb3VuZCIsInBvcyIsInNraWxscyIsInRvcDEwIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwiZXZlbnQiLCJ1bmRlZmluZWQiLCJlbnZpcm9ubWVudF9pZCIsInJvb21Jbml0IiwiaW5mbyIsImNoYXJhY3Rlcl9pZCIsImxldmVsIiwiaXRlbSIsInNwcml0ZXNldF9pZCIsImNvaW5zX2NvdW50IiwibGV2ZWx1cENvdW50ZXIiLCJoZXJvSW5mbyIsInNldEZvbGxvd2VyIiwiZW50aXR5IiwiaXNEaWUiLCJ0b0FycmF5IiwiaSIsInJlbmRlckFycmF5Iiwic29ydCIsImEiLCJiIiwic2V0dGluZ3MiLCJlbnRpdGllc19udW0iLCJjYXJ0b29ucyIsInJhbmRvbSIsImxvb3QiLCJ0YXJnZXQiLCJzdGVwIiwiRU5WSVJPTk1FTlRTIiwiciIsInJhbmQiLCJnIiwiZW50aXRpZXNTcHJpdGVzIiwiZ2VuZXJhdGUiLCJ0cmVlc19udW0iLCJjdHgiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsImNvbHVtbnMiLCJzYXZlIiwiaiIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsInJhbmRvbUNTU2NvbG9yIiwiZmlsbFJlY3QiLCJjbG9zZVBhdGgiLCJlbnYiLCJzcHIiLCJkZWZhdWx0IiwidGlsZSIsInh4IiwieXkiLCJ3IiwicmVzdG9yZSIsIkltYWdlIiwidG9EYXRhVVJMIiwiaGVyb19pbmZvRWxlbWVudCIsImhlcm9fbmFtZUVsZW1lbnQiLCJzY29yZUVsZW1lbnQiLCJsZXZlbEVsZW1lbnQiLCJsZXZlbHVwY291bnRlckVsZW1lbnQiLCJzcGVlZEVsZW1lbnQiLCJoZWFsdGhFbGVtZW50Iiwic3JjRWxlbWVudCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiaW5uZXJUZXh0IiwibmFtZSIsImxldmVsdXBWYWx1ZSIsImhlYWx0aCIsInNraWxsc1BhbmVsIiwic2tpbGxzRWxlbWVudHMiLCJza2lsbDEiLCJza2lsbDIiLCJza2lsbDMiLCJza2lsbDQiLCJza2lsbDUiLCJza2lsbDYiLCJza2lsbDciLCJza2lsbDgiLCJza2lsbDkiLCJza2lsbDEwIiwiYWxsU2tpbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdFNraWxsIiwic2tpbGxfaWQiLCJza2lsbCIsImljb25FbGVtZW50IiwidmVrb0VsZW1lbnQiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJpY29uIiwidmFsdWUiLCJjb250YWlucyIsImFjdGl2ZSIsImlzQWN0aXZlIiwidG9wMTBFbGVtZW50IiwidG9wMTBDb250ZW50RWxlbWVudCIsInJpZ2h0IiwiQXJyYXkiLCJpc0FycmF5IiwiY29udGVudCIsInNjb3JlIiwiQ0hBUkFDVEVSX0RFRkFVTFQiLCJNQVhfSEVBTFRIIiwiVW5pdCIsImlzSGVybyIsImRyYXdTaGFkb3ciLCJkcmF3TmFtZSIsImRyYXdWb2x1bWUiLCJ2b2x1bWVXaWR0aCIsInZvbHVtZUhlaWdodCIsInZvbHVtZVgiLCJ2b2x1bWVZIiwicmVjdCIsInN0cm9rZSIsInBhZGRpbmdDb2xvciIsImZvbnQiLCJ0ZXh0V2lkdGgiLCJtZWFzdXJlVGV4dCIsInRleHRMZXZlbFdpZHRoIiwicGFkV2lkdGgiLCJseCIsImx5IiwiYXJjIiwiUEkiLCJmaWxsIiwiZmlsbFRleHQiLCJzaGFkb3dDb2xvcjEiLCJzaGFkb3dDb2xvcjIiLCJzaGFkb3dDb2xvcjMiLCJlbGxpcHNlIiwidW5pdHMiLCJ1bml0c0FycmF5IiwibG9naW5fcGFuZWxFbGVtZW50IiwibG9naW5fZm9ybUVsZW1lbnQiLCJsb2dpbl9pbnB1dEVsZW1lbnQiLCJwYXNzd29yZF9pbnB1dEVsZW1lbnQiLCJ0aW1lb3V0IiwidGltZW91dF9wIiwidXNlckFjY291bnQiLCJjbGlja0hhbmRsZXIiLCJrZXl1cEhhbmRsZXIiLCJmb2N1cyIsIm9iaiIsImtleSIsInZhbGlkYXRlIiwiYWNjb3VudERhdGEiLCJ0ZXN0IiwiZGVmYXVsdFZhbHVlIiwiYmFja2dyb3VuZENvbG9yIiwiY2xlYXJUaW1lb3V0Iiwic19kb2MiLCJzX3Byb2YiLCJzX2dvYiIsInNfZ2lybCIsInNfYmxvbmQiLCJzX21hZyIsInNfdGVsZXBvcnQiLCJzX2NvaW5zIiwidF90cmVlcyIsInRfYnVzaHMiLCJ0X3BsYW50cyIsInNfcG9pbnRlciIsInNfYm9vbSIsInNfYm9vbTEiLCJzX2Jvb20yIiwic19iYXJpZXIiLCJzX3B1c2giLCJzX2NyeXN0YWxzIiwic19za2VsZXRvbiIsInNfa2F0eSIsInNfbGV2b24iLCJzX3ZpdGFseSIsInRfY29vbF9wbGFudHMiLCJ0X2FuZHN0b25lcyIsImV4cG9ydHMiLCJkb2MiLCJwcm9mIiwiZ29iIiwiZ2lybCIsImJsb25kIiwibWFnIiwiY29pbl9nb2xkIiwiY29pbl9zaWx2ZXIiLCJjb2luX2NvcHBlciIsImdyYXNzIiwidHJlZXMiLCJidXNocyIsImRlc2VydCIsImJlbHdvb2QiLCJ0ZWxlcG9ydCIsInBvaW50ZXIiLCJib29tIiwiYm9vbTEiLCJib29tMiIsImJhcmllciIsInB1c2gxIiwiYmx1ZV9jcnlzdGFsIiwiZ3JlZW5fY3J5c3RhbCIsImdyZXlfY3J5c3RhbCIsInJlZF9jcnlzdGFsIiwibWFnZW50YV9jcnlzdGFsIiwieWVsbG93X2NyeXN0YWwiLCJza2VsZXRvbiIsImthdHkiLCJsZXZvbiIsInZpdGFseSIsImNvb2xfcGxhbnRzIiwiZGVhZF9wbGFudHMiLCJhbmRzdG9uZXMiLCJzX2dyYXZlcyIsInNfY2FtcGZpcmUiLCJncmF2ZXMiLCJjYW1wZmlyZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4TUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRjs7QUFFM0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOENBQThDLFdBQVc7QUFDekQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsOEJBQThCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsT0FBTztBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3R1QkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFVBQVU7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0T0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGlEQUFpRDtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDJEQUEyRDtBQUMzRDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3UkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsS0FBSyxZQUFZO0FBQ2pCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtB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O0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFBQTtBQUNILEVBQUUsMENBWUY7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzlQRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1RBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlHQUF5RyxJQUFJLEdBQUcsSUFBSSxTQUFTLElBQUk7O0FBRWpJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTtBQUN4RTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RSxrRkFBa0Y7QUFDbEY7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUcsT0FBTztBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNqQkE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLG9CQUFvQjtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RaQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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RCxVQUFVLEdBQTlELEVBSE8sRUFJUCxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxHQUEvQyxFQUFvRCxVQUFVLEdBQTlELEVBSk8sRUFLUCxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxHQUEvQyxFQUFvRCxVQUFVLEdBQTlELEVBTE8sRUFNUCxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxHQUEvQyxFQUFvRCxVQUFVLEdBQTlELEVBTk8sRUFPUCxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxHQUEvQyxFQUFvRCxVQUFVLEdBQTlELEVBUE8sRUFRUCxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxHQUEvQyxFQUFvRCxVQUFVLEdBQTlELEVBUk8sRUFTUCxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLENBQXpCLEVBQTRCLEtBQUssR0FBakMsRUFBc0MsU0FBUyxHQUEvQyxFQUFvRCxVQUFVLEdBQTlELEVBVE8sRUFVUCxFQUFDLFFBQVEsVUFBVCxFQUFxQixLQUFLLEdBQTFCLEVBQStCLEtBQUssR0FBcEMsRUFBeUMsU0FBUyxHQUFsRCxFQUF1RCxVQUFVLEdBQWpFLEVBVk8sRUFXUCxFQUFDLFFBQVEsVUFBVCxFQUFxQixLQUFLLEdBQTFCLEVBQStCLEtBQUssR0FBcEMsRUFBeUMsU0FBUyxHQUFsRCxFQUF1RCxVQUFVLEdBQWpFLEVBWE8sRUFZUCxFQUFDLFFBQVEsVUFBVCxFQUFxQixLQUFLLEdBQTFCLEVBQStCLEtBQUssR0FBcEMsRUFBeUMsU0FBUyxHQUFsRCxFQUF1RCxVQUFVLEdBQWpFLEVBWk8sRUFhUCxFQUFDLFFBQVEsVUFBVCxFQUFxQixLQUFLLEdBQTFCLEVBQStCLEtB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b0IsS0FBSyxHQUF6QixFQUE4QixLQUFLLENBQW5DLEVBQXNDLFNBQVMsRUFBL0MsRUFBbUQsVUFBVSxFQUE3RCxFQUptRSxFQUtuRSxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxFQUEvQyxFQUFtRCxVQUFVLEVBQTdELEVBTG1FLENBQVosRUFBM0QsRUFEZSxDQUFuQjs7QUFVQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUEsZSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtnZXQsIHNldCwgc2lnbm91dH1cblxuZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmKFxuICAgICAgICAhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpIHx8XG4gICAgICAgICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZV9hY2NvdW50X3Bhc3N3b3JkJylcbiAgICApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9naW46IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfbG9naW4nKSxcbiAgICAgICAgcGFzc3dvcmQ6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzZXQoYWNjb3VudCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lX2FjY291bnRfbG9naW4nLCBhY2NvdW50LmxvZ2luKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZV9hY2NvdW50X3Bhc3N3b3JkJywgYWNjb3VudC5wYXNzd29yZCk7XG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKTtcbn0iLCJpbXBvcnQgQ2hhcmFjdGVyIGZyb20gXCIuL2VuZ2luZS9jaGFyYWN0ZXIuanNcIjtcbmltcG9ydCBzcHJpdGVzIGZyb20gXCIuL3Nwcml0ZXNcIjtcbmltcG9ydCBzcHJpdGVzZXRzIGZyb20gXCIuL3Nwcml0ZXNldHNcIjtcblxuY29uc3QgY2hhcmFjdGVycyA9IHt9O1xuXG5jb25zdCBjaGFyYWN0ZXJzZXRzID0ge307XG5cbmZvcihsZXQgaWQgaW4gc3ByaXRlcyl7XG4gICAgYWRkKGlkLCBzcHJpdGVzW2lkXSk7XG59XG5mb3IobGV0IHNwcml0ZV9pZCBpbiBzcHJpdGVzZXRzKXtcbiAgICBmb3IobGV0IGlkPTA7IGlkPHNwcml0ZXNldHNbc3ByaXRlX2lkXS5sZW5ndGg7aWQrKyl7XG4gICAgICAgIGFkZFRvU2V0KHNwcml0ZV9pZCwgaWQsIHNwcml0ZXNldHNbc3ByaXRlX2lkXVtpZF0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge2dldCwgZ2V0RnJvbVNldH1cblxuZnVuY3Rpb24gZ2V0KElEKSB7XG4gICAgcmV0dXJuIGNoYXJhY3RlcnNbSURdO1xufVxuXG5mdW5jdGlvbiBnZXRGcm9tU2V0KHNldElELCBJRCkge1xuICAgIHJldHVybiBjaGFyYWN0ZXJzZXRzW3NldElEXVtJRF07XG59XG5cbmZ1bmN0aW9uIGFkZChJRCwgc3ByaXRlKSB7XG4gICAgY2hhcmFjdGVyc1tJRF0gPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZSk7XG59XG5cbmZ1bmN0aW9uIGFkZFRvU2V0KHNldElELCBJRCwgc3ByaXRlKSB7XG4gICAgaWYoc2V0SUQgaW4gY2hhcmFjdGVyc2V0cz09PWZhbHNlKXtcbiAgICAgICAgY2hhcmFjdGVyc2V0c1tzZXRJRF0gPSBbXTtcbiAgICB9XG4gICAgY2hhcmFjdGVyc2V0c1tzZXRJRF0ucHVzaChuZXcgQ2hhcmFjdGVyKHNwcml0ZSkpO1xufSIsImV4cG9ydCBjb25zdFxuICAgIEZQUyA9IDMwLFxuICAgIElOVEVSVkFMID0gMTAwMC9GUFMsIC8v0LIg0LzQuNC70LvQuNGB0LXQutGD0L3QtNCw0YVcbiAgICBTVEVQID0gSU5URVJWQUwvMTAwMDsvL9CyINGB0LXQutGD0L3QtNCw0YVcbiIsIi8qKlxuICogQGNsYXNzIENoYXJhY3RlciAtINCf0LXRgNGB0L7QvdCw0LZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVye1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlLCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IHNwcml0ZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgc3ByaXRlLmhlaWdodDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCe0YLRgNC40YHQvtCy0LrQsCDQv9C10YDRgdC+0L3QsNC20LBcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtINC60YPQtNCwINGA0LjRgdGD0LXQvFxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcGFyYW0gd2lkdGhcbiAgICAgKiBAcGFyYW0gaGVpZ2h0XG4gICAgICogQHBhcmFtIHN0YXRlXG4gICAgICogQHBhcmFtIGZyYW1lTnVtIC0g0L3QvtC80LXRgCDQutCw0LTRgNCwINCw0L3QuNC80LDRhtC40LhcbiAgICAgKi9cbiAgICBkcmF3KGNvbnRleHQsIHgsIHksIHN0YXRlLCBmcmFtZU51bSwgd2lkdGgsIGhlaWdodCl7XG5cbiAgICAgICAgaWYoIXN0YXRlIHx8ICF0aGlzLnNwcml0ZS5zdGF0ZXNbc3RhdGVdKXtcbiAgICAgICAgICAgIHN0YXRlID0gJ2RlZmF1bHQnXG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZyYW1lTnVtKSBmcmFtZU51bSA9IDA7XG5cbiAgICAgICAgaWYoIXRoaXMuc3ByaXRlLnN0YXRlc1tzdGF0ZV0gfHwgIXRoaXMuc3ByaXRlLnN0YXRlc1tzdGF0ZV1bZnJhbWVOdW1dKSByZXR1cm47XG5cblxuICAgICAgICAvL9Ce0LHRgNC10LfQutCwINC+0YLRgNC40YHQvtCy0LrQuCDQstC90LUg0LrQsNC90LLRiyBUT0RPOiDRgNC10LfQsNGC0Ywg0L/QviDQutCw0LzQtdGA0LVcbiAgICAgICAgaWYoeCArIHRoaXMud2lkdGggPiAwICYmIHggPCBjb250ZXh0LmNhbnZhcy53aWR0aCAmJiB5ICsgdGhpcy5oZWlnaHQgPiAwICYmIHkgPCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpIHtcblxuXG4gICAgICAgICAgICAvLyDQoNC40YHRg9C10Lwg0LrQsNC00YBcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZyYW1lKFxuICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuaW1hZ2UsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXVtmcmFtZU51bV0sXG4gICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCg0LjRgdGD0LXQvCDQutCw0LTRgCDQsNC90LjQvNCw0YbQuNC4XG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gc3ByaXRlXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB3aWR0aFxuICAgICAqIEBwYXJhbSBoZWlnaHRcbiAgICAgKi9cbiAgICBkcmF3RnJhbWUoY29udGV4dCwgaW1hZ2UsIHNwcml0ZSwgeCwgeSwgd2lkdGgsIGhlaWdodCl7XG5cbiAgICAgICAgaWYod2lkdGg+MCAmJiBoZWlnaHQ+MCkge1xuXG4gICAgICAgICAgICBsZXQgc2NhbGVYID0gc3ByaXRlLndpZHRoIC8gd2lkdGgsXG4gICAgICAgICAgICAgICAgc2NhbGVZID0gc3ByaXRlLmhlaWdodCAvIGhlaWdodDtcblxuICAgICAgICAgICAgbGV0IHN4ID0gc3ByaXRlLngsIHN5ID0gc3ByaXRlLnksIHN3ID0gc3ByaXRlLndpZHRoLCBzaCA9IHNwcml0ZS5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgZHggPSB4LCBkeSA9IHksIGR3ID0gd2lkdGgsIGRoID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgICAgICAgICBkeCA9IDA7XG4gICAgICAgICAgICAgICAgZHcgPSB3aWR0aCArIHg7XG4gICAgICAgICAgICAgICAgc3ggLT0gTWF0aC5mbG9vcih4ICogc2NhbGVYKTtcbiAgICAgICAgICAgICAgICBzdyA9IE1hdGguZmxvb3IoZHcgKiBzY2FsZVgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHkgPCAwKSB7XG4gICAgICAgICAgICAgICAgZHkgPSAwO1xuICAgICAgICAgICAgICAgIGRoID0gaGVpZ2h0ICsgeTtcbiAgICAgICAgICAgICAgICBzeSAtPSBNYXRoLmZsb29yKHkgKiBzY2FsZVkpO1xuICAgICAgICAgICAgICAgIHNoID0gTWF0aC5mbG9vcihkaCAqIHNjYWxlWSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkdyA+IGNvbnRleHQuY2FudmFzLndpZHRoIC0gZHgpIHtcbiAgICAgICAgICAgICAgICBkdyA9IGNvbnRleHQuY2FudmFzLndpZHRoIC0gZHg7XG4gICAgICAgICAgICAgICAgc3cgPSBNYXRoLmZsb29yKGR3ICogc2NhbGVYKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRoID4gY29udGV4dC5jYW52YXMuaGVpZ2h0IC0gZHkpIHtcbiAgICAgICAgICAgICAgICBkaCA9IGNvbnRleHQuY2FudmFzLmhlaWdodCAtIGR5O1xuICAgICAgICAgICAgICAgIHNoID0gTWF0aC5mbG9vcihkaCAqIHNjYWxlWSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v0J3QtSDRgNC40YHRg9C10Lwg0YEg0YDQsNC30LzQtdGA0L7QvCDQvNC10L3RjNGI0LUg0LjQu9C4INGA0LDQstC90YvQvCDQvdGD0LvRjlxuICAgICAgICAgICAgaWYoc3c+MCYmc2g+MCYmZHc+MCYmZGg+MCkge1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAgICAgICBzeCxcbiAgICAgICAgICAgICAgICAgICAgc3ksXG4gICAgICAgICAgICAgICAgICAgIHN3LFxuICAgICAgICAgICAgICAgICAgICBzaCxcbiAgICAgICAgICAgICAgICAgICAgZHgsXG4gICAgICAgICAgICAgICAgICAgIGR5LFxuICAgICAgICAgICAgICAgICAgICBkdyxcbiAgICAgICAgICAgICAgICAgICAgZGhcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHNyYyl7XG4gICAgICAgIHRoaXMuc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG4gICAgICAgIHRoaXMuc291bmQudm9sdW1lID0gMC40O1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5zb3VuZC5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZC5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLCBcIm5vbmVcIik7XG4gICAgICAgIHRoaXMuc291bmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc291bmQpO1xuICAgIH1cbiAgICBwbGF5KCl7XG4gICAgICAgIGlmKHRoaXMuc291bmQuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc291bmQucGxheSgpO1xuICAgIH1cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMuc291bmQucGF1c2UoKTtcbiAgICB9XG59IiwiLyoqXG4gKiDQmNC90YLQtdGA0YTQtdC50YEg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXG4gKi9cblxuLy8g0K3QutGA0LDQvSDQt9Cw0LPRgNGD0LfQutC4XG5pbXBvcnQgd2FpdFNjcmVlbiBmcm9tICcuL3dhaXRzY3JlZW4nXG5cblxuZXhwb3J0IGRlZmF1bHQge3dhaXRTY3JlZW59IiwiLyoqXG4gKiDQrdC60YDQsNC9INC30LDQs9GA0YPQt9C60LhcbiAqL1xuXG5cbmNvbnN0IHdhaXRTY3JlZW5FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2FkaW5nXCIpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtzaG93LCBoaWRlfVxuXG5cbmZ1bmN0aW9uIHNob3codGl0bGUpIHtcbiAgICBpZih0aXRsZSl7XG4gICAgICAgIGxldCB0aXRsZUVsZW1lbnQgPSB3YWl0U2NyZWVuRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICAgICAgaWYodGl0bGVFbGVtZW50KXtcbiAgICAgICAgICAgIHRpdGxlRWxlbWVudC5pbm5lckhUTUwgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG4iLCIvKipcbiAqINCh0L7QsdGL0YLQuNGPINC40LPRgNGLXG4gKi9cbmltcG9ydCBsb2cgZnJvbSBcIi4vbG9ncy5qc1wiO1xuXG5pbXBvcnQgaW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcblxuaW1wb3J0IHVpIGZyb20gXCIuL2VuZ2luZS91aS91aS5qc1wiO1xuXG5pbXBvcnQgYWNjb3VudCBmcm9tIFwiLi9hY2NvdW50XCI7XG5pbXBvcnQgc2lnbkluIGZyb20gXCIuL3NjZW5lcy9zaWduaW5cIjtcblxuXG5leHBvcnQgZGVmYXVsdCB7aW5pdCwgYWRkLCBvbiwgb2ZmLCBkaXNjb25uZWN0fVxuXG4vLyDQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgNCy0LXRgNGDXG5sZXQgc2VydmVyU29ja2V0ID0gbnVsbDtcblxubGV0IGxvZ2dlZCA9IGZhbHNlO1xuXG5cbi8qKlxuICog0JjQvdC40YLQuNC8INC40LPRgNC+0LLRi9C1INGB0L7QsdGL0YLQuNGPXG4gKi9cbmZ1bmN0aW9uIGluaXQoY2FsbGJhY2spIHtcblxuICAgIC8v0J/QvtC00LrQu9GO0YfQuNC80YHRjyDQuiDRgdC10YDQstC10YDRg1xuICAgIGlmKCFzZXJ2ZXJTb2NrZXQpIHtcbiAgICAgICAgc2VydmVyU29ja2V0ID0gaW8oXCJodHRwOi8vc2VydmVyLmdhbWVzLnEtZGV2LnJ1XCIpO1xuICAgIH1cblxuICAgIGxvZygn0J/QvtC00LrQu9GO0YfQsNC10LzRgdGPINC6INGB0LXRgNCy0LXRgNGDJyk7XG4gICAgc2VydmVyU29ja2V0LmNvbm5lY3QoKTtcblxuICAgIG9uKFwic2VydmVyXCIsIChldmVudE5hbWUsIHR5cGUpPT57XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiaGVsbG9cIikge1xuICAgICAgICAgICAgLy/QldGB0LvQuCDQtdGJ0ZEg0L3QtSDQstC+0YjQu9C4XG4gICAgICAgICAgICBpZiAoIWxvZ2dlZCkge1xuXG4gICAgICAgICAgICAgICAgLy/Qn9C+0LvRg9GH0LDQtdC8INC+0YIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINCw0LrQutCw0YPQvdGCXG4gICAgICAgICAgICAgICAgc2lnbkluLnN0YXJ0KGZ1bmN0aW9uIChhY2NvdW50KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQsNC60LrQsNGD0L3RgiDRgdC10YDQstC10YDRg1xuICAgICAgICAgICAgICAgICAgICBhZGQoJ2xvZ2luJywgYWNjb3VudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy/Qn9C+0YHQu9C1INGD0YHQv9C10YjQvdC+0LPQviDQstGF0L7QtNCwICjQldGB0LvQuCDQvdC10YPRgdC/0LXRiNC90YvQuSAtINGB0LXRgNCy0LXRgCDQvtC/0Y/RgtGMINC/0L7RiNC70LXRgiBoZWxsbylcbiAgICAgICAgICAgICAgICAgICAgb24oJ2xvZ2dlZCcsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlPT09J3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmYoJ2xvZ2dlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vINCU0LXQudGB0YLQstC40Y8g0L/RgNC4INGB0LXRgNCy0LXRgNC90YvRhSDQv9GA0L7QsdC70LXQvNCw0YVcbiAgICBzZXJ2ZXJTb2NrZXQub24oJ2Nvbm5lY3RfZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZygn0J7RiNC40LHQutCwINC/0L7QtNC60LvRjtGH0LXQvdC40Y8g0Log0YHQtdGA0LLQtdGA0YMnKTtcbiAgICB9KTtcblxuXG4gICAgc2VydmVyU29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZygn0L7RgiDRgdC10YDQstC10YDQsCDQv9C+0YHRgtGD0L/QuNC7IGRpc2Nvbm5lY3QnKTtcbiAgICAgICAgbG9nKCfQktGLINC+0YLQutC70Y7Rh9C10L3RiyDQvtGCINGB0LXRgNCy0LXRgNCwJyk7XG5cbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCk7XG4gICAgICAgIGxvZ2dlZCA9IGZhbHNlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW5pdChjYWxsYmFjayk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG5cbiAgICBvbihcImFub3RoZXItY29taW5nXCIsICgpID0+IHtcbiAgICAgICAgbG9nKCfQktGLINC+0YLQutC70Y7Rh9C10L3RiyDQvtGCINGB0LXRgNCy0LXRgNCwJyk7XG5cbiAgICAgICAgLy9UT0RPOiDQktC80LXRgdGC0L4g0Y3QutGA0LDQvdCwINC+0LbQuNC00LDQvdC40Y8gLSDQntC60L3QviDRgSDQutC90L7Qv9C60L7QuSAtINC/0L7QtNC60LvRjtGH0LjRgtGM0YHRjyAtINC/0L4g0LrQvtGC0L7RgNC+0LkgaW5pdChjYWxsYmFjayk7XG4gICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygpO1xuICAgIH0pO1xuXG59XG5cblxuY29uc3QgaGFuZGxlcnMgPSB7fTtcblxuLyoqXG4gKiDQlNC+0LHQsNCy0LvQtdC90LjQtSDQuNCz0YDQvtCy0L7Qs9C+INGB0L7QsdGL0YLQuNGPXG4gKiBAcGFyYW0gZXZlbnROYW1lXG4gKiBAcGFyYW0gZGF0YVxuICovXG5mdW5jdGlvbiBhZGQoZXZlbnROYW1lLCBkYXRhKSB7XG5cbiAgICAvLyDQldGB0LvQuCDQtdGB0YLRjCDQu9C+0LrQsNC70YzQvdGL0LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCAtINCy0YvQt9C+0LLQtdC8XG4gICAgcnVuSGFuZGxlcnMoZXZlbnROYW1lLCBkYXRhKTtcblxuICAgIC8vINGI0LvQtdC8INGB0L7QsdGL0YLQuNC1INC90LAg0YHQtdGA0LLQtdGAXG4gICAgc2VydmVyU29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhKVxufVxuXG5cbmZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcblxuICAgIC8v0KHQvtGF0YDQsNC90LjQvCDQvdCwINGB0LvRg9GH0LDQuSDQtdGB0LvQuCDRgdC+0LHRi9GC0LjRjyDQstC+0LfQvdC40LrQvdGD0YIg0LvQvtC60LDQu9GM0L3QvlxuICAgIGlmKGV2ZW50TmFtZSBpbiBoYW5kbGVycz09PWZhbHNlKXtcbiAgICAgICAgaGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cbiAgICBoYW5kbGVyc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuXG5cbiAgICBzZXJ2ZXJTb2NrZXQub24oZXZlbnROYW1lLCAoZGF0YSk9PntcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSlcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7fVxuICAgICAgICBsZXQgdHlwZSA9IGRhdGEudHlwZSA/IGRhdGEudHlwZSA6IFwic2ltcGxlXCI7XG5cbiAgICAgICAgLy8g0JXRgdC70Lgg0LIg0LTQsNC90L3Ri9GFINGB0L7QsdGL0YLQuNGPINC10YHRgtGMINC/0L7Qu9C1IG1lc3NhZ2UgLSDQstGL0LLQtdC00LXQvCDQsiDQu9C+0LNcbiAgICAgICAgZGF0YS5tZXNzYWdlICYmIGxvZyhkYXRhLm1lc3NhZ2UvKiArICcgKNCh0L7QsdGL0YLQuNC1ICcrZXZlbnQrJy4nK3R5cGUrJyknKi8pO1xuXG4gICAgICAgIC8vINCe0YLQu9Cw0LTQutCwINGB0L7QsdGL0YLQuNC5INCx0LXQtyBtZXNzYWdlXG4gICAgICAgIC8vIGRhdGEubWVzc2FnZSB8fCBsb2coJyAo0KHQvtCx0YvRgtC40LUgJytldmVudCsnLicrdHlwZSsnKScpO1xuXG4gICAgICAgIGNhbGxiYWNrKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIG9mZihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBpZihldmVudE5hbWUgaW4gaGFuZGxlcnMgJiYgaGFuZGxlcnNbZXZlbnROYW1lXT09PWhhbmRsZXIpe1xuICAgICAgICBkZWxldGUgaGFuZGxlcnNbZXZlbnROYW1lXTtcbiAgICB9XG5cbiAgICBzZXJ2ZXJTb2NrZXQub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG59XG5cblxuLy8g0JfQsNC/0YPRgdC6INC00LvRjyDQu9C+0LrQsNC70YzQvdGL0YUg0YHQvtCx0YvRgtC40LlcbmZ1bmN0aW9uIHJ1bkhhbmRsZXJzKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIC8v0JXRgdC70Lgg0LXRgdGC0Ywg0L7QsdGA0LDQsdC+0YLRh9C40LrQuCAtINC30LDQv9GD0YHQutCw0LXQvFxuICAgIGlmKGV2ZW50TmFtZSBpbiBoYW5kbGVycyl7XG4gICAgICAgIGZvcihjb25zdCBoIG9mIGhhbmRsZXJzW2V2ZW50TmFtZV0pe1xuICAgICAgICAgICAgaChldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgc2VydmVyU29ja2V0LmNsb3NlKCk7XG59IiwiaW1wb3J0IHVpIGZyb20gXCIuL2VuZ2luZS91aS91aS5qc1wiO1xuXG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuL2V2ZW50cy5qc1wiO1xuXG5pbXBvcnQgc2NlbmVNYWluIGZyb20gXCIuL3NjZW5lcy9tYWluL2luZGV4LmpzXCJcblxuXG4vKipcbiAqINCe0YHQvdC+0LLQvdC+0Lkg0LrQu9Cw0YHRgSDQutC70LjQtdC90YLQsCDQuNCz0YDRi1xuICogY2xhc3MgR2FtZVxuICovXG5leHBvcnQgZGVmYXVsdCB7cnVufVxuXG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0L/Rg9GB0Log0L7RgdC90L7QstC90L7Qs9C+INGG0LjQutC70LBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW4oKSB7XG5cbiAgICAgICAgLy8g0J/QuNGI0LXQvCBcItCX0LDQs9GA0YPQt9C60LBcIlxuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coJ9Ch0YLQsNGA0YIg0LjQs9GA0YsnKTtcblxuXG4gICAgICAgIC8vINCf0L7QtNC60LvRjtGH0LDQtdC80YHRjyDQuiDRgdC10YDQstC10YDRg1xuICAgICAgICBldmVudHMuaW5pdChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vVE9ETzog0J/QtdGA0LXQtCDRgdGC0LDRgNGC0L7QvCAtINCy0YvQsdC+0YAg0L/QtdGA0YHQvtC90LDQttCwLCDQtdGB0LvQuCDQvdC1INCy0YvQsdGA0LDQvVxuXG4gICAgICAgICAgICAvLyDQodGC0LDRgNGC0YPQtdC8INC+0YHQvdC+0LLQvdGD0Y4g0YHRhtC10L3Rg1xuICAgICAgICAgICAgc2NlbmVNYWluLnN0YXJ0KF8gPT4ge1xuXG4gICAgICAgICAgICAgICAgZ2FtZW92ZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdhbWVvdmVyKCl7XG4gICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygnR2FtZSBPdmVyJyk7XG4gICAgfVxuIiwiaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lJ1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcblxuICAgIGdhbWUucnVuKCk7XG5cbn07IiwiLyoqXG4gKiDQm9C+0LPQuNGA0L7QstCw0L3QuNC1XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuXG5jb25zdCAkbG9ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dzJyk7XG5cbmZ1bmN0aW9uIGxvZyhtc2cpIHtcbiAgICAkbG9ncy5pbm5lckhUTUwgKz0gJzxkaXYgY2xhc3M9XCJtc2dcIj4nK21zZysnPC9kaXY+JztcbiAgICAkbG9ncy5wYXJlbnRFbGVtZW50LnNjcm9sbFRvcCA9ICRsb2dzLnNjcm9sbEhlaWdodDtcbiAgICBjb25zb2xlLmxvZyhtc2cpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGFmdGVyXG5cbmZ1bmN0aW9uIGFmdGVyKGNvdW50LCBjYWxsYmFjaywgZXJyX2NiKSB7XG4gICAgdmFyIGJhaWwgPSBmYWxzZVxuICAgIGVycl9jYiA9IGVycl9jYiB8fCBub29wXG4gICAgcHJveHkuY291bnQgPSBjb3VudFxuXG4gICAgcmV0dXJuIChjb3VudCA9PT0gMCkgPyBjYWxsYmFjaygpIDogcHJveHlcblxuICAgIGZ1bmN0aW9uIHByb3h5KGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChwcm94eS5jb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FmdGVyIGNhbGxlZCB0b28gbWFueSB0aW1lcycpXG4gICAgICAgIH1cbiAgICAgICAgLS1wcm94eS5jb3VudFxuXG4gICAgICAgIC8vIGFmdGVyIGZpcnN0IGVycm9yLCByZXN0IGFyZSBwYXNzZWQgdG8gZXJyX2NiXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGJhaWwgPSB0cnVlXG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgICAvLyBmdXR1cmUgZXJyb3IgY2FsbGJhY2tzIHdpbGwgZ28gdG8gZXJyb3IgaGFuZGxlclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBlcnJfY2JcbiAgICAgICAgfSBlbHNlIGlmIChwcm94eS5jb3VudCA9PT0gMCAmJiAhYmFpbCkge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsIi8qKlxuICogQW4gYWJzdHJhY3Rpb24gZm9yIHNsaWNpbmcgYW4gYXJyYXlidWZmZXIgZXZlbiB3aGVuXG4gKiBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgaXMgbm90IHN1cHBvcnRlZFxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnJheWJ1ZmZlciwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBhcnJheWJ1ZmZlci5ieXRlTGVuZ3RoO1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIGVuZCA9IGVuZCB8fCBieXRlcztcblxuICBpZiAoYXJyYXlidWZmZXIuc2xpY2UpIHsgcmV0dXJuIGFycmF5YnVmZmVyLnNsaWNlKHN0YXJ0LCBlbmQpOyB9XG5cbiAgaWYgKHN0YXJ0IDwgMCkgeyBzdGFydCArPSBieXRlczsgfVxuICBpZiAoZW5kIDwgMCkgeyBlbmQgKz0gYnl0ZXM7IH1cbiAgaWYgKGVuZCA+IGJ5dGVzKSB7IGVuZCA9IGJ5dGVzOyB9XG5cbiAgaWYgKHN0YXJ0ID49IGJ5dGVzIHx8IHN0YXJ0ID49IGVuZCB8fCBieXRlcyA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gIH1cblxuICB2YXIgYWJ2ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoZW5kIC0gc3RhcnQpO1xuICBmb3IgKHZhciBpID0gc3RhcnQsIGlpID0gMDsgaSA8IGVuZDsgaSsrLCBpaSsrKSB7XG4gICAgcmVzdWx0W2lpXSA9IGFidltpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0LmJ1ZmZlcjtcbn07XG4iLCJcbi8qKlxuICogRXhwb3NlIGBCYWNrb2ZmYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmY7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBiYWNrb2ZmIHRpbWVyIHdpdGggYG9wdHNgLlxuICpcbiAqIC0gYG1pbmAgaW5pdGlhbCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyBbMTAwXVxuICogLSBgbWF4YCBtYXggdGltZW91dCBbMTAwMDBdXG4gKiAtIGBqaXR0ZXJgIFswXVxuICogLSBgZmFjdG9yYCBbMl1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHRoaXMubXMgPSBvcHRzLm1pbiB8fCAxMDA7XG4gIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgdGhpcy5qaXR0ZXIgPSBvcHRzLmppdHRlciA+IDAgJiYgb3B0cy5qaXR0ZXIgPD0gMSA/IG9wdHMuaml0dGVyIDogMDtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYWNrb2ZmIGR1cmF0aW9uLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gIGlmICh0aGlzLmppdHRlcikge1xuICAgIHZhciByYW5kID0gIE1hdGgucmFuZG9tKCk7XG4gICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgIG1zID0gKE1hdGguZmxvb3IocmFuZCAqIDEwKSAmIDEpID09IDAgID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgfVxuICByZXR1cm4gTWF0aC5taW4obXMsIHRoaXMubWF4KSB8IDA7XG59O1xuXG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uKG1pbil7XG4gIHRoaXMubXMgPSBtaW47XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24obWF4KXtcbiAgdGhpcy5tYXggPSBtYXg7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbihqaXR0ZXIpe1xuICB0aGlzLmppdHRlciA9IGppdHRlcjtcbn07XG5cbiIsIi8qXG4gKiBiYXNlNjQtYXJyYXlidWZmZXJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXN2aC9iYXNlNjQtYXJyYXlidWZmZXJcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgTmlrbGFzIHZvbiBIZXJ0emVuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcblxuICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG4gIHZhciBsb29rdXAgPSBuZXcgVWludDhBcnJheSgyNTYpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG9va3VwW2NoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbiAgfVxuXG4gIGV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHtcbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksXG4gICAgaSwgbGVuID0gYnl0ZXMubGVuZ3RoLCBiYXNlNjQgPSBcIlwiO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9Mykge1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaV0gJiAzKSA8PCA0KSB8IChieXRlc1tpICsgMV0gPj4gNCldO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO1xuICAgIH1cblxuICAgIGlmICgobGVuICUgMykgPT09IDIpIHtcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgXCI9XCI7XG4gICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAyKSArIFwiPT1cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTY0O1xuICB9O1xuXG4gIGV4cG9ydHMuZGVjb2RlID0gIGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSxcbiAgICBsZW4gPSBiYXNlNjQubGVuZ3RoLCBpLCBwID0gMCxcbiAgICBlbmNvZGVkMSwgZW5jb2RlZDIsIGVuY29kZWQzLCBlbmNvZGVkNDtcblxuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSBcIj1cIikge1xuICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAyXSA9PT0gXCI9XCIpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz00KSB7XG4gICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzEpXTtcbiAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMildO1xuICAgICAgZW5jb2RlZDQgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSszKV07XG5cbiAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xuICB9O1xufSkoKTtcbiIsIi8qKlxuICogQ3JlYXRlIGEgYmxvYiBidWlsZGVyIGV2ZW4gd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcbiAqL1xuXG52YXIgQmxvYkJ1aWxkZXIgPSBnbG9iYWwuQmxvYkJ1aWxkZXJcbiAgfHwgZ2xvYmFsLldlYktpdEJsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5NU0Jsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5Nb3pCbG9iQnVpbGRlcjtcblxuLyoqXG4gKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIGlzIHN1cHBvcnRlZFxuICovXG5cbnZhciBibG9iU3VwcG9ydGVkID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBhID0gbmV3IEJsb2IoWydoaSddKTtcbiAgICByZXR1cm4gYS5zaXplID09PSAyO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBzdXBwb3J0cyBBcnJheUJ1ZmZlclZpZXdzXG4gKiBGYWlscyBpbiBTYWZhcmkgNiwgc28gd2UgbmVlZCB0byBtYXAgdG8gQXJyYXlCdWZmZXJzIHRoZXJlLlxuICovXG5cbnZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPSBibG9iU3VwcG9ydGVkICYmIChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbMSwyXSldKTtcbiAgICByZXR1cm4gYi5zaXplID09PSAyO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgQmxvYkJ1aWxkZXIgaXMgc3VwcG9ydGVkXG4gKi9cblxudmFyIGJsb2JCdWlsZGVyU3VwcG9ydGVkID0gQmxvYkJ1aWxkZXJcbiAgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmFwcGVuZFxuICAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBtYXBzIEFycmF5QnVmZmVyVmlld3MgdG8gQXJyYXlCdWZmZXJzXG4gKiBVc2VkIGJ5IEJsb2JCdWlsZGVyIGNvbnN0cnVjdG9yIGFuZCBvbGQgYnJvd3NlcnMgdGhhdCBkaWRuJ3RcbiAqIHN1cHBvcnQgaXQgaW4gdGhlIEJsb2IgY29uc3RydWN0b3IuXG4gKi9cblxuZnVuY3Rpb24gbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2h1bmsgPSBhcnlbaV07XG4gICAgaWYgKGNodW5rLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB2YXIgYnVmID0gY2h1bmsuYnVmZmVyO1xuXG4gICAgICAvLyBpZiB0aGlzIGlzIGEgc3ViYXJyYXksIG1ha2UgYSBjb3B5IHNvIHdlIG9ubHlcbiAgICAgIC8vIGluY2x1ZGUgdGhlIHN1YmFycmF5IHJlZ2lvbiBmcm9tIHRoZSB1bmRlcmx5aW5nIGJ1ZmZlclxuICAgICAgaWYgKGNodW5rLmJ5dGVMZW5ndGggIT09IGJ1Zi5ieXRlTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnl0ZUxlbmd0aCk7XG4gICAgICAgIGNvcHkuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZiwgY2h1bmsuYnl0ZU9mZnNldCwgY2h1bmsuYnl0ZUxlbmd0aCkpO1xuICAgICAgICBidWYgPSBjb3B5LmJ1ZmZlcjtcbiAgICAgIH1cblxuICAgICAgYXJ5W2ldID0gYnVmO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgYmIuYXBwZW5kKGFyeVtpXSk7XG4gIH1cblxuICByZXR1cm4gKG9wdGlvbnMudHlwZSkgPyBiYi5nZXRCbG9iKG9wdGlvbnMudHlwZSkgOiBiYi5nZXRCbG9iKCk7XG59O1xuXG5mdW5jdGlvbiBCbG9iQ29uc3RydWN0b3IoYXJ5LCBvcHRpb25zKSB7XG4gIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtcbiAgcmV0dXJuIG5ldyBCbG9iKGFyeSwgb3B0aW9ucyB8fCB7fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgaWYgKGJsb2JTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID8gZ2xvYmFsLkJsb2IgOiBCbG9iQ29uc3RydWN0b3I7XG4gIH0gZWxzZSBpZiAoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59KSgpO1xuIiwiLyoqXG4gKiBTbGljZSByZWZlcmVuY2UuXG4gKi9cblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbi8qKlxuICogQmluZCBgb2JqYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgZm4pe1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IG9ialtmbl07XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IEVycm9yKCdiaW5kKCkgcmVxdWlyZXMgYSBmdW5jdGlvbicpO1xuICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gIH1cbn07XG4iLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iLCJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYSwgYil7XG4gIHZhciBmbiA9IGZ1bmN0aW9uKCl7fTtcbiAgZm4ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XG4gIGEucHJvdG90eXBlID0gbmV3IGZuO1xuICBhLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGE7XG59OyIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcblxuLyoqXG4gKiBFeHBvcnRzIHBhcnNlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHRyYW5zcG9ydHMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydHMvaW5kZXgnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgaW5kZXggPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIHBhcnNldXJpID0gcmVxdWlyZSgncGFyc2V1cmknKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gU29ja2V0O1xuXG4vKipcbiAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBTb2NrZXQgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSkgcmV0dXJuIG5ldyBTb2NrZXQodXJpLCBvcHRzKTtcblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBpZiAodXJpICYmICdvYmplY3QnID09PSB0eXBlb2YgdXJpKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSBudWxsO1xuICB9XG5cbiAgaWYgKHVyaSkge1xuICAgIHVyaSA9IHBhcnNldXJpKHVyaSk7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHVyaS5ob3N0O1xuICAgIG9wdHMuc2VjdXJlID0gdXJpLnByb3RvY29sID09PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PT0gJ3dzcyc7XG4gICAgb3B0cy5wb3J0ID0gdXJpLnBvcnQ7XG4gICAgaWYgKHVyaS5xdWVyeSkgb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTtcbiAgfSBlbHNlIGlmIChvcHRzLmhvc3QpIHtcbiAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2V1cmkob3B0cy5ob3N0KS5ob3N0O1xuICB9XG5cbiAgdGhpcy5zZWN1cmUgPSBudWxsICE9IG9wdHMuc2VjdXJlID8gb3B0cy5zZWN1cmVcbiAgICA6IChnbG9iYWwubG9jYXRpb24gJiYgJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sKTtcblxuICBpZiAob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KSB7XG4gICAgLy8gaWYgbm8gcG9ydCBpcyBzcGVjaWZpZWQgbWFudWFsbHksIHVzZSB0aGUgcHJvdG9jb2wgZGVmYXVsdFxuICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gJzQ0MycgOiAnODAnO1xuICB9XG5cbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7XG4gIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lIHx8XG4gICAgKGdsb2JhbC5sb2NhdGlvbiA/IGxvY2F0aW9uLmhvc3RuYW1lIDogJ2xvY2FsaG9zdCcpO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQgfHwgKGdsb2JhbC5sb2NhdGlvbiAmJiBsb2NhdGlvbi5wb3J0XG4gICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgIDogKHRoaXMuc2VjdXJlID8gNDQzIDogODApKTtcbiAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnkgfHwge307XG4gIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHRoaXMucXVlcnkpIHRoaXMucXVlcnkgPSBwYXJzZXFzLmRlY29kZSh0aGlzLnF1ZXJ5KTtcbiAgdGhpcy51cGdyYWRlID0gZmFsc2UgIT09IG9wdHMudXBncmFkZTtcbiAgdGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLyc7XG4gIHRoaXMuZm9yY2VKU09OUCA9ICEhb3B0cy5mb3JjZUpTT05QO1xuICB0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG4gIHRoaXMuZm9yY2VCYXNlNjQgPSAhIW9wdHMuZm9yY2VCYXNlNjQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9ICEhb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnRyYW5zcG9ydHMgPSBvcHRzLnRyYW5zcG9ydHMgfHwgWydwb2xsaW5nJywgJ3dlYnNvY2tldCddO1xuICB0aGlzLnRyYW5zcG9ydE9wdGlvbnMgPSBvcHRzLnRyYW5zcG9ydE9wdGlvbnMgfHwge307XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gIHRoaXMucG9saWN5UG9ydCA9IG9wdHMucG9saWN5UG9ydCB8fCA4NDM7XG4gIHRoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7XG4gIHRoaXMuYmluYXJ5VHlwZSA9IG51bGw7XG4gIHRoaXMub25seUJpbmFyeVVwZ3JhZGVzID0gb3B0cy5vbmx5QmluYXJ5VXBncmFkZXM7XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBmYWxzZSAhPT0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSA/IChvcHRzLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHt9KSA6IGZhbHNlO1xuXG4gIGlmICh0cnVlID09PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlKSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0ge307XG4gIGlmICh0aGlzLnBlck1lc3NhZ2VEZWZsYXRlICYmIG51bGwgPT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCA9IDEwMjQ7XG4gIH1cblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeCB8fCBudWxsO1xuICB0aGlzLmtleSA9IG9wdHMua2V5IHx8IG51bGw7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQgfHwgbnVsbDtcbiAgdGhpcy5jYSA9IG9wdHMuY2EgfHwgbnVsbDtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgdGhpcy5mb3JjZU5vZGUgPSAhIW9wdHMuZm9yY2VOb2RlO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuICBpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwpIHtcbiAgICBpZiAob3B0cy5leHRyYUhlYWRlcnMgJiYgT2JqZWN0LmtleXMob3B0cy5leHRyYUhlYWRlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubG9jYWxBZGRyZXNzKSB7XG4gICAgICB0aGlzLmxvY2FsQWRkcmVzcyA9IG9wdHMubG9jYWxBZGRyZXNzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgdGhpcy5pZCA9IG51bGw7XG4gIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gIC8vIHNldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5waW5nSW50ZXJ2YWxUaW1lciA9IG51bGw7XG4gIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG5cbiAgdGhpcy5vcGVuKCk7XG59XG5cblNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcblxuLyoqXG4gKiBFeHBvc2UgZGVwcyBmb3IgbGVnYWN5IGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzdGFuZGFsb25lIGJyb3dzZXIgYWNjZXNzLlxuICovXG5cblNvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7XG5Tb2NrZXQuVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKTtcblNvY2tldC50cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG5Tb2NrZXQucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQHJldHVybiB7VHJhbnNwb3J0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jcmVhdGVUcmFuc3BvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICB2YXIgcXVlcnkgPSBjbG9uZSh0aGlzLnF1ZXJ5KTtcblxuICAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbiAgcXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sO1xuXG4gIC8vIHRyYW5zcG9ydCBuYW1lXG4gIHF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7XG5cbiAgLy8gcGVyLXRyYW5zcG9ydCBvcHRpb25zXG4gIHZhciBvcHRpb25zID0gdGhpcy50cmFuc3BvcnRPcHRpb25zW25hbWVdIHx8IHt9O1xuXG4gIC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuICBpZiAodGhpcy5pZCkgcXVlcnkuc2lkID0gdGhpcy5pZDtcblxuICB2YXIgdHJhbnNwb3J0ID0gbmV3IHRyYW5zcG9ydHNbbmFtZV0oe1xuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBzb2NrZXQ6IHRoaXMsXG4gICAgYWdlbnQ6IG9wdGlvbnMuYWdlbnQgfHwgdGhpcy5hZ2VudCxcbiAgICBob3N0bmFtZTogb3B0aW9ucy5ob3N0bmFtZSB8fCB0aGlzLmhvc3RuYW1lLFxuICAgIHBvcnQ6IG9wdGlvbnMucG9ydCB8fCB0aGlzLnBvcnQsXG4gICAgc2VjdXJlOiBvcHRpb25zLnNlY3VyZSB8fCB0aGlzLnNlY3VyZSxcbiAgICBwYXRoOiBvcHRpb25zLnBhdGggfHwgdGhpcy5wYXRoLFxuICAgIGZvcmNlSlNPTlA6IG9wdGlvbnMuZm9yY2VKU09OUCB8fCB0aGlzLmZvcmNlSlNPTlAsXG4gICAganNvbnA6IG9wdGlvbnMuanNvbnAgfHwgdGhpcy5qc29ucCxcbiAgICBmb3JjZUJhc2U2NDogb3B0aW9ucy5mb3JjZUJhc2U2NCB8fCB0aGlzLmZvcmNlQmFzZTY0LFxuICAgIGVuYWJsZXNYRFI6IG9wdGlvbnMuZW5hYmxlc1hEUiB8fCB0aGlzLmVuYWJsZXNYRFIsXG4gICAgdGltZXN0YW1wUmVxdWVzdHM6IG9wdGlvbnMudGltZXN0YW1wUmVxdWVzdHMgfHwgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyxcbiAgICB0aW1lc3RhbXBQYXJhbTogb3B0aW9ucy50aW1lc3RhbXBQYXJhbSB8fCB0aGlzLnRpbWVzdGFtcFBhcmFtLFxuICAgIHBvbGljeVBvcnQ6IG9wdGlvbnMucG9saWN5UG9ydCB8fCB0aGlzLnBvbGljeVBvcnQsXG4gICAgcGZ4OiBvcHRpb25zLnBmeCB8fCB0aGlzLnBmeCxcbiAgICBrZXk6IG9wdGlvbnMua2V5IHx8IHRoaXMua2V5LFxuICAgIHBhc3NwaHJhc2U6IG9wdGlvbnMucGFzc3BocmFzZSB8fCB0aGlzLnBhc3NwaHJhc2UsXG4gICAgY2VydDogb3B0aW9ucy5jZXJ0IHx8IHRoaXMuY2VydCxcbiAgICBjYTogb3B0aW9ucy5jYSB8fCB0aGlzLmNhLFxuICAgIGNpcGhlcnM6IG9wdGlvbnMuY2lwaGVycyB8fCB0aGlzLmNpcGhlcnMsXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCB8fCB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLFxuICAgIGV4dHJhSGVhZGVyczogb3B0aW9ucy5leHRyYUhlYWRlcnMgfHwgdGhpcy5leHRyYUhlYWRlcnMsXG4gICAgZm9yY2VOb2RlOiBvcHRpb25zLmZvcmNlTm9kZSB8fCB0aGlzLmZvcmNlTm9kZSxcbiAgICBsb2NhbEFkZHJlc3M6IG9wdGlvbnMubG9jYWxBZGRyZXNzIHx8IHRoaXMubG9jYWxBZGRyZXNzLFxuICAgIHJlcXVlc3RUaW1lb3V0OiBvcHRpb25zLnJlcXVlc3RUaW1lb3V0IHx8IHRoaXMucmVxdWVzdFRpbWVvdXQsXG4gICAgcHJvdG9jb2xzOiBvcHRpb25zLnByb3RvY29scyB8fCB2b2lkICgwKVxuICB9KTtcblxuICByZXR1cm4gdHJhbnNwb3J0O1xufTtcblxuZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIG9baV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU29ja2V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdHJhbnNwb3J0O1xuICBpZiAodGhpcy5yZW1lbWJlclVwZ3JhZGUgJiYgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyAmJiB0aGlzLnRyYW5zcG9ydHMuaW5kZXhPZignd2Vic29ja2V0JykgIT09IC0xKSB7XG4gICAgdHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7XG4gIH0gZWxzZSBpZiAoMCA9PT0gdGhpcy50cmFuc3BvcnRzLmxlbmd0aCkge1xuICAgIC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCAnTm8gdHJhbnNwb3J0cyBhdmFpbGFibGUnKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO1xuICB9XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcblxuICAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG4gIHRyeSB7XG4gICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMudHJhbnNwb3J0cy5zaGlmdCgpO1xuICAgIHRoaXMub3BlbigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyYW5zcG9ydC5vcGVuKCk7XG4gIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xuICBkZWJ1Zygnc2V0dGluZyB0cmFuc3BvcnQgJXMnLCB0cmFuc3BvcnQubmFtZSk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICBkZWJ1ZygnY2xlYXJpbmcgZXhpc3RpbmcgdHJhbnNwb3J0ICVzJywgdGhpcy50cmFuc3BvcnQubmFtZSk7XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gIC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG4gIHRyYW5zcG9ydFxuICAub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25EcmFpbigpO1xuICB9KVxuICAub24oJ3BhY2tldCcsIGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gIH0pXG4gIC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub25FcnJvcihlKTtcbiAgfSlcbiAgLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoJ3RyYW5zcG9ydCBjbG9zZScpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wcm9iZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUsIHsgcHJvYmU6IDEgfSk7XG4gIHZhciBmYWlsZWQgPSBmYWxzZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydE9wZW4gKCkge1xuICAgIGlmIChzZWxmLm9ubHlCaW5hcnlVcGdyYWRlcykge1xuICAgICAgdmFyIHVwZ3JhZGVMb3Nlc0JpbmFyeSA9ICF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmIHNlbGYudHJhbnNwb3J0LnN1cHBvcnRzQmluYXJ5O1xuICAgICAgZmFpbGVkID0gZmFpbGVkIHx8IHVwZ3JhZGVMb3Nlc0JpbmFyeTtcbiAgICB9XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgb3BlbmVkJywgbmFtZSk7XG4gICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3BpbmcnLCBkYXRhOiAncHJvYmUnIH1dKTtcbiAgICB0cmFuc3BvcnQub25jZSgncGFja2V0JywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgaWYgKCdwb25nJyA9PT0gbXNnLnR5cGUgJiYgJ3Byb2JlJyA9PT0gbXNnLmRhdGEpIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgcG9uZycsIG5hbWUpO1xuICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IHRydWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkaW5nJywgdHJhbnNwb3J0KTtcbiAgICAgICAgaWYgKCF0cmFuc3BvcnQpIHJldHVybjtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09PSB0cmFuc3BvcnQubmFtZTtcblxuICAgICAgICBkZWJ1ZygncGF1c2luZyBjdXJyZW50IHRyYW5zcG9ydCBcIiVzXCInLCBzZWxmLnRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgc2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgICAgICBpZiAoJ2Nsb3NlZCcgPT09IHNlbGYucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICAgIGRlYnVnKCdjaGFuZ2luZyB0cmFuc3BvcnQgYW5kIHNlbmRpbmcgdXBncmFkZSBwYWNrZXQnKTtcblxuICAgICAgICAgIGNsZWFudXAoKTtcblxuICAgICAgICAgIHNlbGYuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3VwZ3JhZGUnIH1dKTtcbiAgICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGUnLCB0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgc2VsZi51cGdyYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZWxmLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkJywgbmFtZSk7XG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3Byb2JlIGVycm9yJyk7XG4gICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0ICgpIHtcbiAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICBmYWlsZWQgPSB0cnVlO1xuXG4gICAgY2xlYW51cCgpO1xuXG4gICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgfVxuXG4gIC8vIEhhbmRsZSBhbnkgZXJyb3IgdGhhdCBoYXBwZW5zIHdoaWxlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25lcnJvciAoZXJyKSB7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcjogJyArIGVycik7XG4gICAgZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICBmcmVlemVUcmFuc3BvcnQoKTtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsIG5hbWUsIGVycik7XG5cbiAgICBzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsIGVycm9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UgKCkge1xuICAgIG9uZXJyb3IoJ3RyYW5zcG9ydCBjbG9zZWQnKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbmNsb3NlICgpIHtcbiAgICBvbmVycm9yKCdzb2NrZXQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbnVwZ3JhZGUgKHRvKSB7XG4gICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgZGVidWcoJ1wiJXNcIiB3b3JrcyAtIGFib3J0aW5nIFwiJXNcIicsIHRvLm5hbWUsIHRyYW5zcG9ydC5uYW1lKTtcbiAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkaW5nJywgb251cGdyYWRlKTtcbiAgfVxuXG4gIHRyYW5zcG9ydC5vbmNlKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgdHJhbnNwb3J0Lm9uY2UoJ2Vycm9yJywgb25lcnJvcik7XG4gIHRyYW5zcG9ydC5vbmNlKCdjbG9zZScsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuXG4gIHRoaXMub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgdGhpcy5vbmNlKCd1cGdyYWRpbmcnLCBvbnVwZ3JhZGUpO1xuXG4gIHRyYW5zcG9ydC5vcGVuKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3NvY2tldCBvcGVuJyk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgdGhpcy5mbHVzaCgpO1xuXG4gIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgLy8gbGlzdGVuZXIgYWxyZWFkeSBjbG9zZWQgdGhlIHNvY2tldFxuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy51cGdyYWRlICYmIHRoaXMudHJhbnNwb3J0LnBhdXNlKSB7XG4gICAgZGVidWcoJ3N0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzJyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLCBwYWNrZXQudHlwZSwgcGFja2V0LmRhdGEpO1xuXG4gICAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xuXG4gICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgIHRoaXMuZW1pdCgnaGVhcnRiZWF0Jyk7XG5cbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdwb25nJzpcbiAgICAgICAgdGhpcy5zZXRQaW5nKCk7XG4gICAgICAgIHRoaXMuZW1pdCgncG9uZycpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtcbiAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgdGhpcy5vbkVycm9yKGVycik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgcGFja2V0LmRhdGEpO1xuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkhhbmRzaGFrZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnaGFuZHNoYWtlJywgZGF0YSk7XG4gIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gIHRoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgdGhpcy5vbk9wZW4oKTtcbiAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICBpZiAoJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICB0aGlzLnNldFBpbmcoKTtcblxuICAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG4gIHRoaXMub24oJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xufTtcblxuLyoqXG4gKiBSZXNldHMgcGluZyB0aW1lb3V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLnBpbmdUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJ2Nsb3NlZCcgPT09IHNlbGYucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgIHNlbGYub25DbG9zZSgncGluZyB0aW1lb3V0Jyk7XG4gIH0sIHRpbWVvdXQgfHwgKHNlbGYucGluZ0ludGVydmFsICsgc2VsZi5waW5nVGltZW91dCkpO1xufTtcblxuLyoqXG4gKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxuICogd2l0aGluIGB0aGlzLnBpbmdUaW1lb3V0YCBvciBjbG9zZXMgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2xlYXJUaW1lb3V0KHNlbGYucGluZ0ludGVydmFsVGltZXIpO1xuICBzZWxmLnBpbmdJbnRlcnZhbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyaXRpbmcgcGluZyBwYWNrZXQgLSBleHBlY3RpbmcgcG9uZyB3aXRoaW4gJXNtcycsIHNlbGYucGluZ1RpbWVvdXQpO1xuICAgIHNlbGYucGluZygpO1xuICAgIHNlbGYub25IZWFydGJlYXQoc2VsZi5waW5nVGltZW91dCk7XG4gIH0sIHNlbGYucGluZ0ludGVydmFsKTtcbn07XG5cbi8qKlxuKiBTZW5kcyBhIHBpbmcgcGFja2V0LlxuKlxuKiBAYXBpIHByaXZhdGVcbiovXG5cblNvY2tldC5wcm90b3R5cGUucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnNlbmRQYWNrZXQoJ3BpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5lbWl0KCdwaW5nJyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25EcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcblxuICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuXG4gIGlmICgwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIHRoaXMuZW1pdCgnZHJhaW4nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmZsdXNoKCk7XG4gIH1cbn07XG5cbi8qKlxuICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ2Nsb3NlZCcgIT09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICF0aGlzLnVwZ3JhZGluZyAmJiB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIGRlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHRoaXMud3JpdGVCdWZmZXIpO1xuICAgIC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbiAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDtcbiAgICB0aGlzLmVtaXQoJ2ZsdXNoJyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VuZHMgYSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLndyaXRlID1cblNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtc2csIG9wdGlvbnMsIGZuKSB7XG4gIHRoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsIG1zZywgb3B0aW9ucywgZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kUGFja2V0ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEsIG9wdGlvbnMsIGZuKSB7XG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZGF0YSkge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgZm4gPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG5cbiAgaWYgKCdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5jb21wcmVzcyA9IGZhbHNlICE9PSBvcHRpb25zLmNvbXByZXNzO1xuXG4gIHZhciBwYWNrZXQgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBkYXRhLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcbiAgdGhpcy5lbWl0KCdwYWNrZXRDcmVhdGUnLCBwYWNrZXQpO1xuICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgaWYgKGZuKSB0aGlzLm9uY2UoJ2ZsdXNoJywgZm4pO1xuICB0aGlzLmZsdXNoKCk7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2luZyc7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCdmb3JjZWQgY2xvc2UnKTtcbiAgICBkZWJ1Zygnc29ja2V0IGNsb3NpbmcgLSB0ZWxsaW5nIHRyYW5zcG9ydCB0byBjbG9zZScpO1xuICAgIHNlbGYudHJhbnNwb3J0LmNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UgKCkge1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGVFcnJvcicsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgY2xvc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhaXRGb3JVcGdyYWRlICgpIHtcbiAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgIHNlbGYub25jZSgndXBncmFkZScsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgc2VsZi5vbmNlKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgZGVidWcoJ3NvY2tldCBlcnJvciAlaicsIGVycik7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMub25DbG9zZSgndHJhbnNwb3J0IGVycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24sIGRlc2MpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJywgcmVhc29uKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBjbGVhciB0aW1lcnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG5cbiAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Nsb3NlJyk7XG5cbiAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG5cbiAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG5cbiAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgdGhpcy5pZCA9IG51bGw7XG5cbiAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbiwgZGVzYyk7XG5cbiAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICBzZWxmLndyaXRlQnVmZmVyID0gW107XG4gICAgc2VsZi5wcmV2QnVmZmVyTGVuID0gMDtcbiAgfVxufTtcblxuLyoqXG4gKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICpcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24gKHVwZ3JhZGVzKSB7XG4gIHZhciBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBqID0gdXBncmFkZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgaWYgKH5pbmRleCh0aGlzLnRyYW5zcG9ydHMsIHVwZ3JhZGVzW2ldKSkgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgfVxuICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDtcblxuLyoqXG4gKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBUcmFuc3BvcnQgKG9wdHMpIHtcbiAgdGhpcy5wYXRoID0gb3B0cy5wYXRoO1xuICB0aGlzLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZTtcbiAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0O1xuICB0aGlzLnNlY3VyZSA9IG9wdHMuc2VjdXJlO1xuICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7XG4gIHRoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gIHRoaXMuY2EgPSBvcHRzLmNhO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIHRoaXMuZm9yY2VOb2RlID0gb3B0cy5mb3JjZU5vZGU7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgdGhpcy5sb2NhbEFkZHJlc3MgPSBvcHRzLmxvY2FsQWRkcmVzcztcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoVHJhbnNwb3J0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRW1pdHMgYW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKG1zZywgZGVzYykge1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci50eXBlID0gJ1RyYW5zcG9ydEVycm9yJztcbiAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuICAgIHRoaXMuZG9PcGVuKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5kb0Nsb3NlKCk7XG4gICAgdGhpcy5vbkNsb3NlKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLndyaXRlKHBhY2tldHMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IG5vdCBvcGVuJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gb3BlblxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgcGFja2V0ID0gcGFyc2VyLmRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFhIUiA9IHJlcXVpcmUoJy4vcG9sbGluZy14aHInKTtcbnZhciBKU09OUCA9IHJlcXVpcmUoJy4vcG9sbGluZy1qc29ucCcpO1xudmFyIHdlYnNvY2tldCA9IHJlcXVpcmUoJy4vd2Vic29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0IHRyYW5zcG9ydHMuXG4gKi9cblxuZXhwb3J0cy5wb2xsaW5nID0gcG9sbGluZztcbmV4cG9ydHMud2Vic29ja2V0ID0gd2Vic29ja2V0O1xuXG4vKipcbiAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxuICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcG9sbGluZyAob3B0cykge1xuICB2YXIgeGhyO1xuICB2YXIgeGQgPSBmYWxzZTtcbiAgdmFyIHhzID0gZmFsc2U7XG4gIHZhciBqc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuXG4gIGlmIChnbG9iYWwubG9jYXRpb24pIHtcbiAgICB2YXIgaXNTU0wgPSAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgdmFyIHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuXG4gICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgIGlmICghcG9ydCkge1xuICAgICAgcG9ydCA9IGlzU1NMID8gNDQzIDogODA7XG4gICAgfVxuXG4gICAgeGQgPSBvcHRzLmhvc3RuYW1lICE9PSBsb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgeHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gIH1cblxuICBvcHRzLnhkb21haW4gPSB4ZDtcbiAgb3B0cy54c2NoZW1lID0geHM7XG4gIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtcblxuICBpZiAoJ29wZW4nIGluIHhociAmJiAhb3B0cy5mb3JjZUpTT05QKSB7XG4gICAgcmV0dXJuIG5ldyBYSFIob3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFqc29ucCkgdGhyb3cgbmV3IEVycm9yKCdKU09OUCBkaXNhYmxlZCcpO1xuICAgIHJldHVybiBuZXcgSlNPTlAob3B0cyk7XG4gIH1cbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBQb2xsaW5nID0gcmVxdWlyZSgnLi9wb2xsaW5nJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7XG5cbi8qKlxuICogQ2FjaGVkIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gKi9cblxudmFyIHJOZXdsaW5lID0gL1xcbi9nO1xudmFyIHJFc2NhcGVkTmV3bGluZSA9IC9cXFxcbi9nO1xuXG4vKipcbiAqIEdsb2JhbCBKU09OUCBjYWxsYmFja3MuXG4gKi9cblxudmFyIGNhbGxiYWNrcztcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIGVtcHR5ICgpIHsgfVxuXG4vKipcbiAqIEpTT05QIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEpTT05QUG9sbGluZyAob3B0cykge1xuICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG5cbiAgLy8gZGVmaW5lIGdsb2JhbCBjYWxsYmFja3MgYXJyYXkgaWYgbm90IHByZXNlbnRcbiAgLy8gd2UgZG8gdGhpcyBoZXJlIChsYXppbHkpIHRvIGF2b2lkIHVubmVlZGVkIGdsb2JhbCBwb2xsdXRpb25cbiAgaWYgKCFjYWxsYmFja3MpIHtcbiAgICAvLyB3ZSBuZWVkIHRvIGNvbnNpZGVyIG11bHRpcGxlIGVuZ2luZXMgaW4gdGhlIHNhbWUgcGFnZVxuICAgIGlmICghZ2xvYmFsLl9fX2VpbykgZ2xvYmFsLl9fX2VpbyA9IFtdO1xuICAgIGNhbGxiYWNrcyA9IGdsb2JhbC5fX19laW87XG4gIH1cblxuICAvLyBjYWxsYmFjayBpZGVudGlmaWVyXG4gIHRoaXMuaW5kZXggPSBjYWxsYmFja3MubGVuZ3RoO1xuXG4gIC8vIGFkZCBjYWxsYmFjayB0byBqc29ucCBnbG9iYWxcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjYWxsYmFja3MucHVzaChmdW5jdGlvbiAobXNnKSB7XG4gICAgc2VsZi5vbkRhdGEobXNnKTtcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIHRvIHF1ZXJ5IHN0cmluZ1xuICB0aGlzLnF1ZXJ5LmogPSB0aGlzLmluZGV4O1xuXG4gIC8vIHByZXZlbnQgc3B1cmlvdXMgZXJyb3JzIGZyb20gYmVpbmcgZW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgdW5sb2FkZWRcbiAgaWYgKGdsb2JhbC5kb2N1bWVudCAmJiBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5zY3JpcHQpIHNlbGYuc2NyaXB0Lm9uZXJyb3IgPSBlbXB0eTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXG4gKi9cblxuaW5oZXJpdChKU09OUFBvbGxpbmcsIFBvbGxpbmcpO1xuXG4vKlxuICogSlNPTlAgb25seSBzdXBwb3J0cyBiaW5hcnkgYXMgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuXG4gIGlmICh0aGlzLmZvcm0pIHtcbiAgICB0aGlzLmZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvcm0pO1xuICAgIHRoaXMuZm9ybSA9IG51bGw7XG4gICAgdGhpcy5pZnJhbWUgPSBudWxsO1xuICB9XG5cbiAgUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gIH1cblxuICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICBzY3JpcHQuc3JjID0gdGhpcy51cmkoKTtcbiAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub25FcnJvcignanNvbnAgcG9sbCBlcnJvcicsIGUpO1xuICB9O1xuXG4gIHZhciBpbnNlcnRBdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgaWYgKGluc2VydEF0KSB7XG4gICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG4gIH0gZWxzZSB7XG4gICAgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfVxuICB0aGlzLnNjcmlwdCA9IHNjcmlwdDtcblxuICB2YXIgaXNVQWdlY2tvID0gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL2dlY2tvL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBpZiAoaXNVQWdlY2tvKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgfSwgMTAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXcml0ZXMgd2l0aCBhIGhpZGRlbiBpZnJhbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5mb3JtKSB7XG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgdmFyIGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHZhciBpZCA9IHRoaXMuaWZyYW1lSWQgPSAnZWlvX2lmcmFtZV8nICsgdGhpcy5pbmRleDtcbiAgICB2YXIgaWZyYW1lO1xuXG4gICAgZm9ybS5jbGFzc05hbWUgPSAnc29ja2V0aW8nO1xuICAgIGZvcm0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGZvcm0uc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgIGZvcm0uc3R5bGUubGVmdCA9ICctMTAwMHB4JztcbiAgICBmb3JtLnRhcmdldCA9IGlkO1xuICAgIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY2NlcHQtY2hhcnNldCcsICd1dGYtOCcpO1xuICAgIGFyZWEubmFtZSA9ICdkJztcbiAgICBmb3JtLmFwcGVuZENoaWxkKGFyZWEpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gIH1cblxuICB0aGlzLmZvcm0uYWN0aW9uID0gdGhpcy51cmkoKTtcblxuICBmdW5jdGlvbiBjb21wbGV0ZSAoKSB7XG4gICAgaW5pdElmcmFtZSgpO1xuICAgIGZuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0SWZyYW1lICgpIHtcbiAgICBpZiAoc2VsZi5pZnJhbWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNlbGYuZm9ybS5yZW1vdmVDaGlsZChzZWxmLmlmcmFtZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHNlbGYub25FcnJvcignanNvbnAgcG9sbGluZyBpZnJhbWUgcmVtb3ZhbCBlcnJvcicsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBpZTYgZHluYW1pYyBpZnJhbWVzIHdpdGggdGFyZ2V0PVwiXCIgc3VwcG9ydCAodGhhbmtzIENocmlzIExhbWJhY2hlcilcbiAgICAgIHZhciBodG1sID0gJzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDowXCIgbmFtZT1cIicgKyBzZWxmLmlmcmFtZUlkICsgJ1wiPic7XG4gICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgaWZyYW1lLm5hbWUgPSBzZWxmLmlmcmFtZUlkO1xuICAgICAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0OjAnO1xuICAgIH1cblxuICAgIGlmcmFtZS5pZCA9IHNlbGYuaWZyYW1lSWQ7XG5cbiAgICBzZWxmLmZvcm0uYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICBzZWxmLmlmcmFtZSA9IGlmcmFtZTtcbiAgfVxuXG4gIGluaXRJZnJhbWUoKTtcblxuICAvLyBlc2NhcGUgXFxuIHRvIHByZXZlbnQgaXQgZnJvbSBiZWluZyBjb252ZXJ0ZWQgaW50byBcXHJcXG4gYnkgc29tZSBVQXNcbiAgLy8gZG91YmxlIGVzY2FwaW5nIGlzIHJlcXVpcmVkIGZvciBlc2NhcGVkIG5ldyBsaW5lcyBiZWNhdXNlIHVuZXNjYXBpbmcgb2YgbmV3IGxpbmVzIGNhbiBiZSBkb25lIHNhZmVseSBvbiBzZXJ2ZXItc2lkZVxuICBkYXRhID0gZGF0YS5yZXBsYWNlKHJFc2NhcGVkTmV3bGluZSwgJ1xcXFxcXG4nKTtcbiAgdGhpcy5hcmVhLnZhbHVlID0gZGF0YS5yZXBsYWNlKHJOZXdsaW5lLCAnXFxcXG4nKTtcblxuICB0cnkge1xuICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgfSBjYXRjaCAoZSkge31cblxuICBpZiAodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICB0aGlzLmlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5pZnJhbWUucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pZnJhbWUub25sb2FkID0gY29tcGxldGU7XG4gIH1cbn07XG4iLCIvKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nLXhocicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gWEhSO1xubW9kdWxlLmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRW1wdHkgZnVuY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7fVxuXG4vKipcbiAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFhIUiAob3B0cykge1xuICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG4gIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBvcHRzLnJlcXVlc3RUaW1lb3V0O1xuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuXG4gIGlmIChnbG9iYWwubG9jYXRpb24pIHtcbiAgICB2YXIgaXNTU0wgPSAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgdmFyIHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuXG4gICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgIGlmICghcG9ydCkge1xuICAgICAgcG9ydCA9IGlzU1NMID8gNDQzIDogODA7XG4gICAgfVxuXG4gICAgdGhpcy54ZCA9IG9wdHMuaG9zdG5hbWUgIT09IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSB8fFxuICAgICAgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgIHRoaXMueHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gIH1cbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXG4gKi9cblxuaW5oZXJpdChYSFIsIFBvbGxpbmcpO1xuXG4vKipcbiAqIFhIUiBzdXBwb3J0cyBiaW5hcnlcbiAqL1xuXG5YSFIucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgb3B0cy51cmkgPSB0aGlzLnVyaSgpO1xuICBvcHRzLnhkID0gdGhpcy54ZDtcbiAgb3B0cy54cyA9IHRoaXMueHM7XG4gIG9wdHMuYWdlbnQgPSB0aGlzLmFnZW50IHx8IGZhbHNlO1xuICBvcHRzLnN1cHBvcnRzQmluYXJ5ID0gdGhpcy5zdXBwb3J0c0JpbmFyeTtcbiAgb3B0cy5lbmFibGVzWERSID0gdGhpcy5lbmFibGVzWERSO1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgb3B0cy5yZXF1ZXN0VGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5leHRyYUhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcblxuICByZXR1cm4gbmV3IFJlcXVlc3Qob3B0cyk7XG59O1xuXG4vKipcbiAqIFNlbmRzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gIHZhciBpc0JpbmFyeSA9IHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJiBkYXRhICE9PSB1bmRlZmluZWQ7XG4gIHZhciByZXEgPSB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQT1NUJywgZGF0YTogZGF0YSwgaXNCaW5hcnk6IGlzQmluYXJ5IH0pO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignc3VjY2VzcycsIGZuKTtcbiAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3hociBwb3N0IGVycm9yJywgZXJyKTtcbiAgfSk7XG4gIHRoaXMuc2VuZFhociA9IHJlcTtcbn07XG5cbi8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3hociBwb2xsJyk7XG4gIHZhciByZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXEub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHNlbGYub25EYXRhKGRhdGEpO1xuICB9KTtcbiAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3hociBwb2xsIGVycm9yJywgZXJyKTtcbiAgfSk7XG4gIHRoaXMucG9sbFhociA9IHJlcTtcbn07XG5cbi8qKlxuICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QgKG9wdHMpIHtcbiAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCAnR0VUJztcbiAgdGhpcy51cmkgPSBvcHRzLnVyaTtcbiAgdGhpcy54ZCA9ICEhb3B0cy54ZDtcbiAgdGhpcy54cyA9ICEhb3B0cy54cztcbiAgdGhpcy5hc3luYyA9IGZhbHNlICE9PSBvcHRzLmFzeW5jO1xuICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50O1xuICB0aGlzLmlzQmluYXJ5ID0gb3B0cy5pc0JpbmFyeTtcbiAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IG9wdHMuc3VwcG9ydHNCaW5hcnk7XG4gIHRoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcbiAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IG9wdHMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG5cbiAgdGhpcy5jcmVhdGUoKTtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG9wdHMgPSB7IGFnZW50OiB0aGlzLmFnZW50LCB4ZG9tYWluOiB0aGlzLnhkLCB4c2NoZW1lOiB0aGlzLnhzLCBlbmFibGVzWERSOiB0aGlzLmVuYWJsZXNYRFIgfTtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgdmFyIHhociA9IHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdHJ5IHtcbiAgICBkZWJ1ZygneGhyIG9wZW4gJXM6ICVzJywgdGhpcy5tZXRob2QsIHRoaXMudXJpKTtcbiAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmksIHRoaXMuYXN5bmMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCB0aGlzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICgnUE9TVCcgPT09IHRoaXMubWV0aG9kKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5pc0JpbmFyeSkge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICcqLyonKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKHRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIH1cblxuICAgIC8vIGllNiBjaGVja1xuICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICB4aHIudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICB9O1xuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlICE9PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJykge1xuICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgIGlmICgyMDAgPT09IHhoci5zdGF0dXMgfHwgMTIyMyA9PT0geGhyLnN0YXR1cykge1xuICAgICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5zdGF0dXMpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlYnVnKCd4aHIgZGF0YSAlcycsIHRoaXMuZGF0YSk7XG4gICAgeGhyLnNlbmQodGhpcy5kYXRhKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmaHJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25FcnJvcihlKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF0gPSB0aGlzO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVzcG9uc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25TdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXQoJ3N1Y2Nlc3MnKTtcbiAgdGhpcy5jbGVhbnVwKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5lbWl0KCdkYXRhJywgZGF0YSk7XG4gIHRoaXMub25TdWNjZXNzKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB0aGlzLmNsZWFudXAodHJ1ZSk7XG59O1xuXG4vKipcbiAqIENsZWFucyB1cCBob3VzZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKGZyb21FcnJvcikge1xuICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB4bWxodHRwcmVxdWVzdFxuICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgIHRoaXMueGhyLm9ubG9hZCA9IHRoaXMueGhyLm9uZXJyb3IgPSBlbXB0eTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgfVxuXG4gIGlmIChmcm9tRXJyb3IpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgIGRlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdO1xuICB9XG5cbiAgdGhpcy54aHIgPSBudWxsO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBsb2FkLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRhdGE7XG4gIHRyeSB7XG4gICAgdmFyIGNvbnRlbnRUeXBlO1xuICAgIHRyeSB7XG4gICAgICBjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIGlmIChjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgIGlmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlIHx8IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KHRoaXMueGhyLnJlc3BvbnNlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5vbkVycm9yKGUpO1xuICB9XG4gIGlmIChudWxsICE9IGRhdGEpIHtcbiAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuaGFzWERSID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgIXRoaXMueHMgJiYgdGhpcy5lbmFibGVzWERSO1xufTtcblxuLyoqXG4gKiBBYm9ydHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbGVhbnVwKCk7XG59O1xuXG4vKipcbiAqIEFib3J0cyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdW5sb2FkaW5nIHRoZSB3aW5kb3cuIFRoaXMgaXMgbmVlZGVkIHRvIHByZXZlbnRcbiAqIG1lbW9yeSBsZWFrcyAoZS5nLiB3aGVuIHVzaW5nIElFKSBhbmQgdG8gZW5zdXJlIHRoYXQgbm8gc3B1cmlvdXMgZXJyb3IgaXNcbiAqIGVtaXR0ZWQuXG4gKi9cblxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcblxuaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICBpZiAoZ2xvYmFsLmF0dGFjaEV2ZW50KSB7XG4gICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbnVubG9hZCcsIHVubG9hZEhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHVubG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bmxvYWRIYW5kbGVyICgpIHtcbiAgZm9yICh2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7XG4gICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi4vdHJhbnNwb3J0Jyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG52YXIgeWVhc3QgPSByZXF1aXJlKCd5ZWFzdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nO1xuXG4vKipcbiAqIElzIFhIUjIgc3VwcG9ydGVkP1xuICovXG5cbnZhciBoYXNYSFIyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoeyB4ZG9tYWluOiBmYWxzZSB9KTtcbiAgcmV0dXJuIG51bGwgIT0geGhyLnJlc3BvbnNlVHlwZTtcbn0pKCk7XG5cbi8qKlxuICogUG9sbGluZyBpbnRlcmZhY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFBvbGxpbmcgKG9wdHMpIHtcbiAgdmFyIGZvcmNlQmFzZTY0ID0gKG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NCk7XG4gIGlmICghaGFzWEhSMiB8fCBmb3JjZUJhc2U2NCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuICBUcmFuc3BvcnQuY2FsbCh0aGlzLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAqL1xuXG5pbmhlcml0KFBvbGxpbmcsIFRyYW5zcG9ydCk7XG5cbi8qKlxuICogVHJhbnNwb3J0IG5hbWUuXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICdwb2xsaW5nJztcblxuLyoqXG4gKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gKiB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucG9sbCgpO1xufTtcblxuLyoqXG4gKiBQYXVzZXMgcG9sbGluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKG9uUGF1c2UpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztcblxuICBmdW5jdGlvbiBwYXVzZSAoKSB7XG4gICAgZGVidWcoJ3BhdXNlZCcpO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgIG9uUGF1c2UoKTtcbiAgfVxuXG4gIGlmICh0aGlzLnBvbGxpbmcgfHwgIXRoaXMud3JpdGFibGUpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgaWYgKHRoaXMucG9sbGluZykge1xuICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgcG9sbGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgIHRvdGFsKys7XG4gICAgICB0aGlzLm9uY2UoJ3BvbGxDb21wbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlJyk7XG4gICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgIHRvdGFsKys7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhdXNlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygncG9sbGluZycpO1xuICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICB0aGlzLmRvUG9sbCgpO1xuICB0aGlzLmVtaXQoJ3BvbGwnKTtcbn07XG5cbi8qKlxuICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBkZWJ1ZygncG9sbGluZyBnb3QgZGF0YSAlcycsIGRhdGEpO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAocGFja2V0LCBpbmRleCwgdG90YWwpIHtcbiAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgaWYgKCdvcGVuaW5nJyA9PT0gc2VsZi5yZWFkeVN0YXRlKSB7XG4gICAgICBzZWxmLm9uT3BlbigpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICBpZiAoJ2Nsb3NlJyA9PT0gcGFja2V0LnR5cGUpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gIH07XG5cbiAgLy8gZGVjb2RlIHBheWxvYWRcbiAgcGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuXG4gIC8vIGlmIGFuIGV2ZW50IGRpZCBub3QgdHJpZ2dlciBjbG9zaW5nXG4gIGlmICgnY2xvc2VkJyAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ3BvbGxDb21wbGV0ZScpO1xuXG4gICAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICB0aGlzLnBvbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgICBkZWJ1Zygnd3JpdGluZyBjbG9zZSBwYWNrZXQnKTtcbiAgICBzZWxmLndyaXRlKFt7IHR5cGU6ICdjbG9zZScgfV0pO1xuICB9XG5cbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3RyYW5zcG9ydCBvcGVuIC0gY2xvc2luZycpO1xuICAgIGNsb3NlKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgIGRlYnVnKCd0cmFuc3BvcnQgbm90IG9wZW4gLSBkZWZlcnJpbmcgY2xvc2UnKTtcbiAgICB0aGlzLm9uY2UoJ29wZW4nLCBjbG9zZSk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgcGFja2V0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gIHZhciBjYWxsYmFja2ZuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgfTtcblxuICBwYXJzZXIuZW5jb2RlUGF5bG9hZChwYWNrZXRzLCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHNlbGYuZG9Xcml0ZShkYXRhLCBjYWxsYmFja2ZuKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gIGlmIChmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgfVxuXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnaHR0cHMnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAgKCdodHRwJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgcG9ydCA9ICc6JyArIHRoaXMucG9ydDtcbiAgfVxuXG4gIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIHllYXN0ID0gcmVxdWlyZSgneWVhc3QnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0Jyk7XG52YXIgQnJvd3NlcldlYlNvY2tldCA9IGdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDtcbnZhciBOb2RlV2ViU29ja2V0O1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIHRyeSB7XG4gICAgTm9kZVdlYlNvY2tldCA9IHJlcXVpcmUoJ3dzJyk7XG4gIH0gY2F0Y2ggKGUpIHsgfVxufVxuXG4vKipcbiAqIEdldCBlaXRoZXIgdGhlIGBXZWJTb2NrZXRgIG9yIGBNb3pXZWJTb2NrZXRgIGdsb2JhbHNcbiAqIGluIHRoZSBicm93c2VyIG9yIHRyeSB0byByZXNvbHZlIFdlYlNvY2tldC1jb21wYXRpYmxlXG4gKiBpbnRlcmZhY2UgZXhwb3NlZCBieSBgd3NgIGZvciBOb2RlLWxpa2UgZW52aXJvbm1lbnQuXG4gKi9cblxudmFyIFdlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQ7XG5pZiAoIVdlYlNvY2tldCAmJiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICBXZWJTb2NrZXQgPSBOb2RlV2ViU29ja2V0O1xufVxuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gV1M7XG5cbi8qKlxuICogV2ViU29ja2V0IHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBXUyAob3B0cykge1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlO1xuICB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQgJiYgIW9wdHMuZm9yY2VOb2RlO1xuICB0aGlzLnByb3RvY29scyA9IG9wdHMucHJvdG9jb2xzO1xuICBpZiAoIXRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgV2ViU29ja2V0ID0gTm9kZVdlYlNvY2tldDtcbiAgfVxuICBUcmFuc3BvcnQuY2FsbCh0aGlzLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAqL1xuXG5pbmhlcml0KFdTLCBUcmFuc3BvcnQpO1xuXG4vKipcbiAqIFRyYW5zcG9ydCBuYW1lLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuV1MucHJvdG90eXBlLm5hbWUgPSAnd2Vic29ja2V0JztcblxuLypcbiAqIFdlYlNvY2tldHMgc3VwcG9ydCBiaW5hcnlcbiAqL1xuXG5XUy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4vKipcbiAqIE9wZW5zIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgIC8vIGxldCBwcm9iZSB0aW1lb3V0XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHVyaSA9IHRoaXMudXJpKCk7XG4gIHZhciBwcm90b2NvbHMgPSB0aGlzLnByb3RvY29scztcbiAgdmFyIG9wdHMgPSB7XG4gICAgYWdlbnQ6IHRoaXMuYWdlbnQsXG4gICAgcGVyTWVzc2FnZURlZmxhdGU6IHRoaXMucGVyTWVzc2FnZURlZmxhdGVcbiAgfTtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIGlmICh0aGlzLmV4dHJhSGVhZGVycykge1xuICAgIG9wdHMuaGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuICB9XG4gIGlmICh0aGlzLmxvY2FsQWRkcmVzcykge1xuICAgIG9wdHMubG9jYWxBZGRyZXNzID0gdGhpcy5sb2NhbEFkZHJlc3M7XG4gIH1cblxuICB0cnkge1xuICAgIHRoaXMud3MgPSB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCA/IChwcm90b2NvbHMgPyBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKSA6IG5ldyBXZWJTb2NrZXQodXJpKSkgOiBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzLCBvcHRzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgaWYgKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMud3Muc3VwcG9ydHMgJiYgdGhpcy53cy5zdXBwb3J0cy5iaW5hcnkpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcbiAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnbm9kZWJ1ZmZlcic7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgfVxuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbi8qKlxuICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25PcGVuKCk7XG4gIH07XG4gIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgfTtcbiAgdGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsIGUpO1xuICB9O1xufTtcblxuLyoqXG4gKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgdmFyIHRvdGFsID0gcGFja2V0cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdG90YWw7IGkgPCBsOyBpKyspIHtcbiAgICAoZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgcGFyc2VyLmVuY29kZVBhY2tldChwYWNrZXQsIHNlbGYuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICghc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgIHZhciBvcHRzID0ge307XG4gICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSAnc3RyaW5nJyA9PT0gdHlwZW9mIGRhdGEgPyBnbG9iYWwuQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSkgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsZW4gPCBzZWxmLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBkZWJ1Zygnd2Vic29ja2V0IGNsb3NlZCBiZWZvcmUgb25jbG9zZSBldmVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLS10b3RhbCB8fCBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KShwYWNrZXRzW2ldKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgIHNlbGYuZW1pdCgnZmx1c2gnKTtcblxuICAgIC8vIGZha2UgZHJhaW5cbiAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBjbG9zZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogQ2xvc2VzIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgdmFyIHBvcnQgPSAnJztcblxuICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICBpZiAodGhpcy5wb3J0ICYmICgoJ3dzcycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICgnd3MnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDgwKSkpIHtcbiAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICB9XG5cbiAgLy8gYXBwZW5kIHRpbWVzdGFtcCB0byBVUklcbiAgaWYgKHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gIH1cblxuICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbn07XG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb24gZm9yIFdlYlNvY2tldC5cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuV1MucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gISFXZWJTb2NrZXQgJiYgISgnX19pbml0aWFsaXplJyBpbiBXZWJTb2NrZXQgJiYgdGhpcy5uYW1lID09PSBXUy5wcm90b3R5cGUubmFtZSk7XG59O1xuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcblxudmFyIGhhc0NPUlMgPSByZXF1aXJlKCdoYXMtY29ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIHZhciB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuXG4gIC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuICAvLyBodHRwOi8vYmxvZ3MubXNkbi5jb20vYi9pZWludGVybmFscy9hcmNoaXZlLzIwMTAvMDUvMTMveGRvbWFpbnJlcXVlc3QtcmVzdHJpY3Rpb25zLWxpbWl0YXRpb25zLWFuZC13b3JrYXJvdW5kcy5hc3B4XG4gIHZhciB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xuICB2YXIgZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuICAvLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20veXVqaW9zYWthL3NvY2tlLmlvLWllOC1sb2FkaW5nLWV4YW1wbGVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAheHNjaGVtZSAmJiBlbmFibGVzWERSKSB7XG4gICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7IH1cblxuICBpZiAoIXhkb21haW4pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBnbG9iYWxbWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKV0oJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cbn07XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG52YXIgaGFzQmluYXJ5ID0gcmVxdWlyZSgnaGFzLWJpbmFyeTInKTtcbnZhciBzbGljZUJ1ZmZlciA9IHJlcXVpcmUoJ2FycmF5YnVmZmVyLnNsaWNlJyk7XG52YXIgYWZ0ZXIgPSByZXF1aXJlKCdhZnRlcicpO1xudmFyIHV0ZjggPSByZXF1aXJlKCcuL3V0ZjgnKTtcblxudmFyIGJhc2U2NGVuY29kZXI7XG5pZiAoZ2xvYmFsICYmIGdsb2JhbC5BcnJheUJ1ZmZlcikge1xuICBiYXNlNjRlbmNvZGVyID0gcmVxdWlyZSgnYmFzZTY0LWFycmF5YnVmZmVyJyk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgYW4gYW5kcm9pZCBicm93c2VyLiBUaGF0IHJlcXVpcmVzIHVzIHRvIHVzZVxuICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cbiAqXG4gKiBodHRwOi8vZ2hpbmRhLm5ldC9qcGVnLWJsb2ItYWpheC1hbmRyb2lkL1xuICovXG5cbnZhciBpc0FuZHJvaWQgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvQW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gUGhhbnRvbUpTLlxuICogVXBsb2FkaW5nIGEgQmxvYiB3aXRoIFBoYW50b21KUyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSwgYXMgcmVwb3J0ZWQgaGVyZTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzExMzk1XG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBpc1BoYW50b21KUyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9QaGFudG9tSlMvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIFdoZW4gdHJ1ZSwgYXZvaWRzIHVzaW5nIEJsb2JzIHRvIGVuY29kZSBwYXlsb2Fkcy5cbiAqIEB0eXBlIGJvb2xlYW5cbiAqL1xudmFyIGRvbnRTZW5kQmxvYnMgPSBpc0FuZHJvaWQgfHwgaXNQaGFudG9tSlM7XG5cbi8qKlxuICogQ3VycmVudCBwcm90b2NvbCB2ZXJzaW9uLlxuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqL1xuXG52YXIgcGFja2V0cyA9IGV4cG9ydHMucGFja2V0cyA9IHtcbiAgICBvcGVuOiAgICAgMCAgICAvLyBub24td3NcbiAgLCBjbG9zZTogICAgMSAgICAvLyBub24td3NcbiAgLCBwaW5nOiAgICAgMlxuICAsIHBvbmc6ICAgICAzXG4gICwgbWVzc2FnZTogIDRcbiAgLCB1cGdyYWRlOiAgNVxuICAsIG5vb3A6ICAgICA2XG59O1xuXG52YXIgcGFja2V0c2xpc3QgPSBrZXlzKHBhY2tldHMpO1xuXG4vKipcbiAqIFByZW1hZGUgZXJyb3IgcGFja2V0LlxuICovXG5cbnZhciBlcnIgPSB7IHR5cGU6ICdlcnJvcicsIGRhdGE6ICdwYXJzZXIgZXJyb3InIH07XG5cbi8qKlxuICogQ3JlYXRlIGEgYmxvYiBhcGkgZXZlbiBmb3IgYmxvYiBidWlsZGVyIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gKi9cblxudmFyIEJsb2IgPSByZXF1aXJlKCdibG9iJyk7XG5cbi8qKlxuICogRW5jb2RlcyBhIHBhY2tldC5cbiAqXG4gKiAgICAgPHBhY2tldCB0eXBlIGlkPiBbIDxkYXRhPiBdXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgNWhlbGxvIHdvcmxkXG4gKiAgICAgM1xuICogICAgIDRcbiAqXG4gKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdXRmOGVuY29kZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdXRmOGVuY29kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gdXRmOGVuY29kZTtcbiAgICB1dGY4ZW5jb2RlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBkYXRhID0gKHBhY2tldC5kYXRhID09PSB1bmRlZmluZWQpXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtcblxuICBpZiAoZ2xvYmFsLkFycmF5QnVmZmVyICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAoQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2IpIHtcbiAgICByZXR1cm4gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBtaWdodCBiZSBhbiBvYmplY3Qgd2l0aCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgaWYgKGRhdGEgJiYgZGF0YS5iYXNlNjQpIHtcbiAgICByZXR1cm4gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG4gIHZhciBlbmNvZGVkID0gcGFja2V0c1twYWNrZXQudHlwZV07XG5cbiAgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuICBpZiAodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSkge1xuICAgIGVuY29kZWQgKz0gdXRmOGVuY29kZSA/IHV0ZjguZW5jb2RlKFN0cmluZyhwYWNrZXQuZGF0YSksIHsgc3RyaWN0OiBmYWxzZSB9KSA6IFN0cmluZyhwYWNrZXQuZGF0YSk7XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2soJycgKyBlbmNvZGVkKTtcblxufTtcblxuZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spIHtcbiAgLy8gcGFja2V0IGRhdGEgaXMgYW4gb2JqZWN0IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV0gKyBwYWNrZXQuZGF0YS5kYXRhO1xuICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG59XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBoZWxwZXJzIGZvciBiaW5hcnkgdHlwZXNcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGRhdGEgPSBwYWNrZXQuZGF0YTtcbiAgdmFyIGNvbnRlbnRBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB2YXIgcmVzdWx0QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoMSArIGRhdGEuYnl0ZUxlbmd0aCk7XG5cbiAgcmVzdWx0QnVmZmVyWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0QnVmZmVyW2krMV0gPSBjb250ZW50QXJyYXlbaV07XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2socmVzdWx0QnVmZmVyLmJ1ZmZlcik7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBmci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBwYWNrZXQuZGF0YSA9IGZyLnJlc3VsdDtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCB0cnVlLCBjYWxsYmFjayk7XG4gIH07XG4gIHJldHVybiBmci5yZWFkQXNBcnJheUJ1ZmZlcihwYWNrZXQuZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmIChkb250U2VuZEJsb2JzKSB7XG4gICAgcmV0dXJuIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBuZXcgVWludDhBcnJheSgxKTtcbiAgbGVuZ3RoWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gIHZhciBibG9iID0gbmV3IEJsb2IoW2xlbmd0aC5idWZmZXIsIHBhY2tldC5kYXRhXSk7XG5cbiAgcmV0dXJuIGNhbGxiYWNrKGJsb2IpO1xufVxuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQgd2l0aCBiaW5hcnkgZGF0YSBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0LCBoYXMgYHR5cGVgIGFuZCBgZGF0YWBcbiAqIEByZXR1cm4ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LCBjYWxsYmFjaykge1xuICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV07XG4gIGlmIChCbG9iICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2IpIHtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGI2NCA9IGZyLnJlc3VsdC5zcGxpdCgnLCcpWzFdO1xuICAgICAgY2FsbGJhY2sobWVzc2FnZSArIGI2NCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnIucmVhZEFzRGF0YVVSTChwYWNrZXQuZGF0YSk7XG4gIH1cblxuICB2YXIgYjY0ZGF0YTtcbiAgdHJ5IHtcbiAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgd2l0aCB0eXBlZCBhcnJheXNcbiAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSk7XG4gICAgdmFyIGJhc2ljID0gbmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgYmFzaWNbaV0gPSB0eXBlZFtpXTtcbiAgICB9XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYmFzaWMpO1xuICB9XG4gIG1lc3NhZ2UgKz0gZ2xvYmFsLmJ0b2EoYjY0ZGF0YSk7XG4gIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbn07XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCB1dGY4ZGVjb2RlKSB7XG4gIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG4gIC8vIFN0cmluZyBkYXRhXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoZGF0YS5jaGFyQXQoMCkgPT09ICdiJykge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0KGRhdGEuc3Vic3RyKDEpLCBiaW5hcnlUeXBlKTtcbiAgICB9XG5cbiAgICBpZiAodXRmOGRlY29kZSkge1xuICAgICAgZGF0YSA9IHRyeURlY29kZShkYXRhKTtcbiAgICAgIGlmIChkYXRhID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdHlwZSA9IGRhdGEuY2hhckF0KDApO1xuXG4gICAgaWYgKE51bWJlcih0eXBlKSAhPSB0eXBlIHx8ICFwYWNrZXRzbGlzdFt0eXBlXSkge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogZGF0YS5zdWJzdHJpbmcoMSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0gfTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXNBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB2YXIgdHlwZSA9IGFzQXJyYXlbMF07XG4gIHZhciByZXN0ID0gc2xpY2VCdWZmZXIoZGF0YSwgMSk7XG4gIGlmIChCbG9iICYmIGJpbmFyeVR5cGUgPT09ICdibG9iJykge1xuICAgIHJlc3QgPSBuZXcgQmxvYihbcmVzdF0pO1xuICB9XG4gIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiByZXN0IH07XG59O1xuXG5mdW5jdGlvbiB0cnlEZWNvZGUoZGF0YSkge1xuICB0cnkge1xuICAgIGRhdGEgPSB1dGY4LmRlY29kZShkYXRhLCB7IHN0cmljdDogZmFsc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldCBlbmNvZGVkIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqL1xuXG5leHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKG1zZywgYmluYXJ5VHlwZSkge1xuICB2YXIgdHlwZSA9IHBhY2tldHNsaXN0W21zZy5jaGFyQXQoMCldO1xuICBpZiAoIWJhc2U2NGVuY29kZXIpIHtcbiAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogbXNnLnN1YnN0cigxKSB9IH07XG4gIH1cblxuICB2YXIgZGF0YSA9IGJhc2U2NGVuY29kZXIuZGVjb2RlKG1zZy5zdWJzdHIoMSkpO1xuXG4gIGlmIChiaW5hcnlUeXBlID09PSAnYmxvYicgJiYgQmxvYikge1xuICAgIGRhdGEgPSBuZXcgQmxvYihbZGF0YV0pO1xuICB9XG5cbiAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9O1xufTtcblxuLyoqXG4gKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cbiAqXG4gKiAgICAgPGxlbmd0aD46ZGF0YVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDExOmhlbGxvIHdvcmxkMjpoaVxuICpcbiAqIElmIGFueSBjb250ZW50cyBhcmUgYmluYXJ5LCB0aGV5IHdpbGwgYmUgZW5jb2RlZCBhcyBiYXNlNjQgc3RyaW5ncy4gQmFzZTY0XG4gKiBlbmNvZGVkIHN0cmluZ3MgYXJlIG1hcmtlZCB3aXRoIGEgYiBiZWZvcmUgdGhlIGxlbmd0aCBzcGVjaWZpZXJcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbiAocGFja2V0cywgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O1xuICAgIHN1cHBvcnRzQmluYXJ5ID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpc0JpbmFyeSA9IGhhc0JpbmFyeShwYWNrZXRzKTtcblxuICBpZiAoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpIHtcbiAgICBpZiAoQmxvYiAmJiAhZG9udFNlbmRCbG9icykge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYihwYWNrZXRzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIocGFja2V0cywgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjaygnMDonKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UubGVuZ3RoICsgJzonICsgbWVzc2FnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgIWlzQmluYXJ5ID8gZmFsc2UgOiBzdXBwb3J0c0JpbmFyeSwgZmFsc2UsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdHMuam9pbignJykpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXG4gKi9cblxuZnVuY3Rpb24gbWFwKGFyeSwgZWFjaCwgZG9uZSkge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGFyeS5sZW5ndGgpO1xuICB2YXIgbmV4dCA9IGFmdGVyKGFyeS5sZW5ndGgsIGRvbmUpO1xuXG4gIHZhciBlYWNoV2l0aEluZGV4ID0gZnVuY3Rpb24oaSwgZWwsIGNiKSB7XG4gICAgZWFjaChlbCwgZnVuY3Rpb24oZXJyb3IsIG1zZykge1xuICAgICAgcmVzdWx0W2ldID0gbXNnO1xuICAgICAgY2IoZXJyb3IsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICBlYWNoV2l0aEluZGV4KGksIGFyeVtpXSwgbmV4dCk7XG4gIH1cbn1cblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gUG9zc2libGUgYmluYXJ5IGNvbnRlbnRzIGFyZVxuICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIHBhY2tldDtcbiAgaWYgKGRhdGEgPT09ICcnKSB7XG4gICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9ICcnLCBuLCBtc2c7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBjaHIgPSBkYXRhLmNoYXJBdChpKTtcblxuICAgIGlmIChjaHIgIT09ICc6Jykge1xuICAgICAgbGVuZ3RoICs9IGNocjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChsZW5ndGggPT09ICcnIHx8IChsZW5ndGggIT0gKG4gPSBOdW1iZXIobGVuZ3RoKSkpKSB7XG4gICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICB9XG5cbiAgICBtc2cgPSBkYXRhLnN1YnN0cihpICsgMSwgbik7XG5cbiAgICBpZiAobGVuZ3RoICE9IG1zZy5sZW5ndGgpIHtcbiAgICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgIH1cblxuICAgIGlmIChtc2cubGVuZ3RoKSB7XG4gICAgICBwYWNrZXQgPSBleHBvcnRzLmRlY29kZVBhY2tldChtc2csIGJpbmFyeVR5cGUsIGZhbHNlKTtcblxuICAgICAgaWYgKGVyci50eXBlID09PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PT0gcGFja2V0LmRhdGEpIHtcbiAgICAgICAgLy8gcGFyc2VyIGVycm9yIGluIGluZGl2aWR1YWwgcGFja2V0IC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJldCA9IGNhbGxiYWNrKHBhY2tldCwgaSArIG4sIGwpO1xuICAgICAgaWYgKGZhbHNlID09PSByZXQpIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBhZHZhbmNlIGN1cnNvclxuICAgIGkgKz0gbjtcbiAgICBsZW5ndGggPSAnJztcbiAgfVxuXG4gIGlmIChsZW5ndGggIT09ICcnKSB7XG4gICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICB9XG5cbn07XG5cbi8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkgYXMgYmluYXJ5LlxuICpcbiAqIDwxID0gYmluYXJ5LCAwID0gc3RyaW5nPjxudW1iZXIgZnJvbSAwLTk+PG51bWJlciBmcm9tIDAtOT5bLi4uXTxudW1iZXJcbiAqIDI1NT48ZGF0YT5cbiAqXG4gKiBFeGFtcGxlOlxuICogMSAzIDI1NSAxIDIgMywgaWYgdGhlIGJpbmFyeSBjb250ZW50cyBhcmUgaW50ZXJwcmV0ZWQgYXMgOCBiaXQgaW50ZWdlcnNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gZW5jb2RlZCBwYXlsb2FkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyID0gZnVuY3Rpb24ocGFja2V0cywgY2FsbGJhY2spIHtcbiAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjayhuZXcgQXJyYXlCdWZmZXIoMCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gZG9uZUNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCBlbmNvZGVkUGFja2V0cykge1xuICAgIHZhciB0b3RhbExlbmd0aCA9IGVuY29kZWRQYWNrZXRzLnJlZHVjZShmdW5jdGlvbihhY2MsIHApIHtcbiAgICAgIHZhciBsZW47XG4gICAgICBpZiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgbGVuID0gcC5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSBwLmJ5dGVMZW5ndGg7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjICsgbGVuLnRvU3RyaW5nKCkubGVuZ3RoICsgbGVuICsgMjsgLy8gc3RyaW5nL2JpbmFyeSBpZGVudGlmaWVyICsgc2VwYXJhdG9yID0gMlxuICAgIH0sIDApO1xuXG4gICAgdmFyIHJlc3VsdEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xuXG4gICAgdmFyIGJ1ZmZlckluZGV4ID0gMDtcbiAgICBlbmNvZGVkUGFja2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBwID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBhYiA9IHA7XG4gICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShwLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZpZXdbaV0gPSBwLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgYWIgPSB2aWV3LmJ1ZmZlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKSB7IC8vIG5vdCB0cnVlIGJpbmFyeVxuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDA7XG4gICAgICB9IGVsc2UgeyAvLyB0cnVlIGJpbmFyeVxuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW5TdHIgPSBhYi5ieXRlTGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICB9XG4gICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDI1NTtcblxuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSB2aWV3W2ldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEFycmF5LmJ1ZmZlcik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBFbmNvZGUgYXMgQmxvYlxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYiA9IGZ1bmN0aW9uKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24oZW5jb2RlZCkge1xuICAgICAgdmFyIGJpbmFyeUlkZW50aWZpZXIgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAxO1xuICAgICAgaWYgKHR5cGVvZiBlbmNvZGVkID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGVuY29kZWQubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNvZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmlld1tpXSA9IGVuY29kZWQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGVkID0gdmlldy5idWZmZXI7XG4gICAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuID0gKGVuY29kZWQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcilcbiAgICAgICAgPyBlbmNvZGVkLmJ5dGVMZW5ndGhcbiAgICAgICAgOiBlbmNvZGVkLnNpemU7XG5cbiAgICAgIHZhciBsZW5TdHIgPSBsZW4udG9TdHJpbmcoKTtcbiAgICAgIHZhciBsZW5ndGhBcnkgPSBuZXcgVWludDhBcnJheShsZW5TdHIubGVuZ3RoICsgMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZW5ndGhBcnlbaV0gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgfVxuICAgICAgbGVuZ3RoQXJ5W2xlblN0ci5sZW5ndGhdID0gMjU1O1xuXG4gICAgICBpZiAoQmxvYikge1xuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtiaW5hcnlJZGVudGlmaWVyLmJ1ZmZlciwgbGVuZ3RoQXJ5LmJ1ZmZlciwgZW5jb2RlZF0pO1xuICAgICAgICBkb25lQ2FsbGJhY2sobnVsbCwgYmxvYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEJsb2IocmVzdWx0cykpO1xuICB9KTtcbn07XG5cbi8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFN0cmluZ3MgYXJlIGRlY29kZWQgYnlcbiAqIGludGVycHJldGluZyBlYWNoIGJ5dGUgYXMgYSBrZXkgY29kZSBmb3IgZW50cmllcyBtYXJrZWQgdG8gc3RhcnQgd2l0aCAwLiBTZWVcbiAqIGRlc2NyaXB0aW9uIG9mIGVuY29kZVBheWxvYWRBc0JpbmFyeVxuICpcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeSA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gIH1cblxuICB2YXIgYnVmZmVyVGFpbCA9IGRhdGE7XG4gIHZhciBidWZmZXJzID0gW107XG5cbiAgd2hpbGUgKGJ1ZmZlclRhaWwuYnl0ZUxlbmd0aCA+IDApIHtcbiAgICB2YXIgdGFpbEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyVGFpbCk7XG4gICAgdmFyIGlzU3RyaW5nID0gdGFpbEFycmF5WzBdID09PSAwO1xuICAgIHZhciBtc2dMZW5ndGggPSAnJztcblxuICAgIGZvciAodmFyIGkgPSAxOyA7IGkrKykge1xuICAgICAgaWYgKHRhaWxBcnJheVtpXSA9PT0gMjU1KSBicmVhaztcblxuICAgICAgLy8gMzEwID0gY2hhciBsZW5ndGggb2YgTnVtYmVyLk1BWF9WQUxVRVxuICAgICAgaWYgKG1zZ0xlbmd0aC5sZW5ndGggPiAzMTApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIG1zZ0xlbmd0aCArPSB0YWlsQXJyYXlbaV07XG4gICAgfVxuXG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDIgKyBtc2dMZW5ndGgubGVuZ3RoKTtcbiAgICBtc2dMZW5ndGggPSBwYXJzZUludChtc2dMZW5ndGgpO1xuXG4gICAgdmFyIG1zZyA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDAsIG1zZ0xlbmd0aCk7XG4gICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICBtc2cgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KG1zZykpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB0byB0eXBlZCBhcnJheXNcbiAgICAgICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkobXNnKTtcbiAgICAgICAgbXNnID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBtc2cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0eXBlZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBidWZmZXJzLnB1c2gobXNnKTtcbiAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgbXNnTGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0b3RhbCA9IGJ1ZmZlcnMubGVuZ3RoO1xuICBidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oYnVmZmVyLCBpKSB7XG4gICAgY2FsbGJhY2soZXhwb3J0cy5kZWNvZGVQYWNrZXQoYnVmZmVyLCBiaW5hcnlUeXBlLCB0cnVlKSwgaSwgdG90YWwpO1xuICB9KTtcbn07XG4iLCJcbi8qKlxuICogR2V0cyB0aGUga2V5cyBmb3IgYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBrZXlzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMgKG9iail7XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoaGFzLmNhbGwob2JqLCBpKSkge1xuICAgICAgYXJyLnB1c2goaSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59O1xuIiwiLyohIGh0dHBzOi8vbXRocy5iZS91dGY4anMgdjIuMS4yIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWBcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLFxuXHQvLyBhbmQgdXNlIGl0IGFzIGByb290YFxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG5cdC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdO1xuXHRcdHZhciBjb3VudGVyID0gMDtcblx0XHR2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblx0XHR2YXIgdmFsdWU7XG5cdFx0dmFyIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciBpbmRleCA9IC0xO1xuXHRcdHZhciB2YWx1ZTtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0d2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50LCBzdHJpY3QpIHtcblx0XHRpZiAoY29kZVBvaW50ID49IDB4RDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhERkZGKSB7XG5cdFx0XHRpZiAoc3RyaWN0KSB7XG5cdFx0XHRcdHRocm93IEVycm9yKFxuXHRcdFx0XHRcdCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgK1xuXHRcdFx0XHRcdCcgaXMgbm90IGEgc2NhbGFyIHZhbHVlJ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmdW5jdGlvbiBjcmVhdGVCeXRlKGNvZGVQb2ludCwgc2hpZnQpIHtcblx0XHRyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IHNoaWZ0KSAmIDB4M0YpIHwgMHg4MCk7XG5cdH1cblxuXHRmdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50LCBzdHJpY3QpIHtcblx0XHRpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApIHsgLy8gMS1ieXRlIHNlcXVlbmNlXG5cdFx0XHRyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG5cdFx0fVxuXHRcdHZhciBzeW1ib2wgPSAnJztcblx0XHRpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkY4MDApID09IDApIHsgLy8gMi1ieXRlIHNlcXVlbmNlXG5cdFx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gNikgJiAweDFGKSB8IDB4QzApO1xuXHRcdH1cblx0XHRlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkZGMDAwMCkgPT0gMCkgeyAvLyAzLWJ5dGUgc2VxdWVuY2Vcblx0XHRcdGlmICghY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkpIHtcblx0XHRcdFx0Y29kZVBvaW50ID0gMHhGRkZEO1xuXHRcdFx0fVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDEyKSAmIDB4MEYpIHwgMHhFMCk7XG5cdFx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHRcdH1cblx0XHRlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkUwMDAwMCkgPT0gMCkgeyAvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0XHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiAxOCkgJiAweDA3KSB8IDB4RjApO1xuXHRcdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCAxMik7XG5cdFx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHRcdH1cblx0XHRzeW1ib2wgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKChjb2RlUG9pbnQgJiAweDNGKSB8IDB4ODApO1xuXHRcdHJldHVybiBzeW1ib2w7XG5cdH1cblxuXHRmdW5jdGlvbiB1dGY4ZW5jb2RlKHN0cmluZywgb3B0cykge1xuXHRcdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHRcdHZhciBzdHJpY3QgPSBmYWxzZSAhPT0gb3B0cy5zdHJpY3Q7XG5cblx0XHR2YXIgY29kZVBvaW50cyA9IHVjczJkZWNvZGUoc3RyaW5nKTtcblx0XHR2YXIgbGVuZ3RoID0gY29kZVBvaW50cy5sZW5ndGg7XG5cdFx0dmFyIGluZGV4ID0gLTE7XG5cdFx0dmFyIGNvZGVQb2ludDtcblx0XHR2YXIgYnl0ZVN0cmluZyA9ICcnO1xuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHRjb2RlUG9pbnQgPSBjb2RlUG9pbnRzW2luZGV4XTtcblx0XHRcdGJ5dGVTdHJpbmcgKz0gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCwgc3RyaWN0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGJ5dGVTdHJpbmc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpIHtcblx0XHRpZiAoYnl0ZUluZGV4ID49IGJ5dGVDb3VudCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHRcdH1cblxuXHRcdHZhciBjb250aW51YXRpb25CeXRlID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRcdGJ5dGVJbmRleCsrO1xuXG5cdFx0aWYgKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCkge1xuXHRcdFx0cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGVuZCB1cCBoZXJlLCBpdOKAmXMgbm90IGEgY29udGludWF0aW9uIGJ5dGVcblx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVjb2RlU3ltYm9sKHN0cmljdCkge1xuXHRcdHZhciBieXRlMTtcblx0XHR2YXIgYnl0ZTI7XG5cdFx0dmFyIGJ5dGUzO1xuXHRcdHZhciBieXRlNDtcblx0XHR2YXIgY29kZVBvaW50O1xuXG5cdFx0aWYgKGJ5dGVJbmRleCA+IGJ5dGVDb3VudCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHRcdH1cblxuXHRcdGlmIChieXRlSW5kZXggPT0gYnl0ZUNvdW50KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZCBmaXJzdCBieXRlXG5cdFx0Ynl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdFx0Ynl0ZUluZGV4Kys7XG5cblx0XHQvLyAxLWJ5dGUgc2VxdWVuY2UgKG5vIGNvbnRpbnVhdGlvbiBieXRlcylcblx0XHRpZiAoKGJ5dGUxICYgMHg4MCkgPT0gMCkge1xuXHRcdFx0cmV0dXJuIGJ5dGUxO1xuXHRcdH1cblxuXHRcdC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICgoYnl0ZTEgJiAweEUwKSA9PSAweEMwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgxRikgPDwgNikgfCBieXRlMjtcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHg4MCkge1xuXHRcdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyAzLWJ5dGUgc2VxdWVuY2UgKG1heSBpbmNsdWRlIHVucGFpcmVkIHN1cnJvZ2F0ZXMpXG5cdFx0aWYgKChieXRlMSAmIDB4RjApID09IDB4RTApIHtcblx0XHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGNvZGVQb2ludCA9ICgoYnl0ZTEgJiAweDBGKSA8PCAxMikgfCAoYnl0ZTIgPDwgNikgfCBieXRlMztcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwODAwKSB7XG5cdFx0XHRcdHJldHVybiBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSA/IGNvZGVQb2ludCA6IDB4RkZGRDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gNC1ieXRlIHNlcXVlbmNlXG5cdFx0aWYgKChieXRlMSAmIDB4RjgpID09IDB4RjApIHtcblx0XHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGJ5dGU0ID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGNvZGVQb2ludCA9ICgoYnl0ZTEgJiAweDA3KSA8PCAweDEyKSB8IChieXRlMiA8PCAweDBDKSB8XG5cdFx0XHRcdChieXRlMyA8PCAweDA2KSB8IGJ5dGU0O1xuXHRcdFx0aWYgKGNvZGVQb2ludCA+PSAweDAxMDAwMCAmJiBjb2RlUG9pbnQgPD0gMHgxMEZGRkYpIHtcblx0XHRcdFx0cmV0dXJuIGNvZGVQb2ludDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBVVEYtOCBkZXRlY3RlZCcpO1xuXHR9XG5cblx0dmFyIGJ5dGVBcnJheTtcblx0dmFyIGJ5dGVDb3VudDtcblx0dmFyIGJ5dGVJbmRleDtcblx0ZnVuY3Rpb24gdXRmOGRlY29kZShieXRlU3RyaW5nLCBvcHRzKSB7XG5cdFx0b3B0cyA9IG9wdHMgfHwge307XG5cdFx0dmFyIHN0cmljdCA9IGZhbHNlICE9PSBvcHRzLnN0cmljdDtcblxuXHRcdGJ5dGVBcnJheSA9IHVjczJkZWNvZGUoYnl0ZVN0cmluZyk7XG5cdFx0Ynl0ZUNvdW50ID0gYnl0ZUFycmF5Lmxlbmd0aDtcblx0XHRieXRlSW5kZXggPSAwO1xuXHRcdHZhciBjb2RlUG9pbnRzID0gW107XG5cdFx0dmFyIHRtcDtcblx0XHR3aGlsZSAoKHRtcCA9IGRlY29kZVN5bWJvbChzdHJpY3QpKSAhPT0gZmFsc2UpIHtcblx0XHRcdGNvZGVQb2ludHMucHVzaCh0bXApO1xuXHRcdH1cblx0XHRyZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciB1dGY4ID0ge1xuXHRcdCd2ZXJzaW9uJzogJzIuMS4yJyxcblx0XHQnZW5jb2RlJzogdXRmOGVuY29kZSxcblx0XHQnZGVjb2RlJzogdXRmOGRlY29kZVxuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHV0Zjg7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSB1dGY4O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHR2YXIgb2JqZWN0ID0ge307XG5cdFx0XHR2YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3QuaGFzT3duUHJvcGVydHk7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gdXRmOCkge1xuXHRcdFx0XHRoYXNPd25Qcm9wZXJ0eS5jYWxsKHV0ZjgsIGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSB1dGY4W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QudXRmOCA9IHV0Zjg7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvKiBnbG9iYWwgQmxvYiBGaWxlICovXG5cbi8qXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIGdsb2JhbC5CbG9iID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkJsb2IpID09PSAnW29iamVjdCBCbG9iQ29uc3RydWN0b3JdJztcbnZhciB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBnbG9iYWwuRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5GaWxlKSA9PT0gJ1tvYmplY3QgRmlsZUNvbnN0cnVjdG9yXSc7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7XG5cbi8qKlxuICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cbiAqXG4gKiBTdXBwb3J0cyBCdWZmZXIsIEFycmF5QnVmZmVyLCBCbG9iIGFuZCBGaWxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBoYXNCaW5hcnkgKG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChoYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCh0eXBlb2YgZ2xvYmFsLkJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSkgfHxcbiAgICAgKHR5cGVvZiBnbG9iYWwuQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8XG4gICAgICh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSlcbiAgICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvaGFzLWJpbmFyeS9wdWxsLzRcbiAgaWYgKG9iai50b0pTT04gJiYgdHlwZW9mIG9iai50b0pTT04gPT09ICdmdW5jdGlvbicgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBoYXNCaW5hcnkob2JqLnRvSlNPTigpLCB0cnVlKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBoYXNCaW5hcnkob2JqW2tleV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKlxuICogTG9naWMgYm9ycm93ZWQgZnJvbSBNb2Rlcm5penI6XG4gKlxuICogICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9jb3JzLmpzXG4gKi9cblxudHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG59IGNhdGNoIChlcnIpIHtcbiAgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbn1cbiIsIlxudmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgb2JqKXtcbiAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcclxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xyXG4gKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICB2YXIgc3RyID0gJyc7XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xyXG4gICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcXNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7XHJcbiAgdmFyIHFyeSA9IHt9O1xyXG4gIHZhciBwYWlycyA9IHFzLnNwbGl0KCcmJyk7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIHZhciBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcclxuICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG4gIH1cclxuICByZXR1cm4gcXJ5O1xyXG59O1xyXG4iLCIvKipcclxuICogUGFyc2VzIGFuIFVSSVxyXG4gKlxyXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbnZhciByZSA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xyXG5cclxudmFyIHBhcnRzID0gW1xyXG4gICAgJ3NvdXJjZScsICdwcm90b2NvbCcsICdhdXRob3JpdHknLCAndXNlckluZm8nLCAndXNlcicsICdwYXNzd29yZCcsICdob3N0JywgJ3BvcnQnLCAncmVsYXRpdmUnLCAncGF0aCcsICdkaXJlY3RvcnknLCAnZmlsZScsICdxdWVyeScsICdhbmNob3InXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNldXJpKHN0cikge1xyXG4gICAgdmFyIHNyYyA9IHN0cixcclxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcclxuICAgICAgICBlID0gc3RyLmluZGV4T2YoJ10nKTtcclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBiKSArIHN0ci5zdWJzdHJpbmcoYiwgZSkucmVwbGFjZSgvOi9nLCAnOycpICsgc3RyLnN1YnN0cmluZyhlLCBzdHIubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSxcclxuICAgICAgICB1cmkgPSB7fSxcclxuICAgICAgICBpID0gMTQ7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcclxuICAgICAgICB1cmkuc291cmNlID0gc3JjO1xyXG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xyXG4gICAgICAgIHVyaS5pcHY2dXJpID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJpO1xyXG59O1xyXG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXJsID0gcmVxdWlyZSgnLi91cmwnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGxvb2t1cDtcblxuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuXG52YXIgY2FjaGUgPSBleHBvcnRzLm1hbmFnZXJzID0ge307XG5cbi8qKlxuICogTG9va3MgdXAgYW4gZXhpc3RpbmcgYE1hbmFnZXJgIGZvciBtdWx0aXBsZXhpbmcuXG4gKiBJZiB0aGUgdXNlciBzdW1tb25zOlxuICpcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2EnKTtgXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9iJyk7YFxuICpcbiAqIFdlIHJldXNlIHRoZSBleGlzdGluZyBpbnN0YW5jZSBiYXNlZCBvbiBzYW1lIHNjaGVtZS9wb3J0L2hvc3QsXG4gKiBhbmQgd2UgaW5pdGlhbGl6ZSBzb2NrZXRzIGZvciBlYWNoIG5hbWVzcGFjZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvb2t1cCAodXJpLCBvcHRzKSB7XG4gIGlmICh0eXBlb2YgdXJpID09PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgdmFyIHBhcnNlZCA9IHVybCh1cmkpO1xuICB2YXIgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgdmFyIGlkID0gcGFyc2VkLmlkO1xuICB2YXIgcGF0aCA9IHBhcnNlZC5wYXRoO1xuICB2YXIgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXS5uc3BzO1xuICB2YXIgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHwgb3B0c1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fCBzYW1lTmFtZXNwYWNlO1xuXG4gIHZhciBpbztcblxuICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgIGRlYnVnKCdpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzJywgc291cmNlKTtcbiAgICBpbyA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgZGVidWcoJ25ldyBpbyBpbnN0YW5jZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgICAgY2FjaGVbaWRdID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgIH1cbiAgICBpbyA9IGNhY2hlW2lkXTtcbiAgfVxuICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgb3B0cy5xdWVyeSA9IHBhcnNlZC5xdWVyeTtcbiAgfVxuICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDtcblxuLyoqXG4gKiBgY29ubmVjdGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7XG5cbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xuZXhwb3J0cy5Tb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGVpbyA9IHJlcXVpcmUoJ2VuZ2luZS5pby1jbGllbnQnKTtcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6bWFuYWdlcicpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgQmFja29mZiA9IHJlcXVpcmUoJ2JhY2tvMicpO1xuXG4vKipcbiAqIElFNisgaGFzT3duUHJvcGVydHlcbiAqL1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gTWFuYWdlcjtcblxuLyoqXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIE1hbmFnZXIgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWFuYWdlcikpIHJldHVybiBuZXcgTWFuYWdlcih1cmksIG9wdHMpO1xuICBpZiAodXJpICYmICgnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgJy9zb2NrZXQuaW8nO1xuICB0aGlzLm5zcHMgPSB7fTtcbiAgdGhpcy5zdWJzID0gW107XG4gIHRoaXMub3B0cyA9IG9wdHM7XG4gIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7XG4gIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpXG4gIH0pO1xuICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLnVyaSA9IHVyaTtcbiAgdGhpcy5jb25uZWN0aW5nID0gW107XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gIHZhciBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgdGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICBpZiAodGhpcy5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZW1pdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBVcGRhdGUgYHNvY2tldC5pZGAgb2YgYWxsIHNvY2tldHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVTb2NrZXRJZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZW5lcmF0ZSBgc29ja2V0LmlkYCBmb3IgdGhlIGdpdmVuIGBuc3BgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5zcFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIChuc3ApIHtcbiAgcmV0dXJuIChuc3AgPT09ICcvJyA/ICcnIDogKG5zcCArICcjJykpICsgdGhpcy5lbmdpbmUuaWQ7XG59O1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHJlY29ubmVjdGlvbmAgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbk1hbmFnZXIucHJvdG90eXBlLnJhbmRvbWl6YXRpb25GYWN0b3IgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXlNYXggPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1heCh2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXG4gKlxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgdGhpcy5fdGltZW91dCA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm1heWJlUmVjb25uZWN0T25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gIGlmICghdGhpcy5yZWNvbm5lY3RpbmcgJiYgdGhpcy5fcmVjb25uZWN0aW9uICYmIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsLCBjYWxsYmFja1xuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vcGVuID1cbk1hbmFnZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4sIG9wdHMpIHtcbiAgZGVidWcoJ3JlYWR5U3RhdGUgJXMnLCB0aGlzLnJlYWR5U3RhdGUpO1xuICBpZiAofnRoaXMucmVhZHlTdGF0ZS5pbmRleE9mKCdvcGVuJykpIHJldHVybiB0aGlzO1xuXG4gIGRlYnVnKCdvcGVuaW5nICVzJywgdGhpcy51cmkpO1xuICB0aGlzLmVuZ2luZSA9IGVpbyh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG5cbiAgLy8gZW1pdCBgb3BlbmBcbiAgdmFyIG9wZW5TdWIgPSBvbihzb2NrZXQsICdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25vcGVuKCk7XG4gICAgZm4gJiYgZm4oKTtcbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF9lcnJvcmBcbiAgdmFyIGVycm9yU3ViID0gb24oc29ja2V0LCAnZXJyb3InLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRlYnVnKCdjb25uZWN0X2Vycm9yJyk7XG4gICAgc2VsZi5jbGVhbnVwKCk7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X2Vycm9yJywgZGF0YSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdDb25uZWN0aW9uIGVycm9yJyk7XG4gICAgICBlcnIuZGF0YSA9IGRhdGE7XG4gICAgICBmbihlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF90aW1lb3V0YFxuICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcblxuICAgIC8vIHNldCB0aW1lclxuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcbiAgICAgIG9wZW5TdWIuZGVzdHJveSgpO1xuICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCAndGltZW91dCcpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLCB0aW1lb3V0KTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWIpO1xuICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ29wZW4nKTtcblxuICAvLyBjbGVhciBvbGQgc3Vic1xuICB0aGlzLmNsZWFudXAoKTtcblxuICAvLyBtYXJrIGFzIG9wZW5cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcblxuICAvLyBhZGQgbmV3IHN1YnNcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdkYXRhJywgYmluZCh0aGlzLCAnb25kYXRhJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAncGluZycsIGJpbmQodGhpcywgJ29ucGluZycpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BvbmcnLCBiaW5kKHRoaXMsICdvbnBvbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdlcnJvcicsIGJpbmQodGhpcywgJ29uZXJyb3InKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsICdkZWNvZGVkJywgYmluZCh0aGlzLCAnb25kZWNvZGVkJykpKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sYXN0UGluZyA9IG5ldyBEYXRlKCk7XG4gIHRoaXMuZW1pdEFsbCgncGluZycpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBvbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdEFsbCgncG9uZycsIG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RQaW5nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdlcnJvcicsIGVycik7XG4gIHRoaXMuZW1pdEFsbCgnZXJyb3InLCBlcnIpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuc29ja2V0ID0gZnVuY3Rpb24gKG5zcCwgb3B0cykge1xuICB2YXIgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gIGlmICghc29ja2V0KSB7XG4gICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLCBvbkNvbm5lY3RpbmcpO1xuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNvY2tldC5pZCA9IHNlbGYuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHtcbiAgICAgIC8vIG1hbnVhbGx5IGNhbGwgaGVyZSBzaW5jZSBjb25uZWN0aW5nIGV2ZW50IGlzIGZpcmVkIGJlZm9yZSBsaXN0ZW5pbmdcbiAgICAgIG9uQ29ubmVjdGluZygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29ubmVjdGluZyAoKSB7XG4gICAgaWYgKCF+aW5kZXhPZihzZWxmLmNvbm5lY3RpbmcsIHNvY2tldCkpIHtcbiAgICAgIHNlbGYuY29ubmVjdGluZy5wdXNoKHNvY2tldCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNvY2tldDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gKlxuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gIHZhciBpbmRleCA9IGluZGV4T2YodGhpcy5jb25uZWN0aW5nLCBzb2NrZXQpO1xuICBpZiAofmluZGV4KSB0aGlzLmNvbm5lY3Rpbmcuc3BsaWNlKGluZGV4LCAxKTtcbiAgaWYgKHRoaXMuY29ubmVjdGluZy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzLmNsb3NlKCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGRlYnVnKCd3cml0aW5nIHBhY2tldCAlaicsIHBhY2tldCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHBhY2tldC5xdWVyeSAmJiBwYWNrZXQudHlwZSA9PT0gMCkgcGFja2V0Lm5zcCArPSAnPycgKyBwYWNrZXQucXVlcnk7XG5cbiAgaWYgKCFzZWxmLmVuY29kaW5nKSB7XG4gICAgLy8gZW5jb2RlLCB0aGVuIHdyaXRlIHRvIGVuZ2luZSB3aXRoIHJlc3VsdFxuICAgIHNlbGYuZW5jb2RpbmcgPSB0cnVlO1xuICAgIHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LCBmdW5jdGlvbiAoZW5jb2RlZFBhY2tldHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VsZi5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZW5jb2RpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7IC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG4gICAgc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG59O1xuXG4vKipcbiAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucGFja2V0QnVmZmVyLmxlbmd0aCA+IDAgJiYgIXRoaXMuZW5jb2RpbmcpIHtcbiAgICB2YXIgcGFjayA9IHRoaXMucGFja2V0QnVmZmVyLnNoaWZ0KCk7XG4gICAgdGhpcy5wYWNrZXQocGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NsZWFudXAnKTtcblxuICB2YXIgc3Vic0xlbmd0aCA9IHRoaXMuc3Vicy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpO1xuICAgIHN1Yi5kZXN0cm95KCk7XG4gIH1cblxuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuXG4gIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG59O1xuXG4vKipcbiAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9XG5NYW5hZ2VyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygnZGlzY29ubmVjdCcpO1xuICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAvLyBgb25jbG9zZWAgd2lsbCBub3QgZmlyZSBiZWNhdXNlXG4gICAgLy8gYW4gb3BlbiBldmVudCBuZXZlciBoYXBwZW5lZFxuICAgIHRoaXMuY2xlYW51cCgpO1xuICB9XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgaWYgKHRoaXMuZW5naW5lKSB0aGlzLmVuZ2luZS5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ29uY2xvc2UnKTtcblxuICB0aGlzLmNsZWFudXAoKTtcbiAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJywgcmVhc29uKTtcblxuICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5yZWNvbm5lY3RpbmcgfHwgdGhpcy5za2lwUmVjb25uZWN0KSByZXR1cm4gdGhpcztcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgIGRlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7XG4gICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICBkZWJ1Zygnd2lsbCB3YWl0ICVkbXMgYmVmb3JlIHJlY29ubmVjdCBhdHRlbXB0JywgZGVsYXkpO1xuXG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdCkgcmV0dXJuO1xuXG4gICAgICBkZWJ1ZygnYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RpbmcnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuXG4gICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgc2VsZi5vcGVuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsIGVyci5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtcbiAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIGRlbGF5KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnVwZGF0ZVNvY2tldElkcygpO1xuICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsIGF0dGVtcHQpO1xufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9uO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igc3Vic2NyaXB0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIG9uIChvYmosIGV2LCBmbikge1xuICBvYmoub24oZXYsIGZuKTtcbiAgcmV0dXJuIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICBvYmoucmVtb3ZlTGlzdGVuZXIoZXYsIGZuKTtcbiAgICB9XG4gIH07XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHRvQXJyYXkgPSByZXF1aXJlKCd0by1hcnJheScpO1xudmFyIG9uID0gcmVxdWlyZSgnLi9vbicpO1xudmFyIGJpbmQgPSByZXF1aXJlKCdjb21wb25lbnQtYmluZCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDpzb2NrZXQnKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMgKGJsYWNrbGlzdGVkKS5cbiAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBldmVudHMgPSB7XG4gIGNvbm5lY3Q6IDEsXG4gIGNvbm5lY3RfZXJyb3I6IDEsXG4gIGNvbm5lY3RfdGltZW91dDogMSxcbiAgY29ubmVjdGluZzogMSxcbiAgZGlzY29ubmVjdDogMSxcbiAgZXJyb3I6IDEsXG4gIHJlY29ubmVjdDogMSxcbiAgcmVjb25uZWN0X2F0dGVtcHQ6IDEsXG4gIHJlY29ubmVjdF9mYWlsZWQ6IDEsXG4gIHJlY29ubmVjdF9lcnJvcjogMSxcbiAgcmVjb25uZWN0aW5nOiAxLFxuICBwaW5nOiAxLFxuICBwb25nOiAxXG59O1xuXG4vKipcbiAqIFNob3J0Y3V0IHRvIGBFbWl0dGVyI2VtaXRgLlxuICovXG5cbnZhciBlbWl0ID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFNvY2tldCAoaW8sIG5zcCwgb3B0cykge1xuICB0aGlzLmlvID0gaW87XG4gIHRoaXMubnNwID0gbnNwO1xuICB0aGlzLmpzb24gPSB0aGlzOyAvLyBjb21wYXRcbiAgdGhpcy5pZHMgPSAwO1xuICB0aGlzLmFja3MgPSB7fTtcbiAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIGlmIChvcHRzICYmIG9wdHMucXVlcnkpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgfVxuICBpZiAodGhpcy5pby5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc3ViRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdWJzKSByZXR1cm47XG5cbiAgdmFyIGlvID0gdGhpcy5pbztcbiAgdGhpcy5zdWJzID0gW1xuICAgIG9uKGlvLCAnb3BlbicsIGJpbmQodGhpcywgJ29ub3BlbicpKSxcbiAgICBvbihpbywgJ3BhY2tldCcsIGJpbmQodGhpcywgJ29ucGFja2V0JykpLFxuICAgIG9uKGlvLCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpXG4gIF07XG59O1xuXG4vKipcbiAqIFwiT3BlbnNcIiB0aGUgc29ja2V0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vcGVuID1cblNvY2tldC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSByZXR1cm4gdGhpcztcblxuICB0aGlzLnN1YkV2ZW50cygpO1xuICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5pby5yZWFkeVN0YXRlKSB0aGlzLm9ub3BlbigpO1xuICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgYG1lc3NhZ2VgIGV2ZW50LlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICBhcmdzLnVuc2hpZnQoJ21lc3NhZ2UnKTtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgYGVtaXRgLlxuICogSWYgdGhlIGV2ZW50IGlzIGluIGBldmVudHNgLCBpdCdzIGVtaXR0ZWQgbm9ybWFsbHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgdmFyIHBhY2tldCA9IHsgdHlwZTogcGFyc2VyLkVWRU5ULCBkYXRhOiBhcmdzIH07XG5cbiAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSAhdGhpcy5mbGFncyB8fCBmYWxzZSAhPT0gdGhpcy5mbGFncy5jb21wcmVzcztcblxuICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICBkZWJ1ZygnZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkJywgdGhpcy5pZHMpO1xuICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgIHBhY2tldC5pZCA9IHRoaXMuaWRzKys7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIH1cblxuICBkZWxldGUgdGhpcy5mbGFncztcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgdGhpcy5pby5wYWNrZXQocGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3RyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZycpO1xuXG4gIC8vIHdyaXRlIGNvbm5lY3QgcGFja2V0IGlmIG5lY2Vzc2FyeVxuICBpZiAoJy8nICE9PSB0aGlzLm5zcCkge1xuICAgIGlmICh0aGlzLnF1ZXJ5KSB7XG4gICAgICB2YXIgcXVlcnkgPSB0eXBlb2YgdGhpcy5xdWVyeSA9PT0gJ29iamVjdCcgPyBwYXJzZXFzLmVuY29kZSh0aGlzLnF1ZXJ5KSA6IHRoaXMucXVlcnk7XG4gICAgICBkZWJ1Zygnc2VuZGluZyBjb25uZWN0IHBhY2tldCB3aXRoIHF1ZXJ5ICVzJywgcXVlcnkpO1xuICAgICAgdGhpcy5wYWNrZXQoe3R5cGU6IHBhcnNlci5DT05ORUNULCBxdWVyeTogcXVlcnl9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWNrZXQoe3R5cGU6IHBhcnNlci5DT05ORUNUfSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBgY2xvc2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ2Nsb3NlICglcyknLCByZWFzb24pO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIGRlbGV0ZSB0aGlzLmlkO1xuICB0aGlzLmVtaXQoJ2Rpc2Nvbm5lY3QnLCByZWFzb24pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGlmIChwYWNrZXQubnNwICE9PSB0aGlzLm5zcCkgcmV0dXJuO1xuXG4gIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICBjYXNlIHBhcnNlci5DT05ORUNUOlxuICAgICAgdGhpcy5vbmNvbm5lY3QoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRVZFTlQ6XG4gICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQklOQVJZX0VWRU5UOlxuICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkFDSzpcbiAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQklOQVJZX0FDSzpcbiAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRElTQ09OTkVDVDpcbiAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkVSUk9SOlxuICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHBhY2tldC5kYXRhKTtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25ldmVudCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgZGVidWcoJ2VtaXR0aW5nIGV2ZW50ICVqJywgYXJncyk7XG5cbiAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgZGVidWcoJ2F0dGFjaGluZyBhY2sgY2FsbGJhY2sgdG8gZXZlbnQnKTtcbiAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKGFyZ3MpO1xuICB9XG59O1xuXG4vKipcbiAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5hY2sgPSBmdW5jdGlvbiAoaWQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2VudCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgIGlmIChzZW50KSByZXR1cm47XG4gICAgc2VudCA9IHRydWU7XG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgZGVidWcoJ3NlbmRpbmcgYWNrICVqJywgYXJncyk7XG5cbiAgICBzZWxmLnBhY2tldCh7XG4gICAgICB0eXBlOiBwYXJzZXIuQUNLLFxuICAgICAgaWQ6IGlkLFxuICAgICAgZGF0YTogYXJnc1xuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uYWNrID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB2YXIgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYWNrKSB7XG4gICAgZGVidWcoJ2NhbGxpbmcgYWNrICVzIHdpdGggJWonLCBwYWNrZXQuaWQsIHBhY2tldC5kYXRhKTtcbiAgICBhY2suYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygnYmFkIGFjayAlcycsIHBhY2tldC5pZCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdjb25uZWN0Jyk7XG4gIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG59O1xuXG4vKipcbiAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5lbWl0QnVmZmVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCB0aGlzLnJlY2VpdmVCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLnBhY2tldCh0aGlzLnNlbmRCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3NlcnZlciBkaXNjb25uZWN0ICglcyknLCB0aGlzLm5zcCk7XG4gIHRoaXMuZGVzdHJveSgpO1xuICB0aGlzLm9uY2xvc2UoJ2lvIHNlcnZlciBkaXNjb25uZWN0Jyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gKlxuICogQGFwaSBwcml2YXRlLlxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3Vicykge1xuICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnN1YnNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLnN1YnMgPSBudWxsO1xuICB9XG5cbiAgdGhpcy5pby5kZXN0cm95KHRoaXMpO1xufTtcblxuLyoqXG4gKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID1cblNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZGVidWcoJ3BlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICAgIHRoaXMucGFja2V0KHsgdHlwZTogcGFyc2VyLkRJU0NPTk5FQ1QgfSk7XG4gIH1cblxuICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICB0aGlzLmRlc3Ryb3koKTtcblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIHRoaXMub25jbG9zZSgnaW8gY2xpZW50IGRpc2Nvbm5lY3QnKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY29tcHJlc3MgZmxhZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jb21wcmVzcyA9IGZ1bmN0aW9uIChjb21wcmVzcykge1xuICB0aGlzLmZsYWdzID0gdGhpcy5mbGFncyB8fCB7fTtcbiAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICByZXR1cm4gdGhpcztcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2V1cmkgPSByZXF1aXJlKCdwYXJzZXVyaScpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDp1cmwnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVybDtcblxuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxuICogICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gdXJsICh1cmksIGxvYykge1xuICB2YXIgb2JqID0gdXJpO1xuXG4gIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gIGxvYyA9IGxvYyB8fCBnbG9iYWwubG9jYXRpb247XG4gIGlmIChudWxsID09IHVyaSkgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0O1xuXG4gIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB1cmkpIHtcbiAgICBpZiAoJy8nID09PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICBpZiAoJy8nID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICBkZWJ1ZygncHJvdG9jb2wtbGVzcyB1cmwgJXMnLCB1cmkpO1xuICAgICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSAnaHR0cHM6Ly8nICsgdXJpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlXG4gICAgZGVidWcoJ3BhcnNlICVzJywgdXJpKTtcbiAgICBvYmogPSBwYXJzZXVyaSh1cmkpO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gIGlmICghb2JqLnBvcnQpIHtcbiAgICBpZiAoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgIG9iai5wb3J0ID0gJzgwJztcbiAgICB9IGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgb2JqLnBvcnQgPSAnNDQzJztcbiAgICB9XG4gIH1cblxuICBvYmoucGF0aCA9IG9iai5wYXRoIHx8ICcvJztcblxuICB2YXIgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHZhciBob3N0ID0gaXB2NiA/ICdbJyArIG9iai5ob3N0ICsgJ10nIDogb2JqLmhvc3Q7XG5cbiAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAnOicgKyBvYmoucG9ydDtcbiAgLy8gZGVmaW5lIGhyZWZcbiAgb2JqLmhyZWYgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/ICcnIDogKCc6JyArIG9iai5wb3J0KSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cbiIsIi8qZ2xvYmFsIEJsb2IsRmlsZSovXG5cbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50c1xuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgZ2xvYmFsLkJsb2IgPT09ICdmdW5jdGlvbicgfHwgdG9TdHJpbmcuY2FsbChnbG9iYWwuQmxvYikgPT09ICdbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl0nO1xudmFyIHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIGdsb2JhbC5GaWxlID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkZpbGUpID09PSAnW29iamVjdCBGaWxlQ29uc3RydWN0b3JdJztcblxuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICogQW55dGhpbmcgd2l0aCBibG9icyBvciBmaWxlcyBzaG91bGQgYmUgZmVkIHRocm91Z2ggcmVtb3ZlQmxvYnMgYmVmb3JlIGNvbWluZ1xuICogaGVyZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCkge1xuICB2YXIgYnVmZmVycyA9IFtdO1xuICB2YXIgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICB2YXIgcGFjayA9IHBhY2tldDtcbiAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICByZXR1cm4ge3BhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVyc307XG59O1xuXG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICBpZiAoIWRhdGEpIHJldHVybiBkYXRhO1xuXG4gIGlmIChpc0J1ZihkYXRhKSkge1xuICAgIHZhciBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgfSBlbHNlIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgdmFyIG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgdmFyIG5ld0RhdGEgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5yZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgYnVmZmVycykge1xuICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSwgYnVmZmVycyk7XG4gIHBhY2tldC5hdHRhY2htZW50cyA9IHVuZGVmaW5lZDsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICByZXR1cm4gcGFja2V0O1xufTtcblxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlcikge1xuICAgIHJldHVybiBidWZmZXJzW2RhdGEubnVtXTsgLy8gYXBwcm9wcmlhdGUgYnVmZmVyIChzaG91bGQgYmUgbmF0dXJhbCBvcmRlciBhbnl3YXkpXG4gIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEFzeW5jaHJvbm91c2x5IHJlbW92ZXMgQmxvYnMgb3IgRmlsZXMgZnJvbSBkYXRhIHZpYVxuICogRmlsZVJlYWRlcidzIHJlYWRBc0FycmF5QnVmZmVyIG1ldGhvZC4gVXNlZCBiZWZvcmUgZW5jb2RpbmdcbiAqIGRhdGEgYXMgbXNncGFjay4gQ2FsbHMgY2FsbGJhY2sgd2l0aCB0aGUgYmxvYmxlc3MgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmVtb3ZlQmxvYnMgPSBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBfcmVtb3ZlQmxvYnMob2JqLCBjdXJLZXksIGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIG9iajtcblxuICAgIC8vIGNvbnZlcnQgYW55IGJsb2JcbiAgICBpZiAoKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSkge1xuICAgICAgcGVuZGluZ0Jsb2JzKys7XG5cbiAgICAgIC8vIGFzeW5jIGZpbGVyZWFkZXJcbiAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7IC8vIHRoaXMucmVzdWx0ID09IGFycmF5YnVmZmVyXG4gICAgICAgIGlmIChjb250YWluaW5nT2JqZWN0KSB7XG4gICAgICAgICAgY29udGFpbmluZ09iamVjdFtjdXJLZXldID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYmxvYmxlc3NEYXRhID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBub3RoaW5nIHBlbmRpbmcgaXRzIGNhbGxiYWNrIHRpbWVcbiAgICAgICAgaWYoISAtLXBlbmRpbmdCbG9icykge1xuICAgICAgICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIob2JqKTsgLy8gYmxvYiAtPiBhcnJheWJ1ZmZlclxuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7IC8vIGhhbmRsZSBhcnJheVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFpc0J1ZihvYmopKSB7IC8vIGFuZCBvYmplY3RcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHBlbmRpbmdCbG9icyA9IDA7XG4gIHZhciBibG9ibGVzc0RhdGEgPSBkYXRhO1xuICBfcmVtb3ZlQmxvYnMoYmxvYmxlc3NEYXRhKTtcbiAgaWYgKCFwZW5kaW5nQmxvYnMpIHtcbiAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICB9XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGhhc0JpbiA9IHJlcXVpcmUoJ2hhcy1iaW5hcnkyJyk7XG52YXIgYmluYXJ5ID0gcmVxdWlyZSgnLi9iaW5hcnknKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IDQ7XG5cbi8qKlxuICogUGFja2V0IHR5cGVzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy50eXBlcyA9IFtcbiAgJ0NPTk5FQ1QnLFxuICAnRElTQ09OTkVDVCcsXG4gICdFVkVOVCcsXG4gICdBQ0snLFxuICAnRVJST1InLFxuICAnQklOQVJZX0VWRU5UJyxcbiAgJ0JJTkFSWV9BQ0snXG5dO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQ09OTkVDVCA9IDA7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGRpc2Nvbm5lY3RgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5ESVNDT05ORUNUID0gMTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZXZlbnRgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FVkVOVCA9IDI7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGFja2AuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkFDSyA9IDM7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGVycm9yYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVJST1IgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlICdiaW5hcnkgZXZlbnQnXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkJJTkFSWV9FVkVOVCA9IDU7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGJpbmFyeSBhY2tgLiBGb3IgYWNrcyB3aXRoIGJpbmFyeSBhcmd1bWVudHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkJJTkFSWV9BQ0sgPSA2O1xuXG4vKipcbiAqIEVuY29kZXIgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyO1xuXG4vKipcbiAqIERlY29kZXIgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG4vKipcbiAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEVuY29kZXIoKSB7fVxuXG4vKipcbiAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gaGFuZGxlIGVuY29kaW5ncyAobGlrZWx5IGVuZ2luZS53cml0ZSlcbiAqIEByZXR1cm4gQ2FsbHMgY2FsbGJhY2sgd2l0aCBBcnJheSBvZiBlbmNvZGluZ3NcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW5jb2Rlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24ob2JqLCBjYWxsYmFjayl7XG4gIGlmICgob2JqLnR5cGUgPT09IGV4cG9ydHMuRVZFTlQgfHwgb2JqLnR5cGUgPT09IGV4cG9ydHMuQUNLKSAmJiBoYXNCaW4ob2JqLmRhdGEpKSB7XG4gICAgb2JqLnR5cGUgPSBvYmoudHlwZSA9PT0gZXhwb3J0cy5FVkVOVCA/IGV4cG9ydHMuQklOQVJZX0VWRU5UIDogZXhwb3J0cy5CSU5BUllfQUNLO1xuICB9XG5cbiAgZGVidWcoJ2VuY29kaW5nIHBhY2tldCAlaicsIG9iaik7XG5cbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IG9iai50eXBlKSB7XG4gICAgZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIGVuY29kaW5nID0gZW5jb2RlQXNTdHJpbmcob2JqKTtcbiAgICBjYWxsYmFjayhbZW5jb2RpbmddKTtcbiAgfVxufTtcblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFzU3RyaW5nKG9iaikge1xuXG4gIC8vIGZpcnN0IGlzIHR5cGVcbiAgdmFyIHN0ciA9ICcnICsgb2JqLnR5cGU7XG5cbiAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBvYmoudHlwZSkge1xuICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyAnLSc7XG4gIH1cblxuICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICBpZiAob2JqLm5zcCAmJiAnLycgIT09IG9iai5uc3ApIHtcbiAgICBzdHIgKz0gb2JqLm5zcCArICcsJztcbiAgfVxuXG4gIC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuICBpZiAobnVsbCAhPSBvYmouaWQpIHtcbiAgICBzdHIgKz0gb2JqLmlkO1xuICB9XG5cbiAgLy8ganNvbiBkYXRhXG4gIGlmIChudWxsICE9IG9iai5kYXRhKSB7XG4gICAgc3RyICs9IEpTT04uc3RyaW5naWZ5KG9iai5kYXRhKTtcbiAgfVxuXG4gIGRlYnVnKCdlbmNvZGVkICVqIGFzICVzJywgb2JqLCBzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgYXMgJ2J1ZmZlciBzZXF1ZW5jZScgYnkgcmVtb3ZpbmcgYmxvYnMsIGFuZFxuICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QnVmZmVyfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBc0JpbmFyeShvYmosIGNhbGxiYWNrKSB7XG5cbiAgZnVuY3Rpb24gd3JpdGVFbmNvZGluZyhibG9ibGVzc0RhdGEpIHtcbiAgICB2YXIgZGVjb25zdHJ1Y3Rpb24gPSBiaW5hcnkuZGVjb25zdHJ1Y3RQYWNrZXQoYmxvYmxlc3NEYXRhKTtcbiAgICB2YXIgcGFjayA9IGVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgdmFyIGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuXG4gICAgYnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuICAgIGNhbGxiYWNrKGJ1ZmZlcnMpOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgfVxuXG4gIGJpbmFyeS5yZW1vdmVCbG9icyhvYmosIHdyaXRlRW5jb2RpbmcpO1xufVxuXG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRGVjb2RlcigpIHtcbiAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgIHdpdGggRGVjb2Rlci5cbiAqL1xuXG5FbWl0dGVyKERlY29kZXIucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZWNvZGVzIGFuIGVjb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHBhY2tldDtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgcGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBwYWNrZXQudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IHBhY2tldC50eXBlKSB7IC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuXG4gICAgICAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvci5yZWNvblBhY2suYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgIH1cbiAgfVxuICBlbHNlIGlmIChpc0J1ZihvYmopIHx8IG9iai5iYXNlNjQpIHsgLy8gcmF3IGJpbmFyeSBkYXRhXG4gICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO1xuICAgICAgaWYgKHBhY2tldCkgeyAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGU6ICcgKyBvYmopO1xuICB9XG59O1xuXG4vKipcbiAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZGVjb2RlU3RyaW5nKHN0cikge1xuICB2YXIgaSA9IDA7XG4gIC8vIGxvb2sgdXAgdHlwZVxuICB2YXIgcCA9IHtcbiAgICB0eXBlOiBOdW1iZXIoc3RyLmNoYXJBdCgwKSlcbiAgfTtcblxuICBpZiAobnVsbCA9PSBleHBvcnRzLnR5cGVzW3AudHlwZV0pIHtcbiAgICByZXR1cm4gZXJyb3IoJ3Vua25vd24gcGFja2V0IHR5cGUgJyArIHAudHlwZSk7XG4gIH1cblxuICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gcC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gcC50eXBlKSB7XG4gICAgdmFyIGJ1ZiA9ICcnO1xuICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09ICctJykge1xuICAgICAgYnVmICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoaSA9PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSAnLScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBhdHRhY2htZW50cycpO1xuICAgIH1cbiAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gIH1cblxuICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICBpZiAoJy8nID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgIHAubnNwID0gJyc7XG4gICAgd2hpbGUgKCsraSkge1xuICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKCcsJyA9PT0gYykgYnJlYWs7XG4gICAgICBwLm5zcCArPSBjO1xuICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwLm5zcCA9ICcvJztcbiAgfVxuXG4gIC8vIGxvb2sgdXAgaWRcbiAgdmFyIG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgaWYgKCcnICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgcC5pZCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgLS1pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHAuaWQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gICAgcC5pZCA9IE51bWJlcihwLmlkKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAganNvbiBkYXRhXG4gIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICB2YXIgcGF5bG9hZCA9IHRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgIHZhciBpc1BheWxvYWRWYWxpZCA9IHBheWxvYWQgIT09IGZhbHNlICYmIChwLnR5cGUgPT09IGV4cG9ydHMuRVJST1IgfHwgaXNBcnJheShwYXlsb2FkKSk7XG4gICAgaWYgKGlzUGF5bG9hZFZhbGlkKSB7XG4gICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyb3IoJ2ludmFsaWQgcGF5bG9hZCcpO1xuICAgIH1cbiAgfVxuXG4gIGRlYnVnKCdkZWNvZGVkICVzIGFzICVqJywgc3RyLCBwKTtcbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIHRyeVBhcnNlKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkRlY29kZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gIH1cbn07XG5cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufVxuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGFrZUJpbmFyeURhdGEgPSBmdW5jdGlvbihiaW5EYXRhKSB7XG4gIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHsgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgdmFyIHBhY2tldCA9IGJpbmFyeS5yZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICByZXR1cm4gcGFja2V0O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZmluaXNoZWRSZWNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufTtcblxuZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogZXhwb3J0cy5FUlJPUixcbiAgICBkYXRhOiAncGFyc2VyIGVycm9yOiAnICsgbXNnXG4gIH07XG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gaXNCdWY7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIGJ1ZmZlciBvciBhbiBhcnJheWJ1ZmZlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0J1ZihvYmopIHtcbiAgcmV0dXJuIChnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSkgfHxcbiAgICAgICAgIChnbG9iYWwuQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IEFycmF5QnVmZmVyLmlzVmlldyhvYmopKSk7XG59XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5XG5cbmZ1bmN0aW9uIHRvQXJyYXkobGlzdCwgaW5kZXgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXVxuXG4gICAgaW5kZXggPSBpbmRleCB8fCAwXG5cbiAgICBmb3IgKHZhciBpID0gaW5kZXggfHwgMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaSAtIGluZGV4XSA9IGxpc3RbaV1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbn1cbiIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2ggKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ei1fJy5zcGxpdCgnJylcbiAgLCBsZW5ndGggPSA2NFxuICAsIG1hcCA9IHt9XG4gICwgc2VlZCA9IDBcbiAgLCBpID0gMFxuICAsIHByZXY7XG5cbi8qKlxuICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3BlY2lmaWVkIG51bWJlci5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbnVtIFRoZSBudW1iZXIgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG51bWJlci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgdmFyIGVuY29kZWQgPSAnJztcblxuICBkbyB7XG4gICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgIG51bSA9IE1hdGguZmxvb3IobnVtIC8gbGVuZ3RoKTtcbiAgfSB3aGlsZSAobnVtID4gMCk7XG5cbiAgcmV0dXJuIGVuY29kZWQ7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBpbnRlZ2VyIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgZ2l2ZW4gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge051bWJlcn0gVGhlIGludGVnZXIgdmFsdWUgcmVwcmVzZW50ZWQgYnkgdGhlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgdmFyIGRlY29kZWQgPSAwO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBkZWNvZGVkID0gZGVjb2RlZCAqIGxlbmd0aCArIG1hcFtzdHIuY2hhckF0KGkpXTtcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVkO1xufVxuXG4vKipcbiAqIFllYXN0OiBBIHRpbnkgZ3Jvd2luZyBpZCBnZW5lcmF0b3IuXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gQSB1bmlxdWUgaWQuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiB5ZWFzdCgpIHtcbiAgdmFyIG5vdyA9IGVuY29kZSgrbmV3IERhdGUoKSk7XG5cbiAgaWYgKG5vdyAhPT0gcHJldikgcmV0dXJuIHNlZWQgPSAwLCBwcmV2ID0gbm93O1xuICByZXR1cm4gbm93ICsnLicrIGVuY29kZShzZWVkKyspO1xufVxuXG4vL1xuLy8gTWFwIGVhY2ggY2hhcmFjdGVyIHRvIGl0cyBpbmRleC5cbi8vXG5mb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBtYXBbYWxwaGFiZXRbaV1dID0gaTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgYHllYXN0YCwgYGVuY29kZWAgYW5kIGBkZWNvZGVgIGZ1bmN0aW9ucy5cbi8vXG55ZWFzdC5lbmNvZGUgPSBlbmNvZGU7XG55ZWFzdC5kZWNvZGUgPSBkZWNvZGU7XG5tb2R1bGUuZXhwb3J0cyA9IHllYXN0O1xuIiwiLyoqXG4gKiDQnNC+0LTRg9C70Ywg0LrQsNC80LXRgNGLXG4gKi9cblxuY29uc3QgTUFYX0RFQURaT05FX1ggPSA1MDA7XG5jb25zdCBNQVhfREVBRFpPTkVfWSA9IDUwMDtcblxuLyoqXG4gKiBAY2xhc3MgQ2FtZXJhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjYW52YXMsIGZvbGxvd2VyKXtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZGVhZFpvbmUgPSB7XG4gICAgICAgICAgICB4OiBNQVhfREVBRFpPTkVfWCxcbiAgICAgICAgICAgIHk6IE1BWF9ERUFEWk9ORV9ZXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy5zcGVlZCA9IDIwMDtcblxuICAgICAgICB0aGlzLmZvbGxvd2VyID0gZm9sbG93ZXI7XG4gICAgfVxuXG4gICAgcmVzaXplKCl7XG5cbiAgICAgICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gTWF0aC5mbG9vcigod2lkdGggLSB0aGlzLndpZHRoKS8yKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnkgLSBNYXRoLmZsb29yKChoZWlnaHQgLSB0aGlzLmhlaWdodCkvMik7XG4gICAgICAgIGlmKHggPCAwKSB4ID0gMDtcbiAgICAgICAgaWYoeTwwKSB5ID0gMDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIH1cblxuICAgIHVwZGF0ZShyb29tKXtcblxuICAgICAgICBpZih0aGlzLmZvbGxvd2VyKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkZvbGxvdyhyb29tLCB0aGlzLmZvbGxvd2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvbGxvd2VyKGZvbGxvd2VyKXtcbiAgICAgICAgdGhpcy5mb2xsb3dlciA9IGZvbGxvd2VyO1xuICAgIH1cblxuICAgIHJ1bkZvbGxvdyhyb29tLCBwbGF5ZXIpe1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9C10YDQtdGB0YfQuNGC0LDQtdC8IFwi0LzQtdGA0YLQstGL0LUg0LfQvtC90YtcIlxuICAgICAgICAgKi9cblxuICAgICAgICAvLyDQkdC10YDQtdC8INC/0L7Qu9C+0LLQuNC90YMg0LrQsNC80LXRgNGLXG4gICAgICAgIHRoaXMuZGVhZFpvbmUueCA9IE1hdGguZmxvb3IodGhpcy53aWR0aC8yKTtcbiAgICAgICAgdGhpcy5kZWFkWm9uZS55ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodC8yKTtcblxuXG4gICAgICAgIC8vINCj0YfRgtC10LwsINGH0YLQviDQutC+0LzQvdCw0YLQsCDQvNC+0LbQtdGCINCx0YvRgtGMINC80LXQvdGM0YjQtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYocm9vbS53aWR0aCA8IHRoaXMuY2FudmFzLndpZHRoKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueCA9IE1hdGguZmxvb3IoKHJvb20ud2lkdGggLSB0aGlzLmNhbnZhcy53aWR0aCkvMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm9vbS5oZWlnaHQgPCB0aGlzLmNhbnZhcy5oZWlnaHQpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS55ID0gTWF0aC5mbG9vcigocm9vbS5oZWlnaHQgLSB0aGlzLmNhbnZhcy5oZWlnaHQpLzIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0J3QtSDQtNC10LvQsNC10Lwg0L7Rh9C10L3RjCDQsdC+0LvRjNGI0LjQtSBcItC80LXRgNGC0LLRi9C1INC30L7QvdGLXCJcbiAgICAgICAgaWYodGhpcy5kZWFkWm9uZS54ID4gTUFYX0RFQURaT05FX1gpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS54ID0gTUFYX0RFQURaT05FX1g7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kZWFkWm9uZS55ID4gTUFYX0RFQURaT05FX1kpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS55ID0gTUFYX0RFQURaT05FX1k7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQodC70LXQtNGD0LXQvCDQt9CwINC/0LvQtdC10YDQvtC8XG4gICAgICAgICAqL1xuICAgICAgICBpZihwbGF5ZXIueCAtIHRoaXMueCA+IHRoaXMud2lkdGggLSB0aGlzLmRlYWRab25lLngpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHBsYXllci54IC0gdGhpcy53aWR0aCArIHRoaXMuZGVhZFpvbmUueDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHBsYXllci54IDwgdGhpcy54ICsgdGhpcy5kZWFkWm9uZS54KSB7XG4gICAgICAgICAgICB0aGlzLnggPSBwbGF5ZXIueCAtIHRoaXMuZGVhZFpvbmUueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBsYXllci55IC0gdGhpcy55ID4gdGhpcy5oZWlnaHQgLSB0aGlzLmRlYWRab25lLnkpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHBsYXllci55IC0gdGhpcy5oZWlnaHQgKyB0aGlzLmRlYWRab25lLnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihwbGF5ZXIueSA8IHRoaXMueSArIHRoaXMuZGVhZFpvbmUueSkge1xuICAgICAgICAgICAgdGhpcy55ID0gcGxheWVyLnkgLSB0aGlzLmRlYWRab25lLnk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog0J3QtSDQstGL0YXQvtC00LjQvCDQt9CwINCz0YDQsNC90LjRhtGLINC60LDRgNGC0YtcbiAgICAgICAgICovXG4gICAgICAgIGlmKHRoaXMueCA8IDApXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICBpZih0aGlzLnkgPCAwKVxuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IHJvb20ud2lkdGgpXG4gICAgICAgICAgICB0aGlzLnggPSByb29tLndpZHRoIC0gdGhpcy53aWR0aDtcbiAgICAgICAgaWYodGhpcy55ICsgdGhpcy5oZWlnaHQgPiByb29tLmhlaWdodClcbiAgICAgICAgICAgIHRoaXMueSA9IHJvb20uaGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70Lgg0LrQsNC80LXRgNCwINCx0L7Qu9GM0YjQtSDQutCw0YDRgtGLIC0g0LTQvtCx0LDQstC40Lwg0YHQvNC10YnQtdC90LjQtVxuICAgICAgICAgKi9cbiAgICAgICAgaWYodGhpcy53aWR0aCA+IHJvb20ud2lkdGgpXG4gICAgICAgICAgICB0aGlzLnggKz0gKHRoaXMud2lkdGggLSByb29tLndpZHRoKS8yO1xuICAgICAgICBpZih0aGlzLmhlaWdodCA+IHJvb20uaGVpZ2h0KVxuICAgICAgICAgICAgdGhpcy55ICs9ICh0aGlzLmhlaWdodCAtIHJvb20uaGVpZ2h0KS8yO1xuXG5cbiAgICB9XG59IiwiLyoqXG4gKiDQmtC+0L3RgtGA0L7Qu9C70LXRgCAtINC60LvQsNCy0LjRiNC4INC4INC80YvRiNGMXG4gKiBUT0RPOiDQvNC+0LbQtdGCINC60L7QvNCw0L3QtNGLINC80LXQvdGOINGC0L7QttC1INGB0L7QsdGL0YLQuNGP0LzQuFxuICovXG5cblxuLy8g0L/QvtC00LrQu9GO0YfQuNC8INGB0L7QsdGL0YLQuNGPXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4uLy4uL2V2ZW50cy5qcydcblxuXG5jb25zdCBrZXlzID0ge1xuICAgIExFRlQ6IDM3LCAvL0xlZnRcbiAgICBVUDogMzgsIC8vVXBcbiAgICBSSUdIVDogMzksIC8vUmlnaHRcbiAgICBET1dOOiA0MCwgLy9Eb3duXG5cbiAgICBBOiA2NSwgLy9BXG4gICAgVzogODcsIC8vV1xuICAgIEQ6IDY4LCAvL0RcbiAgICBTOiA4MywgLy8gU1xuXG4gICAgTjE6IDQ5LFxuICAgIE4yOiA1MCxcbiAgICBOMzogNTEsXG4gICAgTjQ6IDUyLFxuICAgIE41OiA1MyxcbiAgICBONjogNTQsXG4gICAgTjc6IDU1LFxuICAgIE44OiA1NixcbiAgICBOOTogNTcsXG4gICAgTjA6IDQ4LFxuXG4gICAgU1BBQ0U6IDMyLCAvL9Ce0LPQvtC90YwhXG5cbiAgICBTVEFUSVNUSUM6IDczIC8vIFwiSVwiXG5cbn07XG5cbmxldCBjbGlja1BhZCA9IG51bGw7XG5cblxuXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3AsIHNldENsaWNrUGFkfVxuXG5cbi8qKlxuICog0JfQsNC/0YPRgdGC0LjQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICovXG5mdW5jdGlvbiBzdGFydCgpIHtcblxuICAgIC8vINCV0YHQu9C4INC+0LrQvdC+INC/0L7RgtC10YDRj9C70L4g0YTQvtC60YPRgVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBvbldpbmRvd0JsdXIsIGZhbHNlKTtcblxuICAgIC8vINCd0LDQttCw0YLQsCDQutC70LDQstC40YjQsFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5ZG93biwgZmFsc2UpO1xuXG4gICAgLy8g0J7RgtC20LDRgtCwINC60LvQsNCy0LjRiNCwXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5dXAsIGZhbHNlKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCwgZmFsc2UpO1xufVxuXG5cbi8qKlxuICog0J7RgdGC0LDQvdC+0LLQuNC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKi9cbmZ1bmN0aW9uIHN0b3AoKSB7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgb25XaW5kb3dCbHVyLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlkb3duLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5dXAsIGZhbHNlKTtcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCwgZmFsc2UpO1xufVxuXG5cbmZ1bmN0aW9uIHNldENsaWNrUGFkKF9jbGlja1BhZCkge1xuICAgIGNsaWNrUGFkID0gX2NsaWNrUGFkO1xufVxuXG4vKipcbiAqINCf0YDQuCDQvdCw0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXlkb3duKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXG4gICAgICAgIGNhc2Uga2V5cy5MRUZUOlxuICAgICAgICBjYXNlIGtleXMuQTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleWRvd24nLCAnbGVmdCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5VUDpcbiAgICAgICAgY2FzZSBrZXlzLlc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ3VwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlJJR0hUOlxuICAgICAgICBjYXNlIGtleXMuRDpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleWRvd24nLCAncmlnaHQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuRE9XTjpcbiAgICAgICAgY2FzZSBrZXlzLlM6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2Rvd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuU1BBQ0U6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjE6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGwxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4yOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsMicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OMzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGw0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk41OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsNScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ONjpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGw3Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk44OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsOCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OOTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjA6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGwxMCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5cbi8qKlxuICog0J/RgNC4INC+0YLQttCw0YLQuNC4INC60LvQsNCy0LjRiNC4XG4gKiBAcGFyYW0gZVxuICovXG5mdW5jdGlvbiBvbktleXVwKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIGtleXMuTEVGVDpcbiAgICAgICAgY2FzZSBrZXlzLkE6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdsZWZ0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlVQOlxuICAgICAgICBjYXNlIGtleXMuVzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ3VwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlJJR0hUOlxuICAgICAgICBjYXNlIGtleXMuRDpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ3JpZ2h0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLkRPV046XG4gICAgICAgIGNhc2Uga2V5cy5TOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnZG93bicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5TUEFDRTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuU1RBVElTVElDOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc3RhdGlzdGljJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLypjYXNlIGtleXMuTjE6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDEnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjI6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjM6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjU6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjY6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjg6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjk6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjA6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdza2lsbDEwJyk7XG4gICAgICAgICAgICBicmVhazsqL1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQutC70LjQutC1XG4gKiBAcGFyYW0gZVxuICovXG5mdW5jdGlvbiBvbkNsaWNrKGUpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC/0L4g0YfQtdC8INC60LvQuNC60LDRgtGMINC+0YLQv9GA0LDQstC40Lwg0YHQvtCx0YvRgtC40LVcbiAgICBpZihjbGlja1BhZCkge1xuICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCArIGNsaWNrUGFkLngsXG4gICAgICAgICAgICB5ID0gZS5jbGllbnRZICsgY2xpY2tQYWQueTtcbiAgICAgICAgZXZlbnRzLmFkZCgndGFyZ2V0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgZXZlbnRzLmFkZCgnY2xpY2snLCB7eDogeCwgeTogeX0pO1xuXG4gICAgfVxufVxuXG4vL9Cc0YvRiNGMINC90LDQttCw0LvQuFxuZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0L/QviDRh9C10Lwg0LrQu9C40LrQsNGC0Ywg0L7RgtC/0YDQsNCy0LjQvCDRgdC+0LHRi9GC0LjQtVxuICAgIGlmKGNsaWNrUGFkKSB7XG4gICAgICAgIGxldCB4ID0gZS5jbGllbnRYICsgY2xpY2tQYWQueCxcbiAgICAgICAgICAgIHkgPSBlLmNsaWVudFkgKyBjbGlja1BhZC55O1xuXG4gICAgICAgIGlmKGUuYnV0dG9uID09PSAwIHx8IGUuYnV0dG9uPT09MSkge1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnbW91c2UtZG93bi1sZWZ0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGUuYnV0dG9uID09PSAyKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ21vdXNlLWRvd24tcmlnaHQnLCB7eDogeCwgeTogeX0pO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbi8v0JzRi9GI0Ywg0L7RgtC/0YPRgdGC0LjQu9C4XG5mdW5jdGlvbiBvbk1vdXNlVXAoZSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0L/QviDRh9C10Lwg0LrQu9C40LrQsNGC0Ywg0L7RgtC/0YDQsNCy0LjQvCDRgdC+0LHRi9GC0LjQtVxuICAgIGlmKGNsaWNrUGFkKSB7XG4gICAgICAgIGxldCB4ID0gZS5jbGllbnRYICsgY2xpY2tQYWQueCxcbiAgICAgICAgICAgIHkgPSBlLmNsaWVudFkgKyBjbGlja1BhZC55O1xuXG4gICAgICAgIGlmKGUuYnV0dG9uID09PSAwIHx8IGUuYnV0dG9uPT09MSkge1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnbW91c2UtdXAtbGVmdCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlLmJ1dHRvbiA9PT0gMil7XG4gICAgICAgICAgICBldmVudHMuYWRkKCdtb3VzZS11cC1yaWdodCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuXG4vKipcbiAqINCV0YHQu9C4INC+0LrQvdC+INC/0L7RgtC10YDRj9C70L4g0YTQvtC60YPRgVxuICovXG5mdW5jdGlvbiBvbldpbmRvd0JsdXIoKSB7XG4gICAgLy8g0L7RgtC+0LbQvNC10Lwg0LLRgdC1INC60LvQsNCy0LjRiNC4XG4gICAgZXZlbnRzLmFkZCgnY29udHJvbGxlclJlc2V0JywgdHJ1ZSk7XG59IiwiaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHthZGQsIGFkZEZyb21TZXQsIHJlbW92ZSwgcmVzZXQsIHNpemUsIGVhY2h9XG5cbmNvbnN0IGVudGl0aWVzID0gW107XG5cblxuZnVuY3Rpb24gYWRkKHgsIHksIElELCBsaWZldGltZSwgZmF6YSkge1xuICAgIGVudGl0aWVzLnB1c2goXG4gICAgICAgIG5ldyBFbnRpdHkoeCwgeSwgY2hhcmFjdGVycy5nZXQoSUQpLCBsaWZldGltZSwgZmF6YSlcbiAgICApO1xufVxuXG5mdW5jdGlvbiBhZGRGcm9tU2V0KHgsIHksIHNldElELCBJRCwgbGlmZXRpbWUsIGZhemEpIHtcbiAgICBlbnRpdGllcy5wdXNoKFxuICAgICAgICBuZXcgRW50aXR5KHgsIHksIGNoYXJhY3RlcnMuZ2V0RnJvbVNldChzZXRJRCwgSUQpLCBsaWZldGltZSwgZmF6YSlcbiAgICApO1xufVxuXG5mdW5jdGlvbiByZW1vdmUoaW5kZXgpIHtcbiAgICBlbnRpdGllcy5zcGxpY2UoaW5kZXgsIDEpO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBlbnRpdGllcy5sZW5ndGggPSAwO1xufVxuXG5mdW5jdGlvbiBzaXplKCkge1xuICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGVhY2goY2FsbGJhY2spIHtcbiAgICBlbnRpdGllcy5mb3JFYWNoKGNhbGxiYWNrKTtcbn1cbiIsIi8qKlxuICogQGNsYXNzIEVudGl0eVxuICpcbiAqL1xuaW1wb3J0IHtTVEVQfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eXtcblxuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNoYXJhY3RlciwgbGlmZXRpbWUsIGZhemEpe1xuXG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG5cbiAgICAgICAgLy8g0LLRgNC10LzRjyDQttC40LfQvdC4XG4gICAgICAgIHRoaXMubGlmZXRpbWUgPSBsaWZldGltZTtcblxuICAgICAgICB0aGlzLmltbW9ydGFsID0gbGlmZXRpbWUgPiAwLjAgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2hhcmFjdGVyLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2hhcmFjdGVyLmhlaWdodDtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTcGVlZCA9IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zcGVlZDtcbiAgICAgICAgaWYoIXRoaXMuYW5pbWF0ZVNwZWVkKSB0aGlzLmFuaW1hdGVTcGVlZCA9IDE0O1xuICAgICAgICB0aGlzLmZhemEgPSBmYXphIHx8IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiZGVmYXVsdFwiO1xuXG4gICAgICAgIHRoaXMuZGllID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEaWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGllO1xuICAgIH1cblxuICAgIGtpbGwoKXtcbiAgICAgICAgdGhpcy5kaWUgPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpe1xuXG4gICAgICAgIGlmKCF0aGlzLmltbW9ydGFsKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxpZmV0aW1lID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlmZXRpbWUgLT0gU1RFUDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGlmZXRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuZGllID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpe1xuICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y9cbiAgICAgICAgdGhpcy5mYXphICs9IHRoaXMuYW5pbWF0ZVNwZWVkICogU1RFUDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gTWF0aC5mbG9vcih0aGlzLmZhemEpO1xuXG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPCAwIHx8IHRoaXMuY3VycmVudFNwcml0ZU51bSA+PSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHggPSB0aGlzLnggLSBjYW1lcmEueCAtIHRoaXMud2lkdGgvMixcbiAgICAgICAgICAgIHkgPSB0aGlzLnkgLSBjYW1lcmEueSAtIHRoaXMuaGVpZ2h0LzI7XG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3Q2hhcmFjdGVyKGNhbWVyYS5jb250ZXh0LCB4LCB5KTtcbiAgICB9XG5cblxuICAgIGRyYXdDaGFyYWN0ZXIoY29udGV4dCwgc3gsIHN5KXtcbiAgICAgICAgbGV0IHggPSBzeCAtICh0aGlzLmNoYXJhY3Rlci53aWR0aC10aGlzLndpZHRoKS8yLFxuICAgICAgICAgICAgeSA9IHN5IC0gKHRoaXMuY2hhcmFjdGVyLmhlaWdodC10aGlzLmhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIuZHJhdyhjb250ZXh0LCB4LCB5LCB0aGlzLnN0YXRlLCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59IiwiaW1wb3J0IFVuaXQgZnJvbSAnLi91bml0LmpzJ1xuXG4vKipcbiAqIEhlcm8gLSDQs9C70LDQstC90YvQuSDQs9C10YDQvtC5XG4gKi9cblxuLyoqXG4gKiDQrtC90LjRgiDQs9C10YDQvtGPXG4gKiBAdHlwZSB7VW5pdHxudWxsfVxuICovXG5sZXQgdW5pdCA9IG51bGw7XG5cbi8qKlxuICog0KHQutC+0YDQvtGB0YLRjCDQv9C10YDQtdC80LXRidC10L3QuNGPXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5sZXQgc3BlZWQgPSAwO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHt1bml0LCBzcGVlZCwgYW5pbWF0ZSwgZHJhd31cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICB0aGlzLnVuaXQuYW5pbWF0ZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3KGNhbWVyYSkge1xuICAgIHRoaXMudW5pdC5kcmF3KGNhbWVyYSk7XG59XG4iLCJpbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IGxvZyBmcm9tIFwiLi4vLi4vbG9nc1wiXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHVuaXRzIGZyb20gXCIuL3VuaXRzXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi9ldmVudHNcIjtcbmltcG9ydCBoZXJvIGZyb20gJy4vaGVybyc7XG5pbXBvcnQgVW5pdCBmcm9tIFwiLi91bml0XCI7XG5pbXBvcnQgVGVsZXBvcnQgZnJvbSBcIi4vdGVsZXBvcnRcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuL3Jvb21cIjtcbmltcG9ydCBMb290IGZyb20gXCIuL2xvb3RcIjtcbmltcG9ydCB1aSBmcm9tIFwiLi91aS91aVwiO1xuaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kcyBmcm9tIFwiLi4vLi4vc291bmRzXCI7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSBcIi4vZW50aXRpZXNcIjtcbmltcG9ydCBhY2NvdW50IGZyb20gXCIuLi8uLi9hY2NvdW50XCI7XG5cbi8qKlxuICog0J7RgdC90L7QstC90LDRjyDRgdGG0LXQvdCwIC0g0YHQvtCx0YHRgtCy0LXQvdC90L4g0LjQs9GA0LBcbiAqL1xuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wfVxuXG4vLyDQl9Cw0L/Rg9GB0YLQuNC8INC/0L4g0L7QutC+0L3Rh9Cw0L3QuNC4INC40LPRgNGLXG5sZXRcbiAgICBmaW5hbENhbGxiYWNrID0gbnVsbCxcbiAgICBpbnRlcnZhbCA9IG51bGw7XG5cbmxldCByb29tcyA9IHt9LFxuICAgIHJvb21faWQgPSBudWxsLFxuICAgIHJvb20gPSBudWxsLFxuXG4gICAgLy8g0JrQsNC80LXRgNCwLiDQodC+0LLQvNC10YnQtdC90LAg0YHQviDQstGK0Y7Qv9C+0YDRgtC+0LxcbiAgICBjYW1lcmEgPSBudWxsLFxuICAgIGxvb3RzID0ge30sXG4gICAgdGVsZXBvcnRzID0ge307XG5cblxuZnVuY3Rpb24gc3RhcnQoY2FsbGJhY2spIHtcbiAgICBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICByb29tcyA9IHt9O1xuXG4gICAgLy8g0KLQtdC60YPRidCw0Y8g0LrQvtC80L3QsNGC0LAuIGlkINC4INGB0LDQvNCwXG4gICAgcm9vbV9pZCA9IG51bGw7XG4gICAgcm9vbSA9IG51bGw7XG5cbiAgICAvLyDQktC10YHRjCDQu9GD0YJcbiAgICBsb290cyA9IHt9O1xuXG4gICAgLy8g0KLQtdC70LXQv9C+0YDRgtGLXG4gICAgdGVsZXBvcnRzID0ge307XG5cblxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIC8vINCh0L7Qt9C00LDQtNC40Lwg0LrQsNC80LXRgNGDINC/0L4gXCLQutCw0L3QstC1XCJcbiAgICBjYW1lcmEgPSBuZXcgQ2FtZXJhKDAsIDAsIGNhbnZhcyk7XG4gICAgLy8g0LjQt9C80LXQvdGP0LXQvCDQutCw0LzQtdGA0YMg0L/QvtC0INC+0LrQvdC+XG4gICAgY2FtZXJhLnJlc2l6ZSgpO1xuXG4gICAgLy/Qn9GA0Lgg0YDQtdGB0LDQudC30LUg0L7QutC90LAg0LHRgNCw0YPQt9C10YDQsCAtINC40LfQvNC10L3Rj9C10Lwg0LrQsNC80LXRgNGDINC/0L7QtCDQvtC60L3QvlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7Y2FtZXJhLnJlc2l6ZSgpO30pO1xuXG5cbiAgICAvL9CX0LDQv9GA0L7RgdC40Lwg0LDQstCw0YLQsNGA0LBcbiAgICBldmVudHMuYWRkKCduZWVkLWF2YXRhcicpO1xuXG4gICAgZXZlbnRzLm9uKFwic2lnbm91dFwiLCgpPT57XG4gICAgICAgIGFjY291bnQuc2lnbm91dCgpO1xuICAgICAgICBldmVudHMuZGlzY29ubmVjdCgpO1xuICAgICAgICBzdG9wKClcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcImRpc2Nvbm5lY3RcIiwgKCk9PntcbiAgICAgICAgc3RvcCgpO1xuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uKFwicmVjb25uZWN0XCIsIG9uUmVjb25uZWN0KTtcbiAgICBldmVudHMub24oXCJyb29tXCIsIG9uUm9vbSk7XG4gICAgZXZlbnRzLm9uKFwiaGVyb1wiLCBvbkhlcm8pO1xuICAgIGV2ZW50cy5vbihcInNvdW5kXCIsIG9uU291bmQpO1xuXG4gICAgZXZlbnRzLm9uKFwiY2xpY2tcIiwgKGV2ZW50TmFtZSwgcG9zKT0+e1xuICAgICAgICBpZihwb3MpIHtcbiAgICAgICAgICAgIGVudGl0aWVzLmFkZChwb3MueCwgcG9zLnkrMSwgJ3BvaW50ZXInLCAuMzUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBldmVudHMub24oXCJlbnRpdHlcIiwgKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSk9PntcbiAgICAgICAgaWYodHlwZT09PVwicmVtb3ZlLWNvaW5cIiAmJiBkYXRhLnJvb21faWQ9PT1yb29tX2lkKXtcblxuICAgICAgICAgICAgZW50aXRpZXMuYWRkKGRhdGEueCwgZGF0YS55LCAnYm9vbTEnLCAuNjUpO1xuXG4gICAgICAgICAgICAvLyBlbnRpdGllcy5hZGQoZGF0YS54LCBkYXRhLnksICdib29tMicsIC41NSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHR5cGU9PT1cInRlbGVwb3J0LXRhcmdldFwiICYmIGRhdGEucm9vbV9pZD09PXJvb21faWQpe1xuXG4gICAgICAgICAgICBlbnRpdGllcy5hZGQoZGF0YS54LCBkYXRhLnksICdiYXJpZXInLCAwLjY1KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHR5cGU9PT1cInB1c2gtZWZmZWN0XCIgJiYgZGF0YS5yb29tX2lkPT09cm9vbV9pZCl7XG5cbiAgICAgICAgICAgIGVudGl0aWVzLmFkZChkYXRhLngsIGRhdGEueSwgJ3B1c2gxJywgMC4xNSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHVpLnNraWxscy5zdGFydCgpO1xuXG4gICAgdWkudG9wMTAuc3RhcnQoKTtcblxuXG4gICAgLyoqXG4gICAgICog0J7RgdC90L7QstC90L7QuSDRhtC40LrQu1xuICAgICAqL1xuICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoXyA9PiB7XG5cbiAgICAgICAgLy8g0J/QtdGA0LXQvNC10YnQtdC90LjQtSwg0YPQv9GA0LDQstC70Y/QtdC80L7QtSDQvdCwINC60LvQuNC10L3RgtC1XG4gICAgICAgIHVwZGF0ZSgpO1xuXG5cbiAgICAgICAgLy8g0J7RgtGA0LjRgdC+0LLQutCwXG4gICAgICAgIGRyYXcoY2FtZXJhKTtcblxuXG4gICAgICAgIC8vINCQ0L3QuNC80LDRhtC40Y9cbiAgICAgICAgYW5pbWF0ZSgpO1xuXG5cbiAgICB9LCBjb25zdGFudHMuSU5URVJWQUwpO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgZXZlbnRzLm9mZihcInJlY29ubmVjdFwiLCBvblJlY29ubmVjdCk7XG4gICAgZXZlbnRzLm9mZihcInJvb21cIiwgb25Sb29tKTtcbiAgICBldmVudHMub2ZmKFwiaGVyb1wiKTtcbiAgICBldmVudHMub2ZmKFwic291bmRcIik7XG5cbiAgICBldmVudHMub2ZmKFwiY2xpY2tcIik7XG4gICAgZXZlbnRzLm9mZihcImNvaW5cIik7XG5cbiAgICB1bml0cy5yZXNldCgpO1xuICAgIGxvb3RzID0ge307XG4gICAgaGVyby51bml0ID0gbnVsbDtcbiAgICBlbnRpdGllcy5yZXNldCgpO1xuXG4gICAgdWkuc2tpbGxzLnN0b3AoKTtcblxuICAgIHVpLnRvcDEwLnN0b3AoKTtcblxuICAgIGZpbmFsQ2FsbGJhY2soKTtcbn1cblxuZnVuY3Rpb24gb25SZWNvbm5lY3QoZXZlbnQsIHR5cGUsIGRhdGEpIHtcbiAgICBsb2coJ9C+0YIg0YHQtdGA0LLQtdGA0LAg0L/QvtGB0YLRg9C/0LjQuyByZWNvbm5lY3QnKTtcbiAgICB1bml0cy5yZXNldCgpO1xuICAgIGxvb3RzID0ge307XG4gICAgaGVyby51bml0ID0gbnVsbDtcbn1cblxuLyoqXG4gKiDQodC+0LHRi9GC0LjRjyBcInJvb21cIlxuICogQHBhcmFtIGV2ZW50XG4gKiBAcGFyYW0gdHlwZVxuICogQHBhcmFtIGRhdGFcbiAqL1xuZnVuY3Rpb24gb25Sb29tKGV2ZW50LCB0eXBlLCBkYXRhKSB7XG5cbiAgICAvLyDQn9C+0LvRg9GH0LXQvdC40LUg0LrQvtC80L3QsNGC0YtcbiAgICBpZih0eXBlPT09XCJjaGFuZ2VcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEucm9vbSkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciByb29tID0gZGF0YS5yb29tO1xuXG4gICAgICAgICAgICBpZiAocm9vbS5JRD09dW5kZWZpbmVkIHx8ICFyb29tLndpZHRoIHx8ICFyb29tLmhlaWdodCB8fCByb29tLmVudmlyb25tZW50X2lkPT11bmRlZmluZWQpIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICByb29tSW5pdChyb29tKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINCa0L7QvNC90LDRgtGLLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LjQs9GA0L7QutCwXG4gICAgaWYodHlwZT09PVwicGxheWVyLWNyZWF0ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXQgPSBuZXcgVW5pdChpbmZvKTtcbiAgICAgICAgICAgIHVuaXRzLmFkZChpbmZvLklELCB1bml0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC40LPRgNC+0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+0LEg0LjQs9GA0L7QutC1XG4gICAgaWYodHlwZT09PVwicGxheWVyLWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWwgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHVuaXRzLml0ZW0oaW5mby5JRCk7XG4gICAgICAgICAgICBpZih1bml0KSB7XG5cbiAgICAgICAgICAgICAgICB1bml0LnNldChpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L7QsdC90L7QstC70LXQvdC40Y8g0LjQs9GA0L7QutCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQs9GA0L7QuiDRg9GI0LXQu1xuICAgIGlmKHR5cGU9PT1cInBsYXllci1sZWF2ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5JRCkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHVuaXRzLnJlbW92ZShkYXRhLklEKTtcblxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDRg9C00LDQu9C10L3QuNGPINC40LPRgNC+0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LvRg9GC0LBcbiAgICBpZih0eXBlPT09XCJsb290LWNyZWF0ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5JRCBpbiBsb290cz09PWZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgbG9vdHNbaW5mby5JRF0gPSBuZXcgTG9vdChpbmZvLnJvb21faWQsIGluZm8ueCwgaW5mby55LCBpbmZvLmNoYXJhY3Rlcl9pZCwgaW5mby5JRCwgaW5mby53aWR0aCwgaW5mby5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vdHNbaW5mby5JRF0uc2V0KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGluZm8uY2hhcmFjdGVyX2lkLCBpbmZvLklEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQu9GD0YLQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LTQtdC60L7RgNCw0YbQuNC4XG4gICAgaWYodHlwZT09PVwiY2FydG9vbi1jcmVhdGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3ByaXRlc2V0X2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3ByaXRlX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKGluZm8ucm9vbV9pZD09cm9vbV9pZCkge1xuXG4gICAgICAgICAgICAgICAgZW50aXRpZXMuYWRkRnJvbVNldChpbmZvLngsIGluZm8ueSwgaW5mby5zcHJpdGVzZXRfaWQsIGluZm8uc3ByaXRlX2lkLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC00LXQutC+0YDQsNGG0LjQuC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INC70YPRgtC1XG4gICAgaWYodHlwZT09PVwibG9vdC1pbmZvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmZvLklEIGluIGxvb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3RzW2luZm8uSURdLnNldChpbmZvLnJvb21faWQsIGluZm8ueCwgaW5mby55LCBpbmZvLmNoYXJhY3Rlcl9pZCwgaW5mby5JRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LvRg9GC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC70YPRgtCwXG4gICAgaWYodHlwZT09PVwibG9vdC1yZW1vdmVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5JRCBpbiBsb290cykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbG9vdHNbaW5mby5JRF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LvRg9GC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtC10LvQtdC/0L7RgNGC0LDRhVxuICAgIGlmKHR5cGU9PVwidGVsZXBvcnQtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5JRCBpbiB0ZWxlcG9ydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRzW2luZm8uSURdLnNldChpbmZvLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgtC10LvQtdC/0L7RgNGC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQvNC+0LHQsFxuICAgIGlmKHR5cGU9PVwibnBjLWNyZWF0ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXQgPSBuZXcgVW5pdChpbmZvKTtcbiAgICAgICAgICAgIHVuaXRzLmFkZChpbmZvLklELCB1bml0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC80L7QsdCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0LzQvtCx0LVcbiAgICBpZih0eXBlPT1cIm5wYy1pbmZvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHMuaXRlbShpbmZvLklEKTtcbiAgICAgICAgICAgIGlmKHVuaXQpIHtcblxuICAgICAgICAgICAgICAgIHVuaXQuc2V0KGluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDQvNC+0LHQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC80L7QsdCwXG4gICAgaWYodHlwZT09PVwibnBjLXJlbW92ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHVuaXRzLnJlbW92ZShpbmZvLklEKTtcblxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDRg9C00LDQu9C10L3QuNGPINC80L7QsdCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25IZXJvKGV2ZW50LCB0eXBlLCBkYXRhKSB7XG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INCz0LXRgNC+0Y8g0L/RgNC4INCy0YXQvtC00LVcbiAgICBpZih0eXBlPT1cImhlcm8tY3JlYXRlXCIpIHtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBpZiAoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY29pbnNfY291bnQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsdXBDb3VudGVyID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3BlZWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZighaGVyby51bml0KSB7XG4gICAgICAgICAgICAgICAgaGVyby51bml0ID0gbmV3IFVuaXQoaW5mbywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGhlcm8udW5pdC5zZXQoaW5mbyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVuaXRzLmFkZCgnWycraW5mby5JRCsnXScsIGhlcm8udW5pdCk7XG5cbiAgICAgICAgICAgIGhlcm8uc3BlZWQgPSBpbmZvLnNwZWVkO1xuXG4gICAgICAgICAgICB1aS5oZXJvSW5mby5zdGFydCgpO1xuICAgICAgICAgICAgdWkuaGVyb0luZm8udXBkYXRlKGluZm8pO1xuXG4gICAgICAgICAgICB1aS53YWl0U2NyZWVuLmhpZGUoKTtcblxuICAgICAgICAgICAgY29udHJvbGxlci5zdGFydCgpO1xuICAgICAgICAgICAgY29udHJvbGxlci5zZXRDbGlja1BhZChjYW1lcmEpO1xuXG4gICAgICAgICAgICAvL9CV0YHQu9C4INGC0LrRg9GJ0LDRjyDQutC+0LzQvdCw0YLQsCDQvtGC0YHRg9GC0YHRgtCy0YPQtdGCINC40LvQuCDQvdC1INGC0LAgLSDRiNC70LXQvCDQvdCwINGB0LXRgNCy0LXRgCDQt9Cw0L/RgNC+0YFcbiAgICAgICAgICAgIGlmKCFyb29tX2lkIHx8IHJvb21faWQgIT0gaW5mby5yb29tX2lkKSB7XG4gICAgICAgICAgICAgICAgcm9vbV9pZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmFkZCgnbmVlZC1yb29tJywgaW5mby5yb29tX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbWVyYSAmJiBjYW1lcmEuc2V0Rm9sbG93ZXIoaGVyby51bml0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0YHQvtC30LTQsNC90LjRjyDQk9C10YDQvtGPLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0LPQtdGA0L7QtVxuICAgIGlmKHR5cGU9PVwiaGVyby1pbmZvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNvaW5zX2NvdW50ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWwgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbHVwQ291bnRlciA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnNwZWVkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaGVyby51bml0LnNldChpbmZvKTtcblxuICAgICAgICAgICAgaGVyby5zcGVlZCA9IGluZm8uc3BlZWQ7XG5cbiAgICAgICAgICAgIHVpLmhlcm9JbmZvLnVwZGF0ZShpbmZvLCBpbmZvLklEKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L7QsdC90L7QstC70LXQvdC40Y8g0JPQtdGA0L7Rjy4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uU291bmQoZXZlbnQsIHR5cGUsIGRhdGEpIHtcbiAgICAvLyDQt9Cy0YPQutC+0LLRi9C1INGD0LLQtdC00L7QvNC70LXQvdC40Y9cbiAgICBpZih0eXBlPT1cIm5vdGljZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaGVybyAmJiBoZXJvLnVuaXQgJiYgaGVyby51bml0LnJvb21faWQgPT0gaW5mby5yb29tX2lkKSB7IC8vVE9ETzog0L3QtSDRjtC90LjRgiwg0LAg0LrQsNC80LXRgNCwXG4gICAgICAgICAgICAgICAgaWYoaW5mby5JRCBpbiBzb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiDQv9C+IGluZm8ueCwgaW5mby55INC+0L/RgNC10LTQtdC70Y/RgtGMINC60LDQuiDQtNCw0LvQtdC60L4g0L7RgiBoZXJvINC4INC00LXQu9Cw0YLRjCDQs9GA0L7QvNC60L7RgdGC0YxcbiAgICAgICAgICAgICAgICAgICAgc291bmRzW2luZm8uSURdLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC30LLRg9C60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqINCf0LXRgNC10LzQtdGJ0LXQvdC40LUg0L3QsCDQutC70LjQtdC90YLQtVxuICogINGC0L4sINGH0YLQviDQvdC1INGD0L/RgNCw0LLQu9GP0LXRgtGB0Y8g0YEg0YHQtdGA0LLQtdGA0LAuINCd0LDQv9GA0LjQvNC10YAg0LrQsNC80LXRgNCwXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuXG4gICAgLy/QmtCw0LzQtdGA0LBcbiAgICBjYW1lcmEgJiYgY2FtZXJhLnVwZGF0ZShyb29tKTtcblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goKGVudGl0eSwgaW5kZXgpPT57XG5cbiAgICAgICAgZW50aXR5LnVwZGF0ZSgpO1xuXG4gICAgICAgIC8v0KPQtNCw0LvQuNC8INC+0YLRgNCw0LHQvtGC0LDQstGI0LjQtSDRgdGD0YnQvdC+0YHRgtC4XG4gICAgICAgIGlmKGVudGl0eS5pc0RpZSgpKXtcbiAgICAgICAgICAgIGVudGl0aWVzLnJlbW92ZShpbmRleCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5cbi8qKlxuICog0JDQvdC40LzQsNGG0LjRj1xuICovXG5mdW5jdGlvbiBhbmltYXRlKCl7XG5cbiAgICAvL9Cu0L3QuNGC0YsgKNCy0LrQu9GO0YfQsNGPINGB0LDQvNC+0LPQviDQs9C10YDQvtGPKVxuICAgIGZvciAoY29uc3QgdW5pdCBvZiB1bml0cy50b0FycmF5KCkpIHtcbiAgICAgICAgaWYodW5pdC5yb29tX2lkPT1yb29tX2lkKSB7XG4gICAgICAgICAgICB1bml0LmFuaW1hdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v0JvRg9GCXG4gICAgZm9yIChsZXQgaSBpbiBsb290cykge1xuICAgICAgICBsb290c1tpXS5hbmltYXRlKGNvbnN0YW50cy5TVEVQKTtcbiAgICB9XG5cbiAgICAvL9Ci0LXQu9C10L/QvtGA0YLRi1xuICAgIGZvciAobGV0IGkgaW4gdGVsZXBvcnRzKSB7XG4gICAgICAgIHRlbGVwb3J0c1tpXS5hbmltYXRlKGNvbnN0YW50cy5TVEVQKTtcbiAgICB9XG5cbiAgICAvL9Ch0YPRidC90L7RgdGC0LhcbiAgICBlbnRpdGllcy5lYWNoKCAoZW50aXR5KSA9PiB7XG4gICAgICAgIGVudGl0eS5hbmltYXRlKCk7XG4gICAgfSk7XG5cbn1cblxuXG4vKipcbiAqINCe0YLRgNC40YHQvtCy0LrQsCDQvdCwINC60LDQvNC10YDRg1xuICogQHBhcmFtIGNhbWVyYVxuICogVE9ETzog0L/QvtGA0Y/QtNC+0Log0L7RgtGA0LjRgdC+0LLQutC4IVxuICovXG5mdW5jdGlvbiBkcmF3KGNhbWVyYSl7XG5cbiAgICAvLyDQmtC+0LzQvdCw0YLQsFxuICAgIHJvb20gJiYgcm9vbS5kcmF3KGNhbWVyYSk7XG5cbiAgICAvLyDQotC10LvQtdC/0L7RgNGC0YtcbiAgICBmb3IgKGxldCBpIGluIHRlbGVwb3J0cykge1xuICAgICAgICB0ZWxlcG9ydHNbaV0uZHJhdyhjYW1lcmEpO1xuICAgIH1cblxuXG4gICAgbGV0IHJlbmRlckFycmF5ID0gW107XG5cbiAgICAvLyDQm9GD0YJcbiAgICBmb3IgKGxldCBpIGluIGxvb3RzKSB7XG4gICAgICAgIGxldCBpdGVtID0gbG9vdHNbaV07XG4gICAgICAgIHJlbmRlckFycmF5LnB1c2goe3k6IGl0ZW0ueSwgaXRlbTogaXRlbX0pO1xuICAgIH1cblxuICAgIC8v0K7QvdC40YLRi1xuICAgIGZvciAobGV0IHVuaXQgb2YgdW5pdHMudG9BcnJheSgpKSB7XG4gICAgICAgIGlmKHVuaXQucm9vbV9pZD09cm9vbV9pZCkge1xuICAgICAgICAgICAgcmVuZGVyQXJyYXkucHVzaCh7eTogdW5pdC55LCBpdGVtOiB1bml0fSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL9Ch0YPRidC90L7RgdGC0LhcbiAgICBlbnRpdGllcy5lYWNoKCAoaXRlbSkgPT4ge1xuICAgICAgICByZW5kZXJBcnJheS5wdXNoKHt5OiBpdGVtLnksIGl0ZW06IGl0ZW19KTtcbiAgICB9KTtcblxuICAgIHJlbmRlckFycmF5LnNvcnQoKGEsIGIpPT57XG4gICAgICAgIHJldHVybiBhLnkgLSBiLnk7XG4gICAgfSk7XG5cbiAgICBmb3IobGV0IGkgaW4gcmVuZGVyQXJyYXkpe1xuICAgICAgICByZW5kZXJBcnJheVtpXS5pdGVtLmRyYXcoY2FtZXJhKTtcbiAgICB9XG5cbn1cblxuXG5cbi8qKlxuICog0KPRgdGC0LDQvdC+0LLQutCwINC+0YLQvtCx0YDQsNC20LDQtdC80L7QuSDQutC+0LzQvdCw0YLRi1xuICogQHBhcmFtIElEXG4gKiBAcGFyYW0gd2lkdGhcbiAqIEBwYXJhbSBoZWlnaHRcbiAqIEBwYXJhbSBlbnZpcm9ubWVudF9pZFxuICovXG5mdW5jdGlvbiByb29tSW5pdChzZXR0aW5ncyl7XG5cbiAgICAvL9CX0LDRh9C40YHRgtC40Lwg0LXRgdC70Lgg0L3QtSDQstC/0LXRgNCy0L7QuVxuICAgIGZvcihsZXQgaSBpbiBsb290cyl7IGRlbGV0ZSBsb290c1tpXTt9XG4gICAgZm9yKGxldCBpIGluIHRlbGVwb3J0cyl7IGRlbGV0ZSB0ZWxlcG9ydHNbaV07fVxuICAgIGxvb3RzID0ge307XG4gICAgdGVsZXBvcnRzID0ge307XG4gICAgcm9vbSA9IG51bGw7XG4gICAgZW50aXRpZXMucmVzZXQoKTtcblxuXG4gICAgcm9vbV9pZCA9IHNldHRpbmdzLklEO1xuXG4gICAgLy8g0KHQtNC10LvQsNC10Lwg0LrQvtC80L3QsNGC0YMg0LjQu9C4INCy0L7Qt9C80LXQvCDQuNC3INC60LXRiNCwXG4gICAgaWYoc2V0dGluZ3MuSUQgaW4gcm9vbXMpe1xuICAgICAgICByb29tID0gcm9vbXNbc2V0dGluZ3MuSURdO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByb29tID0gbmV3IFJvb20oc2V0dGluZ3Mud2lkdGgsIHNldHRpbmdzLmhlaWdodCwgc2V0dGluZ3MuZW52aXJvbm1lbnRfaWQsIHNldHRpbmdzLmVudGl0aWVzX251bSk7XG4gICAgICAgIHJvb21zW3NldHRpbmdzLklEXSA9IHJvb207XG4gICAgfVxuXG4gICAgaWYoJ2NhcnRvb25zJyBpbiBzZXR0aW5ncyl7XG4gICAgICAgIGZvcihjb25zdCBpdGVtIG9mIHNldHRpbmdzLmNhcnRvb25zKXtcbiAgICAgICAgICAgIGVudGl0aWVzLmFkZEZyb21TZXQoaXRlbS54LCBpdGVtLnksIGl0ZW0uc3ByaXRlc2V0X2lkLCBpdGVtLnNwcml0ZV9pZCwgMCwgTWF0aC5yYW5kb20oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZignbG9vdCcgaW4gc2V0dGluZ3Mpe1xuICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBzZXR0aW5ncy5sb290KXtcblxuICAgICAgICAgICAgbG9vdHNbaXRlbS5JRF0gPSBuZXcgTG9vdChyb29tX2lkLCBpdGVtLngsIGl0ZW0ueSwgaXRlbS5jaGFyYWN0ZXJfaWQsIGl0ZW0uSUQsIGl0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKCd0ZWxlcG9ydHMnIGluIHNldHRpbmdzKXtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2Ygc2V0dGluZ3MudGVsZXBvcnRzKXtcblxuICAgICAgICAgICAgdGVsZXBvcnRzW2l0ZW0uSURdID0gbmV3IFRlbGVwb3J0KHJvb21faWQsIGl0ZW0ueCwgaXRlbS55LCBpdGVtLmNoYXJhY3Rlcl9pZCwgaXRlbS5JRCwgaXRlbS50YXJnZXQsIGl0ZW0uc3RhdGUsIGl0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgY2hhcmFjdGVycyBmcm9tIFwiLi4vLi4vY2hhcmFjdGVyc1wiO1xuXG4vKipcbiAqIEBjbGFzcyBMb290XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXJfaWQsIElELCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLnJvb21faWQgPSByb29tX2lkO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChjaGFyYWN0ZXJfaWQpIHx8IGNoYXJhY3RlcnMuZ2V0KCdjb2luX2dvbGQnKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNwZWVkID0gMTQ7XG4gICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgfVxuXG4gICAgc2V0KHJvb21faWQsIHgsIHksIGNoYXJhY3Rlcl9pZCwgSUQpe1xuICAgICAgICB0aGlzLklEID0gSUQ7XG4gICAgICAgIHRoaXMucm9vbV9pZCA9IHJvb21faWQ7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVycy5nZXQoY2hhcmFjdGVyX2lkKSB8fCBjaGFyYWN0ZXJzLmdldCgnY29pbl9nb2xkJyk7XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHggPSAodGhpcy54LSh0aGlzLmNoYXJhY3Rlci53aWR0aC10aGlzLndpZHRoKS8yKSAtIGNhbWVyYS54LFxuICAgICAgICAgICAgeSA9ICh0aGlzLnktdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0K3RoaXMuaGVpZ2h0KSAtIGNhbWVyYS55O1xuXG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLmNoYXJhY3Rlci5kcmF3KGNhbWVyYS5jb250ZXh0LCB4LCB5LCB0aGlzLnN0YXRlLCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAvLyDQoNC40YHRg9C10Lwg0L/Rj9GC0L3QviDQutC+0LvQu9C40LfQuNC5XG4gICAgICAgIC8qY2FtZXJhLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwyNTUsNjcsMC40KVwiO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsUmVjdCh0aGlzLngtY2FtZXJhLngsIHRoaXMueS1jYW1lcmEueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVzdG9yZSgpOyovXG4gICAgfVxuXG4gICAgYW5pbWF0ZShzdGVwKXtcbiAgICAgICAgdGhpcy5mYXphICs9IHRoaXMuYW5pbWF0ZVNwZWVkICogc3RlcDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gTWF0aC5mbG9vcih0aGlzLmZhemEpO1xuXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8v0J3QsNGB0YLRgNC+0LnQutC4INGA0LDQvdC00L7QvNC90YvRhSDRhtCy0LXRgtC+0LIg0LrQvtC80L3QsNGC0YtcblxuaW1wb3J0IHNwcml0ZXMgZnJvbSBcIi4uLy4uL3Nwcml0ZXNcIjtcblxuY29uc3QgRU5WSVJPTk1FTlRTID0ge1xuICAgIDA6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAxMjAsIHJhbmQ6IDEwfSxcbiAgICAgICAgZzoge3N0YXJ0OiAxMjAsIHJhbmQ6IDE2fSxcbiAgICAgICAgYjoge3N0YXJ0OiAxMDAsIHJhbmQ6IDV9LFxuICAgICAgICAvLyBlbnRpdGllc1Nwcml0ZXM6IFwiZ3Jhc3NcIixcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImFuZHN0b25lc1wiLFxuICAgIH0sXG4gICAgMToge1xuICAgICAgICByOiB7c3RhcnQ6IDIzOSwgcmFuZDogMTZ9LFxuICAgICAgICBnOiB7c3RhcnQ6IDIxMCwgcmFuZDogMzN9LFxuICAgICAgICBiOiB7c3RhcnQ6IDEwMCwgcmFuZDogMjV9LFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiZGVzZXJ0XCIsXG4gICAgfSxcbiAgICAyOiB7XG4gICAgICAgIHI6IHtzdGFydDogMjEwLCByYW5kOiA0NX0sXG4gICAgICAgIGc6IHtzdGFydDogMzAsIHJhbmQ6IDc1fSxcbiAgICAgICAgYjoge3N0YXJ0OiAzMCwgcmFuZDogNzV9LFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiY29vbF9wbGFudHNcIixcbiAgICB9LFxuICAgIDM6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAxMCwgcmFuZDogMTJ9LFxuICAgICAgICBnOiB7c3RhcnQ6IDEzMCwgcmFuZDogMjB9LFxuICAgICAgICBiOiB7c3RhcnQ6IDIxMCwgcmFuZDogNDV9LFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiYnVzaHNcIixcbiAgICB9LFxuICAgIDQ6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAxNTAsIHJhbmQ6IDEyfSxcbiAgICAgICAgZzoge3N0YXJ0OiA5MCwgcmFuZDogMjB9LFxuICAgICAgICBiOiB7c3RhcnQ6IDQwLCByYW5kOiAxMn0sXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJ0cmVlc1wiLFxuICAgIH0sXG4gICAgNToge1xuICAgICAgICByOiB7c3RhcnQ6IDAsIHJhbmQ6IDMwfSxcbiAgICAgICAgZzoge3N0YXJ0OiAwLCByYW5kOiA1fSxcbiAgICAgICAgYjoge3N0YXJ0OiAwLCByYW5kOiA1fSxcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImRlYWRfcGxhbnRzXCIsXG4gICAgfSxcbn07XG4vKipcbiAqIEBjbGFzcyBSb29tXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBlbnZpcm9ubWVudF9pZCwgZW50aXRpZXNfbnVtKXtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudF9pZCA9IGVudmlyb25tZW50X2lkO1xuICAgICAgICB0aGlzLmVudGl0aWVzX251bSA9IGVudGl0aWVzX251bTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZSh0aGlzLmVudGl0aWVzX251bSk7XG4gICAgfVxuXG4gICAgcmFuZG9tQ1NTY29sb3IoZW52aXJvbm1lbnRfaWQpe1xuICAgICAgICBsZXQgZSA9IEVOVklST05NRU5UU1tlbnZpcm9ubWVudF9pZF07XG4gICAgICAgIGxldCByID0gZS5yLnN0YXJ0ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZS5yLnJhbmQgKSxcbiAgICAgICAgICAgIGcgPSBlLmcuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLmcucmFuZCksXG4gICAgICAgICAgICBiID0gZS5iLnN0YXJ0ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZS5iLnJhbmQpO1xuICAgICAgICByZXR1cm4gJ3JnYignK3IrJywnK2crJywnK2IrJyknO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKHRyZWVzX251bSl7XG4gICAgICAgIGNvbnN0IGN0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgdGlsZVdpZHRoID0gMjIsXG4gICAgICAgICAgICB0aWxlSGVpZ2h0ID0gMjI7XG4gICAgICAgIGN0eC5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICBjdHguY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IHJvd3MgPSBNYXRoLmZsb29yKHRoaXMud2lkdGgvdGlsZVdpZHRoKSArIDE7XG4gICAgICAgIGNvbnN0IGNvbHVtbnMgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0L3RpbGVIZWlnaHQpICsgMTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IHggPSAwLCBpID0gMDsgaSA8IHJvd3M7IHgrPXRpbGVIZWlnaHQsIGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDAsIGo9MDsgaiA8IGNvbHVtbnM7IHkrPXRpbGVXaWR0aCwgaisrKSB7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLnJhbmRvbUNTU2NvbG9yKHRoaXMuZW52aXJvbm1lbnRfaWQpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVudiA9IEVOVklST05NRU5UU1t0aGlzLmVudmlyb25tZW50X2lkXTtcblxuICAgICAgICBjb25zdCBzcHIgPSBzcHJpdGVzW2Vudi5lbnRpdGllc1Nwcml0ZXNdO1xuXG4gICAgICAgIC8v0KHQs9C10L3QtdGA0LjQvCDQtNC10YDQtdCy0YzRj1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPHRyZWVzX251bTsgaSsrKXtcblxuICAgICAgICAgICAgLy/QodC70YPRh9Cw0LnQvdCw0Y8g0L/Qu9C40YLQutCwINC40Lcg0L3QsNCx0L7RgNCwXG4gICAgICAgICAgICBsZXQgaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqc3ByLnN0YXRlcy5kZWZhdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHNwci5zdGF0ZXMuZGVmYXVsdFtpZF07XG5cbiAgICAgICAgICAgICAgICAvL9Ch0LvRg9GH0LDQudC90YvQtSDQutC+0L7RgNC00LjQvdCw0YLRi1xuICAgICAgICAgICAgbGV0IHh4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0aGlzLndpZHRoICsgdGlsZS53aWR0aCkvMTApKjEwIC0gdGlsZS53aWR0aDtcbiAgICAgICAgICAgIGxldCB5eSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodGhpcy5oZWlnaHQgKyB0aWxlLmhlaWdodCkvMTApKjEwIC0gdGlsZS5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgdyA9IHRpbGUud2lkdGgsIGggPSB0aWxlLmhlaWdodCwgc3ggPSB0aWxlLngsIHN5ID0gdGlsZS55O1xuXG5cbiAgICAgICAgICAgIC8v0J7QsdGA0LXQt9C60LAg0L/QviDQs9GA0LDQvdC40YbQsNC8INC60L7QvNC90LDRgtGLXG5cbiAgICAgICAgICAgIGlmKHh4IDwgdGhpcy53aWR0aCAmJiB4eCA+IC10aWxlLndpZHRoICYmIHl5IDwgdGhpcy5oZWlnaHQgJiYgeXkgPiAtdGlsZS5oZWlnaHQpIHtcblxuICAgICAgICAgICAgICAgIGlmKHh4IDwgMCl7dyArPSB4eDtzeCAtPSB4eDt4eCA9IDA7fVxuXG4gICAgICAgICAgICAgICAgaWYoeXkgPCAwKXtoICs9IHl5O3N5IC09IHl5O3l5ID0gMDt9XG5cbiAgICAgICAgICAgICAgICBpZiAoeHggPiB0aGlzLndpZHRoIC0gdGlsZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB3ID0gdGhpcy53aWR0aCAtIHh4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh5eSA+IHRoaXMuaGVpZ2h0IC0gdGlsZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaCA9IHRoaXMuaGVpZ2h0IC0geXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzcHIuaW1hZ2UsIHN4LCBzeSwgdywgaCwgeHgsIHl5LCB3LCBoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICAvLyDQodC+0YXRgNCw0L3QuNC8INC60LDRgNGC0LjQvdC60L7QuVxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gY3R4LmNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG5cbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG5cbiAgICAgICAgY2FtZXJhLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFN0eWxlID0gJyM5ZjhlNjAnO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsUmVjdCgwLCAwLCBjYW1lcmEud2lkdGgsIGNhbWVyYS5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgICAgIGlmKCF0aGlzLmltYWdlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyXG4gICAgICAgICAgICBzeCA9IDAsXG4gICAgICAgICAgICBzeSA9IDAsXG4gICAgICAgICAgICBzdyA9IHRoaXMud2lkdGgsXG4gICAgICAgICAgICBzaCA9IHRoaXMuaGVpZ2h0LFxuICAgICAgICAgICAgZHggPSAwLFxuICAgICAgICAgICAgZHkgPSAwLFxuICAgICAgICAgICAgZHcgPSBjYW1lcmEud2lkdGgsXG4gICAgICAgICAgICBkaCA9IGNhbWVyYS5oZWlnaHQ7XG5cbiAgICAgICAgaWYoY2FtZXJhLndpZHRoIDwgdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgc3ggPSBjYW1lcmEueDtcbiAgICAgICAgICAgIHN3ID0gY2FtZXJhLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvLyBkeCA9IC1jYW1lcmEueDtcbiAgICAgICAgICAgIGR4ID0gTWF0aC5mbG9vcigoY2FtZXJhLndpZHRoIC0gdGhpcy53aWR0aCkvMik7XG4gICAgICAgICAgICBkdyA9IHRoaXMud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjYW1lcmEuaGVpZ2h0IDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHN5ID0gY2FtZXJhLnk7XG4gICAgICAgICAgICBzaCA9IGNhbWVyYS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vIGR5ID0gLWNhbWVyYS55O1xuICAgICAgICAgICAgZHkgPSBNYXRoLmZsb29yKChjYW1lcmEuaGVpZ2h0IC0gdGhpcy5oZWlnaHQpLzIpO1xuICAgICAgICAgICAgZGggPSB0aGlzLmhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xuICAgIH1cbn0iLCJpbXBvcnQgY2hhcmFjdGVycyBmcm9tIFwiLi4vLi4vY2hhcmFjdGVyc1wiO1xuXG4vKipcbiAqIEBjbGFzcyBUZWxlcG9ydFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iocm9vbV9pZCwgeCwgeSwgY2hhcmFjdGVyX2lkLCBJRCwgdGFyZ2V0LCBzdGF0ZSwgd2lkdGgsIGhlaWdodCl7XG4gICAgICAgIHRoaXMuSUQgPSBJRDtcbiAgICAgICAgdGhpcy5yb29tX2lkID0gcm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVycy5nZXQoY2hhcmFjdGVyX2lkKSB8fCBjaGFyYWN0ZXJzLmdldCgndGVsZXBvcnQnKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDtcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcblxuICAgICAgICB0aGlzLnRhcmdldCA9IHtcbiAgICAgICAgICAgIHJvb21faWQ6IHRhcmdldC5yb29tX2lkLFxuICAgICAgICAgICAgeDogdGFyZ2V0LngsXG4gICAgICAgICAgICB5OiB0YXJnZXQueVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHN0YXRlKXtcblxuICAgICAgICBpZih0aGlzLnN0YXRlICE9PSBzdGF0ZSl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0J1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gKHRoaXMueC0odGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMikgLSBjYW1lcmEueCxcbiAgICAgICAgICAgIHkgPSAodGhpcy55LXRoaXMuY2hhcmFjdGVyLmhlaWdodCt0aGlzLmhlaWdodCkgLSBjYW1lcmEueTtcblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJhY3Rlci5kcmF3KGNhbWVyYS5jb250ZXh0LCB4LCB5LCB0aGlzLnN0YXRlLCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAvLyDQoNC40YHRg9C10Lwg0L/Rj9GC0L3QviDQutC+0LvQu9C40LfQuNC5XG4gICAgICAgIC8qY2FtZXJhLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwyNTUsNjcsMC40KVwiO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsUmVjdCh0aGlzLngtY2FtZXJhLngsIHRoaXMueS1jYW1lcmEueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVzdG9yZSgpOyovXG4gICAgfVxuXG4gICAgYW5pbWF0ZShzdGVwKXtcbiAgICAgICAgdGhpcy5mYXphICs9IHRoaXMuYW5pbWF0ZVNwZWVkICogc3RlcDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gTWF0aC5mbG9vcih0aGlzLmZhemEpO1xuXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uLy4uL2V2ZW50c1wiO1xuXG4vKipcbiAqINCe0LrQvdC+INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wLCB1cGRhdGV9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLINCyINC60L7RgtC+0YDRi9C1INC/0L7QutCw0LbQtdC8INC40L3RhNC+0YDQvNCw0YbQuNGOINC+INCz0LXRgNC+0LUv0LjQs9GA0LVcblxuY29uc3QgaGVyb19pbmZvRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyby1wYW5lbFwiKTtcbmNvbnN0IGhlcm9fbmFtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm8tbmFtZVwiKTtcbmNvbnN0IHNjb3JlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29pbnNfY291bnRcIik7XG5jb25zdCBsZXZlbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9fbGV2ZWxcIik7XG5jb25zdCBsZXZlbHVwY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9fbGV2ZWx1cGNvdW50ZXJcIik7XG5jb25zdCBzcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9fc3BlZWRcIik7XG5jb25zdCBoZWFsdGhFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX2hlYWx0aFwiKTtcblxuXG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGhlcm9faW5mb0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkNsaWNrLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBzdG9wKCl7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkNsaWNrLCBmYWxzZSk7XG59XG5cblxuZnVuY3Rpb24gb25DbGljayhlKXtcblxuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgICBpZih0YXJnZXQuaWQgJiYgdGFyZ2V0LmlkPT09XCJzaWdub3V0X2J1dHRvblwiKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vaWYoY29uZmlybShcItCi0L7Rh9C90L4g0LLRi9C50YLQuD9cIikpe1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2lnbm91dCcsIG51bGwpO1xuICAgICAgICAvL31cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0L7QutCw0Lcg0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LPQtdGA0L7QtVxuICogQHBhcmFtIGluZm9cbiAqIEBwYXJhbSBsb2dpblxuICovXG5mdW5jdGlvbiB1cGRhdGUoaW5mbyl7XG4gICAgaGVyb19uYW1lRWxlbWVudCAmJiAoaGVyb19uYW1lRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLm5hbWUpO1xuICAgIHNjb3JlRWxlbWVudCAmJiAoc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IGluZm8uY29pbnNfY291bnQpO1xuICAgIGxldmVsRWxlbWVudCAmJiAobGV2ZWxFbGVtZW50LmlubmVyVGV4dCA9IGluZm8ubGV2ZWwpO1xuICAgIHNwZWVkRWxlbWVudCAmJiAoc3BlZWRFbGVtZW50LmlubmVyVGV4dCA9IGluZm8uc3BlZWQpO1xuICAgIGxldmVsdXBjb3VudGVyRWxlbWVudCAmJiAobGV2ZWx1cGNvdW50ZXJFbGVtZW50LmlubmVyVGV4dCA9IGluZm8ubGV2ZWx1cFZhbHVlIC0gaW5mby5sZXZlbHVwQ291bnRlcik7XG4gICAgaGVhbHRoRWxlbWVudCAmJiAoaGVhbHRoRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmhlYWx0aClcbn0iLCJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi9ldmVudHNcIjtcblxuXG4vKipcbiAqINCj0LzQtdC90LjRjyAvINGN0YTRhNC10LrRgtGLXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcH1cblxuXG4vLyBodG1sLdC10LvQtdC80LXQvdGC0YtcblxuY29uc3Qgc2tpbGxzUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxscy1wYW5lbFwiKTtcblxuY29uc3Qgc2tpbGxzRWxlbWVudHMgPSB7XG4gICAgc2tpbGwxOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsMVwiKSxcbiAgICBza2lsbDI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwyXCIpLFxuICAgIHNraWxsMzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDNcIiksXG4gICAgc2tpbGw0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsNFwiKSxcbiAgICBza2lsbDU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw1XCIpLFxuICAgIHNraWxsNjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDZcIiksXG4gICAgc2tpbGw3OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsN1wiKSxcbiAgICBza2lsbDg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw4XCIpLFxuICAgIHNraWxsOTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDlcIiksXG4gICAgc2tpbGwxMDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDEwXCIpLFxufTtcbmNvbnN0IGFsbFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGxcIik7XG5cblxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICAvL9Cf0L7QutCw0LbQtdC8XG4gICAgc2tpbGxzUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBza2lsbHNQYW5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG4gICAgc2tpbGxzUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcblxuICAgIC8v0JXRgdC70Lgg0YHQvNC10L3QsCDRg9C80LXQvdC40Y8gLSDRgdC80LXQvdC40LxcbiAgICBldmVudHMub24oJ3NraWxsLWNoYW5nZScsIChldmVudE5hbWUsSUQpPT5zZWxlY3RTa2lsbChJRCkpO1xuXG5cbiAgICAvL9Ce0LHQvdC+0LLQu9C10L3QuNC1INC40LrQvtC90L7QuiDQuCDQs9C+0YLQvtCy0L3QvtGB0YLQuCDRg9C80LXQvdC40LlcbiAgICBldmVudHMub24oJ3NraWxscycsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpPT57XG4gICAgICAgIGlmKHR5cGU9PT0ndXBkYXRlJyl7XG4gICAgICAgICAgICBmb3IoY29uc3Qgc2tpbGxfaWQgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChza2lsbHNFbGVtZW50c1tza2lsbF9pZF0pIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2tpbGwgPSBza2lsbHNFbGVtZW50c1tza2lsbF9pZF07XG5cbiAgICAgICAgICAgICAgICAgICAgLy/QmNC60L7QvdC60LAg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQsNGPINGD0LzQtdC90LjRjlxuICAgICAgICAgICAgICAgICAgICBsZXQgaWNvbkVsZW1lbnQgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuc2tpbGwtaWNvbicpO1xuICAgICAgICAgICAgICAgICAgICAvL1wi0JLQtdC60L5cIiDRg9C80LXQvdC40Y9cbiAgICAgICAgICAgICAgICAgICAgbGV0IHZla29FbGVtZW50ID0gc2tpbGwucXVlcnlTZWxlY3RvcignLnZla28nKTtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NOYW1lPVwiXCI7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NraWxsLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChkYXRhW3NraWxsX2lkXS5pY29uKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IHZla29FbGVtZW50LmNsYXNzTGlzdDtcblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2xhc3NMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoY2xhc3NMaXN0Lml0ZW0oMCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NMaXN0LmFkZChcInZla29cIik7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoXCJ2YWx1ZVwiICsgTWF0aC5mbG9vcihkYXRhW3NraWxsX2lkXS52YWx1ZSAvIDEwKSAqIDEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBza2lsbHNQYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHNraWxsc1BhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbk1vdXNlVXAsIGZhbHNlKTtcbiAgICBza2lsbHNQYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5cbmZ1bmN0aW9uIHNlbGVjdFNraWxsKElEKSB7XG4gICAgaWYoc2tpbGxzRWxlbWVudHNbSURdKXtcbiAgICAgICAgYWxsU2tpbGxzLmZvckVhY2goc2tpbGwgPT4gc2tpbGwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XG4gICAgICAgIHNraWxsc0VsZW1lbnRzW0lEXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIG9uTW91c2VEb3duKGUpe1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgICBpZihcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsLWljb25cIikgfHxcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInZla29cIikpe1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBpZihcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNraWxsXCIpXG4gICAgKXtcbiAgICAgICAgaWYoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgdGFyZ2V0LmlkKTtcblxuICAgICAgICB9XG4gICAgICAgIGV2ZW50cy5hZGQoXCJrZXlkb3duXCIsIFwiZmlyZVwiKTtcbiAgICB9XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8v0J/QviBtb3VzZXVwXG5mdW5jdGlvbiBvbk1vdXNlVXAoZSl7XG5cbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1pY29uXCIpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZWtvXCIpKXtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaWYoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbFwiKVxuICAgICl7XG4gICAgICAgIGV2ZW50cy5hZGQoXCJrZXl1cFwiLCBcImZpcmVcIik7XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4iLCJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi9ldmVudHNcIjtcblxubGV0IGFjdGl2ZSA9IGZhbHNlO1xuXG5cbi8qKlxuICog0J7QutC90L4g0KLQntCfLTEwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcCwgaXNBY3RpdmUsIHNob3csIGhpZGV9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLINCyINC60L7RgtC+0YDRi9C1INC/0L7QutCw0LbQtdC8INC40L3RhNC+0YDQvNCw0YbQuNGOXG5cbmNvbnN0IHRvcDEwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wMTAtcGFuZWxcIik7XG5jb25zdCB0b3AxMENvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3AxMC1wYW5lbC1jb250ZW50XCIpO1xuXG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgdG9wMTBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkNsaWNrLCBmYWxzZSk7XG5cbiAgICBldmVudHMub24oXCJrZXl1cFwiLCAoZXZlbnROYW1lLCBrZXlDb2RlKT0+e1xuICAgICAgICBpZihrZXlDb2RlPT09XCJzdGF0aXN0aWNcIil7XG4gICAgICAgICAgICBpZihpc0FjdGl2ZSgpKXtcbiAgICAgICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uKFwic2VydmVyXCIsIHVwZGF0ZSk7XG5cbn1cbmZ1bmN0aW9uIHN0b3AoKXtcbiAgICB0b3AxMEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uQ2xpY2ssIGZhbHNlKTtcbiAgICBldmVudHMub2ZmKFwic2VydmVyXCIsIHVwZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHNob3coKSB7XG4gICAgdG9wMTBFbGVtZW50LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICBhY3RpdmUgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgIHRvcDEwRWxlbWVudC5zdHlsZS5yaWdodCA9ICctMTk2cHgnO1xufVxuXG5mdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gYWN0aXZlO1xufVxuXG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSl7XG5cbiAgICBpZiAoaXNBY3RpdmUoKSkge1xuICAgICAgICBoaWRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KCk7XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5cbi8qKlxuICog0J/QvtC60LDQtyDQuNC90YTQvtGA0LzQsNGG0LjQuFxuICovXG5mdW5jdGlvbiB1cGRhdGUoZXZlbnROYW1lLCB0eXBlLCBkYXRhKSB7XG4gICAgaWYodHlwZT09PVwic3RhdGlzdGljXCIpe1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGRhdGEuaW5mbykpe1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSAnJztcbiAgICAgICAgICAgIGRhdGEuaW5mby5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICAgICAgLy9sb2cocGxheWVyLklEICsgJyAtICcgKyBwbGF5ZXIubGV2ZWwpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgKz0gJ1xcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+JytwbGF5ZXIuSUQgKyAnOjwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiaGVyb19zcGVlZFwiIGNsYXNzPVwidmFsdWVcIj4nK3BsYXllci5zY29yZSsnPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbic7XG4gICAgICAgICAgICAgICAgdG9wMTBDb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLyoqXG4gKiDQmNC90YLQtdGA0YTQtdC50YEg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXG4gKi9cblxuXG4vLyDQntC60L3QviDQotC+0L8tMTBcbmltcG9ydCB0b3AxMCBmcm9tICcuL3RvcDEwJ1xuLy8g0J7QutC90L4g0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LPQtdGA0L7QtVxuaW1wb3J0IGhlcm9JbmZvIGZyb20gJy4vaGVyb2luZm8uanMnXG4vLyDQn9Cw0L3QtdC70Ywg0YPQvNC10L3QuNC5XG5pbXBvcnQgc2tpbGxzIGZyb20gJy4vc2tpbGxzLmpzJ1xuLy8g0K3QutGA0LDQvSDQt9Cw0LPRgNGD0LfQutC4XG5pbXBvcnQgd2FpdFNjcmVlbiBmcm9tICcuL3dhaXRzY3JlZW4nXG5cblxuZXhwb3J0IGRlZmF1bHQge2hlcm9JbmZvLCBza2lsbHMsIHRvcDEwLCB3YWl0U2NyZWVufSIsIi8qKlxuICog0K3QutGA0LDQvSDQt9Cw0LPRgNGD0LfQutC4XG4gKi9cblxuXG5jb25zdCB3YWl0U2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ1wiKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7c2hvdywgaGlkZX1cblxuXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIHdhaXRTY3JlZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIHdhaXRTY3JlZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cbiIsIi8qKlxuICogQGNsYXNzIFVuaXRcbiAqXG4gKi9cbmltcG9ydCB7U1RFUH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcblxuY29uc3QgQ0hBUkFDVEVSX0RFRkFVTFQgPSAnYmxvbmQnO1xuXG5jb25zdCBNQVhfSEVBTFRIID0gMTAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0e1xuICAgIC8qKlxuICAgICAqINCa0L7QvdGB0YLRgNGD0LrRgtC+0YBcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGlzSGVybyl7XG5cbiAgICAgICAgaWYoaXNIZXJvKXtcbiAgICAgICAgICAgIHRoaXMuaXNIZXJvID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm9vbV9pZCA9IGRhdGEucm9vbV9pZDtcblxuICAgICAgICB0aGlzLnggPSBkYXRhLng7XG4gICAgICAgIHRoaXMueSA9IGRhdGEueTtcblxuICAgICAgICB0aGlzLndpZHRoID0gZGF0YS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkYXRhLmhlaWdodDtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGRhdGEuY2hhcmFjdGVyX2lkKSB8fCBjaGFyYWN0ZXJzLmdldChDSEFSQUNURVJfREVGQVVMVCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IGRhdGEuc3RhdGUgfHwgJ2RlZmF1bHQnO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcblxuICAgICAgICB0aGlzLmxldmVsID0gZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5jb2luc19jb3VudCA9IGRhdGEuY29pbnNfY291bnQ7XG4gICAgICAgIHRoaXMubGV2ZWx1cFZhbHVlID0gZGF0YS5sZXZlbHVwVmFsdWU7XG4gICAgICAgIHRoaXMubGV2ZWx1cENvdW50ZXIgPSBkYXRhLmxldmVsdXBDb3VudGVyO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoID0gZGF0YS5oZWFsdGg7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDsgLy9UT0RPOiDQstGL0L3QtdGB0YLQuCDQsiBjaGFyYWN0ZXJcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0Y7QvdC40YLQsFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgc2V0KGRhdGEpe1xuXG4gICAgICAgIHRoaXMucm9vbV9pZCA9IGRhdGEucm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0gZGF0YS54O1xuICAgICAgICB0aGlzLnkgPSBkYXRhLnk7XG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVycy5nZXQoZGF0YS5jaGFyYWN0ZXJfaWQpIHx8IGNoYXJhY3RlcnMuZ2V0KENIQVJBQ1RFUl9ERUZBVUxUKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZSAhPT0gZGF0YS5zdGF0ZSl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcblxuICAgICAgICB0aGlzLmxldmVsID0gZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5jb2luc19jb3VudCA9IGRhdGEuY29pbnNfY291bnQ7XG4gICAgICAgIHRoaXMubGV2ZWx1cFZhbHVlID0gZGF0YS5sZXZlbHVwVmFsdWU7XG4gICAgICAgIHRoaXMubGV2ZWx1cENvdW50ZXIgPSBkYXRhLmxldmVsdXBDb3VudGVyO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoID0gZGF0YS5oZWFsdGg7XG5cbiAgICB9XG5cbiAgICBhbmltYXRlKCl7XG4gICAgICAgIC8v0JDQvdC40LzQsNGG0LjRj1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBTVEVQO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gdGhpcy55IC0gY2FtZXJhLnk7XG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3U2hhZG93KGNhbWVyYS5jb250ZXh0LCB4LCB5KTtcblxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoY2FtZXJhLmNvbnRleHQsIHgsIHkpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQuNC80Y9cbiAgICAgICAgaWYodGhpcy5sZXZlbCE9dW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd05hbWUoY2FtZXJhLmNvbnRleHQsIHgsIHktNTUsIHRoaXMubmFtZSwgdGhpcy5sZXZlbCwgdGhpcy5pc0hlcm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JXRgdC70Lgg0LXRgdGC0YwgLSDRgNC40YHRg9C10Lwg0LjQvdC00LjQutCw0YLQvtGAXG4gICAgICAgIGlmKHRoaXMuaGVhbHRoIT11bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgbGV0IHZvbHVtZTtcblxuICAgICAgICAgICAgdm9sdW1lID0gTWF0aC5mbG9vcih0aGlzLmhlYWx0aCoxMDAvTUFYX0hFQUxUSCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd1ZvbHVtZShjYW1lcmEuY29udGV4dCwgeCwgeSAtIDUwLCB2b2x1bWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBkcmF3Q2hhcmFjdGVyKGNvbnRleHQsIHN4LCBzeSl7XG4gICAgICAgIGxldCB4ID0gc3ggLSAodGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMixcbiAgICAgICAgICAgIHkgPSBzeSAtICh0aGlzLmNoYXJhY3Rlci5oZWlnaHQtdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzeCwgc3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTsqL1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC40L3QtNC40LrQsNGC0L7RgFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGRyYXdWb2x1bWUoY29udGV4dCwgeCwgeSwgdmFsdWUpe1xuXG4gICAgICAgIGxldCB2b2x1bWVXaWR0aCA9IDUwO1xuICAgICAgICBsZXQgdm9sdW1lSGVpZ2h0ID0gNDtcbiAgICAgICAgbGV0IHZvbHVtZVggPSB4ICsgKHRoaXMud2lkdGggLSB2b2x1bWVXaWR0aCkvMjtcbiAgICAgICAgbGV0IHZvbHVtZVkgPSB5O1xuXG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCh2b2x1bWVYLCB2b2x1bWVZLCBNYXRoLmZsb29yKHZvbHVtZVdpZHRoKnZhbHVlLzEwMCksIHZvbHVtZUhlaWdodCk7XG4gICAgICAgIGNvbnRleHQucmVjdCh2b2x1bWVYLTEsIHZvbHVtZVktMSwgdm9sdW1lV2lkdGgrMiwgdm9sdW1lSGVpZ2h0KzIpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCg0LjRgdGD0LXQvCDQuNC80Y9cbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBzeFxuICAgICAqIEBwYXJhbSBzeVxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGxldmVsXG4gICAgICogQHBhcmFtIGlzSGVyb1xuICAgICAqL1xuICAgIGRyYXdOYW1lKGNvbnRleHQsIHN4LCBzeSwgbmFtZSwgbGV2ZWwsIGlzSGVybyl7XG5cbiAgICAgICAgbGV0IHBhZGRpbmdDb2xvciA9IFwicmdiYSgwLDAsMCwwLjMpXCI7XG4gICAgICAgIGlmKGlzSGVybyl7XG4gICAgICAgICAgICBwYWRkaW5nQ29sb3IgPSBcInJnYmEoMCwyMDAsNDAsMC40KVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgLy/QmNC80Y9cbiAgICAgICAgY29udGV4dC5mb250ID0gXCIxNHB4IHNhbnMtc2VyaWZcIjtcbiAgICAgICAgbGV0IHRleHRXaWR0aCA9IGNvbnRleHQubWVhc3VyZVRleHQobmFtZSkud2lkdGg7XG5cbiAgICAgICAgLy/Qo9GA0L7QstC10L3RjFxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcImJvbGQgMTJweCBBcmlhbFwiO1xuICAgICAgICBsZXQgdGV4dExldmVsV2lkdGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGxldmVsKS53aWR0aDtcblxuICAgICAgICAvL9Ch0YfQuNGC0LDQtdC8INGA0LDQt9C80LXRgNGLXG4gICAgICAgIGxldCBwYWRXaWR0aCA9IHRleHRXaWR0aCArIHRleHRMZXZlbFdpZHRoICsgMjtcblxuICAgICAgICBsZXQgbHggPSBzeCsodGhpcy53aWR0aCAtIHBhZFdpZHRoKS8yLFxuICAgICAgICAgICAgeCA9IGx4ICsgdGV4dExldmVsV2lkdGggKyAyLFxuICAgICAgICAgICAgbHkgPSBzeSxcbiAgICAgICAgICAgIHkgPSBzeTtcblxuXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gcGFkZGluZ0NvbG9yO1xuICAgICAgICBjb250ZXh0LmFyYyhseC0yLCB5LTEyKzE4LzIsIDE4LzIsIE1hdGguUEkvMiwgLU1hdGguUEkvMik7XG4gICAgICAgIGNvbnRleHQuYXJjKGx4LTIrcGFkV2lkdGgsIHktMTIrMTgvMiwgMTgvMiwgLU1hdGguUEkvMiwgTWF0aC5QSS8yKTtcbiAgICAgICAgY29udGV4dC5yZWN0KGx4LTIsIHktMTIsIHBhZFdpZHRoLCAxOCk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiMTRweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChuYW1lLHgseSk7XG5cbiAgICAgICAgY29udGV4dC5mb250ID0gXCJib2xkIDEycHggQXJpYWxcIjtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQobGV2ZWwsbHgsbHkpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuXG4gICAgZHJhd1NoYWRvdyhjb250ZXh0LCB4LCB5KXtcblxuICAgICAgICBsZXRcbiAgICAgICAgICAgIHNoYWRvd0NvbG9yMSA9IFwicmdiYSgwLDAsMCwwLjEpXCIsXG4gICAgICAgICAgICBzaGFkb3dDb2xvcjIgPSBcInJnYmEoMCwwLDAsMC4xNSlcIixcbiAgICAgICAgICAgIHNoYWRvd0NvbG9yMyA9IFwicmdiYSgwLDAsMCwwLjIpXCI7XG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzaGFkb3dDb2xvcjE7XG4gICAgICAgIGNvbnRleHQuZWxsaXBzZSh4ICsgdGhpcy53aWR0aC8yLCB5K3RoaXMuaGVpZ2h0LTIsIDIwLCAxMCwgMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzaGFkb3dDb2xvcjI7XG4gICAgICAgIGNvbnRleHQuZWxsaXBzZSh4ICsgdGhpcy53aWR0aC8yLCB5K3RoaXMuaGVpZ2h0LTIsIDE3LCA4LCAwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHNoYWRvd0NvbG9yMjtcbiAgICAgICAgY29udGV4dC5lbGxpcHNlKHggKyB0aGlzLndpZHRoLzIsIHkrdGhpcy5oZWlnaHQtMiwgMTUsIDcsIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IHtpdGVtLCBhZGQsIHJlbW92ZSwgcmVzZXQsIHRvQXJyYXl9XG5cblxuY29uc3QgdW5pdHMgPSB7fTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRjtC90LjRgiDQv9C+INC40LzQtdC90LhcbiAqIEBwYXJhbSBJRFxuICogQHJldHVybnMgVW5pdFxuICovXG5mdW5jdGlvbiBpdGVtKElEKSB7XG4gICAgcmV0dXJuIHVuaXRzW0lEXTtcbn1cblxuZnVuY3Rpb24gYWRkKElELCB1bml0KSB7XG4gICAgdW5pdHNbSURdID0gdW5pdDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKElEKSB7XG4gICAgaWYoSUQgaW4gdW5pdHMpIGRlbGV0ZSB1bml0c1tJRF07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgZGVsZXRlIHVuaXRzW2ldO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICBsZXQgdW5pdHNBcnJheSA9IFtdO1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgdW5pdHNBcnJheS5wdXNoKHVuaXRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXRzQXJyYXk7XG59XG4iLCJpbXBvcnQgYWNjb3VudCBmcm9tIFwiLi4vYWNjb3VudFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9O1xuXG5cbmNvbnN0IGxvZ2luX3BhbmVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcGFuZWxcIik7XG5jb25zdCBsb2dpbl9mb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tZm9ybVwiKTtcbmNvbnN0IGxvZ2luX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4taW5wdXRcIik7XG5jb25zdCBwYXNzd29yZF9pbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkLWlucHV0XCIpO1xuXG5cbmxldCBmaW5hbENhbGxiYWNrID0gbnVsbDtcblxubGV0XG4gICAgdGltZW91dCA9IG51bGwsXG4gICAgdGltZW91dF9wID0gbnVsbDtcblxuXG4vLyDQktGL0LLQtdC00LXQvCDQvtC60L3QviDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LiDQnNC+0LTQsNC70YzQvdC+0LVcbmZ1bmN0aW9uIHN0YXJ0KGNhbGxiYWNrKSB7XG5cbiAgICBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAvL9Cf0L7Qu9GD0YfQuNC8INC40Lcg0LvQvtC60LDQuyDRgdGC0L7RgNCwXG4gICAgbGV0IHVzZXJBY2NvdW50ID0gYWNjb3VudC5nZXQoKTtcblxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0YwgLSDQvtC6XG4gICAgaWYodXNlckFjY291bnQpIHtcbiAgICAgICAgZmluYWxDYWxsYmFjayh1c2VyQWNjb3VudCk7XG4gICAgfVxuICAgIC8v0LjQvdCw0YfQtSAtINC30LDQv9GA0L7RgdC40LxcbiAgICBlbHNle1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleXVwSGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgIHNob3coKTtcblxuICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgXG59XG5cblxuLy8g0JfQsNC60YDQvtC10Lwg0L7QutC90L4g0LDQstGC0L7RgNC40LfQsNGG0LjQuFxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleXVwSGFuZGxlciwgZmFsc2UpO1xuICAgIGhpZGUoKTtcbn1cblxuXG4vLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LDQstC40YhcbmZ1bmN0aW9uIGtleXVwSGFuZGxlcihlKSB7XG4gICAgbGV0IG9iaiA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBsZXQga2V5ID0gZS5rZXlDb2RlO1xuXG4gICAgLy/QldGB0LvQuCBFbnRlciDQuCDQsdC10Lcg0L/RgNC+0LHQu9C10LxcbiAgICBpZihrZXk9PT0xMyAmJiB2YWxpZGF0ZShsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWUsIHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZSkpe1xuXG4gICAgICAgIHN0b3AoKTtcbiAgICAgICAgLy8g0J/QvtC70YPRh9C40LIg0YHQvtGF0YDQsNC90LjQvFxuICAgICAgICBjb25zdCBhY2NvdW50RGF0YSA9IHtsb2dpbjogbG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRfaW5wdXRFbGVtZW50LnZhbHVlfTtcbiAgICAgICAgYWNjb3VudC5zZXQoYWNjb3VudERhdGEpO1xuICAgICAgICBcbiAgICAgICAgZmluYWxDYWxsYmFjayhhY2NvdW50RGF0YSk7XG5cbiAgICB9XG4gICAgLy/QldGB0LvQuCDRgtCw0LEgLSDQv9C+LdGD0LzQvtC70YfQsNC90LjRjlxuICAgIGVsc2UgaWYgKGtleT09PTkpe1xuXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoXG4gICAgICAgIC8v0YHQuNC80LLQvtC70Ysg0YDQsNC30YDQtdGI0LXQvdC90YvQtSDQsiDQu9C+0LPQuNC90LVcbiAgICAvXlthLXpBLVowLTkgKy5cXC1fOlwiKCldKj8kLy50ZXN0KG9iai52YWx1ZSkgJiZcbiAgICBvYmoudmFsdWUubGVuZ3RoIDwgMTAgLy8g0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPINC00LvQuNC90LAg0LvQvtCz0LjQvdCwXG4gICAgKSB7XG4gICAgICAgIG9iai5kZWZhdWx0VmFsdWUgPSBvYmoudmFsdWU7XG5cbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRjYjRhJztcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBvYmoudmFsdWUgPSBvYmouZGVmYXVsdFZhbHVlO1xufVxuXG4vLyDQn9GA0L7QstC10YDQutCwINCy0LLQtdC00LXQvdC90L7Qs9C+INC4INC40L3QtNC40LrQsNGG0LjRjyDQvtGI0LjQsdC60LhcbmZ1bmN0aW9uIHZhbGlkYXRlKGxvZ2luLCBwYXNzd29yZCkge1xuXG4gICAgaWYobG9naW4ubGVuZ3RoPT09MCkge1xuICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmYwMDA4JztcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNGNiNGEnO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHBhc3N3b3JkLmxlbmd0aD09PTApIHtcbiAgICAgICAgcGFzc3dvcmRfaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmMDAwOCc7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0X3ApO1xuICAgICAgICB0aW1lb3V0X3AgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y0Y2I0YSc7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5cbi8vINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutC+0LJcbmZ1bmN0aW9uIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuXG4gICAgLy8g0JXRgdC70Lgg0L3QsNC20LDQu9C4IFwi0JLQvtC50YLQuFwiINC4INC70L7Qs9C40L0g0L3QvtGA0LwgLSDQt9Cw0L/Rg9GB0YLQuNC8INGE0YPQvdC60YbQuNGOINCy0YXQvtC00LBcbiAgICBpZih0YXJnZXQuaWQ9PT0nbG9naW4tYnV0dG9uJyAmJiB2YWxpZGF0ZShsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWUsIHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZSkpe1xuXG4gICAgICAgIHN0b3AoKTtcblxuICAgICAgICBjb25zdCBhY2NvdW50RGF0YSA9IHtsb2dpbjogbG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRfaW5wdXRFbGVtZW50LnZhbHVlfTtcbiAgICAgICAgYWNjb3VudC5zZXQoYWNjb3VudERhdGEpO1xuXG4gICAgICAgIGZpbmFsQ2FsbGJhY2soYWNjb3VudERhdGEpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRhcmdldC5pZD09PSdsb2dpbi1pbnB1dCcgfHwgdGFyZ2V0LmlkPT09J3Bhc3N3b3JkLWlucHV0Jyl7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZT09PScnKSB7XG4gICAgICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZT09PScnKXtcbiAgICAgICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8v0J/QvtC60LDQt9Cw0YLRjCDQvtC60L3QviDQstGF0L7QtNCwXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIGxvZ2luX3BhbmVsRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBsb2dpbl9mb3JtRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuLy/RgdC60YDRi9GC0Ywg0L7QutC90L4g0LLRhdC+0LTQsFxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBsb2dpbl9wYW5lbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsb2dpbl9mb3JtRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSIsImltcG9ydCBTb3VuZCBmcm9tIFwiLi9lbmdpbmUvc291bmQuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIFwibGV2ZWxfdXBcIjogbmV3IFNvdW5kKCdzb3VuZC9jYXNoLm1wMycpLFxuICAgIFwibnBjX2VhdF9jb2luXCI6IG5ldyBTb3VuZCgnc291bmQvY29pbi9jb2luMy53YXYnKSxcbiAgICBcImVhdF9jb2luX2dvbGRcIjogbmV3IFNvdW5kKCdzb3VuZC9jb2luL2NvaW4ud2F2JyksXG4gICAgXCJlYXRfY29pbl9zaWx2ZXJcIjogbmV3IFNvdW5kKCdzb3VuZC9jb2luL2VhdDIubXAzJyksXG4gICAgXCJlYXRfY29pbl9jb3BwZXJcIjogbmV3IFNvdW5kKCdzb3VuZC9jb2luL2VhdDEubXAzJyksXG4gICAgXCJ0ZWxlcG9ydFwiOiBuZXcgU291bmQoJ3NvdW5kL3RlbGVwb3J0L2ZsYXVuY2gud2F2JyksXG4gICAgXCJwdXNoLWVmZmVjdFwiOiBuZXcgU291bmQoJ3NvdW5kL2hpdC9kcm9wTGVhdGhlci5vZ2cnKSxcbn0iLCIvKipcbiAqINCh0L/RgNCw0LnRgtGLXG4gKi9cblxuLy/QmtCw0YDRgtC40L3QutC4XG5sZXQgc19kb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19kb2MnKSxcbiAgICBzX3Byb2YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19wcm9mJyksXG4gICAgc19nb2IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19nb2InKSxcbiAgICBzX2dpcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19naXJsJyksXG4gICAgc19ibG9uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jsb25kJyksXG4gICAgc19tYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19tYWcnKSxcbiAgICBzX3RlbGVwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfdGVsZXBvcnQnKSxcbiAgICBzX2NvaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY29pbnMnKSxcbiAgICB0X3RyZWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfdHJlZXMnKSxcbiAgICB0X2J1c2hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfYnVzaHMnKSxcbiAgICB0X3BsYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X3BsYW50cycpLFxuICAgIHNfcG9pbnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3BvaW50ZXInKSxcbiAgICBzX2Jvb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19ib29tJyksXG4gICAgc19ib29tMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20xJyksXG4gICAgc19ib29tMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20yJyksXG4gICAgc19iYXJpZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19iYXJpZXInKSxcbiAgICBzX3B1c2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19wdXNoJyksXG4gICAgc19jcnlzdGFscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2NyeXN0YWxzJyksXG4gICAgc19za2VsZXRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3NrZWxldG9uJyksXG4gICAgc19rYXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfa2F0eScpLFxuICAgIHNfbGV2b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19sZXZvbicpLFxuICAgIHNfdml0YWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfdml0YWx5JyksXG4gICAgdF9jb29sX3BsYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X2Nvb2xfcGxhbnRzJyksXG4gICAgdF9hbmRzdG9uZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndF9hbmRzdG9uZXMnKTtcblxuXG4vKipcbiAqINCU0L7QutGC0L7RgFxuICovXG5leHBvcnRzLmRvYyA9IHtcbiAgICBcImltYWdlXCI6IHNfZG9jLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MzXCIsIFwieFwiOiAzMiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzJcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9XG4gICAgICAgIF1cbiAgICB9XG5cbn07XG5cblxuLyoqXG4gKiDQn9GA0L7RhNC10YHRgdC+0YBcbiAqL1xuZXhwb3J0cy5wcm9mID0ge1xuICAgIFwiaW1hZ2VcIjogc19wcm9mLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwiaWRsZVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInJ1bjFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNVwiLCBcInhcIjogMzIwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNlwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuN1wiLCBcInhcIjogNDQ4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuOFwiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cblxufTtcblxuXG4vKipcbiAqINCT0L7QsdC70LjQvVxuICovXG5leHBvcnRzLmdvYiA9IHtcbiAgICBcImltYWdlXCI6IHNfZ29iLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2IxXCIsIFwieFwiOiAxMzAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjJcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iM1wiLCBcInhcIjogMCwgXCJ5XCI6IDY1LCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNFwiLCBcInhcIjogNjUsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNVwiLCBcInhcIjogNjUsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjZcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I3XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICBdXG4gICAgfVxuXG59O1xuXG5cbi8qKlxuICog0JTQtdCy0L7Rh9C60LBcbiAqL1xuZXhwb3J0cy5naXJsID0ge1xuICAgIFwiaW1hZ2VcIjogc19naXJsLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmwzXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDZcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsOVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQkdC70L7QvdC00LjQvVxuICovXG5leHBvcnRzLmJsb25kID0ge1xuICAgIFwiaW1hZ2VcIjogc19ibG9uZCxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDhcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LDQs1xuICovXG5leHBvcnRzLm1hZyA9IHtcbiAgICBcImltYWdlXCI6IHNfbWFnLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWcxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWcxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCX0L7Qu9C+0YLQsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fZ29sZCA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkMVwiLCBcInhcIjogMjI0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDNcIiwgXCJ4XCI6IDMyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQ1XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDdcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDhcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KHQtdGA0LXQsdGA0Y/QvdC90LDRjyDQvNC+0L3QtdGC0LBcbiAqL1xuZXhwb3J0cy5jb2luX3NpbHZlciA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXIxXCIsIFwieFwiOiAwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXIyXCIsIFwieFwiOiAyMjQsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjNcIiwgXCJ4XCI6IDMyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyNVwiLCBcInhcIjogOTYsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyN1wiLCBcInhcIjogMTYwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI4XCIsIFwieFwiOiAxOTIsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXQtNC90LDRjyDQvNC+0L3QtdGC0LBcbiAqL1xuZXhwb3J0cy5jb2luX2NvcHBlciA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXIxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjJcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjRcIiwgXCJ4XCI6IDk2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjVcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXI2XCIsIFwieFwiOiAxNjAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyN1wiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjhcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuXG4vKipcbiAqINCi0YDQsNCy0LBcbiAqL1xuZXhwb3J0cy5ncmFzcyA9IHtcbiAgICBcImltYWdlXCI6IHRfdHJlZXMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NlwiLCBcInhcIjogMjE4LCBcInlcIjogOTEsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQlNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLnRyZWVzID0ge1xuICAgIFwiaW1hZ2VcIjogdF90cmVlcyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAxXCIsIFwieFwiOiAzMTMsIFwieVwiOiAxMzQsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAyXCIsIFwieFwiOiAwLCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQ0LCBcImhlaWdodFwiOiA0Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8wM1wiLCBcInhcIjogMzEzLCBcInlcIjogMjcyLCBcIndpZHRoXCI6IDY4LCBcImhlaWdodFwiOiA2OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8wNFwiLCBcInhcIjogMzEzLCBcInlcIjogNjUsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA1XCIsIFwieFwiOiAyNDQsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNTQsIFwiaGVpZ2h0XCI6IDU0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA2XCIsIFwieFwiOiA0NTIsIFwieVwiOiAzNDAsIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA3XCIsIFwieFwiOiA0NTIsIFwieVwiOiAxODEsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDU4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA4XCIsIFwieFwiOiAzMTMsIFwieVwiOiAzNDEsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDUyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA5XCIsIFwieFwiOiA4NiwgXCJ5XCI6IDQ1OSwgXCJ3aWR0aFwiOiA0MCwgXCJoZWlnaHRcIjogNDB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMTBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDY2LCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMVwiLCBcInhcIjogNDUyLCBcInlcIjogMjQwLCBcIndpZHRoXCI6IDQ3LCBcImhlaWdodFwiOiA1Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMlwiLCBcInhcIjogNDA1LCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDQ2LCBcImhlaWdodFwiOiA0OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xM1wiLCBcInhcIjogMTI3LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNFwiLCBcInhcIjogNDUyLCBcInlcIjogMzg5LCBcIndpZHRoXCI6IDQ2LCBcImhlaWdodFwiOiA0NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNVwiLCBcInhcIjogMzg0LCBcInlcIjogMTMzLCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNlwiLCBcInhcIjogNDUyLCBcInlcIjogMjkzLCBcIndpZHRoXCI6IDQ4LCBcImhlaWdodFwiOiA0Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xN1wiLCBcInhcIjogNDUyLCBcInlcIjogMTIyLCBcIndpZHRoXCI6IDU0LCBcImhlaWdodFwiOiA1OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xOFwiLCBcInhcIjogMzEzLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMTlcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDYwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIwXCIsIFwieFwiOiAyOTksIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNTIsIFwiaGVpZ2h0XCI6IDU0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIxXCIsIFwieFwiOiAzODQsIFwieVwiOiAyNjcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDYwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIyXCIsIFwieFwiOiA0NTIsIFwieVwiOiA2MSwgXCJ3aWR0aFwiOiA1NCwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjNcIiwgXCJ4XCI6IDI0NSwgXCJ5XCI6IDMxMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjRcIiwgXCJ4XCI6IDQ1LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQwLCBcImhlaWdodFwiOiA0Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNVwiLCBcInhcIjogMCwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNjJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjZcIiwgXCJ4XCI6IDIxOCwgXCJ5XCI6IDE4MiwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNTB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjdcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDMyOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNjJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjhcIiwgXCJ4XCI6IDIzNywgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNzB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjlcIiwgXCJ4XCI6IDM1MiwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1MiwgXCJoZWlnaHRcIjogNTJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDIwMCwgXCJ3aWR0aFwiOiA2NiwgXCJoZWlnaHRcIjogNjZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzhcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDExMCwgXCJoZWlnaHRcIjogMTIwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzM5XCIsIFwieFwiOiAxMTEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEwNiwgXCJoZWlnaHRcIjogMTIwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQwXCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY3LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80MVwiLCBcInhcIjogMTYyLCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDgyLCBcImhlaWdodFwiOiA3Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80MlwiLCBcInhcIjogODcsIFwieVwiOiAyMzQsIFwid2lkdGhcIjogNzgsIFwiaGVpZ2h0XCI6IDc2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQzXCIsIFwieFwiOiAwLCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDg0LCBcImhlaWdodFwiOiA4Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NFwiLCBcInhcIjogMCwgXCJ5XCI6IDEyMSwgXCJ3aWR0aFwiOiAxMTAsIFwiaGVpZ2h0XCI6IDExMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NlwiLCBcInhcIjogMjE4LCBcInlcIjogOTEsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ3XCIsIFwieFwiOiAxMjIsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNjAsIFwiaGVpZ2h0XCI6IDU2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ4XCIsIFwieFwiOiA2MSwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDlcIiwgXCJ4XCI6IDE4MywgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTBcIiwgXCJ4XCI6IDE2NiwgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNzZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyMzQsIFwid2lkdGhcIjogODYsIFwiaGVpZ2h0XCI6IDc4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzUyXCIsIFwieFwiOiAzMTMsIFwieVwiOiAyMDMsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzUzXCIsIFwieFwiOiAxMTEsIFwieVwiOiAxMjEsIFwid2lkdGhcIjogOTQsIFwiaGVpZ2h0XCI6IDk4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzU0XCIsIFwieFwiOiAyMTgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDk0LCBcImhlaWdodFwiOiA5MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81NVwiLCBcInhcIjogODUsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDgyfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCU0LXRgNC10LLRjNGPINC4INC60YPRgdGC0YtcbiAqL1xuZXhwb3J0cy5idXNocyA9IHtcbiAgICBcImltYWdlXCI6IHRfYnVzaHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMTAzLCBcInlcIjogMTAwLCBcIndpZHRoXCI6IDI1LCBcImhlaWdodFwiOiAzMH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTAzLCBcInlcIjogNjAsIFwid2lkdGhcIjogMzAsIFwiaGVpZ2h0XCI6IDM5fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAxNTYsIFwieVwiOiAxMTksIFwid2lkdGhcIjogMTUsIFwiaGVpZ2h0XCI6IDEzfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAxMDMsIFwieVwiOiA0MCwgXCJ3aWR0aFwiOiAyMSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDEzNiwgXCJ5XCI6IDExOSwgXCJ3aWR0aFwiOiAxOSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEwMywgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDM5fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCf0YPRgdGC0YvQvdC90L7QtVxuICovXG5leHBvcnRzLmRlc2VydCA9IHtcbiAgICBcImltYWdlXCI6IHRfcGxhbnRzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDE5OCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyNywgXCJoZWlnaHRcIjogNTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAxOTgsIFwieVwiOiAyOTMsIFwid2lkdGhcIjogMzEsIFwiaGVpZ2h0XCI6IDMwfSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMjMzLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDc2LCBcImhlaWdodFwiOiA5Mn0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlMTZcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDIzOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogODd9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCh0YLRgNCw0L3QvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5iZWx3b29kID0ge1xuICAgIFwiaW1hZ2VcIjogdF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAxMDcsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTA4LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDg5LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDk1LCBcImhlaWdodFwiOiAxMTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIwXCIsIFwieFwiOiAyNDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyNiwgXCJoZWlnaHRcIjogMTE2fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCi0LXQu9C10L/QvtGA0YJcbiAqL1xuZXhwb3J0cy50ZWxlcG9ydCA9IHtcbiAgICBcImltYWdlXCI6IHNfdGVsZXBvcnQsXG4gICAgXCJ3aWR0aFwiOiA5MCxcbiAgICBcImhlaWdodFwiOiA0OSxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMVwiLCBcInhcIjogMCwgXCJ5XCI6IDQ5LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMCwgXCJ5XCI6IDk4LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogOTAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogOTAsIFwieVwiOiA0OSwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KPQutCw0LfQsNGC0LXQu9GMXG4gKi9cbmV4cG9ydHMucG9pbnRlciA9IHtcbiAgICBcImltYWdlXCI6IHNfcG9pbnRlcixcbiAgICBcIndpZHRoXCI6IDY0LFxuICAgIFwiaGVpZ2h0XCI6IDY0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAyMDEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiA0MDIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiA2MDMsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA4MDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyMDEsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDQwMiwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyMDEsIFwiaGVpZ2h0XCI6IDIwMX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogNjAzLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogODA0LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCS0LfRgNGL0LJcbiAqL1xuZXhwb3J0cy5ib29tID0ge1xuICAgIFwiaW1hZ2VcIjogc19ib29tLFxuICAgIFwid2lkdGhcIjogMTI4LFxuICAgIFwiaGVpZ2h0XCI6IDEyOCxcbiAgICBcInNwZWVkXCI6IDMwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA1MTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiA2NDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiA3NjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiA4OTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMlwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxM1wiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogNjQwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogNzY4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogODk2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxN1wiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjNcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI4XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI5XCIsIFwieFwiOiA1MTIsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMwXCIsIFwieFwiOiA2NDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMxXCIsIFwieFwiOiA3NjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMyXCIsIFwieFwiOiA4OTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMzXCIsIFwieFwiOiAwLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNFwiLCBcInhcIjogMTI4LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNVwiLCBcInhcIjogMjU2LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNlwiLCBcInhcIjogMzg0LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzN1wiLCBcInhcIjogNTEyLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOFwiLCBcInhcIjogNjQwLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOVwiLCBcInhcIjogNzY4LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MFwiLCBcInhcIjogODk2LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MVwiLCBcInhcIjogMCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDVcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDZcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDdcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDhcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDlcIiwgXCJ4XCI6IDAsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUwXCIsIFwieFwiOiAxMjgsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUxXCIsIFwieFwiOiAyNTYsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUyXCIsIFwieFwiOiAzODQsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUzXCIsIFwieFwiOiA1MTIsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU0XCIsIFwieFwiOiA2NDAsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU1XCIsIFwieFwiOiA3NjgsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU2XCIsIFwieFwiOiA4OTYsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU3XCIsIFwieFwiOiAwLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1OFwiLCBcInhcIjogMTI4LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1OVwiLCBcInhcIjogMjU2LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MFwiLCBcInhcIjogMzg0LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MVwiLCBcInhcIjogNTEyLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MlwiLCBcInhcIjogNjQwLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2M1wiLCBcInhcIjogNzY4LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2NFwiLCBcInhcIjogODk2LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCS0LfRgNGL0LIxXG4gKi9cbmV4cG9ydHMuYm9vbTEgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2Jvb20xLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG4gICAgXCJzcGVlZFwiOiAyMixcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMjU2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMzg0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTFcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTJcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JLQt9GA0YvQsjJcbiAqL1xuZXhwb3J0cy5ib29tMiA9IHtcbiAgICBcImltYWdlXCI6IHNfYm9vbTIsXG4gICAgXCJ3aWR0aFwiOiAxMjgsXG4gICAgXCJoZWlnaHRcIjogMTI4LFxuICAgIFwic3BlZWRcIjogMjgsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAxMjgsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTExXCIsIFwieFwiOiAyNTYsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiAzODQsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAwLCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMTI4LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogMjU2LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogMzg0LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCm0LXQu9GMINGC0LXQu9C10L/QvtGA0YLQsFxuICovXG5leHBvcnRzLmJhcmllciA9IHtcbiAgICBcImltYWdlXCI6IHNfYmFyaWVyLFxuICAgIFwid2lkdGhcIjogMTI4LFxuICAgIFwiaGVpZ2h0XCI6IDEyOCxcbiAgICBcInNwZWVkXCI6IDM4LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMjU2LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAwLCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTdcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDE5MiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAxOTIsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogMjU2LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMlwiLCBcInhcIjogNjQsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMTI4LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCt0YTRhNC10LrRgiDRgtC+0LvRh9C+0LpcbiAqL1xuZXhwb3J0cy5wdXNoMSA9IHtcbiAgICBcImltYWdlXCI6IHNfcHVzaCxcbiAgICBcIndpZHRoXCI6IDUxMixcbiAgICBcImhlaWdodFwiOiA1MTIsXG4gICAgXCJzcGVlZFwiOiAzMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMCwgXCJ5XCI6IDE5MiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuZXhwb3J0cy5ibHVlX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogMzIsXG4gICAgXCJoZWlnaHRcIjogMzIsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDk2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTFcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMlwiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAyMjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdyZWVuX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogMzIsXG4gICAgXCJoZWlnaHRcIjogMzIsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDMyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogNjQsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE3XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdyZXlfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMzIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDk2LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyN1wiLCBcInhcIjogMTYwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyOFwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyOVwiLCBcInhcIjogMjI0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMucmVkX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogMzIsXG4gICAgXCJoZWlnaHRcIjogMzIsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzMFwiLCBcInhcIjogMCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzFcIiwgXCJ4XCI6IDMyLCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzMlwiLCBcInhcIjogNjQsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMzXCIsIFwieFwiOiA5NiwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzRcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzVcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzZcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzdcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLm1hZ2VudGFfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM4XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzlcIiwgXCJ4XCI6IDMyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDBcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDFcIiwgXCJ4XCI6IDk2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQzXCIsIFwieFwiOiAxNjAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NFwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDVcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy55ZWxsb3dfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQ2XCIsIFwieFwiOiAwLCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDdcIiwgXCJ4XCI6IDMyLCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDhcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDlcIiwgXCJ4XCI6IDk2LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDE2MCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUxXCIsIFwieFwiOiAxNjAsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1MlwiLCBcInhcIjogMTkyLCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTNcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDE2MCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLnNrZWxldG9uID0ge1xuICAgIFwiaW1hZ2VcIjogc19za2VsZXRvbixcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MVwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODJcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmthdHkgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2thdHksXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNzlcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MFwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NVwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg2XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5sZXZvbiA9IHtcbiAgICBcImltYWdlXCI6IHNfbGV2b24sXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNzlcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MFwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NVwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg2XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy52aXRhbHkgPSB7XG4gICAgXCJpbWFnZVwiOiBzX3ZpdGFseSxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIyXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDMyMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI1XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNlwiLCBcInhcIjogNDQ4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjdcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCa0LvQsNGB0YHQvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5jb29sX3BsYW50cyA9IHtcbiAgICBcImltYWdlXCI6IHRfY29vbF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTFcIiwgXCJ4XCI6IDUxOSwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2UyXzBcIiwgXCJ4XCI6IDQ1NCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2UzXzBcIiwgXCJ4XCI6IDM4OSwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U0XCIsIFwieFwiOiAzMjQsIFwieVwiOiA1MTcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlNVwiLCBcInhcIjogMjU5LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTZcIiwgXCJ4XCI6IDE5NCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U3XCIsIFwieFwiOiAxMjksIFwieVwiOiA1MTcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlOFwiLCBcInhcIjogMzg3LCBcInlcIjogMTI5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlOVwiLCBcInhcIjogMzg3LCBcInlcIjogMjU4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJwYWxtdHJlZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlMlwiLCBcInhcIjogMTI5LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJwYWxtdHJlZTNcIiwgXCJ4XCI6IDEyOSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlNFwiLCBcInhcIjogMzg3LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJwYWxtdHJlZTVcIiwgXCJ4XCI6IDUxNiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWUxXzRcIiwgXCJ4XCI6IDUxNiwgXCJ5XCI6IDEyOSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTJfMVwiLCBcInhcIjogNTE2LCBcInlcIjogMjU4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlNFwiLCBcInhcIjogMzg3LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTVcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDI1OSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZS1zdHJhbmdlXCIsIFwieFwiOiAxMjksIFwieVwiOiAyNTksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlNlwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU2XCIsIFwieFwiOiAyNTgsIFwieVwiOiAxMjksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU3XCIsIFwieFwiOiAyNTgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlOFwiLCBcInhcIjogMTI5LCBcInlcIjogMTMwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlOVwiLCBcInhcIjogNTE2LCBcInlcIjogMzg3LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWUzXCIsIFwieFwiOiAwLCBcInlcIjogMjU5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXRgNGC0LLRi9C1INC00LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMuZGVhZF9wbGFudHMgPSB7XG4gICAgXCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImRlYWR0cmVlMV8wXCIsIFwieFwiOiAwLCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRlYWR0cmVlMlwiLCBcInhcIjogMjU4LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkZWFkdHJlZTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXRgNGC0LLRi9C1INC00LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMuYW5kc3RvbmVzID0ge1xuICAgIFwiaW1hZ2VcIjogdF9hbmRzdG9uZXMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDJcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjAzXCIsIFwieFwiOiAwLCBcInlcIjogNjYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwNFwiLCBcInhcIjogNjUsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDVcIiwgXCJ4XCI6IDY1LCBcInlcIjogMzMsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwNlwiLCBcInhcIjogNjUsIFwieVwiOiA2NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA3XCIsIFwieFwiOiAwLCBcInlcIjogOTksIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwOFwiLCBcInhcIjogNjUsIFwieVwiOiA5OSwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA5XCIsIFwieFwiOiAwLCBcInlcIjogMTMyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMTBcIiwgXCJ4XCI6IDY1LCBcInlcIjogMTMyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn1cbiAgICAgICAgXVxuICAgIH1cbn07IiwiLyoqXG4gKiDQndCw0LHQvtGA0Ysg0YHQv9GA0LDQudGC0L7QslxuICovXG5cblxuLy/QmtCw0YDRgtC40L3QutC4XG5sZXQgdF9wbGFudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndF9wbGFudHMnKTtcbmxldCBzX2dyYXZlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2dyYXZlcycpO1xubGV0IHNfY2FtcGZpcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19jYW1wZmlyZScpO1xuXG5cbi8qKlxuICog0J/Rg9GB0YLRi9C90L3QvtC1XG4gKi9cbmV4cG9ydHMuZGVzZXJ0ID0gW3tcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDI3LCBcImhlaWdodFwiOiA1OCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDE5OCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyNywgXCJoZWlnaHRcIjogNTh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDc2LCBcImhlaWdodFwiOiA5MiwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAyMzMsIFwieVwiOiAzMzAsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkyfV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogODcsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogMjQ0LCBcInlcIjogMjM4LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA4N31dfX0sXG5cbl07XG5cbi8qKlxuICog0KHRgtGA0LDQvdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLmJlbHdvb2QgPSBbXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsXCJ3aWR0aFwiOiAxMDcsIFwiaGVpZ2h0XCI6IDEyOCwgXCJzdGF0ZXNcIjogeyBcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDEwNywgXCJoZWlnaHRcIjogMTI4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA4OSwgXCJoZWlnaHRcIjogMTI4LCBcInN0YXRlc1wiOiB7IFwiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDEwOCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiA4OSwgXCJoZWlnaHRcIjogMTI4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA5NSwgXCJoZWlnaHRcIjogMTE3LCBcInN0YXRlc1wiOiB7IFwiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDk1LCBcImhlaWdodFwiOiAxMTd9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLFwid2lkdGhcIjogMTI2LCBcImhlaWdodFwiOiAxMTYsIFwic3RhdGVzXCI6IHsgXCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI2LCBcImhlaWdodFwiOiAxMTZ9XX19LFxuXTtcblxuXG5cbi8qKlxuICog0JTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5idXNocyA9IFtcbiAgICB7XCJpbWFnZVwiOiB0X2J1c2hzLCBcIndpZHRoXCI6IDExMywgXCJoZWlnaHRcIjogMTE4LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTM2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMTMsIFwiaGVpZ2h0XCI6IDExOH1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9idXNocywgXCJ3aWR0aFwiOiAxMDIsIFwiaGVpZ2h0XCI6IDE0MCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEwMiwgXCJoZWlnaHRcIjogMTQwfV19fSxcbl07XG5cbi8qKlxuICog0J3QsNC00LPRgNC+0LHRjNGPXG4gKi9cbmV4cG9ydHMuZ3JhdmVzID0gW1xuICAgIHtcImltYWdlXCI6IHNfZ3JhdmVzLCBcIndpZHRoXCI6IDIyLCBcImhlaWdodFwiOiAzMiwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDE2NSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjIsIFwiaGVpZ2h0XCI6IDMyfSxdfX0sXG4gICAge1wiaW1hZ2VcIjogc19ncmF2ZXMsIFwid2lkdGhcIjogMjgsIFwiaGVpZ2h0XCI6IDI3LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogOTgsIFwieVwiOiAyLCBcIndpZHRoXCI6IDI4LCBcImhlaWdodFwiOiAyN31dfX0sXG5dO1xuXG4vKipcbiAqINCa0L7RgdGC0YDRi1xuICovXG5leHBvcnRzLmNhbXBmaXJlID0gW1xuICAgIHtcImltYWdlXCI6IHNfY2FtcGZpcmUsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFtcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgIF19fSxcbl07XG5cbi8qKlxuICog0JrQu9Cw0YHRgdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG4vKlxuZXhwb3J0cy5jb29sX3BsYW50cyA9IFtcbiAgICB7XCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTcsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJkZWFkdHJlZTFfMFwiLCBcInhcIjogMCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDk3fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwiZGVhZHRyZWUyXCIsIFwieFwiOiAyNTgsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfY29vbF9wbGFudHMsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjgsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJkZWFkdHJlZTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XX19LFxuXTsqL1xuIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==