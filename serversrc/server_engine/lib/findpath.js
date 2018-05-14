/**
 * Если подключаем как модуль
 */
const collisions = require('./collisions');
module.exports = {getPossibleNodes, check, getNeighbors, Graph};

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
    return Math.floor(Math.sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y)));
}


/**
 * Получение соседей к которым можем пройти без препятствий
 * @param possibleNode
 * @param possibleNodes
 * @param bariers
 * @param width
 * @param height
 */
function getNeighbors(possibleNode, possibleNodes, bariers, width, height) {
    possibleNode.neighbors = {};

    for(let i in possibleNodes){

        if(possibleNodes[i].id===possibleNode.id) continue;

        let A = possibleNode, B = possibleNodes[i];

        if(collisions.touchPlayerSegmentBariers(A, B, width, height, bariers)){
            continue;
        }

        possibleNode.neighbors[B.id] = distance(A, B);
    }
}


function PriorityQueue () {
    this._nodes = [];

    this.enqueue = function (priority, key) {
        this._nodes.push({key: key, priority: priority });
        this.sort();
    };
    this.dequeue = function () {
        return this._nodes.shift().key;
    };
    this.sort = function () {
        this._nodes.sort(function (a, b) {
            return a.priority - b.priority;
        });
    };
    this.isEmpty = function () {
        return !this._nodes.length;
    };
}


function Graph(){
    var INFINITY = 1/0;
    this.vertices = {};

    this.shortestPath = function (start, finish) {
        var nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        for(vertex in this.vertices) {
            if(vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            }
            else {
                distances[vertex] = INFINITY;
                nodes.enqueue(INFINITY, vertex);
            }

            previous[vertex] = null;
        }

        while(!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            if(smallest === finish) {
                path = [];

                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if(!smallest || distances[smallest] === INFINITY){
                continue;
            }

            for(neighbor in this.vertices[smallest].neighbors) {
                alt = distances[smallest] + this.vertices[smallest].neighbors[neighbor];

                if(alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return path;
    };
}
