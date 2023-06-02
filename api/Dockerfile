FROM node:lts-alpine3.14@sha256:366c71eebb0da62a832729de2ffc974987b5b00ab25ed6a5bd8d707219b65de4

ENV APP_TARGET="local"
ENV NODE_ENV="development"
ENV DEBUG="fr-api:*"

RUN apk add dumb-init

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

RUN npm install -g npm@8.1.0 \
    && npm install

COPY --chown=node:node . .

EXPOSE 8082

USER node

CMD ["dumb-init", "npx", "nodemon", "-L", "--exec", "node -r esm src/bin/www.js"]
