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

            var _x = x,
                _y = y;
            if (this.sprite.top != undefined) {
                _y += this.sprite.top;
            }
            if (this.sprite.left != undefined) {
                _x += this.sprite.left;
            }

            //Обрезка отрисовки вне канвы TODO: резать по камере
            if (_x + this.width > 0 && _x < context.canvas.width && _y + this.height > 0 && _y < context.canvas.height) {

                // Рисуем кадр
                this.drawFrame(context, this.sprite.image, this.sprite.states[state][frameNum], _x, _y, this.width, this.height);
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
    function _class(src, volume) {
        _classCallCheck(this, _class);

        this.volume = volume || 0.4;
        this.sound = document.createElement("audio");
        this.sound.volume = this.volume;
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
            this.sound.volume = this.volume;
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

var _signin = __webpack_require__(/*! ./scenes/signin */ "./scenes/signin.js");

var _signin2 = _interopRequireDefault(_signin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * События игры
 */
exports.default = { init: init, add: add, on: on, off: off, disconnect: disconnect

    // Подключение к серверу
};
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

    on("server", function (eventName, type, data) {

        if (type === "hello") {
            //Если ещё не вошли
            if (!logged) {

                if (data.version && data.version <= 0.14) {

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
                } else {
                    _ui2.default.waitScreen.show('Жми Ctrl-F5');
                }
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
        case keys.N1:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N2:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N3:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N4:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N5:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N6:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N7:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N8:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N9:
            _events2.default.add('keyup', 'fire');
            break;
        case keys.N0:
            _events2.default.add('keyup', 'fire');
            break;
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

exports.default = { add: add, addFromSet: addFromSet, addOne: addOne, remove: remove, reset: reset, size: size, each: each };


var entities = [];

//Создает
function add(x, y, ID, lifetime, faza) {
    entities.push(new _entity2.default(x, y, _characters2.default.get(ID), lifetime, faza));
}

function addFromSet(x, y, setID, ID, lifetime, faza) {
    entities.push(new _entity2.default(x, y, _characters2.default.getFromSet(setID, ID), lifetime, faza));
}

//Добавляет созданную
function addOne(entity) {
    entities.push(entity);
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

            //Рисуем пятно расположения
            /*camera.context.save();
            camera.context.beginPath();
            camera.context.fillStyle = "rgba(255,255,67,0.4)";
            camera.context.fillRect(this.x-camera.x, this.y-camera.y, this.width, this.height);
            camera.context.rect(x, y, this.character.width, this.character.height);
            camera.context.stroke();
             camera.context.beginPath();
            camera.context.fillStyle = "rgba(255,0,0,0.8)";
            camera.context.arc(this.x-camera.x, this.y-camera.y, 2, 0, Math.PI*2);
            camera.context.fill();
             camera.context.restore();*/
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

var _unit6 = __webpack_require__(/*! ./unit */ "./scenes/main/unit.js");

var _unit7 = _interopRequireDefault(_unit6);

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

            roomInit(room, data.players, data.hero);
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

            var unit = new _unit7.default(info);
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

            var _unit2 = _units2.default.item(data.ID);
            if (_unit2) {
                _unit2.destroy();
                _units2.default.remove(data.ID);
            }
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

    // Информация о комнате
    if (type === "all-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if ('room_id' in info && info.room_id === room_id) {

                if ('npcs' in info) {
                    for (var id in info.npcs) {
                        var _unit3 = _units2.default.item(id);
                        if (_unit3) {
                            _unit3.set(info.npcs[id]);
                        }
                    }
                }

                if ('loot' in info) {
                    for (var _id in info.loot) {

                        if (_id in loots) {
                            loots[_id].set(info.loot[_id].room_id, info.loot[_id].x, info.loot[_id].y, info.loot[_id].character_id, _id);
                        }
                    }
                }

                if ('teleports' in info) {
                    for (var _id2 in info.teleports) {

                        if (_id2 in teleports) {
                            teleports[_id2].set(info.teleports[_id2].state);
                        }
                    }
                }
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка обновления моба. " + e);
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

    // Создание нового моба
    if (type === "npc-create") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined) throw "Ошибка получения с сервера";

            var _unit4 = new _unit7.default(info);
            _units2.default.add(info.ID, _unit4);
        } catch (e) {
            (0, _logs2.default)("Ошибка получения моба. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Удаление моба
    if (type === "npc-remove") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            var _unit5 = _units2.default.item(info.ID);
            _unit5.destroy();
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
                _hero2.default.unit = new _unit7.default(info, true);
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
 * @param settings
 * @param players
 * @param hero
 */
function roomInit(settings, players, heroUnit) {

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
    _units2.default.reset();

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

    if ('npcs' in settings) {
        for (var item_id in settings.npcs) {
            var _item3 = settings.npcs[item_id];
            _units2.default.add(_item3.ID, new _unit7.default(_item3));
        }
    }

    if (players) {
        for (var _item_id in players) {
            var _item4 = players[_item_id];
            _units2.default.add(_item4.ID, new _unit7.default(_item4));
        }
    }

    /*if(heroUnit && ! hero.unit){
        let item = heroUnit;
            hero.unit = new Unit(item);
        units.add(item.ID, hero.unit);
    }*/
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
             camera.context.beginPath();
            camera.context.fillStyle = "rgba(255,0,0,0.8)";
            camera.context.arc(this.x-camera.x, this.y-camera.y, 2, 0, Math.PI*2);
            camera.context.fill();
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
        width: 1000,
        height: 1000,
        // entitiesSprites: "grass",
        entitiesSprites: "andstones"
    },
    1: {
        r: { start: 239, rand: 16 },
        g: { start: 210, rand: 33 },
        b: { start: 100, rand: 25 },
        width: 1000,
        height: 1000,
        entitiesSprites: "desert"
    },
    2: {
        r: { start: 210, rand: 45 },
        g: { start: 30, rand: 75 },
        b: { start: 30, rand: 75 },
        width: 1000,
        height: 1000,
        entitiesSprites: "cool_plants"
    },
    3: {
        r: { start: 10, rand: 12 },
        g: { start: 130, rand: 20 },
        b: { start: 210, rand: 45 },
        width: 1000,
        height: 1000,
        entitiesSprites: "bushs"
    },
    4: {
        r: { start: 150, rand: 12 },
        g: { start: 90, rand: 20 },
        b: { start: 40, rand: 12 },
        width: 1000,
        height: 1000,
        entitiesSprites: "trees"
    },
    5: {
        r: { start: 0, rand: 30 },
        g: { start: 0, rand: 5 },
        b: { start: 0, rand: 5 },
        width: 1000,
        height: 1000,
        entitiesSprites: "dead_plants"
    },
    6: {
        r: { start: 230, rand: 24 },
        g: { start: 230, rand: 24 },
        b: { start: 230, rand: 24 },
        width: 1000,
        height: 1000,
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

        this.generate();
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
        value: function generate() {
            var ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = this.width;
            ctx.canvas.height = this.height;

            ctx.save();

            this.generateRandomBack(ctx);

            this.generateCartoon(ctx);

            ctx.restore();

            // Сохраним картинкой
            this.image = new Image();
            this.image.src = ctx.canvas.toDataURL("image/png");
        }
    }, {
        key: "generateRandomBack",
        value: function generateRandomBack(ctx) {

            var tileWidth = 22.0,
                tileHeight = 22.0,
                rows = Math.floor(this.width / tileWidth) + 1,
                columns = Math.floor(this.height / tileHeight) + 1;

            for (var x = 0.0, i = 0; i < rows; x += tileHeight, i++) {
                for (var y = 0, j = 0; j < columns; y += tileWidth, j++) {
                    ctx.beginPath();
                    ctx.fillStyle = this.randomCSScolor(this.environment_id);
                    ctx.fillRect(x, y, tileWidth, tileHeight);
                    // ctx.closePath();
                }
            }
        }
    }, {
        key: "generateCartoon",
        value: function generateCartoon(ctx) {
            var env = ENVIRONMENTS[this.environment_id];

            var spr = _sprites2.default[env.entitiesSprites];

            //Сгенерим деревья
            for (var i = 0; i < this.entities_num; i++) {

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

var _entities = __webpack_require__(/*! ./entities */ "./scenes/main/entities.js");

var _entities2 = _interopRequireDefault(_entities);

var _entity3 = __webpack_require__(/*! ./entity */ "./scenes/main/entity.js");

var _entity4 = _interopRequireDefault(_entity3);

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

        this.effects = []; //TODO: Применять при создании

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

            this.updateEffects(data.effects);
        }
    }, {
        key: "updateEffects",
        value: function updateEffects(effects) {
            var existsEffect = {};

            for (var i in effects) {
                //Если новый эффект - создадим
                if (effects[i] in this.effects === false) {

                    if (effects[i] === 'freeze') {
                        var entity = new _entity4.default(this.x + this.width / 2, this.y + 18, _characters2.default.get('freeze'), 0.0, 0.0);
                        this.effects[effects[i]] = entity;
                        _entities2.default.addOne(entity);
                    }

                    if (effects[i] === 'holera') {
                        var _entity = new _entity4.default(this.x + this.width / 2, this.y + 18, _characters2.default.get('blackboom'), 0.0, 0.0);
                        this.effects[effects[i]] = _entity;
                        _entities2.default.addOne(_entity);
                    }

                    if (effects[i] === 'shield') {
                        var _entity2 = new _entity4.default(this.x + this.width / 2, this.y + 18, _characters2.default.get('shield'), 0.0, 0.0);
                        this.effects[effects[i]] = _entity2;
                        _entities2.default.addOne(_entity2);
                    }
                }
                existsEffect[effects[i]] = true;
            }

            //По окончании эффекта - уберем
            for (var effectID in this.effects) {
                if (effectID in existsEffect === false) {
                    this.effects[effectID].kill();
                    delete this.effects[effectID];
                }
            }
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

            //Анимация эффектов
            for (var i in this.effects) {
                this.effects[i].x = this.x + this.width / 2;
                this.effects[i].y = this.y + 18;
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
             context.beginPath();
            context.fillStyle = "rgba(255,0,0,0.8)";
            context.arc(sx, sy, 2, 0, Math.PI*2);
            context.fill();
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
    }, {
        key: "destroy",
        value: function destroy() {
            for (var effectID in this.effects) {
                this.effects[effectID].kill();
                delete this.effects[effectID];
            }
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
        if (!units[i].isHero) {
            delete units[i];
        } else {
            units[i].destroy();
        }
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
    "npc_eat_coin": new _sound2.default('sound/coin/coin3.wav', 0.1),
    "eat_coin_gold": new _sound2.default('sound/coin/coin.wav'),
    "eat_coin_silver": new _sound2.default('sound/coin/eat2.mp3'),
    "eat_coin_copper": new _sound2.default('sound/coin/eat1.mp3'),
    "teleport": new _sound2.default('sound/teleport/flaunch.wav', 0.1),
    "push-effect": new _sound2.default('sound/hit/dropLeather.ogg'),
    "freeze-effect": new _sound2.default('sound/hit/frost.wav'),
    "holera-effect": new _sound2.default('sound/hit/holera.wav'),
    "shield-effect": new _sound2.default('sound/shield.wav'),
    "weapon-claws1": new _sound2.default('sound/hit/claws1.wav'),
    "weapon-claws2": new _sound2.default('sound/hit/claws2.wav'),
    "weapon-claws3": new _sound2.default('sound/hit/claws3.wav')
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
    s_shield = document.getElementById('s_shield'),
    s_push = document.getElementById('s_push'),
    s_crystals = document.getElementById('s_crystals'),
    s_skeleton = document.getElementById('s_skeleton'),
    s_katy = document.getElementById('s_katy'),
    s_levon = document.getElementById('s_levon'),
    s_vitaly = document.getElementById('s_vitaly'),
    t_cool_plants = document.getElementById('t_cool_plants'),
    t_andstones = document.getElementById('t_andstones'),
    s_blackboom = document.getElementById('s_blackboom'),
    s_freeze = document.getElementById('s_freeze'),
    s_kroko = document.getElementById('s_kroko'),
    s_koil = document.getElementById('s_koil'),
    s_dead = document.getElementById('s_dead'),
    s_gunner = document.getElementById('s_gunner'),
    s_juk = document.getElementById('s_juk');

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
 * Щит
 */
exports.shield = {
    "image": s_shield,
    "width": 90,
    "height": 110,
    "speed": 30,
    "top": -25,
    "left": 0,

    "states": {
        "default": [{ "name": "aura_test_1_32_1", "x": 0, "y": 68, "width": 80, "height": 67 }, { "name": "aura_test_1_32_2", "x": 0, "y": 272, "width": 80, "height": 67 }, { "name": "aura_test_1_32_3", "x": 81, "y": 0, "width": 80, "height": 67 }, { "name": "aura_test_1_32_4", "x": 81, "y": 68, "width": 80, "height": 67 }, { "name": "aura_test_1_32_5", "x": 0, "y": 136, "width": 80, "height": 67 }, { "name": "aura_test_1_32_6", "x": 81, "y": 136, "width": 80, "height": 67 }, { "name": "aura_test_1_32_7", "x": 162, "y": 0, "width": 80, "height": 67 }, { "name": "aura_test_1_32_8", "x": 162, "y": 68, "width": 80, "height": 67 }, { "name": "aura_test_1_32_9", "x": 162, "y": 136, "width": 80, "height": 67 }, { "name": "aura_test_1_32_10", "x": 0, "y": 204, "width": 80, "height": 67 }, { "name": "aura_test_1_32_11", "x": 81, "y": 204, "width": 80, "height": 67 }, { "name": "aura_test_1_32_12", "x": 162, "y": 204, "width": 80, "height": 67 }, { "name": "aura_test_1_32_13", "x": 243, "y": 0, "width": 80, "height": 67 }, { "name": "aura_test_1_32_14", "x": 243, "y": 68, "width": 80, "height": 67 }, { "name": "aura_test_1_32_15", "x": 243, "y": 136, "width": 80, "height": 67 }, { "name": "aura_test_1_32_16", "x": 243, "y": 204, "width": 80, "height": 67 }, { "name": "aura_test_1_32_17", "x": 0, "y": 0, "width": 80, "height": 67 }, { "name": "aura_test_1_32_18", "x": 81, "y": 272, "width": 80, "height": 67 }, { "name": "aura_test_1_32_19", "x": 162, "y": 272, "width": 80, "height": 67 }, { "name": "aura_test_1_32_20", "x": 243, "y": 272, "width": 80, "height": 67 }, { "name": "aura_test_1_32_21", "x": 324, "y": 0, "width": 80, "height": 67 }, { "name": "aura_test_1_32_22", "x": 324, "y": 68, "width": 80, "height": 67 }, { "name": "aura_test_1_32_23", "x": 324, "y": 136, "width": 80, "height": 67 }, { "name": "aura_test_1_32_24", "x": 324, "y": 204, "width": 80, "height": 67 }, { "name": "aura_test_1_32_25", "x": 324, "y": 272, "width": 80, "height": 67 }, { "name": "aura_test_1_32_26", "x": 0, "y": 340, "width": 80, "height": 67 }, { "name": "aura_test_1_32_27", "x": 81, "y": 340, "width": 80, "height": 67 }, { "name": "aura_test_1_32_28", "x": 162, "y": 340, "width": 80, "height": 67 }, { "name": "aura_test_1_32_29", "x": 243, "y": 340, "width": 80, "height": 67 }, { "name": "aura_test_1_32_30", "x": 324, "y": 340, "width": 80, "height": 67 }, { "name": "aura_test_1_32_32", "x": 0, "y": 408, "width": 80, "height": 67 }, { "name": "aura_test_1_32_31", "x": 81, "y": 408, "width": 80, "height": 67 }]
    }
};

/**
 * Эффект толчок
 */
exports.push1 = {
    "image": s_push,
    "width": 256,
    "height": 256,
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

var CRYSTAL_WIDTH = 32;
var CRYSTAL_HEIGHT = 32;

exports.blue_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite6", "x": 0, "y": 0, "width": 32, "height": 32 }, { "name": "sprite7", "x": 32, "y": 0, "width": 32, "height": 32 }, { "name": "sprite8", "x": 64, "y": 0, "width": 32, "height": 32 }, { "name": "sprite9", "x": 96, "y": 0, "width": 32, "height": 32 }, { "name": "sprite10", "x": 128, "y": 0, "width": 32, "height": 32 }, { "name": "sprite11", "x": 160, "y": 0, "width": 32, "height": 32 }, { "name": "sprite12", "x": 192, "y": 0, "width": 32, "height": 32 }, { "name": "sprite13", "x": 224, "y": 0, "width": 32, "height": 32 }]
    }
};

exports.green_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite14", "x": 0, "y": 32, "width": 32, "height": 32 }, { "name": "sprite15", "x": 32, "y": 32, "width": 32, "height": 32 }, { "name": "sprite16", "x": 64, "y": 32, "width": 32, "height": 32 }, { "name": "sprite17", "x": 96, "y": 32, "width": 32, "height": 32 }, { "name": "sprite18", "x": 128, "y": 32, "width": 32, "height": 32 }, { "name": "sprite19", "x": 160, "y": 32, "width": 32, "height": 32 }, { "name": "sprite20", "x": 192, "y": 32, "width": 32, "height": 32 }, { "name": "sprite21", "x": 224, "y": 32, "width": 32, "height": 32 }]
    }
};

exports.grey_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite22", "x": 0, "y": 64, "width": 32, "height": 32 }, { "name": "sprite23", "x": 32, "y": 64, "width": 32, "height": 32 }, { "name": "sprite24", "x": 64, "y": 64, "width": 32, "height": 32 }, { "name": "sprite25", "x": 96, "y": 64, "width": 32, "height": 32 }, { "name": "sprite26", "x": 128, "y": 64, "width": 32, "height": 32 }, { "name": "sprite27", "x": 160, "y": 64, "width": 32, "height": 32 }, { "name": "sprite28", "x": 192, "y": 64, "width": 32, "height": 32 }, { "name": "sprite29", "x": 224, "y": 64, "width": 32, "height": 32 }]
    }
};

exports.red_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite30", "x": 0, "y": 96, "width": 32, "height": 32 }, { "name": "sprite31", "x": 32, "y": 96, "width": 32, "height": 32 }, { "name": "sprite32", "x": 64, "y": 96, "width": 32, "height": 32 }, { "name": "sprite33", "x": 96, "y": 96, "width": 32, "height": 32 }, { "name": "sprite34", "x": 128, "y": 96, "width": 32, "height": 32 }, { "name": "sprite35", "x": 160, "y": 96, "width": 32, "height": 32 }, { "name": "sprite36", "x": 192, "y": 96, "width": 32, "height": 32 }, { "name": "sprite37", "x": 224, "y": 96, "width": 32, "height": 32 }]
    }
};

exports.magenta_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [{ "name": "sprite38", "x": 0, "y": 128, "width": 32, "height": 32 }, { "name": "sprite39", "x": 32, "y": 128, "width": 32, "height": 32 }, { "name": "sprite40", "x": 64, "y": 128, "width": 32, "height": 32 }, { "name": "sprite41", "x": 96, "y": 128, "width": 32, "height": 32 }, { "name": "sprite42", "x": 128, "y": 128, "width": 32, "height": 32 }, { "name": "sprite43", "x": 160, "y": 128, "width": 32, "height": 32 }, { "name": "sprite44", "x": 192, "y": 128, "width": 32, "height": 32 }, { "name": "sprite45", "x": 224, "y": 128, "width": 32, "height": 32 }]
    }
};

exports.yellow_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
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

/**
 * Черный взрыв
 */
exports.blackboom = {
    "image": s_blackboom,
    "width": 50,
    "height": 47,
    "speed": 30,

    "states": {
        "default": [{ "name": "smoke_black_1_19_1", "x": 0, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_2", "x": 0, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_3", "x": 50, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_4", "x": 50, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_5", "x": 0, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_6", "x": 50, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_7", "x": 100, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_8", "x": 100, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_9", "x": 100, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_10", "x": 0, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_11", "x": 50, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_12", "x": 100, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_13", "x": 150, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_14", "x": 150, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_15", "x": 150, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_16", "x": 150, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_17", "x": 0, "y": 188, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_18", "x": 50, "y": 188, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_19", "x": 100, "y": 188, "width": 50, "height": 47 }]
    }
};

/**
 * Большой черный взрыв
 */
exports.blackboom_big = {
    "image": s_blackboom,
    "width": 100,
    "height": 94,
    "speed": 30,

    "states": {
        "default": [{ "name": "smoke_black_1_19_1", "x": 0, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_2", "x": 0, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_3", "x": 50, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_4", "x": 50, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_5", "x": 0, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_6", "x": 50, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_7", "x": 100, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_8", "x": 100, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_9", "x": 100, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_10", "x": 0, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_11", "x": 50, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_12", "x": 100, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_13", "x": 150, "y": 0, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_14", "x": 150, "y": 47, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_15", "x": 150, "y": 94, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_16", "x": 150, "y": 141, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_17", "x": 0, "y": 188, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_18", "x": 50, "y": 188, "width": 50, "height": 47 }, { "name": "smoke_black_1_19_19", "x": 100, "y": 188, "width": 50, "height": 47 }]
    }
};

/**
 * Заморозка
 */
exports.freeze = {
    "image": s_freeze,
    "width": 56,
    "height": 65,
    "speed": 30,

    "states": {
        "default": [{ "name": "lighteningball_1_20_1", "x": 56, "y": 0, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_2", "x": 168, "y": 65, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_3", "x": 0, "y": 65, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_4", "x": 56, "y": 65, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_5", "x": 112, "y": 0, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_6", "x": 112, "y": 65, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_7", "x": 0, "y": 130, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_8", "x": 56, "y": 130, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_9", "x": 112, "y": 130, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_10", "x": 168, "y": 0, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_11", "x": 0, "y": 0, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_12", "x": 168, "y": 130, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_13", "x": 0, "y": 195, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_14", "x": 56, "y": 195, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_15", "x": 112, "y": 195, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_16", "x": 168, "y": 195, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_17", "x": 224, "y": 0, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_18", "x": 224, "y": 65, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_19", "x": 224, "y": 130, "width": 56, "height": 65 }, { "name": "lighteningball_1_20_20", "x": 224, "y": 195, "width": 56, "height": 65 }]
    }
};

/**
 * Кроко - жен
 */
exports.kroko = {
    "image": s_kroko,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64 }, { "name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64 }, { "name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64 }, { "name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64 }, { "name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64 }, { "name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64 }, { "name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64 }, { "name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64 }]
    }
};

/**
 * Кроко - муж
 */
exports.koil = {
    "image": s_koil,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64 }, { "name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64 }, { "name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64 }, { "name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64 }, { "name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64 }, { "name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64 }, { "name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64 }, { "name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64 }]
    }
};

/**
 * Мертвый солдат
 */
exports.dead = {
    "image": s_dead,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64 }, { "name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64 }, { "name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64 }, { "name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64 }, { "name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64 }, { "name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64 }]
    }
};

/**
 * Ганнер
 */
exports.gunner = {
    "image": s_gunner,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64 }, { "name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64 }, { "name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64 }, { "name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64 }, { "name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64 }, { "name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64 }]
    }
};

/**
 * Ганнер
 */
exports.juk = {
    "image": s_juk,
    "width": 100,
    "height": 100,

    "states": {
        "default": [{ "name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64 }],
        "run": [{ "name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64 }, { "name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64 }, { "name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64 }, { "name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64 }, { "name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64 }, { "name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64 }, { "name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64 }, { "name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64 }]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9jaGFyYWN0ZXJzLmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvY2hhcmFjdGVyLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS9zb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvdWkvdWkuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL3VpL3dhaXRzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWZ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWNrbzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ibG9iL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1pbmhlcml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy1qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL3V0ZjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNlcXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvdXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pcy1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vbG9vdC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi9yb29tLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3RlbGVwb3J0LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL2hlcm9pbmZvLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL3NraWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS90b3AxMC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS91aS5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS93YWl0c2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VuaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vdW5pdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL3NpZ25pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3ByaXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcHJpdGVzZXRzLmpzIiwid2VicGFjazovLy93cyAoaWdub3JlZCkiXSwibmFtZXMiOlsiZ2V0Iiwic2V0Iiwic2lnbm91dCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2dpbiIsInBhc3N3b3JkIiwiYWNjb3VudCIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwiY2hhcmFjdGVycyIsImNoYXJhY3RlcnNldHMiLCJpZCIsImFkZCIsInNwcml0ZV9pZCIsImxlbmd0aCIsImFkZFRvU2V0IiwiZ2V0RnJvbVNldCIsIklEIiwic2V0SUQiLCJzcHJpdGUiLCJwdXNoIiwiRlBTIiwiSU5URVJWQUwiLCJTVEVQIiwiQ2hhcmFjdGVyIiwid2lkdGgiLCJoZWlnaHQiLCJjb250ZXh0IiwieCIsInkiLCJzdGF0ZSIsImZyYW1lTnVtIiwic3RhdGVzIiwiX3giLCJfeSIsInRvcCIsInVuZGVmaW5lZCIsImxlZnQiLCJjYW52YXMiLCJkcmF3RnJhbWUiLCJpbWFnZSIsInNjYWxlWCIsInNjYWxlWSIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJNYXRoIiwiZmxvb3IiLCJkcmF3SW1hZ2UiLCJzcmMiLCJ2b2x1bWUiLCJzb3VuZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImN1cnJlbnRUaW1lIiwicGF1c2UiLCJwbGF5Iiwid2FpdFNjcmVlbiIsIndhaXRTY3JlZW5FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzaG93IiwiaGlkZSIsInRpdGxlIiwidGl0bGVFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImlubmVySFRNTCIsImluaXQiLCJvbiIsIm9mZiIsImRpc2Nvbm5lY3QiLCJzZXJ2ZXJTb2NrZXQiLCJsb2dnZWQiLCJjYWxsYmFjayIsImNvbm5lY3QiLCJldmVudE5hbWUiLCJ0eXBlIiwiZGF0YSIsInZlcnNpb24iLCJzdGFydCIsInNldFRpbWVvdXQiLCJoYW5kbGVycyIsInJ1bkhhbmRsZXJzIiwiZW1pdCIsIkpTT04iLCJwYXJzZSIsImUiLCJtZXNzYWdlIiwiaGFuZGxlciIsImgiLCJjbG9zZSIsInJ1biIsImdhbWVvdmVyIiwid2luZG93Iiwib25sb2FkIiwibG9nIiwiJGxvZ3MiLCJtc2ciLCJwYXJlbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY29uc29sZSIsIk1BWF9ERUFEWk9ORV9YIiwiTUFYX0RFQURaT05FX1kiLCJmb2xsb3dlciIsImRlYWRab25lIiwiZ2V0Q29udGV4dCIsInNwZWVkIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwicm9vbSIsInJ1bkZvbGxvdyIsInBsYXllciIsImtleXMiLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJBIiwiVyIsIkQiLCJTIiwiTjEiLCJOMiIsIk4zIiwiTjQiLCJONSIsIk42IiwiTjciLCJOOCIsIk45IiwiTjAiLCJTUEFDRSIsIlNUQVRJU1RJQyIsImNsaWNrUGFkIiwic3RvcCIsInNldENsaWNrUGFkIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uV2luZG93Qmx1ciIsIm9uS2V5ZG93biIsIm9uS2V5dXAiLCJvbkNsaWNrIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiX2NsaWNrUGFkIiwia2V5Q29kZSIsImNsaWVudFgiLCJjbGllbnRZIiwiYnV0dG9uIiwiYWRkRnJvbVNldCIsImFkZE9uZSIsInJlbW92ZSIsInJlc2V0Iiwic2l6ZSIsImVhY2giLCJlbnRpdGllcyIsImxpZmV0aW1lIiwiZmF6YSIsImVudGl0eSIsImluZGV4Iiwic3BsaWNlIiwiZm9yRWFjaCIsIkVudGl0eSIsImNoYXJhY3RlciIsImltbW9ydGFsIiwiYW5pbWF0ZVNwZWVkIiwiY3VycmVudFNwcml0ZU51bSIsImRpZSIsImNhbWVyYSIsImRyYXdDaGFyYWN0ZXIiLCJkcmF3IiwidW5pdCIsImFuaW1hdGUiLCJjb25zdGFudHMiLCJmaW5hbENhbGxiYWNrIiwiaW50ZXJ2YWwiLCJyb29tcyIsInJvb21faWQiLCJsb290cyIsInRlbGVwb3J0cyIsInJlc2l6ZSIsIm9uUmVjb25uZWN0Iiwib25Sb29tIiwib25IZXJvIiwib25Tb3VuZCIsInBvcyIsInNraWxscyIsInRvcDEwIiwic2V0SW50ZXJ2YWwiLCJ1cGRhdGUiLCJjbGVhckludGVydmFsIiwiZXZlbnQiLCJlbnZpcm9ubWVudF9pZCIsInJvb21Jbml0IiwicGxheWVycyIsImhlcm8iLCJpbmZvIiwiY2hhcmFjdGVyX2lkIiwibGV2ZWwiLCJpdGVtIiwiZGVzdHJveSIsInNwcml0ZXNldF9pZCIsIm5wY3MiLCJsb290IiwiY29pbnNfY291bnQiLCJsZXZlbHVwQ291bnRlciIsImhlcm9JbmZvIiwic2V0Rm9sbG93ZXIiLCJpc0RpZSIsInRvQXJyYXkiLCJpIiwicmVuZGVyQXJyYXkiLCJzb3J0IiwiYSIsImIiLCJzZXR0aW5ncyIsImhlcm9Vbml0IiwiZW50aXRpZXNfbnVtIiwiY2FydG9vbnMiLCJyYW5kb20iLCJ0YXJnZXQiLCJpdGVtX2lkIiwic3RlcCIsIkVOVklST05NRU5UUyIsInIiLCJyYW5kIiwiZyIsImVudGl0aWVzU3ByaXRlcyIsImdlbmVyYXRlIiwiY3R4Iiwic2F2ZSIsImdlbmVyYXRlUmFuZG9tQmFjayIsImdlbmVyYXRlQ2FydG9vbiIsInJlc3RvcmUiLCJJbWFnZSIsInRvRGF0YVVSTCIsInRpbGVXaWR0aCIsInRpbGVIZWlnaHQiLCJyb3dzIiwiY29sdW1ucyIsImoiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJyYW5kb21DU1Njb2xvciIsImZpbGxSZWN0IiwiZW52Iiwic3ByIiwiZGVmYXVsdCIsInRpbGUiLCJ4eCIsInl5IiwidyIsImNsb3NlUGF0aCIsImhlcm9faW5mb0VsZW1lbnQiLCJoZXJvX25hbWVFbGVtZW50Iiwic2NvcmVFbGVtZW50IiwibGV2ZWxFbGVtZW50IiwibGV2ZWx1cGNvdW50ZXJFbGVtZW50Iiwic3BlZWRFbGVtZW50IiwiaGVhbHRoRWxlbWVudCIsInNyY0VsZW1lbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImlubmVyVGV4dCIsIm5hbWUiLCJsZXZlbHVwVmFsdWUiLCJoZWFsdGgiLCJza2lsbHNQYW5lbCIsInNraWxsc0VsZW1lbnRzIiwic2tpbGwxIiwic2tpbGwyIiwic2tpbGwzIiwic2tpbGw0Iiwic2tpbGw1Iiwic2tpbGw2Iiwic2tpbGw3Iiwic2tpbGw4Iiwic2tpbGw5Iiwic2tpbGwxMCIsImFsbFNraWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWxlY3RTa2lsbCIsInNraWxsX2lkIiwic2tpbGwiLCJpY29uRWxlbWVudCIsInZla29FbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwiaWNvbiIsInZhbHVlIiwiY29udGFpbnMiLCJhY3RpdmUiLCJpc0FjdGl2ZSIsInRvcDEwRWxlbWVudCIsInRvcDEwQ29udGVudEVsZW1lbnQiLCJyaWdodCIsIkFycmF5IiwiaXNBcnJheSIsImNvbnRlbnQiLCJzY29yZSIsIkNIQVJBQ1RFUl9ERUZBVUxUIiwiTUFYX0hFQUxUSCIsIlVuaXQiLCJpc0hlcm8iLCJlZmZlY3RzIiwidXBkYXRlRWZmZWN0cyIsImV4aXN0c0VmZmVjdCIsImVmZmVjdElEIiwia2lsbCIsImRyYXdTaGFkb3ciLCJkcmF3TmFtZSIsImRyYXdWb2x1bWUiLCJ2b2x1bWVXaWR0aCIsInZvbHVtZUhlaWdodCIsInZvbHVtZVgiLCJ2b2x1bWVZIiwicmVjdCIsInN0cm9rZSIsInBhZGRpbmdDb2xvciIsImZvbnQiLCJ0ZXh0V2lkdGgiLCJtZWFzdXJlVGV4dCIsInRleHRMZXZlbFdpZHRoIiwicGFkV2lkdGgiLCJseCIsImx5IiwiYXJjIiwiUEkiLCJmaWxsIiwiZmlsbFRleHQiLCJzaGFkb3dDb2xvcjEiLCJzaGFkb3dDb2xvcjIiLCJzaGFkb3dDb2xvcjMiLCJlbGxpcHNlIiwidW5pdHMiLCJ1bml0c0FycmF5IiwibG9naW5fcGFuZWxFbGVtZW50IiwibG9naW5fZm9ybUVsZW1lbnQiLCJsb2dpbl9pbnB1dEVsZW1lbnQiLCJwYXNzd29yZF9pbnB1dEVsZW1lbnQiLCJ0aW1lb3V0IiwidGltZW91dF9wIiwidXNlckFjY291bnQiLCJjbGlja0hhbmRsZXIiLCJrZXl1cEhhbmRsZXIiLCJmb2N1cyIsIm9iaiIsImtleSIsInZhbGlkYXRlIiwiYWNjb3VudERhdGEiLCJ0ZXN0IiwiZGVmYXVsdFZhbHVlIiwiYmFja2dyb3VuZENvbG9yIiwiY2xlYXJUaW1lb3V0Iiwic291bmRzIiwicGxheUFsbCIsInNfZG9jIiwic19wcm9mIiwic19nb2IiLCJzX2dpcmwiLCJzX2Jsb25kIiwic19tYWciLCJzX3RlbGVwb3J0Iiwic19jb2lucyIsInRfdHJlZXMiLCJ0X2J1c2hzIiwidF9wbGFudHMiLCJzX3BvaW50ZXIiLCJzX2Jvb20iLCJzX2Jvb20xIiwic19ib29tMiIsInNfYmFyaWVyIiwic19zaGllbGQiLCJzX3B1c2giLCJzX2NyeXN0YWxzIiwic19za2VsZXRvbiIsInNfa2F0eSIsInNfbGV2b24iLCJzX3ZpdGFseSIsInRfY29vbF9wbGFudHMiLCJ0X2FuZHN0b25lcyIsInNfYmxhY2tib29tIiwic19mcmVlemUiLCJzX2tyb2tvIiwic19rb2lsIiwic19kZWFkIiwic19ndW5uZXIiLCJzX2p1ayIsImV4cG9ydHMiLCJkb2MiLCJwcm9mIiwiZ29iIiwiZ2lybCIsImJsb25kIiwibWFnIiwiY29pbl9nb2xkIiwiY29pbl9zaWx2ZXIiLCJjb2luX2NvcHBlciIsImdyYXNzIiwidHJlZXMiLCJidXNocyIsImRlc2VydCIsImJlbHdvb2QiLCJ0ZWxlcG9ydCIsInBvaW50ZXIiLCJib29tIiwiYm9vbTEiLCJib29tMiIsImJhcmllciIsInNoaWVsZCIsInB1c2gxIiwiQ1JZU1RBTF9XSURUSCIsIkNSWVNUQUxfSEVJR0hUIiwiYmx1ZV9jcnlzdGFsIiwiZ3JlZW5fY3J5c3RhbCIsImdyZXlfY3J5c3RhbCIsInJlZF9jcnlzdGFsIiwibWFnZW50YV9jcnlzdGFsIiwieWVsbG93X2NyeXN0YWwiLCJza2VsZXRvbiIsImthdHkiLCJsZXZvbiIsInZpdGFseSIsImNvb2xfcGxhbnRzIiwiZGVhZF9wbGFudHMiLCJhbmRzdG9uZXMiLCJibGFja2Jvb20iLCJibGFja2Jvb21fYmlnIiwiZnJlZXplIiwia3Jva28iLCJrb2lsIiwiZGVhZCIsImd1bm5lciIsImp1ayIsInNfZ3JhdmVzIiwic19jYW1wZmlyZSIsImdyYXZlcyIsImNhbXBmaXJlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ25FZSxFQUFDQSxRQUFELEVBQU1DLFFBQU4sRUFBV0MsZ0JBQVgsRTs7O0FBRWYsU0FBU0YsR0FBVCxHQUFlO0FBQ1gsUUFDSSxDQUFDRyxhQUFhQyxPQUFiLENBQXFCLG9CQUFyQixDQUFELElBQ0EsQ0FBQ0QsYUFBYUMsT0FBYixDQUFxQix1QkFBckIsQ0FGTCxFQUlJLE9BQU8sSUFBUDs7QUFFSixXQUFPO0FBQ0hDLGVBQU9GLGFBQWFDLE9BQWIsQ0FBcUIsb0JBQXJCLENBREo7QUFFSEUsa0JBQVVILGFBQWFDLE9BQWIsQ0FBcUIsdUJBQXJCO0FBRlAsS0FBUDtBQUlIOztBQUVELFNBQVNILEdBQVQsQ0FBYU0sT0FBYixFQUFzQjtBQUNsQkosaUJBQWFLLE9BQWIsQ0FBcUIsb0JBQXJCLEVBQTJDRCxRQUFRRixLQUFuRDtBQUNBRixpQkFBYUssT0FBYixDQUFxQix1QkFBckIsRUFBOENELFFBQVFELFFBQXREO0FBQ0g7O0FBRUQsU0FBU0osT0FBVCxHQUFtQjtBQUNmQyxpQkFBYU0sVUFBYixDQUF3QixvQkFBeEI7QUFDQU4saUJBQWFNLFVBQWIsQ0FBd0IsdUJBQXhCO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJEOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUMsYUFBYSxFQUFuQjs7QUFFQSxJQUFNQyxnQkFBZ0IsRUFBdEI7O0FBRUEsS0FBSSxJQUFJQyxFQUFSLHVCQUFzQjtBQUNsQkMsUUFBSUQsRUFBSixFQUFRLGtCQUFRQSxFQUFSLENBQVI7QUFDSDtBQUNELEtBQUksSUFBSUUsU0FBUiwwQkFBZ0M7QUFDNUIsU0FBSSxJQUFJRixNQUFHLENBQVgsRUFBY0EsTUFBRyxxQkFBV0UsU0FBWCxFQUFzQkMsTUFBdkMsRUFBOENILEtBQTlDLEVBQW1EO0FBQy9DSSxpQkFBU0YsU0FBVCxFQUFvQkYsR0FBcEIsRUFBd0IscUJBQVdFLFNBQVgsRUFBc0JGLEdBQXRCLENBQXhCO0FBQ0g7QUFDSjs7a0JBRWMsRUFBQ1osUUFBRCxFQUFNaUIsc0JBQU4sRTs7O0FBRWYsU0FBU2pCLEdBQVQsQ0FBYWtCLEVBQWIsRUFBaUI7QUFDYixXQUFPUixXQUFXUSxFQUFYLENBQVA7QUFDSDs7QUFFRCxTQUFTRCxVQUFULENBQW9CRSxLQUFwQixFQUEyQkQsRUFBM0IsRUFBK0I7QUFDM0IsV0FBT1AsY0FBY1EsS0FBZCxFQUFxQkQsRUFBckIsQ0FBUDtBQUNIOztBQUVELFNBQVNMLEdBQVQsQ0FBYUssRUFBYixFQUFpQkUsTUFBakIsRUFBeUI7QUFDckJWLGVBQVdRLEVBQVgsSUFBaUIsd0JBQWNFLE1BQWQsQ0FBakI7QUFDSDs7QUFFRCxTQUFTSixRQUFULENBQWtCRyxLQUFsQixFQUF5QkQsRUFBekIsRUFBNkJFLE1BQTdCLEVBQXFDO0FBQ2pDLFFBQUdELFNBQVNSLGFBQVQsS0FBeUIsS0FBNUIsRUFBa0M7QUFDOUJBLHNCQUFjUSxLQUFkLElBQXVCLEVBQXZCO0FBQ0g7QUFDRFIsa0JBQWNRLEtBQWQsRUFBcUJFLElBQXJCLENBQTBCLHdCQUFjRCxNQUFkLENBQTFCO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ00sSUFDSEUsb0JBQU0sRUFESDtBQUFBLElBRUhDLDhCQUFXLE9BQUtELEdBRmI7QUFBQSxJQUVrQjtBQUNyQkUsc0JBQU9ELFdBQVMsSUFIYixDLENBR2tCLFk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIekI7OztJQUdxQkUsUztBQUVqQix1QkFBWUwsTUFBWixFQUFvQk0sS0FBcEIsRUFBMkJDLE1BQTNCLEVBQWtDO0FBQUE7O0FBQzlCLGFBQUtQLE1BQUwsR0FBY0EsTUFBZDs7QUFFQSxhQUFLTSxLQUFMLEdBQWFBLFNBQVNOLE9BQU9NLEtBQTdCO0FBQ0EsYUFBS0MsTUFBTCxHQUFjQSxVQUFVUCxPQUFPTyxNQUEvQjtBQUNIOztBQUdEOzs7Ozs7Ozs7Ozs7Ozs2QkFVS0MsTyxFQUFTQyxDLEVBQUdDLEMsRUFBR0MsSyxFQUFPQyxRLEVBQVVOLEssRUFBT0MsTSxFQUFPOztBQUUvQyxnQkFBRyxDQUFDSSxLQUFELElBQVUsQ0FBQyxLQUFLWCxNQUFMLENBQVlhLE1BQVosQ0FBbUJGLEtBQW5CLENBQWQsRUFBd0M7QUFDcENBLHdCQUFRLFNBQVI7QUFDSDtBQUNELGdCQUFHLENBQUNDLFFBQUosRUFBY0EsV0FBVyxDQUFYOztBQUVkLGdCQUFHLENBQUMsS0FBS1osTUFBTCxDQUFZYSxNQUFaLENBQW1CRixLQUFuQixDQUFELElBQThCLENBQUMsS0FBS1gsTUFBTCxDQUFZYSxNQUFaLENBQW1CRixLQUFuQixFQUEwQkMsUUFBMUIsQ0FBbEMsRUFBdUU7O0FBRXZFLGdCQUFJRSxLQUFLTCxDQUFUO0FBQUEsZ0JBQVlNLEtBQUtMLENBQWpCO0FBQ0EsZ0JBQUcsS0FBS1YsTUFBTCxDQUFZZ0IsR0FBWixJQUFpQkMsU0FBcEIsRUFBOEI7QUFDMUJGLHNCQUFNLEtBQUtmLE1BQUwsQ0FBWWdCLEdBQWxCO0FBQ0g7QUFDRCxnQkFBRyxLQUFLaEIsTUFBTCxDQUFZa0IsSUFBWixJQUFrQkQsU0FBckIsRUFBK0I7QUFDM0JILHNCQUFNLEtBQUtkLE1BQUwsQ0FBWWtCLElBQWxCO0FBQ0g7O0FBRUQ7QUFDQSxnQkFBR0osS0FBSyxLQUFLUixLQUFWLEdBQWtCLENBQWxCLElBQXVCUSxLQUFLTixRQUFRVyxNQUFSLENBQWViLEtBQTNDLElBQW9EUyxLQUFLLEtBQUtSLE1BQVYsR0FBbUIsQ0FBdkUsSUFBNEVRLEtBQUtQLFFBQVFXLE1BQVIsQ0FBZVosTUFBbkcsRUFBMkc7O0FBR3ZHO0FBQ0EscUJBQUthLFNBQUwsQ0FDSVosT0FESixFQUVJLEtBQUtSLE1BQUwsQ0FBWXFCLEtBRmhCLEVBR0ksS0FBS3JCLE1BQUwsQ0FBWWEsTUFBWixDQUFtQkYsS0FBbkIsRUFBMEJDLFFBQTFCLENBSEosRUFJSUUsRUFKSixFQUtJQyxFQUxKLEVBTUksS0FBS1QsS0FOVCxFQU9JLEtBQUtDLE1BUFQ7QUFTSDtBQUNKOztBQUdEOzs7Ozs7Ozs7Ozs7a0NBU1VDLE8sRUFBU2EsSyxFQUFPckIsTSxFQUFRUyxDLEVBQUdDLEMsRUFBR0osSyxFQUFPQyxNLEVBQU87O0FBRWxELGdCQUFHRCxRQUFNLENBQU4sSUFBV0MsU0FBTyxDQUFyQixFQUF3Qjs7QUFFcEIsb0JBQUllLFNBQVN0QixPQUFPTSxLQUFQLEdBQWVBLEtBQTVCO0FBQUEsb0JBQ0lpQixTQUFTdkIsT0FBT08sTUFBUCxHQUFnQkEsTUFEN0I7O0FBR0Esb0JBQUlpQixLQUFLeEIsT0FBT1MsQ0FBaEI7QUFBQSxvQkFBbUJnQixLQUFLekIsT0FBT1UsQ0FBL0I7QUFBQSxvQkFBa0NnQixLQUFLMUIsT0FBT00sS0FBOUM7QUFBQSxvQkFBcURxQixLQUFLM0IsT0FBT08sTUFBakU7QUFDQSxvQkFBSXFCLEtBQUtuQixDQUFUO0FBQUEsb0JBQVlvQixLQUFLbkIsQ0FBakI7QUFBQSxvQkFBb0JvQixLQUFLeEIsS0FBekI7QUFBQSxvQkFBZ0N5QixLQUFLeEIsTUFBckM7O0FBRUEsb0JBQUlFLElBQUksQ0FBUixFQUFXO0FBQ1BtQix5QkFBSyxDQUFMO0FBQ0FFLHlCQUFLeEIsUUFBUUcsQ0FBYjtBQUNBZSwwQkFBTVEsS0FBS0MsS0FBTCxDQUFXeEIsSUFBSWEsTUFBZixDQUFOO0FBQ0FJLHlCQUFLTSxLQUFLQyxLQUFMLENBQVdILEtBQUtSLE1BQWhCLENBQUw7QUFDSDtBQUNELG9CQUFJWixJQUFJLENBQVIsRUFBVztBQUNQbUIseUJBQUssQ0FBTDtBQUNBRSx5QkFBS3hCLFNBQVNHLENBQWQ7QUFDQWUsMEJBQU1PLEtBQUtDLEtBQUwsQ0FBV3ZCLElBQUlhLE1BQWYsQ0FBTjtBQUNBSSx5QkFBS0ssS0FBS0MsS0FBTCxDQUFXRixLQUFLUixNQUFoQixDQUFMO0FBQ0g7O0FBRUQsb0JBQUlPLEtBQUt0QixRQUFRVyxNQUFSLENBQWViLEtBQWYsR0FBdUJzQixFQUFoQyxFQUFvQztBQUNoQ0UseUJBQUt0QixRQUFRVyxNQUFSLENBQWViLEtBQWYsR0FBdUJzQixFQUE1QjtBQUNBRix5QkFBS00sS0FBS0MsS0FBTCxDQUFXSCxLQUFLUixNQUFoQixDQUFMO0FBQ0g7O0FBRUQsb0JBQUlTLEtBQUt2QixRQUFRVyxNQUFSLENBQWVaLE1BQWYsR0FBd0JzQixFQUFqQyxFQUFxQztBQUNqQ0UseUJBQUt2QixRQUFRVyxNQUFSLENBQWVaLE1BQWYsR0FBd0JzQixFQUE3QjtBQUNBRix5QkFBS0ssS0FBS0MsS0FBTCxDQUFXRixLQUFLUixNQUFoQixDQUFMO0FBQ0g7O0FBRUQ7QUFDQSxvQkFBR0csS0FBRyxDQUFILElBQU1DLEtBQUcsQ0FBVCxJQUFZRyxLQUFHLENBQWYsSUFBa0JDLEtBQUcsQ0FBeEIsRUFBMkI7O0FBRXZCdkIsNEJBQVEwQixTQUFSLENBQ0liLEtBREosRUFFSUcsRUFGSixFQUdJQyxFQUhKLEVBSUlDLEVBSkosRUFLSUMsRUFMSixFQU1JQyxFQU5KLEVBT0lDLEVBUEosRUFRSUMsRUFSSixFQVNJQyxFQVRKO0FBV0g7QUFDSjtBQUNKOzs7Ozs7a0JBakhnQjFCLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmpCLG9CQUFZOEIsR0FBWixFQUFpQkMsTUFBakIsRUFBd0I7QUFBQTs7QUFDcEIsYUFBS0EsTUFBTCxHQUFjQSxVQUFVLEdBQXhCO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQyxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFDQSxhQUFLRixLQUFMLENBQVdELE1BQVgsR0FBb0IsS0FBS0EsTUFBekI7QUFDQSxhQUFLQyxLQUFMLENBQVdGLEdBQVgsR0FBaUJBLEdBQWpCO0FBQ0EsYUFBS0UsS0FBTCxDQUFXRyxZQUFYLENBQXdCLFNBQXhCLEVBQW1DLE1BQW5DO0FBQ0EsYUFBS0gsS0FBTCxDQUFXRyxZQUFYLENBQXdCLFVBQXhCLEVBQW9DLE1BQXBDO0FBQ0EsYUFBS0gsS0FBTCxDQUFXSSxLQUFYLENBQWlCQyxPQUFqQixHQUEyQixNQUEzQjtBQUNBSixpQkFBU0ssSUFBVCxDQUFjQyxXQUFkLENBQTBCLEtBQUtQLEtBQS9CO0FBQ0g7Ozs7K0JBQ0s7QUFDRixnQkFBRyxLQUFLQSxLQUFMLENBQVdRLFdBQVgsR0FBeUIsQ0FBNUIsRUFBK0I7QUFDM0IscUJBQUtSLEtBQUwsQ0FBV1MsS0FBWDtBQUNBLHFCQUFLVCxLQUFMLENBQVdRLFdBQVgsR0FBeUIsQ0FBekI7QUFDSDs7QUFFRCxpQkFBS1IsS0FBTCxDQUFXVSxJQUFYO0FBQ0g7OzsrQkFDSztBQUNGLGlCQUFLVixLQUFMLENBQVdTLEtBQVg7QUFDSDs7OytCQUVLO0FBQ0YsaUJBQUtULEtBQUwsQ0FBV0QsTUFBWCxHQUFvQixHQUFwQjtBQUNBLGlCQUFLQyxLQUFMLENBQVdVLElBQVg7QUFDQSxpQkFBS1YsS0FBTCxDQUFXUyxLQUFYO0FBQ0EsaUJBQUtULEtBQUwsQ0FBV0QsTUFBWCxHQUFvQixLQUFLQSxNQUF6QjtBQUNBLGlCQUFLQyxLQUFMLENBQVdRLFdBQVgsR0FBeUIsQ0FBekI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJMOzs7Ozs7a0JBR2UsRUFBQ0csZ0NBQUQsRSxFQVJmOzs7O0FBSUEsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7Ozs7QUFLQSxJQUFNQyxvQkFBb0JYLFNBQVNZLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBMUI7O2tCQUdlLEVBQUNDLFVBQUQsRUFBT0MsVUFBUCxFOzs7QUFHZixTQUFTRCxJQUFULENBQWNFLEtBQWQsRUFBcUI7QUFDakIsUUFBR0EsS0FBSCxFQUFTO0FBQ0wsWUFBSUMsZUFBZUwsa0JBQWtCTSxhQUFsQixDQUFnQyxRQUFoQyxDQUFuQjtBQUNBLFlBQUdELFlBQUgsRUFBZ0I7QUFDWkEseUJBQWFFLFNBQWIsR0FBeUJILEtBQXpCO0FBQ0g7QUFDSjtBQUNESixzQkFBa0JSLEtBQWxCLENBQXdCQyxPQUF4QixHQUFrQyxPQUFsQztBQUNIOztBQUVELFNBQVNVLElBQVQsR0FBZ0I7QUFDWkgsc0JBQWtCUixLQUFsQixDQUF3QkMsT0FBeEIsR0FBa0MsTUFBbEM7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkQ7Ozs7QUFFQTs7OztBQUVBOzs7O0FBRUE7Ozs7OztBQVRBOzs7a0JBWWUsRUFBQ2UsVUFBRCxFQUFPaEUsUUFBUCxFQUFZaUUsTUFBWixFQUFnQkMsUUFBaEIsRUFBcUJDOztBQUVwQztBQUZlLEM7QUFHZixJQUFJQyxlQUFlLElBQW5COztBQUVBLElBQUlDLFNBQVMsS0FBYjs7QUFHQTs7O0FBR0EsU0FBU0wsSUFBVCxDQUFjTSxRQUFkLEVBQXdCOztBQUVwQjtBQUNBLFFBQUcsQ0FBQ0YsWUFBSixFQUFrQjtBQUNkQSx1QkFBZSxzQkFBRyw4QkFBSCxDQUFmO0FBQ0g7O0FBRUQsd0JBQUksd0JBQUo7QUFDQUEsaUJBQWFHLE9BQWI7O0FBRUFOLE9BQUcsUUFBSCxFQUFhLFVBQUNPLFNBQUQsRUFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBeUI7O0FBRWxDLFlBQUlELFNBQVMsT0FBYixFQUFzQjtBQUNsQjtBQUNBLGdCQUFJLENBQUNKLE1BQUwsRUFBYTs7QUFFVCxvQkFBR0ssS0FBS0MsT0FBTCxJQUFnQkQsS0FBS0MsT0FBTCxJQUFnQixJQUFuQyxFQUF5Qzs7QUFFckM7QUFDQSxxQ0FBT0MsS0FBUCxDQUFhLFVBQVVsRixPQUFWLEVBQW1COztBQUU1QjtBQUNBTSw0QkFBSSxPQUFKLEVBQWFOLE9BQWI7O0FBRUE7QUFDQXVFLDJCQUFHLFFBQUgsRUFBYSxVQUFDTyxTQUFELEVBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQTJCO0FBQ3BDLGdDQUFJRCxTQUFTLFNBQWIsRUFBd0I7QUFDcEJKLHlDQUFTLElBQVQ7QUFDQUgsb0NBQUksUUFBSjtBQUNBSTtBQUNIO0FBQ0oseUJBTkQ7QUFPSCxxQkFiRDtBQWVILGlCQWxCRCxNQW1CSTtBQUNBLGlDQUFHZixVQUFILENBQWNHLElBQWQsQ0FBbUIsYUFBbkI7QUFDSDtBQUNKO0FBQ0o7QUFFSixLQS9CRDs7QUFpQ0E7QUFDQVUsaUJBQWFILEVBQWIsQ0FBZ0IsZUFBaEIsRUFBaUMsWUFBWTtBQUN6Qyw0QkFBSSw4QkFBSjtBQUNILEtBRkQ7O0FBS0FHLGlCQUFhSCxFQUFiLENBQWdCLFlBQWhCLEVBQThCLFlBQVk7QUFDdEMsNEJBQUksZ0NBQUo7QUFDQSw0QkFBSSx5QkFBSjs7QUFFQSxxQkFBR1YsVUFBSCxDQUFjRyxJQUFkO0FBQ0FXLGlCQUFTLEtBQVQ7O0FBRUFRLG1CQUFXLFlBQVk7QUFDbkJiLGlCQUFLTSxRQUFMO0FBQ0gsU0FGRCxFQUVHLElBRkg7QUFHSCxLQVZEOztBQWFBTCxPQUFHLGdCQUFILEVBQXFCLFlBQU07QUFDdkIsNEJBQUkseUJBQUo7O0FBRUE7QUFDQSxxQkFBR1YsVUFBSCxDQUFjRyxJQUFkO0FBQ0gsS0FMRDtBQU9IOztBQUdELElBQU1vQixXQUFXLEVBQWpCOztBQUVBOzs7OztBQUtBLFNBQVM5RSxHQUFULENBQWF3RSxTQUFiLEVBQXdCRSxJQUF4QixFQUE4Qjs7QUFFMUI7QUFDQUssZ0JBQVlQLFNBQVosRUFBdUJFLElBQXZCOztBQUVBO0FBQ0FOLGlCQUFhWSxJQUFiLENBQWtCUixTQUFsQixFQUE2QkUsSUFBN0I7QUFDSDs7QUFHRCxTQUFTVCxFQUFULENBQVlPLFNBQVosRUFBdUJGLFFBQXZCLEVBQWlDOztBQUU3QjtBQUNBLFFBQUdFLGFBQWFNLFFBQWIsS0FBd0IsS0FBM0IsRUFBaUM7QUFDN0JBLGlCQUFTTixTQUFULElBQXNCLEVBQXRCO0FBQ0g7QUFDRE0sYUFBU04sU0FBVCxFQUFvQmhFLElBQXBCLENBQXlCOEQsUUFBekI7O0FBR0FGLGlCQUFhSCxFQUFiLENBQWdCTyxTQUFoQixFQUEyQixVQUFDRSxJQUFELEVBQVE7QUFDL0IsWUFBRztBQUNDQSxtQkFBT08sS0FBS0MsS0FBTCxDQUFXUixJQUFYLENBQVA7QUFDSCxTQUZELENBR0EsT0FBT1MsQ0FBUCxFQUFTLENBQUU7QUFDWCxZQUFJVixPQUFPQyxLQUFLRCxJQUFMLEdBQVlDLEtBQUtELElBQWpCLEdBQXdCLFFBQW5DOztBQUVBO0FBQ0FDLGFBQUtVLE9BQUwsSUFBZ0Isb0JBQUlWLEtBQUtVLE9BQVQsQ0FBZ0Isc0NBQWhCLENBQWhCOztBQUVBO0FBQ0E7O0FBRUFkLGlCQUFTRSxTQUFULEVBQW9CQyxJQUFwQixFQUEwQkMsSUFBMUI7QUFDSCxLQWREO0FBZUg7O0FBRUQsU0FBU1IsR0FBVCxDQUFhTSxTQUFiLEVBQXdCYSxPQUF4QixFQUFpQztBQUM3QixRQUFHYixhQUFhTSxRQUFiLElBQXlCQSxTQUFTTixTQUFULE1BQXNCYSxPQUFsRCxFQUEwRDtBQUN0RCxlQUFPUCxTQUFTTixTQUFULENBQVA7QUFDSDs7QUFFREosaUJBQWFGLEdBQWIsQ0FBaUJNLFNBQWpCLEVBQTRCYSxPQUE1QjtBQUNIOztBQUdEO0FBQ0EsU0FBU04sV0FBVCxDQUFxQlAsU0FBckIsRUFBZ0NFLElBQWhDLEVBQXNDO0FBQ2xDO0FBQ0EsUUFBR0YsYUFBYU0sUUFBaEIsRUFBeUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDckIsaUNBQWVBLFNBQVNOLFNBQVQsQ0FBZiw4SEFBbUM7QUFBQSxvQkFBekJjLENBQXlCOztBQUMvQkEsa0JBQUVkLFNBQUYsRUFBYUUsSUFBYjtBQUNIO0FBSG9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJeEI7QUFDSjs7QUFHRCxTQUFTUCxVQUFULEdBQXNCO0FBQ2xCQyxpQkFBYW1CLEtBQWI7QUFDSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoS0Q7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7QUFHQTs7OztrQkFJZSxFQUFDQzs7QUFHWjs7O0FBSFcsQztBQU1YLFNBQVNBLEdBQVQsR0FBZTs7QUFFWDtBQUNBLGlCQUFHakMsVUFBSCxDQUFjRyxJQUFkLENBQW1CLFlBQW5COztBQUdBO0FBQ0EscUJBQU9NLElBQVAsQ0FBWSxZQUFZOztBQUVwQjs7QUFFQTtBQUNBLHdCQUFVWSxLQUFWLENBQWdCLGFBQUs7O0FBRWpCYTtBQUNILFNBSEQ7QUFJSCxLQVREO0FBYUg7O0FBR0QsU0FBU0EsUUFBVCxHQUFtQjtBQUNmLGlCQUFHbEMsVUFBSCxDQUFjRyxJQUFkLENBQW1CLFdBQW5CO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7QUMxQ0w7Ozs7OztBQUVBZ0MsT0FBT0MsTUFBUCxHQUFnQixZQUFVOztBQUV0QixtQkFBS0gsR0FBTDtBQUVILENBSkQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7O2tCQUdlSSxHOzs7QUFFZixJQUFNQyxRQUFRaEQsU0FBU1ksY0FBVCxDQUF3QixNQUF4QixDQUFkOztBQUVBLFNBQVNtQyxHQUFULENBQWFFLEdBQWIsRUFBa0I7QUFDZEQsVUFBTTlCLFNBQU4sSUFBbUIsc0JBQW9CK0IsR0FBcEIsR0FBd0IsUUFBM0M7QUFDQUQsVUFBTUUsYUFBTixDQUFvQkMsU0FBcEIsR0FBZ0NILE1BQU1JLFlBQXRDO0FBQ0FDLFlBQVFOLEdBQVIsQ0FBWUUsR0FBWjtBQUNILEU7Ozs7Ozs7Ozs7O0FDWEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCLHNDQUFzQzs7QUFFaEUsa0JBQWtCLGdCQUFnQjtBQUNsQyxnQkFBZ0IsY0FBYztBQUM5QixvQkFBb0IsYUFBYTs7QUFFakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUztBQUN0QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ2xFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQy9GRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsZ0JBQWdCO0FBQzNCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMsU0FBUztBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsT0FBTztBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3R1QkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFVBQVU7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0T0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGlEQUFpRDtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDJEQUEyRDtBQUMzRDtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUNBOzs7Ozs7Ozs7Ozs7QUNwUEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3UkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsS0FBSyxZQUFZO0FBQ2pCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxTQUFTO0FBQ3RCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGFBQWEsOEJBQThCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoT0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4REFBOEQsZ0JBQWdCO0FBQzlFOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLHlCQUF5QjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZCxLQUFLO0FBQ0wsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsZ0JBQWdCO0FBQzlDLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CLG9DQUFvQztBQUNwRTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtDQUFrQyxPQUFPO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLFlBQVk7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsbURBQW1EO0FBQ25ELEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCO0FBQ3JCO0FBQ0EsT0FBTyxPQUFPO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLEVBQUU7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUM1bEJBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTTtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O3NEQ2xCQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFBQTtBQUNILEVBQUUsMENBWUY7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzlQRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ1RBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZKQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlHQUF5RyxJQUFJLEdBQUcsSUFBSSxTQUFTLElBQUk7O0FBRWpJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTtBQUN4RTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RSxrRkFBa0Y7QUFDbEY7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUcsT0FBTztBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNqQkE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBd0M7QUFDeEMsS0FBSyx5QkFBeUI7QUFDOUIscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsS0FBSyxtREFBbUQ7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCLHNCQUFzQjtBQUN0Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1o7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLG9CQUFvQjtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RaQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FB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TixtQkFBVyxDQUNQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFETyxFQUVQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssQ0FBekIsRUFBNEIsS0FBSyxHQUFqQyxFQUFzQyxTQUFTLEVBQS9DLEVBQW1ELFVBQVUsRUFBN0QsRUFGTyxFQUdQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFITyxFQUlQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxFQUFuQyxFQUF1QyxTQUFTLEVBQWhELEVBQW9ELFVBQVUsRUFBOUQsRUFKTyxFQUtQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFMTyxFQU1QLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFOTyxFQU9QLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFQTyxFQVFQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxHQUFuQyxFQUF3QyxTQUFTLEVBQWpELEVBQXFELFVBQVUsRUFBL0QsRUFSTyxFQVNQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssRUFBekIsRUFBNkIsS0FBSyxHQUFsQyxFQUF1QyxTQUFTLEVBQWhELEVBQW9ELFVBQVUsRUFBOUQsRUFUTyxFQVVQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxFQUFuQyxF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USxTQUFULEVBQW9CLEtBQUssRUFBekIsRUFBNkIsS0FBSyxDQUFsQyxFQUFxQyxTQUFTLEVBQTlDLEVBQWtELFVBQVUsRUFBNUQsRUFGbUUsRUFHbkUsRUFBQyxRQUFRLFNBQVQsRUFBb0IsS0FBSyxHQUF6QixFQUE4QixLQUFLLENBQW5DLEVBQXNDLFNBQVMsRUFBL0MsRUFBbUQsVUFBVSxFQUE3RCxFQUhtRSxFQUluRSxFQUFDLFFBQVEsU0FBVCxFQUFvQixLQUFLLEdBQXpCLEVBQThCLEtBQUssQ0FBbkMsRUFBc0MsU0FBUyxFQUEvQyxFQUFtRCxVQUFVLEVBQTdELEVBSm1FLEVBS25FLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxDQUFuQyxFQUFzQyxTQUFTLEVBQS9DLEVBQW1ELFVBQVUsRUFBN0QsRUFMbUUsQ0FBWixFQUEzRCxFQURlLENBQW5COztBQVVBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQSxlIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGRlZmF1bHQge2dldCwgc2V0LCBzaWdub3V0fVxuXG5mdW5jdGlvbiBnZXQoKSB7XG4gICAgaWYoXG4gICAgICAgICFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZV9hY2NvdW50X2xvZ2luJykgfHxcbiAgICAgICAgIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnKVxuICAgIClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsb2dpbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicpLFxuICAgICAgICBwYXNzd29yZDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWVfYWNjb3VudF9wYXNzd29yZCcpLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHNldChhY2NvdW50KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dhbWVfYWNjb3VudF9sb2dpbicsIGFjY291bnQubG9naW4pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lX2FjY291bnRfcGFzc3dvcmQnLCBhY2NvdW50LnBhc3N3b3JkKTtcbn1cblxuZnVuY3Rpb24gc2lnbm91dCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ2FtZV9hY2NvdW50X2xvZ2luJyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dhbWVfYWNjb3VudF9wYXNzd29yZCcpO1xufSIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vZW5naW5lL2NoYXJhY3Rlci5qc1wiO1xuaW1wb3J0IHNwcml0ZXMgZnJvbSBcIi4vc3ByaXRlc1wiO1xuaW1wb3J0IHNwcml0ZXNldHMgZnJvbSBcIi4vc3ByaXRlc2V0c1wiO1xuXG5jb25zdCBjaGFyYWN0ZXJzID0ge307XG5cbmNvbnN0IGNoYXJhY3RlcnNldHMgPSB7fTtcblxuZm9yKGxldCBpZCBpbiBzcHJpdGVzKXtcbiAgICBhZGQoaWQsIHNwcml0ZXNbaWRdKTtcbn1cbmZvcihsZXQgc3ByaXRlX2lkIGluIHNwcml0ZXNldHMpe1xuICAgIGZvcihsZXQgaWQ9MDsgaWQ8c3ByaXRlc2V0c1tzcHJpdGVfaWRdLmxlbmd0aDtpZCsrKXtcbiAgICAgICAgYWRkVG9TZXQoc3ByaXRlX2lkLCBpZCwgc3ByaXRlc2V0c1tzcHJpdGVfaWRdW2lkXSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7Z2V0LCBnZXRGcm9tU2V0fVxuXG5mdW5jdGlvbiBnZXQoSUQpIHtcbiAgICByZXR1cm4gY2hhcmFjdGVyc1tJRF07XG59XG5cbmZ1bmN0aW9uIGdldEZyb21TZXQoc2V0SUQsIElEKSB7XG4gICAgcmV0dXJuIGNoYXJhY3RlcnNldHNbc2V0SURdW0lEXTtcbn1cblxuZnVuY3Rpb24gYWRkKElELCBzcHJpdGUpIHtcbiAgICBjaGFyYWN0ZXJzW0lEXSA9IG5ldyBDaGFyYWN0ZXIoc3ByaXRlKTtcbn1cblxuZnVuY3Rpb24gYWRkVG9TZXQoc2V0SUQsIElELCBzcHJpdGUpIHtcbiAgICBpZihzZXRJRCBpbiBjaGFyYWN0ZXJzZXRzPT09ZmFsc2Upe1xuICAgICAgICBjaGFyYWN0ZXJzZXRzW3NldElEXSA9IFtdO1xuICAgIH1cbiAgICBjaGFyYWN0ZXJzZXRzW3NldElEXS5wdXNoKG5ldyBDaGFyYWN0ZXIoc3ByaXRlKSk7XG59IiwiZXhwb3J0IGNvbnN0XG4gICAgRlBTID0gMzAsXG4gICAgSU5URVJWQUwgPSAxMDAwL0ZQUywgLy/QsiDQvNC40LvQu9C40YHQtdC60YPQvdC00LDRhVxuICAgIFNURVAgPSBJTlRFUlZBTC8xMDAwOy8v0LIg0YHQtdC60YPQvdC00LDRhVxuIiwiLyoqXG4gKiBAY2xhc3MgQ2hhcmFjdGVyIC0g0J/QtdGA0YHQvtC90LDQtlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJ7XG5cbiAgICBjb25zdHJ1Y3RvcihzcHJpdGUsIHdpZHRoLCBoZWlnaHQpe1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgc3ByaXRlLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCBzcHJpdGUuaGVpZ2h0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0J7RgtGA0LjRgdC+0LLQutCwINC/0LXRgNGB0L7QvdCw0LbQsFxuICAgICAqIEBwYXJhbSBjb250ZXh0IC0g0LrRg9C00LAg0YDQuNGB0YPQtdC8XG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB3aWR0aFxuICAgICAqIEBwYXJhbSBoZWlnaHRcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKiBAcGFyYW0gZnJhbWVOdW0gLSDQvdC+0LzQtdGAINC60LDQtNGA0LAg0LDQvdC40LzQsNGG0LjQuFxuICAgICAqL1xuICAgIGRyYXcoY29udGV4dCwgeCwgeSwgc3RhdGUsIGZyYW1lTnVtLCB3aWR0aCwgaGVpZ2h0KXtcblxuICAgICAgICBpZighc3RhdGUgfHwgIXRoaXMuc3ByaXRlLnN0YXRlc1tzdGF0ZV0pe1xuICAgICAgICAgICAgc3RhdGUgPSAnZGVmYXVsdCdcbiAgICAgICAgfVxuICAgICAgICBpZighZnJhbWVOdW0pIGZyYW1lTnVtID0gMDtcblxuICAgICAgICBpZighdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXSB8fCAhdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXVtmcmFtZU51bV0pIHJldHVybjtcblxuICAgICAgICBsZXQgX3ggPSB4LCBfeSA9IHk7XG4gICAgICAgIGlmKHRoaXMuc3ByaXRlLnRvcCE9dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIF95ICs9IHRoaXMuc3ByaXRlLnRvcDtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNwcml0ZS5sZWZ0IT11bmRlZmluZWQpe1xuICAgICAgICAgICAgX3ggKz0gdGhpcy5zcHJpdGUubGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0J7QsdGA0LXQt9C60LAg0L7RgtGA0LjRgdC+0LLQutC4INCy0L3QtSDQutCw0L3QstGLIFRPRE86INGA0LXQt9Cw0YLRjCDQv9C+INC60LDQvNC10YDQtVxuICAgICAgICBpZihfeCArIHRoaXMud2lkdGggPiAwICYmIF94IDwgY29udGV4dC5jYW52YXMud2lkdGggJiYgX3kgKyB0aGlzLmhlaWdodCA+IDAgJiYgX3kgPCBjb250ZXh0LmNhbnZhcy5oZWlnaHQpIHtcblxuXG4gICAgICAgICAgICAvLyDQoNC40YHRg9C10Lwg0LrQsNC00YBcbiAgICAgICAgICAgIHRoaXMuZHJhd0ZyYW1lKFxuICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuaW1hZ2UsXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXVtmcmFtZU51bV0sXG4gICAgICAgICAgICAgICAgX3gsXG4gICAgICAgICAgICAgICAgX3ksXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC60LDQtNGAINCw0L3QuNC80LDRhtC40LhcbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBzcHJpdGVcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHBhcmFtIHdpZHRoXG4gICAgICogQHBhcmFtIGhlaWdodFxuICAgICAqL1xuICAgIGRyYXdGcmFtZShjb250ZXh0LCBpbWFnZSwgc3ByaXRlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KXtcblxuICAgICAgICBpZih3aWR0aD4wICYmIGhlaWdodD4wKSB7XG5cbiAgICAgICAgICAgIGxldCBzY2FsZVggPSBzcHJpdGUud2lkdGggLyB3aWR0aCxcbiAgICAgICAgICAgICAgICBzY2FsZVkgPSBzcHJpdGUuaGVpZ2h0IC8gaGVpZ2h0O1xuXG4gICAgICAgICAgICBsZXQgc3ggPSBzcHJpdGUueCwgc3kgPSBzcHJpdGUueSwgc3cgPSBzcHJpdGUud2lkdGgsIHNoID0gc3ByaXRlLmhlaWdodDtcbiAgICAgICAgICAgIGxldCBkeCA9IHgsIGR5ID0geSwgZHcgPSB3aWR0aCwgZGggPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgICAgIGR4ID0gMDtcbiAgICAgICAgICAgICAgICBkdyA9IHdpZHRoICsgeDtcbiAgICAgICAgICAgICAgICBzeCAtPSBNYXRoLmZsb29yKHggKiBzY2FsZVgpO1xuICAgICAgICAgICAgICAgIHN3ID0gTWF0aC5mbG9vcihkdyAqIHNjYWxlWCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgICAgICAgICBkeSA9IDA7XG4gICAgICAgICAgICAgICAgZGggPSBoZWlnaHQgKyB5O1xuICAgICAgICAgICAgICAgIHN5IC09IE1hdGguZmxvb3IoeSAqIHNjYWxlWSk7XG4gICAgICAgICAgICAgICAgc2ggPSBNYXRoLmZsb29yKGRoICogc2NhbGVZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGR3ID4gY29udGV4dC5jYW52YXMud2lkdGggLSBkeCkge1xuICAgICAgICAgICAgICAgIGR3ID0gY29udGV4dC5jYW52YXMud2lkdGggLSBkeDtcbiAgICAgICAgICAgICAgICBzdyA9IE1hdGguZmxvb3IoZHcgKiBzY2FsZVgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGggPiBjb250ZXh0LmNhbnZhcy5oZWlnaHQgLSBkeSkge1xuICAgICAgICAgICAgICAgIGRoID0gY29udGV4dC5jYW52YXMuaGVpZ2h0IC0gZHk7XG4gICAgICAgICAgICAgICAgc2ggPSBNYXRoLmZsb29yKGRoICogc2NhbGVZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/QndC1INGA0LjRgdGD0LXQvCDRgSDRgNCw0LfQvNC10YDQvtC8INC80LXQvdGM0YjQtSDQuNC70Lgg0YDQsNCy0L3Ri9C8INC90YPQu9GOXG4gICAgICAgICAgICBpZihzdz4wJiZzaD4wJiZkdz4wJiZkaD4wKSB7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN4LFxuICAgICAgICAgICAgICAgICAgICBzeSxcbiAgICAgICAgICAgICAgICAgICAgc3csXG4gICAgICAgICAgICAgICAgICAgIHNoLFxuICAgICAgICAgICAgICAgICAgICBkeCxcbiAgICAgICAgICAgICAgICAgICAgZHksXG4gICAgICAgICAgICAgICAgICAgIGR3LFxuICAgICAgICAgICAgICAgICAgICBkaFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc3JjLCB2b2x1bWUpe1xuICAgICAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZSB8fCAwLjRcbiAgICAgICAgdGhpcy5zb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZC52b2x1bWUgPSB0aGlzLnZvbHVtZTtcbiAgICAgICAgdGhpcy5zb3VuZC5zcmMgPSBzcmM7XG4gICAgICAgIHRoaXMuc291bmQuc2V0QXR0cmlidXRlKFwicHJlbG9hZFwiLCBcImF1dG9cIik7XG4gICAgICAgIHRoaXMuc291bmQuc2V0QXR0cmlidXRlKFwiY29udHJvbHNcIiwgXCJub25lXCIpO1xuICAgICAgICB0aGlzLnNvdW5kLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnNvdW5kKTtcbiAgICB9XG4gICAgcGxheSgpe1xuICAgICAgICBpZih0aGlzLnNvdW5kLmN1cnJlbnRUaW1lID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZC5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5zb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNvdW5kLnBsYXkoKTtcbiAgICB9XG4gICAgc3RvcCgpe1xuICAgICAgICB0aGlzLnNvdW5kLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLnNvdW5kLnZvbHVtZSA9IDAuMDtcbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCk7XG4gICAgICAgIHRoaXMuc291bmQucGF1c2UoKTtcbiAgICAgICAgdGhpcy5zb3VuZC52b2x1bWUgPSB0aGlzLnZvbHVtZTtcbiAgICAgICAgdGhpcy5zb3VuZC5jdXJyZW50VGltZSA9IDA7XG4gICAgfVxufSIsIi8qKlxuICog0JjQvdGC0LXRgNGE0LXQudGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5cbi8vINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuaW1wb3J0IHdhaXRTY3JlZW4gZnJvbSAnLi93YWl0c2NyZWVuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IHt3YWl0U2NyZWVufSIsIi8qKlxuICog0K3QutGA0LDQvSDQt9Cw0LPRgNGD0LfQutC4XG4gKi9cblxuXG5jb25zdCB3YWl0U2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ1wiKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7c2hvdywgaGlkZX1cblxuXG5mdW5jdGlvbiBzaG93KHRpdGxlKSB7XG4gICAgaWYodGl0bGUpe1xuICAgICAgICBsZXQgdGl0bGVFbGVtZW50ID0gd2FpdFNjcmVlbkVsZW1lbnQucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgICAgIGlmKHRpdGxlRWxlbWVudCl7XG4gICAgICAgICAgICB0aXRsZUVsZW1lbnQuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2FpdFNjcmVlbkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG59XG5cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgd2FpdFNjcmVlbkVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xufVxuIiwiLyoqXG4gKiDQodC+0LHRi9GC0LjRjyDQuNCz0YDRi1xuICovXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ3MuanNcIjtcblxuaW1wb3J0IGlvIGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmltcG9ydCB1aSBmcm9tIFwiLi9lbmdpbmUvdWkvdWkuanNcIjtcblxuaW1wb3J0IHNpZ25JbiBmcm9tIFwiLi9zY2VuZXMvc2lnbmluXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQge2luaXQsIGFkZCwgb24sIG9mZiwgZGlzY29ubmVjdH1cblxuLy8g0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQuiDRgdC10YDQstC10YDRg1xubGV0IHNlcnZlclNvY2tldCA9IG51bGw7XG5cbmxldCBsb2dnZWQgPSBmYWxzZTtcblxuXG4vKipcbiAqINCY0L3QuNGC0LjQvCDQuNCz0YDQvtCy0YvQtSDRgdC+0LHRi9GC0LjRj1xuICovXG5mdW5jdGlvbiBpbml0KGNhbGxiYWNrKSB7XG5cbiAgICAvL9Cf0L7QtNC60LvRjtGH0LjQvNGB0Y8g0Log0YHQtdGA0LLQtdGA0YNcbiAgICBpZighc2VydmVyU29ja2V0KSB7XG4gICAgICAgIHNlcnZlclNvY2tldCA9IGlvKFwiaHR0cDovL3NlcnZlci5nYW1lcy5xLWRldi5ydVwiKTtcbiAgICB9XG5cbiAgICBsb2coJ9Cf0L7QtNC60LvRjtGH0LDQtdC80YHRjyDQuiDRgdC10YDQstC10YDRgycpO1xuICAgIHNlcnZlclNvY2tldC5jb25uZWN0KCk7XG5cbiAgICBvbihcInNlcnZlclwiLCAoZXZlbnROYW1lLCB0eXBlLCBkYXRhKT0+e1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcImhlbGxvXCIpIHtcbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0LXRidGRINC90LUg0LLQvtGI0LvQuFxuICAgICAgICAgICAgaWYgKCFsb2dnZWQpIHtcblxuICAgICAgICAgICAgICAgIGlmKGRhdGEudmVyc2lvbiAmJiBkYXRhLnZlcnNpb24gPD0gMC4xNCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8v0J/QvtC70YPRh9Cw0LXQvCDQvtGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjyDQsNC60LrQsNGD0L3RglxuICAgICAgICAgICAgICAgICAgICBzaWduSW4uc3RhcnQoZnVuY3Rpb24gKGFjY291bnQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQsNC60LrQsNGD0L3RgiDRgdC10YDQstC10YDRg1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkKCdsb2dpbicsIGFjY291bnQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9Cf0L7RgdC70LUg0YPRgdC/0LXRiNC90L7Qs9C+INCy0YXQvtC00LAgKNCV0YHQu9C4INC90LXRg9GB0L/QtdGI0L3Ri9C5IC0g0YHQtdGA0LLQtdGAINC+0L/Rj9GC0Ywg0L/QvtGI0LvQtdGCIGhlbGxvKVxuICAgICAgICAgICAgICAgICAgICAgICAgb24oJ2xvZ2dlZCcsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZignbG9nZ2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygn0JbQvNC4IEN0cmwtRjUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgLy8g0JTQtdC50YHRgtCy0LjRjyDQv9GA0Lgg0YHQtdGA0LLQtdGA0L3Ri9GFINC/0YDQvtCx0LvQtdC80LDRhVxuICAgIHNlcnZlclNvY2tldC5vbignY29ubmVjdF9lcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nKCfQntGI0LjQsdC60LAg0L/QvtC00LrQu9GO0YfQtdC90LjRjyDQuiDRgdC10YDQstC10YDRgycpO1xuICAgIH0pO1xuXG5cbiAgICBzZXJ2ZXJTb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nKCfQvtGCINGB0LXRgNCy0LXRgNCwINC/0L7RgdGC0YPQv9C40LsgZGlzY29ubmVjdCcpO1xuICAgICAgICBsb2coJ9CS0Ysg0L7RgtC60LvRjtGH0LXQvdGLINC+0YIg0YHQtdGA0LLQtdGA0LAnKTtcblxuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coKTtcbiAgICAgICAgbG9nZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbml0KGNhbGxiYWNrKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cblxuICAgIG9uKFwiYW5vdGhlci1jb21pbmdcIiwgKCkgPT4ge1xuICAgICAgICBsb2coJ9CS0Ysg0L7RgtC60LvRjtGH0LXQvdGLINC+0YIg0YHQtdGA0LLQtdGA0LAnKTtcblxuICAgICAgICAvL1RPRE86INCS0LzQtdGB0YLQviDRjdC60YDQsNC90LAg0L7QttC40LTQsNC90LjRjyAtINCe0LrQvdC+INGBINC60L3QvtC/0LrQvtC5IC0g0L/QvtC00LrQu9GO0YfQuNGC0YzRgdGPIC0g0L/QviDQutC+0YLQvtGA0L7QuSBpbml0KGNhbGxiYWNrKTtcbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCk7XG4gICAgfSk7XG5cbn1cblxuXG5jb25zdCBoYW5kbGVycyA9IHt9O1xuXG4vKipcbiAqINCU0L7QsdCw0LLQu9C10L3QuNC1INC40LPRgNC+0LLQvtCz0L4g0YHQvtCx0YvRgtC40Y9cbiAqIEBwYXJhbSBldmVudE5hbWVcbiAqIEBwYXJhbSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGFkZChldmVudE5hbWUsIGRhdGEpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC70L7QutCw0LvRjNC90YvQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4IC0g0LLRi9C30L7QstC10LxcbiAgICBydW5IYW5kbGVycyhldmVudE5hbWUsIGRhdGEpO1xuXG4gICAgLy8g0YjQu9C10Lwg0YHQvtCx0YvRgtC40LUg0L3QsCDRgdC10YDQstC10YBcbiAgICBzZXJ2ZXJTb2NrZXQuZW1pdChldmVudE5hbWUsIGRhdGEpXG59XG5cblxuZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuXG4gICAgLy/QodC+0YXRgNCw0L3QuNC8INC90LAg0YHQu9GD0YfQsNC5INC10YHQu9C4INGB0L7QsdGL0YLQuNGPINCy0L7Qt9C90LjQutC90YPRgiDQu9C+0LrQsNC70YzQvdC+XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzPT09ZmFsc2Upe1xuICAgICAgICBoYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIGhhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG5cblxuICAgIHNlcnZlclNvY2tldC5vbihldmVudE5hbWUsIChkYXRhKT0+e1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXt9XG4gICAgICAgIGxldCB0eXBlID0gZGF0YS50eXBlID8gZGF0YS50eXBlIDogXCJzaW1wbGVcIjtcblxuICAgICAgICAvLyDQldGB0LvQuCDQsiDQtNCw0L3QvdGL0YUg0YHQvtCx0YvRgtC40Y8g0LXRgdGC0Ywg0L/QvtC70LUgbWVzc2FnZSAtINCy0YvQstC10LTQtdC8INCyINC70L7Qs1xuICAgICAgICBkYXRhLm1lc3NhZ2UgJiYgbG9nKGRhdGEubWVzc2FnZS8qICsgJyAo0KHQvtCx0YvRgtC40LUgJytldmVudCsnLicrdHlwZSsnKScqLyk7XG5cbiAgICAgICAgLy8g0J7RgtC70LDQtNC60LAg0YHQvtCx0YvRgtC40Lkg0LHQtdC3IG1lc3NhZ2VcbiAgICAgICAgLy8gZGF0YS5tZXNzYWdlIHx8IGxvZygnICjQodC+0LHRi9GC0LjQtSAnK2V2ZW50KycuJyt0eXBlKycpJyk7XG5cbiAgICAgICAgY2FsbGJhY2soZXZlbnROYW1lLCB0eXBlLCBkYXRhKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGlmKGV2ZW50TmFtZSBpbiBoYW5kbGVycyAmJiBoYW5kbGVyc1tldmVudE5hbWVdPT09aGFuZGxlcil7XG4gICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudE5hbWVdO1xuICAgIH1cblxuICAgIHNlcnZlclNvY2tldC5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbn1cblxuXG4vLyDQl9Cw0L/Rg9GB0Log0LTQu9GPINC70L7QutCw0LvRjNC90YvRhSDRgdC+0LHRi9GC0LjQuVxuZnVuY3Rpb24gcnVuSGFuZGxlcnMoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgLy/QldGB0LvQuCDQtdGB0YLRjCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4IC0g0LfQsNC/0YPRgdC60LDQtdC8XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzKXtcbiAgICAgICAgZm9yKGNvbnN0IGggb2YgaGFuZGxlcnNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICBoKGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICBzZXJ2ZXJTb2NrZXQuY2xvc2UoKTtcbn0iLCJpbXBvcnQgdWkgZnJvbSBcIi4vZW5naW5lL3VpL3VpLmpzXCI7XG5cbmltcG9ydCBldmVudHMgZnJvbSBcIi4vZXZlbnRzLmpzXCI7XG5cbmltcG9ydCBzY2VuZU1haW4gZnJvbSBcIi4vc2NlbmVzL21haW4vaW5kZXguanNcIlxuXG5cbi8qKlxuICog0J7RgdC90L7QstC90L7QuSDQutC70LDRgdGBINC60LvQuNC10L3RgtCwINC40LPRgNGLXG4gKiBjbGFzcyBHYW1lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtydW59XG5cblxuICAgIC8qKlxuICAgICAqINCX0LDQv9GD0YHQuiDQvtGB0L3QvtCy0L3QvtCz0L4g0YbQuNC60LvQsFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJ1bigpIHtcblxuICAgICAgICAvLyDQn9C40YjQtdC8IFwi0JfQsNCz0YDRg9C30LrQsFwiXG4gICAgICAgIHVpLndhaXRTY3JlZW4uc2hvdygn0KHRgtCw0YDRgiDQuNCz0YDRiycpO1xuXG5cbiAgICAgICAgLy8g0J/QvtC00LrQu9GO0YfQsNC10LzRgdGPINC6INGB0LXRgNCy0LXRgNGDXG4gICAgICAgIGV2ZW50cy5pbml0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy9UT0RPOiDQn9C10YDQtdC0INGB0YLQsNGA0YLQvtC8IC0g0LLRi9Cx0L7RgCDQv9C10YDRgdC+0L3QsNC20LAsINC10YHQu9C4INC90LUg0LLRi9Cx0YDQsNC9XG5cbiAgICAgICAgICAgIC8vINCh0YLQsNGA0YLRg9C10Lwg0L7RgdC90L7QstC90YPRjiDRgdGG0LXQvdGDXG4gICAgICAgICAgICBzY2VuZU1haW4uc3RhcnQoXyA9PiB7XG5cbiAgICAgICAgICAgICAgICBnYW1lb3ZlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2FtZW92ZXIoKXtcbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCdHYW1lIE92ZXInKTtcbiAgICB9XG4iLCJpbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUnXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXG4gICAgZ2FtZS5ydW4oKTtcblxufTtcbiIsIi8qKlxuICog0JvQvtCz0LjRgNC+0LLQsNC90LjQtVxuICovXG5leHBvcnQgZGVmYXVsdCBsb2dcblxuY29uc3QgJGxvZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9ncycpO1xuXG5mdW5jdGlvbiBsb2cobXNnKSB7XG4gICAgJGxvZ3MuaW5uZXJIVE1MICs9ICc8ZGl2IGNsYXNzPVwibXNnXCI+Jyttc2crJzwvZGl2Pic7XG4gICAgJGxvZ3MucGFyZW50RWxlbWVudC5zY3JvbGxUb3AgPSAkbG9ncy5zY3JvbGxIZWlnaHQ7XG4gICAgY29uc29sZS5sb2cobXNnKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBhZnRlclxuXG5mdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2ssIGVycl9jYikge1xuICAgIHZhciBiYWlsID0gZmFsc2VcbiAgICBlcnJfY2IgPSBlcnJfY2IgfHwgbm9vcFxuICAgIHByb3h5LmNvdW50ID0gY291bnRcblxuICAgIHJldHVybiAoY291bnQgPT09IDApID8gY2FsbGJhY2soKSA6IHByb3h5XG5cbiAgICBmdW5jdGlvbiBwcm94eShlcnIsIHJlc3VsdCkge1xuICAgICAgICBpZiAocHJveHkuY291bnQgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhZnRlciBjYWxsZWQgdG9vIG1hbnkgdGltZXMnKVxuICAgICAgICB9XG4gICAgICAgIC0tcHJveHkuY291bnRcblxuICAgICAgICAvLyBhZnRlciBmaXJzdCBlcnJvciwgcmVzdCBhcmUgcGFzc2VkIHRvIGVycl9jYlxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBiYWlsID0gdHJ1ZVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgLy8gZnV0dXJlIGVycm9yIGNhbGxiYWNrcyB3aWxsIGdvIHRvIGVycm9yIGhhbmRsZXJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXJyX2NiXG4gICAgICAgIH0gZWxzZSBpZiAocHJveHkuY291bnQgPT09IDAgJiYgIWJhaWwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCIvKipcbiAqIEFuIGFic3RyYWN0aW9uIGZvciBzbGljaW5nIGFuIGFycmF5YnVmZmVyIGV2ZW4gd2hlblxuICogQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYXJyYXlidWZmZXIuYnl0ZUxlbmd0aDtcbiAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICBlbmQgPSBlbmQgfHwgYnl0ZXM7XG5cbiAgaWYgKGFycmF5YnVmZmVyLnNsaWNlKSB7IHJldHVybiBhcnJheWJ1ZmZlci5zbGljZShzdGFydCwgZW5kKTsgfVxuXG4gIGlmIChzdGFydCA8IDApIHsgc3RhcnQgKz0gYnl0ZXM7IH1cbiAgaWYgKGVuZCA8IDApIHsgZW5kICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPiBieXRlcykgeyBlbmQgPSBieXRlczsgfVxuXG4gIGlmIChzdGFydCA+PSBieXRlcyB8fCBzdGFydCA+PSBlbmQgfHwgYnl0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApO1xuICB9XG5cbiAgdmFyIGFidiA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGVuZCAtIHN0YXJ0KTtcbiAgZm9yICh2YXIgaSA9IHN0YXJ0LCBpaSA9IDA7IGkgPCBlbmQ7IGkrKywgaWkrKykge1xuICAgIHJlc3VsdFtpaV0gPSBhYnZbaV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5idWZmZXI7XG59O1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgQmFja29mZmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICB0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7XG4gIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICBpZiAodGhpcy5qaXR0ZXIpIHtcbiAgICB2YXIgcmFuZCA9ICBNYXRoLnJhbmRvbSgpO1xuICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwICA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gIH1cbiAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtaW5pbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe1xuICB0aGlzLm1zID0gbWluO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uKG1heCl7XG4gIHRoaXMubWF4ID0gbWF4O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGppdHRlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24oaml0dGVyKXtcbiAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuXG4iLCIvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG5cbiAgLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuICB2YXIgbG9va3VwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gIH1cblxuICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gXCJcIjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoKGxlbiAlIDMpID09PSAyKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NDtcbiAgfTtcblxuICBleHBvcnRzLmRlY29kZSA9ICBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXG4gICAgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsxKV07XG4gICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzIpXTtcbiAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMyldO1xuXG4gICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbiAgfTtcbn0pKCk7XG4iLCIvKipcbiAqIENyZWF0ZSBhIGJsb2IgYnVpbGRlciBldmVuIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gKi9cblxudmFyIEJsb2JCdWlsZGVyID0gZ2xvYmFsLkJsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5XZWJLaXRCbG9iQnVpbGRlclxuICB8fCBnbG9iYWwuTVNCbG9iQnVpbGRlclxuICB8fCBnbG9iYWwuTW96QmxvYkJ1aWxkZXI7XG5cbi8qKlxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBpcyBzdXBwb3J0ZWRcbiAqL1xuXG52YXIgYmxvYlN1cHBvcnRlZCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYSA9IG5ldyBCbG9iKFsnaGknXSk7XG4gICAgcmV0dXJuIGEuc2l6ZSA9PT0gMjtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KSgpO1xuXG4vKipcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3Igc3VwcG9ydHMgQXJyYXlCdWZmZXJWaWV3c1xuICogRmFpbHMgaW4gU2FmYXJpIDYsIHNvIHdlIG5lZWQgdG8gbWFwIHRvIEFycmF5QnVmZmVycyB0aGVyZS5cbiAqL1xuXG52YXIgYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID0gYmxvYlN1cHBvcnRlZCAmJiAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGIgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoWzEsMl0pXSk7XG4gICAgcmV0dXJuIGIuc2l6ZSA9PT0gMjtcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KSgpO1xuXG4vKipcbiAqIENoZWNrIGlmIEJsb2JCdWlsZGVyIGlzIHN1cHBvcnRlZFxuICovXG5cbnZhciBibG9iQnVpbGRlclN1cHBvcnRlZCA9IEJsb2JCdWlsZGVyXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmRcbiAgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmdldEJsb2I7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgbWFwcyBBcnJheUJ1ZmZlclZpZXdzIHRvIEFycmF5QnVmZmVyc1xuICogVXNlZCBieSBCbG9iQnVpbGRlciBjb25zdHJ1Y3RvciBhbmQgb2xkIGJyb3dzZXJzIHRoYXQgZGlkbid0XG4gKiBzdXBwb3J0IGl0IGluIHRoZSBCbG9iIGNvbnN0cnVjdG9yLlxuICovXG5cbmZ1bmN0aW9uIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNodW5rID0gYXJ5W2ldO1xuICAgIGlmIChjaHVuay5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgdmFyIGJ1ZiA9IGNodW5rLmJ1ZmZlcjtcblxuICAgICAgLy8gaWYgdGhpcyBpcyBhIHN1YmFycmF5LCBtYWtlIGEgY29weSBzbyB3ZSBvbmx5XG4gICAgICAvLyBpbmNsdWRlIHRoZSBzdWJhcnJheSByZWdpb24gZnJvbSB0aGUgdW5kZXJseWluZyBidWZmZXJcbiAgICAgIGlmIChjaHVuay5ieXRlTGVuZ3RoICE9PSBidWYuYnl0ZUxlbmd0aCkge1xuICAgICAgICB2YXIgY29weSA9IG5ldyBVaW50OEFycmF5KGNodW5rLmJ5dGVMZW5ndGgpO1xuICAgICAgICBjb3B5LnNldChuZXcgVWludDhBcnJheShidWYsIGNodW5rLmJ5dGVPZmZzZXQsIGNodW5rLmJ5dGVMZW5ndGgpKTtcbiAgICAgICAgYnVmID0gY29weS5idWZmZXI7XG4gICAgICB9XG5cbiAgICAgIGFyeVtpXSA9IGJ1ZjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGJiID0gbmV3IEJsb2JCdWlsZGVyKCk7XG4gIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgIGJiLmFwcGVuZChhcnlbaV0pO1xuICB9XG5cbiAgcmV0dXJuIChvcHRpb25zLnR5cGUpID8gYmIuZ2V0QmxvYihvcHRpb25zLnR5cGUpIDogYmIuZ2V0QmxvYigpO1xufTtcblxuZnVuY3Rpb24gQmxvYkNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSk7XG4gIHJldHVybiBuZXcgQmxvYihhcnksIG9wdGlvbnMgfHwge30pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGlmIChibG9iU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldyA/IGdsb2JhbC5CbG9iIDogQmxvYkNvbnN0cnVjdG9yO1xuICB9IGVsc2UgaWYgKGJsb2JCdWlsZGVyU3VwcG9ydGVkKSB7XG4gICAgcmV0dXJuIEJsb2JCdWlsZGVyQ29uc3RydWN0b3I7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufSkoKTtcbiIsIi8qKlxuICogU2xpY2UgcmVmZXJlbmNlLlxuICovXG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG4vKipcbiAqIEJpbmQgYG9iamAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIGZuKXtcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBmbikgZm4gPSBvYmpbZm5dO1xuICBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgZm4pIHRocm93IG5ldyBFcnJvcignYmluZCgpIHJlcXVpcmVzIGEgZnVuY3Rpb24nKTtcbiAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICB9XG59O1xuIiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsIGIpe1xuICB2YXIgZm4gPSBmdW5jdGlvbigpe307XG4gIGZuLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xuICBhLnByb3RvdHlwZSA9IG5ldyBmbjtcbiAgYS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBhO1xufTsiLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0cyBwYXJzZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIGluZGV4ID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gU29ja2V0ICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tldCkpIHJldHVybiBuZXcgU29ja2V0KHVyaSwgb3B0cyk7XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgaWYgKHVyaSAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gbnVsbDtcbiAgfVxuXG4gIGlmICh1cmkpIHtcbiAgICB1cmkgPSBwYXJzZXVyaSh1cmkpO1xuICAgIG9wdHMuaG9zdG5hbWUgPSB1cmkuaG9zdDtcbiAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gJ2h0dHBzJyB8fCB1cmkucHJvdG9jb2wgPT09ICd3c3MnO1xuICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgIGlmICh1cmkucXVlcnkpIG9wdHMucXVlcnkgPSB1cmkucXVlcnk7XG4gIH0gZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgfVxuXG4gIHRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZSA/IG9wdHMuc2VjdXJlXG4gICAgOiAoZ2xvYmFsLmxvY2F0aW9uICYmICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbCk7XG5cbiAgaWYgKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCkge1xuICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICBvcHRzLnBvcnQgPSB0aGlzLnNlY3VyZSA/ICc0NDMnIDogJzgwJztcbiAgfVxuXG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICB0aGlzLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZSB8fFxuICAgIChnbG9iYWwubG9jYXRpb24gPyBsb2NhdGlvbi5ob3N0bmFtZSA6ICdsb2NhbGhvc3QnKTtcbiAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0IHx8IChnbG9iYWwubG9jYXRpb24gJiYgbG9jYXRpb24ucG9ydFxuICAgICAgPyBsb2NhdGlvbi5wb3J0XG4gICAgICA6ICh0aGlzLnNlY3VyZSA/IDQ0MyA6IDgwKSk7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLnF1ZXJ5KSB0aGlzLnF1ZXJ5ID0gcGFyc2Vxcy5kZWNvZGUodGhpcy5xdWVyeSk7XG4gIHRoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7XG4gIHRoaXMucGF0aCA9IChvcHRzLnBhdGggfHwgJy9lbmdpbmUuaW8nKS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy8nO1xuICB0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDtcbiAgdGhpcy5qc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuICB0aGlzLmZvcmNlQmFzZTY0ID0gISFvcHRzLmZvcmNlQmFzZTY0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjtcbiAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW0gfHwgJ3QnO1xuICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgdGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsICd3ZWJzb2NrZXQnXTtcbiAgdGhpcy50cmFuc3BvcnRPcHRpb25zID0gb3B0cy50cmFuc3BvcnRPcHRpb25zIHx8IHt9O1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICB0aGlzLnBvbGljeVBvcnQgPSBvcHRzLnBvbGljeVBvcnQgfHwgODQzO1xuICB0aGlzLnJlbWVtYmVyVXBncmFkZSA9IG9wdHMucmVtZW1iZXJVcGdyYWRlIHx8IGZhbHNlO1xuICB0aGlzLmJpbmFyeVR5cGUgPSBudWxsO1xuICB0aGlzLm9ubHlCaW5hcnlVcGdyYWRlcyA9IG9wdHMub25seUJpbmFyeVVwZ3JhZGVzO1xuICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gZmFsc2UgIT09IG9wdHMucGVyTWVzc2FnZURlZmxhdGUgPyAob3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB7fSkgOiBmYWxzZTtcblxuICBpZiAodHJ1ZSA9PT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSkgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O1xuICBpZiAodGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSAmJiBudWxsID09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQgPSAxMDI0O1xuICB9XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZnggfHwgbnVsbDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2UgfHwgbnVsbDtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0IHx8IG51bGw7XG4gIHRoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycyB8fCBudWxsO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIHRoaXMuZm9yY2VOb2RlID0gISFvcHRzLmZvcmNlTm9kZTtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbDtcbiAgaWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsKSB7XG4gICAgaWYgKG9wdHMuZXh0cmFIZWFkZXJzICYmIE9iamVjdC5rZXlzKG9wdHMuZXh0cmFIZWFkZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmxvY2FsQWRkcmVzcykge1xuICAgICAgdGhpcy5sb2NhbEFkZHJlc3MgPSBvcHRzLmxvY2FsQWRkcmVzcztcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgb24gaGFuZHNoYWtlXG4gIHRoaXMuaWQgPSBudWxsO1xuICB0aGlzLnVwZ3JhZGVzID0gbnVsbDtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBudWxsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gbnVsbDtcblxuICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucGluZ0ludGVydmFsVGltZXIgPSBudWxsO1xuICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSBudWxsO1xuXG4gIHRoaXMub3BlbigpO1xufVxuXG5Tb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRoaXMgaXMgYW4gaW50XG5cbi8qKlxuICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XG4gKiBhbmQgc3RhbmRhbG9uZSBicm93c2VyIGFjY2Vzcy5cbiAqL1xuXG5Tb2NrZXQuU29ja2V0ID0gU29ja2V0O1xuU29ja2V0LlRyYW5zcG9ydCA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0Jyk7XG5Tb2NrZXQudHJhbnNwb3J0cyA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0cy9pbmRleCcpO1xuU29ja2V0LnBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRyYW5zcG9ydCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEByZXR1cm4ge1RyYW5zcG9ydH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuY3JlYXRlVHJhbnNwb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVidWcoJ2NyZWF0aW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHF1ZXJ5ID0gY2xvbmUodGhpcy5xdWVyeSk7XG5cbiAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gIHF1ZXJ5LkVJTyA9IHBhcnNlci5wcm90b2NvbDtcblxuICAvLyB0cmFuc3BvcnQgbmFtZVxuICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuXG4gIC8vIHBlci10cmFuc3BvcnQgb3B0aW9uc1xuICB2YXIgb3B0aW9ucyA9IHRoaXMudHJhbnNwb3J0T3B0aW9uc1tuYW1lXSB8fCB7fTtcblxuICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgaWYgKHRoaXMuaWQpIHF1ZXJ5LnNpZCA9IHRoaXMuaWQ7XG5cbiAgdmFyIHRyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRzW25hbWVdKHtcbiAgICBxdWVyeTogcXVlcnksXG4gICAgc29ja2V0OiB0aGlzLFxuICAgIGFnZW50OiBvcHRpb25zLmFnZW50IHx8IHRoaXMuYWdlbnQsXG4gICAgaG9zdG5hbWU6IG9wdGlvbnMuaG9zdG5hbWUgfHwgdGhpcy5ob3N0bmFtZSxcbiAgICBwb3J0OiBvcHRpb25zLnBvcnQgfHwgdGhpcy5wb3J0LFxuICAgIHNlY3VyZTogb3B0aW9ucy5zZWN1cmUgfHwgdGhpcy5zZWN1cmUsXG4gICAgcGF0aDogb3B0aW9ucy5wYXRoIHx8IHRoaXMucGF0aCxcbiAgICBmb3JjZUpTT05QOiBvcHRpb25zLmZvcmNlSlNPTlAgfHwgdGhpcy5mb3JjZUpTT05QLFxuICAgIGpzb25wOiBvcHRpb25zLmpzb25wIHx8IHRoaXMuanNvbnAsXG4gICAgZm9yY2VCYXNlNjQ6IG9wdGlvbnMuZm9yY2VCYXNlNjQgfHwgdGhpcy5mb3JjZUJhc2U2NCxcbiAgICBlbmFibGVzWERSOiBvcHRpb25zLmVuYWJsZXNYRFIgfHwgdGhpcy5lbmFibGVzWERSLFxuICAgIHRpbWVzdGFtcFJlcXVlc3RzOiBvcHRpb25zLnRpbWVzdGFtcFJlcXVlc3RzIHx8IHRoaXMudGltZXN0YW1wUmVxdWVzdHMsXG4gICAgdGltZXN0YW1wUGFyYW06IG9wdGlvbnMudGltZXN0YW1wUGFyYW0gfHwgdGhpcy50aW1lc3RhbXBQYXJhbSxcbiAgICBwb2xpY3lQb3J0OiBvcHRpb25zLnBvbGljeVBvcnQgfHwgdGhpcy5wb2xpY3lQb3J0LFxuICAgIHBmeDogb3B0aW9ucy5wZnggfHwgdGhpcy5wZngsXG4gICAga2V5OiBvcHRpb25zLmtleSB8fCB0aGlzLmtleSxcbiAgICBwYXNzcGhyYXNlOiBvcHRpb25zLnBhc3NwaHJhc2UgfHwgdGhpcy5wYXNzcGhyYXNlLFxuICAgIGNlcnQ6IG9wdGlvbnMuY2VydCB8fCB0aGlzLmNlcnQsXG4gICAgY2E6IG9wdGlvbnMuY2EgfHwgdGhpcy5jYSxcbiAgICBjaXBoZXJzOiBvcHRpb25zLmNpcGhlcnMgfHwgdGhpcy5jaXBoZXJzLFxuICAgIHJlamVjdFVuYXV0aG9yaXplZDogb3B0aW9ucy5yZWplY3RVbmF1dGhvcml6ZWQgfHwgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQsXG4gICAgcGVyTWVzc2FnZURlZmxhdGU6IG9wdGlvbnMucGVyTWVzc2FnZURlZmxhdGUgfHwgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSxcbiAgICBleHRyYUhlYWRlcnM6IG9wdGlvbnMuZXh0cmFIZWFkZXJzIHx8IHRoaXMuZXh0cmFIZWFkZXJzLFxuICAgIGZvcmNlTm9kZTogb3B0aW9ucy5mb3JjZU5vZGUgfHwgdGhpcy5mb3JjZU5vZGUsXG4gICAgbG9jYWxBZGRyZXNzOiBvcHRpb25zLmxvY2FsQWRkcmVzcyB8fCB0aGlzLmxvY2FsQWRkcmVzcyxcbiAgICByZXF1ZXN0VGltZW91dDogb3B0aW9ucy5yZXF1ZXN0VGltZW91dCB8fCB0aGlzLnJlcXVlc3RUaW1lb3V0LFxuICAgIHByb3RvY29sczogb3B0aW9ucy5wcm90b2NvbHMgfHwgdm9pZCAoMClcbiAgfSk7XG5cbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn07XG5cbmZ1bmN0aW9uIGNsb25lIChvYmopIHtcbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBvW2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRyYW5zcG9ydDtcbiAgaWYgKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9PSAtMSkge1xuICAgIHRyYW5zcG9ydCA9ICd3ZWJzb2NrZXQnO1xuICB9IGVsc2UgaWYgKDAgPT09IHRoaXMudHJhbnNwb3J0cy5sZW5ndGgpIHtcbiAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgfVxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG5cbiAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICB0cnkge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cmFuc3BvcnQub3BlbigpO1xuICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgZGVidWcoJ3NldHRpbmcgdHJhbnNwb3J0ICVzJywgdHJhbnNwb3J0Lm5hbWUpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgZGVidWcoJ2NsZWFyaW5nIGV4aXN0aW5nIHRyYW5zcG9ydCAlcycsIHRoaXMudHJhbnNwb3J0Lm5hbWUpO1xuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICB0cmFuc3BvcnRcbiAgLm9uKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uRHJhaW4oKTtcbiAgfSlcbiAgLm9uKCdwYWNrZXQnLCBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9KVxuICAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoZSk7XG4gIH0pXG4gIC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFByb2JlcyBhIHRyYW5zcG9ydC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucHJvYmUgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gIHZhciB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydChuYW1lLCB7IHByb2JlOiAxIH0pO1xuICB2YXIgZmFpbGVkID0gZmFsc2U7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuICgpIHtcbiAgICBpZiAoc2VsZi5vbmx5QmluYXJ5VXBncmFkZXMpIHtcbiAgICAgIHZhciB1cGdyYWRlTG9zZXNCaW5hcnkgPSAhdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtcbiAgICAgIGZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7XG4gICAgfVxuICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICdwaW5nJywgZGF0YTogJ3Byb2JlJyB9XSk7XG4gICAgdHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgIGlmICgncG9uZycgPT09IG1zZy50eXBlICYmICdwcm9iZScgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIHBvbmcnLCBuYW1lKTtcbiAgICAgICAgc2VsZi51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGluZycsIHRyYW5zcG9ydCk7XG4gICAgICAgIGlmICghdHJhbnNwb3J0KSByZXR1cm47XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICAgICAgZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgIHNlbGYudHJhbnNwb3J0LnBhdXNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICBkZWJ1ZygnY2hhbmdpbmcgdHJhbnNwb3J0IGFuZCBzZW5kaW5nIHVwZ3JhZGUgcGFja2V0Jyk7XG5cbiAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICd1cGdyYWRlJyB9XSk7XG4gICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO1xuICAgICAgICBlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCAoKSB7XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG4gICAgZmFpbGVkID0gdHJ1ZTtcblxuICAgIGNsZWFudXAoKTtcblxuICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gIH1cblxuICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9uZXJyb3IgKGVycikge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO1xuICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLCBuYW1lLCBlcnIpO1xuXG4gICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlICgpIHtcbiAgICBvbmVycm9yKCd0cmFuc3BvcnQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25jbG9zZSAoKSB7XG4gICAgb25lcnJvcignc29ja2V0IGNsb3NlZCcpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb251cGdyYWRlICh0bykge1xuICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgIGRlYnVnKCdcIiVzXCIgd29ya3MgLSBhYm9ydGluZyBcIiVzXCInLCB0by5uYW1lLCB0cmFuc3BvcnQubmFtZSk7XG4gICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG4gIH1cblxuICB0cmFuc3BvcnQub25jZSgnb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gIHRyYW5zcG9ydC5vbmNlKCdlcnJvcicsIG9uZXJyb3IpO1xuICB0cmFuc3BvcnQub25jZSgnY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcblxuICB0aGlzLm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIHRoaXMub25jZSgndXBncmFkaW5nJywgb251cGdyYWRlKTtcblxuICB0cmFuc3BvcnQub3BlbigpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzb2NrZXQgb3BlbicpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gIHRoaXMuZmx1c2goKTtcblxuICAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4gIC8vIGxpc3RlbmVyIGFscmVhZHkgY2xvc2VkIHRoZSBzb2NrZXRcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSkge1xuICAgIGRlYnVnKCdzdGFydGluZyB1cGdyYWRlIHByb2JlcycpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy51cGdyYWRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgcmVjZWl2ZTogdHlwZSBcIiVzXCIsIGRhdGEgXCIlc1wiJywgcGFja2V0LnR5cGUsIHBhY2tldC5kYXRhKTtcblxuICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcblxuICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICB0aGlzLmVtaXQoJ2hlYXJ0YmVhdCcpO1xuXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgIHRoaXMub25IYW5kc2hha2UoSlNPTi5wYXJzZShwYWNrZXQuZGF0YSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncG9uZyc6XG4gICAgICAgIHRoaXMuc2V0UGluZygpO1xuICAgICAgICB0aGlzLmVtaXQoJ3BvbmcnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignc2VydmVyIGVycm9yJyk7XG4gICAgICAgIGVyci5jb2RlID0gcGFja2V0LmRhdGE7XG4gICAgICAgIHRoaXMub25FcnJvcihlcnIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgcGFja2V0LmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRzaGFrZSBvYmpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IYW5kc2hha2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2hhbmRzaGFrZScsIGRhdGEpO1xuICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gIHRoaXMub25PcGVuKCk7XG4gIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgdGhpcy5zZXRQaW5nKCk7XG5cbiAgLy8gUHJvbG9uZyBsaXZlbmVzcyBvZiBzb2NrZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xuICB0aGlzLm9uKCdoZWFydGJlYXQnLCB0aGlzLm9uSGVhcnRiZWF0KTtcbn07XG5cbi8qKlxuICogUmVzZXRzIHBpbmcgdGltZW91dC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5waW5nVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICBzZWxmLm9uQ2xvc2UoJ3BpbmcgdGltZW91dCcpO1xuICB9LCB0aW1lb3V0IHx8IChzZWxmLnBpbmdJbnRlcnZhbCArIHNlbGYucGluZ1RpbWVvdXQpKTtcbn07XG5cbi8qKlxuICogUGluZ3Mgc2VydmVyIGV2ZXJ5IGB0aGlzLnBpbmdJbnRlcnZhbGAgYW5kIGV4cGVjdHMgcmVzcG9uc2VcbiAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZXRQaW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGNsZWFyVGltZW91dChzZWxmLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgc2VsZi5waW5nSW50ZXJ2YWxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnKCd3cml0aW5nIHBpbmcgcGFja2V0IC0gZXhwZWN0aW5nIHBvbmcgd2l0aGluICVzbXMnLCBzZWxmLnBpbmdUaW1lb3V0KTtcbiAgICBzZWxmLnBpbmcoKTtcbiAgICBzZWxmLm9uSGVhcnRiZWF0KHNlbGYucGluZ1RpbWVvdXQpO1xuICB9LCBzZWxmLnBpbmdJbnRlcnZhbCk7XG59O1xuXG4vKipcbiogU2VuZHMgYSBwaW5nIHBhY2tldC5cbipcbiogQGFwaSBwcml2YXRlXG4qL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5zZW5kUGFja2V0KCdwaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuZW1pdCgncGluZycpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIG9uIGBkcmFpbmAgZXZlbnRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsIHRoaXMucHJldkJ1ZmZlckxlbik7XG5cbiAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcblxuICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICB0aGlzLmVtaXQoJ2RyYWluJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnICE9PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAhdGhpcy51cGdyYWRpbmcgJiYgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICBkZWJ1ZygnZmx1c2hpbmcgJWQgcGFja2V0cyBpbiBzb2NrZXQnLCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCk7XG4gICAgdGhpcy50cmFuc3BvcnQuc2VuZCh0aGlzLndyaXRlQnVmZmVyKTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7XG4gICAgdGhpcy5lbWl0KCdmbHVzaCcpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgbWVzc2FnZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS53cml0ZSA9XG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobXNnLCBvcHRpb25zLCBmbikge1xuICB0aGlzLnNlbmRQYWNrZXQoJ21lc3NhZ2UnLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2VuZFBhY2tldCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIGlmICgnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcblxuICB2YXIgcGFja2V0ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogZGF0YSxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG4gIHRoaXMuZW1pdCgncGFja2V0Q3JlYXRlJywgcGFja2V0KTtcbiAgdGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIGlmIChmbikgdGhpcy5vbmNlKCdmbHVzaCcsIGZuKTtcbiAgdGhpcy5mbHVzaCgpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NpbmcnO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgIHNlbGYub25DbG9zZSgnZm9yY2VkIGNsb3NlJyk7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtcbiAgICBzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW51cEFuZENsb3NlICgpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIGNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSAoKSB7XG4gICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICBzZWxmLm9uY2UoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYub25jZSgndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdzb2NrZXQgZXJyb3IgJWonLCBlcnIpO1xuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB0aGlzLm9uQ2xvc2UoJ3RyYW5zcG9ydCBlcnJvcicsIGVycik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAocmVhc29uLCBkZXNjKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgY2xvc2Ugd2l0aCByZWFzb246IFwiJXNcIicsIHJlYXNvbik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gY2xlYXIgdGltZXJzXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ0ludGVydmFsVGltZXIpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuXG4gICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpO1xuXG4gICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuXG4gICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgIHRoaXMuaWQgPSBudWxsO1xuXG4gICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24sIGRlc2MpO1xuXG4gICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgLy8gZ3JhYiB0aGUgYnVmZmVycyBvbiBgY2xvc2VgIGV2ZW50XG4gICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgIHNlbGYucHJldkJ1ZmZlckxlbiA9IDA7XG4gIH1cbn07XG5cbi8qKlxuICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5maWx0ZXJVcGdyYWRlcyA9IGZ1bmN0aW9uICh1cGdyYWRlcykge1xuICB2YXIgZmlsdGVyZWRVcGdyYWRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IHVwZ3JhZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgIGlmICh+aW5kZXgodGhpcy50cmFuc3BvcnRzLCB1cGdyYWRlc1tpXSkpIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc3BvcnQ7XG5cbi8qKlxuICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gVHJhbnNwb3J0IChvcHRzKSB7XG4gIHRoaXMucGF0aCA9IG9wdHMucGF0aDtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7XG4gIHRoaXMucG9ydCA9IG9wdHMucG9ydDtcbiAgdGhpcy5zZWN1cmUgPSBvcHRzLnNlY3VyZTtcbiAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtO1xuICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgdGhpcy5yZWFkeVN0YXRlID0gJyc7XG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuICB0aGlzLmZvcmNlTm9kZSA9IG9wdHMuZm9yY2VOb2RlO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gIHRoaXMubG9jYWxBZGRyZXNzID0gb3B0cy5sb2NhbEFkZHJlc3M7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFRyYW5zcG9ydC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEVtaXRzIGFuIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChtc2csIGRlc2MpIHtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIudHlwZSA9ICdUcmFuc3BvcnRFcnJvcic7XG4gIGVyci5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgICB0aGlzLmRvT3BlbigpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgIHRoaXMub25DbG9zZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBub3Qgb3BlbicpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIG9wZW5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHBhY2tldCA9IHBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gIHRoaXMub25QYWNrZXQocGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIHRoaXMuZW1pdCgnY2xvc2UnKTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdC1zc2wnKTtcbnZhciBYSFIgPSByZXF1aXJlKCcuL3BvbGxpbmcteGhyJyk7XG52YXIgSlNPTlAgPSByZXF1aXJlKCcuL3BvbGxpbmctanNvbnAnKTtcbnZhciB3ZWJzb2NrZXQgPSByZXF1aXJlKCcuL3dlYnNvY2tldCcpO1xuXG4vKipcbiAqIEV4cG9ydCB0cmFuc3BvcnRzLlxuICovXG5cbmV4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7XG5leHBvcnRzLndlYnNvY2tldCA9IHdlYnNvY2tldDtcblxuLyoqXG4gKiBQb2xsaW5nIHRyYW5zcG9ydCBwb2x5bW9ycGhpYyBjb25zdHJ1Y3Rvci5cbiAqIERlY2lkZXMgb24geGhyIHZzIGpzb25wIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBvbGxpbmcgKG9wdHMpIHtcbiAgdmFyIHhocjtcbiAgdmFyIHhkID0gZmFsc2U7XG4gIHZhciB4cyA9IGZhbHNlO1xuICB2YXIganNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcblxuICBpZiAoZ2xvYmFsLmxvY2F0aW9uKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHhkID0gb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgIHhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG5cbiAgb3B0cy54ZG9tYWluID0geGQ7XG4gIG9wdHMueHNjaGVtZSA9IHhzO1xuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG5cbiAgaWYgKCdvcGVuJyBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCkge1xuICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghanNvbnApIHRocm93IG5ldyBFcnJvcignSlNPTlAgZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gbmV3IEpTT05QKG9wdHMpO1xuICB9XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlBQb2xsaW5nO1xuXG4vKipcbiAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICovXG5cbnZhciByTmV3bGluZSA9IC9cXG4vZztcbnZhciByRXNjYXBlZE5ld2xpbmUgPSAvXFxcXG4vZztcblxuLyoqXG4gKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxuICovXG5cbnZhciBjYWxsYmFja3M7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7IH1cblxuLyoqXG4gKiBKU09OUCBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBKU09OUFBvbGxpbmcgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuXG4gIC8vIGRlZmluZSBnbG9iYWwgY2FsbGJhY2tzIGFycmF5IGlmIG5vdCBwcmVzZW50XG4gIC8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG4gIGlmICghY2FsbGJhY2tzKSB7XG4gICAgLy8gd2UgbmVlZCB0byBjb25zaWRlciBtdWx0aXBsZSBlbmdpbmVzIGluIHRoZSBzYW1lIHBhZ2VcbiAgICBpZiAoIWdsb2JhbC5fX19laW8pIGdsb2JhbC5fX19laW8gPSBbXTtcbiAgICBjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvO1xuICB9XG5cbiAgLy8gY2FsbGJhY2sgaWRlbnRpZmllclxuICB0aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgIHNlbGYub25EYXRhKG1zZyk7XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbiAgdGhpcy5xdWVyeS5qID0gdGhpcy5pbmRleDtcblxuICAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2NyaXB0KSBzZWxmLnNjcmlwdC5vbmVycm9yID0gZW1wdHk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoSlNPTlBQb2xsaW5nLCBQb2xsaW5nKTtcblxuLypcbiAqIEpTT05QIG9ubHkgc3VwcG9ydHMgYmluYXJ5IGFzIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG5cbi8qKlxuICogQ2xvc2VzIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gIH1cblxuICBpZiAodGhpcy5mb3JtKSB7XG4gICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgIHRoaXMuaWZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgc2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7XG4gIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGwgZXJyb3InLCBlKTtcbiAgfTtcblxuICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIGlmIChpbnNlcnRBdCkge1xuICAgIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuICB9IGVsc2Uge1xuICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cbiAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgdmFyIGlzVUFnZWNrbyA9ICd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmF2aWdhdG9yICYmIC9nZWNrby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgaWYgKGlzVUFnZWNrbykge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgIH0sIDEwMCk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAoIXRoaXMuZm9ybSkge1xuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIHZhciBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB2YXIgaWQgPSB0aGlzLmlmcmFtZUlkID0gJ2Vpb19pZnJhbWVfJyArIHRoaXMuaW5kZXg7XG4gICAgdmFyIGlmcmFtZTtcblxuICAgIGZvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcbiAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBmb3JtLnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICBmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7XG4gICAgZm9ybS50YXJnZXQgPSBpZDtcbiAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCAndXRmLTgnKTtcbiAgICBhcmVhLm5hbWUgPSAnZCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICB9XG5cbiAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7XG5cbiAgZnVuY3Rpb24gY29tcGxldGUgKCkge1xuICAgIGluaXRJZnJhbWUoKTtcbiAgICBmbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdElmcmFtZSAoKSB7XG4gICAgaWYgKHNlbGYuaWZyYW1lKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGxpbmcgaWZyYW1lIHJlbW92YWwgZXJyb3InLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICB2YXIgaHRtbCA9ICc8aWZyYW1lIHNyYz1cImphdmFzY3JpcHQ6MFwiIG5hbWU9XCInICsgc2VsZi5pZnJhbWVJZCArICdcIj4nO1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDowJztcbiAgICB9XG5cbiAgICBpZnJhbWUuaWQgPSBzZWxmLmlmcmFtZUlkO1xuXG4gICAgc2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgc2VsZi5pZnJhbWUgPSBpZnJhbWU7XG4gIH1cblxuICBpbml0SWZyYW1lKCk7XG5cbiAgLy8gZXNjYXBlIFxcbiB0byBwcmV2ZW50IGl0IGZyb20gYmVpbmcgY29udmVydGVkIGludG8gXFxyXFxuIGJ5IHNvbWUgVUFzXG4gIC8vIGRvdWJsZSBlc2NhcGluZyBpcyByZXF1aXJlZCBmb3IgZXNjYXBlZCBuZXcgbGluZXMgYmVjYXVzZSB1bmVzY2FwaW5nIG9mIG5ldyBsaW5lcyBjYW4gYmUgZG9uZSBzYWZlbHkgb24gc2VydmVyLXNpZGVcbiAgZGF0YSA9IGRhdGEucmVwbGFjZShyRXNjYXBlZE5ld2xpbmUsICdcXFxcXFxuJyk7XG4gIHRoaXMuYXJlYS52YWx1ZSA9IGRhdGEucmVwbGFjZShyTmV3bGluZSwgJ1xcXFxuJyk7XG5cbiAgdHJ5IHtcbiAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgdGhpcy5pZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaWZyYW1lLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICB9XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUjtcbm1vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIEVtcHR5IGZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gZW1wdHkgKCkge31cblxuLyoqXG4gKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBYSFIgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICBpZiAoZ2xvYmFsLmxvY2F0aW9uKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHRoaXMueGQgPSBvcHRzLmhvc3RuYW1lICE9PSBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgfHxcbiAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICB0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoWEhSLCBQb2xsaW5nKTtcblxuLyoqXG4gKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gKi9cblxuWEhSLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIG9wdHMudXJpID0gdGhpcy51cmkoKTtcbiAgb3B0cy54ZCA9IHRoaXMueGQ7XG4gIG9wdHMueHMgPSB0aGlzLnhzO1xuICBvcHRzLmFnZW50ID0gdGhpcy5hZ2VudCB8fCBmYWxzZTtcbiAgb3B0cy5zdXBwb3J0c0JpbmFyeSA9IHRoaXMuc3VwcG9ydHNCaW5hcnk7XG4gIG9wdHMuZW5hYmxlc1hEUiA9IHRoaXMuZW5hYmxlc1hEUjtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIG9wdHMucmVxdWVzdFRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMuZXh0cmFIZWFkZXJzID0gdGhpcy5leHRyYUhlYWRlcnM7XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG9wdHMpO1xufTtcblxuLyoqXG4gKiBTZW5kcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICB2YXIgaXNCaW5hcnkgPSB0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgJiYgZGF0YSAhPT0gdW5kZWZpbmVkO1xuICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnUE9TVCcsIGRhdGE6IGRhdGEsIGlzQmluYXJ5OiBpc0JpbmFyeSB9KTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXEub24oJ3N1Y2Nlc3MnLCBmbik7XG4gIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9zdCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnNlbmRYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCd4aHIgcG9sbCcpO1xuICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBzZWxmLm9uRGF0YShkYXRhKTtcbiAgfSk7XG4gIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnBvbGxYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0IChvcHRzKSB7XG4gIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ0dFVCc7XG4gIHRoaXMudXJpID0gb3B0cy51cmk7XG4gIHRoaXMueGQgPSAhIW9wdHMueGQ7XG4gIHRoaXMueHMgPSAhIW9wdHMueHM7XG4gIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudDtcbiAgdGhpcy5pc0JpbmFyeSA9IG9wdHMuaXNCaW5hcnk7XG4gIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG4gIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBvcHRzLnJlcXVlc3RUaW1lb3V0O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycztcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRzID0geyBhZ2VudDogdGhpcy5hZ2VudCwgeGRvbWFpbjogdGhpcy54ZCwgeHNjaGVtZTogdGhpcy54cywgZW5hYmxlc1hEUjogdGhpcy5lbmFibGVzWERSIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIHZhciB4aHIgPSB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRyeSB7XG4gICAgZGVidWcoJ3hociBvcGVuICVzOiAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVyaSk7XG4gICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICBpZiAoJ1BPU1QnID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnKi8qJyk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICh0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICB9XG5cbiAgICAvLyBpZTYgY2hlY2tcbiAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgfTtcbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSAhPT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmICg0ICE9PSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25FcnJvcih4aHIuc3RhdHVzKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWJ1ZygneGhyIGRhdGEgJXMnLCB0aGlzLmRhdGEpO1xuICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZmhyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgIHRoaXMuaW5kZXggPSBSZXF1ZXN0LnJlcXVlc3RzQ291bnQrKztcbiAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlc3BvbnNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uU3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0KCdzdWNjZXNzJyk7XG4gIHRoaXMuY2xlYW51cCgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgaWYgd2UgaGF2ZSBkYXRhLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xuICB0aGlzLm9uU3VjY2VzcygpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgdGhpcy5jbGVhbnVwKHRydWUpO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgaG91c2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIChmcm9tRXJyb3IpIHtcbiAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8geG1saHR0cHJlcXVlc3RcbiAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICB0aGlzLnhoci5vbmxvYWQgPSB0aGlzLnhoci5vbmVycm9yID0gZW1wdHk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG4gIH1cblxuICBpZiAoZnJvbUVycm9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICBkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XTtcbiAgfVxuXG4gIHRoaXMueGhyID0gbnVsbDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gbG9hZC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkYXRhO1xuICB0cnkge1xuICAgIHZhciBjb250ZW50VHlwZTtcbiAgICB0cnkge1xuICAgICAgY29udGVudFR5cGUgPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICBpZiAoY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICBpZiAodGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAnYXJyYXlidWZmZXInKSB7XG4gICAgICAgIGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZSB8fCB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheSh0aGlzLnhoci5yZXNwb25zZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMub25FcnJvcihlKTtcbiAgfVxuICBpZiAobnVsbCAhPSBkYXRhKSB7XG4gICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaXQgaGFzIFhEb21haW5SZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmhhc1hEUiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmICF0aGlzLnhzICYmIHRoaXMuZW5hYmxlc1hEUjtcbn07XG5cbi8qKlxuICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xlYW51cCgpO1xufTtcblxuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5cblJlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7XG5SZXF1ZXN0LnJlcXVlc3RzID0ge307XG5cbmlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgIGdsb2JhbC5hdHRhY2hFdmVudCgnb251bmxvYWQnLCB1bmxvYWRIYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlciAoKSB7XG4gIGZvciAodmFyIGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgIGlmIChSZXF1ZXN0LnJlcXVlc3RzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBSZXF1ZXN0LnJlcXVlc3RzW2ldLmFib3J0KCk7XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIHllYXN0ID0gcmVxdWlyZSgneWVhc3QnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUG9sbGluZztcblxuLyoqXG4gKiBJcyBYSFIyIHN1cHBvcnRlZD9cbiAqL1xuXG52YXIgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHsgeGRvbWFpbjogZmFsc2UgfSk7XG4gIHJldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7XG59KSgpO1xuXG4vKipcbiAqIFBvbGxpbmcgaW50ZXJmYWNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBQb2xsaW5nIChvcHRzKSB7XG4gIHZhciBmb3JjZUJhc2U2NCA9IChvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQpO1xuICBpZiAoIWhhc1hIUjIgfHwgZm9yY2VCYXNlNjQpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChQb2xsaW5nLCBUcmFuc3BvcnQpO1xuXG4vKipcbiAqIFRyYW5zcG9ydCBuYW1lLlxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAncG9sbGluZyc7XG5cbi8qKlxuICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBvbGwoKTtcbn07XG5cbi8qKlxuICogUGF1c2VzIHBvbGxpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChvblBhdXNlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLnJlYWR5U3RhdGUgPSAncGF1c2luZyc7XG5cbiAgZnVuY3Rpb24gcGF1c2UgKCkge1xuICAgIGRlYnVnKCdwYXVzZWQnKTtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSAncGF1c2VkJztcbiAgICBvblBhdXNlKCk7XG4gIH1cblxuICBpZiAodGhpcy5wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHBvbGxpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlYnVnKCdwcmUtcGF1c2UgcG9sbGluZyBjb21wbGV0ZScpO1xuICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud3JpdGFibGUpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlJyk7XG4gICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwYXVzZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3BvbGxpbmcnKTtcbiAgdGhpcy5wb2xsaW5nID0gdHJ1ZTtcbiAgdGhpcy5kb1BvbGwoKTtcbiAgdGhpcy5lbWl0KCdwb2xsJyk7XG59O1xuXG4vKipcbiAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgZGVidWcoJ3BvbGxpbmcgZ290IGRhdGEgJXMnLCBkYXRhKTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKHBhY2tldCwgaW5kZXgsIHRvdGFsKSB7XG4gICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgIGlmICgnb3BlbmluZycgPT09IHNlbGYucmVhZHlTdGF0ZSkge1xuICAgICAgc2VsZi5vbk9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgaWYgKCdjbG9zZScgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8vIGRlY29kZSBwYXlsb2FkXG4gIHBhcnNlci5kZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcblxuICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICBpZiAoJ2Nsb3NlZCcgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwb2xsQ29tcGxldGUnKTtcblxuICAgIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgdGhpcy5wb2xsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgZGVidWcoJ3dyaXRpbmcgY2xvc2UgcGFja2V0Jyk7XG4gICAgc2VsZi53cml0ZShbeyB0eXBlOiAnY2xvc2UnIH1dKTtcbiAgfVxuXG4gIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCd0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmcnKTtcbiAgICBjbG9zZSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbiAgICBkZWJ1ZygndHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlJyk7XG4gICAgdGhpcy5vbmNlKCdvcGVuJywgY2xvc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICB2YXIgY2FsbGJhY2tmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gIH07XG5cbiAgcGFyc2VyLmVuY29kZVBheWxvYWQocGFja2V0cywgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBzZWxmLmRvV3JpdGUoZGF0YSwgY2FsbGJhY2tmbik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgdmFyIHNjaGVtYSA9IHRoaXMuc2VjdXJlID8gJ2h0dHBzJyA6ICdodHRwJztcbiAgdmFyIHBvcnQgPSAnJztcblxuICAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuICBpZiAoZmFsc2UgIT09IHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gIH1cblxuICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgIHF1ZXJ5LmI2NCA9IDE7XG4gIH1cblxuICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICBpZiAodGhpcy5wb3J0ICYmICgoJ2h0dHBzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgICgnaHR0cCcgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICB2YXIgaXB2NiA9IHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtcbiAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciB5ZWFzdCA9IHJlcXVpcmUoJ3llYXN0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldCcpO1xudmFyIEJyb3dzZXJXZWJTb2NrZXQgPSBnbG9iYWwuV2ViU29ja2V0IHx8IGdsb2JhbC5Nb3pXZWJTb2NrZXQ7XG52YXIgTm9kZVdlYlNvY2tldDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICB0cnkge1xuICAgIE5vZGVXZWJTb2NrZXQgPSByZXF1aXJlKCd3cycpO1xuICB9IGNhdGNoIChlKSB7IH1cbn1cblxuLyoqXG4gKiBHZXQgZWl0aGVyIHRoZSBgV2ViU29ja2V0YCBvciBgTW96V2ViU29ja2V0YCBnbG9iYWxzXG4gKiBpbiB0aGUgYnJvd3NlciBvciB0cnkgdG8gcmVzb2x2ZSBXZWJTb2NrZXQtY29tcGF0aWJsZVxuICogaW50ZXJmYWNlIGV4cG9zZWQgYnkgYHdzYCBmb3IgTm9kZS1saWtlIGVudmlyb25tZW50LlxuICovXG5cbnZhciBXZWJTb2NrZXQgPSBCcm93c2VyV2ViU29ja2V0O1xuaWYgKCFXZWJTb2NrZXQgJiYgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgV2ViU29ja2V0ID0gTm9kZVdlYlNvY2tldDtcbn1cblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdTO1xuXG4vKipcbiAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gV1MgKG9wdHMpIHtcbiAgdmFyIGZvcmNlQmFzZTY0ID0gKG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NCk7XG4gIGlmIChmb3JjZUJhc2U2NCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZTtcbiAgdGhpcy51c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSBCcm93c2VyV2ViU29ja2V0ICYmICFvcHRzLmZvcmNlTm9kZTtcbiAgdGhpcy5wcm90b2NvbHMgPSBvcHRzLnByb3RvY29scztcbiAgaWYgKCF0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgIFdlYlNvY2tldCA9IE5vZGVXZWJTb2NrZXQ7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChXUywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbldTLnByb3RvdHlwZS5uYW1lID0gJ3dlYnNvY2tldCc7XG5cbi8qXG4gKiBXZWJTb2NrZXRzIHN1cHBvcnQgYmluYXJ5XG4gKi9cblxuV1MucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuLyoqXG4gKiBPcGVucyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmNoZWNrKCkpIHtcbiAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB1cmkgPSB0aGlzLnVyaSgpO1xuICB2YXIgcHJvdG9jb2xzID0gdGhpcy5wcm90b2NvbHM7XG4gIHZhciBvcHRzID0ge1xuICAgIGFnZW50OiB0aGlzLmFnZW50LFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlXG4gIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcbiAgfVxuICBpZiAodGhpcy5sb2NhbEFkZHJlc3MpIHtcbiAgICBvcHRzLmxvY2FsQWRkcmVzcyA9IHRoaXMubG9jYWxBZGRyZXNzO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB0aGlzLndzID0gdGhpcy51c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPyAocHJvdG9jb2xzID8gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scykgOiBuZXcgV2ViU29ja2V0KHVyaSkpIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGlmICh0aGlzLndzLmJpbmFyeVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLndzLnN1cHBvcnRzICYmIHRoaXMud3Muc3VwcG9ydHMuYmluYXJ5KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ25vZGVidWZmZXInO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gIH1cblxuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uT3BlbigpO1xuICB9O1xuICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCk7XG4gIH07XG4gIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgc2VsZi5vbkRhdGEoZXYuZGF0YSk7XG4gIH07XG4gIHRoaXMud3Mub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKCd3ZWJzb2NrZXQgZXJyb3InLCBlKTtcbiAgfTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcblxuICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gIHZhciB0b3RhbCA9IHBhY2tldHMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHRvdGFsOyBpIDwgbDsgaSsrKSB7XG4gICAgKGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgIHBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0LCBzZWxmLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoIXNlbGYudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICB2YXIgb3B0cyA9IHt9O1xuICAgICAgICAgIGlmIChwYWNrZXQub3B0aW9ucykge1xuICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IHBhY2tldC5vcHRpb25zLmNvbXByZXNzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gJ3N0cmluZycgPT09IHR5cGVvZiBkYXRhID8gZ2xvYmFsLkJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpIDogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobGVuIDwgc2VsZi5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgLy8gaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4gICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHNlbGYudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAvLyBUeXBlRXJyb3IgaXMgdGhyb3duIHdoZW4gcGFzc2luZyB0aGUgc2Vjb25kIGFyZ3VtZW50IG9uIFNhZmFyaVxuICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSwgb3B0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZGVidWcoJ3dlYnNvY2tldCBjbG9zZWQgYmVmb3JlIG9uY2xvc2UgZXZlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC0tdG90YWwgfHwgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSkocGFja2V0c1tpXSk7XG4gIH1cblxuICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICBzZWxmLmVtaXQoJ2ZsdXNoJyk7XG5cbiAgICAvLyBmYWtlIGRyYWluXG4gICAgLy8gZGVmZXIgdG8gbmV4dCB0aWNrIHRvIGFsbG93IFNvY2tldCB0byBjbGVhciB3cml0ZUJ1ZmZlclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gICAgfSwgMCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2VcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIENsb3NlcyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgdGhpcy53cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLndzLmNsb3NlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gIHZhciBwb3J0ID0gJyc7XG5cbiAgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbiAgaWYgKHRoaXMucG9ydCAmJiAoKCd3c3MnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAoJ3dzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgcG9ydCA9ICc6JyArIHRoaXMucG9ydDtcbiAgfVxuXG4gIC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG4gIGlmICh0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgcXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICB9XG5cbiAgLy8gY29tbXVuaWNhdGUgYmluYXJ5IHN1cHBvcnQgY2FwYWJpbGl0aWVzXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgIHF1ZXJ5LmI2NCA9IDE7XG4gIH1cblxuICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICB2YXIgaXB2NiA9IHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtcbiAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG59O1xuXG4vKipcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbldTLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICEhV2ViU29ja2V0ICYmICEoJ19faW5pdGlhbGl6ZScgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpO1xufTtcbiIsIi8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG5cbnZhciBoYXNDT1JTID0gcmVxdWlyZSgnaGFzLWNvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0cykge1xuICB2YXIgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcblxuICAvLyBzY2hlbWUgbXVzdCBiZSBzYW1lIHdoZW4gdXNpZ24gWERvbWFpblJlcXVlc3RcbiAgLy8gaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvaWVpbnRlcm5hbHMvYXJjaGl2ZS8yMDEwLzA1LzEzL3hkb21haW5yZXF1ZXN0LXJlc3RyaWN0aW9ucy1saW1pdGF0aW9ucy1hbmQtd29ya2Fyb3VuZHMuYXNweFxuICB2YXIgeHNjaGVtZSA9IG9wdHMueHNjaGVtZTtcblxuICAvLyBYRG9tYWluUmVxdWVzdCBoYXMgYSBmbG93IG9mIG5vdCBzZW5kaW5nIGNvb2tpZSwgdGhlcmVmb3JlIGl0IHNob3VsZCBiZSBkaXNhYmxlZCBhcyBhIGRlZmF1bHQuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2VuZ2luZS5pby1jbGllbnQvcHVsbC8yMTdcbiAgdmFyIGVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgLy8gWE1MSHR0cFJlcXVlc3QgY2FuIGJlIGRpc2FibGVkIG9uIElFXG4gIHRyeSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKCF4ZG9tYWluIHx8IGhhc0NPUlMpKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7IH1cblxuICAvLyBVc2UgWERvbWFpblJlcXVlc3QgZm9yIElFOCBpZiBlbmFibGVzWERSIGlzIHRydWVcbiAgLy8gYmVjYXVzZSBsb2FkaW5nIGJhciBrZWVwcyBmbGFzaGluZyB3aGVuIHVzaW5nIGpzb25wLXBvbGxpbmdcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3l1amlvc2FrYS9zb2NrZS5pby1pZTgtbG9hZGluZy1leGFtcGxlXG4gIHRyeSB7XG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgWERvbWFpblJlcXVlc3QgJiYgIXhzY2hlbWUgJiYgZW5hYmxlc1hEUikge1xuICAgICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgaWYgKCF4ZG9tYWluKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgZ2xvYmFsW1snQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJyldKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG59O1xuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xudmFyIGhhc0JpbmFyeSA9IHJlcXVpcmUoJ2hhcy1iaW5hcnkyJyk7XG52YXIgc2xpY2VCdWZmZXIgPSByZXF1aXJlKCdhcnJheWJ1ZmZlci5zbGljZScpO1xudmFyIGFmdGVyID0gcmVxdWlyZSgnYWZ0ZXInKTtcbnZhciB1dGY4ID0gcmVxdWlyZSgnLi91dGY4Jyk7XG5cbnZhciBiYXNlNjRlbmNvZGVyO1xuaWYgKGdsb2JhbCAmJiBnbG9iYWwuQXJyYXlCdWZmZXIpIHtcbiAgYmFzZTY0ZW5jb2RlciA9IHJlcXVpcmUoJ2Jhc2U2NC1hcnJheWJ1ZmZlcicpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGFuIGFuZHJvaWQgYnJvd3Nlci4gVGhhdCByZXF1aXJlcyB1cyB0byB1c2VcbiAqIEFycmF5QnVmZmVyIHdpdGggcG9sbGluZyB0cmFuc3BvcnRzLi4uXG4gKlxuICogaHR0cDovL2doaW5kYS5uZXQvanBlZy1ibG9iLWFqYXgtYW5kcm9pZC9cbiAqL1xuXG52YXIgaXNBbmRyb2lkID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL0FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlIGFyZSBydW5uaW5nIGluIFBoYW50b21KUy5cbiAqIFVwbG9hZGluZyBhIEJsb2Igd2l0aCBQaGFudG9tSlMgZG9lcyBub3Qgd29yayBjb3JyZWN0bHksIGFzIHJlcG9ydGVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJpeWEvcGhhbnRvbWpzL2lzc3Vlcy8xMTM5NVxuICogQHR5cGUgYm9vbGVhblxuICovXG52YXIgaXNQaGFudG9tSlMgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvUGhhbnRvbUpTL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBXaGVuIHRydWUsIGF2b2lkcyB1c2luZyBCbG9icyB0byBlbmNvZGUgcGF5bG9hZHMuXG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBkb250U2VuZEJsb2JzID0gaXNBbmRyb2lkIHx8IGlzUGhhbnRvbUpTO1xuXG4vKipcbiAqIEN1cnJlbnQgcHJvdG9jb2wgdmVyc2lvbi5cbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gMztcblxuLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKi9cblxudmFyIHBhY2tldHMgPSBleHBvcnRzLnBhY2tldHMgPSB7XG4gICAgb3BlbjogICAgIDAgICAgLy8gbm9uLXdzXG4gICwgY2xvc2U6ICAgIDEgICAgLy8gbm9uLXdzXG4gICwgcGluZzogICAgIDJcbiAgLCBwb25nOiAgICAgM1xuICAsIG1lc3NhZ2U6ICA0XG4gICwgdXBncmFkZTogIDVcbiAgLCBub29wOiAgICAgNlxufTtcblxudmFyIHBhY2tldHNsaXN0ID0ga2V5cyhwYWNrZXRzKTtcblxuLyoqXG4gKiBQcmVtYWRlIGVycm9yIHBhY2tldC5cbiAqL1xuXG52YXIgZXJyID0geyB0eXBlOiAnZXJyb3InLCBkYXRhOiAncGFyc2VyIGVycm9yJyB9O1xuXG4vKipcbiAqIENyZWF0ZSBhIGJsb2IgYXBpIGV2ZW4gZm9yIGJsb2IgYnVpbGRlciB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICovXG5cbnZhciBCbG9iID0gcmVxdWlyZSgnYmxvYicpO1xuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQuXG4gKlxuICogICAgIDxwYWNrZXQgdHlwZSBpZD4gWyA8ZGF0YT4gXVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDVoZWxsbyB3b3JsZFxuICogICAgIDNcbiAqICAgICA0XG4gKlxuICogQmluYXJ5IGlzIGVuY29kZWQgaW4gYW4gaWRlbnRpY2FsIHByaW5jaXBsZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHV0ZjhlbmNvZGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O1xuICAgIHN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHV0ZjhlbmNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHV0ZjhlbmNvZGU7XG4gICAgdXRmOGVuY29kZSA9IG51bGw7XG4gIH1cblxuICB2YXIgZGF0YSA9IChwYWNrZXQuZGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgID8gdW5kZWZpbmVkXG4gICAgOiBwYWNrZXQuZGF0YS5idWZmZXIgfHwgcGFja2V0LmRhdGE7XG5cbiAgaWYgKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKEJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIGdsb2JhbC5CbG9iKSB7XG4gICAgcmV0dXJuIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gbWlnaHQgYmUgYW4gb2JqZWN0IHdpdGggeyBiYXNlNjQ6IHRydWUsIGRhdGE6IGRhdGFBc0Jhc2U2NFN0cmluZyB9XG4gIGlmIChkYXRhICYmIGRhdGEuYmFzZTY0KSB7XG4gICAgcmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNlbmRpbmcgZGF0YSBhcyBhIHV0Zi04IHN0cmluZ1xuICB2YXIgZW5jb2RlZCA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuXG4gIC8vIGRhdGEgZnJhZ21lbnQgaXMgb3B0aW9uYWxcbiAgaWYgKHVuZGVmaW5lZCAhPT0gcGFja2V0LmRhdGEpIHtcbiAgICBlbmNvZGVkICs9IHV0ZjhlbmNvZGUgPyB1dGY4LmVuY29kZShTdHJpbmcocGFja2V0LmRhdGEpLCB7IHN0cmljdDogZmFsc2UgfSkgOiBTdHJpbmcocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKCcnICsgZW5jb2RlZCk7XG5cbn07XG5cbmZ1bmN0aW9uIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKSB7XG4gIC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdICsgcGFja2V0LmRhdGEuZGF0YTtcbiAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgaGVscGVycyBmb3IgYmluYXJ5IHR5cGVzXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBkYXRhID0gcGFja2V0LmRhdGE7XG4gIHZhciBjb250ZW50QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHJlc3VsdEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDEgKyBkYXRhLmJ5dGVMZW5ndGgpO1xuXG4gIHJlc3VsdEJ1ZmZlclswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdEJ1ZmZlcltpKzFdID0gY29udGVudEFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgZnIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcGFja2V0LmRhdGEgPSBmci5yZXN1bHQ7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdHJ1ZSwgY2FsbGJhY2spO1xuICB9O1xuICByZXR1cm4gZnIucmVhZEFzQXJyYXlCdWZmZXIocGFja2V0LmRhdGEpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAoZG9udFNlbmRCbG9icykge1xuICAgIHJldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gIGxlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtsZW5ndGguYnVmZmVyLCBwYWNrZXQuZGF0YV0pO1xuXG4gIHJldHVybiBjYWxsYmFjayhibG9iKTtcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgcGFja2V0IHdpdGggYmluYXJ5IGRhdGEgaW4gYSBiYXNlNjQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCwgaGFzIGB0eXBlYCBhbmQgYGRhdGFgXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcbiAqL1xuXG5leHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgY2FsbGJhY2spIHtcbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBpZiAoQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIGdsb2JhbC5CbG9iKSB7XG4gICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiNjQgPSBmci5yZXN1bHQuc3BsaXQoJywnKVsxXTtcbiAgICAgIGNhbGxiYWNrKG1lc3NhZ2UgKyBiNjQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZyLnJlYWRBc0RhdGFVUkwocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgdmFyIGI2NGRhdGE7XG4gIHRyeSB7XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHdpdGggdHlwZWQgYXJyYXlzXG4gICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpO1xuICAgIHZhciBiYXNpYyA9IG5ldyBBcnJheSh0eXBlZC5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJhc2ljW2ldID0gdHlwZWRbaV07XG4gICAgfVxuICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJhc2ljKTtcbiAgfVxuICBtZXNzYWdlICs9IGdsb2JhbC5idG9hKGI2NGRhdGEpO1xuICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIERlY29kZXMgYSBwYWNrZXQuIENoYW5nZXMgZm9ybWF0IHRvIEJsb2IgaWYgcmVxdWVzdGVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgdXRmOGRlY29kZSkge1xuICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuICAvLyBTdHJpbmcgZGF0YVxuICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGRhdGEuY2hhckF0KDApID09PSAnYicpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldChkYXRhLnN1YnN0cigxKSwgYmluYXJ5VHlwZSk7XG4gICAgfVxuXG4gICAgaWYgKHV0ZjhkZWNvZGUpIHtcbiAgICAgIGRhdGEgPSB0cnlEZWNvZGUoZGF0YSk7XG4gICAgICBpZiAoZGF0YSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHR5cGUgPSBkYXRhLmNoYXJBdCgwKTtcblxuICAgIGlmIChOdW1iZXIodHlwZSkgIT0gdHlwZSB8fCAhcGFja2V0c2xpc3RbdHlwZV0pIHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IGRhdGEuc3Vic3RyaW5nKDEpIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIGFzQXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHR5cGUgPSBhc0FycmF5WzBdO1xuICB2YXIgcmVzdCA9IHNsaWNlQnVmZmVyKGRhdGEsIDEpO1xuICBpZiAoQmxvYiAmJiBiaW5hcnlUeXBlID09PSAnYmxvYicpIHtcbiAgICByZXN0ID0gbmV3IEJsb2IoW3Jlc3RdKTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogcmVzdCB9O1xufTtcblxuZnVuY3Rpb24gdHJ5RGVjb2RlKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBkYXRhID0gdXRmOC5kZWNvZGUoZGF0YSwgeyBzdHJpY3Q6IGZhbHNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIERlY29kZXMgYSBwYWNrZXQgZW5jb2RlZCBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihtc2csIGJpbmFyeVR5cGUpIHtcbiAgdmFyIHR5cGUgPSBwYWNrZXRzbGlzdFttc2cuY2hhckF0KDApXTtcbiAgaWYgKCFiYXNlNjRlbmNvZGVyKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogeyBiYXNlNjQ6IHRydWUsIGRhdGE6IG1zZy5zdWJzdHIoMSkgfSB9O1xuICB9XG5cbiAgdmFyIGRhdGEgPSBiYXNlNjRlbmNvZGVyLmRlY29kZShtc2cuc3Vic3RyKDEpKTtcblxuICBpZiAoYmluYXJ5VHlwZSA9PT0gJ2Jsb2InICYmIEJsb2IpIHtcbiAgICBkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgfVxuXG4gIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfTtcbn07XG5cbi8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkuXG4gKlxuICogICAgIDxsZW5ndGg+OmRhdGFcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAxMTpoZWxsbyB3b3JsZDI6aGlcbiAqXG4gKiBJZiBhbnkgY29udGVudHMgYXJlIGJpbmFyeSwgdGhleSB3aWxsIGJlIGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZ3MuIEJhc2U2NFxuICogZW5jb2RlZCBzdHJpbmdzIGFyZSBtYXJrZWQgd2l0aCBhIGIgYmVmb3JlIHRoZSBsZW5ndGggc3BlY2lmaWVyXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQmluYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICBzdXBwb3J0c0JpbmFyeSA9IG51bGw7XG4gIH1cblxuICB2YXIgaXNCaW5hcnkgPSBoYXNCaW5hcnkocGFja2V0cyk7XG5cbiAgaWYgKHN1cHBvcnRzQmluYXJ5ICYmIGlzQmluYXJ5KSB7XG4gICAgaWYgKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soJzA6Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsICFpc0JpbmFyeSA/IGZhbHNlIDogc3VwcG9ydHNCaW5hcnksIGZhbHNlLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBkb25lQ2FsbGJhY2sobnVsbCwgc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRzLmpvaW4oJycpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEFzeW5jIGFycmF5IG1hcCB1c2luZyBhZnRlclxuICovXG5cbmZ1bmN0aW9uIG1hcChhcnksIGVhY2gsIGRvbmUpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShhcnkubGVuZ3RoKTtcbiAgdmFyIG5leHQgPSBhZnRlcihhcnkubGVuZ3RoLCBkb25lKTtcblxuICB2YXIgZWFjaFdpdGhJbmRleCA9IGZ1bmN0aW9uKGksIGVsLCBjYikge1xuICAgIGVhY2goZWwsIGZ1bmN0aW9uKGVycm9yLCBtc2cpIHtcbiAgICAgIHJlc3VsdFtpXSA9IG1zZztcbiAgICAgIGNiKGVycm9yLCByZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgZWFjaFdpdGhJbmRleChpLCBhcnlbaV0sIG5leHQpO1xuICB9XG59XG5cbi8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFBvc3NpYmxlIGJpbmFyeSBjb250ZW50cyBhcmVcbiAqIGRlY29kZWQgZnJvbSB0aGVpciBiYXNlNjQgcmVwcmVzZW50YXRpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5KGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBwYWNrZXQ7XG4gIGlmIChkYXRhID09PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSAnJywgbiwgbXNnO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hyID0gZGF0YS5jaGFyQXQoaSk7XG5cbiAgICBpZiAoY2hyICE9PSAnOicpIHtcbiAgICAgIGxlbmd0aCArPSBjaHI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSAnJyB8fCAobGVuZ3RoICE9IChuID0gTnVtYmVyKGxlbmd0aCkpKSkge1xuICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgfVxuXG4gICAgbXNnID0gZGF0YS5zdWJzdHIoaSArIDEsIG4pO1xuXG4gICAgaWYgKGxlbmd0aCAhPSBtc2cubGVuZ3RoKSB7XG4gICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICB9XG5cbiAgICBpZiAobXNnLmxlbmd0aCkge1xuICAgICAgcGFja2V0ID0gZXhwb3J0cy5kZWNvZGVQYWNrZXQobXNnLCBiaW5hcnlUeXBlLCBmYWxzZSk7XG5cbiAgICAgIGlmIChlcnIudHlwZSA9PT0gcGFja2V0LnR5cGUgJiYgZXJyLmRhdGEgPT09IHBhY2tldC5kYXRhKSB7XG4gICAgICAgIC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXQgPSBjYWxsYmFjayhwYWNrZXQsIGkgKyBuLCBsKTtcbiAgICAgIGlmIChmYWxzZSA9PT0gcmV0KSByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYWR2YW5jZSBjdXJzb3JcbiAgICBpICs9IG47XG4gICAgbGVuZ3RoID0gJyc7XG4gIH1cblxuICBpZiAobGVuZ3RoICE9PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cbiAqXG4gKiA8MSA9IGJpbmFyeSwgMCA9IHN0cmluZz48bnVtYmVyIGZyb20gMC05PjxudW1iZXIgZnJvbSAwLTk+Wy4uLl08bnVtYmVyXG4gKiAyNTU+PGRhdGE+XG4gKlxuICogRXhhbXBsZTpcbiAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEFycmF5QnVmZmVyKDApKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIGRvbmVDYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgZW5jb2RlZFBhY2tldHMpIHtcbiAgICB2YXIgdG90YWxMZW5ndGggPSBlbmNvZGVkUGFja2V0cy5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBwKSB7XG4gICAgICB2YXIgbGVuO1xuICAgICAgaWYgKHR5cGVvZiBwID09PSAnc3RyaW5nJyl7XG4gICAgICAgIGxlbiA9IHAubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gcC5ieXRlTGVuZ3RoO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYyArIGxlbi50b1N0cmluZygpLmxlbmd0aCArIGxlbiArIDI7IC8vIHN0cmluZy9iaW5hcnkgaWRlbnRpZmllciArIHNlcGFyYXRvciA9IDJcbiAgICB9LCAwKTtcblxuICAgIHZhciByZXN1bHRBcnJheSA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTtcblxuICAgIHZhciBidWZmZXJJbmRleCA9IDA7XG4gICAgZW5jb2RlZFBhY2tldHMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgYWIgPSBwO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkocC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2aWV3W2ldID0gcC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGFiID0gdmlldy5idWZmZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1N0cmluZykgeyAvLyBub3QgdHJ1ZSBiaW5hcnlcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAwO1xuICAgICAgfSBlbHNlIHsgLy8gdHJ1ZSBiaW5hcnlcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuU3RyID0gYWIuYnl0ZUxlbmd0aC50b1N0cmluZygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAyNTU7XG5cbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gdmlld1tpXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRBcnJheS5idWZmZXIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogRW5jb2RlIGFzIEJsb2JcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IgPSBmdW5jdGlvbihwYWNrZXRzLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uKGVuY29kZWQpIHtcbiAgICAgIHZhciBiaW5hcnlJZGVudGlmaWVyID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMTtcbiAgICAgIGlmICh0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShlbmNvZGVkLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZpZXdbaV0gPSBlbmNvZGVkLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RlZCA9IHZpZXcuYnVmZmVyO1xuICAgICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbiA9IChlbmNvZGVkIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpXG4gICAgICAgID8gZW5jb2RlZC5ieXRlTGVuZ3RoXG4gICAgICAgIDogZW5jb2RlZC5zaXplO1xuXG4gICAgICB2YXIgbGVuU3RyID0gbGVuLnRvU3RyaW5nKCk7XG4gICAgICB2YXIgbGVuZ3RoQXJ5ID0gbmV3IFVpbnQ4QXJyYXkobGVuU3RyLmxlbmd0aCArIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGVuZ3RoQXJ5W2ldID0gcGFyc2VJbnQobGVuU3RyW2ldKTtcbiAgICAgIH1cbiAgICAgIGxlbmd0aEFyeVtsZW5TdHIubGVuZ3RoXSA9IDI1NTtcblxuICAgICAgaWYgKEJsb2IpIHtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbYmluYXJ5SWRlbnRpZmllci5idWZmZXIsIGxlbmd0aEFyeS5idWZmZXIsIGVuY29kZWRdKTtcbiAgICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIGJsb2IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBCbG9iKHJlc3VsdHMpKTtcbiAgfSk7XG59O1xuXG4vKlxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBTdHJpbmdzIGFyZSBkZWNvZGVkIGJ5XG4gKiBpbnRlcnByZXRpbmcgZWFjaCBieXRlIGFzIGEga2V5IGNvZGUgZm9yIGVudHJpZXMgbWFya2VkIHRvIHN0YXJ0IHdpdGggMC4gU2VlXG4gKiBkZXNjcmlwdGlvbiBvZiBlbmNvZGVQYXlsb2FkQXNCaW5hcnlcbiAqXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIGJ1ZmZlclRhaWwgPSBkYXRhO1xuICB2YXIgYnVmZmVycyA9IFtdO1xuXG4gIHdoaWxlIChidWZmZXJUYWlsLmJ5dGVMZW5ndGggPiAwKSB7XG4gICAgdmFyIHRhaWxBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlclRhaWwpO1xuICAgIHZhciBpc1N0cmluZyA9IHRhaWxBcnJheVswXSA9PT0gMDtcbiAgICB2YXIgbXNnTGVuZ3RoID0gJyc7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgOyBpKyspIHtcbiAgICAgIGlmICh0YWlsQXJyYXlbaV0gPT09IDI1NSkgYnJlYWs7XG5cbiAgICAgIC8vIDMxMCA9IGNoYXIgbGVuZ3RoIG9mIE51bWJlci5NQVhfVkFMVUVcbiAgICAgIGlmIChtc2dMZW5ndGgubGVuZ3RoID4gMzEwKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBtc2dMZW5ndGggKz0gdGFpbEFycmF5W2ldO1xuICAgIH1cblxuICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAyICsgbXNnTGVuZ3RoLmxlbmd0aCk7XG4gICAgbXNnTGVuZ3RoID0gcGFyc2VJbnQobXNnTGVuZ3RoKTtcblxuICAgIHZhciBtc2cgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAwLCBtc2dMZW5ndGgpO1xuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbXNnID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShtc2cpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgdG8gdHlwZWQgYXJyYXlzXG4gICAgICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KG1zZyk7XG4gICAgICAgIG1zZyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYnVmZmVycy5wdXNoKG1zZyk7XG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIG1zZ0xlbmd0aCk7XG4gIH1cblxuICB2YXIgdG90YWwgPSBidWZmZXJzLmxlbmd0aDtcbiAgYnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGJ1ZmZlciwgaSkge1xuICAgIGNhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlciwgYmluYXJ5VHlwZSwgdHJ1ZSksIGksIHRvdGFsKTtcbiAgfSk7XG59O1xuIiwiXG4vKipcbiAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0ga2V5c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzIChvYmope1xuICB2YXIgYXJyID0gW107XG4gIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwgaSkpIHtcbiAgICAgIGFyci5wdXNoKGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufTtcbiIsIi8qISBodHRwczovL210aHMuYmUvdXRmOGpzIHYyLjEuMiBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYFxuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgXG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHRtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAsIGZyb20gTm9kZS5qcyBvciBCcm93c2VyaWZpZWQgY29kZSxcblx0Ly8gYW5kIHVzZSBpdCBhcyBgcm9vdGBcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuXHQvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXTtcblx0XHR2YXIgY291bnRlciA9IDA7XG5cdFx0dmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cdFx0dmFyIHZhbHVlO1xuXHRcdHZhciBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0XHR2YXIgaW5kZXggPSAtMTtcblx0XHR2YXIgdmFsdWU7XG5cdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IGFycmF5W2luZGV4XTtcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHRmdW5jdGlvbiBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSB7XG5cdFx0aWYgKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRikge1xuXHRcdFx0aWYgKHN0cmljdCkge1xuXHRcdFx0XHR0aHJvdyBFcnJvcihcblx0XHRcdFx0XHQnTG9uZSBzdXJyb2dhdGUgVSsnICsgY29kZVBvaW50LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICtcblx0XHRcdFx0XHQnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZSdcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZnVuY3Rpb24gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIHNoaWZ0KSB7XG5cdFx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiBzaGlmdCkgJiAweDNGKSB8IDB4ODApO1xuXHR9XG5cblx0ZnVuY3Rpb24gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCwgc3RyaWN0KSB7XG5cdFx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGRjgwKSA9PSAwKSB7IC8vIDEtYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHRcdH1cblx0XHR2YXIgc3ltYm9sID0gJyc7XG5cdFx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGODAwKSA9PSAwKSB7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDYpICYgMHgxRikgfCAweEMwKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRjAwMDApID09IDApIHsgLy8gMy1ieXRlIHNlcXVlbmNlXG5cdFx0XHRpZiAoIWNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50LCBzdHJpY3QpKSB7XG5cdFx0XHRcdGNvZGVQb2ludCA9IDB4RkZGRDtcblx0XHRcdH1cblx0XHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiAxMikgJiAweDBGKSB8IDB4RTApO1xuXHRcdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCA2KTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZFMDAwMDApID09IDApIHsgLy8gNC1ieXRlIHNlcXVlbmNlXG5cdFx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTgpICYgMHgwNykgfCAweEYwKTtcblx0XHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgMTIpO1xuXHRcdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCA2KTtcblx0XHR9XG5cdFx0c3ltYm9sICs9IHN0cmluZ0Zyb21DaGFyQ29kZSgoY29kZVBvaW50ICYgMHgzRikgfCAweDgwKTtcblx0XHRyZXR1cm4gc3ltYm9sO1xuXHR9XG5cblx0ZnVuY3Rpb24gdXRmOGVuY29kZShzdHJpbmcsIG9wdHMpIHtcblx0XHRvcHRzID0gb3B0cyB8fCB7fTtcblx0XHR2YXIgc3RyaWN0ID0gZmFsc2UgIT09IG9wdHMuc3RyaWN0O1xuXG5cdFx0dmFyIGNvZGVQb2ludHMgPSB1Y3MyZGVjb2RlKHN0cmluZyk7XG5cdFx0dmFyIGxlbmd0aCA9IGNvZGVQb2ludHMubGVuZ3RoO1xuXHRcdHZhciBpbmRleCA9IC0xO1xuXHRcdHZhciBjb2RlUG9pbnQ7XG5cdFx0dmFyIGJ5dGVTdHJpbmcgPSAnJztcblx0XHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdFx0Y29kZVBvaW50ID0gY29kZVBvaW50c1tpbmRleF07XG5cdFx0XHRieXRlU3RyaW5nICs9IGVuY29kZUNvZGVQb2ludChjb2RlUG9pbnQsIHN0cmljdCk7XG5cdFx0fVxuXHRcdHJldHVybiBieXRlU3RyaW5nO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0ZnVuY3Rpb24gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKSB7XG5cdFx0aWYgKGJ5dGVJbmRleCA+PSBieXRlQ291bnQpIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcblx0XHR9XG5cblx0XHR2YXIgY29udGludWF0aW9uQnl0ZSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtcblx0XHRieXRlSW5kZXgrKztcblxuXHRcdGlmICgoY29udGludWF0aW9uQnl0ZSAmIDB4QzApID09IDB4ODApIHtcblx0XHRcdHJldHVybiBjb250aW51YXRpb25CeXRlICYgMHgzRjtcblx0XHR9XG5cblx0XHQvLyBJZiB3ZSBlbmQgdXAgaGVyZSwgaXTigJlzIG5vdCBhIGNvbnRpbnVhdGlvbiBieXRlXG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlY29kZVN5bWJvbChzdHJpY3QpIHtcblx0XHR2YXIgYnl0ZTE7XG5cdFx0dmFyIGJ5dGUyO1xuXHRcdHZhciBieXRlMztcblx0XHR2YXIgYnl0ZTQ7XG5cdFx0dmFyIGNvZGVQb2ludDtcblxuXHRcdGlmIChieXRlSW5kZXggPiBieXRlQ291bnQpIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcblx0XHR9XG5cblx0XHRpZiAoYnl0ZUluZGV4ID09IGJ5dGVDb3VudCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIFJlYWQgZmlyc3QgYnl0ZVxuXHRcdGJ5dGUxID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRcdGJ5dGVJbmRleCsrO1xuXG5cdFx0Ly8gMS1ieXRlIHNlcXVlbmNlIChubyBjb250aW51YXRpb24gYnl0ZXMpXG5cdFx0aWYgKChieXRlMSAmIDB4ODApID09IDApIHtcblx0XHRcdHJldHVybiBieXRlMTtcblx0XHR9XG5cblx0XHQvLyAyLWJ5dGUgc2VxdWVuY2Vcblx0XHRpZiAoKGJ5dGUxICYgMHhFMCkgPT0gMHhDMCkge1xuXHRcdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MUYpIDw8IDYpIHwgYnl0ZTI7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4ODApIHtcblx0XHRcdFx0cmV0dXJuIGNvZGVQb2ludDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuXHRcdGlmICgoYnl0ZTEgJiAweEYwKSA9PSAweEUwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwRikgPDwgMTIpIHwgKGJ5dGUyIDw8IDYpIHwgYnl0ZTM7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4MDgwMCkge1xuXHRcdFx0XHRyZXR1cm4gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkgPyBjb2RlUG9pbnQgOiAweEZGRkQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIDQtYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICgoYnl0ZTEgJiAweEY4KSA9PSAweEYwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwNykgPDwgMHgxMikgfCAoYnl0ZTIgPDwgMHgwQykgfFxuXHRcdFx0XHQoYnl0ZTMgPDwgMHgwNikgfCBieXRlNDtcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwMTAwMDAgJiYgY29kZVBvaW50IDw9IDB4MTBGRkZGKSB7XG5cdFx0XHRcdHJldHVybiBjb2RlUG9pbnQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgVVRGLTggZGV0ZWN0ZWQnKTtcblx0fVxuXG5cdHZhciBieXRlQXJyYXk7XG5cdHZhciBieXRlQ291bnQ7XG5cdHZhciBieXRlSW5kZXg7XG5cdGZ1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZywgb3B0cykge1xuXHRcdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHRcdHZhciBzdHJpY3QgPSBmYWxzZSAhPT0gb3B0cy5zdHJpY3Q7XG5cblx0XHRieXRlQXJyYXkgPSB1Y3MyZGVjb2RlKGJ5dGVTdHJpbmcpO1xuXHRcdGJ5dGVDb3VudCA9IGJ5dGVBcnJheS5sZW5ndGg7XG5cdFx0Ynl0ZUluZGV4ID0gMDtcblx0XHR2YXIgY29kZVBvaW50cyA9IFtdO1xuXHRcdHZhciB0bXA7XG5cdFx0d2hpbGUgKCh0bXAgPSBkZWNvZGVTeW1ib2woc3RyaWN0KSkgIT09IGZhbHNlKSB7XG5cdFx0XHRjb2RlUG9pbnRzLnB1c2godG1wKTtcblx0XHR9XG5cdFx0cmV0dXJuIHVjczJlbmNvZGUoY29kZVBvaW50cyk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHR2YXIgdXRmOCA9IHtcblx0XHQndmVyc2lvbic6ICcyLjEuMicsXG5cdFx0J2VuY29kZSc6IHV0ZjhlbmNvZGUsXG5cdFx0J2RlY29kZSc6IHV0ZjhkZWNvZGVcblx0fTtcblxuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB1dGY4O1xuXHRcdH0pO1xuXHR9XHRlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiAhZnJlZUV4cG9ydHMubm9kZVR5cGUpIHtcblx0XHRpZiAoZnJlZU1vZHVsZSkgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gdXRmODtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0dmFyIG9iamVjdCA9IHt9O1xuXHRcdFx0dmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0Lmhhc093blByb3BlcnR5O1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHV0ZjgpIHtcblx0XHRcdFx0aGFzT3duUHJvcGVydHkuY2FsbCh1dGY4LCBrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gdXRmOFtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnV0ZjggPSB1dGY4O1xuXHR9XG5cbn0odGhpcykpO1xuIiwiLyogZ2xvYmFsIEJsb2IgRmlsZSAqL1xuXG4vKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBnbG9iYWwuQmxvYiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5CbG9iKSA9PT0gJ1tvYmplY3QgQmxvYkNvbnN0cnVjdG9yXSc7XG52YXIgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgZ2xvYmFsLkZpbGUgPT09ICdmdW5jdGlvbicgfHwgdG9TdHJpbmcuY2FsbChnbG9iYWwuRmlsZSkgPT09ICdbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl0nO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4vKipcbiAqIENoZWNrcyBmb3IgYmluYXJ5IGRhdGEuXG4gKlxuICogU3VwcG9ydHMgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQmxvYiBhbmQgRmlsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gaGFzQmluYXJ5IChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICgodHlwZW9mIGdsb2JhbC5CdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgICh0eXBlb2YgZ2xvYmFsLkFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fFxuICAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpXG4gICAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2hhcy1iaW5hcnkvcHVsbC80XG4gIGlmIChvYmoudG9KU09OICYmIHR5cGVvZiBvYmoudG9KU09OID09PSAnZnVuY3Rpb24nICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG4iLCJcbnZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICBpZiAobXMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gIGlmIChtcyA8IG4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG1zIDwgbiAqIDEuNSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXHJcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcclxuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIHN0ciA9ICcnO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICBpZiAoc3RyLmxlbmd0aCkgc3RyICs9ICcmJztcclxuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHFzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24ocXMpe1xyXG4gIHZhciBxcnkgPSB7fTtcclxuICB2YXIgcGFpcnMgPSBxcy5zcGxpdCgnJicpO1xyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gcGFpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICB9XHJcbiAgcmV0dXJuIHFyeTtcclxufTtcclxuIiwiLyoqXHJcbiAqIFBhcnNlcyBhbiBVUklcclxuICpcclxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcclxuXHJcbnZhciBwYXJ0cyA9IFtcclxuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcclxuICAgIHZhciBzcmMgPSBzdHIsXHJcbiAgICAgICAgYiA9IHN0ci5pbmRleE9mKCdbJyksXHJcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XHJcblxyXG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXHJcbiAgICAgICAgdXJpID0ge30sXHJcbiAgICAgICAgaSA9IDE0O1xyXG5cclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcclxuICAgICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0LnN1YnN0cmluZygxLCB1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csICc6Jyk7XHJcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVyaTtcclxufTtcclxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHVybCA9IHJlcXVpcmUoJy4vdXJsJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIE1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBsb29rdXA7XG5cbi8qKlxuICogTWFuYWdlcnMgY2FjaGUuXG4gKi9cblxudmFyIGNhY2hlID0gZXhwb3J0cy5tYW5hZ2VycyA9IHt9O1xuXG4vKipcbiAqIExvb2tzIHVwIGFuIGV4aXN0aW5nIGBNYW5hZ2VyYCBmb3IgbXVsdGlwbGV4aW5nLlxuICogSWYgdGhlIHVzZXIgc3VtbW9uczpcbiAqXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9hJyk7YFxuICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYicpO2BcbiAqXG4gKiBXZSByZXVzZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYmFzZWQgb24gc2FtZSBzY2hlbWUvcG9ydC9ob3N0LFxuICogYW5kIHdlIGluaXRpYWxpemUgc29ja2V0cyBmb3IgZWFjaCBuYW1lc3BhY2UuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb29rdXAgKHVyaSwgb3B0cykge1xuICBpZiAodHlwZW9mIHVyaSA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHZhciBwYXJzZWQgPSB1cmwodXJpKTtcbiAgdmFyIHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gIHZhciBpZCA9IHBhcnNlZC5pZDtcbiAgdmFyIHBhdGggPSBwYXJzZWQucGF0aDtcbiAgdmFyIHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF0ubnNwcztcbiAgdmFyIG5ld0Nvbm5lY3Rpb24gPSBvcHRzLmZvcmNlTmV3IHx8IG9wdHNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gfHxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHwgc2FtZU5hbWVzcGFjZTtcblxuICB2YXIgaW87XG5cbiAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICBkZWJ1ZygnaWdub3Jpbmcgc29ja2V0IGNhY2hlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgaW8gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgIGRlYnVnKCduZXcgaW8gaW5zdGFuY2UgZm9yICVzJywgc291cmNlKTtcbiAgICAgIGNhY2hlW2lkXSA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgaW8gPSBjYWNoZVtpZF07XG4gIH1cbiAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnk7XG4gIH1cbiAgcmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCwgb3B0cyk7XG59XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XG5cbi8qKlxuICogYGNvbm5lY3RgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5jb25uZWN0ID0gbG9va3VwO1xuXG4vKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLk1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbmV4cG9ydHMuU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBlaW8gPSByZXF1aXJlKCdlbmdpbmUuaW8tY2xpZW50Jyk7XG52YXIgU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgb24gPSByZXF1aXJlKCcuL29uJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1iaW5kJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXInKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIEJhY2tvZmYgPSByZXF1aXJlKCdiYWNrbzInKTtcblxuLyoqXG4gKiBJRTYrIGhhc093blByb3BlcnR5XG4gKi9cblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hbmFnZXI7XG5cbi8qKlxuICogYE1hbmFnZXJgIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmdpbmUgaW5zdGFuY2Ugb3IgZW5naW5lIHVyaS9vcHRzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBNYW5hZ2VyICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1hbmFnZXIpKSByZXR1cm4gbmV3IE1hbmFnZXIodXJpLCBvcHRzKTtcbiAgaWYgKHVyaSAmJiAoJ29iamVjdCcgPT09IHR5cGVvZiB1cmkpKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSB1bmRlZmluZWQ7XG4gIH1cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8ICcvc29ja2V0LmlvJztcbiAgdGhpcy5uc3BzID0ge307XG4gIHRoaXMuc3VicyA9IFtdO1xuICB0aGlzLm9wdHMgPSBvcHRzO1xuICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKG9wdHMucmFuZG9taXphdGlvbkZhY3RvciB8fCAwLjUpO1xuICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgbWF4OiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksXG4gICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKVxuICB9KTtcbiAgdGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0ID8gMjAwMDAgOiBvcHRzLnRpbWVvdXQpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy51cmkgPSB1cmk7XG4gIHRoaXMuY29ubmVjdGluZyA9IFtdO1xuICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB2YXIgX3BhcnNlciA9IG9wdHMucGFyc2VyIHx8IHBhcnNlcjtcbiAgdGhpcy5lbmNvZGVyID0gbmV3IF9wYXJzZXIuRW5jb2RlcigpO1xuICB0aGlzLmRlY29kZXIgPSBuZXcgX3BhcnNlci5EZWNvZGVyKCk7XG4gIHRoaXMuYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIFByb3BhZ2F0ZSBnaXZlbiBldmVudCB0byBzb2NrZXRzIGFuZCBlbWl0IG9uIGB0aGlzYFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmVtaXRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgdGhpcy5uc3BzW25zcF0uZW1pdC5hcHBseSh0aGlzLm5zcHNbbnNwXSwgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIGBzb2NrZXQuaWRgIG9mIGFsbCBzb2NrZXRzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUudXBkYXRlU29ja2V0SWRzID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgdGhpcy5uc3BzW25zcF0uaWQgPSB0aGlzLmdlbmVyYXRlSWQobnNwKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2VuZXJhdGUgYHNvY2tldC5pZGAgZm9yIHRoZSBnaXZlbiBgbnNwYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuc3BcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmdlbmVyYXRlSWQgPSBmdW5jdGlvbiAobnNwKSB7XG4gIHJldHVybiAobnNwID09PSAnLycgPyAnJyA6IChuc3AgKyAnIycpKSArIHRoaXMuZW5naW5lLmlkO1xufTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoTWFuYWdlci5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldHMgdGhlIGByZWNvbm5lY3Rpb25gIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgaXQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbiA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyBiZWZvcmUgZ2l2aW5nIHVwXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXkgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1pbih2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yYW5kb21pemF0aW9uRmFjdG9yID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvcjtcbiAgdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0Sml0dGVyKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWF4aW11bSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5TWF4ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNYXgodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb25uZWN0aW9uIHRpbWVvdXQuIGBmYWxzZWAgdG8gZGlzYWJsZVxuICpcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gIHRoaXMuX3RpbWVvdXQgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gKiBzdGFydGVkIHJlY29ubmVjdGluZyB5ZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5tYXliZVJlY29ubmVjdE9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICBpZiAoIXRoaXMucmVjb25uZWN0aW5nICYmIHRoaXMuX3JlY29ubmVjdGlvbiAmJiB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAvLyBrZWVwcyByZWNvbm5lY3Rpb24gZnJvbSBmaXJpbmcgdHdpY2UgZm9yIHRoZSBzYW1lIHJlY29ubmVjdGlvbiBsb29wXG4gICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub3BlbiA9XG5NYW5hZ2VyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGZuLCBvcHRzKSB7XG4gIGRlYnVnKCdyZWFkeVN0YXRlICVzJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgaWYgKH50aGlzLnJlYWR5U3RhdGUuaW5kZXhPZignb3BlbicpKSByZXR1cm4gdGhpcztcblxuICBkZWJ1Zygnb3BlbmluZyAlcycsIHRoaXMudXJpKTtcbiAgdGhpcy5lbmdpbmUgPSBlaW8odGhpcy51cmksIHRoaXMub3B0cyk7XG4gIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuXG4gIC8vIGVtaXQgYG9wZW5gXG4gIHZhciBvcGVuU3ViID0gb24oc29ja2V0LCAnb3BlbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9ub3BlbigpO1xuICAgIGZuICYmIGZuKCk7XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfZXJyb3JgXG4gIHZhciBlcnJvclN1YiA9IG9uKHNvY2tldCwgJ2Vycm9yJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkZWJ1ZygnY29ubmVjdF9lcnJvcicpO1xuICAgIHNlbGYuY2xlYW51cCgpO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF9lcnJvcicsIGRhdGEpO1xuICAgIGlmIChmbikge1xuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignQ29ubmVjdGlvbiBlcnJvcicpO1xuICAgICAgZXJyLmRhdGEgPSBkYXRhO1xuICAgICAgZm4oZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgIHNlbGYubWF5YmVSZWNvbm5lY3RPbk9wZW4oKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfdGltZW91dGBcbiAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgIGRlYnVnKCdjb25uZWN0IGF0dGVtcHQgd2lsbCB0aW1lb3V0IGFmdGVyICVkJywgdGltZW91dCk7XG5cbiAgICAvLyBzZXQgdGltZXJcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlYnVnKCdjb25uZWN0IGF0dGVtcHQgdGltZWQgb3V0IGFmdGVyICVkJywgdGltZW91dCk7XG4gICAgICBvcGVuU3ViLmRlc3Ryb3koKTtcbiAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgc29ja2V0LmVtaXQoJ2Vycm9yJywgJ3RpbWVvdXQnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF90aW1lb3V0JywgdGltZW91dCk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLnN1YnMucHVzaChvcGVuU3ViKTtcbiAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdvcGVuJyk7XG5cbiAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgdGhpcy5jbGVhbnVwKCk7XG5cbiAgLy8gbWFyayBhcyBvcGVuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG5cbiAgLy8gYWRkIG5ldyBzdWJzXG4gIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZGF0YScsIGJpbmQodGhpcywgJ29uZGF0YScpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BpbmcnLCBiaW5kKHRoaXMsICdvbnBpbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdwb25nJywgYmluZCh0aGlzLCAnb25wb25nJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZXJyb3InLCBiaW5kKHRoaXMsICdvbmVycm9yJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24odGhpcy5kZWNvZGVyLCAnZGVjb2RlZCcsIGJpbmQodGhpcywgJ29uZGVjb2RlZCcpKSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgcGluZy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGFzdFBpbmcgPSBuZXcgRGF0ZSgpO1xuICB0aGlzLmVtaXRBbGwoJ3BpbmcnKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25wb25nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXRBbGwoJ3BvbmcnLCBuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0UGluZyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kZWNvZGVkID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICBkZWJ1ZygnZXJyb3InLCBlcnIpO1xuICB0aGlzLmVtaXRBbGwoJ2Vycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnNvY2tldCA9IGZ1bmN0aW9uIChuc3AsIG9wdHMpIHtcbiAgdmFyIHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICBpZiAoIXNvY2tldCkge1xuICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICB0aGlzLm5zcHNbbnNwXSA9IHNvY2tldDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc29ja2V0Lm9uKCdjb25uZWN0aW5nJywgb25Db25uZWN0aW5nKTtcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzb2NrZXQuaWQgPSBzZWxmLmdlbmVyYXRlSWQobnNwKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmF1dG9Db25uZWN0KSB7XG4gICAgICAvLyBtYW51YWxseSBjYWxsIGhlcmUgc2luY2UgY29ubmVjdGluZyBldmVudCBpcyBmaXJlZCBiZWZvcmUgbGlzdGVuaW5nXG4gICAgICBvbkNvbm5lY3RpbmcoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbm5lY3RpbmcgKCkge1xuICAgIGlmICghfmluZGV4T2Yoc2VsZi5jb25uZWN0aW5nLCBzb2NrZXQpKSB7XG4gICAgICBzZWxmLmNvbm5lY3RpbmcucHVzaChzb2NrZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb2NrZXQ7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICpcbiAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXRcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKHNvY2tldCkge1xuICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuY29ubmVjdGluZywgc29ja2V0KTtcbiAgaWYgKH5pbmRleCkgdGhpcy5jb25uZWN0aW5nLnNwbGljZShpbmRleCwgMSk7XG4gIGlmICh0aGlzLmNvbm5lY3RpbmcubGVuZ3RoKSByZXR1cm47XG5cbiAgdGhpcy5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBkZWJ1Zygnd3JpdGluZyBwYWNrZXQgJWonLCBwYWNrZXQpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChwYWNrZXQucXVlcnkgJiYgcGFja2V0LnR5cGUgPT09IDApIHBhY2tldC5uc3AgKz0gJz8nICsgcGFja2V0LnF1ZXJ5O1xuXG4gIGlmICghc2VsZi5lbmNvZGluZykge1xuICAgIC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbiAgICBzZWxmLmVuY29kaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCwgZnVuY3Rpb24gKGVuY29kZWRQYWNrZXRzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBzZWxmLmVuY29kaW5nID0gZmFsc2U7XG4gICAgICBzZWxmLnByb2Nlc3NQYWNrZXRRdWV1ZSgpO1xuICAgIH0pO1xuICB9IGVsc2UgeyAvLyBhZGQgcGFja2V0IHRvIHRoZSBxdWV1ZVxuICAgIHNlbGYucGFja2V0QnVmZmVyLnB1c2gocGFja2V0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBJZiBwYWNrZXQgYnVmZmVyIGlzIG5vbi1lbXB0eSwgYmVnaW5zIGVuY29kaW5nIHRoZVxuICogbmV4dCBwYWNrZXQgaW4gbGluZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wcm9jZXNzUGFja2V0UXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnBhY2tldEJ1ZmZlci5sZW5ndGggPiAwICYmICF0aGlzLmVuY29kaW5nKSB7XG4gICAgdmFyIHBhY2sgPSB0aGlzLnBhY2tldEJ1ZmZlci5zaGlmdCgpO1xuICAgIHRoaXMucGFja2V0KHBhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdjbGVhbnVwJyk7XG5cbiAgdmFyIHN1YnNMZW5ndGggPSB0aGlzLnN1YnMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNMZW5ndGg7IGkrKykge1xuICAgIHZhciBzdWIgPSB0aGlzLnN1YnMuc2hpZnQoKTtcbiAgICBzdWIuZGVzdHJveSgpO1xuICB9XG5cbiAgdGhpcy5wYWNrZXRCdWZmZXIgPSBbXTtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcblxuICB0aGlzLmRlY29kZXIuZGVzdHJveSgpO1xufTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPVxuTWFuYWdlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2Rpc2Nvbm5lY3QnKTtcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgLy8gYG9uY2xvc2VgIHdpbGwgbm90IGZpcmUgYmVjYXVzZVxuICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgfVxuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIGlmICh0aGlzLmVuZ2luZSkgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gIGRlYnVnKCdvbmNsb3NlJyk7XG5cbiAgdGhpcy5jbGVhbnVwKCk7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbik7XG5cbiAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdCkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICBkZWJ1ZygncmVjb25uZWN0IGZhaWxlZCcpO1xuICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgIHRoaXMuZW1pdEFsbCgncmVjb25uZWN0X2ZhaWxlZCcpO1xuICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgZGVidWcoJ3dpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdCcsIGRlbGF5KTtcblxuICAgIHRoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7XG4gICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9hdHRlbXB0Jywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0aW5nJywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcblxuICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KSByZXR1cm47XG5cbiAgICAgIHNlbGYub3BlbihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IGF0dGVtcHQgZXJyb3InKTtcbiAgICAgICAgICBzZWxmLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0KCk7XG4gICAgICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfZXJyb3InLCBlcnIuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBzdWNjZXNzJyk7XG4gICAgICAgICAgc2VsZi5vbnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCBkZWxheSk7XG5cbiAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy51cGRhdGVTb2NrZXRJZHMoKTtcbiAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3QnLCBhdHRlbXB0KTtcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBvbjtcblxuLyoqXG4gKiBIZWxwZXIgZm9yIHN1YnNjcmlwdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8RXZlbnRFbWl0dGVyfSBvYmogd2l0aCBgRW1pdHRlcmAgbWl4aW4gb3IgYEV2ZW50RW1pdHRlcmBcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBvbiAob2JqLCBldiwgZm4pIHtcbiAgb2JqLm9uKGV2LCBmbik7XG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgb2JqLnJlbW92ZUxpc3RlbmVyKGV2LCBmbik7XG4gICAgfVxuICB9O1xufVxuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciB0b0FycmF5ID0gcmVxdWlyZSgndG8tYXJyYXknKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBTb2NrZXQ7XG5cbi8qKlxuICogSW50ZXJuYWwgZXZlbnRzIChibGFja2xpc3RlZCkuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgZXZlbnRzID0ge1xuICBjb25uZWN0OiAxLFxuICBjb25uZWN0X2Vycm9yOiAxLFxuICBjb25uZWN0X3RpbWVvdXQ6IDEsXG4gIGNvbm5lY3Rpbmc6IDEsXG4gIGRpc2Nvbm5lY3Q6IDEsXG4gIGVycm9yOiAxLFxuICByZWNvbm5lY3Q6IDEsXG4gIHJlY29ubmVjdF9hdHRlbXB0OiAxLFxuICByZWNvbm5lY3RfZmFpbGVkOiAxLFxuICByZWNvbm5lY3RfZXJyb3I6IDEsXG4gIHJlY29ubmVjdGluZzogMSxcbiAgcGluZzogMSxcbiAgcG9uZzogMVxufTtcblxuLyoqXG4gKiBTaG9ydGN1dCB0byBgRW1pdHRlciNlbWl0YC5cbiAqL1xuXG52YXIgZW1pdCA9IEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7XG5cbi8qKlxuICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBTb2NrZXQgKGlvLCBuc3AsIG9wdHMpIHtcbiAgdGhpcy5pbyA9IGlvO1xuICB0aGlzLm5zcCA9IG5zcDtcbiAgdGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG4gIHRoaXMuaWRzID0gMDtcbiAgdGhpcy5hY2tzID0ge307XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICBpZiAob3B0cyAmJiBvcHRzLnF1ZXJ5KSB7XG4gICAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gIH1cbiAgaWYgKHRoaXMuaW8uYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnN1YkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3VicykgcmV0dXJuO1xuXG4gIHZhciBpbyA9IHRoaXMuaW87XG4gIHRoaXMuc3VicyA9IFtcbiAgICBvbihpbywgJ29wZW4nLCBiaW5kKHRoaXMsICdvbm9wZW4nKSksXG4gICAgb24oaW8sICdwYWNrZXQnLCBiaW5kKHRoaXMsICdvbnBhY2tldCcpKSxcbiAgICBvbihpbywgJ2Nsb3NlJywgYmluZCh0aGlzLCAnb25jbG9zZScpKVxuICBdO1xufTtcblxuLyoqXG4gKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUub3BlbiA9XG5Tb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbm5lY3RlZCkgcmV0dXJuIHRoaXM7XG5cbiAgdGhpcy5zdWJFdmVudHMoKTtcbiAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gIGlmICgnb3BlbicgPT09IHRoaXMuaW8ucmVhZHlTdGF0ZSkgdGhpcy5vbm9wZW4oKTtcbiAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgYXJncy51bnNoaWZ0KCdtZXNzYWdlJyk7XG4gIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGBlbWl0YC5cbiAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2KSB7XG4gIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gIHZhciBwYWNrZXQgPSB7IHR5cGU6IHBhcnNlci5FVkVOVCwgZGF0YTogYXJncyB9O1xuXG4gIHBhY2tldC5vcHRpb25zID0ge307XG4gIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gIXRoaXMuZmxhZ3MgfHwgZmFsc2UgIT09IHRoaXMuZmxhZ3MuY29tcHJlc3M7XG5cbiAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgZGVidWcoJ2VtaXR0aW5nIHBhY2tldCB3aXRoIGFjayBpZCAlZCcsIHRoaXMuaWRzKTtcbiAgICB0aGlzLmFja3NbdGhpcy5pZHNdID0gYXJncy5wb3AoKTtcbiAgICBwYWNrZXQuaWQgPSB0aGlzLmlkcysrO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG5cbiAgZGVsZXRlIHRoaXMuZmxhZ3M7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBwYWNrZXQubnNwID0gdGhpcy5uc3A7XG4gIHRoaXMuaW8ucGFja2V0KHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCd0cmFuc3BvcnQgaXMgb3BlbiAtIGNvbm5lY3RpbmcnKTtcblxuICAvLyB3cml0ZSBjb25uZWN0IHBhY2tldCBpZiBuZWNlc3NhcnlcbiAgaWYgKCcvJyAhPT0gdGhpcy5uc3ApIHtcbiAgICBpZiAodGhpcy5xdWVyeSkge1xuICAgICAgdmFyIHF1ZXJ5ID0gdHlwZW9mIHRoaXMucXVlcnkgPT09ICdvYmplY3QnID8gcGFyc2Vxcy5lbmNvZGUodGhpcy5xdWVyeSkgOiB0aGlzLnF1ZXJ5O1xuICAgICAgZGVidWcoJ3NlbmRpbmcgY29ubmVjdCBwYWNrZXQgd2l0aCBxdWVyeSAlcycsIHF1ZXJ5KTtcbiAgICAgIHRoaXMucGFja2V0KHt0eXBlOiBwYXJzZXIuQ09OTkVDVCwgcXVlcnk6IHF1ZXJ5fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFja2V0KHt0eXBlOiBwYXJzZXIuQ09OTkVDVH0pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gIGRlYnVnKCdjbG9zZSAoJXMpJywgcmVhc29uKTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICBkZWxldGUgdGhpcy5pZDtcbiAgdGhpcy5lbWl0KCdkaXNjb25uZWN0JywgcmVhc29uKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9ucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBpZiAocGFja2V0Lm5zcCAhPT0gdGhpcy5uc3ApIHJldHVybjtcblxuICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgY2FzZSBwYXJzZXIuQ09OTkVDVDpcbiAgICAgIHRoaXMub25jb25uZWN0KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkVWRU5UOlxuICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9FVkVOVDpcbiAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5BQ0s6XG4gICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9BQ0s6XG4gICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkRJU0NPTk5FQ1Q6XG4gICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5FUlJPUjpcbiAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBwYWNrZXQuZGF0YSk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZXZlbnQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHZhciBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gIGRlYnVnKCdlbWl0dGluZyBldmVudCAlaicsIGFyZ3MpO1xuXG4gIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgIGRlYnVnKCdhdHRhY2hpbmcgYWNrIGNhbGxiYWNrIHRvIGV2ZW50Jyk7XG4gICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChhcmdzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuYWNrID0gZnVuY3Rpb24gKGlkKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNlbnQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICBpZiAoc2VudCkgcmV0dXJuO1xuICAgIHNlbnQgPSB0cnVlO1xuICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgIGRlYnVnKCdzZW5kaW5nIGFjayAlaicsIGFyZ3MpO1xuXG4gICAgc2VsZi5wYWNrZXQoe1xuICAgICAgdHlwZTogcGFyc2VyLkFDSyxcbiAgICAgIGlkOiBpZCxcbiAgICAgIGRhdGE6IGFyZ3NcbiAgICB9KTtcbiAgfTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmFjayA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIGFjayA9IHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGFjaykge1xuICAgIGRlYnVnKCdjYWxsaW5nIGFjayAlcyB3aXRoICVqJywgcGFja2V0LmlkLCBwYWNrZXQuZGF0YSk7XG4gICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ2JhZCBhY2sgJXMnLCBwYWNrZXQuaWQpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnY29ubmVjdCcpO1xuICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xufTtcblxuLyoqXG4gKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZW1pdEJ1ZmZlcmVkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IHRoaXMucmVjZWl2ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgIGVtaXQuYXBwbHkodGhpcywgdGhpcy5yZWNlaXZlQnVmZmVyW2ldKTtcbiAgfVxuICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5wYWNrZXQodGhpcy5zZW5kQnVmZmVyW2ldKTtcbiAgfVxuICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzZXJ2ZXIgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgdGhpcy5vbmNsb3NlKCdpbyBzZXJ2ZXIgZGlzY29ubmVjdCcpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZS5cbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnN1YnMpIHtcbiAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5zdWJzW2ldLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5zdWJzID0gbnVsbDtcbiAgfVxuXG4gIHRoaXMuaW8uZGVzdHJveSh0aGlzKTtcbn07XG5cbi8qKlxuICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9XG5Tb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIGRlYnVnKCdwZXJmb3JtaW5nIGRpc2Nvbm5lY3QgKCVzKScsIHRoaXMubnNwKTtcbiAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHBhcnNlci5ESVNDT05ORUNUIH0pO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgdGhpcy5kZXN0cm95KCk7XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgLy8gZmlyZSBldmVudHNcbiAgICB0aGlzLm9uY2xvc2UoJ2lvIGNsaWVudCBkaXNjb25uZWN0Jyk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuY29tcHJlc3MgPSBmdW5jdGlvbiAoY29tcHJlc3MpIHtcbiAgdGhpcy5mbGFncyA9IHRoaXMuZmxhZ3MgfHwge307XG4gIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNldXJpID0gcmVxdWlyZSgncGFyc2V1cmknKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6dXJsJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB1cmw7XG5cbi8qKlxuICogVVJMIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICAgICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHVybCAodXJpLCBsb2MpIHtcbiAgdmFyIG9iaiA9IHVyaTtcblxuICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO1xuICBpZiAobnVsbCA9PSB1cmkpIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDtcblxuICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdXJpKSB7XG4gICAgaWYgKCcvJyA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgaWYgKCcvJyA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgZGVidWcoJ3Byb3RvY29sLWxlc3MgdXJsICVzJywgdXJpKTtcbiAgICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgdXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gJ2h0dHBzOi8vJyArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZVxuICAgIGRlYnVnKCdwYXJzZSAlcycsIHVyaSk7XG4gICAgb2JqID0gcGFyc2V1cmkodXJpKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICBpZiAoIW9iai5wb3J0KSB7XG4gICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICBvYmoucG9ydCA9ICc4MCc7XG4gICAgfSBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgIG9iai5wb3J0ID0gJzQ0Myc7XG4gICAgfVxuICB9XG5cbiAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCAnLyc7XG5cbiAgdmFyIGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKCc6JykgIT09IC0xO1xuICB2YXIgaG9zdCA9IGlwdjYgPyAnWycgKyBvYmouaG9zdCArICddJyA6IG9iai5ob3N0O1xuXG4gIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgJzonICsgb2JqLnBvcnQ7XG4gIC8vIGRlZmluZSBocmVmXG4gIG9iai5ocmVmID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyAnJyA6ICgnOicgKyBvYmoucG9ydCkpO1xuXG4gIHJldHVybiBvYmo7XG59XG4iLCIvKmdsb2JhbCBCbG9iLEZpbGUqL1xuXG4vKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHNcbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIGdsb2JhbC5CbG9iID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkJsb2IpID09PSAnW29iamVjdCBCbG9iQ29uc3RydWN0b3JdJztcbnZhciB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBnbG9iYWwuRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5GaWxlKSA9PT0gJ1tvYmplY3QgRmlsZUNvbnN0cnVjdG9yXSc7XG5cbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cbiAqIEFueXRoaW5nIHdpdGggYmxvYnMgb3IgZmlsZXMgc2hvdWxkIGJlIGZlZCB0aHJvdWdoIHJlbW92ZUJsb2JzIGJlZm9yZSBjb21pbmdcbiAqIGhlcmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpIHtcbiAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgdmFyIHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgdmFyIHBhY2sgPSBwYWNrZXQ7XG4gIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgcGFjay5hdHRhY2htZW50cyA9IGJ1ZmZlcnMubGVuZ3RoOyAvLyBudW1iZXIgb2YgYmluYXJ5ICdhdHRhY2htZW50cydcbiAgcmV0dXJuIHtwYWNrZXQ6IHBhY2ssIGJ1ZmZlcnM6IGJ1ZmZlcnN9O1xufTtcblxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICBpZiAoaXNCdWYoZGF0YSkpIHtcbiAgICB2YXIgcGxhY2Vob2xkZXIgPSB7IF9wbGFjZWhvbGRlcjogdHJ1ZSwgbnVtOiBidWZmZXJzLmxlbmd0aCB9O1xuICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgIHZhciBuZXdEYXRhID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgIHZhciBuZXdEYXRhID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBSZWNvbnN0cnVjdHMgYSBiaW5hcnkgcGFja2V0IGZyb20gaXRzIHBsYWNlaG9sZGVyIHBhY2tldCBhbmQgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlcnMgLSBiaW5hcnkgYnVmZmVycyB0byBwdXQgaW4gcGxhY2Vob2xkZXIgcG9zaXRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgcmV0dXJuIHBhY2tldDtcbn07XG5cbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuIGRhdGE7XG5cbiAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICByZXR1cm4gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSByZW1vdmVzIEJsb2JzIG9yIEZpbGVzIGZyb20gZGF0YSB2aWFcbiAqIEZpbGVSZWFkZXIncyByZWFkQXNBcnJheUJ1ZmZlciBtZXRob2QuIFVzZWQgYmVmb3JlIGVuY29kaW5nXG4gKiBkYXRhIGFzIG1zZ3BhY2suIENhbGxzIGNhbGxiYWNrIHdpdGggdGhlIGJsb2JsZXNzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJlbW92ZUJsb2JzID0gZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gX3JlbW92ZUJsb2JzKG9iaiwgY3VyS2V5LCBjb250YWluaW5nT2JqZWN0KSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBvYmo7XG5cbiAgICAvLyBjb252ZXJ0IGFueSBibG9iXG4gICAgaWYgKCh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpIHtcbiAgICAgIHBlbmRpbmdCbG9icysrO1xuXG4gICAgICAvLyBhc3luYyBmaWxlcmVhZGVyXG4gICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyAvLyB0aGlzLnJlc3VsdCA9PSBhcnJheWJ1ZmZlclxuICAgICAgICBpZiAoY29udGFpbmluZ09iamVjdCkge1xuICAgICAgICAgIGNvbnRhaW5pbmdPYmplY3RbY3VyS2V5XSA9IHRoaXMucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGJsb2JsZXNzRGF0YSA9IHRoaXMucmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm90aGluZyBwZW5kaW5nIGl0cyBjYWxsYmFjayB0aW1lXG4gICAgICAgIGlmKCEgLS1wZW5kaW5nQmxvYnMpIHtcbiAgICAgICAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKG9iaik7IC8vIGJsb2IgLT4gYXJyYXlidWZmZXJcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqKSkgeyAvLyBoYW5kbGUgYXJyYXlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9yZW1vdmVCbG9icyhvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhaXNCdWYob2JqKSkgeyAvLyBhbmQgb2JqZWN0XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIF9yZW1vdmVCbG9icyhvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBwZW5kaW5nQmxvYnMgPSAwO1xuICB2YXIgYmxvYmxlc3NEYXRhID0gZGF0YTtcbiAgX3JlbW92ZUJsb2JzKGJsb2JsZXNzRGF0YSk7XG4gIGlmICghcGVuZGluZ0Jsb2JzKSB7XG4gICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgfVxufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBoYXNCaW4gPSByZXF1aXJlKCdoYXMtYmluYXJ5MicpO1xudmFyIGJpbmFyeSA9IHJlcXVpcmUoJy4vYmluYXJ5Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0J1ZiA9IHJlcXVpcmUoJy4vaXMtYnVmZmVyJyk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudHlwZXMgPSBbXG4gICdDT05ORUNUJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRVZFTlQnLFxuICAnQUNLJyxcbiAgJ0VSUk9SJyxcbiAgJ0JJTkFSWV9FVkVOVCcsXG4gICdCSU5BUllfQUNLJ1xuXTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkNPTk5FQ1QgPSAwO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBkaXNjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRElTQ09OTkVDVCA9IDE7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGV2ZW50YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVZFTlQgPSAyO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBhY2tgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5BQ0sgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBlcnJvcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVSUk9SID0gNDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfRVZFTlQgPSA1O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBiaW5hcnkgYWNrYC4gRm9yIGFja3Mgd2l0aCBiaW5hcnkgYXJndW1lbnRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5CSU5BUllfQUNLID0gNjtcblxuLyoqXG4gKiBFbmNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjtcblxuLyoqXG4gKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5EZWNvZGVyID0gRGVjb2RlcjtcblxuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbmNvZGVyKCkge31cblxuLyoqXG4gKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGhhbmRsZSBlbmNvZGluZ3MgKGxpa2VseSBlbmdpbmUud3JpdGUpXG4gKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2spe1xuICBpZiAoKG9iai50eXBlID09PSBleHBvcnRzLkVWRU5UIHx8IG9iai50eXBlID09PSBleHBvcnRzLkFDSykgJiYgaGFzQmluKG9iai5kYXRhKSkge1xuICAgIG9iai50eXBlID0gb2JqLnR5cGUgPT09IGV4cG9ydHMuRVZFTlQgPyBleHBvcnRzLkJJTkFSWV9FVkVOVCA6IGV4cG9ydHMuQklOQVJZX0FDSztcbiAgfVxuXG4gIGRlYnVnKCdlbmNvZGluZyBwYWNrZXQgJWonLCBvYmopO1xuXG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBvYmoudHlwZSkge1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaiwgY2FsbGJhY2spO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBlbmNvZGluZyA9IGVuY29kZUFzU3RyaW5nKG9iaik7XG4gICAgY2FsbGJhY2soW2VuY29kaW5nXSk7XG4gIH1cbn07XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBc1N0cmluZyhvYmopIHtcblxuICAvLyBmaXJzdCBpcyB0eXBlXG4gIHZhciBzdHIgPSAnJyArIG9iai50eXBlO1xuXG4gIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gb2JqLnR5cGUpIHtcbiAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgJy0nO1xuICB9XG5cbiAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgaWYgKG9iai5uc3AgJiYgJy8nICE9PSBvYmoubnNwKSB7XG4gICAgc3RyICs9IG9iai5uc3AgKyAnLCc7XG4gIH1cblxuICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgc3RyICs9IG9iai5pZDtcbiAgfVxuXG4gIC8vIGpzb24gZGF0YVxuICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSk7XG4gIH1cblxuICBkZWJ1ZygnZW5jb2RlZCAlaiBhcyAlcycsIG9iaiwgc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAqIGRlY29uc3RydWN0aW5nIHBhY2tldCBpbnRvIG9iamVjdCB3aXRoIHBsYWNlaG9sZGVycyBhbmRcbiAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjaykge1xuXG4gIGZ1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKSB7XG4gICAgdmFyIGRlY29uc3RydWN0aW9uID0gYmluYXJ5LmRlY29uc3RydWN0UGFja2V0KGJsb2JsZXNzRGF0YSk7XG4gICAgdmFyIHBhY2sgPSBlbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgIHZhciBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcblxuICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICBjYWxsYmFjayhidWZmZXJzKTsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gIH1cblxuICBiaW5hcnkucmVtb3ZlQmxvYnMob2JqLCB3cml0ZUVuY29kaW5nKTtcbn1cblxuLyoqXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIERlY29kZXIoKSB7XG4gIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYCB3aXRoIERlY29kZXIuXG4gKi9cblxuRW1pdHRlcihEZWNvZGVyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGVjb2RlcyBhbiBlY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRGVjb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciBwYWNrZXQ7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHBhY2tldCA9IGRlY29kZVN0cmluZyhvYmopO1xuICAgIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gcGFja2V0LnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBwYWNrZXQudHlwZSkgeyAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcblxuICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoaXNCdWYob2JqKSB8fCBvYmouYmFzZTY0KSB7IC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgIGlmIChwYWNrZXQpIHsgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgb2JqKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgdmFyIGkgPSAwO1xuICAvLyBsb29rIHVwIHR5cGVcbiAgdmFyIHAgPSB7XG4gICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpXG4gIH07XG5cbiAgaWYgKG51bGwgPT0gZXhwb3J0cy50eXBlc1twLnR5cGVdKSB7XG4gICAgcmV0dXJuIGVycm9yKCd1bmtub3duIHBhY2tldCB0eXBlICcgKyBwLnR5cGUpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IHAudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IHAudHlwZSkge1xuICAgIHZhciBidWYgPSAnJztcbiAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9PSAnLScpIHtcbiAgICAgIGJ1ZiArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKGkgPT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gJy0nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXR0YWNobWVudHMnKTtcbiAgICB9XG4gICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgaWYgKCcvJyA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICBwLm5zcCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmICgnLCcgPT09IGMpIGJyZWFrO1xuICAgICAgcC5uc3AgKz0gYztcbiAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcC5uc3AgPSAnLyc7XG4gIH1cblxuICAvLyBsb29rIHVwIGlkXG4gIHZhciBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gIGlmICgnJyAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgIHAuaWQgPSAnJztcbiAgICB3aGlsZSAoKytpKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgIC0taTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBwLmlkICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIHAuaWQgPSBOdW1iZXIocC5pZCk7XG4gIH1cblxuICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgdmFyIHBheWxvYWQgPSB0cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICB2YXIgaXNQYXlsb2FkVmFsaWQgPSBwYXlsb2FkICE9PSBmYWxzZSAmJiAocC50eXBlID09PSBleHBvcnRzLkVSUk9SIHx8IGlzQXJyYXkocGF5bG9hZCkpO1xuICAgIGlmIChpc1BheWxvYWRWYWxpZCkge1xuICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVycm9yKCdpbnZhbGlkIHBheWxvYWQnKTtcbiAgICB9XG4gIH1cblxuICBkZWJ1ZygnZGVjb2RlZCAlcyBhcyAlaicsIHN0ciwgcCk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiB0cnlQYXJzZShzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICB9XG59O1xuXG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KSB7XG4gIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLnRha2VCaW5hcnlEYXRhID0gZnVuY3Rpb24oYmluRGF0YSkge1xuICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7IC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgIHZhciBwYWNrZXQgPSBiaW5hcnkucmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgcmV0dXJuIHBhY2tldDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn07XG5cbmZ1bmN0aW9uIGVycm9yKG1zZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGV4cG9ydHMuRVJST1IsXG4gICAgZGF0YTogJ3BhcnNlciBlcnJvcjogJyArIG1zZ1xuICB9O1xufVxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmO1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBidWZmZXIgb3IgYW4gYXJyYXlidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNCdWYob2JqKSB7XG4gIHJldHVybiAoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgICAgICAoZ2xvYmFsLkFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKSkpO1xufVxuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gdG9BcnJheVxuXG5mdW5jdGlvbiB0b0FycmF5KGxpc3QsIGluZGV4KSB7XG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGluZGV4ID0gaW5kZXggfHwgMFxuXG4gICAgZm9yICh2YXIgaSA9IGluZGV4IHx8IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2kgLSBpbmRleF0gPSBsaXN0W2ldXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG59XG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIi8qKlxuICog0JzQvtC00YPQu9GMINC60LDQvNC10YDRi1xuICovXG5cbmNvbnN0IE1BWF9ERUFEWk9ORV9YID0gNTAwO1xuY29uc3QgTUFYX0RFQURaT05FX1kgPSA1MDA7XG5cbi8qKlxuICogQGNsYXNzIENhbWVyYVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2FudmFzLCBmb2xsb3dlcil7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICAgICAgICB0aGlzLmRlYWRab25lID0ge1xuICAgICAgICAgICAgeDogTUFYX0RFQURaT05FX1gsXG4gICAgICAgICAgICB5OiBNQVhfREVBRFpPTkVfWVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIHRoaXMuc3BlZWQgPSAyMDA7XG5cbiAgICAgICAgdGhpcy5mb2xsb3dlciA9IGZvbGxvd2VyO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpe1xuXG4gICAgICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICBsZXQgeCA9IHRoaXMueCAtIE1hdGguZmxvb3IoKHdpZHRoIC0gdGhpcy53aWR0aCkvMik7XG4gICAgICAgIGxldCB5ID0gdGhpcy55IC0gTWF0aC5mbG9vcigoaGVpZ2h0IC0gdGhpcy5oZWlnaHQpLzIpO1xuICAgICAgICBpZih4IDwgMCkgeCA9IDA7XG4gICAgICAgIGlmKHk8MCkgeSA9IDA7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUocm9vbSl7XG5cbiAgICAgICAgaWYodGhpcy5mb2xsb3dlcil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5Gb2xsb3cocm9vbSwgdGhpcy5mb2xsb3dlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRGb2xsb3dlcihmb2xsb3dlcil7XG4gICAgICAgIHRoaXMuZm9sbG93ZXIgPSBmb2xsb3dlcjtcbiAgICB9XG5cbiAgICBydW5Gb2xsb3cocm9vbSwgcGxheWVyKXtcblxuICAgICAgICAvKipcbiAgICAgICAgICog0J/QtdGA0LXRgdGH0LjRgtCw0LXQvCBcItC80LXRgNGC0LLRi9C1INC30L7QvdGLXCJcbiAgICAgICAgICovXG5cbiAgICAgICAgLy8g0JHQtdGA0LXQvCDQv9C+0LvQvtCy0LjQvdGDINC60LDQvNC10YDRi1xuICAgICAgICB0aGlzLmRlYWRab25lLnggPSBNYXRoLmZsb29yKHRoaXMud2lkdGgvMik7XG4gICAgICAgIHRoaXMuZGVhZFpvbmUueSA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQvMik7XG5cblxuICAgICAgICAvLyDQo9GH0YLQtdC8LCDRh9GC0L4g0LrQvtC80L3QsNGC0LAg0LzQvtC20LXRgiDQsdGL0YLRjCDQvNC10L3RjNGI0LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKHJvb20ud2lkdGggPCB0aGlzLmNhbnZhcy53aWR0aCl7XG4gICAgICAgICAgICB0aGlzLmRlYWRab25lLnggPSBNYXRoLmZsb29yKChyb29tLndpZHRoIC0gdGhpcy5jYW52YXMud2lkdGgpLzIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHJvb20uaGVpZ2h0IDwgdGhpcy5jYW52YXMuaGVpZ2h0KXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueSA9IE1hdGguZmxvb3IoKHJvb20uaGVpZ2h0IC0gdGhpcy5jYW52YXMuaGVpZ2h0KS8yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCd0LUg0LTQtdC70LDQtdC8INC+0YfQtdC90Ywg0LHQvtC70YzRiNC40LUgXCLQvNC10YDRgtCy0YvQtSDQt9C+0L3Ri1wiXG4gICAgICAgIGlmKHRoaXMuZGVhZFpvbmUueCA+IE1BWF9ERUFEWk9ORV9YKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueCA9IE1BWF9ERUFEWk9ORV9YO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZGVhZFpvbmUueSA+IE1BWF9ERUFEWk9ORV9ZKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueSA9IE1BWF9ERUFEWk9ORV9ZO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog0KHQu9C10LTRg9C10Lwg0LfQsCDQv9C70LXQtdGA0L7QvFxuICAgICAgICAgKi9cbiAgICAgICAgaWYocGxheWVyLnggLSB0aGlzLnggPiB0aGlzLndpZHRoIC0gdGhpcy5kZWFkWm9uZS54KSB7XG4gICAgICAgICAgICB0aGlzLnggPSBwbGF5ZXIueCAtIHRoaXMud2lkdGggKyB0aGlzLmRlYWRab25lLng7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihwbGF5ZXIueCA8IHRoaXMueCArIHRoaXMuZGVhZFpvbmUueCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcGxheWVyLnggLSB0aGlzLmRlYWRab25lLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZihwbGF5ZXIueSAtIHRoaXMueSA+IHRoaXMuaGVpZ2h0IC0gdGhpcy5kZWFkWm9uZS55KSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBwbGF5ZXIueSAtIHRoaXMuaGVpZ2h0ICsgdGhpcy5kZWFkWm9uZS55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocGxheWVyLnkgPCB0aGlzLnkgKyB0aGlzLmRlYWRab25lLnkpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHBsYXllci55IC0gdGhpcy5kZWFkWm9uZS55O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCd0LUg0LLRi9GF0L7QtNC40Lwg0LfQsCDQs9GA0LDQvdC40YbRiyDQutCw0YDRgtGLXG4gICAgICAgICAqL1xuICAgICAgICBpZih0aGlzLnggPCAwKVxuICAgICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgaWYodGhpcy55IDwgMClcbiAgICAgICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIGlmKHRoaXMueCArIHRoaXMud2lkdGggPiByb29tLndpZHRoKVxuICAgICAgICAgICAgdGhpcy54ID0gcm9vbS53aWR0aCAtIHRoaXMud2lkdGg7XG4gICAgICAgIGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0ID4gcm9vbS5oZWlnaHQpXG4gICAgICAgICAgICB0aGlzLnkgPSByb29tLmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCV0YHQu9C4INC60LDQvNC10YDQsCDQsdC+0LvRjNGI0LUg0LrQsNGA0YLRiyAtINC00L7QsdCw0LLQuNC8INGB0LzQtdGJ0LXQvdC40LVcbiAgICAgICAgICovXG4gICAgICAgIGlmKHRoaXMud2lkdGggPiByb29tLndpZHRoKVxuICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLndpZHRoIC0gcm9vbS53aWR0aCkvMjtcbiAgICAgICAgaWYodGhpcy5oZWlnaHQgPiByb29tLmhlaWdodClcbiAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5oZWlnaHQgLSByb29tLmhlaWdodCkvMjtcblxuXG4gICAgfVxufSIsIi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAgLSDQutC70LDQstC40YjQuCDQuCDQvNGL0YjRjFxuICogVE9ETzog0LzQvtC20LXRgiDQutC+0LzQsNC90LTRiyDQvNC10L3RjiDRgtC+0LbQtSDRgdC+0LHRi9GC0LjRj9C80LhcbiAqL1xuXG5cbi8vINC/0L7QtNC60LvRjtGH0LjQvCDRgdC+0LHRi9GC0LjRj1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuLi8uLi9ldmVudHMuanMnXG5cblxuY29uc3Qga2V5cyA9IHtcbiAgICBMRUZUOiAzNywgLy9MZWZ0XG4gICAgVVA6IDM4LCAvL1VwXG4gICAgUklHSFQ6IDM5LCAvL1JpZ2h0XG4gICAgRE9XTjogNDAsIC8vRG93blxuXG4gICAgQTogNjUsIC8vQVxuICAgIFc6IDg3LCAvL1dcbiAgICBEOiA2OCwgLy9EXG4gICAgUzogODMsIC8vIFNcblxuICAgIE4xOiA0OSxcbiAgICBOMjogNTAsXG4gICAgTjM6IDUxLFxuICAgIE40OiA1MixcbiAgICBONTogNTMsXG4gICAgTjY6IDU0LFxuICAgIE43OiA1NSxcbiAgICBOODogNTYsXG4gICAgTjk6IDU3LFxuICAgIE4wOiA0OCxcblxuICAgIFNQQUNFOiAzMiwgLy/QntCz0L7QvdGMIVxuXG4gICAgU1RBVElTVElDOiA3MyAvLyBcIklcIlxuXG59O1xuXG5sZXQgY2xpY2tQYWQgPSBudWxsO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wLCBzZXRDbGlja1BhZH1cblxuXG4vKipcbiAqINCX0LDQv9GD0YHRgtC40Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqL1xuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgICAvLyDQldGB0LvQuCDQvtC60L3QviDQv9C+0YLQtdGA0Y/Qu9C+INGE0L7QutGD0YFcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgb25XaW5kb3dCbHVyLCBmYWxzZSk7XG5cbiAgICAvLyDQndCw0LbQsNGC0LAg0LrQu9Cw0LLQuNGI0LBcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24sIGZhbHNlKTtcblxuICAgIC8vINCe0YLQttCw0YLQsCDQutC70LDQstC40YjQsFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleXVwLCBmYWxzZSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2ssIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvbk1vdXNlVXAsIGZhbHNlKTtcbn1cblxuXG4vKipcbiAqINCe0YHRgtCw0L3QvtCy0LjQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICovXG5mdW5jdGlvbiBzdG9wKCkge1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIG9uV2luZG93Qmx1ciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5ZG93biwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBvbktleXVwLCBmYWxzZSk7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2ssIGZhbHNlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBvbk1vdXNlRG93biwgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvbk1vdXNlVXAsIGZhbHNlKTtcbn1cblxuXG5mdW5jdGlvbiBzZXRDbGlja1BhZChfY2xpY2tQYWQpIHtcbiAgICBjbGlja1BhZCA9IF9jbGlja1BhZDtcbn1cblxuLyoqXG4gKiDQn9GA0Lgg0L3QsNC20LDRgtC40Lgg0LrQu9Cw0LLQuNGI0LhcbiAqIEBwYXJhbSBlXG4gKi9cbmZ1bmN0aW9uIG9uS2V5ZG93bihlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcblxuICAgICAgICBjYXNlIGtleXMuTEVGVDpcbiAgICAgICAgY2FzZSBrZXlzLkE6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2xlZnQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuVVA6XG4gICAgICAgIGNhc2Uga2V5cy5XOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICd1cCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcbiAgICAgICAgY2FzZSBrZXlzLkQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ3JpZ2h0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLkRPV046XG4gICAgICAgIGNhc2Uga2V5cy5TOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICdkb3duJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlNQQUNFOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4xOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsMScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OMjpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjM6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGwzJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk40OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsNCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ONTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjY6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGw2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk43OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsNycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OODpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsICdza2lsbDgnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjk6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdza2lsbC1jaGFuZ2UnLCAnc2tpbGw5Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4wOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgJ3NraWxsMTAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQvtGC0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXl1cChlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBrZXlzLkxFRlQ6XG4gICAgICAgIGNhc2Uga2V5cy5BOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnbGVmdCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5VUDpcbiAgICAgICAgY2FzZSBrZXlzLlc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICd1cCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcbiAgICAgICAgY2FzZSBrZXlzLkQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdyaWdodCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ET1dOOlxuICAgICAgICBjYXNlIGtleXMuUzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2Rvd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuU1BBQ0U6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlNUQVRJU1RJQzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ3N0YXRpc3RpYycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OMTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjI6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk4zOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnZmlyZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ONDpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjU6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk42OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnZmlyZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ONzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuTjg6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLk45OlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnZmlyZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5OMDpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQutC70LjQutC1XG4gKiBAcGFyYW0gZVxuICovXG5mdW5jdGlvbiBvbkNsaWNrKGUpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC/0L4g0YfQtdC8INC60LvQuNC60LDRgtGMINC+0YLQv9GA0LDQstC40Lwg0YHQvtCx0YvRgtC40LVcbiAgICBpZihjbGlja1BhZCkge1xuICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCArIGNsaWNrUGFkLngsXG4gICAgICAgICAgICB5ID0gZS5jbGllbnRZICsgY2xpY2tQYWQueTtcbiAgICAgICAgZXZlbnRzLmFkZCgndGFyZ2V0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgZXZlbnRzLmFkZCgnY2xpY2snLCB7eDogeCwgeTogeX0pO1xuXG4gICAgfVxufVxuXG4vL9Cc0YvRiNGMINC90LDQttCw0LvQuFxuZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0L/QviDRh9C10Lwg0LrQu9C40LrQsNGC0Ywg0L7RgtC/0YDQsNCy0LjQvCDRgdC+0LHRi9GC0LjQtVxuICAgIGlmKGNsaWNrUGFkKSB7XG4gICAgICAgIGxldCB4ID0gZS5jbGllbnRYICsgY2xpY2tQYWQueCxcbiAgICAgICAgICAgIHkgPSBlLmNsaWVudFkgKyBjbGlja1BhZC55O1xuXG4gICAgICAgIGlmKGUuYnV0dG9uID09PSAwIHx8IGUuYnV0dG9uPT09MSkge1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnbW91c2UtZG93bi1sZWZ0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGUuYnV0dG9uID09PSAyKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ21vdXNlLWRvd24tcmlnaHQnLCB7eDogeCwgeTogeX0pO1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbi8v0JzRi9GI0Ywg0L7RgtC/0YPRgdGC0LjQu9C4XG5mdW5jdGlvbiBvbk1vdXNlVXAoZSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0L/QviDRh9C10Lwg0LrQu9C40LrQsNGC0Ywg0L7RgtC/0YDQsNCy0LjQvCDRgdC+0LHRi9GC0LjQtVxuICAgIGlmKGNsaWNrUGFkKSB7XG4gICAgICAgIGxldCB4ID0gZS5jbGllbnRYICsgY2xpY2tQYWQueCxcbiAgICAgICAgICAgIHkgPSBlLmNsaWVudFkgKyBjbGlja1BhZC55O1xuXG4gICAgICAgIGlmKGUuYnV0dG9uID09PSAwIHx8IGUuYnV0dG9uPT09MSkge1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnbW91c2UtdXAtbGVmdCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlLmJ1dHRvbiA9PT0gMil7XG4gICAgICAgICAgICBldmVudHMuYWRkKCdtb3VzZS11cC1yaWdodCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuXG4vKipcbiAqINCV0YHQu9C4INC+0LrQvdC+INC/0L7RgtC10YDRj9C70L4g0YTQvtC60YPRgVxuICovXG5mdW5jdGlvbiBvbldpbmRvd0JsdXIoKSB7XG4gICAgLy8g0L7RgtC+0LbQvNC10Lwg0LLRgdC1INC60LvQsNCy0LjRiNC4XG4gICAgZXZlbnRzLmFkZCgnY29udHJvbGxlclJlc2V0JywgdHJ1ZSk7XG59IiwiaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IHthZGQsIGFkZEZyb21TZXQsIGFkZE9uZSwgcmVtb3ZlLCByZXNldCwgc2l6ZSwgZWFjaH1cblxuY29uc3QgZW50aXRpZXMgPSBbXTtcblxuLy/QodC+0LfQtNCw0LXRglxuZnVuY3Rpb24gYWRkKHgsIHksIElELCBsaWZldGltZSwgZmF6YSkge1xuICAgIGVudGl0aWVzLnB1c2goXG4gICAgICAgIG5ldyBFbnRpdHkoeCwgeSwgY2hhcmFjdGVycy5nZXQoSUQpLCBsaWZldGltZSwgZmF6YSlcbiAgICApO1xufVxuXG5mdW5jdGlvbiBhZGRGcm9tU2V0KHgsIHksIHNldElELCBJRCwgbGlmZXRpbWUsIGZhemEpIHtcbiAgICBlbnRpdGllcy5wdXNoKFxuICAgICAgICBuZXcgRW50aXR5KHgsIHksIGNoYXJhY3RlcnMuZ2V0RnJvbVNldChzZXRJRCwgSUQpLCBsaWZldGltZSwgZmF6YSlcbiAgICApO1xufVxuXG4vL9CU0L7QsdCw0LLQu9GP0LXRgiDRgdC+0LfQtNCw0L3QvdGD0Y5cbmZ1bmN0aW9uIGFkZE9uZShlbnRpdHkpIHtcbiAgICBlbnRpdGllcy5wdXNoKGVudGl0eSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShpbmRleCkge1xuICAgIGVudGl0aWVzLnNwbGljZShpbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGVudGl0aWVzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHNpemUoKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZWFjaChjYWxsYmFjaykge1xuICAgIGVudGl0aWVzLmZvckVhY2goY2FsbGJhY2spO1xufVxuIiwiLyoqXG4gKiBAY2xhc3MgRW50aXR5XG4gKlxuICovXG5pbXBvcnQge1NURVB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5e1xuXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2hhcmFjdGVyLCBsaWZldGltZSwgZmF6YSl7XG5cbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcblxuICAgICAgICAvLyDQstGA0LXQvNGPINC20LjQt9C90LhcbiAgICAgICAgdGhpcy5saWZldGltZSA9IGxpZmV0aW1lO1xuXG4gICAgICAgIHRoaXMuaW1tb3J0YWwgPSBsaWZldGltZSA+IDAuMCA/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jaGFyYWN0ZXIud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNwZWVkID0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnNwZWVkO1xuICAgICAgICBpZighdGhpcy5hbmltYXRlU3BlZWQpIHRoaXMuYW5pbWF0ZVNwZWVkID0gMTQ7XG4gICAgICAgIHRoaXMuZmF6YSA9IGZhemEgfHwgMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcblxuICAgICAgICB0aGlzLnN0YXRlID0gXCJkZWZhdWx0XCI7XG5cbiAgICAgICAgdGhpcy5kaWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RpZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5kaWU7XG4gICAgfVxuXG4gICAga2lsbCgpe1xuICAgICAgICB0aGlzLmRpZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKCl7XG5cbiAgICAgICAgaWYoIXRoaXMuaW1tb3J0YWwpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGlmZXRpbWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saWZldGltZSAtPSBTVEVQO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saWZldGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKCl7XG4gICAgICAgIC8v0JDQvdC40LzQsNGG0LjRj1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBTVEVQO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9IHRoaXMueCAtIGNhbWVyYS54IC0gdGhpcy53aWR0aC8yLFxuICAgICAgICAgICAgeSA9IHRoaXMueSAtIGNhbWVyYS55IC0gdGhpcy5oZWlnaHQvMjtcblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoY2FtZXJhLmNvbnRleHQsIHgsIHkpO1xuXG4gICAgICAgIC8v0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0YDQsNGB0L/QvtC70L7QttC10L3QuNGPXG4gICAgICAgIC8qY2FtZXJhLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwyNTUsNjcsMC40KVwiO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsUmVjdCh0aGlzLngtY2FtZXJhLngsIHRoaXMueS1jYW1lcmEueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5zdHJva2UoKTtcblxuICAgICAgICBjYW1lcmEuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwwLDAsMC44KVwiO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5hcmModGhpcy54LWNhbWVyYS54LCB0aGlzLnktY2FtZXJhLnksIDIsIDAsIE1hdGguUEkqMik7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGwoKTtcblxuICAgICAgICBjYW1lcmEuY29udGV4dC5yZXN0b3JlKCk7Ki9cbiAgICB9XG5cblxuICAgIGRyYXdDaGFyYWN0ZXIoY29udGV4dCwgc3gsIHN5KXtcbiAgICAgICAgbGV0IHggPSBzeCAtICh0aGlzLmNoYXJhY3Rlci53aWR0aC10aGlzLndpZHRoKS8yLFxuICAgICAgICAgICAgeSA9IHN5IC0gKHRoaXMuY2hhcmFjdGVyLmhlaWdodC10aGlzLmhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIuZHJhdyhjb250ZXh0LCB4LCB5LCB0aGlzLnN0YXRlLCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59IiwiaW1wb3J0IFVuaXQgZnJvbSAnLi91bml0LmpzJ1xuXG4vKipcbiAqIEhlcm8gLSDQs9C70LDQstC90YvQuSDQs9C10YDQvtC5XG4gKi9cblxuLyoqXG4gKiDQrtC90LjRgiDQs9C10YDQvtGPXG4gKiBAdHlwZSB7VW5pdHxudWxsfVxuICovXG5sZXQgdW5pdCA9IG51bGw7XG5cbi8qKlxuICog0KHQutC+0YDQvtGB0YLRjCDQv9C10YDQtdC80LXRidC10L3QuNGPXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5sZXQgc3BlZWQgPSAwO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHt1bml0LCBzcGVlZCwgYW5pbWF0ZSwgZHJhd31cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICB0aGlzLnVuaXQuYW5pbWF0ZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3KGNhbWVyYSkge1xuICAgIHRoaXMudW5pdC5kcmF3KGNhbWVyYSk7XG59XG4iLCJpbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IGxvZyBmcm9tIFwiLi4vLi4vbG9nc1wiXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuL2NhbWVyYVwiO1xuaW1wb3J0IHVuaXRzIGZyb20gXCIuL3VuaXRzXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi9ldmVudHNcIjtcbmltcG9ydCBoZXJvIGZyb20gJy4vaGVybyc7XG5pbXBvcnQgVW5pdCBmcm9tIFwiLi91bml0XCI7XG5pbXBvcnQgVGVsZXBvcnQgZnJvbSBcIi4vdGVsZXBvcnRcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuL3Jvb21cIjtcbmltcG9ydCBMb290IGZyb20gXCIuL2xvb3RcIjtcbmltcG9ydCB1aSBmcm9tIFwiLi91aS91aVwiO1xuaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IHNvdW5kcyBmcm9tIFwiLi4vLi4vc291bmRzXCI7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSBcIi4vZW50aXRpZXNcIjtcbmltcG9ydCBhY2NvdW50IGZyb20gXCIuLi8uLi9hY2NvdW50XCI7XG5cbi8qKlxuICog0J7RgdC90L7QstC90LDRjyDRgdGG0LXQvdCwIC0g0YHQvtCx0YHRgtCy0LXQvdC90L4g0LjQs9GA0LBcbiAqL1xuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wfVxuXG4vLyDQl9Cw0L/Rg9GB0YLQuNC8INC/0L4g0L7QutC+0L3Rh9Cw0L3QuNC4INC40LPRgNGLXG5sZXRcbiAgICBmaW5hbENhbGxiYWNrID0gbnVsbCxcbiAgICBpbnRlcnZhbCA9IG51bGw7XG5cbmxldCByb29tcyA9IHt9LFxuICAgIHJvb21faWQgPSBudWxsLFxuICAgIHJvb20gPSBudWxsLFxuXG4gICAgLy8g0JrQsNC80LXRgNCwLiDQodC+0LLQvNC10YnQtdC90LAg0YHQviDQstGK0Y7Qv9C+0YDRgtC+0LxcbiAgICBjYW1lcmEgPSBudWxsLFxuICAgIGxvb3RzID0ge30sXG4gICAgdGVsZXBvcnRzID0ge307XG5cblxuZnVuY3Rpb24gc3RhcnQoY2FsbGJhY2spIHtcbiAgICBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICByb29tcyA9IHt9O1xuXG4gICAgLy8g0KLQtdC60YPRidCw0Y8g0LrQvtC80L3QsNGC0LAuIGlkINC4INGB0LDQvNCwXG4gICAgcm9vbV9pZCA9IG51bGw7XG4gICAgcm9vbSA9IG51bGw7XG5cbiAgICAvLyDQktC10YHRjCDQu9GD0YJcbiAgICBsb290cyA9IHt9O1xuXG4gICAgLy8g0KLQtdC70LXQv9C+0YDRgtGLXG4gICAgdGVsZXBvcnRzID0ge307XG5cblxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIC8vINCh0L7Qt9C00LDQtNC40Lwg0LrQsNC80LXRgNGDINC/0L4gXCLQutCw0L3QstC1XCJcbiAgICBjYW1lcmEgPSBuZXcgQ2FtZXJhKDAsIDAsIGNhbnZhcyk7XG4gICAgLy8g0LjQt9C80LXQvdGP0LXQvCDQutCw0LzQtdGA0YMg0L/QvtC0INC+0LrQvdC+XG4gICAgY2FtZXJhLnJlc2l6ZSgpO1xuXG4gICAgLy/Qn9GA0Lgg0YDQtdGB0LDQudC30LUg0L7QutC90LAg0LHRgNCw0YPQt9C10YDQsCAtINC40LfQvNC10L3Rj9C10Lwg0LrQsNC80LXRgNGDINC/0L7QtCDQvtC60L3QvlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7Y2FtZXJhLnJlc2l6ZSgpO30pO1xuXG5cbiAgICAvL9CX0LDQv9GA0L7RgdC40Lwg0LDQstCw0YLQsNGA0LBcbiAgICBldmVudHMuYWRkKCduZWVkLWF2YXRhcicpO1xuXG4gICAgZXZlbnRzLm9uKFwic2lnbm91dFwiLCgpPT57XG4gICAgICAgIGFjY291bnQuc2lnbm91dCgpO1xuICAgICAgICBldmVudHMuZGlzY29ubmVjdCgpO1xuICAgICAgICBzdG9wKClcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcImRpc2Nvbm5lY3RcIiwgKCk9PntcbiAgICAgICAgc3RvcCgpO1xuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uKFwicmVjb25uZWN0XCIsIG9uUmVjb25uZWN0KTtcbiAgICBldmVudHMub24oXCJyb29tXCIsIG9uUm9vbSk7XG4gICAgZXZlbnRzLm9uKFwiaGVyb1wiLCBvbkhlcm8pO1xuICAgIGV2ZW50cy5vbihcInNvdW5kXCIsIG9uU291bmQpO1xuXG4gICAgZXZlbnRzLm9uKFwiY2xpY2tcIiwgKGV2ZW50TmFtZSwgcG9zKT0+e1xuICAgICAgICBpZihwb3MpIHtcbiAgICAgICAgICAgIGVudGl0aWVzLmFkZChwb3MueCwgcG9zLnkrMSwgJ3BvaW50ZXInLCAuMzUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBldmVudHMub24oXCJlbnRpdHlcIiwgKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSk9PntcbiAgICAgICAgaWYodHlwZT09PVwicmVtb3ZlLWNvaW5cIiAmJiBkYXRhLnJvb21faWQ9PT1yb29tX2lkKXtcblxuICAgICAgICAgICAgZW50aXRpZXMuYWRkKGRhdGEueCwgZGF0YS55LCAnYm9vbTEnLCAuNjUpO1xuXG4gICAgICAgICAgICAvLyBlbnRpdGllcy5hZGQoZGF0YS54LCBkYXRhLnksICdib29tMicsIC41NSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHR5cGU9PT1cInRlbGVwb3J0LXRhcmdldFwiICYmIGRhdGEucm9vbV9pZD09PXJvb21faWQpe1xuXG4gICAgICAgICAgICBlbnRpdGllcy5hZGQoZGF0YS54LCBkYXRhLnksICdiYXJpZXInLCAwLjY1KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHR5cGU9PT1cInB1c2gtZWZmZWN0XCIgJiYgZGF0YS5yb29tX2lkPT09cm9vbV9pZCl7XG5cbiAgICAgICAgICAgIGVudGl0aWVzLmFkZChkYXRhLngsIGRhdGEueSwgJ3B1c2gxJywgMC4xNSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHVpLnNraWxscy5zdGFydCgpO1xuXG4gICAgdWkudG9wMTAuc3RhcnQoKTtcblxuXG4gICAgLyoqXG4gICAgICog0J7RgdC90L7QstC90L7QuSDRhtC40LrQu1xuICAgICAqL1xuICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoXyA9PiB7XG5cbiAgICAgICAgLy8g0J/QtdGA0LXQvNC10YnQtdC90LjQtSwg0YPQv9GA0LDQstC70Y/QtdC80L7QtSDQvdCwINC60LvQuNC10L3RgtC1XG4gICAgICAgIHVwZGF0ZSgpO1xuXG5cbiAgICAgICAgLy8g0J7RgtGA0LjRgdC+0LLQutCwXG4gICAgICAgIGRyYXcoY2FtZXJhKTtcblxuXG4gICAgICAgIC8vINCQ0L3QuNC80LDRhtC40Y9cbiAgICAgICAgYW5pbWF0ZSgpO1xuXG5cbiAgICB9LCBjb25zdGFudHMuSU5URVJWQUwpO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXG4gICAgZXZlbnRzLm9mZihcInJlY29ubmVjdFwiLCBvblJlY29ubmVjdCk7XG4gICAgZXZlbnRzLm9mZihcInJvb21cIiwgb25Sb29tKTtcbiAgICBldmVudHMub2ZmKFwiaGVyb1wiKTtcbiAgICBldmVudHMub2ZmKFwic291bmRcIik7XG5cbiAgICBldmVudHMub2ZmKFwiY2xpY2tcIik7XG4gICAgZXZlbnRzLm9mZihcImNvaW5cIik7XG5cbiAgICB1bml0cy5yZXNldCgpO1xuICAgIGxvb3RzID0ge307XG4gICAgaGVyby51bml0ID0gbnVsbDtcbiAgICBlbnRpdGllcy5yZXNldCgpO1xuXG4gICAgdWkuc2tpbGxzLnN0b3AoKTtcblxuICAgIHVpLnRvcDEwLnN0b3AoKTtcblxuICAgIGZpbmFsQ2FsbGJhY2soKTtcbn1cblxuZnVuY3Rpb24gb25SZWNvbm5lY3QoZXZlbnQsIHR5cGUsIGRhdGEpIHtcbiAgICBsb2coJ9C+0YIg0YHQtdGA0LLQtdGA0LAg0L/QvtGB0YLRg9C/0LjQuyByZWNvbm5lY3QnKTtcbiAgICB1bml0cy5yZXNldCgpO1xuICAgIGxvb3RzID0ge307XG4gICAgaGVyby51bml0ID0gbnVsbDtcbn1cblxuLyoqXG4gKiDQodC+0LHRi9GC0LjRjyBcInJvb21cIlxuICogQHBhcmFtIGV2ZW50XG4gKiBAcGFyYW0gdHlwZVxuICogQHBhcmFtIGRhdGFcbiAqL1xuZnVuY3Rpb24gb25Sb29tKGV2ZW50LCB0eXBlLCBkYXRhKSB7XG5cbiAgICAvLyDQn9C+0LvRg9GH0LXQvdC40LUg0LrQvtC80L3QsNGC0YtcbiAgICBpZih0eXBlPT09XCJjaGFuZ2VcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEucm9vbSkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciByb29tID0gZGF0YS5yb29tO1xuXG4gICAgICAgICAgICBpZiAocm9vbS5JRD09dW5kZWZpbmVkIHx8ICFyb29tLndpZHRoIHx8ICFyb29tLmhlaWdodCB8fCByb29tLmVudmlyb25tZW50X2lkPT11bmRlZmluZWQpIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICByb29tSW5pdChyb29tLCBkYXRhLnBsYXllcnMsIGRhdGEuaGVybyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQmtC+0LzQvdCw0YLRiy4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC40LPRgNC+0LrQsFxuICAgIGlmKHR5cGU9PT1cInBsYXllci1jcmVhdGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWwgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gbmV3IFVuaXQoaW5mbyk7XG4gICAgICAgICAgICB1bml0cy5hZGQoaW5mby5JRCwgdW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQuNCz0YDQvtC60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQvtCxINC40LPRgNC+0LrQtVxuICAgIGlmKHR5cGU9PT1cInBsYXllci1pbmZvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgbGV0IHVuaXQgPSB1bml0cy5pdGVtKGluZm8uSUQpO1xuICAgICAgICAgICAgaWYodW5pdCkge1xuXG4gICAgICAgICAgICAgICAgdW5pdC5zZXQoaW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINC40LPRgNC+0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0LPRgNC+0Log0YPRiNC10LtcbiAgICBpZih0eXBlPT09XCJwbGF5ZXItbGVhdmVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuSUQpIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHVuaXRzLml0ZW0oZGF0YS5JRCk7XG4gICAgICAgICAgICBpZih1bml0KSB7XG4gICAgICAgICAgICAgICAgdW5pdC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgdW5pdHMucmVtb3ZlKGRhdGEuSUQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINGD0LTQsNC70LXQvdC40Y8g0LjQs9GA0L7QutCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQu9GD0YLQsFxuICAgIGlmKHR5cGU9PT1cImxvb3QtY3JlYXRlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmZvLklEIGluIGxvb3RzPT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICBsb290c1tpbmZvLklEXSA9IG5ldyBMb290KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGluZm8uY2hhcmFjdGVyX2lkLCBpbmZvLklELCBpbmZvLndpZHRoLCBpbmZvLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb290c1tpbmZvLklEXS5zZXQoaW5mby5yb29tX2lkLCBpbmZvLngsIGluZm8ueSwgaW5mby5jaGFyYWN0ZXJfaWQsIGluZm8uSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC70YPRgtCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQtNC10LrQvtGA0LDRhtC40LhcbiAgICBpZih0eXBlPT09XCJjYXJ0b29uLWNyZWF0ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcHJpdGVzZXRfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcHJpdGVfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBlbnRpdGllcy5hZGRGcm9tU2V0KGluZm8ueCwgaW5mby55LCBpbmZvLnNwcml0ZXNldF9pZCwgaW5mby5zcHJpdGVfaWQsIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LTQtdC60L7RgNCw0YbQuNC4LiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0LrQvtC80L3QsNGC0LVcbiAgICBpZih0eXBlPT09XCJhbGwtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmKCdyb29tX2lkJyBpbiBpbmZvICYmIGluZm8ucm9vbV9pZD09PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGlmICgnbnBjcycgaW4gaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBpbiBpbmZvLm5wY3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHMuaXRlbShpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQuc2V0KGluZm8ubnBjc1tpZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCdsb290JyBpbiBpbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIGluIGluZm8ubG9vdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQgaW4gbG9vdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb290c1tpZF0uc2V0KGluZm8ubG9vdFtpZF0ucm9vbV9pZCwgaW5mby5sb290W2lkXS54LCBpbmZvLmxvb3RbaWRdLnksIGluZm8ubG9vdFtpZF0uY2hhcmFjdGVyX2lkLCBpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3RlbGVwb3J0cycgaW4gaW5mbykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBpbiBpbmZvLnRlbGVwb3J0cykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWQgaW4gdGVsZXBvcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRzW2lkXS5zZXQoaW5mby50ZWxlcG9ydHNbaWRdLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L7QsdC90L7QstC70LXQvdC40Y8g0LzQvtCx0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC70YPRgtCwXG4gICAgaWYodHlwZT09PVwibG9vdC1yZW1vdmVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5JRCBpbiBsb290cykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgbG9vdHNbaW5mby5JRF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LvRg9GC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQvNC+0LHQsFxuICAgIGlmKHR5cGU9PT1cIm5wYy1jcmVhdGVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gbmV3IFVuaXQoaW5mbyk7XG4gICAgICAgICAgICB1bml0cy5hZGQoaW5mby5JRCwgdW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQvNC+0LHQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDQo9C00LDQu9C10L3QuNC1INC80L7QsdCwXG4gICAgaWYodHlwZT09PVwibnBjLXJlbW92ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHMuaXRlbShpbmZvLklEKTtcbiAgICAgICAgICAgIHVuaXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdW5pdHMucmVtb3ZlKGluZm8uSUQpO1xuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINGD0LTQsNC70LXQvdC40Y8g0LzQvtCx0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkhlcm8oZXZlbnQsIHR5cGUsIGRhdGEpIHtcblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LPQtdGA0L7RjyDQv9GA0Lgg0LLRhdC+0LTQtVxuICAgIGlmKHR5cGU9PVwiaGVyby1jcmVhdGVcIikge1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGlmICghZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jb2luc19jb3VudCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWx1cENvdW50ZXIgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcGVlZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKCFoZXJvLnVuaXQpIHtcbiAgICAgICAgICAgICAgICBoZXJvLnVuaXQgPSBuZXcgVW5pdChpbmZvLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaGVyby51bml0LnNldChpbmZvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5pdHMuYWRkKCdbJytpbmZvLklEKyddJywgaGVyby51bml0KTtcblxuICAgICAgICAgICAgaGVyby5zcGVlZCA9IGluZm8uc3BlZWQ7XG5cbiAgICAgICAgICAgIHVpLmhlcm9JbmZvLnN0YXJ0KCk7XG4gICAgICAgICAgICB1aS5oZXJvSW5mby51cGRhdGUoaW5mbyk7XG5cbiAgICAgICAgICAgIHVpLndhaXRTY3JlZW4uaGlkZSgpO1xuXG4gICAgICAgICAgICBjb250cm9sbGVyLnN0YXJ0KCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnNldENsaWNrUGFkKGNhbWVyYSk7XG5cbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQutGD0YnQsNGPINC60L7QvNC90LDRgtCwINC+0YLRgdGD0YLRgdGC0LLRg9C10YIg0LjQu9C4INC90LUg0YLQsCAtINGI0LvQtdC8INC90LAg0YHQtdGA0LLQtdGAINC30LDQv9GA0L7RgVxuICAgICAgICAgICAgaWYoIXJvb21faWQgfHwgcm9vbV9pZCAhPSBpbmZvLnJvb21faWQpIHtcbiAgICAgICAgICAgICAgICByb29tX2lkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKCduZWVkLXJvb20nLCBpbmZvLnJvb21faWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FtZXJhICYmIGNhbWVyYS5zZXRGb2xsb3dlcihoZXJvLnVuaXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDRgdC+0LfQtNCw0L3QuNGPINCT0LXRgNC+0Y8uIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDQs9C10YDQvtC1XG4gICAgaWYodHlwZT09XCJoZXJvLWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY29pbnNfY291bnQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsdXBDb3VudGVyID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3BlZWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBoZXJvLnVuaXQuc2V0KGluZm8pO1xuXG4gICAgICAgICAgICBoZXJvLnNwZWVkID0gaW5mby5zcGVlZDtcblxuICAgICAgICAgICAgdWkuaGVyb0luZm8udXBkYXRlKGluZm8sIGluZm8uSUQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDQk9C10YDQvtGPLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25Tb3VuZChldmVudCwgdHlwZSwgZGF0YSkge1xuICAgIC8vINC30LLRg9C60L7QstGL0LUg0YPQstC10LTQvtC80LvQtdC90LjRj1xuICAgIGlmKHR5cGU9PVwibm90aWNlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihoZXJvICYmIGhlcm8udW5pdCAmJiBoZXJvLnVuaXQucm9vbV9pZCA9PSBpbmZvLnJvb21faWQpIHsgLy9UT0RPOiDQvdC1INGO0L3QuNGCLCDQsCDQutCw0LzQtdGA0LBcbiAgICAgICAgICAgICAgICBpZihpbmZvLklEIGluIHNvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86INC/0L4gaW5mby54LCBpbmZvLnkg0L7Qv9GA0LXQtNC10LvRj9GC0Ywg0LrQsNC6INC00LDQu9C10LrQviDQvtGCIGhlcm8g0Lgg0LTQtdC70LDRgtGMINCz0YDQvtC80LrQvtGB0YLRjFxuICAgICAgICAgICAgICAgICAgICBzb3VuZHNbaW5mby5JRF0ucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0LfQstGD0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog0J/QtdGA0LXQvNC10YnQtdC90LjQtSDQvdCwINC60LvQuNC10L3RgtC1XG4gKiAg0YLQviwg0YfRgtC+INC90LUg0YPQv9GA0LDQstC70Y/QtdGC0YHRjyDRgSDRgdC10YDQstC10YDQsC4g0J3QsNC/0YDQuNC80LXRgCDQutCw0LzQtdGA0LBcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKCl7XG5cbiAgICAvL9Ca0LDQvNC10YDQsFxuICAgIGNhbWVyYSAmJiBjYW1lcmEudXBkYXRlKHJvb20pO1xuXG4gICAgLy/QodGD0YnQvdC+0YHRgtC4XG4gICAgZW50aXRpZXMuZWFjaCgoZW50aXR5LCBpbmRleCk9PntcblxuICAgICAgICBlbnRpdHkudXBkYXRlKCk7XG5cbiAgICAgICAgLy/Qo9C00LDQu9C40Lwg0L7RgtGA0LDQsdC+0YLQsNCy0YjQuNC1INGB0YPRidC90L7RgdGC0LhcbiAgICAgICAgaWYoZW50aXR5LmlzRGllKCkpe1xuICAgICAgICAgICAgZW50aXRpZXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cblxuLyoqXG4gKiDQkNC90LjQvNCw0YbQuNGPXG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGUoKXtcblxuICAgIC8v0K7QvdC40YLRiyAo0LLQutC70Y7Rh9Cw0Y8g0YHQsNC80L7Qs9C+INCz0LXRgNC+0Y8pXG4gICAgZm9yIChjb25zdCB1bml0IG9mIHVuaXRzLnRvQXJyYXkoKSkge1xuICAgICAgICBpZih1bml0LnJvb21faWQ9PXJvb21faWQpIHtcbiAgICAgICAgICAgIHVuaXQuYW5pbWF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/Qm9GD0YJcbiAgICBmb3IgKGxldCBpIGluIGxvb3RzKSB7XG4gICAgICAgIGxvb3RzW2ldLmFuaW1hdGUoY29uc3RhbnRzLlNURVApO1xuICAgIH1cblxuICAgIC8v0KLQtdC70LXQv9C+0YDRgtGLXG4gICAgZm9yIChsZXQgaSBpbiB0ZWxlcG9ydHMpIHtcbiAgICAgICAgdGVsZXBvcnRzW2ldLmFuaW1hdGUoY29uc3RhbnRzLlNURVApO1xuICAgIH1cblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goIChlbnRpdHkpID0+IHtcbiAgICAgICAgZW50aXR5LmFuaW1hdGUoKTtcbiAgICB9KTtcblxufVxuXG5cbi8qKlxuICog0J7RgtGA0LjRgdC+0LLQutCwINC90LAg0LrQsNC80LXRgNGDXG4gKiBAcGFyYW0gY2FtZXJhXG4gKiBUT0RPOiDQv9C+0YDRj9C00L7QuiDQvtGC0YDQuNGB0L7QstC60LghXG4gKi9cbmZ1bmN0aW9uIGRyYXcoY2FtZXJhKXtcblxuICAgIC8vINCa0L7QvNC90LDRgtCwXG4gICAgcm9vbSAmJiByb29tLmRyYXcoY2FtZXJhKTtcblxuICAgIC8vINCi0LXQu9C10L/QvtGA0YLRi1xuICAgIGZvciAobGV0IGkgaW4gdGVsZXBvcnRzKSB7XG4gICAgICAgIHRlbGVwb3J0c1tpXS5kcmF3KGNhbWVyYSk7XG4gICAgfVxuXG5cbiAgICBsZXQgcmVuZGVyQXJyYXkgPSBbXTtcblxuICAgIC8vINCb0YPRglxuICAgIGZvciAobGV0IGkgaW4gbG9vdHMpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBsb290c1tpXTtcbiAgICAgICAgcmVuZGVyQXJyYXkucHVzaCh7eTogaXRlbS55LCBpdGVtOiBpdGVtfSk7XG4gICAgfVxuXG4gICAgLy/QrtC90LjRgtGLXG4gICAgZm9yIChsZXQgdW5pdCBvZiB1bml0cy50b0FycmF5KCkpIHtcbiAgICAgICAgaWYodW5pdC5yb29tX2lkPT1yb29tX2lkKSB7XG4gICAgICAgICAgICByZW5kZXJBcnJheS5wdXNoKHt5OiB1bml0LnksIGl0ZW06IHVuaXR9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgIHJlbmRlckFycmF5LnB1c2goe3k6IGl0ZW0ueSwgaXRlbTogaXRlbX0pO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyQXJyYXkuc29ydCgoYSwgYik9PntcbiAgICAgICAgcmV0dXJuIGEueSAtIGIueTtcbiAgICB9KTtcblxuICAgIGZvcihsZXQgaSBpbiByZW5kZXJBcnJheSl7XG4gICAgICAgIHJlbmRlckFycmF5W2ldLml0ZW0uZHJhdyhjYW1lcmEpO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICog0KPRgdGC0LDQvdC+0LLQutCwINC+0YLQvtCx0YDQsNC20LDQtdC80L7QuSDQutC+0LzQvdCw0YLRi1xuICogQHBhcmFtIHNldHRpbmdzXG4gKiBAcGFyYW0gcGxheWVyc1xuICogQHBhcmFtIGhlcm9cbiAqL1xuZnVuY3Rpb24gcm9vbUluaXQoc2V0dGluZ3MsIHBsYXllcnMsIGhlcm9Vbml0KXtcblxuICAgIC8v0JfQsNGH0LjRgdGC0LjQvCDQtdGB0LvQuCDQvdC1INCy0L/QtdGA0LLQvtC5XG4gICAgZm9yKGxldCBpIGluIGxvb3RzKXsgZGVsZXRlIGxvb3RzW2ldO31cbiAgICBmb3IobGV0IGkgaW4gdGVsZXBvcnRzKXsgZGVsZXRlIHRlbGVwb3J0c1tpXTt9XG4gICAgbG9vdHMgPSB7fTtcbiAgICB0ZWxlcG9ydHMgPSB7fTtcbiAgICByb29tID0gbnVsbDtcbiAgICBlbnRpdGllcy5yZXNldCgpO1xuICAgIHVuaXRzLnJlc2V0KCk7XG5cblxuICAgIHJvb21faWQgPSBzZXR0aW5ncy5JRDtcblxuICAgIC8vINCh0LTQtdC70LDQtdC8INC60L7QvNC90LDRgtGDINC40LvQuCDQstC+0LfQvNC10Lwg0LjQtyDQutC10YjQsFxuICAgIGlmKHNldHRpbmdzLklEIGluIHJvb21zKXtcbiAgICAgICAgcm9vbSA9IHJvb21zW3NldHRpbmdzLklEXTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcm9vbSA9IG5ldyBSb29tKHNldHRpbmdzLndpZHRoLCBzZXR0aW5ncy5oZWlnaHQsIHNldHRpbmdzLmVudmlyb25tZW50X2lkLCBzZXR0aW5ncy5lbnRpdGllc19udW0pO1xuICAgICAgICByb29tc1tzZXR0aW5ncy5JRF0gPSByb29tO1xuICAgIH1cblxuICAgIGlmKCdjYXJ0b29ucycgaW4gc2V0dGluZ3Mpe1xuICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBzZXR0aW5ncy5jYXJ0b29ucyl7XG4gICAgICAgICAgICBlbnRpdGllcy5hZGRGcm9tU2V0KGl0ZW0ueCwgaXRlbS55LCBpdGVtLnNwcml0ZXNldF9pZCwgaXRlbS5zcHJpdGVfaWQsIDAsIE1hdGgucmFuZG9tKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoJ2xvb3QnIGluIHNldHRpbmdzKXtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2Ygc2V0dGluZ3MubG9vdCl7XG5cbiAgICAgICAgICAgIGxvb3RzW2l0ZW0uSURdID0gbmV3IExvb3Qocm9vbV9pZCwgaXRlbS54LCBpdGVtLnksIGl0ZW0uY2hhcmFjdGVyX2lkLCBpdGVtLklELCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZigndGVsZXBvcnRzJyBpbiBzZXR0aW5ncyl7XG4gICAgICAgIGZvcihjb25zdCBpdGVtIG9mIHNldHRpbmdzLnRlbGVwb3J0cyl7XG5cbiAgICAgICAgICAgIHRlbGVwb3J0c1tpdGVtLklEXSA9IG5ldyBUZWxlcG9ydChyb29tX2lkLCBpdGVtLngsIGl0ZW0ueSwgaXRlbS5jaGFyYWN0ZXJfaWQsIGl0ZW0uSUQsIGl0ZW0udGFyZ2V0LCBpdGVtLnN0YXRlLCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZignbnBjcycgaW4gc2V0dGluZ3Mpe1xuICAgICAgICBmb3IoY29uc3QgaXRlbV9pZCBpbiBzZXR0aW5ncy5ucGNzKXtcbiAgICAgICAgICAgIGxldCBpdGVtID0gc2V0dGluZ3MubnBjc1tpdGVtX2lkXTtcbiAgICAgICAgICAgIHVuaXRzLmFkZChpdGVtLklELCBuZXcgVW5pdChpdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihwbGF5ZXJzKXtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW1faWQgaW4gcGxheWVycyl7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHBsYXllcnNbaXRlbV9pZF07XG4gICAgICAgICAgICB1bml0cy5hZGQoaXRlbS5JRCwgbmV3IFVuaXQoaXRlbSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyppZihoZXJvVW5pdCAmJiAhIGhlcm8udW5pdCl7XG4gICAgICAgIGxldCBpdGVtID0gaGVyb1VuaXQ7XG4gICAgICAgICAgICBoZXJvLnVuaXQgPSBuZXcgVW5pdChpdGVtKTtcbiAgICAgICAgdW5pdHMuYWRkKGl0ZW0uSUQsIGhlcm8udW5pdCk7XG4gICAgfSovXG59IiwiaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcblxuLyoqXG4gKiBAY2xhc3MgTG9vdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iocm9vbV9pZCwgeCwgeSwgY2hhcmFjdGVyX2lkLCBJRCwgd2lkdGgsIGhlaWdodCl7XG4gICAgICAgIHRoaXMuSUQgPSBJRDtcbiAgICAgICAgdGhpcy5yb29tX2lkID0gcm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVycy5nZXQoY2hhcmFjdGVyX2lkKSB8fCBjaGFyYWN0ZXJzLmdldCgnY29pbl9nb2xkJyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLmFuaW1hdGVTcGVlZCA9IDE0O1xuICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgIH1cblxuICAgIHNldChyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXJfaWQsIElEKXtcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLnJvb21faWQgPSByb29tX2lkO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoJ2NvaW5fZ29sZCcpO1xuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0J1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gKHRoaXMueC0odGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMikgLSBjYW1lcmEueCxcbiAgICAgICAgICAgIHkgPSAodGhpcy55LXRoaXMuY2hhcmFjdGVyLmhlaWdodCt0aGlzLmhlaWdodCkgLSBjYW1lcmEueTtcblxuXG4gICAgICAgIC8vINC90LUg0YDQuNGB0YPQtdC8INCy0L3QtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYoXG4gICAgICAgICAgICB4IDwgLXRoaXMuY2hhcmFjdGVyLndpZHRoIHx8XG4gICAgICAgICAgICB5IDwgLXRoaXMuY2hhcmFjdGVyLmhlaWdodCB8fFxuICAgICAgICAgICAgeCA+IGNhbWVyYS53aWR0aCB8fFxuICAgICAgICAgICAgeSA+IGNhbWVyYS5oZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIuZHJhdyhjYW1lcmEuY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNhbWVyYS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LWNhbWVyYS54LCB0aGlzLnktY2FtZXJhLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVjdCh4LCB5LCB0aGlzLmNoYXJhY3Rlci53aWR0aCwgdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuc3Ryb2tlKCk7XG5cbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMCwwLDAuOClcIjtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYXJjKHRoaXMueC1jYW1lcmEueCwgdGhpcy55LWNhbWVyYS55LCAyLCAwLCBNYXRoLlBJKjIpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsKCk7XG5cbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVzdG9yZSgpOyovXG4gICAgfVxuXG4gICAgYW5pbWF0ZShzdGVwKXtcbiAgICAgICAgdGhpcy5mYXphICs9IHRoaXMuYW5pbWF0ZVNwZWVkICogc3RlcDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gTWF0aC5mbG9vcih0aGlzLmZhemEpO1xuXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8v0J3QsNGB0YLRgNC+0LnQutC4INGA0LDQvdC00L7QvNC90YvRhSDRhtCy0LXRgtC+0LIg0LrQvtC80L3QsNGC0YtcblxuaW1wb3J0IHNwcml0ZXMgZnJvbSBcIi4uLy4uL3Nwcml0ZXNcIjtcblxuY29uc3QgRU5WSVJPTk1FTlRTID0ge1xuICAgIDA6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAxMjAsIHJhbmQ6IDEwfSxcbiAgICAgICAgZzoge3N0YXJ0OiAxMjAsIHJhbmQ6IDE2fSxcbiAgICAgICAgYjoge3N0YXJ0OiAxMDAsIHJhbmQ6IDV9LFxuICAgICAgICB3aWR0aDogMTAwMCxcbiAgICAgICAgaGVpZ2h0OiAxMDAwLFxuICAgICAgICAvLyBlbnRpdGllc1Nwcml0ZXM6IFwiZ3Jhc3NcIixcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImFuZHN0b25lc1wiLFxuICAgIH0sXG4gICAgMToge1xuICAgICAgICByOiB7c3RhcnQ6IDIzOSwgcmFuZDogMTZ9LFxuICAgICAgICBnOiB7c3RhcnQ6IDIxMCwgcmFuZDogMzN9LFxuICAgICAgICBiOiB7c3RhcnQ6IDEwMCwgcmFuZDogMjV9LFxuICAgICAgICB3aWR0aDogMTAwMCxcbiAgICAgICAgaGVpZ2h0OiAxMDAwLFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiZGVzZXJ0XCIsXG4gICAgfSxcbiAgICAyOiB7XG4gICAgICAgIHI6IHtzdGFydDogMjEwLCByYW5kOiA0NX0sXG4gICAgICAgIGc6IHtzdGFydDogMzAsIHJhbmQ6IDc1fSxcbiAgICAgICAgYjoge3N0YXJ0OiAzMCwgcmFuZDogNzV9LFxuICAgICAgICB3aWR0aDogMTAwMCxcbiAgICAgICAgaGVpZ2h0OiAxMDAwLFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiY29vbF9wbGFudHNcIixcbiAgICB9LFxuICAgIDM6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAxMCwgcmFuZDogMTJ9LFxuICAgICAgICBnOiB7c3RhcnQ6IDEzMCwgcmFuZDogMjB9LFxuICAgICAgICBiOiB7c3RhcnQ6IDIxMCwgcmFuZDogNDV9LFxuICAgICAgICB3aWR0aDogMTAwMCxcbiAgICAgICAgaGVpZ2h0OiAxMDAwLFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiYnVzaHNcIixcbiAgICB9LFxuICAgIDQ6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAxNTAsIHJhbmQ6IDEyfSxcbiAgICAgICAgZzoge3N0YXJ0OiA5MCwgcmFuZDogMjB9LFxuICAgICAgICBiOiB7c3RhcnQ6IDQwLCByYW5kOiAxMn0sXG4gICAgICAgIHdpZHRoOiAxMDAwLFxuICAgICAgICBoZWlnaHQ6IDEwMDAsXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJ0cmVlc1wiLFxuICAgIH0sXG4gICAgNToge1xuICAgICAgICByOiB7c3RhcnQ6IDAsIHJhbmQ6IDMwfSxcbiAgICAgICAgZzoge3N0YXJ0OiAwLCByYW5kOiA1fSxcbiAgICAgICAgYjoge3N0YXJ0OiAwLCByYW5kOiA1fSxcbiAgICAgICAgd2lkdGg6IDEwMDAsXG4gICAgICAgIGhlaWdodDogMTAwMCxcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcImRlYWRfcGxhbnRzXCIsXG4gICAgfSxcbiAgICA2OiB7XG4gICAgICAgIHI6IHtzdGFydDogMjMwLCByYW5kOiAyNH0sXG4gICAgICAgIGc6IHtzdGFydDogMjMwLCByYW5kOiAyNH0sXG4gICAgICAgIGI6IHtzdGFydDogMjMwLCByYW5kOiAyNH0sXG4gICAgICAgIHdpZHRoOiAxMDAwLFxuICAgICAgICBoZWlnaHQ6IDEwMDAsXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJkZWFkX3BsYW50c1wiLFxuICAgIH0sXG59O1xuLyoqXG4gKiBAY2xhc3MgUm9vbVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgZW52aXJvbm1lbnRfaWQsIGVudGl0aWVzX251bSl7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuZW52aXJvbm1lbnRfaWQgPSBlbnZpcm9ubWVudF9pZDtcbiAgICAgICAgdGhpcy5lbnRpdGllc19udW0gPSBlbnRpdGllc19udW07XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICB9XG5cbiAgICByYW5kb21DU1Njb2xvcihlbnZpcm9ubWVudF9pZCl7XG4gICAgICAgIGxldCBlID0gRU5WSVJPTk1FTlRTW2Vudmlyb25tZW50X2lkXTtcbiAgICAgICAgbGV0IHIgPSBlLnIuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLnIucmFuZCApLFxuICAgICAgICAgICAgZyA9IGUuZy5zdGFydCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUuZy5yYW5kKSxcbiAgICAgICAgICAgIGIgPSBlLmIuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLmIucmFuZCk7XG4gICAgICAgIHJldHVybiAncmdiKCcrcisnLCcrZysnLCcrYisnKSc7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUoKXtcbiAgICAgICAgY29uc3QgY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGN0eC5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICBjdHguY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhbmRvbUJhY2soY3R4KTtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FydG9vbihjdHgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgICAgLy8g0KHQvtGF0YDQsNC90LjQvCDQutCw0YDRgtC40L3QutC+0LlcbiAgICAgICAgdGhpcy5pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmltYWdlLnNyYyA9IGN0eC5jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXG4gICAgfVxuXG4gICAgZ2VuZXJhdGVSYW5kb21CYWNrKGN0eCl7XG5cbiAgICAgICAgY29uc3RcbiAgICAgICAgICAgIHRpbGVXaWR0aCA9IDIyLjAsXG4gICAgICAgICAgICB0aWxlSGVpZ2h0ID0gMjIuMCxcbiAgICAgICAgICAgIHJvd3MgPSBNYXRoLmZsb29yKHRoaXMud2lkdGgvdGlsZVdpZHRoKSArIDEsXG4gICAgICAgICAgICBjb2x1bW5zID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodC90aWxlSGVpZ2h0KSArIDE7XG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDAuMCwgaSA9IDA7IGkgPCByb3dzOyB4Kz10aWxlSGVpZ2h0LCBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwLCBqPTA7IGogPCBjb2x1bW5zOyB5Kz10aWxlV2lkdGgsIGorKykge1xuICAgICAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5yYW5kb21DU1Njb2xvcih0aGlzLmVudmlyb25tZW50X2lkKTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAvLyBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZUNhcnRvb24oY3R4KXtcbiAgICAgICAgY29uc3QgZW52ID0gRU5WSVJPTk1FTlRTW3RoaXMuZW52aXJvbm1lbnRfaWRdO1xuXG4gICAgICAgIGNvbnN0IHNwciA9IHNwcml0ZXNbZW52LmVudGl0aWVzU3ByaXRlc107XG5cbiAgICAgICAgLy/QodCz0LXQvdC10YDQuNC8INC00LXRgNC10LLRjNGPXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8dGhpcy5lbnRpdGllc19udW07IGkrKyl7XG5cbiAgICAgICAgICAgIC8v0KHQu9GD0YfQsNC50L3QsNGPINC/0LvQuNGC0LrQsCDQuNC3INC90LDQsdC+0YDQsFxuICAgICAgICAgICAgbGV0IGlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnNwci5zdGF0ZXMuZGVmYXVsdC5sZW5ndGgpO1xuICAgICAgICAgICAgbGV0IHRpbGUgPSBzcHIuc3RhdGVzLmRlZmF1bHRbaWRdO1xuXG4gICAgICAgICAgICAvL9Ch0LvRg9GH0LDQudC90YvQtSDQutC+0L7RgNC00LjQvdCw0YLRi1xuICAgICAgICAgICAgbGV0IHh4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0aGlzLndpZHRoICsgdGlsZS53aWR0aCkvMTApKjEwIC0gdGlsZS53aWR0aDtcbiAgICAgICAgICAgIGxldCB5eSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodGhpcy5oZWlnaHQgKyB0aWxlLmhlaWdodCkvMTApKjEwIC0gdGlsZS5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgdyA9IHRpbGUud2lkdGgsIGggPSB0aWxlLmhlaWdodCwgc3ggPSB0aWxlLngsIHN5ID0gdGlsZS55O1xuXG5cbiAgICAgICAgICAgIC8v0J7QsdGA0LXQt9C60LAg0L/QviDQs9GA0LDQvdC40YbQsNC8INC60L7QvNC90LDRgtGLXG5cbiAgICAgICAgICAgIGlmKHh4IDwgdGhpcy53aWR0aCAmJiB4eCA+IC10aWxlLndpZHRoICYmIHl5IDwgdGhpcy5oZWlnaHQgJiYgeXkgPiAtdGlsZS5oZWlnaHQpIHtcblxuICAgICAgICAgICAgICAgIGlmKHh4IDwgMCl7dyArPSB4eDtzeCAtPSB4eDt4eCA9IDA7fVxuXG4gICAgICAgICAgICAgICAgaWYoeXkgPCAwKXtoICs9IHl5O3N5IC09IHl5O3l5ID0gMDt9XG5cbiAgICAgICAgICAgICAgICBpZiAoeHggPiB0aGlzLndpZHRoIC0gdGlsZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB3ID0gdGhpcy53aWR0aCAtIHh4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh5eSA+IHRoaXMuaGVpZ2h0IC0gdGlsZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaCA9IHRoaXMuaGVpZ2h0IC0geXk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzcHIuaW1hZ2UsIHN4LCBzeSwgdywgaCwgeHgsIHl5LCB3LCBoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuXG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9ICcjOWY4ZTYwJztcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FtZXJhLndpZHRoLCBjYW1lcmEuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgICBpZighdGhpcy5pbWFnZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhclxuICAgICAgICAgICAgc3ggPSAwLFxuICAgICAgICAgICAgc3kgPSAwLFxuICAgICAgICAgICAgc3cgPSB0aGlzLndpZHRoLFxuICAgICAgICAgICAgc2ggPSB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIGR4ID0gMCxcbiAgICAgICAgICAgIGR5ID0gMCxcbiAgICAgICAgICAgIGR3ID0gY2FtZXJhLndpZHRoLFxuICAgICAgICAgICAgZGggPSBjYW1lcmEuaGVpZ2h0O1xuXG4gICAgICAgIGlmKGNhbWVyYS53aWR0aCA8IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHN4ID0gY2FtZXJhLng7XG4gICAgICAgICAgICBzdyA9IGNhbWVyYS53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8gZHggPSAtY2FtZXJhLng7XG4gICAgICAgICAgICBkeCA9IE1hdGguZmxvb3IoKGNhbWVyYS53aWR0aCAtIHRoaXMud2lkdGgpLzIpO1xuICAgICAgICAgICAgZHcgPSB0aGlzLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2FtZXJhLmhlaWdodCA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBzeSA9IGNhbWVyYS55O1xuICAgICAgICAgICAgc2ggPSBjYW1lcmEuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvLyBkeSA9IC1jYW1lcmEueTtcbiAgICAgICAgICAgIGR5ID0gTWF0aC5mbG9vcigoY2FtZXJhLmhlaWdodCAtIHRoaXMuaGVpZ2h0KS8yKTtcbiAgICAgICAgICAgIGRoID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjYW1lcmEuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKTtcbiAgICB9XG59IiwiaW1wb3J0IGNoYXJhY3RlcnMgZnJvbSBcIi4uLy4uL2NoYXJhY3RlcnNcIjtcblxuLyoqXG4gKiBAY2xhc3MgVGVsZXBvcnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHJvb21faWQsIHgsIHksIGNoYXJhY3Rlcl9pZCwgSUQsIHRhcmdldCwgc3RhdGUsIHdpZHRoLCBoZWlnaHQpe1xuICAgICAgICB0aGlzLklEID0gSUQ7XG4gICAgICAgIHRoaXMucm9vbV9pZCA9IHJvb21faWQ7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoJ3RlbGVwb3J0Jyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNwZWVkID0gMTQ7XG4gICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG5cbiAgICAgICAgdGhpcy50YXJnZXQgPSB7XG4gICAgICAgICAgICByb29tX2lkOiB0YXJnZXQucm9vbV9pZCxcbiAgICAgICAgICAgIHg6IHRhcmdldC54LFxuICAgICAgICAgICAgeTogdGFyZ2V0LnlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldChzdGF0ZSl7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZSAhPT0gc3RhdGUpe1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCdcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9ICh0aGlzLngtKHRoaXMuY2hhcmFjdGVyLndpZHRoLXRoaXMud2lkdGgpLzIpIC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gKHRoaXMueS10aGlzLmNoYXJhY3Rlci5oZWlnaHQrdGhpcy5oZWlnaHQpIC0gY2FtZXJhLnk7XG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIuZHJhdyhjYW1lcmEuY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNhbWVyYS5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFJlY3QodGhpcy54LWNhbWVyYS54LCB0aGlzLnktY2FtZXJhLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVjdCh4LCB5LCB0aGlzLmNoYXJhY3Rlci53aWR0aCwgdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0KTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlc3RvcmUoKTsqL1xuICAgIH1cblxuICAgIGFuaW1hdGUoc3RlcCl7XG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIHN0ZXA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPCAwIHx8IHRoaXMuY3VycmVudFNwcml0ZU51bSA+PSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi8uLi9ldmVudHNcIjtcblxuLyoqXG4gKiDQntC60L3QviDQuNC90YTQvtGA0LzQsNGG0LjQuCDQviDQs9C10YDQvtC1XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcCwgdXBkYXRlfVxuXG5cbi8vIGh0bWwt0LXQu9C10LzQtdC90YLRiyDQsiDQutC+0YLQvtGA0YvQtSDQv9C+0LrQsNC20LXQvCDQuNC90YTQvtGA0LzQsNGG0LjRjiDQviDQs9C10YDQvtC1L9C40LPRgNC1XG5cbmNvbnN0IGhlcm9faW5mb0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm8tcGFuZWxcIik7XG5jb25zdCBoZXJvX25hbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvLW5hbWVcIik7XG5jb25zdCBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvaW5zX2NvdW50XCIpO1xuY29uc3QgbGV2ZWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX2xldmVsXCIpO1xuY29uc3QgbGV2ZWx1cGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX2xldmVsdXBjb3VudGVyXCIpO1xuY29uc3Qgc3BlZWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvX3NwZWVkXCIpO1xuY29uc3QgaGVhbHRoRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb19oZWFsdGhcIik7XG5cblxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBoZXJvX2luZm9FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xufVxuZnVuY3Rpb24gc3RvcCgpe1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xufVxuXG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSl7XG5cbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYodGFyZ2V0LmlkICYmIHRhcmdldC5pZD09PVwic2lnbm91dF9idXR0b25cIil7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvL2lmKGNvbmZpcm0oXCLQotC+0YfQvdC+INCy0YvQudGC0Lg/XCIpKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NpZ25vdXQnLCBudWxsKTtcbiAgICAgICAgLy99XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiDQn9C+0LrQsNC3INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbiAqIEBwYXJhbSBpbmZvXG4gKiBAcGFyYW0gbG9naW5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGluZm8pe1xuICAgIGhlcm9fbmFtZUVsZW1lbnQgJiYgKGhlcm9fbmFtZUVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5uYW1lKTtcbiAgICBzY29yZUVsZW1lbnQgJiYgKHNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmNvaW5zX2NvdW50KTtcbiAgICBsZXZlbEVsZW1lbnQgJiYgKGxldmVsRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmxldmVsKTtcbiAgICBzcGVlZEVsZW1lbnQgJiYgKHNwZWVkRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLnNwZWVkKTtcbiAgICBsZXZlbHVwY291bnRlckVsZW1lbnQgJiYgKGxldmVsdXBjb3VudGVyRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmxldmVsdXBWYWx1ZSAtIGluZm8ubGV2ZWx1cENvdW50ZXIpO1xuICAgIGhlYWx0aEVsZW1lbnQgJiYgKGhlYWx0aEVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5oZWFsdGgpXG59IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cblxuLyoqXG4gKiDQo9C80LXQvdC40Y8gLyDRjdGE0YTQtdC60YLRi1xuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLXG5cbmNvbnN0IHNraWxsc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbHMtcGFuZWxcIik7XG5cbmNvbnN0IHNraWxsc0VsZW1lbnRzID0ge1xuICAgIHNraWxsMTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDFcIiksXG4gICAgc2tpbGwyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsMlwiKSxcbiAgICBza2lsbDM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwzXCIpLFxuICAgIHNraWxsNDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDRcIiksXG4gICAgc2tpbGw1OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsNVwiKSxcbiAgICBza2lsbDY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw2XCIpLFxuICAgIHNraWxsNzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDdcIiksXG4gICAgc2tpbGw4OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsOFwiKSxcbiAgICBza2lsbDk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw5XCIpLFxuICAgIHNraWxsMTA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwxMFwiKSxcbn07XG5jb25zdCBhbGxTa2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNraWxsXCIpO1xuXG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgLy/Qn9C+0LrQsNC20LXQvFxuICAgIHNraWxsc1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgc2tpbGxzUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuICAgIHNraWxsc1BhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG5cbiAgICAvL9CV0YHQu9C4INGB0LzQtdC90LAg0YPQvNC10L3QuNGPIC0g0YHQvNC10L3QuNC8XG4gICAgZXZlbnRzLm9uKCdza2lsbC1jaGFuZ2UnLCAoZXZlbnROYW1lLElEKT0+c2VsZWN0U2tpbGwoSUQpKTtcblxuXG4gICAgLy/QntCx0L3QvtCy0LvQtdC90LjQtSDQuNC60L7QvdC+0Log0Lgg0LPQvtGC0L7QstC90L7RgdGC0Lgg0YPQvNC10L3QuNC5XG4gICAgZXZlbnRzLm9uKCdza2lsbHMnLCAoZXZlbnROYW1lLCB0eXBlLCBkYXRhKT0+e1xuICAgICAgICBpZih0eXBlPT09J3VwZGF0ZScpe1xuICAgICAgICAgICAgZm9yKGNvbnN0IHNraWxsX2lkIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxzRWxlbWVudHNbc2tpbGxfaWRdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsID0gc2tpbGxzRWxlbWVudHNbc2tpbGxfaWRdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v0JjQutC+0L3QutCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LDRjyDRg9C80LXQvdC40Y5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gc2tpbGwucXVlcnlTZWxlY3RvcignLnNraWxsLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgLy9cItCS0LXQutC+XCIg0YPQvNC10L3QuNGPXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZWtvRWxlbWVudCA9IHNraWxsLnF1ZXJ5U2VsZWN0b3IoJy52ZWtvJyk7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZT1cIlwiO1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdza2lsbC1pY29uJyk7XG4gICAgICAgICAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoZGF0YVtza2lsbF9pZF0uaWNvbik7XG5cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSB2ZWtvRWxlbWVudC5jbGFzc0xpc3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNsYXNzTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNsYXNzTGlzdC5pdGVtKDApKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoXCJ2ZWtvXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3QuYWRkKFwidmFsdWVcIiArIE1hdGguZmxvb3IoZGF0YVtza2lsbF9pZF0udmFsdWUgLyAxMCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2tpbGxzUGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcbiAgICBza2lsbHNQYW5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG4gICAgc2tpbGxzUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuXG5mdW5jdGlvbiBzZWxlY3RTa2lsbChJRCkge1xuICAgIGlmKHNraWxsc0VsZW1lbnRzW0lEXSl7XG4gICAgICAgIGFsbFNraWxscy5mb3JFYWNoKHNraWxsID0+IHNraWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIikpO1xuICAgICAgICBza2lsbHNFbGVtZW50c1tJRF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG5cbn1cblxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihlKXtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbC1pY29uXCIpIHx8XG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZWtvXCIpKXtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaWYoXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJza2lsbFwiKVxuICAgICl7XG4gICAgICAgIGlmKCF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ3NraWxsLWNoYW5nZScsIHRhcmdldC5pZCk7XG5cbiAgICAgICAgfVxuICAgICAgICBldmVudHMuYWRkKFwia2V5ZG93blwiLCBcImZpcmVcIik7XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL9Cf0L4gbW91c2V1cFxuZnVuY3Rpb24gb25Nb3VzZVVwKGUpe1xuXG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtaWNvblwiKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVrb1wiKSl7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGxcIilcbiAgICApe1xuICAgICAgICBldmVudHMuYWRkKFwia2V5dXBcIiwgXCJmaXJlXCIpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuIiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cbmxldCBhY3RpdmUgPSBmYWxzZTtcblxuXG4vKipcbiAqINCe0LrQvdC+INCi0J7Qny0xMFxuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3AsIGlzQWN0aXZlLCBzaG93LCBoaWRlfVxuXG5cbi8vIGh0bWwt0LXQu9C10LzQtdC90YLRiyDQsiDQutC+0YLQvtGA0YvQtSDQv9C+0LrQsNC20LXQvCDQuNC90YTQvtGA0LzQsNGG0LjRjlxuXG5jb25zdCB0b3AxMEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvcDEwLXBhbmVsXCIpO1xuY29uc3QgdG9wMTBDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wMTAtcGFuZWwtY29udGVudFwiKTtcblxuXG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIHRvcDEwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xuXG4gICAgZXZlbnRzLm9uKFwia2V5dXBcIiwgKGV2ZW50TmFtZSwga2V5Q29kZSk9PntcbiAgICAgICAgaWYoa2V5Q29kZT09PVwic3RhdGlzdGljXCIpe1xuICAgICAgICAgICAgaWYoaXNBY3RpdmUoKSl7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInNlcnZlclwiLCB1cGRhdGUpO1xuXG59XG5mdW5jdGlvbiBzdG9wKCl7XG4gICAgdG9wMTBFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkNsaWNrLCBmYWxzZSk7XG4gICAgZXZlbnRzLm9mZihcInNlcnZlclwiLCB1cGRhdGUpO1xufVxuXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIHRvcDEwRWxlbWVudC5zdHlsZS5yaWdodCA9IDA7XG4gICAgYWN0aXZlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB0b3AxMEVsZW1lbnQuc3R5bGUucmlnaHQgPSAnLTE5NnB4Jztcbn1cblxuZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIGFjdGl2ZTtcbn1cblxuXG5mdW5jdGlvbiBvbkNsaWNrKGUpe1xuXG4gICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdygpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKipcbiAqINCf0L7QutCw0Lcg0LjQvdGE0L7RgNC80LDRhtC40LhcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSkge1xuICAgIGlmKHR5cGU9PT1cInN0YXRpc3RpY1wiKXtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkYXRhLmluZm8pKXtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmluZm8uZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgICAgIC8vbG9nKHBsYXllci5JRCArICcgLSAnICsgcGxheWVyLmxldmVsKTtcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9ICdcXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPicrcGxheWVyLklEICsgJzo8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImhlcm9fc3BlZWRcIiBjbGFzcz1cInZhbHVlXCI+JytwbGF5ZXIuc2NvcmUrJzwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4nO1xuICAgICAgICAgICAgICAgIHRvcDEwQ29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8qKlxuICog0JjQvdGC0LXRgNGE0LXQudGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5cblxuLy8g0J7QutC90L4g0KLQvtC/LTEwXG5pbXBvcnQgdG9wMTAgZnJvbSAnLi90b3AxMCdcbi8vINCe0LrQvdC+INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbmltcG9ydCBoZXJvSW5mbyBmcm9tICcuL2hlcm9pbmZvLmpzJ1xuLy8g0J/QsNC90LXQu9GMINGD0LzQtdC90LjQuVxuaW1wb3J0IHNraWxscyBmcm9tICcuL3NraWxscy5qcydcbi8vINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuaW1wb3J0IHdhaXRTY3JlZW4gZnJvbSAnLi93YWl0c2NyZWVuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtoZXJvSW5mbywgc2tpbGxzLCB0b3AxMCwgd2FpdFNjcmVlbn0iLCIvKipcbiAqINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuICovXG5cblxuY29uc3Qgd2FpdFNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdcIik7XG5cblxuZXhwb3J0IGRlZmF1bHQge3Nob3csIGhpZGV9XG5cblxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG4iLCIvKipcbiAqIEBjbGFzcyBVbml0XG4gKlxuICovXG5pbXBvcnQge1NURVB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuLi8uLi9jaGFyYWN0ZXJzXCI7XG5pbXBvcnQgZW50aXRpZXMgZnJvbSBcIi4vZW50aXRpZXNcIjtcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5cbmNvbnN0IENIQVJBQ1RFUl9ERUZBVUxUID0gJ2Jsb25kJztcblxuY29uc3QgTUFYX0hFQUxUSCA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pdHtcbiAgICAvKipcbiAgICAgKiDQmtC+0L3RgdGC0YDRg9C60YLQvtGAXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBpc0hlcm8pe1xuXG4gICAgICAgIGlmKGlzSGVybyl7XG4gICAgICAgICAgICB0aGlzLmlzSGVybyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvb21faWQgPSBkYXRhLnJvb21faWQ7XG5cbiAgICAgICAgdGhpcy54ID0gZGF0YS54O1xuICAgICAgICB0aGlzLnkgPSBkYXRhLnk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChkYXRhLmNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoQ0hBUkFDVEVSX0RFRkFVTFQpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlIHx8ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG5cbiAgICAgICAgdGhpcy5sZXZlbCA9IGRhdGEubGV2ZWw7XG4gICAgICAgIHRoaXMuY29pbnNfY291bnQgPSBkYXRhLmNvaW5zX2NvdW50O1xuICAgICAgICB0aGlzLmxldmVsdXBWYWx1ZSA9IGRhdGEubGV2ZWx1cFZhbHVlO1xuICAgICAgICB0aGlzLmxldmVsdXBDb3VudGVyID0gZGF0YS5sZXZlbHVwQ291bnRlcjtcblxuICAgICAgICB0aGlzLmhlYWx0aCA9IGRhdGEuaGVhbHRoO1xuXG4gICAgICAgIHRoaXMuZWZmZWN0cyA9IFtdOy8vVE9ETzog0J/RgNC40LzQtdC90Y/RgtGMINC/0YDQuCDRgdC+0LfQtNCw0L3QuNC4XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDsgLy9UT0RPOiDQstGL0L3QtdGB0YLQuCDQsiBjaGFyYWN0ZXJcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0Y7QvdC40YLQsFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgc2V0KGRhdGEpe1xuXG4gICAgICAgIHRoaXMucm9vbV9pZCA9IGRhdGEucm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0gZGF0YS54O1xuICAgICAgICB0aGlzLnkgPSBkYXRhLnk7XG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVycy5nZXQoZGF0YS5jaGFyYWN0ZXJfaWQpIHx8IGNoYXJhY3RlcnMuZ2V0KENIQVJBQ1RFUl9ERUZBVUxUKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZSAhPT0gZGF0YS5zdGF0ZSl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcblxuICAgICAgICB0aGlzLmxldmVsID0gZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5jb2luc19jb3VudCA9IGRhdGEuY29pbnNfY291bnQ7XG4gICAgICAgIHRoaXMubGV2ZWx1cFZhbHVlID0gZGF0YS5sZXZlbHVwVmFsdWU7XG4gICAgICAgIHRoaXMubGV2ZWx1cENvdW50ZXIgPSBkYXRhLmxldmVsdXBDb3VudGVyO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoID0gZGF0YS5oZWFsdGg7XG5cbiAgICAgICAgdGhpcy51cGRhdGVFZmZlY3RzKGRhdGEuZWZmZWN0cyk7XG5cbiAgICB9XG5cbiAgICB1cGRhdGVFZmZlY3RzKGVmZmVjdHMpe1xuICAgICAgICBsZXQgZXhpc3RzRWZmZWN0ID0ge307XG5cbiAgICAgICAgZm9yKGxldCBpIGluIGVmZmVjdHMpe1xuICAgICAgICAgICAgLy/QldGB0LvQuCDQvdC+0LLRi9C5INGN0YTRhNC10LrRgiAtINGB0L7Qt9C00LDQtNC40LxcbiAgICAgICAgICAgIGlmKGVmZmVjdHNbaV0gaW4gdGhpcy5lZmZlY3RzPT09ZmFsc2UpIHtcblxuICAgICAgICAgICAgICAgIGlmIChlZmZlY3RzW2ldID09PSAnZnJlZXplJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55ICsgMTgsIGNoYXJhY3RlcnMuZ2V0KCdmcmVlemUnKSwgMC4wLCAwLjApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdHNbZWZmZWN0c1tpXV0gPSBlbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLmFkZE9uZShlbnRpdHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlZmZlY3RzW2ldID09PSAnaG9sZXJhJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55ICsgMTgsIGNoYXJhY3RlcnMuZ2V0KCdibGFja2Jvb20nKSwgMC4wLCAwLjApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdHNbZWZmZWN0c1tpXV0gPSBlbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLmFkZE9uZShlbnRpdHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlZmZlY3RzW2ldID09PSAnc2hpZWxkJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55ICsgMTgsIGNoYXJhY3RlcnMuZ2V0KCdzaGllbGQnKSwgMC4wLCAwLjApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVmZmVjdHNbZWZmZWN0c1tpXV0gPSBlbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLmFkZE9uZShlbnRpdHkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhpc3RzRWZmZWN0W2VmZmVjdHNbaV1dID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0J/QviDQvtC60L7QvdGH0LDQvdC40Lgg0Y3RhNGE0LXQutGC0LAgLSDRg9Cx0LXRgNC10LxcbiAgICAgICAgZm9yKGxldCBlZmZlY3RJRCBpbiB0aGlzLmVmZmVjdHMpe1xuICAgICAgICAgICAgaWYoZWZmZWN0SUQgaW4gZXhpc3RzRWZmZWN0PT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0c1tlZmZlY3RJRF0ua2lsbCgpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmVmZmVjdHNbZWZmZWN0SURdO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGFuaW1hdGUoKXtcbiAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPXG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIFNURVA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPCAwIHx8IHRoaXMuY3VycmVudFNwcml0ZU51bSA+PSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL9CQ0L3QuNC80LDRhtC40Y8g0Y3RhNGE0LXQutGC0L7QslxuICAgICAgICBmb3IobGV0IGkgaW4gdGhpcy5lZmZlY3RzKXtcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0c1tpXS54ID0gdGhpcy54K3RoaXMud2lkdGgvMjtcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0c1tpXS55ID0gdGhpcy55KzE4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gdGhpcy55IC0gY2FtZXJhLnk7XG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3U2hhZG93KGNhbWVyYS5jb250ZXh0LCB4LCB5KTtcblxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoY2FtZXJhLmNvbnRleHQsIHgsIHkpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQuNC80Y9cbiAgICAgICAgaWYodGhpcy5sZXZlbCE9dW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd05hbWUoY2FtZXJhLmNvbnRleHQsIHgsIHktNTUsIHRoaXMubmFtZSwgdGhpcy5sZXZlbCwgdGhpcy5pc0hlcm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JXRgdC70Lgg0LXRgdGC0YwgLSDRgNC40YHRg9C10Lwg0LjQvdC00LjQutCw0YLQvtGAXG4gICAgICAgIGlmKHRoaXMuaGVhbHRoIT11bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgbGV0IHZvbHVtZTtcblxuICAgICAgICAgICAgdm9sdW1lID0gTWF0aC5mbG9vcih0aGlzLmhlYWx0aCoxMDAvTUFYX0hFQUxUSCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd1ZvbHVtZShjYW1lcmEuY29udGV4dCwgeCwgeSAtIDUwLCB2b2x1bWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBkcmF3Q2hhcmFjdGVyKGNvbnRleHQsIHN4LCBzeSl7XG4gICAgICAgIGxldCB4ID0gc3ggLSAodGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMixcbiAgICAgICAgICAgIHkgPSBzeSAtICh0aGlzLmNoYXJhY3Rlci5oZWlnaHQtdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzeCwgc3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwwLDAsMC44KVwiO1xuICAgICAgICBjb250ZXh0LmFyYyhzeCwgc3ksIDIsIDAsIE1hdGguUEkqMik7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpOyovXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDQoNC40YHRg9C10Lwg0LjQvdC00LjQutCw0YLQvtGAXG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgZHJhd1ZvbHVtZShjb250ZXh0LCB4LCB5LCB2YWx1ZSl7XG5cbiAgICAgICAgbGV0IHZvbHVtZVdpZHRoID0gNTA7XG4gICAgICAgIGxldCB2b2x1bWVIZWlnaHQgPSA0O1xuICAgICAgICBsZXQgdm9sdW1lWCA9IHggKyAodGhpcy53aWR0aCAtIHZvbHVtZVdpZHRoKS8yO1xuICAgICAgICBsZXQgdm9sdW1lWSA9IHk7XG5cblxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHZvbHVtZVgsIHZvbHVtZVksIE1hdGguZmxvb3Iodm9sdW1lV2lkdGgqdmFsdWUvMTAwKSwgdm9sdW1lSGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5yZWN0KHZvbHVtZVgtMSwgdm9sdW1lWS0xLCB2b2x1bWVXaWR0aCsyLCB2b2x1bWVIZWlnaHQrMik7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC40LzRj1xuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIHN4XG4gICAgICogQHBhcmFtIHN5XG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gbGV2ZWxcbiAgICAgKiBAcGFyYW0gaXNIZXJvXG4gICAgICovXG4gICAgZHJhd05hbWUoY29udGV4dCwgc3gsIHN5LCBuYW1lLCBsZXZlbCwgaXNIZXJvKXtcblxuICAgICAgICBsZXQgcGFkZGluZ0NvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMylcIjtcbiAgICAgICAgaWYoaXNIZXJvKXtcbiAgICAgICAgICAgIHBhZGRpbmdDb2xvciA9IFwicmdiYSgwLDIwMCw0MCwwLjQpXCI7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICAvL9CY0LzRj1xuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjE0cHggc2Fucy1zZXJpZlwiO1xuICAgICAgICBsZXQgdGV4dFdpZHRoID0gY29udGV4dC5tZWFzdXJlVGV4dChuYW1lKS53aWR0aDtcblxuICAgICAgICAvL9Cj0YDQvtCy0LXQvdGMXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiYm9sZCAxMnB4IEFyaWFsXCI7XG4gICAgICAgIGxldCB0ZXh0TGV2ZWxXaWR0aCA9IGNvbnRleHQubWVhc3VyZVRleHQobGV2ZWwpLndpZHRoO1xuXG4gICAgICAgIC8v0KHRh9C40YLQsNC10Lwg0YDQsNC30LzQtdGA0YtcbiAgICAgICAgbGV0IHBhZFdpZHRoID0gdGV4dFdpZHRoICsgdGV4dExldmVsV2lkdGggKyAyO1xuXG4gICAgICAgIGxldCBseCA9IHN4Kyh0aGlzLndpZHRoIC0gcGFkV2lkdGgpLzIsXG4gICAgICAgICAgICB4ID0gbHggKyB0ZXh0TGV2ZWxXaWR0aCArIDIsXG4gICAgICAgICAgICBseSA9IHN5LFxuICAgICAgICAgICAgeSA9IHN5O1xuXG5cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBwYWRkaW5nQ29sb3I7XG4gICAgICAgIGNvbnRleHQuYXJjKGx4LTIsIHktMTIrMTgvMiwgMTgvMiwgTWF0aC5QSS8yLCAtTWF0aC5QSS8yKTtcbiAgICAgICAgY29udGV4dC5hcmMobHgtMitwYWRXaWR0aCwgeS0xMisxOC8yLCAxOC8yLCAtTWF0aC5QSS8yLCBNYXRoLlBJLzIpO1xuICAgICAgICBjb250ZXh0LnJlY3QobHgtMiwgeS0xMiwgcGFkV2lkdGgsIDE4KTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICAgICAgY29udGV4dC5mb250ID0gXCIxNHB4IHNhbnMtc2VyaWZcIjtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcInllbGxvd1wiO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KG5hbWUseCx5KTtcblxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcImJvbGQgMTJweCBBcmlhbFwiO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChsZXZlbCxseCxseSk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cbiAgICBkcmF3U2hhZG93KGNvbnRleHQsIHgsIHkpe1xuXG4gICAgICAgIGxldFxuICAgICAgICAgICAgc2hhZG93Q29sb3IxID0gXCJyZ2JhKDAsMCwwLDAuMSlcIixcbiAgICAgICAgICAgIHNoYWRvd0NvbG9yMiA9IFwicmdiYSgwLDAsMCwwLjE1KVwiLFxuICAgICAgICAgICAgc2hhZG93Q29sb3IzID0gXCJyZ2JhKDAsMCwwLDAuMilcIjtcblxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcblxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHNoYWRvd0NvbG9yMTtcbiAgICAgICAgY29udGV4dC5lbGxpcHNlKHggKyB0aGlzLndpZHRoLzIsIHkrdGhpcy5oZWlnaHQtMiwgMjAsIDEwLCAwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHNoYWRvd0NvbG9yMjtcbiAgICAgICAgY29udGV4dC5lbGxpcHNlKHggKyB0aGlzLndpZHRoLzIsIHkrdGhpcy5oZWlnaHQtMiwgMTcsIDgsIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gc2hhZG93Q29sb3IyO1xuICAgICAgICBjb250ZXh0LmVsbGlwc2UoeCArIHRoaXMud2lkdGgvMiwgeSt0aGlzLmhlaWdodC0yLCAxNSwgNywgMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cblxuICAgIGRlc3Ryb3koKXtcbiAgICAgICAgZm9yKGxldCBlZmZlY3RJRCBpbiB0aGlzLmVmZmVjdHMpe1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RzW2VmZmVjdElEXS5raWxsKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5lZmZlY3RzW2VmZmVjdElEXTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7aXRlbSwgYWRkLCByZW1vdmUsIHJlc2V0LCB0b0FycmF5fVxuXG5cbmNvbnN0IHVuaXRzID0ge307XG5cbi8qKlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0Y7QvdC40YIg0L/QviDQuNC80LXQvdC4XG4gKiBAcGFyYW0gSURcbiAqIEByZXR1cm5zIFVuaXRcbiAqL1xuZnVuY3Rpb24gaXRlbShJRCkge1xuICAgIHJldHVybiB1bml0c1tJRF07XG59XG5cbmZ1bmN0aW9uIGFkZChJRCwgdW5pdCkge1xuICAgIHVuaXRzW0lEXSA9IHVuaXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShJRCkge1xuICAgIGlmKElEIGluIHVuaXRzKSBkZWxldGUgdW5pdHNbSURdO1xufVxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgICBmb3IoY29uc3QgaSBpbiB1bml0cyl7XG4gICAgICAgIGlmKCF1bml0c1tpXS5pc0hlcm8pe1xuICAgICAgICAgICAgZGVsZXRlIHVuaXRzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB1bml0c1tpXS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICBsZXQgdW5pdHNBcnJheSA9IFtdO1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgdW5pdHNBcnJheS5wdXNoKHVuaXRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXRzQXJyYXk7XG59XG4iLCJpbXBvcnQgYWNjb3VudCBmcm9tIFwiLi4vYWNjb3VudFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9O1xuXG5cbmNvbnN0IGxvZ2luX3BhbmVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcGFuZWxcIik7XG5jb25zdCBsb2dpbl9mb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tZm9ybVwiKTtcbmNvbnN0IGxvZ2luX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4taW5wdXRcIik7XG5jb25zdCBwYXNzd29yZF9pbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkLWlucHV0XCIpO1xuXG5cbmxldCBmaW5hbENhbGxiYWNrID0gbnVsbDtcblxubGV0XG4gICAgdGltZW91dCA9IG51bGwsXG4gICAgdGltZW91dF9wID0gbnVsbDtcblxuXG4vLyDQktGL0LLQtdC00LXQvCDQvtC60L3QviDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LiDQnNC+0LTQsNC70YzQvdC+0LVcbmZ1bmN0aW9uIHN0YXJ0KGNhbGxiYWNrKSB7XG5cbiAgICBmaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAvL9Cf0L7Qu9GD0YfQuNC8INC40Lcg0LvQvtC60LDQuyDRgdGC0L7RgNCwXG4gICAgbGV0IHVzZXJBY2NvdW50ID0gYWNjb3VudC5nZXQoKTtcblxuICAgIC8v0LXRgdC70Lgg0LXRgdGC0YwgLSDQvtC6XG4gICAgaWYodXNlckFjY291bnQpIHtcbiAgICAgICAgZmluYWxDYWxsYmFjayh1c2VyQWNjb3VudCk7XG4gICAgfVxuICAgIC8v0LjQvdCw0YfQtSAtINC30LDQv9GA0L7RgdC40LxcbiAgICBlbHNle1xuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleXVwSGFuZGxlciwgZmFsc2UpO1xuXG4gICAgICAgIHNob3coKTtcblxuICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgXG59XG5cblxuLy8g0JfQsNC60YDQvtC10Lwg0L7QutC90L4g0LDQstGC0L7RgNC40LfQsNGG0LjQuFxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleXVwSGFuZGxlciwgZmFsc2UpO1xuICAgIGhpZGUoKTtcbn1cblxuXG4vLyDQntCx0YDQsNCx0L7RgtGH0LjQuiDQutC70LDQstC40YhcbmZ1bmN0aW9uIGtleXVwSGFuZGxlcihlKSB7XG4gICAgbGV0IG9iaiA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBsZXQga2V5ID0gZS5rZXlDb2RlO1xuXG4gICAgLy/QldGB0LvQuCBFbnRlciDQuCDQsdC10Lcg0L/RgNC+0LHQu9C10LxcbiAgICBpZihrZXk9PT0xMyAmJiB2YWxpZGF0ZShsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWUsIHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZSkpe1xuXG4gICAgICAgIHN0b3AoKTtcbiAgICAgICAgLy8g0J/QvtC70YPRh9C40LIg0YHQvtGF0YDQsNC90LjQvFxuICAgICAgICBjb25zdCBhY2NvdW50RGF0YSA9IHtsb2dpbjogbG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRfaW5wdXRFbGVtZW50LnZhbHVlfTtcbiAgICAgICAgYWNjb3VudC5zZXQoYWNjb3VudERhdGEpO1xuICAgICAgICBcbiAgICAgICAgZmluYWxDYWxsYmFjayhhY2NvdW50RGF0YSk7XG5cbiAgICB9XG4gICAgLy/QldGB0LvQuCDRgtCw0LEgLSDQv9C+LdGD0LzQvtC70YfQsNC90LjRjlxuICAgIGVsc2UgaWYgKGtleT09PTkpe1xuXG4gICAgfVxuXG4gICAgZWxzZSBpZiAoXG4gICAgICAgIC8v0YHQuNC80LLQvtC70Ysg0YDQsNC30YDQtdGI0LXQvdC90YvQtSDQsiDQu9C+0LPQuNC90LVcbiAgICAvXlthLXpBLVowLTkgKy5cXC1fOlwiKCldKj8kLy50ZXN0KG9iai52YWx1ZSkgJiZcbiAgICBvYmoudmFsdWUubGVuZ3RoIDwgMTAgLy8g0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPINC00LvQuNC90LAg0LvQvtCz0LjQvdCwXG4gICAgKSB7XG4gICAgICAgIG9iai5kZWZhdWx0VmFsdWUgPSBvYmoudmFsdWU7XG5cbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRjYjRhJztcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBvYmoudmFsdWUgPSBvYmouZGVmYXVsdFZhbHVlO1xufVxuXG4vLyDQn9GA0L7QstC10YDQutCwINCy0LLQtdC00LXQvdC90L7Qs9C+INC4INC40L3QtNC40LrQsNGG0LjRjyDQvtGI0LjQsdC60LhcbmZ1bmN0aW9uIHZhbGlkYXRlKGxvZ2luLCBwYXNzd29yZCkge1xuXG4gICAgaWYobG9naW4ubGVuZ3RoPT09MCkge1xuICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmYwMDA4JztcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmNGNiNGEnO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHBhc3N3b3JkLmxlbmd0aD09PTApIHtcbiAgICAgICAgcGFzc3dvcmRfaW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmMDAwOCc7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0X3ApO1xuICAgICAgICB0aW1lb3V0X3AgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2Y0Y2I0YSc7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcblxufVxuXG5cbi8vINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutC+0LJcbmZ1bmN0aW9uIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuXG4gICAgLy8g0JXRgdC70Lgg0L3QsNC20LDQu9C4IFwi0JLQvtC50YLQuFwiINC4INC70L7Qs9C40L0g0L3QvtGA0LwgLSDQt9Cw0L/Rg9GB0YLQuNC8INGE0YPQvdC60YbQuNGOINCy0YXQvtC00LBcbiAgICBpZih0YXJnZXQuaWQ9PT0nbG9naW4tYnV0dG9uJyAmJiB2YWxpZGF0ZShsb2dpbl9pbnB1dEVsZW1lbnQudmFsdWUsIHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZSkpe1xuXG4gICAgICAgIHN0b3AoKTtcblxuICAgICAgICBjb25zdCBhY2NvdW50RGF0YSA9IHtsb2dpbjogbG9naW5faW5wdXRFbGVtZW50LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRfaW5wdXRFbGVtZW50LnZhbHVlfTtcbiAgICAgICAgYWNjb3VudC5zZXQoYWNjb3VudERhdGEpO1xuXG4gICAgICAgIGZpbmFsQ2FsbGJhY2soYWNjb3VudERhdGEpO1xuICAgIH1cbiAgICBlbHNlIGlmKHRhcmdldC5pZD09PSdsb2dpbi1pbnB1dCcgfHwgdGFyZ2V0LmlkPT09J3Bhc3N3b3JkLWlucHV0Jyl7XG5cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZT09PScnKSB7XG4gICAgICAgICAgICBsb2dpbl9pbnB1dEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHBhc3N3b3JkX2lucHV0RWxlbWVudC52YWx1ZT09PScnKXtcbiAgICAgICAgICAgIHBhc3N3b3JkX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbi8v0J/QvtC60LDQt9Cw0YLRjCDQvtC60L3QviDQstGF0L7QtNCwXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIGxvZ2luX3BhbmVsRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBsb2dpbl9mb3JtRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuLy/RgdC60YDRi9GC0Ywg0L7QutC90L4g0LLRhdC+0LTQsFxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBsb2dpbl9wYW5lbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBsb2dpbl9mb3JtRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSIsImltcG9ydCBTb3VuZCBmcm9tIFwiLi9lbmdpbmUvc291bmQuanNcIjtcblxuY29uc3Qgc291bmRzID0ge1xuICAgIFwibGV2ZWxfdXBcIjogbmV3IFNvdW5kKCdzb3VuZC9jYXNoLm1wMycpLFxuICAgIFwibnBjX2VhdF9jb2luXCI6IG5ldyBTb3VuZCgnc291bmQvY29pbi9jb2luMy53YXYnLCAwLjEpLFxuICAgIFwiZWF0X2NvaW5fZ29sZFwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vY29pbi53YXYnKSxcbiAgICBcImVhdF9jb2luX3NpbHZlclwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vZWF0Mi5tcDMnKSxcbiAgICBcImVhdF9jb2luX2NvcHBlclwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vZWF0MS5tcDMnKSxcbiAgICBcInRlbGVwb3J0XCI6IG5ldyBTb3VuZCgnc291bmQvdGVsZXBvcnQvZmxhdW5jaC53YXYnLCAwLjEpLFxuICAgIFwicHVzaC1lZmZlY3RcIjogbmV3IFNvdW5kKCdzb3VuZC9oaXQvZHJvcExlYXRoZXIub2dnJyksXG4gICAgXCJmcmVlemUtZWZmZWN0XCI6IG5ldyBTb3VuZCgnc291bmQvaGl0L2Zyb3N0LndhdicpLFxuICAgIFwiaG9sZXJhLWVmZmVjdFwiOiBuZXcgU291bmQoJ3NvdW5kL2hpdC9ob2xlcmEud2F2JyksXG4gICAgXCJzaGllbGQtZWZmZWN0XCI6IG5ldyBTb3VuZCgnc291bmQvc2hpZWxkLndhdicpLFxuICAgIFwid2VhcG9uLWNsYXdzMVwiOiBuZXcgU291bmQoJ3NvdW5kL2hpdC9jbGF3czEud2F2JyksXG4gICAgXCJ3ZWFwb24tY2xhd3MyXCI6IG5ldyBTb3VuZCgnc291bmQvaGl0L2NsYXdzMi53YXYnKSxcbiAgICBcIndlYXBvbi1jbGF3czNcIjogbmV3IFNvdW5kKCdzb3VuZC9oaXQvY2xhd3MzLndhdicpLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc291bmRzO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlBbGwpO1xuXG5mdW5jdGlvbiBwbGF5QWxsKCkge1xuICAgIGZvcihsZXQgaSBpbiBzb3VuZHMpIHtcbiAgICAgICAgc291bmRzW2ldLmluaXQoKTtcbiAgICB9XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5QWxsKTtcbn0iLCIvKipcbiAqINCh0L/RgNCw0LnRgtGLXG4gKi9cblxuLy/QmtCw0YDRgtC40L3QutC4XG5sZXQgc19kb2MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19kb2MnKSxcbiAgICBzX3Byb2YgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19wcm9mJyksXG4gICAgc19nb2IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19nb2InKSxcbiAgICBzX2dpcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19naXJsJyksXG4gICAgc19ibG9uZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jsb25kJyksXG4gICAgc19tYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19tYWcnKSxcbiAgICBzX3RlbGVwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfdGVsZXBvcnQnKSxcbiAgICBzX2NvaW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY29pbnMnKSxcbiAgICB0X3RyZWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfdHJlZXMnKSxcbiAgICB0X2J1c2hzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfYnVzaHMnKSxcbiAgICB0X3BsYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X3BsYW50cycpLFxuICAgIHNfcG9pbnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3BvaW50ZXInKSxcbiAgICBzX2Jvb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19ib29tJyksXG4gICAgc19ib29tMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20xJyksXG4gICAgc19ib29tMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20yJyksXG4gICAgc19iYXJpZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19iYXJpZXInKSxcbiAgICBzX3NoaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3NoaWVsZCcpLFxuICAgIHNfcHVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3B1c2gnKSxcbiAgICBzX2NyeXN0YWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY3J5c3RhbHMnKSxcbiAgICBzX3NrZWxldG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfc2tlbGV0b24nKSxcbiAgICBzX2thdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19rYXR5JyksXG4gICAgc19sZXZvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2xldm9uJyksXG4gICAgc192aXRhbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc192aXRhbHknKSxcbiAgICB0X2Nvb2xfcGxhbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfY29vbF9wbGFudHMnKSxcbiAgICB0X2FuZHN0b25lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X2FuZHN0b25lcycpLFxuICAgIHNfYmxhY2tib29tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYmxhY2tib29tJyksXG4gICAgc19mcmVlemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19mcmVlemUnKSxcbiAgICBzX2tyb2tvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfa3Jva28nKSxcbiAgICBzX2tvaWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19rb2lsJyksXG4gICAgc19kZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfZGVhZCcpLFxuICAgIHNfZ3VubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfZ3VubmVyJyksXG4gICAgc19qdWsgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19qdWsnKTtcblxuXG4vKipcbiAqINCU0L7QutGC0L7RgFxuICovXG5leHBvcnRzLmRvYyA9IHtcbiAgICBcImltYWdlXCI6IHNfZG9jLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MzXCIsIFwieFwiOiAzMiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzJcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9XG4gICAgICAgIF1cbiAgICB9XG5cbn07XG5cblxuLyoqXG4gKiDQn9GA0L7RhNC10YHRgdC+0YBcbiAqL1xuZXhwb3J0cy5wcm9mID0ge1xuICAgIFwiaW1hZ2VcIjogc19wcm9mLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwiaWRsZVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInJ1bjFcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNVwiLCBcInhcIjogMzIwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNlwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuN1wiLCBcInhcIjogNDQ4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuOFwiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cblxufTtcblxuXG4vKipcbiAqINCT0L7QsdC70LjQvVxuICovXG5leHBvcnRzLmdvYiA9IHtcbiAgICBcImltYWdlXCI6IHNfZ29iLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2IxXCIsIFwieFwiOiAxMzAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjJcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iM1wiLCBcInhcIjogMCwgXCJ5XCI6IDY1LCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNFwiLCBcInhcIjogNjUsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNVwiLCBcInhcIjogNjUsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjZcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I3XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICBdXG4gICAgfVxuXG59O1xuXG5cbi8qKlxuICog0JTQtdCy0L7Rh9C60LBcbiAqL1xuZXhwb3J0cy5naXJsID0ge1xuICAgIFwiaW1hZ2VcIjogc19naXJsLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmwzXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDZcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsOVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQkdC70L7QvdC00LjQvVxuICovXG5leHBvcnRzLmJsb25kID0ge1xuICAgIFwiaW1hZ2VcIjogc19ibG9uZCxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDhcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LDQs1xuICovXG5leHBvcnRzLm1hZyA9IHtcbiAgICBcImltYWdlXCI6IHNfbWFnLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWcxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWcxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc3XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCX0L7Qu9C+0YLQsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fZ29sZCA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkMVwiLCBcInhcIjogMjI0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDNcIiwgXCJ4XCI6IDMyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQ1XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDdcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDhcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KHQtdGA0LXQsdGA0Y/QvdC90LDRjyDQvNC+0L3QtdGC0LBcbiAqL1xuZXhwb3J0cy5jb2luX3NpbHZlciA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXIxXCIsIFwieFwiOiAwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXIyXCIsIFwieFwiOiAyMjQsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjNcIiwgXCJ4XCI6IDMyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyNVwiLCBcInhcIjogOTYsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyN1wiLCBcInhcIjogMTYwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI4XCIsIFwieFwiOiAxOTIsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCc0LXQtNC90LDRjyDQvNC+0L3QtdGC0LBcbiAqL1xuZXhwb3J0cy5jb2luX2NvcHBlciA9IHtcbiAgICBcImltYWdlXCI6IHNfY29pbnMsXG4gICAgXCJ3aWR0aFwiOiA0NCxcbiAgICBcImhlaWdodFwiOiA0NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXIxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjJcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjRcIiwgXCJ4XCI6IDk2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjVcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXI2XCIsIFwieFwiOiAxNjAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyN1wiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjhcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuXG4vKipcbiAqINCi0YDQsNCy0LBcbiAqL1xuZXhwb3J0cy5ncmFzcyA9IHtcbiAgICBcImltYWdlXCI6IHRfdHJlZXMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NlwiLCBcInhcIjogMjE4LCBcInlcIjogOTEsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQlNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLnRyZWVzID0ge1xuICAgIFwiaW1hZ2VcIjogdF90cmVlcyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAxXCIsIFwieFwiOiAzMTMsIFwieVwiOiAxMzQsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAyXCIsIFwieFwiOiAwLCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQ0LCBcImhlaWdodFwiOiA0Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8wM1wiLCBcInhcIjogMzEzLCBcInlcIjogMjcyLCBcIndpZHRoXCI6IDY4LCBcImhlaWdodFwiOiA2OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8wNFwiLCBcInhcIjogMzEzLCBcInlcIjogNjUsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA1XCIsIFwieFwiOiAyNDQsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNTQsIFwiaGVpZ2h0XCI6IDU0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA2XCIsIFwieFwiOiA0NTIsIFwieVwiOiAzNDAsIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA3XCIsIFwieFwiOiA0NTIsIFwieVwiOiAxODEsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDU4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA4XCIsIFwieFwiOiAzMTMsIFwieVwiOiAzNDEsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDUyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA5XCIsIFwieFwiOiA4NiwgXCJ5XCI6IDQ1OSwgXCJ3aWR0aFwiOiA0MCwgXCJoZWlnaHRcIjogNDB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMTBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDY2LCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMVwiLCBcInhcIjogNDUyLCBcInlcIjogMjQwLCBcIndpZHRoXCI6IDQ3LCBcImhlaWdodFwiOiA1Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMlwiLCBcInhcIjogNDA1LCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDQ2LCBcImhlaWdodFwiOiA0OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xM1wiLCBcInhcIjogMTI3LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNFwiLCBcInhcIjogNDUyLCBcInlcIjogMzg5LCBcIndpZHRoXCI6IDQ2LCBcImhlaWdodFwiOiA0NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNVwiLCBcInhcIjogMzg0LCBcInlcIjogMTMzLCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xNlwiLCBcInhcIjogNDUyLCBcInlcIjogMjkzLCBcIndpZHRoXCI6IDQ4LCBcImhlaWdodFwiOiA0Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xN1wiLCBcInhcIjogNDUyLCBcInlcIjogMTIyLCBcIndpZHRoXCI6IDU0LCBcImhlaWdodFwiOiA1OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xOFwiLCBcInhcIjogMzEzLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMTlcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDYwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIwXCIsIFwieFwiOiAyOTksIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNTIsIFwiaGVpZ2h0XCI6IDU0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIxXCIsIFwieFwiOiAzODQsIFwieVwiOiAyNjcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDYwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzIyXCIsIFwieFwiOiA0NTIsIFwieVwiOiA2MSwgXCJ3aWR0aFwiOiA1NCwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjNcIiwgXCJ4XCI6IDI0NSwgXCJ5XCI6IDMxMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjRcIiwgXCJ4XCI6IDQ1LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQwLCBcImhlaWdodFwiOiA0Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNVwiLCBcInhcIjogMCwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNjJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjZcIiwgXCJ4XCI6IDIxOCwgXCJ5XCI6IDE4MiwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNTB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjdcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDMyOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNjJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjhcIiwgXCJ4XCI6IDIzNywgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNzB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjlcIiwgXCJ4XCI6IDM1MiwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1MiwgXCJoZWlnaHRcIjogNTJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDIwMCwgXCJ3aWR0aFwiOiA2NiwgXCJoZWlnaHRcIjogNjZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzhcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDExMCwgXCJoZWlnaHRcIjogMTIwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzM5XCIsIFwieFwiOiAxMTEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEwNiwgXCJoZWlnaHRcIjogMTIwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQwXCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY3LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80MVwiLCBcInhcIjogMTYyLCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDgyLCBcImhlaWdodFwiOiA3Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80MlwiLCBcInhcIjogODcsIFwieVwiOiAyMzQsIFwid2lkdGhcIjogNzgsIFwiaGVpZ2h0XCI6IDc2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQzXCIsIFwieFwiOiAwLCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDg0LCBcImhlaWdodFwiOiA4Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NFwiLCBcInhcIjogMCwgXCJ5XCI6IDEyMSwgXCJ3aWR0aFwiOiAxMTAsIFwiaGVpZ2h0XCI6IDExMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80NlwiLCBcInhcIjogMjE4LCBcInlcIjogOTEsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ3XCIsIFwieFwiOiAxMjIsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNjAsIFwiaGVpZ2h0XCI6IDU2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ4XCIsIFwieFwiOiA2MSwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDlcIiwgXCJ4XCI6IDE4MywgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTBcIiwgXCJ4XCI6IDE2NiwgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3MCwgXCJoZWlnaHRcIjogNzZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyMzQsIFwid2lkdGhcIjogODYsIFwiaGVpZ2h0XCI6IDc4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzUyXCIsIFwieFwiOiAzMTMsIFwieVwiOiAyMDMsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzUzXCIsIFwieFwiOiAxMTEsIFwieVwiOiAxMjEsIFwid2lkdGhcIjogOTQsIFwiaGVpZ2h0XCI6IDk4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzU0XCIsIFwieFwiOiAyMTgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDk0LCBcImhlaWdodFwiOiA5MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81NVwiLCBcInhcIjogODUsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDgyfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCU0LXRgNC10LLRjNGPINC4INC60YPRgdGC0YtcbiAqL1xuZXhwb3J0cy5idXNocyA9IHtcbiAgICBcImltYWdlXCI6IHRfYnVzaHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMTAzLCBcInlcIjogMTAwLCBcIndpZHRoXCI6IDI1LCBcImhlaWdodFwiOiAzMH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTAzLCBcInlcIjogNjAsIFwid2lkdGhcIjogMzAsIFwiaGVpZ2h0XCI6IDM5fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAxNTYsIFwieVwiOiAxMTksIFwid2lkdGhcIjogMTUsIFwiaGVpZ2h0XCI6IDEzfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAxMDMsIFwieVwiOiA0MCwgXCJ3aWR0aFwiOiAyMSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDEzNiwgXCJ5XCI6IDExOSwgXCJ3aWR0aFwiOiAxOSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEwMywgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDM5fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCf0YPRgdGC0YvQvdC90L7QtVxuICovXG5leHBvcnRzLmRlc2VydCA9IHtcbiAgICBcImltYWdlXCI6IHRfcGxhbnRzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDE5OCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyNywgXCJoZWlnaHRcIjogNTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAxOTgsIFwieVwiOiAyOTMsIFwid2lkdGhcIjogMzEsIFwiaGVpZ2h0XCI6IDMwfSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMjMzLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDc2LCBcImhlaWdodFwiOiA5Mn0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlMTZcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDIzOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogODd9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCh0YLRgNCw0L3QvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5iZWx3b29kID0ge1xuICAgIFwiaW1hZ2VcIjogdF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAxMDcsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTA4LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDg5LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDk1LCBcImhlaWdodFwiOiAxMTd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIwXCIsIFwieFwiOiAyNDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyNiwgXCJoZWlnaHRcIjogMTE2fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCi0LXQu9C10L/QvtGA0YJcbiAqL1xuZXhwb3J0cy50ZWxlcG9ydCA9IHtcbiAgICBcImltYWdlXCI6IHNfdGVsZXBvcnQsXG4gICAgXCJ3aWR0aFwiOiA5MCxcbiAgICBcImhlaWdodFwiOiA0OSxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMVwiLCBcInhcIjogMCwgXCJ5XCI6IDQ5LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMCwgXCJ5XCI6IDk4LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogOTAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogOTAsIFwieVwiOiA0OSwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KPQutCw0LfQsNGC0LXQu9GMXG4gKi9cbmV4cG9ydHMucG9pbnRlciA9IHtcbiAgICBcImltYWdlXCI6IHNfcG9pbnRlcixcbiAgICBcIndpZHRoXCI6IDY0LFxuICAgIFwiaGVpZ2h0XCI6IDY0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAyMDEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiA0MDIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiA2MDMsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA4MDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyMDEsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDQwMiwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyMDEsIFwiaGVpZ2h0XCI6IDIwMX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogNjAzLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogODA0LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCS0LfRgNGL0LJcbiAqL1xuZXhwb3J0cy5ib29tID0ge1xuICAgIFwiaW1hZ2VcIjogc19ib29tLFxuICAgIFwid2lkdGhcIjogMTI4LFxuICAgIFwiaGVpZ2h0XCI6IDEyOCxcbiAgICBcInNwZWVkXCI6IDMwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA1MTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiA2NDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiA3NjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiA4OTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMlwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxM1wiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogNjQwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogNzY4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogODk2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxN1wiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjNcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI4XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI5XCIsIFwieFwiOiA1MTIsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMwXCIsIFwieFwiOiA2NDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMxXCIsIFwieFwiOiA3NjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMyXCIsIFwieFwiOiA4OTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMzXCIsIFwieFwiOiAwLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNFwiLCBcInhcIjogMTI4LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNVwiLCBcInhcIjogMjU2LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNlwiLCBcInhcIjogMzg0LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzN1wiLCBcInhcIjogNTEyLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOFwiLCBcInhcIjogNjQwLCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOVwiLCBcInhcIjogNzY4LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MFwiLCBcInhcIjogODk2LCBcInlcIjogNTEyLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MVwiLCBcInhcIjogMCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDVcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDZcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDdcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDhcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDlcIiwgXCJ4XCI6IDAsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUwXCIsIFwieFwiOiAxMjgsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUxXCIsIFwieFwiOiAyNTYsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUyXCIsIFwieFwiOiAzODQsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUzXCIsIFwieFwiOiA1MTIsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU0XCIsIFwieFwiOiA2NDAsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU1XCIsIFwieFwiOiA3NjgsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU2XCIsIFwieFwiOiA4OTYsIFwieVwiOiA3NjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU3XCIsIFwieFwiOiAwLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1OFwiLCBcInhcIjogMTI4LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1OVwiLCBcInhcIjogMjU2LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MFwiLCBcInhcIjogMzg0LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MVwiLCBcInhcIjogNTEyLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2MlwiLCBcInhcIjogNjQwLCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2M1wiLCBcInhcIjogNzY4LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2NFwiLCBcInhcIjogODk2LCBcInlcIjogODk2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCS0LfRgNGL0LIxXG4gKi9cbmV4cG9ydHMuYm9vbTEgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2Jvb20xLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG4gICAgXCJzcGVlZFwiOiAyMixcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMjU2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMzg0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTFcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTJcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JLQt9GA0YvQsjJcbiAqL1xuZXhwb3J0cy5ib29tMiA9IHtcbiAgICBcImltYWdlXCI6IHNfYm9vbTIsXG4gICAgXCJ3aWR0aFwiOiAxMjgsXG4gICAgXCJoZWlnaHRcIjogMTI4LFxuICAgIFwic3BlZWRcIjogMjgsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAxMjgsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTExXCIsIFwieFwiOiAyNTYsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiAzODQsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAwLCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMTI4LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogMjU2LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogMzg0LCBcInlcIjogMzg0LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCm0LXQu9GMINGC0LXQu9C10L/QvtGA0YLQsFxuICovXG5leHBvcnRzLmJhcmllciA9IHtcbiAgICBcImltYWdlXCI6IHNfYmFyaWVyLFxuICAgIFwid2lkdGhcIjogMTI4LFxuICAgIFwiaGVpZ2h0XCI6IDEyOCxcbiAgICBcInNwZWVkXCI6IDM4LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMjU2LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAwLCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTdcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDE5MiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAxOTIsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogMjU2LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMlwiLCBcInhcIjogNjQsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMTI4LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCp0LjRglxuICovXG5leHBvcnRzLnNoaWVsZCA9IHtcbiAgICBcImltYWdlXCI6IHNfc2hpZWxkLFxuICAgIFwid2lkdGhcIjogOTAsXG4gICAgXCJoZWlnaHRcIjogMTEwLFxuICAgIFwic3BlZWRcIjogMzAsXG4gICAgXCJ0b3BcIjogLTI1LFxuICAgIFwibGVmdFwiOiAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzFcIiwgXCJ4XCI6IDAsIFwieVwiOiA2OCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzJcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNzIsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8zXCIsIFwieFwiOiA4MSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl80XCIsIFwieFwiOiA4MSwgXCJ5XCI6IDY4LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEzNiwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzZcIiwgXCJ4XCI6IDgxLCBcInlcIjogMTM2LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfN1wiLCBcInhcIjogMTYyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzhcIiwgXCJ4XCI6IDE2MiwgXCJ5XCI6IDY4LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfOVwiLCBcInhcIjogMTYyLCBcInlcIjogMTM2LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMTBcIiwgXCJ4XCI6IDAsIFwieVwiOiAyMDQsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8xMVwiLCBcInhcIjogODEsIFwieVwiOiAyMDQsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8xMlwiLCBcInhcIjogMTYyLCBcInlcIjogMjA0LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMTNcIiwgXCJ4XCI6IDI0MywgXCJ5XCI6IDAsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8xNFwiLCBcInhcIjogMjQzLCBcInlcIjogNjgsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8xNVwiLCBcInhcIjogMjQzLCBcInlcIjogMTM2LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMTZcIiwgXCJ4XCI6IDI0MywgXCJ5XCI6IDIwNCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzE3XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzE4XCIsIFwieFwiOiA4MSwgXCJ5XCI6IDI3MiwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzE5XCIsIFwieFwiOiAxNjIsIFwieVwiOiAyNzIsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8yMFwiLCBcInhcIjogMjQzLCBcInlcIjogMjcyLCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMjFcIiwgXCJ4XCI6IDMyNCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8yMlwiLCBcInhcIjogMzI0LCBcInlcIjogNjgsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8yM1wiLCBcInhcIjogMzI0LCBcInlcIjogMTM2LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMjRcIiwgXCJ4XCI6IDMyNCwgXCJ5XCI6IDIwNCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzI1XCIsIFwieFwiOiAzMjQsIFwieVwiOiAyNzIsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8yNlwiLCBcInhcIjogMCwgXCJ5XCI6IDM0MCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzI3XCIsIFwieFwiOiA4MSwgXCJ5XCI6IDM0MCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzI4XCIsIFwieFwiOiAxNjIsIFwieVwiOiAzNDAsIFwid2lkdGhcIjogODAsIFwiaGVpZ2h0XCI6IDY3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJhdXJhX3Rlc3RfMV8zMl8yOVwiLCBcInhcIjogMjQzLCBcInlcIjogMzQwLCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMzBcIiwgXCJ4XCI6IDMyNCwgXCJ5XCI6IDM0MCwgXCJ3aWR0aFwiOiA4MCwgXCJoZWlnaHRcIjogNjd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImF1cmFfdGVzdF8xXzMyXzMyXCIsIFwieFwiOiAwLCBcInlcIjogNDA4LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYXVyYV90ZXN0XzFfMzJfMzFcIiwgXCJ4XCI6IDgxLCBcInlcIjogNDA4LCBcIndpZHRoXCI6IDgwLCBcImhlaWdodFwiOiA2N31cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQrdGE0YTQtdC60YIg0YLQvtC70YfQvtC6XG4gKi9cbmV4cG9ydHMucHVzaDEgPSB7XG4gICAgXCJpbWFnZVwiOiBzX3B1c2gsXG4gICAgXCJ3aWR0aFwiOiAyNTYsXG4gICAgXCJoZWlnaHRcIjogMjU2LFxuICAgIFwic3BlZWRcIjogMzAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTBcIiwgXCJ4XCI6IDAsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG5jb25zdCBDUllTVEFMX1dJRFRIID0gMzI7XG5jb25zdCBDUllTVEFMX0hFSUdIVCA9IDMyO1xuXG5leHBvcnRzLmJsdWVfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiBDUllTVEFMX1dJRFRILFxuICAgIFwiaGVpZ2h0XCI6IENSWVNUQUxfSEVJR0hULFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAzMiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTExXCIsIFwieFwiOiAxNjAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTJcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxM1wiLCBcInhcIjogMjI0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5ncmVlbl9jcnlzdGFsID0ge1xuICAgIFwiaW1hZ2VcIjogc19jcnlzdGFscyxcbiAgICBcIndpZHRoXCI6IENSWVNUQUxfV0lEVEgsXG4gICAgXCJoZWlnaHRcIjogQ1JZU1RBTF9IRUlHSFQsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDMyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogNjQsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE3XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMThcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdyZXlfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiBDUllTVEFMX1dJRFRILFxuICAgIFwiaGVpZ2h0XCI6IENSWVNUQUxfSEVJR0hULFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIzXCIsIFwieFwiOiAzMiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNVwiLCBcInhcIjogOTYsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI3XCIsIFwieFwiOiAxNjAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI4XCIsIFwieFwiOiAxOTIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI5XCIsIFwieFwiOiAyMjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5yZWRfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiBDUllTVEFMX1dJRFRILFxuICAgIFwiaGVpZ2h0XCI6IENSWVNUQUxfSEVJR0hULFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzBcIiwgXCJ4XCI6IDAsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMxXCIsIFwieFwiOiAzMiwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzJcIiwgXCJ4XCI6IDY0LCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzM1wiLCBcInhcIjogOTYsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM0XCIsIFwieFwiOiAxMjgsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM1XCIsIFwieFwiOiAxNjAsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM2XCIsIFwieFwiOiAxOTIsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM3XCIsIFwieFwiOiAyMjQsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5tYWdlbnRhX2NyeXN0YWwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2NyeXN0YWxzLFxuICAgIFwid2lkdGhcIjogQ1JZU1RBTF9XSURUSCxcbiAgICBcImhlaWdodFwiOiBDUllTVEFMX0hFSUdIVCxcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM4XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzlcIiwgXCJ4XCI6IDMyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDBcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDFcIiwgXCJ4XCI6IDk2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQzXCIsIFwieFwiOiAxNjAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NFwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDVcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy55ZWxsb3dfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiBDUllTVEFMX1dJRFRILFxuICAgIFwiaGVpZ2h0XCI6IENSWVNUQUxfSEVJR0hULFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDZcIiwgXCJ4XCI6IDAsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0N1wiLCBcInhcIjogMzIsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0OFwiLCBcInhcIjogNjQsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0OVwiLCBcInhcIjogOTYsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1MFwiLCBcInhcIjogMTI4LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTFcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDE2MCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUyXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1M1wiLCBcInhcIjogMjI0LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuc2tlbGV0b24gPSB7XG4gICAgXCJpbWFnZVwiOiBzX3NrZWxldG9uLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTc5XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODBcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgxXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MlwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgzXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODRcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODVcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4N1wiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMua2F0eSA9IHtcbiAgICBcImltYWdlXCI6IHNfa2F0eSxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MVwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODJcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmxldm9uID0ge1xuICAgIFwiaW1hZ2VcIjogc19sZXZvbixcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MVwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODJcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLnZpdGFseSA9IHtcbiAgICBcImltYWdlXCI6IHNfdml0YWx5LFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNFwiLCBcInhcIjogMzIwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiA0NDgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyN1wiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JrQu9Cw0YHRgdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLmNvb2xfcGxhbnRzID0ge1xuICAgIFwiaW1hZ2VcIjogdF9jb29sX3BsYW50cyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlMVwiLCBcInhcIjogNTE5LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTJfMFwiLCBcInhcIjogNDU0LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTNfMFwiLCBcInhcIjogMzg5LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTRcIiwgXCJ4XCI6IDMyNCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U1XCIsIFwieFwiOiAyNTksIFwieVwiOiA1MTcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlNlwiLCBcInhcIjogMTk0LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTdcIiwgXCJ4XCI6IDEyOSwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U4XCIsIFwieFwiOiAzODcsIFwieVwiOiAxMjksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U5XCIsIFwieFwiOiAzODcsIFwieVwiOiAyNTgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDM4OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicGFsbXRyZWUyXCIsIFwieFwiOiAxMjksIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlM1wiLCBcInhcIjogMTI5LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicGFsbXRyZWU0XCIsIFwieFwiOiAzODcsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlNVwiLCBcInhcIjogNTE2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTFfNFwiLCBcInhcIjogNTE2LCBcInlcIjogMTI5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlMl8xXCIsIFwieFwiOiA1MTYsIFwieVwiOiAyNTgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU0XCIsIFwieFwiOiAzODcsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlNVwiLCBcInhcIjogMjU4LCBcInlcIjogMjU5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlLXN0cmFuZ2VcIiwgXCJ4XCI6IDEyOSwgXCJ5XCI6IDI1OSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicGFsbXRyZWU2XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTZcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDEyOSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTdcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU4XCIsIFwieFwiOiAxMjksIFwieVwiOiAxMzAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU5XCIsIFwieFwiOiA1MTYsIFwieVwiOiAzODcsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiA5N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQtdGA0YLQstGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5kZWFkX3BsYW50cyA9IHtcbiAgICBcImltYWdlXCI6IHRfY29vbF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZGVhZHRyZWUxXzBcIiwgXCJ4XCI6IDAsIFwieVwiOiA1MTcsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiA5N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZGVhZHRyZWUyXCIsIFwieFwiOiAyNTgsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRlYWR0cmVlM1wiLCBcInhcIjogMCwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQtdGA0YLQstGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5hbmRzdG9uZXMgPSB7XG4gICAgXCJpbWFnZVwiOiB0X2FuZHN0b25lcyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwMlwiLCBcInhcIjogMCwgXCJ5XCI6IDMzLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDNcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA0XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwNVwiLCBcInhcIjogNjUsIFwieVwiOiAzMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA2XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDY2LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDdcIiwgXCJ4XCI6IDAsIFwieVwiOiA5OSwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA4XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDk5LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDlcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIxMFwiLCBcInhcIjogNjUsIFwieVwiOiAxMzIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCn0LXRgNC90YvQuSDQstC30YDRi9CyXG4gKi9cbmV4cG9ydHMuYmxhY2tib29tID0ge1xuICAgIFwiaW1hZ2VcIjogc19ibGFja2Jvb20sXG4gICAgXCJ3aWR0aFwiOiA1MCxcbiAgICBcImhlaWdodFwiOiA0NyxcbiAgICBcInNwZWVkXCI6IDMwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMVwiLCBcInhcIjogMCwgXCJ5XCI6IDQ3LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8yXCIsIFwieFwiOiAwLCBcInlcIjogMTQxLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8zXCIsIFwieFwiOiA1MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzRcIiwgXCJ4XCI6IDUwLCBcInlcIjogNDcsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzVcIiwgXCJ4XCI6IDAsIFwieVwiOiA5NCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfNlwiLCBcInhcIjogNTAsIFwieVwiOiA5NCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfN1wiLCBcInhcIjogMTAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfOFwiLCBcInhcIjogMTAwLCBcInlcIjogNDcsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzlcIiwgXCJ4XCI6IDEwMCwgXCJ5XCI6IDk0LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8xMFwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzExXCIsIFwieFwiOiA1MCwgXCJ5XCI6IDE0MSwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTJcIiwgXCJ4XCI6IDEwMCwgXCJ5XCI6IDE0MSwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTNcIiwgXCJ4XCI6IDE1MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzE0XCIsIFwieFwiOiAxNTAsIFwieVwiOiA0NywgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTVcIiwgXCJ4XCI6IDE1MCwgXCJ5XCI6IDk0LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8xNlwiLCBcInhcIjogMTUwLCBcInlcIjogMTQxLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8xN1wiLCBcInhcIjogMCwgXCJ5XCI6IDE4OCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMThcIiwgXCJ4XCI6IDUwLCBcInlcIjogMTg4LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8xOVwiLCBcInhcIjogMTAwLCBcInlcIjogMTg4LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N31cbiAgICAgICAgXVxuICAgIH1cbn07XG5cbi8qKlxuICog0JHQvtC70YzRiNC+0Lkg0YfQtdGA0L3Ri9C5INCy0LfRgNGL0LJcbiAqL1xuZXhwb3J0cy5ibGFja2Jvb21fYmlnID0ge1xuICAgIFwiaW1hZ2VcIjogc19ibGFja2Jvb20sXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogOTQsXG4gICAgXCJzcGVlZFwiOiAzMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzFcIiwgXCJ4XCI6IDAsIFwieVwiOiA0NywgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMlwiLCBcInhcIjogMCwgXCJ5XCI6IDE0MSwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfM1wiLCBcInhcIjogNTAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV80XCIsIFwieFwiOiA1MCwgXCJ5XCI6IDQ3LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV81XCIsIFwieFwiOiAwLCBcInlcIjogOTQsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzZcIiwgXCJ4XCI6IDUwLCBcInlcIjogOTQsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzdcIiwgXCJ4XCI6IDEwMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzhcIiwgXCJ4XCI6IDEwMCwgXCJ5XCI6IDQ3LCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV85XCIsIFwieFwiOiAxMDAsIFwieVwiOiA5NCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTBcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8xMVwiLCBcInhcIjogNTAsIFwieVwiOiAxNDEsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzEyXCIsIFwieFwiOiAxMDAsIFwieVwiOiAxNDEsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzEzXCIsIFwieFwiOiAxNTAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA0N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic21va2VfYmxhY2tfMV8xOV8xNFwiLCBcInhcIjogMTUwLCBcInlcIjogNDcsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzE1XCIsIFwieFwiOiAxNTAsIFwieVwiOiA5NCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTZcIiwgXCJ4XCI6IDE1MCwgXCJ5XCI6IDE0MSwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTdcIiwgXCJ4XCI6IDAsIFwieVwiOiAxODgsIFwid2lkdGhcIjogNTAsIFwiaGVpZ2h0XCI6IDQ3fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzbW9rZV9ibGFja18xXzE5XzE4XCIsIFwieFwiOiA1MCwgXCJ5XCI6IDE4OCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNtb2tlX2JsYWNrXzFfMTlfMTlcIiwgXCJ4XCI6IDEwMCwgXCJ5XCI6IDE4OCwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNDd9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG4vKipcbiAqINCX0LDQvNC+0YDQvtC30LrQsFxuICovXG5leHBvcnRzLmZyZWV6ZSA9IHtcbiAgICBcImltYWdlXCI6IHNfZnJlZXplLFxuICAgIFwid2lkdGhcIjogNTYsXG4gICAgXCJoZWlnaHRcIjogNjUsXG4gICAgXCJzcGVlZFwiOiAzMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzFcIiwgXCJ4XCI6IDU2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImxpZ2h0ZW5pbmdiYWxsXzFfMjBfMlwiLCBcInhcIjogMTY4LCBcInlcIjogNjUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzNcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImxpZ2h0ZW5pbmdiYWxsXzFfMjBfNFwiLCBcInhcIjogNTYsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImxpZ2h0ZW5pbmdiYWxsXzFfMjBfNVwiLCBcInhcIjogMTEyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImxpZ2h0ZW5pbmdiYWxsXzFfMjBfNlwiLCBcInhcIjogMTEyLCBcInlcIjogNjUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzdcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzhcIiwgXCJ4XCI6IDU2LCBcInlcIjogMTMwLCBcIndpZHRoXCI6IDU2LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibGlnaHRlbmluZ2JhbGxfMV8yMF85XCIsIFwieFwiOiAxMTIsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzEwXCIsIFwieFwiOiAxNjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDU2LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibGlnaHRlbmluZ2JhbGxfMV8yMF8xMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzEyXCIsIFwieFwiOiAxNjgsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzEzXCIsIFwieFwiOiAwLCBcInlcIjogMTk1LCBcIndpZHRoXCI6IDU2LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibGlnaHRlbmluZ2JhbGxfMV8yMF8xNFwiLCBcInhcIjogNTYsIFwieVwiOiAxOTUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzE1XCIsIFwieFwiOiAxMTIsIFwieVwiOiAxOTUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzE2XCIsIFwieFwiOiAxNjgsIFwieVwiOiAxOTUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzE3XCIsIFwieFwiOiAyMjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDU2LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibGlnaHRlbmluZ2JhbGxfMV8yMF8xOFwiLCBcInhcIjogMjI0LCBcInlcIjogNjUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzE5XCIsIFwieFwiOiAyMjQsIFwieVwiOiAxMzAsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJsaWdodGVuaW5nYmFsbF8xXzIwXzIwXCIsIFwieFwiOiAyMjQsIFwieVwiOiAxOTUsIFwid2lkdGhcIjogNTYsIFwiaGVpZ2h0XCI6IDY1fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuLyoqXG4gKiDQmtGA0L7QutC+IC0g0LbQtdC9XG4gKi9cbmV4cG9ydHMua3Jva28gPSB7XG4gICAgXCJpbWFnZVwiOiBzX2tyb2tvLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjpbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODBcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODFcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgyXCIsIFwieFwiOiAxOTIsIFwieVwiOiA2NDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMjU2LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODRcIiwgXCJ4XCI6IDMyMCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAzODQsIFwieVwiOiA2NDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NlwiLCBcInhcIjogNDQ4LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuLyoqXG4gKiDQmtGA0L7QutC+IC0g0LzRg9C2XG4gKi9cbmV4cG9ydHMua29pbCA9IHtcbiAgICBcImltYWdlXCI6IHNfa29pbCxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNzlcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6W1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgxXCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MlwiLCBcInhcIjogMTkyLCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiAzMjAsIFwieVwiOiA2NDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NVwiLCBcInhcIjogMzg0LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDQ0OCwgXCJ5XCI6IDY0MCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg3XCIsIFwieFwiOiA1MTIsIFwieVwiOiA2NDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbi8qKlxuICog0JzQtdGA0YLQstGL0Lkg0YHQvtC70LTQsNGCXG4gKi9cbmV4cG9ydHMuZGVhZCA9IHtcbiAgICBcImltYWdlXCI6IHNfZGVhZCxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6W1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIwXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIxXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMlwiLCBcInhcIjogMTkyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI0XCIsIFwieFwiOiAzMjAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNVwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjZcIiwgXCJ4XCI6IDQ0OCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI3XCIsIFwieFwiOiA1MTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbi8qKlxuICog0JPQsNC90L3QtdGAXG4gKi9cbmV4cG9ydHMuZ3VubmVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19ndW5uZXIsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOltcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNFwiLCBcInhcIjogMzIwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiA0NDgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyN1wiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG4vKipcbiAqINCT0LDQvdC90LXRgFxuICovXG5leHBvcnRzLmp1ayA9IHtcbiAgICBcImltYWdlXCI6IHNfanVrLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjpbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjFcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIyXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDMyMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI1XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNlwiLCBcInhcIjogNDQ4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjdcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdXG4gICAgfVxufTtcbiIsIi8qKlxuICog0J3QsNCx0L7RgNGLINGB0L/RgNCw0LnRgtC+0LJcbiAqL1xuXG5cbi8v0JrQsNGA0YLQuNC90LrQuFxubGV0IHRfcGxhbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfcGxhbnRzJyk7XG5sZXQgc19ncmF2ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19ncmF2ZXMnKTtcbmxldCBzX2NhbXBmaXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY2FtcGZpcmUnKTtcblxuXG4vKipcbiAqINCf0YPRgdGC0YvQvdC90L7QtVxuICovXG5leHBvcnRzLmRlc2VydCA9IFt7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiAyNywgXCJoZWlnaHRcIjogNTgsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAxOTgsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjcsIFwiaGVpZ2h0XCI6IDU4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cywgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogOTIsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUxNFwiLCBcInhcIjogMjMzLCBcInlcIjogMzMwLCBcIndpZHRoXCI6IDc2LCBcImhlaWdodFwiOiA5Mn1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsIFwid2lkdGhcIjogNjAsIFwiaGVpZ2h0XCI6IDg3LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMTZcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDIzOCwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogODd9XX19LFxuXG5dO1xuXG4vKipcbiAqINCh0YLRgNCw0L3QvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5iZWx3b29kID0gW1xuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLFwid2lkdGhcIjogMTA3LCBcImhlaWdodFwiOiAxMjgsIFwic3RhdGVzXCI6IHsgXCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAxMDcsIFwiaGVpZ2h0XCI6IDEyOH1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsIFwid2lkdGhcIjogODksIFwiaGVpZ2h0XCI6IDEyOCwgXCJzdGF0ZXNcIjogeyBcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMDgsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogODksIFwiaGVpZ2h0XCI6IDEyOH1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsIFwid2lkdGhcIjogOTUsIFwiaGVpZ2h0XCI6IDExNywgXCJzdGF0ZXNcIjogeyBcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUxOVwiLCBcInhcIjogMCwgXCJ5XCI6IDMzMCwgXCJ3aWR0aFwiOiA5NSwgXCJoZWlnaHRcIjogMTE3fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cyxcIndpZHRoXCI6IDEyNiwgXCJoZWlnaHRcIjogMTE2LCBcInN0YXRlc1wiOiB7IFwiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTIwXCIsIFwieFwiOiAyNDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyNiwgXCJoZWlnaHRcIjogMTE2fV19fSxcbl07XG5cblxuXG4vKipcbiAqINCU0LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMuYnVzaHMgPSBbXG4gICAge1wiaW1hZ2VcIjogdF9idXNocywgXCJ3aWR0aFwiOiAxMTMsIFwiaGVpZ2h0XCI6IDExOCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDEzNiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTEzLCBcImhlaWdodFwiOiAxMTh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfYnVzaHMsIFwid2lkdGhcIjogMTAyLCBcImhlaWdodFwiOiAxNDAsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMDIsIFwiaGVpZ2h0XCI6IDE0MH1dfX0sXG5dO1xuXG4vKipcbiAqINCd0LDQtNCz0YDQvtCx0YzRj1xuICovXG5leHBvcnRzLmdyYXZlcyA9IFtcbiAgICB7XCJpbWFnZVwiOiBzX2dyYXZlcywgXCJ3aWR0aFwiOiAyMiwgXCJoZWlnaHRcIjogMzIsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAxNjUsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIyLCBcImhlaWdodFwiOiAzMn0sXX19LFxuICAgIHtcImltYWdlXCI6IHNfZ3JhdmVzLCBcIndpZHRoXCI6IDI4LCBcImhlaWdodFwiOiAyNywgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDk4LCBcInlcIjogMiwgXCJ3aWR0aFwiOiAyOCwgXCJoZWlnaHRcIjogMjd9XX19LFxuXTtcblxuLyoqXG4gKiDQmtC+0YHRgtGA0YtcbiAqL1xuZXhwb3J0cy5jYW1wZmlyZSA9IFtcbiAgICB7XCJpbWFnZVwiOiBzX2NhbXBmaXJlLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbXG4gICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiAxOTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICBdfX0sXG5dO1xuXG4vKipcbiAqINCa0LvQsNGB0YHQvdGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuLypcbmV4cG9ydHMuY29vbF9wbGFudHMgPSBbXG4gICAge1wiaW1hZ2VcIjogdF9jb29sX3BsYW50cywgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDk3LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwiZGVhZHRyZWUxXzBcIiwgXCJ4XCI6IDAsIFwieVwiOiA1MTcsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiA5N31dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9jb29sX3BsYW50cywgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcImRlYWR0cmVlMlwiLCBcInhcIjogMjU4LCBcInlcIjogMzg4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X2Nvb2xfcGxhbnRzLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwiZGVhZHRyZWUzXCIsIFwieFwiOiAwLCBcInlcIjogMTMwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fV19fSxcbl07Ki9cbiIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=