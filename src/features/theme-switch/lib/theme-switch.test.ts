import { beforeEach, describe, expect, it } from 'bun:test'
import {
  __resetListeners,
  addThemeListeners,
  COLORS,
  SESSION_STORAGE_NAME,
  setTheme
} from './theme'
import '../components/theme-switch-element'
import { setupMatchMedia } from '@test/mock-match-media'
import { setupStorage } from '@test/mock-session-storage'

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
      <theme-switch id="theme-toggle">
        <label for="toggle" class="checkbox">
          <input type="checkbox" name="toggle" id="toggle" aria-describedby="theme-toggle" />
          <div aria-live="assertive">
            <div id="sun"></div>
            <div id="moon"></div>
          </div>
        </label>
      </theme-switch>
    </body>
  </html>
`

function setupDocument(template: string): void {
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('data-theme-color')
  document.documentElement.innerHTML = template
}

function fireToggle(isChecked: boolean): void {
  const checkbox = document.getElementById('toggle') as HTMLInputElement | null
  if (!checkbox) return
  if (checkbox.checked === isChecked) {
    checkbox.dispatchEvent(new Event('change', { bubbles: true }))
    return
  }
  checkbox.click()
}

beforeEach(() => {
  setupDocument(baseHtml)
  setupStorage(null)
  setupMatchMedia(false)
  __resetListeners()
})

describe('Theme toggle', () => {
  beforeEach(async () => {
    setupDocument(themeToggleHtml)
    await customElements.whenDefined('theme-switch')
    addThemeListeners()
  })

  it('sets up toggle elements correctly for light theme', () => {
    setupMatchMedia(false) // Light mode
    setTheme('light', false)

    const sunElement = document.querySelector('#sun') as HTMLElement
    const moonElement = document.querySelector('#moon') as HTMLElement

    expect(sunElement.style.display).toBe('none')
    expect(moonElement.style.display).toBe('block')
    expect(
      document.querySelector('#theme-toggle')?.getAttribute('checked')
    ).toBe('false')
  })

  it('toggles theme when toggle is clicked', async () => {
    setupMatchMedia(false) // Light mode
    setTheme('light', false)

    // Verify initial state is light
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    // Toggle theme
    fireToggle(true)
    await Promise.resolve()

    // Verify theme changed to dark
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme-color')).toBe(
      COLORS.dark
    )
    expect(
      document
        .querySelector('meta[name="theme-color"]')
        ?.getAttribute('content')
    ).toBe(COLORS.dark)

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

  it('cycles back to light when toggled again', async () => {
    setupMatchMedia(false)
    setTheme('light', false)

    fireToggle(true)
    await Promise.resolve()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    fireToggle(false)
    await Promise.resolve()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})

describe('Theme utilities', () => {
  beforeEach(async () => {
    setupDocument(baseHtml)
    setupMatchMedia(false)
    await customElements.whenDefined('theme-switch')
    addThemeListeners()
  })

  it('applies theme to DOM without toggle present', () => {
    setTheme('light', false)

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme-color')).toBe(
      COLORS.light
    )
    expect(
      document
        .querySelector('meta[name="theme-color"]')
        ?.getAttribute('content')
    ).toBe(COLORS.light)
  })
})
