/**
 * Наборы спрайтов
 */


//Картинки
let t_plants = document.getElementById('t_plants');
let s_graves = document.getElementById('s_graves');
let s_campfire = document.getElementById('s_campfire');


/**
 * Пустынное
 */
exports.desert = [{"image": t_plants, "width": 27, "height": 58, "states": {"default": [{"name": "sprite7", "x": 198, "y": 201, "width": 27, "height": 58}]}},
    {"image": t_plants, "width": 76, "height": 92, "states": {"default": [{"name": "sprite14", "x": 233, "y": 330, "width": 76, "height": 92}]}},
    {"image": t_plants, "width": 60, "height": 87, "states": {"default": [{"name": "sprite16", "x": 244, "y": 238, "width": 60, "height": 87}]}},

];

/**
 * Странные деревья
 */
exports.belwood = [
    {"image": t_plants,"width": 107, "height": 128, "states": { "default": [{"name": "sprite1", "x": 0, "y": 201, "width": 107, "height": 128}]}},
    {"image": t_plants, "width": 89, "height": 128, "states": { "default": [{"name": "sprite2", "x": 108, "y": 201, "width": 89, "height": 128}]}},
    {"image": t_plants, "width": 95, "height": 117, "states": { "default": [{"name": "sprite19", "x": 0, "y": 330, "width": 95, "height": 117}]}},
    {"image": t_plants,"width": 126, "height": 116, "states": { "default": [{"name": "sprite20", "x": 244, "y": 0, "width": 126, "height": 116}]}},
];



/**
 * Деревья
 */
exports.bushs = [
    {"image": t_bushs, "width": 113, "height": 118, "states": {"default": [{"name": "sprite3", "x": 136, "y": 0, "width": 113, "height": 118}]}},
    {"image": t_bushs, "width": 102, "height": 140, "states": {"default": [{"name": "sprite4", "x": 0, "y": 0, "width": 102, "height": 140}]}},
];

/**
 * Надгробья
 */
exports.graves = [
    {"image": s_graves, "width": 22, "height": 32, "states": {"default": [{"name": "sprite3", "x": 165, "y": 0, "width": 22, "height": 32},]}},
    {"image": s_graves, "width": 28, "height": 27, "states": {"default": [{"name": "sprite5", "x": 98, "y": 2, "width": 28, "height": 27}]}},
];

/**
 * Костры
 */
exports.campfire = [
    {"image": s_campfire, "width": 64, "height": 64, "states": {"default": [
        {"name": "sprite1", "x": 0, "y": 0, "width": 64, "height": 64},
        {"name": "sprite2", "x": 64, "y": 0, "width": 64, "height": 64},
        {"name": "sprite3", "x": 128, "y": 0, "width": 64, "height": 64},
        {"name": "sprite4", "x": 192, "y": 0, "width": 64, "height": 64},
        {"name": "sprite5", "x": 256, "y": 0, "width": 64, "height": 64}
    ]}},
];

/**
 * Классные деревья
 */
/*
exports.cool_plants = [
    {"image": t_cool_plants, "width": 128, "height": 97, "states": {"default": [{"name": "deadtree1_0", "x": 0, "y": 517, "width": 128, "height": 97}]}},
    {"image": t_cool_plants, "width": 128, "height": 128, "states": {"default": [{"name": "deadtree2", "x": 258, "y": 388, "width": 128, "height": 128}]}},
    {"image": t_cool_plants, "width": 128, "height": 128, "states": {"default": [{"name": "deadtree3", "x": 0, "y": 130, "width": 128, "height": 128}]}},
];*/
