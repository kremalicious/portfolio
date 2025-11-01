import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { SESSION_STORAGE_NAME } from './theme-switch'

const baseHtml = `
  <html>
    <head>
      <meta name="theme-color">
    </head>
    <body>
    </body>
  </html>
`

const themeToggleHtml = `
  <html>
    <head>
      <meta name="theme-color">
    </head>
    <body>
      <div id="theme-toggle">
        <label for="toggle" class="checkbox">
          <input type="checkbox" name="toggle" id="toggle" aria-describedby="theme-toggle" />
          <div aria-live="assertive">
            <div id="sun"></div>
            <div id="moon"></div>
          </div>
        </label>
      </div>
    </body>
  </html>
`

type ListenerRecord = Record<string, ((e: MediaQueryListEvent) => void)[]>

function setupDocument(template: string): void {
  document.documentElement.innerHTML = template
}

function setupStorage(theme: string | null = null): void {
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

function setupMatchMedia(
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

async function loadThemeModule(): Promise<typeof import('./theme-switch')> {
  const cacheBuster = crypto.randomUUID()
  return await import(`./theme-switch?cache=${cacheBuster}`)
}

function triggerWindowLoad(): void {
  window.onload?.(new Event('load') as any)
}

beforeEach(() => {
  setupDocument(baseHtml)
  setupStorage(null)
  setupMatchMedia(false)
})

describe('Theme toggle', () => {
  beforeEach(() => {
    setupDocument(themeToggleHtml)
  })

  it('sets up toggle elements correctly for light theme', async () => {
    setupMatchMedia(false) // Light mode
    const { reflectPreference } = await loadThemeModule()
    reflectPreference()
    triggerWindowLoad()

    const sunElement = document.querySelector('#sun') as HTMLElement
    const moonElement = document.querySelector('#moon') as HTMLElement

    expect(sunElement.style.display).toBe('none')
    expect(moonElement.style.display).toBe('block')
    expect(
      document.querySelector('#theme-toggle')?.getAttribute('checked')
    ).toBe('false')
  })

  it('sets up toggle elements correctly for dark theme', async () => {
    setupMatchMedia(true) // Dark mode
    const { reflectPreference } = await loadThemeModule()
    reflectPreference()
    triggerWindowLoad()

    const sunElement = document.querySelector('#sun') as HTMLElement
    const moonElement = document.querySelector('#moon') as HTMLElement

    expect(sunElement.style.display).toBe('block')
    expect(moonElement.style.display).toBe('none')
    expect(
      document.querySelector('#theme-toggle')?.getAttribute('checked')
    ).toBe('true')
  })

  it('toggles theme when toggle is clicked', async () => {
    setupMatchMedia(false) // Light mode
    const { reflectPreference } = await loadThemeModule()
    reflectPreference()
    triggerWindowLoad()

    // Verify initial state is light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    // Toggle theme
    const themeToggleElement = document.getElementById('theme-toggle')
    themeToggleElement?.dispatchEvent(new Event('change'))

    // Verify theme changed to dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme-color')).toBe(
      '#1d2224'
    )
    expect(
      document
        .querySelector('meta[name="theme-color"]')
        ?.getAttribute('content')
    ).toBe('#1d2224')

    // Verify toggle UI updated
    const sunElement = document.querySelector('#sun') as HTMLElement
    const moonElement = document.querySelector('#moon') as HTMLElement
    expect(sunElement.style.display).toBe('block')
    expect(moonElement.style.display).toBe('none')
    expect(
      document.querySelector('#theme-toggle')?.getAttribute('checked')
    ).toBe('true')

    // Verify preference saved
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      SESSION_STORAGE_NAME,
      'dark'
    )
  })
})

describe('System preference changes', () => {
  it('updates theme when system preference changes', async () => {
    const listeners = setupMatchMedia(false, true) // Start with light mode, track listeners
    const { reflectPreference } = await loadThemeModule()
    reflectPreference()
    triggerWindowLoad()

    // Verify initial state is light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    // Simulate system preference change to dark
    if (listeners?.change && listeners.change.length > 0) {
      listeners.change[0]({ matches: true } as MediaQueryListEvent)
    }

    // Verify theme changed to dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme-color')).toBe(
      '#1d2224'
    )
  })
})
