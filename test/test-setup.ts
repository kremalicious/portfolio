import { GlobalRegistrator } from '@happy-dom/global-registrator'

// Register happy-dom globals
GlobalRegistrator.register()

import { afterEach } from 'bun:test'

afterEach(() => {
  document.body.innerHTML = ''
})
