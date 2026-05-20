#FROM node:buster
FROM node:8-stretch

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

RUN npm install -g nodemon

COPY serversrc/package.json ./

RUN npm install

COPY serversrc/ ./

EXPOSE 3000

CMD ["nodemon","server.js"]