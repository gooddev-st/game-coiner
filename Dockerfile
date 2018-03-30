FROM node:carbon

WORKDIR /home/node/app

RUN npm install -g nodemon

COPY serversrc/package*.json ./server/

RUN npm install

COPY serversrc/ /home/node/app/server/

EXPOSE 3000

CMD ["nodemon","server/server.js"]