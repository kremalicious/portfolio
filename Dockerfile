FROM node:alpine

RUN apk update && \
  apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-tools \
  vips-dev \
  fftw-dev \
  gcc \
  g++ \
  git \
  make \
  autoconf \
  automake \
  bash \
  libc6-compat \
  lcms2-dev \
  libpng-dev \
  && rm -rf /var/cache/apk/*

RUN mkdir -p /portfolio
WORKDIR /portfolio

COPY package.json .

RUN npm install && npm cache clean --force
