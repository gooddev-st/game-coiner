/**
 * Спрайты
 */

//Картинки
let s_doc = document.getElementById('s_doc'),
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
    s_juk = document.getElementById('s_juk'),
    s_gad = document.getElementById('s_gad'),
    s_darka = document.getElementById('s_darka'),
    s_ork = document.getElementById('s_ork'),
    s_elf = document.getElementById('s_elf'),
    s_pirat = document.getElementById('s_pirat'),
    t_coral = document.getElementById('t_coral'),
    s_sack = document.getElementById('s_sack');


/**
 * Доктор
 */
exports.doc = {
    "image": s_doc,
    "width": 64,
    "height": 64,

    "states": {
        "default": [
            {"name": "doc1", "x": 0, "y": 0, "width": 32, "height": 32},
        ],

        "run": [
            {"name": "doc1", "x": 0, "y": 0, "width": 32, "height": 32},
            {"name": "doc3", "x": 32, "y": 0, "width": 32, "height": 32},
            {"name": "doc1", "x": 0, "y": 0, "width": 32, "height": 32},
            {"name": "doc2", "x": 0, "y": 32, "width": 32, "height": 32}
        ]
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
        "default": [
            {"name": "idle", "x": 0, "y": 128, "width": 64, "height": 64}
        ],

        "run": [
            // {"name": "idle", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "run1", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "run2", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "run3", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "run4", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "run5", "x": 320, "y": 128, "width": 64, "height": 64},
            {"name": "run6", "x": 384, "y": 128, "width": 64, "height": 64},
            {"name": "run7", "x": 448, "y": 128, "width": 64, "height": 64},
            {"name": "run8", "x": 512, "y": 128, "width": 64, "height": 64}
        ]
    }

};


/**
 * Гоблин
 */
exports.gob = {
    "image": s_gob,
    "width": 100,
    "height": 100,
    "top": 9,

    "states": {
        "default": [
            {"name": "gob1", "x": 130, "y": 0, "width": 65, "height": 65},
        ],

        "run": [
            {"name": "gob2", "x": 0, "y": 0, "width": 65, "height": 65},
            {"name": "gob3", "x": 0, "y": 65, "width": 65, "height": 65},
            {"name": "gob4", "x": 65, "y": 0, "width": 65, "height": 65},
            {"name": "gob5", "x": 65, "y": 65, "width": 65, "height": 65},
            {"name": "gob6", "x": 0, "y": 130, "width": 65, "height": 65},
            {"name": "gob7", "x": 65, "y": 130, "width": 65, "height": 65},
        ]
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
        "default": [
            {"name": "girl1", "x": 0, "y": 0, "width": 64, "height": 64},
        ],

        "run": [
            {"name": "girl1", "x": 0, "y": 0, "width": 64, "height": 64},
            {"name": "girl2", "x": 0, "y": 64, "width": 64, "height": 64},
            {"name": "girl3", "x": 64, "y": 0, "width": 64, "height": 64},
            {"name": "girl4", "x": 64, "y": 64, "width": 64, "height": 64},
            {"name": "girl5", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "girl6", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "girl7", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "girl8", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "girl9", "x": 128, "y": 128, "width": 64, "height": 64}
        ]
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
        "default": [
            {"name": "blond1", "x": 0, "y": 0, "width": 64, "height": 64},
        ],

        "run": [
            {"name": "blond1", "x": 0, "y": 0, "width": 64, "height": 64},
            {"name": "blond2", "x": 0, "y": 64, "width": 64, "height": 64},
            {"name": "blond3", "x": 64, "y": 0, "width": 64, "height": 64},
            {"name": "blond4", "x": 64, "y": 64, "width": 64, "height": 64},
            {"name": "blond5", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "blond6", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "blond7", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "blond8", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "blond9", "x": 128, "y": 128, "width": 64, "height": 64}
        ]
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
        "default": [
            {"name": "mag1", "x": 0, "y": 0, "width": 64, "height": 64},
        ],

        "run": [
            {"name": "mag1", "x": 0, "y": 0, "width": 64, "height": 64},
            {"name": "mag2", "x": 0, "y": 64, "width": 64, "height": 64},
            {"name": "mag3", "x": 64, "y": 0, "width": 64, "height": 64},
            {"name": "mag4", "x": 64, "y": 64, "width": 64, "height": 64},
            {"name": "mag5", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "mag6", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "mag7", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "mag8", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "mag9", "x": 128, "y": 128, "width": 64, "height": 64}
        ]
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
        "default": [
            {"name": "gold1", "x": 224, "y": 64, "width": 32, "height": 32},
            {"name": "gold2", "x": 0, "y": 64, "width": 32, "height": 32},
            {"name": "gold3", "x": 32, "y": 64, "width": 32, "height": 32},
            {"name": "gold4", "x": 64, "y": 64, "width": 32, "height": 32},
            {"name": "gold5", "x": 96, "y": 64, "width": 32, "height": 32},
            {"name": "gold6", "x": 128, "y": 64, "width": 32, "height": 32},
            {"name": "gold7", "x": 160, "y": 64, "width": 32, "height": 32},
            {"name": "gold8", "x": 192, "y": 64, "width": 32, "height": 32},
        ]
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
        "default": [
            {"name": "silver1", "x": 0, "y": 32, "width": 32, "height": 32},
            {"name": "silver2", "x": 224, "y": 32, "width": 32, "height": 32},
            {"name": "silver3", "x": 32, "y": 32, "width": 32, "height": 32},
            {"name": "silver4", "x": 64, "y": 32, "width": 32, "height": 32},
            {"name": "silver5", "x": 96, "y": 32, "width": 32, "height": 32},
            {"name": "silver6", "x": 128, "y": 32, "width": 32, "height": 32},
            {"name": "silver7", "x": 160, "y": 32, "width": 32, "height": 32},
            {"name": "silver8", "x": 192, "y": 32, "width": 32, "height": 32},
        ]
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
        "default": [
            {"name": "copper1", "x": 0, "y": 0, "width": 32, "height": 32},
            {"name": "copper2", "x": 32, "y": 0, "width": 32, "height": 32},
            {"name": "copper3", "x": 64, "y": 0, "width": 32, "height": 32},
            {"name": "copper4", "x": 96, "y": 0, "width": 32, "height": 32},
            {"name": "copper5", "x": 128, "y": 0, "width": 32, "height": 32},
            {"name": "copper6", "x": 160, "y": 0, "width": 32, "height": 32},
            {"name": "copper7", "x": 192, "y": 0, "width": 32, "height": 32},
            {"name": "copper8", "x": 224, "y": 0, "width": 32, "height": 32},
        ]
    }
};


/**
 * Кактус
 */
exports.kaktoos = {
    "image": t_plants,
    "width": 31,
    "height": 30,
    "speed": 8,
    "top": -24,

    "states": {
        "default": [
            {"name": "sprite13",   "x": 198, "y": 293, "width": 31, "height": 30},
            {"name": "sprite13",   "x": 196, "y": 293, "width": 34, "height": 30},
            {"name": "sprite13",   "x": 194, "y": 293, "width": 38, "height": 30},
            {"name": "sprite13",   "x": 196, "y": 293, "width": 34, "height": 30},
        ]
    }
};


/**
 * Гад
 */
exports.gad = {
    "image": s_gad,
    "width": 32,
    "height": 32,
    "speed": 10,

    "states": {
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 320, "height": 320},
            {"name": "sprite3", "x": 320, "y": 0, "width": 320, "height": 320},
            {"name": "sprite2", "x": 0, "y": 320, "width": 320, "height": 320},
            {"name": "sprite4", "x": 320, "y": 320, "width": 320, "height": 320}
        ]
    }
};



/**
 * Трава
 */
exports.grass = {
    "image": t_trees,

    "states": {
        "default": [
            {"name": "tree_46", "x": 218, "y": 91, "width": 76, "height": 90},
        ]
    }
};


/**
 * Деревья
 */
exports.trees = {
    "image": t_trees,

    "states": {
        "default": [
            {"name": "tree_01", "x": 313, "y": 134, "width": 68, "height": 68},
            {"name": "tree_02", "x": 0, "y": 459, "width": 44, "height": 42},
            {"name": "tree_03", "x": 313, "y": 272, "width": 68, "height": 68},
            {"name": "tree_04", "x": 313, "y": 65, "width": 68, "height": 68},
            {"name": "tree_05", "x": 244, "y": 396, "width": 54, "height": 54},
            {"name": "tree_06", "x": 452, "y": 340, "width": 46, "height": 48},
            {"name": "tree_07", "x": 452, "y": 181, "width": 56, "height": 58},
            {"name": "tree_08", "x": 313, "y": 341, "width": 50, "height": 52},
            {"name": "tree_09", "x": 86, "y": 459, "width": 40, "height": 40},
            {"name": "tree_10", "x": 384, "y": 66, "width": 66, "height": 66},
            {"name": "tree_11", "x": 452, "y": 240, "width": 47, "height": 52},
            {"name": "tree_12", "x": 405, "y": 396, "width": 46, "height": 48},
            {"name": "tree_13", "x": 127, "y": 459, "width": 32, "height": 32},
            {"name": "tree_14", "x": 452, "y": 389, "width": 46, "height": 44},
            {"name": "tree_15", "x": 384, "y": 133, "width": 66, "height": 66},
            {"name": "tree_16", "x": 452, "y": 293, "width": 48, "height": 46},
            {"name": "tree_17", "x": 452, "y": 122, "width": 54, "height": 58},
            {"name": "tree_18", "x": 313, "y": 0, "width": 70, "height": 64},
            {"name": "tree_19", "x": 452, "y": 0, "width": 56, "height": 60},
            {"name": "tree_20", "x": 299, "y": 396, "width": 52, "height": 54},
            {"name": "tree_21", "x": 384, "y": 267, "width": 64, "height": 60},
            {"name": "tree_22", "x": 452, "y": 61, "width": 54, "height": 60},
            {"name": "tree_23", "x": 245, "y": 313, "width": 64, "height": 68},
            {"name": "tree_24", "x": 45, "y": 459, "width": 40, "height": 42},
            {"name": "tree_25", "x": 0, "y": 396, "width": 60, "height": 62},
            {"name": "tree_26", "x": 218, "y": 182, "width": 50, "height": 50},
            {"name": "tree_27", "x": 384, "y": 328, "width": 60, "height": 62},
            {"name": "tree_28", "x": 237, "y": 234, "width": 70, "height": 70},
            {"name": "tree_29", "x": 352, "y": 396, "width": 52, "height": 52},
            {"name": "tree_30", "x": 384, "y": 200, "width": 66, "height": 66},
            {"name": "tree_38", "x": 0, "y": 0, "width": 110, "height": 120},
            {"name": "tree_39", "x": 111, "y": 0, "width": 106, "height": 120},
            {"name": "tree_40", "x": 384, "y": 0, "width": 67, "height": 65},
            {"name": "tree_41", "x": 162, "y": 313, "width": 82, "height": 76},
            {"name": "tree_42", "x": 87, "y": 234, "width": 78, "height": 76},
            {"name": "tree_43", "x": 0, "y": 313, "width": 84, "height": 82},
            {"name": "tree_44", "x": 0, "y": 121, "width": 110, "height": 112},
            {"name": "tree_46", "x": 218, "y": 91, "width": 76, "height": 90},
            {"name": "tree_47", "x": 122, "y": 396, "width": 60, "height": 56},
            {"name": "tree_48", "x": 61, "y": 396, "width": 60, "height": 56},
            {"name": "tree_49", "x": 183, "y": 396, "width": 60, "height": 56},
            {"name": "tree_50", "x": 166, "y": 234, "width": 70, "height": 76},
            {"name": "tree_51", "x": 0, "y": 234, "width": 86, "height": 78},
            {"name": "tree_52", "x": 313, "y": 203, "width": 68, "height": 68},
            {"name": "tree_53", "x": 111, "y": 121, "width": 94, "height": 98},
            {"name": "tree_54", "x": 218, "y": 0, "width": 94, "height": 90},
            {"name": "tree_55", "x": 85, "y": 313, "width": 76, "height": 82}
        ]
    }
};


/**
 * Деревья и кусты
 */
exports.bushs = {
    "image": t_bushs,

    "states": {
        "default": [
            {"name": "sprite1", "x": 103, "y": 100, "width": 25, "height": 30},
            {"name": "sprite2", "x": 103, "y": 60, "width": 30, "height": 39},
            {"name": "sprite5", "x": 156, "y": 119, "width": 15, "height": 13},
            {"name": "sprite6", "x": 103, "y": 40, "width": 21, "height": 19},
            {"name": "sprite7", "x": 136, "y": 119, "width": 19, "height": 19},
            {"name": "sprite8", "x": 103, "y": 0, "width": 32, "height": 39}
        ]
    }
};


/**
 * Пустынное
 */
exports.desert = {
    "image": t_plants,
    "width": 100,
    "height": 100,

    "states": {
        "default": [
            // {"name": "sprite7", "x": 198, "y": 201, "width": 27, "height": 58},
            {"name": "sprite13", "x": 198, "y": 293, "width": 31, "height": 30},
            // {"name": "sprite14", "x": 233, "y": 330, "width": 76, "height": 92},
            // {"name": "sprite16", "x": 244, "y": 238, "width": 60, "height": 87},
        ]
    }
};


/**
 * Странные деревья
 */
exports.belwood = {
    "image": t_plants,

    "states": {
        "default": [
            {"name": "sprite1", "x": 0, "y": 201, "width": 107, "height": 128},
            {"name": "sprite2", "x": 108, "y": 201, "width": 89, "height": 128},
            {"name": "sprite19", "x": 0, "y": 330, "width": 95, "height": 117},
            {"name": "sprite20", "x": 244, "y": 0, "width": 126, "height": 116}
        ]
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
        "default": [
            {"name": "run1", "x": 0, "y": 49, "width": 90, "height": 49},
            {"name": "run2", "x": 0, "y": 98, "width": 90, "height": 49},
            {"name": "run3", "x": 90, "y": 0, "width": 90, "height": 49},
            {"name": "run4", "x": 90, "y": 49, "width": 90, "height": 49},
        ],
        "run": [
            {"name": "idle", "x": 0, "y": 0, "width": 90, "height": 49},
        ]
    }
};


/**
 * Указатель
 */
exports.pointer = {
    "image": s_pointer,
    "width": 64,
    "height": 64,
    "top": 32,
    "left": -32,

    "states": {
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 201, "height": 201},
            {"name": "sprite2", "x": 201, "y": 0, "width": 201, "height": 201},
            {"name": "sprite3", "x": 402, "y": 0, "width": 201, "height": 201},
            {"name": "sprite4", "x": 603, "y": 0, "width": 201, "height": 201},
            {"name": "sprite5", "x": 804, "y": 0, "width": 201, "height": 201},
            {"name": "sprite6", "x": 0, "y": 201, "width": 201, "height": 201},
            {"name": "sprite7", "x": 201, "y": 201, "width": 201, "height": 201},
            {"name": "sprite8", "x": 402, "y": 201, "width": 201, "height": 201},
            {"name": "sprite9", "x": 603, "y": 201, "width": 201, "height": 201},
            {"name": "sprite10", "x": 804, "y": 201, "width": 201, "height": 201}
        ]
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
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128},
            {"name": "sprite2", "x": 128, "y": 0, "width": 128, "height": 128},
            {"name": "sprite3", "x": 256, "y": 0, "width": 128, "height": 128},
            {"name": "sprite4", "x": 384, "y": 0, "width": 128, "height": 128},
            {"name": "sprite5", "x": 512, "y": 0, "width": 128, "height": 128},
            {"name": "sprite6", "x": 640, "y": 0, "width": 128, "height": 128},
            {"name": "sprite7", "x": 768, "y": 0, "width": 128, "height": 128},
            {"name": "sprite8", "x": 896, "y": 0, "width": 128, "height": 128},
            {"name": "sprite9", "x": 0, "y": 128, "width": 128, "height": 128},
            {"name": "sprite10", "x": 128, "y": 128, "width": 128, "height": 128},
            {"name": "sprite11", "x": 256, "y": 128, "width": 128, "height": 128},
            {"name": "sprite12", "x": 384, "y": 128, "width": 128, "height": 128},
            {"name": "sprite13", "x": 512, "y": 128, "width": 128, "height": 128},
            {"name": "sprite14", "x": 640, "y": 128, "width": 128, "height": 128},
            {"name": "sprite15", "x": 768, "y": 128, "width": 128, "height": 128},
            {"name": "sprite16", "x": 896, "y": 128, "width": 128, "height": 128},
            {"name": "sprite17", "x": 0, "y": 256, "width": 128, "height": 128},
            {"name": "sprite18", "x": 128, "y": 256, "width": 128, "height": 128},
            {"name": "sprite19", "x": 256, "y": 256, "width": 128, "height": 128},
            {"name": "sprite20", "x": 384, "y": 256, "width": 128, "height": 128},
            {"name": "sprite21", "x": 512, "y": 256, "width": 128, "height": 128},
            {"name": "sprite22", "x": 640, "y": 256, "width": 128, "height": 128},
            {"name": "sprite23", "x": 768, "y": 256, "width": 128, "height": 128},
            {"name": "sprite24", "x": 896, "y": 256, "width": 128, "height": 128},
            {"name": "sprite25", "x": 0, "y": 384, "width": 128, "height": 128},
            {"name": "sprite26", "x": 128, "y": 384, "width": 128, "height": 128},
            {"name": "sprite27", "x": 256, "y": 384, "width": 128, "height": 128},
            {"name": "sprite28", "x": 384, "y": 384, "width": 128, "height": 128},
            {"name": "sprite29", "x": 512, "y": 384, "width": 128, "height": 128},
            {"name": "sprite30", "x": 640, "y": 384, "width": 128, "height": 128},
            {"name": "sprite31", "x": 768, "y": 384, "width": 128, "height": 128},
            {"name": "sprite32", "x": 896, "y": 384, "width": 128, "height": 128},
            {"name": "sprite33", "x": 0, "y": 512, "width": 128, "height": 128},
            {"name": "sprite34", "x": 128, "y": 512, "width": 128, "height": 128},
            {"name": "sprite35", "x": 256, "y": 512, "width": 128, "height": 128},
            {"name": "sprite36", "x": 384, "y": 512, "width": 128, "height": 128},
            {"name": "sprite37", "x": 512, "y": 512, "width": 128, "height": 128},
            {"name": "sprite38", "x": 640, "y": 512, "width": 128, "height": 128},
            {"name": "sprite39", "x": 768, "y": 512, "width": 128, "height": 128},
            {"name": "sprite40", "x": 896, "y": 512, "width": 128, "height": 128},
            {"name": "sprite41", "x": 0, "y": 640, "width": 128, "height": 128},
            {"name": "sprite42", "x": 128, "y": 640, "width": 128, "height": 128},
            {"name": "sprite43", "x": 256, "y": 640, "width": 128, "height": 128},
            {"name": "sprite44", "x": 384, "y": 640, "width": 128, "height": 128},
            {"name": "sprite45", "x": 512, "y": 640, "width": 128, "height": 128},
            {"name": "sprite46", "x": 640, "y": 640, "width": 128, "height": 128},
            {"name": "sprite47", "x": 768, "y": 640, "width": 128, "height": 128},
            {"name": "sprite48", "x": 896, "y": 640, "width": 128, "height": 128},
            {"name": "sprite49", "x": 0, "y": 768, "width": 128, "height": 128},
            {"name": "sprite50", "x": 128, "y": 768, "width": 128, "height": 128},
            {"name": "sprite51", "x": 256, "y": 768, "width": 128, "height": 128},
            {"name": "sprite52", "x": 384, "y": 768, "width": 128, "height": 128},
            {"name": "sprite53", "x": 512, "y": 768, "width": 128, "height": 128},
            {"name": "sprite54", "x": 640, "y": 768, "width": 128, "height": 128},
            {"name": "sprite55", "x": 768, "y": 768, "width": 128, "height": 128},
            {"name": "sprite56", "x": 896, "y": 768, "width": 128, "height": 128},
            {"name": "sprite57", "x": 0, "y": 896, "width": 128, "height": 128},
            {"name": "sprite58", "x": 128, "y": 896, "width": 128, "height": 128},
            {"name": "sprite59", "x": 256, "y": 896, "width": 128, "height": 128},
            {"name": "sprite60", "x": 384, "y": 896, "width": 128, "height": 128},
            {"name": "sprite61", "x": 512, "y": 896, "width": 128, "height": 128},
            {"name": "sprite62", "x": 640, "y": 896, "width": 128, "height": 128},
            {"name": "sprite63", "x": 768, "y": 896, "width": 128, "height": 128},
            {"name": "sprite64", "x": 896, "y": 896, "width": 128, "height": 128}
        ]
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
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128},
            {"name": "sprite2", "x": 128, "y": 0, "width": 128, "height": 128},
            {"name": "sprite3", "x": 256, "y": 0, "width": 128, "height": 128},
            {"name": "sprite4", "x": 384, "y": 0, "width": 128, "height": 128},
            {"name": "sprite5", "x": 0, "y": 128, "width": 128, "height": 128},
            {"name": "sprite6", "x": 128, "y": 128, "width": 128, "height": 128},
            {"name": "sprite7", "x": 256, "y": 128, "width": 128, "height": 128},
            {"name": "sprite8", "x": 384, "y": 128, "width": 128, "height": 128},
            {"name": "sprite9", "x": 0, "y": 256, "width": 128, "height": 128},
            {"name": "sprite10", "x": 128, "y": 256, "width": 128, "height": 128},
            {"name": "sprite11", "x": 256, "y": 256, "width": 128, "height": 128},
            {"name": "sprite12", "x": 384, "y": 256, "width": 128, "height": 128},
            {"name": "sprite13", "x": 0, "y": 384, "width": 128, "height": 128},
            {"name": "sprite14", "x": 128, "y": 384, "width": 128, "height": 128},
            {"name": "sprite15", "x": 256, "y": 384, "width": 128, "height": 128},
            {"name": "sprite16", "x": 384, "y": 384, "width": 128, "height": 128}
        ]
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
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128},
            {"name": "sprite2", "x": 128, "y": 0, "width": 128, "height": 128},
            {"name": "sprite3", "x": 256, "y": 0, "width": 128, "height": 128},
            {"name": "sprite4", "x": 384, "y": 0, "width": 128, "height": 128},
            {"name": "sprite5", "x": 0, "y": 128, "width": 128, "height": 128},
            {"name": "sprite6", "x": 128, "y": 128, "width": 128, "height": 128},
            {"name": "sprite7", "x": 256, "y": 128, "width": 128, "height": 128},
            {"name": "sprite8", "x": 384, "y": 128, "width": 128, "height": 128},
            {"name": "sprite9", "x": 0, "y": 256, "width": 128, "height": 128},
            {"name": "sprite10", "x": 128, "y": 256, "width": 128, "height": 128},
            {"name": "sprite11", "x": 256, "y": 256, "width": 128, "height": 128},
            {"name": "sprite12", "x": 384, "y": 256, "width": 128, "height": 128},
            {"name": "sprite13", "x": 0, "y": 384, "width": 128, "height": 128},
            {"name": "sprite14", "x": 128, "y": 384, "width": 128, "height": 128},
            {"name": "sprite15", "x": 256, "y": 384, "width": 128, "height": 128},
            {"name": "sprite16", "x": 384, "y": 384, "width": 128, "height": 128}
        ]
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
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 64, "height": 64},
            {"name": "sprite2", "x": 64, "y": 0, "width": 64, "height": 64},
            {"name": "sprite3", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "sprite4", "x": 192, "y": 0, "width": 64, "height": 64},
            {"name": "sprite5", "x": 256, "y": 0, "width": 64, "height": 64},
            {"name": "sprite6", "x": 0, "y": 64, "width": 64, "height": 64},
            {"name": "sprite7", "x": 64, "y": 64, "width": 64, "height": 64},
            {"name": "sprite8", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "sprite9", "x": 192, "y": 64, "width": 64, "height": 64},
            {"name": "sprite10", "x": 256, "y": 64, "width": 64, "height": 64},
            {"name": "sprite11", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "sprite12", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite13", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite14", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "sprite15", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "sprite16", "x": 0, "y": 192, "width": 64, "height": 64},
            {"name": "sprite17", "x": 64, "y": 192, "width": 64, "height": 64},
            {"name": "sprite18", "x": 128, "y": 192, "width": 64, "height": 64},
            {"name": "sprite19", "x": 192, "y": 192, "width": 64, "height": 64},
            {"name": "sprite20", "x": 256, "y": 192, "width": 64, "height": 64},
            {"name": "sprite21", "x": 0, "y": 256, "width": 64, "height": 64},
            {"name": "sprite22", "x": 64, "y": 256, "width": 64, "height": 64},
            {"name": "sprite23", "x": 128, "y": 256, "width": 64, "height": 64},
            {"name": "sprite24", "x": 192, "y": 256, "width": 64, "height": 64},
            {"name": "sprite25", "x": 256, "y": 256, "width": 64, "height": 64}
        ]
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
    "top": 0,
    "left": -25,

    "states": {
        "default": [
            {"name": "aura_test_1_32_1", "x": 0, "y": 68, "width": 80, "height": 67},
            {"name": "aura_test_1_32_2", "x": 0, "y": 272, "width": 80, "height": 67},
            {"name": "aura_test_1_32_3", "x": 81, "y": 0, "width": 80, "height": 67},
            {"name": "aura_test_1_32_4", "x": 81, "y": 68, "width": 80, "height": 67},
            {"name": "aura_test_1_32_5", "x": 0, "y": 136, "width": 80, "height": 67},
            {"name": "aura_test_1_32_6", "x": 81, "y": 136, "width": 80, "height": 67},
            {"name": "aura_test_1_32_7", "x": 162, "y": 0, "width": 80, "height": 67},
            {"name": "aura_test_1_32_8", "x": 162, "y": 68, "width": 80, "height": 67},
            {"name": "aura_test_1_32_9", "x": 162, "y": 136, "width": 80, "height": 67},
            {"name": "aura_test_1_32_10", "x": 0, "y": 204, "width": 80, "height": 67},
            {"name": "aura_test_1_32_11", "x": 81, "y": 204, "width": 80, "height": 67},
            {"name": "aura_test_1_32_12", "x": 162, "y": 204, "width": 80, "height": 67},
            {"name": "aura_test_1_32_13", "x": 243, "y": 0, "width": 80, "height": 67},
            {"name": "aura_test_1_32_14", "x": 243, "y": 68, "width": 80, "height": 67},
            {"name": "aura_test_1_32_15", "x": 243, "y": 136, "width": 80, "height": 67},
            {"name": "aura_test_1_32_16", "x": 243, "y": 204, "width": 80, "height": 67},
            {"name": "aura_test_1_32_17", "x": 0, "y": 0, "width": 80, "height": 67},
            {"name": "aura_test_1_32_18", "x": 81, "y": 272, "width": 80, "height": 67},
            {"name": "aura_test_1_32_19", "x": 162, "y": 272, "width": 80, "height": 67},
            {"name": "aura_test_1_32_20", "x": 243, "y": 272, "width": 80, "height": 67},
            {"name": "aura_test_1_32_21", "x": 324, "y": 0, "width": 80, "height": 67},
            {"name": "aura_test_1_32_22", "x": 324, "y": 68, "width": 80, "height": 67},
            {"name": "aura_test_1_32_23", "x": 324, "y": 136, "width": 80, "height": 67},
            {"name": "aura_test_1_32_24", "x": 324, "y": 204, "width": 80, "height": 67},
            {"name": "aura_test_1_32_25", "x": 324, "y": 272, "width": 80, "height": 67},
            {"name": "aura_test_1_32_26", "x": 0, "y": 340, "width": 80, "height": 67},
            {"name": "aura_test_1_32_27", "x": 81, "y": 340, "width": 80, "height": 67},
            {"name": "aura_test_1_32_28", "x": 162, "y": 340, "width": 80, "height": 67},
            {"name": "aura_test_1_32_29", "x": 243, "y": 340, "width": 80, "height": 67},
            {"name": "aura_test_1_32_30", "x": 324, "y": 340, "width": 80, "height": 67},
            {"name": "aura_test_1_32_32", "x": 0, "y": 408, "width": 80, "height": 67},
            {"name": "aura_test_1_32_31", "x": 81, "y": 408, "width": 80, "height": 67}
        ]
    }
};


/**
 * Эффект толчок
 */
exports.push1 = {
    "image": s_push,
    "width": 256,
    "height": 256,
    "top": 100,
    "left": -100,
    "speed": 30,

    "states": {
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 64, "height": 64},
            // {"name": "sprite2", "x": 0, "y": 64, "width": 64, "height": 64},
            // {"name": "sprite3", "x": 64, "y": 0, "width": 64, "height": 64},
            // {"name": "sprite4", "x": 64, "y": 64, "width": 64, "height": 64},
            // {"name": "sprite5", "x": 0, "y": 128, "width": 64, "height": 64},
            // {"name": "sprite6", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite7", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "sprite8", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "sprite9", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite10", "x": 0, "y": 192, "width": 64, "height": 64}
        ]
    }
};


const CRYSTAL_WIDTH = 32;
const CRYSTAL_HEIGHT = 32;

exports.blue_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite6", "x": 0, "y": 0, "width": 32, "height": 32},
            {"name": "sprite7", "x": 32, "y": 0, "width": 32, "height": 32},
            {"name": "sprite8", "x": 64, "y": 0, "width": 32, "height": 32},
            {"name": "sprite9", "x": 96, "y": 0, "width": 32, "height": 32},
            {"name": "sprite10", "x": 128, "y": 0, "width": 32, "height": 32},
            {"name": "sprite11", "x": 160, "y": 0, "width": 32, "height": 32},
            {"name": "sprite12", "x": 192, "y": 0, "width": 32, "height": 32},
            {"name": "sprite13", "x": 224, "y": 0, "width": 32, "height": 32},
        ]
    }
};

exports.green_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite14", "x": 0, "y": 32, "width": 32, "height": 32},
            {"name": "sprite15", "x": 32, "y": 32, "width": 32, "height": 32},
            {"name": "sprite16", "x": 64, "y": 32, "width": 32, "height": 32},
            {"name": "sprite17", "x": 96, "y": 32, "width": 32, "height": 32},
            {"name": "sprite18", "x": 128, "y": 32, "width": 32, "height": 32},
            {"name": "sprite19", "x": 160, "y": 32, "width": 32, "height": 32},
            {"name": "sprite20", "x": 192, "y": 32, "width": 32, "height": 32},
            {"name": "sprite21", "x": 224, "y": 32, "width": 32, "height": 32},
        ]
    }
};

exports.grey_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite22", "x": 0, "y": 64, "width": 32, "height": 32},
            {"name": "sprite23", "x": 32, "y": 64, "width": 32, "height": 32},
            {"name": "sprite24", "x": 64, "y": 64, "width": 32, "height": 32},
            {"name": "sprite25", "x": 96, "y": 64, "width": 32, "height": 32},
            {"name": "sprite26", "x": 128, "y": 64, "width": 32, "height": 32},
            {"name": "sprite27", "x": 160, "y": 64, "width": 32, "height": 32},
            {"name": "sprite28", "x": 192, "y": 64, "width": 32, "height": 32},
            {"name": "sprite29", "x": 224, "y": 64, "width": 32, "height": 32},
        ]
    }
};

exports.red_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite30", "x": 0, "y": 96, "width": 32, "height": 32},
            {"name": "sprite31", "x": 32, "y": 96, "width": 32, "height": 32},
            {"name": "sprite32", "x": 64, "y": 96, "width": 32, "height": 32},
            {"name": "sprite33", "x": 96, "y": 96, "width": 32, "height": 32},
            {"name": "sprite34", "x": 128, "y": 96, "width": 32, "height": 32},
            {"name": "sprite35", "x": 160, "y": 96, "width": 32, "height": 32},
            {"name": "sprite36", "x": 192, "y": 96, "width": 32, "height": 32},
            {"name": "sprite37", "x": 224, "y": 96, "width": 32, "height": 32},
        ]
    }
};

exports.magenta_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite38", "x": 0, "y": 128, "width": 32, "height": 32},
            {"name": "sprite39", "x": 32, "y": 128, "width": 32, "height": 32},
            {"name": "sprite40", "x": 64, "y": 128, "width": 32, "height": 32},
            {"name": "sprite41", "x": 96, "y": 128, "width": 32, "height": 32},
            {"name": "sprite42", "x": 128, "y": 128, "width": 32, "height": 32},
            {"name": "sprite43", "x": 160, "y": 128, "width": 32, "height": 32},
            {"name": "sprite44", "x": 192, "y": 128, "width": 32, "height": 32},
            {"name": "sprite45", "x": 224, "y": 128, "width": 32, "height": 32},
        ]
    }
};

exports.yellow_crystal = {
    "image": s_crystals,
    "width": CRYSTAL_WIDTH,
    "height": CRYSTAL_HEIGHT,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite46", "x": 0, "y": 160, "width": 32, "height": 32},
            {"name": "sprite47", "x": 32, "y": 160, "width": 32, "height": 32},
            {"name": "sprite48", "x": 64, "y": 160, "width": 32, "height": 32},
            {"name": "sprite49", "x": 96, "y": 160, "width": 32, "height": 32},
            {"name": "sprite50", "x": 128, "y": 160, "width": 32, "height": 32},
            {"name": "sprite51", "x": 160, "y": 160, "width": 32, "height": 32},
            {"name": "sprite52", "x": 192, "y": 160, "width": 32, "height": 32},
            {"name": "sprite53", "x": 224, "y": 160, "width": 32, "height": 32}
        ]
    }
};

exports.skeleton = {
    "image": s_skeleton,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64},
            {"name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64},
            {"name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64},
            {"name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64},
            {"name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64},
            {"name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64},
            {"name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64},
            {"name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64},
        ]
    }
};

exports.katy = {
    "image": s_katy,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite79", "x": 0, "y": 0, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite80", "x": 0, "y": 64, "width": 64, "height": 64},
            {"name": "sprite81", "x": 64, "y": 0, "width": 64, "height": 64},
            {"name": "sprite82", "x": 64, "y": 64, "width": 64, "height": 64},
            {"name": "sprite83", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "sprite84", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite85", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "sprite86", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "sprite87", "x": 128, "y": 128, "width": 64, "height": 64}
        ]
    }
};

exports.levon = {
    "image": s_levon,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite79", "x": 0, "y": 0, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite80", "x": 0, "y": 64, "width": 64, "height": 64},
            {"name": "sprite81", "x": 64, "y": 0, "width": 64, "height": 64},
            {"name": "sprite82", "x": 64, "y": 64, "width": 64, "height": 64},
            {"name": "sprite83", "x": 0, "y": 128, "width": 64, "height": 64},
            {"name": "sprite84", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite85", "x": 128, "y": 0, "width": 64, "height": 64},
            {"name": "sprite86", "x": 128, "y": 64, "width": 64, "height": 64},
            {"name": "sprite87", "x": 128, "y": 128, "width": 64, "height": 64}
        ]
    }
};

exports.vitaly = {
    "image": s_vitaly,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64},
            {"name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64},
            {"name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64},
            {"name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64},
        ]
    }
};


/**
 * Классные деревья
 */
exports.cool_plants = {
    "image": t_cool_plants,

    "states": {
        "default": [
            {"name": "foliage1", "x": 519, "y": 517, "width": 64, "height": 64},
            {"name": "foliage2_0", "x": 454, "y": 517, "width": 64, "height": 64},
            {"name": "foliage3_0", "x": 389, "y": 517, "width": 64, "height": 64},
            {"name": "foliage4", "x": 324, "y": 517, "width": 64, "height": 64},
            {"name": "foliage5", "x": 259, "y": 517, "width": 64, "height": 64},
            {"name": "foliage6", "x": 194, "y": 517, "width": 64, "height": 64},
            {"name": "foliage7", "x": 129, "y": 517, "width": 64, "height": 64},
            {"name": "foliage8", "x": 387, "y": 129, "width": 128, "height": 128},
            {"name": "foliage9", "x": 387, "y": 258, "width": 128, "height": 128},
            {"name": "palmtree1", "x": 0, "y": 388, "width": 128, "height": 128},
            {"name": "palmtree2", "x": 129, "y": 388, "width": 128, "height": 128},
            {"name": "palmtree3", "x": 129, "y": 0, "width": 128, "height": 128},
            {"name": "palmtree4", "x": 387, "y": 388, "width": 128, "height": 128},
            {"name": "palmtree5", "x": 516, "y": 0, "width": 128, "height": 128},
            {"name": "tree1_4", "x": 516, "y": 129, "width": 128, "height": 128},
            {"name": "tree2_1", "x": 516, "y": 258, "width": 128, "height": 128},
            {"name": "tree4", "x": 387, "y": 0, "width": 128, "height": 128},
            {"name": "tree5", "x": 258, "y": 259, "width": 128, "height": 128},
            {"name": "tree-strange", "x": 129, "y": 259, "width": 128, "height": 128},
            {"name": "palmtree6", "x": 0, "y": 0, "width": 128, "height": 129},
            {"name": "tree6", "x": 258, "y": 129, "width": 128, "height": 128},
            {"name": "tree7", "x": 258, "y": 0, "width": 128, "height": 128},
            {"name": "tree8", "x": 129, "y": 130, "width": 128, "height": 128},
            {"name": "tree9", "x": 516, "y": 387, "width": 128, "height": 97},
            {"name": "tree3", "x": 0, "y": 259, "width": 128, "height": 128}
        ]
    }
};


/**
 * Мертвые деревья
 */
exports.dead_plants = {
    "image": t_cool_plants,

    "states": {
        "default": [
            {"name": "deadtree1_0", "x": 0, "y": 517, "width": 128, "height": 97},
            {"name": "deadtree2", "x": 258, "y": 388, "width": 128, "height": 128},
            {"name": "deadtree3", "x": 0, "y": 130, "width": 128, "height": 128},
        ]
    }
};


/**
 * Мертвые деревья
 */
exports.andstones = {
    "image": t_andstones,

    "states": {
        "default": [
            {"name": "01", "x": 0, "y": 0, "width": 64, "height": 32},
            {"name": "02", "x": 0, "y": 33, "width": 64, "height": 32},
            {"name": "03", "x": 0, "y": 66, "width": 64, "height": 32},
            {"name": "04", "x": 65, "y": 0, "width": 64, "height": 32},
            {"name": "05", "x": 65, "y": 33, "width": 64, "height": 32},
            {"name": "06", "x": 65, "y": 66, "width": 64, "height": 32},
            {"name": "07", "x": 0, "y": 99, "width": 64, "height": 32},
            {"name": "08", "x": 65, "y": 99, "width": 64, "height": 32},
            {"name": "09", "x": 0, "y": 132, "width": 64, "height": 32},
            {"name": "10", "x": 65, "y": 132, "width": 64, "height": 32}
        ]
    }
};


/**
 * Коралловый риф
 */
exports.coral = {
    "image": t_coral,

    "states": {
        "default": [
            {"name": "sprite1", "x": 16, "y": 7, "width": 33, "height": 36},
            {"name": "sprite2", "x": 143, "y": 7, "width": 33, "height": 35},
            {"name": "sprite3", "x": 201, "y": 7, "width": 46, "height": 33},
            {"name": "sprite4", "x": 272, "y": 7, "width": 33, "height": 36},
            {"name": "sprite5", "x": 399, "y": 7, "width": 33, "height": 35},
            {"name": "sprite6", "x": 457, "y": 7, "width": 46, "height": 33},
            {"name": "sprite7", "x": 73, "y": 10, "width": 46, "height": 29},
            {"name": "sprite8", "x": 329, "y": 10, "width": 46, "height": 29},
            {"name": "sprite9", "x": 330, "y": 49, "width": 46, "height": 47},
            {"name": "sprite10", "x": 458, "y": 49, "width": 46, "height": 47},
            {"name": "sprite11", "x": 266, "y": 51, "width": 44, "height": 45},
            {"name": "sprite12", "x": 394, "y": 51, "width": 44, "height": 45},
            {"name": "sprite13", "x": 16, "y": 55, "width": 33, "height": 36},
            {"name": "sprite14", "x": 143, "y": 55, "width": 33, "height": 35},
            {"name": "sprite15", "x": 201, "y": 55, "width": 46, "height": 33},
            {"name": "sprite16", "x": 73, "y": 58, "width": 46, "height": 29},
            {"name": "sprite17", "x": 260, "y": 98, "width": 50, "height": 40},
            {"name": "sprite18", "x": 10, "y": 99, "width": 44, "height": 45},
            {"name": "sprite19", "x": 323, "y": 99, "width": 53, "height": 38},
            {"name": "sprite20", "x": 201, "y": 100, "width": 48, "height": 36},
            {"name": "sprite21", "x": 388, "y": 102, "width": 54, "height": 36},
            {"name": "sprite22", "x": 77, "y": 106, "width": 38, "height": 28},
            {"name": "sprite23", "x": 141, "y": 106, "width": 38, "height": 28},
            {"name": "sprite24", "x": 469, "y": 111, "width": 24, "height": 20},
            {"name": "sprite25", "x": 335, "y": 165, "width": 70, "height": 65},
            {"name": "sprite26", "x": 431, "y": 165, "width": 70, "height": 65},
            {"name": "sprite27", "x": 141, "y": 176, "width": 51, "height": 61},
            {"name": "sprite28", "x": 199, "y": 178, "width": 50, "height": 60},
            {"name": "sprite29", "x": 261, "y": 179, "width": 53, "height": 57},
            {"name": "sprite30", "x": 141, "y": 240, "width": 51, "height": 61},
            {"name": "sprite31", "x": 199, "y": 242, "width": 50, "height": 60},
            {"name": "sprite32", "x": 261, "y": 243, "width": 53, "height": 57},
            {"name": "sprite33", "x": 431, "y": 245, "width": 70, "height": 65},
            {"name": "sprite34", "x": 336, "y": 247, "width": 70, "height": 65},
            {"name": "sprite35", "x": 10, "y": 248, "width": 44, "height": 47},
            {"name": "sprite36", "x": 66, "y": 250, "width": 59, "height": 43},
            {"name": "sprite37", "x": 141, "y": 304, "width": 51, "height": 61},
            {"name": "sprite38", "x": 199, "y": 306, "width": 50, "height": 60},
            {"name": "sprite39", "x": 261, "y": 307, "width": 53, "height": 57},
            {"name": "sprite40", "x": 7, "y": 314, "width": 49, "height": 43},
            {"name": "sprite41", "x": 72, "y": 314, "width": 48, "height": 43},
            {"name": "sprite42", "x": 335, "y": 325, "width": 70, "height": 65},
            {"name": "sprite43", "x": 431, "y": 325, "width": 70, "height": 65},
            {"name": "sprite44", "x": 141, "y": 368, "width": 51, "height": 61},
            {"name": "sprite45", "x": 199, "y": 370, "width": 50, "height": 60},
            {"name": "sprite46", "x": 261, "y": 371, "width": 53, "height": 57},
            {"name": "sprite47", "x": 8, "y": 375, "width": 48, "height": 49},
            {"name": "sprite48", "x": 68, "y": 377, "width": 56, "height": 45},
            {"name": "sprite49", "x": 335, "y": 405, "width": 70, "height": 65},
            {"name": "sprite50", "x": 431, "y": 405, "width": 70, "height": 65},
            {"name": "sprite51", "x": 141, "y": 432, "width": 51, "height": 61},
            {"name": "sprite52", "x": 199, "y": 434, "width": 49, "height": 60},
            {"name": "sprite53", "x": 261, "y": 435, "width": 53, "height": 57},
            {"name": "sprite54", "x": 71, "y": 440, "width": 49, "height": 47},
            {"name": "sprite55", "x": 7, "y": 441, "width": 50, "height": 46},
            {"name": "sprite56", "x": 16, "y": 499, "width": 5, "height": 8},
            {"name": "sprite57", "x": 22, "y": 499, "width": 5, "height": 8},
            {"name": "sprite58", "x": 34, "y": 499, "width": 5, "height": 8},
            {"name": "sprite59", "x": 40, "y": 499, "width": 5, "height": 8},
            {"name": "sprite60", "x": 28, "y": 501, "width": 5, "height": 6},
            {"name": "sprite61", "x": 205, "y": 515, "width": 42, "height": 66},
            {"name": "sprite62", "x": 461, "y": 515, "width": 42, "height": 66},
            {"name": "sprite63", "x": 13, "y": 518, "width": 48, "height": 64},
            {"name": "sprite64", "x": 77, "y": 518, "width": 48, "height": 64},
            {"name": "sprite65", "x": 141, "y": 518, "width": 48, "height": 64},
            {"name": "sprite66", "x": 269, "y": 518, "width": 48, "height": 64},
            {"name": "sprite67", "x": 333, "y": 518, "width": 48, "height": 64},
            {"name": "sprite68", "x": 397, "y": 518, "width": 48, "height": 64},
            {"name": "sprite69", "x": 205, "y": 595, "width": 42, "height": 66},
            {"name": "sprite70", "x": 461, "y": 595, "width": 42, "height": 66},
            {"name": "sprite71", "x": 13, "y": 598, "width": 48, "height": 64},
            {"name": "sprite72", "x": 77, "y": 598, "width": 48, "height": 64},
            {"name": "sprite73", "x": 141, "y": 598, "width": 48, "height": 64},
            {"name": "sprite74", "x": 269, "y": 598, "width": 48, "height": 64},
            {"name": "sprite75", "x": 333, "y": 598, "width": 48, "height": 64},
            {"name": "sprite76", "x": 397, "y": 598, "width": 48, "height": 64},
            {"name": "sprite77", "x": 0, "y": 674, "width": 63, "height": 75},
            {"name": "sprite78", "x": 64, "y": 674, "width": 63, "height": 75},
            {"name": "sprite79", "x": 128, "y": 674, "width": 63, "height": 75},
            {"name": "sprite80", "x": 192, "y": 674, "width": 63, "height": 75},
            {"name": "sprite81", "x": 256, "y": 674, "width": 63, "height": 75},
            {"name": "sprite82", "x": 357, "y": 688, "width": 22, "height": 32},
            {"name": "sprite83", "x": 389, "y": 688, "width": 22, "height": 32},
            {"name": "sprite84", "x": 421, "y": 688, "width": 22, "height": 32},
            {"name": "sprite85", "x": 453, "y": 688, "width": 22, "height": 32},
            {"name": "sprite86", "x": 485, "y": 688, "width": 22, "height": 32},
            {"name": "sprite87", "x": 293, "y": 770, "width": 98, "height": 121},
            {"name": "sprite88", "x": 405, "y": 770, "width": 98, "height": 121},
            {"name": "sprite89", "x": 2, "y": 775, "width": 44, "height": 65},
            {"name": "sprite90", "x": 50, "y": 775, "width": 44, "height": 65},
            {"name": "sprite91", "x": 98, "y": 775, "width": 44, "height": 65},
            {"name": "sprite92", "x": 146, "y": 775, "width": 44, "height": 65},
            {"name": "sprite93", "x": 194, "y": 775, "width": 44, "height": 65},
            {"name": "sprite94", "x": 0, "y": 866, "width": 48, "height": 44},
            {"name": "sprite95", "x": 48, "y": 866, "width": 48, "height": 44},
            {"name": "sprite96", "x": 96, "y": 866, "width": 48, "height": 44},
            {"name": "sprite97", "x": 181, "y": 898, "width": 98, "height": 121},
            {"name": "sprite98", "x": 293, "y": 898, "width": 98, "height": 121},
            {"name": "sprite99", "x": 405, "y": 898, "width": 98, "height": 121},
            {"name": "sprite100", "x": 0, "y": 914, "width": 48, "height": 44},
            {"name": "sprite101", "x": 48, "y": 914, "width": 48, "height": 44},
            {"name": "sprite102", "x": 103, "y": 922, "width": 34, "height": 28},
            {"name": "sprite103", "x": 7, "y": 970, "width": 33, "height": 27}
        ]
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
        "default": [
            {"name": "smoke_black_1_19_1", "x": 0, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_2", "x": 0, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_3", "x": 50, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_4", "x": 50, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_5", "x": 0, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_6", "x": 50, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_7", "x": 100, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_8", "x": 100, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_9", "x": 100, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_10", "x": 0, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_11", "x": 50, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_12", "x": 100, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_13", "x": 150, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_14", "x": 150, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_15", "x": 150, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_16", "x": 150, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_17", "x": 0, "y": 188, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_18", "x": 50, "y": 188, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_19", "x": 100, "y": 188, "width": 50, "height": 47}
        ]
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
        "default": [
            {"name": "smoke_black_1_19_1", "x": 0, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_2", "x": 0, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_3", "x": 50, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_4", "x": 50, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_5", "x": 0, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_6", "x": 50, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_7", "x": 100, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_8", "x": 100, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_9", "x": 100, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_10", "x": 0, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_11", "x": 50, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_12", "x": 100, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_13", "x": 150, "y": 0, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_14", "x": 150, "y": 47, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_15", "x": 150, "y": 94, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_16", "x": 150, "y": 141, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_17", "x": 0, "y": 188, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_18", "x": 50, "y": 188, "width": 50, "height": 47},
            {"name": "smoke_black_1_19_19", "x": 100, "y": 188, "width": 50, "height": 47}
        ]
    }
};

/**
 * Заморозка
 */
exports.freeze = {
    "image": s_freeze,
    "width": 56,
    "height": 65,
    "left": -10,
    "top": 18,
    "speed": 30,

    "states": {
        "default": [
            {"name": "lighteningball_1_20_1", "x": 56, "y": 0, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_2", "x": 168, "y": 65, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_3", "x": 0, "y": 65, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_4", "x": 56, "y": 65, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_5", "x": 112, "y": 0, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_6", "x": 112, "y": 65, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_7", "x": 0, "y": 130, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_8", "x": 56, "y": 130, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_9", "x": 112, "y": 130, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_10", "x": 168, "y": 0, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_11", "x": 0, "y": 0, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_12", "x": 168, "y": 130, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_13", "x": 0, "y": 195, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_14", "x": 56, "y": 195, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_15", "x": 112, "y": 195, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_16", "x": 168, "y": 195, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_17", "x": 224, "y": 0, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_18", "x": 224, "y": 65, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_19", "x": 224, "y": 130, "width": 56, "height": 65},
            {"name": "lighteningball_1_20_20", "x": 224, "y": 195, "width": 56, "height": 65}
        ]
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
        "default": [
            {"name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64},
            ],
        "run":[
            {"name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64},
            {"name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64},
            {"name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64},
            {"name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64},
            {"name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64},
            {"name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64},
            {"name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64},
            {"name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64},
        ]
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
        "default": [
            {"name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64},
            ],
        "run":[
            {"name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64},
            {"name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64},
            {"name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64},
            {"name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64},
            {"name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64},
            {"name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64},
            {"name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64},
            {"name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64},
        ]
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
        "default": [
            {"name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64},
            ],
        "run":[
            {"name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64},
            {"name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64},
            {"name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64},
            {"name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64},
        ]
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
        "default": [
            {"name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64},
            ],
        "run":[
            {"name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64},
            {"name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64},
            {"name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64},
            {"name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64},
        ]
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
        "default": [
            {"name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64},
            ],
        "run":[
            {"name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64},
            {"name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64},
            {"name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64},
            {"name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64},
        ]
    }
};

/**
 * Тёмная магичка
 */
exports.darka = {
    "image": s_darka,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64},
            {"name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64},
            {"name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64},
            {"name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64},
            {"name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64},
            {"name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64},
            {"name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64},
            {"name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64},
        ]
    }
};

/**
 * Орк
 */
exports.ork = {
    "image": s_ork,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64},
            {"name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64},
            {"name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64},
            {"name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64},
            {"name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64},
            {"name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64},
            {"name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64},
            {"name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64},
        ]
    }
};

/**
 * Эльф
 */
exports.elf = {
    "image": s_elf,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite79", "x": 0, "y": 640, "width": 64, "height": 64},
        ],
        "run": [
            {"name": "sprite80", "x": 64, "y": 640, "width": 64, "height": 64},
            {"name": "sprite81", "x": 128, "y": 640, "width": 64, "height": 64},
            {"name": "sprite82", "x": 192, "y": 640, "width": 64, "height": 64},
            {"name": "sprite83", "x": 256, "y": 640, "width": 64, "height": 64},
            {"name": "sprite84", "x": 320, "y": 640, "width": 64, "height": 64},
            {"name": "sprite85", "x": 384, "y": 640, "width": 64, "height": 64},
            {"name": "sprite86", "x": 448, "y": 640, "width": 64, "height": 64},
            {"name": "sprite87", "x": 512, "y": 640, "width": 64, "height": 64},
        ]
    }
};

/**
 * Пират
 */
exports.pirat = {
    "image": s_pirat,
    "width": 100,
    "height": 100,
    "speed": 14,

    "states": {
        "default": [
            {"name": "sprite19", "x": 0, "y": 128, "width": 64, "height": 64},
        ],
        "run":[
            {"name": "sprite20", "x": 64, "y": 128, "width": 64, "height": 64},
            {"name": "sprite21", "x": 128, "y": 128, "width": 64, "height": 64},
            {"name": "sprite22", "x": 192, "y": 128, "width": 64, "height": 64},
            {"name": "sprite23", "x": 256, "y": 128, "width": 64, "height": 64},
            {"name": "sprite24", "x": 320, "y": 128, "width": 64, "height": 64},
            {"name": "sprite25", "x": 384, "y": 128, "width": 64, "height": 64},
            {"name": "sprite26", "x": 448, "y": 128, "width": 64, "height": 64},
            {"name": "sprite27", "x": 512, "y": 128, "width": 64, "height": 64},
        ]
    }
};


/**
 * Мешок
 */
exports.sack = {
    "image": s_sack,
    "width": 44,
    "height": 44,
    /*"top": 20,
    "left": 10,*/


    "states": {
        "default": [
            {"name": "sprite1", "x": 0, "y": 0, "width": 128, "height": 128},
        ]
    }
};
