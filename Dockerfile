FROM node:alpine

RUN apk update && \
  apk add --update --no-cache --repository  http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-dev \
  fftw-dev \
  g++ \
  git \
  make \
  bash \
  && rm -rf /var/cache/apk/*

RUN mkdir -p /portfolio
WORKDIR /portfolio

COPY package.json .

RUN npm install && npm cache clean --force
