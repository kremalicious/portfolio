import { mock } from 'bun:test'

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
