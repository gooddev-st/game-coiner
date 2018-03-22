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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client.js");
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

var _sprites = __webpack_require__(/*! ./sprites.js */ "./sprites.js");

var _sprites2 = _interopRequireDefault(_sprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = new _character2.default(_sprites2.default.doc),
    prof = new _character2.default(_sprites2.default.prof),
    gob = new _character2.default(_sprites2.default.gob),
    girl = new _character2.default(_sprites2.default.girl),
    blond = new _character2.default(_sprites2.default.blond),
    mag = new _character2.default(_sprites2.default.mag),
    teleport = new _character2.default(_sprites2.default.teleport),
    coin_gold = new _character2.default(_sprites2.default.coin_gold),
    coin_silver = new _character2.default(_sprites2.default.coin_silver),
    coin_copper = new _character2.default(_sprites2.default.coin_copper),
    pointer = new _character2.default(_sprites2.default.pointer);

exports.default = { doc: doc, prof: prof, gob: gob, girl: girl, blond: blond, mag: mag, teleport: teleport, coin_gold: coin_gold, coin_silver: coin_silver, coin_copper: coin_copper, pointer: pointer };

/***/ }),

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
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

/***/ "./engine/camera.js":
/*!**************************!*\
  !*** ./engine/camera.js ***!
  \**************************/
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
        key: "run",
        value: function run(room) {

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
    function Character(sprite) {
        _classCallCheck(this, Character);

        this.sprite = sprite;

        this.width = sprite.width;
        this.height = sprite.height;
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
     * @param unit_level
     * @param volume - значение индикатора
     */


    _createClass(Character, [{
        key: 'draw',
        value: function draw(context, x, y, state, frameNum, width, height) {

            if (!state || !this.sprite.states[state]) {
                state = 'default';
            }
            if (!frameNum) frameNum = 0;

            if (!this.sprite.states[state] || !this.sprite.states[state][frameNum]) return;

            // Рисуем кадр
            this.drawFrame(context, this.sprite.image, this.sprite.states[state][frameNum], x, y, this.width, this.height);
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
            context.drawImage(image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, width, height);
        }
    }]);

    return Character;
}();

exports.default = Character;

/***/ }),

/***/ "./engine/controller.js":
/*!******************************!*\
  !*** ./engine/controller.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ./events.js */ "./engine/events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Варианты управления
var KEYS_ARROW = {
    LEFT: 37, //Left
    UP: 38, //Up
    RIGHT: 39, //Right
    DOWN: 40, //Down
    STATISTIC: 191 // "/"
},
    //Управление стрелками

KEYS_WASD = {
    LEFT: 65, //A
    UP: 87, //W
    RIGHT: 68, //D
    DOWN: 83, // S
    STATISTIC: 191 // "/"
}; //Управление кнопками W A S D

// По-умолчанию управляем стрелками
//TODO: функция смены управления
/**
 * Контроллер - клавиши и мышь
 * TODO: может команды меню тоже событиями
 */

// подключим события
var keys = KEYS_ARROW;

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
}

/**
 * Остановим контроллер
 */
function stop() {

    window.removeEventListener("blur", onWindowBlur, false);
    document.removeEventListener("keydown", onKeydown, false);
    document.removeEventListener("keyup", onKeyup, false);
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
            // left arrow
            _events2.default.add('keydown', 'left');
            break;
        case keys.UP:
            // up arrow
            _events2.default.add('keydown', 'up');
            break;
        case keys.RIGHT:
            // right arrow
            _events2.default.add('keydown', 'right');
            break;
        case keys.DOWN:
            // down arrow
            _events2.default.add('keydown', 'down');
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
            _events2.default.add('keyup', 'left');
            break;
        case keys.UP:
            _events2.default.add('keyup', 'up');
            break;
        case keys.RIGHT:
            _events2.default.add('keyup', 'right');
            break;
        case keys.DOWN:
            _events2.default.add('keyup', 'down');
            break;
        case keys.STATISTIC:
            _events2.default.add('keyup', 'statistic');
            break;
        // case 32: // пробел для паузы
        //     Game.togglePause();
        //     break;
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

/**
 * Если окно потеряло фокус
 */
function onWindowBlur() {
    // отожмем все клавиши
    _events2.default.add('keyup', 'left');
    _events2.default.add('keyup', 'up');
    _events2.default.add('keyup', 'right');
    _events2.default.add('keyup', 'down');

    // очистим цель мыши
    _events2.default.add('target', null);
}

/***/ }),

/***/ "./engine/entity.js":
/*!**************************!*\
  !*** ./engine/entity.js ***!
  \**************************/
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


var _constants = __webpack_require__(/*! ../constants */ "./constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
    function Entity(x, y, character, lifetime) {
        _classCallCheck(this, Entity);

        this.x = x;
        this.y = y;

        this.character = character;

        // время жизни
        this.lifetime = lifetime;

        this.width = this.character.width;
        this.height = this.character.height;

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;

        this.state = "default";
    }

    _createClass(Entity, [{
        key: "isDie",
        value: function isDie() {

            if (this.lifetime > 0) {
                this.lifetime -= _constants.STEP;
            }

            return !(this.lifetime > 0);
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

/***/ "./engine/events.js":
/*!**************************!*\
  !*** ./engine/events.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _account = __webpack_require__(/*! ../account */ "./account.js");

var _account2 = _interopRequireDefault(_account);

var _socket = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");

var _socket2 = _interopRequireDefault(_socket);

var _logs = __webpack_require__(/*! ../logs.js */ "./logs.js");

var _logs2 = _interopRequireDefault(_logs);

var _ui = __webpack_require__(/*! ./ui/ui.js */ "./engine/ui/ui.js");

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
        serverSocket = (0, _socket2.default)();
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

/***/ "./engine/hero.js":
/*!************************!*\
  !*** ./engine/hero.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _unit = __webpack_require__(/*! ./unit.js */ "./engine/unit.js");

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

/***/ "./engine/loot.js":
/*!************************!*\
  !*** ./engine/loot.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Loot
 */
var _class = function () {
    function _class(room_id, x, y, character, ID, width, height) {
        _classCallCheck(this, _class);

        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = character;

        this.state = 'default';

        this.animateSpeed = 14;
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    _createClass(_class, [{
        key: 'set',
        value: function set(room_id, x, y, character, ID) {
            this.ID = ID;
            this.room_id = room_id;
            this.x = x;
            this.y = y;
            this.character = character;
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

/***/ "./engine/room.js":
/*!************************!*\
  !*** ./engine/room.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //Настройки рандомных цветов комнаты

var _sprites = __webpack_require__(/*! ../sprites.js */ "./sprites.js");

var _sprites2 = _interopRequireDefault(_sprites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENVIRONMENTS = {
    0: {
        r: { start: 120, rand: 10 },
        g: { start: 120, rand: 16 },
        b: { start: 100, rand: 5 }
    },
    1: {
        r: { start: 70, rand: 16 },
        g: { start: 100, rand: 23 },
        b: { start: 100, rand: 5 }
    },
    2: {
        r: { start: 210, rand: 45 },
        g: { start: 30, rand: 75 },
        b: { start: 30, rand: 75 }
    }
};
/**
 * @class Room
 */

var _class = function () {
    function _class(width, height, environment_id) {
        _classCallCheck(this, _class);

        this.width = width;
        this.height = height;
        this.environment_id = environment_id;
        this.image = null;

        this.generate(Math.floor(width / 50 + height / 50));
    }

    _createClass(_class, [{
        key: 'randomCSScolor',
        value: function randomCSScolor(environment_id) {
            var e = ENVIRONMENTS[environment_id];
            var r = e.r.start + Math.floor(Math.random() * e.r.rand),
                g = e.g.start + Math.floor(Math.random() * e.g.rand),
                b = e.b.start + Math.floor(Math.random() * e.b.rand);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }
    }, {
        key: 'generate',
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

            //Сгенерим деревья
            for (var _i = 0; _i < trees_num; _i++) {
                var id = Math.floor(Math.random() * _sprites2.default.trees.states.default.length),
                    tile = _sprites2.default.trees.states.default[id],
                    _x = Math.random() * (this.width + 2 * tile.width) - tile.width,
                    _y = Math.random() * (this.height + 2 * tile.height) - tile.height,
                    w = tile.width,
                    h = tile.height,
                    sx = tile.x,
                    sy = tile.y;

                if (_x < 0) {
                    w += _x;sx -= _x;_x = 0;
                }
                if (_y < 0) {
                    h += _y;sy -= _y;_y = 0;
                }
                if (_x >= this.width - tile.width) {
                    w = _x - (this.width - tile.width);
                }
                if (_y >= this.height - tile.height) {
                    h = _y - (this.height - tile.height);
                }

                ctx.drawImage(_sprites2.default.trees.image, sx, sy, w, h, _x, _y, w, h);
            }

            //Сгенерим кусты
            /*for(let i = 0; i<trees_num; i++){
                let id = Math.floor(Math.random()*sprites.bushs.states.default.length),
                     tile = sprites.bushs.states.default[id],
                     x = Math.random()*(this.width + tile.width) - tile.width,
                    y = Math.random()*(this.height + tile.height) - tile.height,
                    w = tile.width, h = tile.height, sx = tile.x, sy = tile.y;
                 if(x < 0){w += x;sx -= x;x = 0;}
                if(y < 0){h += y;sy -= y;y = 0;}
                if(x >= this.width - tile.width){ w = x - (this.width - tile.width);}
                if(y >= this.height - tile.height){ h = y - (this.height - tile.height);}
                 ctx.drawImage(sprites.bushs.image, sx, sy, w, h, x, y, w, h);
             }*/

            ctx.restore();

            // Сохраним картинкой
            this.image = new Image();
            this.image.src = ctx.canvas.toDataURL("image/png");

            ctx = null;
        }
    }, {
        key: 'draw',
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

/***/ "./engine/teleport.js":
/*!****************************!*\
  !*** ./engine/teleport.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class Teleport
 */
var _class = function () {
    function _class(room_id, x, y, character, ID, target, state, width, height) {
        _classCallCheck(this, _class);

        this.ID = ID;
        this.room_id = room_id;
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = character;

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
            this.state = state;
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

/***/ "./engine/ui/heroinfo.js":
/*!*******************************!*\
  !*** ./engine/ui/heroinfo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../events */ "./engine/events.js");

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

        if (confirm("Точно выйти?")) {
            _events2.default.add('signout', null);
        }

        e.stopPropagation();
        e.preventDefault();
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
    levelupcounterElement && (levelupcounterElement.innerText = info.levelupCounter);
}

/***/ }),

/***/ "./engine/ui/top10.js":
/*!****************************!*\
  !*** ./engine/ui/top10.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../events */ "./engine/events.js");

var _events2 = _interopRequireDefault(_events);

var _logs = __webpack_require__(/*! ../../logs */ "./logs.js");

var _logs2 = _interopRequireDefault(_logs);

var _ui = __webpack_require__(/*! ./ui */ "./engine/ui/ui.js");

var _ui2 = _interopRequireDefault(_ui);

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
    top10Element.addEventListener('click', onClick, false);

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
    top10Element.removeEventListener('click', onClick, false);
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
    /*let target = e.target || e.srcElement;
     if(target.id && target.id=="top10-panel"){*/

    if (isActive()) {
        hide();
    } else {
        show();
    }

    e.stopPropagation();
    e.preventDefault();
    return false;
    // }
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
                        <div id="hero_speed" class="value">' + player.level + '</div>\
                    </div>\
';
                top10ContentElement.innerHTML = content;
            });
        }
    }
}

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

var _waitscreen = __webpack_require__(/*! ./waitscreen.js */ "./engine/ui/waitscreen.js");

var _waitscreen2 = _interopRequireDefault(_waitscreen);

var _heroinfo = __webpack_require__(/*! ./heroinfo.js */ "./engine/ui/heroinfo.js");

var _heroinfo2 = _interopRequireDefault(_heroinfo);

var _top = __webpack_require__(/*! ./top10.js */ "./engine/ui/top10.js");

var _top2 = _interopRequireDefault(_top);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Окно информации о герое
exports.default = { heroInfo: _heroinfo2.default, waitScreen: _waitscreen2.default, top10: _top2.default };
// Окно информации о герое
/**
 * Интерфейс пользователя
 */

// Окно авторизации
// import login from './login.js';
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

/***/ "./engine/unit.js":
/*!************************!*\
  !*** ./engine/unit.js ***!
  \************************/
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


var _constants = __webpack_require__(/*! ../constants */ "./constants.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Unit = function () {
    /**
     * Конструктор
     * @param room_id
     * @param x
     * @param y
     * @param character
     * @param name
     * @param state
     * @param level
     * @param coins_count
     * @param levelupCounter
     * @param width
     * @param height
     */
    function Unit(room_id, x, y, width, height, character, name, state, level, coins_count, levelupCounter) {
        _classCallCheck(this, Unit);

        this.room_id = room_id;

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.character = character;

        this.state = state;

        this.name = name;

        this.level = level;
        this.coins_count = coins_count;
        this.levelupCounter = levelupCounter;

        this.animateSpeed = 14; //TODO: вынести в character
        this.faza = 0;
        this.currentSpriteNum = 0;
    }

    /**
     * Установка параметров юнита
     * @param room_id
     * @param x
     * @param y
     * @param character
     * @param name
     * @param state
     * @param level
     * @param coins_count
     * @param levelupCounter
     */


    _createClass(Unit, [{
        key: "set",
        value: function set(room_id, x, y, character, name, state, level, coins_count, levelupCounter) {
            this.room_id = room_id;
            this.x = x;
            this.y = y;
            this.character = character;

            this.name = name;

            this.state = state;

            this.level = level;
            this.coins_count = coins_count;
            this.levelupCounter = levelupCounter;
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

            this.drawCharacter(camera.context, x, y);

            // Если есть - рисуем индикатор
            if (this.levelupCounter != undefined && this.levelupCounter != null) {
                var volume = Math.floor(10 - this.levelupCounter % 11) * 10;
                this.drawVolume(camera.context, x, y, volume);
            }

            // Если есть - рисуем уровень
            if (this.level != undefined && this.level != null) {
                this.drawLevel(camera.context, x, y, this.level);
            }

            // Рисуем имя
            if (this.level != undefined && this.level != null) {
                this.drawName(camera.context, x, y, this.name);
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

            var volumeWidth = 70;
            var volumeHeight = 9;
            var volumeX = x + (this.width - volumeWidth) / 2;
            var volumeY = y - 50;

            context.save();
            context.beginPath();
            context.fillStyle = "red";
            context.fillRect(volumeX, volumeY, Math.floor(volumeWidth * value / 100), volumeHeight);
            context.rect(volumeX - 1, volumeY - 1, volumeWidth + 2, volumeHeight + 2);
            context.stroke();
            context.restore();
        }

        /**
         * Рисуем уровень
         * @param context
         * @param sx
         * @param sy
         * @param level
         */

    }, {
        key: "drawLevel",
        value: function drawLevel(context, sx, sy, level) {

            var textWidth = context.measureText(level).width,
                x = sx + (this.width - textWidth) / 2,
                y = sy - 42;

            context.save();
            context.font = "bold 11px Arial";
            context.fillStyle = "white";
            context.fillText(level, x, y);
            context.restore();
        }

        /**
         * Рисуем имя
         * @param context
         * @param sx
         * @param sy
         * @param name
         */

    }, {
        key: "drawName",
        value: function drawName(context, sx, sy, name) {

            context.save();
            context.fillStyle = "yellow";

            context.font = "14px sans-serif";

            var textWidth = context.measureText(name).width,
                x = sx + (this.width - textWidth) / 2,
                y = sy - 60;

            context.fillText(name, x, y);
            context.restore();
        }
    }]);

    return Unit;
}();

exports.default = Unit;

/***/ }),

/***/ "./entities.js":
/*!*********************!*\
  !*** ./entities.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _characters = __webpack_require__(/*! ./characters */ "./characters.js");

var _characters2 = _interopRequireDefault(_characters);

var _entity = __webpack_require__(/*! ./engine/entity */ "./engine/entity.js");

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { add: add, remove: remove, reset: reset, size: size, each: each };


var entities = [];

function add(x, y, ID, lifetime) {
    entities.push(new _entity2.default(x, y, _characters2.default[ID], lifetime));
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

var _events = __webpack_require__(/*! ./engine/events.js */ "./engine/events.js");

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

var _camera = __webpack_require__(/*! ../../engine/camera */ "./engine/camera.js");

var _camera2 = _interopRequireDefault(_camera);

var _units = __webpack_require__(/*! ../../units */ "./units.js");

var _units2 = _interopRequireDefault(_units);

var _events = __webpack_require__(/*! ../../engine/events */ "./engine/events.js");

var _events2 = _interopRequireDefault(_events);

var _hero = __webpack_require__(/*! ../../engine/hero */ "./engine/hero.js");

var _hero2 = _interopRequireDefault(_hero);

var _characters = __webpack_require__(/*! ../../characters */ "./characters.js");

var _characters2 = _interopRequireDefault(_characters);

var _unit4 = __webpack_require__(/*! ../../engine/unit */ "./engine/unit.js");

var _unit5 = _interopRequireDefault(_unit4);

var _teleport = __webpack_require__(/*! ../../engine/teleport */ "./engine/teleport.js");

var _teleport2 = _interopRequireDefault(_teleport);

var _room = __webpack_require__(/*! ../../engine/room */ "./engine/room.js");

var _room2 = _interopRequireDefault(_room);

var _loot = __webpack_require__(/*! ../../engine/loot */ "./engine/loot.js");

var _loot2 = _interopRequireDefault(_loot);

var _ui = __webpack_require__(/*! ../../engine/ui/ui */ "./engine/ui/ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _controller = __webpack_require__(/*! ../../engine/controller */ "./engine/controller.js");

var _controller2 = _interopRequireDefault(_controller);

var _sounds = __webpack_require__(/*! ../../sounds */ "./sounds.js");

var _sounds2 = _interopRequireDefault(_sounds);

var _entities = __webpack_require__(/*! ../../entities */ "./entities.js");

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
            _entities2.default.add(pos.x, pos.y, 'pointer', .3);
        }
    });

    _ui2.default.top10.start();

    /**
     * Основной цикл
     */
    interval = setInterval(function () {

        // Перемещение, управляемое на клиенте
        update();

        // Анимация
        animate();

        // Отрисовка
        draw(camera);
    }, constants.INTERVAL);
}

function stop() {
    clearInterval(interval);
    _events2.default.off("reconnect", onReconnect);
    _events2.default.off("room", onRoom);
    _events2.default.off("hero");
    _events2.default.off("sound");

    _events2.default.off("click");

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
    if (type == "change") {
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
    if (type == "player-create") {
        //TODO: переименовать в unit-create
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined || info.level == undefined) throw "Ошибка получения с сервера";

            var character = _characters2.default[info.character_id] || _characters2.default["man"];

            var unit = new _unit5.default(info.room_id, info.x, info.y, info.width, info.height, character, info.ID, info.state, info.level);
            _units2.default.add(info.ID, unit);
        } catch (e) {
            (0, _logs2.default)("Ошибка получения игрока. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация об игроке
    if (type == "player-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined || info.state == undefined || info.level == undefined) throw "Ошибка получения с сервера";

            var _unit = _units2.default.item(info.ID);
            if (_unit) {

                var _character = _characters2.default[info.character_id] || _characters2.default["man"];

                _unit.set(info.room_id, info.x, info.y, _character, info.ID, info.state, info.level);
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка обновления игрока. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Игрок ушел
    if (type == "player-leave") {
        try {
            if (!data.ID) throw "Ошибка получения с сервера";

            if (data.room_id == room_id) {
                _units2.default.remove(data.ID);
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка удаления игрока. " + e);
            (0, _logs2.default)(data);
        }
    }

    // Информация о луте
    if (type == "loot-info") {
        try {
            if (!data.info) throw "Ошибка получения с сервера";

            var info = data.info;

            if (info.ID == undefined || info.x == undefined || info.y == undefined || info.character_id == undefined || info.room_id == undefined) throw "Ошибка получения с сервера";

            if (info.room_id == room_id) {

                var _character2 = _characters2.default[info.character_id] || _characters2.default["gold_coin"];

                if (info.ID in loots) {
                    loots[info.ID].set(info.room_id, info.x, info.y, _character2, info.ID);
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

            var _character3 = _characters2.default[info.character_id] || _characters2.default["gob"];

            var _unit2 = new _unit5.default(info.room_id, info.x, info.y, info.width, info.height, _character3, info.ID, info.state);
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

                var _character4 = _characters2.default[info.character_id] || _characters2.default["gob"];

                _unit3.set(info.room_id, info.x, info.y, _character4, info.ID, info.state);
            }
        } catch (e) {
            (0, _logs2.default)("Ошибка обновления моба. " + e);
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

            var character = _characters2.default[info.character_id] || _characters2.default["doc"];

            if (!_hero2.default.unit) {
                _hero2.default.unit = new _unit5.default(info.room_id, info.x, info.y, info.width, info.height, character, '[' + info.ID + ']', info.state, info.level, info.coins_count, info.levelupCounter);
            } else {
                _hero2.default.unit.set(info.room_id, info.x, info.y, character, '[' + info.ID + ']', info.state, info.level, info.coins_count, info.levelupCounter);
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

            var _character5 = _characters2.default[info.character_id] || _characters2.default["doc"];
            _hero2.default.unit.set(info.room_id, info.x, info.y, _character5, '[' + info.ID + ']', info.state, info.level, info.coins_count, info.levelupCounter);

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
    camera && camera.run(room);

    //Удалим отработавшие сущности
    _entities2.default.each(function (entity, index) {
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

    room_id = settings.ID;

    // Сделаем комнату или возмем из кеша
    if (settings.ID in rooms) {
        room = rooms[settings.ID];
    } else {
        room = new _room2.default(settings.width, settings.height, settings.environment_id);
        rooms[settings.ID] = room;
    }

    if ('loot' in settings) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = settings.loot[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var item = _step3.value;


                var character = _characters2.default[item.character_id] || _characters2.default["coin_gold"];

                loots[item.ID] = new _loot2.default(room_id, item.x, item.y, character, item.ID, item.width, item.height);
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

    if ('teleports' in settings) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = settings.teleports[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _item = _step4.value;


                var _character6 = _characters2.default[_item.character_id] || _characters2.default["teleport"];

                teleports[_item.ID] = new _teleport2.default(room_id, _item.x, _item.y, _character6, _item.ID, _item.target, _item.state, _item.width, _item.height);
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
    "teleport": new _sound2.default('sound/teleport/flaunch.wav')
};

/***/ }),

/***/ "./sprites.js":
/*!********************!*\
  !*** ./sprites.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Картинки спрайтов
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
    s_pointer = document.getElementById('s_pointer');

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
        "default": [{ "name": "sprite1", "x": 103, "y": 100, "width": 25, "height": 30 }, { "name": "sprite2", "x": 103, "y": 60, "width": 30, "height": 39 }, { "name": "sprite3", "x": 136, "y": 0, "width": 113, "height": 118 }, { "name": "sprite4", "x": 0, "y": 0, "width": 102, "height": 140 }, { "name": "sprite5", "x": 156, "y": 119, "width": 15, "height": 13 }, { "name": "sprite6", "x": 103, "y": 40, "width": 21, "height": 19 }, { "name": "sprite7", "x": 136, "y": 119, "width": 19, "height": 19 }, { "name": "sprite8", "x": 103, "y": 0, "width": 32, "height": 39 }]
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
    "width": 50,
    "height": 50,

    "states": {
        "default": [{ "name": "sprite1", "x": 0, "y": 0, "width": 201, "height": 201 }, { "name": "sprite2", "x": 201, "y": 0, "width": 201, "height": 201 }, { "name": "sprite3", "x": 402, "y": 0, "width": 201, "height": 201 }, { "name": "sprite4", "x": 603, "y": 0, "width": 201, "height": 201 }, { "name": "sprite5", "x": 804, "y": 0, "width": 201, "height": 201 }, { "name": "sprite6", "x": 0, "y": 201, "width": 201, "height": 201 }, { "name": "sprite7", "x": 201, "y": 201, "width": 201, "height": 201 }, { "name": "sprite8", "x": 402, "y": 201, "width": 201, "height": 201 }, { "name": "sprite9", "x": 603, "y": 201, "width": 201, "height": 201 }, { "name": "sprite10", "x": 804, "y": 201, "width": 201, "height": 201 }]
    }
};

/***/ }),

/***/ "./units.js":
/*!******************!*\
  !*** ./units.js ***!
  \******************/
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

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYWNjb3VudC5qcyIsIndlYnBhY2s6Ly8vLi9jaGFyYWN0ZXJzLmpzIiwid2VicGFjazovLy8uL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL2NhbWVyYS5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvY2hhcmFjdGVyLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS9lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvaGVyby5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvbG9vdC5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvcm9vbS5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvc291bmQuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL3RlbGVwb3J0LmpzIiwid2VicGFjazovLy8uL2VuZ2luZS91aS9oZXJvaW5mby5qcyIsIndlYnBhY2s6Ly8vLi9lbmdpbmUvdWkvdG9wMTAuanMiLCJ3ZWJwYWNrOi8vLy4vZW5naW5lL3VpL3VpLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS91aS93YWl0c2NyZWVuLmpzIiwid2VicGFjazovLy8uL2VuZ2luZS91bml0LmpzIiwid2VicGFjazovLy8uL2VudGl0aWVzLmpzIiwid2VicGFjazovLy8uL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbG9ncy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWZ0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWNrbzIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1hcnJheWJ1ZmZlci9saWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9ibG9iL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1pbmhlcml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3RyYW5zcG9ydHMvcG9sbGluZy1qc29ucC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIveG1saHR0cHJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvbGliL3V0ZjguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNlcXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3NvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvdXJsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9pcy1idWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvLWFycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWVhc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL21haW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2NlbmVzL3NpZ25pbi5qcyIsIndlYnBhY2s6Ly8vLi9zb3VuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3ByaXRlcy5qcyIsIndlYnBhY2s6Ly8vLi91bml0cy5qcyIsIndlYnBhY2s6Ly8vd3MgKGlnbm9yZWQpIl0sIm5hbWVzIjpbImdldFVzZXIiLCJzZXRVc2VyIiwic2lnbm91dCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJsb2dpbiIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwiZG9jIiwicHJvZiIsImdvYiIsImdpcmwiLCJibG9uZCIsIm1hZyIsInRlbGVwb3J0IiwiY29pbl9nb2xkIiwiY29pbl9zaWx2ZXIiLCJjb2luX2NvcHBlciIsInBvaW50ZXIiLCJ3aW5kb3ciLCJvbmxvYWQiLCJydW4iLCJGUFMiLCJJTlRFUlZBTCIsIlNURVAiLCJNQVhfREVBRFpPTkVfWCIsIk1BWF9ERUFEWk9ORV9ZIiwieCIsInkiLCJjYW52YXMiLCJmb2xsb3dlciIsIndpZHRoIiwiaGVpZ2h0IiwiZGVhZFpvbmUiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInNwZWVkIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiTWF0aCIsImZsb29yIiwicm9vbSIsInJ1bkZvbGxvdyIsInBsYXllciIsIkNoYXJhY3RlciIsInNwcml0ZSIsInN0YXRlIiwiZnJhbWVOdW0iLCJzdGF0ZXMiLCJkcmF3RnJhbWUiLCJpbWFnZSIsImRyYXdJbWFnZSIsIktFWVNfQVJST1ciLCJMRUZUIiwiVVAiLCJSSUdIVCIsIkRPV04iLCJTVEFUSVNUSUMiLCJLRVlTX1dBU0QiLCJrZXlzIiwiY2xpY2tQYWQiLCJzdGFydCIsInN0b3AiLCJzZXRDbGlja1BhZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbldpbmRvd0JsdXIiLCJkb2N1bWVudCIsIm9uS2V5ZG93biIsIm9uS2V5dXAiLCJvbkNsaWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9jbGlja1BhZCIsImUiLCJrZXlDb2RlIiwiYWRkIiwiY2xpZW50WCIsImNsaWVudFkiLCJFbnRpdHkiLCJjaGFyYWN0ZXIiLCJsaWZldGltZSIsImFuaW1hdGVTcGVlZCIsImZhemEiLCJjdXJyZW50U3ByaXRlTnVtIiwibGVuZ3RoIiwiY2FtZXJhIiwiZHJhd0NoYXJhY3RlciIsInN4Iiwic3kiLCJkcmF3IiwiaW5pdCIsIm9uIiwib2ZmIiwic2VydmVyU29ja2V0IiwiY29ubmVjdCIsIndhaXRTY3JlZW4iLCJzaG93Iiwic2V0VGltZW91dCIsImhhbmRsZXJzIiwiZXZlbnROYW1lIiwiZGF0YSIsInJ1bkhhbmRsZXJzIiwiZW1pdCIsImNhbGxiYWNrIiwicHVzaCIsIkpTT04iLCJwYXJzZSIsInR5cGUiLCJtZXNzYWdlIiwiaGFuZGxlciIsImgiLCJ1bml0IiwiYW5pbWF0ZSIsInJvb21faWQiLCJJRCIsInN0ZXAiLCJFTlZJUk9OTUVOVFMiLCJyIiwicmFuZCIsImciLCJiIiwiZW52aXJvbm1lbnRfaWQiLCJnZW5lcmF0ZSIsInJhbmRvbSIsInRyZWVzX251bSIsImN0eCIsImNyZWF0ZUVsZW1lbnQiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsImNvbHVtbnMiLCJzYXZlIiwiaSIsImoiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJyYW5kb21DU1Njb2xvciIsImZpbGxSZWN0IiwiY2xvc2VQYXRoIiwiaWQiLCJ0cmVlcyIsImRlZmF1bHQiLCJ0aWxlIiwidyIsInJlc3RvcmUiLCJJbWFnZSIsInNyYyIsInRvRGF0YVVSTCIsInN3Iiwic2giLCJkeCIsImR5IiwiZHciLCJkaCIsInNvdW5kIiwic2V0QXR0cmlidXRlIiwic3R5bGUiLCJkaXNwbGF5IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY3VycmVudFRpbWUiLCJwYXVzZSIsInBsYXkiLCJ0YXJnZXQiLCJ1cGRhdGUiLCJoZXJvX2luZm9FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJoZXJvX25hbWVFbGVtZW50Iiwic2NvcmVFbGVtZW50IiwibGV2ZWxFbGVtZW50IiwibGV2ZWx1cGNvdW50ZXJFbGVtZW50Iiwic3BlZWRFbGVtZW50Iiwic3JjRWxlbWVudCIsImNvbmZpcm0iLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImluZm8iLCJpbm5lclRleHQiLCJjb2luc19jb3VudCIsImxldmVsIiwibGV2ZWx1cENvdW50ZXIiLCJhY3RpdmUiLCJpc0FjdGl2ZSIsImhpZGUiLCJ0b3AxMEVsZW1lbnQiLCJ0b3AxMENvbnRlbnRFbGVtZW50IiwicmlnaHQiLCJBcnJheSIsImlzQXJyYXkiLCJjb250ZW50IiwiZm9yRWFjaCIsImlubmVySFRNTCIsImhlcm9JbmZvIiwidG9wMTAiLCJ3YWl0U2NyZWVuRWxlbWVudCIsIlVuaXQiLCJuYW1lIiwidW5kZWZpbmVkIiwidm9sdW1lIiwiZHJhd1ZvbHVtZSIsImRyYXdMZXZlbCIsImRyYXdOYW1lIiwidmFsdWUiLCJ2b2x1bWVXaWR0aCIsInZvbHVtZUhlaWdodCIsInZvbHVtZVgiLCJ2b2x1bWVZIiwicmVjdCIsInN0cm9rZSIsInRleHRXaWR0aCIsIm1lYXN1cmVUZXh0IiwiZm9udCIsImZpbGxUZXh0IiwicmVtb3ZlIiwicmVzZXQiLCJzaXplIiwiZWFjaCIsImVudGl0aWVzIiwiaW5kZXgiLCJzcGxpY2UiLCJldmVudCIsImdhbWVvdmVyIiwibG9nIiwiJGxvZ3MiLCJtc2ciLCJwYXJlbnRFbGVtZW50Iiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY29uc29sZSIsImNvbnN0YW50cyIsImZpbmFsQ2FsbGJhY2siLCJpbnRlcnZhbCIsInJvb21zIiwibG9vdHMiLCJ0ZWxlcG9ydHMiLCJyZXNpemUiLCJvblJlY29ubmVjdCIsIm9uUm9vbSIsIm9uSGVybyIsIm9uU291bmQiLCJwb3MiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJyb29tSW5pdCIsImNoYXJhY3Rlcl9pZCIsIml0ZW0iLCJzZXQiLCJzZXRGb2xsb3dlciIsImVudGl0eSIsImlzRGllIiwidG9BcnJheSIsInJlbmRlckFycmF5Iiwic29ydCIsImEiLCJzZXR0aW5ncyIsImxvb3QiLCJsb2dpbl9wYW5lbEVsZW1lbnQiLCJsb2dpbl9mb3JtRWxlbWVudCIsImxvZ2luX2lucHV0RWxlbWVudCIsInRpbWVvdXQiLCJjbGlja0hhbmRsZXIiLCJrZXl1cEhhbmRsZXIiLCJmb2N1cyIsIm9iaiIsImtleSIsInZhbGlkYXRlIiwidGVzdCIsImRlZmF1bHRWYWx1ZSIsImJhY2tncm91bmRDb2xvciIsImNsZWFyVGltZW91dCIsInNfZG9jIiwic19wcm9mIiwic19nb2IiLCJzX2dpcmwiLCJzX2Jsb25kIiwic19tYWciLCJzX3RlbGVwb3J0Iiwic19jb2lucyIsInRfdHJlZXMiLCJ0X2J1c2hzIiwic19wb2ludGVyIiwiZXhwb3J0cyIsImJ1c2hzIiwidW5pdHMiLCJ1bml0c0FycmF5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ25FZSxFQUFDQSxnQkFBRCxFQUFVQyxnQkFBVixFQUFtQkMsZ0JBQW5CLEU7OztBQUVmLFNBQVNGLE9BQVQsR0FBbUI7QUFDZixXQUFPRyxhQUFhQyxPQUFiLENBQXFCLFdBQXJCLENBQVA7QUFDSDs7QUFFRCxTQUFTSCxPQUFULENBQWlCSSxLQUFqQixFQUF3QjtBQUNwQkYsaUJBQWFHLE9BQWIsQ0FBcUIsV0FBckIsRUFBa0NELEtBQWxDO0FBQ0g7O0FBRUQsU0FBU0gsT0FBVCxHQUFtQjtBQUNmQyxpQkFBYUksVUFBYixDQUF3QixXQUF4QjtBQUNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pEOzs7O0FBQ0E7Ozs7OztBQUdBLElBQ0lDLE1BQU0sd0JBQWMsa0JBQVFBLEdBQXRCLENBRFY7QUFBQSxJQUVJQyxPQUFPLHdCQUFjLGtCQUFRQSxJQUF0QixDQUZY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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLE9BQU87QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0dUJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1SkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdE9BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixpREFBaUQ7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCwyREFBMkQ7QUFDM0Q7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbmFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLGlCQUFpQjtBQUNqRDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcFBBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN1JBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxZQUFZOztBQUVmO0FBQ0E7QUFDQTtBQUNBLEtBQUssWUFBWTtBQUNqQjtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFLDBDQVlGOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUM5UEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixnQkFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNUQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2SkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHLE9BQU87QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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cEwsSUFBWCxDQUFnQm1MLE1BQU12SixDQUFOLENBQWhCO0FBQ0g7QUFDRCxXQUFPd0osVUFBUDtBQUNILEM7Ozs7Ozs7Ozs7O0FDbENELGUiLCJmaWxlIjoiY2xpZW50X2J1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2xpZW50LmpzXCIpO1xuIiwiZXhwb3J0IGRlZmF1bHQge2dldFVzZXIsIHNldFVzZXIsIHNpZ25vdXR9XG5cbmZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnYW1lbG9naW4nKTtcbn1cblxuZnVuY3Rpb24gc2V0VXNlcihsb2dpbikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lbG9naW4nLCBsb2dpbik7XG59XG5cbmZ1bmN0aW9uIHNpZ25vdXQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dhbWVsb2dpbicpO1xufSIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSBcIi4vZW5naW5lL2NoYXJhY3Rlci5qc1wiO1xuaW1wb3J0IHNwcml0ZXMgZnJvbSBcIi4vc3ByaXRlcy5qc1wiO1xuXG5cbmNvbnN0XG4gICAgZG9jID0gbmV3IENoYXJhY3RlcihzcHJpdGVzLmRvYyksXG4gICAgcHJvZiA9IG5ldyBDaGFyYWN0ZXIoc3ByaXRlcy5wcm9mKSxcbiAgICBnb2IgPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZXMuZ29iKSxcbiAgICBnaXJsID0gbmV3IENoYXJhY3RlcihzcHJpdGVzLmdpcmwpLFxuICAgIGJsb25kID0gbmV3IENoYXJhY3RlcihzcHJpdGVzLmJsb25kKSxcbiAgICBtYWcgPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZXMubWFnKSxcblxuXG4gICAgdGVsZXBvcnQgPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZXMudGVsZXBvcnQpLFxuXG4gICAgY29pbl9nb2xkID0gbmV3IENoYXJhY3RlcihzcHJpdGVzLmNvaW5fZ29sZCksXG4gICAgY29pbl9zaWx2ZXIgPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZXMuY29pbl9zaWx2ZXIpLFxuICAgIGNvaW5fY29wcGVyID0gbmV3IENoYXJhY3RlcihzcHJpdGVzLmNvaW5fY29wcGVyKSxcblxuICAgIHBvaW50ZXIgPSBuZXcgQ2hhcmFjdGVyKHNwcml0ZXMucG9pbnRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IHtkb2MsIHByb2YsIGdvYiwgZ2lybCwgYmxvbmQsIG1hZywgdGVsZXBvcnQsIGNvaW5fZ29sZCwgY29pbl9zaWx2ZXIsIGNvaW5fY29wcGVyLCBwb2ludGVyfVxuXG4iLCJpbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUnXG5cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXG4gICAgZ2FtZS5ydW4oKTtcblxufTsiLCJleHBvcnQgY29uc3RcbiAgICBGUFMgPSAzMCxcbiAgICBJTlRFUlZBTCA9IDEwMDAvRlBTLCAvL9CyINC80LjQu9C70LjRgdC10LrRg9C90LTQsNGFXG4gICAgU1RFUCA9IElOVEVSVkFMLzEwMDA7Ly/QsiDRgdC10LrRg9C90LTQsNGFXG4iLCIvKipcbiAqINCc0L7QtNGD0LvRjCDQutCw0LzQtdGA0YtcbiAqL1xuXG5jb25zdCBNQVhfREVBRFpPTkVfWCA9IDUwMDtcbmNvbnN0IE1BWF9ERUFEWk9ORV9ZID0gNTAwO1xuXG4vKipcbiAqIEBjbGFzcyBDYW1lcmFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHgsIHksIGNhbnZhcywgZm9sbG93ZXIpe1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5kZWFkWm9uZSA9IHtcbiAgICAgICAgICAgIHg6IE1BWF9ERUFEWk9ORV9YLFxuICAgICAgICAgICAgeTogTUFYX0RFQURaT05FX1lcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICB0aGlzLnNwZWVkID0gMjAwO1xuXG4gICAgICAgIHRoaXMuZm9sbG93ZXIgPSBmb2xsb3dlcjtcbiAgICB9XG5cbiAgICByZXNpemUoKXtcblxuICAgICAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgbGV0IHggPSB0aGlzLnggLSBNYXRoLmZsb29yKCh3aWR0aCAtIHRoaXMud2lkdGgpLzIpO1xuICAgICAgICBsZXQgeSA9IHRoaXMueSAtIE1hdGguZmxvb3IoKGhlaWdodCAtIHRoaXMuaGVpZ2h0KS8yKTtcbiAgICAgICAgaWYoeCA8IDApIHggPSAwO1xuICAgICAgICBpZih5PDApIHkgPSAwO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgfVxuXG4gICAgcnVuKHJvb20pe1xuXG4gICAgICAgIGlmKHRoaXMuZm9sbG93ZXIpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuRm9sbG93KHJvb20sIHRoaXMuZm9sbG93ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Rm9sbG93ZXIoZm9sbG93ZXIpe1xuICAgICAgICB0aGlzLmZvbGxvd2VyID0gZm9sbG93ZXI7XG4gICAgfVxuXG4gICAgcnVuRm9sbG93KHJvb20sIHBsYXllcil7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCf0LXRgNC10YHRh9C40YLQsNC10LwgXCLQvNC10YDRgtCy0YvQtSDQt9C+0L3Ri1wiXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8vINCR0LXRgNC10Lwg0L/QvtC70L7QstC40L3RgyDQutCw0LzQtdGA0YtcbiAgICAgICAgdGhpcy5kZWFkWm9uZS54ID0gTWF0aC5mbG9vcih0aGlzLndpZHRoLzIpO1xuICAgICAgICB0aGlzLmRlYWRab25lLnkgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0LzIpO1xuXG5cbiAgICAgICAgLy8g0KPRh9GC0LXQvCwg0YfRgtC+INC60L7QvNC90LDRgtCwINC80L7QttC10YIg0LHRi9GC0Ywg0LzQtdC90YzRiNC1INC60LDQvNC10YDRi1xuICAgICAgICBpZihyb29tLndpZHRoIDwgdGhpcy5jYW52YXMud2lkdGgpe1xuICAgICAgICAgICAgdGhpcy5kZWFkWm9uZS54ID0gTWF0aC5mbG9vcigocm9vbS53aWR0aCAtIHRoaXMuY2FudmFzLndpZHRoKS8yKTtcbiAgICAgICAgfVxuICAgICAgICBpZihyb29tLmhlaWdodCA8IHRoaXMuY2FudmFzLmhlaWdodCl7XG4gICAgICAgICAgICB0aGlzLmRlYWRab25lLnkgPSBNYXRoLmZsb29yKChyb29tLmhlaWdodCAtIHRoaXMuY2FudmFzLmhlaWdodCkvMik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQndC1INC00LXQu9Cw0LXQvCDQvtGH0LXQvdGMINCx0L7Qu9GM0YjQuNC1IFwi0LzQtdGA0YLQstGL0LUg0LfQvtC90YtcIlxuICAgICAgICBpZih0aGlzLmRlYWRab25lLnggPiBNQVhfREVBRFpPTkVfWCl7XG4gICAgICAgICAgICB0aGlzLmRlYWRab25lLnggPSBNQVhfREVBRFpPTkVfWDtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmRlYWRab25lLnkgPiBNQVhfREVBRFpPTkVfWSl7XG4gICAgICAgICAgICB0aGlzLmRlYWRab25lLnkgPSBNQVhfREVBRFpPTkVfWTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCh0LvQtdC00YPQtdC8INC30LAg0L/Qu9C10LXRgNC+0LxcbiAgICAgICAgICovXG4gICAgICAgIGlmKHBsYXllci54IC0gdGhpcy54ID4gdGhpcy53aWR0aCAtIHRoaXMuZGVhZFpvbmUueCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcGxheWVyLnggLSB0aGlzLndpZHRoICsgdGhpcy5kZWFkWm9uZS54O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYocGxheWVyLnggPCB0aGlzLnggKyB0aGlzLmRlYWRab25lLngpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHBsYXllci54IC0gdGhpcy5kZWFkWm9uZS54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocGxheWVyLnkgLSB0aGlzLnkgPiB0aGlzLmhlaWdodCAtIHRoaXMuZGVhZFpvbmUueSkge1xuICAgICAgICAgICAgdGhpcy55ID0gcGxheWVyLnkgLSB0aGlzLmhlaWdodCArIHRoaXMuZGVhZFpvbmUueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHBsYXllci55IDwgdGhpcy55ICsgdGhpcy5kZWFkWm9uZS55KSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBwbGF5ZXIueSAtIHRoaXMuZGVhZFpvbmUueTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQndC1INCy0YvRhdC+0LTQuNC8INC30LAg0LPRgNCw0L3QuNGG0Ysg0LrQsNGA0YLRi1xuICAgICAgICAgKi9cbiAgICAgICAgaWYodGhpcy54IDwgMClcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIGlmKHRoaXMueSA8IDApXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICBpZih0aGlzLnggKyB0aGlzLndpZHRoID4gcm9vbS53aWR0aClcbiAgICAgICAgICAgIHRoaXMueCA9IHJvb20ud2lkdGggLSB0aGlzLndpZHRoO1xuICAgICAgICBpZih0aGlzLnkgKyB0aGlzLmhlaWdodCA+IHJvb20uaGVpZ2h0KVxuICAgICAgICAgICAgdGhpcy55ID0gcm9vbS5oZWlnaHQgLSB0aGlzLmhlaWdodDtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQldGB0LvQuCDQutCw0LzQtdGA0LAg0LHQvtC70YzRiNC1INC60LDRgNGC0YsgLSDQtNC+0LHQsNCy0LjQvCDRgdC80LXRidC10L3QuNC1XG4gICAgICAgICAqL1xuICAgICAgICBpZih0aGlzLndpZHRoID4gcm9vbS53aWR0aClcbiAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy53aWR0aCAtIHJvb20ud2lkdGgpLzI7XG4gICAgICAgIGlmKHRoaXMuaGVpZ2h0ID4gcm9vbS5oZWlnaHQpXG4gICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuaGVpZ2h0IC0gcm9vbS5oZWlnaHQpLzI7XG5cblxuICAgIH1cbn0iLCIvKipcbiAqIEBjbGFzcyBDaGFyYWN0ZXIgLSDQn9C10YDRgdC+0L3QsNC2XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlcntcblxuICAgIGNvbnN0cnVjdG9yKHNwcml0ZSl7XG4gICAgICAgIHRoaXMuc3ByaXRlID0gc3ByaXRlO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSBzcHJpdGUud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc3ByaXRlLmhlaWdodDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqINCe0YLRgNC40YHQvtCy0LrQsCDQv9C10YDRgdC+0L3QsNC20LBcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtINC60YPQtNCwINGA0LjRgdGD0LXQvFxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcGFyYW0gd2lkdGhcbiAgICAgKiBAcGFyYW0gaGVpZ2h0XG4gICAgICogQHBhcmFtIHN0YXRlXG4gICAgICogQHBhcmFtIGZyYW1lTnVtIC0g0L3QvtC80LXRgCDQutCw0LTRgNCwINCw0L3QuNC80LDRhtC40LhcbiAgICAgKiBAcGFyYW0gdW5pdF9sZXZlbFxuICAgICAqIEBwYXJhbSB2b2x1bWUgLSDQt9C90LDRh9C10L3QuNC1INC40L3QtNC40LrQsNGC0L7RgNCwXG4gICAgICovXG4gICAgZHJhdyhjb250ZXh0LCB4LCB5LCBzdGF0ZSwgZnJhbWVOdW0sIHdpZHRoLCBoZWlnaHQpe1xuXG4gICAgICAgIGlmKCFzdGF0ZSB8fCAhdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXSl7XG4gICAgICAgICAgICBzdGF0ZSA9ICdkZWZhdWx0J1xuICAgICAgICB9XG4gICAgICAgIGlmKCFmcmFtZU51bSkgZnJhbWVOdW0gPSAwO1xuXG4gICAgICAgIGlmKCF0aGlzLnNwcml0ZS5zdGF0ZXNbc3RhdGVdIHx8ICF0aGlzLnNwcml0ZS5zdGF0ZXNbc3RhdGVdW2ZyYW1lTnVtXSkgcmV0dXJuO1xuXG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC60LDQtNGAXG4gICAgICAgIHRoaXMuZHJhd0ZyYW1lKFxuICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLmltYWdlLFxuICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3RhdGVzW3N0YXRlXVtmcmFtZU51bV0sXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIHRoaXMud2lkdGgsXG4gICAgICAgICAgICB0aGlzLmhlaWdodFxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC60LDQtNGAINCw0L3QuNC80LDRhtC40LhcbiAgICAgKiBAcGFyYW0gY29udGV4dFxuICAgICAqIEBwYXJhbSBzcHJpdGVcbiAgICAgKiBAcGFyYW0geFxuICAgICAqIEBwYXJhbSB5XG4gICAgICogQHBhcmFtIHdpZHRoXG4gICAgICogQHBhcmFtIGhlaWdodFxuICAgICAqL1xuICAgIGRyYXdGcmFtZShjb250ZXh0LCBpbWFnZSwgc3ByaXRlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgIHNwcml0ZS54LFxuICAgICAgICAgICAgc3ByaXRlLnksXG4gICAgICAgICAgICBzcHJpdGUud2lkdGgsXG4gICAgICAgICAgICBzcHJpdGUuaGVpZ2h0LFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodFxuICAgICAgICApO1xuICAgIH1cblxufSIsIi8qKlxuICog0JrQvtC90YLRgNC+0LvQu9C10YAgLSDQutC70LDQstC40YjQuCDQuCDQvNGL0YjRjFxuICogVE9ETzog0LzQvtC20LXRgiDQutC+0LzQsNC90LTRiyDQvNC10L3RjiDRgtC+0LbQtSDRgdC+0LHRi9GC0LjRj9C80LhcbiAqL1xuXG5cbi8vINC/0L7QtNC60LvRjtGH0LjQvCDRgdC+0LHRi9GC0LjRj1xuaW1wb3J0IGV2ZW50cyBmcm9tICcuL2V2ZW50cy5qcydcblxuXG4vLyDQktCw0YDQuNCw0L3RgtGLINGD0L/RgNCw0LLQu9C10L3QuNGPXG5jb25zdFxuICAgIEtFWVNfQVJST1cgPSB7XG4gICAgICAgIExFRlQ6IDM3LCAvL0xlZnRcbiAgICAgICAgVVA6IDM4LCAvL1VwXG4gICAgICAgIFJJR0hUOiAzOSwgLy9SaWdodFxuICAgICAgICBET1dOOiA0MCwgLy9Eb3duXG4gICAgICAgIFNUQVRJU1RJQzogMTkxIC8vIFwiL1wiXG4gICAgfSwvL9Cj0L/RgNCw0LLQu9C10L3QuNC1INGB0YLRgNC10LvQutCw0LzQuFxuXG4gICAgS0VZU19XQVNEID0ge1xuICAgICAgICBMRUZUOiA2NSwgLy9BXG4gICAgICAgIFVQOiA4NywgLy9XXG4gICAgICAgIFJJR0hUOiA2OCwgLy9EXG4gICAgICAgIERPV046IDgzLCAvLyBTXG4gICAgICAgIFNUQVRJU1RJQzogMTkxIC8vIFwiL1wiXG4gICAgfTsvL9Cj0L/RgNCw0LLQu9C10L3QuNC1INC60L3QvtC/0LrQsNC80LggVyBBIFMgRFxuXG4vLyDQn9C+LdGD0LzQvtC70YfQsNC90LjRjiDRg9C/0YDQsNCy0LvRj9C10Lwg0YHRgtGA0LXQu9C60LDQvNC4XG4vL1RPRE86INGE0YPQvdC60YbQuNGPINGB0LzQtdC90Ysg0YPQv9GA0LDQstC70LXQvdC40Y9cbmxldCBrZXlzID0gS0VZU19BUlJPVztcblxubGV0IGNsaWNrUGFkID0gbnVsbDtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcCwgc2V0Q2xpY2tQYWR9XG5cblxuLyoqXG4gKiDQl9Cw0L/Rg9GB0YLQuNC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXG4gICAgLy8g0JXRgdC70Lgg0L7QutC90L4g0L/QvtGC0LXRgNGP0LvQviDRhNC+0LrRg9GBXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIG9uV2luZG93Qmx1ciwgZmFsc2UpO1xuXG4gICAgLy8g0J3QsNC20LDRgtCwINC60LvQsNCy0LjRiNCwXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlkb3duLCBmYWxzZSk7XG5cbiAgICAvLyDQntGC0LbQsNGC0LAg0LrQu9Cw0LLQuNGI0LBcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXl1cCwgZmFsc2UpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkNsaWNrLCBmYWxzZSk7XG59XG5cblxuLyoqXG4gKiDQntGB0YLQsNC90L7QstC40Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAqL1xuZnVuY3Rpb24gc3RvcCgpIHtcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCBvbldpbmRvd0JsdXIsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleWRvd24sIGZhbHNlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgb25LZXl1cCwgZmFsc2UpO1xufVxuXG5cbmZ1bmN0aW9uIHNldENsaWNrUGFkKF9jbGlja1BhZCkge1xuICAgIGNsaWNrUGFkID0gX2NsaWNrUGFkO1xufVxuXG4vKipcbiAqINCf0YDQuCDQvdCw0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXlkb3duKGUpIHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXG4gICAgICAgIGNhc2Uga2V5cy5MRUZUOiAvLyBsZWZ0IGFycm93XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2xlZnQnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuVVA6IC8vIHVwIGFycm93XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ3VwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlJJR0hUOiAvLyByaWdodCBhcnJvd1xuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5ZG93bicsICdyaWdodCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ET1dOOiAvLyBkb3duIGFycm93XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXlkb3duJywgJ2Rvd24nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQvtGC0LbQsNGC0LjQuCDQutC70LDQstC40YjQuFxuICogQHBhcmFtIGVcbiAqL1xuZnVuY3Rpb24gb25LZXl1cChlKSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBrZXlzLkxFRlQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdsZWZ0Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBrZXlzLlVQOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAndXAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGtleXMuUklHSFQ6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdyaWdodCcpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5ET1dOOlxuICAgICAgICAgICAgZXZlbnRzLmFkZCgna2V5dXAnLCAnZG93bicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2Uga2V5cy5TVEFUSVNUSUM6XG4gICAgICAgICAgICBldmVudHMuYWRkKCdrZXl1cCcsICdzdGF0aXN0aWMnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBjYXNlIDMyOiAvLyDQv9GA0L7QsdC10Lsg0LTQu9GPINC/0LDRg9C30YtcbiAgICAgICAgLy8gICAgIEdhbWUudG9nZ2xlUGF1c2UoKTtcbiAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgIH1cbn1cblxuXG4vKipcbiAqINCf0YDQuCDQutC70LjQutC1XG4gKiBAcGFyYW0gZVxuICovXG5mdW5jdGlvbiBvbkNsaWNrKGUpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC/0L4g0YfQtdC8INC60LvQuNC60LDRgtGMINC+0YLQv9GA0LDQstC40Lwg0YHQvtCx0YvRgtC40LVcbiAgICBpZihjbGlja1BhZCkge1xuICAgICAgICBsZXQgeCA9IGUuY2xpZW50WCArIGNsaWNrUGFkLngsXG4gICAgICAgICAgICB5ID0gZS5jbGllbnRZICsgY2xpY2tQYWQueTtcbiAgICAgICAgZXZlbnRzLmFkZCgndGFyZ2V0Jywge3g6IHgsIHk6IHl9KTtcbiAgICAgICAgZXZlbnRzLmFkZCgnY2xpY2snLCB7eDogeCwgeTogeX0pO1xuXG4gICAgfVxufVxuXG5cbi8qKlxuICog0JXRgdC70Lgg0L7QutC90L4g0L/QvtGC0LXRgNGP0LvQviDRhNC+0LrRg9GBXG4gKi9cbmZ1bmN0aW9uIG9uV2luZG93Qmx1cigpIHtcbiAgICAvLyDQvtGC0L7QttC80LXQvCDQstGB0LUg0LrQu9Cw0LLQuNGI0LhcbiAgICBldmVudHMuYWRkKCdrZXl1cCcsICdsZWZ0Jyk7XG4gICAgZXZlbnRzLmFkZCgna2V5dXAnLCAndXAnKTtcbiAgICBldmVudHMuYWRkKCdrZXl1cCcsICdyaWdodCcpO1xuICAgIGV2ZW50cy5hZGQoJ2tleXVwJywgJ2Rvd24nKTtcblxuICAgIC8vINC+0YfQuNGB0YLQuNC8INGG0LXQu9GMINC80YvRiNC4XG4gICAgZXZlbnRzLmFkZCgndGFyZ2V0JywgbnVsbCk7XG59IiwiLyoqXG4gKiBAY2xhc3MgRW50aXR5XG4gKlxuICovXG5pbXBvcnQge1NURVB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5e1xuXG4gICAgY29uc3RydWN0b3IoeCwgeSwgY2hhcmFjdGVyLCBsaWZldGltZSl7XG5cbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcblxuICAgICAgICAvLyDQstGA0LXQvNGPINC20LjQt9C90LhcbiAgICAgICAgdGhpcy5saWZldGltZSA9IGxpZmV0aW1lO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNoYXJhY3Rlci53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNoYXJhY3Rlci5oZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDtcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcblxuICAgICAgICB0aGlzLnN0YXRlID0gXCJkZWZhdWx0XCI7XG4gICAgfVxuXG4gICAgaXNEaWUoKXtcblxuICAgICAgICBpZih0aGlzLmxpZmV0aW1lID4gMCkge1xuICAgICAgICAgICAgdGhpcy5saWZldGltZSAtPSBTVEVQO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEodGhpcy5saWZldGltZSA+IDApO1xuICAgIH1cblxuICAgIGFuaW1hdGUoKXtcbiAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPXG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIFNURVA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhdyhjYW1lcmEpe1xuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gdGhpcy54IC0gY2FtZXJhLnggLSB0aGlzLndpZHRoLzIsXG4gICAgICAgICAgICB5ID0gdGhpcy55IC0gY2FtZXJhLnkgLSB0aGlzLmhlaWdodC8yO1xuXG4gICAgICAgIC8vINC90LUg0YDQuNGB0YPQtdC8INCy0L3QtSDQutCw0LzQtdGA0YtcbiAgICAgICAgaWYoXG4gICAgICAgICAgICB4IDwgLXRoaXMuY2hhcmFjdGVyLndpZHRoIHx8XG4gICAgICAgICAgICB5IDwgLXRoaXMuY2hhcmFjdGVyLmhlaWdodCB8fFxuICAgICAgICAgICAgeCA+IGNhbWVyYS53aWR0aCB8fFxuICAgICAgICAgICAgeSA+IGNhbWVyYS5oZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhd0NoYXJhY3RlcihjYW1lcmEuY29udGV4dCwgeCwgeSk7XG4gICAgfVxuXG5cbiAgICBkcmF3Q2hhcmFjdGVyKGNvbnRleHQsIHN4LCBzeSl7XG4gICAgICAgIGxldCB4ID0gc3ggLSAodGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMixcbiAgICAgICAgICAgIHkgPSBzeSAtICh0aGlzLmNoYXJhY3Rlci5oZWlnaHQtdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufSIsIi8qKlxuICog0KHQvtCx0YvRgtC40Y8g0LjQs9GA0YtcbiAqL1xuaW1wb3J0IGFjY291bnQgZnJvbSBcIi4uL2FjY291bnRcIjtcblxuZXhwb3J0IGRlZmF1bHQge2luaXQsIGFkZCwgb24sIG9mZn1cblxuLy8g0KHQtdGA0LLQtdGA0L3Ri9C5INGB0L7QutC10YJcbmltcG9ydCBpbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuXG5pbXBvcnQgbG9nIGZyb20gXCIuLi9sb2dzLmpzXCI7XG5cbmltcG9ydCB1aSBmcm9tIFwiLi91aS91aS5qc1wiO1xuXG4vLyDQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgNCy0LXRgNGDXG5sZXQgc2VydmVyU29ja2V0ID0gbnVsbDtcblxuXG4vKipcbiAqINCY0L3QuNGC0LjQvCDQuNCz0YDQvtCy0YvQtSDRgdC+0LHRi9GC0LjRj1xuICovXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGlmKCFzZXJ2ZXJTb2NrZXQpIHtcbiAgICAgICAgc2VydmVyU29ja2V0ID0gaW8oKTtcbiAgICB9XG4gICAgc2VydmVyU29ja2V0LmNvbm5lY3QoKTtcblxuICAgIC8vINCU0LXQudGB0YLQstC40Y8g0L/RgNC4INGB0LXRgNCy0LXRgNC90YvRhSDQv9GA0L7QsdC70LXQvNCw0YVcbiAgICBzZXJ2ZXJTb2NrZXQub24oJ2Nvbm5lY3RfZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZygn0J7RiNC40LHQutCwINC/0L7QtNC60LvRjtGH0LXQvdC40Y8g0Log0YHQtdGA0LLQtdGA0YMnKTtcbiAgICB9KTtcblxuXG4gICAgc2VydmVyU29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZygn0L7RgiDRgdC10YDQstC10YDQsCDQv9C+0YHRgtGD0L/QuNC7IGRpc2Nvbm5lY3QnKTtcbiAgICAgICAgbG9nKCfQktGLINC+0YLQutC70Y7Rh9C10L3RiyDQvtGCINGB0LXRgNCy0LXRgNCwJyk7XG5cbiAgICAgICAgdWkud2FpdFNjcmVlbi5zaG93KCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG5cbn1cblxuXG5jb25zdCBoYW5kbGVycyA9IHt9O1xuXG4vKipcbiAqINCU0L7QsdCw0LLQu9C10L3QuNC1INC40LPRgNC+0LLQvtCz0L4g0YHQvtCx0YvRgtC40Y9cbiAqIEBwYXJhbSBldmVudE5hbWVcbiAqIEBwYXJhbSBkYXRhXG4gKi9cbmZ1bmN0aW9uIGFkZChldmVudE5hbWUsIGRhdGEpIHtcblxuICAgIC8vINCV0YHQu9C4INC10YHRgtGMINC70L7QutCw0LvRjNC90YvQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4IC0g0LLRi9C30L7QstC10LxcbiAgICBydW5IYW5kbGVycyhldmVudE5hbWUsIGRhdGEpO1xuXG4gICAgLy8g0YjQu9C10Lwg0YHQvtCx0YvRgtC40LUg0L3QsCDRgdC10YDQstC10YBcbiAgICBzZXJ2ZXJTb2NrZXQuZW1pdChldmVudE5hbWUsIGRhdGEpXG59XG5cblxuZnVuY3Rpb24gb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuXG4gICAgLy/QodC+0YXRgNCw0L3QuNC8INC90LAg0YHQu9GD0YfQsNC5INC10YHQu9C4INGB0L7QsdGL0YLQuNGPINCy0L7Qt9C90LjQutC90YPRgiDQu9C+0LrQsNC70YzQvdC+XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzPT09ZmFsc2Upe1xuICAgICAgICBoYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIGhhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG5cblxuICAgIHNlcnZlclNvY2tldC5vbihldmVudE5hbWUsIChkYXRhKT0+e1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXt9XG4gICAgICAgIGxldCB0eXBlID0gZGF0YS50eXBlID8gZGF0YS50eXBlIDogXCJzaW1wbGVcIjtcblxuICAgICAgICAvLyDQldGB0LvQuCDQsiDQtNCw0L3QvdGL0YUg0YHQvtCx0YvRgtC40Y8g0LXRgdGC0Ywg0L/QvtC70LUgbWVzc2FnZSAtINCy0YvQstC10LTQtdC8INCyINC70L7Qs1xuICAgICAgICBkYXRhLm1lc3NhZ2UgJiYgbG9nKGRhdGEubWVzc2FnZS8qICsgJyAo0KHQvtCx0YvRgtC40LUgJytldmVudCsnLicrdHlwZSsnKScqLyk7XG5cbiAgICAgICAgLy8g0J7RgtC70LDQtNC60LAg0YHQvtCx0YvRgtC40Lkg0LHQtdC3IG1lc3NhZ2VcbiAgICAgICAgLy8gZGF0YS5tZXNzYWdlIHx8IGxvZygnICjQodC+0LHRi9GC0LjQtSAnK2V2ZW50KycuJyt0eXBlKycpJyk7XG5cbiAgICAgICAgY2FsbGJhY2soZXZlbnROYW1lLCB0eXBlLCBkYXRhKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGlmKGV2ZW50TmFtZSBpbiBoYW5kbGVycyAmJiBoYW5kbGVyc1tldmVudE5hbWVdPT09aGFuZGxlcil7XG4gICAgICAgIGRlbGV0ZSBoYW5kbGVyc1tldmVudE5hbWVdO1xuICAgIH1cblxuICAgIHNlcnZlclNvY2tldC5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbn1cblxuXG4vLyDQl9Cw0L/Rg9GB0Log0LTQu9GPINC70L7QutCw0LvRjNC90YvRhSDRgdC+0LHRi9GC0LjQuVxuZnVuY3Rpb24gcnVuSGFuZGxlcnMoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgLy/QldGB0LvQuCDQtdGB0YLRjCDQvtCx0YDQsNCx0L7RgtGH0LjQutC4IC0g0LfQsNC/0YPRgdC60LDQtdC8XG4gICAgaWYoZXZlbnROYW1lIGluIGhhbmRsZXJzKXtcbiAgICAgICAgZm9yKGNvbnN0IGggb2YgaGFuZGxlcnNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICBoKGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihldmVudE5hbWU9PT1cInNpZ25vdXRcIil7XG4gICAgICAgIGFjY291bnQuc2lnbm91dCgpO1xuICAgIH1cblxuXG59IiwiaW1wb3J0IFVuaXQgZnJvbSAnLi91bml0LmpzJ1xuXG4vKipcbiAqIEhlcm8gLSDQs9C70LDQstC90YvQuSDQs9C10YDQvtC5XG4gKi9cblxuLyoqXG4gKiDQrtC90LjRgiDQs9C10YDQvtGPXG4gKiBAdHlwZSB7VW5pdHxudWxsfVxuICovXG5sZXQgdW5pdCA9IG51bGw7XG5cbi8qKlxuICog0KHQutC+0YDQvtGB0YLRjCDQv9C10YDQtdC80LXRidC10L3QuNGPXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5sZXQgc3BlZWQgPSAwO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHt1bml0LCBzcGVlZCwgYW5pbWF0ZSwgZHJhd31cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICB0aGlzLnVuaXQuYW5pbWF0ZSgpO1xufVxuXG5mdW5jdGlvbiBkcmF3KGNhbWVyYSkge1xuICAgIHRoaXMudW5pdC5kcmF3KGNhbWVyYSk7XG59XG4iLCIvKipcbiAqIEBjbGFzcyBMb290XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXIsIElELCB3aWR0aCwgaGVpZ2h0KXtcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLnJvb21faWQgPSByb29tX2lkO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0JztcblxuICAgICAgICB0aGlzLmFuaW1hdGVTcGVlZCA9IDE0O1xuICAgICAgICB0aGlzLmZhemEgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgIH1cblxuICAgIHNldChyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXIsIElEKXtcbiAgICAgICAgdGhpcy5JRCA9IElEO1xuICAgICAgICB0aGlzLnJvb21faWQgPSByb29tX2lkO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCdcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9ICh0aGlzLngtKHRoaXMuY2hhcmFjdGVyLndpZHRoLXRoaXMud2lkdGgpLzIpIC0gY2FtZXJhLngsXG4gICAgICAgICAgICB5ID0gKHRoaXMueS10aGlzLmNoYXJhY3Rlci5oZWlnaHQrdGhpcy5oZWlnaHQpIC0gY2FtZXJhLnk7XG5cblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY2FtZXJhLmNvbnRleHQsIHgsIHksIHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudFNwcml0ZU51bSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIC8vINCg0LjRgdGD0LXQvCDQv9GP0YLQvdC+INC60L7Qu9C70LjQt9C40LlcbiAgICAgICAgLypjYW1lcmEuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LDI1NSw2NywwLjQpXCI7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxSZWN0KHRoaXMueC1jYW1lcmEueCwgdGhpcy55LWNhbWVyYS55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnJlY3QoeCwgeSwgdGhpcy5jaGFyYWN0ZXIud2lkdGgsIHRoaXMuY2hhcmFjdGVyLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZXN0b3JlKCk7Ki9cbiAgICB9XG5cbiAgICBhbmltYXRlKHN0ZXApe1xuICAgICAgICB0aGlzLmZhemEgKz0gdGhpcy5hbmltYXRlU3BlZWQgKiBzdGVwO1xuICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSBNYXRoLmZsb29yKHRoaXMuZmF6YSk7XG5cbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3ByaXRlTnVtIDwgMCB8fCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPj0gdGhpcy5jaGFyYWN0ZXIuc3ByaXRlLnN0YXRlc1t0aGlzLnN0YXRlXS5sZW5ndGgpe1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy/QndCw0YHRgtGA0L7QudC60Lgg0YDQsNC90LTQvtC80L3Ri9GFINGG0LLQtdGC0L7QsiDQutC+0LzQvdCw0YLRi1xuXG5pbXBvcnQgc3ByaXRlcyBmcm9tIFwiLi4vc3ByaXRlcy5qc1wiO1xuXG5jb25zdCBFTlZJUk9OTUVOVFMgPSB7XG4gICAgMDoge1xuICAgICAgICByOiB7c3RhcnQ6IDEyMCwgcmFuZDogMTB9LFxuICAgICAgICBnOiB7c3RhcnQ6IDEyMCwgcmFuZDogMTZ9LFxuICAgICAgICBiOiB7c3RhcnQ6IDEwMCwgcmFuZDogNX0sXG4gICAgfSxcbiAgICAxOiB7XG4gICAgICAgIHI6IHtzdGFydDogNzAsIHJhbmQ6IDE2fSxcbiAgICAgICAgZzoge3N0YXJ0OiAxMDAsIHJhbmQ6IDIzfSxcbiAgICAgICAgYjoge3N0YXJ0OiAxMDAsIHJhbmQ6IDV9LFxuICAgIH0sXG4gICAgMjoge1xuICAgICAgICByOiB7c3RhcnQ6IDIxMCwgcmFuZDogNDV9LFxuICAgICAgICBnOiB7c3RhcnQ6IDMwLCByYW5kOiA3NX0sXG4gICAgICAgIGI6IHtzdGFydDogMzAsIHJhbmQ6IDc1fSxcbiAgICB9LFxufTtcbi8qKlxuICogQGNsYXNzIFJvb21cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIGVudmlyb25tZW50X2lkKXtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudF9pZCA9IGVudmlyb25tZW50X2lkO1xuICAgICAgICB0aGlzLmltYWdlID0gbnVsbDtcblxuICAgICAgICB0aGlzLmdlbmVyYXRlKE1hdGguZmxvb3Iod2lkdGgvNTAgKyBoZWlnaHQvNTApKTtcbiAgICB9XG5cbiAgICByYW5kb21DU1Njb2xvcihlbnZpcm9ubWVudF9pZCl7XG4gICAgICAgIGxldCBlID0gRU5WSVJPTk1FTlRTW2Vudmlyb25tZW50X2lkXTtcbiAgICAgICAgbGV0IHIgPSBlLnIuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLnIucmFuZCApLFxuICAgICAgICAgICAgZyA9IGUuZy5zdGFydCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGUuZy5yYW5kKSxcbiAgICAgICAgICAgIGIgPSBlLmIuc3RhcnQgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlLmIucmFuZCk7XG4gICAgICAgIHJldHVybiAncmdiKCcrcisnLCcrZysnLCcrYisnKSc7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUodHJlZXNfbnVtKXtcbiAgICAgICAgdmFyIGN0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgICAgICAgICAgdGlsZVdpZHRoID0gMjIsXG4gICAgICAgICAgICB0aWxlSGVpZ2h0ID0gMjI7XG4gICAgICAgIGN0eC5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICBjdHguY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIHZhciByb3dzID0gTWF0aC5mbG9vcih0aGlzLndpZHRoL3RpbGVXaWR0aCkgKyAxO1xuICAgICAgICB2YXIgY29sdW1ucyA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQvdGlsZUhlaWdodCkgKyAxO1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgZm9yICh2YXIgeCA9IDAsIGkgPSAwOyBpIDwgcm93czsgeCs9dGlsZUhlaWdodCwgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMCwgaj0wOyBqIDwgY29sdW1uczsgeSs9dGlsZVdpZHRoLCBqKyspIHtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMucmFuZG9tQ1NTY29sb3IodGhpcy5lbnZpcm9ubWVudF9pZCk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/QodCz0LXQvdC10YDQuNC8INC00LXRgNC10LLRjNGPXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGk8dHJlZXNfbnVtOyBpKyspe1xuICAgICAgICAgICAgbGV0IGlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnNwcml0ZXMudHJlZXMuc3RhdGVzLmRlZmF1bHQubGVuZ3RoKSxcblxuICAgICAgICAgICAgICAgIHRpbGUgPSBzcHJpdGVzLnRyZWVzLnN0YXRlcy5kZWZhdWx0W2lkXSxcblxuICAgICAgICAgICAgICAgIHggPSBNYXRoLnJhbmRvbSgpKih0aGlzLndpZHRoICsgMip0aWxlLndpZHRoKSAtIHRpbGUud2lkdGgsXG4gICAgICAgICAgICAgICAgeSA9IE1hdGgucmFuZG9tKCkqKHRoaXMuaGVpZ2h0ICsgMip0aWxlLmhlaWdodCkgLSB0aWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3ID0gdGlsZS53aWR0aCwgaCA9IHRpbGUuaGVpZ2h0LCBzeCA9IHRpbGUueCwgc3kgPSB0aWxlLnk7XG5cblxuXG4gICAgICAgICAgICBpZih4IDwgMCl7dyArPSB4O3N4IC09IHg7eCA9IDA7fVxuICAgICAgICAgICAgaWYoeSA8IDApe2ggKz0geTtzeSAtPSB5O3kgPSAwO31cbiAgICAgICAgICAgIGlmKHggPj0gdGhpcy53aWR0aCAtIHRpbGUud2lkdGgpeyB3ID0geCAtICh0aGlzLndpZHRoIC0gdGlsZS53aWR0aCk7fVxuICAgICAgICAgICAgaWYoeSA+PSB0aGlzLmhlaWdodCAtIHRpbGUuaGVpZ2h0KXsgaCA9IHkgLSAodGhpcy5oZWlnaHQgLSB0aWxlLmhlaWdodCk7fVxuXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZXMudHJlZXMuaW1hZ2UsIHN4LCBzeSwgdywgaCwgeCwgeSwgdywgaCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8v0KHQs9C10L3QtdGA0LjQvCDQutGD0YHRgtGLXG4gICAgICAgIC8qZm9yKGxldCBpID0gMDsgaTx0cmVlc19udW07IGkrKyl7XG4gICAgICAgICAgICBsZXQgaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqc3ByaXRlcy5idXNocy5zdGF0ZXMuZGVmYXVsdC5sZW5ndGgpLFxuXG4gICAgICAgICAgICAgICAgdGlsZSA9IHNwcml0ZXMuYnVzaHMuc3RhdGVzLmRlZmF1bHRbaWRdLFxuXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgucmFuZG9tKCkqKHRoaXMud2lkdGggKyB0aWxlLndpZHRoKSAtIHRpbGUud2lkdGgsXG4gICAgICAgICAgICAgICAgeSA9IE1hdGgucmFuZG9tKCkqKHRoaXMuaGVpZ2h0ICsgdGlsZS5oZWlnaHQpIC0gdGlsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgdyA9IHRpbGUud2lkdGgsIGggPSB0aWxlLmhlaWdodCwgc3ggPSB0aWxlLngsIHN5ID0gdGlsZS55O1xuXG4gICAgICAgICAgICBpZih4IDwgMCl7dyArPSB4O3N4IC09IHg7eCA9IDA7fVxuICAgICAgICAgICAgaWYoeSA8IDApe2ggKz0geTtzeSAtPSB5O3kgPSAwO31cbiAgICAgICAgICAgIGlmKHggPj0gdGhpcy53aWR0aCAtIHRpbGUud2lkdGgpeyB3ID0geCAtICh0aGlzLndpZHRoIC0gdGlsZS53aWR0aCk7fVxuICAgICAgICAgICAgaWYoeSA+PSB0aGlzLmhlaWdodCAtIHRpbGUuaGVpZ2h0KXsgaCA9IHkgLSAodGhpcy5oZWlnaHQgLSB0aWxlLmhlaWdodCk7fVxuXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHNwcml0ZXMuYnVzaHMuaW1hZ2UsIHN4LCBzeSwgdywgaCwgeCwgeSwgdywgaCk7XG5cbiAgICAgICAgfSovXG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICAvLyDQodC+0YXRgNCw0L3QuNC8INC60LDRgNGC0LjQvdC60L7QuVxuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gY3R4LmNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG5cblxuICAgICAgICBjdHggPSBudWxsO1xuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcblxuICAgICAgICBjYW1lcmEuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsU3R5bGUgPSAnIzlmOGU2MCc7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbWVyYS53aWR0aCwgY2FtZXJhLmhlaWdodCk7XG4gICAgICAgIGNhbWVyYS5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAgICAgaWYoIXRoaXMuaW1hZ2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXJcbiAgICAgICAgICAgIHN4ID0gMCxcbiAgICAgICAgICAgIHN5ID0gMCxcbiAgICAgICAgICAgIHN3ID0gdGhpcy53aWR0aCxcbiAgICAgICAgICAgIHNoID0gdGhpcy5oZWlnaHQsXG4gICAgICAgICAgICBkeCA9IDAsXG4gICAgICAgICAgICBkeSA9IDAsXG4gICAgICAgICAgICBkdyA9IGNhbWVyYS53aWR0aCxcbiAgICAgICAgICAgIGRoID0gY2FtZXJhLmhlaWdodDtcblxuICAgICAgICBpZihjYW1lcmEud2lkdGggPCB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICBzeCA9IGNhbWVyYS54O1xuICAgICAgICAgICAgc3cgPSBjYW1lcmEud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vIGR4ID0gLWNhbWVyYS54O1xuICAgICAgICAgICAgZHggPSBNYXRoLmZsb29yKChjYW1lcmEud2lkdGggLSB0aGlzLndpZHRoKS8yKTtcbiAgICAgICAgICAgIGR3ID0gdGhpcy53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNhbWVyYS5oZWlnaHQgPCB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgc3kgPSBjYW1lcmEueTtcbiAgICAgICAgICAgIHNoID0gY2FtZXJhLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8gZHkgPSAtY2FtZXJhLnk7XG4gICAgICAgICAgICBkeSA9IE1hdGguZmxvb3IoKGNhbWVyYS5oZWlnaHQgLSB0aGlzLmhlaWdodCkvMik7XG4gICAgICAgICAgICBkaCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzcmMpe1xuICAgICAgICB0aGlzLnNvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xuICAgICAgICB0aGlzLnNvdW5kLnNyYyA9IHNyYztcbiAgICAgICAgdGhpcy5zb3VuZC5zZXRBdHRyaWJ1dGUoXCJwcmVsb2FkXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgdGhpcy5zb3VuZC5zZXRBdHRyaWJ1dGUoXCJjb250cm9sc1wiLCBcIm5vbmVcIik7XG4gICAgICAgIHRoaXMuc291bmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc291bmQpO1xuICAgIH1cbiAgICBwbGF5KCl7XG4gICAgICAgIGlmKHRoaXMuc291bmQuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc291bmQucGxheSgpO1xuICAgIH1cbiAgICBzdG9wKCl7XG4gICAgICAgIHRoaXMuc291bmQucGF1c2UoKTtcbiAgICB9XG59IiwiLyoqXG4gKiBAY2xhc3MgVGVsZXBvcnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHJvb21faWQsIHgsIHksIGNoYXJhY3RlciwgSUQsIHRhcmdldCwgc3RhdGUsIHdpZHRoLCBoZWlnaHQpe1xuICAgICAgICB0aGlzLklEID0gSUQ7XG4gICAgICAgIHRoaXMucm9vbV9pZCA9IHJvb21faWQ7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgICB0aGlzLmNoYXJhY3RlciA9IGNoYXJhY3RlcjtcblxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDtcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcblxuICAgICAgICB0aGlzLnRhcmdldCA9IHtcbiAgICAgICAgICAgIHJvb21faWQ6IHRhcmdldC5yb29tX2lkLFxuICAgICAgICAgICAgeDogdGFyZ2V0LngsXG4gICAgICAgICAgICB5OiB0YXJnZXQueVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0KHN0YXRlKXtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIGRyYXcoY2FtZXJhKXtcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkZWZhdWx0J1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4ID0gKHRoaXMueC0odGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMikgLSBjYW1lcmEueCxcbiAgICAgICAgICAgIHkgPSAodGhpcy55LXRoaXMuY2hhcmFjdGVyLmhlaWdodCt0aGlzLmhlaWdodCkgLSBjYW1lcmEueTtcblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoYXJhY3Rlci5kcmF3KGNhbWVyYS5jb250ZXh0LCB4LCB5LCB0aGlzLnN0YXRlLCB0aGlzLmN1cnJlbnRTcHJpdGVOdW0sIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAvLyDQoNC40YHRg9C10Lwg0L/Rj9GC0L3QviDQutC+0LvQu9C40LfQuNC5XG4gICAgICAgIC8qY2FtZXJhLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQuZmlsbFN0eWxlID0gXCJyZ2JhKDI1NSwyNTUsNjcsMC40KVwiO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5maWxsUmVjdCh0aGlzLngtY2FtZXJhLngsIHRoaXMueS1jYW1lcmEueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjYW1lcmEuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgY2FtZXJhLmNvbnRleHQucmVzdG9yZSgpOyovXG4gICAgfVxuXG4gICAgYW5pbWF0ZShzdGVwKXtcbiAgICAgICAgdGhpcy5mYXphICs9IHRoaXMuYW5pbWF0ZVNwZWVkICogc3RlcDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gTWF0aC5mbG9vcih0aGlzLmZhemEpO1xuXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNwcml0ZU51bSA8IDAgfHwgdGhpcy5jdXJyZW50U3ByaXRlTnVtID49IHRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0ubGVuZ3RoKXtcbiAgICAgICAgICAgIHRoaXMuZmF6YSA9IDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPSAwO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBldmVudHMgZnJvbSBcIi4uL2V2ZW50c1wiO1xuXG4vKipcbiAqINCe0LrQvdC+INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge3N0YXJ0LCBzdG9wLCB1cGRhdGV9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLINCyINC60L7RgtC+0YDRi9C1INC/0L7QutCw0LbQtdC8INC40L3RhNC+0YDQvNCw0YbQuNGOINC+INCz0LXRgNC+0LUv0LjQs9GA0LVcblxuY29uc3QgaGVyb19pbmZvRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyby1wYW5lbFwiKTtcbmNvbnN0IGhlcm9fbmFtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm8tbmFtZVwiKTtcbmNvbnN0IHNjb3JlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29pbnNfY291bnRcIik7XG5jb25zdCBsZXZlbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9fbGV2ZWxcIik7XG5jb25zdCBsZXZlbHVwY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9fbGV2ZWx1cGNvdW50ZXJcIik7XG5jb25zdCBzcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9fc3BlZWRcIik7XG5cblxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBoZXJvX2luZm9FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2ssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHN0b3AoKXtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrLCBmYWxzZSk7XG59XG5cblxuZnVuY3Rpb24gb25DbGljayhlKXtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG4gICAgaWYodGFyZ2V0LmlkICYmIHRhcmdldC5pZD09XCJzaWdub3V0X2J1dHRvblwiKXtcblxuICAgICAgICBpZihjb25maXJtKFwi0KLQvtGH0L3QviDQstGL0LnRgtC4P1wiKSl7XG4gICAgICAgICAgICBldmVudHMuYWRkKCdzaWdub3V0JywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiDQn9C+0LrQsNC3INC40L3RhNC+0YDQvNCw0YbQuNC4INC+INCz0LXRgNC+0LVcbiAqIEBwYXJhbSBpbmZvXG4gKiBAcGFyYW0gbG9naW5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGluZm8pe1xuICAgIGhlcm9fbmFtZUVsZW1lbnQgJiYgKGhlcm9fbmFtZUVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5JRCk7XG4gICAgc2NvcmVFbGVtZW50ICYmIChzY29yZUVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5jb2luc19jb3VudCk7XG4gICAgbGV2ZWxFbGVtZW50ICYmIChsZXZlbEVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5sZXZlbCk7XG4gICAgc3BlZWRFbGVtZW50ICYmIChzcGVlZEVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5zcGVlZCk7XG4gICAgbGV2ZWx1cGNvdW50ZXJFbGVtZW50ICYmIChsZXZlbHVwY291bnRlckVsZW1lbnQuaW5uZXJUZXh0ID0gaW5mby5sZXZlbHVwQ291bnRlcik7XG59IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzXCI7XG5cbmltcG9ydCBsb2cgZnJvbSBcIi4uLy4uL2xvZ3NcIlxuaW1wb3J0IHVpIGZyb20gXCIuL3VpXCI7XG5cblxubGV0IGFjdGl2ZSA9IGZhbHNlO1xuXG5cbi8qKlxuICog0J7QutC90L4g0KLQntCfLTEwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcCwgaXNBY3RpdmUsIHNob3csIGhpZGV9XG5cblxuLy8gaHRtbC3QtdC70LXQvNC10L3RgtGLINCyINC60L7RgtC+0YDRi9C1INC/0L7QutCw0LbQtdC8INC40L3RhNC+0YDQvNCw0YbQuNGOXG5cbmNvbnN0IHRvcDEwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wMTAtcGFuZWxcIik7XG5jb25zdCB0b3AxMENvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3AxMC1wYW5lbC1jb250ZW50XCIpO1xuXG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgdG9wMTBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljaywgZmFsc2UpO1xuXG4gICAgZXZlbnRzLm9uKFwia2V5dXBcIiwgKGV2ZW50TmFtZSwga2V5Q29kZSk9PntcbiAgICAgICAgaWYoa2V5Q29kZT09PVwic3RhdGlzdGljXCIpe1xuICAgICAgICAgICAgaWYoaXNBY3RpdmUoKSl7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInNlcnZlclwiLCB1cGRhdGUpO1xuXG59XG5mdW5jdGlvbiBzdG9wKCl7XG4gICAgdG9wMTBFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljaywgZmFsc2UpO1xuICAgIGV2ZW50cy5vZmYoXCJzZXJ2ZXJcIiwgdXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICB0b3AxMEVsZW1lbnQuc3R5bGUucmlnaHQgPSAwO1xuICAgIGFjdGl2ZSA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgYWN0aXZlID0gZmFsc2U7XG4gICAgdG9wMTBFbGVtZW50LnN0eWxlLnJpZ2h0ID0gJy0xOTZweCc7XG59XG5cbmZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiBhY3RpdmU7XG59XG5cblxuZnVuY3Rpb24gb25DbGljayhlKXtcbiAgICAvKmxldCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cbiAgICBpZih0YXJnZXQuaWQgJiYgdGFyZ2V0LmlkPT1cInRvcDEwLXBhbmVsXCIpeyovXG5cbiAgICAgICAgaWYoaXNBY3RpdmUoKSl7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIH1cbn1cblxuXG4vKipcbiAqINCf0L7QutCw0Lcg0LjQvdGE0L7RgNC80LDRhtC40LhcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKGV2ZW50TmFtZSwgdHlwZSwgZGF0YSkge1xuICAgIGlmKHR5cGU9PT1cInN0YXRpc3RpY1wiKXtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkYXRhLmluZm8pKXtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gJyc7XG4gICAgICAgICAgICBkYXRhLmluZm8uZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgICAgIC8vbG9nKHBsYXllci5JRCArICcgLSAnICsgcGxheWVyLmxldmVsKTtcbiAgICAgICAgICAgICAgICBjb250ZW50ICs9ICdcXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPicrcGxheWVyLklEICsgJzo8L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImhlcm9fc3BlZWRcIiBjbGFzcz1cInZhbHVlXCI+JytwbGF5ZXIubGV2ZWwrJzwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcXG4nO1xuICAgICAgICAgICAgICAgIHRvcDEwQ29udGVudEVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8qKlxuICog0JjQvdGC0LXRgNGE0LXQudGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICovXG5cbi8vINCe0LrQvdC+INCw0LLRgtC+0YDQuNC30LDRhtC40Lhcbi8vIGltcG9ydCBsb2dpbiBmcm9tICcuL2xvZ2luLmpzJztcbi8vINCt0LrRgNCw0L0g0LfQsNCz0YDRg9C30LrQuFxuaW1wb3J0IHdhaXRTY3JlZW4gZnJvbSAnLi93YWl0c2NyZWVuLmpzJ1xuLy8g0J7QutC90L4g0LjQvdGE0L7RgNC80LDRhtC40Lgg0L4g0LPQtdGA0L7QtVxuaW1wb3J0IGhlcm9JbmZvIGZyb20gJy4vaGVyb2luZm8uanMnXG4vLyDQntC60L3QviDQuNC90YTQvtGA0LzQsNGG0LjQuCDQviDQs9C10YDQvtC1XG5pbXBvcnQgdG9wMTAgZnJvbSAnLi90b3AxMC5qcydcblxuXG5leHBvcnQgZGVmYXVsdCB7aGVyb0luZm8sIHdhaXRTY3JlZW4sIHRvcDEwfSIsIi8qKlxuICog0K3QutGA0LDQvSDQt9Cw0LPRgNGD0LfQutC4XG4gKi9cblxuXG5jb25zdCB3YWl0U2NyZWVuRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ1wiKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7c2hvdywgaGlkZX1cblxuXG5mdW5jdGlvbiBzaG93KCkge1xuICAgIHdhaXRTY3JlZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIHdhaXRTY3JlZW5FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cbiIsIi8qKlxuICogQGNsYXNzIFVuaXRcbiAqXG4gKi9cbmltcG9ydCB7U1RFUH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0e1xuICAgIC8qKlxuICAgICAqINCa0L7QvdGB0YLRgNGD0LrRgtC+0YBcbiAgICAgKiBAcGFyYW0gcm9vbV9pZFxuICAgICAqIEBwYXJhbSB4XG4gICAgICogQHBhcmFtIHlcbiAgICAgKiBAcGFyYW0gY2hhcmFjdGVyXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gc3RhdGVcbiAgICAgKiBAcGFyYW0gbGV2ZWxcbiAgICAgKiBAcGFyYW0gY29pbnNfY291bnRcbiAgICAgKiBAcGFyYW0gbGV2ZWx1cENvdW50ZXJcbiAgICAgKiBAcGFyYW0gd2lkdGhcbiAgICAgKiBAcGFyYW0gaGVpZ2h0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iocm9vbV9pZCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgY2hhcmFjdGVyLCBuYW1lLCBzdGF0ZSwgbGV2ZWwsIGNvaW5zX2NvdW50LCBsZXZlbHVwQ291bnRlcil7XG4gICAgICAgIHRoaXMucm9vbV9pZCA9IHJvb21faWQ7XG5cbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyID0gY2hhcmFjdGVyO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgdGhpcy5jb2luc19jb3VudCA9IGNvaW5zX2NvdW50O1xuICAgICAgICB0aGlzLmxldmVsdXBDb3VudGVyID0gbGV2ZWx1cENvdW50ZXI7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU3BlZWQgPSAxNDsgLy9UT0RPOiDQstGL0L3QtdGB0YLQuCDQsiBjaGFyYWN0ZXJcbiAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3ByaXRlTnVtID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90L7QstC60LAg0L/QsNGA0LDQvNC10YLRgNC+0LIg0Y7QvdC40YLQsFxuICAgICAqIEBwYXJhbSByb29tX2lkXG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSBjaGFyYWN0ZXJcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBzdGF0ZVxuICAgICAqIEBwYXJhbSBsZXZlbFxuICAgICAqIEBwYXJhbSBjb2luc19jb3VudFxuICAgICAqIEBwYXJhbSBsZXZlbHVwQ291bnRlclxuICAgICAqL1xuICAgIHNldChyb29tX2lkLCB4LCB5LCBjaGFyYWN0ZXIsIG5hbWUsIHN0YXRlLCBsZXZlbCwgY29pbnNfY291bnQsIGxldmVsdXBDb3VudGVyKXtcbiAgICAgICAgdGhpcy5yb29tX2lkID0gcm9vbV9pZDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLmNvaW5zX2NvdW50ID0gY29pbnNfY291bnQ7XG4gICAgICAgIHRoaXMubGV2ZWx1cENvdW50ZXIgPSBsZXZlbHVwQ291bnRlcjtcblxuICAgIH1cblxuICAgIGFuaW1hdGUoKXtcbiAgICAgICAgLy/QkNC90LjQvNCw0YbQuNGPXG4gICAgICAgIHRoaXMuZmF6YSArPSB0aGlzLmFuaW1hdGVTcGVlZCAqIFNURVA7XG4gICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IE1hdGguZmxvb3IodGhpcy5mYXphKTtcblxuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTcHJpdGVOdW0gPCAwIHx8IHRoaXMuY3VycmVudFNwcml0ZU51bSA+PSB0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5mYXphID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNwcml0ZU51bSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3KGNhbWVyYSl7XG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3Rlci5zcHJpdGUuc3RhdGVzW3RoaXMuc3RhdGVdKXtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyLnNwcml0ZS5zdGF0ZXNbdGhpcy5zdGF0ZV0pe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHggPSB0aGlzLnggLSBjYW1lcmEueCxcbiAgICAgICAgICAgIHkgPSB0aGlzLnkgLSBjYW1lcmEueTtcblxuICAgICAgICAvLyDQvdC1INGA0LjRgdGD0LXQvCDQstC90LUg0LrQsNC80LXRgNGLXG4gICAgICAgIGlmKFxuICAgICAgICAgICAgeCA8IC10aGlzLmNoYXJhY3Rlci53aWR0aCB8fFxuICAgICAgICAgICAgeSA8IC10aGlzLmNoYXJhY3Rlci5oZWlnaHQgfHxcbiAgICAgICAgICAgIHggPiBjYW1lcmEud2lkdGggfHxcbiAgICAgICAgICAgIHkgPiBjYW1lcmEuaGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoY2FtZXJhLmNvbnRleHQsIHgsIHkpO1xuXG5cbiAgICAgICAgLy8g0JXRgdC70Lgg0LXRgdGC0YwgLSDRgNC40YHRg9C10Lwg0LjQvdC00LjQutCw0YLQvtGAXG4gICAgICAgIGlmKHRoaXMubGV2ZWx1cENvdW50ZXIhPXVuZGVmaW5lZCAmJiB0aGlzLmxldmVsdXBDb3VudGVyIT1udWxsKSB7XG4gICAgICAgICAgICBsZXQgdm9sdW1lID0gTWF0aC5mbG9vcigxMCAtIHRoaXMubGV2ZWx1cENvdW50ZXIgJSAxMSkgKiAxMDtcbiAgICAgICAgICAgIHRoaXMuZHJhd1ZvbHVtZShjYW1lcmEuY29udGV4dCwgeCwgeSwgdm9sdW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCV0YHQu9C4INC10YHRgtGMIC0g0YDQuNGB0YPQtdC8INGD0YDQvtCy0LXQvdGMXG4gICAgICAgIGlmKHRoaXMubGV2ZWwhPXVuZGVmaW5lZCAmJiB0aGlzLmxldmVsIT1udWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdMZXZlbChjYW1lcmEuY29udGV4dCwgeCwgeSwgdGhpcy5sZXZlbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDQoNC40YHRg9C10Lwg0LjQvNGPXG4gICAgICAgIGlmKHRoaXMubGV2ZWwhPXVuZGVmaW5lZCAmJiB0aGlzLmxldmVsIT1udWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdOYW1lKGNhbWVyYS5jb250ZXh0LCB4LCB5LCB0aGlzLm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBkcmF3Q2hhcmFjdGVyKGNvbnRleHQsIHN4LCBzeSl7XG4gICAgICAgIGxldCB4ID0gc3ggLSAodGhpcy5jaGFyYWN0ZXIud2lkdGgtdGhpcy53aWR0aCkvMixcbiAgICAgICAgICAgIHkgPSBzeSAtICh0aGlzLmNoYXJhY3Rlci5oZWlnaHQtdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyLmRyYXcoY29udGV4dCwgeCwgeSwgdGhpcy5zdGF0ZSwgdGhpcy5jdXJyZW50U3ByaXRlTnVtLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgLy8g0KDQuNGB0YPQtdC8INC/0Y/RgtC90L4g0LrQvtC70LvQuNC30LjQuVxuICAgICAgICAvKmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsMjU1LDY3LDAuNClcIjtcbiAgICAgICAgY29udGV4dC5maWxsUmVjdChzeCwgc3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5yZWN0KHgsIHksIHRoaXMuY2hhcmFjdGVyLndpZHRoLCB0aGlzLmNoYXJhY3Rlci5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTsqL1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INC40L3QtNC40LrQsNGC0L7RgFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIHhcbiAgICAgKiBAcGFyYW0geVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGRyYXdWb2x1bWUoY29udGV4dCwgeCwgeSwgdmFsdWUpe1xuXG4gICAgICAgIGxldCB2b2x1bWVXaWR0aCA9IDcwO1xuICAgICAgICBsZXQgdm9sdW1lSGVpZ2h0ID0gOTtcbiAgICAgICAgbGV0IHZvbHVtZVggPSB4ICsgKHRoaXMud2lkdGggLSB2b2x1bWVXaWR0aCkvMjtcbiAgICAgICAgbGV0IHZvbHVtZVkgPSB5IC0gNTA7XG5cblxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHZvbHVtZVgsIHZvbHVtZVksIE1hdGguZmxvb3Iodm9sdW1lV2lkdGgqdmFsdWUvMTAwKSwgdm9sdW1lSGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5yZWN0KHZvbHVtZVgtMSwgdm9sdW1lWS0xLCB2b2x1bWVXaWR0aCsyLCB2b2x1bWVIZWlnaHQrMik7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog0KDQuNGB0YPQtdC8INGD0YDQvtCy0LXQvdGMXG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gc3hcbiAgICAgKiBAcGFyYW0gc3lcbiAgICAgKiBAcGFyYW0gbGV2ZWxcbiAgICAgKi9cbiAgICBkcmF3TGV2ZWwoY29udGV4dCwgc3gsIHN5LCBsZXZlbCl7XG5cbiAgICAgICAgbGV0IHRleHRXaWR0aCA9IGNvbnRleHQubWVhc3VyZVRleHQobGV2ZWwpLndpZHRoLFxuICAgICAgICAgICAgeCA9IHN4ICsgKHRoaXMud2lkdGggLSB0ZXh0V2lkdGgpLzIsXG4gICAgICAgICAgICB5ID0gc3kgLSA0MjtcblxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5mb250ID0gXCJib2xkIDExcHggQXJpYWxcIjtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQobGV2ZWwseCx5KTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiDQoNC40YHRg9C10Lwg0LjQvNGPXG4gICAgICogQHBhcmFtIGNvbnRleHRcbiAgICAgKiBAcGFyYW0gc3hcbiAgICAgKiBAcGFyYW0gc3lcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqL1xuICAgIGRyYXdOYW1lKGNvbnRleHQsIHN4LCBzeSwgbmFtZSl7XG5cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcblxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjE0cHggc2Fucy1zZXJpZlwiO1xuXG4gICAgICAgIGxldCB0ZXh0V2lkdGggPSBjb250ZXh0Lm1lYXN1cmVUZXh0KG5hbWUpLndpZHRoLFxuICAgICAgICAgICAgeCA9IHN4ICsgKHRoaXMud2lkdGggLSB0ZXh0V2lkdGgpLzIsXG4gICAgICAgICAgICB5ID0gc3kgLSA2MDtcblxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KG5hbWUseCx5KTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxufSIsImltcG9ydCBjaGFyYWN0ZXJzIGZyb20gXCIuL2NoYXJhY3RlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQge2FkZCwgcmVtb3ZlLCByZXNldCwgc2l6ZSwgZWFjaH1cblxuaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbmdpbmUvZW50aXR5XCI7XG5cbmNvbnN0IGVudGl0aWVzID0gW107XG5cblxuZnVuY3Rpb24gYWRkKHgsIHksIElELCBsaWZldGltZSkge1xuICAgIGVudGl0aWVzLnB1c2goXG4gICAgICAgIG5ldyBFbnRpdHkoeCwgeSwgY2hhcmFjdGVyc1tJRF0sIGxpZmV0aW1lKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShpbmRleCkge1xuICAgIGVudGl0aWVzLnNwbGljZShpbmRleCwgMSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGVudGl0aWVzLmxlbmd0aCA9IDA7XG59XG5cbmZ1bmN0aW9uIHNpemUoKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aDtcbn1cblxuZnVuY3Rpb24gZWFjaChjYWxsYmFjaykge1xuICAgIGVudGl0aWVzLmZvckVhY2goY2FsbGJhY2spO1xufVxuIiwiaW1wb3J0IHVpIGZyb20gXCIuL2VuZ2luZS91aS91aS5qc1wiO1xuXG5pbXBvcnQgYWNjb3VudCBmcm9tIFwiLi9hY2NvdW50LmpzXCI7XG5cbmltcG9ydCBldmVudHMgZnJvbSBcIi4vZW5naW5lL2V2ZW50cy5qc1wiXG5cbmltcG9ydCBzaWduSW4gZnJvbSBcIi4vc2NlbmVzL3NpZ25pblwiO1xuXG5pbXBvcnQgc2NlbmVNYWluIGZyb20gXCIuL3NjZW5lcy9tYWluL2luZGV4LmpzXCJcblxuXG4vKipcbiAqINCe0YHQvdC+0LLQvdC+0Lkg0LrQu9Cw0YHRgSDQutC70LjQtdC90YLQsCDQuNCz0YDRi1xuICogY2xhc3MgR2FtZVxuICovXG5leHBvcnQgZGVmYXVsdCB7cnVufVxuXG5cbiAgICAvKipcbiAgICAgKiDQl9Cw0L/Rg9GB0Log0L7RgdC90L7QstC90L7Qs9C+INGG0LjQutC70LBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBydW4oKSB7XG5cbiAgICAgICAgLy8g0J/QuNGI0LXQvCBcItCX0LDQs9GA0YPQt9C60LBcIlxuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coKTtcblxuXG4gICAgICAgIC8vINCf0L7QtNC60LvRjtGH0LDQtdC80YHRjyDQuiDRgdC10YDQstC10YDRg1xuICAgICAgICBldmVudHMuaW5pdCgpO1xuXG4gICAgICAgIGV2ZW50cy5vbihcInNlcnZlclwiLCAoZXZlbnQsIHR5cGUsIGRhdGEpPT57XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09IFwiaGVsbG9cIikge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxvZ2luID0gYWNjb3VudC5nZXRVc2VyKCk7XG5cbiAgICAgICAgICAgICAgICBpZighbG9naW4pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyDQt9Cw0L/RgNC+0YHQuNC8INC70L7Qs9C40L1cbiAgICAgICAgICAgICAgICAgICAgc2lnbkluLnN0YXJ0KGxvZ2luLCAobG9naW4pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0J/QvtC70YPRh9C40LIg0YHQvtGF0YDQsNC90LjQvFxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudC5zZXRVc2VyKGxvZ2luKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQobG9naW4pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzdGFydChsb2dpbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBzdGFydChsb2dpbikge1xuICAgICAgICAvLyDQvtGC0L/RgNCw0LLQuNC8INC70L7Qs9C40L0g0YHQtdGA0LLQtdGA0YNcbiAgICAgICAgZXZlbnRzLmFkZCgnbG9naW4nLCBsb2dpbik7XG5cbiAgICAgICAgLy8g0KHRgtCw0YDRgtGD0LXQvCDQvtGB0L3QvtCy0L3Rg9GOINGB0YbQtdC90YNcbiAgICAgICAgc2NlbmVNYWluLnN0YXJ0KCgpID0+IHtcblxuICAgICAgICAgICAgZ2FtZW92ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnYW1lb3Zlcigpe1xuICAgICAgICB1aS53YWl0U2NyZWVuLnNob3coKTtcbiAgICB9XG4iLCIvKipcbiAqINCb0L7Qs9C40YDQvtCy0LDQvdC40LVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgbG9nXG5cbmNvbnN0ICRsb2dzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ3MnKTtcblxuZnVuY3Rpb24gbG9nKG1zZykge1xuICAgICRsb2dzLmlubmVySFRNTCArPSAnPGRpdiBjbGFzcz1cIm1zZ1wiPicrbXNnKyc8L2Rpdj4nO1xuICAgICRsb2dzLnBhcmVudEVsZW1lbnQuc2Nyb2xsVG9wID0gJGxvZ3Muc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnNvbGUubG9nKG1zZyk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gYWZ0ZXJcblxuZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrLCBlcnJfY2IpIHtcbiAgICB2YXIgYmFpbCA9IGZhbHNlXG4gICAgZXJyX2NiID0gZXJyX2NiIHx8IG5vb3BcbiAgICBwcm94eS5jb3VudCA9IGNvdW50XG5cbiAgICByZXR1cm4gKGNvdW50ID09PSAwKSA/IGNhbGxiYWNrKCkgOiBwcm94eVxuXG4gICAgZnVuY3Rpb24gcHJveHkoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgaWYgKHByb3h5LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWZ0ZXIgY2FsbGVkIHRvbyBtYW55IHRpbWVzJylcbiAgICAgICAgfVxuICAgICAgICAtLXByb3h5LmNvdW50XG5cbiAgICAgICAgLy8gYWZ0ZXIgZmlyc3QgZXJyb3IsIHJlc3QgYXJlIHBhc3NlZCB0byBlcnJfY2JcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgYmFpbCA9IHRydWVcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIC8vIGZ1dHVyZSBlcnJvciBjYWxsYmFja3Mgd2lsbCBnbyB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGVycl9jYlxuICAgICAgICB9IGVsc2UgaWYgKHByb3h5LmNvdW50ID09PSAwICYmICFiYWlsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cbiAqIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGFycmF5YnVmZmVyLmJ5dGVMZW5ndGg7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgZW5kID0gZW5kIHx8IGJ5dGVzO1xuXG4gIGlmIChhcnJheWJ1ZmZlci5zbGljZSkgeyByZXR1cm4gYXJyYXlidWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCk7IH1cblxuICBpZiAoc3RhcnQgPCAwKSB7IHN0YXJ0ICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPCAwKSB7IGVuZCArPSBieXRlczsgfVxuICBpZiAoZW5kID4gYnl0ZXMpIHsgZW5kID0gYnl0ZXM7IH1cblxuICBpZiAoc3RhcnQgPj0gYnl0ZXMgfHwgc3RhcnQgPj0gZW5kIHx8IGJ5dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgfVxuXG4gIHZhciBhYnYgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShlbmQgLSBzdGFydCk7XG4gIGZvciAodmFyIGkgPSBzdGFydCwgaWkgPSAwOyBpIDwgZW5kOyBpKyssIGlpKyspIHtcbiAgICByZXN1bHRbaWldID0gYWJ2W2ldO1xuICB9XG4gIHJldHVybiByZXN1bHQuYnVmZmVyO1xufTtcbiIsIlxuLyoqXG4gKiBFeHBvc2UgYEJhY2tvZmZgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja29mZjtcblxuLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEJhY2tvZmYob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgdGhpcy5tYXggPSBvcHRzLm1heCB8fCAxMDAwMDtcbiAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHZhciBtcyA9IHRoaXMubXMgKiBNYXRoLnBvdyh0aGlzLmZhY3RvciwgdGhpcy5hdHRlbXB0cysrKTtcbiAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgdmFyIHJhbmQgPSAgTWF0aC5yYW5kb20oKTtcbiAgICB2YXIgZGV2aWF0aW9uID0gTWF0aC5mbG9vcihyYW5kICogdGhpcy5qaXR0ZXIgKiBtcyk7XG4gICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCAgPyBtcyAtIGRldmlhdGlvbiA6IG1zICsgZGV2aWF0aW9uO1xuICB9XG4gIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG5cbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWluID0gZnVuY3Rpb24obWluKXtcbiAgdGhpcy5tcyA9IG1pbjtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNYXggPSBmdW5jdGlvbihtYXgpe1xuICB0aGlzLm1heCA9IG1heDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uKGppdHRlcil7XG4gIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcblxuIiwiLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlclxuICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiBOaWtsYXMgdm9uIEhlcnR6ZW5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuXG4gIC8vIFVzZSBhIGxvb2t1cCB0YWJsZSB0byBmaW5kIHRoZSBpbmRleC5cbiAgdmFyIGxvb2t1cCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xuICB9XG5cbiAgZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihhcnJheWJ1ZmZlcikge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSxcbiAgICBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9IFwiXCI7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz0zKSB7XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpXSAmIDMpIDw8IDQpIHwgKGJ5dGVzW2kgKyAxXSA+PiA0KV07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuXG4gICAgaWYgKChsZW4gJSAzKSA9PT0gMikge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyBcIj1cIjtcbiAgICB9IGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgXCI9PVwiO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjQ7XG4gIH07XG5cbiAgZXhwb3J0cy5kZWNvZGUgPSAgZnVuY3Rpb24oYmFzZTY0KSB7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LFxuICAgIGxlbiA9IGJhc2U2NC5sZW5ndGgsIGksIHAgPSAwLFxuICAgIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuXG4gICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09IFwiPVwiKSB7XG4gICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIikge1xuICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYXJyYXlidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSxcbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTQpIHtcbiAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMSldO1xuICAgICAgZW5jb2RlZDMgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsyKV07XG4gICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzMpXTtcblxuICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG4gIH07XG59KSgpO1xuIiwiLyoqXG4gKiBDcmVhdGUgYSBibG9iIGJ1aWxkZXIgZXZlbiB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxuICovXG5cbnZhciBCbG9iQnVpbGRlciA9IGdsb2JhbC5CbG9iQnVpbGRlclxuICB8fCBnbG9iYWwuV2ViS2l0QmxvYkJ1aWxkZXJcbiAgfHwgZ2xvYmFsLk1TQmxvYkJ1aWxkZXJcbiAgfHwgZ2xvYmFsLk1vekJsb2JCdWlsZGVyO1xuXG4vKipcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3IgaXMgc3VwcG9ydGVkXG4gKi9cblxudmFyIGJsb2JTdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGEgPSBuZXcgQmxvYihbJ2hpJ10pO1xuICAgIHJldHVybiBhLnNpemUgPT09IDI7XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSkoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIHN1cHBvcnRzIEFycmF5QnVmZmVyVmlld3NcbiAqIEZhaWxzIGluIFNhZmFyaSA2LCBzbyB3ZSBuZWVkIHRvIG1hcCB0byBBcnJheUJ1ZmZlcnMgdGhlcmUuXG4gKi9cblxudmFyIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldyA9IGJsb2JTdXBwb3J0ZWQgJiYgKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBiID0gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KFsxLDJdKV0pO1xuICAgIHJldHVybiBiLnNpemUgPT09IDI7XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSkoKTtcblxuLyoqXG4gKiBDaGVjayBpZiBCbG9iQnVpbGRlciBpcyBzdXBwb3J0ZWRcbiAqL1xuXG52YXIgYmxvYkJ1aWxkZXJTdXBwb3J0ZWQgPSBCbG9iQnVpbGRlclxuICAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuYXBwZW5kXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5nZXRCbG9iO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IG1hcHMgQXJyYXlCdWZmZXJWaWV3cyB0byBBcnJheUJ1ZmZlcnNcbiAqIFVzZWQgYnkgQmxvYkJ1aWxkZXIgY29uc3RydWN0b3IgYW5kIG9sZCBicm93c2VycyB0aGF0IGRpZG4ndFxuICogc3VwcG9ydCBpdCBpbiB0aGUgQmxvYiBjb25zdHJ1Y3Rvci5cbiAqL1xuXG5mdW5jdGlvbiBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjaHVuayA9IGFyeVtpXTtcbiAgICBpZiAoY2h1bmsuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIHZhciBidWYgPSBjaHVuay5idWZmZXI7XG5cbiAgICAgIC8vIGlmIHRoaXMgaXMgYSBzdWJhcnJheSwgbWFrZSBhIGNvcHkgc28gd2Ugb25seVxuICAgICAgLy8gaW5jbHVkZSB0aGUgc3ViYXJyYXkgcmVnaW9uIGZyb20gdGhlIHVuZGVybHlpbmcgYnVmZmVyXG4gICAgICBpZiAoY2h1bmsuYnl0ZUxlbmd0aCAhPT0gYnVmLmJ5dGVMZW5ndGgpIHtcbiAgICAgICAgdmFyIGNvcHkgPSBuZXcgVWludDhBcnJheShjaHVuay5ieXRlTGVuZ3RoKTtcbiAgICAgICAgY29weS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLCBjaHVuay5ieXRlT2Zmc2V0LCBjaHVuay5ieXRlTGVuZ3RoKSk7XG4gICAgICAgIGJ1ZiA9IGNvcHkuYnVmZmVyO1xuICAgICAgfVxuXG4gICAgICBhcnlbaV0gPSBidWY7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIEJsb2JCdWlsZGVyQ29uc3RydWN0b3IoYXJ5LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBiYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xuICBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICBiYi5hcHBlbmQoYXJ5W2ldKTtcbiAgfVxuXG4gIHJldHVybiAob3B0aW9ucy50eXBlKSA/IGJiLmdldEJsb2Iob3B0aW9ucy50eXBlKSA6IGJiLmdldEJsb2IoKTtcbn07XG5cbmZ1bmN0aW9uIEJsb2JDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcbiAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpO1xuICByZXR1cm4gbmV3IEJsb2IoYXJ5LCBvcHRpb25zIHx8IHt9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBpZiAoYmxvYlN1cHBvcnRlZCkge1xuICAgIHJldHVybiBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPyBnbG9iYWwuQmxvYiA6IEJsb2JDb25zdHJ1Y3RvcjtcbiAgfSBlbHNlIGlmIChibG9iQnVpbGRlclN1cHBvcnRlZCkge1xuICAgIHJldHVybiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn0pKCk7XG4iLCIvKipcbiAqIFNsaWNlIHJlZmVyZW5jZS5cbiAqL1xuXG52YXIgc2xpY2UgPSBbXS5zbGljZTtcblxuLyoqXG4gKiBCaW5kIGBvYmpgIHRvIGBmbmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGZuIG9yIHN0cmluZ1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBmbil7XG4gIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZm4pIGZuID0gb2JqW2ZuXTtcbiAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmQoKSByZXF1aXJlcyBhIGZ1bmN0aW9uJyk7XG4gIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgfVxufTtcbiIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLCBiKXtcbiAgdmFyIGZuID0gZnVuY3Rpb24oKXt9O1xuICBmbi5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcbiAgYS5wcm90b3R5cGUgPSBuZXcgZm47XG4gIGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gYTtcbn07IiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnbGlnaHRzZWFncmVlbicsXG4gICdmb3Jlc3RncmVlbicsXG4gICdnb2xkZW5yb2QnLFxuICAnZG9kZ2VyYmx1ZScsXG4gICdkYXJrb3JjaGlkJyxcbiAgJ2NyaW1zb24nXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogUHJldmlvdXMgbG9nIHRpbWVzdGFtcC5cbiAqL1xuXG52YXIgcHJldlRpbWU7XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xuXG4vKipcbiAqIEV4cG9ydHMgcGFyc2VyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqXG4gKi9cbm1vZHVsZS5leHBvcnRzLnBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdHJhbnNwb3J0cyA9IHJlcXVpcmUoJy4vdHJhbnNwb3J0cy9pbmRleCcpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpzb2NrZXQnKTtcbnZhciBpbmRleCA9IHJlcXVpcmUoJ2luZGV4b2YnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgcGFyc2V1cmkgPSByZXF1aXJlKCdwYXJzZXVyaScpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBTb2NrZXQ7XG5cbi8qKlxuICogU29ja2V0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gdXJpIG9yIG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFNvY2tldCAodXJpLCBvcHRzKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb2NrZXQpKSByZXR1cm4gbmV3IFNvY2tldCh1cmksIG9wdHMpO1xuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIGlmICh1cmkgJiYgJ29iamVjdCcgPT09IHR5cGVvZiB1cmkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IG51bGw7XG4gIH1cblxuICBpZiAodXJpKSB7XG4gICAgdXJpID0gcGFyc2V1cmkodXJpKTtcbiAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgb3B0cy5zZWN1cmUgPSB1cmkucHJvdG9jb2wgPT09ICdodHRwcycgfHwgdXJpLnByb3RvY29sID09PSAnd3NzJztcbiAgICBvcHRzLnBvcnQgPSB1cmkucG9ydDtcbiAgICBpZiAodXJpLnF1ZXJ5KSBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICB9IGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgIG9wdHMuaG9zdG5hbWUgPSBwYXJzZXVyaShvcHRzLmhvc3QpLmhvc3Q7XG4gIH1cblxuICB0aGlzLnNlY3VyZSA9IG51bGwgIT0gb3B0cy5zZWN1cmUgPyBvcHRzLnNlY3VyZVxuICAgIDogKGdsb2JhbC5sb2NhdGlvbiAmJiAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2wpO1xuXG4gIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgb3B0cy5wb3J0ID0gdGhpcy5zZWN1cmUgPyAnNDQzJyA6ICc4MCc7XG4gIH1cblxuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHxcbiAgICAoZ2xvYmFsLmxvY2F0aW9uID8gbG9jYXRpb24uaG9zdG5hbWUgOiAnbG9jYWxob3N0Jyk7XG4gIHRoaXMucG9ydCA9IG9wdHMucG9ydCB8fCAoZ2xvYmFsLmxvY2F0aW9uICYmIGxvY2F0aW9uLnBvcnRcbiAgICAgID8gbG9jYXRpb24ucG9ydFxuICAgICAgOiAodGhpcy5zZWN1cmUgPyA0NDMgOiA4MCkpO1xuICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeSB8fCB7fTtcbiAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdGhpcy5xdWVyeSkgdGhpcy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMucXVlcnkpO1xuICB0aGlzLnVwZ3JhZGUgPSBmYWxzZSAhPT0gb3B0cy51cGdyYWRlO1xuICB0aGlzLnBhdGggPSAob3B0cy5wYXRoIHx8ICcvZW5naW5lLmlvJykucmVwbGFjZSgvXFwvJC8sICcnKSArICcvJztcbiAgdGhpcy5mb3JjZUpTT05QID0gISFvcHRzLmZvcmNlSlNPTlA7XG4gIHRoaXMuanNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcbiAgdGhpcy5mb3JjZUJhc2U2NCA9ICEhb3B0cy5mb3JjZUJhc2U2NDtcbiAgdGhpcy5lbmFibGVzWERSID0gISFvcHRzLmVuYWJsZXNYRFI7XG4gIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtIHx8ICd0JztcbiAgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7XG4gIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbJ3BvbGxpbmcnLCAnd2Vic29ja2V0J107XG4gIHRoaXMudHJhbnNwb3J0T3B0aW9ucyA9IG9wdHMudHJhbnNwb3J0T3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJyc7XG4gIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgdGhpcy5wb2xpY3lQb3J0ID0gb3B0cy5wb2xpY3lQb3J0IHx8IDg0MztcbiAgdGhpcy5yZW1lbWJlclVwZ3JhZGUgPSBvcHRzLnJlbWVtYmVyVXBncmFkZSB8fCBmYWxzZTtcbiAgdGhpcy5iaW5hcnlUeXBlID0gbnVsbDtcbiAgdGhpcy5vbmx5QmluYXJ5VXBncmFkZXMgPSBvcHRzLm9ubHlCaW5hcnlVcGdyYWRlcztcbiAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IGZhbHNlICE9PSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlID8gKG9wdHMucGVyTWVzc2FnZURlZmxhdGUgfHwge30pIDogZmFsc2U7XG5cbiAgaWYgKHRydWUgPT09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUpIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSB7fTtcbiAgaWYgKHRoaXMucGVyTWVzc2FnZURlZmxhdGUgJiYgbnVsbCA9PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgIHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkID0gMTAyNDtcbiAgfVxuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4IHx8IG51bGw7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXkgfHwgbnVsbDtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlIHx8IG51bGw7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydCB8fCBudWxsO1xuICB0aGlzLmNhID0gb3B0cy5jYSB8fCBudWxsO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnMgfHwgbnVsbDtcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuICB0aGlzLmZvcmNlTm9kZSA9ICEhb3B0cy5mb3JjZU5vZGU7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG4gIGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCkge1xuICAgIGlmIChvcHRzLmV4dHJhSGVhZGVycyAmJiBPYmplY3Qua2V5cyhvcHRzLmV4dHJhSGVhZGVycykubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5sb2NhbEFkZHJlc3MpIHtcbiAgICAgIHRoaXMubG9jYWxBZGRyZXNzID0gb3B0cy5sb2NhbEFkZHJlc3M7XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IG9uIGhhbmRzaGFrZVxuICB0aGlzLmlkID0gbnVsbDtcbiAgdGhpcy51cGdyYWRlcyA9IG51bGw7XG4gIHRoaXMucGluZ0ludGVydmFsID0gbnVsbDtcbiAgdGhpcy5waW5nVGltZW91dCA9IG51bGw7XG5cbiAgLy8gc2V0IG9uIGhlYXJ0YmVhdFxuICB0aGlzLnBpbmdJbnRlcnZhbFRpbWVyID0gbnVsbDtcbiAgdGhpcy5waW5nVGltZW91dFRpbWVyID0gbnVsbDtcblxuICB0aGlzLm9wZW4oKTtcbn1cblxuU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sOyAvLyB0aGlzIGlzIGFuIGludFxuXG4vKipcbiAqIEV4cG9zZSBkZXBzIGZvciBsZWdhY3kgY29tcGF0aWJpbGl0eVxuICogYW5kIHN0YW5kYWxvbmUgYnJvd3NlciBhY2Nlc3MuXG4gKi9cblxuU29ja2V0LlNvY2tldCA9IFNvY2tldDtcblNvY2tldC5UcmFuc3BvcnQgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuU29ja2V0LnRyYW5zcG9ydHMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydHMvaW5kZXgnKTtcblNvY2tldC5wYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyB0cmFuc3BvcnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlYnVnKCdjcmVhdGluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gIHZhciBxdWVyeSA9IGNsb25lKHRoaXMucXVlcnkpO1xuXG4gIC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxuICBxdWVyeS5FSU8gPSBwYXJzZXIucHJvdG9jb2w7XG5cbiAgLy8gdHJhbnNwb3J0IG5hbWVcbiAgcXVlcnkudHJhbnNwb3J0ID0gbmFtZTtcblxuICAvLyBwZXItdHJhbnNwb3J0IG9wdGlvbnNcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0gfHwge307XG5cbiAgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gIGlmICh0aGlzLmlkKSBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuXG4gIHZhciB0cmFuc3BvcnQgPSBuZXcgdHJhbnNwb3J0c1tuYW1lXSh7XG4gICAgcXVlcnk6IHF1ZXJ5LFxuICAgIHNvY2tldDogdGhpcyxcbiAgICBhZ2VudDogb3B0aW9ucy5hZ2VudCB8fCB0aGlzLmFnZW50LFxuICAgIGhvc3RuYW1lOiBvcHRpb25zLmhvc3RuYW1lIHx8IHRoaXMuaG9zdG5hbWUsXG4gICAgcG9ydDogb3B0aW9ucy5wb3J0IHx8IHRoaXMucG9ydCxcbiAgICBzZWN1cmU6IG9wdGlvbnMuc2VjdXJlIHx8IHRoaXMuc2VjdXJlLFxuICAgIHBhdGg6IG9wdGlvbnMucGF0aCB8fCB0aGlzLnBhdGgsXG4gICAgZm9yY2VKU09OUDogb3B0aW9ucy5mb3JjZUpTT05QIHx8IHRoaXMuZm9yY2VKU09OUCxcbiAgICBqc29ucDogb3B0aW9ucy5qc29ucCB8fCB0aGlzLmpzb25wLFxuICAgIGZvcmNlQmFzZTY0OiBvcHRpb25zLmZvcmNlQmFzZTY0IHx8IHRoaXMuZm9yY2VCYXNlNjQsXG4gICAgZW5hYmxlc1hEUjogb3B0aW9ucy5lbmFibGVzWERSIHx8IHRoaXMuZW5hYmxlc1hEUixcbiAgICB0aW1lc3RhbXBSZXF1ZXN0czogb3B0aW9ucy50aW1lc3RhbXBSZXF1ZXN0cyB8fCB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzLFxuICAgIHRpbWVzdGFtcFBhcmFtOiBvcHRpb25zLnRpbWVzdGFtcFBhcmFtIHx8IHRoaXMudGltZXN0YW1wUGFyYW0sXG4gICAgcG9saWN5UG9ydDogb3B0aW9ucy5wb2xpY3lQb3J0IHx8IHRoaXMucG9saWN5UG9ydCxcbiAgICBwZng6IG9wdGlvbnMucGZ4IHx8IHRoaXMucGZ4LFxuICAgIGtleTogb3B0aW9ucy5rZXkgfHwgdGhpcy5rZXksXG4gICAgcGFzc3BocmFzZTogb3B0aW9ucy5wYXNzcGhyYXNlIHx8IHRoaXMucGFzc3BocmFzZSxcbiAgICBjZXJ0OiBvcHRpb25zLmNlcnQgfHwgdGhpcy5jZXJ0LFxuICAgIGNhOiBvcHRpb25zLmNhIHx8IHRoaXMuY2EsXG4gICAgY2lwaGVyczogb3B0aW9ucy5jaXBoZXJzIHx8IHRoaXMuY2lwaGVycyxcbiAgICByZWplY3RVbmF1dGhvcml6ZWQ6IG9wdGlvbnMucmVqZWN0VW5hdXRob3JpemVkIHx8IHRoaXMucmVqZWN0VW5hdXRob3JpemVkLFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiBvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHRoaXMucGVyTWVzc2FnZURlZmxhdGUsXG4gICAgZXh0cmFIZWFkZXJzOiBvcHRpb25zLmV4dHJhSGVhZGVycyB8fCB0aGlzLmV4dHJhSGVhZGVycyxcbiAgICBmb3JjZU5vZGU6IG9wdGlvbnMuZm9yY2VOb2RlIHx8IHRoaXMuZm9yY2VOb2RlLFxuICAgIGxvY2FsQWRkcmVzczogb3B0aW9ucy5sb2NhbEFkZHJlc3MgfHwgdGhpcy5sb2NhbEFkZHJlc3MsXG4gICAgcmVxdWVzdFRpbWVvdXQ6IG9wdGlvbnMucmVxdWVzdFRpbWVvdXQgfHwgdGhpcy5yZXF1ZXN0VGltZW91dCxcbiAgICBwcm90b2NvbHM6IG9wdGlvbnMucHJvdG9jb2xzIHx8IHZvaWQgKDApXG4gIH0pO1xuXG4gIHJldHVybiB0cmFuc3BvcnQ7XG59O1xuXG5mdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIHZhciBvID0ge307XG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgb1tpXSA9IG9ialtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG87XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5Tb2NrZXQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0cmFuc3BvcnQ7XG4gIGlmICh0aGlzLnJlbWVtYmVyVXBncmFkZSAmJiBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzICYmIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKCd3ZWJzb2NrZXQnKSAhPT0gLTEpIHtcbiAgICB0cmFuc3BvcnQgPSAnd2Vic29ja2V0JztcbiAgfSBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5lbWl0KCdlcnJvcicsICdObyB0cmFuc3BvcnRzIGF2YWlsYWJsZScpO1xuICAgIH0sIDApO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICB0cmFuc3BvcnQgPSB0aGlzLnRyYW5zcG9ydHNbMF07XG4gIH1cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuXG4gIC8vIFJldHJ5IHdpdGggdGhlIG5leHQgdHJhbnNwb3J0IGlmIHRoZSB0cmFuc3BvcnQgaXMgZGlzYWJsZWQgKGpzb25wOiBmYWxzZSlcbiAgdHJ5IHtcbiAgICB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgdGhpcy5vcGVuKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgdGhpcy5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQuIERpc2FibGVzIHRoZSBleGlzdGluZyBvbmUgKGlmIGFueSkuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZXRUcmFuc3BvcnQgPSBmdW5jdGlvbiAodHJhbnNwb3J0KSB7XG4gIGRlYnVnKCdzZXR0aW5nIHRyYW5zcG9ydCAlcycsIHRyYW5zcG9ydC5uYW1lKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgIGRlYnVnKCdjbGVhcmluZyBleGlzdGluZyB0cmFuc3BvcnQgJXMnLCB0aGlzLnRyYW5zcG9ydC5uYW1lKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIC8vIHNldCB1cCB0cmFuc3BvcnRcbiAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG5cbiAgLy8gc2V0IHVwIHRyYW5zcG9ydCBsaXN0ZW5lcnNcbiAgdHJhbnNwb3J0XG4gIC5vbignZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkRyYWluKCk7XG4gIH0pXG4gIC5vbigncGFja2V0JywgZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHNlbGYub25QYWNrZXQocGFja2V0KTtcbiAgfSlcbiAgLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKGUpO1xuICB9KVxuICAub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25DbG9zZSgndHJhbnNwb3J0IGNsb3NlJyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBQcm9iZXMgYSB0cmFuc3BvcnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnByb2JlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgZGVidWcoJ3Byb2JpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICB2YXIgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSwgeyBwcm9iZTogMSB9KTtcbiAgdmFyIGZhaWxlZCA9IGZhbHNlO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIG9uVHJhbnNwb3J0T3BlbiAoKSB7XG4gICAgaWYgKHNlbGYub25seUJpbmFyeVVwZ3JhZGVzKSB7XG4gICAgICB2YXIgdXBncmFkZUxvc2VzQmluYXJ5ID0gIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgc2VsZi50cmFuc3BvcnQuc3VwcG9ydHNCaW5hcnk7XG4gICAgICBmYWlsZWQgPSBmYWlsZWQgfHwgdXBncmFkZUxvc2VzQmluYXJ5O1xuICAgIH1cbiAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBvcGVuZWQnLCBuYW1lKTtcbiAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiAncGluZycsIGRhdGE6ICdwcm9iZScgfV0pO1xuICAgIHRyYW5zcG9ydC5vbmNlKCdwYWNrZXQnLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICBpZiAoJ3BvbmcnID09PSBtc2cudHlwZSAmJiAncHJvYmUnID09PSBtc2cuZGF0YSkge1xuICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBwb25nJywgbmFtZSk7XG4gICAgICAgIHNlbGYudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRpbmcnLCB0cmFuc3BvcnQpO1xuICAgICAgICBpZiAoIXRyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gJ3dlYnNvY2tldCcgPT09IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgICAgIGRlYnVnKCdwYXVzaW5nIGN1cnJlbnQgdHJhbnNwb3J0IFwiJXNcIicsIHNlbGYudHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICBzZWxmLnRyYW5zcG9ydC5wYXVzZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgICAgIGlmICgnY2xvc2VkJyA9PT0gc2VsZi5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgICAgZGVidWcoJ2NoYW5naW5nIHRyYW5zcG9ydCBhbmQgc2VuZGluZyB1cGdyYWRlIHBhY2tldCcpO1xuXG4gICAgICAgICAgY2xlYW51cCgpO1xuXG4gICAgICAgICAgc2VsZi5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiAndXBncmFkZScgfV0pO1xuICAgICAgICAgIHNlbGYuZW1pdCgndXBncmFkZScsIHRyYW5zcG9ydCk7XG4gICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNlbGYuZmx1c2goKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQnLCBuYW1lKTtcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3InKTtcbiAgICAgICAgZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsIGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBmcmVlemVUcmFuc3BvcnQgKCkge1xuICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgIC8vIEFueSBjYWxsYmFjayBjYWxsZWQgYnkgdHJhbnNwb3J0IHNob3VsZCBiZSBpZ25vcmVkIHNpbmNlIG5vd1xuICAgIGZhaWxlZCA9IHRydWU7XG5cbiAgICBjbGVhbnVwKCk7XG5cbiAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICB0cmFuc3BvcnQgPSBudWxsO1xuICB9XG5cbiAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbmVycm9yIChlcnIpIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3Byb2JlIGVycm9yOiAnICsgZXJyKTtcbiAgICBlcnJvci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcblxuICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuXG4gICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkIGJlY2F1c2Ugb2YgZXJyb3I6ICVzJywgbmFtZSwgZXJyKTtcblxuICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyb3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25UcmFuc3BvcnRDbG9zZSAoKSB7XG4gICAgb25lcnJvcigndHJhbnNwb3J0IGNsb3NlZCcpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9uY2xvc2UgKCkge1xuICAgIG9uZXJyb3IoJ3NvY2tldCBjbG9zZWQnKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9udXBncmFkZSAodG8pIHtcbiAgICBpZiAodHJhbnNwb3J0ICYmIHRvLm5hbWUgIT09IHRyYW5zcG9ydC5uYW1lKSB7XG4gICAgICBkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJywgdG8ubmFtZSwgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gdGhlIHRyYW5zcG9ydCBhbmQgb24gc2VsZlxuICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ29wZW4nLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBvbmVycm9yKTtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRpbmcnLCBvbnVwZ3JhZGUpO1xuICB9XG5cbiAgdHJhbnNwb3J0Lm9uY2UoJ29wZW4nLCBvblRyYW5zcG9ydE9wZW4pO1xuICB0cmFuc3BvcnQub25jZSgnZXJyb3InLCBvbmVycm9yKTtcbiAgdHJhbnNwb3J0Lm9uY2UoJ2Nsb3NlJywgb25UcmFuc3BvcnRDbG9zZSk7XG5cbiAgdGhpcy5vbmNlKCdjbG9zZScsIG9uY2xvc2UpO1xuICB0aGlzLm9uY2UoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG5cbiAgdHJhbnNwb3J0Lm9wZW4oKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1Zygnc29ja2V0IG9wZW4nKTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gJ3dlYnNvY2tldCcgPT09IHRoaXMudHJhbnNwb3J0Lm5hbWU7XG4gIHRoaXMuZW1pdCgnb3BlbicpO1xuICB0aGlzLmZsdXNoKCk7XG5cbiAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnVwZ3JhZGUgJiYgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICBkZWJ1Zygnc3RhcnRpbmcgdXBncmFkZSBwcm9iZXMnKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMudXBncmFkZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLnByb2JlKHRoaXMudXBncmFkZXNbaV0pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVzIGEgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgJ2Nsb3NpbmcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICBkZWJ1Zygnc29ja2V0IHJlY2VpdmU6IHR5cGUgXCIlc1wiLCBkYXRhIFwiJXNcIicsIHBhY2tldC50eXBlLCBwYWNrZXQuZGF0YSk7XG5cbiAgICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG5cbiAgICAvLyBTb2NrZXQgaXMgbGl2ZSAtIGFueSBwYWNrZXQgY291bnRzXG4gICAgdGhpcy5lbWl0KCdoZWFydGJlYXQnKTtcblxuICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ29wZW4nOlxuICAgICAgICB0aGlzLm9uSGFuZHNoYWtlKEpTT04ucGFyc2UocGFja2V0LmRhdGEpKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3BvbmcnOlxuICAgICAgICB0aGlzLnNldFBpbmcoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdwb25nJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3NlcnZlciBlcnJvcicpO1xuICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICB0aGlzLmVtaXQoJ2RhdGEnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGRlYnVnKCdwYWNrZXQgcmVjZWl2ZWQgd2l0aCBzb2NrZXQgcmVhZHlTdGF0ZSBcIiVzXCInLCB0aGlzLnJlYWR5U3RhdGUpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGhhbmRzaGFrZSBjb21wbGV0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kc2hha2Ugb2JqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uSGFuZHNoYWtlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5lbWl0KCdoYW5kc2hha2UnLCBkYXRhKTtcbiAgdGhpcy5pZCA9IGRhdGEuc2lkO1xuICB0aGlzLnRyYW5zcG9ydC5xdWVyeS5zaWQgPSBkYXRhLnNpZDtcbiAgdGhpcy51cGdyYWRlcyA9IHRoaXMuZmlsdGVyVXBncmFkZXMoZGF0YS51cGdyYWRlcyk7XG4gIHRoaXMucGluZ0ludGVydmFsID0gZGF0YS5waW5nSW50ZXJ2YWw7XG4gIHRoaXMucGluZ1RpbWVvdXQgPSBkYXRhLnBpbmdUaW1lb3V0O1xuICB0aGlzLm9uT3BlbigpO1xuICAvLyBJbiBjYXNlIG9wZW4gaGFuZGxlciBjbG9zZXMgc29ja2V0XG4gIGlmICgnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSByZXR1cm47XG4gIHRoaXMuc2V0UGluZygpO1xuXG4gIC8vIFByb2xvbmcgbGl2ZW5lc3Mgb2Ygc29ja2V0IG9uIGhlYXJ0YmVhdFxuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdoZWFydGJlYXQnLCB0aGlzLm9uSGVhcnRiZWF0KTtcbiAgdGhpcy5vbignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG59O1xuXG4vKipcbiAqIFJlc2V0cyBwaW5nIHRpbWVvdXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkhlYXJ0YmVhdCA9IGZ1bmN0aW9uICh0aW1lb3V0KSB7XG4gIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHNlbGYucGluZ1RpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGlmICgnY2xvc2VkJyA9PT0gc2VsZi5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgc2VsZi5vbkNsb3NlKCdwaW5nIHRpbWVvdXQnKTtcbiAgfSwgdGltZW91dCB8fCAoc2VsZi5waW5nSW50ZXJ2YWwgKyBzZWxmLnBpbmdUaW1lb3V0KSk7XG59O1xuXG4vKipcbiAqIFBpbmdzIHNlcnZlciBldmVyeSBgdGhpcy5waW5nSW50ZXJ2YWxgIGFuZCBleHBlY3RzIHJlc3BvbnNlXG4gKiB3aXRoaW4gYHRoaXMucGluZ1RpbWVvdXRgIG9yIGNsb3NlcyBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2V0UGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjbGVhclRpbWVvdXQoc2VsZi5waW5nSW50ZXJ2YWxUaW1lcik7XG4gIHNlbGYucGluZ0ludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBkZWJ1Zygnd3JpdGluZyBwaW5nIHBhY2tldCAtIGV4cGVjdGluZyBwb25nIHdpdGhpbiAlc21zJywgc2VsZi5waW5nVGltZW91dCk7XG4gICAgc2VsZi5waW5nKCk7XG4gICAgc2VsZi5vbkhlYXJ0YmVhdChzZWxmLnBpbmdUaW1lb3V0KTtcbiAgfSwgc2VsZi5waW5nSW50ZXJ2YWwpO1xufTtcblxuLyoqXG4qIFNlbmRzIGEgcGluZyBwYWNrZXQuXG4qXG4qIEBhcGkgcHJpdmF0ZVxuKi9cblxuU29ja2V0LnByb3RvdHlwZS5waW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuc2VuZFBhY2tldCgncGluZycsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLmVtaXQoJ3BpbmcnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkRyYWluID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuXG4gIC8vIHNldHRpbmcgcHJldkJ1ZmZlckxlbiA9IDAgaXMgdmVyeSBpbXBvcnRhbnRcbiAgLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4gIC8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG4gIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG5cbiAgaWYgKDAgPT09IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgdGhpcy5lbWl0KCdkcmFpbicpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZmx1c2goKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGbHVzaCB3cml0ZSBidWZmZXJzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnY2xvc2VkJyAhPT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmXG4gICAgIXRoaXMudXBncmFkaW5nICYmIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgZGVidWcoJ2ZsdXNoaW5nICVkIHBhY2tldHMgaW4gc29ja2V0JywgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpO1xuICAgIHRoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7XG4gICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgIC8vIHNwbGljZSB3cml0ZUJ1ZmZlciBhbmQgY2FsbGJhY2tCdWZmZXIgb24gYGRyYWluYFxuICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO1xuICAgIHRoaXMuZW1pdCgnZmx1c2gnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZW5kcyBhIG1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUud3JpdGUgPVxuU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgdGhpcy5zZW5kUGFja2V0KCdtZXNzYWdlJywgbXNnLCBvcHRpb25zLCBmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFja2V0IHR5cGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNlbmRQYWNrZXQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSwgb3B0aW9ucywgZm4pIHtcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBkYXRhKSB7XG4gICAgZm4gPSBkYXRhO1xuICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICBmbiA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cblxuICBpZiAoJ2Nsb3NpbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBvcHRpb25zLmNvbXByZXNzID0gZmFsc2UgIT09IG9wdGlvbnMuY29tcHJlc3M7XG5cbiAgdmFyIHBhY2tldCA9IHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRhdGE6IGRhdGEsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9O1xuICB0aGlzLmVtaXQoJ3BhY2tldENyZWF0ZScsIHBhY2tldCk7XG4gIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICBpZiAoZm4pIHRoaXMub25jZSgnZmx1c2gnLCBmbik7XG4gIHRoaXMuZmx1c2goKTtcbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zaW5nJztcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICh0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoJ2ZvcmNlZCBjbG9zZScpO1xuICAgIGRlYnVnKCdzb2NrZXQgY2xvc2luZyAtIHRlbGxpbmcgdHJhbnNwb3J0IHRvIGNsb3NlJyk7XG4gICAgc2VsZi50cmFuc3BvcnQuY2xvc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFudXBBbmRDbG9zZSAoKSB7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkZScsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICBjbG9zZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2FpdEZvclVwZ3JhZGUgKCkge1xuICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgc2VsZi5vbmNlKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICBzZWxmLm9uY2UoJ3VwZ3JhZGVFcnJvcicsIGNsZWFudXBBbmRDbG9zZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGVycm9yXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICBkZWJ1Zygnc29ja2V0IGVycm9yICVqJywgZXJyKTtcbiAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgdGhpcy5vbkNsb3NlKCd0cmFuc3BvcnQgZXJyb3InLCBlcnIpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKHJlYXNvbiwgZGVzYykge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NpbmcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICBkZWJ1Zygnc29ja2V0IGNsb3NlIHdpdGggcmVhc29uOiBcIiVzXCInLCByZWFzb24pO1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIGNsZWFyIHRpbWVyc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcblxuICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygnY2xvc2UnKTtcblxuICAgIC8vIGVuc3VyZSB0cmFuc3BvcnQgd29uJ3Qgc3RheSBvcGVuXG4gICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcblxuICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcblxuICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICB0aGlzLmlkID0gbnVsbDtcblxuICAgIC8vIGVtaXQgY2xvc2UgZXZlbnRcbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgcmVhc29uLCBkZXNjKTtcblxuICAgIC8vIGNsZWFuIGJ1ZmZlcnMgYWZ0ZXIsIHNvIHVzZXJzIGNhbiBzdGlsbFxuICAgIC8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuICAgIHNlbGYud3JpdGVCdWZmZXIgPSBbXTtcbiAgICBzZWxmLnByZXZCdWZmZXJMZW4gPSAwO1xuICB9XG59O1xuXG4vKipcbiAqIEZpbHRlcnMgdXBncmFkZXMsIHJldHVybmluZyBvbmx5IHRob3NlIG1hdGNoaW5nIGNsaWVudCB0cmFuc3BvcnRzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHNlcnZlciB1cGdyYWRlc1xuICogQGFwaSBwcml2YXRlXG4gKlxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZmlsdGVyVXBncmFkZXMgPSBmdW5jdGlvbiAodXBncmFkZXMpIHtcbiAgdmFyIGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGogPSB1cGdyYWRlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICBpZiAofmluZGV4KHRoaXMudHJhbnNwb3J0cywgdXBncmFkZXNbaV0pKSBmaWx0ZXJlZFVwZ3JhZGVzLnB1c2godXBncmFkZXNbaV0pO1xuICB9XG4gIHJldHVybiBmaWx0ZXJlZFVwZ3JhZGVzO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuXG4vKipcbiAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFRyYW5zcG9ydCAob3B0cykge1xuICB0aGlzLnBhdGggPSBvcHRzLnBhdGg7XG4gIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQ7XG4gIHRoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbTtcbiAgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycztcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgdGhpcy5mb3JjZU5vZGUgPSBvcHRzLmZvcmNlTm9kZTtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuICB0aGlzLmxvY2FsQWRkcmVzcyA9IG9wdHMubG9jYWxBZGRyZXNzO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihUcmFuc3BvcnQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBFbWl0cyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAobXNnLCBkZXNjKSB7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnR5cGUgPSAnVHJhbnNwb3J0RXJyb3InO1xuICBlcnIuZGVzY3JpcHRpb24gPSBkZXNjO1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE9wZW5zIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gICAgdGhpcy5kb09wZW4oKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIHRyYW5zcG9ydC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBtdWx0aXBsZSBwYWNrZXRzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMud3JpdGUocGFja2V0cyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgbm90IG9wZW4nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBvcGVuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gIHRoaXMuZW1pdCgnb3BlbicpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBkYXRhLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBwYWNrZXQgPSBwYXJzZXIuZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG52YXIgWEhSID0gcmVxdWlyZSgnLi9wb2xsaW5nLXhocicpO1xudmFyIEpTT05QID0gcmVxdWlyZSgnLi9wb2xsaW5nLWpzb25wJyk7XG52YXIgd2Vic29ja2V0ID0gcmVxdWlyZSgnLi93ZWJzb2NrZXQnKTtcblxuLyoqXG4gKiBFeHBvcnQgdHJhbnNwb3J0cy5cbiAqL1xuXG5leHBvcnRzLnBvbGxpbmcgPSBwb2xsaW5nO1xuZXhwb3J0cy53ZWJzb2NrZXQgPSB3ZWJzb2NrZXQ7XG5cbi8qKlxuICogUG9sbGluZyB0cmFuc3BvcnQgcG9seW1vcnBoaWMgY29uc3RydWN0b3IuXG4gKiBEZWNpZGVzIG9uIHhociB2cyBqc29ucCBiYXNlZCBvbiBmZWF0dXJlIGRldGVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwb2xsaW5nIChvcHRzKSB7XG4gIHZhciB4aHI7XG4gIHZhciB4ZCA9IGZhbHNlO1xuICB2YXIgeHMgPSBmYWxzZTtcbiAgdmFyIGpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG5cbiAgaWYgKGdsb2JhbC5sb2NhdGlvbikge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICB2YXIgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICB9XG5cbiAgICB4ZCA9IG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICB4cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgfVxuXG4gIG9wdHMueGRvbWFpbiA9IHhkO1xuICBvcHRzLnhzY2hlbWUgPSB4cztcbiAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuXG4gIGlmICgnb3BlbicgaW4geGhyICYmICFvcHRzLmZvcmNlSlNPTlApIHtcbiAgICByZXR1cm4gbmV3IFhIUihvcHRzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWpzb25wKSB0aHJvdyBuZXcgRXJyb3IoJ0pTT05QIGRpc2FibGVkJyk7XG4gICAgcmV0dXJuIG5ldyBKU09OUChvcHRzKTtcbiAgfVxufVxuIiwiXG4vKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpTT05QUG9sbGluZztcblxuLyoqXG4gKiBDYWNoZWQgcmVndWxhciBleHByZXNzaW9ucy5cbiAqL1xuXG52YXIgck5ld2xpbmUgPSAvXFxuL2c7XG52YXIgckVzY2FwZWROZXdsaW5lID0gL1xcXFxuL2c7XG5cbi8qKlxuICogR2xvYmFsIEpTT05QIGNhbGxiYWNrcy5cbiAqL1xuXG52YXIgY2FsbGJhY2tzO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gZW1wdHkgKCkgeyB9XG5cbi8qKlxuICogSlNPTlAgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gSlNPTlBQb2xsaW5nIChvcHRzKSB7XG4gIFBvbGxpbmcuY2FsbCh0aGlzLCBvcHRzKTtcblxuICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcblxuICAvLyBkZWZpbmUgZ2xvYmFsIGNhbGxiYWNrcyBhcnJheSBpZiBub3QgcHJlc2VudFxuICAvLyB3ZSBkbyB0aGlzIGhlcmUgKGxhemlseSkgdG8gYXZvaWQgdW5uZWVkZWQgZ2xvYmFsIHBvbGx1dGlvblxuICBpZiAoIWNhbGxiYWNrcykge1xuICAgIC8vIHdlIG5lZWQgdG8gY29uc2lkZXIgbXVsdGlwbGUgZW5naW5lcyBpbiB0aGUgc2FtZSBwYWdlXG4gICAgaWYgKCFnbG9iYWwuX19fZWlvKSBnbG9iYWwuX19fZWlvID0gW107XG4gICAgY2FsbGJhY2tzID0gZ2xvYmFsLl9fX2VpbztcbiAgfVxuXG4gIC8vIGNhbGxiYWNrIGlkZW50aWZpZXJcbiAgdGhpcy5pbmRleCA9IGNhbGxiYWNrcy5sZW5ndGg7XG5cbiAgLy8gYWRkIGNhbGxiYWNrIHRvIGpzb25wIGdsb2JhbFxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICBzZWxmLm9uRGF0YShtc2cpO1xuICB9KTtcblxuICAvLyBhcHBlbmQgdG8gcXVlcnkgc3RyaW5nXG4gIHRoaXMucXVlcnkuaiA9IHRoaXMuaW5kZXg7XG5cbiAgLy8gcHJldmVudCBzcHVyaW91cyBlcnJvcnMgZnJvbSBiZWluZyBlbWl0dGVkIHdoZW4gdGhlIHdpbmRvdyBpcyB1bmxvYWRlZFxuICBpZiAoZ2xvYmFsLmRvY3VtZW50ICYmIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLnNjcmlwdCkgc2VsZi5zY3JpcHQub25lcnJvciA9IGVtcHR5O1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAqL1xuXG5pbmhlcml0KEpTT05QUG9sbGluZywgUG9sbGluZyk7XG5cbi8qXG4gKiBKU09OUCBvbmx5IHN1cHBvcnRzIGJpbmFyeSBhcyBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuXG4vKipcbiAqIENsb3NlcyB0aGUgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgaWYgKHRoaXMuZm9ybSkge1xuICAgIHRoaXMuZm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZm9ybSk7XG4gICAgdGhpcy5mb3JtID0gbnVsbDtcbiAgICB0aGlzLmlmcmFtZSA9IG51bGw7XG4gIH1cblxuICBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gIGlmICh0aGlzLnNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuXG4gIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gIHNjcmlwdC5zcmMgPSB0aGlzLnVyaSgpO1xuICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsIGVycm9yJywgZSk7XG4gIH07XG5cbiAgdmFyIGluc2VydEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICBpZiAoaW5zZXJ0QXQpIHtcbiAgICBpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGluc2VydEF0KTtcbiAgfSBlbHNlIHtcbiAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG4gIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuXG4gIHZhciBpc1VBZ2Vja28gPSAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvZ2Vja28vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIGlmIChpc1VBZ2Vja28pIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICB9LCAxMDApO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyB3aXRoIGEgaGlkZGVuIGlmcmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICB2YXIgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgdmFyIGlkID0gdGhpcy5pZnJhbWVJZCA9ICdlaW9faWZyYW1lXycgKyB0aGlzLmluZGV4O1xuICAgIHZhciBpZnJhbWU7XG5cbiAgICBmb3JtLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7XG4gICAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZm9ybS5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgZm9ybS5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xuICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjY2VwdC1jaGFyc2V0JywgJ3V0Zi04Jyk7XG4gICAgYXJlYS5uYW1lID0gJ2QnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYXJlYSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgfVxuXG4gIHRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnVyaSgpO1xuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlICgpIHtcbiAgICBpbml0SWZyYW1lKCk7XG4gICAgZm4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJZnJhbWUgKCkge1xuICAgIGlmIChzZWxmLmlmcmFtZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsaW5nIGlmcmFtZSByZW1vdmFsIGVycm9yJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgdmFyIGh0bWwgPSAnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiBuYW1lPVwiJyArIHNlbGYuaWZyYW1lSWQgKyAnXCI+JztcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUubmFtZSA9IHNlbGYuaWZyYW1lSWQ7XG4gICAgICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6MCc7XG4gICAgfVxuXG4gICAgaWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtcblxuICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIHNlbGYuaWZyYW1lID0gaWZyYW1lO1xuICB9XG5cbiAgaW5pdElmcmFtZSgpO1xuXG4gIC8vIGVzY2FwZSBcXG4gdG8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGNvbnZlcnRlZCBpbnRvIFxcclxcbiBieSBzb21lIFVBc1xuICAvLyBkb3VibGUgZXNjYXBpbmcgaXMgcmVxdWlyZWQgZm9yIGVzY2FwZWQgbmV3IGxpbmVzIGJlY2F1c2UgdW5lc2NhcGluZyBvZiBuZXcgbGluZXMgY2FuIGJlIGRvbmUgc2FmZWx5IG9uIHNlcnZlci1zaWRlXG4gIGRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCAnXFxcXFxcbicpO1xuICB0aGlzLmFyZWEudmFsdWUgPSBkYXRhLnJlcGxhY2Uock5ld2xpbmUsICdcXFxcbicpO1xuXG4gIHRyeSB7XG4gICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIGlmICh0aGlzLmlmcmFtZS5hdHRhY2hFdmVudCkge1xuICAgIHRoaXMuaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTtcbiAgfVxufTtcbiIsIi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdC1zc2wnKTtcbnZhciBQb2xsaW5nID0gcmVxdWlyZSgnLi9wb2xsaW5nJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcteGhyJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBYSFI7XG5tb2R1bGUuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBFbXB0eSBmdW5jdGlvblxuICovXG5cbmZ1bmN0aW9uIGVtcHR5ICgpIHt9XG5cbi8qKlxuICogWEhSIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gWEhSIChvcHRzKSB7XG4gIFBvbGxpbmcuY2FsbCh0aGlzLCBvcHRzKTtcbiAgdGhpcy5yZXF1ZXN0VGltZW91dCA9IG9wdHMucmVxdWVzdFRpbWVvdXQ7XG4gIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG5cbiAgaWYgKGdsb2JhbC5sb2NhdGlvbikge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICB2YXIgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICB9XG5cbiAgICB0aGlzLnhkID0gb3B0cy5ob3N0bmFtZSAhPT0gZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lIHx8XG4gICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgdGhpcy54cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAqL1xuXG5pbmhlcml0KFhIUiwgUG9sbGluZyk7XG5cbi8qKlxuICogWEhSIHN1cHBvcnRzIGJpbmFyeVxuICovXG5cblhIUi5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBvcHRzLnVyaSA9IHRoaXMudXJpKCk7XG4gIG9wdHMueGQgPSB0aGlzLnhkO1xuICBvcHRzLnhzID0gdGhpcy54cztcbiAgb3B0cy5hZ2VudCA9IHRoaXMuYWdlbnQgfHwgZmFsc2U7XG4gIG9wdHMuc3VwcG9ydHNCaW5hcnkgPSB0aGlzLnN1cHBvcnRzQmluYXJ5O1xuICBvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBvcHRzLnJlcXVlc3RUaW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLmV4dHJhSGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuXG4gIHJldHVybiBuZXcgUmVxdWVzdChvcHRzKTtcbn07XG5cbi8qKlxuICogU2VuZHMgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgdmFyIGlzQmluYXJ5ID0gdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIGRhdGEgIT09IHVuZGVmaW5lZDtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ1BPU1QnLCBkYXRhOiBkYXRhLCBpc0JpbmFyeTogaXNCaW5hcnkgfSk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxLm9uKCdzdWNjZXNzJywgZm4pO1xuICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYub25FcnJvcigneGhyIHBvc3QgZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgdGhpcy5zZW5kWGhyID0gcmVxO1xufTtcblxuLyoqXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygneGhyIHBvbGwnKTtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgc2VsZi5vbkRhdGEoZGF0YSk7XG4gIH0pO1xuICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYub25FcnJvcigneGhyIHBvbGwgZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgdGhpcy5wb2xsWGhyID0gcmVxO1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdCAob3B0cykge1xuICB0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8ICdHRVQnO1xuICB0aGlzLnVyaSA9IG9wdHMudXJpO1xuICB0aGlzLnhkID0gISFvcHRzLnhkO1xuICB0aGlzLnhzID0gISFvcHRzLnhzO1xuICB0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7XG4gIHRoaXMuZGF0YSA9IHVuZGVmaW5lZCAhPT0gb3B0cy5kYXRhID8gb3B0cy5kYXRhIDogbnVsbDtcbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQ7XG4gIHRoaXMuaXNCaW5hcnkgPSBvcHRzLmlzQmluYXJ5O1xuICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gb3B0cy5zdXBwb3J0c0JpbmFyeTtcbiAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gIHRoaXMuY2EgPSBvcHRzLmNhO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICB0aGlzLmNyZWF0ZSgpO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgWEhSIG9iamVjdCBhbmQgc2VuZHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3B0cyA9IHsgYWdlbnQ6IHRoaXMuYWdlbnQsIHhkb21haW46IHRoaXMueGQsIHhzY2hlbWU6IHRoaXMueHMsIGVuYWJsZXNYRFI6IHRoaXMuZW5hYmxlc1hEUiB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICB2YXIgeGhyID0gdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0cnkge1xuICAgIGRlYnVnKCd4aHIgb3BlbiAlczogJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmkpO1xuICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrICYmIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMuZXh0cmFIZWFkZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKCdQT1NUJyA9PT0gdGhpcy5tZXRob2QpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmluYXJ5KSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJyovKicpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICBpZiAodGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgfVxuXG4gICAgLy8gaWU2IGNoZWNrXG4gICAgaWYgKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgIH07XG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjb250ZW50VHlwZSA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgICAgICAgICBpZiAoY29udGVudFR5cGUgIT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgICBpZiAoNCAhPT0geGhyLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgaWYgKDIwMCA9PT0geGhyLnN0YXR1cyB8fCAxMjIzID09PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbiAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnN0YXR1cyk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgZGVidWcoJ3hociBkYXRhICVzJywgdGhpcy5kYXRhKTtcbiAgICB4aHIuc2VuZCh0aGlzLmRhdGEpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZocm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgIC8vIGFuZCB0aHVzIHRoZSAnZXJyb3InIGV2ZW50IGNhbiBvbmx5IGJlIG9ubHkgYm91bmQgKmFmdGVyKiB0aGlzIGV4Y2VwdGlvblxuICAgIC8vIG9jY3Vycy4gIFRoZXJlZm9yZSwgYWxzbywgd2UgY2Fubm90IHRocm93IGhlcmUgYXQgYWxsLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vbkVycm9yKGUpO1xuICAgIH0sIDApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnc3VjY2VzcycpO1xuICB0aGlzLmNsZWFudXAoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbiAgdGhpcy5vblN1Y2Nlc3MoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMuY2xlYW51cCh0cnVlKTtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGhvdXNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoZnJvbUVycm9yKSB7XG4gIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHRoaXMueGhyIHx8IG51bGwgPT09IHRoaXMueGhyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHhtbGh0dHByZXF1ZXN0XG4gIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICB9IGVsc2Uge1xuICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICB9XG5cbiAgaWYgKGZyb21FcnJvcikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gIH1cblxuICB0aGlzLnhociA9IG51bGw7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGxvYWQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZGF0YTtcbiAgdHJ5IHtcbiAgICB2YXIgY29udGVudFR5cGU7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRlbnRUeXBlID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgaWYgKGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJykge1xuICAgICAgaWYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ2FycmF5YnVmZmVyJykge1xuICAgICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2UgfHwgdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLm9uRXJyb3IoZSk7XG4gIH1cbiAgaWYgKG51bGwgIT0gZGF0YSkge1xuICAgIHRoaXMub25EYXRhKGRhdGEpO1xuICB9XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGl0IGhhcyBYRG9tYWluUmVxdWVzdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5oYXNYRFIgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiAhdGhpcy54cyAmJiB0aGlzLmVuYWJsZXNYRFI7XG59O1xuXG4vKipcbiAqIEFib3J0cyB0aGUgcmVxdWVzdC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsZWFudXAoKTtcbn07XG5cbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuXG5SZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1xuUmVxdWVzdC5yZXF1ZXN0cyA9IHt9O1xuXG5pZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gIGlmIChnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29udW5sb2FkJywgdW5sb2FkSGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgdW5sb2FkSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVubG9hZEhhbmRsZXIgKCkge1xuICBmb3IgKHZhciBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICBpZiAoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgUmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO1xuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciB5ZWFzdCA9IHJlcXVpcmUoJ3llYXN0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvbGxpbmc7XG5cbi8qKlxuICogSXMgWEhSMiBzdXBwb3J0ZWQ/XG4gKi9cblxudmFyIGhhc1hIUjIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdC1zc2wnKTtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCh7IHhkb21haW46IGZhbHNlIH0pO1xuICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcblxuLyoqXG4gKiBQb2xsaW5nIGludGVyZmFjZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUG9sbGluZyAob3B0cykge1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKCFoYXNYSFIyIHx8IGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovXG5cbmluaGVyaXQoUG9sbGluZywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ3BvbGxpbmcnO1xuXG4vKipcbiAqIE9wZW5zIHRoZSBzb2NrZXQgKHRyaWdnZXJzIHBvbGxpbmcpLiBXZSB3cml0ZSBhIFBJTkcgbWVzc2FnZSB0byBkZXRlcm1pbmVcbiAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wb2xsKCk7XG59O1xuXG4vKipcbiAqIFBhdXNlcyBwb2xsaW5nLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAob25QYXVzZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ3BhdXNpbmcnO1xuXG4gIGZ1bmN0aW9uIHBhdXNlICgpIHtcbiAgICBkZWJ1ZygncGF1c2VkJyk7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gJ3BhdXNlZCc7XG4gICAgb25QYXVzZSgpO1xuICB9XG5cbiAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICBpZiAodGhpcy5wb2xsaW5nKSB7XG4gICAgICBkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSBwb2xsaW5nIC0gd2FpdGluZyB0byBwYXVzZScpO1xuICAgICAgdG90YWwrKztcbiAgICAgIHRoaXMub25jZSgncG9sbENvbXBsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHBvbGxpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndyaXRhYmxlKSB7XG4gICAgICBkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSB3cml0aW5nIC0gd2FpdGluZyB0byBwYXVzZScpO1xuICAgICAgdG90YWwrKztcbiAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlYnVnKCdwcmUtcGF1c2Ugd3JpdGluZyBjb21wbGV0ZScpO1xuICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGF1c2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdwb2xsaW5nJyk7XG4gIHRoaXMucG9sbGluZyA9IHRydWU7XG4gIHRoaXMuZG9Qb2xsKCk7XG4gIHRoaXMuZW1pdCgncG9sbCcpO1xufTtcblxuLyoqXG4gKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGRlYnVnKCdwb2xsaW5nIGdvdCBkYXRhICVzJywgZGF0YSk7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIChwYWNrZXQsIGluZGV4LCB0b3RhbCkge1xuICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICBpZiAoJ29wZW5pbmcnID09PSBzZWxmLnJlYWR5U3RhdGUpIHtcbiAgICAgIHNlbGYub25PcGVuKCk7XG4gICAgfVxuXG4gICAgLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuICAgIGlmICgnY2xvc2UnID09PSBwYWNrZXQudHlwZSkge1xuICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgIHNlbGYub25QYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvLyBkZWNvZGUgcGF5bG9hZFxuICBwYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlLCBjYWxsYmFjayk7XG5cbiAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgaWYgKCdjbG9zZWQnICE9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgncG9sbENvbXBsZXRlJyk7XG5cbiAgICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgIHRoaXMucG9sbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygnaWdub3JpbmcgcG9sbCAtIHRyYW5zcG9ydCBzdGF0ZSBcIiVzXCInLCB0aGlzLnJlYWR5U3RhdGUpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBGb3IgcG9sbGluZywgc2VuZCBhIGNsb3NlIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgIGRlYnVnKCd3cml0aW5nIGNsb3NlIHBhY2tldCcpO1xuICAgIHNlbGYud3JpdGUoW3sgdHlwZTogJ2Nsb3NlJyB9XSk7XG4gIH1cblxuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICBkZWJ1ZygndHJhbnNwb3J0IG9wZW4gLSBjbG9zaW5nJyk7XG4gICAgY2xvc2UoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpbiBjYXNlIHdlJ3JlIHRyeWluZyB0byBjbG9zZSB3aGlsZVxuICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgZGVidWcoJ3RyYW5zcG9ydCBub3Qgb3BlbiAtIGRlZmVycmluZyBjbG9zZScpO1xuICAgIHRoaXMub25jZSgnb3BlbicsIGNsb3NlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgdmFyIGNhbGxiYWNrZm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgc2VsZi5lbWl0KCdkcmFpbicpO1xuICB9O1xuXG4gIHBhcnNlci5lbmNvZGVQYXlsb2FkKHBhY2tldHMsIHRoaXMuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgc2VsZi5kb1dyaXRlKGRhdGEsIGNhbGxiYWNrZm4pO1xuICB9KTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gIHZhciBwb3J0ID0gJyc7XG5cbiAgLy8gY2FjaGUgYnVzdGluZyBpcyBmb3JjZWRcbiAgaWYgKGZhbHNlICE9PSB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgcXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICB9XG5cbiAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpIHtcbiAgICBxdWVyeS5iNjQgPSAxO1xuICB9XG5cbiAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbiAgaWYgKHRoaXMucG9ydCAmJiAoKCdodHRwcycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAoJ2h0dHAnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDgwKSkpIHtcbiAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICB9XG5cbiAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHJldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2ID8gJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyA6IHRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi4vdHJhbnNwb3J0Jyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG52YXIgeWVhc3QgPSByZXF1aXJlKCd5ZWFzdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDp3ZWJzb2NrZXQnKTtcbnZhciBCcm93c2VyV2ViU29ja2V0ID0gZ2xvYmFsLldlYlNvY2tldCB8fCBnbG9iYWwuTW96V2ViU29ja2V0O1xudmFyIE5vZGVXZWJTb2NrZXQ7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgdHJ5IHtcbiAgICBOb2RlV2ViU29ja2V0ID0gcmVxdWlyZSgnd3MnKTtcbiAgfSBjYXRjaCAoZSkgeyB9XG59XG5cbi8qKlxuICogR2V0IGVpdGhlciB0aGUgYFdlYlNvY2tldGAgb3IgYE1veldlYlNvY2tldGAgZ2xvYmFsc1xuICogaW4gdGhlIGJyb3dzZXIgb3IgdHJ5IHRvIHJlc29sdmUgV2ViU29ja2V0LWNvbXBhdGlibGVcbiAqIGludGVyZmFjZSBleHBvc2VkIGJ5IGB3c2AgZm9yIE5vZGUtbGlrZSBlbnZpcm9ubWVudC5cbiAqL1xuXG52YXIgV2ViU29ja2V0ID0gQnJvd3NlcldlYlNvY2tldDtcbmlmICghV2ViU29ja2V0ICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIFdlYlNvY2tldCA9IE5vZGVXZWJTb2NrZXQ7XG59XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBXUztcblxuLyoqXG4gKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkge09iamVjdH0gY29ubmVjdGlvbiBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFdTIChvcHRzKSB7XG4gIHZhciBmb3JjZUJhc2U2NCA9IChvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQpO1xuICBpZiAoZm9yY2VCYXNlNjQpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cbiAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IG9wdHMucGVyTWVzc2FnZURlZmxhdGU7XG4gIHRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0ID0gQnJvd3NlcldlYlNvY2tldCAmJiAhb3B0cy5mb3JjZU5vZGU7XG4gIHRoaXMucHJvdG9jb2xzID0gb3B0cy5wcm90b2NvbHM7XG4gIGlmICghdGhpcy51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICBXZWJTb2NrZXQgPSBOb2RlV2ViU29ja2V0O1xuICB9XG4gIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovXG5cbmluaGVyaXQoV1MsIFRyYW5zcG9ydCk7XG5cbi8qKlxuICogVHJhbnNwb3J0IG5hbWUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xuXG4vKlxuICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxuICovXG5cbldTLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogT3BlbnMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5jaGVjaygpKSB7XG4gICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdXJpID0gdGhpcy51cmkoKTtcbiAgdmFyIHByb3RvY29scyA9IHRoaXMucHJvdG9jb2xzO1xuICB2YXIgb3B0cyA9IHtcbiAgICBhZ2VudDogdGhpcy5hZ2VudCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZVxuICB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgb3B0cy5oZWFkZXJzID0gdGhpcy5leHRyYUhlYWRlcnM7XG4gIH1cbiAgaWYgKHRoaXMubG9jYWxBZGRyZXNzKSB7XG4gICAgb3B0cy5sb2NhbEFkZHJlc3MgPSB0aGlzLmxvY2FsQWRkcmVzcztcbiAgfVxuXG4gIHRyeSB7XG4gICAgdGhpcy53cyA9IHRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0ID8gKHByb3RvY29scyA/IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpIDogbmV3IFdlYlNvY2tldCh1cmkpKSA6IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBpZiAodGhpcy53cy5iaW5hcnlUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cblxuICBpZiAodGhpcy53cy5zdXBwb3J0cyAmJiB0aGlzLndzLnN1cHBvcnRzLmJpbmFyeSkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9ICdub2RlYnVmZmVyJztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICB9XG5cbiAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xufTtcblxuLyoqXG4gKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbk9wZW4oKTtcbiAgfTtcbiAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25DbG9zZSgpO1xuICB9O1xuICB0aGlzLndzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldikge1xuICAgIHNlbGYub25EYXRhKGV2LmRhdGEpO1xuICB9O1xuICB0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub25FcnJvcignd2Vic29ja2V0IGVycm9yJywgZSk7XG4gIH07XG59O1xuXG4vKipcbiAqIFdyaXRlcyBkYXRhIHRvIHNvY2tldC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbiAgLy8gbm8gbmVlZCBmb3IgZW5jb2RlUGF5bG9hZFxuICB2YXIgdG90YWwgPSBwYWNrZXRzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b3RhbDsgaSA8IGw7IGkrKykge1xuICAgIChmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICBwYXJzZXIuZW5jb2RlUGFja2V0KHBhY2tldCwgc2VsZi5zdXBwb3J0c0JpbmFyeSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKCFzZWxmLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgIC8vIGFsd2F5cyBjcmVhdGUgYSBuZXcgb2JqZWN0IChHSC00MzcpXG4gICAgICAgICAgdmFyIG9wdHMgPSB7fTtcbiAgICAgICAgICBpZiAocGFja2V0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBwYWNrZXQub3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICAgICAgdmFyIGxlbiA9ICdzdHJpbmcnID09PSB0eXBlb2YgZGF0YSA/IGdsb2JhbC5CdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbiA8IHNlbGYucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzZWxmLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEsIG9wdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnKCd3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAtLXRvdGFsIHx8IGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pKHBhY2tldHNbaV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgc2VsZi5lbWl0KCdmbHVzaCcpO1xuXG4gICAgLy8gZmFrZSBkcmFpblxuICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgICAgc2VsZi5lbWl0KCdkcmFpbicpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy53cy5jbG9zZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgdmFyIHNjaGVtYSA9IHRoaXMuc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnd3NzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgKCd3cycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICBpZiAodGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgfVxuXG4gIC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICBxdWVyeS5iNjQgPSAxO1xuICB9XG5cbiAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHJldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2ID8gJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyA6IHRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIVdlYlNvY2tldCAmJiAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKTtcbn07XG4iLCIvLyBicm93c2VyIHNoaW0gZm9yIHhtbGh0dHByZXF1ZXN0IG1vZHVsZVxuXG52YXIgaGFzQ09SUyA9IHJlcXVpcmUoJ2hhcy1jb3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgdmFyIHhkb21haW4gPSBvcHRzLnhkb21haW47XG5cbiAgLy8gc2NoZW1lIG11c3QgYmUgc2FtZSB3aGVuIHVzaWduIFhEb21haW5SZXF1ZXN0XG4gIC8vIGh0dHA6Ly9ibG9ncy5tc2RuLmNvbS9iL2llaW50ZXJuYWxzL2FyY2hpdmUvMjAxMC8wNS8xMy94ZG9tYWlucmVxdWVzdC1yZXN0cmljdGlvbnMtbGltaXRhdGlvbnMtYW5kLXdvcmthcm91bmRzLmFzcHhcbiAgdmFyIHhzY2hlbWUgPSBvcHRzLnhzY2hlbWU7XG5cbiAgLy8gWERvbWFpblJlcXVlc3QgaGFzIGEgZmxvdyBvZiBub3Qgc2VuZGluZyBjb29raWUsIHRoZXJlZm9yZSBpdCBzaG91bGQgYmUgZGlzYWJsZWQgYXMgYSBkZWZhdWx0LlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9lbmdpbmUuaW8tY2xpZW50L3B1bGwvMjE3XG4gIHZhciBlbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gIC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxuICB0cnkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgLy8gVXNlIFhEb21haW5SZXF1ZXN0IGZvciBJRTggaWYgZW5hYmxlc1hEUiBpcyB0cnVlXG4gIC8vIGJlY2F1c2UgbG9hZGluZyBiYXIga2VlcHMgZmxhc2hpbmcgd2hlbiB1c2luZyBqc29ucC1wb2xsaW5nXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95dWppb3Nha2Evc29ja2UuaW8taWU4LWxvYWRpbmctZXhhbXBsZVxuICB0cnkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF4c2NoZW1lICYmIGVuYWJsZXNYRFIpIHtcbiAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIGlmICgheGRvbWFpbikge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IGdsb2JhbFtbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpXSgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxufTtcbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJyMwMDAwQ0MnLCAnIzAwMDBGRicsICcjMDAzM0NDJywgJyMwMDMzRkYnLCAnIzAwNjZDQycsICcjMDA2NkZGJywgJyMwMDk5Q0MnLFxuICAnIzAwOTlGRicsICcjMDBDQzAwJywgJyMwMENDMzMnLCAnIzAwQ0M2NicsICcjMDBDQzk5JywgJyMwMENDQ0MnLCAnIzAwQ0NGRicsXG4gICcjMzMwMENDJywgJyMzMzAwRkYnLCAnIzMzMzNDQycsICcjMzMzM0ZGJywgJyMzMzY2Q0MnLCAnIzMzNjZGRicsICcjMzM5OUNDJyxcbiAgJyMzMzk5RkYnLCAnIzMzQ0MwMCcsICcjMzNDQzMzJywgJyMzM0NDNjYnLCAnIzMzQ0M5OScsICcjMzNDQ0NDJywgJyMzM0NDRkYnLFxuICAnIzY2MDBDQycsICcjNjYwMEZGJywgJyM2NjMzQ0MnLCAnIzY2MzNGRicsICcjNjZDQzAwJywgJyM2NkNDMzMnLCAnIzk5MDBDQycsXG4gICcjOTkwMEZGJywgJyM5OTMzQ0MnLCAnIzk5MzNGRicsICcjOTlDQzAwJywgJyM5OUNDMzMnLCAnI0NDMDAwMCcsICcjQ0MwMDMzJyxcbiAgJyNDQzAwNjYnLCAnI0NDMDA5OScsICcjQ0MwMENDJywgJyNDQzAwRkYnLCAnI0NDMzMwMCcsICcjQ0MzMzMzJywgJyNDQzMzNjYnLFxuICAnI0NDMzM5OScsICcjQ0MzM0NDJywgJyNDQzMzRkYnLCAnI0NDNjYwMCcsICcjQ0M2NjMzJywgJyNDQzk5MDAnLCAnI0NDOTkzMycsXG4gICcjQ0NDQzAwJywgJyNDQ0NDMzMnLCAnI0ZGMDAwMCcsICcjRkYwMDMzJywgJyNGRjAwNjYnLCAnI0ZGMDA5OScsICcjRkYwMENDJyxcbiAgJyNGRjAwRkYnLCAnI0ZGMzMwMCcsICcjRkYzMzMzJywgJyNGRjMzNjYnLCAnI0ZGMzM5OScsICcjRkYzM0NDJywgJyNGRjMzRkYnLFxuICAnI0ZGNjYwMCcsICcjRkY2NjMzJywgJyNGRjk5MDAnLCAnI0ZGOTkzMycsICcjRkZDQzAwJywgJyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBBY3RpdmUgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VzID0gW107XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIHZhciBwcmV2VGltZTtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcbiAgZGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgZXhwb3J0cy5pbnN0YW5jZXMucHVzaChkZWJ1Zyk7XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG5mdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgdmFyIGluZGV4ID0gZXhwb3J0cy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGV4cG9ydHMuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIGk7XG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleHBvcnRzLmluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbnN0YW5jZSA9IGV4cG9ydHMuaW5zdGFuY2VzW2ldO1xuICAgIGluc3RhbmNlLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQoaW5zdGFuY2UubmFtZXNwYWNlKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcbnZhciBoYXNCaW5hcnkgPSByZXF1aXJlKCdoYXMtYmluYXJ5MicpO1xudmFyIHNsaWNlQnVmZmVyID0gcmVxdWlyZSgnYXJyYXlidWZmZXIuc2xpY2UnKTtcbnZhciBhZnRlciA9IHJlcXVpcmUoJ2FmdGVyJyk7XG52YXIgdXRmOCA9IHJlcXVpcmUoJy4vdXRmOCcpO1xuXG52YXIgYmFzZTY0ZW5jb2RlcjtcbmlmIChnbG9iYWwgJiYgZ2xvYmFsLkFycmF5QnVmZmVyKSB7XG4gIGJhc2U2NGVuY29kZXIgPSByZXF1aXJlKCdiYXNlNjQtYXJyYXlidWZmZXInKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBhbiBhbmRyb2lkIGJyb3dzZXIuIFRoYXQgcmVxdWlyZXMgdXMgdG8gdXNlXG4gKiBBcnJheUJ1ZmZlciB3aXRoIHBvbGxpbmcgdHJhbnNwb3J0cy4uLlxuICpcbiAqIGh0dHA6Ly9naGluZGEubmV0L2pwZWctYmxvYi1hamF4LWFuZHJvaWQvXG4gKi9cblxudmFyIGlzQW5kcm9pZCA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9BbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBpbiBQaGFudG9tSlMuXG4gKiBVcGxvYWRpbmcgYSBCbG9iIHdpdGggUGhhbnRvbUpTIGRvZXMgbm90IHdvcmsgY29ycmVjdGx5LCBhcyByZXBvcnRlZCBoZXJlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTEzOTVcbiAqIEB0eXBlIGJvb2xlYW5cbiAqL1xudmFyIGlzUGhhbnRvbUpTID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL1BoYW50b21KUy9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogV2hlbiB0cnVlLCBhdm9pZHMgdXNpbmcgQmxvYnMgdG8gZW5jb2RlIHBheWxvYWRzLlxuICogQHR5cGUgYm9vbGVhblxuICovXG52YXIgZG9udFNlbmRCbG9icyA9IGlzQW5kcm9pZCB8fCBpc1BoYW50b21KUztcblxuLyoqXG4gKiBDdXJyZW50IHByb3RvY29sIHZlcnNpb24uXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IDM7XG5cbi8qKlxuICogUGFja2V0IHR5cGVzLlxuICovXG5cbnZhciBwYWNrZXRzID0gZXhwb3J0cy5wYWNrZXRzID0ge1xuICAgIG9wZW46ICAgICAwICAgIC8vIG5vbi13c1xuICAsIGNsb3NlOiAgICAxICAgIC8vIG5vbi13c1xuICAsIHBpbmc6ICAgICAyXG4gICwgcG9uZzogICAgIDNcbiAgLCBtZXNzYWdlOiAgNFxuICAsIHVwZ3JhZGU6ICA1XG4gICwgbm9vcDogICAgIDZcbn07XG5cbnZhciBwYWNrZXRzbGlzdCA9IGtleXMocGFja2V0cyk7XG5cbi8qKlxuICogUHJlbWFkZSBlcnJvciBwYWNrZXQuXG4gKi9cblxudmFyIGVyciA9IHsgdHlwZTogJ2Vycm9yJywgZGF0YTogJ3BhcnNlciBlcnJvcicgfTtcblxuLyoqXG4gKiBDcmVhdGUgYSBibG9iIGFwaSBldmVuIGZvciBibG9iIGJ1aWxkZXIgd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcbiAqL1xuXG52YXIgQmxvYiA9IHJlcXVpcmUoJ2Jsb2InKTtcblxuLyoqXG4gKiBFbmNvZGVzIGEgcGFja2V0LlxuICpcbiAqICAgICA8cGFja2V0IHR5cGUgaWQ+IFsgPGRhdGE+IF1cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICA1aGVsbG8gd29ybGRcbiAqICAgICAzXG4gKiAgICAgNFxuICpcbiAqIEJpbmFyeSBpcyBlbmNvZGVkIGluIGFuIGlkZW50aWNhbCBwcmluY2lwbGVcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCB1dGY4ZW5jb2RlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQmluYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICBzdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB1dGY4ZW5jb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSB1dGY4ZW5jb2RlO1xuICAgIHV0ZjhlbmNvZGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIGRhdGEgPSAocGFja2V0LmRhdGEgPT09IHVuZGVmaW5lZClcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogcGFja2V0LmRhdGEuYnVmZmVyIHx8IHBhY2tldC5kYXRhO1xuXG4gIGlmIChnbG9iYWwuQXJyYXlCdWZmZXIgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmIChCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYikge1xuICAgIHJldHVybiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICBpZiAoZGF0YSAmJiBkYXRhLmJhc2U2NCkge1xuICAgIHJldHVybiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgYXMgYSB1dGYtOCBzdHJpbmdcbiAgdmFyIGVuY29kZWQgPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcblxuICAvLyBkYXRhIGZyYWdtZW50IGlzIG9wdGlvbmFsXG4gIGlmICh1bmRlZmluZWQgIT09IHBhY2tldC5kYXRhKSB7XG4gICAgZW5jb2RlZCArPSB1dGY4ZW5jb2RlID8gdXRmOC5lbmNvZGUoU3RyaW5nKHBhY2tldC5kYXRhKSwgeyBzdHJpY3Q6IGZhbHNlIH0pIDogU3RyaW5nKHBhY2tldC5kYXRhKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsYmFjaygnJyArIGVuY29kZWQpO1xuXG59O1xuXG5mdW5jdGlvbiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjaykge1xuICAvLyBwYWNrZXQgZGF0YSBpcyBhbiBvYmplY3QgeyBiYXNlNjQ6IHRydWUsIGRhdGE6IGRhdGFBc0Jhc2U2NFN0cmluZyB9XG4gIHZhciBtZXNzYWdlID0gJ2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXSArIHBhY2tldC5kYXRhLmRhdGE7XG4gIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbn1cblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGhlbHBlcnMgZm9yIGJpbmFyeSB0eXBlc1xuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgZGF0YSA9IHBhY2tldC5kYXRhO1xuICB2YXIgY29udGVudEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gIHZhciByZXN1bHRCdWZmZXIgPSBuZXcgVWludDhBcnJheSgxICsgZGF0YS5ieXRlTGVuZ3RoKTtcblxuICByZXN1bHRCdWZmZXJbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHRCdWZmZXJbaSsxXSA9IGNvbnRlbnRBcnJheVtpXTtcbiAgfVxuXG4gIHJldHVybiBjYWxsYmFjayhyZXN1bHRCdWZmZXIuYnVmZmVyKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHBhY2tldC5kYXRhID0gZnIucmVzdWx0O1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHRydWUsIGNhbGxiYWNrKTtcbiAgfTtcbiAgcmV0dXJuIGZyLnJlYWRBc0FycmF5QnVmZmVyKHBhY2tldC5kYXRhKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKGRvbnRTZW5kQmxvYnMpIHtcbiAgICByZXR1cm4gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IG5ldyBVaW50OEFycmF5KDEpO1xuICBsZW5ndGhbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgdmFyIGJsb2IgPSBuZXcgQmxvYihbbGVuZ3RoLmJ1ZmZlciwgcGFja2V0LmRhdGFdKTtcblxuICByZXR1cm4gY2FsbGJhY2soYmxvYik7XG59XG5cbi8qKlxuICogRW5jb2RlcyBhIHBhY2tldCB3aXRoIGJpbmFyeSBkYXRhIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQsIGhhcyBgdHlwZWAgYW5kIGBkYXRhYFxuICogQHJldHVybiB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsIGNhbGxiYWNrKSB7XG4gIHZhciBtZXNzYWdlID0gJ2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgaWYgKEJsb2IgJiYgcGFja2V0LmRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYikge1xuICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZnIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYjY0ID0gZnIucmVzdWx0LnNwbGl0KCcsJylbMV07XG4gICAgICBjYWxsYmFjayhtZXNzYWdlICsgYjY0KTtcbiAgICB9O1xuICAgIHJldHVybiBmci5yZWFkQXNEYXRhVVJMKHBhY2tldC5kYXRhKTtcbiAgfVxuXG4gIHZhciBiNjRkYXRhO1xuICB0cnkge1xuICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB3aXRoIHR5cGVkIGFycmF5c1xuICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKTtcbiAgICB2YXIgYmFzaWMgPSBuZXcgQXJyYXkodHlwZWQubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBiYXNpY1tpXSA9IHR5cGVkW2ldO1xuICAgIH1cbiAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBiYXNpYyk7XG4gIH1cbiAgbWVzc2FnZSArPSBnbG9iYWwuYnRvYShiNjRkYXRhKTtcbiAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xufTtcblxuLyoqXG4gKiBEZWNvZGVzIGEgcGFja2V0LiBDaGFuZ2VzIGZvcm1hdCB0byBCbG9iIGlmIHJlcXVlc3RlZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZGVjb2RlUGFja2V0ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIHV0ZjhkZWNvZGUpIHtcbiAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbiAgLy8gU3RyaW5nIGRhdGFcbiAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgIGlmIChkYXRhLmNoYXJBdCgwKSA9PT0gJ2InKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQoZGF0YS5zdWJzdHIoMSksIGJpbmFyeVR5cGUpO1xuICAgIH1cblxuICAgIGlmICh1dGY4ZGVjb2RlKSB7XG4gICAgICBkYXRhID0gdHJ5RGVjb2RlKGRhdGEpO1xuICAgICAgaWYgKGRhdGEgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciB0eXBlID0gZGF0YS5jaGFyQXQoMCk7XG5cbiAgICBpZiAoTnVtYmVyKHR5cGUpICE9IHR5cGUgfHwgIXBhY2tldHNsaXN0W3R5cGVdKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cblxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiBkYXRhLnN1YnN0cmluZygxKSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBhc0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gIHZhciB0eXBlID0gYXNBcnJheVswXTtcbiAgdmFyIHJlc3QgPSBzbGljZUJ1ZmZlcihkYXRhLCAxKTtcbiAgaWYgKEJsb2IgJiYgYmluYXJ5VHlwZSA9PT0gJ2Jsb2InKSB7XG4gICAgcmVzdCA9IG5ldyBCbG9iKFtyZXN0XSk7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IHJlc3QgfTtcbn07XG5cbmZ1bmN0aW9uIHRyeURlY29kZShkYXRhKSB7XG4gIHRyeSB7XG4gICAgZGF0YSA9IHV0ZjguZGVjb2RlKGRhdGEsIHsgc3RyaWN0OiBmYWxzZSB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBEZWNvZGVzIGEgcGFja2V0IGVuY29kZWQgaW4gYSBiYXNlNjQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxuICovXG5cbmV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24obXNnLCBiaW5hcnlUeXBlKSB7XG4gIHZhciB0eXBlID0gcGFja2V0c2xpc3RbbXNnLmNoYXJBdCgwKV07XG4gIGlmICghYmFzZTY0ZW5jb2Rlcikge1xuICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBtc2cuc3Vic3RyKDEpIH0gfTtcbiAgfVxuXG4gIHZhciBkYXRhID0gYmFzZTY0ZW5jb2Rlci5kZWNvZGUobXNnLnN1YnN0cigxKSk7XG5cbiAgaWYgKGJpbmFyeVR5cGUgPT09ICdibG9iJyAmJiBCbG9iKSB7XG4gICAgZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gIH1cblxuICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiBkYXRhIH07XG59O1xuXG4vKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxuICpcbiAqICAgICA8bGVuZ3RoPjpkYXRhXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgMTE6aGVsbG8gd29ybGQyOmhpXG4gKlxuICogSWYgYW55IGNvbnRlbnRzIGFyZSBiaW5hcnksIHRoZXkgd2lsbCBiZSBlbmNvZGVkIGFzIGJhc2U2NCBzdHJpbmdzLiBCYXNlNjRcbiAqIGVuY29kZWQgc3RyaW5ncyBhcmUgbWFya2VkIHdpdGggYSBiIGJlZm9yZSB0aGUgbGVuZ3RoIHNwZWNpZmllclxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChwYWNrZXRzLCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgc3VwcG9ydHNCaW5hcnkgPSBudWxsO1xuICB9XG5cbiAgdmFyIGlzQmluYXJ5ID0gaGFzQmluYXJ5KHBhY2tldHMpO1xuXG4gIGlmIChzdXBwb3J0c0JpbmFyeSAmJiBpc0JpbmFyeSkge1xuICAgIGlmIChCbG9iICYmICFkb250U2VuZEJsb2JzKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlcihwYWNrZXRzLCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKCcwOicpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5sZW5ndGggKyAnOicgKyBtZXNzYWdlO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCAhaXNCaW5hcnkgPyBmYWxzZSA6IHN1cHBvcnRzQmluYXJ5LCBmYWxzZSwgZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSk7XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0cy5qb2luKCcnKSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBBc3luYyBhcnJheSBtYXAgdXNpbmcgYWZ0ZXJcbiAqL1xuXG5mdW5jdGlvbiBtYXAoYXJ5LCBlYWNoLCBkb25lKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoYXJ5Lmxlbmd0aCk7XG4gIHZhciBuZXh0ID0gYWZ0ZXIoYXJ5Lmxlbmd0aCwgZG9uZSk7XG5cbiAgdmFyIGVhY2hXaXRoSW5kZXggPSBmdW5jdGlvbihpLCBlbCwgY2IpIHtcbiAgICBlYWNoKGVsLCBmdW5jdGlvbihlcnJvciwgbXNnKSB7XG4gICAgICByZXN1bHRbaV0gPSBtc2c7XG4gICAgICBjYihlcnJvciwgcmVzdWx0KTtcbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgIGVhY2hXaXRoSW5kZXgoaSwgYXJ5W2ldLCBuZXh0KTtcbiAgfVxufVxuXG4vKlxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBQb3NzaWJsZSBiaW5hcnkgY29udGVudHMgYXJlXG4gKiBkZWNvZGVkIGZyb20gdGhlaXIgYmFzZTY0IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBheWxvYWQgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeShkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gIH1cblxuICB2YXIgcGFja2V0O1xuICBpZiAoZGF0YSA9PT0gJycpIHtcbiAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gJycsIG4sIG1zZztcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGNociA9IGRhdGEuY2hhckF0KGkpO1xuXG4gICAgaWYgKGNociAhPT0gJzonKSB7XG4gICAgICBsZW5ndGggKz0gY2hyO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA9PT0gJycgfHwgKGxlbmd0aCAhPSAobiA9IE51bWJlcihsZW5ndGgpKSkpIHtcbiAgICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgIH1cblxuICAgIG1zZyA9IGRhdGEuc3Vic3RyKGkgKyAxLCBuKTtcblxuICAgIGlmIChsZW5ndGggIT0gbXNnLmxlbmd0aCkge1xuICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgfVxuXG4gICAgaWYgKG1zZy5sZW5ndGgpIHtcbiAgICAgIHBhY2tldCA9IGV4cG9ydHMuZGVjb2RlUGFja2V0KG1zZywgYmluYXJ5VHlwZSwgZmFsc2UpO1xuXG4gICAgICBpZiAoZXJyLnR5cGUgPT09IHBhY2tldC50eXBlICYmIGVyci5kYXRhID09PSBwYWNrZXQuZGF0YSkge1xuICAgICAgICAvLyBwYXJzZXIgZXJyb3IgaW4gaW5kaXZpZHVhbCBwYWNrZXQgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmV0ID0gY2FsbGJhY2socGFja2V0LCBpICsgbiwgbCk7XG4gICAgICBpZiAoZmFsc2UgPT09IHJldCkgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGFkdmFuY2UgY3Vyc29yXG4gICAgaSArPSBuO1xuICAgIGxlbmd0aCA9ICcnO1xuICB9XG5cbiAgaWYgKGxlbmd0aCAhPT0gJycpIHtcbiAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKSBhcyBiaW5hcnkuXG4gKlxuICogPDEgPSBiaW5hcnksIDAgPSBzdHJpbmc+PG51bWJlciBmcm9tIDAtOT48bnVtYmVyIGZyb20gMC05PlsuLi5dPG51bWJlclxuICogMjU1PjxkYXRhPlxuICpcbiAqIEV4YW1wbGU6XG4gKiAxIDMgMjU1IDEgMiAzLCBpZiB0aGUgYmluYXJ5IGNvbnRlbnRzIGFyZSBpbnRlcnByZXRlZCBhcyA4IGJpdCBpbnRlZ2Vyc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEByZXR1cm4ge0FycmF5QnVmZmVyfSBlbmNvZGVkIHBheWxvYWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbihwYWNrZXRzLCBjYWxsYmFjaykge1xuICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBBcnJheUJ1ZmZlcigwKSk7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiBkb25lQ2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIGVuY29kZWRQYWNrZXRzKSB7XG4gICAgdmFyIHRvdGFsTGVuZ3RoID0gZW5jb2RlZFBhY2tldHMucmVkdWNlKGZ1bmN0aW9uKGFjYywgcCkge1xuICAgICAgdmFyIGxlbjtcbiAgICAgIGlmICh0eXBlb2YgcCA9PT0gJ3N0cmluZycpe1xuICAgICAgICBsZW4gPSBwLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlbiA9IHAuYnl0ZUxlbmd0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY2MgKyBsZW4udG9TdHJpbmcoKS5sZW5ndGggKyBsZW4gKyAyOyAvLyBzdHJpbmcvYmluYXJ5IGlkZW50aWZpZXIgKyBzZXBhcmF0b3IgPSAyXG4gICAgfSwgMCk7XG5cbiAgICB2YXIgcmVzdWx0QXJyYXkgPSBuZXcgVWludDhBcnJheSh0b3RhbExlbmd0aCk7XG5cbiAgICB2YXIgYnVmZmVySW5kZXggPSAwO1xuICAgIGVuY29kZWRQYWNrZXRzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHAgPT09ICdzdHJpbmcnO1xuICAgICAgdmFyIGFiID0gcDtcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KHAubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmlld1tpXSA9IHAuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBhYiA9IHZpZXcuYnVmZmVyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTdHJpbmcpIHsgLy8gbm90IHRydWUgYmluYXJ5XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMDtcbiAgICAgIH0gZWxzZSB7IC8vIHRydWUgYmluYXJ5XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlblN0ciA9IGFiLmJ5dGVMZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gcGFyc2VJbnQobGVuU3RyW2ldKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMjU1O1xuXG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHZpZXdbaV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0QXJyYXkuYnVmZmVyKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEVuY29kZSBhcyBCbG9iXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iID0gZnVuY3Rpb24ocGFja2V0cywgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbihlbmNvZGVkKSB7XG4gICAgICB2YXIgYmluYXJ5SWRlbnRpZmllciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDE7XG4gICAgICBpZiAodHlwZW9mIGVuY29kZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZW5jb2RlZC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2aWV3W2ldID0gZW5jb2RlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGVuY29kZWQgPSB2aWV3LmJ1ZmZlcjtcbiAgICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW4gPSAoZW5jb2RlZCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKVxuICAgICAgICA/IGVuY29kZWQuYnl0ZUxlbmd0aFxuICAgICAgICA6IGVuY29kZWQuc2l6ZTtcblxuICAgICAgdmFyIGxlblN0ciA9IGxlbi50b1N0cmluZygpO1xuICAgICAgdmFyIGxlbmd0aEFyeSA9IG5ldyBVaW50OEFycmF5KGxlblN0ci5sZW5ndGggKyAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxlbmd0aEFyeVtpXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICB9XG4gICAgICBsZW5ndGhBcnlbbGVuU3RyLmxlbmd0aF0gPSAyNTU7XG5cbiAgICAgIGlmIChCbG9iKSB7XG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2JpbmFyeUlkZW50aWZpZXIuYnVmZmVyLCBsZW5ndGhBcnkuYnVmZmVyLCBlbmNvZGVkXSk7XG4gICAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBibG9iKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgIHJldHVybiBjYWxsYmFjayhuZXcgQmxvYihyZXN1bHRzKSk7XG4gIH0pO1xufTtcblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gU3RyaW5ncyBhcmUgZGVjb2RlZCBieVxuICogaW50ZXJwcmV0aW5nIGVhY2ggYnl0ZSBhcyBhIGtleSBjb2RlIGZvciBlbnRyaWVzIG1hcmtlZCB0byBzdGFydCB3aXRoIDAuIFNlZVxuICogZGVzY3JpcHRpb24gb2YgZW5jb2RlUGF5bG9hZEFzQmluYXJ5XG4gKlxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBidWZmZXJUYWlsID0gZGF0YTtcbiAgdmFyIGJ1ZmZlcnMgPSBbXTtcblxuICB3aGlsZSAoYnVmZmVyVGFpbC5ieXRlTGVuZ3RoID4gMCkge1xuICAgIHZhciB0YWlsQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJUYWlsKTtcbiAgICB2YXIgaXNTdHJpbmcgPSB0YWlsQXJyYXlbMF0gPT09IDA7XG4gICAgdmFyIG1zZ0xlbmd0aCA9ICcnO1xuXG4gICAgZm9yICh2YXIgaSA9IDE7IDsgaSsrKSB7XG4gICAgICBpZiAodGFpbEFycmF5W2ldID09PSAyNTUpIGJyZWFrO1xuXG4gICAgICAvLyAzMTAgPSBjaGFyIGxlbmd0aCBvZiBOdW1iZXIuTUFYX1ZBTFVFXG4gICAgICBpZiAobXNnTGVuZ3RoLmxlbmd0aCA+IDMxMCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgbXNnTGVuZ3RoICs9IHRhaWxBcnJheVtpXTtcbiAgICB9XG5cbiAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgMiArIG1zZ0xlbmd0aC5sZW5ndGgpO1xuICAgIG1zZ0xlbmd0aCA9IHBhcnNlSW50KG1zZ0xlbmd0aCk7XG5cbiAgICB2YXIgbXNnID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgMCwgbXNnTGVuZ3RoKTtcbiAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG1zZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkobXNnKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHRvIHR5cGVkIGFycmF5c1xuICAgICAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShtc2cpO1xuICAgICAgICBtc2cgPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG1zZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHR5cGVkW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGJ1ZmZlcnMucHVzaChtc2cpO1xuICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCBtc2dMZW5ndGgpO1xuICB9XG5cbiAgdmFyIHRvdGFsID0gYnVmZmVycy5sZW5ndGg7XG4gIGJ1ZmZlcnMuZm9yRWFjaChmdW5jdGlvbihidWZmZXIsIGkpIHtcbiAgICBjYWxsYmFjayhleHBvcnRzLmRlY29kZVBhY2tldChidWZmZXIsIGJpbmFyeVR5cGUsIHRydWUpLCBpLCB0b3RhbCk7XG4gIH0pO1xufTtcbiIsIlxuLyoqXG4gKiBHZXRzIHRoZSBrZXlzIGZvciBhbiBvYmplY3QuXG4gKlxuICogQHJldHVybiB7QXJyYXl9IGtleXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyAob2JqKXtcbiAgdmFyIGFyciA9IFtdO1xuICB2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGkpKSB7XG4gICAgICBhcnIucHVzaChpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycjtcbn07XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3V0ZjhqcyB2Mi4xLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlcyBgZXhwb3J0c2Bcblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuXHQvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYFxuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0bW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG5cdC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsXG5cdC8vIGFuZCB1c2UgaXQgYXMgYHJvb3RgXG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cblx0Ly8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW107XG5cdFx0dmFyIGNvdW50ZXIgPSAwO1xuXHRcdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHRcdHZhciB2YWx1ZTtcblx0XHR2YXIgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0Ly8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIGluZGV4ID0gLTE7XG5cdFx0dmFyIHZhbHVlO1xuXHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBhcnJheVtpbmRleF07XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkge1xuXHRcdGlmIChjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERGRkYpIHtcblx0XHRcdGlmIChzdHJpY3QpIHtcblx0XHRcdFx0dGhyb3cgRXJyb3IoXG5cdFx0XHRcdFx0J0xvbmUgc3Vycm9nYXRlIFUrJyArIGNvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArXG5cdFx0XHRcdFx0JyBpcyBub3QgYSBzY2FsYXIgdmFsdWUnXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUJ5dGUoY29kZVBvaW50LCBzaGlmdCkge1xuXHRcdHJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gc2hpZnQpICYgMHgzRikgfCAweDgwKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVuY29kZUNvZGVQb2ludChjb2RlUG9pbnQsIHN0cmljdCkge1xuXHRcdGlmICgoY29kZVBvaW50ICYgMHhGRkZGRkY4MCkgPT0gMCkgeyAvLyAxLWJ5dGUgc2VxdWVuY2Vcblx0XHRcdHJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0XHR9XG5cdFx0dmFyIHN5bWJvbCA9ICcnO1xuXHRcdGlmICgoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCkgeyAvLyAyLWJ5dGUgc2VxdWVuY2Vcblx0XHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiA2KSAmIDB4MUYpIHwgMHhDMCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRkYwMDAwKSA9PSAwKSB7IC8vIDMtYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0aWYgKCFjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSkge1xuXHRcdFx0XHRjb2RlUG9pbnQgPSAweEZGRkQ7XG5cdFx0XHR9XG5cdFx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTIpICYgMHgwRikgfCAweEUwKTtcblx0XHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRTAwMDAwKSA9PSAwKSB7IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuXHRcdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDE4KSAmIDB4MDcpIHwgMHhGMCk7XG5cdFx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDEyKTtcblx0XHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG5cdFx0fVxuXHRcdHN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoKGNvZGVQb2ludCAmIDB4M0YpIHwgMHg4MCk7XG5cdFx0cmV0dXJuIHN5bWJvbDtcblx0fVxuXG5cdGZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nLCBvcHRzKSB7XG5cdFx0b3B0cyA9IG9wdHMgfHwge307XG5cdFx0dmFyIHN0cmljdCA9IGZhbHNlICE9PSBvcHRzLnN0cmljdDtcblxuXHRcdHZhciBjb2RlUG9pbnRzID0gdWNzMmRlY29kZShzdHJpbmcpO1xuXHRcdHZhciBsZW5ndGggPSBjb2RlUG9pbnRzLmxlbmd0aDtcblx0XHR2YXIgaW5kZXggPSAtMTtcblx0XHR2YXIgY29kZVBvaW50O1xuXHRcdHZhciBieXRlU3RyaW5nID0gJyc7XG5cdFx0d2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0XHRcdGNvZGVQb2ludCA9IGNvZGVQb2ludHNbaW5kZXhdO1xuXHRcdFx0Ynl0ZVN0cmluZyArPSBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50LCBzdHJpY3QpO1xuXHRcdH1cblx0XHRyZXR1cm4gYnl0ZVN0cmluZztcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdGZ1bmN0aW9uIHJlYWRDb250aW51YXRpb25CeXRlKCkge1xuXHRcdGlmIChieXRlSW5kZXggPj0gYnl0ZUNvdW50KSB7XG5cdFx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7XG5cdFx0fVxuXG5cdFx0dmFyIGNvbnRpbnVhdGlvbkJ5dGUgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdFx0Ynl0ZUluZGV4Kys7XG5cblx0XHRpZiAoKGNvbnRpbnVhdGlvbkJ5dGUgJiAweEMwKSA9PSAweDgwKSB7XG5cdFx0XHRyZXR1cm4gY29udGludWF0aW9uQnl0ZSAmIDB4M0Y7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2UgZW5kIHVwIGhlcmUsIGl04oCZcyBub3QgYSBjb250aW51YXRpb24gYnl0ZVxuXHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZWNvZGVTeW1ib2woc3RyaWN0KSB7XG5cdFx0dmFyIGJ5dGUxO1xuXHRcdHZhciBieXRlMjtcblx0XHR2YXIgYnl0ZTM7XG5cdFx0dmFyIGJ5dGU0O1xuXHRcdHZhciBjb2RlUG9pbnQ7XG5cblx0XHRpZiAoYnl0ZUluZGV4ID4gYnl0ZUNvdW50KSB7XG5cdFx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKGJ5dGVJbmRleCA9PSBieXRlQ291bnQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBSZWFkIGZpcnN0IGJ5dGVcblx0XHRieXRlMSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtcblx0XHRieXRlSW5kZXgrKztcblxuXHRcdC8vIDEtYnl0ZSBzZXF1ZW5jZSAobm8gY29udGludWF0aW9uIGJ5dGVzKVxuXHRcdGlmICgoYnl0ZTEgJiAweDgwKSA9PSAwKSB7XG5cdFx0XHRyZXR1cm4gYnl0ZTE7XG5cdFx0fVxuXG5cdFx0Ly8gMi1ieXRlIHNlcXVlbmNlXG5cdFx0aWYgKChieXRlMSAmIDB4RTApID09IDB4QzApIHtcblx0XHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRcdGNvZGVQb2ludCA9ICgoYnl0ZTEgJiAweDFGKSA8PCA2KSB8IGJ5dGUyO1xuXHRcdFx0aWYgKGNvZGVQb2ludCA+PSAweDgwKSB7XG5cdFx0XHRcdHJldHVybiBjb2RlUG9pbnQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIDMtYnl0ZSBzZXF1ZW5jZSAobWF5IGluY2x1ZGUgdW5wYWlyZWQgc3Vycm9nYXRlcylcblx0XHRpZiAoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCkge1xuXHRcdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Ynl0ZTMgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MEYpIDw8IDEyKSB8IChieXRlMiA8PCA2KSB8IGJ5dGUzO1xuXHRcdFx0aWYgKGNvZGVQb2ludCA+PSAweDA4MDApIHtcblx0XHRcdFx0cmV0dXJuIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50LCBzdHJpY3QpID8gY29kZVBvaW50IDogMHhGRkZEO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0XHRpZiAoKGJ5dGUxICYgMHhGOCkgPT0gMHhGMCkge1xuXHRcdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Ynl0ZTMgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Ynl0ZTQgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MDcpIDw8IDB4MTIpIHwgKGJ5dGUyIDw8IDB4MEMpIHxcblx0XHRcdFx0KGJ5dGUzIDw8IDB4MDYpIHwgYnl0ZTQ7XG5cdFx0XHRpZiAoY29kZVBvaW50ID49IDB4MDEwMDAwICYmIGNvZGVQb2ludCA8PSAweDEwRkZGRikge1xuXHRcdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7XG5cdH1cblxuXHR2YXIgYnl0ZUFycmF5O1xuXHR2YXIgYnl0ZUNvdW50O1xuXHR2YXIgYnl0ZUluZGV4O1xuXHRmdW5jdGlvbiB1dGY4ZGVjb2RlKGJ5dGVTdHJpbmcsIG9wdHMpIHtcblx0XHRvcHRzID0gb3B0cyB8fCB7fTtcblx0XHR2YXIgc3RyaWN0ID0gZmFsc2UgIT09IG9wdHMuc3RyaWN0O1xuXG5cdFx0Ynl0ZUFycmF5ID0gdWNzMmRlY29kZShieXRlU3RyaW5nKTtcblx0XHRieXRlQ291bnQgPSBieXRlQXJyYXkubGVuZ3RoO1xuXHRcdGJ5dGVJbmRleCA9IDA7XG5cdFx0dmFyIGNvZGVQb2ludHMgPSBbXTtcblx0XHR2YXIgdG1wO1xuXHRcdHdoaWxlICgodG1wID0gZGVjb2RlU3ltYm9sKHN0cmljdCkpICE9PSBmYWxzZSkge1xuXHRcdFx0Y29kZVBvaW50cy5wdXNoKHRtcCk7XG5cdFx0fVxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKGNvZGVQb2ludHMpO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0dmFyIHV0ZjggPSB7XG5cdFx0J3ZlcnNpb24nOiAnMi4xLjInLFxuXHRcdCdlbmNvZGUnOiB1dGY4ZW5jb2RlLFxuXHRcdCdkZWNvZGUnOiB1dGY4ZGVjb2RlXG5cdH07XG5cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdXRmODtcblx0XHR9KTtcblx0fVx0ZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG5cdFx0aWYgKGZyZWVNb2R1bGUpIHsgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcblx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IHV0Zjg7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdHZhciBvYmplY3QgPSB7fTtcblx0XHRcdHZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcblx0XHRcdGZvciAodmFyIGtleSBpbiB1dGY4KSB7XG5cdFx0XHRcdGhhc093blByb3BlcnR5LmNhbGwodXRmOCwga2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHV0Zjhba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0cm9vdC51dGY4ID0gdXRmODtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8qIGdsb2JhbCBCbG9iIEZpbGUgKi9cblxuLypcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgZ2xvYmFsLkJsb2IgPT09ICdmdW5jdGlvbicgfHwgdG9TdHJpbmcuY2FsbChnbG9iYWwuQmxvYikgPT09ICdbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl0nO1xudmFyIHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIGdsb2JhbC5GaWxlID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyaW5nLmNhbGwoZ2xvYmFsLkZpbGUpID09PSAnW29iamVjdCBGaWxlQ29uc3RydWN0b3JdJztcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc0JpbmFyeTtcblxuLyoqXG4gKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxuICpcbiAqIFN1cHBvcnRzIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEJsb2IgYW5kIEZpbGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFueXRoaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGhhc0JpbmFyeSAob2JqKSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGhhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoKHR5cGVvZiBnbG9iYWwuQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopKSB8fFxuICAgICAodHlwZW9mIGdsb2JhbC5BcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHxcbiAgICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKVxuICAgICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9oYXMtYmluYXJ5L3B1bGwvNFxuICBpZiAob2JqLnRvSlNPTiAmJiB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJyAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGhhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqXG4gKiBMb2dpYyBib3Jyb3dlZCBmcm9tIE1vZGVybml6cjpcbiAqXG4gKiAgIC0gaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2NvcnMuanNcbiAqL1xuXG50cnkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn0gY2F0Y2ggKGVycikge1xuICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gIC8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xufVxuIiwiXG52YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxyXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXHJcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gKG9iaikge1xyXG4gIHZhciBzdHIgPSAnJztcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgaWYgKHN0ci5sZW5ndGgpIHN0ciArPSAnJic7XHJcbiAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBzdHI7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHFzKXtcclxuICB2YXIgcXJ5ID0ge307XHJcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcclxuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcbiAgfVxyXG4gIHJldHVybiBxcnk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBQYXJzZXMgYW4gVVJJXHJcbiAqXHJcbiAqIEBhdXRob3IgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+IChNSVQgbGljZW5zZSlcclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxudmFyIHJlID0gL14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XHJcblxyXG52YXIgcGFydHMgPSBbXHJcbiAgICAnc291cmNlJywgJ3Byb3RvY29sJywgJ2F1dGhvcml0eScsICd1c2VySW5mbycsICd1c2VyJywgJ3Bhc3N3b3JkJywgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JywgJ2FuY2hvcidcclxuXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2V1cmkoc3RyKSB7XHJcbiAgICB2YXIgc3JjID0gc3RyLFxyXG4gICAgICAgIGIgPSBzdHIuaW5kZXhPZignWycpLFxyXG4gICAgICAgIGUgPSBzdHIuaW5kZXhPZignXScpO1xyXG5cclxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcclxuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGIpICsgc3RyLnN1YnN0cmluZyhiLCBlKS5yZXBsYWNlKC86L2csICc7JykgKyBzdHIuc3Vic3RyaW5nKGUsIHN0ci5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtID0gcmUuZXhlYyhzdHIgfHwgJycpLFxyXG4gICAgICAgIHVyaSA9IHt9LFxyXG4gICAgICAgIGkgPSAxNDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xyXG4gICAgICAgIHVyaS5zb3VyY2UgPSBzcmM7XHJcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xyXG4gICAgICAgIHVyaS5hdXRob3JpdHkgPSB1cmkuYXV0aG9yaXR5LnJlcGxhY2UoJ1snLCAnJykucmVwbGFjZSgnXScsICcnKS5yZXBsYWNlKC87L2csICc6Jyk7XHJcbiAgICAgICAgdXJpLmlwdjZ1cmkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1cmk7XHJcbn07XHJcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB1cmwgPSByZXF1aXJlKCcuL3VybCcpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBNYW5hZ2VyID0gcmVxdWlyZSgnLi9tYW5hZ2VyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Jyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gbG9va3VwO1xuXG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5cbnZhciBjYWNoZSA9IGV4cG9ydHMubWFuYWdlcnMgPSB7fTtcblxuLyoqXG4gKiBMb29rcyB1cCBhbiBleGlzdGluZyBgTWFuYWdlcmAgZm9yIG11bHRpcGxleGluZy5cbiAqIElmIHRoZSB1c2VyIHN1bW1vbnM6XG4gKlxuICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYScpO2BcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2InKTtgXG4gKlxuICogV2UgcmV1c2UgdGhlIGV4aXN0aW5nIGluc3RhbmNlIGJhc2VkIG9uIHNhbWUgc2NoZW1lL3BvcnQvaG9zdCxcbiAqIGFuZCB3ZSBpbml0aWFsaXplIHNvY2tldHMgZm9yIGVhY2ggbmFtZXNwYWNlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9va3VwICh1cmksIG9wdHMpIHtcbiAgaWYgKHR5cGVvZiB1cmkgPT09ICdvYmplY3QnKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICB2YXIgcGFyc2VkID0gdXJsKHVyaSk7XG4gIHZhciBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICB2YXIgaWQgPSBwYXJzZWQuaWQ7XG4gIHZhciBwYXRoID0gcGFyc2VkLnBhdGg7XG4gIHZhciBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdLm5zcHM7XG4gIHZhciBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fCBvcHRzWydmb3JjZSBuZXcgY29ubmVjdGlvbiddIHx8XG4gICAgICAgICAgICAgICAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8IHNhbWVOYW1lc3BhY2U7XG5cbiAgdmFyIGlvO1xuXG4gIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgZGVidWcoJ2lnbm9yaW5nIHNvY2tldCBjYWNoZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgIGlvID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICBkZWJ1ZygnbmV3IGlvIGluc3RhbmNlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgICBjYWNoZVtpZF0gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGlvID0gY2FjaGVbaWRdO1xuICB9XG4gIGlmIChwYXJzZWQucXVlcnkgJiYgIW9wdHMucXVlcnkpIHtcbiAgICBvcHRzLnF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5O1xuICB9XG4gIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sO1xuXG4vKipcbiAqIGBjb25uZWN0YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJpXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuY29ubmVjdCA9IGxvb2t1cDtcblxuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5NYW5hZ2VyID0gcmVxdWlyZSgnLi9tYW5hZ2VyJyk7XG5leHBvcnRzLlNvY2tldCA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZWlvID0gcmVxdWlyZSgnZW5naW5lLmlvLWNsaWVudCcpO1xudmFyIFNvY2tldCA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIG9uID0gcmVxdWlyZSgnLi9vbicpO1xudmFyIGJpbmQgPSByZXF1aXJlKCdjb21wb25lbnQtYmluZCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDptYW5hZ2VyJyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJ2luZGV4b2YnKTtcbnZhciBCYWNrb2ZmID0gcmVxdWlyZSgnYmFja28yJyk7XG5cbi8qKlxuICogSUU2KyBoYXNPd25Qcm9wZXJ0eVxuICovXG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBNYW5hZ2VyO1xuXG4vKipcbiAqIGBNYW5hZ2VyYCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5naW5lIGluc3RhbmNlIG9yIGVuZ2luZSB1cmkvb3B0c1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gTWFuYWdlciAodXJpLCBvcHRzKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNYW5hZ2VyKSkgcmV0dXJuIG5ldyBNYW5hZ2VyKHVyaSwgb3B0cyk7XG4gIGlmICh1cmkgJiYgKCdvYmplY3QnID09PSB0eXBlb2YgdXJpKSkge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gdW5kZWZpbmVkO1xuICB9XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIG9wdHMucGF0aCA9IG9wdHMucGF0aCB8fCAnL3NvY2tldC5pbyc7XG4gIHRoaXMubnNwcyA9IHt9O1xuICB0aGlzLnN1YnMgPSBbXTtcbiAgdGhpcy5vcHRzID0gb3B0cztcbiAgdGhpcy5yZWNvbm5lY3Rpb24ob3B0cy5yZWNvbm5lY3Rpb24gIT09IGZhbHNlKTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyhvcHRzLnJlY29ubmVjdGlvbkF0dGVtcHRzIHx8IEluZmluaXR5KTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO1xuICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KG9wdHMucmVjb25uZWN0aW9uRGVsYXlNYXggfHwgNTAwMCk7XG4gIHRoaXMucmFuZG9taXphdGlvbkZhY3RvcihvcHRzLnJhbmRvbWl6YXRpb25GYWN0b3IgfHwgMC41KTtcbiAgdGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe1xuICAgIG1pbjogdGhpcy5yZWNvbm5lY3Rpb25EZWxheSgpLFxuICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgIGppdHRlcjogdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKClcbiAgfSk7XG4gIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIHRoaXMudXJpID0gdXJpO1xuICB0aGlzLmNvbm5lY3RpbmcgPSBbXTtcbiAgdGhpcy5sYXN0UGluZyA9IG51bGw7XG4gIHRoaXMuZW5jb2RpbmcgPSBmYWxzZTtcbiAgdGhpcy5wYWNrZXRCdWZmZXIgPSBbXTtcbiAgdmFyIF9wYXJzZXIgPSBvcHRzLnBhcnNlciB8fCBwYXJzZXI7XG4gIHRoaXMuZW5jb2RlciA9IG5ldyBfcGFyc2VyLkVuY29kZXIoKTtcbiAgdGhpcy5kZWNvZGVyID0gbmV3IF9wYXJzZXIuRGVjb2RlcigpO1xuICB0aGlzLmF1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7XG4gIGlmICh0aGlzLmF1dG9Db25uZWN0KSB0aGlzLm9wZW4oKTtcbn1cblxuLyoqXG4gKiBQcm9wYWdhdGUgZ2l2ZW4gZXZlbnQgdG8gc29ja2V0cyBhbmQgZW1pdCBvbiBgdGhpc2BcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5lbWl0QWxsID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgZm9yICh2YXIgbnNwIGluIHRoaXMubnNwcykge1xuICAgIGlmIChoYXMuY2FsbCh0aGlzLm5zcHMsIG5zcCkpIHtcbiAgICAgIHRoaXMubnNwc1tuc3BdLmVtaXQuYXBwbHkodGhpcy5uc3BzW25zcF0sIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFVwZGF0ZSBgc29ja2V0LmlkYCBvZiBhbGwgc29ja2V0c1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVNvY2tldElkcyA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgbnNwIGluIHRoaXMubnNwcykge1xuICAgIGlmIChoYXMuY2FsbCh0aGlzLm5zcHMsIG5zcCkpIHtcbiAgICAgIHRoaXMubnNwc1tuc3BdLmlkID0gdGhpcy5nZW5lcmF0ZUlkKG5zcCk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGdlbmVyYXRlIGBzb2NrZXQuaWRgIGZvciB0aGUgZ2l2ZW4gYG5zcGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbnNwXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5nZW5lcmF0ZUlkID0gZnVuY3Rpb24gKG5zcCkge1xuICByZXR1cm4gKG5zcCA9PT0gJy8nID8gJycgOiAobnNwICsgJyMnKSkgKyB0aGlzLmVuZ2luZS5pZDtcbn07XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKE1hbmFnZXIucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBgcmVjb25uZWN0aW9uYCBjb25maWcuXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSB0cnVlL2ZhbHNlIGlmIGl0IHNob3VsZCBhdXRvbWF0aWNhbGx5IHJlY29ubmVjdFxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb24gPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHJlY29ubmVjdGlvbiBhdHRlbXB0cyBjb25maWcuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgYmVmb3JlIGdpdmluZyB1cFxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNaW4odik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuTWFuYWdlci5wcm90b3R5cGUucmFuZG9taXphdGlvbkZhY3RvciA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7XG4gIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldEppdHRlcih2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIG1heGltdW0gZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheU1heCA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heCA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWF4KHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY29ubmVjdGlvbiB0aW1lb3V0LiBgZmFsc2VgIHRvIGRpc2FibGVcbiAqXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUubWF5YmVSZWNvbm5lY3RPbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIC8vIE9ubHkgdHJ5IHRvIHJlY29ubmVjdCBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHdlJ3JlIGNvbm5lY3RpbmdcbiAgaWYgKCF0aGlzLnJlY29ubmVjdGluZyAmJiB0aGlzLl9yZWNvbm5lY3Rpb24gJiYgdGhpcy5iYWNrb2ZmLmF0dGVtcHRzID09PSAwKSB7XG4gICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgIHRoaXMucmVjb25uZWN0KCk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9uYWwsIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9wZW4gPVxuTWFuYWdlci5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uIChmbiwgb3B0cykge1xuICBkZWJ1ZygncmVhZHlTdGF0ZSAlcycsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIGlmICh+dGhpcy5yZWFkeVN0YXRlLmluZGV4T2YoJ29wZW4nKSkgcmV0dXJuIHRoaXM7XG5cbiAgZGVidWcoJ29wZW5pbmcgJXMnLCB0aGlzLnVyaSk7XG4gIHRoaXMuZW5naW5lID0gZWlvKHRoaXMudXJpLCB0aGlzLm9wdHMpO1xuICB2YXIgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcblxuICAvLyBlbWl0IGBvcGVuYFxuICB2YXIgb3BlblN1YiA9IG9uKHNvY2tldCwgJ29wZW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbm9wZW4oKTtcbiAgICBmbiAmJiBmbigpO1xuICB9KTtcblxuICAvLyBlbWl0IGBjb25uZWN0X2Vycm9yYFxuICB2YXIgZXJyb3JTdWIgPSBvbihzb2NrZXQsICdlcnJvcicsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGVidWcoJ2Nvbm5lY3RfZXJyb3InKTtcbiAgICBzZWxmLmNsZWFudXAoKTtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgICBzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfZXJyb3InLCBkYXRhKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gZXJyb3InKTtcbiAgICAgIGVyci5kYXRhID0gZGF0YTtcbiAgICAgIGZuKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICBzZWxmLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBlbWl0IGBjb25uZWN0X3RpbWVvdXRgXG4gIGlmIChmYWxzZSAhPT0gdGhpcy5fdGltZW91dCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICBkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHdpbGwgdGltZW91dCBhZnRlciAlZCcsIHRpbWVvdXQpO1xuXG4gICAgLy8gc2V0IHRpbWVyXG4gICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHRpbWVkIG91dCBhZnRlciAlZCcsIHRpbWVvdXQpO1xuICAgICAgb3BlblN1Yi5kZXN0cm95KCk7XG4gICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgIHNvY2tldC5lbWl0KCdlcnJvcicsICd0aW1lb3V0Jyk7XG4gICAgICBzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfdGltZW91dCcsIHRpbWVvdXQpO1xuICAgIH0sIHRpbWVvdXQpO1xuXG4gICAgdGhpcy5zdWJzLnB1c2goe1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdGhpcy5zdWJzLnB1c2gob3BlblN1Yik7XG4gIHRoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IG9wZW4uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1Zygnb3BlbicpO1xuXG4gIC8vIGNsZWFyIG9sZCBzdWJzXG4gIHRoaXMuY2xlYW51cCgpO1xuXG4gIC8vIG1hcmsgYXMgb3BlblxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIHRoaXMuZW1pdCgnb3BlbicpO1xuXG4gIC8vIGFkZCBuZXcgc3Vic1xuICB2YXIgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2RhdGEnLCBiaW5kKHRoaXMsICdvbmRhdGEnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdwaW5nJywgYmluZCh0aGlzLCAnb25waW5nJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAncG9uZycsIGJpbmQodGhpcywgJ29ucG9uZycpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2Vycm9yJywgYmluZCh0aGlzLCAnb25lcnJvcicpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2Nsb3NlJywgYmluZCh0aGlzLCAnb25jbG9zZScpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHRoaXMuZGVjb2RlciwgJ2RlY29kZWQnLCBiaW5kKHRoaXMsICdvbmRlY29kZWQnKSkpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHBpbmcuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25waW5nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmxhc3RQaW5nID0gbmV3IERhdGUoKTtcbiAgdGhpcy5lbWl0QWxsKCdwaW5nJyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ucG9uZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0QWxsKCdwb25nJywgbmV3IERhdGUoKSAtIHRoaXMubGFzdFBpbmcpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBkYXRhLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZGVjb2Rlci5hZGQoZGF0YSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aGVuIHBhcnNlciBmdWxseSBkZWNvZGVzIGEgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZGVjb2RlZCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzb2NrZXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgZGVidWcoJ2Vycm9yJywgZXJyKTtcbiAgdGhpcy5lbWl0QWxsKCdlcnJvcicsIGVycik7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgc29ja2V0IGZvciB0aGUgZ2l2ZW4gYG5zcGAuXG4gKlxuICogQHJldHVybiB7U29ja2V0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5zb2NrZXQgPSBmdW5jdGlvbiAobnNwLCBvcHRzKSB7XG4gIHZhciBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgaWYgKCFzb2NrZXQpIHtcbiAgICBzb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMsIG5zcCwgb3B0cyk7XG4gICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNvY2tldC5vbignY29ubmVjdGluZycsIG9uQ29ubmVjdGluZyk7XG4gICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgc29ja2V0LmlkID0gc2VsZi5nZW5lcmF0ZUlkKG5zcCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hdXRvQ29ubmVjdCkge1xuICAgICAgLy8gbWFudWFsbHkgY2FsbCBoZXJlIHNpbmNlIGNvbm5lY3RpbmcgZXZlbnQgaXMgZmlyZWQgYmVmb3JlIGxpc3RlbmluZ1xuICAgICAgb25Db25uZWN0aW5nKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db25uZWN0aW5nICgpIHtcbiAgICBpZiAoIX5pbmRleE9mKHNlbGYuY29ubmVjdGluZywgc29ja2V0KSkge1xuICAgICAgc2VsZi5jb25uZWN0aW5nLnB1c2goc29ja2V0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc29ja2V0O1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNvY2tldCBjbG9zZS5cbiAqXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmNvbm5lY3RpbmcsIHNvY2tldCk7XG4gIGlmICh+aW5kZXgpIHRoaXMuY29ubmVjdGluZy5zcGxpY2UoaW5kZXgsIDEpO1xuICBpZiAodGhpcy5jb25uZWN0aW5nLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHRoaXMuY2xvc2UoKTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgZGVidWcoJ3dyaXRpbmcgcGFja2V0ICVqJywgcGFja2V0KTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBpZiAocGFja2V0LnF1ZXJ5ICYmIHBhY2tldC50eXBlID09PSAwKSBwYWNrZXQubnNwICs9ICc/JyArIHBhY2tldC5xdWVyeTtcblxuICBpZiAoIXNlbGYuZW5jb2RpbmcpIHtcbiAgICAvLyBlbmNvZGUsIHRoZW4gd3JpdGUgdG8gZW5naW5lIHdpdGggcmVzdWx0XG4gICAgc2VsZi5lbmNvZGluZyA9IHRydWU7XG4gICAgdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQsIGZ1bmN0aW9uIChlbmNvZGVkUGFja2V0cykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZWxmLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgc2VsZi5lbmNvZGluZyA9IGZhbHNlO1xuICAgICAgc2VsZi5wcm9jZXNzUGFja2V0UXVldWUoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHsgLy8gYWRkIHBhY2tldCB0byB0aGUgcXVldWVcbiAgICBzZWxmLnBhY2tldEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIH1cbn07XG5cbi8qKlxuICogSWYgcGFja2V0IGJ1ZmZlciBpcyBub24tZW1wdHksIGJlZ2lucyBlbmNvZGluZyB0aGVcbiAqIG5leHQgcGFja2V0IGluIGxpbmUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucHJvY2Vzc1BhY2tldFF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5wYWNrZXRCdWZmZXIubGVuZ3RoID4gMCAmJiAhdGhpcy5lbmNvZGluZykge1xuICAgIHZhciBwYWNrID0gdGhpcy5wYWNrZXRCdWZmZXIuc2hpZnQoKTtcbiAgICB0aGlzLnBhY2tldChwYWNrKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDbGVhbiB1cCB0cmFuc3BvcnQgc3Vic2NyaXB0aW9ucyBhbmQgcGFja2V0IGJ1ZmZlci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygnY2xlYW51cCcpO1xuXG4gIHZhciBzdWJzTGVuZ3RoID0gdGhpcy5zdWJzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdWJzTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc3ViID0gdGhpcy5zdWJzLnNoaWZ0KCk7XG4gICAgc3ViLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gIHRoaXMuZW5jb2RpbmcgPSBmYWxzZTtcbiAgdGhpcy5sYXN0UGluZyA9IG51bGw7XG5cbiAgdGhpcy5kZWNvZGVyLmRlc3Ryb3koKTtcbn07XG5cbi8qKlxuICogQ2xvc2UgdGhlIGN1cnJlbnQgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmNsb3NlID1cbk1hbmFnZXIucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdkaXNjb25uZWN0Jyk7XG4gIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIC8vIGBvbmNsb3NlYCB3aWxsIG5vdCBmaXJlIGJlY2F1c2VcbiAgICAvLyBhbiBvcGVuIGV2ZW50IG5ldmVyIGhhcHBlbmVkXG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gIH1cbiAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICBpZiAodGhpcy5lbmdpbmUpIHRoaXMuZW5naW5lLmNsb3NlKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICBkZWJ1Zygnb25jbG9zZScpO1xuXG4gIHRoaXMuY2xlYW51cCgpO1xuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24pO1xuXG4gIGlmICh0aGlzLl9yZWNvbm5lY3Rpb24gJiYgIXRoaXMuc2tpcFJlY29ubmVjdCkge1xuICAgIHRoaXMucmVjb25uZWN0KCk7XG4gIH1cbn07XG5cbi8qKlxuICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnJlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpIHJldHVybiB0aGlzO1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAodGhpcy5iYWNrb2ZmLmF0dGVtcHRzID49IHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzKSB7XG4gICAgZGVidWcoJ3JlY29ubmVjdCBmYWlsZWQnKTtcbiAgICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdF9mYWlsZWQnKTtcbiAgICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHZhciBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgIGRlYnVnKCd3aWxsIHdhaXQgJWRtcyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHQnLCBkZWxheSk7XG5cbiAgICB0aGlzLnJlY29ubmVjdGluZyA9IHRydWU7XG4gICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KSByZXR1cm47XG5cbiAgICAgIGRlYnVnKCdhdHRlbXB0aW5nIHJlY29ubmVjdCcpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfYXR0ZW1wdCcsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG4gICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdGluZycsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG5cbiAgICAgIC8vIGNoZWNrIGFnYWluIGZvciB0aGUgY2FzZSBzb2NrZXQgY2xvc2VkIGluIGFib3ZlIGV2ZW50c1xuICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdCkgcmV0dXJuO1xuXG4gICAgICBzZWxmLm9wZW4oZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBhdHRlbXB0IGVycm9yJyk7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2Vycm9yJywgZXJyLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3Qgc3VjY2VzcycpO1xuICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgZGVsYXkpO1xuXG4gICAgdGhpcy5zdWJzLnB1c2goe1xuICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXR0ZW1wdCA9IHRoaXMuYmFja29mZi5hdHRlbXB0cztcbiAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gIHRoaXMudXBkYXRlU29ja2V0SWRzKCk7XG4gIHRoaXMuZW1pdEFsbCgncmVjb25uZWN0JywgYXR0ZW1wdCk7XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gb247XG5cbi8qKlxuICogSGVscGVyIGZvciBzdWJzY3JpcHRpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEV2ZW50RW1pdHRlcn0gb2JqIHdpdGggYEVtaXR0ZXJgIG1peGluIG9yIGBFdmVudEVtaXR0ZXJgXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gb24gKG9iaiwgZXYsIGZuKSB7XG4gIG9iai5vbihldiwgZm4pO1xuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgIG9iai5yZW1vdmVMaXN0ZW5lcihldiwgZm4pO1xuICAgIH1cbiAgfTtcbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgdG9BcnJheSA9IHJlcXVpcmUoJ3RvLWFycmF5Jyk7XG52YXIgb24gPSByZXF1aXJlKCcuL29uJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1iaW5kJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gU29ja2V0O1xuXG4vKipcbiAqIEludGVybmFsIGV2ZW50cyAoYmxhY2tsaXN0ZWQpLlxuICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGV2ZW50cyA9IHtcbiAgY29ubmVjdDogMSxcbiAgY29ubmVjdF9lcnJvcjogMSxcbiAgY29ubmVjdF90aW1lb3V0OiAxLFxuICBjb25uZWN0aW5nOiAxLFxuICBkaXNjb25uZWN0OiAxLFxuICBlcnJvcjogMSxcbiAgcmVjb25uZWN0OiAxLFxuICByZWNvbm5lY3RfYXR0ZW1wdDogMSxcbiAgcmVjb25uZWN0X2ZhaWxlZDogMSxcbiAgcmVjb25uZWN0X2Vycm9yOiAxLFxuICByZWNvbm5lY3Rpbmc6IDEsXG4gIHBpbmc6IDEsXG4gIHBvbmc6IDFcbn07XG5cbi8qKlxuICogU2hvcnRjdXQgdG8gYEVtaXR0ZXIjZW1pdGAuXG4gKi9cblxudmFyIGVtaXQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gU29ja2V0IChpbywgbnNwLCBvcHRzKSB7XG4gIHRoaXMuaW8gPSBpbztcbiAgdGhpcy5uc3AgPSBuc3A7XG4gIHRoaXMuanNvbiA9IHRoaXM7IC8vIGNvbXBhdFxuICB0aGlzLmlkcyA9IDA7XG4gIHRoaXMuYWNrcyA9IHt9O1xuICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgaWYgKG9wdHMgJiYgb3B0cy5xdWVyeSkge1xuICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICB9XG4gIGlmICh0aGlzLmlvLmF1dG9Db25uZWN0KSB0aGlzLm9wZW4oKTtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zdWJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnN1YnMpIHJldHVybjtcblxuICB2YXIgaW8gPSB0aGlzLmlvO1xuICB0aGlzLnN1YnMgPSBbXG4gICAgb24oaW8sICdvcGVuJywgYmluZCh0aGlzLCAnb25vcGVuJykpLFxuICAgIG9uKGlvLCAncGFja2V0JywgYmluZCh0aGlzLCAnb25wYWNrZXQnKSksXG4gICAgb24oaW8sICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSlcbiAgXTtcbn07XG5cbi8qKlxuICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9wZW4gPVxuU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5jb25uZWN0ZWQpIHJldHVybiB0aGlzO1xuXG4gIHRoaXMuc3ViRXZlbnRzKCk7XG4gIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICBpZiAoJ29wZW4nID09PSB0aGlzLmlvLnJlYWR5U3RhdGUpIHRoaXMub25vcGVuKCk7XG4gIHRoaXMuZW1pdCgnY29ubmVjdGluZycpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gIGFyZ3MudW5zaGlmdCgnbWVzc2FnZScpO1xuICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBgZW1pdGAuXG4gKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldikge1xuICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGV2KSkge1xuICAgIGVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICB2YXIgcGFja2V0ID0geyB0eXBlOiBwYXJzZXIuRVZFTlQsIGRhdGE6IGFyZ3MgfTtcblxuICBwYWNrZXQub3B0aW9ucyA9IHt9O1xuICBwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9ICF0aGlzLmZsYWdzIHx8IGZhbHNlICE9PSB0aGlzLmZsYWdzLmNvbXByZXNzO1xuXG4gIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSkge1xuICAgIGRlYnVnKCdlbWl0dGluZyBwYWNrZXQgd2l0aCBhY2sgaWQgJWQnLCB0aGlzLmlkcyk7XG4gICAgdGhpcy5hY2tzW3RoaXMuaWRzXSA9IGFyZ3MucG9wKCk7XG4gICAgcGFja2V0LmlkID0gdGhpcy5pZHMrKztcbiAgfVxuXG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIHRoaXMucGFja2V0KHBhY2tldCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgfVxuXG4gIGRlbGV0ZSB0aGlzLmZsYWdzO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICB0aGlzLmlvLnBhY2tldChwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygndHJhbnNwb3J0IGlzIG9wZW4gLSBjb25uZWN0aW5nJyk7XG5cbiAgLy8gd3JpdGUgY29ubmVjdCBwYWNrZXQgaWYgbmVjZXNzYXJ5XG4gIGlmICgnLycgIT09IHRoaXMubnNwKSB7XG4gICAgaWYgKHRoaXMucXVlcnkpIHtcbiAgICAgIHZhciBxdWVyeSA9IHR5cGVvZiB0aGlzLnF1ZXJ5ID09PSAnb2JqZWN0JyA/IHBhcnNlcXMuZW5jb2RlKHRoaXMucXVlcnkpIDogdGhpcy5xdWVyeTtcbiAgICAgIGRlYnVnKCdzZW5kaW5nIGNvbm5lY3QgcGFja2V0IHdpdGggcXVlcnkgJXMnLCBxdWVyeSk7XG4gICAgICB0aGlzLnBhY2tldCh7dHlwZTogcGFyc2VyLkNPTk5FQ1QsIHF1ZXJ5OiBxdWVyeX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhY2tldCh7dHlwZTogcGFyc2VyLkNPTk5FQ1R9KTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlYXNvblxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICBkZWJ1ZygnY2xvc2UgKCVzKScsIHJlYXNvbik7XG4gIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgZGVsZXRlIHRoaXMuaWQ7XG4gIHRoaXMuZW1pdCgnZGlzY29ubmVjdCcsIHJlYXNvbik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgaWYgKHBhY2tldC5uc3AgIT09IHRoaXMubnNwKSByZXR1cm47XG5cbiAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgIGNhc2UgcGFyc2VyLkNPTk5FQ1Q6XG4gICAgICB0aGlzLm9uY29ubmVjdCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5FVkVOVDpcbiAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5CSU5BUllfRVZFTlQ6XG4gICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQUNLOlxuICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5CSU5BUllfQUNLOlxuICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5ESVNDT05ORUNUOlxuICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRVJST1I6XG4gICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgcGFja2V0LmRhdGEpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmV2ZW50ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB2YXIgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICBkZWJ1ZygnZW1pdHRpbmcgZXZlbnQgJWonLCBhcmdzKTtcblxuICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICBkZWJ1ZygnYXR0YWNoaW5nIGFjayBjYWxsYmFjayB0byBldmVudCcpO1xuICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgfVxuXG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIGVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goYXJncyk7XG4gIH1cbn07XG5cbi8qKlxuICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uIChpZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBzZW50ID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgaWYgKHNlbnQpIHJldHVybjtcbiAgICBzZW50ID0gdHJ1ZTtcbiAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICBkZWJ1Zygnc2VuZGluZyBhY2sgJWonLCBhcmdzKTtcblxuICAgIHNlbGYucGFja2V0KHtcbiAgICAgIHR5cGU6IHBhcnNlci5BQ0ssXG4gICAgICBpZDogaWQsXG4gICAgICBkYXRhOiBhcmdzXG4gICAgfSk7XG4gIH07XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZ2VtZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25hY2sgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHZhciBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBhY2spIHtcbiAgICBkZWJ1ZygnY2FsbGluZyBhY2sgJXMgd2l0aCAlaicsIHBhY2tldC5pZCwgcGFja2V0LmRhdGEpO1xuICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgZGVsZXRlIHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICB9IGVsc2Uge1xuICAgIGRlYnVnKCdiYWQgYWNrICVzJywgcGFja2V0LmlkKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbn07XG5cbi8qKlxuICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmVtaXRCdWZmZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnJlY2VpdmVCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIHRoaXMucmVjZWl2ZUJ1ZmZlcltpXSk7XG4gIH1cbiAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMucGFja2V0KHRoaXMuc2VuZEJ1ZmZlcltpXSk7XG4gIH1cbiAgdGhpcy5zZW5kQnVmZmVyID0gW107XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1Zygnc2VydmVyIGRpc2Nvbm5lY3QgKCVzKScsIHRoaXMubnNwKTtcbiAgdGhpcy5kZXN0cm95KCk7XG4gIHRoaXMub25jbG9zZSgnaW8gc2VydmVyIGRpc2Nvbm5lY3QnKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXG4gKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAqXG4gKiBAYXBpIHByaXZhdGUuXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdWJzKSB7XG4gICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc3Vic1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuc3VicyA9IG51bGw7XG4gIH1cblxuICB0aGlzLmlvLmRlc3Ryb3kodGhpcyk7XG59O1xuXG4vKipcbiAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuY2xvc2UgPVxuU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICBkZWJ1ZygncGVyZm9ybWluZyBkaXNjb25uZWN0ICglcyknLCB0aGlzLm5zcCk7XG4gICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBwYXJzZXIuRElTQ09OTkVDVCB9KTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gIHRoaXMuZGVzdHJveSgpO1xuXG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgdGhpcy5vbmNsb3NlKCdpbyBjbGllbnQgZGlzY29ubmVjdCcpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNvbXByZXNzID0gZnVuY3Rpb24gKGNvbXByZXNzKSB7XG4gIHRoaXMuZmxhZ3MgPSB0aGlzLmZsYWdzIHx8IHt9O1xuICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gIHJldHVybiB0aGlzO1xufTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnVybCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXJsO1xuXG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtPYmplY3R9IEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiB1cmwgKHVyaSwgbG9jKSB7XG4gIHZhciBvYmogPSB1cmk7XG5cbiAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgbG9jID0gbG9jIHx8IGdsb2JhbC5sb2NhdGlvbjtcbiAgaWYgKG51bGwgPT0gdXJpKSB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgbG9jLmhvc3Q7XG5cbiAgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG4gIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHVyaSkge1xuICAgIGlmICgnLycgPT09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgIGlmICgnLycgPT09IHVyaS5jaGFyQXQoMSkpIHtcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgIGRlYnVnKCdwcm90b2NvbC1sZXNzIHVybCAlcycsIHVyaSk7XG4gICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBsb2MpIHtcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIHVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVyaSA9ICdodHRwczovLycgKyB1cmk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFyc2VcbiAgICBkZWJ1ZygncGFyc2UgJXMnLCB1cmkpO1xuICAgIG9iaiA9IHBhcnNldXJpKHVyaSk7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgaWYgKCFvYmoucG9ydCkge1xuICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgb2JqLnBvcnQgPSAnODAnO1xuICAgIH0gZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICBvYmoucG9ydCA9ICc0NDMnO1xuICAgIH1cbiAgfVxuXG4gIG9iai5wYXRoID0gb2JqLnBhdGggfHwgJy8nO1xuXG4gIHZhciBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZignOicpICE9PSAtMTtcbiAgdmFyIGhvc3QgPSBpcHY2ID8gJ1snICsgb2JqLmhvc3QgKyAnXScgOiBvYmouaG9zdDtcblxuICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gIG9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArICc6JyArIG9iai5wb3J0O1xuICAvLyBkZWZpbmUgaHJlZlxuICBvYmouaHJlZiA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArIChsb2MgJiYgbG9jLnBvcnQgPT09IG9iai5wb3J0ID8gJycgOiAoJzonICsgb2JqLnBvcnQpKTtcblxuICByZXR1cm4gb2JqO1xufVxuIiwiLypnbG9iYWwgQmxvYixGaWxlKi9cblxuLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzXG4gKi9cblxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG52YXIgaXNCdWYgPSByZXF1aXJlKCcuL2lzLWJ1ZmZlcicpO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBnbG9iYWwuQmxvYiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0cmluZy5jYWxsKGdsb2JhbC5CbG9iKSA9PT0gJ1tvYmplY3QgQmxvYkNvbnN0cnVjdG9yXSc7XG52YXIgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgZ2xvYmFsLkZpbGUgPT09ICdmdW5jdGlvbicgfHwgdG9TdHJpbmcuY2FsbChnbG9iYWwuRmlsZSkgPT09ICdbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl0nO1xuXG4vKipcbiAqIFJlcGxhY2VzIGV2ZXJ5IEJ1ZmZlciB8IEFycmF5QnVmZmVyIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKiBBbnl0aGluZyB3aXRoIGJsb2JzIG9yIGZpbGVzIHNob3VsZCBiZSBmZWQgdGhyb3VnaCByZW1vdmVCbG9icyBiZWZvcmUgY29taW5nXG4gKiBoZXJlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggZGVjb25zdHJ1Y3RlZCBwYWNrZXQgYW5kIGxpc3Qgb2YgYnVmZmVyc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KSB7XG4gIHZhciBidWZmZXJzID0gW107XG4gIHZhciBwYWNrZXREYXRhID0gcGFja2V0LmRhdGE7XG4gIHZhciBwYWNrID0gcGFja2V0O1xuICBwYWNrLmRhdGEgPSBfZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0RGF0YSwgYnVmZmVycyk7XG4gIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gIHJldHVybiB7cGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzfTtcbn07XG5cbmZ1bmN0aW9uIF9kZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuIGRhdGE7XG5cbiAgaWYgKGlzQnVmKGRhdGEpKSB7XG4gICAgdmFyIHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICBidWZmZXJzLnB1c2goZGF0YSk7XG4gICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICB2YXIgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdEYXRhW2ldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICB2YXIgbmV3RGF0YSA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnJlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LCBidWZmZXJzKSB7XG4gIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgcGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG4gIHJldHVybiBwYWNrZXQ7XG59O1xuXG5mdW5jdGlvbiBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICBpZiAoIWRhdGEpIHJldHVybiBkYXRhO1xuXG4gIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyKSB7XG4gICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgfSBlbHNlIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkYXRhW2ldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQXN5bmNocm9ub3VzbHkgcmVtb3ZlcyBCbG9icyBvciBGaWxlcyBmcm9tIGRhdGEgdmlhXG4gKiBGaWxlUmVhZGVyJ3MgcmVhZEFzQXJyYXlCdWZmZXIgbWV0aG9kLiBVc2VkIGJlZm9yZSBlbmNvZGluZ1xuICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZW1vdmVCbG9icyA9IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIF9yZW1vdmVCbG9icyhvYmosIGN1cktleSwgY29udGFpbmluZ09iamVjdCkge1xuICAgIGlmICghb2JqKSByZXR1cm4gb2JqO1xuXG4gICAgLy8gY29udmVydCBhbnkgYmxvYlxuICAgIGlmICgod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKSB7XG4gICAgICBwZW5kaW5nQmxvYnMrKztcblxuICAgICAgLy8gYXN5bmMgZmlsZXJlYWRlclxuICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHsgLy8gdGhpcy5yZXN1bHQgPT0gYXJyYXlidWZmZXJcbiAgICAgICAgaWYgKGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICAgICAgICBjb250YWluaW5nT2JqZWN0W2N1cktleV0gPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBibG9ibGVzc0RhdGEgPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5vdGhpbmcgcGVuZGluZyBpdHMgY2FsbGJhY2sgdGltZVxuICAgICAgICBpZighIC0tcGVuZGluZ0Jsb2JzKSB7XG4gICAgICAgICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihvYmopOyAvLyBibG9iIC0+IGFycmF5YnVmZmVyXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9iaikpIHsgLy8gaGFuZGxlIGFycmF5XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIWlzQnVmKG9iaikpIHsgLy8gYW5kIG9iamVjdFxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcGVuZGluZ0Jsb2JzID0gMDtcbiAgdmFyIGJsb2JsZXNzRGF0YSA9IGRhdGE7XG4gIF9yZW1vdmVCbG9icyhibG9ibGVzc0RhdGEpO1xuICBpZiAoIXBlbmRpbmdCbG9icykge1xuICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gIH1cbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgaGFzQmluID0gcmVxdWlyZSgnaGFzLWJpbmFyeTInKTtcbnZhciBiaW5hcnkgPSByZXF1aXJlKCcuL2JpbmFyeScpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG52YXIgaXNCdWYgPSByZXF1aXJlKCcuL2lzLWJ1ZmZlcicpO1xuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gNDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnR5cGVzID0gW1xuICAnQ09OTkVDVCcsXG4gICdESVNDT05ORUNUJyxcbiAgJ0VWRU5UJyxcbiAgJ0FDSycsXG4gICdFUlJPUicsXG4gICdCSU5BUllfRVZFTlQnLFxuICAnQklOQVJZX0FDSydcbl07XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGNvbm5lY3RgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5DT05ORUNUID0gMDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZGlzY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkRJU0NPTk5FQ1QgPSAxO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBldmVudGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVWRU5UID0gMjtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgYWNrYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQUNLID0gMztcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZXJyb3JgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FUlJPUiA9IDQ7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgJ2JpbmFyeSBldmVudCdcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQklOQVJZX0VWRU5UID0gNTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgYmluYXJ5IGFja2AuIEZvciBhY2tzIHdpdGggYmluYXJ5IGFyZ3VtZW50cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQklOQVJZX0FDSyA9IDY7XG5cbi8qKlxuICogRW5jb2RlciBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRW5jb2RlciA9IEVuY29kZXI7XG5cbi8qKlxuICogRGVjb2RlciBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRGVjb2RlciA9IERlY29kZXI7XG5cbi8qKlxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW5jb2RlcigpIHt9XG5cbi8qKlxuICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBoYW5kbGUgZW5jb2RpbmdzIChsaWtlbHkgZW5naW5lLndyaXRlKVxuICogQHJldHVybiBDYWxscyBjYWxsYmFjayB3aXRoIEFycmF5IG9mIGVuY29kaW5nc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbmNvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbihvYmosIGNhbGxiYWNrKXtcbiAgaWYgKChvYmoudHlwZSA9PT0gZXhwb3J0cy5FVkVOVCB8fCBvYmoudHlwZSA9PT0gZXhwb3J0cy5BQ0spICYmIGhhc0JpbihvYmouZGF0YSkpIHtcbiAgICBvYmoudHlwZSA9IG9iai50eXBlID09PSBleHBvcnRzLkVWRU5UID8gZXhwb3J0cy5CSU5BUllfRVZFTlQgOiBleHBvcnRzLkJJTkFSWV9BQ0s7XG4gIH1cblxuICBkZWJ1ZygnZW5jb2RpbmcgcGFja2V0ICVqJywgb2JqKTtcblxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gb2JqLnR5cGUpIHtcbiAgICBlbmNvZGVBc0JpbmFyeShvYmosIGNhbGxiYWNrKTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgZW5jb2RpbmcgPSBlbmNvZGVBc1N0cmluZyhvYmopO1xuICAgIGNhbGxiYWNrKFtlbmNvZGluZ10pO1xuICB9XG59O1xuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge1N0cmluZ30gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXNTdHJpbmcob2JqKSB7XG5cbiAgLy8gZmlyc3QgaXMgdHlwZVxuICB2YXIgc3RyID0gJycgKyBvYmoudHlwZTtcblxuICAvLyBhdHRhY2htZW50cyBpZiB3ZSBoYXZlIHRoZW1cbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IG9iai50eXBlKSB7XG4gICAgc3RyICs9IG9iai5hdHRhY2htZW50cyArICctJztcbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgYSBuYW1lc3BhY2Ugb3RoZXIgdGhhbiBgL2BcbiAgLy8gd2UgYXBwZW5kIGl0IGZvbGxvd2VkIGJ5IGEgY29tbWEgYCxgXG4gIGlmIChvYmoubnNwICYmICcvJyAhPT0gb2JqLm5zcCkge1xuICAgIHN0ciArPSBvYmoubnNwICsgJywnO1xuICB9XG5cbiAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgIHN0ciArPSBvYmouaWQ7XG4gIH1cblxuICAvLyBqc29uIGRhdGFcbiAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICBzdHIgKz0gSlNPTi5zdHJpbmdpZnkob2JqLmRhdGEpO1xuICB9XG5cbiAgZGVidWcoJ2VuY29kZWQgJWogYXMgJXMnLCBvYmosIHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXG4gKiBhIGxpc3Qgb2YgYnVmZmVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IGVuY29kZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFzQmluYXJ5KG9iaiwgY2FsbGJhY2spIHtcblxuICBmdW5jdGlvbiB3cml0ZUVuY29kaW5nKGJsb2JsZXNzRGF0YSkge1xuICAgIHZhciBkZWNvbnN0cnVjdGlvbiA9IGJpbmFyeS5kZWNvbnN0cnVjdFBhY2tldChibG9ibGVzc0RhdGEpO1xuICAgIHZhciBwYWNrID0gZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTtcbiAgICB2YXIgYnVmZmVycyA9IGRlY29uc3RydWN0aW9uLmJ1ZmZlcnM7XG5cbiAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgY2FsbGJhY2soYnVmZmVycyk7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xuICB9XG5cbiAgYmluYXJ5LnJlbW92ZUJsb2JzKG9iaiwgd3JpdGVFbmNvZGluZyk7XG59XG5cbi8qKlxuICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVjb2RlclxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBEZWNvZGVyKCkge1xuICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAgd2l0aCBEZWNvZGVyLlxuICovXG5cbkVtaXR0ZXIoRGVjb2Rlci5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERlY29kZXMgYW4gZWNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gb2JqIC0gZW5jb2RlZCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkRlY29kZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgcGFja2V0O1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICBwYWNrZXQgPSBkZWNvZGVTdHJpbmcob2JqKTtcbiAgICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IHBhY2tldC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gcGFja2V0LnR5cGUpIHsgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG5cbiAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yLnJlY29uUGFjay5hdHRhY2htZW50cyA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIG5vbi1iaW5hcnkgZnVsbCBwYWNrZXRcbiAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGlzQnVmKG9iaikgfHwgb2JqLmJhc2U2NCkgeyAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICBpZiAoIXRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICBpZiAocGFja2V0KSB7IC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG9iaik7XG4gIH1cbn07XG5cbi8qKlxuICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBkZWNvZGVTdHJpbmcoc3RyKSB7XG4gIHZhciBpID0gMDtcbiAgLy8gbG9vayB1cCB0eXBlXG4gIHZhciBwID0ge1xuICAgIHR5cGU6IE51bWJlcihzdHIuY2hhckF0KDApKVxuICB9O1xuXG4gIGlmIChudWxsID09IGV4cG9ydHMudHlwZXNbcC50eXBlXSkge1xuICAgIHJldHVybiBlcnJvcigndW5rbm93biBwYWNrZXQgdHlwZSAnICsgcC50eXBlKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBwLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBwLnR5cGUpIHtcbiAgICB2YXIgYnVmID0gJyc7XG4gICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gJy0nKSB7XG4gICAgICBidWYgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChpID09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT09ICctJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGF0dGFjaG1lbnRzJyk7XG4gICAgfVxuICAgIHAuYXR0YWNobWVudHMgPSBOdW1iZXIoYnVmKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gIGlmICgnLycgPT09IHN0ci5jaGFyQXQoaSArIDEpKSB7XG4gICAgcC5uc3AgPSAnJztcbiAgICB3aGlsZSAoKytpKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoJywnID09PSBjKSBicmVhaztcbiAgICAgIHAubnNwICs9IGM7XG4gICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHAubnNwID0gJy8nO1xuICB9XG5cbiAgLy8gbG9vayB1cCBpZFxuICB2YXIgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICBpZiAoJycgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICBwLmlkID0gJyc7XG4gICAgd2hpbGUgKCsraSkge1xuICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAtLWk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcC5pZCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgICBwLmlkID0gTnVtYmVyKHAuaWQpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgIHZhciBwYXlsb2FkID0gdHJ5UGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgdmFyIGlzUGF5bG9hZFZhbGlkID0gcGF5bG9hZCAhPT0gZmFsc2UgJiYgKHAudHlwZSA9PT0gZXhwb3J0cy5FUlJPUiB8fCBpc0FycmF5KHBheWxvYWQpKTtcbiAgICBpZiAoaXNQYXlsb2FkVmFsaWQpIHtcbiAgICAgIHAuZGF0YSA9IHBheWxvYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlcnJvcignaW52YWxpZCBwYXlsb2FkJyk7XG4gICAgfVxuICB9XG5cbiAgZGVidWcoJ2RlY29kZWQgJXMgYXMgJWonLCBzdHIsIHApO1xuICByZXR1cm4gcDtcbn1cblxuZnVuY3Rpb24gdHJ5UGFyc2Uoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBIG1hbmFnZXIgb2YgYSBiaW5hcnkgZXZlbnQncyAnYnVmZmVyIHNlcXVlbmNlJy4gU2hvdWxkXG4gKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xuICogZGVjb2RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCkge1xuICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgdGhpcy5idWZmZXJzID0gW107XG59XG5cbi8qKlxuICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxuICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5CaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS50YWtlQmluYXJ5RGF0YSA9IGZ1bmN0aW9uKGJpbkRhdGEpIHtcbiAgdGhpcy5idWZmZXJzLnB1c2goYmluRGF0YSk7XG4gIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cykgeyAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICB2YXIgcGFja2V0ID0gYmluYXJ5LnJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLCB0aGlzLmJ1ZmZlcnMpO1xuICAgIHRoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgIHJldHVybiBwYWNrZXQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5CaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS5maW5pc2hlZFJlY29uc3RydWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmVjb25QYWNrID0gbnVsbDtcbiAgdGhpcy5idWZmZXJzID0gW107XG59O1xuXG5mdW5jdGlvbiBlcnJvcihtc2cpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBleHBvcnRzLkVSUk9SLFxuICAgIGRhdGE6ICdwYXJzZXIgZXJyb3I6ICcgKyBtc2dcbiAgfTtcbn1cbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgYnVmZmVyIG9yIGFuIGFycmF5YnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzQnVmKG9iaikge1xuICByZXR1cm4gKGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopKSB8fFxuICAgICAgICAgKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgQXJyYXlCdWZmZXIuaXNWaWV3KG9iaikpKTtcbn1cbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJyMwMDAwQ0MnLCAnIzAwMDBGRicsICcjMDAzM0NDJywgJyMwMDMzRkYnLCAnIzAwNjZDQycsICcjMDA2NkZGJywgJyMwMDk5Q0MnLFxuICAnIzAwOTlGRicsICcjMDBDQzAwJywgJyMwMENDMzMnLCAnIzAwQ0M2NicsICcjMDBDQzk5JywgJyMwMENDQ0MnLCAnIzAwQ0NGRicsXG4gICcjMzMwMENDJywgJyMzMzAwRkYnLCAnIzMzMzNDQycsICcjMzMzM0ZGJywgJyMzMzY2Q0MnLCAnIzMzNjZGRicsICcjMzM5OUNDJyxcbiAgJyMzMzk5RkYnLCAnIzMzQ0MwMCcsICcjMzNDQzMzJywgJyMzM0NDNjYnLCAnIzMzQ0M5OScsICcjMzNDQ0NDJywgJyMzM0NDRkYnLFxuICAnIzY2MDBDQycsICcjNjYwMEZGJywgJyM2NjMzQ0MnLCAnIzY2MzNGRicsICcjNjZDQzAwJywgJyM2NkNDMzMnLCAnIzk5MDBDQycsXG4gICcjOTkwMEZGJywgJyM5OTMzQ0MnLCAnIzk5MzNGRicsICcjOTlDQzAwJywgJyM5OUNDMzMnLCAnI0NDMDAwMCcsICcjQ0MwMDMzJyxcbiAgJyNDQzAwNjYnLCAnI0NDMDA5OScsICcjQ0MwMENDJywgJyNDQzAwRkYnLCAnI0NDMzMwMCcsICcjQ0MzMzMzJywgJyNDQzMzNjYnLFxuICAnI0NDMzM5OScsICcjQ0MzM0NDJywgJyNDQzMzRkYnLCAnI0NDNjYwMCcsICcjQ0M2NjMzJywgJyNDQzk5MDAnLCAnI0NDOTkzMycsXG4gICcjQ0NDQzAwJywgJyNDQ0NDMzMnLCAnI0ZGMDAwMCcsICcjRkYwMDMzJywgJyNGRjAwNjYnLCAnI0ZGMDA5OScsICcjRkYwMENDJyxcbiAgJyNGRjAwRkYnLCAnI0ZGMzMwMCcsICcjRkYzMzMzJywgJyNGRjMzNjYnLCAnI0ZGMzM5OScsICcjRkYzM0NDJywgJyNGRjMzRkYnLFxuICAnI0ZGNjYwMCcsICcjRkY2NjMzJywgJyNGRjk5MDAnLCAnI0ZGOTkzMycsICcjRkZDQzAwJywgJyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBBY3RpdmUgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VzID0gW107XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIHZhciBwcmV2VGltZTtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcbiAgZGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgZXhwb3J0cy5pbnN0YW5jZXMucHVzaChkZWJ1Zyk7XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG5mdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgdmFyIGluZGV4ID0gZXhwb3J0cy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGV4cG9ydHMuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIGk7XG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleHBvcnRzLmluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbnN0YW5jZSA9IGV4cG9ydHMuaW5zdGFuY2VzW2ldO1xuICAgIGluc3RhbmNlLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQoaW5zdGFuY2UubmFtZXNwYWNlKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRvQXJyYXlcblxuZnVuY3Rpb24gdG9BcnJheShsaXN0LCBpbmRleCkge1xuICAgIHZhciBhcnJheSA9IFtdXG5cbiAgICBpbmRleCA9IGluZGV4IHx8IDBcblxuICAgIGZvciAodmFyIGkgPSBpbmRleCB8fCAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJheVtpIC0gaW5kZXhdID0gbGlzdFtpXVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxufVxuIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaCAoZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6LV8nLnNwbGl0KCcnKVxuICAsIGxlbmd0aCA9IDY0XG4gICwgbWFwID0ge31cbiAgLCBzZWVkID0gMFxuICAsIGkgPSAwXG4gICwgcHJldjtcblxuLyoqXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuICB2YXIgZW5jb2RlZCA9ICcnO1xuXG4gIGRvIHtcbiAgICBlbmNvZGVkID0gYWxwaGFiZXRbbnVtICUgbGVuZ3RoXSArIGVuY29kZWQ7XG4gICAgbnVtID0gTWF0aC5mbG9vcihudW0gLyBsZW5ndGgpO1xuICB9IHdoaWxlIChudW0gPiAwKTtcblxuICByZXR1cm4gZW5jb2RlZDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGludGVnZXIgdmFsdWUgc3BlY2lmaWVkIGJ5IHRoZSBnaXZlbiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgaW50ZWdlciB2YWx1ZSByZXByZXNlbnRlZCBieSB0aGUgc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICB2YXIgZGVjb2RlZCA9IDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICB9XG5cbiAgcmV0dXJuIGRlY29kZWQ7XG59XG5cbi8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHllYXN0KCkge1xuICB2YXIgbm93ID0gZW5jb2RlKCtuZXcgRGF0ZSgpKTtcblxuICBpZiAobm93ICE9PSBwcmV2KSByZXR1cm4gc2VlZCA9IDAsIHByZXYgPSBub3c7XG4gIHJldHVybiBub3cgKycuJysgZW5jb2RlKHNlZWQrKyk7XG59XG5cbi8vXG4vLyBNYXAgZWFjaCBjaGFyYWN0ZXIgdG8gaXRzIGluZGV4LlxuLy9cbmZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBgeWVhc3RgLCBgZW5jb2RlYCBhbmQgYGRlY29kZWAgZnVuY3Rpb25zLlxuLy9cbnllYXN0LmVuY29kZSA9IGVuY29kZTtcbnllYXN0LmRlY29kZSA9IGRlY29kZTtcbm1vZHVsZS5leHBvcnRzID0geWVhc3Q7XG4iLCJpbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IGxvZyBmcm9tIFwiLi4vLi4vbG9nc1wiXG5pbXBvcnQgQ2FtZXJhIGZyb20gXCIuLi8uLi9lbmdpbmUvY2FtZXJhXCI7XG5pbXBvcnQgdW5pdHMgZnJvbSBcIi4uLy4uL3VuaXRzXCI7XG5pbXBvcnQgZXZlbnRzIGZyb20gXCIuLi8uLi9lbmdpbmUvZXZlbnRzXCI7XG5pbXBvcnQgaGVybyBmcm9tICcuLi8uLi9lbmdpbmUvaGVybyc7XG5pbXBvcnQgY2hhcmFjdGVycyBmcm9tIFwiLi4vLi4vY2hhcmFjdGVyc1wiO1xuaW1wb3J0IFVuaXQgZnJvbSBcIi4uLy4uL2VuZ2luZS91bml0XCI7XG5pbXBvcnQgVGVsZXBvcnQgZnJvbSBcIi4uLy4uL2VuZ2luZS90ZWxlcG9ydFwiO1xuaW1wb3J0IFJvb20gZnJvbSBcIi4uLy4uL2VuZ2luZS9yb29tXCI7XG5pbXBvcnQgTG9vdCBmcm9tIFwiLi4vLi4vZW5naW5lL2xvb3RcIjtcbmltcG9ydCB1aSBmcm9tIFwiLi4vLi4vZW5naW5lL3VpL3VpXCI7XG5pbXBvcnQgY29udHJvbGxlciBmcm9tIFwiLi4vLi4vZW5naW5lL2NvbnRyb2xsZXJcIjtcbmltcG9ydCBzb3VuZHMgZnJvbSBcIi4uLy4uL3NvdW5kc1wiO1xuaW1wb3J0IGVudGl0aWVzIGZyb20gXCIuLi8uLi9lbnRpdGllc1wiO1xuXG4vKipcbiAqINCe0YHQvdC+0LLQvdCw0Y8g0YHRhtC10L3QsCAtINGB0L7QsdGB0YLQstC10L3QvdC+INC40LPRgNCwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtzdGFydCwgc3RvcH1cblxuLy8g0JfQsNC/0YPRgdGC0LjQvCDQv9C+INC+0LrQvtC90YfQsNC90LjQuCDQuNCz0YDRi1xubGV0XG4gICAgZmluYWxDYWxsYmFjayA9IG51bGwsXG4gICAgaW50ZXJ2YWwgPSBudWxsO1xuXG5sZXQgcm9vbXMgPSB7fSxcbiAgICByb29tX2lkID0gbnVsbCxcbiAgICByb29tID0gbnVsbCxcblxuICAgIC8vINCa0LDQvNC10YDQsC4g0KHQvtCy0LzQtdGJ0LXQvdCwINGB0L4g0LLRitGO0L/QvtGA0YLQvtC8XG4gICAgY2FtZXJhID0gbnVsbCxcbiAgICBsb290cyA9IHt9LFxuICAgIHRlbGVwb3J0cyA9IHt9O1xuXG5cbmZ1bmN0aW9uIHN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgZmluYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgcm9vbXMgPSB7fTtcblxuICAgIC8vINCi0LXQutGD0YnQsNGPINC60L7QvNC90LDRgtCwLiBpZCDQuCDRgdCw0LzQsFxuICAgIHJvb21faWQgPSBudWxsO1xuICAgIHJvb20gPSBudWxsO1xuXG4gICAgLy8g0JLQtdGB0Ywg0LvRg9GCXG4gICAgbG9vdHMgPSB7fTtcblxuICAgIC8vINCi0LXQu9C10L/QvtGA0YLRi1xuICAgIHRlbGVwb3J0cyA9IHt9O1xuXG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAvLyDQodC+0LfQtNCw0LTQuNC8INC60LDQvNC10YDRgyDQv9C+IFwi0LrQsNC90LLQtVwiXG4gICAgY2FtZXJhID0gbmV3IENhbWVyYSgwLCAwLCBjYW52YXMpO1xuICAgIC8vINC40LfQvNC10L3Rj9C10Lwg0LrQsNC80LXRgNGDINC/0L7QtCDQvtC60L3QvlxuICAgIGNhbWVyYS5yZXNpemUoKTtcblxuICAgIC8v0J/RgNC4INGA0LXRgdCw0LnQt9C1INC+0LrQvdCwINCx0YDQsNGD0LfQtdGA0LAgLSDQuNC30LzQtdC90Y/QtdC8INC60LDQvNC10YDRgyDQv9C+0LQg0L7QutC90L5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge2NhbWVyYS5yZXNpemUoKTt9KTtcblxuXG4gICAgZXZlbnRzLm9uKFwiZGlzY29ubmVjdFwiLCAoKT0+e1xuICAgICAgICBzdG9wKCk7XG4gICAgICAgIHVuaXRzLnJlc2V0KCk7XG4gICAgICAgIGxvb3RzID0ge307XG4gICAgICAgIGhlcm8udW5pdCA9IG51bGw7XG4gICAgICAgIGVudGl0aWVzLnJlc2V0KCk7XG4gICAgICAgIHVpLnRvcDEwLnN0b3AoKTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihcInJlY29ubmVjdFwiLCBvblJlY29ubmVjdCk7XG4gICAgZXZlbnRzLm9uKFwicm9vbVwiLCBvblJvb20pO1xuICAgIGV2ZW50cy5vbihcImhlcm9cIiwgb25IZXJvKTtcbiAgICBldmVudHMub24oXCJzb3VuZFwiLCBvblNvdW5kKTtcblxuICAgIGV2ZW50cy5vbihcImNsaWNrXCIsIChldmVudE5hbWUsIHBvcyk9PntcbiAgICAgICAgaWYocG9zKSB7XG4gICAgICAgICAgICBlbnRpdGllcy5hZGQocG9zLngsIHBvcy55LCAncG9pbnRlcicsIC4zKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdWkudG9wMTAuc3RhcnQoKTtcblxuXG4gICAgLyoqXG4gICAgICog0J7RgdC90L7QstC90L7QuSDRhtC40LrQu1xuICAgICAqL1xuICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgIC8vINCf0LXRgNC10LzQtdGJ0LXQvdC40LUsINGD0L/RgNCw0LLQu9GP0LXQvNC+0LUg0L3QsCDQutC70LjQtdC90YLQtVxuICAgICAgICB1cGRhdGUoKTtcblxuXG4gICAgICAgIC8vINCQ0L3QuNC80LDRhtC40Y9cbiAgICAgICAgYW5pbWF0ZSgpO1xuXG5cbiAgICAgICAgLy8g0J7RgtGA0LjRgdC+0LLQutCwXG4gICAgICAgIGRyYXcoY2FtZXJhKTtcblxuXG4gICAgfSwgY29uc3RhbnRzLklOVEVSVkFMKTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICBldmVudHMub2ZmKFwicmVjb25uZWN0XCIsIG9uUmVjb25uZWN0KTtcbiAgICBldmVudHMub2ZmKFwicm9vbVwiLCBvblJvb20pO1xuICAgIGV2ZW50cy5vZmYoXCJoZXJvXCIpO1xuICAgIGV2ZW50cy5vZmYoXCJzb3VuZFwiKTtcblxuICAgIGV2ZW50cy5vZmYoXCJjbGlja1wiKTtcblxuICAgIGZpbmFsQ2FsbGJhY2soKTtcbn1cblxuZnVuY3Rpb24gb25SZWNvbm5lY3QoZXZlbnQsIHR5cGUsIGRhdGEpIHtcbiAgICBsb2coJ9C+0YIg0YHQtdGA0LLQtdGA0LAg0L/QvtGB0YLRg9C/0LjQuyByZWNvbm5lY3QnKTtcbiAgICB1bml0cy5yZXNldCgpO1xuICAgIGxvb3RzID0ge307XG4gICAgaGVyby51bml0ID0gbnVsbDtcbn1cblxuLyoqXG4gKiDQodC+0LHRi9GC0LjRjyBcInJvb21cIlxuICogQHBhcmFtIGV2ZW50XG4gKiBAcGFyYW0gdHlwZVxuICogQHBhcmFtIGRhdGFcbiAqL1xuZnVuY3Rpb24gb25Sb29tKGV2ZW50LCB0eXBlLCBkYXRhKSB7XG5cbiAgICAvLyDQn9C+0LvRg9GH0LXQvdC40LUg0LrQvtC80L3QsNGC0YtcbiAgICBpZih0eXBlPT1cImNoYW5nZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5yb29tKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIHJvb20gPSBkYXRhLnJvb207XG5cbiAgICAgICAgICAgIGlmIChyb29tLklEPT11bmRlZmluZWQgfHwgIXJvb20ud2lkdGggfHwgIXJvb20uaGVpZ2h0IHx8IHJvb20uZW52aXJvbm1lbnRfaWQ9PXVuZGVmaW5lZCkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHJvb21Jbml0KHJvb20pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0JrQvtC80L3QsNGC0YsuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQuNCz0YDQvtC60LBcbiAgICBpZih0eXBlPT1cInBsYXllci1jcmVhdGVcIikgeyAvL1RPRE86INC/0LXRgNC10LjQvNC10L3QvtCy0LDRgtGMINCyIHVuaXQtY3JlYXRlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cblxuICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IGNoYXJhY3RlcnNbaW5mby5jaGFyYWN0ZXJfaWRdIHx8IGNoYXJhY3RlcnNbXCJtYW5cIl07XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXQgPSBuZXcgVW5pdChpbmZvLnJvb21faWQsIGluZm8ueCwgaW5mby55LCBpbmZvLndpZHRoLCBpbmZvLmhlaWdodCwgY2hhcmFjdGVyLCBpbmZvLklELCBpbmZvLnN0YXRlLCBpbmZvLmxldmVsKTtcbiAgICAgICAgICAgIHVuaXRzLmFkZChpbmZvLklELCB1bml0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINC40LPRgNC+0LrQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+0LEg0LjQs9GA0L7QutC1XG4gICAgaWYodHlwZT09XCJwbGF5ZXItaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGxldCB1bml0ID0gdW5pdHMuaXRlbShpbmZvLklEKTtcbiAgICAgICAgICAgIGlmKHVuaXQpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzW2luZm8uY2hhcmFjdGVyX2lkXSB8fCBjaGFyYWN0ZXJzW1wibWFuXCJdXG5cbiAgICAgICAgICAgICAgICB1bml0LnNldChpbmZvLnJvb21faWQsIGluZm8ueCwgaW5mby55LCBjaGFyYWN0ZXIsIGluZm8uSUQsIGluZm8uc3RhdGUsIGluZm8ubGV2ZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQvtCx0L3QvtCy0LvQtdC90LjRjyDQuNCz0YDQvtC60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNCz0YDQvtC6INGD0YjQtdC7XG4gICAgaWYodHlwZT09XCJwbGF5ZXItbGVhdmVcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuSUQpIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBpZihkYXRhLnJvb21faWQ9PXJvb21faWQpIHtcbiAgICAgICAgICAgICAgICB1bml0cy5yZW1vdmUoZGF0YS5JRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINGD0LTQsNC70LXQvdC40Y8g0LjQs9GA0L7QutCwLiBcIitlKTtcbiAgICAgICAgICAgIGxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8g0JjQvdGE0L7RgNC80LDRhtC40Y8g0L4g0LvRg9GC0LVcbiAgICBpZih0eXBlPT1cImxvb3QtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hhcmFjdGVyID0gY2hhcmFjdGVyc1tpbmZvLmNoYXJhY3Rlcl9pZF0gfHwgY2hhcmFjdGVyc1tcImdvbGRfY29pblwiXVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uSUQgaW4gbG9vdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vdHNbaW5mby5JRF0uc2V0KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGNoYXJhY3RlciwgaW5mby5JRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0LvRg9GC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtC10LvQtdC/0L7RgNGC0LDRhVxuICAgIGlmKHR5cGU9PVwidGVsZXBvcnQtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaW5mby5yb29tX2lkPT1yb29tX2lkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5JRCBpbiB0ZWxlcG9ydHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVsZXBvcnRzW2luZm8uSURdLnNldChpbmZvLnN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgtC10LvQtdC/0L7RgNGC0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQodC+0LfQtNCw0L3QuNC1INC90L7QstC+0LPQviDQvNC+0LHQsFxuICAgIGlmKHR5cGU9PVwibnBjLWNyZWF0ZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG5cbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzW2luZm8uY2hhcmFjdGVyX2lkXSB8fCBjaGFyYWN0ZXJzW1wiZ29iXCJdO1xuXG4gICAgICAgICAgICBjb25zdCB1bml0ID0gbmV3IFVuaXQoaW5mby5yb29tX2lkLCBpbmZvLngsIGluZm8ueSwgaW5mby53aWR0aCwgaW5mby5oZWlnaHQsIGNoYXJhY3RlciwgaW5mby5JRCwgaW5mby5zdGF0ZSk7XG4gICAgICAgICAgICB1bml0cy5hZGQoaW5mby5JRCwgdW5pdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDQvNC+0LHQsC4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vINCY0L3RhNC+0YDQvNCw0YbQuNGPINC+INC80L7QsdC1XG4gICAgaWYodHlwZT09XCJucGMtaW5mb1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBsZXQgdW5pdCA9IHVuaXRzLml0ZW0oaW5mby5JRCk7XG4gICAgICAgICAgICBpZih1bml0KSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hhcmFjdGVyID0gY2hhcmFjdGVyc1tpbmZvLmNoYXJhY3Rlcl9pZF0gfHwgY2hhcmFjdGVyc1tcImdvYlwiXVxuXG4gICAgICAgICAgICAgICAgdW5pdC5zZXQoaW5mby5yb29tX2lkLCBpbmZvLngsIGluZm8ueSwgY2hhcmFjdGVyLCBpbmZvLklELCBpbmZvLnN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L7QsdC90L7QstC70LXQvdC40Y8g0LzQvtCx0LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkhlcm8oZXZlbnQsIHR5cGUsIGRhdGEpIHtcblxuICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LPQtdGA0L7RjyDQv9GA0Lgg0LLRhdC+0LTQtVxuICAgIGlmKHR5cGU9PVwiaGVyby1jcmVhdGVcIikge1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIGlmICghZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnkgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jaGFyYWN0ZXJfaWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5yb29tX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3RhdGUgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5jb2luc19jb3VudCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ubGV2ZWx1cENvdW50ZXIgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5zcGVlZCA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IGNoYXJhY3RlciA9IGNoYXJhY3RlcnNbaW5mby5jaGFyYWN0ZXJfaWRdIHx8IGNoYXJhY3RlcnNbXCJkb2NcIl07XG5cbiAgICAgICAgICAgIGlmKCFoZXJvLnVuaXQpIHtcbiAgICAgICAgICAgICAgICBoZXJvLnVuaXQgPSBuZXcgVW5pdChpbmZvLnJvb21faWQsIGluZm8ueCwgaW5mby55LCBpbmZvLndpZHRoLCBpbmZvLmhlaWdodCwgY2hhcmFjdGVyLCAnWycraW5mby5JRCsnXScsIGluZm8uc3RhdGUsIGluZm8ubGV2ZWwsIGluZm8uY29pbnNfY291bnQsIGluZm8ubGV2ZWx1cENvdW50ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBoZXJvLnVuaXQuc2V0KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGNoYXJhY3RlciwgJ1snK2luZm8uSUQrJ10nLCBpbmZvLnN0YXRlLCBpbmZvLmxldmVsLCBpbmZvLmNvaW5zX2NvdW50LCBpbmZvLmxldmVsdXBDb3VudGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdW5pdHMuYWRkKCdbJytpbmZvLklEKyddJywgaGVyby51bml0KTtcblxuICAgICAgICAgICAgaGVyby5zcGVlZCA9IGluZm8uc3BlZWQ7XG5cbiAgICAgICAgICAgIHVpLmhlcm9JbmZvLnN0YXJ0KCk7XG4gICAgICAgICAgICB1aS5oZXJvSW5mby51cGRhdGUoaW5mbyk7XG5cbiAgICAgICAgICAgIHVpLndhaXRTY3JlZW4uaGlkZSgpO1xuXG4gICAgICAgICAgICBjb250cm9sbGVyLnN0YXJ0KCk7XG4gICAgICAgICAgICBjb250cm9sbGVyLnNldENsaWNrUGFkKGNhbWVyYSk7XG5cbiAgICAgICAgICAgIC8v0JXRgdC70Lgg0YLQutGD0YnQsNGPINC60L7QvNC90LDRgtCwINC+0YLRgdGD0YLRgdGC0LLRg9C10YIg0LjQu9C4INC90LUg0YLQsCAtINGI0LvQtdC8INC90LAg0YHQtdGA0LLQtdGAINC30LDQv9GA0L7RgVxuICAgICAgICAgICAgaWYoIXJvb21faWQgfHwgcm9vbV9pZCAhPSBpbmZvLnJvb21faWQpIHtcbiAgICAgICAgICAgICAgICByb29tX2lkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBldmVudHMuYWRkKCduZWVkLXJvb20nLCBpbmZvLnJvb21faWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FtZXJhICYmIGNhbWVyYS5zZXRGb2xsb3dlcihoZXJvLnVuaXQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKXtcbiAgICAgICAgICAgIGxvZyhcItCe0YjQuNCx0LrQsCDRgdC+0LfQtNCw0L3QuNGPINCT0LXRgNC+0Y8uIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyDQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDQs9C10YDQvtC1XG4gICAgaWYodHlwZT09XCJoZXJvLWluZm9cIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWRhdGEuaW5mbykgdGhyb3cgXCLQntGI0LjQsdC60LAg0L/QvtC70YPRh9C10L3QuNGPINGBINGB0LXRgNCy0LXRgNCwXCI7XG5cbiAgICAgICAgICAgIHZhciBpbmZvID0gZGF0YS5pbmZvO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaW5mby5JRCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnggPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby55ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY2hhcmFjdGVyX2lkID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ucm9vbV9pZCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLnN0YXRlID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uY29pbnNfY291bnQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby5sZXZlbCA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLmxldmVsdXBDb3VudGVyID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8uc3BlZWQgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHRocm93IFwi0J7RiNC40LHQutCwINC/0L7Qu9GD0YfQtdC90LjRjyDRgSDRgdC10YDQstC10YDQsFwiO1xuXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJzW2luZm8uY2hhcmFjdGVyX2lkXSB8fCBjaGFyYWN0ZXJzW1wiZG9jXCJdXG4gICAgICAgICAgICBoZXJvLnVuaXQuc2V0KGluZm8ucm9vbV9pZCwgaW5mby54LCBpbmZvLnksIGNoYXJhY3RlciwgJ1snK2luZm8uSUQrJ10nLCBpbmZvLnN0YXRlLCBpbmZvLmxldmVsLCBpbmZvLmNvaW5zX2NvdW50LCBpbmZvLmxldmVsdXBDb3VudGVyKTtcblxuICAgICAgICAgICAgaGVyby5zcGVlZCA9IGluZm8uc3BlZWQ7XG5cbiAgICAgICAgICAgIHVpLmhlcm9JbmZvLnVwZGF0ZShpbmZvLCBpbmZvLklEKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSl7XG4gICAgICAgICAgICBsb2coXCLQntGI0LjQsdC60LAg0L7QsdC90L7QstC70LXQvdC40Y8g0JPQtdGA0L7Rjy4gXCIrZSk7XG4gICAgICAgICAgICBsb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uU291bmQoZXZlbnQsIHR5cGUsIGRhdGEpIHtcbiAgICAvLyDQt9Cy0YPQutC+0LLRi9C1INGD0LLQtdC00L7QvNC70LXQvdC40Y9cbiAgICBpZih0eXBlPT1cIm5vdGljZVwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZighZGF0YS5pbmZvKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgdmFyIGluZm8gPSBkYXRhLmluZm87XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpbmZvLnJvb21faWQgPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgaW5mby54ID09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGluZm8ueSA9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBpbmZvLklEID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgKSB0aHJvdyBcItCe0YjQuNCx0LrQsCDQv9C+0LvRg9GH0LXQvdC40Y8g0YEg0YHQtdGA0LLQtdGA0LBcIjtcblxuICAgICAgICAgICAgaWYoaGVybyAmJiBoZXJvLnVuaXQgJiYgaGVyby51bml0LnJvb21faWQgPT0gaW5mby5yb29tX2lkKSB7IC8vVE9ETzog0L3QtSDRjtC90LjRgiwg0LAg0LrQsNC80LXRgNCwXG4gICAgICAgICAgICAgICAgaWYoaW5mby5JRCBpbiBzb3VuZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiDQv9C+IGluZm8ueCwgaW5mby55INC+0L/RgNC10LTQtdC70Y/RgtGMINC60LDQuiDQtNCw0LvQtdC60L4g0L7RgiBoZXJvINC4INC00LXQu9Cw0YLRjCDQs9GA0L7QvNC60L7RgdGC0YxcbiAgICAgICAgICAgICAgICAgICAgc291bmRzW2luZm8uSURdLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpe1xuICAgICAgICAgICAgbG9nKFwi0J7RiNC40LHQutCwINC30LLRg9C60LAuIFwiK2UpO1xuICAgICAgICAgICAgbG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqINCf0LXRgNC10LzQtdGJ0LXQvdC40LUg0L3QsCDQutC70LjQtdC90YLQtVxuICogINGC0L4sINGH0YLQviDQvdC1INGD0L/RgNCw0LLQu9GP0LXRgtGB0Y8g0YEg0YHQtdGA0LLQtdGA0LAuINCd0LDQv9GA0LjQvNC10YAg0LrQsNC80LXRgNCwXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSgpe1xuXG4gICAgLy/QmtCw0LzQtdGA0LBcbiAgICBjYW1lcmEgJiYgY2FtZXJhLnJ1bihyb29tKTtcblxuICAgIC8v0KPQtNCw0LvQuNC8INC+0YLRgNCw0LHQvtGC0LDQstGI0LjQtSDRgdGD0YnQvdC+0YHRgtC4XG4gICAgZW50aXRpZXMuZWFjaCgoZW50aXR5LCBpbmRleCk9PntcbiAgICAgICAgaWYoZW50aXR5LmlzRGllKCkpe1xuICAgICAgICAgICAgZW50aXRpZXMucmVtb3ZlKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cblxuLyoqXG4gKiDQkNC90LjQvNCw0YbQuNGPXG4gKi9cbmZ1bmN0aW9uIGFuaW1hdGUoKXtcblxuICAgIC8v0K7QvdC40YLRiyAo0LLQutC70Y7Rh9Cw0Y8g0YHQsNC80L7Qs9C+INCz0LXRgNC+0Y8pXG4gICAgZm9yIChjb25zdCB1bml0IG9mIHVuaXRzLnRvQXJyYXkoKSkge1xuICAgICAgICBpZih1bml0LnJvb21faWQ9PXJvb21faWQpIHtcbiAgICAgICAgICAgIHVuaXQuYW5pbWF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/Qm9GD0YJcbiAgICBmb3IgKGxldCBpIGluIGxvb3RzKSB7XG4gICAgICAgIGxvb3RzW2ldLmFuaW1hdGUoY29uc3RhbnRzLlNURVApO1xuICAgIH1cblxuICAgIC8v0KLQtdC70LXQv9C+0YDRgtGLXG4gICAgZm9yIChsZXQgaSBpbiB0ZWxlcG9ydHMpIHtcbiAgICAgICAgdGVsZXBvcnRzW2ldLmFuaW1hdGUoY29uc3RhbnRzLlNURVApO1xuICAgIH1cblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goIChlbnRpdHkpID0+IHtcbiAgICAgICAgZW50aXR5LmFuaW1hdGUoKTtcbiAgICB9KTtcblxufVxuXG5cbi8qKlxuICog0J7RgtGA0LjRgdC+0LLQutCwINC90LAg0LrQsNC80LXRgNGDXG4gKiBAcGFyYW0gY2FtZXJhXG4gKiBUT0RPOiDQv9C+0YDRj9C00L7QuiDQvtGC0YDQuNGB0L7QstC60LghXG4gKi9cbmZ1bmN0aW9uIGRyYXcoY2FtZXJhKXtcblxuICAgIC8vINCa0L7QvNC90LDRgtCwXG4gICAgcm9vbSAmJiByb29tLmRyYXcoY2FtZXJhKTtcblxuICAgIC8vINCi0LXQu9C10L/QvtGA0YLRi1xuICAgIGZvciAobGV0IGkgaW4gdGVsZXBvcnRzKSB7XG4gICAgICAgIHRlbGVwb3J0c1tpXS5kcmF3KGNhbWVyYSk7XG4gICAgfVxuXG5cbiAgICBsZXQgcmVuZGVyQXJyYXkgPSBbXTtcblxuICAgIC8vINCb0YPRglxuICAgIGZvciAobGV0IGkgaW4gbG9vdHMpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSBsb290c1tpXTtcbiAgICAgICAgcmVuZGVyQXJyYXkucHVzaCh7eTogaXRlbS55LCBpdGVtOiBpdGVtfSk7XG4gICAgfVxuXG4gICAgLy/QrtC90LjRgtGLXG4gICAgZm9yIChsZXQgdW5pdCBvZiB1bml0cy50b0FycmF5KCkpIHtcbiAgICAgICAgaWYodW5pdC5yb29tX2lkPT1yb29tX2lkKSB7XG4gICAgICAgICAgICByZW5kZXJBcnJheS5wdXNoKHt5OiB1bml0LnksIGl0ZW06IHVuaXR9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v0KHRg9GJ0L3QvtGB0YLQuFxuICAgIGVudGl0aWVzLmVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgIHJlbmRlckFycmF5LnB1c2goe3k6IGl0ZW0ueSwgaXRlbTogaXRlbX0pO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyQXJyYXkuc29ydCgoYSwgYik9PntcbiAgICAgICAgcmV0dXJuIGEueSAtIGIueTtcbiAgICB9KTtcblxuICAgIGZvcihsZXQgaSBpbiByZW5kZXJBcnJheSl7XG4gICAgICAgIHJlbmRlckFycmF5W2ldLml0ZW0uZHJhdyhjYW1lcmEpO1xuICAgIH1cblxufVxuXG5cblxuLyoqXG4gKiDQo9GB0YLQsNC90L7QstC60LAg0L7RgtC+0LHRgNCw0LbQsNC10LzQvtC5INC60L7QvNC90LDRgtGLXG4gKiBAcGFyYW0gSURcbiAqIEBwYXJhbSB3aWR0aFxuICogQHBhcmFtIGhlaWdodFxuICogQHBhcmFtIGVudmlyb25tZW50X2lkXG4gKi9cbmZ1bmN0aW9uIHJvb21Jbml0KHNldHRpbmdzKXtcblxuICAgIC8v0JfQsNGH0LjRgdGC0LjQvCDQtdGB0LvQuCDQvdC1INCy0L/QtdGA0LLQvtC5XG4gICAgZm9yKGxldCBpIGluIGxvb3RzKXsgZGVsZXRlIGxvb3RzW2ldO31cbiAgICBmb3IobGV0IGkgaW4gdGVsZXBvcnRzKXsgZGVsZXRlIHRlbGVwb3J0c1tpXTt9XG4gICAgbG9vdHMgPSB7fTtcbiAgICB0ZWxlcG9ydHMgPSB7fTtcbiAgICByb29tID0gbnVsbDtcblxuXG4gICAgcm9vbV9pZCA9IHNldHRpbmdzLklEO1xuXG4gICAgLy8g0KHQtNC10LvQsNC10Lwg0LrQvtC80L3QsNGC0YMg0LjQu9C4INCy0L7Qt9C80LXQvCDQuNC3INC60LXRiNCwXG4gICAgaWYoc2V0dGluZ3MuSUQgaW4gcm9vbXMpe1xuICAgICAgICByb29tID0gcm9vbXNbc2V0dGluZ3MuSURdO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByb29tID0gbmV3IFJvb20oc2V0dGluZ3Mud2lkdGgsIHNldHRpbmdzLmhlaWdodCwgc2V0dGluZ3MuZW52aXJvbm1lbnRfaWQpO1xuICAgICAgICByb29tc1tzZXR0aW5ncy5JRF0gPSByb29tO1xuICAgIH1cblxuICAgIGlmKCdsb290JyBpbiBzZXR0aW5ncyl7XG4gICAgICAgIGZvcihjb25zdCBpdGVtIG9mIHNldHRpbmdzLmxvb3Qpe1xuXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyID0gY2hhcmFjdGVyc1tpdGVtLmNoYXJhY3Rlcl9pZF0gfHwgY2hhcmFjdGVyc1tcImNvaW5fZ29sZFwiXVxuXG4gICAgICAgICAgICBsb290c1tpdGVtLklEXSA9IG5ldyBMb290KHJvb21faWQsIGl0ZW0ueCwgaXRlbS55LCBjaGFyYWN0ZXIsIGl0ZW0uSUQsIGl0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKCd0ZWxlcG9ydHMnIGluIHNldHRpbmdzKXtcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2Ygc2V0dGluZ3MudGVsZXBvcnRzKXtcblxuICAgICAgICAgICAgbGV0IGNoYXJhY3RlciA9IGNoYXJhY3RlcnNbaXRlbS5jaGFyYWN0ZXJfaWRdIHx8IGNoYXJhY3RlcnNbXCJ0ZWxlcG9ydFwiXVxuXG4gICAgICAgICAgICB0ZWxlcG9ydHNbaXRlbS5JRF0gPSBuZXcgVGVsZXBvcnQocm9vbV9pZCwgaXRlbS54LCBpdGVtLnksIGNoYXJhY3RlciwgaXRlbS5JRCwgaXRlbS50YXJnZXQsIGl0ZW0uc3RhdGUsIGl0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCB7c3RhcnQsIHN0b3B9O1xuXG5cbmNvbnN0IGxvZ2luX3BhbmVsRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcGFuZWxcIik7XG5jb25zdCBsb2dpbl9mb3JtRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tZm9ybVwiKTtcbmNvbnN0IGxvZ2luX2lucHV0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4taW5wdXRcIik7XG5cblxubGV0IGZpbmFsQ2FsbGJhY2sgPSBudWxsO1xuXG5sZXQgdGltZW91dCA9IG51bGw7XG5cblxuLy8g0JLRi9Cy0LXQtNC10Lwg0L7QutC90L4g0LDQstGC0L7RgNC40LfQsNGG0LjQuC4g0JzQvtC00LDQu9GM0L3QvtC1XG5mdW5jdGlvbiBzdGFydChsb2dpbiwgY2FsbGJhY2spIHtcblxuICAgIGZpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgIGlmKGxvZ2luICYmIGxvZ2luX2lucHV0RWxlbWVudCl7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSA9IGxvZ2luXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXl1cEhhbmRsZXIsIGZhbHNlKTtcblxuICAgIHNob3coKTtcblxuICAgIGxvZ2luX2lucHV0RWxlbWVudC5mb2N1cygpO1xufVxuXG5cbi8vINCX0LDQutGA0L7QtdC8INC+0LrQvdC+INCw0LLRgtC+0YDQuNC30LDRhtC40LhcbmZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXl1cEhhbmRsZXIsIGZhbHNlKTtcbiAgICBoaWRlKCk7XG59XG5cblxuLy8g0J7QsdGA0LDQsdC+0YLRh9C40Log0LrQu9Cw0LLQuNGIXG5mdW5jdGlvbiBrZXl1cEhhbmRsZXIoZSkge1xuICAgIGxldCBvYmogPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgbGV0IGtleSA9IGUua2V5Q29kZTtcblxuICAgIGlmKGtleT09MTMgJiYgdmFsaWRhdGUobG9naW5faW5wdXRFbGVtZW50LnZhbHVlKSl7XG5cbiAgICAgICAgc3RvcCgpO1xuICAgICAgICBmaW5hbENhbGxiYWNrKGxvZ2luX2lucHV0RWxlbWVudC52YWx1ZSk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICAgIC8v0YHQuNC80LLQvtC70Ysg0YDQsNC30YDQtdGI0LXQvdC90YvQtSDQsiDQu9C+0LPQuNC90LVcbiAgICAvXlthLXpBLVowLTkgKy5cXC1fOlwiKCldKj8kLy50ZXN0KG9iai52YWx1ZSkgJiZcbiAgICBvYmoudmFsdWUubGVuZ3RoIDwgMTAgLy8g0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPINC00LvQuNC90LAg0LvQvtCz0LjQvdCwXG4gICAgKSB7XG4gICAgICAgIG9iai5kZWZhdWx0VmFsdWUgPSBvYmoudmFsdWU7XG5cbiAgICAgICAgbG9naW5faW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZjRjYjRhJztcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBvYmoudmFsdWUgPSBvYmouZGVmYXVsdFZhbHVlO1xufVxuXG4vLyDQn9GA0L7QstC10YDQutCwINCy0LLQtdC00LXQvdC90L7Qs9C+INC4INC40L3QtNC40LrQsNGG0LjRjyDQvtGI0LjQsdC60LhcbmZ1bmN0aW9uIHZhbGlkYXRlKGxvZ2luKSB7XG5cbiAgICBpZihsb2dpbi5sZW5ndGg+MCkgcmV0dXJuIHRydWU7XG5cblxuICAgIGxvZ2luX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9JyNmZjAwMDgnO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9JyNmNGNiNGEnO1xuICAgIH0sIDIwMCk7XG5cbn1cblxuLy8g0J7QsdGA0LDQsdC+0YLQutCwINC60LvQuNC60L7QslxuZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXG5cbiAgICAvLyDQldGB0LvQuCDQvdCw0LbQsNC70LggXCLQktC+0LnRgtC4XCIg0Lgg0LvQvtCz0LjQvSDQvdC+0YDQvCAtINC30LDQv9GD0YHRgtC40Lwg0YTRg9C90LrRhtC40Y4g0LLRhdC+0LTQsFxuICAgIGlmKHRhcmdldC5pZD09J2xvZ2luLWJ1dHRvbicgJiYgdmFsaWRhdGUobG9naW5faW5wdXRFbGVtZW50LnZhbHVlKSl7XG5cbiAgICAgICAgc3RvcCgpO1xuXG4gICAgICAgIGZpbmFsQ2FsbGJhY2sobG9naW5faW5wdXRFbGVtZW50LnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvZ2luX2lucHV0RWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHJldHVybiBmYWxzZTtcbn1cblxuLy/Qn9C+0LrQsNC30LDRgtGMINC+0LrQvdC+INCy0YXQvtC00LBcbmZ1bmN0aW9uIHNob3coKSB7XG4gICAgbG9naW5fcGFuZWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGxvZ2luX2Zvcm1FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuXG4vL9GB0LrRgNGL0YLRjCDQvtC60L3QviDQstGF0L7QtNCwXG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIGxvZ2luX3BhbmVsRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGxvZ2luX2Zvcm1FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59IiwiaW1wb3J0IFNvdW5kIGZyb20gXCIuL2VuZ2luZS9zb3VuZC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgXCJsZXZlbF91cFwiOiBuZXcgU291bmQoJ3NvdW5kL2Nhc2gubXAzJyksXG4gICAgXCJucGNfZWF0X2NvaW5cIjogbmV3IFNvdW5kKCdzb3VuZC9jb2luL2NvaW4zLndhdicpLFxuICAgIFwiZWF0X2NvaW5fZ29sZFwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vY29pbi53YXYnKSxcbiAgICBcImVhdF9jb2luX3NpbHZlclwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vZWF0Mi5tcDMnKSxcbiAgICBcImVhdF9jb2luX2NvcHBlclwiOiBuZXcgU291bmQoJ3NvdW5kL2NvaW4vZWF0MS5tcDMnKSxcbiAgICBcInRlbGVwb3J0XCI6IG5ldyBTb3VuZCgnc291bmQvdGVsZXBvcnQvZmxhdW5jaC53YXYnKSxcbn0iLCIvL9Ca0LDRgNGC0LjQvdC60Lgg0YHQv9GA0LDQudGC0L7QslxubGV0IHNfZG9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfZG9jJyksXG4gICAgc19wcm9mID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfcHJvZicpLFxuICAgIHNfZ29iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfZ29iJyksXG4gICAgc19naXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfZ2lybCcpLFxuICAgIHNfYmxvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19ibG9uZCcpLFxuICAgIHNfbWFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfbWFnJyksXG4gICAgc190ZWxlcG9ydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX3RlbGVwb3J0JyksXG4gICAgc19jb2lucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2NvaW5zJyksXG4gICAgdF90cmVlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X3RyZWVzJyksXG4gICAgdF9idXNocyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0X2J1c2hzJyksXG4gICAgc19wb2ludGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfcG9pbnRlcicpO1xuXG5cbi8qKlxuICog0JTQvtC60YLQvtGAXG4gKi9cbmV4cG9ydHMuZG9jID0ge1xuICAgIFwiaW1hZ2VcIjogc19kb2MsXG4gICAgXCJ3aWR0aFwiOiA2NCxcbiAgICBcImhlaWdodFwiOiA2NCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJkb2MxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzNcIiwgXCJ4XCI6IDMyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImRvYzFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZG9jMlwiLCBcInhcIjogMCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn1cbiAgICAgICAgXVxuICAgIH1cblxufTtcblxuXG4vKipcbiAqINCf0YDQvtGE0LXRgdGB0L7RgFxuICovXG5leHBvcnRzLnByb2YgPSB7XG4gICAgXCJpbWFnZVwiOiBzX3Byb2YsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImlkbGVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIC8vIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMVwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4yXCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW4zXCIsIFwieFwiOiAxOTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW40XCIsIFwieFwiOiAyNTYsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW41XCIsIFwieFwiOiAzMjAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW42XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW43XCIsIFwieFwiOiA0NDgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJydW44XCIsIFwieFwiOiA1MTIsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxuXG59O1xuXG5cbi8qKlxuICog0JPQvtCx0LvQuNC9XG4gKi9cbmV4cG9ydHMuZ29iID0ge1xuICAgIFwiaW1hZ2VcIjogc19nb2IsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjFcIiwgXCJ4XCI6IDEzMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgXSxcblxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iMlwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2IzXCIsIFwieFwiOiAwLCBcInlcIjogNjUsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I0XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjUsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2I1XCIsIFwieFwiOiA2NSwgXCJ5XCI6IDY1LCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29iNlwiLCBcInhcIjogMCwgXCJ5XCI6IDEzMCwgXCJ3aWR0aFwiOiA2NSwgXCJoZWlnaHRcIjogNjV9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvYjdcIiwgXCJ4XCI6IDY1LCBcInlcIjogMTMwLCBcIndpZHRoXCI6IDY1LCBcImhlaWdodFwiOiA2NX0sXG4gICAgICAgIF1cbiAgICB9XG5cbn07XG5cblxuLyoqXG4gKiDQlNC10LLQvtGH0LrQsFxuICovXG5leHBvcnRzLmdpcmwgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2dpcmwsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmwxXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICBdLFxuXG4gICAgICAgIFwicnVuXCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDNcIiwgXCJ4XCI6IDY0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ2lybDVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsNlwiLCBcInhcIjogNjQsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnaXJsN1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw4XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdpcmw5XCIsIFwieFwiOiAxMjgsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCR0LvQvtC90LTQuNC9XG4gKi9cbmV4cG9ydHMuYmxvbmQgPSB7XG4gICAgXCJpbWFnZVwiOiBzX2Jsb25kLFxuICAgIFwid2lkdGhcIjogMTAwLFxuICAgIFwiaGVpZ2h0XCI6IDEwMCxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kMVwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ1XCIsIFwieFwiOiAwLCBcInlcIjogMTI4LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiYmxvbmQ2XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kN1wiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImJsb25kOFwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJibG9uZDlcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQsNCzXG4gKi9cbmV4cG9ydHMubWFnID0ge1xuICAgIFwiaW1hZ2VcIjogc19tYWcsXG4gICAgXCJ3aWR0aFwiOiAxMDAsXG4gICAgXCJoZWlnaHRcIjogMTAwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJydW5cIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnMlwiLCBcInhcIjogMCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwibWFnNFwiLCBcInhcIjogNjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzVcIiwgXCJ4XCI6IDAsIFwieVwiOiAxMjgsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc2XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzdcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjQsIFwiaGVpZ2h0XCI6IDY0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJtYWc4XCIsIFwieFwiOiAxMjgsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcIm1hZzlcIiwgXCJ4XCI6IDEyOCwgXCJ5XCI6IDEyOCwgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjR9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JfQvtC70L7RgtCw0Y8g0LzQvtC90LXRgtCwXG4gKi9cbmV4cG9ydHMuY29pbl9nb2xkID0ge1xuICAgIFwiaW1hZ2VcIjogc19jb2lucyxcbiAgICBcIndpZHRoXCI6IDQ0LFxuICAgIFwiaGVpZ2h0XCI6IDQ0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQxXCIsIFwieFwiOiAyMjQsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQyXCIsIFwieFwiOiAwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkM1wiLCBcInhcIjogMzIsIFwieVwiOiA2NCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImdvbGQ0XCIsIFwieFwiOiA2NCwgXCJ5XCI6IDY0LCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiZ29sZDVcIiwgXCJ4XCI6IDk2LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkNlwiLCBcInhcIjogMTI4LCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkN1wiLCBcInhcIjogMTYwLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJnb2xkOFwiLCBcInhcIjogMTkyLCBcInlcIjogNjQsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgXVxuICAgIH1cbn07XG5cblxuLyoqXG4gKiDQodC10YDQtdCx0YDRj9C90L3QsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fc2lsdmVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19jb2lucyxcbiAgICBcIndpZHRoXCI6IDQ0LFxuICAgIFwiaGVpZ2h0XCI6IDQ0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjJcIiwgXCJ4XCI6IDIyNCwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyM1wiLCBcInhcIjogMzIsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjRcIiwgXCJ4XCI6IDY0LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI1XCIsIFwieFwiOiA5NiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic2lsdmVyNlwiLCBcInhcIjogMTI4LCBcInlcIjogMzIsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzaWx2ZXI3XCIsIFwieFwiOiAxNjAsIFwieVwiOiAzMiwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNpbHZlcjhcIiwgXCJ4XCI6IDE5MiwgXCJ5XCI6IDMyLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JzQtdC00L3QsNGPINC80L7QvdC10YLQsFxuICovXG5leHBvcnRzLmNvaW5fY29wcGVyID0ge1xuICAgIFwiaW1hZ2VcIjogc19jb2lucyxcbiAgICBcIndpZHRoXCI6IDQ0LFxuICAgIFwiaGVpZ2h0XCI6IDQ0LFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyMlwiLCBcInhcIjogMzIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyM1wiLCBcInhcIjogNjQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyNFwiLCBcInhcIjogOTYsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyNVwiLCBcInhcIjogMTI4LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcImNvcHBlcjZcIiwgXCJ4XCI6IDE2MCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJjb3BwZXI3XCIsIFwieFwiOiAxOTIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDMyLCBcImhlaWdodFwiOiAzMn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwiY29wcGVyOFwiLCBcInhcIjogMjI0LCBcInlcIjogMCwgXCJ3aWR0aFwiOiAzMiwgXCJoZWlnaHRcIjogMzJ9LFxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCU0LXRgNC10LLRjNGPXG4gKi9cbmV4cG9ydHMudHJlZXMgPSB7XG4gICAgXCJpbWFnZVwiOiB0X3RyZWVzLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDFcIiwgXCJ4XCI6IDMxMywgXCJ5XCI6IDEzNCwgXCJ3aWR0aFwiOiA2OCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDJcIiwgXCJ4XCI6IDAsIFwieVwiOiA0NTksIFwid2lkdGhcIjogNDQsIFwiaGVpZ2h0XCI6IDQyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzAzXCIsIFwieFwiOiAzMTMsIFwieVwiOiAyNzIsIFwid2lkdGhcIjogNjgsIFwiaGVpZ2h0XCI6IDY4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzA0XCIsIFwieFwiOiAzMTMsIFwieVwiOiA2NSwgXCJ3aWR0aFwiOiA2OCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDVcIiwgXCJ4XCI6IDI0NCwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1NCwgXCJoZWlnaHRcIjogNTR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDZcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDM0MCwgXCJ3aWR0aFwiOiA0NiwgXCJoZWlnaHRcIjogNDh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDdcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDE4MSwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDhcIiwgXCJ4XCI6IDMxMywgXCJ5XCI6IDM0MSwgXCJ3aWR0aFwiOiA1MCwgXCJoZWlnaHRcIjogNTJ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMDlcIiwgXCJ4XCI6IDg2LCBcInlcIjogNDU5LCBcIndpZHRoXCI6IDQwLCBcImhlaWdodFwiOiA0MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xMFwiLCBcInhcIjogMzg0LCBcInlcIjogNjYsIFwid2lkdGhcIjogNjYsIFwiaGVpZ2h0XCI6IDY2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzExXCIsIFwieFwiOiA0NTIsIFwieVwiOiAyNDAsIFwid2lkdGhcIjogNDcsIFwiaGVpZ2h0XCI6IDUyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzEyXCIsIFwieFwiOiA0MDUsIFwieVwiOiAzOTYsIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzEzXCIsIFwieFwiOiAxMjcsIFwieVwiOiA0NTksIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDMyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE0XCIsIFwieFwiOiA0NTIsIFwieVwiOiAzODksIFwid2lkdGhcIjogNDYsIFwiaGVpZ2h0XCI6IDQ0fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE1XCIsIFwieFwiOiAzODQsIFwieVwiOiAxMzMsIFwid2lkdGhcIjogNjYsIFwiaGVpZ2h0XCI6IDY2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE2XCIsIFwieFwiOiA0NTIsIFwieVwiOiAyOTMsIFwid2lkdGhcIjogNDgsIFwiaGVpZ2h0XCI6IDQ2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE3XCIsIFwieFwiOiA0NTIsIFwieVwiOiAxMjIsIFwid2lkdGhcIjogNTQsIFwiaGVpZ2h0XCI6IDU4fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzE4XCIsIFwieFwiOiAzMTMsIFwieVwiOiAwLCBcIndpZHRoXCI6IDcwLCBcImhlaWdodFwiOiA2NH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8xOVwiLCBcInhcIjogNDUyLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA1NiwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjBcIiwgXCJ4XCI6IDI5OSwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA1MiwgXCJoZWlnaHRcIjogNTR9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjFcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDI2NywgXCJ3aWR0aFwiOiA2NCwgXCJoZWlnaHRcIjogNjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMjJcIiwgXCJ4XCI6IDQ1MiwgXCJ5XCI6IDYxLCBcIndpZHRoXCI6IDU0LCBcImhlaWdodFwiOiA2MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yM1wiLCBcInhcIjogMjQ1LCBcInlcIjogMzEzLCBcIndpZHRoXCI6IDY0LCBcImhlaWdodFwiOiA2OH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNFwiLCBcInhcIjogNDUsIFwieVwiOiA0NTksIFwid2lkdGhcIjogNDAsIFwiaGVpZ2h0XCI6IDQyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzI1XCIsIFwieFwiOiAwLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA2Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yNlwiLCBcInhcIjogMjE4LCBcInlcIjogMTgyLCBcIndpZHRoXCI6IDUwLCBcImhlaWdodFwiOiA1MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yN1wiLCBcInhcIjogMzg0LCBcInlcIjogMzI4LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA2Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yOFwiLCBcInhcIjogMjM3LCBcInlcIjogMjM0LCBcIndpZHRoXCI6IDcwLCBcImhlaWdodFwiOiA3MH0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8yOVwiLCBcInhcIjogMzUyLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDUyLCBcImhlaWdodFwiOiA1Mn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8zMFwiLCBcInhcIjogMzg0LCBcInlcIjogMjAwLCBcIndpZHRoXCI6IDY2LCBcImhlaWdodFwiOiA2Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV8zOFwiLCBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTEwLCBcImhlaWdodFwiOiAxMjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfMzlcIiwgXCJ4XCI6IDExMSwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTA2LCBcImhlaWdodFwiOiAxMjB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDBcIiwgXCJ4XCI6IDM4NCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogNjcsIFwiaGVpZ2h0XCI6IDY1fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQxXCIsIFwieFwiOiAxNjIsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogODIsIFwiaGVpZ2h0XCI6IDc2fSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQyXCIsIFwieFwiOiA4NywgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA3OCwgXCJoZWlnaHRcIjogNzZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDNcIiwgXCJ4XCI6IDAsIFwieVwiOiAzMTMsIFwid2lkdGhcIjogODQsIFwiaGVpZ2h0XCI6IDgyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ0XCIsIFwieFwiOiAwLCBcInlcIjogMTIxLCBcIndpZHRoXCI6IDExMCwgXCJoZWlnaHRcIjogMTEyfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzQ2XCIsIFwieFwiOiAyMTgsIFwieVwiOiA5MSwgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogOTB9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDdcIiwgXCJ4XCI6IDEyMiwgXCJ5XCI6IDM5NiwgXCJ3aWR0aFwiOiA2MCwgXCJoZWlnaHRcIjogNTZ9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNDhcIiwgXCJ4XCI6IDYxLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA1Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV80OVwiLCBcInhcIjogMTgzLCBcInlcIjogMzk2LCBcIndpZHRoXCI6IDYwLCBcImhlaWdodFwiOiA1Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81MFwiLCBcInhcIjogMTY2LCBcInlcIjogMjM0LCBcIndpZHRoXCI6IDcwLCBcImhlaWdodFwiOiA3Nn0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwidHJlZV81MVwiLCBcInhcIjogMCwgXCJ5XCI6IDIzNCwgXCJ3aWR0aFwiOiA4NiwgXCJoZWlnaHRcIjogNzh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTJcIiwgXCJ4XCI6IDMxMywgXCJ5XCI6IDIwMywgXCJ3aWR0aFwiOiA2OCwgXCJoZWlnaHRcIjogNjh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTNcIiwgXCJ4XCI6IDExMSwgXCJ5XCI6IDEyMSwgXCJ3aWR0aFwiOiA5NCwgXCJoZWlnaHRcIjogOTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInRyZWVfNTRcIiwgXCJ4XCI6IDIxOCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogOTQsIFwiaGVpZ2h0XCI6IDkwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJ0cmVlXzU1XCIsIFwieFwiOiA4NSwgXCJ5XCI6IDMxMywgXCJ3aWR0aFwiOiA3NiwgXCJoZWlnaHRcIjogODJ9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0JTQtdGA0LXQstGM0Y8g0Lgg0LrRg9GB0YLRi1xuICovXG5leHBvcnRzLmJ1c2hzID0ge1xuICAgIFwiaW1hZ2VcIjogdF9idXNocyxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxXCIsIFwieFwiOiAxMDMsIFwieVwiOiAxMDAsIFwid2lkdGhcIjogMjUsIFwiaGVpZ2h0XCI6IDMwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAxMDMsIFwieVwiOiA2MCwgXCJ3aWR0aFwiOiAzMCwgXCJoZWlnaHRcIjogMzl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTNcIiwgXCJ4XCI6IDEzNiwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMTEzLCBcImhlaWdodFwiOiAxMTh9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTRcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDEwMiwgXCJoZWlnaHRcIjogMTQwfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiAxNTYsIFwieVwiOiAxMTksIFwid2lkdGhcIjogMTUsIFwiaGVpZ2h0XCI6IDEzfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAxMDMsIFwieVwiOiA0MCwgXCJ3aWR0aFwiOiAyMSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTdcIiwgXCJ4XCI6IDEzNiwgXCJ5XCI6IDExOSwgXCJ3aWR0aFwiOiAxOSwgXCJoZWlnaHRcIjogMTl9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDEwMywgXCJ5XCI6IDAsIFwid2lkdGhcIjogMzIsIFwiaGVpZ2h0XCI6IDM5fVxuICAgICAgICBdXG4gICAgfVxufTtcblxuXG4vKipcbiAqINCi0LXQu9C10L/QvtGA0YJcbiAqL1xuZXhwb3J0cy50ZWxlcG9ydCA9IHtcbiAgICBcImltYWdlXCI6IHNfdGVsZXBvcnQsXG4gICAgXCJ3aWR0aFwiOiA5MCxcbiAgICBcImhlaWdodFwiOiA0OSxcblxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgICAgXCJkZWZhdWx0XCI6IFtcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJpZGxlXCIsIFwieFwiOiAwLCBcInlcIjogMCwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9LFxuICAgICAgICBdLFxuICAgICAgICBcInJ1blwiOiBbXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMVwiLCBcInhcIjogMCwgXCJ5XCI6IDQ5LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuMlwiLCBcInhcIjogMCwgXCJ5XCI6IDk4LCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuM1wiLCBcInhcIjogOTAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDkwLCBcImhlaWdodFwiOiA0OX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwicnVuNFwiLCBcInhcIjogOTAsIFwieVwiOiA0OSwgXCJ3aWR0aFwiOiA5MCwgXCJoZWlnaHRcIjogNDl9XG4gICAgICAgIF1cbiAgICB9XG59O1xuXG5cbi8qKlxuICog0KPQutCw0LfQsNGC0LXQu9GMXG4gKi9cbmV4cG9ydHMucG9pbnRlciA9IHtcbiAgICBcImltYWdlXCI6IHNfcG9pbnRlcixcbiAgICBcIndpZHRoXCI6IDUwLFxuICAgIFwiaGVpZ2h0XCI6IDUwLFxuXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgICBcImRlZmF1bHRcIjogW1xuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZTFcIiwgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUyXCIsIFwieFwiOiAyMDEsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUzXCIsIFwieFwiOiA0MDIsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU0XCIsIFwieFwiOiA2MDMsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU1XCIsIFwieFwiOiA4MDQsIFwieVwiOiAwLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU2XCIsIFwieFwiOiAwLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGU3XCIsIFwieFwiOiAyMDEsIFwieVwiOiAyMDEsIFwid2lkdGhcIjogMjAxLCBcImhlaWdodFwiOiAyMDF9LFxuICAgICAgICAgICAge1wibmFtZVwiOiBcInNwcml0ZThcIiwgXCJ4XCI6IDQwMiwgXCJ5XCI6IDIwMSwgXCJ3aWR0aFwiOiAyMDEsIFwiaGVpZ2h0XCI6IDIwMX0sXG4gICAgICAgICAgICB7XCJuYW1lXCI6IFwic3ByaXRlOVwiLCBcInhcIjogNjAzLCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfSxcbiAgICAgICAgICAgIHtcIm5hbWVcIjogXCJzcHJpdGUxMFwiLCBcInhcIjogODA0LCBcInlcIjogMjAxLCBcIndpZHRoXCI6IDIwMSwgXCJoZWlnaHRcIjogMjAxfVxuICAgICAgICBdXG4gICAgfVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IHtpdGVtLCBhZGQsIHJlbW92ZSwgcmVzZXQsIHRvQXJyYXl9XG5cblxuY29uc3QgdW5pdHMgPSB7fTtcblxuLyoqXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRjtC90LjRgiDQv9C+INC40LzQtdC90LhcbiAqIEBwYXJhbSBJRFxuICogQHJldHVybnMgVW5pdFxuICovXG5mdW5jdGlvbiBpdGVtKElEKSB7XG4gICAgcmV0dXJuIHVuaXRzW0lEXTtcbn1cblxuZnVuY3Rpb24gYWRkKElELCB1bml0KSB7XG4gICAgdW5pdHNbSURdID0gdW5pdDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKElEKSB7XG4gICAgaWYoSUQgaW4gdW5pdHMpIGRlbGV0ZSB1bml0c1tJRF07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgZGVsZXRlIHVuaXRzW2ldO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9BcnJheSgpIHtcbiAgICBsZXQgdW5pdHNBcnJheSA9IFtdO1xuICAgIGZvcihjb25zdCBpIGluIHVuaXRzKXtcbiAgICAgICAgdW5pdHNBcnJheS5wdXNoKHVuaXRzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuaXRzQXJyYXk7XG59XG4iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9