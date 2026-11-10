# Игра в монеты

Браузерная мультиплеерная 2D-игра. Сервер на Node.js (socket.io) держит всю игровую логику, клиент собирается webpack в `static/js/client.js`, данные игроков хранятся в MariaDB.

| Каталог | Что внутри |
|---|---|
| `serversrc/` | игровой сервер |
| `clientsrc/` | исходники клиента |
| `static/` | HTML, собранный клиент, спрайты, звуки, карты |
| `nginx/` | шаблон конфига nginx для `static-web` |
| `local/init.sql` | схема БД для локального запуска |

## Локальный запуск

Нужны Docker с Docker Compose v2 и Node.js 26 (только для сборки клиента, версия указана в `.nvmrc`).

1. Поднять контейнеры:
   ```bash
   docker compose -f docker-compose.local.yml up -d
   ```
   При первом старте MariaDB создаст таблицы из `local/init.sql`, сервер сам установит зависимости.

2. Открыть игру: http://localhost:8090/game.html  
   Логин и пароль любые: если пользователя нет, сервер его создаст.

| Сервис | Адрес |
|---|---|
| Клиент (nginx) | http://localhost:8090 |
| Игровой сервер (socket.io) | localhost:3000 |
| MariaDB | localhost:3336, пользователь `games` / пароль `games`, база `games` |

### Адрес игрового сервера

Клиент берёт адрес сервера из `/config.js`, который nginx формирует из переменной `GAME_SERVER_URL` контейнера `static-web`. По умолчанию локально это `http://localhost:3000`, на проде — `http://${SERVER_HOST}`. Переопределить можно в `.env` или при запуске, после чего пересоздать `static-web`:

```bash
GAME_SERVER_URL=http://192.168.1.10:3000 docker compose -f docker-compose.local.yml up -d static-web
```

### Сборка клиента

Собранный `static/js/client.js` лежит в репозитории, пересобирать нужно только после правок в `clientsrc/`:

```bash
cd clientsrc
npm ci
WEBPACK_WATCH=0 npx webpack   # одна сборка
npx webpack                   # сборка с отслеживанием изменений
```

### Полезные команды

```bash
# логи сервера
docker compose -f docker-compose.local.yml logs -f game-server

# перезапуск сервера после правок в serversrc/ (nodemon локально не используется)
docker compose -f docker-compose.local.yml restart game-server

# остановить
docker compose -f docker-compose.local.yml down

# остановить и удалить БД
docker compose -f docker-compose.local.yml down -v
```

## Прод

На проде используется `docker-compose.yml` (`run.sh`, `stop.sh`, `build.sh`, логи — `make logs`). Он рассчитан на внешнюю сеть `nginxproxy_network` с nginx-proxy, хосты и доступы к БД берутся из `.env`.
