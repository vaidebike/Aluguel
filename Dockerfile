FROM node:lts-alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn install
RUN yarn build
COPY . .
CMD node .