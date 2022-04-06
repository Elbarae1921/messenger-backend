FROM node:16-alpine

RUN apk add --update --no-cache python2 && ln -sf python2 /usr/bin/python
RUN apk add --update alpine-sdk
RUN python2 -m ensurepip

WORKDIR /usr

COPY package.json ./
COPY yarn.lock ./
COPY lerna.json ./

COPY packages/common/package.json ./packages/common/
COPY packages/mgraphql/package.json ./packages/mgraphql/

RUN yarn

COPY packages/common/ ./packages/common/
COPY packages/mgraphql/ ./packages/mgraphql/

RUN yarn build
