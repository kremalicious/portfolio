#!/usr/bin/env node
'use strict'

const axios = require('axios')

const url =
  'https://raw.githubusercontent.com/matomo-org/matomo/4.x-dev/matomo.js'

axios(url).then((response) => {
  process.stdout.write(`${response.data}`)
})
