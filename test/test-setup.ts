import { GlobalRegistrator } from '@happy-dom/global-registrator'

// Register happy-dom globals
GlobalRegistrator.register()

import { afterAll, afterEach, mock } from 'bun:test'

// Prevent real network requests during tests by mocking fetch globally
// Tests can override fetch as needed
const mockFetch = async () => {
  throw new Error(
    'Real network requests not allowed in tests. Override fetch in your test if needed.'
  )
}
const originalFetch = globalThis.fetch
globalThis.fetch = mockFetch as unknown as typeof fetch

afterEach(() => {
  document.body.innerHTML = ''
  // Reset fetch after each test
  globalThis.fetch = mockFetch as unknown as typeof fetch
})

afterAll(() => {
  globalThis.fetch = originalFetch
  mock.restore()
})
