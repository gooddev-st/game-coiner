FROM node:carbon

WORKDIR /home/node/app

RUN npm install -g nodemon

COPY src/package*.json ./

RUN npm install

COPY src/ /home/node/app

EXPOSE 3000

CMD ["nodemon","server.js"]