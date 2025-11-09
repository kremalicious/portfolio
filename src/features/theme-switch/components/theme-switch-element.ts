import {
  getDocumentTheme,
  THEME_CHANGE_EVENT,
  type ThemePreference
} from '../lib/theme'

// Theme switch works by dispatching and listening to
// theme change events to keep UI in sync
class ThemeSwitchElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener('change', this.handleToggle as EventListener)
    this.syncUI(getDocumentTheme())
    document.addEventListener(
      THEME_CHANGE_EVENT,
      this.handleThemeChange as EventListener
    )
  }

  disconnectedCallback() {
    this.removeEventListener('change', this.handleToggle as EventListener)
    document.removeEventListener(
      THEME_CHANGE_EVENT,
      this.handleThemeChange as EventListener
    )
  }

  private handleToggle = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    if (!target || target.type !== 'checkbox') return

    const theme: ThemePreference = target.checked ? 'dark' : 'light'
    document.dispatchEvent(
      new CustomEvent<ThemePreference>(THEME_CHANGE_EVENT, { detail: theme })
    )
  }

  private handleThemeChange = (event: Event) => {
    const theme = (event as CustomEvent<ThemePreference>).detail
    this.syncUI(theme)
  }

  private syncUI(theme: ThemePreference) {
    const checkbox = this.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement | null
    const sunIcon = this.querySelector('#sun') as HTMLElement | null
    const moonIcon = this.querySelector('#moon') as HTMLElement | null

    if (!checkbox || !sunIcon || !moonIcon) return

    const isDark = theme === 'dark'

    this.setAttribute('checked', `${isDark}`)
    this.setAttribute('aria-checked', `${isDark}`)
    checkbox.checked = isDark
    checkbox.setAttribute('aria-checked', `${isDark}`)
    sunIcon.style.display = isDark ? 'block' : 'none'
    moonIcon.style.display = isDark ? 'none' : 'block'
  }
}

if (!customElements.get('theme-switch')) {
  customElements.define('theme-switch', ThemeSwitchElement)
}
