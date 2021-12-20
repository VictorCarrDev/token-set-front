FROM node:14 AS build-stage

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM nginx:1.17

COPY --from=build-stage /app/build/ /usr/share/nginx/html