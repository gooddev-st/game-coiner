/**
 * Генератор карты-лабиринта в формате Tiled для загружаемых комнат.
 * Запуск: node tools/generate-maze.js [файл] [зерно]
 */
const fs = require('fs');
const path = require('path');

const MAP_TILES = 50; // карта 50x50 тайлов
const CELLS = 10; // лабиринт 10x10 клеток, между клетками стены в один тайл
const TILE = 64;
const EXTRA_PASSAGES = 0.3; // доля лишних проходов, чтобы были петли
const MONSTERS = ['ork', 'skeleton', 'gob', 'pirat', 'dead', 'kroko', 'juk', 'elf', 'koil', 'darka', 'gunner', 'mag', 'doc', 'prof'];
const MONSTERS_PER_GROUP = 2;

const FLOOR_TILES = [640, 672];
// Стены из того же набора, что на карте labirint: горизонтальная, вертикальные (в левой или правой половине тайла) и углы
const WALL_HORIZONTAL = 918;
const WALL_VERTICAL = {left: 885, right: 887};
const WALL_CORNERS = {ES: 853, WS: 855, EN: 917, WN: 919};
const FLOOR_DECOR = [828, 829, 830, 924, 987, 1019];
const FLOOR_DECOR_CHANCE = 0.03;

const out = process.argv[2] || path.join(__dirname, '../static/maps/maze.json');
let seed = Number(process.argv[3] || 20261110);

function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
}

function pick(list) {
    return list[Math.floor(random() * list.length)];
}

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

// Ширины клеток в тайлах: остаток от деления раздаем последним клеткам
const cellSize = [];
{
    const free = MAP_TILES - (CELLS - 1);
    for (let i = 0; i < CELLS; i++) {
        cellSize.push(Math.floor(free / CELLS) + (i >= CELLS - free % CELLS ? 1 : 0));
    }
}
const cellStart = [];
cellSize.reduce((pos, size) => {
    cellStart.push(pos);
    return pos + size + 1;
}, 0);

// Стены между клетками: right[y][x] - справа от клетки, bottom[y][x] - снизу
const right = [], bottom = [];
for (let y = 0; y < CELLS; y++) {
    right.push(new Array(CELLS).fill(true));
    bottom.push(new Array(CELLS).fill(true));
}

// Лабиринт обходом в глубину
{
    const visited = right.map((row) => row.map(() => false));
    const stack = [[0, 0]];
    visited[0][0] = true;

    while (stack.length) {
        const [x, y] = stack[stack.length - 1];
        const next = shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]])
            .map(([dx, dy]) => [x + dx, y + dy, dx, dy])
            .find(([nx, ny]) => nx >= 0 && ny >= 0 && nx < CELLS && ny < CELLS && !visited[ny][nx]);

        if (!next) {
            stack.pop();
            continue;
        }

        const [nx, ny, dx, dy] = next;
        if (dx === 1) right[y][x] = false;
        if (dx === -1) right[y][nx] = false;
        if (dy === 1) bottom[y][x] = false;
        if (dy === -1) bottom[ny][x] = false;

        visited[ny][nx] = true;
        stack.push([nx, ny]);
    }
}

// Дополнительные проходы
for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
        if (x < CELLS - 1 && right[y][x] && random() < EXTRA_PASSAGES) right[y][x] = false;
        if (y < CELLS - 1 && bottom[y][x] && random() < EXTRA_PASSAGES) bottom[y][x] = false;
    }
}

// Маска стен по тайлам
const wall = [];
for (let r = 0; r < MAP_TILES; r++) wall.push(new Array(MAP_TILES).fill(false));

for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
        const c0 = cellStart[x], r0 = cellStart[y];

        if (x < CELLS - 1 && right[y][x]) {
            for (let r = r0; r < r0 + cellSize[y]; r++) wall[r][c0 + cellSize[x]] = true;
        }
        if (y < CELLS - 1 && bottom[y][x]) {
            for (let c = c0; c < c0 + cellSize[x]; c++) wall[r0 + cellSize[y]][c] = true;
        }
    }
}

// Столбы на пересечениях - если к ним примыкает хоть одна стена
for (let y = 0; y < CELLS - 1; y++) {
    for (let x = 0; x < CELLS - 1; x++) {
        const c = cellStart[x] + cellSize[x], r = cellStart[y] + cellSize[y];
        if (wall[r - 1][c] || wall[r + 1][c] || wall[r][c - 1] || wall[r][c + 1]) {
            wall[r][c] = true;
        }
    }
}

// Препятствия: горизонтальные отрезки в строках стен и вертикальные в столбцах стен
const bariers = [];
const wallRows = cellStart.slice(1).map((s) => s - 1);

wallRows.forEach((r) => {
    for (let c = 0; c < MAP_TILES;) {
        if (!wall[r][c]) { c++; continue; }
        const c0 = c;
        while (c < MAP_TILES && wall[r][c]) c++;
        // Одиночный столб без горизонтальной стены будет покрыт вертикальным отрезком
        if (c - c0 > 1) bariers.push({x: c0, y: r, w: c - c0, h: 1});
    }
});

// Сторона тайла, в которой нарисована вертикальная стена: к ней примыкают горизонтальные стены на концах
const verticalSide = wall.map((row) => row.map(() => null));

wallRows.forEach((c) => {
    for (let r = 0; r < MAP_TILES;) {
        if (!wall[r][c]) { r++; continue; }
        const r0 = r;
        while (r < MAP_TILES && wall[r][c]) r++;
        // Одиночный столб без вертикальной стены уже покрыт горизонтальным отрезком
        if (r - r0 < 2) continue;

        const east = wall[r0][c + 1] || wall[r - 1][c + 1],
            west = wall[r0][c - 1] || wall[r - 1][c - 1],
            side = east && !west ? 'left' : 'right';

        for (let rr = r0; rr < r; rr++) verticalSide[rr][c] = side;
        bariers.push({x: side === 'left' ? c : c + 0.5, y: r0, w: 0.5, h: r - r0});
    }
});

const barierObjects = bariers.map((b, i) => ({
    height: b.h * TILE, id: i + 1, name: '', rotation: 0, type: '', visible: true,
    width: b.w * TILE, x: b.x * TILE, y: b.y * TILE,
}));

// Тайл стены по соседним стенам
function wallTile(r, c) {
    const at = (rr, cc) => rr >= 0 && cc >= 0 && rr < MAP_TILES && cc < MAP_TILES && wall[rr][cc];
    const n = at(r - 1, c), s = at(r + 1, c), w = at(r, c - 1), e = at(r, c + 1);

    const side = verticalSide[r][c] || 'right';

    if ((n || s) && !(w || e)) return WALL_VERTICAL[side];

    // Угол рисуем, только если его вертикальная часть с той же стороны, что и стена под/над ним
    const corner = (e && !w ? 'E' : w && !e ? 'W' : '') + (s && !n ? 'S' : n && !s ? 'N' : '');
    const cornerSide = corner[0] === 'E' ? 'left' : 'right';

    return corner.length === 2 && cornerSide === side ? WALL_CORNERS[corner] : WALL_HORIZONTAL;
}

// Тайлы
const baseTiles = [], decor = [];
for (let r = 0; r < MAP_TILES; r++) {
    for (let c = 0; c < MAP_TILES; c++) {
        baseTiles.push(pick(FLOOR_TILES));

        const nearEntrance = r < cellSize[0] && c < cellSize[0];
        if (wall[r][c]) decor.push(wallTile(r, c));
        else if (!nearEntrance && random() < FLOOR_DECOR_CHANCE) decor.push(pick(FLOOR_DECOR));
        else decor.push(0);
    }
}

// Орки - в клетках, самых дальних от входа
const distance = right.map((row) => row.map(() => Infinity));
{
    const queue = [[0, 0]];
    distance[0][0] = 0;
    while (queue.length) {
        const [x, y] = queue.shift();
        const moves = [
            [x + 1, y, x < CELLS - 1 && !right[y][x]],
            [x - 1, y, x > 0 && !right[y][x - 1]],
            [x, y + 1, y < CELLS - 1 && !bottom[y][x]],
            [x, y - 1, y > 0 && !bottom[y - 1][x]],
        ];
        moves.forEach(([nx, ny, open]) => {
            if (open && distance[ny][nx] === Infinity) {
                distance[ny][nx] = distance[y][x] + 1;
                queue.push([nx, ny]);
            }
        });
    }
}

const cells = [];
for (let y = 0; y < CELLS; y++) for (let x = 0; x < CELLS; x++) cells.push({x, y, d: distance[y][x]});
if (cells.some((cell) => cell.d === Infinity)) throw new Error('Лабиринт несвязный');

// Клетки групп мобов: сначала дальние от входа, разнесенные друг от друга. Если не помещаются - сближаем
cells.sort((a, b) => b.d - a.d);

let groupCells = [];
for (let spacing = 3; spacing >= 0 && groupCells.length < MONSTERS.length; spacing--) {
    groupCells = [];
    cells.forEach((cell) => {
        if (cell.d > 2 && groupCells.length < MONSTERS.length &&
            groupCells.every((o) => Math.abs(o.x - cell.x) + Math.abs(o.y - cell.y) > spacing)) {
            groupCells.push(cell);
        }
    });
}

const populations = groupCells.map((cell, i) => ({
    height: cellSize[cell.y] * TILE, id: barierObjects.length + i + 1, name: MONSTERS[i] + 'Population',
    properties: {maxNum: MONSTERS_PER_GROUP, monster: MONSTERS[i], spawnTime: 30},
    propertytypes: {maxNum: 'int', monster: 'string', spawnTime: 'float'},
    rotation: 0, type: 'population', visible: true,
    width: cellSize[cell.x] * TILE, x: cellStart[cell.x] * TILE, y: cellStart[cell.y] * TILE,
}));

const objectLayer = (name, objects) => ({draworder: 'topdown', name, objects, opacity: 1, type: 'objectgroup', visible: true, x: 0, y: 0});
const tileLayer = (name, data) => ({data, height: MAP_TILES, name, opacity: 1, type: 'tilelayer', visible: true, width: MAP_TILES, x: 0, y: 0});

const map = {
    height: MAP_TILES, width: MAP_TILES, infinite: false,
    layers: [
        tileLayer('baseTiles', baseTiles),
        tileLayer('decor', decor),
        objectLayer('bariers', barierObjects),
        objectLayer('populations', populations),
    ],
    nextobjectid: barierObjects.length + populations.length + 1,
    orientation: 'orthogonal', renderorder: 'left-up', tiledversion: '1.1.4',
    tileheight: TILE, tilewidth: TILE,
    tilesets: [{
        columns: 32, firstgid: 1, image: 'terrain_atlas.png', imageheight: 2048, imagewidth: 2048,
        margin: 0, name: 'terrain_atlas', spacing: 0, tilecount: 1024, tileheight: TILE, tilewidth: TILE,
    }],
    type: 'map', version: 1,
};

fs.writeFileSync(out, JSON.stringify(map));
console.log(`Карта ${out}: препятствий ${barierObjects.length}, групп мобов ${populations.length}`);
