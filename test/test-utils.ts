import { mock } from 'bun:test'

interface CreateFetchMockParams {
  body?: unknown
  error?: Error
}

export function createFetchMock({
  body = {},
  error
}: CreateFetchMockParams): typeof fetch {
  if (error) {
    const rejectMock = async (..._parameters: Parameters<typeof fetch>) => {
      throw error
    }
    return Object.assign(rejectMock, {
      preconnect: async () => {}
    })
  }

  const resolveMock = async (..._parameters: Parameters<typeof fetch>) =>
    new Response(JSON.stringify(body))

  return Object.assign(resolveMock, {
    preconnect: async () => {}
  })
}

type ReadFileMock = ReturnType<
  typeof mock<(path: string, encoding: string) => Promise<string>>
>
type WriteFileMock = ReturnType<
  typeof mock<(path: string, data: string, encoding: string) => Promise<void>>
>
type MkdirMock = ReturnType<
  typeof mock<(path: string, options: { recursive: boolean }) => Promise<void>>
>

export const readFileMock: ReadFileMock = mock(async () => '')
export const writeFileMock: WriteFileMock = mock(async () => {})
export const mkdirMock: MkdirMock = mock(async () => {})

export function setupFsMocks(): void {
  mock.module('node:fs/promises', () => ({
    readFile: readFileMock,
    writeFile: writeFileMock,
    mkdir: mkdirMock
  }))
}

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

type ListenerRecord = Record<string, ((e: MediaQueryListEvent) => void)[]>

export function setupMatchMedia(
  isDarkMode = false,
  trackListeners = false
): ListenerRecord | undefined {
  const listeners: ListenerRecord = {}

  const matchMediaMock = mock().mockImplementation((query) => ({
    matches: query.includes('dark') ? isDarkMode : !isDarkMode,
    addEventListener: trackListeners
      ? mock((event, listener) => {
          if (!listeners[event]) listeners[event] = []
          listeners[event].push(listener as (e: MediaQueryListEvent) => void)
        })
      : mock(),
    removeEventListener: mock(),
    dispatchEvent: mock(),
    onchange: null,
    addListener: mock(),
    removeListener: mock(),
    media: query
  }))

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock
  })

  return trackListeners ? listeners : undefined
}
