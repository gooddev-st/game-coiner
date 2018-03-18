//Картинки спрайтов
let s_doc = document.getElementById('s_doc'),
    s_prof = document.getElementById('s_prof'),
    s_gob = document.getElementById('s_gob'),
    s_girl = document.getElementById('s_girl'),
    s_blond = document.getElementById('s_blond'),
    s_mag = document.getElementById('s_mag'),
    s_teleport = document.getElementById('s_teleport'),
    s_coins = document.getElementById('s_coins'),
    t_trees = document.getElementById('t_trees'),
    t_bushs = document.getElementById('t_bushs');


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
            {"name": "sprite3", "x": 136, "y": 0, "width": 113, "height": 118},
            {"name": "sprite4", "x": 0, "y": 0, "width": 102, "height": 140},
            {"name": "sprite5", "x": 156, "y": 119, "width": 15, "height": 13},
            {"name": "sprite6", "x": 103, "y": 40, "width": 21, "height": 19},
            {"name": "sprite7", "x": 136, "y": 119, "width": 19, "height": 19},
            {"name": "sprite8", "x": 103, "y": 0, "width": 32, "height": 39}
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
            {"name": "idle", "x": 0, "y": 0, "width": 90, "height": 49},
        ],
        "run": [
            {"name": "run1", "x": 0, "y": 49, "width": 90, "height": 49},
            {"name": "run2", "x": 0, "y": 98, "width": 90, "height": 49},
            {"name": "run3", "x": 90, "y": 0, "width": 90, "height": 49},
            {"name": "run4", "x": 90, "y": 49, "width": 90, "height": 49}
        ]
    }
};
