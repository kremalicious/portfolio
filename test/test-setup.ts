import { GlobalRegistrator } from '@happy-dom/global-registrator'

// Register happy-dom globals
GlobalRegistrator.register()

import { afterAll, afterEach, mock } from 'bun:test'

afterEach(() => {
  document.body.innerHTML = ''
})

afterAll(() => {
  mock.restore()
})
