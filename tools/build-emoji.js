/**
 * Список эмодзи для палитры чата из emojibase-data (MIT): static/data/emoji.json
 * Запуск после обновления emojibase-data в clientsrc: node tools/build-emoji.js
 */
const fs = require('fs');
const path = require('path');

const data = (lang) => require(path.join(__dirname, '../clientsrc/node_modules/emojibase-data', lang, 'compact.json'));
const out = path.join(__dirname, '../static/data/emoji.json');

// Группы emojibase по порядку, без «компонентов» (цвета кожи и прически отдельно не показываем).
// Смайлы и люди - одной вкладкой, как в Telegram
const GROUPS = [
    {ids: [0, 1], name: 'Смайлы и люди', icon: '😀'},
    {ids: [3], name: 'Животные и природа', icon: '🐻'},
    {ids: [4], name: 'Еда и напитки', icon: '🍔'},
    {ids: [6], name: 'Досуг', icon: '⚽'},
    {ids: [5], name: 'Путешествия', icon: '✈️'},
    {ids: [7], name: 'Предметы', icon: '💡'},
    {ids: [8], name: 'Символы', icon: '❤️'},
    {ids: [9], name: 'Флаги', icon: '🏁'},
];

// Разговорные названия, которых нет в словаре. Ключ - эмодзи без цвета кожи и пола, подходят и его варианты
const ALIASES = {
    '🤦': 'рука-лицо рукалицо рука лицо facepalm',
    '🤷': 'разведение рук развожу руками развел руками не знаю хз shrug',
    '🙈': 'не вижу стыдно обезьянка',
    '🙊': 'молчу обезьянка',
    '🙉': 'не слышу обезьянка',
    '😂': 'ржу смеюсь до слез лол',
    '🤣': 'ржака катаюсь по полу лол',
    '👍': 'лайк класс ок норм',
    '👎': 'дизлайк плохо',
    '👌': 'ок окей норм',
    '🙏': 'спасибо пожалуйста молюсь',
    '🤝': 'договорились рукопожатие',
    '💪': 'сила бицепс',
    '🤔': 'хм думаю',
    '🙄': 'закатываю глаза',
    '😴': 'сплю зззз',
    '🥳': 'праздник ура',
    '🤡': 'клоун',
    '💩': 'какашка',
    '❤️': 'сердце любовь',
    '🔥': 'огонь круто',
    '🎉': 'ура праздник хлопушка',
    '🤗': 'обнимаю обнимашки',
    '😘': 'целую поцелуй',
    '🫡': 'есть так точно честь',
};
const aliases = (unicode) => ALIASES[[...unicode][0]] || '';

const english = new Map(data('en').map((e) => [e.hexcode, e]));

const groups = GROUPS.map((group) => ({
    name: group.name,
    icon: group.icon,
    // [эмодзи, строка поиска: названия и теги на русском и английском]
    emojis: data('ru')
        .filter((e) => group.ids.includes(e.group))
        .sort((a, b) => a.order - b.order)
        .map((e) => {
            const en = english.get(e.hexcode) || {};
            const words = [e.label, ...(e.tags || []), en.label, ...(en.tags || []), ...aliases(e.unicode).split(' ')];
            return [e.unicode, [...new Set(words.filter(Boolean).map((w) => w.toLowerCase()))].join(' ')];
        }),
}));

fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, JSON.stringify({groups}));

const total = groups.reduce((sum, g) => sum + g.emojis.length, 0);
console.log(`${out}: ${total} эмодзи, ${(fs.statSync(out).size / 1024).toFixed(0)} КБ`);
