module.exports = {touchBar, touchPoint, touchSegment, touchPlayerSegmentBariers};


/**
 * Соприкосновение объемного объекта с препятствием
 * @param bar
 * @param barier
 * @returns {boolean}
 */
function touchBar(bar, barier) {

    return barier.left < bar.x + bar.width &&
        barier.right > bar.x &&
        barier.top < bar.y &&
        barier.bottom > bar.y - bar.height;

}

/**
 * Соприкосновение точки с препятствием
 * @param point
 * @param barier
 * @returns {boolean}
 */
function touchPoint(point, barier) {
    return barier.left < point.x &&
        barier.right > point.x &&
        barier.top < point.y &&
        barier.bottom > point.y;
}


/**
 * Пересечение отрезка и препятствия
 * @param _a
 * @param _b
 * @param barier
 */
function touchSegment(_a, _b, barier) {
    let a = _a, b = _b,
        codeA = bitCode(a, barier),
        codeB = bitCode(b, barier);

    while (codeA | codeB){

        if(codeA & codeB) return false; //не пересекаются

        if(codeA){
            a = intersect(a, b, codeA, barier);
            codeA = bitCode(a, barier);
        }
        else{
            b = intersect(a, b, codeB, barier);
            codeB = bitCode(b, barier);
        }
    }

    //Пересекаются или отрезок внутри препятствия
    return true;
}


/**
 * Пересечение отрезка пути объемного объекта с препятствием
 * @param _a
 * @param _b
 * @param barier
 * @param width
 * @param height
 * @returns {boolean}
 */
function touchPlayerSegment(_a, _b, barier, width, height) {
    let a = _a, b = _b,
        points = [
            {x: 0, y: 0},
            {x: width, y: 0},
            {x: width, y: height},
            {x: 0, y: height},
        ];

    for(let i=0;i<points.length;i++){
        if(
            touchSegment(
                {x: a.x + points[i].x, y: a.y - points[i].y},
                {x: b.x + points[i].x, y: b.y - points[i].y},
                barier
            )
        ){
            return true;
        }
    }
    return false;
}


function touchPlayerSegmentBariers(_a, _b, width, height, bariers){
    for(let i=0;i<bariers.length;i++){
        let is = touchPlayerSegment(_a, _b, bariers[i], width, height);
        if(is) return true;
    }
    return false;
}


/**
 * Получение битового кода расположения точки относительно препятствия
 * 1 - левее, 2 - правее, 4 - ниже, 8 - выше
 * @param point
 * @param barier
 * @returns {number}
 */
function bitCode(point, barier) {

    var code = 0;

    if (point.x < barier.left) code |= 1; // левей
    else if (point.x > barier.right) code |= 2; // правей

    if (point.y > barier.bottom) code |= 4; // ниже
    else if (point.y < barier.top) code |= 8; // выше

    return code;

};


function intersect(a, b, edge, barier) {
    return edge & 8 ? {x: a.x + (b.x - a.x) * (barier.top - a.y) / (b.y - a.y), y: barier.top } : // выше
        edge & 4 ? {x: a.x + (b.x - a.x) * (barier.bottom - a.y) / (b.y - a.y), y: barier.bottom } : // ниже
        edge & 2 ? {x: barier.right, y: a.y + (b.y - a.y) * (barier.right - a.x) / (b.x - a.x)} : // правее
        edge & 1 ? {x: barier.left, y: a.y + (b.y - a.y) * (barier.left - a.x) / (b.x - a.x)} : // левее
        null;
}