# Игра в монеты

Браузерная мультиплеерная 2D-игра. Сервер на Node.js (socket.io) держит всю игровую логику, клиент собирается webpack в `static/js/client.js`, данные игроков хранятся в MariaDB.

| Каталог | Что внутри |
|---|---|
| `serversrc/` | игровой сервер |
| `clientsrc/` | исходники клиента |
| `static/` | HTML, собранный клиент, спрайты, звуки, карты |
| `nginx/` | шаблон конфига nginx для `static-web` |
| `local/init.sql` | схема БД |
| `deploy/` | конфиги и хук деплоя для запуска на VPS без Docker |

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

## VPS без Docker

Рассчитано на VPS с 1 ГБ ОЗУ и Debian 12 или Ubuntu 24.04. Сервер занимает около 100 МБ, MariaDB с профилем из `deploy/` — около 70 МБ. Игровой сервер слушает `127.0.0.1:3000`, наружу открыт только веб-сервер (nginx или Caddy): он отдаёт `static/` и проксирует `/socket.io/` на игровой сервер. Клиент подключается к тому же домену (`static/config.js`).

A-запись домена `game.good-dev.tech` должна указывать на VPS.

Код лежит в bare-репозитории `/opt/game-coiner.git`, рабочая копия — `/opt/game-coiner`. Деплой — `git push` в этот репозиторий, см. [Деплой](#деплой).

1. Swap, чтобы установка пакетов не упиралась в память:
   ```bash
   fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
   echo '/swapfile none swap sw 0 0' >> /etc/fstab
   ```

2. Пакеты и Node.js 26:
   ```bash
   apt update && apt install -y git mariadb-server
   curl -fsSL https://deb.nodesource.com/setup_26.x | bash - && apt install -y nodejs
   ```

3. Код и хук деплоя. Клиент на VPS не собирается: `static/js/client.js` лежит в репозитории.
   ```bash
   useradd --system --home /opt/game-coiner --shell /usr/sbin/nologin game
   git clone --bare https://github.com/gooddev-st/game-coiner.git /opt/game-coiner.git
   mkdir /opt/game-coiner && git --git-dir=/opt/game-coiner.git --work-tree=/opt/game-coiner checkout -f master
   install -m 755 /opt/game-coiner/deploy/post-receive /opt/game-coiner.git/hooks/
   cd /opt/game-coiner/serversrc && npm ci --omit=dev
   ```

4. MariaDB:
   ```bash
   cp /opt/game-coiner/deploy/mariadb-small.cnf /etc/mysql/mariadb.conf.d/60-game-coiner.cnf
   systemctl restart mariadb
   mariadb -e "CREATE DATABASE games; CREATE USER 'games'@'127.0.0.1' IDENTIFIED BY 'пароль'; GRANT ALL ON games.* TO 'games'@'127.0.0.1';"
   mariadb games < /opt/game-coiner/local/init.sql
   ```
   Пользователь создаётся для `127.0.0.1`, а не `localhost`: из-за `skip-name-resolve` TCP-подключение не совпадёт с `localhost`.

5. Сервис:
   ```bash
   cp /opt/game-coiner/deploy/game-coiner.env.example /etc/game-coiner.env   # вписать пароль БД
   chmod 640 /etc/game-coiner.env && chgrp game /etc/game-coiner.env
   cp /opt/game-coiner/deploy/game-coiner.service /etc/systemd/system/
   systemctl daemon-reload && systemctl enable --now game-coiner
   ```

6. HTTPS — один из вариантов.

   **Caddy.** Подходит, если Caddy уже занимает 80/443 (например, с NaiveProxy) или nginx не нужен. Сертификат Caddy получает и продлевает сам. Дописать блок сайта в конец `/etc/caddy/Caddyfile` и перечитать конфиг:
   ```bash
   cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak
   (echo; cat /opt/game-coiner/deploy/Caddyfile.game-coiner) >> /etc/caddy/Caddyfile
   caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy
   ```
   Сайт с конкретным доменом приоритетнее catch-all блоков вроде `:443`, поэтому остальные сайты Caddy не затрагиваются. Email для Let's Encrypt можно указать директивой `tls email@example.com` в блоке сайта.

   **nginx.** Сертификат получаем, пока работает стандартный сайт nginx, затем включаем свой конфиг:
   ```bash
   apt install -y nginx certbot python3-certbot-nginx
   certbot certonly --nginx -d game.good-dev.tech
   cp /opt/game-coiner/deploy/nginx-game-coiner.conf /etc/nginx/sites-available/game-coiner
   ln -s /etc/nginx/sites-available/game-coiner /etc/nginx/sites-enabled/ && rm /etc/nginx/sites-enabled/default
   nginx -t && systemctl reload nginx
   ```
   Продление делает `certbot.timer`, ничего настраивать не нужно.

7. Файрвол (если используется `ufw`):
   ```bash
   ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw enable
   ```

Игра: https://game.good-dev.tech/game.html

### Деплой

Один раз добавить VPS как remote (нужен SSH-доступ по ключу):

```bash
git remote add prod root@game.good-dev.tech:/opt/game-coiner.git
```

Выкладка — push ветки `master`:

```bash
git push prod master
```

Хук `deploy/post-receive` выкладывает код в `/opt/game-coiner`, запускает `npm ci` в `serversrc/`, если изменился `package-lock.json`, и перезапускает `game-coiner`. Результат выводится в консоль push. Push других веток код не выкладывает. Клиент собирается локально: перед деплоем закоммитить пересобранный `static/js/client.js` и поднять версию в `static/game.html`.

После правок самого хука в репозитории его нужно обновить на сервере:

```bash
ssh root@game.good-dev.tech install -m 755 /opt/game-coiner/deploy/post-receive /opt/game-coiner.git/hooks/
```

Логи:

```bash
ssh root@game.good-dev.tech journalctl -u game-coiner -f
```

## Чат

Общий чат на весь сервер: панель в игре и отдельная страница `chat.html`. Пишут и читают только пользователи с флагом `user.chat_allowed`:

```bash
ssh root@game.good-dev.tech "mariadb games -e \"UPDATE user SET chat_allowed=1 WHERE login='Логин'\""
```

Миграции базы лежат в `deploy/migrations/`, их можно запускать повторно. Перед деплоем кода, которому они нужны:

```bash
ssh root@game.good-dev.tech 'mariadb games' < deploy/migrations/002-chat-push.sql
```

### Пуши

Уведомления о новых сообщениях (Web Push) включаются кнопкой 🔔 в шапке чата. Пуш получают подписанные пользователи, у которых чат сейчас не на экране. На iPhone пуши работают только для сайта, добавленного на экран «Домой».

Нужны ключи VAPID. Локально сервер создает их сам в `serversrc/.vapid.json` (файл не в git). На проде - один раз сгенерировать и вписать в `/etc/game-coiner.env` (см. `deploy/game-coiner.env.example`), затем перезапустить сервис:

```bash
ssh root@game.good-dev.tech 'cd /opt/game-coiner/serversrc && node -e "console.log(require(\"web-push\").generateVAPIDKeys())"'
```

Если ключи сменить, старые подписки перестанут работать - пользователям придется включить уведомления заново.
