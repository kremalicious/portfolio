export type ThemePreference = 'light' | 'dark'

export const SYSTEM_PREFERENCE_DARK = '(prefers-color-scheme: dark)'
export const SESSION_STORAGE_NAME = 'preferred-theme'
export const THEME_CHANGE_EVENT = 'theme-change'
export const COLORS = {
  light: '#e7eef4',
  dark: '#1d2224'
}

// Assumes a theme has already been applied by a script
// before this module is loaded. We do this in `<head>`.
let currentTheme: ThemePreference = getDocumentTheme()

export function getDocumentTheme(): ThemePreference {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light'
}

export function applyTheme(theme: ThemePreference): void {
  const color = COLORS[theme]
  const htmlEl = document.documentElement
  const metaThemeColor = document.querySelector('meta[name=theme-color]')

  htmlEl.setAttribute('data-theme', theme)
  htmlEl.setAttribute('data-theme-color', color)
  metaThemeColor?.setAttribute('content', color)
}

export function saveTheme(theme: ThemePreference): void {
  sessionStorage.setItem(SESSION_STORAGE_NAME, theme)
}

function broadcastTheme(theme: ThemePreference): void {
  applyTheme(theme)
  document.dispatchEvent(
    new CustomEvent<ThemePreference>(THEME_CHANGE_EVENT, { detail: theme })
  )
}

export function setTheme(theme: ThemePreference, shouldPersist = true): void {
  const themeChanged = currentTheme !== theme
  if (themeChanged) {
    currentTheme = theme
    if (shouldPersist) saveTheme(theme)
  }
  broadcastTheme(theme)
}

let listenersAdded = false

export function addThemeListeners(): void {
  if (listenersAdded) return
  listenersAdded = true

  const systemPreference = window.matchMedia(SYSTEM_PREFERENCE_DARK)

  systemPreference.addEventListener('change', (event) => {
    setTheme(event.matches ? 'dark' : 'light', false)
  })

  document.addEventListener(THEME_CHANGE_EVENT, (event) => {
    const customEvent = event as CustomEvent<ThemePreference | undefined>
    if (customEvent.detail && customEvent.detail !== currentTheme) {
      setTheme(customEvent.detail, true)
    }
  })
}

// For testing: reset the listeners flag
export function __resetListeners(): void {
  listenersAdded = false
}
