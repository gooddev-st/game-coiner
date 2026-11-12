// Без Docker игровой сервер доступен через веб-сервер (nginx или Caddy) на том же домене. В Docker nginx отдаёт свой /config.js
window.GAME_SERVER_URL = window.location.origin;
