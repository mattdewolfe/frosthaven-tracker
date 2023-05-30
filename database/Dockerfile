FROM postgres:13.4-alpine3.14@sha256:e64f134c27b0bd74728ce511b0205fa10ea4d1e68aadd18bde123ac26982ef8e

RUN apk add --no-cache --upgrade bash

WORKDIR /workspace

COPY ./postgres/ ./postgres/
COPY ./postgres/parliament/*_up.sql /docker-entrypoint-initdb.d/
COPY ./.env* ./
COPY ./.bakerc* ./
COPY ./bake.sh ./

EXPOSE 5432

USER postgres
