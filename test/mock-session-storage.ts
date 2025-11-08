import { mock } from 'bun:test'

export function setupStorage(theme: string | null = null): void {
  const mockStorage = {
    getItem: mock().mockReturnValue(theme),
    setItem: mock(),
    removeItem: mock(),
    clear: mock(),
    length: theme ? 1 : 0,
    key: mock()
  }

  Object.defineProperty(window, 'sessionStorage', {
    value: mockStorage,
    writable: true
  })
}
