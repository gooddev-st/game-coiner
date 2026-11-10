/**
 * Поиск пути с обходом препятствий
 */
const collisions = require('./collisions');
module.exports = {findPath, check};

// Графы видимости: комната -> размер объекта -> граф
const graphs = new WeakMap();


/**
 * Путь от start до finish в комнате для объекта размером width x height
 * @param room
 * @param start {x, y}
 * @param finish {x, y}
 * @param width
 * @param height
 * @returns {Array} точки пути без стартовой, пустой - если пути нет
 */
function findPath(room, start, finish, width, height) {
    const bariers = room.bariers;

    if (!bariers || !bariers.length || !check(bariers, -1, finish, width, height, getRoomBox(room))) {
        return [finish];
    }

    const graph = getGraph(room, width, height);

    if (isSegmentFree(start, finish, graph.inflated)) {
        return [finish];
    }

    // Старт и финиш подключаем к копии графа, кешированный граф не меняем
    const vertices = Object.assign({}, graph.nodes),
        A = {id: 'A', x: start.x, y: start.y, neighbors: {}},
        B = {id: 'B', x: finish.x, y: finish.y, neighbors: {}};

    for (let id in graph.nodes) {
        const node = graph.nodes[id];

        if (isSegmentFree(A, node, graph.inflated)) {
            A.neighbors[id] = distance(A, node);
        }

        if (isSegmentFree(node, B, graph.inflated)) {
            vertices[id] = Object.assign({}, node, {
                neighbors: Object.assign({}, node.neighbors, {B: distance(node, B)})
            });
        }
    }

    vertices.A = A;
    vertices.B = B;

    const g = new Graph();
    g.vertices = vertices;

    return g.shortestPath('A', 'B').reverse().map((id) => ({x: vertices[id].x, y: vertices[id].y}));
}


/**
 * Граф видимости комнаты для объекта заданного размера, строится один раз
 * @param room
 * @param width
 * @param height
 * @returns {{inflated: Array, nodes: {}}}
 */
function getGraph(room, width, height) {
    let roomGraphs = graphs.get(room);

    if (!roomGraphs) {
        roomGraphs = new Map();
        graphs.set(room, roomGraphs);
    }

    const key = width + 'x' + height;
    let graph = roomGraphs.get(key);

    if (!graph) {
        graph = buildGraph(room.bariers, width, height, getRoomBox(room));
        roomGraphs.set(key, graph);
    }

    return graph;
}


function buildGraph(bariers, width, height, roomBox) {
    const inflated = inflateBariers(bariers, width, height),
        nodes = getPossibleNodes(bariers, width, height, roomBox),
        ids = Object.keys(nodes);

    ids.forEach((id) => {
        nodes[id].neighbors = {};
    });

    for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
            const a = nodes[ids[i]], b = nodes[ids[j]];

            if (isSegmentFree(a, b, inflated)) {
                const d = distance(a, b);
                a.neighbors[b.id] = d;
                b.neighbors[a.id] = d;
            }
        }
    }

    return {inflated, nodes};
}


/**
 * Препятствия, расширенные на размер объекта: объект (x - левый нижний угол)
 * пересекает препятствие тогда и только тогда, когда точка (x, y) внутри расширенного
 * @param bariers
 * @param width
 * @param height
 * @returns {Array}
 */
function inflateBariers(bariers, width, height) {
    return bariers.map((barier) => ({
        left: barier.left - width,
        right: barier.right,
        top: barier.top,
        bottom: barier.bottom + height,
    }));
}


function isSegmentFree(a, b, inflated) {
    for (let i = 0; i < inflated.length; i++) {
        if (collisions.touchSegment(a, b, inflated[i])) {
            return false;
        }
    }
    return true;
}


function getRoomBox(room) {
    return {
        left: room.dead_zone_left,
        right: room.width - room.dead_zone_right,
        top: room.dead_zone_top,
        bottom: room.height - room.dead_zone_bottom,
    };
}

/**
 * Получение возможных позиций игрока для обхода препятствий
 * @param bariers
 * @param width
 * @param height
 * @param room
 * @returns {{}}
 */
function getPossibleNodes(bariers, width, height, room) {
    let possibleNodes = {},
        offset = 1,
        nodeCounter = 1;
    bariers.forEach((barier, i)=>{
        let l = barier.left - width - offset,
            r = barier.right + offset,
            t = barier.top - offset,
            b = barier.bottom + height + offset;

        let nodes = [
            {x: l, y: t},
            {x: l, y: b},
            {x: r, y: b},
            {x: r, y: t},
        ];

        for(let j=0;j<nodes.length;j++)
        {
            if (check(bariers, i, nodes[j], width, height, room)) {

                possibleNodes[nodeCounter] = {id: nodeCounter, x: nodes[j].x, y: nodes[j].y};
                nodeCounter++;
            }
        }
    });

    return possibleNodes;
}



function check(bariers, i, node, width, height, room) {
    return checkBariers(bariers, i, node, width, height) &&
    !touchBorders(
        {x: node.x, y: node.y, width: width, height: height},
        room.left, room.top, room.right, room.bottom);
}

/**
 * Проверка возможной позиции на пересечение с другими барьерами
 * @param bariers
 * @param currentBarier
 * @param possibleNode
 * @param width
 * @param height
 * @returns {boolean}
 */
function checkBariers(bariers, currentBarier, possibleNode, width, height) {
    for (let j = 0; j < bariers.length; j++) {
        if(currentBarier===j) continue;
        if(
            collisions.touchBar(
                {x: possibleNode.x, y: possibleNode.y, width: width, height: height},
                bariers[j]
            )
        ){
            return false;
        }
    }
    return true;
}


/**
 * Проверка на выход за границы комнаты
 * @param box
 * @param roomLeft
 * @param roomTop
 * @param roomRight
 * @param roomBottom
 * @returns {boolean}
 */
function touchBorders(box, roomLeft, roomTop, roomRight, roomBottom) {
    return !(
        box.x >= roomLeft &&
        box.x + box.width < roomRight &&
        box.y - box.height >= roomTop &&
        box.y < roomBottom
    );
}


function distance(a, b) {
    return Math.sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y));
}


/**
 * Двоичная куча: извлекает элемент с наименьшим приоритетом
 */
function MinHeap() {
    this.items = [];
}

MinHeap.prototype.size = function () {
    return this.items.length;
};

MinHeap.prototype.push = function (priority, key) {
    const items = this.items;
    let i = items.length;

    items.push({priority, key});

    while (i > 0) {
        const parent = (i - 1) >> 1;

        if (items[parent].priority <= items[i].priority) break;

        [items[parent], items[i]] = [items[i], items[parent]];
        i = parent;
    }
};

MinHeap.prototype.pop = function () {
    const items = this.items,
        top = items[0],
        last = items.pop();

    if (items.length) {
        items[0] = last;

        let i = 0;

        for (;;) {
            const left = 2 * i + 1,
                right = left + 1;
            let smallest = i;

            if (left < items.length && items[left].priority < items[smallest].priority) smallest = left;
            if (right < items.length && items[right].priority < items[smallest].priority) smallest = right;
            if (smallest === i) break;

            [items[smallest], items[i]] = [items[i], items[smallest]];
            i = smallest;
        }
    }

    return top;
};


function Graph(){
    this.vertices = {};

    /**
     * Поиск A* с эвклидовой эвристикой
     * @returns {Array} id вершин от finish к start без start, пустой - если пути нет
     */
    this.shortestPath = function (start, finish) {
        const vertices = this.vertices,
            goal = vertices[finish],
            open = new MinHeap(),
            costs = {[start]: 0},
            previous = {},
            closed = {};

        if (!vertices[start] || !goal) {
            return [];
        }

        open.push(distance(vertices[start], goal), start);

        while (open.size()) {
            let current = open.pop().key;

            // В куче могут остаться устаревшие записи вершины
            if (closed[current]) continue;

            if (current === finish) {
                const path = [];

                while (current !== start) {
                    path.push(current);
                    current = previous[current];
                }

                return path;
            }

            closed[current] = true;

            const neighbors = vertices[current].neighbors;

            for (let id in neighbors) {
                if (closed[id]) continue;

                const cost = costs[current] + neighbors[id];

                if (costs[id] === undefined || cost < costs[id]) {
                    costs[id] = cost;
                    previous[id] = current;
                    open.push(cost + distance(vertices[id], goal), id);
                }
            }
        }

        return [];
    };
}
