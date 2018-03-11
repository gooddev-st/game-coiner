//Картинки спрайтов
let s_doc = document.getElementById('s_doc'),
    s_prof = document.getElementById('s_prof'),
    s_gob = document.getElementById('s_gob'),
    s_coins = document.getElementById('s_coins');

exports.doc = {
    "image": s_doc,
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

exports.prof = {
    "image": s_prof,

    "states": {
        "default": [
            {"name": "prof1", "x": 0, "y": 128, "width": 64, "height": 64},
        ],

        "run": [
            {"name": "prof2", "x": 0, "y": 65, "width": 64, "height": 64},
            {"name": "prof3", "x": 65, "y": 0, "width": 64, "height": 64},
            {"name": "prof4", "x": 65, "y": 65, "width": 64, "height": 64},
            {"name": "prof5", "x": 0, "y": 130, "width": 64, "height": 64},
            {"name": "prof6", "x": 65, "y": 130, "width": 64, "height": 64},
            {"name": "prof7", "x": 130, "y": 0, "width": 64, "height": 64},
            {"name": "prof8", "x": 130, "y": 65, "width": 64, "height": 64},
            {"name": "prof9", "x": 130, "y": 130, "width": 64, "height": 64}
        ]
    }

};

exports.gob = {
    "image": s_gob,

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

exports.coin_gold = {
    "image": s_coins,

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

exports.coin_silver = {
    "image": s_coins,

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

exports.coin_copper = {
    "image": s_coins,

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