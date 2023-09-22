FROM node:18.16.1-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache yarn

COPY ../package.json ../yarn.lock ./

RUN yarn install  

COPY ./src/api ./src/api

COPY ./src/shared ./src/shared

EXPOSE 8085

CMD [ "yarn", "start" ]
