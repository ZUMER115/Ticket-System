FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

CMD ['node', 'api/index.js']
