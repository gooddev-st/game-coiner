FROM node:26-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

RUN npm install -g nodemon

COPY serversrc/package.json serversrc/package-lock.json ./

RUN npm ci --omit=dev

COPY serversrc/ ./

EXPOSE 3000

CMD ["nodemon","server.js"]
