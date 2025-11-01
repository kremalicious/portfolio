import { GlobalRegistrator } from '@happy-dom/global-registrator'
import '@testing-library/jest-dom'

// Register happy-dom globals
GlobalRegistrator.register()

import { afterEach } from 'bun:test'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  document.body.innerHTML = ''
})
