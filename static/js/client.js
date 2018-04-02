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
    }, {
        key: "init",
        value: function init() {
            this.sound.volume = 0.0;
            this.sound.play();
            this.sound.pause();
            this.sound.volume = 0.4;
            this.sound.currentTime = 0;
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

var sounds = {
    "level_up": new _sound2.default('sound/cash.mp3'),
    "npc_eat_coin": new _sound2.default('sound/coin/coin3.wav'),
    "eat_coin_gold": new _sound2.default('sound/coin/coin.wav'),
    "eat_coin_silver": new _sound2.default('sound/coin/eat2.mp3'),
    "eat_coin_copper": new _sound2.default('sound/coin/eat1.mp3'),
    "teleport": new _sound2.default('sound/teleport/flaunch.wav'),
    "push-effect": new _sound2.default('sound/hit/dropLeather.ogg'),
    "freeze-effect": new _sound2.default('sound/hit/frost.wav')
};

exports.default = sounds;


window.addEventListener("click", playAll);

function playAll() {
    for (var i in sounds) {
        sounds[i].init();
    }
    window.removeEventListener("click", playAll);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9jaGFyYWN0ZXJzLmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvY2hhcmFjdGVyLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS9zb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvdWkvdWkuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL3VpL3dhaXRzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWZ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWNrbzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ibG9iL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1pbmhlcml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy1qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL3V0ZjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNlcXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvdXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pcy1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vbG9vdC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi9yb29tLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3RlbGVwb3J0LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL2hlcm9pbmZvLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL3NraWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS90b3AxMC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS91aS5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS93YWl0c2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VuaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vdW5pdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL3NpZ25pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3ByaXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcHJpdGVzZXRzLmpzIiwid2VicGFjazovLy93cyAoaWdub3JlZCkiXSwibmFtZXMiOlsiZ2V0Iiwic2V0Iiwic2lnbm91dCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2dpbiIsInBhc3N3b3JkIiwiYWNjb3VudCIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNldHMiLCJpZCIsImFkZCIsInNwcml0ZV9pZCIsImxlbmd0aCIsImFkZFRvU2V0IiwiZ2V0RnJvbVNldCIsIklEIiwic2V0SUQiLCJzcHJpdGUiLCJwdXNoIiwiRlBTIiwiSU5URVJWQUwiLCJTVEVQIiwiQ2hhcmFjdGVyIiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwieCIsInkiLCJzdGF0ZSIsImZyYW1lTnVtIiwic3RhdGVzIiwiY2FudmFzIiwiZHJhd0ZyYW1lIiwiaW1hZ2UiLCJzY2FsZVgiLCJzY2FsZVkiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwic3JjIiwic291bmQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2b2x1bWUiLCJzZXRBdHRyaWJ1dGUiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjdXJyZW50VGltZSIsInBhdXNlIiwicGxheSIsIndhaXRTY3JlZW4iLCJ3YWl0U2NyZWVuRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwic2hvdyIsImhpZGUiLCJ0aXRsZSIsInRpdGxlRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCJpbml0Iiwib24iLCJvZmYiLCJkaXNjb25uZWN0Iiwic2VydmVyU29ja2V0IiwibG9nZ2VkIiwiY2FsbGJhY2siLCJjb25uZWN0IiwiZXZlbnROYW1lIiwidHlwZSIsInN0YXJ0IiwiZGF0YSIsInNldFRpbWVvdXQiLCJoYW5kbGVycyIsInJ1bkhhbmRsZXJzIiwiZW1pdCIsIkpTT04iLCJwYXJzZSIsImUiLCJtZXNzYWdlIiwiaGFuZGxlciIsImgiLCJjbG9zZSIsInJ1biIsImdhbWVvdmVyIiwid2luZG93Iiwib25sb2FkIiwibG9nIiwiJGxvZ3MiLCJtc2ciLCJwYXJlbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY29uc29sZSIsIk1BWF9ERUFEWk9ORV9YIiwiTUFYX0RFQURaT05FX1kiLCJmb2xsb3dlciIsImRlYWRab25lIiwiZ2V0Q29udGV4dCIsInNwZWVkIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwicm9vbSIsInJ1bkZvbGxvdyIsInBsYXllciIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJBIiwiVyIsIkQiLCJTIiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJONSIsIk42IiwiTjciLCJOOCIsIk45IiwiTjAiLCJTUEFDRSIsIlNUQVRJU1RJQyIsImNsaWNrUGFkIiwic3RvcCIsInNldENsaWNrUGFkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uV2luZG93Qmx1ciIsIm9uS2V5ZG93biIsIm9uS2V5dXAiLCJvbkNsaWNrIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX2NsaWNrUGFkIiwia2V5Q29kZSIsImNsaWVudFgiLCJjbGllbnRZIiwiYnV0dG9uIiwiYWRkRnJvbVNldCIsInJlbW92ZSIsInJlc2V0Iiwic2l6ZSIsImVhY2giLCJlbnRpdGllcyIsImxpZmV0aW1lIiwiZmF6YSIsImluZGV4Iiwic3BsaWNlIiwiZm9yRWFjaCIsIkVudGl0eSIsImNoYXJhY3RlciIsImltbW9ydGFsIiwiYW5pbWF0ZVNwZWVkIiwiY3VycmVudFNwcml0ZU51bSIsImRpZSIsImNhbWVyYSIsImRyYXdDaGFyYWN0ZXIiLCJkcmF3IiwidW5pdCIsImFuaW1hdGUiLCJjb25zdGFudHMiLCJmaW5hbENhbGxiYWNrIiwiaW50ZXJ2YWwiLCJyb29tcyIsInJvb21faWQiLCJsb290cyIsInRlbGVwb3J0cyIsInJlc2l6ZSIsIm9uUmVjb25uZWN0Iiwib25Sb29tIiwib25IZXJvIiwib25Tb3VuZCIsInBvcyIsInNraWxscyIsInRvcDEwIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwiZXZlbnQiLCJ1bmRlZmluZWQiLCJlbnZpcm9ubWVudF9pZCIsInJvb21Jbml0IiwiaW5mbyIsImNoYXJhY3Rlcl9pZCIsImxldmVsIiwiaXRlbSIsInNwcml0ZXNldF9pZCIsImNvaW5zX2NvdW50IiwibGV2ZWx1cENvdW50ZXIiLCJoZXJvSW5mbyIsInNldEZvbGxvd2VyIiwiZW50aXR5IiwiaXNEaWUiLCJ0b0FycmF5IiwiaSIsInJlbmRlckFycmF5Iiwic29ydCIsImEiLCJiIiwic2V0dGluZ3MiLCJlbnRpdGllc19udW0iLCJjYXJ0b29ucyIsInJhbmRvbSIsImxvb3QiLCJ0YXJnZXQiLCJzdGVwIiwiRU5WSVJPTk1FTlRTIiwiciIsInJhbmQiLCJnIiwiZW50aXRpZXNTcHJpdGVzIiwiZ2VuZXJhdGUiLCJ0cmVlc19udW0iLCJjdHgiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsImNvbHVtbnMiLCJzYXZlIiwiaiIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsInJhbmRvbUNTU2NvbG9yIiwiZmlsbFJlY3QiLCJjbG9zZVBhdGgiLCJlbnYiLCJzcHIiLCJkZWZhdWx0IiwidGlsZSIsInh4IiwieXkiLCJ3IiwicmVzdG9yZSIsIkltYWdlIiwidG9EYXRhVVJMIiwiaGVyb19pbmZvRWxlbWVudCIsImhlcm9fbmFtZUVsZW1lbnQiLCJzY29yZUVsZW1lbnQiLCJsZXZlbEVsZW1lbnQiLCJsZXZlbHVwY291bnRlckVsZW1lbnQiLCJzcGVlZEVsZW1lbnQiLCJoZWFsdGhFbGVtZW50Iiwic3JjRWxlbWVudCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiaW5uZXJUZXh0IiwibmFtZSIsImxldmVsdXBWYWx1ZSIsImhlYWx0aCIsInNraWxsc1BhbmVsIiwic2tpbGxzRWxlbWVudHMiLCJza2lsbDEiLCJza2lsbDIiLCJza2lsbDMiLCJza2lsbDQiLCJza2lsbDUiLCJza2lsbDYiLCJza2lsbDciLCJza2lsbDgiLCJza2lsbDkiLCJza2lsbDEwIiwiYWxsU2tpbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsInNlbGVjdFNraWxsIiwic2tpbGxfaWQiLCJza2lsbCIsImljb25FbGVtZW50IiwidmVrb0VsZW1lbnQiLCJjbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJpY29uIiwidmFsdWUiLCJjb250YWlucyIsImFjdGl2ZSIsImlzQWN0aXZlIiwidG9wMTBFbGVtZW50IiwidG9wMTBDb250ZW50RWxlbWVudCIsInJpZ2h0IiwiQXJyYXkiLCJpc0FycmF5IiwiY29udGVudCIsInNjb3JlIiwiQ0hBUkFDVEVSX0RFRkFVTFQiLCJNQVhfSEVBTFRIIiwiVW5pdCIsImlzSGVybyIsImRyYXdTaGFkb3ciLCJkcmF3TmFtZSIsImRyYXdWb2x1bWUiLCJ2b2x1bWVXaWR0aCIsInZvbHVtZUhlaWdodCIsInZvbHVtZVgiLCJ2b2x1bWVZIiwicmVjdCIsInN0cm9rZSIsInBhZGRpbmdDb2xvciIsImZvbnQiLCJ0ZXh0V2lkdGgiLCJtZWFzdXJlVGV4dCIsInRleHRMZXZlbFdpZHRoIiwicGFkV2lkdGgiLCJseCIsImx5IiwiYXJjIiwiUEkiLCJmaWxsIiwiZmlsbFRleHQiLCJzaGFkb3dDb2xvcjEiLCJzaGFkb3dDb2xvcjIiLCJzaGFkb3dDb2xvcjMiLCJlbGxpcHNlIiwidW5pdHMiLCJ1bml0c0FycmF5IiwibG9naW5fcGFuZWxFbGVtZW50IiwibG9naW5fZm9ybUVsZW1lbnQiLCJsb2dpbl9pbnB1dEVsZW1lbnQiLCJwYXNzd29yZF9pbnB1dEVsZW1lbnQiLCJ0aW1lb3V0IiwidGltZW91dF9wIiwidXNlckFjY291bnQiLCJjbGlja0hhbmRsZXIiLCJrZXl1cEhhbmRsZXIiLCJmb2N1cyIsIm9iaiIsImtleSIsInZhbGlkYXRlIiwiYWNjb3VudERhdGEiLCJ0ZXN0IiwiZGVmYXVsdFZhbHVlIiwiYmFja2dyb3VuZENvbG9yIiwiY2xlYXJUaW1lb3V0Iiwic291bmRzIiwicGxheUFsbCIsInNfZG9jIiwic19wcm9mIiwic19nb2IiLCJzX2dpcmwiLCJzX2Jsb25kIiwic19tYWciLCJzX3RlbGVwb3J0Iiwic19jb2lucyIsInRfdHJlZXMiLCJ0X2J1c2hzIiwidF9wbGFudHMiLCJzX3BvaW50ZXIiLCJzX2Jvb20iLCJzX2Jvb20xIiwic19ib29tMiIsInNfYmFyaWVyIiwic19wdXNoIiwic19jcnlzdGFscyIsInNfc2tlbGV0b24iLCJzX2thdHkiLCJzX2xldm9uIiwic192aXRhbHkiLCJ0X2Nvb2xfcGxhbnRzIiwidF9hbmRzdG9uZXMiLCJleHBvcnRzIiwiZG9jIiwicHJvZiIsImdvYiIsImdpcmwiLCJibG9uZCIsIm1hZyIsImNvaW5fZ29sZCIsImNvaW5fc2lsdmVyIiwiY29pbl9jb3BwZXIiLCJncmFzcyIsInRyZWVzIiwiYnVzaHMiLCJkZXNlcnQiLCJiZWx3b29kIiwidGVsZXBvcnQiLCJwb2ludGVyIiwiYm9vbSIsImJvb20xIiwiYm9vbTIiLCJiYXJpZXIiLCJwdXNoMSIsImJsdWVfY3J5c3RhbCIsImdyZWVuX2NyeXN0YWwiLCJncmV5X2NyeXN0YWwiLCJyZWRfY3J5c3RhbCIsIm1hZ2VudGFfY3J5c3RhbCIsInllbGxvd19jcnlzdGFsIiwic2tlbGV0b24iLCJrYXR5IiwibGV2b24iLCJ2aXRhbHkiLCJjb29sX3BsYW50cyIsImRlYWRfcGxhbnRzIiwiYW5kc3RvbmVzIiwic19ncmF2ZXMiLCJzX2NhbXBmaXJlIiwiZ3JhdmVzIiwiY2FtcGZpcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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WTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxPQUFPO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdHVCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksVUFBVTtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUpBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25EQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RPQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsaURBQWlEO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7O0FBRWQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsMkRBQTJEO0FBQzNEO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25hQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BQQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdSQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsWUFBWTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxLQUFLLFlBQVk7QUFDakI7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUFBO0FBQ0gsRUFBRSwwQ0FZRjs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDOVBEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2ZBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDVEEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixZQUFZLE1BQU07QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkpBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUdBQXlHLElBQUksR0FBRyxJQUFJLFNBQVMsSUFBSTs7QUFFakk7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXdFO0FBQ3hFOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFLGtGQUFrRjtBQUNsRjtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRyxPQUFPO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUMsUUFBUSxTQUFULEVBQW9CLEtBQUssQ0FBekIsRUFBNEIsS0FBSyxHQUFqQyxFQUFzQyxTQUFTLEVBQS9DLEVBQW1ELFVBQVUsRUFBN0QsRUFGTyxFQUdQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFITyxFQUlQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxFQUFuQyxFQUF1QyxTQUFTLEVBQWhELEVBQW9ELFVBQVUsRUFBOUQsRUFKTyxFQUtQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFMTyxFQU1QLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFOTyxFQU9QLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFQTyxFQVFQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFSTyxFQVNQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssRUFBekIsRUFBNkIsS0FBSyxHQUFsQyxFQUF1QyxTQUFTLEVBQWhELEVBQW9ELFVBQVUsRUFBOUQsRUFUTyxFQVVQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxFQUFuQyxFQUF1QyxTQUFTLEVBQWhELEVBQW9ELFVBQVUsRUFBOUQsRUFWTyxFQVdQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpE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RUFBa0QsVUFBVSxFQUE1RCxFQUFELENBQVosRUFBekQsRUFGYSxDQUFqQjs7QUFLQTs7O0FBR0FuQyxRQUFRc0MsUUFBUixHQUFtQixDQUNmLEVBQUMsU0FBU0YsVUFBVixFQUFzQixTQUFTLEVBQS9CLEVBQW1DLFVBQVUsRUFBN0MsRUFBaUQsVUFBVSxFQUFDLFdBQVcsQ0FDbkUsRUFBQyxRQUFRLFNBQVQsRUFBb0IsS0FBSyxDQUF6QixFQUE0QixLQUFLLENBQWpDLEVBQW9DLFNBQVMsRUFBN0MsRUFBaUQsVUFBVSxFQUEzRCxFQURtRSxFQUVuRSxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEVBQXpCLEVBQTZCLEtBQUssQ0FBbEMsRUFBcUMsU0FBUyxFQUE5QyxFQUFrRCxVQUFVLEVBQTVELEVBRm1FLEVBR25FLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxDQUFuQyxFQUFzQyxTQUFTLEVBQS9DLEVBQW1ELFVBQVUsRUFBN0QsRUFIbUUsRUFJbkUsRUFBQyxRQUFRLFNBQVQsRUFBb0IsS0FBSyxHQUF6QixFQUE4QixLQUFLLENBQW5DLEVBQXNDLFNBQVMsRUFBL0MsRUFBbUQsVUFBVSxFQUE3RCxFQUptRSxFQUtuRSxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxFQUEvQyxFQUFtRCxVQUFVLEVBQTdELEVBTG1FLENBQVosRUFBM0QsRUFEZSxDQUFuQjs7QUFVQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRUEsZSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtnZXQsIHNldCwgc2lnbm91dH1cblxuZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmKFxuICAgICAgICAhbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpIHx8XG4gICAgICAgICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZV9hY2NvdW50X3Bhc3N3b3JkJylcbiAgICApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9naW46IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfbG9naW4nKSxcbiAgICAgICAgcGFzc3dvcmQ6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzZXQoYWNjb3VudCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lX2FjY291bnRfbG9naW4nLCBhY2NvdW50LmxvZ2luKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZV9hY2NvdW50X3Bhc3N3b3JkJywgYWNjb3VudC5wYXNzd29yZCk7XG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKTtcbn0iLCJpbXBvcnQgQ2hhcmFjdGVyIGZyb20gXCIuL2VuZ2luZS9jaGFyYWN0ZXIuanNcIjtcbmltcG9ydCBzcHJpdGVzIGZyb20gXCIuL3Nwcml0ZXNcIjtcbmltcG9ydCBzcHJpdGVzZXRzIGZyb20gXCIuL3Nwcml0ZXNldHNcIjtcblxuY29uc3QgY2hhcmFjdGVycyA9IHt9O1xuXG5jb25zdCBjaGFyYWN0ZXJzZXRzID0ge307XG5cbmZvcihsZXQgaWQgaW4gc3ByaXRlcyl7XG4gICAgYWRkKGlkLCBzcHJpdGVzW2lkXSk7XG59XG5mb3IobGV0IHNwcml0ZV9pZCBpbiBzcHJpdGVzZXRzKXtcbiAgICBmb3IobGV0IGlkPTA7IGlkPHNwcml0ZXNldHNbc3ByaXRlX2lkXS5sZW5ndGg7aWQrKyl7XG4gICAgICAgIGFkZFRvU2V0KHNwcml0ZV9pZCwgaWQsIHNwcml0ZXNldHNbc3ByaXRlX2lkXVtpZF0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge2dldCwgZ2V0RnJvbVNldH1cblxuZnVuY3Rpb24gZ2V0KElEKSB7XG4gICAgcmV0dXJuIGNoYXJhY3RlcnNbSURdO1xufVxuXG5mdW5jdGlvbiBnZXRGcm9tU2V0KHNldElELCBJRCkge1xuICAgIHJldHVybiBjaGFyYWN0ZXJzZXRzW3NldElEXVtJRF07XG59XG5cbmZ1bmN0aW9uIGFkZChJRCwgc3ByaXRlKSB7XG4gICAgY2hhcmFjdGVyc1tJRF0gPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZSk7XG59XG5cbmZ1bmN0aW9uIGFkZFRvU2V0KHNldElELCBJRCwgc3ByaXRlKSB7XG4gICAgaWYoc2V0SUQgaW4gY2hhcmFjdGVyc2V0cz09PWZhbHNlKXtcbiAgICAgICAgY2hhcmFjdGVyc2V0c1tzZXRJRF0gPSBbXTtcbiAgICB9XG4gICAgY2hhcmFjdGVyc2V0c1tzZXRJRF0ucHVzaChuZXcgQ2hhcmFjdGVyKHNwcml0ZSkpO1xufSIsImV4cG9ydCBjb25zdFxuICAgIEZQUyA9IDMwLFxuICAgIElOVEVSVkFMID0gMTAwMC9GUFMsIC8v0LIg0LzQuNC70LvQuNGB0LXQutGD0L3QtNCw0YVcbiAgICBTVEVQID0gSU5URVJWQUwvMTAwMDsvL9CyINGB0LXQutGD0L3QtNCw0YVcbiIsIi8qKlxuICogQGNsYXNzIENoYXJhY3RlciAtINCf0LXRgNGB0L7QvdCw0LZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVye1xuXG4gICAgY29uc3RydWN0b3Ioc3ByaXRlLCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBzcHJpdGU7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IHNwcml0ZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgc3ByaXRlLmhlaWdodDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCe0YLRgNC40YHQvtCy0LrQsCDQv9C10YDRgdC+0L3QsNC20LBcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtINC60YPQtNCwINGA0LjRgdGD0LXQvFxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcGFyYW0gd2lkdGhcbiAgICAgKiBAcGFyYW0gaGVpZ2h0XG4gICAgICogQHBhcmFtIHN0YXRlXG4gICAgICogQHBhcmFtIGZyYW1lTnVtIC0g0L3QvtC80LXRgCDQutCw0LTRgNCwINCw0L3QuNC80LDRhtC40LhcbiAgICAgKi9cbiAgICBkcmF3KGNvbnRleHQsIHgsIHksIHN0YXRlLCBmcmFtZU51bSwgd2lkdGgsIGhlaWdodCl7XG5cbiAgICAgICAgaWYoIXN0YXRlIHx8ICF0aGlzLnNwcml0ZS5zdGF0ZXNbc3RhdGVdKXtcbiAgICAgICAgICAgIHN0YXRlID0gJ2RlZmF1bHQnXG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZyYW1lTnVtKSBmcmFtZU51bSA9IDA7XG5cbiAgICAgICAgaWYoIXRoaXMuc3ByaXRlLnN0YXRlc1tzdGF0ZV0gfHwgIXRoaXMuc3ByaXRlLnN0YXRlc1tzdGF0ZV1bZnJhbWVOdW1dKSByZXR1cm47XG5cblxuICAgICAgICAvL9Ce0LHRgNC10LfQutCwINC+0YLRgNC40YHQvtCy0LrQuCDQstC90LUg0LrQsNC90LLRiyBUT0RPOiDRgNC10LfQsNGC0Ywg0L/QviDQutCw0LzQtdGA0LVcbiAgICAgICAgaWYoeCArIHRoaXMud2lkdGggPiAwICYmIHggPCBjb250ZXh0LmNhbnZhcy53aWR0aCAmJiB5ICsgdGhpcy5oZWlnaHQgPiAwICYmIHkgPCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpIHtcblxuXG4gICAgICAgICAgICAvLyDQoNC40YHRg9C10Lwg0LrQsNC00YBcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZyYW1lKFxuICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuaW1hZ2UsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXVtmcmFtZU51bV0sXG4gICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCg0LjRgdGD0LXQvCDQutCw0LTRgCDQsNC90LjQvNCw0YbQuNC4XG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gc3ByaXRlXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB3aWR0aFxuICAgICAqIEBwYXJhbSBoZWlnaHRcbiAgICAgKi9cbiAgICBkcmF3RnJhbWUoY29udGV4dCwgaW1hZ2UsIHNwcml0ZSwgeCwgeSwgd2lkdGgsIGhlaWdodCl7XG5cbiAgICAgICAgaWYod2lkdGg+MCAmJiBoZWlnaHQ+MCkge1xuXG4gICAgICAgICAgICBsZXQgc2NhbGVYID0gc3ByaXRlLndpZHRoIC8gd2lkdGgsXG4gICAgICAgICAgICAgICAgc2NhbGVZID0gc3ByaXRlLmhlaWdodCAvIGhlaWdodDtcblxuICAgICAgICAgICAgbGV0IHN4ID0gc3ByaXRlLngsIHN5ID0gc3ByaXRlLnksIHN3ID0gc3ByaXRlLndpZHRoLCBzaCA9IHNwcml0ZS5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgZHggPSB4LCBkeSA9IHksIGR3ID0gd2lkdGgsIGRoID0gaGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgICAgICAgICBkeCA9IDA7XG4gICAgICAgICAgICAgICAgZHcgPSB3aWR0aCArIHg7XG4gICAgICAgICAgICAgICAgc3ggLT0gTWF0aC5mbG9vcih4ICogc2NhbGVYKTtcbiAgICAgICAgICAgICAgICBzdyA9IE1hdGguZmxvb3IoZHcgKiBzY2FsZVgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHkgPCAwKSB7XG4gICAgICAgICAgICAgICAgZHkgPSAwO1xuICAgICAgICAgICAgICAgIGRoID0gaGVpZ2h0ICsgeTtcbiAgICAgICAgICAgICAgICBzeSAtPSBNYXRoLmZsb29yKHkgKiBzY2FsZVkpO1xuICAgICAgICAgICAgICAgIHNoID0gTWF0aC5mbG9vcihkaCAqIHNjYWxlWSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkdyA+IGNvbnRleHQuY2FudmFzLndpZHRoIC0gZHgpIHtcbiAgICAgICAgICAgICAgICBkdyA9IGNvbnRleHQuY2FudmFzLndpZHRoIC0gZHg7XG4gICAgICAgICAgICAgICAgc3cgPSBNYXRoLmZsb29yKGR3ICogc2NhbGVYKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRoID4gY29udGV4dC5jYW52YXMuaGVpZ2h0IC0gZHkpIHtcbiAgICAgICAgICAgICAgICBkaCA9IGNvbnRleHQuY2FudmFzLmhlaWdodCAtIGR5O1xuICAgICAgICAgICAgICAgIHNoID0gTWF0aC5mbG9vcihkaCAqIHNjYWxlWSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v0J3QtSDRgNC40YHRg9C10Lwg0YEg0YDQsNC30LzQtdGA0L7QvCDQvNC10L3RjNGI0LUg0LjQu9C4INGA0LDQstC90YvQvCDQvdGD0LvRjlxuICAgICAgICAgICAgaWYoc3c+MCYmc2g+MCYmZHc+MCYmZGg+MCkge1xuXG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAgICAgICBzeCxcbiAgICAgICAgICAgICAgICAgICAgc3ksXG4gICAgICAgICAgICAgICAgICAgIHN3LFxuICAgICAgICAgICAgICAgICAgICBzaCxcbiAgICAgICAgICAgICAgICAgICAgZHgsXG4gICAgICAgICAgICAgICAgICAgIGR5LFxuICAgICAgICAgICAgICAgICAgICBkdyxcbiAgICAgICAgICAgICAgICAgICAgZGhcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHNyYyl7XG4gICAgICAgIHRoaXMuc291bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XG4gICAgICAgIHRoaXMuc291bmQudm9sdW1lID0gMC40O1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5zb3VuZC5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZC5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLCBcIm5vbmVcIik7XG4gICAgICAgIHRoaXMuc291bmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc291bmQpO1xuICAgIH1cbiAgICBwbGF5KCl7XG4gICAgICAgIGlmKHRoaXMuc291bmQuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc291bmQucGxheSgpO1xuICAgIH1cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMuc291bmQucGF1c2UoKTtcbiAgICB9XG5cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMuc291bmQudm9sdW1lID0gMC4wO1xuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoKTtcbiAgICAgICAgdGhpcy5zb3VuZC5wYXVzZSgpO1xuICAgICAgICB0aGlzLnNvdW5kLnZvbHVtZSA9IDAuNDtcbiAgICAgICAgdGhpcy5zb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxufSIsIi8qKlxuICog0JjQvdGC0LXRgNGE0LXQudGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5cbi8vINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuaW1wb3J0IHdhaXRTY3JlZW4gZnJvbSAnLi93YWl0c2NyZWVuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IHt3YWl0U2NyZWVufSIsIi8qKlxuICog0K3QutGA0LDQvSDQt9Cw0LPRgNGD0LfQutC4XG4gKi9cblxuXG5jb25zdCB3YWl0U2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ1wiKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7c2hvdywgaGlkZX1cblxuXG5mdW5jdGlvbiBzaG93KHRpdGxlKSB7XG4gICAgaWYodGl0bGUpe1xuICAgICAgICBsZXQgdGl0bGVFbGVtZW50ID0gd2FpdFNjcmVlbkVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICAgIGlmKHRpdGxlRWxlbWVudCl7XG4gICAgICAgICAgICB0aXRsZUVsZW1lbnQuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2FpdFNjcmVlbkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgd2FpdFNjcmVlbkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xufVxuIiwiLyoqXG4gKiDQodC+0LHRi9GC0LjRjyDQuNCz0YDRi1xuICovXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ3MuanNcIjtcblxuaW1wb3J0IGlvIGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmltcG9ydCB1aSBmcm9tIFwiLi9lbmdpbmUvdWkvdWkuanNcIjtcblxuaW1wb3J0IGFjY291bnQgZnJvbSBcIi4vYWNjb3VudFwiO1xuaW1wb3J0IHNpZ25JbiBmcm9tIFwiLi9zY2VuZXMvc2lnbmluXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQge2luaXQsIGFkZCwgb24sIG9mZiwgZGlzY29ubmVjdH1cblxuLy8g0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQuiDRgdC10YDQstC10YDRg1xubGV0IHNlcnZlclNvY2tldCA9IG51bGw7XG5cbmxldCBsb2dnZWQgPSBmYWxzZTtcblxuXG4vKipcbiAqINCY0L3QuNGC0LjQvCDQuNCz0YDQvtCy0YvQtSDRgdC+0LHRi9GC0LjRj1xuICovXG5mdW5jdGlvbiBpbml0KGNhbGxiYWNrKSB7XG5cbiAgICAvL9Cf0L7QtNC60LvRjtGH0LjQvNGB0Y8g0Log0YHQtdGA0LLQtdGA0YNcbiAgICBpZighc2VydmVyU29ja2V0KSB7XG4gICAgICAgIHNlcnZlclNvY2tldCA9IGlvKFwiaHR0cDovL3NlcnZlci5nYW1lcy5xLWRldi5ydVwiKTtcbiAgICB9XG5cbiAgICBsb2coJ9Cf0L7QtNC60LvRjtGH0LDQtdC80YHRjyDQuiDRgdC10YDQstC10YDRgycpO1xuICAgIHNlcnZlclNvY2tldC5jb25uZWN0KCk7XG5cbiAgICBvbihcInNlcnZlclwiLCAoZXZlbnROYW1lLCB0eXBlKT0+e1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImhlbGxvXCIpIHtcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0LXRidGRINC90LUg0LLQvtGI0LvQuFxuICAgICAgICAgICAgaWYgKCFsb2dnZWQpIHtcblxuICAgICAgICAgICAgICAgIC8v0J/QvtC70YPRh9Cw0LXQvCDQvtGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsNC60LrQsNGD0L3RglxuICAgICAgICAgICAgICAgIHNpZ25Jbi5zdGFydChmdW5jdGlvbiAoYWNjb3VudCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINC+0YLQv9GA0LDQstC40Lwg0LDQutC60LDRg9C90YIg0YHQtdGA0LLQtdGA0YNcbiAgICAgICAgICAgICAgICAgICAgYWRkKCdsb2dpbicsIGFjY291bnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v0J/QvtGB0LvQtSDRg9GB0L/QtdGI0L3QvtCz0L4g0LLRhdC+0LTQsCAo0JXRgdC70Lgg0L3QtdGD0YHQv9C10YjQvdGL0LkgLSDRgdC10YDQstC10YAg0L7Qv9GP0YLRjCDQv9C+0YjQu9C10YIgaGVsbG8pXG4gICAgICAgICAgICAgICAgICAgIG9uKCdsb2dnZWQnLCAoZXZlbnROYW1lLCB0eXBlLCBkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZT09PSdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2ZmKCdsb2dnZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvLyDQlNC10LnRgdGC0LLQuNGPINC/0YDQuCDRgdC10YDQstC10YDQvdGL0YUg0L/RgNC+0LHQu9C10LzQsNGFXG4gICAgc2VydmVyU29ja2V0Lm9uKCdjb25uZWN0X2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2coJ9Ce0YjQuNCx0LrQsCDQv9C+0LTQutC70Y7Rh9C10L3QuNGPINC6INGB0LXRgNCy0LXRgNGDJyk7XG4gICAgfSk7XG5cblxuICAgIHNlcnZlclNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2coJ9C+0YIg0YHQtdGA0LLQtdGA0LAg0L/QvtGB0YLRg9C/0LjQuyBkaXNjb25uZWN0Jyk7XG4gICAgICAgIGxvZygn0JLRiyDQvtGC0LrQu9GO0YfQtdC90Ysg0L7RgiDRgdC10YDQstC10YDQsCcpO1xuXG4gICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygpO1xuICAgICAgICBsb2dnZWQgPSBmYWxzZTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGluaXQoY2FsbGJhY2spO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuXG4gICAgb24oXCJhbm90aGVyLWNvbWluZ1wiLCAoKSA9PiB7XG4gICAgICAgIGxvZygn0JLRiyDQvtGC0LrQu9GO0YfQtdC90Ysg0L7RgiDRgdC10YDQstC10YDQsCcpO1xuXG4gICAgICAgIC8vVE9ETzog0JLQvNC10YHRgtC+INGN0LrRgNCw0L3QsCDQvtC20LjQtNCw0L3QuNGPIC0g0J7QutC90L4g0YEg0LrQvdC+0L/QutC+0LkgLSDQv9C+0LTQutC70Y7Rh9C40YLRjNGB0Y8gLSDQv9C+INC60L7RgtC+0YDQvtC5IGluaXQoY2FsbGJhY2spO1xuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coKTtcbiAgICB9KTtcblxufVxuXG5cbmNvbnN0IGhhbmRsZXJzID0ge307XG5cbi8qKlxuICog0JTQvtCx0LDQstC70LXQvdC40LUg0LjQs9GA0L7QstC+0LPQviDRgdC+0LHRi9GC0LjRj1xuICogQHBhcmFtIGV2ZW50TmFtZVxuICogQHBhcmFtIGRhdGFcbiAqL1xuZnVuY3Rpb24gYWRkKGV2ZW50TmFtZSwgZGF0YSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0LvQvtC60LDQu9GM0L3Ri9C1INC+0LHRgNCw0LHQvtGC0YfQuNC60LggLSDQstGL0LfQvtCy0LXQvFxuICAgIHJ1bkhhbmRsZXJzKGV2ZW50TmFtZSwgZGF0YSk7XG5cbiAgICAvLyDRiNC70LXQvCDRgdC+0LHRi9GC0LjQtSDQvdCwINGB0LXRgNCy0LXRgFxuICAgIHNlcnZlclNvY2tldC5lbWl0KGV2ZW50TmFtZSwgZGF0YSlcbn1cblxuXG5mdW5jdGlvbiBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG5cbiAgICAvL9Ch0L7RhdGA0LDQvdC40Lwg0L3QsCDRgdC70YPRh9Cw0Lkg0LXRgdC70Lgg0YHQvtCx0YvRgtC40Y8g0LLQvtC30L3QuNC60L3Rg9GCINC70L7QutCw0LvRjNC90L5cbiAgICBpZihldmVudE5hbWUgaW4gaGFuZGxlcnM9PT1mYWxzZSl7XG4gICAgICAgIGhhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgaGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcblxuXG4gICAgc2VydmVyU29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGEpPT57XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe31cbiAgICAgICAgbGV0IHR5cGUgPSBkYXRhLnR5cGUgPyBkYXRhLnR5cGUgOiBcInNpbXBsZVwiO1xuXG4gICAgICAgIC8vINCV0YHQu9C4INCyINC00LDQvdC90YvRhSDRgdC+0LHRi9GC0LjRjyDQtdGB0YLRjCDQv9C+0LvQtSBtZXNzYWdlIC0g0LLRi9Cy0LXQtNC10Lwg0LIg0LvQvtCzXG4gICAgICAgIGRhdGEubWVzc2FnZSAmJiBsb2coZGF0YS5tZXNzYWdlLyogKyAnICjQodC+0LHRi9GC0LjQtSAnK2V2ZW50KycuJyt0eXBlKycpJyovKTtcblxuICAgICAgICAvLyDQntGC0LvQsNC00LrQsCDRgdC+0LHRi9GC0LjQuSDQsdC10LcgbWVzc2FnZVxuICAgICAgICAvLyBkYXRhLm1lc3NhZ2UgfHwgbG9nKCcgKNCh0L7QsdGL0YLQuNC1ICcrZXZlbnQrJy4nK3R5cGUrJyknKTtcblxuICAgICAgICBjYWxsYmFjayhldmVudE5hbWUsIHR5cGUsIGRhdGEpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzICYmIGhhbmRsZXJzW2V2ZW50TmFtZV09PT1oYW5kbGVyKXtcbiAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50TmFtZV07XG4gICAgfVxuXG4gICAgc2VydmVyU29ja2V0Lm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xufVxuXG5cbi8vINCX0LDQv9GD0YHQuiDQtNC70Y8g0LvQvtC60LDQu9GM0L3Ri9GFINGB0L7QsdGL0YLQuNC5XG5mdW5jdGlvbiBydW5IYW5kbGVycyhldmVudE5hbWUsIGRhdGEpIHtcbiAgICAvL9CV0YHQu9C4INC10YHRgtGMINC+0LHRgNCw0LHQvtGC0YfQuNC60LggLSDQt9Cw0L/Rg9GB0LrQsNC10LxcbiAgICBpZihldmVudE5hbWUgaW4gaGFuZGxlcnMpe1xuICAgICAgICBmb3IoY29uc3QgaCBvZiBoYW5kbGVyc1tldmVudE5hbWVdKXtcbiAgICAgICAgICAgIGgoZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgIHNlcnZlclNvY2tldC5jbG9zZSgpO1xufSIsImltcG9ydCB1aSBmcm9tIFwiLi9lbmdpbmUvdWkvdWkuanNcIjtcblxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9ldmVudHMuanNcIjtcblxuaW1wb3J0IHNjZW5lTWFpbiBmcm9tIFwiLi9zY2VuZXMvbWFpbi9pbmRleC5qc1wiXG5cblxuLyoqXG4gKiDQntGB0L3QvtCy0L3QvtC5INC60LvQsNGB0YEg0LrQu9C40LXQvdGC0LAg0LjQs9GA0YtcbiAqIGNsYXNzIEdhbWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge3J1bn1cblxuXG4gICAgLyoqXG4gICAgICog0JfQsNC/0YPRgdC6INC+0YHQvdC+0LLQvdC+0LPQviDRhtC40LrQu9CwXG4gICAgICovXG4gICAgZnVuY3Rpb24gcnVuKCkge1xuXG4gICAgICAgIC8vINCf0LjRiNC10LwgXCLQl9Cw0LPRgNGD0LfQutCwXCJcbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCfQodGC0LDRgNGCINC40LPRgNGLJyk7XG5cblxuICAgICAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvNGB0Y8g0Log0YHQtdGA0LLQtdGA0YNcbiAgICAgICAgZXZlbnRzLmluaXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvL1RPRE86INCf0LXRgNC10LQg0YHRgtCw0YDRgtC+0LwgLSDQstGL0LHQvtGAINC/0LXRgNGB0L7QvdCw0LbQsCwg0LXRgdC70Lgg0L3QtSDQstGL0LHRgNCw0L1cblxuICAgICAgICAgICAgLy8g0KHRgtCw0YDRgtGD0LXQvCDQvtGB0L3QvtCy0L3Rg9GOINGB0YbQtdC90YNcbiAgICAgICAgICAgIHNjZW5lTWFpbi5zdGFydChfID0+IHtcblxuICAgICAgICAgICAgICAgIGdhbWVvdmVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnYW1lb3Zlcigpe1xuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coJ0dhbWUgT3ZlcicpO1xuICAgIH1cbiIsImltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZSdcblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5cbiAgICBnYW1lLnJ1bigpO1xuXG59OyIsIi8qKlxuICog0JvQvtCz0LjRgNC+0LLQsNC90LjQtVxuICovXG5leHBvcnQgZGVmYXVsdCBsb2dcblxuY29uc3QgJGxvZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9ncycpO1xuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gICAgJGxvZ3MuaW5uZXJIVE1MICs9ICc8ZGl2IGNsYXNzPVwibXNnXCI+Jyttc2crJzwvZGl2Pic7XG4gICAgJGxvZ3MucGFyZW50RWxlbWVudC5zY3JvbGxUb3AgPSAkbG9ncy5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc29sZS5sb2cobXNnKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBhZnRlclxuXG5mdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2ssIGVycl9jYikge1xuICAgIHZhciBiYWlsID0gZmFsc2VcbiAgICBlcnJfY2IgPSBlcnJfY2IgfHwgbm9vcFxuICAgIHByb3h5LmNvdW50ID0gY291bnRcblxuICAgIHJldHVybiAoY291bnQgPT09IDApID8gY2FsbGJhY2soKSA6IHByb3h5XG5cbiAgICBmdW5jdGlvbiBwcm94eShlcnIsIHJlc3VsdCkge1xuICAgICAgICBpZiAocHJveHkuY291bnQgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhZnRlciBjYWxsZWQgdG9vIG1hbnkgdGltZXMnKVxuICAgICAgICB9XG4gICAgICAgIC0tcHJveHkuY291bnRcblxuICAgICAgICAvLyBhZnRlciBmaXJzdCBlcnJvciwgcmVzdCBhcmUgcGFzc2VkIHRvIGVycl9jYlxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBiYWlsID0gdHJ1ZVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgLy8gZnV0dXJlIGVycm9yIGNhbGxiYWNrcyB3aWxsIGdvIHRvIGVycm9yIGhhbmRsZXJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXJyX2NiXG4gICAgICAgIH0gZWxzZSBpZiAocHJveHkuY291bnQgPT09IDAgJiYgIWJhaWwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCIvKipcbiAqIEFuIGFic3RyYWN0aW9uIGZvciBzbGljaW5nIGFuIGFycmF5YnVmZmVyIGV2ZW4gd2hlblxuICogQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYXJyYXlidWZmZXIuYnl0ZUxlbmd0aDtcbiAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICBlbmQgPSBlbmQgfHwgYnl0ZXM7XG5cbiAgaWYgKGFycmF5YnVmZmVyLnNsaWNlKSB7IHJldHVybiBhcnJheWJ1ZmZlci5zbGljZShzdGFydCwgZW5kKTsgfVxuXG4gIGlmIChzdGFydCA8IDApIHsgc3RhcnQgKz0gYnl0ZXM7IH1cbiAgaWYgKGVuZCA8IDApIHsgZW5kICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPiBieXRlcykgeyBlbmQgPSBieXRlczsgfVxuXG4gIGlmIChzdGFydCA+PSBieXRlcyB8fCBzdGFydCA+PSBlbmQgfHwgYnl0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApO1xuICB9XG5cbiAgdmFyIGFidiA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGVuZCAtIHN0YXJ0KTtcbiAgZm9yICh2YXIgaSA9IHN0YXJ0LCBpaSA9IDA7IGkgPCBlbmQ7IGkrKywgaWkrKykge1xuICAgIHJlc3VsdFtpaV0gPSBhYnZbaV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5idWZmZXI7XG59O1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgQmFja29mZmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICB0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7XG4gIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICBpZiAodGhpcy5qaXR0ZXIpIHtcbiAgICB2YXIgcmFuZCA9ICBNYXRoLnJhbmRvbSgpO1xuICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwICA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gIH1cbiAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtaW5pbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe1xuICB0aGlzLm1zID0gbWluO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uKG1heCl7XG4gIHRoaXMubWF4ID0gbWF4O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGppdHRlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24oaml0dGVyKXtcbiAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuXG4iLCIvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG5cbiAgLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuICB2YXIgbG9va3VwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gIH1cblxuICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gXCJcIjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoKGxlbiAlIDMpID09PSAyKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NDtcbiAgfTtcblxuICBleHBvcnRzLmRlY29kZSA9ICBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXG4gICAgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsxKV07XG4gICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzIpXTtcbiAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMyldO1xuXG4gICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbiAgfTtcbn0pKCk7XG4iLCIvKipcbiAqIENyZWF0ZSBhIGJsb2IgYnVpbGRlciBldmVuIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gKi9cblxudmFyIEJsb2JCdWlsZGVyID0gZ2xvYmFsLkJsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5XZWJLaXRCbG9iQnVpbGRlclxuICB8fCBnbG9iYWwuTVNCbG9iQnVpbGRlclxuICB8fCBnbG9iYWwuTW96QmxvYkJ1aWxkZXI7XG5cbi8qKlxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBpcyBzdXBwb3J0ZWRcbiAqL1xuXG52YXIgYmxvYlN1cHBvcnRlZCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYSA9IG5ldyBCbG9iKFsnaGknXSk7XG4gICAgcmV0dXJuIGEuc2l6ZSA9PT0gMjtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KSgpO1xuXG4vKipcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3Igc3VwcG9ydHMgQXJyYXlCdWZmZXJWaWV3c1xuICogRmFpbHMgaW4gU2FmYXJpIDYsIHNvIHdlIG5lZWQgdG8gbWFwIHRvIEFycmF5QnVmZmVycyB0aGVyZS5cbiAqL1xuXG52YXIgYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID0gYmxvYlN1cHBvcnRlZCAmJiAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGIgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoWzEsMl0pXSk7XG4gICAgcmV0dXJuIGIuc2l6ZSA9PT0gMjtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KSgpO1xuXG4vKipcbiAqIENoZWNrIGlmIEJsb2JCdWlsZGVyIGlzIHN1cHBvcnRlZFxuICovXG5cbnZhciBibG9iQnVpbGRlclN1cHBvcnRlZCA9IEJsb2JCdWlsZGVyXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmRcbiAgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmdldEJsb2I7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgbWFwcyBBcnJheUJ1ZmZlclZpZXdzIHRvIEFycmF5QnVmZmVyc1xuICogVXNlZCBieSBCbG9iQnVpbGRlciBjb25zdHJ1Y3RvciBhbmQgb2xkIGJyb3dzZXJzIHRoYXQgZGlkbid0XG4gKiBzdXBwb3J0IGl0IGluIHRoZSBCbG9iIGNvbnN0cnVjdG9yLlxuICovXG5cbmZ1bmN0aW9uIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNodW5rID0gYXJ5W2ldO1xuICAgIGlmIChjaHVuay5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgdmFyIGJ1ZiA9IGNodW5rLmJ1ZmZlcjtcblxuICAgICAgLy8gaWYgdGhpcyBpcyBhIHN1YmFycmF5LCBtYWtlIGEgY29weSBzbyB3ZSBvbmx5XG4gICAgICAvLyBpbmNsdWRlIHRoZSBzdWJhcnJheSByZWdpb24gZnJvbSB0aGUgdW5kZXJseWluZyBidWZmZXJcbiAgICAgIGlmIChjaHVuay5ieXRlTGVuZ3RoICE9PSBidWYuYnl0ZUxlbmd0aCkge1xuICAgICAgICB2YXIgY29weSA9IG5ldyBVaW50OEFycmF5KGNodW5rLmJ5dGVMZW5ndGgpO1xuICAgICAgICBjb3B5LnNldChuZXcgVWludDhBcnJheShidWYsIGNodW5rLmJ5dGVPZmZzZXQsIGNodW5rLmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgYnVmID0gY29weS5idWZmZXI7XG4gICAgICB9XG5cbiAgICAgIGFyeVtpXSA9IGJ1ZjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGJiID0gbmV3IEJsb2JCdWlsZGVyKCk7XG4gIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgIGJiLmFwcGVuZChhcnlbaV0pO1xuICB9XG5cbiAgcmV0dXJuIChvcHRpb25zLnR5cGUpID8gYmIuZ2V0QmxvYihvcHRpb25zLnR5cGUpIDogYmIuZ2V0QmxvYigpO1xufTtcblxuZnVuY3Rpb24gQmxvYkNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSk7XG4gIHJldHVybiBuZXcgQmxvYihhcnksIG9wdGlvbnMgfHwge30pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGlmIChibG9iU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldyA/IGdsb2JhbC5CbG9iIDogQmxvYkNvbnN0cnVjdG9yO1xuICB9IGVsc2UgaWYgKGJsb2JCdWlsZGVyU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIEJsb2JCdWlsZGVyQ29uc3RydWN0b3I7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufSkoKTtcbiIsIi8qKlxuICogU2xpY2UgcmVmZXJlbmNlLlxuICovXG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG4vKipcbiAqIEJpbmQgYG9iamAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIGZuKXtcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBmbikgZm4gPSBvYmpbZm5dO1xuICBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgZm4pIHRocm93IG5ldyBFcnJvcignYmluZCgpIHJlcXVpcmVzIGEgZnVuY3Rpb24nKTtcbiAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICB9XG59O1xuIiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsIGIpe1xuICB2YXIgZm4gPSBmdW5jdGlvbigpe307XG4gIGZuLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xuICBhLnByb3RvdHlwZSA9IG5ldyBmbjtcbiAgYS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBhO1xufTsiLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0cyBwYXJzZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIGluZGV4ID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gU29ja2V0ICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tldCkpIHJldHVybiBuZXcgU29ja2V0KHVyaSwgb3B0cyk7XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgaWYgKHVyaSAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gbnVsbDtcbiAgfVxuXG4gIGlmICh1cmkpIHtcbiAgICB1cmkgPSBwYXJzZXVyaSh1cmkpO1xuICAgIG9wdHMuaG9zdG5hbWUgPSB1cmkuaG9zdDtcbiAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gJ2h0dHBzJyB8fCB1cmkucHJvdG9jb2wgPT09ICd3c3MnO1xuICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgIGlmICh1cmkucXVlcnkpIG9wdHMucXVlcnkgPSB1cmkucXVlcnk7XG4gIH0gZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgfVxuXG4gIHRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZSA/IG9wdHMuc2VjdXJlXG4gICAgOiAoZ2xvYmFsLmxvY2F0aW9uICYmICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbCk7XG5cbiAgaWYgKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCkge1xuICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICBvcHRzLnBvcnQgPSB0aGlzLnNlY3VyZSA/ICc0NDMnIDogJzgwJztcbiAgfVxuXG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICB0aGlzLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZSB8fFxuICAgIChnbG9iYWwubG9jYXRpb24gPyBsb2NhdGlvbi5ob3N0bmFtZSA6ICdsb2NhbGhvc3QnKTtcbiAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0IHx8IChnbG9iYWwubG9jYXRpb24gJiYgbG9jYXRpb24ucG9ydFxuICAgICAgPyBsb2NhdGlvbi5wb3J0XG4gICAgICA6ICh0aGlzLnNlY3VyZSA/IDQ0MyA6IDgwKSk7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLnF1ZXJ5KSB0aGlzLnF1ZXJ5ID0gcGFyc2Vxcy5kZWNvZGUodGhpcy5xdWVyeSk7XG4gIHRoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7XG4gIHRoaXMucGF0aCA9IChvcHRzLnBhdGggfHwgJy9lbmdpbmUuaW8nKS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy8nO1xuICB0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDtcbiAgdGhpcy5qc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuICB0aGlzLmZvcmNlQmFzZTY0ID0gISFvcHRzLmZvcmNlQmFzZTY0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjtcbiAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW0gfHwgJ3QnO1xuICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgdGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsICd3ZWJzb2NrZXQnXTtcbiAgdGhpcy50cmFuc3BvcnRPcHRpb25zID0gb3B0cy50cmFuc3BvcnRPcHRpb25zIHx8IHt9O1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICB0aGlzLnBvbGljeVBvcnQgPSBvcHRzLnBvbGljeVBvcnQgfHwgODQzO1xuICB0aGlzLnJlbWVtYmVyVXBncmFkZSA9IG9wdHMucmVtZW1iZXJVcGdyYWRlIHx8IGZhbHNlO1xuICB0aGlzLmJpbmFyeVR5cGUgPSBudWxsO1xuICB0aGlzLm9ubHlCaW5hcnlVcGdyYWRlcyA9IG9wdHMub25seUJpbmFyeVVwZ3JhZGVzO1xuICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gZmFsc2UgIT09IG9wdHMucGVyTWVzc2FnZURlZmxhdGUgPyAob3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB7fSkgOiBmYWxzZTtcblxuICBpZiAodHJ1ZSA9PT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSkgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O1xuICBpZiAodGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSAmJiBudWxsID09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQgPSAxMDI0O1xuICB9XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZnggfHwgbnVsbDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2UgfHwgbnVsbDtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0IHx8IG51bGw7XG4gIHRoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycyB8fCBudWxsO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIHRoaXMuZm9yY2VOb2RlID0gISFvcHRzLmZvcmNlTm9kZTtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbDtcbiAgaWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsKSB7XG4gICAgaWYgKG9wdHMuZXh0cmFIZWFkZXJzICYmIE9iamVjdC5rZXlzKG9wdHMuZXh0cmFIZWFkZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmxvY2FsQWRkcmVzcykge1xuICAgICAgdGhpcy5sb2NhbEFkZHJlc3MgPSBvcHRzLmxvY2FsQWRkcmVzcztcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgb24gaGFuZHNoYWtlXG4gIHRoaXMuaWQgPSBudWxsO1xuICB0aGlzLnVwZ3JhZGVzID0gbnVsbDtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBudWxsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gbnVsbDtcblxuICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucGluZ0ludGVydmFsVGltZXIgPSBudWxsO1xuICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSBudWxsO1xuXG4gIHRoaXMub3BlbigpO1xufVxuXG5Tb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRoaXMgaXMgYW4gaW50XG5cbi8qKlxuICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XG4gKiBhbmQgc3RhbmRhbG9uZSBicm93c2VyIGFjY2Vzcy5cbiAqL1xuXG5Tb2NrZXQuU29ja2V0ID0gU29ja2V0O1xuU29ja2V0LlRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0Jyk7XG5Tb2NrZXQudHJhbnNwb3J0cyA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0cy9pbmRleCcpO1xuU29ja2V0LnBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRyYW5zcG9ydCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEByZXR1cm4ge1RyYW5zcG9ydH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuY3JlYXRlVHJhbnNwb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVidWcoJ2NyZWF0aW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHF1ZXJ5ID0gY2xvbmUodGhpcy5xdWVyeSk7XG5cbiAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gIHF1ZXJ5LkVJTyA9IHBhcnNlci5wcm90b2NvbDtcblxuICAvLyB0cmFuc3BvcnQgbmFtZVxuICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuXG4gIC8vIHBlci10cmFuc3BvcnQgb3B0aW9uc1xuICB2YXIgb3B0aW9ucyA9IHRoaXMudHJhbnNwb3J0T3B0aW9uc1tuYW1lXSB8fCB7fTtcblxuICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgaWYgKHRoaXMuaWQpIHF1ZXJ5LnNpZCA9IHRoaXMuaWQ7XG5cbiAgdmFyIHRyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRzW25hbWVdKHtcbiAgICBxdWVyeTogcXVlcnksXG4gICAgc29ja2V0OiB0aGlzLFxuICAgIGFnZW50OiBvcHRpb25zLmFnZW50IHx8IHRoaXMuYWdlbnQsXG4gICAgaG9zdG5hbWU6IG9wdGlvbnMuaG9zdG5hbWUgfHwgdGhpcy5ob3N0bmFtZSxcbiAgICBwb3J0OiBvcHRpb25zLnBvcnQgfHwgdGhpcy5wb3J0LFxuICAgIHNlY3VyZTogb3B0aW9ucy5zZWN1cmUgfHwgdGhpcy5zZWN1cmUsXG4gICAgcGF0aDogb3B0aW9ucy5wYXRoIHx8IHRoaXMucGF0aCxcbiAgICBmb3JjZUpTT05QOiBvcHRpb25zLmZvcmNlSlNPTlAgfHwgdGhpcy5mb3JjZUpTT05QLFxuICAgIGpzb25wOiBvcHRpb25zLmpzb25wIHx8IHRoaXMuanNvbnAsXG4gICAgZm9yY2VCYXNlNjQ6IG9wdGlvbnMuZm9yY2VCYXNlNjQgfHwgdGhpcy5mb3JjZUJhc2U2NCxcbiAgICBlbmFibGVzWERSOiBvcHRpb25zLmVuYWJsZXNYRFIgfHwgdGhpcy5lbmFibGVzWERSLFxuICAgIHRpbWVzdGFtcFJlcXVlc3RzOiBvcHRpb25zLnRpbWVzdGFtcFJlcXVlc3RzIHx8IHRoaXMudGltZXN0YW1wUmVxdWVzdHMsXG4gICAgdGltZXN0YW1wUGFyYW06IG9wdGlvbnMudGltZXN0YW1wUGFyYW0gfHwgdGhpcy50aW1lc3RhbXBQYXJhbSxcbiAgICBwb2xpY3lQb3J0OiBvcHRpb25zLnBvbGljeVBvcnQgfHwgdGhpcy5wb2xpY3lQb3J0LFxuICAgIHBmeDogb3B0aW9ucy5wZnggfHwgdGhpcy5wZngsXG4gICAga2V5OiBvcHRpb25zLmtleSB8fCB0aGlzLmtleSxcbiAgICBwYXNzcGhyYXNlOiBvcHRpb25zLnBhc3NwaHJhc2UgfHwgdGhpcy5wYXNzcGhyYXNlLFxuICAgIGNlcnQ6IG9wdGlvbnMuY2VydCB8fCB0aGlzLmNlcnQsXG4gICAgY2E6IG9wdGlvbnMuY2EgfHwgdGhpcy5jYSxcbiAgICBjaXBoZXJzOiBvcHRpb25zLmNpcGhlcnMgfHwgdGhpcy5jaXBoZXJzLFxuICAgIHJlamVjdFVuYXV0aG9yaXplZDogb3B0aW9ucy5yZWplY3RVbmF1dGhvcml6ZWQgfHwgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQsXG4gICAgcGVyTWVzc2FnZURlZmxhdGU6IG9wdGlvbnMucGVyTWVzc2FnZURlZmxhdGUgfHwgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSxcbiAgICBleHRyYUhlYWRlcnM6IG9wdGlvbnMuZXh0cmFIZWFkZXJzIHx8IHRoaXMuZXh0cmFIZWFkZXJzLFxuICAgIGZvcmNlTm9kZTogb3B0aW9ucy5mb3JjZU5vZGUgfHwgdGhpcy5mb3JjZU5vZGUsXG4gICAgbG9jYWxBZGRyZXNzOiBvcHRpb25zLmxvY2FsQWRkcmVzcyB8fCB0aGlzLmxvY2FsQWRkcmVzcyxcbiAgICByZXF1ZXN0VGltZW91dDogb3B0aW9ucy5yZXF1ZXN0VGltZW91dCB8fCB0aGlzLnJlcXVlc3RUaW1lb3V0LFxuICAgIHByb3RvY29sczogb3B0aW9ucy5wcm90b2NvbHMgfHwgdm9pZCAoMClcbiAgfSk7XG5cbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn07XG5cbmZ1bmN0aW9uIGNsb25lIChvYmopIHtcbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBvW2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRyYW5zcG9ydDtcbiAgaWYgKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9PSAtMSkge1xuICAgIHRyYW5zcG9ydCA9ICd3ZWJzb2NrZXQnO1xuICB9IGVsc2UgaWYgKDAgPT09IHRoaXMudHJhbnNwb3J0cy5sZW5ndGgpIHtcbiAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgfVxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG5cbiAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICB0cnkge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cmFuc3BvcnQub3BlbigpO1xuICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgZGVidWcoJ3NldHRpbmcgdHJhbnNwb3J0ICVzJywgdHJhbnNwb3J0Lm5hbWUpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgZGVidWcoJ2NsZWFyaW5nIGV4aXN0aW5nIHRyYW5zcG9ydCAlcycsIHRoaXMudHJhbnNwb3J0Lm5hbWUpO1xuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICB0cmFuc3BvcnRcbiAgLm9uKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uRHJhaW4oKTtcbiAgfSlcbiAgLm9uKCdwYWNrZXQnLCBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9KVxuICAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoZSk7XG4gIH0pXG4gIC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFByb2JlcyBhIHRyYW5zcG9ydC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucHJvYmUgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gIHZhciB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydChuYW1lLCB7IHByb2JlOiAxIH0pO1xuICB2YXIgZmFpbGVkID0gZmFsc2U7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuICgpIHtcbiAgICBpZiAoc2VsZi5vbmx5QmluYXJ5VXBncmFkZXMpIHtcbiAgICAgIHZhciB1cGdyYWRlTG9zZXNCaW5hcnkgPSAhdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtcbiAgICAgIGZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7XG4gICAgfVxuICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICdwaW5nJywgZGF0YTogJ3Byb2JlJyB9XSk7XG4gICAgdHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgIGlmICgncG9uZycgPT09IG1zZy50eXBlICYmICdwcm9iZScgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIHBvbmcnLCBuYW1lKTtcbiAgICAgICAgc2VsZi51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGluZycsIHRyYW5zcG9ydCk7XG4gICAgICAgIGlmICghdHJhbnNwb3J0KSByZXR1cm47XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICAgICAgZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgIHNlbGYudHJhbnNwb3J0LnBhdXNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICBkZWJ1ZygnY2hhbmdpbmcgdHJhbnNwb3J0IGFuZCBzZW5kaW5nIHVwZ3JhZGUgcGFja2V0Jyk7XG5cbiAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICd1cGdyYWRlJyB9XSk7XG4gICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO1xuICAgICAgICBlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCAoKSB7XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG4gICAgZmFpbGVkID0gdHJ1ZTtcblxuICAgIGNsZWFudXAoKTtcblxuICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gIH1cblxuICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9uZXJyb3IgKGVycikge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO1xuICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLCBuYW1lLCBlcnIpO1xuXG4gICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlICgpIHtcbiAgICBvbmVycm9yKCd0cmFuc3BvcnQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25jbG9zZSAoKSB7XG4gICAgb25lcnJvcignc29ja2V0IGNsb3NlZCcpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb251cGdyYWRlICh0bykge1xuICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgIGRlYnVnKCdcIiVzXCIgd29ya3MgLSBhYm9ydGluZyBcIiVzXCInLCB0by5uYW1lLCB0cmFuc3BvcnQubmFtZSk7XG4gICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG4gIH1cblxuICB0cmFuc3BvcnQub25jZSgnb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gIHRyYW5zcG9ydC5vbmNlKCdlcnJvcicsIG9uZXJyb3IpO1xuICB0cmFuc3BvcnQub25jZSgnY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcblxuICB0aGlzLm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIHRoaXMub25jZSgndXBncmFkaW5nJywgb251cGdyYWRlKTtcblxuICB0cmFuc3BvcnQub3BlbigpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzb2NrZXQgb3BlbicpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gIHRoaXMuZmx1c2goKTtcblxuICAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4gIC8vIGxpc3RlbmVyIGFscmVhZHkgY2xvc2VkIHRoZSBzb2NrZXRcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSkge1xuICAgIGRlYnVnKCdzdGFydGluZyB1cGdyYWRlIHByb2JlcycpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy51cGdyYWRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgcmVjZWl2ZTogdHlwZSBcIiVzXCIsIGRhdGEgXCIlc1wiJywgcGFja2V0LnR5cGUsIHBhY2tldC5kYXRhKTtcblxuICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcblxuICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICB0aGlzLmVtaXQoJ2hlYXJ0YmVhdCcpO1xuXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgIHRoaXMub25IYW5kc2hha2UoSlNPTi5wYXJzZShwYWNrZXQuZGF0YSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncG9uZyc6XG4gICAgICAgIHRoaXMuc2V0UGluZygpO1xuICAgICAgICB0aGlzLmVtaXQoJ3BvbmcnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignc2VydmVyIGVycm9yJyk7XG4gICAgICAgIGVyci5jb2RlID0gcGFja2V0LmRhdGE7XG4gICAgICAgIHRoaXMub25FcnJvcihlcnIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgcGFja2V0LmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRzaGFrZSBvYmpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IYW5kc2hha2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2hhbmRzaGFrZScsIGRhdGEpO1xuICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gIHRoaXMub25PcGVuKCk7XG4gIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgdGhpcy5zZXRQaW5nKCk7XG5cbiAgLy8gUHJvbG9uZyBsaXZlbmVzcyBvZiBzb2NrZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xuICB0aGlzLm9uKCdoZWFydGJlYXQnLCB0aGlzLm9uSGVhcnRiZWF0KTtcbn07XG5cbi8qKlxuICogUmVzZXRzIHBpbmcgdGltZW91dC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5waW5nVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICBzZWxmLm9uQ2xvc2UoJ3BpbmcgdGltZW91dCcpO1xuICB9LCB0aW1lb3V0IHx8IChzZWxmLnBpbmdJbnRlcnZhbCArIHNlbGYucGluZ1RpbWVvdXQpKTtcbn07XG5cbi8qKlxuICogUGluZ3Mgc2VydmVyIGV2ZXJ5IGB0aGlzLnBpbmdJbnRlcnZhbGAgYW5kIGV4cGVjdHMgcmVzcG9uc2VcbiAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZXRQaW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGNsZWFyVGltZW91dChzZWxmLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgc2VsZi5waW5nSW50ZXJ2YWxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnKCd3cml0aW5nIHBpbmcgcGFja2V0IC0gZXhwZWN0aW5nIHBvbmcgd2l0aGluICVzbXMnLCBzZWxmLnBpbmdUaW1lb3V0KTtcbiAgICBzZWxmLnBpbmcoKTtcbiAgICBzZWxmLm9uSGVhcnRiZWF0KHNlbGYucGluZ1RpbWVvdXQpO1xuICB9LCBzZWxmLnBpbmdJbnRlcnZhbCk7XG59O1xuXG4vKipcbiogU2VuZHMgYSBwaW5nIHBhY2tldC5cbipcbiogQGFwaSBwcml2YXRlXG4qL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5zZW5kUGFja2V0KCdwaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuZW1pdCgncGluZycpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIG9uIGBkcmFpbmAgZXZlbnRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsIHRoaXMucHJldkJ1ZmZlckxlbik7XG5cbiAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcblxuICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICB0aGlzLmVtaXQoJ2RyYWluJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnICE9PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAhdGhpcy51cGdyYWRpbmcgJiYgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICBkZWJ1ZygnZmx1c2hpbmcgJWQgcGFja2V0cyBpbiBzb2NrZXQnLCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCk7XG4gICAgdGhpcy50cmFuc3BvcnQuc2VuZCh0aGlzLndyaXRlQnVmZmVyKTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7XG4gICAgdGhpcy5lbWl0KCdmbHVzaCcpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgbWVzc2FnZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS53cml0ZSA9XG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobXNnLCBvcHRpb25zLCBmbikge1xuICB0aGlzLnNlbmRQYWNrZXQoJ21lc3NhZ2UnLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2VuZFBhY2tldCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIGlmICgnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcblxuICB2YXIgcGFja2V0ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogZGF0YSxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG4gIHRoaXMuZW1pdCgncGFja2V0Q3JlYXRlJywgcGFja2V0KTtcbiAgdGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIGlmIChmbikgdGhpcy5vbmNlKCdmbHVzaCcsIGZuKTtcbiAgdGhpcy5mbHVzaCgpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NpbmcnO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgIHNlbGYub25DbG9zZSgnZm9yY2VkIGNsb3NlJyk7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtcbiAgICBzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW51cEFuZENsb3NlICgpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIGNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSAoKSB7XG4gICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICBzZWxmLm9uY2UoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYub25jZSgndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdzb2NrZXQgZXJyb3IgJWonLCBlcnIpO1xuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB0aGlzLm9uQ2xvc2UoJ3RyYW5zcG9ydCBlcnJvcicsIGVycik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAocmVhc29uLCBkZXNjKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgY2xvc2Ugd2l0aCByZWFzb246IFwiJXNcIicsIHJlYXNvbik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gY2xlYXIgdGltZXJzXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ0ludGVydmFsVGltZXIpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuXG4gICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpO1xuXG4gICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuXG4gICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgIHRoaXMuaWQgPSBudWxsO1xuXG4gICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24sIGRlc2MpO1xuXG4gICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgLy8gZ3JhYiB0aGUgYnVmZmVycyBvbiBgY2xvc2VgIGV2ZW50XG4gICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgIHNlbGYucHJldkJ1ZmZlckxlbiA9IDA7XG4gIH1cbn07XG5cbi8qKlxuICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5maWx0ZXJVcGdyYWRlcyA9IGZ1bmN0aW9uICh1cGdyYWRlcykge1xuICB2YXIgZmlsdGVyZWRVcGdyYWRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IHVwZ3JhZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgIGlmICh+aW5kZXgodGhpcy50cmFuc3BvcnRzLCB1cGdyYWRlc1tpXSkpIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc3BvcnQ7XG5cbi8qKlxuICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gVHJhbnNwb3J0IChvcHRzKSB7XG4gIHRoaXMucGF0aCA9IG9wdHMucGF0aDtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7XG4gIHRoaXMucG9ydCA9IG9wdHMucG9ydDtcbiAgdGhpcy5zZWN1cmUgPSBvcHRzLnNlY3VyZTtcbiAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtO1xuICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgdGhpcy5yZWFkeVN0YXRlID0gJyc7XG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuICB0aGlzLmZvcmNlTm9kZSA9IG9wdHMuZm9yY2VOb2RlO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gIHRoaXMubG9jYWxBZGRyZXNzID0gb3B0cy5sb2NhbEFkZHJlc3M7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFRyYW5zcG9ydC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEVtaXRzIGFuIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChtc2csIGRlc2MpIHtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIudHlwZSA9ICdUcmFuc3BvcnRFcnJvcic7XG4gIGVyci5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgICB0aGlzLmRvT3BlbigpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgIHRoaXMub25DbG9zZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBub3Qgb3BlbicpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIG9wZW5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHBhY2tldCA9IHBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gIHRoaXMub25QYWNrZXQocGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIHRoaXMuZW1pdCgnY2xvc2UnKTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdC1zc2wnKTtcbnZhciBYSFIgPSByZXF1aXJlKCcuL3BvbGxpbmcteGhyJyk7XG52YXIgSlNPTlAgPSByZXF1aXJlKCcuL3BvbGxpbmctanNvbnAnKTtcbnZhciB3ZWJzb2NrZXQgPSByZXF1aXJlKCcuL3dlYnNvY2tldCcpO1xuXG4vKipcbiAqIEV4cG9ydCB0cmFuc3BvcnRzLlxuICovXG5cbmV4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7XG5leHBvcnRzLndlYnNvY2tldCA9IHdlYnNvY2tldDtcblxuLyoqXG4gKiBQb2xsaW5nIHRyYW5zcG9ydCBwb2x5bW9ycGhpYyBjb25zdHJ1Y3Rvci5cbiAqIERlY2lkZXMgb24geGhyIHZzIGpzb25wIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBvbGxpbmcgKG9wdHMpIHtcbiAgdmFyIHhocjtcbiAgdmFyIHhkID0gZmFsc2U7XG4gIHZhciB4cyA9IGZhbHNlO1xuICB2YXIganNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcblxuICBpZiAoZ2xvYmFsLmxvY2F0aW9uKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHhkID0gb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgIHhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG5cbiAgb3B0cy54ZG9tYWluID0geGQ7XG4gIG9wdHMueHNjaGVtZSA9IHhzO1xuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG5cbiAgaWYgKCdvcGVuJyBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCkge1xuICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghanNvbnApIHRocm93IG5ldyBFcnJvcignSlNPTlAgZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gbmV3IEpTT05QKG9wdHMpO1xuICB9XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlBQb2xsaW5nO1xuXG4vKipcbiAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICovXG5cbnZhciByTmV3bGluZSA9IC9cXG4vZztcbnZhciByRXNjYXBlZE5ld2xpbmUgPSAvXFxcXG4vZztcblxuLyoqXG4gKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxuICovXG5cbnZhciBjYWxsYmFja3M7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7IH1cblxuLyoqXG4gKiBKU09OUCBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBKU09OUFBvbGxpbmcgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuXG4gIC8vIGRlZmluZSBnbG9iYWwgY2FsbGJhY2tzIGFycmF5IGlmIG5vdCBwcmVzZW50XG4gIC8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG4gIGlmICghY2FsbGJhY2tzKSB7XG4gICAgLy8gd2UgbmVlZCB0byBjb25zaWRlciBtdWx0aXBsZSBlbmdpbmVzIGluIHRoZSBzYW1lIHBhZ2VcbiAgICBpZiAoIWdsb2JhbC5fX19laW8pIGdsb2JhbC5fX19laW8gPSBbXTtcbiAgICBjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvO1xuICB9XG5cbiAgLy8gY2FsbGJhY2sgaWRlbnRpZmllclxuICB0aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgIHNlbGYub25EYXRhKG1zZyk7XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbiAgdGhpcy5xdWVyeS5qID0gdGhpcy5pbmRleDtcblxuICAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2NyaXB0KSBzZWxmLnNjcmlwdC5vbmVycm9yID0gZW1wdHk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoSlNPTlBQb2xsaW5nLCBQb2xsaW5nKTtcblxuLypcbiAqIEpTT05QIG9ubHkgc3VwcG9ydHMgYmluYXJ5IGFzIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG5cbi8qKlxuICogQ2xvc2VzIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gIH1cblxuICBpZiAodGhpcy5mb3JtKSB7XG4gICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgIHRoaXMuaWZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgc2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7XG4gIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGwgZXJyb3InLCBlKTtcbiAgfTtcblxuICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIGlmIChpbnNlcnRBdCkge1xuICAgIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuICB9IGVsc2Uge1xuICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cbiAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgdmFyIGlzVUFnZWNrbyA9ICd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmF2aWdhdG9yICYmIC9nZWNrby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgaWYgKGlzVUFnZWNrbykge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgIH0sIDEwMCk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAoIXRoaXMuZm9ybSkge1xuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIHZhciBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB2YXIgaWQgPSB0aGlzLmlmcmFtZUlkID0gJ2Vpb19pZnJhbWVfJyArIHRoaXMuaW5kZXg7XG4gICAgdmFyIGlmcmFtZTtcblxuICAgIGZvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcbiAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBmb3JtLnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICBmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7XG4gICAgZm9ybS50YXJnZXQgPSBpZDtcbiAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCAndXRmLTgnKTtcbiAgICBhcmVhLm5hbWUgPSAnZCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICB9XG5cbiAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7XG5cbiAgZnVuY3Rpb24gY29tcGxldGUgKCkge1xuICAgIGluaXRJZnJhbWUoKTtcbiAgICBmbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdElmcmFtZSAoKSB7XG4gICAgaWYgKHNlbGYuaWZyYW1lKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGxpbmcgaWZyYW1lIHJlbW92YWwgZXJyb3InLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICB2YXIgaHRtbCA9ICc8aWZyYW1lIHNyYz1cImphdmFzY3JpcHQ6MFwiIG5hbWU9XCInICsgc2VsZi5pZnJhbWVJZCArICdcIj4nO1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDowJztcbiAgICB9XG5cbiAgICBpZnJhbWUuaWQgPSBzZWxmLmlmcmFtZUlkO1xuXG4gICAgc2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgc2VsZi5pZnJhbWUgPSBpZnJhbWU7XG4gIH1cblxuICBpbml0SWZyYW1lKCk7XG5cbiAgLy8gZXNjYXBlIFxcbiB0byBwcmV2ZW50IGl0IGZyb20gYmVpbmcgY29udmVydGVkIGludG8gXFxyXFxuIGJ5IHNvbWUgVUFzXG4gIC8vIGRvdWJsZSBlc2NhcGluZyBpcyByZXF1aXJlZCBmb3IgZXNjYXBlZCBuZXcgbGluZXMgYmVjYXVzZSB1bmVzY2FwaW5nIG9mIG5ldyBsaW5lcyBjYW4gYmUgZG9uZSBzYWZlbHkgb24gc2VydmVyLXNpZGVcbiAgZGF0YSA9IGRhdGEucmVwbGFjZShyRXNjYXBlZE5ld2xpbmUsICdcXFxcXFxuJyk7XG4gIHRoaXMuYXJlYS52YWx1ZSA9IGRhdGEucmVwbGFjZShyTmV3bGluZSwgJ1xcXFxuJyk7XG5cbiAgdHJ5IHtcbiAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgdGhpcy5pZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaWZyYW1lLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICB9XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUjtcbm1vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIEVtcHR5IGZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gZW1wdHkgKCkge31cblxuLyoqXG4gKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBYSFIgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICBpZiAoZ2xvYmFsLmxvY2F0aW9uKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHRoaXMueGQgPSBvcHRzLmhvc3RuYW1lICE9PSBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgfHxcbiAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICB0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoWEhSLCBQb2xsaW5nKTtcblxuLyoqXG4gKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gKi9cblxuWEhSLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIG9wdHMudXJpID0gdGhpcy51cmkoKTtcbiAgb3B0cy54ZCA9IHRoaXMueGQ7XG4gIG9wdHMueHMgPSB0aGlzLnhzO1xuICBvcHRzLmFnZW50ID0gdGhpcy5hZ2VudCB8fCBmYWxzZTtcbiAgb3B0cy5zdXBwb3J0c0JpbmFyeSA9IHRoaXMuc3VwcG9ydHNCaW5hcnk7XG4gIG9wdHMuZW5hYmxlc1hEUiA9IHRoaXMuZW5hYmxlc1hEUjtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIG9wdHMucmVxdWVzdFRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMuZXh0cmFIZWFkZXJzID0gdGhpcy5leHRyYUhlYWRlcnM7XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG9wdHMpO1xufTtcblxuLyoqXG4gKiBTZW5kcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICB2YXIgaXNCaW5hcnkgPSB0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgJiYgZGF0YSAhPT0gdW5kZWZpbmVkO1xuICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnUE9TVCcsIGRhdGE6IGRhdGEsIGlzQmluYXJ5OiBpc0JpbmFyeSB9KTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXEub24oJ3N1Y2Nlc3MnLCBmbik7XG4gIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9zdCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnNlbmRYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCd4aHIgcG9sbCcpO1xuICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBzZWxmLm9uRGF0YShkYXRhKTtcbiAgfSk7XG4gIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnBvbGxYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0IChvcHRzKSB7XG4gIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ0dFVCc7XG4gIHRoaXMudXJpID0gb3B0cy51cmk7XG4gIHRoaXMueGQgPSAhIW9wdHMueGQ7XG4gIHRoaXMueHMgPSAhIW9wdHMueHM7XG4gIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudDtcbiAgdGhpcy5pc0JpbmFyeSA9IG9wdHMuaXNCaW5hcnk7XG4gIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG4gIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBvcHRzLnJlcXVlc3RUaW1lb3V0O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycztcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRzID0geyBhZ2VudDogdGhpcy5hZ2VudCwgeGRvbWFpbjogdGhpcy54ZCwgeHNjaGVtZTogdGhpcy54cywgZW5hYmxlc1hEUjogdGhpcy5lbmFibGVzWERSIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIHZhciB4aHIgPSB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRyeSB7XG4gICAgZGVidWcoJ3hociBvcGVuICVzOiAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVyaSk7XG4gICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICBpZiAoJ1BPU1QnID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnKi8qJyk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICh0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICB9XG5cbiAgICAvLyBpZTYgY2hlY2tcbiAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgfTtcbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSAhPT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmICg0ICE9PSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25FcnJvcih4aHIuc3RhdHVzKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWJ1ZygneGhyIGRhdGEgJXMnLCB0aGlzLmRhdGEpO1xuICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZmhyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgIHRoaXMuaW5kZXggPSBSZXF1ZXN0LnJlcXVlc3RzQ291bnQrKztcbiAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlc3BvbnNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uU3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0KCdzdWNjZXNzJyk7XG4gIHRoaXMuY2xlYW51cCgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgaWYgd2UgaGF2ZSBkYXRhLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xuICB0aGlzLm9uU3VjY2VzcygpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgdGhpcy5jbGVhbnVwKHRydWUpO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgaG91c2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIChmcm9tRXJyb3IpIHtcbiAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8geG1saHR0cHJlcXVlc3RcbiAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICB0aGlzLnhoci5vbmxvYWQgPSB0aGlzLnhoci5vbmVycm9yID0gZW1wdHk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG4gIH1cblxuICBpZiAoZnJvbUVycm9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICBkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XTtcbiAgfVxuXG4gIHRoaXMueGhyID0gbnVsbDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gbG9hZC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkYXRhO1xuICB0cnkge1xuICAgIHZhciBjb250ZW50VHlwZTtcbiAgICB0cnkge1xuICAgICAgY29udGVudFR5cGUgPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICBpZiAoY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICBpZiAodGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAnYXJyYXlidWZmZXInKSB7XG4gICAgICAgIGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZSB8fCB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheSh0aGlzLnhoci5yZXNwb25zZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMub25FcnJvcihlKTtcbiAgfVxuICBpZiAobnVsbCAhPSBkYXRhKSB7XG4gICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaXQgaGFzIFhEb21haW5SZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmhhc1hEUiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmICF0aGlzLnhzICYmIHRoaXMuZW5hYmxlc1hEUjtcbn07XG5cbi8qKlxuICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xlYW51cCgpO1xufTtcblxuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5cblJlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7XG5SZXF1ZXN0LnJlcXVlc3RzID0ge307XG5cbmlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb251bmxvYWQnLCB1bmxvYWRIYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlciAoKSB7XG4gIGZvciAodmFyIGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgIGlmIChSZXF1ZXN0LnJlcXVlc3RzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBSZXF1ZXN0LnJlcXVlc3RzW2ldLmFib3J0KCk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIHllYXN0ID0gcmVxdWlyZSgneWVhc3QnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUG9sbGluZztcblxuLyoqXG4gKiBJcyBYSFIyIHN1cHBvcnRlZD9cbiAqL1xuXG52YXIgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHsgeGRvbWFpbjogZmFsc2UgfSk7XG4gIHJldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7XG59KSgpO1xuXG4vKipcbiAqIFBvbGxpbmcgaW50ZXJmYWNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBQb2xsaW5nIChvcHRzKSB7XG4gIHZhciBmb3JjZUJhc2U2NCA9IChvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQpO1xuICBpZiAoIWhhc1hIUjIgfHwgZm9yY2VCYXNlNjQpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChQb2xsaW5nLCBUcmFuc3BvcnQpO1xuXG4vKipcbiAqIFRyYW5zcG9ydCBuYW1lLlxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAncG9sbGluZyc7XG5cbi8qKlxuICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBvbGwoKTtcbn07XG5cbi8qKlxuICogUGF1c2VzIHBvbGxpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChvblBhdXNlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLnJlYWR5U3RhdGUgPSAncGF1c2luZyc7XG5cbiAgZnVuY3Rpb24gcGF1c2UgKCkge1xuICAgIGRlYnVnKCdwYXVzZWQnKTtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSAncGF1c2VkJztcbiAgICBvblBhdXNlKCk7XG4gIH1cblxuICBpZiAodGhpcy5wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHBvbGxpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlYnVnKCdwcmUtcGF1c2UgcG9sbGluZyBjb21wbGV0ZScpO1xuICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud3JpdGFibGUpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlJyk7XG4gICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwYXVzZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3BvbGxpbmcnKTtcbiAgdGhpcy5wb2xsaW5nID0gdHJ1ZTtcbiAgdGhpcy5kb1BvbGwoKTtcbiAgdGhpcy5lbWl0KCdwb2xsJyk7XG59O1xuXG4vKipcbiAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgZGVidWcoJ3BvbGxpbmcgZ290IGRhdGEgJXMnLCBkYXRhKTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKHBhY2tldCwgaW5kZXgsIHRvdGFsKSB7XG4gICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgIGlmICgnb3BlbmluZycgPT09IHNlbGYucmVhZHlTdGF0ZSkge1xuICAgICAgc2VsZi5vbk9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgaWYgKCdjbG9zZScgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8vIGRlY29kZSBwYXlsb2FkXG4gIHBhcnNlci5kZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcblxuICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICBpZiAoJ2Nsb3NlZCcgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwb2xsQ29tcGxldGUnKTtcblxuICAgIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgdGhpcy5wb2xsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgZGVidWcoJ3dyaXRpbmcgY2xvc2UgcGFja2V0Jyk7XG4gICAgc2VsZi53cml0ZShbeyB0eXBlOiAnY2xvc2UnIH1dKTtcbiAgfVxuXG4gIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCd0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmcnKTtcbiAgICBjbG9zZSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbiAgICBkZWJ1ZygndHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlJyk7XG4gICAgdGhpcy5vbmNlKCdvcGVuJywgY2xvc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICB2YXIgY2FsbGJhY2tmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gIH07XG5cbiAgcGFyc2VyLmVuY29kZVBheWxvYWQocGFja2V0cywgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBzZWxmLmRvV3JpdGUoZGF0YSwgY2FsbGJhY2tmbik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgdmFyIHNjaGVtYSA9IHRoaXMuc2VjdXJlID8gJ2h0dHBzJyA6ICdodHRwJztcbiAgdmFyIHBvcnQgPSAnJztcblxuICAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuICBpZiAoZmFsc2UgIT09IHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gIH1cblxuICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgIHF1ZXJ5LmI2NCA9IDE7XG4gIH1cblxuICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICBpZiAodGhpcy5wb3J0ICYmICgoJ2h0dHBzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgICgnaHR0cCcgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICB2YXIgaXB2NiA9IHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtcbiAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciB5ZWFzdCA9IHJlcXVpcmUoJ3llYXN0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldCcpO1xudmFyIEJyb3dzZXJXZWJTb2NrZXQgPSBnbG9iYWwuV2ViU29ja2V0IHx8IGdsb2JhbC5Nb3pXZWJTb2NrZXQ7XG52YXIgTm9kZVdlYlNvY2tldDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICB0cnkge1xuICAgIE5vZGVXZWJTb2NrZXQgPSByZXF1aXJlKCd3cycpO1xuICB9IGNhdGNoIChlKSB7IH1cbn1cblxuLyoqXG4gKiBHZXQgZWl0aGVyIHRoZSBgV2ViU29ja2V0YCBvciBgTW96V2ViU29ja2V0YCBnbG9iYWxzXG4gKiBpbiB0aGUgYnJvd3NlciBvciB0cnkgdG8gcmVzb2x2ZSBXZWJTb2NrZXQtY29tcGF0aWJsZVxuICogaW50ZXJmYWNlIGV4cG9zZWQgYnkgYHdzYCBmb3IgTm9kZS1saWtlIGVudmlyb25tZW50LlxuICovXG5cbnZhciBXZWJTb2NrZXQgPSBCcm93c2VyV2ViU29ja2V0O1xuaWYgKCFXZWJTb2NrZXQgJiYgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgV2ViU29ja2V0ID0gTm9kZVdlYlNvY2tldDtcbn1cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdTO1xuXG4vKipcbiAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gV1MgKG9wdHMpIHtcbiAgdmFyIGZvcmNlQmFzZTY0ID0gKG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NCk7XG4gIGlmIChmb3JjZUJhc2U2NCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZTtcbiAgdGhpcy51c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSBCcm93c2VyV2ViU29ja2V0ICYmICFvcHRzLmZvcmNlTm9kZTtcbiAgdGhpcy5wcm90b2NvbHMgPSBvcHRzLnByb3RvY29scztcbiAgaWYgKCF0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgIFdlYlNvY2tldCA9IE5vZGVXZWJTb2NrZXQ7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChXUywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbldTLnByb3RvdHlwZS5uYW1lID0gJ3dlYnNvY2tldCc7XG5cbi8qXG4gKiBXZWJTb2NrZXRzIHN1cHBvcnQgYmluYXJ5XG4gKi9cblxuV1MucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuLyoqXG4gKiBPcGVucyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmNoZWNrKCkpIHtcbiAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB1cmkgPSB0aGlzLnVyaSgpO1xuICB2YXIgcHJvdG9jb2xzID0gdGhpcy5wcm90b2NvbHM7XG4gIHZhciBvcHRzID0ge1xuICAgIGFnZW50OiB0aGlzLmFnZW50LFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlXG4gIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcbiAgfVxuICBpZiAodGhpcy5sb2NhbEFkZHJlc3MpIHtcbiAgICBvcHRzLmxvY2FsQWRkcmVzcyA9IHRoaXMubG9jYWxBZGRyZXNzO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB0aGlzLndzID0gdGhpcy51c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPyAocHJvdG9jb2xzID8gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scykgOiBuZXcgV2ViU29ja2V0KHVyaSkpIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGlmICh0aGlzLndzLmJpbmFyeVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLndzLnN1cHBvcnRzICYmIHRoaXMud3Muc3VwcG9ydHMuYmluYXJ5KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ25vZGVidWZmZXInO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gIH1cblxuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uT3BlbigpO1xuICB9O1xuICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCk7XG4gIH07XG4gIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgc2VsZi5vbkRhdGEoZXYuZGF0YSk7XG4gIH07XG4gIHRoaXMud3Mub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKCd3ZWJzb2NrZXQgZXJyb3InLCBlKTtcbiAgfTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcblxuICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gIHZhciB0b3RhbCA9IHBhY2tldHMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHRvdGFsOyBpIDwgbDsgaSsrKSB7XG4gICAgKGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgIHBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0LCBzZWxmLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoIXNlbGYudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICB2YXIgb3B0cyA9IHt9O1xuICAgICAgICAgIGlmIChwYWNrZXQub3B0aW9ucykge1xuICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IHBhY2tldC5vcHRpb25zLmNvbXByZXNzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gJ3N0cmluZycgPT09IHR5cGVvZiBkYXRhID8gZ2xvYmFsLkJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpIDogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobGVuIDwgc2VsZi5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgLy8gaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4gICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHNlbGYudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAvLyBUeXBlRXJyb3IgaXMgdGhyb3duIHdoZW4gcGFzc2luZyB0aGUgc2Vjb25kIGFyZ3VtZW50IG9uIFNhZmFyaVxuICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSwgb3B0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZGVidWcoJ3dlYnNvY2tldCBjbG9zZWQgYmVmb3JlIG9uY2xvc2UgZXZlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC0tdG90YWwgfHwgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSkocGFja2V0c1tpXSk7XG4gIH1cblxuICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICBzZWxmLmVtaXQoJ2ZsdXNoJyk7XG5cbiAgICAvLyBmYWtlIGRyYWluXG4gICAgLy8gZGVmZXIgdG8gbmV4dCB0aWNrIHRvIGFsbG93IFNvY2tldCB0byBjbGVhciB3cml0ZUJ1ZmZlclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2VcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIENsb3NlcyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgdGhpcy53cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLndzLmNsb3NlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gIHZhciBwb3J0ID0gJyc7XG5cbiAgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbiAgaWYgKHRoaXMucG9ydCAmJiAoKCd3c3MnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAoJ3dzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgcG9ydCA9ICc6JyArIHRoaXMucG9ydDtcbiAgfVxuXG4gIC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG4gIGlmICh0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgcXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICB9XG5cbiAgLy8gY29tbXVuaWNhdGUgYmluYXJ5IHN1cHBvcnQgY2FwYWJpbGl0aWVzXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgIHF1ZXJ5LmI2NCA9IDE7XG4gIH1cblxuICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICB2YXIgaXB2NiA9IHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtcbiAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG59O1xuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbldTLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICEhV2ViU29ja2V0ICYmICEoJ19faW5pdGlhbGl6ZScgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpO1xufTtcbiIsIi8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG5cbnZhciBoYXNDT1JTID0gcmVxdWlyZSgnaGFzLWNvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0cykge1xuICB2YXIgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcblxuICAvLyBzY2hlbWUgbXVzdCBiZSBzYW1lIHdoZW4gdXNpZ24gWERvbWFpblJlcXVlc3RcbiAgLy8gaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvaWVpbnRlcm5hbHMvYXJjaGl2ZS8yMDEwLzA1LzEzL3hkb21haW5yZXF1ZXN0LXJlc3RyaWN0aW9ucy1saW1pdGF0aW9ucy1hbmQtd29ya2Fyb3VuZHMuYXNweFxuICB2YXIgeHNjaGVtZSA9IG9wdHMueHNjaGVtZTtcblxuICAvLyBYRG9tYWluUmVxdWVzdCBoYXMgYSBmbG93IG9mIG5vdCBzZW5kaW5nIGNvb2tpZSwgdGhlcmVmb3JlIGl0IHNob3VsZCBiZSBkaXNhYmxlZCBhcyBhIGRlZmF1bHQuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2VuZ2luZS5pby1jbGllbnQvcHVsbC8yMTdcbiAgdmFyIGVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgLy8gWE1MSHR0cFJlcXVlc3QgY2FuIGJlIGRpc2FibGVkIG9uIElFXG4gIHRyeSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKCF4ZG9tYWluIHx8IGhhc0NPUlMpKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7IH1cblxuICAvLyBVc2UgWERvbWFpblJlcXVlc3QgZm9yIElFOCBpZiBlbmFibGVzWERSIGlzIHRydWVcbiAgLy8gYmVjYXVzZSBsb2FkaW5nIGJhciBrZWVwcyBmbGFzaGluZyB3aGVuIHVzaW5nIGpzb25wLXBvbGxpbmdcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3l1amlvc2FrYS9zb2NrZS5pby1pZTgtbG9hZGluZy1leGFtcGxlXG4gIHRyeSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgWERvbWFpblJlcXVlc3QgJiYgIXhzY2hlbWUgJiYgZW5hYmxlc1hEUikge1xuICAgICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgaWYgKCF4ZG9tYWluKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsW1snQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJyldKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG59O1xuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xudmFyIGhhc0JpbmFyeSA9IHJlcXVpcmUoJ2hhcy1iaW5hcnkyJyk7XG52YXIgc2xpY2VCdWZmZXIgPSByZXF1aXJlKCdhcnJheWJ1ZmZlci5zbGljZScpO1xudmFyIGFmdGVyID0gcmVxdWlyZSgnYWZ0ZXInKTtcbnZhciB1dGY4ID0gcmVxdWlyZSgnLi91dGY4Jyk7XG5cbnZhciBiYXNlNjRlbmNvZGVyO1xuaWYgKGdsb2JhbCAmJiBnbG9iYWwuQXJyYXlCdWZmZXIpIHtcbiAgYmFzZTY0ZW5jb2RlciA9IHJlcXVpcmUoJ2Jhc2U2NC1hcnJheWJ1ZmZlcicpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGFuIGFuZHJvaWQgYnJvd3Nlci4gVGhhdCByZXF1aXJlcyB1cyB0byB1c2VcbiAqIEFycmF5QnVmZmVyIHdpdGggcG9sbGluZyB0cmFuc3BvcnRzLi4uXG4gKlxuICogaHR0cDovL2doaW5kYS5uZXQvanBlZy1ibG9iLWFqYXgtYW5kcm9pZC9cbiAqL1xuXG52YXIgaXNBbmRyb2lkID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL0FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGluIFBoYW50b21KUy5cbiAqIFVwbG9hZGluZyBhIEJsb2Igd2l0aCBQaGFudG9tSlMgZG9lcyBub3Qgd29yayBjb3JyZWN0bHksIGFzIHJlcG9ydGVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxuICogQHR5cGUgYm9vbGVhblxuICovXG52YXIgaXNQaGFudG9tSlMgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvUGhhbnRvbUpTL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBXaGVuIHRydWUsIGF2b2lkcyB1c2luZyBCbG9icyB0byBlbmNvZGUgcGF5bG9hZHMuXG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBkb250U2VuZEJsb2JzID0gaXNBbmRyb2lkIHx8IGlzUGhhbnRvbUpTO1xuXG4vKipcbiAqIEN1cnJlbnQgcHJvdG9jb2wgdmVyc2lvbi5cbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gMztcblxuLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKi9cblxudmFyIHBhY2tldHMgPSBleHBvcnRzLnBhY2tldHMgPSB7XG4gICAgb3BlbjogICAgIDAgICAgLy8gbm9uLXdzXG4gICwgY2xvc2U6ICAgIDEgICAgLy8gbm9uLXdzXG4gICwgcGluZzogICAgIDJcbiAgLCBwb25nOiAgICAgM1xuICAsIG1lc3NhZ2U6ICA0XG4gICwgdXBncmFkZTogIDVcbiAgLCBub29wOiAgICAgNlxufTtcblxudmFyIHBhY2tldHNsaXN0ID0ga2V5cyhwYWNrZXRzKTtcblxuLyoqXG4gKiBQcmVtYWRlIGVycm9yIHBhY2tldC5cbiAqL1xuXG52YXIgZXJyID0geyB0eXBlOiAnZXJyb3InLCBkYXRhOiAncGFyc2VyIGVycm9yJyB9O1xuXG4vKipcbiAqIENyZWF0ZSBhIGJsb2IgYXBpIGV2ZW4gZm9yIGJsb2IgYnVpbGRlciB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICovXG5cbnZhciBCbG9iID0gcmVxdWlyZSgnYmxvYicpO1xuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQuXG4gKlxuICogICAgIDxwYWNrZXQgdHlwZSBpZD4gWyA8ZGF0YT4gXVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDVoZWxsbyB3b3JsZFxuICogICAgIDNcbiAqICAgICA0XG4gKlxuICogQmluYXJ5IGlzIGVuY29kZWQgaW4gYW4gaWRlbnRpY2FsIHByaW5jaXBsZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHV0ZjhlbmNvZGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O1xuICAgIHN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHV0ZjhlbmNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHV0ZjhlbmNvZGU7XG4gICAgdXRmOGVuY29kZSA9IG51bGw7XG4gIH1cblxuICB2YXIgZGF0YSA9IChwYWNrZXQuZGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgID8gdW5kZWZpbmVkXG4gICAgOiBwYWNrZXQuZGF0YS5idWZmZXIgfHwgcGFja2V0LmRhdGE7XG5cbiAgaWYgKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKEJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIGdsb2JhbC5CbG9iKSB7XG4gICAgcmV0dXJuIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gbWlnaHQgYmUgYW4gb2JqZWN0IHdpdGggeyBiYXNlNjQ6IHRydWUsIGRhdGE6IGRhdGFBc0Jhc2U2NFN0cmluZyB9XG4gIGlmIChkYXRhICYmIGRhdGEuYmFzZTY0KSB7XG4gICAgcmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNlbmRpbmcgZGF0YSBhcyBhIHV0Zi04IHN0cmluZ1xuICB2YXIgZW5jb2RlZCA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuXG4gIC8vIGRhdGEgZnJhZ21lbnQgaXMgb3B0aW9uYWxcbiAgaWYgKHVuZGVmaW5lZCAhPT0gcGFja2V0LmRhdGEpIHtcbiAgICBlbmNvZGVkICs9IHV0ZjhlbmNvZGUgPyB1dGY4LmVuY29kZShTdHJpbmcocGFja2V0LmRhdGEpLCB7IHN0cmljdDogZmFsc2UgfSkgOiBTdHJpbmcocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKCcnICsgZW5jb2RlZCk7XG5cbn07XG5cbmZ1bmN0aW9uIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKSB7XG4gIC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdICsgcGFja2V0LmRhdGEuZGF0YTtcbiAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgaGVscGVycyBmb3IgYmluYXJ5IHR5cGVzXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBkYXRhID0gcGFja2V0LmRhdGE7XG4gIHZhciBjb250ZW50QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHJlc3VsdEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDEgKyBkYXRhLmJ5dGVMZW5ndGgpO1xuXG4gIHJlc3VsdEJ1ZmZlclswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdEJ1ZmZlcltpKzFdID0gY29udGVudEFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgZnIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcGFja2V0LmRhdGEgPSBmci5yZXN1bHQ7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdHJ1ZSwgY2FsbGJhY2spO1xuICB9O1xuICByZXR1cm4gZnIucmVhZEFzQXJyYXlCdWZmZXIocGFja2V0LmRhdGEpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAoZG9udFNlbmRCbG9icykge1xuICAgIHJldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gIGxlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtsZW5ndGguYnVmZmVyLCBwYWNrZXQuZGF0YV0pO1xuXG4gIHJldHVybiBjYWxsYmFjayhibG9iKTtcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgcGFja2V0IHdpdGggYmluYXJ5IGRhdGEgaW4gYSBiYXNlNjQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCwgaGFzIGB0eXBlYCBhbmQgYGRhdGFgXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcbiAqL1xuXG5leHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgY2FsbGJhY2spIHtcbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBpZiAoQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIGdsb2JhbC5CbG9iKSB7XG4gICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiNjQgPSBmci5yZXN1bHQuc3BsaXQoJywnKVsxXTtcbiAgICAgIGNhbGxiYWNrKG1lc3NhZ2UgKyBiNjQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZyLnJlYWRBc0RhdGFVUkwocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgdmFyIGI2NGRhdGE7XG4gIHRyeSB7XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHdpdGggdHlwZWQgYXJyYXlzXG4gICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpO1xuICAgIHZhciBiYXNpYyA9IG5ldyBBcnJheSh0eXBlZC5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJhc2ljW2ldID0gdHlwZWRbaV07XG4gICAgfVxuICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJhc2ljKTtcbiAgfVxuICBtZXNzYWdlICs9IGdsb2JhbC5idG9hKGI2NGRhdGEpO1xuICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIERlY29kZXMgYSBwYWNrZXQuIENoYW5nZXMgZm9ybWF0IHRvIEJsb2IgaWYgcmVxdWVzdGVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgdXRmOGRlY29kZSkge1xuICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuICAvLyBTdHJpbmcgZGF0YVxuICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGRhdGEuY2hhckF0KDApID09PSAnYicpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldChkYXRhLnN1YnN0cigxKSwgYmluYXJ5VHlwZSk7XG4gICAgfVxuXG4gICAgaWYgKHV0ZjhkZWNvZGUpIHtcbiAgICAgIGRhdGEgPSB0cnlEZWNvZGUoZGF0YSk7XG4gICAgICBpZiAoZGF0YSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHR5cGUgPSBkYXRhLmNoYXJBdCgwKTtcblxuICAgIGlmIChOdW1iZXIodHlwZSkgIT0gdHlwZSB8fCAhcGFja2V0c2xpc3RbdHlwZV0pIHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IGRhdGEuc3Vic3RyaW5nKDEpIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIGFzQXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHR5cGUgPSBhc0FycmF5WzBdO1xuICB2YXIgcmVzdCA9IHNsaWNlQnVmZmVyKGRhdGEsIDEpO1xuICBpZiAoQmxvYiAmJiBiaW5hcnlUeXBlID09PSAnYmxvYicpIHtcbiAgICByZXN0ID0gbmV3IEJsb2IoW3Jlc3RdKTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogcmVzdCB9O1xufTtcblxuZnVuY3Rpb24gdHJ5RGVjb2RlKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBkYXRhID0gdXRmOC5kZWNvZGUoZGF0YSwgeyBzdHJpY3Q6IGZhbHNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIERlY29kZXMgYSBwYWNrZXQgZW5jb2RlZCBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihtc2csIGJpbmFyeVR5cGUpIHtcbiAgdmFyIHR5cGUgPSBwYWNrZXRzbGlzdFttc2cuY2hhckF0KDApXTtcbiAgaWYgKCFiYXNlNjRlbmNvZGVyKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogeyBiYXNlNjQ6IHRydWUsIGRhdGE6IG1zZy5zdWJzdHIoMSkgfSB9O1xuICB9XG5cbiAgdmFyIGRhdGEgPSBiYXNlNjRlbmNvZGVyLmRlY29kZShtc2cuc3Vic3RyKDEpKTtcblxuICBpZiAoYmluYXJ5VHlwZSA9PT0gJ2Jsb2InICYmIEJsb2IpIHtcbiAgICBkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgfVxuXG4gIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfTtcbn07XG5cbi8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkuXG4gKlxuICogICAgIDxsZW5ndGg+OmRhdGFcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAxMTpoZWxsbyB3b3JsZDI6aGlcbiAqXG4gKiBJZiBhbnkgY29udGVudHMgYXJlIGJpbmFyeSwgdGhleSB3aWxsIGJlIGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZ3MuIEJhc2U2NFxuICogZW5jb2RlZCBzdHJpbmdzIGFyZSBtYXJrZWQgd2l0aCBhIGIgYmVmb3JlIHRoZSBsZW5ndGggc3BlY2lmaWVyXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQmluYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICBzdXBwb3J0c0JpbmFyeSA9IG51bGw7XG4gIH1cblxuICB2YXIgaXNCaW5hcnkgPSBoYXNCaW5hcnkocGFja2V0cyk7XG5cbiAgaWYgKHN1cHBvcnRzQmluYXJ5ICYmIGlzQmluYXJ5KSB7XG4gICAgaWYgKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soJzA6Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsICFpc0JpbmFyeSA/IGZhbHNlIDogc3VwcG9ydHNCaW5hcnksIGZhbHNlLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBkb25lQ2FsbGJhY2sobnVsbCwgc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRzLmpvaW4oJycpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEFzeW5jIGFycmF5IG1hcCB1c2luZyBhZnRlclxuICovXG5cbmZ1bmN0aW9uIG1hcChhcnksIGVhY2gsIGRvbmUpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShhcnkubGVuZ3RoKTtcbiAgdmFyIG5leHQgPSBhZnRlcihhcnkubGVuZ3RoLCBkb25lKTtcblxuICB2YXIgZWFjaFdpdGhJbmRleCA9IGZ1bmN0aW9uKGksIGVsLCBjYikge1xuICAgIGVhY2goZWwsIGZ1bmN0aW9uKGVycm9yLCBtc2cpIHtcbiAgICAgIHJlc3VsdFtpXSA9IG1zZztcbiAgICAgIGNiKGVycm9yLCByZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgZWFjaFdpdGhJbmRleChpLCBhcnlbaV0sIG5leHQpO1xuICB9XG59XG5cbi8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFBvc3NpYmxlIGJpbmFyeSBjb250ZW50cyBhcmVcbiAqIGRlY29kZWQgZnJvbSB0aGVpciBiYXNlNjQgcmVwcmVzZW50YXRpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5KGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBwYWNrZXQ7XG4gIGlmIChkYXRhID09PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSAnJywgbiwgbXNnO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hyID0gZGF0YS5jaGFyQXQoaSk7XG5cbiAgICBpZiAoY2hyICE9PSAnOicpIHtcbiAgICAgIGxlbmd0aCArPSBjaHI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSAnJyB8fCAobGVuZ3RoICE9IChuID0gTnVtYmVyKGxlbmd0aCkpKSkge1xuICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgfVxuXG4gICAgbXNnID0gZGF0YS5zdWJzdHIoaSArIDEsIG4pO1xuXG4gICAgaWYgKGxlbmd0aCAhPSBtc2cubGVuZ3RoKSB7XG4gICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICB9XG5cbiAgICBpZiAobXNnLmxlbmd0aCkge1xuICAgICAgcGFja2V0ID0gZXhwb3J0cy5kZWNvZGVQYWNrZXQobXNnLCBiaW5hcnlUeXBlLCBmYWxzZSk7XG5cbiAgICAgIGlmIChlcnIudHlwZSA9PT0gcGFja2V0LnR5cGUgJiYgZXJyLmRhdGEgPT09IHBhY2tldC5kYXRhKSB7XG4gICAgICAgIC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXQgPSBjYWxsYmFjayhwYWNrZXQsIGkgKyBuLCBsKTtcbiAgICAgIGlmIChmYWxzZSA9PT0gcmV0KSByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYWR2YW5jZSBjdXJzb3JcbiAgICBpICs9IG47XG4gICAgbGVuZ3RoID0gJyc7XG4gIH1cblxuICBpZiAobGVuZ3RoICE9PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cbiAqXG4gKiA8MSA9IGJpbmFyeSwgMCA9IHN0cmluZz48bnVtYmVyIGZyb20gMC05PjxudW1iZXIgZnJvbSAwLTk+Wy4uLl08bnVtYmVyXG4gKiAyNTU+PGRhdGE+XG4gKlxuICogRXhhbXBsZTpcbiAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEFycmF5QnVmZmVyKDApKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIGRvbmVDYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgZW5jb2RlZFBhY2tldHMpIHtcbiAgICB2YXIgdG90YWxMZW5ndGggPSBlbmNvZGVkUGFja2V0cy5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBwKSB7XG4gICAgICB2YXIgbGVuO1xuICAgICAgaWYgKHR5cGVvZiBwID09PSAnc3RyaW5nJyl7XG4gICAgICAgIGxlbiA9IHAubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gcC5ieXRlTGVuZ3RoO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYyArIGxlbi50b1N0cmluZygpLmxlbmd0aCArIGxlbiArIDI7IC8vIHN0cmluZy9iaW5hcnkgaWRlbnRpZmllciArIHNlcGFyYXRvciA9IDJcbiAgICB9LCAwKTtcblxuICAgIHZhciByZXN1bHRBcnJheSA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTtcblxuICAgIHZhciBidWZmZXJJbmRleCA9IDA7XG4gICAgZW5jb2RlZFBhY2tldHMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgYWIgPSBwO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkocC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2aWV3W2ldID0gcC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGFiID0gdmlldy5idWZmZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1N0cmluZykgeyAvLyBub3QgdHJ1ZSBiaW5hcnlcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAwO1xuICAgICAgfSBlbHNlIHsgLy8gdHJ1ZSBiaW5hcnlcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuU3RyID0gYWIuYnl0ZUxlbmd0aC50b1N0cmluZygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAyNTU7XG5cbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gdmlld1tpXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRBcnJheS5idWZmZXIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogRW5jb2RlIGFzIEJsb2JcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IgPSBmdW5jdGlvbihwYWNrZXRzLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uKGVuY29kZWQpIHtcbiAgICAgIHZhciBiaW5hcnlJZGVudGlmaWVyID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMTtcbiAgICAgIGlmICh0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShlbmNvZGVkLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZpZXdbaV0gPSBlbmNvZGVkLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RlZCA9IHZpZXcuYnVmZmVyO1xuICAgICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbiA9IChlbmNvZGVkIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpXG4gICAgICAgID8gZW5jb2RlZC5ieXRlTGVuZ3RoXG4gICAgICAgIDogZW5jb2RlZC5zaXplO1xuXG4gICAgICB2YXIgbGVuU3RyID0gbGVuLnRvU3RyaW5nKCk7XG4gICAgICB2YXIgbGVuZ3RoQXJ5ID0gbmV3IFVpbnQ4QXJyYXkobGVuU3RyLmxlbmd0aCArIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGVuZ3RoQXJ5W2ldID0gcGFyc2VJbnQobGVuU3RyW2ldKTtcbiAgICAgIH1cbiAgICAgIGxlbmd0aEFyeVtsZW5TdHIubGVuZ3RoXSA9IDI1NTtcblxuICAgICAgaWYgKEJsb2IpIHtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbYmluYXJ5SWRlbnRpZmllci5idWZmZXIsIGxlbmd0aEFyeS5idWZmZXIsIGVuY29kZWRdKTtcbiAgICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIGJsb2IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBCbG9iKHJlc3VsdHMpKTtcbiAgfSk7XG59O1xuXG4vKlxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBTdHJpbmdzIGFyZSBkZWNvZGVkIGJ5XG4gKiBpbnRlcnByZXRpbmcgZWFjaCBieXRlIGFzIGEga2V5IGNvZGUgZm9yIGVudHJpZXMgbWFya2VkIHRvIHN0YXJ0IHdpdGggMC4gU2VlXG4gKiBkZXNjcmlwdGlvbiBvZiBlbmNvZGVQYXlsb2FkQXNCaW5hcnlcbiAqXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIGJ1ZmZlclRhaWwgPSBkYXRhO1xuICB2YXIgYnVmZmVycyA9IFtdO1xuXG4gIHdoaWxlIChidWZmZXJUYWlsLmJ5dGVMZW5ndGggPiAwKSB7XG4gICAgdmFyIHRhaWxBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlclRhaWwpO1xuICAgIHZhciBpc1N0cmluZyA9IHRhaWxBcnJheVswXSA9PT0gMDtcbiAgICB2YXIgbXNnTGVuZ3RoID0gJyc7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgOyBpKyspIHtcbiAgICAgIGlmICh0YWlsQXJyYXlbaV0gPT09IDI1NSkgYnJlYWs7XG5cbiAgICAgIC8vIDMxMCA9IGNoYXIgbGVuZ3RoIG9mIE51bWJlci5NQVhfVkFMVUVcbiAgICAgIGlmIChtc2dMZW5ndGgubGVuZ3RoID4gMzEwKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBtc2dMZW5ndGggKz0gdGFpbEFycmF5W2ldO1xuICAgIH1cblxuICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAyICsgbXNnTGVuZ3RoLmxlbmd0aCk7XG4gICAgbXNnTGVuZ3RoID0gcGFyc2VJbnQobXNnTGVuZ3RoKTtcblxuICAgIHZhciBtc2cgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAwLCBtc2dMZW5ndGgpO1xuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbXNnID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShtc2cpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgdG8gdHlwZWQgYXJyYXlzXG4gICAgICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KG1zZyk7XG4gICAgICAgIG1zZyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYnVmZmVycy5wdXNoKG1zZyk7XG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIG1zZ0xlbmd0aCk7XG4gIH1cblxuICB2YXIgdG90YWwgPSBidWZmZXJzLmxlbmd0aDtcbiAgYnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGJ1ZmZlciwgaSkge1xuICAgIGNhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlciwgYmluYXJ5VHlwZSwgdHJ1ZSksIGksIHRvdGFsKTtcbiAgfSk7XG59O1xuIiwiXG4vKipcbiAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0ga2V5c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzIChvYmope1xuICB2YXIgYXJyID0gW107XG4gIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwgaSkpIHtcbiAgICAgIGFyci5wdXNoKGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufTtcbiIsIi8qISBodHRwczovL210aHMuYmUvdXRmOGpzIHYyLjEuMiBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYFxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSxcblx0Ly8gYW5kIHVzZSBpdCBhcyBgcm9vdGBcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuXHQvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXTtcblx0XHR2YXIgY291bnRlciA9IDA7XG5cdFx0dmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cdFx0dmFyIHZhbHVlO1xuXHRcdHZhciBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR2YXIgaW5kZXggPSAtMTtcblx0XHR2YXIgdmFsdWU7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IGFycmF5W2luZGV4XTtcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSB7XG5cdFx0aWYgKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRikge1xuXHRcdFx0aWYgKHN0cmljdCkge1xuXHRcdFx0XHR0aHJvdyBFcnJvcihcblx0XHRcdFx0XHQnTG9uZSBzdXJyb2dhdGUgVSsnICsgY29kZVBvaW50LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICtcblx0XHRcdFx0XHQnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZSdcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZnVuY3Rpb24gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIHNoaWZ0KSB7XG5cdFx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiBzaGlmdCkgJiAweDNGKSB8IDB4ODApO1xuXHR9XG5cblx0ZnVuY3Rpb24gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCwgc3RyaWN0KSB7XG5cdFx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGRjgwKSA9PSAwKSB7IC8vIDEtYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHRcdH1cblx0XHR2YXIgc3ltYm9sID0gJyc7XG5cdFx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGODAwKSA9PSAwKSB7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDYpICYgMHgxRikgfCAweEMwKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRjAwMDApID09IDApIHsgLy8gMy1ieXRlIHNlcXVlbmNlXG5cdFx0XHRpZiAoIWNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50LCBzdHJpY3QpKSB7XG5cdFx0XHRcdGNvZGVQb2ludCA9IDB4RkZGRDtcblx0XHRcdH1cblx0XHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiAxMikgJiAweDBGKSB8IDB4RTApO1xuXHRcdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCA2KTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZFMDAwMDApID09IDApIHsgLy8gNC1ieXRlIHNlcXVlbmNlXG5cdFx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTgpICYgMHgwNykgfCAweEYwKTtcblx0XHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgMTIpO1xuXHRcdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCA2KTtcblx0XHR9XG5cdFx0c3ltYm9sICs9IHN0cmluZ0Zyb21DaGFyQ29kZSgoY29kZVBvaW50ICYgMHgzRikgfCAweDgwKTtcblx0XHRyZXR1cm4gc3ltYm9sO1xuXHR9XG5cblx0ZnVuY3Rpb24gdXRmOGVuY29kZShzdHJpbmcsIG9wdHMpIHtcblx0XHRvcHRzID0gb3B0cyB8fCB7fTtcblx0XHR2YXIgc3RyaWN0ID0gZmFsc2UgIT09IG9wdHMuc3RyaWN0O1xuXG5cdFx0dmFyIGNvZGVQb2ludHMgPSB1Y3MyZGVjb2RlKHN0cmluZyk7XG5cdFx0dmFyIGxlbmd0aCA9IGNvZGVQb2ludHMubGVuZ3RoO1xuXHRcdHZhciBpbmRleCA9IC0xO1xuXHRcdHZhciBjb2RlUG9pbnQ7XG5cdFx0dmFyIGJ5dGVTdHJpbmcgPSAnJztcblx0XHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdFx0Y29kZVBvaW50ID0gY29kZVBvaW50c1tpbmRleF07XG5cdFx0XHRieXRlU3RyaW5nICs9IGVuY29kZUNvZGVQb2ludChjb2RlUG9pbnQsIHN0cmljdCk7XG5cdFx0fVxuXHRcdHJldHVybiBieXRlU3RyaW5nO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZnVuY3Rpb24gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKSB7XG5cdFx0aWYgKGJ5dGVJbmRleCA+PSBieXRlQ291bnQpIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcblx0XHR9XG5cblx0XHR2YXIgY29udGludWF0aW9uQnl0ZSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtcblx0XHRieXRlSW5kZXgrKztcblxuXHRcdGlmICgoY29udGludWF0aW9uQnl0ZSAmIDB4QzApID09IDB4ODApIHtcblx0XHRcdHJldHVybiBjb250aW51YXRpb25CeXRlICYgMHgzRjtcblx0XHR9XG5cblx0XHQvLyBJZiB3ZSBlbmQgdXAgaGVyZSwgaXTigJlzIG5vdCBhIGNvbnRpbnVhdGlvbiBieXRlXG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlY29kZVN5bWJvbChzdHJpY3QpIHtcblx0XHR2YXIgYnl0ZTE7XG5cdFx0dmFyIGJ5dGUyO1xuXHRcdHZhciBieXRlMztcblx0XHR2YXIgYnl0ZTQ7XG5cdFx0dmFyIGNvZGVQb2ludDtcblxuXHRcdGlmIChieXRlSW5kZXggPiBieXRlQ291bnQpIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcblx0XHR9XG5cblx0XHRpZiAoYnl0ZUluZGV4ID09IGJ5dGVDb3VudCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIFJlYWQgZmlyc3QgYnl0ZVxuXHRcdGJ5dGUxID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRcdGJ5dGVJbmRleCsrO1xuXG5cdFx0Ly8gMS1ieXRlIHNlcXVlbmNlIChubyBjb250aW51YXRpb24gYnl0ZXMpXG5cdFx0aWYgKChieXRlMSAmIDB4ODApID09IDApIHtcblx0XHRcdHJldHVybiBieXRlMTtcblx0XHR9XG5cblx0XHQvLyAyLWJ5dGUgc2VxdWVuY2Vcblx0XHRpZiAoKGJ5dGUxICYgMHhFMCkgPT0gMHhDMCkge1xuXHRcdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MUYpIDw8IDYpIHwgYnl0ZTI7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4ODApIHtcblx0XHRcdFx0cmV0dXJuIGNvZGVQb2ludDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuXHRcdGlmICgoYnl0ZTEgJiAweEYwKSA9PSAweEUwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwRikgPDwgMTIpIHwgKGJ5dGUyIDw8IDYpIHwgYnl0ZTM7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4MDgwMCkge1xuXHRcdFx0XHRyZXR1cm4gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkgPyBjb2RlUG9pbnQgOiAweEZGRkQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIDQtYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICgoYnl0ZTEgJiAweEY4KSA9PSAweEYwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwNykgPDwgMHgxMikgfCAoYnl0ZTIgPDwgMHgwQykgfFxuXHRcdFx0XHQoYnl0ZTMgPDwgMHgwNikgfCBieXRlNDtcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwMTAwMDAgJiYgY29kZVBvaW50IDw9IDB4MTBGRkZGKSB7XG5cdFx0XHRcdHJldHVybiBjb2RlUG9pbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgVVRGLTggZGV0ZWN0ZWQnKTtcblx0fVxuXG5cdHZhciBieXRlQXJyYXk7XG5cdHZhciBieXRlQ291bnQ7XG5cdHZhciBieXRlSW5kZXg7XG5cdGZ1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZywgb3B0cykge1xuXHRcdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHRcdHZhciBzdHJpY3QgPSBmYWxzZSAhPT0gb3B0cy5zdHJpY3Q7XG5cblx0XHRieXRlQXJyYXkgPSB1Y3MyZGVjb2RlKGJ5dGVTdHJpbmcpO1xuXHRcdGJ5dGVDb3VudCA9IGJ5dGVBcnJheS5sZW5ndGg7XG5cdFx0Ynl0ZUluZGV4ID0gMDtcblx0XHR2YXIgY29kZVBvaW50cyA9IFtdO1xuXHRcdHZhciB0bXA7XG5cdFx0d2hpbGUgKCh0bXAgPSBkZWNvZGVTeW1ib2woc3RyaWN0KSkgIT09IGZhbHNlKSB7XG5cdFx0XHRjb2RlUG9pbnRzLnB1c2godG1wKTtcblx0XHR9XG5cdFx0cmV0dXJuIHVjczJlbmNvZGUoY29kZVBvaW50cyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgdXRmOCA9IHtcblx0XHQndmVyc2lvbic6ICcyLjEuMicsXG5cdFx0J2VuY29kZSc6IHV0ZjhlbmNvZGUsXG5cdFx0J2RlY29kZSc6IHV0ZjhkZWNvZGVcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB1dGY4O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gdXRmODtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0dmFyIG9iamVjdCA9IHt9O1xuXHRcdFx0dmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0Lmhhc093blByb3BlcnR5O1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHV0ZjgpIHtcblx0XHRcdFx0aGFzT3duUHJvcGVydHkuY2FsbCh1dGY4LCBrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gdXRmOFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnV0ZjggPSB1dGY4O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLyogZ2xvYmFsIEJsb2IgRmlsZSAqL1xuXG4vKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBnbG9iYWwuQmxvYiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5CbG9iKSA9PT0gJ1tvYmplY3QgQmxvYkNvbnN0cnVjdG9yXSc7XG52YXIgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgZ2xvYmFsLkZpbGUgPT09ICdmdW5jdGlvbicgfHwgdG9TdHJpbmcuY2FsbChnbG9iYWwuRmlsZSkgPT09ICdbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl0nO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4vKipcbiAqIENoZWNrcyBmb3IgYmluYXJ5IGRhdGEuXG4gKlxuICogU3VwcG9ydHMgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQmxvYiBhbmQgRmlsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gaGFzQmluYXJ5IChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICgodHlwZW9mIGdsb2JhbC5CdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgICh0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fFxuICAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpXG4gICAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2hhcy1iaW5hcnkvcHVsbC80XG4gIGlmIChvYmoudG9KU09OICYmIHR5cGVvZiBvYmoudG9KU09OID09PSAnZnVuY3Rpb24nICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG4iLCJcbnZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICBpZiAobXMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gIGlmIChtcyA8IG4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG1zIDwgbiAqIDEuNSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXHJcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcclxuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIHN0ciA9ICcnO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICBpZiAoc3RyLmxlbmd0aCkgc3RyICs9ICcmJztcclxuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHFzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24ocXMpe1xyXG4gIHZhciBxcnkgPSB7fTtcclxuICB2YXIgcGFpcnMgPSBxcy5zcGxpdCgnJicpO1xyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gcGFpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICB9XHJcbiAgcmV0dXJuIHFyeTtcclxufTtcclxuIiwiLyoqXHJcbiAqIFBhcnNlcyBhbiBVUklcclxuICpcclxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcclxuXHJcbnZhciBwYXJ0cyA9IFtcclxuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcclxuICAgIHZhciBzcmMgPSBzdHIsXHJcbiAgICAgICAgYiA9IHN0ci5pbmRleE9mKCdbJyksXHJcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XHJcblxyXG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXHJcbiAgICAgICAgdXJpID0ge30sXHJcbiAgICAgICAgaSA9IDE0O1xyXG5cclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcclxuICAgICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0LnN1YnN0cmluZygxLCB1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csICc6Jyk7XHJcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVyaTtcclxufTtcclxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHVybCA9IHJlcXVpcmUoJy4vdXJsJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIE1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBsb29rdXA7XG5cbi8qKlxuICogTWFuYWdlcnMgY2FjaGUuXG4gKi9cblxudmFyIGNhY2hlID0gZXhwb3J0cy5tYW5hZ2VycyA9IHt9O1xuXG4vKipcbiAqIExvb2tzIHVwIGFuIGV4aXN0aW5nIGBNYW5hZ2VyYCBmb3IgbXVsdGlwbGV4aW5nLlxuICogSWYgdGhlIHVzZXIgc3VtbW9uczpcbiAqXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9hJyk7YFxuICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYicpO2BcbiAqXG4gKiBXZSByZXVzZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYmFzZWQgb24gc2FtZSBzY2hlbWUvcG9ydC9ob3N0LFxuICogYW5kIHdlIGluaXRpYWxpemUgc29ja2V0cyBmb3IgZWFjaCBuYW1lc3BhY2UuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb29rdXAgKHVyaSwgb3B0cykge1xuICBpZiAodHlwZW9mIHVyaSA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHZhciBwYXJzZWQgPSB1cmwodXJpKTtcbiAgdmFyIHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gIHZhciBpZCA9IHBhcnNlZC5pZDtcbiAgdmFyIHBhdGggPSBwYXJzZWQucGF0aDtcbiAgdmFyIHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF0ubnNwcztcbiAgdmFyIG5ld0Nvbm5lY3Rpb24gPSBvcHRzLmZvcmNlTmV3IHx8IG9wdHNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gfHxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHwgc2FtZU5hbWVzcGFjZTtcblxuICB2YXIgaW87XG5cbiAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICBkZWJ1ZygnaWdub3Jpbmcgc29ja2V0IGNhY2hlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgaW8gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgIGRlYnVnKCduZXcgaW8gaW5zdGFuY2UgZm9yICVzJywgc291cmNlKTtcbiAgICAgIGNhY2hlW2lkXSA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgaW8gPSBjYWNoZVtpZF07XG4gIH1cbiAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnk7XG4gIH1cbiAgcmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCwgb3B0cyk7XG59XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XG5cbi8qKlxuICogYGNvbm5lY3RgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5jb25uZWN0ID0gbG9va3VwO1xuXG4vKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLk1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbmV4cG9ydHMuU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBlaW8gPSByZXF1aXJlKCdlbmdpbmUuaW8tY2xpZW50Jyk7XG52YXIgU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgb24gPSByZXF1aXJlKCcuL29uJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1iaW5kJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXInKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIEJhY2tvZmYgPSByZXF1aXJlKCdiYWNrbzInKTtcblxuLyoqXG4gKiBJRTYrIGhhc093blByb3BlcnR5XG4gKi9cblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hbmFnZXI7XG5cbi8qKlxuICogYE1hbmFnZXJgIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmdpbmUgaW5zdGFuY2Ugb3IgZW5naW5lIHVyaS9vcHRzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBNYW5hZ2VyICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1hbmFnZXIpKSByZXR1cm4gbmV3IE1hbmFnZXIodXJpLCBvcHRzKTtcbiAgaWYgKHVyaSAmJiAoJ29iamVjdCcgPT09IHR5cGVvZiB1cmkpKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSB1bmRlZmluZWQ7XG4gIH1cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8ICcvc29ja2V0LmlvJztcbiAgdGhpcy5uc3BzID0ge307XG4gIHRoaXMuc3VicyA9IFtdO1xuICB0aGlzLm9wdHMgPSBvcHRzO1xuICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKG9wdHMucmFuZG9taXphdGlvbkZhY3RvciB8fCAwLjUpO1xuICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgbWF4OiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksXG4gICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKVxuICB9KTtcbiAgdGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0ID8gMjAwMDAgOiBvcHRzLnRpbWVvdXQpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy51cmkgPSB1cmk7XG4gIHRoaXMuY29ubmVjdGluZyA9IFtdO1xuICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB2YXIgX3BhcnNlciA9IG9wdHMucGFyc2VyIHx8IHBhcnNlcjtcbiAgdGhpcy5lbmNvZGVyID0gbmV3IF9wYXJzZXIuRW5jb2RlcigpO1xuICB0aGlzLmRlY29kZXIgPSBuZXcgX3BhcnNlci5EZWNvZGVyKCk7XG4gIHRoaXMuYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIFByb3BhZ2F0ZSBnaXZlbiBldmVudCB0byBzb2NrZXRzIGFuZCBlbWl0IG9uIGB0aGlzYFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmVtaXRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgdGhpcy5uc3BzW25zcF0uZW1pdC5hcHBseSh0aGlzLm5zcHNbbnNwXSwgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIGBzb2NrZXQuaWRgIG9mIGFsbCBzb2NrZXRzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUudXBkYXRlU29ja2V0SWRzID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgdGhpcy5uc3BzW25zcF0uaWQgPSB0aGlzLmdlbmVyYXRlSWQobnNwKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2VuZXJhdGUgYHNvY2tldC5pZGAgZm9yIHRoZSBnaXZlbiBgbnNwYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuc3BcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmdlbmVyYXRlSWQgPSBmdW5jdGlvbiAobnNwKSB7XG4gIHJldHVybiAobnNwID09PSAnLycgPyAnJyA6IChuc3AgKyAnIycpKSArIHRoaXMuZW5naW5lLmlkO1xufTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoTWFuYWdlci5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldHMgdGhlIGByZWNvbm5lY3Rpb25gIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgaXQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbiA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyBiZWZvcmUgZ2l2aW5nIHVwXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXkgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1pbih2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yYW5kb21pemF0aW9uRmFjdG9yID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvcjtcbiAgdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0Sml0dGVyKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWF4aW11bSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5TWF4ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNYXgodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb25uZWN0aW9uIHRpbWVvdXQuIGBmYWxzZWAgdG8gZGlzYWJsZVxuICpcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gIHRoaXMuX3RpbWVvdXQgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gKiBzdGFydGVkIHJlY29ubmVjdGluZyB5ZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5tYXliZVJlY29ubmVjdE9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICBpZiAoIXRoaXMucmVjb25uZWN0aW5nICYmIHRoaXMuX3JlY29ubmVjdGlvbiAmJiB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAvLyBrZWVwcyByZWNvbm5lY3Rpb24gZnJvbSBmaXJpbmcgdHdpY2UgZm9yIHRoZSBzYW1lIHJlY29ubmVjdGlvbiBsb29wXG4gICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub3BlbiA9XG5NYW5hZ2VyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGZuLCBvcHRzKSB7XG4gIGRlYnVnKCdyZWFkeVN0YXRlICVzJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgaWYgKH50aGlzLnJlYWR5U3RhdGUuaW5kZXhPZignb3BlbicpKSByZXR1cm4gdGhpcztcblxuICBkZWJ1Zygnb3BlbmluZyAlcycsIHRoaXMudXJpKTtcbiAgdGhpcy5lbmdpbmUgPSBlaW8odGhpcy51cmksIHRoaXMub3B0cyk7XG4gIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuXG4gIC8vIGVtaXQgYG9wZW5gXG4gIHZhciBvcGVuU3ViID0gb24oc29ja2V0LCAnb3BlbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9ub3BlbigpO1xuICAgIGZuICYmIGZuKCk7XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfZXJyb3JgXG4gIHZhciBlcnJvclN1YiA9IG9uKHNvY2tldCwgJ2Vycm9yJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkZWJ1ZygnY29ubmVjdF9lcnJvcicpO1xuICAgIHNlbGYuY2xlYW51cCgpO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF9lcnJvcicsIGRhdGEpO1xuICAgIGlmIChmbikge1xuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignQ29ubmVjdGlvbiBlcnJvcicpO1xuICAgICAgZXJyLmRhdGEgPSBkYXRhO1xuICAgICAgZm4oZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgIHNlbGYubWF5YmVSZWNvbm5lY3RPbk9wZW4oKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfdGltZW91dGBcbiAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgIGRlYnVnKCdjb25uZWN0IGF0dGVtcHQgd2lsbCB0aW1lb3V0IGFmdGVyICVkJywgdGltZW91dCk7XG5cbiAgICAvLyBzZXQgdGltZXJcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlYnVnKCdjb25uZWN0IGF0dGVtcHQgdGltZWQgb3V0IGFmdGVyICVkJywgdGltZW91dCk7XG4gICAgICBvcGVuU3ViLmRlc3Ryb3koKTtcbiAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgc29ja2V0LmVtaXQoJ2Vycm9yJywgJ3RpbWVvdXQnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF90aW1lb3V0JywgdGltZW91dCk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLnN1YnMucHVzaChvcGVuU3ViKTtcbiAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdvcGVuJyk7XG5cbiAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgdGhpcy5jbGVhbnVwKCk7XG5cbiAgLy8gbWFyayBhcyBvcGVuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG5cbiAgLy8gYWRkIG5ldyBzdWJzXG4gIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZGF0YScsIGJpbmQodGhpcywgJ29uZGF0YScpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BpbmcnLCBiaW5kKHRoaXMsICdvbnBpbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdwb25nJywgYmluZCh0aGlzLCAnb25wb25nJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZXJyb3InLCBiaW5kKHRoaXMsICdvbmVycm9yJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24odGhpcy5kZWNvZGVyLCAnZGVjb2RlZCcsIGJpbmQodGhpcywgJ29uZGVjb2RlZCcpKSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgcGluZy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGFzdFBpbmcgPSBuZXcgRGF0ZSgpO1xuICB0aGlzLmVtaXRBbGwoJ3BpbmcnKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25wb25nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXRBbGwoJ3BvbmcnLCBuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0UGluZyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kZWNvZGVkID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICBkZWJ1ZygnZXJyb3InLCBlcnIpO1xuICB0aGlzLmVtaXRBbGwoJ2Vycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnNvY2tldCA9IGZ1bmN0aW9uIChuc3AsIG9wdHMpIHtcbiAgdmFyIHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICBpZiAoIXNvY2tldCkge1xuICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICB0aGlzLm5zcHNbbnNwXSA9IHNvY2tldDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc29ja2V0Lm9uKCdjb25uZWN0aW5nJywgb25Db25uZWN0aW5nKTtcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzb2NrZXQuaWQgPSBzZWxmLmdlbmVyYXRlSWQobnNwKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmF1dG9Db25uZWN0KSB7XG4gICAgICAvLyBtYW51YWxseSBjYWxsIGhlcmUgc2luY2UgY29ubmVjdGluZyBldmVudCBpcyBmaXJlZCBiZWZvcmUgbGlzdGVuaW5nXG4gICAgICBvbkNvbm5lY3RpbmcoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbm5lY3RpbmcgKCkge1xuICAgIGlmICghfmluZGV4T2Yoc2VsZi5jb25uZWN0aW5nLCBzb2NrZXQpKSB7XG4gICAgICBzZWxmLmNvbm5lY3RpbmcucHVzaChzb2NrZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb2NrZXQ7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICpcbiAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXRcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKHNvY2tldCkge1xuICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuY29ubmVjdGluZywgc29ja2V0KTtcbiAgaWYgKH5pbmRleCkgdGhpcy5jb25uZWN0aW5nLnNwbGljZShpbmRleCwgMSk7XG4gIGlmICh0aGlzLmNvbm5lY3RpbmcubGVuZ3RoKSByZXR1cm47XG5cbiAgdGhpcy5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBkZWJ1Zygnd3JpdGluZyBwYWNrZXQgJWonLCBwYWNrZXQpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChwYWNrZXQucXVlcnkgJiYgcGFja2V0LnR5cGUgPT09IDApIHBhY2tldC5uc3AgKz0gJz8nICsgcGFja2V0LnF1ZXJ5O1xuXG4gIGlmICghc2VsZi5lbmNvZGluZykge1xuICAgIC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbiAgICBzZWxmLmVuY29kaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCwgZnVuY3Rpb24gKGVuY29kZWRQYWNrZXRzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBzZWxmLmVuY29kaW5nID0gZmFsc2U7XG4gICAgICBzZWxmLnByb2Nlc3NQYWNrZXRRdWV1ZSgpO1xuICAgIH0pO1xuICB9IGVsc2UgeyAvLyBhZGQgcGFja2V0IHRvIHRoZSBxdWV1ZVxuICAgIHNlbGYucGFja2V0QnVmZmVyLnB1c2gocGFja2V0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBJZiBwYWNrZXQgYnVmZmVyIGlzIG5vbi1lbXB0eSwgYmVnaW5zIGVuY29kaW5nIHRoZVxuICogbmV4dCBwYWNrZXQgaW4gbGluZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wcm9jZXNzUGFja2V0UXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnBhY2tldEJ1ZmZlci5sZW5ndGggPiAwICYmICF0aGlzLmVuY29kaW5nKSB7XG4gICAgdmFyIHBhY2sgPSB0aGlzLnBhY2tldEJ1ZmZlci5zaGlmdCgpO1xuICAgIHRoaXMucGFja2V0KHBhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdjbGVhbnVwJyk7XG5cbiAgdmFyIHN1YnNMZW5ndGggPSB0aGlzLnN1YnMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNMZW5ndGg7IGkrKykge1xuICAgIHZhciBzdWIgPSB0aGlzLnN1YnMuc2hpZnQoKTtcbiAgICBzdWIuZGVzdHJveSgpO1xuICB9XG5cbiAgdGhpcy5wYWNrZXRCdWZmZXIgPSBbXTtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcblxuICB0aGlzLmRlY29kZXIuZGVzdHJveSgpO1xufTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPVxuTWFuYWdlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2Rpc2Nvbm5lY3QnKTtcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgLy8gYG9uY2xvc2VgIHdpbGwgbm90IGZpcmUgYmVjYXVzZVxuICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgfVxuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIGlmICh0aGlzLmVuZ2luZSkgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gIGRlYnVnKCdvbmNsb3NlJyk7XG5cbiAgdGhpcy5jbGVhbnVwKCk7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbik7XG5cbiAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdCkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICBkZWJ1ZygncmVjb25uZWN0IGZhaWxlZCcpO1xuICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgIHRoaXMuZW1pdEFsbCgncmVjb25uZWN0X2ZhaWxlZCcpO1xuICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgZGVidWcoJ3dpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdCcsIGRlbGF5KTtcblxuICAgIHRoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7XG4gICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9hdHRlbXB0Jywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0aW5nJywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcblxuICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KSByZXR1cm47XG5cbiAgICAgIHNlbGYub3BlbihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IGF0dGVtcHQgZXJyb3InKTtcbiAgICAgICAgICBzZWxmLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0KCk7XG4gICAgICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfZXJyb3InLCBlcnIuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBzdWNjZXNzJyk7XG4gICAgICAgICAgc2VsZi5vbnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCBkZWxheSk7XG5cbiAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy51cGRhdGVTb2NrZXRJZHMoKTtcbiAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3QnLCBhdHRlbXB0KTtcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBvbjtcblxuLyoqXG4gKiBIZWxwZXIgZm9yIHN1YnNjcmlwdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8RXZlbnRFbWl0dGVyfSBvYmogd2l0aCBgRW1pdHRlcmAgbWl4aW4gb3IgYEV2ZW50RW1pdHRlcmBcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBvbiAob2JqLCBldiwgZm4pIHtcbiAgb2JqLm9uKGV2LCBmbik7XG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgb2JqLnJlbW92ZUxpc3RlbmVyKGV2LCBmbik7XG4gICAgfVxuICB9O1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciB0b0FycmF5ID0gcmVxdWlyZSgndG8tYXJyYXknKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBTb2NrZXQ7XG5cbi8qKlxuICogSW50ZXJuYWwgZXZlbnRzIChibGFja2xpc3RlZCkuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgZXZlbnRzID0ge1xuICBjb25uZWN0OiAxLFxuICBjb25uZWN0X2Vycm9yOiAxLFxuICBjb25uZWN0X3RpbWVvdXQ6IDEsXG4gIGNvbm5lY3Rpbmc6IDEsXG4gIGRpc2Nvbm5lY3Q6IDEsXG4gIGVycm9yOiAxLFxuICByZWNvbm5lY3Q6IDEsXG4gIHJlY29ubmVjdF9hdHRlbXB0OiAxLFxuICByZWNvbm5lY3RfZmFpbGVkOiAxLFxuICByZWNvbm5lY3RfZXJyb3I6IDEsXG4gIHJlY29ubmVjdGluZzogMSxcbiAgcGluZzogMSxcbiAgcG9uZzogMVxufTtcblxuLyoqXG4gKiBTaG9ydGN1dCB0byBgRW1pdHRlciNlbWl0YC5cbiAqL1xuXG52YXIgZW1pdCA9IEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7XG5cbi8qKlxuICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBTb2NrZXQgKGlvLCBuc3AsIG9wdHMpIHtcbiAgdGhpcy5pbyA9IGlvO1xuICB0aGlzLm5zcCA9IG5zcDtcbiAgdGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG4gIHRoaXMuaWRzID0gMDtcbiAgdGhpcy5hY2tzID0ge307XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICBpZiAob3B0cyAmJiBvcHRzLnF1ZXJ5KSB7XG4gICAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gIH1cbiAgaWYgKHRoaXMuaW8uYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnN1YkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3VicykgcmV0dXJuO1xuXG4gIHZhciBpbyA9IHRoaXMuaW87XG4gIHRoaXMuc3VicyA9IFtcbiAgICBvbihpbywgJ29wZW4nLCBiaW5kKHRoaXMsICdvbm9wZW4nKSksXG4gICAgb24oaW8sICdwYWNrZXQnLCBiaW5kKHRoaXMsICdvbnBhY2tldCcpKSxcbiAgICBvbihpbywgJ2Nsb3NlJywgYmluZCh0aGlzLCAnb25jbG9zZScpKVxuICBdO1xufTtcblxuLyoqXG4gKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUub3BlbiA9XG5Tb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbm5lY3RlZCkgcmV0dXJuIHRoaXM7XG5cbiAgdGhpcy5zdWJFdmVudHMoKTtcbiAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gIGlmICgnb3BlbicgPT09IHRoaXMuaW8ucmVhZHlTdGF0ZSkgdGhpcy5vbm9wZW4oKTtcbiAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgYXJncy51bnNoaWZ0KCdtZXNzYWdlJyk7XG4gIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGBlbWl0YC5cbiAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2KSB7XG4gIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gIHZhciBwYWNrZXQgPSB7IHR5cGU6IHBhcnNlci5FVkVOVCwgZGF0YTogYXJncyB9O1xuXG4gIHBhY2tldC5vcHRpb25zID0ge307XG4gIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gIXRoaXMuZmxhZ3MgfHwgZmFsc2UgIT09IHRoaXMuZmxhZ3MuY29tcHJlc3M7XG5cbiAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgZGVidWcoJ2VtaXR0aW5nIHBhY2tldCB3aXRoIGFjayBpZCAlZCcsIHRoaXMuaWRzKTtcbiAgICB0aGlzLmFja3NbdGhpcy5pZHNdID0gYXJncy5wb3AoKTtcbiAgICBwYWNrZXQuaWQgPSB0aGlzLmlkcysrO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG5cbiAgZGVsZXRlIHRoaXMuZmxhZ3M7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBwYWNrZXQubnNwID0gdGhpcy5uc3A7XG4gIHRoaXMuaW8ucGFja2V0KHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCd0cmFuc3BvcnQgaXMgb3BlbiAtIGNvbm5lY3RpbmcnKTtcblxuICAvLyB3cml0ZSBjb25uZWN0IHBhY2tldCBpZiBuZWNlc3NhcnlcbiAgaWYgKCcvJyAhPT0gdGhpcy5uc3ApIHtcbiAgICBpZiAodGhpcy5xdWVyeSkge1xuICAgICAgdmFyIHF1ZXJ5ID0gdHlwZW9mIHRoaXMucXVlcnkgPT09ICdvYmplY3QnID8gcGFyc2Vxcy5lbmNvZGUodGhpcy5xdWVyeSkgOiB0aGlzLnF1ZXJ5O1xuICAgICAgZGVidWcoJ3NlbmRpbmcgY29ubmVjdCBwYWNrZXQgd2l0aCBxdWVyeSAlcycsIHF1ZXJ5KTtcbiAgICAgIHRoaXMucGFja2V0KHt0eXBlOiBwYXJzZXIuQ09OTkVDVCwgcXVlcnk6IHF1ZXJ5fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFja2V0KHt0eXBlOiBwYXJzZXIuQ09OTkVDVH0pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gIGRlYnVnKCdjbG9zZSAoJXMpJywgcmVhc29uKTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICBkZWxldGUgdGhpcy5pZDtcbiAgdGhpcy5lbWl0KCdkaXNjb25uZWN0JywgcmVhc29uKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9ucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBpZiAocGFja2V0Lm5zcCAhPT0gdGhpcy5uc3ApIHJldHVybjtcblxuICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgY2FzZSBwYXJzZXIuQ09OTkVDVDpcbiAgICAgIHRoaXMub25jb25uZWN0KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkVWRU5UOlxuICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9FVkVOVDpcbiAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5BQ0s6XG4gICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9BQ0s6XG4gICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkRJU0NPTk5FQ1Q6XG4gICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5FUlJPUjpcbiAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBwYWNrZXQuZGF0YSk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZXZlbnQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHZhciBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gIGRlYnVnKCdlbWl0dGluZyBldmVudCAlaicsIGFyZ3MpO1xuXG4gIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgIGRlYnVnKCdhdHRhY2hpbmcgYWNrIGNhbGxiYWNrIHRvIGV2ZW50Jyk7XG4gICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChhcmdzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuYWNrID0gZnVuY3Rpb24gKGlkKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNlbnQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICBpZiAoc2VudCkgcmV0dXJuO1xuICAgIHNlbnQgPSB0cnVlO1xuICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgIGRlYnVnKCdzZW5kaW5nIGFjayAlaicsIGFyZ3MpO1xuXG4gICAgc2VsZi5wYWNrZXQoe1xuICAgICAgdHlwZTogcGFyc2VyLkFDSyxcbiAgICAgIGlkOiBpZCxcbiAgICAgIGRhdGE6IGFyZ3NcbiAgICB9KTtcbiAgfTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmFjayA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIGFjayA9IHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGFjaykge1xuICAgIGRlYnVnKCdjYWxsaW5nIGFjayAlcyB3aXRoICVqJywgcGFja2V0LmlkLCBwYWNrZXQuZGF0YSk7XG4gICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ2JhZCBhY2sgJXMnLCBwYWNrZXQuaWQpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnY29ubmVjdCcpO1xuICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xufTtcblxuLyoqXG4gKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZW1pdEJ1ZmZlcmVkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMucmVjZWl2ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgIGVtaXQuYXBwbHkodGhpcywgdGhpcy5yZWNlaXZlQnVmZmVyW2ldKTtcbiAgfVxuICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5wYWNrZXQodGhpcy5zZW5kQnVmZmVyW2ldKTtcbiAgfVxuICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzZXJ2ZXIgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgdGhpcy5vbmNsb3NlKCdpbyBzZXJ2ZXIgZGlzY29ubmVjdCcpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZS5cbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnN1YnMpIHtcbiAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zdWJzW2ldLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzID0gbnVsbDtcbiAgfVxuXG4gIHRoaXMuaW8uZGVzdHJveSh0aGlzKTtcbn07XG5cbi8qKlxuICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9XG5Tb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIGRlYnVnKCdwZXJmb3JtaW5nIGRpc2Nvbm5lY3QgKCVzKScsIHRoaXMubnNwKTtcbiAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHBhcnNlci5ESVNDT05ORUNUIH0pO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgdGhpcy5kZXN0cm95KCk7XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgLy8gZmlyZSBldmVudHNcbiAgICB0aGlzLm9uY2xvc2UoJ2lvIGNsaWVudCBkaXNjb25uZWN0Jyk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuY29tcHJlc3MgPSBmdW5jdGlvbiAoY29tcHJlc3MpIHtcbiAgdGhpcy5mbGFncyA9IHRoaXMuZmxhZ3MgfHwge307XG4gIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNldXJpID0gcmVxdWlyZSgncGFyc2V1cmknKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6dXJsJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB1cmw7XG5cbi8qKlxuICogVVJMIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICAgICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHVybCAodXJpLCBsb2MpIHtcbiAgdmFyIG9iaiA9IHVyaTtcblxuICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO1xuICBpZiAobnVsbCA9PSB1cmkpIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDtcblxuICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdXJpKSB7XG4gICAgaWYgKCcvJyA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgaWYgKCcvJyA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgZGVidWcoJ3Byb3RvY29sLWxlc3MgdXJsICVzJywgdXJpKTtcbiAgICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgdXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gJ2h0dHBzOi8vJyArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZVxuICAgIGRlYnVnKCdwYXJzZSAlcycsIHVyaSk7XG4gICAgb2JqID0gcGFyc2V1cmkodXJpKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICBpZiAoIW9iai5wb3J0KSB7XG4gICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICBvYmoucG9ydCA9ICc4MCc7XG4gICAgfSBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgIG9iai5wb3J0ID0gJzQ0Myc7XG4gICAgfVxuICB9XG5cbiAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCAnLyc7XG5cbiAgdmFyIGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKCc6JykgIT09IC0xO1xuICB2YXIgaG9zdCA9IGlwdjYgPyAnWycgKyBvYmouaG9zdCArICddJyA6IG9iai5ob3N0O1xuXG4gIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgJzonICsgb2JqLnBvcnQ7XG4gIC8vIGRlZmluZSBocmVmXG4gIG9iai5ocmVmID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyAnJyA6ICgnOicgKyBvYmoucG9ydCkpO1xuXG4gIHJldHVybiBvYmo7XG59XG4iLCIvKmdsb2JhbCBCbG9iLEZpbGUqL1xuXG4vKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHNcbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIGdsb2JhbC5CbG9iID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkJsb2IpID09PSAnW29iamVjdCBCbG9iQ29uc3RydWN0b3JdJztcbnZhciB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBnbG9iYWwuRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5GaWxlKSA9PT0gJ1tvYmplY3QgRmlsZUNvbnN0cnVjdG9yXSc7XG5cbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cbiAqIEFueXRoaW5nIHdpdGggYmxvYnMgb3IgZmlsZXMgc2hvdWxkIGJlIGZlZCB0aHJvdWdoIHJlbW92ZUJsb2JzIGJlZm9yZSBjb21pbmdcbiAqIGhlcmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpIHtcbiAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgdmFyIHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgdmFyIHBhY2sgPSBwYWNrZXQ7XG4gIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgcGFjay5hdHRhY2htZW50cyA9IGJ1ZmZlcnMubGVuZ3RoOyAvLyBudW1iZXIgb2YgYmluYXJ5ICdhdHRhY2htZW50cydcbiAgcmV0dXJuIHtwYWNrZXQ6IHBhY2ssIGJ1ZmZlcnM6IGJ1ZmZlcnN9O1xufTtcblxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICBpZiAoaXNCdWYoZGF0YSkpIHtcbiAgICB2YXIgcGxhY2Vob2xkZXIgPSB7IF9wbGFjZWhvbGRlcjogdHJ1ZSwgbnVtOiBidWZmZXJzLmxlbmd0aCB9O1xuICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgIHZhciBuZXdEYXRhID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgIHZhciBuZXdEYXRhID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBSZWNvbnN0cnVjdHMgYSBiaW5hcnkgcGFja2V0IGZyb20gaXRzIHBsYWNlaG9sZGVyIHBhY2tldCBhbmQgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlcnMgLSBiaW5hcnkgYnVmZmVycyB0byBwdXQgaW4gcGxhY2Vob2xkZXIgcG9zaXRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgcmV0dXJuIHBhY2tldDtcbn07XG5cbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuIGRhdGE7XG5cbiAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICByZXR1cm4gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSByZW1vdmVzIEJsb2JzIG9yIEZpbGVzIGZyb20gZGF0YSB2aWFcbiAqIEZpbGVSZWFkZXIncyByZWFkQXNBcnJheUJ1ZmZlciBtZXRob2QuIFVzZWQgYmVmb3JlIGVuY29kaW5nXG4gKiBkYXRhIGFzIG1zZ3BhY2suIENhbGxzIGNhbGxiYWNrIHdpdGggdGhlIGJsb2JsZXNzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJlbW92ZUJsb2JzID0gZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gX3JlbW92ZUJsb2JzKG9iaiwgY3VyS2V5LCBjb250YWluaW5nT2JqZWN0KSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBvYmo7XG5cbiAgICAvLyBjb252ZXJ0IGFueSBibG9iXG4gICAgaWYgKCh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpIHtcbiAgICAgIHBlbmRpbmdCbG9icysrO1xuXG4gICAgICAvLyBhc3luYyBmaWxlcmVhZGVyXG4gICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyAvLyB0aGlzLnJlc3VsdCA9PSBhcnJheWJ1ZmZlclxuICAgICAgICBpZiAoY29udGFpbmluZ09iamVjdCkge1xuICAgICAgICAgIGNvbnRhaW5pbmdPYmplY3RbY3VyS2V5XSA9IHRoaXMucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGJsb2JsZXNzRGF0YSA9IHRoaXMucmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm90aGluZyBwZW5kaW5nIGl0cyBjYWxsYmFjayB0aW1lXG4gICAgICAgIGlmKCEgLS1wZW5kaW5nQmxvYnMpIHtcbiAgICAgICAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKG9iaik7IC8vIGJsb2IgLT4gYXJyYXlidWZmZXJcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqKSkgeyAvLyBoYW5kbGUgYXJyYXlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9yZW1vdmVCbG9icyhvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhaXNCdWYob2JqKSkgeyAvLyBhbmQgb2JqZWN0XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIF9yZW1vdmVCbG9icyhvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBwZW5kaW5nQmxvYnMgPSAwO1xuICB2YXIgYmxvYmxlc3NEYXRhID0gZGF0YTtcbiAgX3JlbW92ZUJsb2JzKGJsb2JsZXNzRGF0YSk7XG4gIGlmICghcGVuZGluZ0Jsb2JzKSB7XG4gICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgfVxufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBoYXNCaW4gPSByZXF1aXJlKCdoYXMtYmluYXJ5MicpO1xudmFyIGJpbmFyeSA9IHJlcXVpcmUoJy4vYmluYXJ5Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudHlwZXMgPSBbXG4gICdDT05ORUNUJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRVZFTlQnLFxuICAnQUNLJyxcbiAgJ0VSUk9SJyxcbiAgJ0JJTkFSWV9FVkVOVCcsXG4gICdCSU5BUllfQUNLJ1xuXTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkNPTk5FQ1QgPSAwO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBkaXNjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRElTQ09OTkVDVCA9IDE7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGV2ZW50YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVZFTlQgPSAyO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBhY2tgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5BQ0sgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBlcnJvcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVSUk9SID0gNDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfRVZFTlQgPSA1O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBiaW5hcnkgYWNrYC4gRm9yIGFja3Mgd2l0aCBiaW5hcnkgYXJndW1lbnRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfQUNLID0gNjtcblxuLyoqXG4gKiBFbmNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjtcblxuLyoqXG4gKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjtcblxuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbmNvZGVyKCkge31cblxuLyoqXG4gKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGhhbmRsZSBlbmNvZGluZ3MgKGxpa2VseSBlbmdpbmUud3JpdGUpXG4gKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2spe1xuICBpZiAoKG9iai50eXBlID09PSBleHBvcnRzLkVWRU5UIHx8IG9iai50eXBlID09PSBleHBvcnRzLkFDSykgJiYgaGFzQmluKG9iai5kYXRhKSkge1xuICAgIG9iai50eXBlID0gb2JqLnR5cGUgPT09IGV4cG9ydHMuRVZFTlQgPyBleHBvcnRzLkJJTkFSWV9FVkVOVCA6IGV4cG9ydHMuQklOQVJZX0FDSztcbiAgfVxuXG4gIGRlYnVnKCdlbmNvZGluZyBwYWNrZXQgJWonLCBvYmopO1xuXG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBvYmoudHlwZSkge1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaiwgY2FsbGJhY2spO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBlbmNvZGluZyA9IGVuY29kZUFzU3RyaW5nKG9iaik7XG4gICAgY2FsbGJhY2soW2VuY29kaW5nXSk7XG4gIH1cbn07XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBc1N0cmluZyhvYmopIHtcblxuICAvLyBmaXJzdCBpcyB0eXBlXG4gIHZhciBzdHIgPSAnJyArIG9iai50eXBlO1xuXG4gIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gb2JqLnR5cGUpIHtcbiAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgJy0nO1xuICB9XG5cbiAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgaWYgKG9iai5uc3AgJiYgJy8nICE9PSBvYmoubnNwKSB7XG4gICAgc3RyICs9IG9iai5uc3AgKyAnLCc7XG4gIH1cblxuICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgc3RyICs9IG9iai5pZDtcbiAgfVxuXG4gIC8vIGpzb24gZGF0YVxuICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSk7XG4gIH1cblxuICBkZWJ1ZygnZW5jb2RlZCAlaiBhcyAlcycsIG9iaiwgc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcbiAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjaykge1xuXG4gIGZ1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKSB7XG4gICAgdmFyIGRlY29uc3RydWN0aW9uID0gYmluYXJ5LmRlY29uc3RydWN0UGFja2V0KGJsb2JsZXNzRGF0YSk7XG4gICAgdmFyIHBhY2sgPSBlbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgIHZhciBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcblxuICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICBjYWxsYmFjayhidWZmZXJzKTsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gIH1cblxuICBiaW5hcnkucmVtb3ZlQmxvYnMob2JqLCB3cml0ZUVuY29kaW5nKTtcbn1cblxuLyoqXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIERlY29kZXIoKSB7XG4gIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYCB3aXRoIERlY29kZXIuXG4gKi9cblxuRW1pdHRlcihEZWNvZGVyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGVjb2RlcyBhbiBlY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRGVjb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciBwYWNrZXQ7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHBhY2tldCA9IGRlY29kZVN0cmluZyhvYmopO1xuICAgIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gcGFja2V0LnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBwYWNrZXQudHlwZSkgeyAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcblxuICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoaXNCdWYob2JqKSB8fCBvYmouYmFzZTY0KSB7IC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgIGlmIChwYWNrZXQpIHsgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgb2JqKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgdmFyIGkgPSAwO1xuICAvLyBsb29rIHVwIHR5cGVcbiAgdmFyIHAgPSB7XG4gICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpXG4gIH07XG5cbiAgaWYgKG51bGwgPT0gZXhwb3J0cy50eXBlc1twLnR5cGVdKSB7XG4gICAgcmV0dXJuIGVycm9yKCd1bmtub3duIHBhY2tldCB0eXBlICcgKyBwLnR5cGUpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IHAudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IHAudHlwZSkge1xuICAgIHZhciBidWYgPSAnJztcbiAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9PSAnLScpIHtcbiAgICAgIGJ1ZiArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKGkgPT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gJy0nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXR0YWNobWVudHMnKTtcbiAgICB9XG4gICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgaWYgKCcvJyA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICBwLm5zcCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmICgnLCcgPT09IGMpIGJyZWFrO1xuICAgICAgcC5uc3AgKz0gYztcbiAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcC5uc3AgPSAnLyc7XG4gIH1cblxuICAvLyBsb29rIHVwIGlkXG4gIHZhciBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gIGlmICgnJyAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgIHAuaWQgPSAnJztcbiAgICB3aGlsZSAoKytpKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgIC0taTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBwLmlkICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIHAuaWQgPSBOdW1iZXIocC5pZCk7XG4gIH1cblxuICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgdmFyIHBheWxvYWQgPSB0cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICB2YXIgaXNQYXlsb2FkVmFsaWQgPSBwYXlsb2FkICE9PSBmYWxzZSAmJiAocC50eXBlID09PSBleHBvcnRzLkVSUk9SIHx8IGlzQXJyYXkocGF5bG9hZCkpO1xuICAgIGlmIChpc1BheWxvYWRWYWxpZCkge1xuICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVycm9yKCdpbnZhbGlkIHBheWxvYWQnKTtcbiAgICB9XG4gIH1cblxuICBkZWJ1ZygnZGVjb2RlZCAlcyBhcyAlaicsIHN0ciwgcCk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiB0cnlQYXJzZShzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICB9XG59O1xuXG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KSB7XG4gIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLnRha2VCaW5hcnlEYXRhID0gZnVuY3Rpb24oYmluRGF0YSkge1xuICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7IC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgIHZhciBwYWNrZXQgPSBiaW5hcnkucmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgcmV0dXJuIHBhY2tldDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn07XG5cbmZ1bmN0aW9uIGVycm9yKG1zZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGV4cG9ydHMuRVJST1IsXG4gICAgZGF0YTogJ3BhcnNlciBlcnJvcjogJyArIG1zZ1xuICB9O1xufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBidWZmZXIgb3IgYW4gYXJyYXlidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNCdWYob2JqKSB7XG4gIHJldHVybiAoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgICAgICAoZ2xvYmFsLkFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKSkpO1xufVxuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gdG9BcnJheVxuXG5mdW5jdGlvbiB0b0FycmF5KGxpc3QsIGluZGV4KSB7XG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGluZGV4ID0gaW5kZXggfHwgMFxuXG4gICAgZm9yICh2YXIgaSA9IGluZGV4IHx8IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2kgLSBpbmRleF0gPSBsaXN0W2ldXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG59XG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIi8qKlxuICog0JzQvtC00YPQu9GMINC60LDQvNC10YDRi1xuICovXG5cbmNvbnN0IE1BWF9ERUFEWk9ORV9YID0gNTAwO1xuY29uc3QgTUFYX0RFQURaT05FX1kgPSA1MDA7XG5cbi8qKlxuICogQGNsYXNzIENhbWVyYVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzLCBmb2xsb3dlcil7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICB0aGlzLmRlYWRab25lID0ge1xuICAgICAgICAgICAgeDogTUFYX0RFQURaT05FX1gsXG4gICAgICAgICAgICB5OiBNQVhfREVBRFpPTkVfWVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIHRoaXMuc3BlZWQgPSAyMDA7XG5cbiAgICAgICAgdGhpcy5mb2xsb3dlciA9IGZvbGxvd2VyO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpe1xuXG4gICAgICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICBsZXQgeCA9IHRoaXMueCAtIE1hdGguZmxvb3IoKHdpZHRoIC0gdGhpcy53aWR0aCkvMik7XG4gICAgICAgIGxldCB5ID0gdGhpcy55IC0gTWF0aC5mbG9vcigoaGVpZ2h0IC0gdGhpcy5oZWlnaHQpLzIpO1xuICAgICAgICBpZih4IDwgMCkgeCA9IDA7XG4gICAgICAgIGlmKHk8MCkgeSA9IDA7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUocm9vbSl7XG5cbiAgICAgICAgaWYodGhpcy5mb2xsb3dlcil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5Gb2xsb3cocm9vbSwgdGhpcy5mb2xsb3dlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2xsb3dlcihmb2xsb3dlcil7XG4gICAgICAgIHRoaXMuZm9sbG93ZXIgPSBmb2xsb3dlcjtcbiAgICB9XG5cbiAgICBydW5Gb2xsb3cocm9vbSwgcGxheWVyKXtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/QtdGA0LXRgdGH0LjRgtCw0LXQvCBcItC80LXRgNGC0LLRi9C1INC30L7QvdGLXCJcbiAgICAgICAgICovXG5cbiAgICAgICAgLy8g0JHQtdGA0LXQvCDQv9C+0LvQvtCy0LjQvdGDINC60LDQvNC10YDRi1xuICAgICAgICB0aGlzLmRlYWRab25lLnggPSBNYXRoLmZsb29yKHRoaXMud2lkdGgvMik7XG4gICAgICAgIHRoaXMuZGVhZFpvbmUueSA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQvMik7XG5cblxuICAgICAgICAvLyDQo9GH0YLQtdC8LCDRh9GC0L4g0LrQvtC80L3QsNGC0LAg0LzQvtC20LXRgiDQsdGL0YLRjCDQvNC10L3RjNGI0LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKHJvb20ud2lkdGggPCB0aGlzLmNhbnZhcy53aWR0aCl7XG4gICAgICAgICAgICB0aGlzLmRlYWRab25lLnggPSBNYXRoLmZsb29yKChyb29tLndpZHRoIC0gdGhpcy5jYW52YXMud2lkdGgpLzIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJvb20uaGVpZ2h0IDwgdGhpcy5jYW52YXMuaGVpZ2h0KXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueSA9IE1hdGguZmxvb3IoKHJvb20uaGVpZ2h0IC0gdGhpcy5jYW52YXMuaGVpZ2h0KS8yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCd0LUg0LTQtdC70LDQtdC8INC+0YfQtdC90Ywg0LHQvtC70YzRiNC40LUgXCLQvNC10YDRgtCy0YvQtSDQt9C+0L3Ri1wiXG4gICAgICAgIGlmKHRoaXMuZGVhZFpvbmUueCA+IE1BWF9ERUFEWk9ORV9YKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueCA9IE1BWF9ERUFEWk9ORV9YO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZGVhZFpvbmUueSA+IE1BWF9ERUFEWk9ORV9ZKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueSA9IE1BWF9ERUFEWk9ORV9ZO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog0KHQu9C10LTRg9C10Lwg0LfQsCDQv9C70LXQtdGA0L7QvFxuICAgICAgICAgKi9cbiAgICAgICAgaWYocGxheWVyLnggLSB0aGlzLnggPiB0aGlzLndpZHRoIC0gdGhpcy5kZWFkWm9uZS54KSB7XG4gICAgICAgICAgICB0aGlzLnggPSBwbGF5ZXIueCAtIHRoaXMud2lkdGggKyB0aGlzLmRlYWRab25lLng7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihwbGF5ZXIueCA8IHRoaXMueCArIHRoaXMuZGVhZFpvbmUueCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcGxheWVyLnggLSB0aGlzLmRlYWRab25lLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZihwbGF5ZXIueSAtIHRoaXMueSA+IHRoaXMuaGVpZ2h0IC0gdGhpcy5kZWFkWm9uZS55KSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBwbGF5ZXIueSAtIHRoaXMuaGVpZ2h0ICsgdGhpcy5kZWFkWm9uZS55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocGxheWVyLnkgPCB0aGlzLnkgKyB0aGlzLmRlYWRab25lLnkpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHBsYXllci55IC0gdGhpcy5kZWFkWm9uZS55O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCd0LUg0LLRi9GF0L7QtNC40Lwg0LfQsCDQs9GA0LDQvdC40YbRiyDQutCw0YDRgtGLXG4gICAgICAgICAqL1xuICAgICAgICBpZih0aGlzLnggPCAwKVxuICAgICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgaWYodGhpcy55IDwgMClcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIGlmKHRoaXMueCArIHRoaXMud2lkdGggPiByb29tLndpZHRoKVxuICAgICAgICAgICAgdGhpcy54ID0gcm9vbS53aWR0aCAtIHRoaXMud2lkdGg7XG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gcm9vbS5oZWlnaHQpXG4gICAgICAgICAgICB0aGlzLnkgPSByb29tLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCV0YHQu9C4INC60LDQvNC10YDQsCDQsdC+0LvRjNGI0LUg0LrQsNGA0YLRiyAtINC00L7QsdCw0LLQuNC8INGB0LzQtdGJ0LXQvdC40LVcbiAgICAgICAgICovXG4gICAgICAgIGlmKHRoaXMud2lkdGggPiByb29tLndpZHRoKVxuICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLndpZHRoIC0gcm9vbS53aWR0aCkvMjtcbiAgICAgICAgaWYodGhpcy5oZWlnaHQgPiByb29tLmhlaWdodClcbiAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5oZWlnaHQgLSByb29tLmhlaWdodCkvMjtcblxuXG4gICAgfVxufSIsIi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAgLSDQutC70LDQstC40YjQuCDQuCDQvNGL0YjRjFxuICogVE9ETzog0LzQvtC20LXRgiDQutC+0LzQsNC90LTRiyDQvNC10L3RjiDRgtC+0LbQtSDRgdC+0LHRi9GC0LjRj9C80LhcbiAqL1xuXG5cbi8vINC/0L7QtNC60LvRjtGH0LjQvCDRgdC+0LHRi9GC0LjRj1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuLi8uLi9ldmVudHMuanMnXG5cblxuY29uc3Qga2V5cyA9IHtcbiAgICBMRUZUOiAzNywgLy9MZWZ0XG4gICAgVVA6IDM4LCAvL1VwXG4gICAgUklHSFQ6IDM5LCAvL1JpZ2h0XG4gICAgRE9XTjogNDAsIC8vRG93blxuXG4gICAgQTogNjUsIC8vQVxuICAgIFc6IDg3LCAvL1dcbiAgICBEOiA2OCwgLy9EXG4gICAgUzogODMsIC8vIFNcblxuICAgIE4xOiA0OSxcbiAgICBOMjogNTAsXG4gICAgTjM6IDUxLFxuICAgIE40OiA1MixcbiAgICBONTogNTMsXG4gICAgTjY6IDU0LFxuICAgIE43OiA1NSxcbiAgICBOODogNTYsXG4gICAgTjk6IDU3LFxuICAgIE4wOiA0OCxcblxuICAgIFNQQUNFOiAzMiwgLy/QntCz0L7QvdGMIVxuXG4gICAgU1RBVElTVElDOiA3MyAvLyBcIklcIlxuXG59O1xuXG5sZXQgY2xpY2tQYWQgPSBudWxsO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wLCBzZXRDbGlja1BhZH1cblxuXG4vKipcbiAqINCX0LDQv9GD0YHRgtC40Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqL1xuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgICAvLyDQldGB0LvQuCDQvtC60L3QviDQv9C+0YLQtdGA0Y/Qu9C+INGE0L7QutGD0YFcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgb25XaW5kb3dCbHVyLCBmYWxzZSk7XG5cbiAgICAvLyDQndCw0LbQsNGC0LAg0LrQu9Cw0LLQuNGI0LBcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24sIGZhbHNlKTtcblxuICAgIC8vINCe0YLQttCw0YLQsCDQutC70LDQstC40YjQsFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleXVwLCBmYWxzZSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2ssIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvbk1vdXNlVXAsIGZhbHNlKTtcbn1cblxuXG4vKipcbiAqINCe0YHRgtCw0L3QvtCy0LjQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICovXG5mdW5jdGlvbiBzdG9wKCkge1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIG9uV2luZG93Qmx1ciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5ZG93biwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleXVwLCBmYWxzZSk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2ssIGZhbHNlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvbk1vdXNlVXAsIGZhbHNlKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRDbGlja1BhZChfY2xpY2tQYWQpIHtcbiAgICBjbGlja1BhZCA9IF9jbGlja1BhZDtcbn1cblxuLyoqXG4gKiDQn9GA0Lgg0L3QsNC20LDRgtC40Lgg0LrQu9Cw0LLQuNGI0LhcbiAqIEBwYXJhbSBlXG4gKi9cbmZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcblxuICAgICAgICBjYXNlIGtleXMuTEVGVDpcbiAgICAgICAgY2FzZSBrZXlzLkE6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2xlZnQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuVVA6XG4gICAgICAgIGNhc2Uga2V5cy5XOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICd1cCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcbiAgICAgICAgY2FzZSBrZXlzLkQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ3JpZ2h0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLkRPV046XG4gICAgICAgIGNhc2Uga2V5cy5TOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICdkb3duJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlNQQUNFOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4xOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OMjpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjM6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGwzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk40OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ONTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjY6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGw2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk43OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OODpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjk6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGw5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4wOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQvtGC0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXl1cChlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBrZXlzLkxFRlQ6XG4gICAgICAgIGNhc2Uga2V5cy5BOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnbGVmdCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5VUDpcbiAgICAgICAgY2FzZSBrZXlzLlc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICd1cCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcbiAgICAgICAgY2FzZSBrZXlzLkQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdyaWdodCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ET1dOOlxuICAgICAgICBjYXNlIGtleXMuUzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2Rvd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuU1BBQ0U6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlNUQVRJU1RJQzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ3N0YXRpc3RpYycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8qY2FzZSBrZXlzLk4xOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGwxJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4yOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGwyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4zOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGwzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk40OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGw0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk41OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGw1Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk42OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGw2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk43OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGw3Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk44OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGw4Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk45OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGw5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4wOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnc2tpbGwxMCcpO1xuICAgICAgICAgICAgYnJlYWs7Ki9cbiAgICB9XG59XG5cblxuLyoqXG4gKiDQn9GA0Lgg0LrQu9C40LrQtVxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25DbGljayhlKSB7XG5cbiAgICAvLyDQldGB0LvQuCDQtdGB0YLRjCDQv9C+INGH0LXQvCDQutC70LjQutCw0YLRjCDQvtGC0L/RgNCw0LLQuNC8INGB0L7QsdGL0YLQuNC1XG4gICAgaWYoY2xpY2tQYWQpIHtcbiAgICAgICAgbGV0IHggPSBlLmNsaWVudFggKyBjbGlja1BhZC54LFxuICAgICAgICAgICAgeSA9IGUuY2xpZW50WSArIGNsaWNrUGFkLnk7XG4gICAgICAgIGV2ZW50cy5hZGQoJ3RhcmdldCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIGV2ZW50cy5hZGQoJ2NsaWNrJywge3g6IHgsIHk6IHl9KTtcblxuICAgIH1cbn1cblxuLy/QnNGL0YjRjCDQvdCw0LbQsNC70LhcbmZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC/0L4g0YfQtdC8INC60LvQuNC60LDRgtGMINC+0YLQv9GA0LDQstC40Lwg0YHQvtCx0YvRgtC40LVcbiAgICBpZihjbGlja1BhZCkge1xuICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCArIGNsaWNrUGFkLngsXG4gICAgICAgICAgICB5ID0gZS5jbGllbnRZICsgY2xpY2tQYWQueTtcblxuICAgICAgICBpZihlLmJ1dHRvbiA9PT0gMCB8fCBlLmJ1dHRvbj09PTEpIHtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ21vdXNlLWRvd24tbGVmdCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlLmJ1dHRvbiA9PT0gMil7XG4gICAgICAgICAgICBldmVudHMuYWRkKCdtb3VzZS1kb3duLXJpZ2h0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4vL9Cc0YvRiNGMINC+0YLQv9GD0YHRgtC40LvQuFxuZnVuY3Rpb24gb25Nb3VzZVVwKGUpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC/0L4g0YfQtdC8INC60LvQuNC60LDRgtGMINC+0YLQv9GA0LDQstC40Lwg0YHQvtCx0YvRgtC40LVcbiAgICBpZihjbGlja1BhZCkge1xuICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCArIGNsaWNrUGFkLngsXG4gICAgICAgICAgICB5ID0gZS5jbGllbnRZICsgY2xpY2tQYWQueTtcblxuICAgICAgICBpZihlLmJ1dHRvbiA9PT0gMCB8fCBlLmJ1dHRvbj09PTEpIHtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ21vdXNlLXVwLWxlZnQnLCB7eDogeCwgeTogeX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZS5idXR0b24gPT09IDIpe1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnbW91c2UtdXAtcmlnaHQnLCB7eDogeCwgeTogeX0pO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiDQldGB0LvQuCDQvtC60L3QviDQv9C+0YLQtdGA0Y/Qu9C+INGE0L7QutGD0YFcbiAqL1xuZnVuY3Rpb24gb25XaW5kb3dCbHVyKCkge1xuICAgIC8vINC+0YLQvtC20LzQtdC8INCy0YHQtSDQutC70LDQstC40YjQuFxuICAgIGV2ZW50cy5hZGQoJ2NvbnRyb2xsZXJSZXNldCcsIHRydWUpO1xufSIsImltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuLi8uLi9jaGFyYWN0ZXJzXCI7XG5pbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7YWRkLCBhZGRGcm9tU2V0LCByZW1vdmUsIHJlc2V0LCBzaXplLCBlYWNofVxuXG5jb25zdCBlbnRpdGllcyA9IFtdO1xuXG5cbmZ1bmN0aW9uIGFkZCh4LCB5LCBJRCwgbGlmZXRpbWUsIGZhemEpIHtcbiAgICBlbnRpdGllcy5wdXNoKFxuICAgICAgICBuZXcgRW50aXR5KHgsIHksIGNoYXJhY3RlcnMuZ2V0KElEKSwgbGlmZXRpbWUsIGZhemEpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gYWRkRnJvbVNldCh4LCB5LCBzZXRJRCwgSUQsIGxpZmV0aW1lLCBmYXphKSB7XG4gICAgZW50aXRpZXMucHVzaChcbiAgICAgICAgbmV3IEVudGl0eSh4LCB5LCBjaGFyYWN0ZXJzLmdldEZyb21TZXQoc2V0SUQsIElEKSwgbGlmZXRpbWUsIGZhemEpXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGluZGV4KSB7XG4gICAgZW50aXRpZXMuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgZW50aXRpZXMubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gc2l6ZSgpIHtcbiAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBlYWNoKGNhbGxiYWNrKSB7XG4gICAgZW50aXRpZXMuZm9yRWFjaChjYWxsYmFjayk7XG59XG4iLCIvKipcbiAqIEBjbGFzcyBFbnRpdHlcbiAqXG4gKi9cbmltcG9ydCB7U1RFUH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHl7XG5cbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjaGFyYWN0ZXIsIGxpZmV0aW1lLCBmYXphKXtcblxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuXG4gICAgICAgIC8vINCy0YDQtdC80Y8g0LbQuNC30L3QuFxuICAgICAgICB0aGlzLmxpZmV0aW1lID0gbGlmZXRpbWU7XG5cbiAgICAgICAgdGhpcy5pbW1vcnRhbCA9IGxpZmV0aW1lID4gMC4wID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNoYXJhY3Rlci53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNoYXJhY3Rlci5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3BlZWQ7XG4gICAgICAgIGlmKCF0aGlzLmFuaW1hdGVTcGVlZCkgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDtcbiAgICAgICAgdGhpcy5mYXphID0gZmF6YSB8fCAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcImRlZmF1bHRcIjtcblxuICAgICAgICB0aGlzLmRpZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzRGllKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmRpZTtcbiAgICB9XG5cbiAgICBraWxsKCl7XG4gICAgICAgIHRoaXMuZGllID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKXtcblxuICAgICAgICBpZighdGhpcy5pbW1vcnRhbCkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5saWZldGltZSA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpZmV0aW1lIC09IFNURVA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpZmV0aW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoKXtcbiAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPXG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIFNURVA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gY2FtZXJhLnggLSB0aGlzLndpZHRoLzIsXG4gICAgICAgICAgICB5ID0gdGhpcy55IC0gY2FtZXJhLnkgLSB0aGlzLmhlaWdodC8yO1xuXG4gICAgICAgIC8vINC90LUg0YDQuNGB0YPQtdC8INCy0L3QtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYoXG4gICAgICAgICAgICB4IDwgLXRoaXMuY2hhcmFjdGVyLndpZHRoIHx8XG4gICAgICAgICAgICB5IDwgLXRoaXMuY2hhcmFjdGVyLmhlaWdodCB8fFxuICAgICAgICAgICAgeCA+IGNhbWVyYS53aWR0aCB8fFxuICAgICAgICAgICAgeSA+IGNhbWVyYS5oZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd0NoYXJhY3RlcihjYW1lcmEuY29udGV4dCwgeCwgeSk7XG4gICAgfVxuXG5cbiAgICBkcmF3Q2hhcmFjdGVyKGNvbnRleHQsIHN4LCBzeSl7XG4gICAgICAgIGxldCB4ID0gc3ggLSAodGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMixcbiAgICAgICAgICAgIHkgPSBzeSAtICh0aGlzLmNoYXJhY3Rlci5oZWlnaHQtdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufSIsImltcG9ydCBVbml0IGZyb20gJy4vdW5pdC5qcydcblxuLyoqXG4gKiBIZXJvIC0g0LPQu9Cw0LLQvdGL0Lkg0LPQtdGA0L7QuVxuICovXG5cbi8qKlxuICog0K7QvdC40YIg0LPQtdGA0L7Rj1xuICogQHR5cGUge1VuaXR8bnVsbH1cbiAqL1xubGV0IHVuaXQgPSBudWxsO1xuXG4vKipcbiAqINCh0LrQvtGA0L7RgdGC0Ywg0L/QtdGA0LXQvNC10YnQtdC90LjRj1xuICogQHR5cGUge251bWJlcn1cbiAqL1xubGV0IHNwZWVkID0gMDtcblxuXG5leHBvcnQgZGVmYXVsdCB7dW5pdCwgc3BlZWQsIGFuaW1hdGUsIGRyYXd9XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgdGhpcy51bml0LmFuaW1hdGUoKTtcbn1cblxuZnVuY3Rpb24gZHJhdyhjYW1lcmEpIHtcbiAgICB0aGlzLnVuaXQuZHJhdyhjYW1lcmEpO1xufVxuIiwiaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCBsb2cgZnJvbSBcIi4uLy4uL2xvZ3NcIlxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi9jYW1lcmFcIjtcbmltcG9ydCB1bml0cyBmcm9tIFwiLi91bml0c1wiO1xuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vZXZlbnRzXCI7XG5pbXBvcnQgaGVybyBmcm9tICcuL2hlcm8nO1xuaW1wb3J0IFVuaXQgZnJvbSBcIi4vdW5pdFwiO1xuaW1wb3J0IFRlbGVwb3J0IGZyb20gXCIuL3RlbGVwb3J0XCI7XG5pbXBvcnQgUm9vbSBmcm9tIFwiLi9yb29tXCI7XG5pbXBvcnQgTG9vdCBmcm9tIFwiLi9sb290XCI7XG5pbXBvcnQgdWkgZnJvbSBcIi4vdWkvdWlcIjtcbmltcG9ydCBjb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZHMgZnJvbSBcIi4uLy4uL3NvdW5kc1wiO1xuaW1wb3J0IGVudGl0aWVzIGZyb20gXCIuL2VudGl0aWVzXCI7XG5pbXBvcnQgYWNjb3VudCBmcm9tIFwiLi4vLi4vYWNjb3VudFwiO1xuXG4vKipcbiAqINCe0YHQvdC+0LLQvdCw0Y8g0YHRhtC10L3QsCAtINGB0L7QsdGB0YLQstC10L3QvdC+INC40LPRgNCwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcH1cblxuLy8g0JfQsNC/0YPRgdGC0LjQvCDQv9C+INC+0LrQvtC90YfQsNC90LjQuCDQuNCz0YDRi1xubGV0XG4gICAgZmluYWxDYWxsYmFjayA9IG51bGwsXG4gICAgaW50ZXJ2YWwgPSBudWxsO1xuXG5sZXQgcm9vbXMgPSB7fSxcbiAgICByb29tX2lkID0gbnVsbCxcbiAgICByb29tID0gbnVsbCxcblxuICAgIC8vINCa0LDQvNC10YDQsC4g0KHQvtCy0LzQtdGJ0LXQvdCwINGB0L4g0LLRitGO0L/QvtGA0YLQvtC8XG4gICAgY2FtZXJhID0gbnVsbCxcbiAgICBsb290cyA9IHt9LFxuICAgIHRlbGVwb3J0cyA9IHt9O1xuXG5cbmZ1bmN0aW9uIHN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgZmluYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgcm9vbXMgPSB7fTtcblxuICAgIC8vINCi0LXQutGD0YnQsNGPINC60L7QvNC90LDRgtCwLiBpZCDQuCDRgdCw0LzQsFxuICAgIHJvb21faWQgPSBudWxsO1xuICAgIHJvb20gPSBudWxsO1xuXG4gICAgLy8g0JLQtdGB0Ywg0LvRg9GCXG4gICAgbG9vdHMgPSB7fTtcblxuICAgIC8vINCi0LXQu9C10L/QvtGA0YLRi1xuICAgIHRlbGVwb3J0cyA9IHt9O1xuXG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAvLyDQodC+0LfQtNCw0LTQuNC8INC60LDQvNC10YDRgyDQv9C+IFwi0LrQsNC90LLQtVwiXG4gICAgY2FtZXJhID0gbmV3IENhbWVyYSgwLCAwLCBjYW52YXMpO1xuICAgIC8vINC40LfQvNC10L3Rj9C10Lwg0LrQsNC80LXRgNGDINC/0L7QtCDQvtC60L3QvlxuICAgIGNhbWVyYS5yZXNpemUoKTtcblxuICAgIC8v0J/RgNC4INGA0LXRgdCw0LnQt9C1INC+0LrQvdCwINCx0YDQsNGD0LfQtdGA0LAgLSDQuNC30LzQtdC90Y/QtdC8INC60LDQvNC10YDRgyDQv9C+0LQg0L7QutC90L5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge2NhbWVyYS5yZXNpemUoKTt9KTtcblxuXG4gICAgLy/Ql9Cw0L/RgNC+0YHQuNC8INCw0LLQsNGC0LDRgNCwXG4gICAgZXZlbnRzLmFkZCgnbmVlZC1hdmF0YXInKTtcblxuICAgIGV2ZW50cy5vbihcInNpZ25vdXRcIiwoKT0+e1xuICAgICAgICBhY2NvdW50LnNpZ25vdXQoKTtcbiAgICAgICAgZXZlbnRzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgc3RvcCgpXG4gICAgfSk7XG5cbiAgICBldmVudHMub24oXCJkaXNjb25uZWN0XCIsICgpPT57XG4gICAgICAgIHN0b3AoKTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInJlY29ubmVjdFwiLCBvblJlY29ubmVjdCk7XG4gICAgZXZlbnRzLm9uKFwicm9vbVwiLCBvblJvb20pO1xuICAgIGV2ZW50cy5vbihcImhlcm9cIiwgb25IZXJvKTtcbiAgICBldmVudHMub24oXCJzb3VuZFwiLCBvblNvdW5kKTtcblxuICAgIGV2ZW50cy5vbihcImNsaWNrXCIsIChldmVudE5hbWUsIHBvcyk9PntcbiAgICAgICAgaWYocG9zKSB7XG4gICAgICAgICAgICBlbnRpdGllcy5hZGQocG9zLngsIHBvcy55KzEsICdwb2ludGVyJywgLjM1KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uKFwiZW50aXR5XCIsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpPT57XG4gICAgICAgIGlmKHR5cGU9PT1cInJlbW92ZS1jb2luXCIgJiYgZGF0YS5yb29tX2lkPT09cm9vbV9pZCl7XG5cbiAgICAgICAgICAgIGVudGl0aWVzLmFkZChkYXRhLngsIGRhdGEueSwgJ2Jvb20xJywgLjY1KTtcblxuICAgICAgICAgICAgLy8gZW50aXRpZXMuYWRkKGRhdGEueCwgZGF0YS55LCAnYm9vbTInLCAuNTUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlPT09XCJ0ZWxlcG9ydC10YXJnZXRcIiAmJiBkYXRhLnJvb21faWQ9PT1yb29tX2lkKXtcblxuICAgICAgICAgICAgZW50aXRpZXMuYWRkKGRhdGEueCwgZGF0YS55LCAnYmFyaWVyJywgMC42NSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlPT09XCJwdXNoLWVmZmVjdFwiICYmIGRhdGEucm9vbV9pZD09PXJvb21faWQpe1xuXG4gICAgICAgICAgICBlbnRpdGllcy5hZGQoZGF0YS54LCBkYXRhLnksICdwdXNoMScsIDAuMTUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB1aS5za2lsbHMuc3RhcnQoKTtcblxuICAgIHVpLnRvcDEwLnN0YXJ0KCk7XG5cblxuICAgIC8qKlxuICAgICAqINCe0YHQvdC+0LLQvdC+0Lkg0YbQuNC60LtcbiAgICAgKi9cbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKF8gPT4ge1xuXG4gICAgICAgIC8vINCf0LXRgNC10LzQtdGJ0LXQvdC40LUsINGD0L/RgNCw0LLQu9GP0LXQvNC+0LUg0L3QsCDQutC70LjQtdC90YLQtVxuICAgICAgICB1cGRhdGUoKTtcblxuXG4gICAgICAgIC8vINCe0YLRgNC40YHQvtCy0LrQsFxuICAgICAgICBkcmF3KGNhbWVyYSk7XG5cblxuICAgICAgICAvLyDQkNC90LjQvNCw0YbQuNGPXG4gICAgICAgIGFuaW1hdGUoKTtcblxuXG4gICAgfSwgY29uc3RhbnRzLklOVEVSVkFMKTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcblxuICAgIGV2ZW50cy5vZmYoXCJyZWNvbm5lY3RcIiwgb25SZWNvbm5lY3QpO1xuICAgIGV2ZW50cy5vZmYoXCJyb29tXCIsIG9uUm9vbSk7XG4gICAgZXZlbnRzLm9mZihcImhlcm9cIik7XG4gICAgZXZlbnRzLm9mZihcInNvdW5kXCIpO1xuXG4gICAgZXZlbnRzLm9mZihcImNsaWNrXCIpO1xuICAgIGV2ZW50cy5vZmYoXCJjb2luXCIpO1xuXG4gICAgdW5pdHMucmVzZXQoKTtcbiAgICBsb290cyA9IHt9O1xuICAgIGhlcm8udW5pdCA9IG51bGw7XG4gICAgZW50aXRpZXMucmVzZXQoKTtcblxuICAgIHVpLnNraWxscy5zdG9wKCk7XG5cbiAgICB1aS50b3AxMC5zdG9wKCk7XG5cbiAgICBmaW5hbENhbGxiYWNrKCk7XG59XG5cbmZ1bmN0aW9uIG9uUmVjb25uZWN0KGV2ZW50LCB0eXBlLCBkYXRhKSB7XG4gICAgbG9nKCfQvtGCINGB0LXRgNCy0LXRgNCwINC/0L7RgdGC0YPQv9C40LsgcmVjb25uZWN0Jyk7XG4gICAgdW5pdHMucmVzZXQoKTtcbiAgICBsb290cyA9IHt9O1xuICAgIGhlcm8udW5pdCA9IG51bGw7XG59XG5cbi8qKlxuICog0KHQvtCx0YvRgtC40Y8gXCJyb29tXCJcbiAqIEBwYXJhbSBldmVudFxuICogQHBhcmFtIHR5cGVcbiAqIEBwYXJhbSBkYXRhXG4gKi9cbmZ1bmN0aW9uIG9uUm9vbShldmVudCwgdHlwZSwgZGF0YSkge1xuXG4gICAgLy8g0J/QvtC70YPRh9C10L3QuNC1INC60L7QvNC90LDRgtGLXG4gICAgaWYodHlwZT09PVwiY2hhbmdlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLnJvb20pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgcm9vbSA9IGRhdGEucm9vbTtcblxuICAgICAgICAgICAgaWYgKHJvb20uSUQ9PXVuZGVmaW5lZCB8fCAhcm9vbS53aWR0aCB8fCAhcm9vbS5oZWlnaHQgfHwgcm9vbS5lbnZpcm9ubWVudF9pZD09dW5kZWZpbmVkKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgcm9vbUluaXQocm9vbSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQmtC+0LzQvdCw0YLRiy4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC40LPRgNC+0LrQsFxuICAgIGlmKHR5cGU9PT1cInBsYXllci1jcmVhdGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWwgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gbmV3IFVuaXQoaW5mbyk7XG4gICAgICAgICAgICB1bml0cy5hZGQoaW5mby5JRCwgdW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQuNCz0YDQvtC60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQvtCxINC40LPRgNC+0LrQtVxuICAgIGlmKHR5cGU9PT1cInBsYXllci1pbmZvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgbGV0IHVuaXQgPSB1bml0cy5pdGVtKGluZm8uSUQpO1xuICAgICAgICAgICAgaWYodW5pdCkge1xuXG4gICAgICAgICAgICAgICAgdW5pdC5zZXQoaW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINC40LPRgNC+0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0LPRgNC+0Log0YPRiNC10LtcbiAgICBpZih0eXBlPT09XCJwbGF5ZXItbGVhdmVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuSUQpIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB1bml0cy5yZW1vdmUoZGF0YS5JRCk7XG5cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0YPQtNCw0LvQtdC90LjRjyDQuNCz0YDQvtC60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC70YPRgtCwXG4gICAgaWYodHlwZT09PVwibG9vdC1jcmVhdGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKGluZm8ucm9vbV9pZD09cm9vbV9pZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSUQgaW4gbG9vdHM9PT1mYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIGxvb3RzW2luZm8uSURdID0gbmV3IExvb3QoaW5mby5yb29tX2lkLCBpbmZvLngsIGluZm8ueSwgaW5mby5jaGFyYWN0ZXJfaWQsIGluZm8uSUQsIGluZm8ud2lkdGgsIGluZm8uaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3RzW2luZm8uSURdLnNldChpbmZvLnJvb21faWQsIGluZm8ueCwgaW5mby55LCBpbmZvLmNoYXJhY3Rlcl9pZCwgaW5mby5JRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LvRg9GC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC00LXQutC+0YDQsNGG0LjQuFxuICAgIGlmKHR5cGU9PT1cImNhcnRvb24tY3JlYXRlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnNwcml0ZXNldF9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnNwcml0ZV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGVudGl0aWVzLmFkZEZyb21TZXQoaW5mby54LCBpbmZvLnksIGluZm8uc3ByaXRlc2V0X2lkLCBpbmZvLnNwcml0ZV9pZCwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQtNC10LrQvtGA0LDRhtC40LguIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDQu9GD0YLQtVxuICAgIGlmKHR5cGU9PT1cImxvb3QtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5JRCBpbiBsb290cykge1xuICAgICAgICAgICAgICAgICAgICBsb290c1tpbmZvLklEXS5zZXQoaW5mby5yb29tX2lkLCBpbmZvLngsIGluZm8ueSwgaW5mby5jaGFyYWN0ZXJfaWQsIGluZm8uSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC70YPRgtCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KPQtNCw0LvQtdC90LjQtSDQu9GD0YLQsFxuICAgIGlmKHR5cGU9PT1cImxvb3QtcmVtb3ZlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT09cm9vbV9pZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSUQgaW4gbG9vdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvb3RzW2luZm8uSURdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC70YPRgtCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0YLQtdC70LXQv9C+0YDRgtCw0YVcbiAgICBpZih0eXBlPT1cInRlbGVwb3J0LWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKGluZm8ucm9vbV9pZD09cm9vbV9pZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSUQgaW4gdGVsZXBvcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbGVwb3J0c1tpbmZvLklEXS5zZXQoaW5mby5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YLQtdC70LXQv9C+0YDRgtCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQvdC+0LLQvtCz0L4g0LzQvtCx0LBcbiAgICBpZih0eXBlPT1cIm5wYy1jcmVhdGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gbmV3IFVuaXQoaW5mbyk7XG4gICAgICAgICAgICB1bml0cy5hZGQoaW5mby5JRCwgdW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQvNC+0LHQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INC80L7QsdC1XG4gICAgaWYodHlwZT09XCJucGMtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHVuaXRzLml0ZW0oaW5mby5JRCk7XG4gICAgICAgICAgICBpZih1bml0KSB7XG5cbiAgICAgICAgICAgICAgICB1bml0LnNldChpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L7QsdC90L7QstC70LXQvdC40Y8g0LzQvtCx0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8g0KPQtNCw0LvQtdC90LjQtSDQvNC+0LHQsFxuICAgIGlmKHR5cGU9PT1cIm5wYy1yZW1vdmVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB1bml0cy5yZW1vdmUoaW5mby5JRCk7XG5cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0YPQtNCw0LvQtdC90LjRjyDQvNC+0LHQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uSGVybyhldmVudCwgdHlwZSwgZGF0YSkge1xuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQs9C10YDQvtGPINC/0YDQuCDQstGF0L7QtNC1XG4gICAgaWYodHlwZT09XCJoZXJvLWNyZWF0ZVwiKSB7XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgaWYgKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNvaW5zX2NvdW50ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWwgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbHVwQ291bnRlciA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnNwZWVkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoIWhlcm8udW5pdCkge1xuICAgICAgICAgICAgICAgIGhlcm8udW5pdCA9IG5ldyBVbml0KGluZm8sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBoZXJvLnVuaXQuc2V0KGluZm8pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bml0cy5hZGQoJ1snK2luZm8uSUQrJ10nLCBoZXJvLnVuaXQpO1xuXG4gICAgICAgICAgICBoZXJvLnNwZWVkID0gaW5mby5zcGVlZDtcblxuICAgICAgICAgICAgdWkuaGVyb0luZm8uc3RhcnQoKTtcbiAgICAgICAgICAgIHVpLmhlcm9JbmZvLnVwZGF0ZShpbmZvKTtcblxuICAgICAgICAgICAgdWkud2FpdFNjcmVlbi5oaWRlKCk7XG5cbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuc2V0Q2xpY2tQYWQoY2FtZXJhKTtcblxuICAgICAgICAgICAgLy/QldGB0LvQuCDRgtC60YPRidCw0Y8g0LrQvtC80L3QsNGC0LAg0L7RgtGB0YPRgtGB0YLQstGD0LXRgiDQuNC70Lgg0L3QtSDRgtCwIC0g0YjQu9C10Lwg0L3QsCDRgdC10YDQstC10YAg0LfQsNC/0YDQvtGBXG4gICAgICAgICAgICBpZighcm9vbV9pZCB8fCByb29tX2lkICE9IGluZm8ucm9vbV9pZCkge1xuICAgICAgICAgICAgICAgIHJvb21faWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGV2ZW50cy5hZGQoJ25lZWQtcm9vbScsIGluZm8ucm9vbV9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYW1lcmEgJiYgY2FtZXJhLnNldEZvbGxvd2VyKGhlcm8udW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINGB0L7Qt9C00LDQvdC40Y8g0JPQtdGA0L7Rjy4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INCz0LXRgNC+0LVcbiAgICBpZih0eXBlPT1cImhlcm8taW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jb2luc19jb3VudCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWx1cENvdW50ZXIgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcGVlZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGhlcm8udW5pdC5zZXQoaW5mbyk7XG5cbiAgICAgICAgICAgIGhlcm8uc3BlZWQgPSBpbmZvLnNwZWVkO1xuXG4gICAgICAgICAgICB1aS5oZXJvSW5mby51cGRhdGUoaW5mbywgaW5mby5JRCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINCT0LXRgNC+0Y8uIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvblNvdW5kKGV2ZW50LCB0eXBlLCBkYXRhKSB7XG4gICAgLy8g0LfQstGD0LrQvtCy0YvQtSDRg9Cy0LXQtNC+0LzQu9C10L3QuNGPXG4gICAgaWYodHlwZT09XCJub3RpY2VcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKGhlcm8gJiYgaGVyby51bml0ICYmIGhlcm8udW5pdC5yb29tX2lkID09IGluZm8ucm9vbV9pZCkgeyAvL1RPRE86INC90LUg0Y7QvdC40YIsINCwINC60LDQvNC10YDQsFxuICAgICAgICAgICAgICAgIGlmKGluZm8uSUQgaW4gc291bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzog0L/QviBpbmZvLngsIGluZm8ueSDQvtC/0YDQtdC00LXQu9GP0YLRjCDQutCw0Log0LTQsNC70LXQutC+INC+0YIgaGVybyDQuCDQtNC10LvQsNGC0Ywg0LPRgNC+0LzQutC+0YHRgtGMXG4gICAgICAgICAgICAgICAgICAgIHNvdW5kc1tpbmZvLklEXS5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQt9Cy0YPQutCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDQn9C10YDQtdC80LXRidC10L3QuNC1INC90LAg0LrQu9C40LXQvdGC0LVcbiAqICDRgtC+LCDRh9GC0L4g0L3QtSDRg9C/0YDQsNCy0LvRj9C10YLRgdGPINGBINGB0LXRgNCy0LXRgNCwLiDQndCw0L/RgNC40LzQtdGAINC60LDQvNC10YDQsFxuICovXG5mdW5jdGlvbiB1cGRhdGUoKXtcblxuICAgIC8v0JrQsNC80LXRgNCwXG4gICAgY2FtZXJhICYmIGNhbWVyYS51cGRhdGUocm9vbSk7XG5cbiAgICAvL9Ch0YPRidC90L7RgdGC0LhcbiAgICBlbnRpdGllcy5lYWNoKChlbnRpdHksIGluZGV4KT0+e1xuXG4gICAgICAgIGVudGl0eS51cGRhdGUoKTtcblxuICAgICAgICAvL9Cj0LTQsNC70LjQvCDQvtGC0YDQsNCx0L7RgtCw0LLRiNC40LUg0YHRg9GJ0L3QvtGB0YLQuFxuICAgICAgICBpZihlbnRpdHkuaXNEaWUoKSl7XG4gICAgICAgICAgICBlbnRpdGllcy5yZW1vdmUoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn1cblxuXG4vKipcbiAqINCQ0L3QuNC80LDRhtC40Y9cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZSgpe1xuXG4gICAgLy/QrtC90LjRgtGLICjQstC60LvRjtGH0LDRjyDRgdCw0LzQvtCz0L4g0LPQtdGA0L7RjylcbiAgICBmb3IgKGNvbnN0IHVuaXQgb2YgdW5pdHMudG9BcnJheSgpKSB7XG4gICAgICAgIGlmKHVuaXQucm9vbV9pZD09cm9vbV9pZCkge1xuICAgICAgICAgICAgdW5pdC5hbmltYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL9Cb0YPRglxuICAgIGZvciAobGV0IGkgaW4gbG9vdHMpIHtcbiAgICAgICAgbG9vdHNbaV0uYW5pbWF0ZShjb25zdGFudHMuU1RFUCk7XG4gICAgfVxuXG4gICAgLy/QotC10LvQtdC/0L7RgNGC0YtcbiAgICBmb3IgKGxldCBpIGluIHRlbGVwb3J0cykge1xuICAgICAgICB0ZWxlcG9ydHNbaV0uYW5pbWF0ZShjb25zdGFudHMuU1RFUCk7XG4gICAgfVxuXG4gICAgLy/QodGD0YnQvdC+0YHRgtC4XG4gICAgZW50aXRpZXMuZWFjaCggKGVudGl0eSkgPT4ge1xuICAgICAgICBlbnRpdHkuYW5pbWF0ZSgpO1xuICAgIH0pO1xuXG59XG5cblxuLyoqXG4gKiDQntGC0YDQuNGB0L7QstC60LAg0L3QsCDQutCw0LzQtdGA0YNcbiAqIEBwYXJhbSBjYW1lcmFcbiAqIFRPRE86INC/0L7RgNGP0LTQvtC6INC+0YLRgNC40YHQvtCy0LrQuCFcbiAqL1xuZnVuY3Rpb24gZHJhdyhjYW1lcmEpe1xuXG4gICAgLy8g0JrQvtC80L3QsNGC0LBcbiAgICByb29tICYmIHJvb20uZHJhdyhjYW1lcmEpO1xuXG4gICAgLy8g0KLQtdC70LXQv9C+0YDRgtGLXG4gICAgZm9yIChsZXQgaSBpbiB0ZWxlcG9ydHMpIHtcbiAgICAgICAgdGVsZXBvcnRzW2ldLmRyYXcoY2FtZXJhKTtcbiAgICB9XG5cblxuICAgIGxldCByZW5kZXJBcnJheSA9IFtdO1xuXG4gICAgLy8g0JvRg9GCXG4gICAgZm9yIChsZXQgaSBpbiBsb290cykge1xuICAgICAgICBsZXQgaXRlbSA9IGxvb3RzW2ldO1xuICAgICAgICByZW5kZXJBcnJheS5wdXNoKHt5OiBpdGVtLnksIGl0ZW06IGl0ZW19KTtcbiAgICB9XG5cbiAgICAvL9Cu0L3QuNGC0YtcbiAgICBmb3IgKGxldCB1bml0IG9mIHVuaXRzLnRvQXJyYXkoKSkge1xuICAgICAgICBpZih1bml0LnJvb21faWQ9PXJvb21faWQpIHtcbiAgICAgICAgICAgIHJlbmRlckFycmF5LnB1c2goe3k6IHVuaXQueSwgaXRlbTogdW5pdH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/QodGD0YnQvdC+0YHRgtC4XG4gICAgZW50aXRpZXMuZWFjaCggKGl0ZW0pID0+IHtcbiAgICAgICAgcmVuZGVyQXJyYXkucHVzaCh7eTogaXRlbS55LCBpdGVtOiBpdGVtfSk7XG4gICAgfSk7XG5cbiAgICByZW5kZXJBcnJheS5zb3J0KChhLCBiKT0+e1xuICAgICAgICByZXR1cm4gYS55IC0gYi55O1xuICAgIH0pO1xuXG4gICAgZm9yKGxldCBpIGluIHJlbmRlckFycmF5KXtcbiAgICAgICAgcmVuZGVyQXJyYXlbaV0uaXRlbS5kcmF3KGNhbWVyYSk7XG4gICAgfVxuXG59XG5cblxuXG4vKipcbiAqINCj0YHRgtCw0L3QvtCy0LrQsCDQvtGC0L7QsdGA0LDQttCw0LXQvNC+0Lkg0LrQvtC80L3QsNGC0YtcbiAqIEBwYXJhbSBJRFxuICogQHBhcmFtIHdpZHRoXG4gKiBAcGFyYW0gaGVpZ2h0XG4gKiBAcGFyYW0gZW52aXJvbm1lbnRfaWRcbiAqL1xuZnVuY3Rpb24gcm9vbUluaXQoc2V0dGluZ3Mpe1xuXG4gICAgLy/Ql9Cw0YfQuNGB0YLQuNC8INC10YHQu9C4INC90LUg0LLQv9C10YDQstC+0LlcbiAgICBmb3IobGV0IGkgaW4gbG9vdHMpeyBkZWxldGUgbG9vdHNbaV07fVxuICAgIGZvcihsZXQgaSBpbiB0ZWxlcG9ydHMpeyBkZWxldGUgdGVsZXBvcnRzW2ldO31cbiAgICBsb290cyA9IHt9O1xuICAgIHRlbGVwb3J0cyA9IHt9O1xuICAgIHJvb20gPSBudWxsO1xuICAgIGVudGl0aWVzLnJlc2V0KCk7XG5cblxuICAgIHJvb21faWQgPSBzZXR0aW5ncy5JRDtcblxuICAgIC8vINCh0LTQtdC70LDQtdC8INC60L7QvNC90LDRgtGDINC40LvQuCDQstC+0LfQvNC10Lwg0LjQtyDQutC10YjQsFxuICAgIGlmKHNldHRpbmdzLklEIGluIHJvb21zKXtcbiAgICAgICAgcm9vbSA9IHJvb21zW3NldHRpbmdzLklEXTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcm9vbSA9IG5ldyBSb29tKHNldHRpbmdzLndpZHRoLCBzZXR0aW5ncy5oZWlnaHQsIHNldHRpbmdzLmVudmlyb25tZW50X2lkLCBzZXR0aW5ncy5lbnRpdGllc19udW0pO1xuICAgICAgICByb29tc1tzZXR0aW5ncy5JRF0gPSByb29tO1xuICAgIH1cblxuICAgIGlmKCdjYXJ0b29ucycgaW4gc2V0dGluZ3Mpe1xuICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBzZXR0aW5ncy5jYXJ0b29ucyl7XG4gICAgICAgICAgICBlbnRpdGllcy5hZGRGcm9tU2V0KGl0ZW0ueCwgaXRlbS55LCBpdGVtLnNwcml0ZXNldF9pZCwgaXRlbS5zcHJpdGVfaWQsIDAsIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoJ2xvb3QnIGluIHNldHRpbmdzKXtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2Ygc2V0dGluZ3MubG9vdCl7XG5cbiAgICAgICAgICAgIGxvb3RzW2l0ZW0uSURdID0gbmV3IExvb3Qocm9vbV9pZCwgaXRlbS54LCBpdGVtLnksIGl0ZW0uY2hhcmFjdGVyX2lkLCBpdGVtLklELCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZigndGVsZXBvcnRzJyBpbiBzZXR0aW5ncyl7XG4gICAgICAgIGZvcihjb25zdCBpdGVtIG9mIHNldHRpbmdzLnRlbGVwb3J0cyl7XG5cbiAgICAgICAgICAgIHRlbGVwb3J0c1tpdGVtLklEXSA9IG5ldyBUZWxlcG9ydChyb29tX2lkLCBpdGVtLngsIGl0ZW0ueSwgaXRlbS5jaGFyYWN0ZXJfaWQsIGl0ZW0uSUQsIGl0ZW0udGFyZ2V0LCBpdGVtLnN0YXRlLCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcblxuLyoqXG4gKiBAY2xhc3MgTG9vdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iocm9vbV9pZCwgeCwgeSwgY2hhcmFjdGVyX2lkLCBJRCwgd2lkdGgsIGhlaWdodCl7XG4gICAgICAgIHRoaXMuSUQgPSBJRDtcbiAgICAgICAgdGhpcy5yb29tX2lkID0gcm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVycy5nZXQoY2hhcmFjdGVyX2lkKSB8fCBjaGFyYWN0ZXJzLmdldCgnY29pbl9nb2xkJyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLmFuaW1hdGVTcGVlZCA9IDE0O1xuICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgIH1cblxuICAgIHNldChyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXJfaWQsIElEKXtcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLnJvb21faWQgPSByb29tX2lkO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoJ2NvaW5fZ29sZCcpO1xuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0J1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gKHRoaXMueC0odGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMikgLSBjYW1lcmEueCxcbiAgICAgICAgICAgIHkgPSAodGhpcy55LXRoaXMuY2hhcmFjdGVyLmhlaWdodCt0aGlzLmhlaWdodCkgLSBjYW1lcmEueTtcblxuXG4gICAgICAgIC8vINC90LUg0YDQuNGB0YPQtdC8INCy0L3QtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYoXG4gICAgICAgICAgICB4IDwgLXRoaXMuY2hhcmFjdGVyLndpZHRoIHx8XG4gICAgICAgICAgICB5IDwgLXRoaXMuY2hhcmFjdGVyLmhlaWdodCB8fFxuICAgICAgICAgICAgeCA+IGNhbWVyYS53aWR0aCB8fFxuICAgICAgICAgICAgeSA+IGNhbWVyYS5oZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIuZHJhdyhjYW1lcmEuY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNhbWVyYS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LWNhbWVyYS54LCB0aGlzLnktY2FtZXJhLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVjdCh4LCB5LCB0aGlzLmNoYXJhY3Rlci53aWR0aCwgdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlc3RvcmUoKTsqL1xuICAgIH1cblxuICAgIGFuaW1hdGUoc3RlcCl7XG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIHN0ZXA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPCAwIHx8IHRoaXMuY3VycmVudFNwcml0ZU51bSA+PSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvL9Cd0LDRgdGC0YDQvtC50LrQuCDRgNCw0L3QtNC+0LzQvdGL0YUg0YbQstC10YLQvtCyINC60L7QvNC90LDRgtGLXG5cbmltcG9ydCBzcHJpdGVzIGZyb20gXCIuLi8uLi9zcHJpdGVzXCI7XG5cbmNvbnN0IEVOVklST05NRU5UUyA9IHtcbiAgICAwOiB7XG4gICAgICAgIHI6IHtzdGFydDogMTIwLCByYW5kOiAxMH0sXG4gICAgICAgIGc6IHtzdGFydDogMTIwLCByYW5kOiAxNn0sXG4gICAgICAgIGI6IHtzdGFydDogMTAwLCByYW5kOiA1fSxcbiAgICAgICAgLy8gZW50aXRpZXNTcHJpdGVzOiBcImdyYXNzXCIsXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJhbmRzdG9uZXNcIixcbiAgICB9LFxuICAgIDE6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAyMzksIHJhbmQ6IDE2fSxcbiAgICAgICAgZzoge3N0YXJ0OiAyMTAsIHJhbmQ6IDMzfSxcbiAgICAgICAgYjoge3N0YXJ0OiAxMDAsIHJhbmQ6IDI1fSxcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImRlc2VydFwiLFxuICAgIH0sXG4gICAgMjoge1xuICAgICAgICByOiB7c3RhcnQ6IDIxMCwgcmFuZDogNDV9LFxuICAgICAgICBnOiB7c3RhcnQ6IDMwLCByYW5kOiA3NX0sXG4gICAgICAgIGI6IHtzdGFydDogMzAsIHJhbmQ6IDc1fSxcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImNvb2xfcGxhbnRzXCIsXG4gICAgfSxcbiAgICAzOiB7XG4gICAgICAgIHI6IHtzdGFydDogMTAsIHJhbmQ6IDEyfSxcbiAgICAgICAgZzoge3N0YXJ0OiAxMzAsIHJhbmQ6IDIwfSxcbiAgICAgICAgYjoge3N0YXJ0OiAyMTAsIHJhbmQ6IDQ1fSxcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImJ1c2hzXCIsXG4gICAgfSxcbiAgICA0OiB7XG4gICAgICAgIHI6IHtzdGFydDogMTUwLCByYW5kOiAxMn0sXG4gICAgICAgIGc6IHtzdGFydDogOTAsIHJhbmQ6IDIwfSxcbiAgICAgICAgYjoge3N0YXJ0OiA0MCwgcmFuZDogMTJ9LFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwidHJlZXNcIixcbiAgICB9LFxuICAgIDU6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAwLCByYW5kOiAzMH0sXG4gICAgICAgIGc6IHtzdGFydDogMCwgcmFuZDogNX0sXG4gICAgICAgIGI6IHtzdGFydDogMCwgcmFuZDogNX0sXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJkZWFkX3BsYW50c1wiLFxuICAgIH0sXG59O1xuLyoqXG4gKiBAY2xhc3MgUm9vbVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgZW52aXJvbm1lbnRfaWQsIGVudGl0aWVzX251bSl7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRfaWQgPSBlbnZpcm9ubWVudF9pZDtcbiAgICAgICAgdGhpcy5lbnRpdGllc19udW0gPSBlbnRpdGllc19udW07XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGUodGhpcy5lbnRpdGllc19udW0pO1xuICAgIH1cblxuICAgIHJhbmRvbUNTU2NvbG9yKGVudmlyb25tZW50X2lkKXtcbiAgICAgICAgbGV0IGUgPSBFTlZJUk9OTUVOVFNbZW52aXJvbm1lbnRfaWRdO1xuICAgICAgICBsZXQgciA9IGUuci5zdGFydCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUuci5yYW5kICksXG4gICAgICAgICAgICBnID0gZS5nLnN0YXJ0ICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZS5nLnJhbmQpLFxuICAgICAgICAgICAgYiA9IGUuYi5zdGFydCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUuYi5yYW5kKTtcbiAgICAgICAgcmV0dXJuICdyZ2IoJytyKycsJytnKycsJytiKycpJztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSh0cmVlc19udW0pe1xuICAgICAgICBjb25zdCBjdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgICAgIHRpbGVXaWR0aCA9IDIyLFxuICAgICAgICAgICAgdGlsZUhlaWdodCA9IDIyO1xuICAgICAgICBjdHguY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgY3R4LmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgICAgICBjb25zdCByb3dzID0gTWF0aC5mbG9vcih0aGlzLndpZHRoL3RpbGVXaWR0aCkgKyAxO1xuICAgICAgICBjb25zdCBjb2x1bW5zID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodC90aWxlSGVpZ2h0KSArIDE7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBmb3IgKGxldCB4ID0gMCwgaSA9IDA7IGkgPCByb3dzOyB4Kz10aWxlSGVpZ2h0LCBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwLCBqPTA7IGogPCBjb2x1bW5zOyB5Kz10aWxlV2lkdGgsIGorKykge1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5yYW5kb21DU1Njb2xvcih0aGlzLmVudmlyb25tZW50X2lkKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbnYgPSBFTlZJUk9OTUVOVFNbdGhpcy5lbnZpcm9ubWVudF9pZF07XG5cbiAgICAgICAgY29uc3Qgc3ByID0gc3ByaXRlc1tlbnYuZW50aXRpZXNTcHJpdGVzXTtcblxuICAgICAgICAvL9Ch0LPQtdC90LXRgNC40Lwg0LTQtdGA0LXQstGM0Y9cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaTx0cmVlc19udW07IGkrKyl7XG5cbiAgICAgICAgICAgIC8v0KHQu9GD0YfQsNC50L3QsNGPINC/0LvQuNGC0LrQsCDQuNC3INC90LDQsdC+0YDQsFxuICAgICAgICAgICAgbGV0IGlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnNwci5zdGF0ZXMuZGVmYXVsdC5sZW5ndGgpO1xuICAgICAgICAgICAgbGV0IHRpbGUgPSBzcHIuc3RhdGVzLmRlZmF1bHRbaWRdO1xuXG4gICAgICAgICAgICAgICAgLy/QodC70YPRh9Cw0LnQvdGL0LUg0LrQvtC+0YDQtNC40L3QsNGC0YtcbiAgICAgICAgICAgIGxldCB4eCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodGhpcy53aWR0aCArIHRpbGUud2lkdGgpLzEwKSoxMCAtIHRpbGUud2lkdGg7XG4gICAgICAgICAgICBsZXQgeXkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHRoaXMuaGVpZ2h0ICsgdGlsZS5oZWlnaHQpLzEwKSoxMCAtIHRpbGUuaGVpZ2h0O1xuICAgICAgICAgICAgbGV0IHcgPSB0aWxlLndpZHRoLCBoID0gdGlsZS5oZWlnaHQsIHN4ID0gdGlsZS54LCBzeSA9IHRpbGUueTtcblxuXG4gICAgICAgICAgICAvL9Ce0LHRgNC10LfQutCwINC/0L4g0LPRgNCw0L3QuNGG0LDQvCDQutC+0LzQvdCw0YLRi1xuXG4gICAgICAgICAgICBpZih4eCA8IHRoaXMud2lkdGggJiYgeHggPiAtdGlsZS53aWR0aCAmJiB5eSA8IHRoaXMuaGVpZ2h0ICYmIHl5ID4gLXRpbGUuaGVpZ2h0KSB7XG5cbiAgICAgICAgICAgICAgICBpZih4eCA8IDApe3cgKz0geHg7c3ggLT0geHg7eHggPSAwO31cblxuICAgICAgICAgICAgICAgIGlmKHl5IDwgMCl7aCArPSB5eTtzeSAtPSB5eTt5eSA9IDA7fVxuXG4gICAgICAgICAgICAgICAgaWYgKHh4ID4gdGhpcy53aWR0aCAtIHRpbGUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdyA9IHRoaXMud2lkdGggLSB4eDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoeXkgPiB0aGlzLmhlaWdodCAtIHRpbGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGggPSB0aGlzLmhlaWdodCAtIHl5O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2Uoc3ByLmltYWdlLCBzeCwgc3ksIHcsIGgsIHh4LCB5eSwgdywgaCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgICAgLy8g0KHQvtGF0YDQsNC90LjQvCDQutCw0YDRgtC40L3QutC+0LlcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IGN0eC5jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuXG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9ICcjOWY4ZTYwJztcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FtZXJhLndpZHRoLCBjYW1lcmEuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgICBpZighdGhpcy5pbWFnZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhclxuICAgICAgICAgICAgc3ggPSAwLFxuICAgICAgICAgICAgc3kgPSAwLFxuICAgICAgICAgICAgc3cgPSB0aGlzLndpZHRoLFxuICAgICAgICAgICAgc2ggPSB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIGR4ID0gMCxcbiAgICAgICAgICAgIGR5ID0gMCxcbiAgICAgICAgICAgIGR3ID0gY2FtZXJhLndpZHRoLFxuICAgICAgICAgICAgZGggPSBjYW1lcmEuaGVpZ2h0O1xuXG4gICAgICAgIGlmKGNhbWVyYS53aWR0aCA8IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHN4ID0gY2FtZXJhLng7XG4gICAgICAgICAgICBzdyA9IGNhbWVyYS53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8gZHggPSAtY2FtZXJhLng7XG4gICAgICAgICAgICBkeCA9IE1hdGguZmxvb3IoKGNhbWVyYS53aWR0aCAtIHRoaXMud2lkdGgpLzIpO1xuICAgICAgICAgICAgZHcgPSB0aGlzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2FtZXJhLmhlaWdodCA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBzeSA9IGNhbWVyYS55O1xuICAgICAgICAgICAgc2ggPSBjYW1lcmEuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvLyBkeSA9IC1jYW1lcmEueTtcbiAgICAgICAgICAgIGR5ID0gTWF0aC5mbG9vcigoY2FtZXJhLmhlaWdodCAtIHRoaXMuaGVpZ2h0KS8yKTtcbiAgICAgICAgICAgIGRoID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjYW1lcmEuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKTtcbiAgICB9XG59IiwiaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcblxuLyoqXG4gKiBAY2xhc3MgVGVsZXBvcnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHJvb21faWQsIHgsIHksIGNoYXJhY3Rlcl9pZCwgSUQsIHRhcmdldCwgc3RhdGUsIHdpZHRoLCBoZWlnaHQpe1xuICAgICAgICB0aGlzLklEID0gSUQ7XG4gICAgICAgIHRoaXMucm9vbV9pZCA9IHJvb21faWQ7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoJ3RlbGVwb3J0Jyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNwZWVkID0gMTQ7XG4gICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG5cbiAgICAgICAgdGhpcy50YXJnZXQgPSB7XG4gICAgICAgICAgICByb29tX2lkOiB0YXJnZXQucm9vbV9pZCxcbiAgICAgICAgICAgIHg6IHRhcmdldC54LFxuICAgICAgICAgICAgeTogdGFyZ2V0LnlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldChzdGF0ZSl7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZSAhPT0gc3RhdGUpe1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCdcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9ICh0aGlzLngtKHRoaXMuY2hhcmFjdGVyLndpZHRoLXRoaXMud2lkdGgpLzIpIC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gKHRoaXMueS10aGlzLmNoYXJhY3Rlci5oZWlnaHQrdGhpcy5oZWlnaHQpIC0gY2FtZXJhLnk7XG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIuZHJhdyhjYW1lcmEuY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNhbWVyYS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LWNhbWVyYS54LCB0aGlzLnktY2FtZXJhLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVjdCh4LCB5LCB0aGlzLmNoYXJhY3Rlci53aWR0aCwgdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlc3RvcmUoKTsqL1xuICAgIH1cblxuICAgIGFuaW1hdGUoc3RlcCl7XG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIHN0ZXA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPCAwIHx8IHRoaXMuY3VycmVudFNwcml0ZU51bSA+PSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi9ldmVudHNcIjtcblxuLyoqXG4gKiDQntC60L3QviDQuNC90YTQvtGA0LzQsNGG0LjQuCDQviDQs9C10YDQvtC1XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcCwgdXBkYXRlfVxuXG5cbi8vIGh0bWwt0LXQu9C10LzQtdC90YLRiyDQsiDQutC+0YLQvtGA0YvQtSDQv9C+0LrQsNC20LXQvCDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDQs9C10YDQvtC1L9C40LPRgNC1XG5cbmNvbnN0IGhlcm9faW5mb0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm8tcGFuZWxcIik7XG5jb25zdCBoZXJvX25hbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvLW5hbWVcIik7XG5jb25zdCBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvaW5zX2NvdW50XCIpO1xuY29uc3QgbGV2ZWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX2xldmVsXCIpO1xuY29uc3QgbGV2ZWx1cGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX2xldmVsdXBjb3VudGVyXCIpO1xuY29uc3Qgc3BlZWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX3NwZWVkXCIpO1xuY29uc3QgaGVhbHRoRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb19oZWFsdGhcIik7XG5cblxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBoZXJvX2luZm9FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xufVxuZnVuY3Rpb24gc3RvcCgpe1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xufVxuXG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSl7XG5cbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYodGFyZ2V0LmlkICYmIHRhcmdldC5pZD09PVwic2lnbm91dF9idXR0b25cIil7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvL2lmKGNvbmZpcm0oXCLQotC+0YfQvdC+INCy0YvQudGC0Lg/XCIpKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NpZ25vdXQnLCBudWxsKTtcbiAgICAgICAgLy99XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiDQn9C+0LrQsNC3INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbiAqIEBwYXJhbSBpbmZvXG4gKiBAcGFyYW0gbG9naW5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGluZm8pe1xuICAgIGhlcm9fbmFtZUVsZW1lbnQgJiYgKGhlcm9fbmFtZUVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5uYW1lKTtcbiAgICBzY29yZUVsZW1lbnQgJiYgKHNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmNvaW5zX2NvdW50KTtcbiAgICBsZXZlbEVsZW1lbnQgJiYgKGxldmVsRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmxldmVsKTtcbiAgICBzcGVlZEVsZW1lbnQgJiYgKHNwZWVkRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLnNwZWVkKTtcbiAgICBsZXZlbHVwY291bnRlckVsZW1lbnQgJiYgKGxldmVsdXBjb3VudGVyRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmxldmVsdXBWYWx1ZSAtIGluZm8ubGV2ZWx1cENvdW50ZXIpO1xuICAgIGhlYWx0aEVsZW1lbnQgJiYgKGhlYWx0aEVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5oZWFsdGgpXG59IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cblxuLyoqXG4gKiDQo9C80LXQvdC40Y8gLyDRjdGE0YTQtdC60YLRi1xuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLXG5cbmNvbnN0IHNraWxsc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbHMtcGFuZWxcIik7XG5cbmNvbnN0IHNraWxsc0VsZW1lbnRzID0ge1xuICAgIHNraWxsMTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDFcIiksXG4gICAgc2tpbGwyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsMlwiKSxcbiAgICBza2lsbDM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwzXCIpLFxuICAgIHNraWxsNDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDRcIiksXG4gICAgc2tpbGw1OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsNVwiKSxcbiAgICBza2lsbDY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw2XCIpLFxuICAgIHNraWxsNzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDdcIiksXG4gICAgc2tpbGw4OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsOFwiKSxcbiAgICBza2lsbDk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw5XCIpLFxuICAgIHNraWxsMTA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwxMFwiKSxcbn07XG5jb25zdCBhbGxTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsXCIpO1xuXG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgLy/Qn9C+0LrQsNC20LXQvFxuICAgIHNraWxsc1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgc2tpbGxzUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuICAgIHNraWxsc1BhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG5cbiAgICAvL9CV0YHQu9C4INGB0LzQtdC90LAg0YPQvNC10L3QuNGPIC0g0YHQvNC10L3QuNC8XG4gICAgZXZlbnRzLm9uKCdza2lsbC1jaGFuZ2UnLCAoZXZlbnROYW1lLElEKT0+c2VsZWN0U2tpbGwoSUQpKTtcblxuXG4gICAgLy/QntCx0L3QvtCy0LvQtdC90LjQtSDQuNC60L7QvdC+0Log0Lgg0LPQvtGC0L7QstC90L7RgdGC0Lgg0YPQvNC10L3QuNC5XG4gICAgZXZlbnRzLm9uKCdza2lsbHMnLCAoZXZlbnROYW1lLCB0eXBlLCBkYXRhKT0+e1xuICAgICAgICBpZih0eXBlPT09J3VwZGF0ZScpe1xuICAgICAgICAgICAgZm9yKGNvbnN0IHNraWxsX2lkIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxzRWxlbWVudHNbc2tpbGxfaWRdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsID0gc2tpbGxzRWxlbWVudHNbc2tpbGxfaWRdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v0JjQutC+0L3QutCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LDRjyDRg9C80LXQvdC40Y5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gc2tpbGwucXVlcnlTZWxlY3RvcignLnNraWxsLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgLy9cItCS0LXQutC+XCIg0YPQvNC10L3QuNGPXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZWtvRWxlbWVudCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy52ZWtvJyk7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZT1cIlwiO1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdza2lsbC1pY29uJyk7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoZGF0YVtza2lsbF9pZF0uaWNvbik7XG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSB2ZWtvRWxlbWVudC5jbGFzc0xpc3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNsYXNzTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNsYXNzTGlzdC5pdGVtKDApKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoXCJ2ZWtvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3QuYWRkKFwidmFsdWVcIiArIE1hdGguZmxvb3IoZGF0YVtza2lsbF9pZF0udmFsdWUgLyAxMCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2tpbGxzUGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICBza2lsbHNQYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG4gICAgc2tpbGxzUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuXG5mdW5jdGlvbiBzZWxlY3RTa2lsbChJRCkge1xuICAgIGlmKHNraWxsc0VsZW1lbnRzW0lEXSl7XG4gICAgICAgIGFsbFNraWxscy5mb3JFYWNoKHNraWxsID0+IHNraWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgICAgICBza2lsbHNFbGVtZW50c1tJRF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG5cbn1cblxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihlKXtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1pY29uXCIpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZWtvXCIpKXtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaWYoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbFwiKVxuICAgICl7XG4gICAgICAgIGlmKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsIHRhcmdldC5pZCk7XG5cbiAgICAgICAgfVxuICAgICAgICBldmVudHMuYWRkKFwia2V5ZG93blwiLCBcImZpcmVcIik7XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL9Cf0L4gbW91c2V1cFxuZnVuY3Rpb24gb25Nb3VzZVVwKGUpe1xuXG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtaWNvblwiKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVrb1wiKSl7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGxcIilcbiAgICApe1xuICAgICAgICBldmVudHMuYWRkKFwia2V5dXBcIiwgXCJmaXJlXCIpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuIiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cbmxldCBhY3RpdmUgPSBmYWxzZTtcblxuXG4vKipcbiAqINCe0LrQvdC+INCi0J7Qny0xMFxuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3AsIGlzQWN0aXZlLCBzaG93LCBoaWRlfVxuXG5cbi8vIGh0bWwt0LXQu9C10LzQtdC90YLRiyDQsiDQutC+0YLQvtGA0YvQtSDQv9C+0LrQsNC20LXQvCDQuNC90YTQvtGA0LzQsNGG0LjRjlxuXG5jb25zdCB0b3AxMEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvcDEwLXBhbmVsXCIpO1xuY29uc3QgdG9wMTBDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wMTAtcGFuZWwtY29udGVudFwiKTtcblxuXG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIHRvcDEwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xuXG4gICAgZXZlbnRzLm9uKFwia2V5dXBcIiwgKGV2ZW50TmFtZSwga2V5Q29kZSk9PntcbiAgICAgICAgaWYoa2V5Q29kZT09PVwic3RhdGlzdGljXCIpe1xuICAgICAgICAgICAgaWYoaXNBY3RpdmUoKSl7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInNlcnZlclwiLCB1cGRhdGUpO1xuXG59XG5mdW5jdGlvbiBzdG9wKCl7XG4gICAgdG9wMTBFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkNsaWNrLCBmYWxzZSk7XG4gICAgZXZlbnRzLm9mZihcInNlcnZlclwiLCB1cGRhdGUpO1xufVxuXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIHRvcDEwRWxlbWVudC5zdHlsZS5yaWdodCA9IDA7XG4gICAgYWN0aXZlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB0b3AxMEVsZW1lbnQuc3R5bGUucmlnaHQgPSAnLTE5NnB4Jztcbn1cblxuZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIGFjdGl2ZTtcbn1cblxuXG5mdW5jdGlvbiBvbkNsaWNrKGUpe1xuXG4gICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdygpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKipcbiAqINCf0L7QutCw0Lcg0LjQvdGE0L7RgNC80LDRhtC40LhcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSkge1xuICAgIGlmKHR5cGU9PT1cInN0YXRpc3RpY1wiKXtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkYXRhLmluZm8pKXtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmluZm8uZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgICAgIC8vbG9nKHBsYXllci5JRCArICcgLSAnICsgcGxheWVyLmxldmVsKTtcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9ICdcXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPicrcGxheWVyLklEICsgJzo8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImhlcm9fc3BlZWRcIiBjbGFzcz1cInZhbHVlXCI+JytwbGF5ZXIuc2NvcmUrJzwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4nO1xuICAgICAgICAgICAgICAgIHRvcDEwQ29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8qKlxuICog0JjQvdGC0LXRgNGE0LXQudGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5cblxuLy8g0J7QutC90L4g0KLQvtC/LTEwXG5pbXBvcnQgdG9wMTAgZnJvbSAnLi90b3AxMCdcbi8vINCe0LrQvdC+INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbmltcG9ydCBoZXJvSW5mbyBmcm9tICcuL2hlcm9pbmZvLmpzJ1xuLy8g0J/QsNC90LXQu9GMINGD0LzQtdC90LjQuVxuaW1wb3J0IHNraWxscyBmcm9tICcuL3NraWxscy5qcydcbi8vINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuaW1wb3J0IHdhaXRTY3JlZW4gZnJvbSAnLi93YWl0c2NyZWVuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtoZXJvSW5mbywgc2tpbGxzLCB0b3AxMCwgd2FpdFNjcmVlbn0iLCIvKipcbiAqINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuICovXG5cblxuY29uc3Qgd2FpdFNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdcIik7XG5cblxuZXhwb3J0IGRlZmF1bHQge3Nob3csIGhpZGV9XG5cblxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG4iLCIvKipcbiAqIEBjbGFzcyBVbml0XG4gKlxuICovXG5pbXBvcnQge1NURVB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuLi8uLi9jaGFyYWN0ZXJzXCI7XG5cbmNvbnN0IENIQVJBQ1RFUl9ERUZBVUxUID0gJ2Jsb25kJztcblxuY29uc3QgTUFYX0hFQUxUSCA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pdHtcbiAgICAvKipcbiAgICAgKiDQmtC+0L3RgdGC0YDRg9C60YLQvtGAXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBpc0hlcm8pe1xuXG4gICAgICAgIGlmKGlzSGVybyl7XG4gICAgICAgICAgICB0aGlzLmlzSGVybyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvb21faWQgPSBkYXRhLnJvb21faWQ7XG5cbiAgICAgICAgdGhpcy54ID0gZGF0YS54O1xuICAgICAgICB0aGlzLnkgPSBkYXRhLnk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChkYXRhLmNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoQ0hBUkFDVEVSX0RFRkFVTFQpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlIHx8ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG5cbiAgICAgICAgdGhpcy5sZXZlbCA9IGRhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMuY29pbnNfY291bnQgPSBkYXRhLmNvaW5zX2NvdW50O1xuICAgICAgICB0aGlzLmxldmVsdXBWYWx1ZSA9IGRhdGEubGV2ZWx1cFZhbHVlO1xuICAgICAgICB0aGlzLmxldmVsdXBDb3VudGVyID0gZGF0YS5sZXZlbHVwQ291bnRlcjtcblxuICAgICAgICB0aGlzLmhlYWx0aCA9IGRhdGEuaGVhbHRoO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNwZWVkID0gMTQ7IC8vVE9ETzog0LLRi9C90LXRgdGC0Lgg0LIgY2hhcmFjdGVyXG4gICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog0KPRgdGC0LDQvdC+0LLQutCwINC/0LDRgNCw0LzQtdGC0YDQvtCyINGO0L3QuNGC0LBcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHNldChkYXRhKXtcblxuICAgICAgICB0aGlzLnJvb21faWQgPSBkYXRhLnJvb21faWQ7XG4gICAgICAgIHRoaXMueCA9IGRhdGEueDtcbiAgICAgICAgdGhpcy55ID0gZGF0YS55O1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGRhdGEuY2hhcmFjdGVyX2lkKSB8fCBjaGFyYWN0ZXJzLmdldChDSEFSQUNURVJfREVGQVVMVCk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuXG4gICAgICAgIGlmKHRoaXMuc3RhdGUgIT09IGRhdGEuc3RhdGUpe1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZSA9IGRhdGEuc3RhdGU7XG5cbiAgICAgICAgdGhpcy5sZXZlbCA9IGRhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMuY29pbnNfY291bnQgPSBkYXRhLmNvaW5zX2NvdW50O1xuICAgICAgICB0aGlzLmxldmVsdXBWYWx1ZSA9IGRhdGEubGV2ZWx1cFZhbHVlO1xuICAgICAgICB0aGlzLmxldmVsdXBDb3VudGVyID0gZGF0YS5sZXZlbHVwQ291bnRlcjtcblxuICAgICAgICB0aGlzLmhlYWx0aCA9IGRhdGEuaGVhbHRoO1xuXG4gICAgfVxuXG4gICAgYW5pbWF0ZSgpe1xuICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y9cbiAgICAgICAgdGhpcy5mYXphICs9IHRoaXMuYW5pbWF0ZVNwZWVkICogU1RFUDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gTWF0aC5mbG9vcih0aGlzLmZhemEpO1xuXG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9IHRoaXMueCAtIGNhbWVyYS54LFxuICAgICAgICAgICAgeSA9IHRoaXMueSAtIGNhbWVyYS55O1xuXG4gICAgICAgIC8vINC90LUg0YDQuNGB0YPQtdC8INCy0L3QtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYoXG4gICAgICAgICAgICB4IDwgLXRoaXMuY2hhcmFjdGVyLndpZHRoIHx8XG4gICAgICAgICAgICB5IDwgLXRoaXMuY2hhcmFjdGVyLmhlaWdodCB8fFxuICAgICAgICAgICAgeCA+IGNhbWVyYS53aWR0aCB8fFxuICAgICAgICAgICAgeSA+IGNhbWVyYS5oZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd1NoYWRvdyhjYW1lcmEuY29udGV4dCwgeCwgeSk7XG5cbiAgICAgICAgdGhpcy5kcmF3Q2hhcmFjdGVyKGNhbWVyYS5jb250ZXh0LCB4LCB5KTtcblxuICAgICAgICAvLyDQoNC40YHRg9C10Lwg0LjQvNGPXG4gICAgICAgIGlmKHRoaXMubGV2ZWwhPXVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICB0aGlzLmRyYXdOYW1lKGNhbWVyYS5jb250ZXh0LCB4LCB5LTU1LCB0aGlzLm5hbWUsIHRoaXMubGV2ZWwsIHRoaXMuaXNIZXJvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCV0YHQu9C4INC10YHRgtGMIC0g0YDQuNGB0YPQtdC8INC40L3QtNC40LrQsNGC0L7RgFxuICAgICAgICBpZih0aGlzLmhlYWx0aCE9dW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGxldCB2b2x1bWU7XG5cbiAgICAgICAgICAgIHZvbHVtZSA9IE1hdGguZmxvb3IodGhpcy5oZWFsdGgqMTAwL01BWF9IRUFMVEgpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYXdWb2x1bWUoY2FtZXJhLmNvbnRleHQsIHgsIHkgLSA1MCwgdm9sdW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZHJhd0NoYXJhY3Rlcihjb250ZXh0LCBzeCwgc3kpe1xuICAgICAgICBsZXQgeCA9IHN4IC0gKHRoaXMuY2hhcmFjdGVyLndpZHRoLXRoaXMud2lkdGgpLzIsXG4gICAgICAgICAgICB5ID0gc3kgLSAodGhpcy5jaGFyYWN0ZXIuaGVpZ2h0LXRoaXMuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmNoYXJhY3Rlci5kcmF3KGNvbnRleHQsIHgsIHksIHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudFNwcml0ZU51bSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQv9GP0YLQvdC+INC60L7Qu9C70LjQt9C40LlcbiAgICAgICAgLypjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSw2NywwLjQpXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qoc3gsIHN5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQucmVjdCh4LCB5LCB0aGlzLmNoYXJhY3Rlci53aWR0aCwgdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7Ki9cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCg0LjRgdGD0LXQvCDQuNC90LTQuNC60LDRgtC+0YBcbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBkcmF3Vm9sdW1lKGNvbnRleHQsIHgsIHksIHZhbHVlKXtcblxuICAgICAgICBsZXQgdm9sdW1lV2lkdGggPSA1MDtcbiAgICAgICAgbGV0IHZvbHVtZUhlaWdodCA9IDQ7XG4gICAgICAgIGxldCB2b2x1bWVYID0geCArICh0aGlzLndpZHRoIC0gdm9sdW1lV2lkdGgpLzI7XG4gICAgICAgIGxldCB2b2x1bWVZID0geTtcblxuXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3Qodm9sdW1lWCwgdm9sdW1lWSwgTWF0aC5mbG9vcih2b2x1bWVXaWR0aCp2YWx1ZS8xMDApLCB2b2x1bWVIZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnJlY3Qodm9sdW1lWC0xLCB2b2x1bWVZLTEsIHZvbHVtZVdpZHRoKzIsIHZvbHVtZUhlaWdodCsyKTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDQoNC40YHRg9C10Lwg0LjQvNGPXG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gc3hcbiAgICAgKiBAcGFyYW0gc3lcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBsZXZlbFxuICAgICAqIEBwYXJhbSBpc0hlcm9cbiAgICAgKi9cbiAgICBkcmF3TmFtZShjb250ZXh0LCBzeCwgc3ksIG5hbWUsIGxldmVsLCBpc0hlcm8pe1xuXG4gICAgICAgIGxldCBwYWRkaW5nQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4zKVwiO1xuICAgICAgICBpZihpc0hlcm8pe1xuICAgICAgICAgICAgcGFkZGluZ0NvbG9yID0gXCJyZ2JhKDAsMjAwLDQwLDAuNClcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIC8v0JjQvNGPXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiMTRweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGxldCB0ZXh0V2lkdGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KG5hbWUpLndpZHRoO1xuXG4gICAgICAgIC8v0KPRgNC+0LLQtdC90YxcbiAgICAgICAgY29udGV4dC5mb250ID0gXCJib2xkIDEycHggQXJpYWxcIjtcbiAgICAgICAgbGV0IHRleHRMZXZlbFdpZHRoID0gY29udGV4dC5tZWFzdXJlVGV4dChsZXZlbCkud2lkdGg7XG5cbiAgICAgICAgLy/QodGH0LjRgtCw0LXQvCDRgNCw0LfQvNC10YDRi1xuICAgICAgICBsZXQgcGFkV2lkdGggPSB0ZXh0V2lkdGggKyB0ZXh0TGV2ZWxXaWR0aCArIDI7XG5cbiAgICAgICAgbGV0IGx4ID0gc3grKHRoaXMud2lkdGggLSBwYWRXaWR0aCkvMixcbiAgICAgICAgICAgIHggPSBseCArIHRleHRMZXZlbFdpZHRoICsgMixcbiAgICAgICAgICAgIGx5ID0gc3ksXG4gICAgICAgICAgICB5ID0gc3k7XG5cblxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHBhZGRpbmdDb2xvcjtcbiAgICAgICAgY29udGV4dC5hcmMobHgtMiwgeS0xMisxOC8yLCAxOC8yLCBNYXRoLlBJLzIsIC1NYXRoLlBJLzIpO1xuICAgICAgICBjb250ZXh0LmFyYyhseC0yK3BhZFdpZHRoLCB5LTEyKzE4LzIsIDE4LzIsIC1NYXRoLlBJLzIsIE1hdGguUEkvMik7XG4gICAgICAgIGNvbnRleHQucmVjdChseC0yLCB5LTEyLCBwYWRXaWR0aCwgMTgpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcblxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjE0cHggc2Fucy1zZXJpZlwiO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQobmFtZSx4LHkpO1xuXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiYm9sZCAxMnB4IEFyaWFsXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGxldmVsLGx4LGx5KTtcblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cblxuICAgIGRyYXdTaGFkb3coY29udGV4dCwgeCwgeSl7XG5cbiAgICAgICAgbGV0XG4gICAgICAgICAgICBzaGFkb3dDb2xvcjEgPSBcInJnYmEoMCwwLDAsMC4xKVwiLFxuICAgICAgICAgICAgc2hhZG93Q29sb3IyID0gXCJyZ2JhKDAsMCwwLDAuMTUpXCIsXG4gICAgICAgICAgICBzaGFkb3dDb2xvcjMgPSBcInJnYmEoMCwwLDAsMC4yKVwiO1xuXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc2hhZG93Q29sb3IxO1xuICAgICAgICBjb250ZXh0LmVsbGlwc2UoeCArIHRoaXMud2lkdGgvMiwgeSt0aGlzLmhlaWdodC0yLCAyMCwgMTAsIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc2hhZG93Q29sb3IyO1xuICAgICAgICBjb250ZXh0LmVsbGlwc2UoeCArIHRoaXMud2lkdGgvMiwgeSt0aGlzLmhlaWdodC0yLCAxNywgOCwgMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzaGFkb3dDb2xvcjI7XG4gICAgICAgIGNvbnRleHQuZWxsaXBzZSh4ICsgdGhpcy53aWR0aC8yLCB5K3RoaXMuaGVpZ2h0LTIsIDE1LCA3LCAwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7aXRlbSwgYWRkLCByZW1vdmUsIHJlc2V0LCB0b0FycmF5fVxuXG5cbmNvbnN0IHVuaXRzID0ge307XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0Y7QvdC40YIg0L/QviDQuNC80LXQvdC4XG4gKiBAcGFyYW0gSURcbiAqIEByZXR1cm5zIFVuaXRcbiAqL1xuZnVuY3Rpb24gaXRlbShJRCkge1xuICAgIHJldHVybiB1bml0c1tJRF07XG59XG5cbmZ1bmN0aW9uIGFkZChJRCwgdW5pdCkge1xuICAgIHVuaXRzW0lEXSA9IHVuaXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShJRCkge1xuICAgIGlmKElEIGluIHVuaXRzKSBkZWxldGUgdW5pdHNbSURdO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBmb3IoY29uc3QgaSBpbiB1bml0cyl7XG4gICAgICAgIGRlbGV0ZSB1bml0c1tpXTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gICAgbGV0IHVuaXRzQXJyYXkgPSBbXTtcbiAgICBmb3IoY29uc3QgaSBpbiB1bml0cyl7XG4gICAgICAgIHVuaXRzQXJyYXkucHVzaCh1bml0c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiB1bml0c0FycmF5O1xufVxuIiwiaW1wb3J0IGFjY291bnQgZnJvbSBcIi4uL2FjY291bnRcIjtcblxuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wfTtcblxuXG5jb25zdCBsb2dpbl9wYW5lbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLXBhbmVsXCIpO1xuY29uc3QgbG9naW5fZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLWZvcm1cIik7XG5jb25zdCBsb2dpbl9pbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLWlucHV0XCIpO1xuY29uc3QgcGFzc3dvcmRfaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZC1pbnB1dFwiKTtcblxuXG5sZXQgZmluYWxDYWxsYmFjayA9IG51bGw7XG5cbmxldFxuICAgIHRpbWVvdXQgPSBudWxsLFxuICAgIHRpbWVvdXRfcCA9IG51bGw7XG5cblxuLy8g0JLRi9Cy0LXQtNC10Lwg0L7QutC90L4g0LDQstGC0L7RgNC40LfQsNGG0LjQuC4g0JzQvtC00LDQu9GM0L3QvtC1XG5mdW5jdGlvbiBzdGFydChjYWxsYmFjaykge1xuXG4gICAgZmluYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgLy/Qn9C+0LvRg9GH0LjQvCDQuNC3INC70L7QutCw0Lsg0YHRgtC+0YDQsFxuICAgIGxldCB1c2VyQWNjb3VudCA9IGFjY291bnQuZ2V0KCk7XG5cbiAgICAvL9C10YHQu9C4INC10YHRgtGMIC0g0L7QulxuICAgIGlmKHVzZXJBY2NvdW50KSB7XG4gICAgICAgIGZpbmFsQ2FsbGJhY2sodXNlckFjY291bnQpO1xuICAgIH1cbiAgICAvL9C40L3QsNGH0LUgLSDQt9Cw0L/RgNC+0YHQuNC8XG4gICAgZWxzZXtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXl1cEhhbmRsZXIsIGZhbHNlKTtcblxuICAgICAgICBzaG93KCk7XG5cbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIFxufVxuXG5cbi8vINCX0LDQutGA0L7QtdC8INC+0LrQvdC+INCw0LLRgtC+0YDQuNC30LDRhtC40LhcbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXl1cEhhbmRsZXIsIGZhbHNlKTtcbiAgICBoaWRlKCk7XG59XG5cblxuLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9Cw0LLQuNGIXG5mdW5jdGlvbiBrZXl1cEhhbmRsZXIoZSkge1xuICAgIGxldCBvYmogPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgbGV0IGtleSA9IGUua2V5Q29kZTtcblxuICAgIC8v0JXRgdC70LggRW50ZXIg0Lgg0LHQtdC3INC/0YDQvtCx0LvQtdC8XG4gICAgaWYoa2V5PT09MTMgJiYgdmFsaWRhdGUobG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZF9pbnB1dEVsZW1lbnQudmFsdWUpKXtcblxuICAgICAgICBzdG9wKCk7XG4gICAgICAgIC8vINCf0L7Qu9GD0YfQuNCyINGB0L7RhdGA0LDQvdC40LxcbiAgICAgICAgY29uc3QgYWNjb3VudERhdGEgPSB7bG9naW46IGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSwgcGFzc3dvcmQ6IHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZX07XG4gICAgICAgIGFjY291bnQuc2V0KGFjY291bnREYXRhKTtcbiAgICAgICAgXG4gICAgICAgIGZpbmFsQ2FsbGJhY2soYWNjb3VudERhdGEpO1xuXG4gICAgfVxuICAgIC8v0JXRgdC70Lgg0YLQsNCxIC0g0L/Qvi3Rg9C80L7Qu9GH0LDQvdC40Y5cbiAgICBlbHNlIGlmIChrZXk9PT05KXtcblxuICAgIH1cblxuICAgIGVsc2UgaWYgKFxuICAgICAgICAvL9GB0LjQvNCy0L7Qu9GLINGA0LDQt9GA0LXRiNC10L3QvdGL0LUg0LIg0LvQvtCz0LjQvdC1XG4gICAgL15bYS16QS1aMC05ICsuXFwtXzpcIigpXSo/JC8udGVzdChvYmoudmFsdWUpICYmXG4gICAgb2JqLnZhbHVlLmxlbmd0aCA8IDEwIC8vINCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDQtNC70LjQvdCwINC70L7Qs9C40L3QsFxuICAgICkge1xuICAgICAgICBvYmouZGVmYXVsdFZhbHVlID0gb2JqLnZhbHVlO1xuXG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y0Y2I0YSc7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgb2JqLnZhbHVlID0gb2JqLmRlZmF1bHRWYWx1ZTtcbn1cblxuLy8g0J/RgNC+0LLQtdGA0LrQsCDQstCy0LXQtNC10L3QvdC+0LPQviDQuCDQuNC90LTQuNC60LDRhtC40Y8g0L7RiNC40LHQutC4XG5mdW5jdGlvbiB2YWxpZGF0ZShsb2dpbiwgcGFzc3dvcmQpIHtcblxuICAgIGlmKGxvZ2luLmxlbmd0aD09PTApIHtcbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmMDAwOCc7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRjYjRhJztcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihwYXNzd29yZC5sZW5ndGg9PT0wKSB7XG4gICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICBwYXNzd29yZF9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZjAwMDgnO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dF9wKTtcbiAgICAgICAgdGltZW91dF9wID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwYXNzd29yZF9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNGNiNGEnO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG5cbn1cblxuXG4vLyDQntCx0YDQsNCx0L7RgtC60LAg0LrQu9C40LrQvtCyXG5mdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cblxuICAgIC8vINCV0YHQu9C4INC90LDQttCw0LvQuCBcItCS0L7QudGC0LhcIiDQuCDQu9C+0LPQuNC9INC90L7RgNC8IC0g0LfQsNC/0YPRgdGC0LjQvCDRhNGD0L3QutGG0LjRjiDQstGF0L7QtNCwXG4gICAgaWYodGFyZ2V0LmlkPT09J2xvZ2luLWJ1dHRvbicgJiYgdmFsaWRhdGUobG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZF9pbnB1dEVsZW1lbnQudmFsdWUpKXtcblxuICAgICAgICBzdG9wKCk7XG5cbiAgICAgICAgY29uc3QgYWNjb3VudERhdGEgPSB7bG9naW46IGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSwgcGFzc3dvcmQ6IHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZX07XG4gICAgICAgIGFjY291bnQuc2V0KGFjY291bnREYXRhKTtcblxuICAgICAgICBmaW5hbENhbGxiYWNrKGFjY291bnREYXRhKTtcbiAgICB9XG4gICAgZWxzZSBpZih0YXJnZXQuaWQ9PT0nbG9naW4taW5wdXQnIHx8IHRhcmdldC5pZD09PSdwYXNzd29yZC1pbnB1dCcpe1xuXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZihsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWU9PT0nJykge1xuICAgICAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihwYXNzd29yZF9pbnB1dEVsZW1lbnQudmFsdWU9PT0nJyl7XG4gICAgICAgICAgICBwYXNzd29yZF9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL9Cf0L7QutCw0LfQsNGC0Ywg0L7QutC90L4g0LLRhdC+0LTQsFxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICBsb2dpbl9wYW5lbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgbG9naW5fZm9ybUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbi8v0YHQutGA0YvRgtGMINC+0LrQvdC+INCy0YXQvtC00LBcbmZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgbG9naW5fcGFuZWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbG9naW5fZm9ybUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0iLCJpbXBvcnQgU291bmQgZnJvbSBcIi4vZW5naW5lL3NvdW5kLmpzXCI7XG5cbmNvbnN0IHNvdW5kcyA9IHtcbiAgICBcImxldmVsX3VwXCI6IG5ldyBTb3VuZCgnc291bmQvY2FzaC5tcDMnKSxcbiAgICBcIm5wY19lYXRfY29pblwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vY29pbjMud2F2JyksXG4gICAgXCJlYXRfY29pbl9nb2xkXCI6IG5ldyBTb3VuZCgnc291bmQvY29pbi9jb2luLndhdicpLFxuICAgIFwiZWF0X2NvaW5fc2lsdmVyXCI6IG5ldyBTb3VuZCgnc291bmQvY29pbi9lYXQyLm1wMycpLFxuICAgIFwiZWF0X2NvaW5fY29wcGVyXCI6IG5ldyBTb3VuZCgnc291bmQvY29pbi9lYXQxLm1wMycpLFxuICAgIFwidGVsZXBvcnRcIjogbmV3IFNvdW5kKCdzb3VuZC90ZWxlcG9ydC9mbGF1bmNoLndhdicpLFxuICAgIFwicHVzaC1lZmZlY3RcIjogbmV3IFNvdW5kKCdzb3VuZC9oaXQvZHJvcExlYXRoZXIub2dnJyksXG4gICAgXCJmcmVlemUtZWZmZWN0XCI6IG5ldyBTb3VuZCgnc291bmQvaGl0L2Zyb3N0LndhdicpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc291bmRzO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlBbGwpO1xuXG5mdW5jdGlvbiBwbGF5QWxsKCkge1xuICAgIGZvcihsZXQgaSBpbiBzb3VuZHMpIHtcbiAgICAgICAgc291bmRzW2ldLmluaXQoKTtcbiAgICB9XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5QWxsKTtcbn0iLCIvKipcbiAqINCh0L/RgNCw0LnRgtGLXG4gKi9cblxuLy/QmtCw0YDRgtC40L3QutC4XG5sZXQgc19kb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19kb2MnKSxcbiAgICBzX3Byb2YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19wcm9mJyksXG4gICAgc19nb2IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19nb2InKSxcbiAgICBzX2dpcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19naXJsJyksXG4gICAgc19ibG9uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jsb25kJyksXG4gICAgc19tYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19tYWcnKSxcbiAgICBzX3RlbGVwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfdGVsZXBvcnQnKSxcbiAgICBzX2NvaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY29pbnMnKSxcbiAgICB0X3RyZWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfdHJlZXMnKSxcbiAgICB0X2J1c2hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfYnVzaHMnKSxcbiAgICB0X3BsYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X3BsYW50cycpLFxuICAgIHNfcG9pbnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3BvaW50ZXInKSxcbiAgICBzX2Jvb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19ib29tJyksXG4gICAgc19ib29tMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20xJyksXG4gICAgc19ib29tMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20yJyksXG4gICAgc19iYXJpZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19iYXJpZXInKSxcbiAgICBzX3B1c2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19wdXNoJyksXG4gICAgc19jcnlzdGFscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2NyeXN0YWxzJyksXG4gICAgc19za2VsZXRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3NrZWxldG9uJyksXG4gICAgc19rYXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfa2F0eScpLFxuICAgIHNfbGV2b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19sZXZvbicpLFxuICAgIHNfdml0YWx5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfdml0YWx5JyksXG4gICAgdF9jb29sX3BsYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X2Nvb2xfcGxhbnRzJyksXG4gICAgdF9hbmRzdG9uZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndF9hbmRzdG9uZXMnKTtcblxuXG4vKipcbiAqINCU0L7QutGC0L7RgFxuICovXG5leHBvcnRzLmRvYyA9IHtcbiAgICBcImltYWdlXCI6IHNfZG9jLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MzXCIsIFwieFwiOiAzMiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzJcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9XG4gICAgICAgIF1cbiAgICB9XG5cbn07XG5cblxuLyoqXG4gKiDQn9GA0L7RhNC10YHRgdC+0YBcbiAqL1xuZXhwb3J0cy5wcm9mID0ge1xuICAgIFwiaW1hZ2VcIjogc19wcm9mLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwiaWRsZVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInJ1bjFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNVwiLCBcInhcIjogMzIwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNlwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuN1wiLCBcInhcIjogNDQ4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuOFwiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cblxufTtcblxuXG4vKipcbiAqINCT0L7QsdC70LjQvVxuICovXG5leHBvcnRzLmdvYiA9IHtcbiAgICBcImltYWdlXCI6IHNfZ29iLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2IxXCIsIFwieFwiOiAxMzAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjJcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iM1wiLCBcInhcIjogMCwgXCJ5XCI6IDY1LCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNFwiLCBcInhcIjogNjUsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNVwiLCBcInhcIjogNjUsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjZcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I3XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICBdXG4gICAgfVxuXG59O1xuXG5cbi8qKlxuICog0JTQtdCy0L7Rh9C60LBcbiAqL1xuZXhwb3J0cy5naXJsID0ge1xuICAgIFwiaW1hZ2VcIjogc19naXJsLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmwzXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDZcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsOVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQkdC70L7QvdC00LjQvVxuICovXG5leHBvcnRzLmJsb25kID0ge1xuICAgIFwiaW1hZ2VcIjogc19ibG9uZCxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDhcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LDQs1xuICovXG5leHBvcnRzLm1hZyA9IHtcbiAgICBcImltYWdlXCI6IHNfbWFnLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWcxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWcxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCX0L7Qu9C+0YLQsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fZ29sZCA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkMVwiLCBcInhcIjogMjI0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDNcIiwgXCJ4XCI6IDMyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQ1XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDdcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDhcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KHQtdGA0LXQsdGA0Y/QvdC90LDRjyDQvNC+0L3QtdGC0LBcbiAqL1xuZXhwb3J0cy5jb2luX3NpbHZlciA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXIxXCIsIFwieFwiOiAwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXIyXCIsIFwieFwiOiAyMjQsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjNcIiwgXCJ4XCI6IDMyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyNVwiLCBcInhcIjogOTYsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyN1wiLCBcInhcIjogMTYwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI4XCIsIFwieFwiOiAxOTIsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXQtNC90LDRjyDQvNC+0L3QtdGC0LBcbiAqL1xuZXhwb3J0cy5jb2luX2NvcHBlciA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXIxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjJcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjRcIiwgXCJ4XCI6IDk2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjVcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXI2XCIsIFwieFwiOiAxNjAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyN1wiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjhcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuXG4vKipcbiAqINCi0YDQsNCy0LBcbiAqL1xuZXhwb3J0cy5ncmFzcyA9IHtcbiAgICBcImltYWdlXCI6IHRfdHJlZXMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NlwiLCBcInhcIjogMjE4LCBcInlcIjogOTEsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQlNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLnRyZWVzID0ge1xuICAgIFwiaW1hZ2VcIjogdF90cmVlcyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAxXCIsIFwieFwiOiAzMTMsIFwieVwiOiAxMzQsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAyXCIsIFwieFwiOiAwLCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQ0LCBcImhlaWdodFwiOiA0Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8wM1wiLCBcInhcIjogMzEzLCBcInlcIjogMjcyLCBcIndpZHRoXCI6IDY4LCBcImhlaWdodFwiOiA2OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8wNFwiLCBcInhcIjogMzEzLCBcInlcIjogNjUsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA1XCIsIFwieFwiOiAyNDQsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNTQsIFwiaGVpZ2h0XCI6IDU0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA2XCIsIFwieFwiOiA0NTIsIFwieVwiOiAzNDAsIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA3XCIsIFwieFwiOiA0NTIsIFwieVwiOiAxODEsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDU4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA4XCIsIFwieFwiOiAzMTMsIFwieVwiOiAzNDEsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDUyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA5XCIsIFwieFwiOiA4NiwgXCJ5XCI6IDQ1OSwgXCJ3aWR0aFwiOiA0MCwgXCJoZWlnaHRcIjogNDB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMTBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDY2LCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMVwiLCBcInhcIjogNDUyLCBcInlcIjogMjQwLCBcIndpZHRoXCI6IDQ3LCBcImhlaWdodFwiOiA1Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMlwiLCBcInhcIjogNDA1LCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDQ2LCBcImhlaWdodFwiOiA0OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xM1wiLCBcInhcIjogMTI3LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNFwiLCBcInhcIjogNDUyLCBcInlcIjogMzg5LCBcIndpZHRoXCI6IDQ2LCBcImhlaWdodFwiOiA0NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNVwiLCBcInhcIjogMzg0LCBcInlcIjogMTMzLCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNlwiLCBcInhcIjogNDUyLCBcInlcIjogMjkzLCBcIndpZHRoXCI6IDQ4LCBcImhlaWdodFwiOiA0Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xN1wiLCBcInhcIjogNDUyLCBcInlcIjogMTIyLCBcIndpZHRoXCI6IDU0LCBcImhlaWdodFwiOiA1OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xOFwiLCBcInhcIjogMzEzLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMTlcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDYwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIwXCIsIFwieFwiOiAyOTksIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNTIsIFwiaGVpZ2h0XCI6IDU0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIxXCIsIFwieFwiOiAzODQsIFwieVwiOiAyNjcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDYwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIyXCIsIFwieFwiOiA0NTIsIFwieVwiOiA2MSwgXCJ3aWR0aFwiOiA1NCwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjNcIiwgXCJ4XCI6IDI0NSwgXCJ5XCI6IDMxMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjRcIiwgXCJ4XCI6IDQ1LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQwLCBcImhlaWdodFwiOiA0Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNVwiLCBcInhcIjogMCwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNjJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjZcIiwgXCJ4XCI6IDIxOCwgXCJ5XCI6IDE4MiwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNTB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjdcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDMyOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNjJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjhcIiwgXCJ4XCI6IDIzNywgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNzB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjlcIiwgXCJ4XCI6IDM1MiwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1MiwgXCJoZWlnaHRcIjogNTJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDIwMCwgXCJ3aWR0aFwiOiA2NiwgXCJoZWlnaHRcIjogNjZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzhcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDExMCwgXCJoZWlnaHRcIjogMTIwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzM5XCIsIFwieFwiOiAxMTEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEwNiwgXCJoZWlnaHRcIjogMTIwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQwXCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY3LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80MVwiLCBcInhcIjogMTYyLCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDgyLCBcImhlaWdodFwiOiA3Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80MlwiLCBcInhcIjogODcsIFwieVwiOiAyMzQsIFwid2lkdGhcIjogNzgsIFwiaGVpZ2h0XCI6IDc2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQzXCIsIFwieFwiOiAwLCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDg0LCBcImhlaWdodFwiOiA4Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NFwiLCBcInhcIjogMCwgXCJ5XCI6IDEyMSwgXCJ3aWR0aFwiOiAxMTAsIFwiaGVpZ2h0XCI6IDExMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NlwiLCBcInhcIjogMjE4LCBcInlcIjogOTEsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ3XCIsIFwieFwiOiAxMjIsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNjAsIFwiaGVpZ2h0XCI6IDU2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ4XCIsIFwieFwiOiA2MSwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDlcIiwgXCJ4XCI6IDE4MywgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTBcIiwgXCJ4XCI6IDE2NiwgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNzZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyMzQsIFwid2lkdGhcIjogODYsIFwiaGVpZ2h0XCI6IDc4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzUyXCIsIFwieFwiOiAzMTMsIFwieVwiOiAyMDMsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzUzXCIsIFwieFwiOiAxMTEsIFwieVwiOiAxMjEsIFwid2lkdGhcIjogOTQsIFwiaGVpZ2h0XCI6IDk4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzU0XCIsIFwieFwiOiAyMTgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDk0LCBcImhlaWdodFwiOiA5MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81NVwiLCBcInhcIjogODUsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDgyfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCU0LXRgNC10LLRjNGPINC4INC60YPRgdGC0YtcbiAqL1xuZXhwb3J0cy5idXNocyA9IHtcbiAgICBcImltYWdlXCI6IHRfYnVzaHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMTAzLCBcInlcIjogMTAwLCBcIndpZHRoXCI6IDI1LCBcImhlaWdodFwiOiAzMH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTAzLCBcInlcIjogNjAsIFwid2lkdGhcIjogMzAsIFwiaGVpZ2h0XCI6IDM5fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAxNTYsIFwieVwiOiAxMTksIFwid2lkdGhcIjogMTUsIFwiaGVpZ2h0XCI6IDEzfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAxMDMsIFwieVwiOiA0MCwgXCJ3aWR0aFwiOiAyMSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDEzNiwgXCJ5XCI6IDExOSwgXCJ3aWR0aFwiOiAxOSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEwMywgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDM5fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCf0YPRgdGC0YvQvdC90L7QtVxuICovXG5leHBvcnRzLmRlc2VydCA9IHtcbiAgICBcImltYWdlXCI6IHRfcGxhbnRzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDE5OCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyNywgXCJoZWlnaHRcIjogNTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAxOTgsIFwieVwiOiAyOTMsIFwid2lkdGhcIjogMzEsIFwiaGVpZ2h0XCI6IDMwfSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMjMzLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDc2LCBcImhlaWdodFwiOiA5Mn0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlMTZcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDIzOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogODd9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCh0YLRgNCw0L3QvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5iZWx3b29kID0ge1xuICAgIFwiaW1hZ2VcIjogdF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAxMDcsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTA4LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDg5LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDk1LCBcImhlaWdodFwiOiAxMTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIwXCIsIFwieFwiOiAyNDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyNiwgXCJoZWlnaHRcIjogMTE2fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCi0LXQu9C10L/QvtGA0YJcbiAqL1xuZXhwb3J0cy50ZWxlcG9ydCA9IHtcbiAgICBcImltYWdlXCI6IHNfdGVsZXBvcnQsXG4gICAgXCJ3aWR0aFwiOiA5MCxcbiAgICBcImhlaWdodFwiOiA0OSxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMVwiLCBcInhcIjogMCwgXCJ5XCI6IDQ5LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMCwgXCJ5XCI6IDk4LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogOTAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogOTAsIFwieVwiOiA0OSwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KPQutCw0LfQsNGC0LXQu9GMXG4gKi9cbmV4cG9ydHMucG9pbnRlciA9IHtcbiAgICBcImltYWdlXCI6IHNfcG9pbnRlcixcbiAgICBcIndpZHRoXCI6IDY0LFxuICAgIFwiaGVpZ2h0XCI6IDY0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAyMDEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiA0MDIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiA2MDMsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA4MDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyMDEsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDQwMiwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyMDEsIFwiaGVpZ2h0XCI6IDIwMX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogNjAzLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogODA0LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCS0LfRgNGL0LJcbiAqL1xuZXhwb3J0cy5ib29tID0ge1xuICAgIFwiaW1hZ2VcIjogc19ib29tLFxuICAgIFwid2lkdGhcIjogMTI4LFxuICAgIFwiaGVpZ2h0XCI6IDEyOCxcbiAgICBcInNwZWVkXCI6IDMwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA1MTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiA2NDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiA3NjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiA4OTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMlwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxM1wiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogNjQwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogNzY4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogODk2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxN1wiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjNcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI4XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI5XCIsIFwieFwiOiA1MTIsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMwXCIsIFwieFwiOiA2NDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMxXCIsIFwieFwiOiA3NjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMyXCIsIFwieFwiOiA4OTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMzXCIsIFwieFwiOiAwLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNFwiLCBcInhcIjogMTI4LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNVwiLCBcInhcIjogMjU2LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNlwiLCBcInhcIjogMzg0LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzN1wiLCBcInhcIjogNTEyLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOFwiLCBcInhcIjogNjQwLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOVwiLCBcInhcIjogNzY4LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MFwiLCBcInhcIjogODk2LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MVwiLCBcInhcIjogMCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDVcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDZcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDdcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDhcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDlcIiwgXCJ4XCI6IDAsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUwXCIsIFwieFwiOiAxMjgsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUxXCIsIFwieFwiOiAyNTYsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUyXCIsIFwieFwiOiAzODQsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUzXCIsIFwieFwiOiA1MTIsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU0XCIsIFwieFwiOiA2NDAsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU1XCIsIFwieFwiOiA3NjgsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU2XCIsIFwieFwiOiA4OTYsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU3XCIsIFwieFwiOiAwLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1OFwiLCBcInhcIjogMTI4LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1OVwiLCBcInhcIjogMjU2LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MFwiLCBcInhcIjogMzg0LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MVwiLCBcInhcIjogNTEyLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MlwiLCBcInhcIjogNjQwLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2M1wiLCBcInhcIjogNzY4LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2NFwiLCBcInhcIjogODk2LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCS0LfRgNGL0LIxXG4gKi9cbmV4cG9ydHMuYm9vbTEgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2Jvb20xLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG4gICAgXCJzcGVlZFwiOiAyMixcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMjU2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMzg0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTFcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTJcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JLQt9GA0YvQsjJcbiAqL1xuZXhwb3J0cy5ib29tMiA9IHtcbiAgICBcImltYWdlXCI6IHNfYm9vbTIsXG4gICAgXCJ3aWR0aFwiOiAxMjgsXG4gICAgXCJoZWlnaHRcIjogMTI4LFxuICAgIFwic3BlZWRcIjogMjgsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAxMjgsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTExXCIsIFwieFwiOiAyNTYsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiAzODQsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAwLCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMTI4LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogMjU2LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogMzg0LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCm0LXQu9GMINGC0LXQu9C10L/QvtGA0YLQsFxuICovXG5leHBvcnRzLmJhcmllciA9IHtcbiAgICBcImltYWdlXCI6IHNfYmFyaWVyLFxuICAgIFwid2lkdGhcIjogMTI4LFxuICAgIFwiaGVpZ2h0XCI6IDEyOCxcbiAgICBcInNwZWVkXCI6IDM4LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMjU2LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAwLCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTdcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDE5MiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAxOTIsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogMjU2LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMlwiLCBcInhcIjogNjQsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMTI4LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCt0YTRhNC10LrRgiDRgtC+0LvRh9C+0LpcbiAqL1xuZXhwb3J0cy5wdXNoMSA9IHtcbiAgICBcImltYWdlXCI6IHNfcHVzaCxcbiAgICBcIndpZHRoXCI6IDUxMixcbiAgICBcImhlaWdodFwiOiA1MTIsXG4gICAgXCJzcGVlZFwiOiAzMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMCwgXCJ5XCI6IDE5MiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuZXhwb3J0cy5ibHVlX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogMzIsXG4gICAgXCJoZWlnaHRcIjogMzIsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDk2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTFcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMlwiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAyMjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdyZWVuX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogMzIsXG4gICAgXCJoZWlnaHRcIjogMzIsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDMyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogNjQsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE3XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdyZXlfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMzIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDk2LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyN1wiLCBcInhcIjogMTYwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyOFwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyOVwiLCBcInhcIjogMjI0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMucmVkX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogMzIsXG4gICAgXCJoZWlnaHRcIjogMzIsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzMFwiLCBcInhcIjogMCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzFcIiwgXCJ4XCI6IDMyLCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzMlwiLCBcInhcIjogNjQsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMzXCIsIFwieFwiOiA5NiwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzRcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzVcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzZcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzdcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLm1hZ2VudGFfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM4XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzlcIiwgXCJ4XCI6IDMyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDBcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDFcIiwgXCJ4XCI6IDk2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQzXCIsIFwieFwiOiAxNjAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NFwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDVcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy55ZWxsb3dfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQ2XCIsIFwieFwiOiAwLCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDdcIiwgXCJ4XCI6IDMyLCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDhcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDlcIiwgXCJ4XCI6IDk2LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDE2MCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUxXCIsIFwieFwiOiAxNjAsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1MlwiLCBcInhcIjogMTkyLCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTNcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDE2MCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLnNrZWxldG9uID0ge1xuICAgIFwiaW1hZ2VcIjogc19za2VsZXRvbixcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MVwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODJcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmthdHkgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2thdHksXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNzlcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MFwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NVwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg2XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5sZXZvbiA9IHtcbiAgICBcImltYWdlXCI6IHNfbGV2b24sXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNzlcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MFwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NVwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg2XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy52aXRhbHkgPSB7XG4gICAgXCJpbWFnZVwiOiBzX3ZpdGFseSxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIyXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDMyMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI1XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNlwiLCBcInhcIjogNDQ4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjdcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCa0LvQsNGB0YHQvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5jb29sX3BsYW50cyA9IHtcbiAgICBcImltYWdlXCI6IHRfY29vbF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTFcIiwgXCJ4XCI6IDUxOSwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2UyXzBcIiwgXCJ4XCI6IDQ1NCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2UzXzBcIiwgXCJ4XCI6IDM4OSwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U0XCIsIFwieFwiOiAzMjQsIFwieVwiOiA1MTcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlNVwiLCBcInhcIjogMjU5LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTZcIiwgXCJ4XCI6IDE5NCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U3XCIsIFwieFwiOiAxMjksIFwieVwiOiA1MTcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlOFwiLCBcInhcIjogMzg3LCBcInlcIjogMTI5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlOVwiLCBcInhcIjogMzg3LCBcInlcIjogMjU4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJwYWxtdHJlZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlMlwiLCBcInhcIjogMTI5LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJwYWxtdHJlZTNcIiwgXCJ4XCI6IDEyOSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlNFwiLCBcInhcIjogMzg3LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJwYWxtdHJlZTVcIiwgXCJ4XCI6IDUxNiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWUxXzRcIiwgXCJ4XCI6IDUxNiwgXCJ5XCI6IDEyOSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTJfMVwiLCBcInhcIjogNTE2LCBcInlcIjogMjU4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlNFwiLCBcInhcIjogMzg3LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTVcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDI1OSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZS1zdHJhbmdlXCIsIFwieFwiOiAxMjksIFwieVwiOiAyNTksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlNlwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU2XCIsIFwieFwiOiAyNTgsIFwieVwiOiAxMjksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU3XCIsIFwieFwiOiAyNTgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlOFwiLCBcInhcIjogMTI5LCBcInlcIjogMTMwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlOVwiLCBcInhcIjogNTE2LCBcInlcIjogMzg3LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWUzXCIsIFwieFwiOiAwLCBcInlcIjogMjU5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXRgNGC0LLRi9C1INC00LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMuZGVhZF9wbGFudHMgPSB7XG4gICAgXCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImRlYWR0cmVlMV8wXCIsIFwieFwiOiAwLCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRlYWR0cmVlMlwiLCBcInhcIjogMjU4LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkZWFkdHJlZTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXRgNGC0LLRi9C1INC00LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMuYW5kc3RvbmVzID0ge1xuICAgIFwiaW1hZ2VcIjogdF9hbmRzdG9uZXMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDJcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjAzXCIsIFwieFwiOiAwLCBcInlcIjogNjYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwNFwiLCBcInhcIjogNjUsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDVcIiwgXCJ4XCI6IDY1LCBcInlcIjogMzMsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwNlwiLCBcInhcIjogNjUsIFwieVwiOiA2NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA3XCIsIFwieFwiOiAwLCBcInlcIjogOTksIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwOFwiLCBcInhcIjogNjUsIFwieVwiOiA5OSwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA5XCIsIFwieFwiOiAwLCBcInlcIjogMTMyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMTBcIiwgXCJ4XCI6IDY1LCBcInlcIjogMTMyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn1cbiAgICAgICAgXVxuICAgIH1cbn07IiwiLyoqXG4gKiDQndCw0LHQvtGA0Ysg0YHQv9GA0LDQudGC0L7QslxuICovXG5cblxuLy/QmtCw0YDRgtC40L3QutC4XG5sZXQgdF9wbGFudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndF9wbGFudHMnKTtcbmxldCBzX2dyYXZlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2dyYXZlcycpO1xubGV0IHNfY2FtcGZpcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19jYW1wZmlyZScpO1xuXG5cbi8qKlxuICog0J/Rg9GB0YLRi9C90L3QvtC1XG4gKi9cbmV4cG9ydHMuZGVzZXJ0ID0gW3tcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDI3LCBcImhlaWdodFwiOiA1OCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDE5OCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyNywgXCJoZWlnaHRcIjogNTh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDc2LCBcImhlaWdodFwiOiA5MiwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAyMzMsIFwieVwiOiAzMzAsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkyfV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogODcsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogMjQ0LCBcInlcIjogMjM4LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA4N31dfX0sXG5cbl07XG5cbi8qKlxuICog0KHRgtGA0LDQvdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLmJlbHdvb2QgPSBbXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsXCJ3aWR0aFwiOiAxMDcsIFwiaGVpZ2h0XCI6IDEyOCwgXCJzdGF0ZXNcIjogeyBcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDEwNywgXCJoZWlnaHRcIjogMTI4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA4OSwgXCJoZWlnaHRcIjogMTI4LCBcInN0YXRlc1wiOiB7IFwiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDEwOCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiA4OSwgXCJoZWlnaHRcIjogMTI4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA5NSwgXCJoZWlnaHRcIjogMTE3LCBcInN0YXRlc1wiOiB7IFwiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDk1LCBcImhlaWdodFwiOiAxMTd9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLFwid2lkdGhcIjogMTI2LCBcImhlaWdodFwiOiAxMTYsIFwic3RhdGVzXCI6IHsgXCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI2LCBcImhlaWdodFwiOiAxMTZ9XX19LFxuXTtcblxuXG5cbi8qKlxuICog0JTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5idXNocyA9IFtcbiAgICB7XCJpbWFnZVwiOiB0X2J1c2hzLCBcIndpZHRoXCI6IDExMywgXCJoZWlnaHRcIjogMTE4LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTM2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMTMsIFwiaGVpZ2h0XCI6IDExOH1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9idXNocywgXCJ3aWR0aFwiOiAxMDIsIFwiaGVpZ2h0XCI6IDE0MCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEwMiwgXCJoZWlnaHRcIjogMTQwfV19fSxcbl07XG5cbi8qKlxuICog0J3QsNC00LPRgNC+0LHRjNGPXG4gKi9cbmV4cG9ydHMuZ3JhdmVzID0gW1xuICAgIHtcImltYWdlXCI6IHNfZ3JhdmVzLCBcIndpZHRoXCI6IDIyLCBcImhlaWdodFwiOiAzMiwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDE2NSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjIsIFwiaGVpZ2h0XCI6IDMyfSxdfX0sXG4gICAge1wiaW1hZ2VcIjogc19ncmF2ZXMsIFwid2lkdGhcIjogMjgsIFwiaGVpZ2h0XCI6IDI3LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogOTgsIFwieVwiOiAyLCBcIndpZHRoXCI6IDI4LCBcImhlaWdodFwiOiAyN31dfX0sXG5dO1xuXG4vKipcbiAqINCa0L7RgdGC0YDRi1xuICovXG5leHBvcnRzLmNhbXBmaXJlID0gW1xuICAgIHtcImltYWdlXCI6IHNfY2FtcGZpcmUsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFtcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgIF19fSxcbl07XG5cbi8qKlxuICog0JrQu9Cw0YHRgdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG4vKlxuZXhwb3J0cy5jb29sX3BsYW50cyA9IFtcbiAgICB7XCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTcsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJkZWFkdHJlZTFfMFwiLCBcInhcIjogMCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDk3fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwiZGVhZHRyZWUyXCIsIFwieFwiOiAyNTgsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfY29vbF9wbGFudHMsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjgsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJkZWFkdHJlZTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XX19LFxuXTsqL1xuIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==