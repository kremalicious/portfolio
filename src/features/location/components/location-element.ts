import RelativeTime from '@yaireo/relative-time'
import { getLocation } from '../api/get-location'
import type { UseLocation } from '../types/types'

function createFlag(countryCode: string, countryName: string): string {
  if (!countryName || !countryCode) return ''
  const offset = 127397
  const emoji = countryCode.replace(/./g, (char) =>
    String.fromCodePoint(char.charCodeAt(0) + offset)
  )
  return `<span role="img" aria-label="${countryName}" class="flag">${emoji}</span>`
}

export class LocationElement extends HTMLElement {
  private location: UseLocation | null = null
  private relativeTime = new RelativeTime({ locale: 'en' })
  private timeUpdateInterval: number | null = null

  connectedCallback() {
    this.render()
    this.loadLocation()
  }

  disconnectedCallback() {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval)
    }
  }

  private async loadLocation() {
    this.location = await getLocation()
    this.render()
    this.startTimeUpdates()
  }

  private startTimeUpdates() {
    if (!this.location?.now?.city) return

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval)
    }
  }

  private render() {
    this.setAttribute('aria-label', 'Location')

    if (!this.location) {
      this.innerHTML = ''
      return
    }

    let html = ''

    // Current location
    if (this.location.now?.city) {
      const nowFlag = createFlag(
        this.location.now.countryCode,
        this.location.now.country
      )

      html += `
        ${nowFlag}
        ${this.location.now.city} <span>Now</span>
      `
    }

    // Next location
    if (this.location.next?.city) {
      const isDifferentCountry =
        this.location.now?.country !== this.location.next.country

      const nextFlag = isDifferentCountry
        ? createFlag(this.location.next.countryCode, this.location.next.country)
        : ''

      const relativeTimeText = this.relativeTime.from(
        new Date(this.location.next.startDate)
      )

      html += `
        <div class="next">
          ${nextFlag}
          ${this.location.next.city}
          <span>${relativeTimeText}</span>
        </div>
      `
    }

    this.innerHTML = html
    this.classList.add('animation', 'animation--fade-in')
    // Set animation delay based on the number of elements before
    // (networks + availability)
    this.style.setProperty(
      'animation-delay',
      'calc(var(--animation-delay-step) * 6)'
    )
  }
}

customElements.define('location-element', LocationElement)
