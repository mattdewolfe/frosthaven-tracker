FROM postgres:15-alpine3.18

RUN apk add --no-cache --upgrade bash

WORKDIR /workspace

COPY ./postgres/ ./postgres/
COPY ./postgres/tracker/*.sql /docker-entrypoint-initdb.d/
COPY ./.env* ./

EXPOSE 5432

USER postgres
