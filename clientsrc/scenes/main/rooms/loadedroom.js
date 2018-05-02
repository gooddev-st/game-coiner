/**
 * Загружаемая комнаа
 */

import ImageManager from '../../../engine/image_manager'
import Tile from '../../../engine/tile'
import EntityTiled from '../entity_tiled'

/**
 * @class LoadedRoom
 */
export default class {
    constructor(map){
        this.ID = map.ID;

        this.width = map.width;
        this.height = map.height;

        //Урл файла карты
        this.mapFile = map.map_file;

        this.imageManager = new ImageManager('/i/tilesets/');

        //Набор плиток для карты
        this.tiles = {};

        this.layer = {};
        this.decorLayer = {};

        this.objects = [];

        this.cartoons = [];

        this.load();
    }

    load(){

        this.loadFile(this.mapFile, (map)=>{

            this.loadMapProperties(map);

            this.loadTilesets(map);

            this.loadTiles(map);

            this.loadObjects(map);
        });
    }


    loadFile(url, callback){
        let req = new XMLHttpRequest();

        const path = '/maps/';

        req.open("GET", path+url, true);
        req.onreadystatechange = function () {
            if(req.readyState===4 && this.status===200){
                let map;
                try {
                    map = JSON.parse(req.responseText);
                }
                catch (e){
                    log("Ошибка разбора карты");
                    return false;
                }
                callback(map);
            }
        };
        req.send();
    }

    loadMapProperties(map){
        this.cols = map.width;
        this.rows = map.height;
        this.tileWidth = map.tilewidth;
        this.tileHeight = map.tileheight;
        this.width = this.cols*this.tileWidth;
        this.height = this.rows*this.tileHeight;
    }

    loadTilesets(map){

        for(let i in map.tilesets){
            let tileset = map.tilesets[i];

            //Если пофайловый тип
            if(tileset.columns===0){

                for(let j in tileset.tiles){
                    let tile = tileset.tiles[j];
                    //Добавим картинку
                    let imageGid = this.imageManager.add(tile.image),
                        gid = parseInt(j) + parseInt(tileset.firstgid);
                    //Добавим плитку
                    this.tiles[gid] = new Tile({
                        gid: gid, imageGid:imageGid,
                        x: 0, y: 0,
                        width: tile.imagewidth, height: tile.imageheight});
                }
            }
            //Если набор тайлов на одной картинке
            else if(tileset.columns!==0 && tileset.image){
                let imageGid = this.imageManager.add(tileset.image),
                    tileGid = parseInt(tileset.firstgid);


                for (let row = 0; row < tileset.tilecount / tileset.columns; row++) {
                    for (let col = 0; col < tileset.columns; col++) {

                        //Добавим плитку
                        this.tiles[tileGid] = new Tile({
                            gid: tileGid, imageGid: imageGid,
                            x: col * tileset.tilewidth, y: row * tileset.tileheight,
                            width: tileset.tilewidth, height: tileset.tileheight
                        });

                        tileGid++;
                    }

                }

            }
        }
    }


    loadTiles(map){

        let tilelayer = map.layers.find((it)=>{
            return (it.name==="baseTiles" && it.type==="tilelayer" && it.data);
        });

        if(tilelayer){
            this.layer = {
                cols: tilelayer.width,
                rows: tilelayer.height,
                tileWidth: this.tileWidth,
                tileHeight: this.tileHeight,
                data: tilelayer.data,
            };
        }

        let decorlayer = map.layers.find((it)=>{
            return (it.name==="decor" && it.type==="tilelayer" && it.data);
        });

        if(decorlayer){
            this.decorLayer = {
                cols: decorlayer.width,
                rows: decorlayer.height,
                tileWidth: this.tileWidth,
                tileHeight: this.tileHeight,
                data: decorlayer.data,
            };
        }
    }

    /**
     * Грибочки всякие
     * @param ctx
     */
    loadObjects(map){

        map.layers.forEach((it)=>{
            let objectsgroup = it;
            if(it.type==="objectgroup" && it.objects){
                for(let i in objectsgroup.objects){
                    let obj = objectsgroup.objects[i];

                    let x = obj.x, y = obj.y;

                    if(it.name==='cartoons') {

                        this.cartoons.push(
                            new EntityTiled(this.imageManager, this.tiles[obj.gid], x, y)
                        );
                    }
                    //Кроме преград
                    else if(it.name!=='bariers') {
                        this.objects.push({tileGid: obj.gid, x: x, y: y});
                    }
                }
            }
        });
    }

    draw(camera){

        //Сплошной цвет
        camera.context.save();
        camera.context.beginPath();
        camera.context.fillStyle = '#9f8e60';
        camera.context.fillRect(0, 0, camera.width, camera.height);
        camera.context.closePath();
        camera.context.restore();

        if(this.imageManager.loaded) {
            this.drawTiles(camera, this.layer);
            this.drawTiles(camera, this.decorLayer);

            this.drawObjects(camera);
        }

    }

    drawTiles(camera, layer){


        /**
         * Откуда куда рисуем
         */
        let
            //Определим откуда (координаты мира)
            sx = 0, sy = 0, sw = this.width, sh = this.height,
            //куда (координаты камеры) рисуем
            dx = 0, dy = 0, dw = camera.width, dh = camera.height;

        //Если ширина комнаты больше камеры
        if(camera.width < this.width) {
            //рисуем от позиции камеры на её ширину
            sx = camera.x;
            sw = camera.width;
        }
        //ширина комнаты меньше камеры
        else{
            // рисуем от 0 на ширину комнаты, центрируя комнату
            dx = Math.floor((camera.width - this.width)/2);
            dw = this.width;
        }

        if(camera.height < this.height) {
            sy = camera.y;
            sh = camera.height;
        }
        else{
            // dy = -camera.y;
            dy = Math.floor((camera.height - this.height)/2);
            dh = this.height;
        }

        /**
         * Определим участок комнаты для отрисовки (в плитках)
         */
        let
            l = Math.floor(sx/layer.tileWidth),
            t = Math.floor(sy/layer.tileHeight),
            w = Math.ceil(dw/layer.tileWidth)+2, //+2 - Чтоб наверняка
            h = Math.ceil(dh/layer.tileHeight)+2; //+2 - Чтоб наверняка

        /**
         * Отрисуем плитки, обрезая если надо
         */
        for(let i=l;i<l+w;i++){
            for(let j=t;j<t+h;j++){

                let wtx = i*layer.tileWidth,
                    wty = j*layer.tileHeight,
                    tdx = i*layer.tileWidth - camera.x,
                    tdy = j*layer.tileHeight - camera.y,
                    tw = layer.tileWidth,
                    th = layer.tileHeight,
                    tx, ty;

                if(wtx < sx){
                    let crop = sx - wtx;
                    tx = crop;
                    tdx = tdx + crop;
                    tw = tw - crop;
                }
                else{
                    tx = 0;
                }
                if(wty < sy){
                    let crop = sy - wty;
                    ty = crop;
                    tdy = tdy + crop,
                    th = th - crop;
                }
                else{
                    ty = 0;
                }

                if(wtx+layer.tileWidth > sx+sw){
                    let crop = wtx+layer.tileWidth - (sx+sw);
                    tw = tw - crop;
                }

                if(wty+layer.tileHeight > sy+sh){
                    let crop = wty+layer.tileHeight - (sy+sh);
                    th = th - crop;
                }

                if(tw>0 && th>0) {
                    this.drawTile(camera, layer, i, j, tx, ty, tw, th, tdx, tdy, tw, th);
                }

            }
        }
    }


    drawTile(camera, layer, col, row, sx, sy, sw, sh, dx, dy, dw, dh){

        let tileGid = layer.data[row*layer.cols+col],
            tile = this.tiles[tileGid];

        if(!tile) return;

        let image = this.imageManager.get(tile.imageGid),
            x = tile.x + sx,
            y = tile.y + sy;

        if(!image || sw <=0 || sh <=0 || dw <=0 || dh <=0) return;

        camera.context.drawImage(image, x, y, sw, sh, dx, dy, dw, dh);
    }

    drawObjects(camera){

        if(!this.objects || this.objects instanceof Array===false) return;

        this.objects.forEach((it)=> {

            let tile = this.tiles[it.tileGid],
                image = this.imageManager.get(tile.imageGid),

                x = it.x,
                y = it.y - tile.height;//поправка, т.к. у объектов карты 0 снизу

            let w = tile.width, h = tile.height, sx = tile.x, sy = tile.y;


            //Только то, что в камере
            if (
                x < camera.x+camera.width &&
                x > camera.x-tile.width &&
                y < camera.y+camera.height &&
                y > camera.y-tile.height) {

                //Обрезка по границам комнаты
                if(x < 0){w += x;sx -= x;x = 0;}

                if(y < 0){h += y;sy -= y;y = 0;}

                if (x > this.width - tile.width) {w = this.width - x;}

                if (y > this.height - tile.height) {h = this.height - y;}


                x = x - camera.x;
                y = y - camera.y;

                //Обрезка по границам камеры
                if (x < 0) {w += x;sx -= x;x = 0;}

                if (y < 0) {h += y;sy -= y;y = 0;}

                if (x > camera.width - w) {w = camera.width - x;}

                if (y > camera.height - h) {h = camera.height - y;}

                /*camera.context.rect(x, y, w, h);
                camera.context.stroke();*/



                if(!image || w <=0 || h <=0) return;
                camera.context.drawImage(image, sx, sy, w, h, x, y, w, h);
            }
        });
    }
}