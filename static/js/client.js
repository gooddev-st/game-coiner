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
exports.default = { getUser: getUser, setUser: setUser, signout: signout };


function getUser() {
    return localStorage.getItem('gamelogin');
}

function setUser(login) {
    localStorage.setItem('gamelogin', login);
}

function signout() {
    localStorage.removeItem('gamelogin');
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


function show() {
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

var _account = __webpack_require__(/*! ./account */ "./account.js");

var _account2 = _interopRequireDefault(_account);

var _socket = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");

var _socket2 = _interopRequireDefault(_socket);

var _logs = __webpack_require__(/*! ./logs.js */ "./logs.js");

var _logs2 = _interopRequireDefault(_logs);

var _ui = __webpack_require__(/*! ./engine/ui/ui.js */ "./engine/ui/ui.js");

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { init: init, add: add, on: on, off: off

    // Серверный сокет
}; /**
    * События игры
    */

// Подключение к серверу
var serverSocket = null;

/**
 * Инитим игровые события
 */
function init() {
    if (!serverSocket) {
        serverSocket = (0, _socket2.default)("http://server.games.q-dev.ru");
    }
    serverSocket.connect();

    // Действия при серверных проблемах
    serverSocket.on('connect_error', function () {
        (0, _logs2.default)('Ошибка подключения к серверу');
    });

    serverSocket.on("disconnect", function () {
        (0, _logs2.default)('от сервера поступил disconnect');
        (0, _logs2.default)('Вы отключены от сервера');

        _ui2.default.waitScreen.show();

        setTimeout(function () {
            init();
        }, 500);
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

    if (eventName === "signout") {
        _account2.default.signout();
    }
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

var _account = __webpack_require__(/*! ./account.js */ "./account.js");

var _account2 = _interopRequireDefault(_account);

var _events = __webpack_require__(/*! ./events.js */ "./events.js");

var _events2 = _interopRequireDefault(_events);

var _signin = __webpack_require__(/*! ./scenes/signin */ "./scenes/signin.js");

var _signin2 = _interopRequireDefault(_signin);

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
    _ui2.default.waitScreen.show();

    // Подключаемся к серверу
    _events2.default.init();

    _events2.default.on("server", function (event, type, data) {

        if (type == "hello") {

            var login = _account2.default.getUser();

            if (!login) {

                // запросим логин
                _signin2.default.start(login, function (login) {

                    // Получив сохраним
                    _account2.default.setUser(login);

                    start(login);
                });
            } else {
                start(login);
            }
        }
    });
}

function start(login) {
    // отправим логин серверу
    _events2.default.add('login', login);

    // Стартуем основную сцену
    _index2.default.start(function () {

        gameover();
    });
}

function gameover() {
    _ui2.default.waitScreen.show();
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

    _events2.default.on("disconnect", function () {
        stop();
        _units2.default.reset();
        loots = {};
        _hero2.default.unit = null;
        _entities2.default.reset();
        _ui2.default.top10.stop();
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
    interval = setInterval(function () {

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
    window.addEventListener('click', onClick, false);
}
function stop() {
    window.removeEventListener('click', onClick, false);
}

function onClick(e) {

    var target = e.target || e.srcElement;

    if (target.id && target.id == "signout_button") {
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
    hero_nameElement && (hero_nameElement.innerText = info.ID);
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
    skill1: document.getElementById("skill1-veko"),
    skill2: document.getElementById("skill2-veko"),
    skill3: document.getElementById("skill3-veko"),
    skill4: document.getElementById("skill4-veko"),
    skill5: document.getElementById("skill5-veko"),
    skill6: document.getElementById("skill6-veko"),
    skill7: document.getElementById("skill7-veko"),
    skill8: document.getElementById("skill8-veko"),
    skill9: document.getElementById("skill9-veko"),
    skill10: document.getElementById("skill10-veko")
};
var allSkills = document.querySelectorAll(".skill");

function start() {
    //Покажем
    skillsPanel.style.display = 'block';

    skillsPanel.addEventListener('mouseup', onMouseUp, false);
    skillsPanel.addEventListener('mousedown', onMouseDown, false);

    //Обновление иконок и готовности умений
    _events2.default.on('skills', function (eventName, type, data) {
        if (type === 'update') {
            for (var skill_id in data) {
                if (skillsElements[skill_id]) {

                    var skill = skillsElements[skill_id];

                    //Иконка соответствующая умению
                    var iconElement = skill.parentElement.querySelector('.skill-icon');
                    iconElement.className = "";
                    iconElement.classList.add('skill-icon');
                    iconElement.classList.add(data[skill_id].icon);

                    var classList = skill.classList;

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

function onMouseDown(e) {
    var target = e.target || e.srcElement;

    if (target.classList.contains("skill-icon") || target.classList.contains("veko")) {
        target = target.parentElement;
    }

    if (target.classList.contains("skill")) {
        if (!target.classList.contains("active")) {
            allSkills.forEach(function (skill) {
                return skill.classList.remove("active");
            });
            target.classList.add("active");

            //Запросим переключение текущего скила
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

        this.name = data.ID;

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

            this.name = data.ID;

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
exports.default = { start: start, stop: stop };


var login_panelElement = document.getElementById("login-panel");
var login_formElement = document.getElementById("login-form");
var login_inputElement = document.getElementById("login-input");

var finalCallback = null;

var timeout = null;

// Выведем окно авторизации. Модальное
function start(login, callback) {

    finalCallback = callback;

    if (login && login_inputElement) {
        login_inputElement.value = login;
    }

    document.addEventListener("click", clickHandler, false);
    document.addEventListener("keyup", keyupHandler, false);

    show();

    login_inputElement.focus();
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

    if (key == 13 && validate(login_inputElement.value)) {

        stop();
        finalCallback(login_inputElement.value);
    } else if (
    //символы разрешенные в логине
    /^[a-zA-Z0-9 +.\-_:"()]*?$/.test(obj.value) && obj.value.length < 10 // Максимальная длина логина
    ) {
            obj.defaultValue = obj.value;

            login_inputElement.style.backgroundColor = '#f4cb4a';
        } else obj.value = obj.defaultValue;
}

// Проверка введенного и индикация ошибки
function validate(login) {

    if (login.length > 0) return true;

    login_inputElement.style.backgroundColor = '#ff0008';
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        login_inputElement.style.backgroundColor = '#f4cb4a';
    }, 200);
}

// Обработка кликов
function clickHandler(e) {
    var target = e.target || e.srcElement;

    // Если нажали "Войти" и логин норм - запустим функцию входа
    if (target.id == 'login-button' && validate(login_inputElement.value)) {

        stop();

        finalCallback(login_inputElement.value);
    } else {
        login_inputElement.focus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9jaGFyYWN0ZXJzLmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvY2hhcmFjdGVyLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS9zb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvdWkvdWkuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL3VpL3dhaXRzY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWZ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWNrbzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ibG9iL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1pbmhlcml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy1qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL3V0ZjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNlcXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvdXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pcy1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vY2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vZW50aXR5LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL2hlcm8uanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vbG9vdC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi9yb29tLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3RlbGVwb3J0LmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL2hlcm9pbmZvLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VpL3NraWxscy5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS90b3AxMC5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS91aS5qcyIsIndlYnBhY2s6Ly8vLi9zY2VuZXMvbWFpbi91aS93YWl0c2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NjZW5lcy9tYWluL3VuaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vdW5pdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL3NpZ25pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3ByaXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcHJpdGVzZXRzLmpzIiwid2VicGFjazovLy93cyAoaWdub3JlZCkiXSwibmFtZXMiOlsiZ2V0VXNlciIsInNldFVzZXIiLCJzaWdub3V0IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvZ2luIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJjaGFyYWN0ZXJzIiwiY2hhcmFjdGVyc2V0cyIsImlkIiwiYWRkIiwic3ByaXRlX2lkIiwibGVuZ3RoIiwiYWRkVG9TZXQiLCJnZXQiLCJnZXRGcm9tU2V0IiwiSUQiLCJzZXRJRCIsInNwcml0ZSIsInB1c2giLCJGUFMiLCJJTlRFUlZBTCIsIlNURVAiLCJDaGFyYWN0ZXIiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRleHQiLCJ4IiwieSIsInN0YXRlIiwiZnJhbWVOdW0iLCJzdGF0ZXMiLCJjYW52YXMiLCJkcmF3RnJhbWUiLCJpbWFnZSIsInNjYWxlWCIsInNjYWxlWSIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJNYXRoIiwiZmxvb3IiLCJkcmF3SW1hZ2UiLCJzcmMiLCJzb3VuZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZvbHVtZSIsInNldEF0dHJpYnV0ZSIsInN0eWxlIiwiZGlzcGxheSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImN1cnJlbnRUaW1lIiwicGF1c2UiLCJwbGF5Iiwid2FpdFNjcmVlbiIsIndhaXRTY3JlZW5FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzaG93IiwiaGlkZSIsImluaXQiLCJvbiIsIm9mZiIsInNlcnZlclNvY2tldCIsImNvbm5lY3QiLCJzZXRUaW1lb3V0IiwiaGFuZGxlcnMiLCJldmVudE5hbWUiLCJkYXRhIiwicnVuSGFuZGxlcnMiLCJlbWl0IiwiY2FsbGJhY2siLCJKU09OIiwicGFyc2UiLCJlIiwidHlwZSIsIm1lc3NhZ2UiLCJoYW5kbGVyIiwiaCIsInJ1biIsImV2ZW50Iiwic3RhcnQiLCJnYW1lb3ZlciIsIndpbmRvdyIsIm9ubG9hZCIsImxvZyIsIiRsb2dzIiwibXNnIiwiaW5uZXJIVE1MIiwicGFyZW50RWxlbWVudCIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImNvbnNvbGUiLCJNQVhfREVBRFpPTkVfWCIsIk1BWF9ERUFEWk9ORV9ZIiwiZm9sbG93ZXIiLCJkZWFkWm9uZSIsImdldENvbnRleHQiLCJzcGVlZCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJvb20iLCJydW5Gb2xsb3ciLCJwbGF5ZXIiLCJrZXlzIiwiTEVGVCIsIlVQIiwiUklHSFQiLCJET1dOIiwiQSIsIlciLCJEIiwiUyIsIlNQQUNFIiwiU1RBVElTVElDIiwiY2xpY2tQYWQiLCJzdG9wIiwic2V0Q2xpY2tQYWQiLCJhZGRFdmVudExpc3RlbmVyIiwib25XaW5kb3dCbHVyIiwib25LZXlkb3duIiwib25LZXl1cCIsIm9uQ2xpY2siLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfY2xpY2tQYWQiLCJrZXlDb2RlIiwiY2xpZW50WCIsImNsaWVudFkiLCJidXR0b24iLCJhZGRGcm9tU2V0IiwicmVtb3ZlIiwicmVzZXQiLCJzaXplIiwiZWFjaCIsImVudGl0aWVzIiwibGlmZXRpbWUiLCJmYXphIiwiaW5kZXgiLCJzcGxpY2UiLCJmb3JFYWNoIiwiRW50aXR5IiwiY2hhcmFjdGVyIiwiaW1tb3J0YWwiLCJhbmltYXRlU3BlZWQiLCJjdXJyZW50U3ByaXRlTnVtIiwiZGllIiwiY2FtZXJhIiwiZHJhd0NoYXJhY3RlciIsImRyYXciLCJ1bml0IiwiYW5pbWF0ZSIsImNvbnN0YW50cyIsImZpbmFsQ2FsbGJhY2siLCJpbnRlcnZhbCIsInJvb21zIiwicm9vbV9pZCIsImxvb3RzIiwidGVsZXBvcnRzIiwicmVzaXplIiwidG9wMTAiLCJvblJlY29ubmVjdCIsIm9uUm9vbSIsIm9uSGVybyIsIm9uU291bmQiLCJwb3MiLCJza2lsbHMiLCJzZXRJbnRlcnZhbCIsInVwZGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJ1bmRlZmluZWQiLCJlbnZpcm9ubWVudF9pZCIsInJvb21Jbml0IiwiaW5mbyIsImNoYXJhY3Rlcl9pZCIsImxldmVsIiwiaXRlbSIsInNldCIsInNwcml0ZXNldF9pZCIsImNvaW5zX2NvdW50IiwibGV2ZWx1cENvdW50ZXIiLCJoZXJvSW5mbyIsInNldEZvbGxvd2VyIiwiZW50aXR5IiwiaXNEaWUiLCJ0b0FycmF5IiwiaSIsInJlbmRlckFycmF5Iiwic29ydCIsImEiLCJiIiwic2V0dGluZ3MiLCJlbnRpdGllc19udW0iLCJjYXJ0b29ucyIsInJhbmRvbSIsImxvb3QiLCJ0YXJnZXQiLCJzdGVwIiwiRU5WSVJPTk1FTlRTIiwiciIsInJhbmQiLCJnIiwiZW50aXRpZXNTcHJpdGVzIiwiZ2VuZXJhdGUiLCJ0cmVlc19udW0iLCJjdHgiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsImNvbHVtbnMiLCJzYXZlIiwiaiIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsInJhbmRvbUNTU2NvbG9yIiwiZmlsbFJlY3QiLCJjbG9zZVBhdGgiLCJlbnYiLCJzcHIiLCJkZWZhdWx0IiwidGlsZSIsInh4IiwieXkiLCJ3IiwicmVzdG9yZSIsIkltYWdlIiwidG9EYXRhVVJMIiwiaGVyb19pbmZvRWxlbWVudCIsImhlcm9fbmFtZUVsZW1lbnQiLCJzY29yZUVsZW1lbnQiLCJsZXZlbEVsZW1lbnQiLCJsZXZlbHVwY291bnRlckVsZW1lbnQiLCJzcGVlZEVsZW1lbnQiLCJoZWFsdGhFbGVtZW50Iiwic3JjRWxlbWVudCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwiaW5uZXJUZXh0IiwibGV2ZWx1cFZhbHVlIiwiaGVhbHRoIiwic2tpbGxzUGFuZWwiLCJza2lsbHNFbGVtZW50cyIsInNraWxsMSIsInNraWxsMiIsInNraWxsMyIsInNraWxsNCIsInNraWxsNSIsInNraWxsNiIsInNraWxsNyIsInNraWxsOCIsInNraWxsOSIsInNraWxsMTAiLCJhbGxTa2lsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2tpbGxfaWQiLCJza2lsbCIsImljb25FbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImljb24iLCJ2YWx1ZSIsImNvbnRhaW5zIiwiYWN0aXZlIiwiaXNBY3RpdmUiLCJ0b3AxMEVsZW1lbnQiLCJ0b3AxMENvbnRlbnRFbGVtZW50IiwicmlnaHQiLCJBcnJheSIsImlzQXJyYXkiLCJjb250ZW50Iiwic2NvcmUiLCJDSEFSQUNURVJfREVGQVVMVCIsIk1BWF9IRUFMVEgiLCJVbml0IiwiaXNIZXJvIiwibmFtZSIsImRyYXdTaGFkb3ciLCJkcmF3TmFtZSIsImRyYXdWb2x1bWUiLCJ2b2x1bWVXaWR0aCIsInZvbHVtZUhlaWdodCIsInZvbHVtZVgiLCJ2b2x1bWVZIiwicmVjdCIsInN0cm9rZSIsInBhZGRpbmdDb2xvciIsImZvbnQiLCJ0ZXh0V2lkdGgiLCJtZWFzdXJlVGV4dCIsInRleHRMZXZlbFdpZHRoIiwicGFkV2lkdGgiLCJseCIsImx5IiwiYXJjIiwiUEkiLCJmaWxsIiwiZmlsbFRleHQiLCJzaGFkb3dDb2xvcjEiLCJzaGFkb3dDb2xvcjIiLCJzaGFkb3dDb2xvcjMiLCJlbGxpcHNlIiwidW5pdHMiLCJ1bml0c0FycmF5IiwibG9naW5fcGFuZWxFbGVtZW50IiwibG9naW5fZm9ybUVsZW1lbnQiLCJsb2dpbl9pbnB1dEVsZW1lbnQiLCJ0aW1lb3V0IiwiY2xpY2tIYW5kbGVyIiwia2V5dXBIYW5kbGVyIiwiZm9jdXMiLCJvYmoiLCJrZXkiLCJ2YWxpZGF0ZSIsInRlc3QiLCJkZWZhdWx0VmFsdWUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjbGVhclRpbWVvdXQiLCJzX2RvYyIsInNfcHJvZiIsInNfZ29iIiwic19naXJsIiwic19ibG9uZCIsInNfbWFnIiwic190ZWxlcG9ydCIsInNfY29pbnMiLCJ0X3RyZWVzIiwidF9idXNocyIsInRfcGxhbnRzIiwic19wb2ludGVyIiwic19ib29tIiwic19ib29tMSIsInNfYm9vbTIiLCJzX2JhcmllciIsInNfcHVzaCIsInNfY3J5c3RhbHMiLCJzX3NrZWxldG9uIiwic19rYXR5Iiwic19sZXZvbiIsInNfdml0YWx5IiwidF9jb29sX3BsYW50cyIsInRfYW5kc3RvbmVzIiwiZXhwb3J0cyIsImRvYyIsInByb2YiLCJnb2IiLCJnaXJsIiwiYmxvbmQiLCJtYWciLCJjb2luX2dvbGQiLCJjb2luX3NpbHZlciIsImNvaW5fY29wcGVyIiwiZ3Jhc3MiLCJ0cmVlcyIsImJ1c2hzIiwiZGVzZXJ0IiwiYmVsd29vZCIsInRlbGVwb3J0IiwicG9pbnRlciIsImJvb20iLCJib29tMSIsImJvb20yIiwiYmFyaWVyIiwicHVzaDEiLCJibHVlX2NyeXN0YWwiLCJncmVlbl9jcnlzdGFsIiwiZ3JleV9jcnlzdGFsIiwicmVkX2NyeXN0YWwiLCJtYWdlbnRhX2NyeXN0YWwiLCJ5ZWxsb3dfY3J5c3RhbCIsInNrZWxldG9uIiwia2F0eSIsImxldm9uIiwidml0YWx5IiwiY29vbF9wbGFudHMiLCJkZWFkX3BsYW50cyIsImFuZHN0b25lcyIsInNfZ3JhdmVzIiwic19jYW1wZmlyZSIsImdyYXZlcyIsImNhbXBmaXJlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtB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QUNBLEU7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztB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UDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLE9BQU87QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0dUJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1SkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdE9BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixpREFBaUQ7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCwyREFBMkQ7QUFDM0Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbmFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLGlCQUFpQjtBQUNqRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcFBBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN1JBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZOztBQUVmO0FBQ0E7QUFDQTtBQUNBLEtBQUssWUFBWTtBQUNqQjtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFLDBDQVlGOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM5UEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNUQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5R0FBeUcsSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJOztBQUVqSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBd0U7QUFDeEU7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEUsa0ZBQWtGO0FBQ2xGO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQiwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1RkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHLE9BQU87QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzakJBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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R0FBOUQsRUFOTyxFQU9QLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxDQUFuQyxFQUFzQyxTQUFTLEdBQS9DLEVBQW9ELFVBQVUsR0FBOUQsRUFQTyxFQVFQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssR0FBekIsRUFBOEIsS0FBSyxDQUFuQyxFQUFzQyxTQUFTLEdBQS9DLEVBQW9ELFVBQVUsR0FBOUQsRUFSTyxFQVNQLEVBQUMsUUFBUSxTQUFULEVBQW9CLEtBQUssQ0FBekIsRUFBNEIsS0FBSyxHQUFqQyxFQUFzQyxTQUFTLEdBQS9DLEVBQW9ELFVBQVUsR0FBOUQsRUFUTyxFQVVQLEVBQUMsUUFBUSxVQUFULEVBQXFCLEtBQUssR0FBMUIsRUFBK0IsS0FBSyxHQUFwQyxFQUF5QyxTQUFTLEdBQWxELEVBQXVELFVBQVUsR0FBakUsRUFWTyxFQVdQLEVBQUMsUUFBUSxVQUFULEVBQXFCLEtBQUssR0FBMUIsRUFBK0IsS0FBSyxHQUFwQyxFQUF5QyxTQUFTLEdBQWxELEVBQXVELFVBQVUsR0FBakUsRUFYTyxFQVlQLEVBQUMsUUFBUSxVQUFULEVBQXFCLEtBQUssR0FBMUIsRUFBK0IsS0FBSyxHQUFwQyxFQUF5QyxTQUFTLEdBQWxELEVBQXVELFVBQVUsR0FBakUsRUFaTyxFQWFQLEVBQUMsUUFBUSxVQUFULEVBQXFCLEtBQUssR0FBMUIsRUFBK0IsS0FBSyxHQUFwQyxFQUF5QyxTQUFTLEdBQWxELEVBQXVELFVBQVUsR0FBakUsRUFiTyxFQWNQLEVBQUMsUUFBUSxVQUFULEVBQXFCLEtBQUssR0FBMUIsRUFBK0IsS0FBSyxHQUFwQyxFQUF5QyxTQUFTLEdBQWxELEVBQXVELFVBQVUsR0FBakUsRUFkTyxFQWVQLEVBQUMsUUFBUSxVQUFULEVBQXFCLEtBQUssR0FBMUIsRUFBK0IsS0FBSyxHQUFwQyxFQUF5QyxTQUFTLEdBQWxELEVBQXVELFVBQVUsR0FBakUsRUFmTyxFQWdCUCxFQUFDLFFBQVEsVUFBVCxFQUFxQixLQUFLLEdBQTFCLEVBQStCLEtBQUssR0FB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biBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGRlZmF1bHQge2dldFVzZXIsIHNldFVzZXIsIHNpZ25vdXR9XG5cbmZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lbG9naW4nKTtcbn1cblxuZnVuY3Rpb24gc2V0VXNlcihsb2dpbikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lbG9naW4nLCBsb2dpbik7XG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dhbWVsb2dpbicpO1xufSIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vZW5naW5lL2NoYXJhY3Rlci5qc1wiO1xuaW1wb3J0IHNwcml0ZXMgZnJvbSBcIi4vc3ByaXRlc1wiO1xuaW1wb3J0IHNwcml0ZXNldHMgZnJvbSBcIi4vc3ByaXRlc2V0c1wiO1xuXG5jb25zdCBjaGFyYWN0ZXJzID0ge307XG5cbmNvbnN0IGNoYXJhY3RlcnNldHMgPSB7fTtcblxuZm9yKGxldCBpZCBpbiBzcHJpdGVzKXtcbiAgICBhZGQoaWQsIHNwcml0ZXNbaWRdKTtcbn1cbmZvcihsZXQgc3ByaXRlX2lkIGluIHNwcml0ZXNldHMpe1xuICAgIGZvcihsZXQgaWQ9MDsgaWQ8c3ByaXRlc2V0c1tzcHJpdGVfaWRdLmxlbmd0aDtpZCsrKXtcbiAgICAgICAgYWRkVG9TZXQoc3ByaXRlX2lkLCBpZCwgc3ByaXRlc2V0c1tzcHJpdGVfaWRdW2lkXSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7Z2V0LCBnZXRGcm9tU2V0fVxuXG5mdW5jdGlvbiBnZXQoSUQpIHtcbiAgICByZXR1cm4gY2hhcmFjdGVyc1tJRF07XG59XG5cbmZ1bmN0aW9uIGdldEZyb21TZXQoc2V0SUQsIElEKSB7XG4gICAgcmV0dXJuIGNoYXJhY3RlcnNldHNbc2V0SURdW0lEXTtcbn1cblxuZnVuY3Rpb24gYWRkKElELCBzcHJpdGUpIHtcbiAgICBjaGFyYWN0ZXJzW0lEXSA9IG5ldyBDaGFyYWN0ZXIoc3ByaXRlKTtcbn1cblxuZnVuY3Rpb24gYWRkVG9TZXQoc2V0SUQsIElELCBzcHJpdGUpIHtcbiAgICBpZihzZXRJRCBpbiBjaGFyYWN0ZXJzZXRzPT09ZmFsc2Upe1xuICAgICAgICBjaGFyYWN0ZXJzZXRzW3NldElEXSA9IFtdO1xuICAgIH1cbiAgICBjaGFyYWN0ZXJzZXRzW3NldElEXS5wdXNoKG5ldyBDaGFyYWN0ZXIoc3ByaXRlKSk7XG59IiwiZXhwb3J0IGNvbnN0XG4gICAgRlBTID0gMzAsXG4gICAgSU5URVJWQUwgPSAxMDAwL0ZQUywgLy/QsiDQvNC40LvQu9C40YHQtdC60YPQvdC00LDRhVxuICAgIFNURVAgPSBJTlRFUlZBTC8xMDAwOy8v0LIg0YHQtdC60YPQvdC00LDRhVxuIiwiLyoqXG4gKiBAY2xhc3MgQ2hhcmFjdGVyIC0g0J/QtdGA0YHQvtC90LDQtlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJ7XG5cbiAgICBjb25zdHJ1Y3RvcihzcHJpdGUsIHdpZHRoLCBoZWlnaHQpe1xuICAgICAgICB0aGlzLnNwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgc3ByaXRlLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCBzcHJpdGUuaGVpZ2h0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0J7RgtGA0LjRgdC+0LLQutCwINC/0LXRgNGB0L7QvdCw0LbQsFxuICAgICAqIEBwYXJhbSBjb250ZXh0IC0g0LrRg9C00LAg0YDQuNGB0YPQtdC8XG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB3aWR0aFxuICAgICAqIEBwYXJhbSBoZWlnaHRcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKiBAcGFyYW0gZnJhbWVOdW0gLSDQvdC+0LzQtdGAINC60LDQtNGA0LAg0LDQvdC40LzQsNGG0LjQuFxuICAgICAqL1xuICAgIGRyYXcoY29udGV4dCwgeCwgeSwgc3RhdGUsIGZyYW1lTnVtLCB3aWR0aCwgaGVpZ2h0KXtcblxuICAgICAgICBpZighc3RhdGUgfHwgIXRoaXMuc3ByaXRlLnN0YXRlc1tzdGF0ZV0pe1xuICAgICAgICAgICAgc3RhdGUgPSAnZGVmYXVsdCdcbiAgICAgICAgfVxuICAgICAgICBpZighZnJhbWVOdW0pIGZyYW1lTnVtID0gMDtcblxuICAgICAgICBpZighdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXSB8fCAhdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXVtmcmFtZU51bV0pIHJldHVybjtcblxuXG4gICAgICAgIC8v0J7QsdGA0LXQt9C60LAg0L7RgtGA0LjRgdC+0LLQutC4INCy0L3QtSDQutCw0L3QstGLIFRPRE86INGA0LXQt9Cw0YLRjCDQv9C+INC60LDQvNC10YDQtVxuICAgICAgICBpZih4ICsgdGhpcy53aWR0aCA+IDAgJiYgeCA8IGNvbnRleHQuY2FudmFzLndpZHRoICYmIHkgKyB0aGlzLmhlaWdodCA+IDAgJiYgeSA8IGNvbnRleHQuY2FudmFzLmhlaWdodCkge1xuXG5cbiAgICAgICAgICAgIC8vINCg0LjRgdGD0LXQvCDQutCw0LTRgFxuICAgICAgICAgICAgdGhpcy5kcmF3RnJhbWUoXG4gICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5pbWFnZSxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZS5zdGF0ZXNbc3RhdGVdW2ZyYW1lTnVtXSxcbiAgICAgICAgICAgICAgICB4LFxuICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC60LDQtNGAINCw0L3QuNC80LDRhtC40LhcbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBzcHJpdGVcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHBhcmFtIHdpZHRoXG4gICAgICogQHBhcmFtIGhlaWdodFxuICAgICAqL1xuICAgIGRyYXdGcmFtZShjb250ZXh0LCBpbWFnZSwgc3ByaXRlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KXtcblxuICAgICAgICBpZih3aWR0aD4wICYmIGhlaWdodD4wKSB7XG5cbiAgICAgICAgICAgIGxldCBzY2FsZVggPSBzcHJpdGUud2lkdGggLyB3aWR0aCxcbiAgICAgICAgICAgICAgICBzY2FsZVkgPSBzcHJpdGUuaGVpZ2h0IC8gaGVpZ2h0O1xuXG4gICAgICAgICAgICBsZXQgc3ggPSBzcHJpdGUueCwgc3kgPSBzcHJpdGUueSwgc3cgPSBzcHJpdGUud2lkdGgsIHNoID0gc3ByaXRlLmhlaWdodDtcbiAgICAgICAgICAgIGxldCBkeCA9IHgsIGR5ID0geSwgZHcgPSB3aWR0aCwgZGggPSBoZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmICh4IDwgMCkge1xuICAgICAgICAgICAgICAgIGR4ID0gMDtcbiAgICAgICAgICAgICAgICBkdyA9IHdpZHRoICsgeDtcbiAgICAgICAgICAgICAgICBzeCAtPSBNYXRoLmZsb29yKHggKiBzY2FsZVgpO1xuICAgICAgICAgICAgICAgIHN3ID0gTWF0aC5mbG9vcihkdyAqIHNjYWxlWCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeSA8IDApIHtcbiAgICAgICAgICAgICAgICBkeSA9IDA7XG4gICAgICAgICAgICAgICAgZGggPSBoZWlnaHQgKyB5O1xuICAgICAgICAgICAgICAgIHN5IC09IE1hdGguZmxvb3IoeSAqIHNjYWxlWSk7XG4gICAgICAgICAgICAgICAgc2ggPSBNYXRoLmZsb29yKGRoICogc2NhbGVZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGR3ID4gY29udGV4dC5jYW52YXMud2lkdGggLSBkeCkge1xuICAgICAgICAgICAgICAgIGR3ID0gY29udGV4dC5jYW52YXMud2lkdGggLSBkeDtcbiAgICAgICAgICAgICAgICBzdyA9IE1hdGguZmxvb3IoZHcgKiBzY2FsZVgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGggPiBjb250ZXh0LmNhbnZhcy5oZWlnaHQgLSBkeSkge1xuICAgICAgICAgICAgICAgIGRoID0gY29udGV4dC5jYW52YXMuaGVpZ2h0IC0gZHk7XG4gICAgICAgICAgICAgICAgc2ggPSBNYXRoLmZsb29yKGRoICogc2NhbGVZKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/QndC1INGA0LjRgdGD0LXQvCDRgSDRgNCw0LfQvNC10YDQvtC8INC80LXQvdGM0YjQtSDQuNC70Lgg0YDQsNCy0L3Ri9C8INC90YPQu9GOXG4gICAgICAgICAgICBpZihzdz4wJiZzaD4wJiZkdz4wJiZkaD4wKSB7XG5cbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN4LFxuICAgICAgICAgICAgICAgICAgICBzeSxcbiAgICAgICAgICAgICAgICAgICAgc3csXG4gICAgICAgICAgICAgICAgICAgIHNoLFxuICAgICAgICAgICAgICAgICAgICBkeCxcbiAgICAgICAgICAgICAgICAgICAgZHksXG4gICAgICAgICAgICAgICAgICAgIGR3LFxuICAgICAgICAgICAgICAgICAgICBkaFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc3JjKXtcbiAgICAgICAgdGhpcy5zb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZC52b2x1bWUgPSAwLjQ7XG4gICAgICAgIHRoaXMuc291bmQuc3JjID0gc3JjO1xuICAgICAgICB0aGlzLnNvdW5kLnNldEF0dHJpYnV0ZShcInByZWxvYWRcIiwgXCJhdXRvXCIpO1xuICAgICAgICB0aGlzLnNvdW5kLnNldEF0dHJpYnV0ZShcImNvbnRyb2xzXCIsIFwibm9uZVwiKTtcbiAgICAgICAgdGhpcy5zb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zb3VuZCk7XG4gICAgfVxuICAgIHBsYXkoKXtcbiAgICAgICAgaWYodGhpcy5zb3VuZC5jdXJyZW50VGltZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc291bmQucGF1c2UoKTtcbiAgICAgICAgICAgIHRoaXMuc291bmQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCk7XG4gICAgfVxuICAgIHN0b3AoKXtcbiAgICAgICAgdGhpcy5zb3VuZC5wYXVzZSgpO1xuICAgIH1cbn0iLCIvKipcbiAqINCY0L3RgtC10YDRhNC10LnRgSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cbiAqL1xuXG4vLyDQrdC60YDQsNC9INC30LDQs9GA0YPQt9C60LhcbmltcG9ydCB3YWl0U2NyZWVuIGZyb20gJy4vd2FpdHNjcmVlbidcblxuXG5leHBvcnQgZGVmYXVsdCB7d2FpdFNjcmVlbn0iLCIvKipcbiAqINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuICovXG5cblxuY29uc3Qgd2FpdFNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdcIik7XG5cblxuZXhwb3J0IGRlZmF1bHQge3Nob3csIGhpZGV9XG5cblxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG4iLCIvKipcbiAqINCh0L7QsdGL0YLQuNGPINC40LPRgNGLXG4gKi9cbmltcG9ydCBhY2NvdW50IGZyb20gXCIuL2FjY291bnRcIjtcblxuZXhwb3J0IGRlZmF1bHQge2luaXQsIGFkZCwgb24sIG9mZn1cblxuLy8g0KHQtdGA0LLQtdGA0L3Ri9C5INGB0L7QutC10YJcbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ3MuanNcIjtcblxuaW1wb3J0IHVpIGZyb20gXCIuL2VuZ2luZS91aS91aS5qc1wiO1xuXG4vLyDQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgNCy0LXRgNGDXG5sZXQgc2VydmVyU29ja2V0ID0gbnVsbDtcblxuXG4vKipcbiAqINCY0L3QuNGC0LjQvCDQuNCz0YDQvtCy0YvQtSDRgdC+0LHRi9GC0LjRj1xuICovXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGlmKCFzZXJ2ZXJTb2NrZXQpIHtcbiAgICAgICAgc2VydmVyU29ja2V0ID0gaW8oXCJodHRwOi8vc2VydmVyLmdhbWVzLnEtZGV2LnJ1XCIpO1xuICAgIH1cbiAgICBzZXJ2ZXJTb2NrZXQuY29ubmVjdCgpO1xuXG4gICAgLy8g0JTQtdC50YHRgtCy0LjRjyDQv9GA0Lgg0YHQtdGA0LLQtdGA0L3Ri9GFINC/0YDQvtCx0LvQtdC80LDRhVxuICAgIHNlcnZlclNvY2tldC5vbignY29ubmVjdF9lcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nKCfQntGI0LjQsdC60LAg0L/QvtC00LrQu9GO0YfQtdC90LjRjyDQuiDRgdC10YDQstC10YDRgycpO1xuICAgIH0pO1xuXG5cbiAgICBzZXJ2ZXJTb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nKCfQvtGCINGB0LXRgNCy0LXRgNCwINC/0L7RgdGC0YPQv9C40LsgZGlzY29ubmVjdCcpO1xuICAgICAgICBsb2coJ9CS0Ysg0L7RgtC60LvRjtGH0LXQvdGLINC+0YIg0YHQtdGA0LLQtdGA0LAnKTtcblxuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9KTtcblxufVxuXG5cbmNvbnN0IGhhbmRsZXJzID0ge307XG5cbi8qKlxuICog0JTQvtCx0LDQstC70LXQvdC40LUg0LjQs9GA0L7QstC+0LPQviDRgdC+0LHRi9GC0LjRj1xuICogQHBhcmFtIGV2ZW50TmFtZVxuICogQHBhcmFtIGRhdGFcbiAqL1xuZnVuY3Rpb24gYWRkKGV2ZW50TmFtZSwgZGF0YSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0LvQvtC60LDQu9GM0L3Ri9C1INC+0LHRgNCw0LHQvtGC0YfQuNC60LggLSDQstGL0LfQvtCy0LXQvFxuICAgIHJ1bkhhbmRsZXJzKGV2ZW50TmFtZSwgZGF0YSk7XG5cbiAgICAvLyDRiNC70LXQvCDRgdC+0LHRi9GC0LjQtSDQvdCwINGB0LXRgNCy0LXRgFxuICAgIHNlcnZlclNvY2tldC5lbWl0KGV2ZW50TmFtZSwgZGF0YSlcbn1cblxuXG5mdW5jdGlvbiBvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG5cbiAgICAvL9Ch0L7RhdGA0LDQvdC40Lwg0L3QsCDRgdC70YPRh9Cw0Lkg0LXRgdC70Lgg0YHQvtCx0YvRgtC40Y8g0LLQvtC30L3QuNC60L3Rg9GCINC70L7QutCw0LvRjNC90L5cbiAgICBpZihldmVudE5hbWUgaW4gaGFuZGxlcnM9PT1mYWxzZSl7XG4gICAgICAgIGhhbmRsZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICB9XG4gICAgaGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcblxuXG4gICAgc2VydmVyU29ja2V0Lm9uKGV2ZW50TmFtZSwgKGRhdGEpPT57XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe31cbiAgICAgICAgbGV0IHR5cGUgPSBkYXRhLnR5cGUgPyBkYXRhLnR5cGUgOiBcInNpbXBsZVwiO1xuXG4gICAgICAgIC8vINCV0YHQu9C4INCyINC00LDQvdC90YvRhSDRgdC+0LHRi9GC0LjRjyDQtdGB0YLRjCDQv9C+0LvQtSBtZXNzYWdlIC0g0LLRi9Cy0LXQtNC10Lwg0LIg0LvQvtCzXG4gICAgICAgIGRhdGEubWVzc2FnZSAmJiBsb2coZGF0YS5tZXNzYWdlLyogKyAnICjQodC+0LHRi9GC0LjQtSAnK2V2ZW50KycuJyt0eXBlKycpJyovKTtcblxuICAgICAgICAvLyDQntGC0LvQsNC00LrQsCDRgdC+0LHRi9GC0LjQuSDQsdC10LcgbWVzc2FnZVxuICAgICAgICAvLyBkYXRhLm1lc3NhZ2UgfHwgbG9nKCcgKNCh0L7QsdGL0YLQuNC1ICcrZXZlbnQrJy4nK3R5cGUrJyknKTtcblxuICAgICAgICBjYWxsYmFjayhldmVudE5hbWUsIHR5cGUsIGRhdGEpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBvZmYoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzICYmIGhhbmRsZXJzW2V2ZW50TmFtZV09PT1oYW5kbGVyKXtcbiAgICAgICAgZGVsZXRlIGhhbmRsZXJzW2V2ZW50TmFtZV07XG4gICAgfVxuXG4gICAgc2VydmVyU29ja2V0Lm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xufVxuXG5cbi8vINCX0LDQv9GD0YHQuiDQtNC70Y8g0LvQvtC60LDQu9GM0L3Ri9GFINGB0L7QsdGL0YLQuNC5XG5mdW5jdGlvbiBydW5IYW5kbGVycyhldmVudE5hbWUsIGRhdGEpIHtcbiAgICAvL9CV0YHQu9C4INC10YHRgtGMINC+0LHRgNCw0LHQvtGC0YfQuNC60LggLSDQt9Cw0L/Rg9GB0LrQsNC10LxcbiAgICBpZihldmVudE5hbWUgaW4gaGFuZGxlcnMpe1xuICAgICAgICBmb3IoY29uc3QgaCBvZiBoYW5kbGVyc1tldmVudE5hbWVdKXtcbiAgICAgICAgICAgIGgoZXZlbnROYW1lLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGV2ZW50TmFtZT09PVwic2lnbm91dFwiKXtcbiAgICAgICAgYWNjb3VudC5zaWdub3V0KCk7XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgdWkgZnJvbSBcIi4vZW5naW5lL3VpL3VpLmpzXCI7XG5cbmltcG9ydCBhY2NvdW50IGZyb20gXCIuL2FjY291bnQuanNcIjtcblxuaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9ldmVudHMuanNcIlxuXG5pbXBvcnQgc2lnbkluIGZyb20gXCIuL3NjZW5lcy9zaWduaW5cIjtcblxuaW1wb3J0IHNjZW5lTWFpbiBmcm9tIFwiLi9zY2VuZXMvbWFpbi9pbmRleC5qc1wiXG5cblxuLyoqXG4gKiDQntGB0L3QvtCy0L3QvtC5INC60LvQsNGB0YEg0LrQu9C40LXQvdGC0LAg0LjQs9GA0YtcbiAqIGNsYXNzIEdhbWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge3J1bn1cblxuXG4gICAgLyoqXG4gICAgICog0JfQsNC/0YPRgdC6INC+0YHQvdC+0LLQvdC+0LPQviDRhtC40LrQu9CwXG4gICAgICovXG4gICAgZnVuY3Rpb24gcnVuKCkge1xuXG4gICAgICAgIC8vINCf0LjRiNC10LwgXCLQl9Cw0LPRgNGD0LfQutCwXCJcbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCk7XG5cblxuICAgICAgICAvLyDQn9C+0LTQutC70Y7Rh9Cw0LXQvNGB0Y8g0Log0YHQtdGA0LLQtdGA0YNcbiAgICAgICAgZXZlbnRzLmluaXQoKTtcblxuICAgICAgICBldmVudHMub24oXCJzZXJ2ZXJcIiwgKGV2ZW50LCB0eXBlLCBkYXRhKT0+e1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PSBcImhlbGxvXCIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsb2dpbiA9IGFjY291bnQuZ2V0VXNlcigpO1xuXG4gICAgICAgICAgICAgICAgaWYoIWxvZ2luKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g0LfQsNC/0YDQvtGB0LjQvCDQu9C+0LPQuNC9XG4gICAgICAgICAgICAgICAgICAgIHNpZ25Jbi5zdGFydChsb2dpbiwgKGxvZ2luKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vINCf0L7Qu9GD0YfQuNCyINGB0L7RhdGA0LDQvdC40LxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY291bnQuc2V0VXNlcihsb2dpbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0KGxvZ2luKTtcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQobG9naW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc3RhcnQobG9naW4pIHtcbiAgICAgICAgLy8g0L7RgtC/0YDQsNCy0LjQvCDQu9C+0LPQuNC9INGB0LXRgNCy0LXRgNGDXG4gICAgICAgIGV2ZW50cy5hZGQoJ2xvZ2luJywgbG9naW4pO1xuXG4gICAgICAgIC8vINCh0YLQsNGA0YLRg9C10Lwg0L7RgdC90L7QstC90YPRjiDRgdGG0LXQvdGDXG4gICAgICAgIHNjZW5lTWFpbi5zdGFydCgoKSA9PiB7XG5cbiAgICAgICAgICAgIGdhbWVvdmVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2FtZW92ZXIoKXtcbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCk7XG4gICAgfVxuIiwiaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lJ1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKXtcblxuICAgIGdhbWUucnVuKCk7XG5cbn07IiwiLyoqXG4gKiDQm9C+0LPQuNGA0L7QstCw0L3QuNC1XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuXG5jb25zdCAkbG9ncyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dzJyk7XG5cbmZ1bmN0aW9uIGxvZyhtc2cpIHtcbiAgICAkbG9ncy5pbm5lckhUTUwgKz0gJzxkaXYgY2xhc3M9XCJtc2dcIj4nK21zZysnPC9kaXY+JztcbiAgICAkbG9ncy5wYXJlbnRFbGVtZW50LnNjcm9sbFRvcCA9ICRsb2dzLnNjcm9sbEhlaWdodDtcbiAgICBjb25zb2xlLmxvZyhtc2cpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGFmdGVyXG5cbmZ1bmN0aW9uIGFmdGVyKGNvdW50LCBjYWxsYmFjaywgZXJyX2NiKSB7XG4gICAgdmFyIGJhaWwgPSBmYWxzZVxuICAgIGVycl9jYiA9IGVycl9jYiB8fCBub29wXG4gICAgcHJveHkuY291bnQgPSBjb3VudFxuXG4gICAgcmV0dXJuIChjb3VudCA9PT0gMCkgPyBjYWxsYmFjaygpIDogcHJveHlcblxuICAgIGZ1bmN0aW9uIHByb3h5KGVyciwgcmVzdWx0KSB7XG4gICAgICAgIGlmIChwcm94eS5jb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FmdGVyIGNhbGxlZCB0b28gbWFueSB0aW1lcycpXG4gICAgICAgIH1cbiAgICAgICAgLS1wcm94eS5jb3VudFxuXG4gICAgICAgIC8vIGFmdGVyIGZpcnN0IGVycm9yLCByZXN0IGFyZSBwYXNzZWQgdG8gZXJyX2NiXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGJhaWwgPSB0cnVlXG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgICAvLyBmdXR1cmUgZXJyb3IgY2FsbGJhY2tzIHdpbGwgZ28gdG8gZXJyb3IgaGFuZGxlclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBlcnJfY2JcbiAgICAgICAgfSBlbHNlIGlmIChwcm94eS5jb3VudCA9PT0gMCAmJiAhYmFpbCkge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsIi8qKlxuICogQW4gYWJzdHJhY3Rpb24gZm9yIHNsaWNpbmcgYW4gYXJyYXlidWZmZXIgZXZlbiB3aGVuXG4gKiBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgaXMgbm90IHN1cHBvcnRlZFxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnJheWJ1ZmZlciwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBhcnJheWJ1ZmZlci5ieXRlTGVuZ3RoO1xuICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gIGVuZCA9IGVuZCB8fCBieXRlcztcblxuICBpZiAoYXJyYXlidWZmZXIuc2xpY2UpIHsgcmV0dXJuIGFycmF5YnVmZmVyLnNsaWNlKHN0YXJ0LCBlbmQpOyB9XG5cbiAgaWYgKHN0YXJ0IDwgMCkgeyBzdGFydCArPSBieXRlczsgfVxuICBpZiAoZW5kIDwgMCkgeyBlbmQgKz0gYnl0ZXM7IH1cbiAgaWYgKGVuZCA+IGJ5dGVzKSB7IGVuZCA9IGJ5dGVzOyB9XG5cbiAgaWYgKHN0YXJ0ID49IGJ5dGVzIHx8IHN0YXJ0ID49IGVuZCB8fCBieXRlcyA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gIH1cblxuICB2YXIgYWJ2ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoZW5kIC0gc3RhcnQpO1xuICBmb3IgKHZhciBpID0gc3RhcnQsIGlpID0gMDsgaSA8IGVuZDsgaSsrLCBpaSsrKSB7XG4gICAgcmVzdWx0W2lpXSA9IGFidltpXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0LmJ1ZmZlcjtcbn07XG4iLCJcbi8qKlxuICogRXhwb3NlIGBCYWNrb2ZmYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmY7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBiYWNrb2ZmIHRpbWVyIHdpdGggYG9wdHNgLlxuICpcbiAqIC0gYG1pbmAgaW5pdGlhbCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyBbMTAwXVxuICogLSBgbWF4YCBtYXggdGltZW91dCBbMTAwMDBdXG4gKiAtIGBqaXR0ZXJgIFswXVxuICogLSBgZmFjdG9yYCBbMl1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHRoaXMubXMgPSBvcHRzLm1pbiB8fCAxMDA7XG4gIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgdGhpcy5qaXR0ZXIgPSBvcHRzLmppdHRlciA+IDAgJiYgb3B0cy5qaXR0ZXIgPD0gMSA/IG9wdHMuaml0dGVyIDogMDtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYWNrb2ZmIGR1cmF0aW9uLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gIGlmICh0aGlzLmppdHRlcikge1xuICAgIHZhciByYW5kID0gIE1hdGgucmFuZG9tKCk7XG4gICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgIG1zID0gKE1hdGguZmxvb3IocmFuZCAqIDEwKSAmIDEpID09IDAgID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgfVxuICByZXR1cm4gTWF0aC5taW4obXMsIHRoaXMubWF4KSB8IDA7XG59O1xuXG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uKG1pbil7XG4gIHRoaXMubXMgPSBtaW47XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24obWF4KXtcbiAgdGhpcy5tYXggPSBtYXg7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbihqaXR0ZXIpe1xuICB0aGlzLmppdHRlciA9IGppdHRlcjtcbn07XG5cbiIsIi8qXG4gKiBiYXNlNjQtYXJyYXlidWZmZXJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaWtsYXN2aC9iYXNlNjQtYXJyYXlidWZmZXJcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgTmlrbGFzIHZvbiBIZXJ0emVuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgY2hhcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcblxuICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG4gIHZhciBsb29rdXAgPSBuZXcgVWludDhBcnJheSgyNTYpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG9va3VwW2NoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbiAgfVxuXG4gIGV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24oYXJyYXlidWZmZXIpIHtcbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksXG4gICAgaSwgbGVuID0gYnl0ZXMubGVuZ3RoLCBiYXNlNjQgPSBcIlwiO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9Mykge1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaV0gJiAzKSA8PCA0KSB8IChieXRlc1tpICsgMV0gPj4gNCldO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO1xuICAgIH1cblxuICAgIGlmICgobGVuICUgMykgPT09IDIpIHtcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgXCI9XCI7XG4gICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAyKSArIFwiPT1cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZTY0O1xuICB9O1xuXG4gIGV4cG9ydHMuZGVjb2RlID0gIGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgIHZhciBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSxcbiAgICBsZW4gPSBiYXNlNjQubGVuZ3RoLCBpLCBwID0gMCxcbiAgICBlbmNvZGVkMSwgZW5jb2RlZDIsIGVuY29kZWQzLCBlbmNvZGVkNDtcblxuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSBcIj1cIikge1xuICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAyXSA9PT0gXCI9XCIpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz00KSB7XG4gICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzEpXTtcbiAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMildO1xuICAgICAgZW5jb2RlZDQgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSszKV07XG5cbiAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xuICB9O1xufSkoKTtcbiIsIi8qKlxuICogQ3JlYXRlIGEgYmxvYiBidWlsZGVyIGV2ZW4gd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcbiAqL1xuXG52YXIgQmxvYkJ1aWxkZXIgPSBnbG9iYWwuQmxvYkJ1aWxkZXJcbiAgfHwgZ2xvYmFsLldlYktpdEJsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5NU0Jsb2JCdWlsZGVyXG4gIHx8IGdsb2JhbC5Nb3pCbG9iQnVpbGRlcjtcblxuLyoqXG4gKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIGlzIHN1cHBvcnRlZFxuICovXG5cbnZhciBibG9iU3VwcG9ydGVkID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBhID0gbmV3IEJsb2IoWydoaSddKTtcbiAgICByZXR1cm4gYS5zaXplID09PSAyO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBzdXBwb3J0cyBBcnJheUJ1ZmZlclZpZXdzXG4gKiBGYWlscyBpbiBTYWZhcmkgNiwgc28gd2UgbmVlZCB0byBtYXAgdG8gQXJyYXlCdWZmZXJzIHRoZXJlLlxuICovXG5cbnZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPSBibG9iU3VwcG9ydGVkICYmIChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbMSwyXSldKTtcbiAgICByZXR1cm4gYi5zaXplID09PSAyO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgQmxvYkJ1aWxkZXIgaXMgc3VwcG9ydGVkXG4gKi9cblxudmFyIGJsb2JCdWlsZGVyU3VwcG9ydGVkID0gQmxvYkJ1aWxkZXJcbiAgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmFwcGVuZFxuICAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBtYXBzIEFycmF5QnVmZmVyVmlld3MgdG8gQXJyYXlCdWZmZXJzXG4gKiBVc2VkIGJ5IEJsb2JCdWlsZGVyIGNvbnN0cnVjdG9yIGFuZCBvbGQgYnJvd3NlcnMgdGhhdCBkaWRuJ3RcbiAqIHN1cHBvcnQgaXQgaW4gdGhlIEJsb2IgY29uc3RydWN0b3IuXG4gKi9cblxuZnVuY3Rpb24gbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2h1bmsgPSBhcnlbaV07XG4gICAgaWYgKGNodW5rLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB2YXIgYnVmID0gY2h1bmsuYnVmZmVyO1xuXG4gICAgICAvLyBpZiB0aGlzIGlzIGEgc3ViYXJyYXksIG1ha2UgYSBjb3B5IHNvIHdlIG9ubHlcbiAgICAgIC8vIGluY2x1ZGUgdGhlIHN1YmFycmF5IHJlZ2lvbiBmcm9tIHRoZSB1bmRlcmx5aW5nIGJ1ZmZlclxuICAgICAgaWYgKGNodW5rLmJ5dGVMZW5ndGggIT09IGJ1Zi5ieXRlTGVuZ3RoKSB7XG4gICAgICAgIHZhciBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnl0ZUxlbmd0aCk7XG4gICAgICAgIGNvcHkuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZiwgY2h1bmsuYnl0ZU9mZnNldCwgY2h1bmsuYnl0ZUxlbmd0aCkpO1xuICAgICAgICBidWYgPSBjb3B5LmJ1ZmZlcjtcbiAgICAgIH1cblxuICAgICAgYXJ5W2ldID0gYnVmO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgYmIuYXBwZW5kKGFyeVtpXSk7XG4gIH1cblxuICByZXR1cm4gKG9wdGlvbnMudHlwZSkgPyBiYi5nZXRCbG9iKG9wdGlvbnMudHlwZSkgOiBiYi5nZXRCbG9iKCk7XG59O1xuXG5mdW5jdGlvbiBCbG9iQ29uc3RydWN0b3IoYXJ5LCBvcHRpb25zKSB7XG4gIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtcbiAgcmV0dXJuIG5ldyBCbG9iKGFyeSwgb3B0aW9ucyB8fCB7fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgaWYgKGJsb2JTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID8gZ2xvYmFsLkJsb2IgOiBCbG9iQ29uc3RydWN0b3I7XG4gIH0gZWxzZSBpZiAoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpIHtcbiAgICByZXR1cm4gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59KSgpO1xuIiwiLyoqXG4gKiBTbGljZSByZWZlcmVuY2UuXG4gKi9cblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbi8qKlxuICogQmluZCBgb2JqYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgZm4pe1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IG9ialtmbl07XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IEVycm9yKCdiaW5kKCkgcmVxdWlyZXMgYSBmdW5jdGlvbicpO1xuICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gIH1cbn07XG4iLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iLCJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYSwgYil7XG4gIHZhciBmbiA9IGZ1bmN0aW9uKCl7fTtcbiAgZm4ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XG4gIGEucHJvdG90eXBlID0gbmV3IGZuO1xuICBhLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGE7XG59OyIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcblxuLyoqXG4gKiBFeHBvcnRzIHBhcnNlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHRyYW5zcG9ydHMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydHMvaW5kZXgnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgaW5kZXggPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIHBhcnNldXJpID0gcmVxdWlyZSgncGFyc2V1cmknKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gU29ja2V0O1xuXG4vKipcbiAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBTb2NrZXQgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSkgcmV0dXJuIG5ldyBTb2NrZXQodXJpLCBvcHRzKTtcblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBpZiAodXJpICYmICdvYmplY3QnID09PSB0eXBlb2YgdXJpKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSBudWxsO1xuICB9XG5cbiAgaWYgKHVyaSkge1xuICAgIHVyaSA9IHBhcnNldXJpKHVyaSk7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHVyaS5ob3N0O1xuICAgIG9wdHMuc2VjdXJlID0gdXJpLnByb3RvY29sID09PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PT0gJ3dzcyc7XG4gICAgb3B0cy5wb3J0ID0gdXJpLnBvcnQ7XG4gICAgaWYgKHVyaS5xdWVyeSkgb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTtcbiAgfSBlbHNlIGlmIChvcHRzLmhvc3QpIHtcbiAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2V1cmkob3B0cy5ob3N0KS5ob3N0O1xuICB9XG5cbiAgdGhpcy5zZWN1cmUgPSBudWxsICE9IG9wdHMuc2VjdXJlID8gb3B0cy5zZWN1cmVcbiAgICA6IChnbG9iYWwubG9jYXRpb24gJiYgJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sKTtcblxuICBpZiAob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KSB7XG4gICAgLy8gaWYgbm8gcG9ydCBpcyBzcGVjaWZpZWQgbWFudWFsbHksIHVzZSB0aGUgcHJvdG9jb2wgZGVmYXVsdFxuICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gJzQ0MycgOiAnODAnO1xuICB9XG5cbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7XG4gIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lIHx8XG4gICAgKGdsb2JhbC5sb2NhdGlvbiA/IGxvY2F0aW9uLmhvc3RuYW1lIDogJ2xvY2FsaG9zdCcpO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQgfHwgKGdsb2JhbC5sb2NhdGlvbiAmJiBsb2NhdGlvbi5wb3J0XG4gICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgIDogKHRoaXMuc2VjdXJlID8gNDQzIDogODApKTtcbiAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnkgfHwge307XG4gIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHRoaXMucXVlcnkpIHRoaXMucXVlcnkgPSBwYXJzZXFzLmRlY29kZSh0aGlzLnF1ZXJ5KTtcbiAgdGhpcy51cGdyYWRlID0gZmFsc2UgIT09IG9wdHMudXBncmFkZTtcbiAgdGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLyc7XG4gIHRoaXMuZm9yY2VKU09OUCA9ICEhb3B0cy5mb3JjZUpTT05QO1xuICB0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG4gIHRoaXMuZm9yY2VCYXNlNjQgPSAhIW9wdHMuZm9yY2VCYXNlNjQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9ICEhb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnRyYW5zcG9ydHMgPSBvcHRzLnRyYW5zcG9ydHMgfHwgWydwb2xsaW5nJywgJ3dlYnNvY2tldCddO1xuICB0aGlzLnRyYW5zcG9ydE9wdGlvbnMgPSBvcHRzLnRyYW5zcG9ydE9wdGlvbnMgfHwge307XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gIHRoaXMucG9saWN5UG9ydCA9IG9wdHMucG9saWN5UG9ydCB8fCA4NDM7XG4gIHRoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7XG4gIHRoaXMuYmluYXJ5VHlwZSA9IG51bGw7XG4gIHRoaXMub25seUJpbmFyeVVwZ3JhZGVzID0gb3B0cy5vbmx5QmluYXJ5VXBncmFkZXM7XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBmYWxzZSAhPT0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSA/IChvcHRzLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHt9KSA6IGZhbHNlO1xuXG4gIGlmICh0cnVlID09PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlKSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0ge307XG4gIGlmICh0aGlzLnBlck1lc3NhZ2VEZWZsYXRlICYmIG51bGwgPT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCA9IDEwMjQ7XG4gIH1cblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeCB8fCBudWxsO1xuICB0aGlzLmtleSA9IG9wdHMua2V5IHx8IG51bGw7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQgfHwgbnVsbDtcbiAgdGhpcy5jYSA9IG9wdHMuY2EgfHwgbnVsbDtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgdGhpcy5mb3JjZU5vZGUgPSAhIW9wdHMuZm9yY2VOb2RlO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuICBpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwpIHtcbiAgICBpZiAob3B0cy5leHRyYUhlYWRlcnMgJiYgT2JqZWN0LmtleXMob3B0cy5leHRyYUhlYWRlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubG9jYWxBZGRyZXNzKSB7XG4gICAgICB0aGlzLmxvY2FsQWRkcmVzcyA9IG9wdHMubG9jYWxBZGRyZXNzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgdGhpcy5pZCA9IG51bGw7XG4gIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gIC8vIHNldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5waW5nSW50ZXJ2YWxUaW1lciA9IG51bGw7XG4gIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG5cbiAgdGhpcy5vcGVuKCk7XG59XG5cblNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcblxuLyoqXG4gKiBFeHBvc2UgZGVwcyBmb3IgbGVnYWN5IGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzdGFuZGFsb25lIGJyb3dzZXIgYWNjZXNzLlxuICovXG5cblNvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7XG5Tb2NrZXQuVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKTtcblNvY2tldC50cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG5Tb2NrZXQucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQHJldHVybiB7VHJhbnNwb3J0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jcmVhdGVUcmFuc3BvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICB2YXIgcXVlcnkgPSBjbG9uZSh0aGlzLnF1ZXJ5KTtcblxuICAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbiAgcXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sO1xuXG4gIC8vIHRyYW5zcG9ydCBuYW1lXG4gIHF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7XG5cbiAgLy8gcGVyLXRyYW5zcG9ydCBvcHRpb25zXG4gIHZhciBvcHRpb25zID0gdGhpcy50cmFuc3BvcnRPcHRpb25zW25hbWVdIHx8IHt9O1xuXG4gIC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuICBpZiAodGhpcy5pZCkgcXVlcnkuc2lkID0gdGhpcy5pZDtcblxuICB2YXIgdHJhbnNwb3J0ID0gbmV3IHRyYW5zcG9ydHNbbmFtZV0oe1xuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBzb2NrZXQ6IHRoaXMsXG4gICAgYWdlbnQ6IG9wdGlvbnMuYWdlbnQgfHwgdGhpcy5hZ2VudCxcbiAgICBob3N0bmFtZTogb3B0aW9ucy5ob3N0bmFtZSB8fCB0aGlzLmhvc3RuYW1lLFxuICAgIHBvcnQ6IG9wdGlvbnMucG9ydCB8fCB0aGlzLnBvcnQsXG4gICAgc2VjdXJlOiBvcHRpb25zLnNlY3VyZSB8fCB0aGlzLnNlY3VyZSxcbiAgICBwYXRoOiBvcHRpb25zLnBhdGggfHwgdGhpcy5wYXRoLFxuICAgIGZvcmNlSlNPTlA6IG9wdGlvbnMuZm9yY2VKU09OUCB8fCB0aGlzLmZvcmNlSlNPTlAsXG4gICAganNvbnA6IG9wdGlvbnMuanNvbnAgfHwgdGhpcy5qc29ucCxcbiAgICBmb3JjZUJhc2U2NDogb3B0aW9ucy5mb3JjZUJhc2U2NCB8fCB0aGlzLmZvcmNlQmFzZTY0LFxuICAgIGVuYWJsZXNYRFI6IG9wdGlvbnMuZW5hYmxlc1hEUiB8fCB0aGlzLmVuYWJsZXNYRFIsXG4gICAgdGltZXN0YW1wUmVxdWVzdHM6IG9wdGlvbnMudGltZXN0YW1wUmVxdWVzdHMgfHwgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyxcbiAgICB0aW1lc3RhbXBQYXJhbTogb3B0aW9ucy50aW1lc3RhbXBQYXJhbSB8fCB0aGlzLnRpbWVzdGFtcFBhcmFtLFxuICAgIHBvbGljeVBvcnQ6IG9wdGlvbnMucG9saWN5UG9ydCB8fCB0aGlzLnBvbGljeVBvcnQsXG4gICAgcGZ4OiBvcHRpb25zLnBmeCB8fCB0aGlzLnBmeCxcbiAgICBrZXk6IG9wdGlvbnMua2V5IHx8IHRoaXMua2V5LFxuICAgIHBhc3NwaHJhc2U6IG9wdGlvbnMucGFzc3BocmFzZSB8fCB0aGlzLnBhc3NwaHJhc2UsXG4gICAgY2VydDogb3B0aW9ucy5jZXJ0IHx8IHRoaXMuY2VydCxcbiAgICBjYTogb3B0aW9ucy5jYSB8fCB0aGlzLmNhLFxuICAgIGNpcGhlcnM6IG9wdGlvbnMuY2lwaGVycyB8fCB0aGlzLmNpcGhlcnMsXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCB8fCB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLFxuICAgIGV4dHJhSGVhZGVyczogb3B0aW9ucy5leHRyYUhlYWRlcnMgfHwgdGhpcy5leHRyYUhlYWRlcnMsXG4gICAgZm9yY2VOb2RlOiBvcHRpb25zLmZvcmNlTm9kZSB8fCB0aGlzLmZvcmNlTm9kZSxcbiAgICBsb2NhbEFkZHJlc3M6IG9wdGlvbnMubG9jYWxBZGRyZXNzIHx8IHRoaXMubG9jYWxBZGRyZXNzLFxuICAgIHJlcXVlc3RUaW1lb3V0OiBvcHRpb25zLnJlcXVlc3RUaW1lb3V0IHx8IHRoaXMucmVxdWVzdFRpbWVvdXQsXG4gICAgcHJvdG9jb2xzOiBvcHRpb25zLnByb3RvY29scyB8fCB2b2lkICgwKVxuICB9KTtcblxuICByZXR1cm4gdHJhbnNwb3J0O1xufTtcblxuZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIG9baV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU29ja2V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdHJhbnNwb3J0O1xuICBpZiAodGhpcy5yZW1lbWJlclVwZ3JhZGUgJiYgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyAmJiB0aGlzLnRyYW5zcG9ydHMuaW5kZXhPZignd2Vic29ja2V0JykgIT09IC0xKSB7XG4gICAgdHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7XG4gIH0gZWxzZSBpZiAoMCA9PT0gdGhpcy50cmFuc3BvcnRzLmxlbmd0aCkge1xuICAgIC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCAnTm8gdHJhbnNwb3J0cyBhdmFpbGFibGUnKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO1xuICB9XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcblxuICAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG4gIHRyeSB7XG4gICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMudHJhbnNwb3J0cy5zaGlmdCgpO1xuICAgIHRoaXMub3BlbigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyYW5zcG9ydC5vcGVuKCk7XG4gIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xuICBkZWJ1Zygnc2V0dGluZyB0cmFuc3BvcnQgJXMnLCB0cmFuc3BvcnQubmFtZSk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICBkZWJ1ZygnY2xlYXJpbmcgZXhpc3RpbmcgdHJhbnNwb3J0ICVzJywgdGhpcy50cmFuc3BvcnQubmFtZSk7XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gIC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG4gIHRyYW5zcG9ydFxuICAub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25EcmFpbigpO1xuICB9KVxuICAub24oJ3BhY2tldCcsIGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gIH0pXG4gIC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub25FcnJvcihlKTtcbiAgfSlcbiAgLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoJ3RyYW5zcG9ydCBjbG9zZScpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wcm9iZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUsIHsgcHJvYmU6IDEgfSk7XG4gIHZhciBmYWlsZWQgPSBmYWxzZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydE9wZW4gKCkge1xuICAgIGlmIChzZWxmLm9ubHlCaW5hcnlVcGdyYWRlcykge1xuICAgICAgdmFyIHVwZ3JhZGVMb3Nlc0JpbmFyeSA9ICF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmIHNlbGYudHJhbnNwb3J0LnN1cHBvcnRzQmluYXJ5O1xuICAgICAgZmFpbGVkID0gZmFpbGVkIHx8IHVwZ3JhZGVMb3Nlc0JpbmFyeTtcbiAgICB9XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgb3BlbmVkJywgbmFtZSk7XG4gICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3BpbmcnLCBkYXRhOiAncHJvYmUnIH1dKTtcbiAgICB0cmFuc3BvcnQub25jZSgncGFja2V0JywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgaWYgKCdwb25nJyA9PT0gbXNnLnR5cGUgJiYgJ3Byb2JlJyA9PT0gbXNnLmRhdGEpIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgcG9uZycsIG5hbWUpO1xuICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IHRydWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkaW5nJywgdHJhbnNwb3J0KTtcbiAgICAgICAgaWYgKCF0cmFuc3BvcnQpIHJldHVybjtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09PSB0cmFuc3BvcnQubmFtZTtcblxuICAgICAgICBkZWJ1ZygncGF1c2luZyBjdXJyZW50IHRyYW5zcG9ydCBcIiVzXCInLCBzZWxmLnRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgc2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgICAgICBpZiAoJ2Nsb3NlZCcgPT09IHNlbGYucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICAgIGRlYnVnKCdjaGFuZ2luZyB0cmFuc3BvcnQgYW5kIHNlbmRpbmcgdXBncmFkZSBwYWNrZXQnKTtcblxuICAgICAgICAgIGNsZWFudXAoKTtcblxuICAgICAgICAgIHNlbGYuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3VwZ3JhZGUnIH1dKTtcbiAgICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGUnLCB0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgc2VsZi51cGdyYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZWxmLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkJywgbmFtZSk7XG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3Byb2JlIGVycm9yJyk7XG4gICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0ICgpIHtcbiAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICBmYWlsZWQgPSB0cnVlO1xuXG4gICAgY2xlYW51cCgpO1xuXG4gICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgfVxuXG4gIC8vIEhhbmRsZSBhbnkgZXJyb3IgdGhhdCBoYXBwZW5zIHdoaWxlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25lcnJvciAoZXJyKSB7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcjogJyArIGVycik7XG4gICAgZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICBmcmVlemVUcmFuc3BvcnQoKTtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsIG5hbWUsIGVycik7XG5cbiAgICBzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsIGVycm9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UgKCkge1xuICAgIG9uZXJyb3IoJ3RyYW5zcG9ydCBjbG9zZWQnKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbmNsb3NlICgpIHtcbiAgICBvbmVycm9yKCdzb2NrZXQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbnVwZ3JhZGUgKHRvKSB7XG4gICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgZGVidWcoJ1wiJXNcIiB3b3JrcyAtIGFib3J0aW5nIFwiJXNcIicsIHRvLm5hbWUsIHRyYW5zcG9ydC5uYW1lKTtcbiAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkaW5nJywgb251cGdyYWRlKTtcbiAgfVxuXG4gIHRyYW5zcG9ydC5vbmNlKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgdHJhbnNwb3J0Lm9uY2UoJ2Vycm9yJywgb25lcnJvcik7XG4gIHRyYW5zcG9ydC5vbmNlKCdjbG9zZScsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuXG4gIHRoaXMub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgdGhpcy5vbmNlKCd1cGdyYWRpbmcnLCBvbnVwZ3JhZGUpO1xuXG4gIHRyYW5zcG9ydC5vcGVuKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3NvY2tldCBvcGVuJyk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgdGhpcy5mbHVzaCgpO1xuXG4gIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgLy8gbGlzdGVuZXIgYWxyZWFkeSBjbG9zZWQgdGhlIHNvY2tldFxuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy51cGdyYWRlICYmIHRoaXMudHJhbnNwb3J0LnBhdXNlKSB7XG4gICAgZGVidWcoJ3N0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzJyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLCBwYWNrZXQudHlwZSwgcGFja2V0LmRhdGEpO1xuXG4gICAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xuXG4gICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgIHRoaXMuZW1pdCgnaGVhcnRiZWF0Jyk7XG5cbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdwb25nJzpcbiAgICAgICAgdGhpcy5zZXRQaW5nKCk7XG4gICAgICAgIHRoaXMuZW1pdCgncG9uZycpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtcbiAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgdGhpcy5vbkVycm9yKGVycik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgcGFja2V0LmRhdGEpO1xuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkhhbmRzaGFrZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnaGFuZHNoYWtlJywgZGF0YSk7XG4gIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gIHRoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgdGhpcy5vbk9wZW4oKTtcbiAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICBpZiAoJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICB0aGlzLnNldFBpbmcoKTtcblxuICAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG4gIHRoaXMub24oJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xufTtcblxuLyoqXG4gKiBSZXNldHMgcGluZyB0aW1lb3V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLnBpbmdUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJ2Nsb3NlZCcgPT09IHNlbGYucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgIHNlbGYub25DbG9zZSgncGluZyB0aW1lb3V0Jyk7XG4gIH0sIHRpbWVvdXQgfHwgKHNlbGYucGluZ0ludGVydmFsICsgc2VsZi5waW5nVGltZW91dCkpO1xufTtcblxuLyoqXG4gKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxuICogd2l0aGluIGB0aGlzLnBpbmdUaW1lb3V0YCBvciBjbG9zZXMgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2xlYXJUaW1lb3V0KHNlbGYucGluZ0ludGVydmFsVGltZXIpO1xuICBzZWxmLnBpbmdJbnRlcnZhbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyaXRpbmcgcGluZyBwYWNrZXQgLSBleHBlY3RpbmcgcG9uZyB3aXRoaW4gJXNtcycsIHNlbGYucGluZ1RpbWVvdXQpO1xuICAgIHNlbGYucGluZygpO1xuICAgIHNlbGYub25IZWFydGJlYXQoc2VsZi5waW5nVGltZW91dCk7XG4gIH0sIHNlbGYucGluZ0ludGVydmFsKTtcbn07XG5cbi8qKlxuKiBTZW5kcyBhIHBpbmcgcGFja2V0LlxuKlxuKiBAYXBpIHByaXZhdGVcbiovXG5cblNvY2tldC5wcm90b3R5cGUucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnNlbmRQYWNrZXQoJ3BpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5lbWl0KCdwaW5nJyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25EcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcblxuICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuXG4gIGlmICgwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIHRoaXMuZW1pdCgnZHJhaW4nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmZsdXNoKCk7XG4gIH1cbn07XG5cbi8qKlxuICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ2Nsb3NlZCcgIT09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICF0aGlzLnVwZ3JhZGluZyAmJiB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIGRlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHRoaXMud3JpdGVCdWZmZXIpO1xuICAgIC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbiAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDtcbiAgICB0aGlzLmVtaXQoJ2ZsdXNoJyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VuZHMgYSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLndyaXRlID1cblNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtc2csIG9wdGlvbnMsIGZuKSB7XG4gIHRoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsIG1zZywgb3B0aW9ucywgZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kUGFja2V0ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEsIG9wdGlvbnMsIGZuKSB7XG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZGF0YSkge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgZm4gPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG5cbiAgaWYgKCdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5jb21wcmVzcyA9IGZhbHNlICE9PSBvcHRpb25zLmNvbXByZXNzO1xuXG4gIHZhciBwYWNrZXQgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBkYXRhLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcbiAgdGhpcy5lbWl0KCdwYWNrZXRDcmVhdGUnLCBwYWNrZXQpO1xuICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgaWYgKGZuKSB0aGlzLm9uY2UoJ2ZsdXNoJywgZm4pO1xuICB0aGlzLmZsdXNoKCk7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2luZyc7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCdmb3JjZWQgY2xvc2UnKTtcbiAgICBkZWJ1Zygnc29ja2V0IGNsb3NpbmcgLSB0ZWxsaW5nIHRyYW5zcG9ydCB0byBjbG9zZScpO1xuICAgIHNlbGYudHJhbnNwb3J0LmNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UgKCkge1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGVFcnJvcicsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgY2xvc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhaXRGb3JVcGdyYWRlICgpIHtcbiAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgIHNlbGYub25jZSgndXBncmFkZScsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgc2VsZi5vbmNlKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgZGVidWcoJ3NvY2tldCBlcnJvciAlaicsIGVycik7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMub25DbG9zZSgndHJhbnNwb3J0IGVycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24sIGRlc2MpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJywgcmVhc29uKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBjbGVhciB0aW1lcnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG5cbiAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Nsb3NlJyk7XG5cbiAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG5cbiAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG5cbiAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgdGhpcy5pZCA9IG51bGw7XG5cbiAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbiwgZGVzYyk7XG5cbiAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICBzZWxmLndyaXRlQnVmZmVyID0gW107XG4gICAgc2VsZi5wcmV2QnVmZmVyTGVuID0gMDtcbiAgfVxufTtcblxuLyoqXG4gKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICpcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24gKHVwZ3JhZGVzKSB7XG4gIHZhciBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBqID0gdXBncmFkZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgaWYgKH5pbmRleCh0aGlzLnRyYW5zcG9ydHMsIHVwZ3JhZGVzW2ldKSkgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgfVxuICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDtcblxuLyoqXG4gKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBUcmFuc3BvcnQgKG9wdHMpIHtcbiAgdGhpcy5wYXRoID0gb3B0cy5wYXRoO1xuICB0aGlzLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZTtcbiAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0O1xuICB0aGlzLnNlY3VyZSA9IG9wdHMuc2VjdXJlO1xuICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7XG4gIHRoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gIHRoaXMuY2EgPSBvcHRzLmNhO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIHRoaXMuZm9yY2VOb2RlID0gb3B0cy5mb3JjZU5vZGU7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgdGhpcy5sb2NhbEFkZHJlc3MgPSBvcHRzLmxvY2FsQWRkcmVzcztcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoVHJhbnNwb3J0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRW1pdHMgYW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKG1zZywgZGVzYykge1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci50eXBlID0gJ1RyYW5zcG9ydEVycm9yJztcbiAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuICAgIHRoaXMuZG9PcGVuKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5kb0Nsb3NlKCk7XG4gICAgdGhpcy5vbkNsb3NlKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLndyaXRlKHBhY2tldHMpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IG5vdCBvcGVuJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gb3BlblxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgcGFja2V0ID0gcGFyc2VyLmRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFhIUiA9IHJlcXVpcmUoJy4vcG9sbGluZy14aHInKTtcbnZhciBKU09OUCA9IHJlcXVpcmUoJy4vcG9sbGluZy1qc29ucCcpO1xudmFyIHdlYnNvY2tldCA9IHJlcXVpcmUoJy4vd2Vic29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0IHRyYW5zcG9ydHMuXG4gKi9cblxuZXhwb3J0cy5wb2xsaW5nID0gcG9sbGluZztcbmV4cG9ydHMud2Vic29ja2V0ID0gd2Vic29ja2V0O1xuXG4vKipcbiAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxuICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcG9sbGluZyAob3B0cykge1xuICB2YXIgeGhyO1xuICB2YXIgeGQgPSBmYWxzZTtcbiAgdmFyIHhzID0gZmFsc2U7XG4gIHZhciBqc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuXG4gIGlmIChnbG9iYWwubG9jYXRpb24pIHtcbiAgICB2YXIgaXNTU0wgPSAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgdmFyIHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuXG4gICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgIGlmICghcG9ydCkge1xuICAgICAgcG9ydCA9IGlzU1NMID8gNDQzIDogODA7XG4gICAgfVxuXG4gICAgeGQgPSBvcHRzLmhvc3RuYW1lICE9PSBsb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgeHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gIH1cblxuICBvcHRzLnhkb21haW4gPSB4ZDtcbiAgb3B0cy54c2NoZW1lID0geHM7XG4gIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtcblxuICBpZiAoJ29wZW4nIGluIHhociAmJiAhb3B0cy5mb3JjZUpTT05QKSB7XG4gICAgcmV0dXJuIG5ldyBYSFIob3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFqc29ucCkgdGhyb3cgbmV3IEVycm9yKCdKU09OUCBkaXNhYmxlZCcpO1xuICAgIHJldHVybiBuZXcgSlNPTlAob3B0cyk7XG4gIH1cbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBQb2xsaW5nID0gcmVxdWlyZSgnLi9wb2xsaW5nJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7XG5cbi8qKlxuICogQ2FjaGVkIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gKi9cblxudmFyIHJOZXdsaW5lID0gL1xcbi9nO1xudmFyIHJFc2NhcGVkTmV3bGluZSA9IC9cXFxcbi9nO1xuXG4vKipcbiAqIEdsb2JhbCBKU09OUCBjYWxsYmFja3MuXG4gKi9cblxudmFyIGNhbGxiYWNrcztcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIGVtcHR5ICgpIHsgfVxuXG4vKipcbiAqIEpTT05QIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEpTT05QUG9sbGluZyAob3B0cykge1xuICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG5cbiAgLy8gZGVmaW5lIGdsb2JhbCBjYWxsYmFja3MgYXJyYXkgaWYgbm90IHByZXNlbnRcbiAgLy8gd2UgZG8gdGhpcyBoZXJlIChsYXppbHkpIHRvIGF2b2lkIHVubmVlZGVkIGdsb2JhbCBwb2xsdXRpb25cbiAgaWYgKCFjYWxsYmFja3MpIHtcbiAgICAvLyB3ZSBuZWVkIHRvIGNvbnNpZGVyIG11bHRpcGxlIGVuZ2luZXMgaW4gdGhlIHNhbWUgcGFnZVxuICAgIGlmICghZ2xvYmFsLl9fX2VpbykgZ2xvYmFsLl9fX2VpbyA9IFtdO1xuICAgIGNhbGxiYWNrcyA9IGdsb2JhbC5fX19laW87XG4gIH1cblxuICAvLyBjYWxsYmFjayBpZGVudGlmaWVyXG4gIHRoaXMuaW5kZXggPSBjYWxsYmFja3MubGVuZ3RoO1xuXG4gIC8vIGFkZCBjYWxsYmFjayB0byBqc29ucCBnbG9iYWxcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjYWxsYmFja3MucHVzaChmdW5jdGlvbiAobXNnKSB7XG4gICAgc2VsZi5vbkRhdGEobXNnKTtcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIHRvIHF1ZXJ5IHN0cmluZ1xuICB0aGlzLnF1ZXJ5LmogPSB0aGlzLmluZGV4O1xuXG4gIC8vIHByZXZlbnQgc3B1cmlvdXMgZXJyb3JzIGZyb20gYmVpbmcgZW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgdW5sb2FkZWRcbiAgaWYgKGdsb2JhbC5kb2N1bWVudCAmJiBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5zY3JpcHQpIHNlbGYuc2NyaXB0Lm9uZXJyb3IgPSBlbXB0eTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXG4gKi9cblxuaW5oZXJpdChKU09OUFBvbGxpbmcsIFBvbGxpbmcpO1xuXG4vKlxuICogSlNPTlAgb25seSBzdXBwb3J0cyBiaW5hcnkgYXMgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuXG4gIGlmICh0aGlzLmZvcm0pIHtcbiAgICB0aGlzLmZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvcm0pO1xuICAgIHRoaXMuZm9ybSA9IG51bGw7XG4gICAgdGhpcy5pZnJhbWUgPSBudWxsO1xuICB9XG5cbiAgUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gIH1cblxuICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICBzY3JpcHQuc3JjID0gdGhpcy51cmkoKTtcbiAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub25FcnJvcignanNvbnAgcG9sbCBlcnJvcicsIGUpO1xuICB9O1xuXG4gIHZhciBpbnNlcnRBdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgaWYgKGluc2VydEF0KSB7XG4gICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG4gIH0gZWxzZSB7XG4gICAgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfVxuICB0aGlzLnNjcmlwdCA9IHNjcmlwdDtcblxuICB2YXIgaXNVQWdlY2tvID0gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBuYXZpZ2F0b3IgJiYgL2dlY2tvL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICBpZiAoaXNVQWdlY2tvKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgfSwgMTAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXcml0ZXMgd2l0aCBhIGhpZGRlbiBpZnJhbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5mb3JtKSB7XG4gICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgdmFyIGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHZhciBpZCA9IHRoaXMuaWZyYW1lSWQgPSAnZWlvX2lmcmFtZV8nICsgdGhpcy5pbmRleDtcbiAgICB2YXIgaWZyYW1lO1xuXG4gICAgZm9ybS5jbGFzc05hbWUgPSAnc29ja2V0aW8nO1xuICAgIGZvcm0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGZvcm0uc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgIGZvcm0uc3R5bGUubGVmdCA9ICctMTAwMHB4JztcbiAgICBmb3JtLnRhcmdldCA9IGlkO1xuICAgIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY2NlcHQtY2hhcnNldCcsICd1dGYtOCcpO1xuICAgIGFyZWEubmFtZSA9ICdkJztcbiAgICBmb3JtLmFwcGVuZENoaWxkKGFyZWEpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gIH1cblxuICB0aGlzLmZvcm0uYWN0aW9uID0gdGhpcy51cmkoKTtcblxuICBmdW5jdGlvbiBjb21wbGV0ZSAoKSB7XG4gICAgaW5pdElmcmFtZSgpO1xuICAgIGZuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0SWZyYW1lICgpIHtcbiAgICBpZiAoc2VsZi5pZnJhbWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNlbGYuZm9ybS5yZW1vdmVDaGlsZChzZWxmLmlmcmFtZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHNlbGYub25FcnJvcignanNvbnAgcG9sbGluZyBpZnJhbWUgcmVtb3ZhbCBlcnJvcicsIGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBpZTYgZHluYW1pYyBpZnJhbWVzIHdpdGggdGFyZ2V0PVwiXCIgc3VwcG9ydCAodGhhbmtzIENocmlzIExhbWJhY2hlcilcbiAgICAgIHZhciBodG1sID0gJzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDowXCIgbmFtZT1cIicgKyBzZWxmLmlmcmFtZUlkICsgJ1wiPic7XG4gICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWwpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgaWZyYW1lLm5hbWUgPSBzZWxmLmlmcmFtZUlkO1xuICAgICAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0OjAnO1xuICAgIH1cblxuICAgIGlmcmFtZS5pZCA9IHNlbGYuaWZyYW1lSWQ7XG5cbiAgICBzZWxmLmZvcm0uYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICBzZWxmLmlmcmFtZSA9IGlmcmFtZTtcbiAgfVxuXG4gIGluaXRJZnJhbWUoKTtcblxuICAvLyBlc2NhcGUgXFxuIHRvIHByZXZlbnQgaXQgZnJvbSBiZWluZyBjb252ZXJ0ZWQgaW50byBcXHJcXG4gYnkgc29tZSBVQXNcbiAgLy8gZG91YmxlIGVzY2FwaW5nIGlzIHJlcXVpcmVkIGZvciBlc2NhcGVkIG5ldyBsaW5lcyBiZWNhdXNlIHVuZXNjYXBpbmcgb2YgbmV3IGxpbmVzIGNhbiBiZSBkb25lIHNhZmVseSBvbiBzZXJ2ZXItc2lkZVxuICBkYXRhID0gZGF0YS5yZXBsYWNlKHJFc2NhcGVkTmV3bGluZSwgJ1xcXFxcXG4nKTtcbiAgdGhpcy5hcmVhLnZhbHVlID0gZGF0YS5yZXBsYWNlKHJOZXdsaW5lLCAnXFxcXG4nKTtcblxuICB0cnkge1xuICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgfSBjYXRjaCAoZSkge31cblxuICBpZiAodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICB0aGlzLmlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5pZnJhbWUucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pZnJhbWUub25sb2FkID0gY29tcGxldGU7XG4gIH1cbn07XG4iLCIvKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nLXhocicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gWEhSO1xubW9kdWxlLmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRW1wdHkgZnVuY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7fVxuXG4vKipcbiAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFhIUiAob3B0cykge1xuICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG4gIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBvcHRzLnJlcXVlc3RUaW1lb3V0O1xuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuXG4gIGlmIChnbG9iYWwubG9jYXRpb24pIHtcbiAgICB2YXIgaXNTU0wgPSAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgdmFyIHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuXG4gICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgIGlmICghcG9ydCkge1xuICAgICAgcG9ydCA9IGlzU1NMID8gNDQzIDogODA7XG4gICAgfVxuXG4gICAgdGhpcy54ZCA9IG9wdHMuaG9zdG5hbWUgIT09IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSB8fFxuICAgICAgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgIHRoaXMueHMgPSBvcHRzLnNlY3VyZSAhPT0gaXNTU0w7XG4gIH1cbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXG4gKi9cblxuaW5oZXJpdChYSFIsIFBvbGxpbmcpO1xuXG4vKipcbiAqIFhIUiBzdXBwb3J0cyBiaW5hcnlcbiAqL1xuXG5YSFIucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgb3B0cy51cmkgPSB0aGlzLnVyaSgpO1xuICBvcHRzLnhkID0gdGhpcy54ZDtcbiAgb3B0cy54cyA9IHRoaXMueHM7XG4gIG9wdHMuYWdlbnQgPSB0aGlzLmFnZW50IHx8IGZhbHNlO1xuICBvcHRzLnN1cHBvcnRzQmluYXJ5ID0gdGhpcy5zdXBwb3J0c0JpbmFyeTtcbiAgb3B0cy5lbmFibGVzWERSID0gdGhpcy5lbmFibGVzWERSO1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgb3B0cy5yZXF1ZXN0VGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5leHRyYUhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcblxuICByZXR1cm4gbmV3IFJlcXVlc3Qob3B0cyk7XG59O1xuXG4vKipcbiAqIFNlbmRzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gIHZhciBpc0JpbmFyeSA9IHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyAmJiBkYXRhICE9PSB1bmRlZmluZWQ7XG4gIHZhciByZXEgPSB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQT1NUJywgZGF0YTogZGF0YSwgaXNCaW5hcnk6IGlzQmluYXJ5IH0pO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignc3VjY2VzcycsIGZuKTtcbiAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3hociBwb3N0IGVycm9yJywgZXJyKTtcbiAgfSk7XG4gIHRoaXMuc2VuZFhociA9IHJlcTtcbn07XG5cbi8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3hociBwb2xsJyk7XG4gIHZhciByZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXEub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHNlbGYub25EYXRhKGRhdGEpO1xuICB9KTtcbiAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3hociBwb2xsIGVycm9yJywgZXJyKTtcbiAgfSk7XG4gIHRoaXMucG9sbFhociA9IHJlcTtcbn07XG5cbi8qKlxuICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QgKG9wdHMpIHtcbiAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCAnR0VUJztcbiAgdGhpcy51cmkgPSBvcHRzLnVyaTtcbiAgdGhpcy54ZCA9ICEhb3B0cy54ZDtcbiAgdGhpcy54cyA9ICEhb3B0cy54cztcbiAgdGhpcy5hc3luYyA9IGZhbHNlICE9PSBvcHRzLmFzeW5jO1xuICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50O1xuICB0aGlzLmlzQmluYXJ5ID0gb3B0cy5pc0JpbmFyeTtcbiAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IG9wdHMuc3VwcG9ydHNCaW5hcnk7XG4gIHRoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcbiAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IG9wdHMucmVxdWVzdFRpbWVvdXQ7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG5cbiAgdGhpcy5jcmVhdGUoKTtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG9wdHMgPSB7IGFnZW50OiB0aGlzLmFnZW50LCB4ZG9tYWluOiB0aGlzLnhkLCB4c2NoZW1lOiB0aGlzLnhzLCBlbmFibGVzWERSOiB0aGlzLmVuYWJsZXNYRFIgfTtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgdmFyIHhociA9IHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdHJ5IHtcbiAgICBkZWJ1ZygneGhyIG9wZW4gJXM6ICVzJywgdGhpcy5tZXRob2QsIHRoaXMudXJpKTtcbiAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmksIHRoaXMuYXN5bmMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCB0aGlzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGlmICgnUE9TVCcgPT09IHRoaXMubWV0aG9kKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5pc0JpbmFyeSkge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICcqLyonKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKHRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIH1cblxuICAgIC8vIGllNiBjaGVja1xuICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICB4aHIudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICB9O1xuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlICE9PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJykge1xuICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgIGlmICgyMDAgPT09IHhoci5zdGF0dXMgfHwgMTIyMyA9PT0geGhyLnN0YXR1cykge1xuICAgICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5zdGF0dXMpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlYnVnKCd4aHIgZGF0YSAlcycsIHRoaXMuZGF0YSk7XG4gICAgeGhyLnNlbmQodGhpcy5kYXRhKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmaHJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25FcnJvcihlKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF0gPSB0aGlzO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVzcG9uc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25TdWNjZXNzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXQoJ3N1Y2Nlc3MnKTtcbiAgdGhpcy5jbGVhbnVwKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5lbWl0KCdkYXRhJywgZGF0YSk7XG4gIHRoaXMub25TdWNjZXNzKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB0aGlzLmNsZWFudXAodHJ1ZSk7XG59O1xuXG4vKipcbiAqIENsZWFucyB1cCBob3VzZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKGZyb21FcnJvcikge1xuICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB4bWxodHRwcmVxdWVzdFxuICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgIHRoaXMueGhyLm9ubG9hZCA9IHRoaXMueGhyLm9uZXJyb3IgPSBlbXB0eTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgfVxuXG4gIGlmIChmcm9tRXJyb3IpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgIGRlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdO1xuICB9XG5cbiAgdGhpcy54aHIgPSBudWxsO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBsb2FkLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRhdGE7XG4gIHRyeSB7XG4gICAgdmFyIGNvbnRlbnRUeXBlO1xuICAgIHRyeSB7XG4gICAgICBjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIGlmIChjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgIGlmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlIHx8IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KHRoaXMueGhyLnJlc3BvbnNlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5vbkVycm9yKGUpO1xuICB9XG4gIGlmIChudWxsICE9IGRhdGEpIHtcbiAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuaGFzWERSID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgIXRoaXMueHMgJiYgdGhpcy5lbmFibGVzWERSO1xufTtcblxuLyoqXG4gKiBBYm9ydHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jbGVhbnVwKCk7XG59O1xuXG4vKipcbiAqIEFib3J0cyBwZW5kaW5nIHJlcXVlc3RzIHdoZW4gdW5sb2FkaW5nIHRoZSB3aW5kb3cuIFRoaXMgaXMgbmVlZGVkIHRvIHByZXZlbnRcbiAqIG1lbW9yeSBsZWFrcyAoZS5nLiB3aGVuIHVzaW5nIElFKSBhbmQgdG8gZW5zdXJlIHRoYXQgbm8gc3B1cmlvdXMgZXJyb3IgaXNcbiAqIGVtaXR0ZWQuXG4gKi9cblxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcblxuaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICBpZiAoZ2xvYmFsLmF0dGFjaEV2ZW50KSB7XG4gICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbnVubG9hZCcsIHVubG9hZEhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHVubG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bmxvYWRIYW5kbGVyICgpIHtcbiAgZm9yICh2YXIgaSBpbiBSZXF1ZXN0LnJlcXVlc3RzKSB7XG4gICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi4vdHJhbnNwb3J0Jyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG52YXIgeWVhc3QgPSByZXF1aXJlKCd5ZWFzdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBQb2xsaW5nO1xuXG4vKipcbiAqIElzIFhIUjIgc3VwcG9ydGVkP1xuICovXG5cbnZhciBoYXNYSFIyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoeyB4ZG9tYWluOiBmYWxzZSB9KTtcbiAgcmV0dXJuIG51bGwgIT0geGhyLnJlc3BvbnNlVHlwZTtcbn0pKCk7XG5cbi8qKlxuICogUG9sbGluZyBpbnRlcmZhY2UuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFBvbGxpbmcgKG9wdHMpIHtcbiAgdmFyIGZvcmNlQmFzZTY0ID0gKG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NCk7XG4gIGlmICghaGFzWEhSMiB8fCBmb3JjZUJhc2U2NCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuICBUcmFuc3BvcnQuY2FsbCh0aGlzLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAqL1xuXG5pbmhlcml0KFBvbGxpbmcsIFRyYW5zcG9ydCk7XG5cbi8qKlxuICogVHJhbnNwb3J0IG5hbWUuXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICdwb2xsaW5nJztcblxuLyoqXG4gKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gKiB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucG9sbCgpO1xufTtcblxuLyoqXG4gKiBQYXVzZXMgcG9sbGluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKG9uUGF1c2UpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztcblxuICBmdW5jdGlvbiBwYXVzZSAoKSB7XG4gICAgZGVidWcoJ3BhdXNlZCcpO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgIG9uUGF1c2UoKTtcbiAgfVxuXG4gIGlmICh0aGlzLnBvbGxpbmcgfHwgIXRoaXMud3JpdGFibGUpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgaWYgKHRoaXMucG9sbGluZykge1xuICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgcG9sbGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgIHRvdGFsKys7XG4gICAgICB0aGlzLm9uY2UoJ3BvbGxDb21wbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlJyk7XG4gICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgIHRvdGFsKys7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBhdXNlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wb2xsID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygncG9sbGluZycpO1xuICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICB0aGlzLmRvUG9sbCgpO1xuICB0aGlzLmVtaXQoJ3BvbGwnKTtcbn07XG5cbi8qKlxuICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBkZWJ1ZygncG9sbGluZyBnb3QgZGF0YSAlcycsIGRhdGEpO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAocGFja2V0LCBpbmRleCwgdG90YWwpIHtcbiAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgaWYgKCdvcGVuaW5nJyA9PT0gc2VsZi5yZWFkeVN0YXRlKSB7XG4gICAgICBzZWxmLm9uT3BlbigpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICBpZiAoJ2Nsb3NlJyA9PT0gcGFja2V0LnR5cGUpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gIH07XG5cbiAgLy8gZGVjb2RlIHBheWxvYWRcbiAgcGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuXG4gIC8vIGlmIGFuIGV2ZW50IGRpZCBub3QgdHJpZ2dlciBjbG9zaW5nXG4gIGlmICgnY2xvc2VkJyAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoJ3BvbGxDb21wbGV0ZScpO1xuXG4gICAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICB0aGlzLnBvbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgICBkZWJ1Zygnd3JpdGluZyBjbG9zZSBwYWNrZXQnKTtcbiAgICBzZWxmLndyaXRlKFt7IHR5cGU6ICdjbG9zZScgfV0pO1xuICB9XG5cbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3RyYW5zcG9ydCBvcGVuIC0gY2xvc2luZycpO1xuICAgIGNsb3NlKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgIGRlYnVnKCd0cmFuc3BvcnQgbm90IG9wZW4gLSBkZWZlcnJpbmcgY2xvc2UnKTtcbiAgICB0aGlzLm9uY2UoJ29wZW4nLCBjbG9zZSk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgcGFja2V0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gIHZhciBjYWxsYmFja2ZuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgfTtcblxuICBwYXJzZXIuZW5jb2RlUGF5bG9hZChwYWNrZXRzLCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHNlbGYuZG9Xcml0ZShkYXRhLCBjYWxsYmFja2ZuKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gIGlmIChmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgfVxuXG4gIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnaHR0cHMnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAgKCdodHRwJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgcG9ydCA9ICc6JyArIHRoaXMucG9ydDtcbiAgfVxuXG4gIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIHllYXN0ID0gcmVxdWlyZSgneWVhc3QnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0Jyk7XG52YXIgQnJvd3NlcldlYlNvY2tldCA9IGdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDtcbnZhciBOb2RlV2ViU29ja2V0O1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIHRyeSB7XG4gICAgTm9kZVdlYlNvY2tldCA9IHJlcXVpcmUoJ3dzJyk7XG4gIH0gY2F0Y2ggKGUpIHsgfVxufVxuXG4vKipcbiAqIEdldCBlaXRoZXIgdGhlIGBXZWJTb2NrZXRgIG9yIGBNb3pXZWJTb2NrZXRgIGdsb2JhbHNcbiAqIGluIHRoZSBicm93c2VyIG9yIHRyeSB0byByZXNvbHZlIFdlYlNvY2tldC1jb21wYXRpYmxlXG4gKiBpbnRlcmZhY2UgZXhwb3NlZCBieSBgd3NgIGZvciBOb2RlLWxpa2UgZW52aXJvbm1lbnQuXG4gKi9cblxudmFyIFdlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQ7XG5pZiAoIVdlYlNvY2tldCAmJiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICBXZWJTb2NrZXQgPSBOb2RlV2ViU29ja2V0O1xufVxuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gV1M7XG5cbi8qKlxuICogV2ViU29ja2V0IHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBXUyAob3B0cykge1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlO1xuICB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQgJiYgIW9wdHMuZm9yY2VOb2RlO1xuICB0aGlzLnByb3RvY29scyA9IG9wdHMucHJvdG9jb2xzO1xuICBpZiAoIXRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgV2ViU29ja2V0ID0gTm9kZVdlYlNvY2tldDtcbiAgfVxuICBUcmFuc3BvcnQuY2FsbCh0aGlzLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAqL1xuXG5pbmhlcml0KFdTLCBUcmFuc3BvcnQpO1xuXG4vKipcbiAqIFRyYW5zcG9ydCBuYW1lLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuV1MucHJvdG90eXBlLm5hbWUgPSAnd2Vic29ja2V0JztcblxuLypcbiAqIFdlYlNvY2tldHMgc3VwcG9ydCBiaW5hcnlcbiAqL1xuXG5XUy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4vKipcbiAqIE9wZW5zIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgIC8vIGxldCBwcm9iZSB0aW1lb3V0XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHVyaSA9IHRoaXMudXJpKCk7XG4gIHZhciBwcm90b2NvbHMgPSB0aGlzLnByb3RvY29scztcbiAgdmFyIG9wdHMgPSB7XG4gICAgYWdlbnQ6IHRoaXMuYWdlbnQsXG4gICAgcGVyTWVzc2FnZURlZmxhdGU6IHRoaXMucGVyTWVzc2FnZURlZmxhdGVcbiAgfTtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIGlmICh0aGlzLmV4dHJhSGVhZGVycykge1xuICAgIG9wdHMuaGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuICB9XG4gIGlmICh0aGlzLmxvY2FsQWRkcmVzcykge1xuICAgIG9wdHMubG9jYWxBZGRyZXNzID0gdGhpcy5sb2NhbEFkZHJlc3M7XG4gIH1cblxuICB0cnkge1xuICAgIHRoaXMud3MgPSB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCA/IChwcm90b2NvbHMgPyBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKSA6IG5ldyBXZWJTb2NrZXQodXJpKSkgOiBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzLCBvcHRzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgaWYgKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMud3Muc3VwcG9ydHMgJiYgdGhpcy53cy5zdXBwb3J0cy5iaW5hcnkpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcbiAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnbm9kZWJ1ZmZlcic7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgfVxuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbi8qKlxuICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25PcGVuKCk7XG4gIH07XG4gIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgfTtcbiAgdGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsIGUpO1xuICB9O1xufTtcblxuLyoqXG4gKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgdmFyIHRvdGFsID0gcGFja2V0cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdG90YWw7IGkgPCBsOyBpKyspIHtcbiAgICAoZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgcGFyc2VyLmVuY29kZVBhY2tldChwYWNrZXQsIHNlbGYuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICghc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgIHZhciBvcHRzID0ge307XG4gICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSAnc3RyaW5nJyA9PT0gdHlwZW9mIGRhdGEgPyBnbG9iYWwuQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSkgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsZW4gPCBzZWxmLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBkZWJ1Zygnd2Vic29ja2V0IGNsb3NlZCBiZWZvcmUgb25jbG9zZSBldmVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLS10b3RhbCB8fCBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KShwYWNrZXRzW2ldKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgIHNlbGYuZW1pdCgnZmx1c2gnKTtcblxuICAgIC8vIGZha2UgZHJhaW5cbiAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBjbG9zZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogQ2xvc2VzIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgdmFyIHBvcnQgPSAnJztcblxuICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICBpZiAodGhpcy5wb3J0ICYmICgoJ3dzcycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICgnd3MnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDgwKSkpIHtcbiAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICB9XG5cbiAgLy8gYXBwZW5kIHRpbWVzdGFtcCB0byBVUklcbiAgaWYgKHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gIH1cblxuICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbn07XG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb24gZm9yIFdlYlNvY2tldC5cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuV1MucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gISFXZWJTb2NrZXQgJiYgISgnX19pbml0aWFsaXplJyBpbiBXZWJTb2NrZXQgJiYgdGhpcy5uYW1lID09PSBXUy5wcm90b3R5cGUubmFtZSk7XG59O1xuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcblxudmFyIGhhc0NPUlMgPSByZXF1aXJlKCdoYXMtY29ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIHZhciB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuXG4gIC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuICAvLyBodHRwOi8vYmxvZ3MubXNkbi5jb20vYi9pZWludGVybmFscy9hcmNoaXZlLzIwMTAvMDUvMTMveGRvbWFpbnJlcXVlc3QtcmVzdHJpY3Rpb25zLWxpbWl0YXRpb25zLWFuZC13b3JrYXJvdW5kcy5hc3B4XG4gIHZhciB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xuICB2YXIgZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuICAvLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20veXVqaW9zYWthL3NvY2tlLmlvLWllOC1sb2FkaW5nLWV4YW1wbGVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAheHNjaGVtZSAmJiBlbmFibGVzWERSKSB7XG4gICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7IH1cblxuICBpZiAoIXhkb21haW4pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBnbG9iYWxbWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKV0oJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cbn07XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG52YXIgaGFzQmluYXJ5ID0gcmVxdWlyZSgnaGFzLWJpbmFyeTInKTtcbnZhciBzbGljZUJ1ZmZlciA9IHJlcXVpcmUoJ2FycmF5YnVmZmVyLnNsaWNlJyk7XG52YXIgYWZ0ZXIgPSByZXF1aXJlKCdhZnRlcicpO1xudmFyIHV0ZjggPSByZXF1aXJlKCcuL3V0ZjgnKTtcblxudmFyIGJhc2U2NGVuY29kZXI7XG5pZiAoZ2xvYmFsICYmIGdsb2JhbC5BcnJheUJ1ZmZlcikge1xuICBiYXNlNjRlbmNvZGVyID0gcmVxdWlyZSgnYmFzZTY0LWFycmF5YnVmZmVyJyk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgYW4gYW5kcm9pZCBicm93c2VyLiBUaGF0IHJlcXVpcmVzIHVzIHRvIHVzZVxuICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cbiAqXG4gKiBodHRwOi8vZ2hpbmRhLm5ldC9qcGVnLWJsb2ItYWpheC1hbmRyb2lkL1xuICovXG5cbnZhciBpc0FuZHJvaWQgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvQW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gUGhhbnRvbUpTLlxuICogVXBsb2FkaW5nIGEgQmxvYiB3aXRoIFBoYW50b21KUyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSwgYXMgcmVwb3J0ZWQgaGVyZTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzExMzk1XG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBpc1BoYW50b21KUyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9QaGFudG9tSlMvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIFdoZW4gdHJ1ZSwgYXZvaWRzIHVzaW5nIEJsb2JzIHRvIGVuY29kZSBwYXlsb2Fkcy5cbiAqIEB0eXBlIGJvb2xlYW5cbiAqL1xudmFyIGRvbnRTZW5kQmxvYnMgPSBpc0FuZHJvaWQgfHwgaXNQaGFudG9tSlM7XG5cbi8qKlxuICogQ3VycmVudCBwcm90b2NvbCB2ZXJzaW9uLlxuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqL1xuXG52YXIgcGFja2V0cyA9IGV4cG9ydHMucGFja2V0cyA9IHtcbiAgICBvcGVuOiAgICAgMCAgICAvLyBub24td3NcbiAgLCBjbG9zZTogICAgMSAgICAvLyBub24td3NcbiAgLCBwaW5nOiAgICAgMlxuICAsIHBvbmc6ICAgICAzXG4gICwgbWVzc2FnZTogIDRcbiAgLCB1cGdyYWRlOiAgNVxuICAsIG5vb3A6ICAgICA2XG59O1xuXG52YXIgcGFja2V0c2xpc3QgPSBrZXlzKHBhY2tldHMpO1xuXG4vKipcbiAqIFByZW1hZGUgZXJyb3IgcGFja2V0LlxuICovXG5cbnZhciBlcnIgPSB7IHR5cGU6ICdlcnJvcicsIGRhdGE6ICdwYXJzZXIgZXJyb3InIH07XG5cbi8qKlxuICogQ3JlYXRlIGEgYmxvYiBhcGkgZXZlbiBmb3IgYmxvYiBidWlsZGVyIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gKi9cblxudmFyIEJsb2IgPSByZXF1aXJlKCdibG9iJyk7XG5cbi8qKlxuICogRW5jb2RlcyBhIHBhY2tldC5cbiAqXG4gKiAgICAgPHBhY2tldCB0eXBlIGlkPiBbIDxkYXRhPiBdXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgNWhlbGxvIHdvcmxkXG4gKiAgICAgM1xuICogICAgIDRcbiAqXG4gKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdXRmOGVuY29kZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdXRmOGVuY29kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gdXRmOGVuY29kZTtcbiAgICB1dGY4ZW5jb2RlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBkYXRhID0gKHBhY2tldC5kYXRhID09PSB1bmRlZmluZWQpXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtcblxuICBpZiAoZ2xvYmFsLkFycmF5QnVmZmVyICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAoQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2IpIHtcbiAgICByZXR1cm4gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBtaWdodCBiZSBhbiBvYmplY3Qgd2l0aCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgaWYgKGRhdGEgJiYgZGF0YS5iYXNlNjQpIHtcbiAgICByZXR1cm4gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG4gIHZhciBlbmNvZGVkID0gcGFja2V0c1twYWNrZXQudHlwZV07XG5cbiAgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuICBpZiAodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSkge1xuICAgIGVuY29kZWQgKz0gdXRmOGVuY29kZSA/IHV0ZjguZW5jb2RlKFN0cmluZyhwYWNrZXQuZGF0YSksIHsgc3RyaWN0OiBmYWxzZSB9KSA6IFN0cmluZyhwYWNrZXQuZGF0YSk7XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2soJycgKyBlbmNvZGVkKTtcblxufTtcblxuZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spIHtcbiAgLy8gcGFja2V0IGRhdGEgaXMgYW4gb2JqZWN0IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV0gKyBwYWNrZXQuZGF0YS5kYXRhO1xuICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG59XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBoZWxwZXJzIGZvciBiaW5hcnkgdHlwZXNcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGRhdGEgPSBwYWNrZXQuZGF0YTtcbiAgdmFyIGNvbnRlbnRBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB2YXIgcmVzdWx0QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoMSArIGRhdGEuYnl0ZUxlbmd0aCk7XG5cbiAgcmVzdWx0QnVmZmVyWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0QnVmZmVyW2krMV0gPSBjb250ZW50QXJyYXlbaV07XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2socmVzdWx0QnVmZmVyLmJ1ZmZlcik7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICBmci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBwYWNrZXQuZGF0YSA9IGZyLnJlc3VsdDtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCB0cnVlLCBjYWxsYmFjayk7XG4gIH07XG4gIHJldHVybiBmci5yZWFkQXNBcnJheUJ1ZmZlcihwYWNrZXQuZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmIChkb250U2VuZEJsb2JzKSB7XG4gICAgcmV0dXJuIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBuZXcgVWludDhBcnJheSgxKTtcbiAgbGVuZ3RoWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gIHZhciBibG9iID0gbmV3IEJsb2IoW2xlbmd0aC5idWZmZXIsIHBhY2tldC5kYXRhXSk7XG5cbiAgcmV0dXJuIGNhbGxiYWNrKGJsb2IpO1xufVxuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQgd2l0aCBiaW5hcnkgZGF0YSBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0LCBoYXMgYHR5cGVgIGFuZCBgZGF0YWBcbiAqIEByZXR1cm4ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LCBjYWxsYmFjaykge1xuICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV07XG4gIGlmIChCbG9iICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2IpIHtcbiAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGI2NCA9IGZyLnJlc3VsdC5zcGxpdCgnLCcpWzFdO1xuICAgICAgY2FsbGJhY2sobWVzc2FnZSArIGI2NCk7XG4gICAgfTtcbiAgICByZXR1cm4gZnIucmVhZEFzRGF0YVVSTChwYWNrZXQuZGF0YSk7XG4gIH1cblxuICB2YXIgYjY0ZGF0YTtcbiAgdHJ5IHtcbiAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgd2l0aCB0eXBlZCBhcnJheXNcbiAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSk7XG4gICAgdmFyIGJhc2ljID0gbmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgYmFzaWNbaV0gPSB0eXBlZFtpXTtcbiAgICB9XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgYmFzaWMpO1xuICB9XG4gIG1lc3NhZ2UgKz0gZ2xvYmFsLmJ0b2EoYjY0ZGF0YSk7XG4gIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbn07XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCB1dGY4ZGVjb2RlKSB7XG4gIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG4gIC8vIFN0cmluZyBkYXRhXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoZGF0YS5jaGFyQXQoMCkgPT09ICdiJykge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0KGRhdGEuc3Vic3RyKDEpLCBiaW5hcnlUeXBlKTtcbiAgICB9XG5cbiAgICBpZiAodXRmOGRlY29kZSkge1xuICAgICAgZGF0YSA9IHRyeURlY29kZShkYXRhKTtcbiAgICAgIGlmIChkYXRhID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdHlwZSA9IGRhdGEuY2hhckF0KDApO1xuXG4gICAgaWYgKE51bWJlcih0eXBlKSAhPSB0eXBlIHx8ICFwYWNrZXRzbGlzdFt0eXBlXSkge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogZGF0YS5zdWJzdHJpbmcoMSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0gfTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXNBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB2YXIgdHlwZSA9IGFzQXJyYXlbMF07XG4gIHZhciByZXN0ID0gc2xpY2VCdWZmZXIoZGF0YSwgMSk7XG4gIGlmIChCbG9iICYmIGJpbmFyeVR5cGUgPT09ICdibG9iJykge1xuICAgIHJlc3QgPSBuZXcgQmxvYihbcmVzdF0pO1xuICB9XG4gIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiByZXN0IH07XG59O1xuXG5mdW5jdGlvbiB0cnlEZWNvZGUoZGF0YSkge1xuICB0cnkge1xuICAgIGRhdGEgPSB1dGY4LmRlY29kZShkYXRhLCB7IHN0cmljdDogZmFsc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldCBlbmNvZGVkIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqL1xuXG5leHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKG1zZywgYmluYXJ5VHlwZSkge1xuICB2YXIgdHlwZSA9IHBhY2tldHNsaXN0W21zZy5jaGFyQXQoMCldO1xuICBpZiAoIWJhc2U2NGVuY29kZXIpIHtcbiAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogbXNnLnN1YnN0cigxKSB9IH07XG4gIH1cblxuICB2YXIgZGF0YSA9IGJhc2U2NGVuY29kZXIuZGVjb2RlKG1zZy5zdWJzdHIoMSkpO1xuXG4gIGlmIChiaW5hcnlUeXBlID09PSAnYmxvYicgJiYgQmxvYikge1xuICAgIGRhdGEgPSBuZXcgQmxvYihbZGF0YV0pO1xuICB9XG5cbiAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9O1xufTtcblxuLyoqXG4gKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cbiAqXG4gKiAgICAgPGxlbmd0aD46ZGF0YVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDExOmhlbGxvIHdvcmxkMjpoaVxuICpcbiAqIElmIGFueSBjb250ZW50cyBhcmUgYmluYXJ5LCB0aGV5IHdpbGwgYmUgZW5jb2RlZCBhcyBiYXNlNjQgc3RyaW5ncy4gQmFzZTY0XG4gKiBlbmNvZGVkIHN0cmluZ3MgYXJlIG1hcmtlZCB3aXRoIGEgYiBiZWZvcmUgdGhlIGxlbmd0aCBzcGVjaWZpZXJcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbiAocGFja2V0cywgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O1xuICAgIHN1cHBvcnRzQmluYXJ5ID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpc0JpbmFyeSA9IGhhc0JpbmFyeShwYWNrZXRzKTtcblxuICBpZiAoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpIHtcbiAgICBpZiAoQmxvYiAmJiAhZG9udFNlbmRCbG9icykge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYihwYWNrZXRzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIocGFja2V0cywgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjaygnMDonKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UubGVuZ3RoICsgJzonICsgbWVzc2FnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgIWlzQmluYXJ5ID8gZmFsc2UgOiBzdXBwb3J0c0JpbmFyeSwgZmFsc2UsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdHMuam9pbignJykpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXG4gKi9cblxuZnVuY3Rpb24gbWFwKGFyeSwgZWFjaCwgZG9uZSkge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGFyeS5sZW5ndGgpO1xuICB2YXIgbmV4dCA9IGFmdGVyKGFyeS5sZW5ndGgsIGRvbmUpO1xuXG4gIHZhciBlYWNoV2l0aEluZGV4ID0gZnVuY3Rpb24oaSwgZWwsIGNiKSB7XG4gICAgZWFjaChlbCwgZnVuY3Rpb24oZXJyb3IsIG1zZykge1xuICAgICAgcmVzdWx0W2ldID0gbXNnO1xuICAgICAgY2IoZXJyb3IsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICBlYWNoV2l0aEluZGV4KGksIGFyeVtpXSwgbmV4dCk7XG4gIH1cbn1cblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gUG9zc2libGUgYmluYXJ5IGNvbnRlbnRzIGFyZVxuICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIHBhY2tldDtcbiAgaWYgKGRhdGEgPT09ICcnKSB7XG4gICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9ICcnLCBuLCBtc2c7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBjaHIgPSBkYXRhLmNoYXJBdChpKTtcblxuICAgIGlmIChjaHIgIT09ICc6Jykge1xuICAgICAgbGVuZ3RoICs9IGNocjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChsZW5ndGggPT09ICcnIHx8IChsZW5ndGggIT0gKG4gPSBOdW1iZXIobGVuZ3RoKSkpKSB7XG4gICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICB9XG5cbiAgICBtc2cgPSBkYXRhLnN1YnN0cihpICsgMSwgbik7XG5cbiAgICBpZiAobGVuZ3RoICE9IG1zZy5sZW5ndGgpIHtcbiAgICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgIH1cblxuICAgIGlmIChtc2cubGVuZ3RoKSB7XG4gICAgICBwYWNrZXQgPSBleHBvcnRzLmRlY29kZVBhY2tldChtc2csIGJpbmFyeVR5cGUsIGZhbHNlKTtcblxuICAgICAgaWYgKGVyci50eXBlID09PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PT0gcGFja2V0LmRhdGEpIHtcbiAgICAgICAgLy8gcGFyc2VyIGVycm9yIGluIGluZGl2aWR1YWwgcGFja2V0IC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJldCA9IGNhbGxiYWNrKHBhY2tldCwgaSArIG4sIGwpO1xuICAgICAgaWYgKGZhbHNlID09PSByZXQpIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBhZHZhbmNlIGN1cnNvclxuICAgIGkgKz0gbjtcbiAgICBsZW5ndGggPSAnJztcbiAgfVxuXG4gIGlmIChsZW5ndGggIT09ICcnKSB7XG4gICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICB9XG5cbn07XG5cbi8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkgYXMgYmluYXJ5LlxuICpcbiAqIDwxID0gYmluYXJ5LCAwID0gc3RyaW5nPjxudW1iZXIgZnJvbSAwLTk+PG51bWJlciBmcm9tIDAtOT5bLi4uXTxudW1iZXJcbiAqIDI1NT48ZGF0YT5cbiAqXG4gKiBFeGFtcGxlOlxuICogMSAzIDI1NSAxIDIgMywgaWYgdGhlIGJpbmFyeSBjb250ZW50cyBhcmUgaW50ZXJwcmV0ZWQgYXMgOCBiaXQgaW50ZWdlcnNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gZW5jb2RlZCBwYXlsb2FkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyID0gZnVuY3Rpb24ocGFja2V0cywgY2FsbGJhY2spIHtcbiAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjayhuZXcgQXJyYXlCdWZmZXIoMCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gZG9uZUNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCBlbmNvZGVkUGFja2V0cykge1xuICAgIHZhciB0b3RhbExlbmd0aCA9IGVuY29kZWRQYWNrZXRzLnJlZHVjZShmdW5jdGlvbihhY2MsIHApIHtcbiAgICAgIHZhciBsZW47XG4gICAgICBpZiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgbGVuID0gcC5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSBwLmJ5dGVMZW5ndGg7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjICsgbGVuLnRvU3RyaW5nKCkubGVuZ3RoICsgbGVuICsgMjsgLy8gc3RyaW5nL2JpbmFyeSBpZGVudGlmaWVyICsgc2VwYXJhdG9yID0gMlxuICAgIH0sIDApO1xuXG4gICAgdmFyIHJlc3VsdEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xuXG4gICAgdmFyIGJ1ZmZlckluZGV4ID0gMDtcbiAgICBlbmNvZGVkUGFja2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBwID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBhYiA9IHA7XG4gICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShwLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZpZXdbaV0gPSBwLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgYWIgPSB2aWV3LmJ1ZmZlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKSB7IC8vIG5vdCB0cnVlIGJpbmFyeVxuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDA7XG4gICAgICB9IGVsc2UgeyAvLyB0cnVlIGJpbmFyeVxuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW5TdHIgPSBhYi5ieXRlTGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICB9XG4gICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDI1NTtcblxuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSB2aWV3W2ldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEFycmF5LmJ1ZmZlcik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBFbmNvZGUgYXMgQmxvYlxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYiA9IGZ1bmN0aW9uKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24oZW5jb2RlZCkge1xuICAgICAgdmFyIGJpbmFyeUlkZW50aWZpZXIgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAxO1xuICAgICAgaWYgKHR5cGVvZiBlbmNvZGVkID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGVuY29kZWQubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNvZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmlld1tpXSA9IGVuY29kZWQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGVkID0gdmlldy5idWZmZXI7XG4gICAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuID0gKGVuY29kZWQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcilcbiAgICAgICAgPyBlbmNvZGVkLmJ5dGVMZW5ndGhcbiAgICAgICAgOiBlbmNvZGVkLnNpemU7XG5cbiAgICAgIHZhciBsZW5TdHIgPSBsZW4udG9TdHJpbmcoKTtcbiAgICAgIHZhciBsZW5ndGhBcnkgPSBuZXcgVWludDhBcnJheShsZW5TdHIubGVuZ3RoICsgMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZW5ndGhBcnlbaV0gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgfVxuICAgICAgbGVuZ3RoQXJ5W2xlblN0ci5sZW5ndGhdID0gMjU1O1xuXG4gICAgICBpZiAoQmxvYikge1xuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtiaW5hcnlJZGVudGlmaWVyLmJ1ZmZlciwgbGVuZ3RoQXJ5LmJ1ZmZlciwgZW5jb2RlZF0pO1xuICAgICAgICBkb25lQ2FsbGJhY2sobnVsbCwgYmxvYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEJsb2IocmVzdWx0cykpO1xuICB9KTtcbn07XG5cbi8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFN0cmluZ3MgYXJlIGRlY29kZWQgYnlcbiAqIGludGVycHJldGluZyBlYWNoIGJ5dGUgYXMgYSBrZXkgY29kZSBmb3IgZW50cmllcyBtYXJrZWQgdG8gc3RhcnQgd2l0aCAwLiBTZWVcbiAqIGRlc2NyaXB0aW9uIG9mIGVuY29kZVBheWxvYWRBc0JpbmFyeVxuICpcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeSA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gIH1cblxuICB2YXIgYnVmZmVyVGFpbCA9IGRhdGE7XG4gIHZhciBidWZmZXJzID0gW107XG5cbiAgd2hpbGUgKGJ1ZmZlclRhaWwuYnl0ZUxlbmd0aCA+IDApIHtcbiAgICB2YXIgdGFpbEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyVGFpbCk7XG4gICAgdmFyIGlzU3RyaW5nID0gdGFpbEFycmF5WzBdID09PSAwO1xuICAgIHZhciBtc2dMZW5ndGggPSAnJztcblxuICAgIGZvciAodmFyIGkgPSAxOyA7IGkrKykge1xuICAgICAgaWYgKHRhaWxBcnJheVtpXSA9PT0gMjU1KSBicmVhaztcblxuICAgICAgLy8gMzEwID0gY2hhciBsZW5ndGggb2YgTnVtYmVyLk1BWF9WQUxVRVxuICAgICAgaWYgKG1zZ0xlbmd0aC5sZW5ndGggPiAzMTApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIG1zZ0xlbmd0aCArPSB0YWlsQXJyYXlbaV07XG4gICAgfVxuXG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDIgKyBtc2dMZW5ndGgubGVuZ3RoKTtcbiAgICBtc2dMZW5ndGggPSBwYXJzZUludChtc2dMZW5ndGgpO1xuXG4gICAgdmFyIG1zZyA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDAsIG1zZ0xlbmd0aCk7XG4gICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICBtc2cgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KG1zZykpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB0byB0eXBlZCBhcnJheXNcbiAgICAgICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkobXNnKTtcbiAgICAgICAgbXNnID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBtc2cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0eXBlZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBidWZmZXJzLnB1c2gobXNnKTtcbiAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgbXNnTGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0b3RhbCA9IGJ1ZmZlcnMubGVuZ3RoO1xuICBidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oYnVmZmVyLCBpKSB7XG4gICAgY2FsbGJhY2soZXhwb3J0cy5kZWNvZGVQYWNrZXQoYnVmZmVyLCBiaW5hcnlUeXBlLCB0cnVlKSwgaSwgdG90YWwpO1xuICB9KTtcbn07XG4iLCJcbi8qKlxuICogR2V0cyB0aGUga2V5cyBmb3IgYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBrZXlzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMgKG9iail7XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoaGFzLmNhbGwob2JqLCBpKSkge1xuICAgICAgYXJyLnB1c2goaSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59O1xuIiwiLyohIGh0dHBzOi8vbXRocy5iZS91dGY4anMgdjIuMS4yIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cblx0Ly8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWBcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLFxuXHQvLyBhbmQgdXNlIGl0IGFzIGByb290YFxuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG5cdC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdO1xuXHRcdHZhciBjb3VudGVyID0gMDtcblx0XHR2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblx0XHR2YXIgdmFsdWU7XG5cdFx0dmFyIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciBpbmRleCA9IC0xO1xuXHRcdHZhciB2YWx1ZTtcblx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0d2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50LCBzdHJpY3QpIHtcblx0XHRpZiAoY29kZVBvaW50ID49IDB4RDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhERkZGKSB7XG5cdFx0XHRpZiAoc3RyaWN0KSB7XG5cdFx0XHRcdHRocm93IEVycm9yKFxuXHRcdFx0XHRcdCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgK1xuXHRcdFx0XHRcdCcgaXMgbm90IGEgc2NhbGFyIHZhbHVlJ1xuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmdW5jdGlvbiBjcmVhdGVCeXRlKGNvZGVQb2ludCwgc2hpZnQpIHtcblx0XHRyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IHNoaWZ0KSAmIDB4M0YpIHwgMHg4MCk7XG5cdH1cblxuXHRmdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50LCBzdHJpY3QpIHtcblx0XHRpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApIHsgLy8gMS1ieXRlIHNlcXVlbmNlXG5cdFx0XHRyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG5cdFx0fVxuXHRcdHZhciBzeW1ib2wgPSAnJztcblx0XHRpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkY4MDApID09IDApIHsgLy8gMi1ieXRlIHNlcXVlbmNlXG5cdFx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gNikgJiAweDFGKSB8IDB4QzApO1xuXHRcdH1cblx0XHRlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkZGMDAwMCkgPT0gMCkgeyAvLyAzLWJ5dGUgc2VxdWVuY2Vcblx0XHRcdGlmICghY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkpIHtcblx0XHRcdFx0Y29kZVBvaW50ID0gMHhGRkZEO1xuXHRcdFx0fVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDEyKSAmIDB4MEYpIHwgMHhFMCk7XG5cdFx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHRcdH1cblx0XHRlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkUwMDAwMCkgPT0gMCkgeyAvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0XHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiAxOCkgJiAweDA3KSB8IDB4RjApO1xuXHRcdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCAxMik7XG5cdFx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHRcdH1cblx0XHRzeW1ib2wgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKChjb2RlUG9pbnQgJiAweDNGKSB8IDB4ODApO1xuXHRcdHJldHVybiBzeW1ib2w7XG5cdH1cblxuXHRmdW5jdGlvbiB1dGY4ZW5jb2RlKHN0cmluZywgb3B0cykge1xuXHRcdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHRcdHZhciBzdHJpY3QgPSBmYWxzZSAhPT0gb3B0cy5zdHJpY3Q7XG5cblx0XHR2YXIgY29kZVBvaW50cyA9IHVjczJkZWNvZGUoc3RyaW5nKTtcblx0XHR2YXIgbGVuZ3RoID0gY29kZVBvaW50cy5sZW5ndGg7XG5cdFx0dmFyIGluZGV4ID0gLTE7XG5cdFx0dmFyIGNvZGVQb2ludDtcblx0XHR2YXIgYnl0ZVN0cmluZyA9ICcnO1xuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHRjb2RlUG9pbnQgPSBjb2RlUG9pbnRzW2luZGV4XTtcblx0XHRcdGJ5dGVTdHJpbmcgKz0gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCwgc3RyaWN0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGJ5dGVTdHJpbmc7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRmdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpIHtcblx0XHRpZiAoYnl0ZUluZGV4ID49IGJ5dGVDb3VudCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHRcdH1cblxuXHRcdHZhciBjb250aW51YXRpb25CeXRlID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRcdGJ5dGVJbmRleCsrO1xuXG5cdFx0aWYgKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCkge1xuXHRcdFx0cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGVuZCB1cCBoZXJlLCBpdOKAmXMgbm90IGEgY29udGludWF0aW9uIGJ5dGVcblx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVjb2RlU3ltYm9sKHN0cmljdCkge1xuXHRcdHZhciBieXRlMTtcblx0XHR2YXIgYnl0ZTI7XG5cdFx0dmFyIGJ5dGUzO1xuXHRcdHZhciBieXRlNDtcblx0XHR2YXIgY29kZVBvaW50O1xuXG5cdFx0aWYgKGJ5dGVJbmRleCA+IGJ5dGVDb3VudCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHRcdH1cblxuXHRcdGlmIChieXRlSW5kZXggPT0gYnl0ZUNvdW50KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gUmVhZCBmaXJzdCBieXRlXG5cdFx0Ynl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdFx0Ynl0ZUluZGV4Kys7XG5cblx0XHQvLyAxLWJ5dGUgc2VxdWVuY2UgKG5vIGNvbnRpbnVhdGlvbiBieXRlcylcblx0XHRpZiAoKGJ5dGUxICYgMHg4MCkgPT0gMCkge1xuXHRcdFx0cmV0dXJuIGJ5dGUxO1xuXHRcdH1cblxuXHRcdC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICgoYnl0ZTEgJiAweEUwKSA9PSAweEMwKSB7XG5cdFx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgxRikgPDwgNikgfCBieXRlMjtcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHg4MCkge1xuXHRcdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyAzLWJ5dGUgc2VxdWVuY2UgKG1heSBpbmNsdWRlIHVucGFpcmVkIHN1cnJvZ2F0ZXMpXG5cdFx0aWYgKChieXRlMSAmIDB4RjApID09IDB4RTApIHtcblx0XHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGNvZGVQb2ludCA9ICgoYnl0ZTEgJiAweDBGKSA8PCAxMikgfCAoYnl0ZTIgPDwgNikgfCBieXRlMztcblx0XHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwODAwKSB7XG5cdFx0XHRcdHJldHVybiBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSA/IGNvZGVQb2ludCA6IDB4RkZGRDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gNC1ieXRlIHNlcXVlbmNlXG5cdFx0aWYgKChieXRlMSAmIDB4RjgpID09IDB4RjApIHtcblx0XHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGJ5dGU0ID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGNvZGVQb2ludCA9ICgoYnl0ZTEgJiAweDA3KSA8PCAweDEyKSB8IChieXRlMiA8PCAweDBDKSB8XG5cdFx0XHRcdChieXRlMyA8PCAweDA2KSB8IGJ5dGU0O1xuXHRcdFx0aWYgKGNvZGVQb2ludCA+PSAweDAxMDAwMCAmJiBjb2RlUG9pbnQgPD0gMHgxMEZGRkYpIHtcblx0XHRcdFx0cmV0dXJuIGNvZGVQb2ludDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBVVEYtOCBkZXRlY3RlZCcpO1xuXHR9XG5cblx0dmFyIGJ5dGVBcnJheTtcblx0dmFyIGJ5dGVDb3VudDtcblx0dmFyIGJ5dGVJbmRleDtcblx0ZnVuY3Rpb24gdXRmOGRlY29kZShieXRlU3RyaW5nLCBvcHRzKSB7XG5cdFx0b3B0cyA9IG9wdHMgfHwge307XG5cdFx0dmFyIHN0cmljdCA9IGZhbHNlICE9PSBvcHRzLnN0cmljdDtcblxuXHRcdGJ5dGVBcnJheSA9IHVjczJkZWNvZGUoYnl0ZVN0cmluZyk7XG5cdFx0Ynl0ZUNvdW50ID0gYnl0ZUFycmF5Lmxlbmd0aDtcblx0XHRieXRlSW5kZXggPSAwO1xuXHRcdHZhciBjb2RlUG9pbnRzID0gW107XG5cdFx0dmFyIHRtcDtcblx0XHR3aGlsZSAoKHRtcCA9IGRlY29kZVN5bWJvbChzdHJpY3QpKSAhPT0gZmFsc2UpIHtcblx0XHRcdGNvZGVQb2ludHMucHVzaCh0bXApO1xuXHRcdH1cblx0XHRyZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHZhciB1dGY4ID0ge1xuXHRcdCd2ZXJzaW9uJzogJzIuMS4yJyxcblx0XHQnZW5jb2RlJzogdXRmOGVuY29kZSxcblx0XHQnZGVjb2RlJzogdXRmOGRlY29kZVxuXHR9O1xuXG5cdC8vIFNvbWUgQU1EIGJ1aWxkIG9wdGltaXplcnMsIGxpa2Ugci5qcywgY2hlY2sgZm9yIHNwZWNpZmljIGNvbmRpdGlvbiBwYXR0ZXJuc1xuXHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdGlmIChcblx0XHR0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiZcblx0XHR0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJlxuXHRcdGRlZmluZS5hbWRcblx0KSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHV0Zjg7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSB1dGY4O1xuXHRcdH0gZWxzZSB7IC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHR2YXIgb2JqZWN0ID0ge307XG5cdFx0XHR2YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3QuaGFzT3duUHJvcGVydHk7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gdXRmOCkge1xuXHRcdFx0XHRoYXNPd25Qcm9wZXJ0eS5jYWxsKHV0ZjgsIGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSB1dGY4W2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QudXRmOCA9IHV0Zjg7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIvKiBnbG9iYWwgQmxvYiBGaWxlICovXG5cbi8qXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIGdsb2JhbC5CbG9iID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkJsb2IpID09PSAnW29iamVjdCBCbG9iQ29uc3RydWN0b3JdJztcbnZhciB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBnbG9iYWwuRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5GaWxlKSA9PT0gJ1tvYmplY3QgRmlsZUNvbnN0cnVjdG9yXSc7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNCaW5hcnk7XG5cbi8qKlxuICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cbiAqXG4gKiBTdXBwb3J0cyBCdWZmZXIsIEFycmF5QnVmZmVyLCBCbG9iIGFuZCBGaWxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBoYXNCaW5hcnkgKG9iaikge1xuICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChoYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCh0eXBlb2YgZ2xvYmFsLkJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSkgfHxcbiAgICAgKHR5cGVvZiBnbG9iYWwuQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8XG4gICAgICh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSlcbiAgICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvaGFzLWJpbmFyeS9wdWxsLzRcbiAgaWYgKG9iai50b0pTT04gJiYgdHlwZW9mIG9iai50b0pTT04gPT09ICdmdW5jdGlvbicgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBoYXNCaW5hcnkob2JqLnRvSlNPTigpLCB0cnVlKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBoYXNCaW5hcnkob2JqW2tleV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKlxuICogTG9naWMgYm9ycm93ZWQgZnJvbSBNb2Rlcm5penI6XG4gKlxuICogICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9jb3JzLmpzXG4gKi9cblxudHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG59IGNhdGNoIChlcnIpIHtcbiAgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbn1cbiIsIlxudmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgb2JqKXtcbiAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcclxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xyXG4gKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICB2YXIgc3RyID0gJyc7XHJcblxyXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xyXG4gICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcXNcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbihxcyl7XHJcbiAgdmFyIHFyeSA9IHt9O1xyXG4gIHZhciBwYWlycyA9IHFzLnNwbGl0KCcmJyk7XHJcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgIHZhciBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcclxuICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG4gIH1cclxuICByZXR1cm4gcXJ5O1xyXG59O1xyXG4iLCIvKipcclxuICogUGFyc2VzIGFuIFVSSVxyXG4gKlxyXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbnZhciByZSA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xyXG5cclxudmFyIHBhcnRzID0gW1xyXG4gICAgJ3NvdXJjZScsICdwcm90b2NvbCcsICdhdXRob3JpdHknLCAndXNlckluZm8nLCAndXNlcicsICdwYXNzd29yZCcsICdob3N0JywgJ3BvcnQnLCAncmVsYXRpdmUnLCAncGF0aCcsICdkaXJlY3RvcnknLCAnZmlsZScsICdxdWVyeScsICdhbmNob3InXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNldXJpKHN0cikge1xyXG4gICAgdmFyIHNyYyA9IHN0cixcclxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcclxuICAgICAgICBlID0gc3RyLmluZGV4T2YoJ10nKTtcclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBiKSArIHN0ci5zdWJzdHJpbmcoYiwgZSkucmVwbGFjZSgvOi9nLCAnOycpICsgc3RyLnN1YnN0cmluZyhlLCBzdHIubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSxcclxuICAgICAgICB1cmkgPSB7fSxcclxuICAgICAgICBpID0gMTQ7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcclxuICAgICAgICB1cmkuc291cmNlID0gc3JjO1xyXG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xyXG4gICAgICAgIHVyaS5pcHY2dXJpID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJpO1xyXG59O1xyXG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXJsID0gcmVxdWlyZSgnLi91cmwnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGxvb2t1cDtcblxuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuXG52YXIgY2FjaGUgPSBleHBvcnRzLm1hbmFnZXJzID0ge307XG5cbi8qKlxuICogTG9va3MgdXAgYW4gZXhpc3RpbmcgYE1hbmFnZXJgIGZvciBtdWx0aXBsZXhpbmcuXG4gKiBJZiB0aGUgdXNlciBzdW1tb25zOlxuICpcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2EnKTtgXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9iJyk7YFxuICpcbiAqIFdlIHJldXNlIHRoZSBleGlzdGluZyBpbnN0YW5jZSBiYXNlZCBvbiBzYW1lIHNjaGVtZS9wb3J0L2hvc3QsXG4gKiBhbmQgd2UgaW5pdGlhbGl6ZSBzb2NrZXRzIGZvciBlYWNoIG5hbWVzcGFjZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvb2t1cCAodXJpLCBvcHRzKSB7XG4gIGlmICh0eXBlb2YgdXJpID09PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgdmFyIHBhcnNlZCA9IHVybCh1cmkpO1xuICB2YXIgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgdmFyIGlkID0gcGFyc2VkLmlkO1xuICB2YXIgcGF0aCA9IHBhcnNlZC5wYXRoO1xuICB2YXIgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXS5uc3BzO1xuICB2YXIgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHwgb3B0c1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fCBzYW1lTmFtZXNwYWNlO1xuXG4gIHZhciBpbztcblxuICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgIGRlYnVnKCdpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzJywgc291cmNlKTtcbiAgICBpbyA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgZGVidWcoJ25ldyBpbyBpbnN0YW5jZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgICAgY2FjaGVbaWRdID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgIH1cbiAgICBpbyA9IGNhY2hlW2lkXTtcbiAgfVxuICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgb3B0cy5xdWVyeSA9IHBhcnNlZC5xdWVyeTtcbiAgfVxuICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDtcblxuLyoqXG4gKiBgY29ubmVjdGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7XG5cbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xuZXhwb3J0cy5Tb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGVpbyA9IHJlcXVpcmUoJ2VuZ2luZS5pby1jbGllbnQnKTtcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6bWFuYWdlcicpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgQmFja29mZiA9IHJlcXVpcmUoJ2JhY2tvMicpO1xuXG4vKipcbiAqIElFNisgaGFzT3duUHJvcGVydHlcbiAqL1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gTWFuYWdlcjtcblxuLyoqXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIE1hbmFnZXIgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWFuYWdlcikpIHJldHVybiBuZXcgTWFuYWdlcih1cmksIG9wdHMpO1xuICBpZiAodXJpICYmICgnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgJy9zb2NrZXQuaW8nO1xuICB0aGlzLm5zcHMgPSB7fTtcbiAgdGhpcy5zdWJzID0gW107XG4gIHRoaXMub3B0cyA9IG9wdHM7XG4gIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7XG4gIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpXG4gIH0pO1xuICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLnVyaSA9IHVyaTtcbiAgdGhpcy5jb25uZWN0aW5nID0gW107XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gIHZhciBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgdGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICBpZiAodGhpcy5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZW1pdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBVcGRhdGUgYHNvY2tldC5pZGAgb2YgYWxsIHNvY2tldHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVTb2NrZXRJZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZW5lcmF0ZSBgc29ja2V0LmlkYCBmb3IgdGhlIGdpdmVuIGBuc3BgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5zcFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIChuc3ApIHtcbiAgcmV0dXJuIChuc3AgPT09ICcvJyA/ICcnIDogKG5zcCArICcjJykpICsgdGhpcy5lbmdpbmUuaWQ7XG59O1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHJlY29ubmVjdGlvbmAgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbk1hbmFnZXIucHJvdG90eXBlLnJhbmRvbWl6YXRpb25GYWN0b3IgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXlNYXggPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1heCh2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXG4gKlxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgdGhpcy5fdGltZW91dCA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm1heWJlUmVjb25uZWN0T25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gIGlmICghdGhpcy5yZWNvbm5lY3RpbmcgJiYgdGhpcy5fcmVjb25uZWN0aW9uICYmIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsLCBjYWxsYmFja1xuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vcGVuID1cbk1hbmFnZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4sIG9wdHMpIHtcbiAgZGVidWcoJ3JlYWR5U3RhdGUgJXMnLCB0aGlzLnJlYWR5U3RhdGUpO1xuICBpZiAofnRoaXMucmVhZHlTdGF0ZS5pbmRleE9mKCdvcGVuJykpIHJldHVybiB0aGlzO1xuXG4gIGRlYnVnKCdvcGVuaW5nICVzJywgdGhpcy51cmkpO1xuICB0aGlzLmVuZ2luZSA9IGVpbyh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG5cbiAgLy8gZW1pdCBgb3BlbmBcbiAgdmFyIG9wZW5TdWIgPSBvbihzb2NrZXQsICdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25vcGVuKCk7XG4gICAgZm4gJiYgZm4oKTtcbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF9lcnJvcmBcbiAgdmFyIGVycm9yU3ViID0gb24oc29ja2V0LCAnZXJyb3InLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRlYnVnKCdjb25uZWN0X2Vycm9yJyk7XG4gICAgc2VsZi5jbGVhbnVwKCk7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X2Vycm9yJywgZGF0YSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdDb25uZWN0aW9uIGVycm9yJyk7XG4gICAgICBlcnIuZGF0YSA9IGRhdGE7XG4gICAgICBmbihlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF90aW1lb3V0YFxuICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcblxuICAgIC8vIHNldCB0aW1lclxuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcbiAgICAgIG9wZW5TdWIuZGVzdHJveSgpO1xuICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCAndGltZW91dCcpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLCB0aW1lb3V0KTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWIpO1xuICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ29wZW4nKTtcblxuICAvLyBjbGVhciBvbGQgc3Vic1xuICB0aGlzLmNsZWFudXAoKTtcblxuICAvLyBtYXJrIGFzIG9wZW5cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcblxuICAvLyBhZGQgbmV3IHN1YnNcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdkYXRhJywgYmluZCh0aGlzLCAnb25kYXRhJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAncGluZycsIGJpbmQodGhpcywgJ29ucGluZycpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BvbmcnLCBiaW5kKHRoaXMsICdvbnBvbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdlcnJvcicsIGJpbmQodGhpcywgJ29uZXJyb3InKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsICdkZWNvZGVkJywgYmluZCh0aGlzLCAnb25kZWNvZGVkJykpKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sYXN0UGluZyA9IG5ldyBEYXRlKCk7XG4gIHRoaXMuZW1pdEFsbCgncGluZycpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBvbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdEFsbCgncG9uZycsIG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RQaW5nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdlcnJvcicsIGVycik7XG4gIHRoaXMuZW1pdEFsbCgnZXJyb3InLCBlcnIpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuc29ja2V0ID0gZnVuY3Rpb24gKG5zcCwgb3B0cykge1xuICB2YXIgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gIGlmICghc29ja2V0KSB7XG4gICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLCBvbkNvbm5lY3RpbmcpO1xuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNvY2tldC5pZCA9IHNlbGYuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHtcbiAgICAgIC8vIG1hbnVhbGx5IGNhbGwgaGVyZSBzaW5jZSBjb25uZWN0aW5nIGV2ZW50IGlzIGZpcmVkIGJlZm9yZSBsaXN0ZW5pbmdcbiAgICAgIG9uQ29ubmVjdGluZygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29ubmVjdGluZyAoKSB7XG4gICAgaWYgKCF+aW5kZXhPZihzZWxmLmNvbm5lY3RpbmcsIHNvY2tldCkpIHtcbiAgICAgIHNlbGYuY29ubmVjdGluZy5wdXNoKHNvY2tldCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNvY2tldDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gKlxuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gIHZhciBpbmRleCA9IGluZGV4T2YodGhpcy5jb25uZWN0aW5nLCBzb2NrZXQpO1xuICBpZiAofmluZGV4KSB0aGlzLmNvbm5lY3Rpbmcuc3BsaWNlKGluZGV4LCAxKTtcbiAgaWYgKHRoaXMuY29ubmVjdGluZy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzLmNsb3NlKCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGRlYnVnKCd3cml0aW5nIHBhY2tldCAlaicsIHBhY2tldCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHBhY2tldC5xdWVyeSAmJiBwYWNrZXQudHlwZSA9PT0gMCkgcGFja2V0Lm5zcCArPSAnPycgKyBwYWNrZXQucXVlcnk7XG5cbiAgaWYgKCFzZWxmLmVuY29kaW5nKSB7XG4gICAgLy8gZW5jb2RlLCB0aGVuIHdyaXRlIHRvIGVuZ2luZSB3aXRoIHJlc3VsdFxuICAgIHNlbGYuZW5jb2RpbmcgPSB0cnVlO1xuICAgIHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LCBmdW5jdGlvbiAoZW5jb2RlZFBhY2tldHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VsZi5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZW5jb2RpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7IC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG4gICAgc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG59O1xuXG4vKipcbiAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucGFja2V0QnVmZmVyLmxlbmd0aCA+IDAgJiYgIXRoaXMuZW5jb2RpbmcpIHtcbiAgICB2YXIgcGFjayA9IHRoaXMucGFja2V0QnVmZmVyLnNoaWZ0KCk7XG4gICAgdGhpcy5wYWNrZXQocGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NsZWFudXAnKTtcblxuICB2YXIgc3Vic0xlbmd0aCA9IHRoaXMuc3Vicy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpO1xuICAgIHN1Yi5kZXN0cm95KCk7XG4gIH1cblxuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuXG4gIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG59O1xuXG4vKipcbiAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9XG5NYW5hZ2VyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygnZGlzY29ubmVjdCcpO1xuICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAvLyBgb25jbG9zZWAgd2lsbCBub3QgZmlyZSBiZWNhdXNlXG4gICAgLy8gYW4gb3BlbiBldmVudCBuZXZlciBoYXBwZW5lZFxuICAgIHRoaXMuY2xlYW51cCgpO1xuICB9XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgaWYgKHRoaXMuZW5naW5lKSB0aGlzLmVuZ2luZS5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ29uY2xvc2UnKTtcblxuICB0aGlzLmNsZWFudXAoKTtcbiAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJywgcmVhc29uKTtcblxuICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5yZWNvbm5lY3RpbmcgfHwgdGhpcy5za2lwUmVjb25uZWN0KSByZXR1cm4gdGhpcztcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgIGRlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7XG4gICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICBkZWJ1Zygnd2lsbCB3YWl0ICVkbXMgYmVmb3JlIHJlY29ubmVjdCBhdHRlbXB0JywgZGVsYXkpO1xuXG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdCkgcmV0dXJuO1xuXG4gICAgICBkZWJ1ZygnYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RpbmcnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuXG4gICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgc2VsZi5vcGVuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsIGVyci5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtcbiAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIGRlbGF5KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnVwZGF0ZVNvY2tldElkcygpO1xuICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsIGF0dGVtcHQpO1xufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9uO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igc3Vic2NyaXB0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIG9uIChvYmosIGV2LCBmbikge1xuICBvYmoub24oZXYsIGZuKTtcbiAgcmV0dXJuIHtcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICBvYmoucmVtb3ZlTGlzdGVuZXIoZXYsIGZuKTtcbiAgICB9XG4gIH07XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHRvQXJyYXkgPSByZXF1aXJlKCd0by1hcnJheScpO1xudmFyIG9uID0gcmVxdWlyZSgnLi9vbicpO1xudmFyIGJpbmQgPSByZXF1aXJlKCdjb21wb25lbnQtYmluZCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDpzb2NrZXQnKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMgKGJsYWNrbGlzdGVkKS5cbiAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBldmVudHMgPSB7XG4gIGNvbm5lY3Q6IDEsXG4gIGNvbm5lY3RfZXJyb3I6IDEsXG4gIGNvbm5lY3RfdGltZW91dDogMSxcbiAgY29ubmVjdGluZzogMSxcbiAgZGlzY29ubmVjdDogMSxcbiAgZXJyb3I6IDEsXG4gIHJlY29ubmVjdDogMSxcbiAgcmVjb25uZWN0X2F0dGVtcHQ6IDEsXG4gIHJlY29ubmVjdF9mYWlsZWQ6IDEsXG4gIHJlY29ubmVjdF9lcnJvcjogMSxcbiAgcmVjb25uZWN0aW5nOiAxLFxuICBwaW5nOiAxLFxuICBwb25nOiAxXG59O1xuXG4vKipcbiAqIFNob3J0Y3V0IHRvIGBFbWl0dGVyI2VtaXRgLlxuICovXG5cbnZhciBlbWl0ID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFNvY2tldCAoaW8sIG5zcCwgb3B0cykge1xuICB0aGlzLmlvID0gaW87XG4gIHRoaXMubnNwID0gbnNwO1xuICB0aGlzLmpzb24gPSB0aGlzOyAvLyBjb21wYXRcbiAgdGhpcy5pZHMgPSAwO1xuICB0aGlzLmFja3MgPSB7fTtcbiAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIGlmIChvcHRzICYmIG9wdHMucXVlcnkpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgfVxuICBpZiAodGhpcy5pby5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc3ViRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdWJzKSByZXR1cm47XG5cbiAgdmFyIGlvID0gdGhpcy5pbztcbiAgdGhpcy5zdWJzID0gW1xuICAgIG9uKGlvLCAnb3BlbicsIGJpbmQodGhpcywgJ29ub3BlbicpKSxcbiAgICBvbihpbywgJ3BhY2tldCcsIGJpbmQodGhpcywgJ29ucGFja2V0JykpLFxuICAgIG9uKGlvLCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpXG4gIF07XG59O1xuXG4vKipcbiAqIFwiT3BlbnNcIiB0aGUgc29ja2V0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vcGVuID1cblNvY2tldC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSByZXR1cm4gdGhpcztcblxuICB0aGlzLnN1YkV2ZW50cygpO1xuICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5pby5yZWFkeVN0YXRlKSB0aGlzLm9ub3BlbigpO1xuICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgYG1lc3NhZ2VgIGV2ZW50LlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICBhcmdzLnVuc2hpZnQoJ21lc3NhZ2UnKTtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgYGVtaXRgLlxuICogSWYgdGhlIGV2ZW50IGlzIGluIGBldmVudHNgLCBpdCdzIGVtaXR0ZWQgbm9ybWFsbHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgdmFyIHBhY2tldCA9IHsgdHlwZTogcGFyc2VyLkVWRU5ULCBkYXRhOiBhcmdzIH07XG5cbiAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSAhdGhpcy5mbGFncyB8fCBmYWxzZSAhPT0gdGhpcy5mbGFncy5jb21wcmVzcztcblxuICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICBkZWJ1ZygnZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkJywgdGhpcy5pZHMpO1xuICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgIHBhY2tldC5pZCA9IHRoaXMuaWRzKys7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIH1cblxuICBkZWxldGUgdGhpcy5mbGFncztcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgdGhpcy5pby5wYWNrZXQocGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3RyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZycpO1xuXG4gIC8vIHdyaXRlIGNvbm5lY3QgcGFja2V0IGlmIG5lY2Vzc2FyeVxuICBpZiAoJy8nICE9PSB0aGlzLm5zcCkge1xuICAgIGlmICh0aGlzLnF1ZXJ5KSB7XG4gICAgICB2YXIgcXVlcnkgPSB0eXBlb2YgdGhpcy5xdWVyeSA9PT0gJ29iamVjdCcgPyBwYXJzZXFzLmVuY29kZSh0aGlzLnF1ZXJ5KSA6IHRoaXMucXVlcnk7XG4gICAgICBkZWJ1Zygnc2VuZGluZyBjb25uZWN0IHBhY2tldCB3aXRoIHF1ZXJ5ICVzJywgcXVlcnkpO1xuICAgICAgdGhpcy5wYWNrZXQoe3R5cGU6IHBhcnNlci5DT05ORUNULCBxdWVyeTogcXVlcnl9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWNrZXQoe3R5cGU6IHBhcnNlci5DT05ORUNUfSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBgY2xvc2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ2Nsb3NlICglcyknLCByZWFzb24pO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIGRlbGV0ZSB0aGlzLmlkO1xuICB0aGlzLmVtaXQoJ2Rpc2Nvbm5lY3QnLCByZWFzb24pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGlmIChwYWNrZXQubnNwICE9PSB0aGlzLm5zcCkgcmV0dXJuO1xuXG4gIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICBjYXNlIHBhcnNlci5DT05ORUNUOlxuICAgICAgdGhpcy5vbmNvbm5lY3QoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRVZFTlQ6XG4gICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQklOQVJZX0VWRU5UOlxuICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkFDSzpcbiAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQklOQVJZX0FDSzpcbiAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRElTQ09OTkVDVDpcbiAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkVSUk9SOlxuICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHBhY2tldC5kYXRhKTtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25ldmVudCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgZGVidWcoJ2VtaXR0aW5nIGV2ZW50ICVqJywgYXJncyk7XG5cbiAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgZGVidWcoJ2F0dGFjaGluZyBhY2sgY2FsbGJhY2sgdG8gZXZlbnQnKTtcbiAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKGFyZ3MpO1xuICB9XG59O1xuXG4vKipcbiAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5hY2sgPSBmdW5jdGlvbiAoaWQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2VudCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgIGlmIChzZW50KSByZXR1cm47XG4gICAgc2VudCA9IHRydWU7XG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgZGVidWcoJ3NlbmRpbmcgYWNrICVqJywgYXJncyk7XG5cbiAgICBzZWxmLnBhY2tldCh7XG4gICAgICB0eXBlOiBwYXJzZXIuQUNLLFxuICAgICAgaWQ6IGlkLFxuICAgICAgZGF0YTogYXJnc1xuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uYWNrID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB2YXIgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYWNrKSB7XG4gICAgZGVidWcoJ2NhbGxpbmcgYWNrICVzIHdpdGggJWonLCBwYWNrZXQuaWQsIHBhY2tldC5kYXRhKTtcbiAgICBhY2suYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygnYmFkIGFjayAlcycsIHBhY2tldC5pZCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdjb25uZWN0Jyk7XG4gIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG59O1xuXG4vKipcbiAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5lbWl0QnVmZmVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCB0aGlzLnJlY2VpdmVCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLnBhY2tldCh0aGlzLnNlbmRCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3NlcnZlciBkaXNjb25uZWN0ICglcyknLCB0aGlzLm5zcCk7XG4gIHRoaXMuZGVzdHJveSgpO1xuICB0aGlzLm9uY2xvc2UoJ2lvIHNlcnZlciBkaXNjb25uZWN0Jyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gKlxuICogQGFwaSBwcml2YXRlLlxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3Vicykge1xuICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnN1YnNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLnN1YnMgPSBudWxsO1xuICB9XG5cbiAgdGhpcy5pby5kZXN0cm95KHRoaXMpO1xufTtcblxuLyoqXG4gKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID1cblNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZGVidWcoJ3BlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICAgIHRoaXMucGFja2V0KHsgdHlwZTogcGFyc2VyLkRJU0NPTk5FQ1QgfSk7XG4gIH1cblxuICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICB0aGlzLmRlc3Ryb3koKTtcblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIHRoaXMub25jbG9zZSgnaW8gY2xpZW50IGRpc2Nvbm5lY3QnKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY29tcHJlc3MgZmxhZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jb21wcmVzcyA9IGZ1bmN0aW9uIChjb21wcmVzcykge1xuICB0aGlzLmZsYWdzID0gdGhpcy5mbGFncyB8fCB7fTtcbiAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICByZXR1cm4gdGhpcztcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2V1cmkgPSByZXF1aXJlKCdwYXJzZXVyaScpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDp1cmwnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVybDtcblxuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7T2JqZWN0fSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxuICogICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gdXJsICh1cmksIGxvYykge1xuICB2YXIgb2JqID0gdXJpO1xuXG4gIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gIGxvYyA9IGxvYyB8fCBnbG9iYWwubG9jYXRpb247XG4gIGlmIChudWxsID09IHVyaSkgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0O1xuXG4gIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB1cmkpIHtcbiAgICBpZiAoJy8nID09PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICBpZiAoJy8nID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICBkZWJ1ZygncHJvdG9jb2wtbGVzcyB1cmwgJXMnLCB1cmkpO1xuICAgICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSAnaHR0cHM6Ly8nICsgdXJpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBhcnNlXG4gICAgZGVidWcoJ3BhcnNlICVzJywgdXJpKTtcbiAgICBvYmogPSBwYXJzZXVyaSh1cmkpO1xuICB9XG5cbiAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gIGlmICghb2JqLnBvcnQpIHtcbiAgICBpZiAoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgIG9iai5wb3J0ID0gJzgwJztcbiAgICB9IGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgb2JqLnBvcnQgPSAnNDQzJztcbiAgICB9XG4gIH1cblxuICBvYmoucGF0aCA9IG9iai5wYXRoIHx8ICcvJztcblxuICB2YXIgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHZhciBob3N0ID0gaXB2NiA/ICdbJyArIG9iai5ob3N0ICsgJ10nIDogb2JqLmhvc3Q7XG5cbiAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAnOicgKyBvYmoucG9ydDtcbiAgLy8gZGVmaW5lIGhyZWZcbiAgb2JqLmhyZWYgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/ICcnIDogKCc6JyArIG9iai5wb3J0KSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cbiIsIi8qZ2xvYmFsIEJsb2IsRmlsZSovXG5cbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50c1xuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgZ2xvYmFsLkJsb2IgPT09ICdmdW5jdGlvbicgfHwgdG9TdHJpbmcuY2FsbChnbG9iYWwuQmxvYikgPT09ICdbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl0nO1xudmFyIHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIGdsb2JhbC5GaWxlID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkZpbGUpID09PSAnW29iamVjdCBGaWxlQ29uc3RydWN0b3JdJztcblxuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICogQW55dGhpbmcgd2l0aCBibG9icyBvciBmaWxlcyBzaG91bGQgYmUgZmVkIHRocm91Z2ggcmVtb3ZlQmxvYnMgYmVmb3JlIGNvbWluZ1xuICogaGVyZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCkge1xuICB2YXIgYnVmZmVycyA9IFtdO1xuICB2YXIgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICB2YXIgcGFjayA9IHBhY2tldDtcbiAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICByZXR1cm4ge3BhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVyc307XG59O1xuXG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICBpZiAoIWRhdGEpIHJldHVybiBkYXRhO1xuXG4gIGlmIChpc0J1ZihkYXRhKSkge1xuICAgIHZhciBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgIHJldHVybiBwbGFjZWhvbGRlcjtcbiAgfSBlbHNlIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgdmFyIG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgdmFyIG5ld0RhdGEgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5yZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgYnVmZmVycykge1xuICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSwgYnVmZmVycyk7XG4gIHBhY2tldC5hdHRhY2htZW50cyA9IHVuZGVmaW5lZDsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICByZXR1cm4gcGFja2V0O1xufTtcblxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlcikge1xuICAgIHJldHVybiBidWZmZXJzW2RhdGEubnVtXTsgLy8gYXBwcm9wcmlhdGUgYnVmZmVyIChzaG91bGQgYmUgbmF0dXJhbCBvcmRlciBhbnl3YXkpXG4gIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEFzeW5jaHJvbm91c2x5IHJlbW92ZXMgQmxvYnMgb3IgRmlsZXMgZnJvbSBkYXRhIHZpYVxuICogRmlsZVJlYWRlcidzIHJlYWRBc0FycmF5QnVmZmVyIG1ldGhvZC4gVXNlZCBiZWZvcmUgZW5jb2RpbmdcbiAqIGRhdGEgYXMgbXNncGFjay4gQ2FsbHMgY2FsbGJhY2sgd2l0aCB0aGUgYmxvYmxlc3MgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmVtb3ZlQmxvYnMgPSBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBfcmVtb3ZlQmxvYnMob2JqLCBjdXJLZXksIGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIG9iajtcblxuICAgIC8vIGNvbnZlcnQgYW55IGJsb2JcbiAgICBpZiAoKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSkge1xuICAgICAgcGVuZGluZ0Jsb2JzKys7XG5cbiAgICAgIC8vIGFzeW5jIGZpbGVyZWFkZXJcbiAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7IC8vIHRoaXMucmVzdWx0ID09IGFycmF5YnVmZmVyXG4gICAgICAgIGlmIChjb250YWluaW5nT2JqZWN0KSB7XG4gICAgICAgICAgY29udGFpbmluZ09iamVjdFtjdXJLZXldID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgYmxvYmxlc3NEYXRhID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBub3RoaW5nIHBlbmRpbmcgaXRzIGNhbGxiYWNrIHRpbWVcbiAgICAgICAgaWYoISAtLXBlbmRpbmdCbG9icykge1xuICAgICAgICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIob2JqKTsgLy8gYmxvYiAtPiBhcnJheWJ1ZmZlclxuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7IC8vIGhhbmRsZSBhcnJheVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFpc0J1ZihvYmopKSB7IC8vIGFuZCBvYmplY3RcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHBlbmRpbmdCbG9icyA9IDA7XG4gIHZhciBibG9ibGVzc0RhdGEgPSBkYXRhO1xuICBfcmVtb3ZlQmxvYnMoYmxvYmxlc3NEYXRhKTtcbiAgaWYgKCFwZW5kaW5nQmxvYnMpIHtcbiAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICB9XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGhhc0JpbiA9IHJlcXVpcmUoJ2hhcy1iaW5hcnkyJyk7XG52YXIgYmluYXJ5ID0gcmVxdWlyZSgnLi9iaW5hcnknKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IDQ7XG5cbi8qKlxuICogUGFja2V0IHR5cGVzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy50eXBlcyA9IFtcbiAgJ0NPTk5FQ1QnLFxuICAnRElTQ09OTkVDVCcsXG4gICdFVkVOVCcsXG4gICdBQ0snLFxuICAnRVJST1InLFxuICAnQklOQVJZX0VWRU5UJyxcbiAgJ0JJTkFSWV9BQ0snXG5dO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQ09OTkVDVCA9IDA7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGRpc2Nvbm5lY3RgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5ESVNDT05ORUNUID0gMTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZXZlbnRgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FVkVOVCA9IDI7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGFja2AuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkFDSyA9IDM7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGVycm9yYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVJST1IgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlICdiaW5hcnkgZXZlbnQnXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkJJTkFSWV9FVkVOVCA9IDU7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGJpbmFyeSBhY2tgLiBGb3IgYWNrcyB3aXRoIGJpbmFyeSBhcmd1bWVudHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkJJTkFSWV9BQ0sgPSA2O1xuXG4vKipcbiAqIEVuY29kZXIgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyO1xuXG4vKipcbiAqIERlY29kZXIgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG4vKipcbiAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEVuY29kZXIoKSB7fVxuXG4vKipcbiAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gaGFuZGxlIGVuY29kaW5ncyAobGlrZWx5IGVuZ2luZS53cml0ZSlcbiAqIEByZXR1cm4gQ2FsbHMgY2FsbGJhY2sgd2l0aCBBcnJheSBvZiBlbmNvZGluZ3NcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW5jb2Rlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24ob2JqLCBjYWxsYmFjayl7XG4gIGlmICgob2JqLnR5cGUgPT09IGV4cG9ydHMuRVZFTlQgfHwgb2JqLnR5cGUgPT09IGV4cG9ydHMuQUNLKSAmJiBoYXNCaW4ob2JqLmRhdGEpKSB7XG4gICAgb2JqLnR5cGUgPSBvYmoudHlwZSA9PT0gZXhwb3J0cy5FVkVOVCA/IGV4cG9ydHMuQklOQVJZX0VWRU5UIDogZXhwb3J0cy5CSU5BUllfQUNLO1xuICB9XG5cbiAgZGVidWcoJ2VuY29kaW5nIHBhY2tldCAlaicsIG9iaik7XG5cbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IG9iai50eXBlKSB7XG4gICAgZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdmFyIGVuY29kaW5nID0gZW5jb2RlQXNTdHJpbmcob2JqKTtcbiAgICBjYWxsYmFjayhbZW5jb2RpbmddKTtcbiAgfVxufTtcblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFzU3RyaW5nKG9iaikge1xuXG4gIC8vIGZpcnN0IGlzIHR5cGVcbiAgdmFyIHN0ciA9ICcnICsgb2JqLnR5cGU7XG5cbiAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBvYmoudHlwZSkge1xuICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyAnLSc7XG4gIH1cblxuICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICBpZiAob2JqLm5zcCAmJiAnLycgIT09IG9iai5uc3ApIHtcbiAgICBzdHIgKz0gb2JqLm5zcCArICcsJztcbiAgfVxuXG4gIC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuICBpZiAobnVsbCAhPSBvYmouaWQpIHtcbiAgICBzdHIgKz0gb2JqLmlkO1xuICB9XG5cbiAgLy8ganNvbiBkYXRhXG4gIGlmIChudWxsICE9IG9iai5kYXRhKSB7XG4gICAgc3RyICs9IEpTT04uc3RyaW5naWZ5KG9iai5kYXRhKTtcbiAgfVxuXG4gIGRlYnVnKCdlbmNvZGVkICVqIGFzICVzJywgb2JqLCBzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgYXMgJ2J1ZmZlciBzZXF1ZW5jZScgYnkgcmVtb3ZpbmcgYmxvYnMsIGFuZFxuICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QnVmZmVyfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBc0JpbmFyeShvYmosIGNhbGxiYWNrKSB7XG5cbiAgZnVuY3Rpb24gd3JpdGVFbmNvZGluZyhibG9ibGVzc0RhdGEpIHtcbiAgICB2YXIgZGVjb25zdHJ1Y3Rpb24gPSBiaW5hcnkuZGVjb25zdHJ1Y3RQYWNrZXQoYmxvYmxlc3NEYXRhKTtcbiAgICB2YXIgcGFjayA9IGVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgdmFyIGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuXG4gICAgYnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuICAgIGNhbGxiYWNrKGJ1ZmZlcnMpOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgfVxuXG4gIGJpbmFyeS5yZW1vdmVCbG9icyhvYmosIHdyaXRlRW5jb2RpbmcpO1xufVxuXG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRGVjb2RlcigpIHtcbiAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgIHdpdGggRGVjb2Rlci5cbiAqL1xuXG5FbWl0dGVyKERlY29kZXIucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZWNvZGVzIGFuIGVjb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHBhY2tldDtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgcGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBwYWNrZXQudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IHBhY2tldC50eXBlKSB7IC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuXG4gICAgICAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvci5yZWNvblBhY2suYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgIH1cbiAgfVxuICBlbHNlIGlmIChpc0J1ZihvYmopIHx8IG9iai5iYXNlNjQpIHsgLy8gcmF3IGJpbmFyeSBkYXRhXG4gICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO1xuICAgICAgaWYgKHBhY2tldCkgeyAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGU6ICcgKyBvYmopO1xuICB9XG59O1xuXG4vKipcbiAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZGVjb2RlU3RyaW5nKHN0cikge1xuICB2YXIgaSA9IDA7XG4gIC8vIGxvb2sgdXAgdHlwZVxuICB2YXIgcCA9IHtcbiAgICB0eXBlOiBOdW1iZXIoc3RyLmNoYXJBdCgwKSlcbiAgfTtcblxuICBpZiAobnVsbCA9PSBleHBvcnRzLnR5cGVzW3AudHlwZV0pIHtcbiAgICByZXR1cm4gZXJyb3IoJ3Vua25vd24gcGFja2V0IHR5cGUgJyArIHAudHlwZSk7XG4gIH1cblxuICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gcC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gcC50eXBlKSB7XG4gICAgdmFyIGJ1ZiA9ICcnO1xuICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09ICctJykge1xuICAgICAgYnVmICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoaSA9PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSAnLScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBhdHRhY2htZW50cycpO1xuICAgIH1cbiAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gIH1cblxuICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICBpZiAoJy8nID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgIHAubnNwID0gJyc7XG4gICAgd2hpbGUgKCsraSkge1xuICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKCcsJyA9PT0gYykgYnJlYWs7XG4gICAgICBwLm5zcCArPSBjO1xuICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwLm5zcCA9ICcvJztcbiAgfVxuXG4gIC8vIGxvb2sgdXAgaWRcbiAgdmFyIG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgaWYgKCcnICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgcC5pZCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgLS1pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHAuaWQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gICAgcC5pZCA9IE51bWJlcihwLmlkKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAganNvbiBkYXRhXG4gIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICB2YXIgcGF5bG9hZCA9IHRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgIHZhciBpc1BheWxvYWRWYWxpZCA9IHBheWxvYWQgIT09IGZhbHNlICYmIChwLnR5cGUgPT09IGV4cG9ydHMuRVJST1IgfHwgaXNBcnJheShwYXlsb2FkKSk7XG4gICAgaWYgKGlzUGF5bG9hZFZhbGlkKSB7XG4gICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyb3IoJ2ludmFsaWQgcGF5bG9hZCcpO1xuICAgIH1cbiAgfVxuXG4gIGRlYnVnKCdkZWNvZGVkICVzIGFzICVqJywgc3RyLCBwKTtcbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIHRyeVBhcnNlKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkRlY29kZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gIH1cbn07XG5cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufVxuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGFrZUJpbmFyeURhdGEgPSBmdW5jdGlvbihiaW5EYXRhKSB7XG4gIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHsgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgdmFyIHBhY2tldCA9IGJpbmFyeS5yZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICByZXR1cm4gcGFja2V0O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZmluaXNoZWRSZWNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufTtcblxuZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogZXhwb3J0cy5FUlJPUixcbiAgICBkYXRhOiAncGFyc2VyIGVycm9yOiAnICsgbXNnXG4gIH07XG59XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gaXNCdWY7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIGJ1ZmZlciBvciBhbiBhcnJheWJ1ZmZlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0J1ZihvYmopIHtcbiAgcmV0dXJuIChnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSkgfHxcbiAgICAgICAgIChnbG9iYWwuQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IEFycmF5QnVmZmVyLmlzVmlldyhvYmopKSk7XG59XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5XG5cbmZ1bmN0aW9uIHRvQXJyYXkobGlzdCwgaW5kZXgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXVxuXG4gICAgaW5kZXggPSBpbmRleCB8fCAwXG5cbiAgICBmb3IgKHZhciBpID0gaW5kZXggfHwgMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaSAtIGluZGV4XSA9IGxpc3RbaV1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbn1cbiIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2ggKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ei1fJy5zcGxpdCgnJylcbiAgLCBsZW5ndGggPSA2NFxuICAsIG1hcCA9IHt9XG4gICwgc2VlZCA9IDBcbiAgLCBpID0gMFxuICAsIHByZXY7XG5cbi8qKlxuICogUmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3BlY2lmaWVkIG51bWJlci5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbnVtIFRoZSBudW1iZXIgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG51bWJlci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgdmFyIGVuY29kZWQgPSAnJztcblxuICBkbyB7XG4gICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgIG51bSA9IE1hdGguZmxvb3IobnVtIC8gbGVuZ3RoKTtcbiAgfSB3aGlsZSAobnVtID4gMCk7XG5cbiAgcmV0dXJuIGVuY29kZWQ7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBpbnRlZ2VyIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgZ2l2ZW4gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge051bWJlcn0gVGhlIGludGVnZXIgdmFsdWUgcmVwcmVzZW50ZWQgYnkgdGhlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgdmFyIGRlY29kZWQgPSAwO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBkZWNvZGVkID0gZGVjb2RlZCAqIGxlbmd0aCArIG1hcFtzdHIuY2hhckF0KGkpXTtcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVkO1xufVxuXG4vKipcbiAqIFllYXN0OiBBIHRpbnkgZ3Jvd2luZyBpZCBnZW5lcmF0b3IuXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gQSB1bmlxdWUgaWQuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiB5ZWFzdCgpIHtcbiAgdmFyIG5vdyA9IGVuY29kZSgrbmV3IERhdGUoKSk7XG5cbiAgaWYgKG5vdyAhPT0gcHJldikgcmV0dXJuIHNlZWQgPSAwLCBwcmV2ID0gbm93O1xuICByZXR1cm4gbm93ICsnLicrIGVuY29kZShzZWVkKyspO1xufVxuXG4vL1xuLy8gTWFwIGVhY2ggY2hhcmFjdGVyIHRvIGl0cyBpbmRleC5cbi8vXG5mb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBtYXBbYWxwaGFiZXRbaV1dID0gaTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgYHllYXN0YCwgYGVuY29kZWAgYW5kIGBkZWNvZGVgIGZ1bmN0aW9ucy5cbi8vXG55ZWFzdC5lbmNvZGUgPSBlbmNvZGU7XG55ZWFzdC5kZWNvZGUgPSBkZWNvZGU7XG5tb2R1bGUuZXhwb3J0cyA9IHllYXN0O1xuIiwiLyoqXG4gKiDQnNC+0LTRg9C70Ywg0LrQsNC80LXRgNGLXG4gKi9cblxuY29uc3QgTUFYX0RFQURaT05FX1ggPSA1MDA7XG5jb25zdCBNQVhfREVBRFpPTkVfWSA9IDUwMDtcblxuLyoqXG4gKiBAY2xhc3MgQ2FtZXJhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBjYW52YXMsIGZvbGxvd2VyKXtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZGVhZFpvbmUgPSB7XG4gICAgICAgICAgICB4OiBNQVhfREVBRFpPTkVfWCxcbiAgICAgICAgICAgIHk6IE1BWF9ERUFEWk9ORV9ZXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgdGhpcy5zcGVlZCA9IDIwMDtcblxuICAgICAgICB0aGlzLmZvbGxvd2VyID0gZm9sbG93ZXI7XG4gICAgfVxuXG4gICAgcmVzaXplKCl7XG5cbiAgICAgICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gTWF0aC5mbG9vcigod2lkdGggLSB0aGlzLndpZHRoKS8yKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLnkgLSBNYXRoLmZsb29yKChoZWlnaHQgLSB0aGlzLmhlaWdodCkvMik7XG4gICAgICAgIGlmKHggPCAwKSB4ID0gMDtcbiAgICAgICAgaWYoeTwwKSB5ID0gMDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIH1cblxuICAgIHVwZGF0ZShyb29tKXtcblxuICAgICAgICBpZih0aGlzLmZvbGxvd2VyKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkZvbGxvdyhyb29tLCB0aGlzLmZvbGxvd2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEZvbGxvd2VyKGZvbGxvd2VyKXtcbiAgICAgICAgdGhpcy5mb2xsb3dlciA9IGZvbGxvd2VyO1xuICAgIH1cblxuICAgIHJ1bkZvbGxvdyhyb29tLCBwbGF5ZXIpe1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQn9C10YDQtdGB0YfQuNGC0LDQtdC8IFwi0LzQtdGA0YLQstGL0LUg0LfQvtC90YtcIlxuICAgICAgICAgKi9cblxuICAgICAgICAvLyDQkdC10YDQtdC8INC/0L7Qu9C+0LLQuNC90YMg0LrQsNC80LXRgNGLXG4gICAgICAgIHRoaXMuZGVhZFpvbmUueCA9IE1hdGguZmxvb3IodGhpcy53aWR0aC8yKTtcbiAgICAgICAgdGhpcy5kZWFkWm9uZS55ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodC8yKTtcblxuXG4gICAgICAgIC8vINCj0YfRgtC10LwsINGH0YLQviDQutC+0LzQvdCw0YLQsCDQvNC+0LbQtdGCINCx0YvRgtGMINC80LXQvdGM0YjQtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYocm9vbS53aWR0aCA8IHRoaXMuY2FudmFzLndpZHRoKXtcbiAgICAgICAgICAgIHRoaXMuZGVhZFpvbmUueCA9IE1hdGguZmxvb3IoKHJvb20ud2lkdGggLSB0aGlzLmNhbnZhcy53aWR0aCkvMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYocm9vbS5oZWlnaHQgPCB0aGlzLmNhbnZhcy5oZWlnaHQpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS55ID0gTWF0aC5mbG9vcigocm9vbS5oZWlnaHQgLSB0aGlzLmNhbnZhcy5oZWlnaHQpLzIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0J3QtSDQtNC10LvQsNC10Lwg0L7Rh9C10L3RjCDQsdC+0LvRjNGI0LjQtSBcItC80LXRgNGC0LLRi9C1INC30L7QvdGLXCJcbiAgICAgICAgaWYodGhpcy5kZWFkWm9uZS54ID4gTUFYX0RFQURaT05FX1gpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS54ID0gTUFYX0RFQURaT05FX1g7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kZWFkWm9uZS55ID4gTUFYX0RFQURaT05FX1kpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS55ID0gTUFYX0RFQURaT05FX1k7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQodC70LXQtNGD0LXQvCDQt9CwINC/0LvQtdC10YDQvtC8XG4gICAgICAgICAqL1xuICAgICAgICBpZihwbGF5ZXIueCAtIHRoaXMueCA+IHRoaXMud2lkdGggLSB0aGlzLmRlYWRab25lLngpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHBsYXllci54IC0gdGhpcy53aWR0aCArIHRoaXMuZGVhZFpvbmUueDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHBsYXllci54IDwgdGhpcy54ICsgdGhpcy5kZWFkWm9uZS54KSB7XG4gICAgICAgICAgICB0aGlzLnggPSBwbGF5ZXIueCAtIHRoaXMuZGVhZFpvbmUueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBsYXllci55IC0gdGhpcy55ID4gdGhpcy5oZWlnaHQgLSB0aGlzLmRlYWRab25lLnkpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHBsYXllci55IC0gdGhpcy5oZWlnaHQgKyB0aGlzLmRlYWRab25lLnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihwbGF5ZXIueSA8IHRoaXMueSArIHRoaXMuZGVhZFpvbmUueSkge1xuICAgICAgICAgICAgdGhpcy55ID0gcGxheWVyLnkgLSB0aGlzLmRlYWRab25lLnk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog0J3QtSDQstGL0YXQvtC00LjQvCDQt9CwINCz0YDQsNC90LjRhtGLINC60LDRgNGC0YtcbiAgICAgICAgICovXG4gICAgICAgIGlmKHRoaXMueCA8IDApXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICBpZih0aGlzLnkgPCAwKVxuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgaWYodGhpcy54ICsgdGhpcy53aWR0aCA+IHJvb20ud2lkdGgpXG4gICAgICAgICAgICB0aGlzLnggPSByb29tLndpZHRoIC0gdGhpcy53aWR0aDtcbiAgICAgICAgaWYodGhpcy55ICsgdGhpcy5oZWlnaHQgPiByb29tLmhlaWdodClcbiAgICAgICAgICAgIHRoaXMueSA9IHJvb20uaGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70Lgg0LrQsNC80LXRgNCwINCx0L7Qu9GM0YjQtSDQutCw0YDRgtGLIC0g0LTQvtCx0LDQstC40Lwg0YHQvNC10YnQtdC90LjQtVxuICAgICAgICAgKi9cbiAgICAgICAgaWYodGhpcy53aWR0aCA+IHJvb20ud2lkdGgpXG4gICAgICAgICAgICB0aGlzLnggKz0gKHRoaXMud2lkdGggLSByb29tLndpZHRoKS8yO1xuICAgICAgICBpZih0aGlzLmhlaWdodCA+IHJvb20uaGVpZ2h0KVxuICAgICAgICAgICAgdGhpcy55ICs9ICh0aGlzLmhlaWdodCAtIHJvb20uaGVpZ2h0KS8yO1xuXG5cbiAgICB9XG59IiwiLyoqXG4gKiDQmtC+0L3RgtGA0L7Qu9C70LXRgCAtINC60LvQsNCy0LjRiNC4INC4INC80YvRiNGMXG4gKiBUT0RPOiDQvNC+0LbQtdGCINC60L7QvNCw0L3QtNGLINC80LXQvdGOINGC0L7QttC1INGB0L7QsdGL0YLQuNGP0LzQuFxuICovXG5cblxuLy8g0L/QvtC00LrQu9GO0YfQuNC8INGB0L7QsdGL0YLQuNGPXG5pbXBvcnQgZXZlbnRzIGZyb20gJy4uLy4uL2V2ZW50cy5qcydcblxuXG5jb25zdCBrZXlzID0ge1xuICAgIExFRlQ6IDM3LCAvL0xlZnRcbiAgICBVUDogMzgsIC8vVXBcbiAgICBSSUdIVDogMzksIC8vUmlnaHRcbiAgICBET1dOOiA0MCwgLy9Eb3duXG5cbiAgICBBOiA2NSwgLy9BXG4gICAgVzogODcsIC8vV1xuICAgIEQ6IDY4LCAvL0RcbiAgICBTOiA4MywgLy8gU1xuXG4gICAgU1BBQ0U6IDMyLCAvL9Ce0LPQvtC90YwhXG5cbiAgICBTVEFUSVNUSUM6IDczIC8vIFwiSVwiXG5cbn07XG5cbmxldCBjbGlja1BhZCA9IG51bGw7XG5cblxuXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3AsIHNldENsaWNrUGFkfVxuXG5cbi8qKlxuICog0JfQsNC/0YPRgdGC0LjQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICovXG5mdW5jdGlvbiBzdGFydCgpIHtcblxuICAgIC8vINCV0YHQu9C4INC+0LrQvdC+INC/0L7RgtC10YDRj9C70L4g0YTQvtC60YPRgVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBvbldpbmRvd0JsdXIsIGZhbHNlKTtcblxuICAgIC8vINCd0LDQttCw0YLQsCDQutC70LDQstC40YjQsFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5ZG93biwgZmFsc2UpO1xuXG4gICAgLy8g0J7RgtC20LDRgtCwINC60LvQsNCy0LjRiNCwXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5dXAsIGZhbHNlKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCwgZmFsc2UpO1xufVxuXG5cbi8qKlxuICog0J7RgdGC0LDQvdC+0LLQuNC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKi9cbmZ1bmN0aW9uIHN0b3AoKSB7XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgb25XaW5kb3dCbHVyLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlkb3duLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIG9uS2V5dXAsIGZhbHNlKTtcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG9uTW91c2VVcCwgZmFsc2UpO1xufVxuXG5cbmZ1bmN0aW9uIHNldENsaWNrUGFkKF9jbGlja1BhZCkge1xuICAgIGNsaWNrUGFkID0gX2NsaWNrUGFkO1xufVxuXG4vKipcbiAqINCf0YDQuCDQvdCw0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXlkb3duKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXG4gICAgICAgIGNhc2Uga2V5cy5MRUZUOlxuICAgICAgICBjYXNlIGtleXMuQTpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleWRvd24nLCAnbGVmdCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5VUDpcbiAgICAgICAgY2FzZSBrZXlzLlc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ3VwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlJJR0hUOlxuICAgICAgICBjYXNlIGtleXMuRDpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleWRvd24nLCAncmlnaHQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuRE9XTjpcbiAgICAgICAgY2FzZSBrZXlzLlM6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2Rvd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuU1BBQ0U6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2ZpcmUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQvtGC0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXl1cChlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBrZXlzLkxFRlQ6XG4gICAgICAgIGNhc2Uga2V5cy5BOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnbGVmdCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5VUDpcbiAgICAgICAgY2FzZSBrZXlzLlc6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICd1cCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5SSUdIVDpcbiAgICAgICAgY2FzZSBrZXlzLkQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdyaWdodCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ET1dOOlxuICAgICAgICBjYXNlIGtleXMuUzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2Rvd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuU1BBQ0U6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdmaXJlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlNUQVRJU1RJQzpcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ3N0YXRpc3RpYycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5cbi8qKlxuICog0J/RgNC4INC60LvQuNC60LVcbiAqIEBwYXJhbSBlXG4gKi9cbmZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuXG4gICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0L/QviDRh9C10Lwg0LrQu9C40LrQsNGC0Ywg0L7RgtC/0YDQsNCy0LjQvCDRgdC+0LHRi9GC0LjQtVxuICAgIGlmKGNsaWNrUGFkKSB7XG4gICAgICAgIGxldCB4ID0gZS5jbGllbnRYICsgY2xpY2tQYWQueCxcbiAgICAgICAgICAgIHkgPSBlLmNsaWVudFkgKyBjbGlja1BhZC55O1xuICAgICAgICBldmVudHMuYWRkKCd0YXJnZXQnLCB7eDogeCwgeTogeX0pO1xuICAgICAgICBldmVudHMuYWRkKCdjbGljaycsIHt4OiB4LCB5OiB5fSk7XG5cbiAgICB9XG59XG5cbi8v0JzRi9GI0Ywg0L3QsNC20LDQu9C4XG5mdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG5cbiAgICAvLyDQldGB0LvQuCDQtdGB0YLRjCDQv9C+INGH0LXQvCDQutC70LjQutCw0YLRjCDQvtGC0L/RgNCw0LLQuNC8INGB0L7QsdGL0YLQuNC1XG4gICAgaWYoY2xpY2tQYWQpIHtcbiAgICAgICAgbGV0IHggPSBlLmNsaWVudFggKyBjbGlja1BhZC54LFxuICAgICAgICAgICAgeSA9IGUuY2xpZW50WSArIGNsaWNrUGFkLnk7XG5cbiAgICAgICAgaWYoZS5idXR0b24gPT09IDAgfHwgZS5idXR0b249PT0xKSB7XG4gICAgICAgICAgICBldmVudHMuYWRkKCdtb3VzZS1kb3duLWxlZnQnLCB7eDogeCwgeTogeX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZS5idXR0b24gPT09IDIpe1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnbW91c2UtZG93bi1yaWdodCcsIHt4OiB4LCB5OiB5fSk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuLy/QnNGL0YjRjCDQvtGC0L/Rg9GB0YLQuNC70LhcbmZ1bmN0aW9uIG9uTW91c2VVcChlKSB7XG5cbiAgICAvLyDQldGB0LvQuCDQtdGB0YLRjCDQv9C+INGH0LXQvCDQutC70LjQutCw0YLRjCDQvtGC0L/RgNCw0LLQuNC8INGB0L7QsdGL0YLQuNC1XG4gICAgaWYoY2xpY2tQYWQpIHtcbiAgICAgICAgbGV0IHggPSBlLmNsaWVudFggKyBjbGlja1BhZC54LFxuICAgICAgICAgICAgeSA9IGUuY2xpZW50WSArIGNsaWNrUGFkLnk7XG5cbiAgICAgICAgaWYoZS5idXR0b24gPT09IDAgfHwgZS5idXR0b249PT0xKSB7XG4gICAgICAgICAgICBldmVudHMuYWRkKCdtb3VzZS11cC1sZWZ0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGUuYnV0dG9uID09PSAyKXtcbiAgICAgICAgICAgIGV2ZW50cy5hZGQoJ21vdXNlLXVwLXJpZ2h0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5cbi8qKlxuICog0JXRgdC70Lgg0L7QutC90L4g0L/QvtGC0LXRgNGP0LvQviDRhNC+0LrRg9GBXG4gKi9cbmZ1bmN0aW9uIG9uV2luZG93Qmx1cigpIHtcbiAgICAvLyDQvtGC0L7QttC80LXQvCDQstGB0LUg0LrQu9Cw0LLQuNGI0LhcbiAgICBldmVudHMuYWRkKCdjb250cm9sbGVyUmVzZXQnLCB0cnVlKTtcbn0iLCJpbXBvcnQgY2hhcmFjdGVycyBmcm9tIFwiLi4vLi4vY2hhcmFjdGVyc1wiO1xuaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcblxuZXhwb3J0IGRlZmF1bHQge2FkZCwgYWRkRnJvbVNldCwgcmVtb3ZlLCByZXNldCwgc2l6ZSwgZWFjaH1cblxuY29uc3QgZW50aXRpZXMgPSBbXTtcblxuXG5mdW5jdGlvbiBhZGQoeCwgeSwgSUQsIGxpZmV0aW1lLCBmYXphKSB7XG4gICAgZW50aXRpZXMucHVzaChcbiAgICAgICAgbmV3IEVudGl0eSh4LCB5LCBjaGFyYWN0ZXJzLmdldChJRCksIGxpZmV0aW1lLCBmYXphKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGFkZEZyb21TZXQoeCwgeSwgc2V0SUQsIElELCBsaWZldGltZSwgZmF6YSkge1xuICAgIGVudGl0aWVzLnB1c2goXG4gICAgICAgIG5ldyBFbnRpdHkoeCwgeSwgY2hhcmFjdGVycy5nZXRGcm9tU2V0KHNldElELCBJRCksIGxpZmV0aW1lLCBmYXphKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShpbmRleCkge1xuICAgIGVudGl0aWVzLnNwbGljZShpbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGVudGl0aWVzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHNpemUoKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZWFjaChjYWxsYmFjaykge1xuICAgIGVudGl0aWVzLmZvckVhY2goY2FsbGJhY2spO1xufVxuIiwiLyoqXG4gKiBAY2xhc3MgRW50aXR5XG4gKlxuICovXG5pbXBvcnQge1NURVB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5e1xuXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2hhcmFjdGVyLCBsaWZldGltZSwgZmF6YSl7XG5cbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcblxuICAgICAgICAvLyDQstGA0LXQvNGPINC20LjQt9C90LhcbiAgICAgICAgdGhpcy5saWZldGltZSA9IGxpZmV0aW1lO1xuXG4gICAgICAgIHRoaXMuaW1tb3J0YWwgPSBsaWZldGltZSA+IDAuMCA/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jaGFyYWN0ZXIud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNwZWVkID0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnNwZWVkO1xuICAgICAgICBpZighdGhpcy5hbmltYXRlU3BlZWQpIHRoaXMuYW5pbWF0ZVNwZWVkID0gMTQ7XG4gICAgICAgIHRoaXMuZmF6YSA9IGZhemEgfHwgMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcblxuICAgICAgICB0aGlzLnN0YXRlID0gXCJkZWZhdWx0XCI7XG5cbiAgICAgICAgdGhpcy5kaWUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0RpZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5kaWU7XG4gICAgfVxuXG4gICAga2lsbCgpe1xuICAgICAgICB0aGlzLmRpZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKCl7XG5cbiAgICAgICAgaWYoIXRoaXMuaW1tb3J0YWwpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMubGlmZXRpbWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saWZldGltZSAtPSBTVEVQO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saWZldGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKCl7XG4gICAgICAgIC8v0JDQvdC40LzQsNGG0LjRj1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBTVEVQO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9IHRoaXMueCAtIGNhbWVyYS54IC0gdGhpcy53aWR0aC8yLFxuICAgICAgICAgICAgeSA9IHRoaXMueSAtIGNhbWVyYS55IC0gdGhpcy5oZWlnaHQvMjtcblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoY2FtZXJhLmNvbnRleHQsIHgsIHkpO1xuICAgIH1cblxuXG4gICAgZHJhd0NoYXJhY3Rlcihjb250ZXh0LCBzeCwgc3kpe1xuICAgICAgICBsZXQgeCA9IHN4IC0gKHRoaXMuY2hhcmFjdGVyLndpZHRoLXRoaXMud2lkdGgpLzIsXG4gICAgICAgICAgICB5ID0gc3kgLSAodGhpcy5jaGFyYWN0ZXIuaGVpZ2h0LXRoaXMuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLmNoYXJhY3Rlci5kcmF3KGNvbnRleHQsIHgsIHksIHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudFNwcml0ZU51bSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbn0iLCJpbXBvcnQgVW5pdCBmcm9tICcuL3VuaXQuanMnXG5cbi8qKlxuICogSGVybyAtINCz0LvQsNCy0L3Ri9C5INCz0LXRgNC+0LlcbiAqL1xuXG4vKipcbiAqINCu0L3QuNGCINCz0LXRgNC+0Y9cbiAqIEB0eXBlIHtVbml0fG51bGx9XG4gKi9cbmxldCB1bml0ID0gbnVsbDtcblxuLyoqXG4gKiDQodC60L7RgNC+0YHRgtGMINC/0LXRgNC10LzQtdGJ0LXQvdC40Y9cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmxldCBzcGVlZCA9IDA7XG5cblxuZXhwb3J0IGRlZmF1bHQge3VuaXQsIHNwZWVkLCBhbmltYXRlLCBkcmF3fVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICAgIHRoaXMudW5pdC5hbmltYXRlKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXcoY2FtZXJhKSB7XG4gICAgdGhpcy51bml0LmRyYXcoY2FtZXJhKTtcbn1cbiIsImltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgbG9nIGZyb20gXCIuLi8uLi9sb2dzXCJcbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4vY2FtZXJhXCI7XG5pbXBvcnQgdW5pdHMgZnJvbSBcIi4vdW5pdHNcIjtcbmltcG9ydCBldmVudHMgZnJvbSBcIi4uLy4uL2V2ZW50c1wiO1xuaW1wb3J0IGhlcm8gZnJvbSAnLi9oZXJvJztcbmltcG9ydCBVbml0IGZyb20gXCIuL3VuaXRcIjtcbmltcG9ydCBUZWxlcG9ydCBmcm9tIFwiLi90ZWxlcG9ydFwiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4vcm9vbVwiO1xuaW1wb3J0IExvb3QgZnJvbSBcIi4vbG9vdFwiO1xuaW1wb3J0IHVpIGZyb20gXCIuL3VpL3VpXCI7XG5pbXBvcnQgY29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5pbXBvcnQgc291bmRzIGZyb20gXCIuLi8uLi9zb3VuZHNcIjtcbmltcG9ydCBlbnRpdGllcyBmcm9tIFwiLi9lbnRpdGllc1wiO1xuXG4vKipcbiAqINCe0YHQvdC+0LLQvdCw0Y8g0YHRhtC10L3QsCAtINGB0L7QsdGB0YLQstC10L3QvdC+INC40LPRgNCwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcH1cblxuLy8g0JfQsNC/0YPRgdGC0LjQvCDQv9C+INC+0LrQvtC90YfQsNC90LjQuCDQuNCz0YDRi1xubGV0XG4gICAgZmluYWxDYWxsYmFjayA9IG51bGwsXG4gICAgaW50ZXJ2YWwgPSBudWxsO1xuXG5sZXQgcm9vbXMgPSB7fSxcbiAgICByb29tX2lkID0gbnVsbCxcbiAgICByb29tID0gbnVsbCxcblxuICAgIC8vINCa0LDQvNC10YDQsC4g0KHQvtCy0LzQtdGJ0LXQvdCwINGB0L4g0LLRitGO0L/QvtGA0YLQvtC8XG4gICAgY2FtZXJhID0gbnVsbCxcbiAgICBsb290cyA9IHt9LFxuICAgIHRlbGVwb3J0cyA9IHt9O1xuXG5cbmZ1bmN0aW9uIHN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgZmluYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgcm9vbXMgPSB7fTtcblxuICAgIC8vINCi0LXQutGD0YnQsNGPINC60L7QvNC90LDRgtCwLiBpZCDQuCDRgdCw0LzQsFxuICAgIHJvb21faWQgPSBudWxsO1xuICAgIHJvb20gPSBudWxsO1xuXG4gICAgLy8g0JLQtdGB0Ywg0LvRg9GCXG4gICAgbG9vdHMgPSB7fTtcblxuICAgIC8vINCi0LXQu9C10L/QvtGA0YLRi1xuICAgIHRlbGVwb3J0cyA9IHt9O1xuXG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAvLyDQodC+0LfQtNCw0LTQuNC8INC60LDQvNC10YDRgyDQv9C+IFwi0LrQsNC90LLQtVwiXG4gICAgY2FtZXJhID0gbmV3IENhbWVyYSgwLCAwLCBjYW52YXMpO1xuICAgIC8vINC40LfQvNC10L3Rj9C10Lwg0LrQsNC80LXRgNGDINC/0L7QtCDQvtC60L3QvlxuICAgIGNhbWVyYS5yZXNpemUoKTtcblxuICAgIC8v0J/RgNC4INGA0LXRgdCw0LnQt9C1INC+0LrQvdCwINCx0YDQsNGD0LfQtdGA0LAgLSDQuNC30LzQtdC90Y/QtdC8INC60LDQvNC10YDRgyDQv9C+0LQg0L7QutC90L5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge2NhbWVyYS5yZXNpemUoKTt9KTtcblxuXG4gICAgZXZlbnRzLm9uKFwiZGlzY29ubmVjdFwiLCAoKT0+e1xuICAgICAgICBzdG9wKCk7XG4gICAgICAgIHVuaXRzLnJlc2V0KCk7XG4gICAgICAgIGxvb3RzID0ge307XG4gICAgICAgIGhlcm8udW5pdCA9IG51bGw7XG4gICAgICAgIGVudGl0aWVzLnJlc2V0KCk7XG4gICAgICAgIHVpLnRvcDEwLnN0b3AoKTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInJlY29ubmVjdFwiLCBvblJlY29ubmVjdCk7XG4gICAgZXZlbnRzLm9uKFwicm9vbVwiLCBvblJvb20pO1xuICAgIGV2ZW50cy5vbihcImhlcm9cIiwgb25IZXJvKTtcbiAgICBldmVudHMub24oXCJzb3VuZFwiLCBvblNvdW5kKTtcblxuICAgIGV2ZW50cy5vbihcImNsaWNrXCIsIChldmVudE5hbWUsIHBvcyk9PntcbiAgICAgICAgaWYocG9zKSB7XG4gICAgICAgICAgICBlbnRpdGllcy5hZGQocG9zLngsIHBvcy55KzEsICdwb2ludGVyJywgLjM1KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uKFwiZW50aXR5XCIsIChldmVudE5hbWUsIHR5cGUsIGRhdGEpPT57XG4gICAgICAgIGlmKHR5cGU9PT1cInJlbW92ZS1jb2luXCIgJiYgZGF0YS5yb29tX2lkPT09cm9vbV9pZCl7XG5cbiAgICAgICAgICAgIGVudGl0aWVzLmFkZChkYXRhLngsIGRhdGEueSwgJ2Jvb20xJywgLjY1KTtcblxuICAgICAgICAgICAgLy8gZW50aXRpZXMuYWRkKGRhdGEueCwgZGF0YS55LCAnYm9vbTInLCAuNTUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlPT09XCJ0ZWxlcG9ydC10YXJnZXRcIiAmJiBkYXRhLnJvb21faWQ9PT1yb29tX2lkKXtcblxuICAgICAgICAgICAgZW50aXRpZXMuYWRkKGRhdGEueCwgZGF0YS55LCAnYmFyaWVyJywgMC42NSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0eXBlPT09XCJwdXNoLWVmZmVjdFwiICYmIGRhdGEucm9vbV9pZD09PXJvb21faWQpe1xuXG4gICAgICAgICAgICBlbnRpdGllcy5hZGQoZGF0YS54LCBkYXRhLnksICdwdXNoMScsIDAuMTUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB1aS5za2lsbHMuc3RhcnQoKTtcblxuICAgIHVpLnRvcDEwLnN0YXJ0KCk7XG5cblxuICAgIC8qKlxuICAgICAqINCe0YHQvdC+0LLQvdC+0Lkg0YbQuNC60LtcbiAgICAgKi9cbiAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAvLyDQn9C10YDQtdC80LXRidC10L3QuNC1LCDRg9C/0YDQsNCy0LvRj9C10LzQvtC1INC90LAg0LrQu9C40LXQvdGC0LVcbiAgICAgICAgdXBkYXRlKCk7XG5cblxuICAgICAgICAvLyDQntGC0YDQuNGB0L7QstC60LBcbiAgICAgICAgZHJhdyhjYW1lcmEpO1xuXG5cbiAgICAgICAgLy8g0JDQvdC40LzQsNGG0LjRj1xuICAgICAgICBhbmltYXRlKCk7XG5cblxuICAgIH0sIGNvbnN0YW50cy5JTlRFUlZBTCk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgZXZlbnRzLm9mZihcInJlY29ubmVjdFwiLCBvblJlY29ubmVjdCk7XG4gICAgZXZlbnRzLm9mZihcInJvb21cIiwgb25Sb29tKTtcbiAgICBldmVudHMub2ZmKFwiaGVyb1wiKTtcbiAgICBldmVudHMub2ZmKFwic291bmRcIik7XG5cbiAgICBldmVudHMub2ZmKFwiY2xpY2tcIik7XG4gICAgZXZlbnRzLm9mZihcImNvaW5cIik7XG5cbiAgICB1aS5za2lsbHMuc3RvcCgpO1xuXG4gICAgdWkudG9wMTAuc3RvcCgpO1xuXG4gICAgZmluYWxDYWxsYmFjaygpO1xufVxuXG5mdW5jdGlvbiBvblJlY29ubmVjdChldmVudCwgdHlwZSwgZGF0YSkge1xuICAgIGxvZygn0L7RgiDRgdC10YDQstC10YDQsCDQv9C+0YHRgtGD0L/QuNC7IHJlY29ubmVjdCcpO1xuICAgIHVuaXRzLnJlc2V0KCk7XG4gICAgbG9vdHMgPSB7fTtcbiAgICBoZXJvLnVuaXQgPSBudWxsO1xufVxuXG4vKipcbiAqINCh0L7QsdGL0YLQuNGPIFwicm9vbVwiXG4gKiBAcGFyYW0gZXZlbnRcbiAqIEBwYXJhbSB0eXBlXG4gKiBAcGFyYW0gZGF0YVxuICovXG5mdW5jdGlvbiBvblJvb20oZXZlbnQsIHR5cGUsIGRhdGEpIHtcblxuICAgIC8vINCf0L7Qu9GD0YfQtdC90LjQtSDQutC+0LzQvdCw0YLRi1xuICAgIGlmKHR5cGU9PT1cImNoYW5nZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5yb29tKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIHJvb20gPSBkYXRhLnJvb207XG5cbiAgICAgICAgICAgIGlmIChyb29tLklEPT11bmRlZmluZWQgfHwgIXJvb20ud2lkdGggfHwgIXJvb20uaGVpZ2h0IHx8IHJvb20uZW52aXJvbm1lbnRfaWQ9PXVuZGVmaW5lZCkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHJvb21Jbml0KHJvb20pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0JrQvtC80L3QsNGC0YsuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQuNCz0YDQvtC60LBcbiAgICBpZih0eXBlPT09XCJwbGF5ZXItY3JlYXRlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgY29uc3QgdW5pdCA9IG5ldyBVbml0KGluZm8pO1xuICAgICAgICAgICAgdW5pdHMuYWRkKGluZm8uSUQsIHVuaXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LjQs9GA0L7QutCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L7QsSDQuNCz0YDQvtC60LVcbiAgICBpZih0eXBlPT09XCJwbGF5ZXItaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHMuaXRlbShpbmZvLklEKTtcbiAgICAgICAgICAgIGlmKHVuaXQpIHtcblxuICAgICAgICAgICAgICAgIHVuaXQuc2V0KGluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDQuNCz0YDQvtC60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNCz0YDQvtC6INGD0YjQtdC7XG4gICAgaWYodHlwZT09PVwicGxheWVyLWxlYXZlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLklEKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdW5pdHMucmVtb3ZlKGRhdGEuSUQpO1xuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINGD0LTQsNC70LXQvdC40Y8g0LjQs9GA0L7QutCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQu9GD0YLQsFxuICAgIGlmKHR5cGU9PT1cImxvb3QtY3JlYXRlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmZvLklEIGluIGxvb3RzPT09ZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICBsb290c1tpbmZvLklEXSA9IG5ldyBMb290KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGluZm8uY2hhcmFjdGVyX2lkLCBpbmZvLklELCBpbmZvLndpZHRoLCBpbmZvLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsb290c1tpbmZvLklEXS5zZXQoaW5mby5yb29tX2lkLCBpbmZvLngsIGluZm8ueSwgaW5mby5jaGFyYWN0ZXJfaWQsIGluZm8uSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC70YPRgtCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0KHQvtC30LTQsNC90LjQtSDQtNC10LrQvtGA0LDRhtC40LhcbiAgICBpZih0eXBlPT09XCJjYXJ0b29uLWNyZWF0ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcHJpdGVzZXRfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcHJpdGVfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBlbnRpdGllcy5hZGRGcm9tU2V0KGluZm8ueCwgaW5mby55LCBpbmZvLnNwcml0ZXNldF9pZCwgaW5mby5zcHJpdGVfaWQsIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LTQtdC60L7RgNCw0YbQuNC4LiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0LvRg9GC0LVcbiAgICBpZih0eXBlPT09XCJsb290LWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKGluZm8ucm9vbV9pZD09cm9vbV9pZCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSUQgaW4gbG9vdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vdHNbaW5mby5JRF0uc2V0KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGluZm8uY2hhcmFjdGVyX2lkLCBpbmZvLklEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQu9GD0YLQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCj0LTQsNC70LXQvdC40LUg0LvRg9GC0LBcbiAgICBpZih0eXBlPT09XCJsb290LXJlbW92ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKGluZm8ucm9vbV9pZD09PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmZvLklEIGluIGxvb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBsb290c1tpbmZvLklEXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQu9GD0YLQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INGC0LXQu9C10L/QvtGA0YLQsNGFXG4gICAgaWYodHlwZT09XCJ0ZWxlcG9ydC1pbmZvXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihpbmZvLnJvb21faWQ9PXJvb21faWQpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmZvLklEIGluIHRlbGVwb3J0cykge1xuICAgICAgICAgICAgICAgICAgICB0ZWxlcG9ydHNbaW5mby5JRF0uc2V0KGluZm8uc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGC0LXQu9C10L/QvtGA0YLQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0L3QvtCy0L7Qs9C+INC80L7QsdCwXG4gICAgaWYodHlwZT09XCJucGMtY3JlYXRlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmNoYXJhY3Rlcl9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zdGF0ZSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cblxuICAgICAgICAgICAgY29uc3QgdW5pdCA9IG5ldyBVbml0KGluZm8pO1xuICAgICAgICAgICAgdW5pdHMuYWRkKGluZm8uSUQsIHVuaXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LzQvtCx0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDQvNC+0LHQtVxuICAgIGlmKHR5cGU9PVwibnBjLWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgbGV0IHVuaXQgPSB1bml0cy5pdGVtKGluZm8uSUQpO1xuICAgICAgICAgICAgaWYodW5pdCkge1xuXG4gICAgICAgICAgICAgICAgdW5pdC5zZXQoaW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC+0LHQvdC+0LLQu9C10L3QuNGPINC80L7QsdCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vINCj0LTQsNC70LXQvdC40LUg0LzQvtCx0LBcbiAgICBpZih0eXBlPT09XCJucGMtcmVtb3ZlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdW5pdHMucmVtb3ZlKGluZm8uSUQpO1xuXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINGD0LTQsNC70LXQvdC40Y8g0LzQvtCx0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkhlcm8oZXZlbnQsIHR5cGUsIGRhdGEpIHtcblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LPQtdGA0L7RjyDQv9GA0Lgg0LLRhdC+0LTQtVxuICAgIGlmKHR5cGU9PVwiaGVyby1jcmVhdGVcIikge1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGlmICghZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jb2luc19jb3VudCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWx1cENvdW50ZXIgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcGVlZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGlmKCFoZXJvLnVuaXQpIHtcbiAgICAgICAgICAgICAgICBoZXJvLnVuaXQgPSBuZXcgVW5pdChpbmZvLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaGVyby51bml0LnNldChpbmZvKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5pdHMuYWRkKCdbJytpbmZvLklEKyddJywgaGVyby51bml0KTtcblxuICAgICAgICAgICAgaGVyby5zcGVlZCA9IGluZm8uc3BlZWQ7XG5cbiAgICAgICAgICAgIHVpLmhlcm9JbmZvLnN0YXJ0KCk7XG4gICAgICAgICAgICB1aS5oZXJvSW5mby51cGRhdGUoaW5mbyk7XG5cbiAgICAgICAgICAgIHVpLndhaXRTY3JlZW4uaGlkZSgpO1xuXG4gICAgICAgICAgICBjb250cm9sbGVyLnN0YXJ0KCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnNldENsaWNrUGFkKGNhbWVyYSk7XG5cbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQutGD0YnQsNGPINC60L7QvNC90LDRgtCwINC+0YLRgdGD0YLRgdGC0LLRg9C10YIg0LjQu9C4INC90LUg0YLQsCAtINGI0LvQtdC8INC90LAg0YHQtdGA0LLQtdGAINC30LDQv9GA0L7RgVxuICAgICAgICAgICAgaWYoIXJvb21faWQgfHwgcm9vbV9pZCAhPSBpbmZvLnJvb21faWQpIHtcbiAgICAgICAgICAgICAgICByb29tX2lkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKCduZWVkLXJvb20nLCBpbmZvLnJvb21faWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FtZXJhICYmIGNhbWVyYS5zZXRGb2xsb3dlcihoZXJvLnVuaXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDRgdC+0LfQtNCw0L3QuNGPINCT0LXRgNC+0Y8uIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDQs9C10YDQvtC1XG4gICAgaWYodHlwZT09XCJoZXJvLWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY29pbnNfY291bnQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsdXBDb3VudGVyID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3BlZWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBoZXJvLnVuaXQuc2V0KGluZm8pO1xuXG4gICAgICAgICAgICBoZXJvLnNwZWVkID0gaW5mby5zcGVlZDtcblxuICAgICAgICAgICAgdWkuaGVyb0luZm8udXBkYXRlKGluZm8sIGluZm8uSUQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDQk9C10YDQvtGPLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gb25Tb3VuZChldmVudCwgdHlwZSwgZGF0YSkge1xuICAgIC8vINC30LLRg9C60L7QstGL0LUg0YPQstC10LTQvtC80LvQtdC90LjRj1xuICAgIGlmKHR5cGU9PVwibm90aWNlXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmKCFkYXRhLmluZm8pIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICB2YXIgaW5mbyA9IGRhdGEuaW5mbztcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uSUQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihoZXJvICYmIGhlcm8udW5pdCAmJiBoZXJvLnVuaXQucm9vbV9pZCA9PSBpbmZvLnJvb21faWQpIHsgLy9UT0RPOiDQvdC1INGO0L3QuNGCLCDQsCDQutCw0LzQtdGA0LBcbiAgICAgICAgICAgICAgICBpZihpbmZvLklEIGluIHNvdW5kcykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86INC/0L4gaW5mby54LCBpbmZvLnkg0L7Qv9GA0LXQtNC10LvRj9GC0Ywg0LrQsNC6INC00LDQu9C10LrQviDQvtGCIGhlcm8g0Lgg0LTQtdC70LDRgtGMINCz0YDQvtC80LrQvtGB0YLRjFxuICAgICAgICAgICAgICAgICAgICBzb3VuZHNbaW5mby5JRF0ucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0LfQstGD0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog0J/QtdGA0LXQvNC10YnQtdC90LjQtSDQvdCwINC60LvQuNC10L3RgtC1XG4gKiAg0YLQviwg0YfRgtC+INC90LUg0YPQv9GA0LDQstC70Y/QtdGC0YHRjyDRgSDRgdC10YDQstC10YDQsC4g0J3QsNC/0YDQuNC80LXRgCDQutCw0LzQtdGA0LBcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKCl7XG5cbiAgICAvL9Ca0LDQvNC10YDQsFxuICAgIGNhbWVyYSAmJiBjYW1lcmEudXBkYXRlKHJvb20pO1xuXG4gICAgLy/QodGD0YnQvdC+0YHRgtC4XG4gICAgZW50aXRpZXMuZWFjaCgoZW50aXR5LCBpbmRleCk9PntcblxuICAgICAgICBlbnRpdHkudXBkYXRlKCk7XG5cbiAgICAgICAgLy/Qo9C00LDQu9C40Lwg0L7RgtGA0LDQsdC+0YLQsNCy0YjQuNC1INGB0YPRidC90L7RgdGC0LhcbiAgICAgICAgaWYoZW50aXR5LmlzRGllKCkpe1xuICAgICAgICAgICAgZW50aXRpZXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cblxuLyoqXG4gKiDQkNC90LjQvNCw0YbQuNGPXG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGUoKXtcblxuICAgIC8v0K7QvdC40YLRiyAo0LLQutC70Y7Rh9Cw0Y8g0YHQsNC80L7Qs9C+INCz0LXRgNC+0Y8pXG4gICAgZm9yIChjb25zdCB1bml0IG9mIHVuaXRzLnRvQXJyYXkoKSkge1xuICAgICAgICBpZih1bml0LnJvb21faWQ9PXJvb21faWQpIHtcbiAgICAgICAgICAgIHVuaXQuYW5pbWF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/Qm9GD0YJcbiAgICBmb3IgKGxldCBpIGluIGxvb3RzKSB7XG4gICAgICAgIGxvb3RzW2ldLmFuaW1hdGUoY29uc3RhbnRzLlNURVApO1xuICAgIH1cblxuICAgIC8v0KLQtdC70LXQv9C+0YDRgtGLXG4gICAgZm9yIChsZXQgaSBpbiB0ZWxlcG9ydHMpIHtcbiAgICAgICAgdGVsZXBvcnRzW2ldLmFuaW1hdGUoY29uc3RhbnRzLlNURVApO1xuICAgIH1cblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goIChlbnRpdHkpID0+IHtcbiAgICAgICAgZW50aXR5LmFuaW1hdGUoKTtcbiAgICB9KTtcblxufVxuXG5cbi8qKlxuICog0J7RgtGA0LjRgdC+0LLQutCwINC90LAg0LrQsNC80LXRgNGDXG4gKiBAcGFyYW0gY2FtZXJhXG4gKiBUT0RPOiDQv9C+0YDRj9C00L7QuiDQvtGC0YDQuNGB0L7QstC60LghXG4gKi9cbmZ1bmN0aW9uIGRyYXcoY2FtZXJhKXtcblxuICAgIC8vINCa0L7QvNC90LDRgtCwXG4gICAgcm9vbSAmJiByb29tLmRyYXcoY2FtZXJhKTtcblxuICAgIC8vINCi0LXQu9C10L/QvtGA0YLRi1xuICAgIGZvciAobGV0IGkgaW4gdGVsZXBvcnRzKSB7XG4gICAgICAgIHRlbGVwb3J0c1tpXS5kcmF3KGNhbWVyYSk7XG4gICAgfVxuXG5cbiAgICBsZXQgcmVuZGVyQXJyYXkgPSBbXTtcblxuICAgIC8vINCb0YPRglxuICAgIGZvciAobGV0IGkgaW4gbG9vdHMpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBsb290c1tpXTtcbiAgICAgICAgcmVuZGVyQXJyYXkucHVzaCh7eTogaXRlbS55LCBpdGVtOiBpdGVtfSk7XG4gICAgfVxuXG4gICAgLy/QrtC90LjRgtGLXG4gICAgZm9yIChsZXQgdW5pdCBvZiB1bml0cy50b0FycmF5KCkpIHtcbiAgICAgICAgaWYodW5pdC5yb29tX2lkPT1yb29tX2lkKSB7XG4gICAgICAgICAgICByZW5kZXJBcnJheS5wdXNoKHt5OiB1bml0LnksIGl0ZW06IHVuaXR9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgIHJlbmRlckFycmF5LnB1c2goe3k6IGl0ZW0ueSwgaXRlbTogaXRlbX0pO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyQXJyYXkuc29ydCgoYSwgYik9PntcbiAgICAgICAgcmV0dXJuIGEueSAtIGIueTtcbiAgICB9KTtcblxuICAgIGZvcihsZXQgaSBpbiByZW5kZXJBcnJheSl7XG4gICAgICAgIHJlbmRlckFycmF5W2ldLml0ZW0uZHJhdyhjYW1lcmEpO1xuICAgIH1cblxufVxuXG5cblxuLyoqXG4gKiDQo9GB0YLQsNC90L7QstC60LAg0L7RgtC+0LHRgNCw0LbQsNC10LzQvtC5INC60L7QvNC90LDRgtGLXG4gKiBAcGFyYW0gSURcbiAqIEBwYXJhbSB3aWR0aFxuICogQHBhcmFtIGhlaWdodFxuICogQHBhcmFtIGVudmlyb25tZW50X2lkXG4gKi9cbmZ1bmN0aW9uIHJvb21Jbml0KHNldHRpbmdzKXtcblxuICAgIC8v0JfQsNGH0LjRgdGC0LjQvCDQtdGB0LvQuCDQvdC1INCy0L/QtdGA0LLQvtC5XG4gICAgZm9yKGxldCBpIGluIGxvb3RzKXsgZGVsZXRlIGxvb3RzW2ldO31cbiAgICBmb3IobGV0IGkgaW4gdGVsZXBvcnRzKXsgZGVsZXRlIHRlbGVwb3J0c1tpXTt9XG4gICAgbG9vdHMgPSB7fTtcbiAgICB0ZWxlcG9ydHMgPSB7fTtcbiAgICByb29tID0gbnVsbDtcbiAgICBlbnRpdGllcy5yZXNldCgpO1xuXG5cbiAgICByb29tX2lkID0gc2V0dGluZ3MuSUQ7XG5cbiAgICAvLyDQodC00LXQu9Cw0LXQvCDQutC+0LzQvdCw0YLRgyDQuNC70Lgg0LLQvtC30LzQtdC8INC40Lcg0LrQtdGI0LBcbiAgICBpZihzZXR0aW5ncy5JRCBpbiByb29tcyl7XG4gICAgICAgIHJvb20gPSByb29tc1tzZXR0aW5ncy5JRF07XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJvb20gPSBuZXcgUm9vbShzZXR0aW5ncy53aWR0aCwgc2V0dGluZ3MuaGVpZ2h0LCBzZXR0aW5ncy5lbnZpcm9ubWVudF9pZCwgc2V0dGluZ3MuZW50aXRpZXNfbnVtKTtcbiAgICAgICAgcm9vbXNbc2V0dGluZ3MuSURdID0gcm9vbTtcbiAgICB9XG5cbiAgICBpZignY2FydG9vbnMnIGluIHNldHRpbmdzKXtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2Ygc2V0dGluZ3MuY2FydG9vbnMpe1xuICAgICAgICAgICAgZW50aXRpZXMuYWRkRnJvbVNldChpdGVtLngsIGl0ZW0ueSwgaXRlbS5zcHJpdGVzZXRfaWQsIGl0ZW0uc3ByaXRlX2lkLCAwLCBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKCdsb290JyBpbiBzZXR0aW5ncyl7XG4gICAgICAgIGZvcihjb25zdCBpdGVtIG9mIHNldHRpbmdzLmxvb3Qpe1xuXG4gICAgICAgICAgICBsb290c1tpdGVtLklEXSA9IG5ldyBMb290KHJvb21faWQsIGl0ZW0ueCwgaXRlbS55LCBpdGVtLmNoYXJhY3Rlcl9pZCwgaXRlbS5JRCwgaXRlbS53aWR0aCwgaXRlbS5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoJ3RlbGVwb3J0cycgaW4gc2V0dGluZ3Mpe1xuICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBzZXR0aW5ncy50ZWxlcG9ydHMpe1xuXG4gICAgICAgICAgICB0ZWxlcG9ydHNbaXRlbS5JRF0gPSBuZXcgVGVsZXBvcnQocm9vbV9pZCwgaXRlbS54LCBpdGVtLnksIGl0ZW0uY2hhcmFjdGVyX2lkLCBpdGVtLklELCBpdGVtLnRhcmdldCwgaXRlbS5zdGF0ZSwgaXRlbS53aWR0aCwgaXRlbS5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuLi8uLi9jaGFyYWN0ZXJzXCI7XG5cbi8qKlxuICogQGNsYXNzIExvb3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHJvb21faWQsIHgsIHksIGNoYXJhY3Rlcl9pZCwgSUQsIHdpZHRoLCBoZWlnaHQpe1xuICAgICAgICB0aGlzLklEID0gSUQ7XG4gICAgICAgIHRoaXMucm9vbV9pZCA9IHJvb21faWQ7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcnMuZ2V0KGNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoJ2NvaW5fZ29sZCcpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCc7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDtcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICB9XG5cbiAgICBzZXQocm9vbV9pZCwgeCwgeSwgY2hhcmFjdGVyX2lkLCBJRCl7XG4gICAgICAgIHRoaXMuSUQgPSBJRDtcbiAgICAgICAgdGhpcy5yb29tX2lkID0gcm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChjaGFyYWN0ZXJfaWQpIHx8IGNoYXJhY3RlcnMuZ2V0KCdjb2luX2dvbGQnKTtcbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCdcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9ICh0aGlzLngtKHRoaXMuY2hhcmFjdGVyLndpZHRoLXRoaXMud2lkdGgpLzIpIC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gKHRoaXMueS10aGlzLmNoYXJhY3Rlci5oZWlnaHQrdGhpcy5oZWlnaHQpIC0gY2FtZXJhLnk7XG5cblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY2FtZXJhLmNvbnRleHQsIHgsIHksIHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudFNwcml0ZU51bSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQv9GP0YLQvdC+INC60L7Qu9C70LjQt9C40LlcbiAgICAgICAgLypjYW1lcmEuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSw2NywwLjQpXCI7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxSZWN0KHRoaXMueC1jYW1lcmEueCwgdGhpcy55LWNhbWVyYS55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlY3QoeCwgeSwgdGhpcy5jaGFyYWN0ZXIud2lkdGgsIHRoaXMuY2hhcmFjdGVyLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZXN0b3JlKCk7Ki9cbiAgICB9XG5cbiAgICBhbmltYXRlKHN0ZXApe1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBzdGVwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy/QndCw0YHRgtGA0L7QudC60Lgg0YDQsNC90LTQvtC80L3Ri9GFINGG0LLQtdGC0L7QsiDQutC+0LzQvdCw0YLRi1xuXG5pbXBvcnQgc3ByaXRlcyBmcm9tIFwiLi4vLi4vc3ByaXRlc1wiO1xuXG5jb25zdCBFTlZJUk9OTUVOVFMgPSB7XG4gICAgMDoge1xuICAgICAgICByOiB7c3RhcnQ6IDEyMCwgcmFuZDogMTB9LFxuICAgICAgICBnOiB7c3RhcnQ6IDEyMCwgcmFuZDogMTZ9LFxuICAgICAgICBiOiB7c3RhcnQ6IDEwMCwgcmFuZDogNX0sXG4gICAgICAgIC8vIGVudGl0aWVzU3ByaXRlczogXCJncmFzc1wiLFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiYW5kc3RvbmVzXCIsXG4gICAgfSxcbiAgICAxOiB7XG4gICAgICAgIHI6IHtzdGFydDogMjM5LCByYW5kOiAxNn0sXG4gICAgICAgIGc6IHtzdGFydDogMjEwLCByYW5kOiAzM30sXG4gICAgICAgIGI6IHtzdGFydDogMTAwLCByYW5kOiAyNX0sXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJkZXNlcnRcIixcbiAgICB9LFxuICAgIDI6IHtcbiAgICAgICAgcjoge3N0YXJ0OiAyMTAsIHJhbmQ6IDQ1fSxcbiAgICAgICAgZzoge3N0YXJ0OiAzMCwgcmFuZDogNzV9LFxuICAgICAgICBiOiB7c3RhcnQ6IDMwLCByYW5kOiA3NX0sXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJjb29sX3BsYW50c1wiLFxuICAgIH0sXG4gICAgMzoge1xuICAgICAgICByOiB7c3RhcnQ6IDEwLCByYW5kOiAxMn0sXG4gICAgICAgIGc6IHtzdGFydDogMTMwLCByYW5kOiAyMH0sXG4gICAgICAgIGI6IHtzdGFydDogMjEwLCByYW5kOiA0NX0sXG4gICAgICAgIGVudGl0aWVzU3ByaXRlczogXCJidXNoc1wiLFxuICAgIH0sXG4gICAgNDoge1xuICAgICAgICByOiB7c3RhcnQ6IDE1MCwgcmFuZDogMTJ9LFxuICAgICAgICBnOiB7c3RhcnQ6IDkwLCByYW5kOiAyMH0sXG4gICAgICAgIGI6IHtzdGFydDogNDAsIHJhbmQ6IDEyfSxcbiAgICAgICAgZW50aXRpZXNTcHJpdGVzOiBcInRyZWVzXCIsXG4gICAgfSxcbiAgICA1OiB7XG4gICAgICAgIHI6IHtzdGFydDogMCwgcmFuZDogMzB9LFxuICAgICAgICBnOiB7c3RhcnQ6IDAsIHJhbmQ6IDV9LFxuICAgICAgICBiOiB7c3RhcnQ6IDAsIHJhbmQ6IDV9LFxuICAgICAgICBlbnRpdGllc1Nwcml0ZXM6IFwiZGVhZF9wbGFudHNcIixcbiAgICB9LFxufTtcbi8qKlxuICogQGNsYXNzIFJvb21cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIGVudmlyb25tZW50X2lkLCBlbnRpdGllc19udW0pe1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmVudmlyb25tZW50X2lkID0gZW52aXJvbm1lbnRfaWQ7XG4gICAgICAgIHRoaXMuZW50aXRpZXNfbnVtID0gZW50aXRpZXNfbnVtO1xuICAgICAgICB0aGlzLmltYWdlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlKHRoaXMuZW50aXRpZXNfbnVtKTtcbiAgICB9XG5cbiAgICByYW5kb21DU1Njb2xvcihlbnZpcm9ubWVudF9pZCl7XG4gICAgICAgIGxldCBlID0gRU5WSVJPTk1FTlRTW2Vudmlyb25tZW50X2lkXTtcbiAgICAgICAgbGV0IHIgPSBlLnIuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLnIucmFuZCApLFxuICAgICAgICAgICAgZyA9IGUuZy5zdGFydCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUuZy5yYW5kKSxcbiAgICAgICAgICAgIGIgPSBlLmIuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLmIucmFuZCk7XG4gICAgICAgIHJldHVybiAncmdiKCcrcisnLCcrZysnLCcrYisnKSc7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUodHJlZXNfbnVtKXtcbiAgICAgICAgY29uc3QgY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgICAgICAgICB0aWxlV2lkdGggPSAyMixcbiAgICAgICAgICAgIHRpbGVIZWlnaHQgPSAyMjtcbiAgICAgICAgY3R4LmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIGN0eC5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAgICAgY29uc3Qgcm93cyA9IE1hdGguZmxvb3IodGhpcy53aWR0aC90aWxlV2lkdGgpICsgMTtcbiAgICAgICAgY29uc3QgY29sdW1ucyA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQvdGlsZUhlaWdodCkgKyAxO1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDAsIGkgPSAwOyBpIDwgcm93czsgeCs9dGlsZUhlaWdodCwgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMCwgaj0wOyBqIDwgY29sdW1uczsgeSs9dGlsZVdpZHRoLCBqKyspIHtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucmFuZG9tQ1NTY29sb3IodGhpcy5lbnZpcm9ubWVudF9pZCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW52ID0gRU5WSVJPTk1FTlRTW3RoaXMuZW52aXJvbm1lbnRfaWRdO1xuXG4gICAgICAgIGNvbnN0IHNwciA9IHNwcml0ZXNbZW52LmVudGl0aWVzU3ByaXRlc107XG5cbiAgICAgICAgLy/QodCz0LXQvdC10YDQuNC8INC00LXRgNC10LLRjNGPXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8dHJlZXNfbnVtOyBpKyspe1xuXG4gICAgICAgICAgICAvL9Ch0LvRg9GH0LDQudC90LDRjyDQv9C70LjRgtC60LAg0LjQtyDQvdCw0LHQvtGA0LBcbiAgICAgICAgICAgIGxldCBpZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpzcHIuc3RhdGVzLmRlZmF1bHQubGVuZ3RoKTtcbiAgICAgICAgICAgIGxldCB0aWxlID0gc3ByLnN0YXRlcy5kZWZhdWx0W2lkXTtcblxuICAgICAgICAgICAgICAgIC8v0KHQu9GD0YfQsNC50L3Ri9C1INC60L7QvtGA0LTQuNC90LDRgtGLXG4gICAgICAgICAgICBsZXQgeHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHRoaXMud2lkdGggKyB0aWxlLndpZHRoKS8xMCkqMTAgLSB0aWxlLndpZHRoO1xuICAgICAgICAgICAgbGV0IHl5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKih0aGlzLmhlaWdodCArIHRpbGUuaGVpZ2h0KS8xMCkqMTAgLSB0aWxlLmhlaWdodDtcbiAgICAgICAgICAgIGxldCB3ID0gdGlsZS53aWR0aCwgaCA9IHRpbGUuaGVpZ2h0LCBzeCA9IHRpbGUueCwgc3kgPSB0aWxlLnk7XG5cblxuICAgICAgICAgICAgLy/QntCx0YDQtdC30LrQsCDQv9C+INCz0YDQsNC90LjRhtCw0Lwg0LrQvtC80L3QsNGC0YtcblxuICAgICAgICAgICAgaWYoeHggPCB0aGlzLndpZHRoICYmIHh4ID4gLXRpbGUud2lkdGggJiYgeXkgPCB0aGlzLmhlaWdodCAmJiB5eSA+IC10aWxlLmhlaWdodCkge1xuXG4gICAgICAgICAgICAgICAgaWYoeHggPCAwKXt3ICs9IHh4O3N4IC09IHh4O3h4ID0gMDt9XG5cbiAgICAgICAgICAgICAgICBpZih5eSA8IDApe2ggKz0geXk7c3kgLT0geXk7eXkgPSAwO31cblxuICAgICAgICAgICAgICAgIGlmICh4eCA+IHRoaXMud2lkdGggLSB0aWxlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHcgPSB0aGlzLndpZHRoIC0geHg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHl5ID4gdGhpcy5oZWlnaHQgLSB0aWxlLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBoID0gdGhpcy5oZWlnaHQgLSB5eTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwci5pbWFnZSwgc3gsIHN5LCB3LCBoLCB4eCwgeXksIHcsIGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIC8vINCh0L7RhdGA0LDQvdC40Lwg0LrQsNGA0YLQuNC90LrQvtC5XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBjdHguY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcblxuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcblxuICAgICAgICBjYW1lcmEuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsU3R5bGUgPSAnIzlmOGU2MCc7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbWVyYS53aWR0aCwgY2FtZXJhLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAgICAgaWYoIXRoaXMuaW1hZ2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXJcbiAgICAgICAgICAgIHN4ID0gMCxcbiAgICAgICAgICAgIHN5ID0gMCxcbiAgICAgICAgICAgIHN3ID0gdGhpcy53aWR0aCxcbiAgICAgICAgICAgIHNoID0gdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICBkeCA9IDAsXG4gICAgICAgICAgICBkeSA9IDAsXG4gICAgICAgICAgICBkdyA9IGNhbWVyYS53aWR0aCxcbiAgICAgICAgICAgIGRoID0gY2FtZXJhLmhlaWdodDtcblxuICAgICAgICBpZihjYW1lcmEud2lkdGggPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICBzeCA9IGNhbWVyYS54O1xuICAgICAgICAgICAgc3cgPSBjYW1lcmEud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vIGR4ID0gLWNhbWVyYS54O1xuICAgICAgICAgICAgZHggPSBNYXRoLmZsb29yKChjYW1lcmEud2lkdGggLSB0aGlzLndpZHRoKS8yKTtcbiAgICAgICAgICAgIGR3ID0gdGhpcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNhbWVyYS5oZWlnaHQgPCB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgc3kgPSBjYW1lcmEueTtcbiAgICAgICAgICAgIHNoID0gY2FtZXJhLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8gZHkgPSAtY2FtZXJhLnk7XG4gICAgICAgICAgICBkeSA9IE1hdGguZmxvb3IoKGNhbWVyYS5oZWlnaHQgLSB0aGlzLmhlaWdodCkvMik7XG4gICAgICAgICAgICBkaCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gICAgfVxufSIsImltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuLi8uLi9jaGFyYWN0ZXJzXCI7XG5cbi8qKlxuICogQGNsYXNzIFRlbGVwb3J0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXJfaWQsIElELCB0YXJnZXQsIHN0YXRlLCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLnJvb21faWQgPSByb29tX2lkO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChjaGFyYWN0ZXJfaWQpIHx8IGNoYXJhY3RlcnMuZ2V0KCd0ZWxlcG9ydCcpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTcGVlZCA9IDE0O1xuICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuXG4gICAgICAgIHRoaXMudGFyZ2V0ID0ge1xuICAgICAgICAgICAgcm9vbV9pZDogdGFyZ2V0LnJvb21faWQsXG4gICAgICAgICAgICB4OiB0YXJnZXQueCxcbiAgICAgICAgICAgIHk6IHRhcmdldC55XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQoc3RhdGUpe1xuXG4gICAgICAgIGlmKHRoaXMuc3RhdGUgIT09IHN0YXRlKXtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHggPSAodGhpcy54LSh0aGlzLmNoYXJhY3Rlci53aWR0aC10aGlzLndpZHRoKS8yKSAtIGNhbWVyYS54LFxuICAgICAgICAgICAgeSA9ICh0aGlzLnktdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0K3RoaXMuaGVpZ2h0KSAtIGNhbWVyYS55O1xuXG4gICAgICAgIC8vINC90LUg0YDQuNGB0YPQtdC8INCy0L3QtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYoXG4gICAgICAgICAgICB4IDwgLXRoaXMuY2hhcmFjdGVyLndpZHRoIHx8XG4gICAgICAgICAgICB5IDwgLXRoaXMuY2hhcmFjdGVyLmhlaWdodCB8fFxuICAgICAgICAgICAgeCA+IGNhbWVyYS53aWR0aCB8fFxuICAgICAgICAgICAgeSA+IGNhbWVyYS5oZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY2FtZXJhLmNvbnRleHQsIHgsIHksIHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudFNwcml0ZU51bSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQv9GP0YLQvdC+INC60L7Qu9C70LjQt9C40LlcbiAgICAgICAgLypjYW1lcmEuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSw2NywwLjQpXCI7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxSZWN0KHRoaXMueC1jYW1lcmEueCwgdGhpcy55LWNhbWVyYS55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlY3QoeCwgeSwgdGhpcy5jaGFyYWN0ZXIud2lkdGgsIHRoaXMuY2hhcmFjdGVyLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZXN0b3JlKCk7Ki9cbiAgICB9XG5cbiAgICBhbmltYXRlKHN0ZXApe1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBzdGVwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cbi8qKlxuICog0J7QutC90L4g0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LPQtdGA0L7QtVxuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3AsIHVwZGF0ZX1cblxuXG4vLyBodG1sLdC10LvQtdC80LXQvdGC0Ysg0LIg0LrQvtGC0L7RgNGL0LUg0L/QvtC60LDQttC10Lwg0LjQvdGE0L7RgNC80LDRhtC40Y4g0L4g0LPQtdGA0L7QtS/QuNCz0YDQtVxuXG5jb25zdCBoZXJvX2luZm9FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvLXBhbmVsXCIpO1xuY29uc3QgaGVyb19uYW1lRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyby1uYW1lXCIpO1xuY29uc3Qgc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2luc19jb3VudFwiKTtcbmNvbnN0IGxldmVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb19sZXZlbFwiKTtcbmNvbnN0IGxldmVsdXBjb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb19sZXZlbHVwY291bnRlclwiKTtcbmNvbnN0IHNwZWVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb19zcGVlZFwiKTtcbmNvbnN0IGhlYWx0aEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9faGVhbHRoXCIpO1xuXG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgaGVyb19pbmZvRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBzdG9wKCl7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljaywgZmFsc2UpO1xufVxuXG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSl7XG5cbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYodGFyZ2V0LmlkICYmIHRhcmdldC5pZD09XCJzaWdub3V0X2J1dHRvblwiKXtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vaWYoY29uZmlybShcItCi0L7Rh9C90L4g0LLRi9C50YLQuD9cIikpe1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2lnbm91dCcsIG51bGwpO1xuICAgICAgICAvL31cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0L7QutCw0Lcg0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LPQtdGA0L7QtVxuICogQHBhcmFtIGluZm9cbiAqIEBwYXJhbSBsb2dpblxuICovXG5mdW5jdGlvbiB1cGRhdGUoaW5mbyl7XG4gICAgaGVyb19uYW1lRWxlbWVudCAmJiAoaGVyb19uYW1lRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLklEKTtcbiAgICBzY29yZUVsZW1lbnQgJiYgKHNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmNvaW5zX2NvdW50KTtcbiAgICBsZXZlbEVsZW1lbnQgJiYgKGxldmVsRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmxldmVsKTtcbiAgICBzcGVlZEVsZW1lbnQgJiYgKHNwZWVkRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLnNwZWVkKTtcbiAgICBsZXZlbHVwY291bnRlckVsZW1lbnQgJiYgKGxldmVsdXBjb3VudGVyRWxlbWVudC5pbm5lclRleHQgPSBpbmZvLmxldmVsdXBWYWx1ZSAtIGluZm8ubGV2ZWx1cENvdW50ZXIpO1xuICAgIGhlYWx0aEVsZW1lbnQgJiYgKGhlYWx0aEVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5oZWFsdGgpXG59IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cblxuLyoqXG4gKiDQo9C80LXQvdC40Y8gLyDRjdGE0YTQtdC60YLRi1xuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLXG5cbmNvbnN0IHNraWxsc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbHMtcGFuZWxcIik7XG5cbmNvbnN0IHNraWxsc0VsZW1lbnRzID0ge1xuICAgIHNraWxsMTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDEtdmVrb1wiKSxcbiAgICBza2lsbDI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwyLXZla29cIiksXG4gICAgc2tpbGwzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsMy12ZWtvXCIpLFxuICAgIHNraWxsNDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDQtdmVrb1wiKSxcbiAgICBza2lsbDU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw1LXZla29cIiksXG4gICAgc2tpbGw2OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsNi12ZWtvXCIpLFxuICAgIHNraWxsNzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza2lsbDctdmVrb1wiKSxcbiAgICBza2lsbDg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGw4LXZla29cIiksXG4gICAgc2tpbGw5OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsOS12ZWtvXCIpLFxuICAgIHNraWxsMTA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpbGwxMC12ZWtvXCIpLFxufTtcbmNvbnN0IGFsbFNraWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2tpbGxcIik7XG5cblxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICAvL9Cf0L7QutCw0LbQtdC8XG4gICAgc2tpbGxzUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBza2lsbHNQYW5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwLCBmYWxzZSk7XG4gICAgc2tpbGxzUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24sIGZhbHNlKTtcblxuXG4gICAgLy/QntCx0L3QvtCy0LvQtdC90LjQtSDQuNC60L7QvdC+0Log0Lgg0LPQvtGC0L7QstC90L7RgdGC0Lgg0YPQvNC10L3QuNC5XG4gICAgZXZlbnRzLm9uKCdza2lsbHMnLCAoZXZlbnROYW1lLCB0eXBlLCBkYXRhKT0+e1xuICAgICAgICBpZih0eXBlPT09J3VwZGF0ZScpe1xuICAgICAgICAgICAgZm9yKGNvbnN0IHNraWxsX2lkIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGxzRWxlbWVudHNbc2tpbGxfaWRdKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNraWxsID0gc2tpbGxzRWxlbWVudHNbc2tpbGxfaWRdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v0JjQutC+0L3QutCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0YPRjtGJ0LDRjyDRg9C80LXQvdC40Y5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gc2tpbGwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc2tpbGwtaWNvbicpO1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc05hbWU9XCJcIjtcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2tpbGwtaWNvbicpO1xuICAgICAgICAgICAgICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKGRhdGFbc2tpbGxfaWRdLmljb24pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gc2tpbGwuY2xhc3NMaXN0O1xuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjbGFzc0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZShjbGFzc0xpc3QuaXRlbSgwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjbGFzc0xpc3QuYWRkKFwidmVrb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NMaXN0LmFkZChcInZhbHVlXCIgKyBNYXRoLmZsb29yKGRhdGFbc2tpbGxfaWRdLnZhbHVlIC8gMTApICogMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICAgIHNraWxsc1BhbmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duLCBmYWxzZSk7XG4gICAgc2tpbGxzUGFuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCwgZmFsc2UpO1xuICAgIHNraWxsc1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cblxuZnVuY3Rpb24gb25Nb3VzZURvd24oZSl7XG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtaWNvblwiKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVrb1wiKSl7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGxcIilcbiAgICApe1xuICAgICAgICBpZighdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICBhbGxTa2lsbHMuZm9yRWFjaChza2lsbCA9PiBza2lsbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgICAgICAvL9CX0LDQv9GA0L7RgdC40Lwg0L/QtdGA0LXQutC70Y7Rh9C10L3QuNC1INGC0LXQutGD0YnQtdCz0L4g0YHQutC40LvQsFxuICAgICAgICAgICAgZXZlbnRzLmFkZCgnc2tpbGwtY2hhbmdlJywgdGFyZ2V0LmlkKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudHMuYWRkKFwia2V5ZG93blwiLCBcImZpcmVcIik7XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vL9Cf0L4gbW91c2V1cFxuZnVuY3Rpb24gb25Nb3VzZVVwKGUpe1xuXG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGwtaWNvblwiKSB8fFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVrb1wiKSl7XG4gICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGlmKFxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2tpbGxcIilcbiAgICApe1xuICAgICAgICBldmVudHMuYWRkKFwia2V5dXBcIiwgXCJmaXJlXCIpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuIiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vLi4vLi4vZXZlbnRzXCI7XG5cbmxldCBhY3RpdmUgPSBmYWxzZTtcblxuXG4vKipcbiAqINCe0LrQvdC+INCi0J7Qny0xMFxuICovXG5leHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3AsIGlzQWN0aXZlLCBzaG93LCBoaWRlfVxuXG5cbi8vIGh0bWwt0LXQu9C10LzQtdC90YLRiyDQsiDQutC+0YLQvtGA0YvQtSDQv9C+0LrQsNC20LXQvCDQuNC90YTQvtGA0LzQsNGG0LjRjlxuXG5jb25zdCB0b3AxMEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvcDEwLXBhbmVsXCIpO1xuY29uc3QgdG9wMTBDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wMTAtcGFuZWwtY29udGVudFwiKTtcblxuXG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIHRvcDEwRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25DbGljaywgZmFsc2UpO1xuXG4gICAgZXZlbnRzLm9uKFwia2V5dXBcIiwgKGV2ZW50TmFtZSwga2V5Q29kZSk9PntcbiAgICAgICAgaWYoa2V5Q29kZT09PVwic3RhdGlzdGljXCIpe1xuICAgICAgICAgICAgaWYoaXNBY3RpdmUoKSl7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInNlcnZlclwiLCB1cGRhdGUpO1xuXG59XG5mdW5jdGlvbiBzdG9wKCl7XG4gICAgdG9wMTBFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvbkNsaWNrLCBmYWxzZSk7XG4gICAgZXZlbnRzLm9mZihcInNlcnZlclwiLCB1cGRhdGUpO1xufVxuXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIHRvcDEwRWxlbWVudC5zdHlsZS5yaWdodCA9IDA7XG4gICAgYWN0aXZlID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICB0b3AxMEVsZW1lbnQuc3R5bGUucmlnaHQgPSAnLTE5NnB4Jztcbn1cblxuZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIGFjdGl2ZTtcbn1cblxuXG5mdW5jdGlvbiBvbkNsaWNrKGUpe1xuXG4gICAgaWYgKGlzQWN0aXZlKCkpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdygpO1xuICAgIH1cblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vKipcbiAqINCf0L7QutCw0Lcg0LjQvdGE0L7RgNC80LDRhtC40LhcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSkge1xuICAgIGlmKHR5cGU9PT1cInN0YXRpc3RpY1wiKXtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkYXRhLmluZm8pKXtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmluZm8uZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgICAgIC8vbG9nKHBsYXllci5JRCArICcgLSAnICsgcGxheWVyLmxldmVsKTtcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9ICdcXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPicrcGxheWVyLklEICsgJzo8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImhlcm9fc3BlZWRcIiBjbGFzcz1cInZhbHVlXCI+JytwbGF5ZXIuc2NvcmUrJzwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4nO1xuICAgICAgICAgICAgICAgIHRvcDEwQ29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8qKlxuICog0JjQvdGC0LXRgNGE0LXQudGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5cblxuLy8g0J7QutC90L4g0KLQvtC/LTEwXG5pbXBvcnQgdG9wMTAgZnJvbSAnLi90b3AxMCdcbi8vINCe0LrQvdC+INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbmltcG9ydCBoZXJvSW5mbyBmcm9tICcuL2hlcm9pbmZvLmpzJ1xuLy8g0J/QsNC90LXQu9GMINGD0LzQtdC90LjQuVxuaW1wb3J0IHNraWxscyBmcm9tICcuL3NraWxscy5qcydcbi8vINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuaW1wb3J0IHdhaXRTY3JlZW4gZnJvbSAnLi93YWl0c2NyZWVuJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtoZXJvSW5mbywgc2tpbGxzLCB0b3AxMCwgd2FpdFNjcmVlbn0iLCIvKipcbiAqINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuICovXG5cblxuY29uc3Qgd2FpdFNjcmVlbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdcIik7XG5cblxuZXhwb3J0IGRlZmF1bHQge3Nob3csIGhpZGV9XG5cblxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbn1cblxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB3YWl0U2NyZWVuRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG4iLCIvKipcbiAqIEBjbGFzcyBVbml0XG4gKlxuICovXG5pbXBvcnQge1NURVB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuLi8uLi9jaGFyYWN0ZXJzXCI7XG5cbmNvbnN0IENIQVJBQ1RFUl9ERUZBVUxUID0gJ2Jsb25kJztcblxuY29uc3QgTUFYX0hFQUxUSCA9IDEwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pdHtcbiAgICAvKipcbiAgICAgKiDQmtC+0L3RgdGC0YDRg9C60YLQvtGAXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBpc0hlcm8pe1xuXG4gICAgICAgIGlmKGlzSGVybyl7XG4gICAgICAgICAgICB0aGlzLmlzSGVybyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJvb21faWQgPSBkYXRhLnJvb21faWQ7XG5cbiAgICAgICAgdGhpcy54ID0gZGF0YS54O1xuICAgICAgICB0aGlzLnkgPSBkYXRhLnk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IGRhdGEud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChkYXRhLmNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoQ0hBUkFDVEVSX0RFRkFVTFQpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBkYXRhLnN0YXRlIHx8ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLklEO1xuXG4gICAgICAgIHRoaXMubGV2ZWwgPSBkYXRhLmxldmVsO1xuICAgICAgICB0aGlzLmNvaW5zX2NvdW50ID0gZGF0YS5jb2luc19jb3VudDtcbiAgICAgICAgdGhpcy5sZXZlbHVwVmFsdWUgPSBkYXRhLmxldmVsdXBWYWx1ZTtcbiAgICAgICAgdGhpcy5sZXZlbHVwQ291bnRlciA9IGRhdGEubGV2ZWx1cENvdW50ZXI7XG5cbiAgICAgICAgdGhpcy5oZWFsdGggPSBkYXRhLmhlYWx0aDtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTcGVlZCA9IDE0OyAvL1RPRE86INCy0YvQvdC10YHRgtC4INCyIGNoYXJhY3RlclxuICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QvtCy0LrQsCDQv9Cw0YDQsNC80LXRgtGA0L7QsiDRjtC90LjRgtCwXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKi9cbiAgICBzZXQoZGF0YSl7XG5cbiAgICAgICAgdGhpcy5yb29tX2lkID0gZGF0YS5yb29tX2lkO1xuICAgICAgICB0aGlzLnggPSBkYXRhLng7XG4gICAgICAgIHRoaXMueSA9IGRhdGEueTtcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzLmdldChkYXRhLmNoYXJhY3Rlcl9pZCkgfHwgY2hhcmFjdGVycy5nZXQoQ0hBUkFDVEVSX0RFRkFVTFQpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEuSUQ7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZSAhPT0gZGF0YS5zdGF0ZSl7XG4gICAgICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gZGF0YS5zdGF0ZTtcblxuICAgICAgICB0aGlzLmxldmVsID0gZGF0YS5sZXZlbDtcbiAgICAgICAgdGhpcy5jb2luc19jb3VudCA9IGRhdGEuY29pbnNfY291bnQ7XG4gICAgICAgIHRoaXMubGV2ZWx1cFZhbHVlID0gZGF0YS5sZXZlbHVwVmFsdWU7XG4gICAgICAgIHRoaXMubGV2ZWx1cENvdW50ZXIgPSBkYXRhLmxldmVsdXBDb3VudGVyO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoID0gZGF0YS5oZWFsdGg7XG5cbiAgICB9XG5cbiAgICBhbmltYXRlKCl7XG4gICAgICAgIC8v0JDQvdC40LzQsNGG0LjRj1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBTVEVQO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gdGhpcy55IC0gY2FtZXJhLnk7XG5cbiAgICAgICAgLy8g0L3QtSDRgNC40YHRg9C10Lwg0LLQvdC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihcbiAgICAgICAgICAgIHggPCAtdGhpcy5jaGFyYWN0ZXIud2lkdGggfHxcbiAgICAgICAgICAgIHkgPCAtdGhpcy5jaGFyYWN0ZXIuaGVpZ2h0IHx8XG4gICAgICAgICAgICB4ID4gY2FtZXJhLndpZHRoIHx8XG4gICAgICAgICAgICB5ID4gY2FtZXJhLmhlaWdodFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3U2hhZG93KGNhbWVyYS5jb250ZXh0LCB4LCB5KTtcblxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoY2FtZXJhLmNvbnRleHQsIHgsIHkpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQuNC80Y9cbiAgICAgICAgaWYodGhpcy5sZXZlbCE9dW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd05hbWUoY2FtZXJhLmNvbnRleHQsIHgsIHktNTUsIHRoaXMubmFtZSwgdGhpcy5sZXZlbCwgdGhpcy5pc0hlcm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g0JXRgdC70Lgg0LXRgdGC0YwgLSDRgNC40YHRg9C10Lwg0LjQvdC00LjQutCw0YLQvtGAXG4gICAgICAgIGlmKHRoaXMuaGVhbHRoIT11bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgbGV0IHZvbHVtZTtcblxuICAgICAgICAgICAgdm9sdW1lID0gTWF0aC5mbG9vcih0aGlzLmhlYWx0aCoxMDAvTUFYX0hFQUxUSCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhd1ZvbHVtZShjYW1lcmEuY29udGV4dCwgeCwgeSAtIDUwLCB2b2x1bWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBkcmF3Q2hhcmFjdGVyKGNvbnRleHQsIHN4LCBzeSl7XG4gICAgICAgIGxldCB4ID0gc3ggLSAodGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMixcbiAgICAgICAgICAgIHkgPSBzeSAtICh0aGlzLmNoYXJhY3Rlci5oZWlnaHQtdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzeCwgc3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTsqL1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC40L3QtNC40LrQsNGC0L7RgFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGRyYXdWb2x1bWUoY29udGV4dCwgeCwgeSwgdmFsdWUpe1xuXG4gICAgICAgIGxldCB2b2x1bWVXaWR0aCA9IDUwO1xuICAgICAgICBsZXQgdm9sdW1lSGVpZ2h0ID0gNDtcbiAgICAgICAgbGV0IHZvbHVtZVggPSB4ICsgKHRoaXMud2lkdGggLSB2b2x1bWVXaWR0aCkvMjtcbiAgICAgICAgbGV0IHZvbHVtZVkgPSB5O1xuXG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCh2b2x1bWVYLCB2b2x1bWVZLCBNYXRoLmZsb29yKHZvbHVtZVdpZHRoKnZhbHVlLzEwMCksIHZvbHVtZUhlaWdodCk7XG4gICAgICAgIGNvbnRleHQucmVjdCh2b2x1bWVYLTEsIHZvbHVtZVktMSwgdm9sdW1lV2lkdGgrMiwgdm9sdW1lSGVpZ2h0KzIpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCg0LjRgdGD0LXQvCDQuNC80Y9cbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBzeFxuICAgICAqIEBwYXJhbSBzeVxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGxldmVsXG4gICAgICogQHBhcmFtIGlzSGVyb1xuICAgICAqL1xuICAgIGRyYXdOYW1lKGNvbnRleHQsIHN4LCBzeSwgbmFtZSwgbGV2ZWwsIGlzSGVybyl7XG5cbiAgICAgICAgbGV0IHBhZGRpbmdDb2xvciA9IFwicmdiYSgwLDAsMCwwLjMpXCI7XG4gICAgICAgIGlmKGlzSGVybyl7XG4gICAgICAgICAgICBwYWRkaW5nQ29sb3IgPSBcInJnYmEoMCwyMDAsNDAsMC40KVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgLy/QmNC80Y9cbiAgICAgICAgY29udGV4dC5mb250ID0gXCIxNHB4IHNhbnMtc2VyaWZcIjtcbiAgICAgICAgbGV0IHRleHRXaWR0aCA9IGNvbnRleHQubWVhc3VyZVRleHQobmFtZSkud2lkdGg7XG5cbiAgICAgICAgLy/Qo9GA0L7QstC10L3RjFxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcImJvbGQgMTJweCBBcmlhbFwiO1xuICAgICAgICBsZXQgdGV4dExldmVsV2lkdGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KGxldmVsKS53aWR0aDtcblxuICAgICAgICAvL9Ch0YfQuNGC0LDQtdC8INGA0LDQt9C80LXRgNGLXG4gICAgICAgIGxldCBwYWRXaWR0aCA9IHRleHRXaWR0aCArIHRleHRMZXZlbFdpZHRoICsgMjtcblxuICAgICAgICBsZXQgbHggPSBzeCsodGhpcy53aWR0aCAtIHBhZFdpZHRoKS8yLFxuICAgICAgICAgICAgeCA9IGx4ICsgdGV4dExldmVsV2lkdGggKyAyLFxuICAgICAgICAgICAgbHkgPSBzeSxcbiAgICAgICAgICAgIHkgPSBzeTtcblxuXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gcGFkZGluZ0NvbG9yO1xuICAgICAgICBjb250ZXh0LmFyYyhseC0yLCB5LTEyKzE4LzIsIDE4LzIsIE1hdGguUEkvMiwgLU1hdGguUEkvMik7XG4gICAgICAgIGNvbnRleHQuYXJjKGx4LTIrcGFkV2lkdGgsIHktMTIrMTgvMiwgMTgvMiwgLU1hdGguUEkvMiwgTWF0aC5QSS8yKTtcbiAgICAgICAgY29udGV4dC5yZWN0KGx4LTIsIHktMTIsIHBhZFdpZHRoLCAxOCk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgICAgIGNvbnRleHQuZm9udCA9IFwiMTRweCBzYW5zLXNlcmlmXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChuYW1lLHgseSk7XG5cbiAgICAgICAgY29udGV4dC5mb250ID0gXCJib2xkIDEycHggQXJpYWxcIjtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQobGV2ZWwsbHgsbHkpO1xuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuXG4gICAgZHJhd1NoYWRvdyhjb250ZXh0LCB4LCB5KXtcblxuICAgICAgICBsZXRcbiAgICAgICAgICAgIHNoYWRvd0NvbG9yMSA9IFwicmdiYSgwLDAsMCwwLjEpXCIsXG4gICAgICAgICAgICBzaGFkb3dDb2xvcjIgPSBcInJnYmEoMCwwLDAsMC4xNSlcIixcbiAgICAgICAgICAgIHNoYWRvd0NvbG9yMyA9IFwicmdiYSgwLDAsMCwwLjIpXCI7XG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG5cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzaGFkb3dDb2xvcjE7XG4gICAgICAgIGNvbnRleHQuZWxsaXBzZSh4ICsgdGhpcy53aWR0aC8yLCB5K3RoaXMuaGVpZ2h0LTIsIDIwLCAxMCwgMCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBzaGFkb3dDb2xvcjI7XG4gICAgICAgIGNvbnRleHQuZWxsaXBzZSh4ICsgdGhpcy53aWR0aC8yLCB5K3RoaXMuaGVpZ2h0LTIsIDE3LCA4LCAwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHNoYWRvd0NvbG9yMjtcbiAgICAgICAgY29udGV4dC5lbGxpcHNlKHggKyB0aGlzLndpZHRoLzIsIHkrdGhpcy5oZWlnaHQtMiwgMTUsIDcsIDAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IHtpdGVtLCBhZGQsIHJlbW92ZSwgcmVzZXQsIHRvQXJyYXl9XG5cblxuY29uc3QgdW5pdHMgPSB7fTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRjtC90LjRgiDQv9C+INC40LzQtdC90LhcbiAqIEBwYXJhbSBJRFxuICogQHJldHVybnMgVW5pdFxuICovXG5mdW5jdGlvbiBpdGVtKElEKSB7XG4gICAgcmV0dXJuIHVuaXRzW0lEXTtcbn1cblxuZnVuY3Rpb24gYWRkKElELCB1bml0KSB7XG4gICAgdW5pdHNbSURdID0gdW5pdDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKElEKSB7XG4gICAgaWYoSUQgaW4gdW5pdHMpIGRlbGV0ZSB1bml0c1tJRF07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgZGVsZXRlIHVuaXRzW2ldO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICBsZXQgdW5pdHNBcnJheSA9IFtdO1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgdW5pdHNBcnJheS5wdXNoKHVuaXRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXRzQXJyYXk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9O1xuXG5cbmNvbnN0IGxvZ2luX3BhbmVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcGFuZWxcIik7XG5jb25zdCBsb2dpbl9mb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tZm9ybVwiKTtcbmNvbnN0IGxvZ2luX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4taW5wdXRcIik7XG5cblxubGV0IGZpbmFsQ2FsbGJhY2sgPSBudWxsO1xuXG5sZXQgdGltZW91dCA9IG51bGw7XG5cblxuLy8g0JLRi9Cy0LXQtNC10Lwg0L7QutC90L4g0LDQstGC0L7RgNC40LfQsNGG0LjQuC4g0JzQvtC00LDQu9GM0L3QvtC1XG5mdW5jdGlvbiBzdGFydChsb2dpbiwgY2FsbGJhY2spIHtcblxuICAgIGZpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgIGlmKGxvZ2luICYmIGxvZ2luX2lucHV0RWxlbWVudCl7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSA9IGxvZ2luXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXl1cEhhbmRsZXIsIGZhbHNlKTtcblxuICAgIHNob3coKTtcblxuICAgIGxvZ2luX2lucHV0RWxlbWVudC5mb2N1cygpO1xufVxuXG5cbi8vINCX0LDQutGA0L7QtdC8INC+0LrQvdC+INCw0LLRgtC+0YDQuNC30LDRhtC40LhcbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXl1cEhhbmRsZXIsIGZhbHNlKTtcbiAgICBoaWRlKCk7XG59XG5cblxuLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9Cw0LLQuNGIXG5mdW5jdGlvbiBrZXl1cEhhbmRsZXIoZSkge1xuICAgIGxldCBvYmogPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgbGV0IGtleSA9IGUua2V5Q29kZTtcblxuICAgIGlmKGtleT09MTMgJiYgdmFsaWRhdGUobG9naW5faW5wdXRFbGVtZW50LnZhbHVlKSl7XG5cbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBmaW5hbENhbGxiYWNrKGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICAgIC8v0YHQuNC80LLQvtC70Ysg0YDQsNC30YDQtdGI0LXQvdC90YvQtSDQsiDQu9C+0LPQuNC90LVcbiAgICAvXlthLXpBLVowLTkgKy5cXC1fOlwiKCldKj8kLy50ZXN0KG9iai52YWx1ZSkgJiZcbiAgICBvYmoudmFsdWUubGVuZ3RoIDwgMTAgLy8g0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPINC00LvQuNC90LAg0LvQvtCz0LjQvdCwXG4gICAgKSB7XG4gICAgICAgIG9iai5kZWZhdWx0VmFsdWUgPSBvYmoudmFsdWU7XG5cbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRjYjRhJztcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBvYmoudmFsdWUgPSBvYmouZGVmYXVsdFZhbHVlO1xufVxuXG4vLyDQn9GA0L7QstC10YDQutCwINCy0LLQtdC00LXQvdC90L7Qs9C+INC4INC40L3QtNC40LrQsNGG0LjRjyDQvtGI0LjQsdC60LhcbmZ1bmN0aW9uIHZhbGlkYXRlKGxvZ2luKSB7XG5cbiAgICBpZihsb2dpbi5sZW5ndGg+MCkgcmV0dXJuIHRydWU7XG5cblxuICAgIGxvZ2luX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9JyNmZjAwMDgnO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9JyNmNGNiNGEnO1xuICAgIH0sIDIwMCk7XG5cbn1cblxuLy8g0J7QsdGA0LDQsdC+0YLQutCwINC60LvQuNC60L7QslxuZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG5cbiAgICAvLyDQldGB0LvQuCDQvdCw0LbQsNC70LggXCLQktC+0LnRgtC4XCIg0Lgg0LvQvtCz0LjQvSDQvdC+0YDQvCAtINC30LDQv9GD0YHRgtC40Lwg0YTRg9C90LrRhtC40Y4g0LLRhdC+0LTQsFxuICAgIGlmKHRhcmdldC5pZD09J2xvZ2luLWJ1dHRvbicgJiYgdmFsaWRhdGUobG9naW5faW5wdXRFbGVtZW50LnZhbHVlKSl7XG5cbiAgICAgICAgc3RvcCgpO1xuXG4gICAgICAgIGZpbmFsQ2FsbGJhY2sobG9naW5faW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy/Qn9C+0LrQsNC30LDRgtGMINC+0LrQvdC+INCy0YXQvtC00LBcbmZ1bmN0aW9uIHNob3coKSB7XG4gICAgbG9naW5fcGFuZWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGxvZ2luX2Zvcm1FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG4vL9GB0LrRgNGL0YLRjCDQvtC60L3QviDQstGF0L7QtNCwXG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIGxvZ2luX3BhbmVsRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxvZ2luX2Zvcm1FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59IiwiaW1wb3J0IFNvdW5kIGZyb20gXCIuL2VuZ2luZS9zb3VuZC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgXCJsZXZlbF91cFwiOiBuZXcgU291bmQoJ3NvdW5kL2Nhc2gubXAzJyksXG4gICAgXCJucGNfZWF0X2NvaW5cIjogbmV3IFNvdW5kKCdzb3VuZC9jb2luL2NvaW4zLndhdicpLFxuICAgIFwiZWF0X2NvaW5fZ29sZFwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vY29pbi53YXYnKSxcbiAgICBcImVhdF9jb2luX3NpbHZlclwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vZWF0Mi5tcDMnKSxcbiAgICBcImVhdF9jb2luX2NvcHBlclwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vZWF0MS5tcDMnKSxcbiAgICBcInRlbGVwb3J0XCI6IG5ldyBTb3VuZCgnc291bmQvdGVsZXBvcnQvZmxhdW5jaC53YXYnKSxcbiAgICBcInB1c2gtZWZmZWN0XCI6IG5ldyBTb3VuZCgnc291bmQvaGl0L2Ryb3BMZWF0aGVyLm9nZycpLFxufSIsIi8qKlxuICog0KHQv9GA0LDQudGC0YtcbiAqL1xuXG4vL9Ca0LDRgNGC0LjQvdC60LhcbmxldCBzX2RvYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2RvYycpLFxuICAgIHNfcHJvZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3Byb2YnKSxcbiAgICBzX2dvYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2dvYicpLFxuICAgIHNfZ2lybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2dpcmwnKSxcbiAgICBzX2Jsb25kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYmxvbmQnKSxcbiAgICBzX21hZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX21hZycpLFxuICAgIHNfdGVsZXBvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc190ZWxlcG9ydCcpLFxuICAgIHNfY29pbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19jb2lucycpLFxuICAgIHRfdHJlZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndF90cmVlcycpLFxuICAgIHRfYnVzaHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndF9idXNocycpLFxuICAgIHRfcGxhbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfcGxhbnRzJyksXG4gICAgc19wb2ludGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfcG9pbnRlcicpLFxuICAgIHNfYm9vbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2Jvb20nKSxcbiAgICBzX2Jvb20xID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYm9vbTEnKSxcbiAgICBzX2Jvb20yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYm9vbTInKSxcbiAgICBzX2JhcmllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2JhcmllcicpLFxuICAgIHNfcHVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3B1c2gnKSxcbiAgICBzX2NyeXN0YWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY3J5c3RhbHMnKSxcbiAgICBzX3NrZWxldG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nfc2tlbGV0b24nKSxcbiAgICBzX2thdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19rYXR5JyksXG4gICAgc19sZXZvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2xldm9uJyksXG4gICAgc192aXRhbHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc192aXRhbHknKSxcbiAgICB0X2Nvb2xfcGxhbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RfY29vbF9wbGFudHMnKSxcbiAgICB0X2FuZHN0b25lcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X2FuZHN0b25lcycpO1xuXG5cbi8qKlxuICog0JTQvtC60YLQvtGAXG4gKi9cbmV4cG9ydHMuZG9jID0ge1xuICAgIFwiaW1hZ2VcIjogc19kb2MsXG4gICAgXCJ3aWR0aFwiOiA2NCxcbiAgICBcImhlaWdodFwiOiA2NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzNcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMlwiLCBcInhcIjogMCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn1cbiAgICAgICAgXVxuICAgIH1cblxufTtcblxuXG4vKipcbiAqINCf0YDQvtGE0LXRgdGB0L7RgFxuICovXG5leHBvcnRzLnByb2YgPSB7XG4gICAgXCJpbWFnZVwiOiBzX3Byb2YsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImlkbGVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMVwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4yXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4zXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW40XCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW41XCIsIFwieFwiOiAzMjAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW42XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW43XCIsIFwieFwiOiA0NDgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW44XCIsIFwieFwiOiA1MTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxuXG59O1xuXG5cbi8qKlxuICog0JPQvtCx0LvQuNC9XG4gKi9cbmV4cG9ydHMuZ29iID0ge1xuICAgIFwiaW1hZ2VcIjogc19nb2IsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjFcIiwgXCJ4XCI6IDEzMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iMlwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2IzXCIsIFwieFwiOiAwLCBcInlcIjogNjUsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I0XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I1XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDY1LCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNlwiLCBcInhcIjogMCwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjdcIiwgXCJ4XCI6IDY1LCBcInlcIjogMTMwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgIF1cbiAgICB9XG5cbn07XG5cblxuLyoqXG4gKiDQlNC10LLQvtGH0LrQsFxuICovXG5leHBvcnRzLmdpcmwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2dpcmwsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmwxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsN1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw4XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCR0LvQvtC90LTQuNC9XG4gKi9cbmV4cG9ydHMuYmxvbmQgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2Jsb25kLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ2XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kN1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDlcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQsNCzXG4gKi9cbmV4cG9ydHMubWFnID0ge1xuICAgIFwiaW1hZ2VcIjogc19tYWcsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc2XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc4XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzlcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JfQvtC70L7RgtCw0Y8g0LzQvtC90LXRgtCwXG4gKi9cbmV4cG9ydHMuY29pbl9nb2xkID0ge1xuICAgIFwiaW1hZ2VcIjogc19jb2lucyxcbiAgICBcIndpZHRoXCI6IDQ0LFxuICAgIFwiaGVpZ2h0XCI6IDQ0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQxXCIsIFwieFwiOiAyMjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkM1wiLCBcInhcIjogMzIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQ0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDVcIiwgXCJ4XCI6IDk2LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkNlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkN1wiLCBcInhcIjogMTYwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkOFwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQodC10YDQtdCx0YDRj9C90L3QsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fc2lsdmVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19jb2lucyxcbiAgICBcIndpZHRoXCI6IDQ0LFxuICAgIFwiaGVpZ2h0XCI6IDQ0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjJcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyM1wiLCBcInhcIjogMzIsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjRcIiwgXCJ4XCI6IDY0LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI1XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyNlwiLCBcInhcIjogMTI4LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI3XCIsIFwieFwiOiAxNjAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjhcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQtdC00L3QsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fY29wcGVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19jb2lucyxcbiAgICBcIndpZHRoXCI6IDQ0LFxuICAgIFwiaGVpZ2h0XCI6IDQ0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyMlwiLCBcInhcIjogMzIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyNFwiLCBcInhcIjogOTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyNVwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjZcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXI3XCIsIFwieFwiOiAxOTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyOFwiLCBcInhcIjogMjI0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG5cbi8qKlxuICog0KLRgNCw0LLQsFxuICovXG5leHBvcnRzLmdyYXNzID0ge1xuICAgIFwiaW1hZ2VcIjogdF90cmVlcyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ2XCIsIFwieFwiOiAyMTgsIFwieVwiOiA5MSwgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogOTB9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCU0LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMudHJlZXMgPSB7XG4gICAgXCJpbWFnZVwiOiB0X3RyZWVzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDFcIiwgXCJ4XCI6IDMxMywgXCJ5XCI6IDEzNCwgXCJ3aWR0aFwiOiA2OCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA0NTksIFwid2lkdGhcIjogNDQsIFwiaGVpZ2h0XCI6IDQyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAzXCIsIFwieFwiOiAzMTMsIFwieVwiOiAyNzIsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA0XCIsIFwieFwiOiAzMTMsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA2OCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDVcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1NCwgXCJoZWlnaHRcIjogNTR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDZcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDM0MCwgXCJ3aWR0aFwiOiA0NiwgXCJoZWlnaHRcIjogNDh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDdcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDE4MSwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDhcIiwgXCJ4XCI6IDMxMywgXCJ5XCI6IDM0MSwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNTJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDlcIiwgXCJ4XCI6IDg2LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQwLCBcImhlaWdodFwiOiA0MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMFwiLCBcInhcIjogMzg0LCBcInlcIjogNjYsIFwid2lkdGhcIjogNjYsIFwiaGVpZ2h0XCI6IDY2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzExXCIsIFwieFwiOiA0NTIsIFwieVwiOiAyNDAsIFwid2lkdGhcIjogNDcsIFwiaGVpZ2h0XCI6IDUyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzEyXCIsIFwieFwiOiA0MDUsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzEzXCIsIFwieFwiOiAxMjcsIFwieVwiOiA0NTksIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE0XCIsIFwieFwiOiA0NTIsIFwieVwiOiAzODksIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE1XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMzMsIFwid2lkdGhcIjogNjYsIFwiaGVpZ2h0XCI6IDY2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE2XCIsIFwieFwiOiA0NTIsIFwieVwiOiAyOTMsIFwid2lkdGhcIjogNDgsIFwiaGVpZ2h0XCI6IDQ2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE3XCIsIFwieFwiOiA0NTIsIFwieVwiOiAxMjIsIFwid2lkdGhcIjogNTQsIFwiaGVpZ2h0XCI6IDU4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE4XCIsIFwieFwiOiAzMTMsIFwieVwiOiAwLCBcIndpZHRoXCI6IDcwLCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xOVwiLCBcInhcIjogNDUyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjBcIiwgXCJ4XCI6IDI5OSwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1MiwgXCJoZWlnaHRcIjogNTR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjFcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI2NywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjJcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDYxLCBcIndpZHRoXCI6IDU0LCBcImhlaWdodFwiOiA2MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yM1wiLCBcInhcIjogMjQ1LCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNFwiLCBcInhcIjogNDUsIFwieVwiOiA0NTksIFwid2lkdGhcIjogNDAsIFwiaGVpZ2h0XCI6IDQyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzI1XCIsIFwieFwiOiAwLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA2Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNlwiLCBcInhcIjogMjE4LCBcInlcIjogMTgyLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA1MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yN1wiLCBcInhcIjogMzg0LCBcInlcIjogMzI4LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA2Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yOFwiLCBcInhcIjogMjM3LCBcInlcIjogMjM0LCBcIndpZHRoXCI6IDcwLCBcImhlaWdodFwiOiA3MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yOVwiLCBcInhcIjogMzUyLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDUyLCBcImhlaWdodFwiOiA1Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8zMFwiLCBcInhcIjogMzg0LCBcInlcIjogMjAwLCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8zOFwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTEwLCBcImhlaWdodFwiOiAxMjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzlcIiwgXCJ4XCI6IDExMSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTA2LCBcImhlaWdodFwiOiAxMjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjcsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQxXCIsIFwieFwiOiAxNjIsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogODIsIFwiaGVpZ2h0XCI6IDc2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQyXCIsIFwieFwiOiA4NywgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3OCwgXCJoZWlnaHRcIjogNzZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDNcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogODQsIFwiaGVpZ2h0XCI6IDgyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ0XCIsIFwieFwiOiAwLCBcInlcIjogMTIxLCBcIndpZHRoXCI6IDExMCwgXCJoZWlnaHRcIjogMTEyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ2XCIsIFwieFwiOiAyMTgsIFwieVwiOiA5MSwgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogOTB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDdcIiwgXCJ4XCI6IDEyMiwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDhcIiwgXCJ4XCI6IDYxLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA1Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80OVwiLCBcInhcIjogMTgzLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA1Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81MFwiLCBcInhcIjogMTY2LCBcInlcIjogMjM0LCBcIndpZHRoXCI6IDcwLCBcImhlaWdodFwiOiA3Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81MVwiLCBcInhcIjogMCwgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA4NiwgXCJoZWlnaHRcIjogNzh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTJcIiwgXCJ4XCI6IDMxMywgXCJ5XCI6IDIwMywgXCJ3aWR0aFwiOiA2OCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTNcIiwgXCJ4XCI6IDExMSwgXCJ5XCI6IDEyMSwgXCJ3aWR0aFwiOiA5NCwgXCJoZWlnaHRcIjogOTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTRcIiwgXCJ4XCI6IDIxOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogOTQsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzU1XCIsIFwieFwiOiA4NSwgXCJ5XCI6IDMxMywgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogODJ9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JTQtdGA0LXQstGM0Y8g0Lgg0LrRg9GB0YLRi1xuICovXG5leHBvcnRzLmJ1c2hzID0ge1xuICAgIFwiaW1hZ2VcIjogdF9idXNocyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAxMDMsIFwieVwiOiAxMDAsIFwid2lkdGhcIjogMjUsIFwiaGVpZ2h0XCI6IDMwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMDMsIFwieVwiOiA2MCwgXCJ3aWR0aFwiOiAzMCwgXCJoZWlnaHRcIjogMzl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDE1NiwgXCJ5XCI6IDExOSwgXCJ3aWR0aFwiOiAxNSwgXCJoZWlnaHRcIjogMTN9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDEwMywgXCJ5XCI6IDQwLCBcIndpZHRoXCI6IDIxLCBcImhlaWdodFwiOiAxOX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMTM2LCBcInlcIjogMTE5LCBcIndpZHRoXCI6IDE5LCBcImhlaWdodFwiOiAxOX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogMTAzLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzl9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0J/Rg9GB0YLRi9C90L3QvtC1XG4gKi9cbmV4cG9ydHMuZGVzZXJ0ID0ge1xuICAgIFwiaW1hZ2VcIjogdF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMTk4LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDI3LCBcImhlaWdodFwiOiA1OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDE5OCwgXCJ5XCI6IDI5MywgXCJ3aWR0aFwiOiAzMSwgXCJoZWlnaHRcIjogMzB9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAyMzMsIFwieVwiOiAzMzAsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkyfSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGUxNlwiLCBcInhcIjogMjQ0LCBcInlcIjogMjM4LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA4N30sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KHRgtGA0LDQvdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLmJlbHdvb2QgPSB7XG4gICAgXCJpbWFnZVwiOiB0X3BsYW50cyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDEwNywgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMDgsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogODksIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMzAsIFwid2lkdGhcIjogOTUsIFwiaGVpZ2h0XCI6IDExN30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjBcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI2LCBcImhlaWdodFwiOiAxMTZ9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KLQtdC70LXQv9C+0YDRglxuICovXG5leHBvcnRzLnRlbGVwb3J0ID0ge1xuICAgIFwiaW1hZ2VcIjogc190ZWxlcG9ydCxcbiAgICBcIndpZHRoXCI6IDkwLFxuICAgIFwiaGVpZ2h0XCI6IDQ5LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImlkbGVcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4xXCIsIFwieFwiOiAwLCBcInlcIjogNDksIFwid2lkdGhcIjogOTAsIFwiaGVpZ2h0XCI6IDQ5fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4yXCIsIFwieFwiOiAwLCBcInlcIjogOTgsIFwid2lkdGhcIjogOTAsIFwiaGVpZ2h0XCI6IDQ5fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4zXCIsIFwieFwiOiA5MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogOTAsIFwiaGVpZ2h0XCI6IDQ5fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW40XCIsIFwieFwiOiA5MCwgXCJ5XCI6IDQ5LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQo9C60LDQt9Cw0YLQtdC70YxcbiAqL1xuZXhwb3J0cy5wb2ludGVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19wb2ludGVyLFxuICAgIFwid2lkdGhcIjogNjQsXG4gICAgXCJoZWlnaHRcIjogNjQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDIwMSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDQwMiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDYwMywgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDgwNCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDAsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDIwMSwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyMDEsIFwiaGVpZ2h0XCI6IDIwMX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogNDAyLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiA2MDMsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiA4MDQsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JLQt9GA0YvQslxuICovXG5leHBvcnRzLmJvb20gPSB7XG4gICAgXCJpbWFnZVwiOiBzX2Jvb20sXG4gICAgXCJ3aWR0aFwiOiAxMjgsXG4gICAgXCJoZWlnaHRcIjogMTI4LFxuICAgIFwic3BlZWRcIjogMzAsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTExXCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEzXCIsIFwieFwiOiA1MTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiA2NDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE1XCIsIFwieFwiOiA3NjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiA4OTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE3XCIsIFwieFwiOiAwLCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOFwiLCBcInhcIjogMTI4LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOVwiLCBcInhcIjogMjU2LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogMzg0LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMVwiLCBcInhcIjogNTEyLCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMlwiLCBcInhcIjogNjQwLCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyM1wiLCBcInhcIjogNzY4LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNFwiLCBcInhcIjogODk2LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNVwiLCBcInhcIjogMCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjdcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjhcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjlcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzBcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzFcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzJcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzNcIiwgXCJ4XCI6IDAsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM0XCIsIFwieFwiOiAxMjgsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM1XCIsIFwieFwiOiAyNTYsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM2XCIsIFwieFwiOiAzODQsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM3XCIsIFwieFwiOiA1MTIsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM4XCIsIFwieFwiOiA2NDAsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTM5XCIsIFwieFwiOiA3NjgsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQwXCIsIFwieFwiOiA4OTYsIFwieVwiOiA1MTIsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQxXCIsIFwieFwiOiAwLCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0M1wiLCBcInhcIjogMjU2LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NFwiLCBcInhcIjogMzg0LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NVwiLCBcInhcIjogNTEyLCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NlwiLCBcInhcIjogNjQwLCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0N1wiLCBcInhcIjogNzY4LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0OFwiLCBcInhcIjogODk2LCBcInlcIjogNjQwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0OVwiLCBcInhcIjogMCwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTFcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTJcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTNcIiwgXCJ4XCI6IDUxMiwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTRcIiwgXCJ4XCI6IDY0MCwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTVcIiwgXCJ4XCI6IDc2OCwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTZcIiwgXCJ4XCI6IDg5NiwgXCJ5XCI6IDc2OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTdcIiwgXCJ4XCI6IDAsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU4XCIsIFwieFwiOiAxMjgsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTU5XCIsIFwieFwiOiAyNTYsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTYwXCIsIFwieFwiOiAzODQsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTYxXCIsIFwieFwiOiA1MTIsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTYyXCIsIFwieFwiOiA2NDAsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTYzXCIsIFwieFwiOiA3NjgsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTY0XCIsIFwieFwiOiA4OTYsIFwieVwiOiA4OTYsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JLQt9GA0YvQsjFcbiAqL1xuZXhwb3J0cy5ib29tMSA9IHtcbiAgICBcImltYWdlXCI6IHNfYm9vbTEsXG4gICAgXCJ3aWR0aFwiOiA2NCxcbiAgICBcImhlaWdodFwiOiA2NCxcbiAgICBcInNwZWVkXCI6IDIyLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiAzODQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogMzg0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAwLCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogMTI4LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMjU2LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMlwiLCBcInhcIjogMzg0LCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxM1wiLCBcInhcIjogMCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTRcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTZcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDM4NCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQktC30YDRi9CyMlxuICovXG5leHBvcnRzLmJvb20yID0ge1xuICAgIFwiaW1hZ2VcIjogc19ib29tMixcbiAgICBcIndpZHRoXCI6IDEyOCxcbiAgICBcImhlaWdodFwiOiAxMjgsXG4gICAgXCJzcGVlZFwiOiAyOCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMjU2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMzg0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTFcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTJcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAxMjgsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE1XCIsIFwieFwiOiAyNTYsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAzODQsIFwieVwiOiAzODQsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KbQtdC70Ywg0YLQtdC70LXQv9C+0YDRgtCwXG4gKi9cbmV4cG9ydHMuYmFyaWVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19iYXJpZXIsXG4gICAgXCJ3aWR0aFwiOiAxMjgsXG4gICAgXCJoZWlnaHRcIjogMTI4LFxuICAgIFwic3BlZWRcIjogMzgsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU5XCIsIFwieFwiOiAxOTIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAyNTYsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTExXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTJcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogMjU2LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTZcIiwgXCJ4XCI6IDAsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxN1wiLCBcInhcIjogNjQsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOFwiLCBcInhcIjogMTI4LCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDE5MiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIwXCIsIFwieFwiOiAyNTYsIFwieVwiOiAxOTIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMVwiLCBcInhcIjogMCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIzXCIsIFwieFwiOiAxMjgsIFwieVwiOiAyNTYsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNFwiLCBcInhcIjogMTkyLCBcInlcIjogMjU2LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDI1NiwgXCJ5XCI6IDI1NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0K3RhNGE0LXQutGCINGC0L7Qu9GH0L7QulxuICovXG5leHBvcnRzLnB1c2gxID0ge1xuICAgIFwiaW1hZ2VcIjogc19wdXNoLFxuICAgIFwid2lkdGhcIjogNTEyLFxuICAgIFwiaGVpZ2h0XCI6IDUxMixcbiAgICBcInNwZWVkXCI6IDMwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICAvLyB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAgLy8ge1wibmFtZVwiOiBcInNwcml0ZTVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTlcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEwXCIsIFwieFwiOiAwLCBcInlcIjogMTkyLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5leHBvcnRzLmJsdWVfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTZcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMzIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOFwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogOTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTBcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMVwiLCBcInhcIjogMTYwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTEyXCIsIFwieFwiOiAxOTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTNcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZ3JlZW5fY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE0XCIsIFwieFwiOiAwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxNVwiLCBcInhcIjogMzIsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMTdcIiwgXCJ4XCI6IDk2LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOFwiLCBcInhcIjogMTI4LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxOVwiLCBcInhcIjogMTYwLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogMTkyLCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMVwiLCBcInhcIjogMjI0LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZ3JleV9jcnlzdGFsID0ge1xuICAgIFwiaW1hZ2VcIjogc19jcnlzdGFscyxcbiAgICBcIndpZHRoXCI6IDMyLFxuICAgIFwiaGVpZ2h0XCI6IDMyLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIzXCIsIFwieFwiOiAzMiwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjRcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNVwiLCBcInhcIjogOTYsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI3XCIsIFwieFwiOiAxNjAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI4XCIsIFwieFwiOiAxOTIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI5XCIsIFwieFwiOiAyMjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuZXhwb3J0cy5yZWRfY3J5c3RhbCA9IHtcbiAgICBcImltYWdlXCI6IHNfY3J5c3RhbHMsXG4gICAgXCJ3aWR0aFwiOiAzMixcbiAgICBcImhlaWdodFwiOiAzMixcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMwXCIsIFwieFwiOiAwLCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzMVwiLCBcInhcIjogMzIsIFwieVwiOiA5NiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTMyXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDk2LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzNcIiwgXCJ4XCI6IDk2LCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNFwiLCBcInhcIjogMTI4LCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNVwiLCBcInhcIjogMTYwLCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzNlwiLCBcInhcIjogMTkyLCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzN1wiLCBcInhcIjogMjI0LCBcInlcIjogOTYsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMubWFnZW50YV9jcnlzdGFsID0ge1xuICAgIFwiaW1hZ2VcIjogc19jcnlzdGFscyxcbiAgICBcIndpZHRoXCI6IDMyLFxuICAgIFwiaGVpZ2h0XCI6IDMyLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMzhcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzOVwiLCBcInhcIjogMzIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MVwiLCBcInhcIjogOTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0MlwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDNcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTQ0XCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0NVwiLCBcInhcIjogMjI0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLnllbGxvd19jcnlzdGFsID0ge1xuICAgIFwiaW1hZ2VcIjogc19jcnlzdGFscyxcbiAgICBcIndpZHRoXCI6IDMyLFxuICAgIFwiaGVpZ2h0XCI6IDMyLFxuICAgIFwic3BlZWRcIjogMTQsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNDZcIiwgXCJ4XCI6IDAsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0N1wiLCBcInhcIjogMzIsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0OFwiLCBcInhcIjogNjQsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0OVwiLCBcInhcIjogOTYsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1MFwiLCBcInhcIjogMTI4LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNTFcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDE2MCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTUyXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxNjAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1M1wiLCBcInhcIjogMjI0LCBcInlcIjogMTYwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMuc2tlbGV0b24gPSB7XG4gICAgXCJpbWFnZVwiOiBzX3NrZWxldG9uLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTc5XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODBcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgxXCIsIFwieFwiOiA2NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MlwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgzXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODRcIiwgXCJ4XCI6IDY0LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODVcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4NlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4N1wiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH1cbiAgICAgICAgXVxuICAgIH1cbn07XG5cbmV4cG9ydHMua2F0eSA9IHtcbiAgICBcImltYWdlXCI6IHNfa2F0eSxcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MVwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODJcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLmxldm9uID0ge1xuICAgIFwiaW1hZ2VcIjogc19sZXZvbixcbiAgICBcIndpZHRoXCI6IDEwMCxcbiAgICBcImhlaWdodFwiOiAxMDAsXG4gICAgXCJzcGVlZFwiOiAxNCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3OVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgXSxcbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTgwXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4MVwiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODJcIiwgXCJ4XCI6IDY0LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU4M1wiLCBcInhcIjogMCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTg1XCIsIFwieFwiOiAxMjgsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODZcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlODdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5leHBvcnRzLnZpdGFseSA9IHtcbiAgICBcImltYWdlXCI6IHNfdml0YWx5LFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcbiAgICBcInNwZWVkXCI6IDE0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTE5XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyMVwiLCBcInhcIjogMTI4LCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjJcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTIzXCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyNFwiLCBcInhcIjogMzIwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMjVcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTI2XCIsIFwieFwiOiA0NDgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyN1wiLCBcInhcIjogNTEyLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JrQu9Cw0YHRgdC90YvQtSDQtNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLmNvb2xfcGxhbnRzID0ge1xuICAgIFwiaW1hZ2VcIjogdF9jb29sX3BsYW50cyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlMVwiLCBcInhcIjogNTE5LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTJfMFwiLCBcInhcIjogNDU0LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTNfMFwiLCBcInhcIjogMzg5LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTRcIiwgXCJ4XCI6IDMyNCwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U1XCIsIFwieFwiOiAyNTksIFwieVwiOiA1MTcsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJmb2xpYWdlNlwiLCBcInhcIjogMTk0LCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZm9saWFnZTdcIiwgXCJ4XCI6IDEyOSwgXCJ5XCI6IDUxNywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U4XCIsIFwieFwiOiAzODcsIFwieVwiOiAxMjksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImZvbGlhZ2U5XCIsIFwieFwiOiAzODcsIFwieVwiOiAyNTgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDM4OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicGFsbXRyZWUyXCIsIFwieFwiOiAxMjksIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlM1wiLCBcInhcIjogMTI5LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicGFsbXRyZWU0XCIsIFwieFwiOiAzODcsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInBhbG10cmVlNVwiLCBcInhcIjogNTE2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTFfNFwiLCBcInhcIjogNTE2LCBcInlcIjogMTI5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlMl8xXCIsIFwieFwiOiA1MTYsIFwieVwiOiAyNTgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU0XCIsIFwieFwiOiAzODcsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlNVwiLCBcInhcIjogMjU4LCBcInlcIjogMjU5LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogMTI4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlLXN0cmFuZ2VcIiwgXCJ4XCI6IDEyOSwgXCJ5XCI6IDI1OSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicGFsbXRyZWU2XCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTZcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDEyOSwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTdcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU4XCIsIFwieFwiOiAxMjksIFwieVwiOiAxMzAsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWU5XCIsIFwieFwiOiA1MTYsIFwieVwiOiAzODcsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiA5N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZTNcIiwgXCJ4XCI6IDAsIFwieVwiOiAyNTksIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQtdGA0YLQstGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5kZWFkX3BsYW50cyA9IHtcbiAgICBcImltYWdlXCI6IHRfY29vbF9wbGFudHMsXG5cbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICAgIFwiZGVmYXVsdFwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZGVhZHRyZWUxXzBcIiwgXCJ4XCI6IDAsIFwieVwiOiA1MTcsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiA5N30sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZGVhZHRyZWUyXCIsIFwieFwiOiAyNTgsIFwieVwiOiAzODgsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRlYWR0cmVlM1wiLCBcInhcIjogMCwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQtdGA0YLQstGL0LUg0LTQtdGA0LXQstGM0Y9cbiAqL1xuZXhwb3J0cy5hbmRzdG9uZXMgPSB7XG4gICAgXCJpbWFnZVwiOiB0X2FuZHN0b25lcyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwMlwiLCBcInhcIjogMCwgXCJ5XCI6IDMzLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDNcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NiwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA0XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIwNVwiLCBcInhcIjogNjUsIFwieVwiOiAzMywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA2XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDY2LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDdcIiwgXCJ4XCI6IDAsIFwieVwiOiA5OSwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIjA4XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDk5LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiMDlcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMzIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCIxMFwiLCBcInhcIjogNjUsIFwieVwiOiAxMzIsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDMyfVxuICAgICAgICBdXG4gICAgfVxufTsiLCIvKipcbiAqINCd0LDQsdC+0YDRiyDRgdC/0YDQsNC50YLQvtCyXG4gKi9cblxuXG4vL9Ca0LDRgNGC0LjQvdC60LhcbmxldCB0X3BsYW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X3BsYW50cycpO1xubGV0IHNfZ3JhdmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfZ3JhdmVzJyk7XG5sZXQgc19jYW1wZmlyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2NhbXBmaXJlJyk7XG5cblxuLyoqXG4gKiDQn9GD0YHRgtGL0L3QvdC+0LVcbiAqL1xuZXhwb3J0cy5kZXNlcnQgPSBbe1wiaW1hZ2VcIjogdF9wbGFudHMsIFwid2lkdGhcIjogMjcsIFwiaGVpZ2h0XCI6IDU4LCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlN1wiLCBcInhcIjogMTk4LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDI3LCBcImhlaWdodFwiOiA1OH1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsIFwid2lkdGhcIjogNzYsIFwiaGVpZ2h0XCI6IDkyLCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMTRcIiwgXCJ4XCI6IDIzMywgXCJ5XCI6IDMzMCwgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogOTJ9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA4NywgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTE2XCIsIFwieFwiOiAyNDQsIFwieVwiOiAyMzgsIFwid2lkdGhcIjogNjAsIFwiaGVpZ2h0XCI6IDg3fV19fSxcblxuXTtcblxuLyoqXG4gKiDQodGC0YDQsNC90L3Ri9C1INC00LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMuYmVsd29vZCA9IFtcbiAgICB7XCJpbWFnZVwiOiB0X3BsYW50cyxcIndpZHRoXCI6IDEwNywgXCJoZWlnaHRcIjogMTI4LCBcInN0YXRlc1wiOiB7IFwiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMTA3LCBcImhlaWdodFwiOiAxMjh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDg5LCBcImhlaWdodFwiOiAxMjgsIFwic3RhdGVzXCI6IHsgXCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMlwiLCBcInhcIjogMTA4LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDg5LCBcImhlaWdodFwiOiAxMjh9XX19LFxuICAgIHtcImltYWdlXCI6IHRfcGxhbnRzLCBcIndpZHRoXCI6IDk1LCBcImhlaWdodFwiOiAxMTcsIFwic3RhdGVzXCI6IHsgXCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlMTlcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMzAsIFwid2lkdGhcIjogOTUsIFwiaGVpZ2h0XCI6IDExN31dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9wbGFudHMsXCJ3aWR0aFwiOiAxMjYsIFwiaGVpZ2h0XCI6IDExNiwgXCJzdGF0ZXNcIjogeyBcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUyMFwiLCBcInhcIjogMjQ0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAxMjYsIFwiaGVpZ2h0XCI6IDExNn1dfX0sXG5dO1xuXG5cblxuLyoqXG4gKiDQlNC10YDQtdCy0YzRj1xuICovXG5leHBvcnRzLmJ1c2hzID0gW1xuICAgIHtcImltYWdlXCI6IHRfYnVzaHMsIFwid2lkdGhcIjogMTEzLCBcImhlaWdodFwiOiAxMTgsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiAxMzYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDExMywgXCJoZWlnaHRcIjogMTE4fV19fSxcbiAgICB7XCJpbWFnZVwiOiB0X2J1c2hzLCBcIndpZHRoXCI6IDEwMiwgXCJoZWlnaHRcIjogMTQwLCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTAyLCBcImhlaWdodFwiOiAxNDB9XX19LFxuXTtcblxuLyoqXG4gKiDQndCw0LTQs9GA0L7QsdGM0Y9cbiAqL1xuZXhwb3J0cy5ncmF2ZXMgPSBbXG4gICAge1wiaW1hZ2VcIjogc19ncmF2ZXMsIFwid2lkdGhcIjogMjIsIFwiaGVpZ2h0XCI6IDMyLCBcInN0YXRlc1wiOiB7XCJkZWZhdWx0XCI6IFt7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTY1LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAyMiwgXCJoZWlnaHRcIjogMzJ9LF19fSxcbiAgICB7XCJpbWFnZVwiOiBzX2dyYXZlcywgXCJ3aWR0aFwiOiAyOCwgXCJoZWlnaHRcIjogMjcsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA5OCwgXCJ5XCI6IDIsIFwid2lkdGhcIjogMjgsIFwiaGVpZ2h0XCI6IDI3fV19fSxcbl07XG5cbi8qKlxuICog0JrQvtGB0YLRgNGLXG4gKi9cbmV4cG9ydHMuY2FtcGZpcmUgPSBbXG4gICAge1wiaW1hZ2VcIjogc19jYW1wZmlyZSwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjQsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW1xuICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTJcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlM1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNFwiLCBcInhcIjogMTkyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlNVwiLCBcInhcIjogMjU2LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgXX19LFxuXTtcblxuLyoqXG4gKiDQmtC70LDRgdGB0L3Ri9C1INC00LXRgNC10LLRjNGPXG4gKi9cbi8qXG5leHBvcnRzLmNvb2xfcGxhbnRzID0gW1xuICAgIHtcImltYWdlXCI6IHRfY29vbF9wbGFudHMsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiA5NywgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcImRlYWR0cmVlMV8wXCIsIFwieFwiOiAwLCBcInlcIjogNTE3LCBcIndpZHRoXCI6IDEyOCwgXCJoZWlnaHRcIjogOTd9XX19LFxuICAgIHtcImltYWdlXCI6IHRfY29vbF9wbGFudHMsIFwid2lkdGhcIjogMTI4LCBcImhlaWdodFwiOiAxMjgsIFwic3RhdGVzXCI6IHtcImRlZmF1bHRcIjogW3tcIm5hbWVcIjogXCJkZWFkdHJlZTJcIiwgXCJ4XCI6IDI1OCwgXCJ5XCI6IDM4OCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH1dfX0sXG4gICAge1wiaW1hZ2VcIjogdF9jb29sX3BsYW50cywgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOCwgXCJzdGF0ZXNcIjoge1wiZGVmYXVsdFwiOiBbe1wibmFtZVwiOiBcImRlYWR0cmVlM1wiLCBcInhcIjogMCwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiAxMjgsIFwiaGVpZ2h0XCI6IDEyOH1dfX0sXG5dOyovXG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9