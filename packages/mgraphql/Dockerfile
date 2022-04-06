FROM messenger-shared as build


FROM node:16-alpine

WORKDIR /usr

ENV NODE_ENV=production

COPY --from=build /usr/package.json ./
COPY --from=build /usr/yarn.lock ./
COPY --from=build /usr/node_modules ./node_modules/

COPY --from=build /usr/packages/common ./packages/common/
COPY --from=build /usr/packages/mgraphql ./packages/mgraphql/

WORKDIR /usr/packages/mgraphql

CMD ["yarn", "start:prod"]
