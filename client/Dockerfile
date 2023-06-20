FROM node:16

ENV APP_TARGET="local"
ENV NODE_ENV="development"
ENV DEBUG="pm-db_fr-api:*"

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

RUN npm install -g \
    && yarn install

COPY --chown=node:node . .

EXPOSE 3002

USER node

CMD [ "dumb-init", "yarn", "build", "&&" "yarn" "start" ]
