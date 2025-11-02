import { beforeEach, describe, expect, it } from 'bun:test'
import { setupMatchMedia, setupStorage } from '@test/test-utils'
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

function setupDocument(template: string): void {
  document.documentElement.innerHTML = template
}

let themeModulePromise: Promise<typeof import('./theme-switch')> | undefined

async function loadThemeModule(): Promise<typeof import('./theme-switch')> {
  if (!themeModulePromise) {
    themeModulePromise = import('./theme-switch')
  }
  const module = await themeModulePromise
  module.resetThemePreference()
  return module
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

  it('cycles back to light when toggle fires twice', async () => {
    setupMatchMedia(false)
    const { reflectPreference } = await loadThemeModule()
    reflectPreference()
    triggerWindowLoad()

    const themeToggleElement = document.getElementById('theme-toggle')

    themeToggleElement?.dispatchEvent(new Event('change'))
    themeToggleElement?.dispatchEvent(new Event('change'))

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme-color')).toBe(
      '#e7eef4'
    )
    expect(
      document.querySelector('#theme-toggle')?.getAttribute('checked')
    ).toBe('false')
    expect(window.sessionStorage.setItem).toHaveBeenLastCalledWith(
      SESSION_STORAGE_NAME,
      'light'
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

describe('Theme utilities', () => {
  it('returns saved preference when present', async () => {
    setupStorage('dark')
    setupMatchMedia(false)
    const { getPreferTheme } = await loadThemeModule()

    const actualTheme = getPreferTheme()

    expect(window.sessionStorage.getItem).toHaveBeenCalledWith(
      SESSION_STORAGE_NAME
    )
    expect(actualTheme).toBe('dark')
  })

  it('reflects preference without toggle present', async () => {
    setupDocument(baseHtml)
    setupMatchMedia(false)
    const { reflectPreference } = await loadThemeModule()

    reflectPreference()

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme-color')).toBe(
      '#e7eef4'
    )
    expect(
      document
        .querySelector('meta[name="theme-color"]')
        ?.getAttribute('content')
    ).toBe('#e7eef4')
  })
})
