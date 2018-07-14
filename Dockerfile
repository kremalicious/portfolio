FROM node:alpine

EXPOSE 8000

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
VOLUME /portfolio

COPY ./scripts/entry.sh /
RUN chmod +x /entry.sh
ENTRYPOINT ["/entry.sh"]
