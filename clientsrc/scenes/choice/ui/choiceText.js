const div = document.createElement('div');
div.style.cssText = 'position: fixed; left: 0; top: 0; right: 0; bottom: 0; text-align: center';
div.style.display = 'none';
div.innerHTML = '<h2>Выберите персонаж</h2><p>< нажмите пробел ></p>';
document.body.appendChild(div);

export default {show, hide}

function show() {
    div.style.display = 'block';
}
function hide() {
    div.style.display = 'none';
}
