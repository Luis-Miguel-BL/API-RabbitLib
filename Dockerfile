FROM node:14.15.1-alpine

WORKDIR /project
ADD . .

RUN yarn

EXPOSE 3003
CMD yarn typeorm migration:run && yarn start
