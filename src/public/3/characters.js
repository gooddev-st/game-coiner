import Sprite from "./engine/sprite";
import Character from "./engine/character.js";

export default function characters() {

    var characters = {};

    //Картинки спрайтов
    let sprites_image = document.getElementById('sprites'),
        sprites_image2 = document.getElementById('sprites2'),
        sprites_image_coins = document.getElementById('coins');

    /*
     *   Скины персонажей
     */
    //Доктор
    let char_doctor = new Character([
        new Sprite(sprites_image, 0, 224, 32, 32),
    ]);
    char_doctor.setStateSprites('run', [
        new Sprite(sprites_image, 32, 224, 32, 32),
        new Sprite(sprites_image, 64, 224, 32, 32),
    ]);
    characters["doc"] = char_doctor;

    //Какой-то мужик с фанариком
    let char_man = new Character([
        new Sprite(sprites_image2, 7, 140, 50, 50)
    ]);
    char_man.setStateSprites('run', [
        new Sprite(sprites_image2, 200, 140, 50, 50),
        new Sprite(sprites_image2, 455, 140, 50, 50),
    ]);
    characters["man"] = char_man;

    //Золотая монета
    let gold_coin = new Character([
        new Sprite(sprites_image_coins, 0, 0, 32, 32),
        new Sprite(sprites_image_coins, 32, 0, 32, 32),
        new Sprite(sprites_image_coins, 64, 0, 32, 32),
        new Sprite(sprites_image_coins, 96, 0, 32, 32),
        new Sprite(sprites_image_coins, 128, 0, 32, 32),
        new Sprite(sprites_image_coins, 160, 0, 32, 32),
        new Sprite(sprites_image_coins, 192, 0, 32, 32),
        new Sprite(sprites_image_coins, 224, 0, 32, 32),
    ]);
    characters["gold_coin"] = gold_coin;

    return characters;
}