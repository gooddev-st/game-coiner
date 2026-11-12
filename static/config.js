// Без Docker игровой сервер доступен через nginx на том же домене. В Docker nginx отдаёт свой /config.js
window.GAME_SERVER_URL = window.location.origin;
