FROM node

ADD src src
COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install

ENTRYPOINT [ "node","src/bot.js" ]
