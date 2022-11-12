#!/usr/bin/env node

const url =
  'https://raw.githubusercontent.com/matomo-org/matomo/4.x-dev/matomo.js'

async function getMatomo() {
  const response = await fetch(url)
  const data = await response.text()
  process.stdout.write(`${data}`)
}

getMatomo()

export {}
