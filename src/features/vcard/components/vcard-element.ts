import { downloadVcard } from '../lib/vcard'

class VcardDownloadElement extends HTMLElement {
  private anchor: HTMLAnchorElement | null = null

  connectedCallback(): void {
    const candidate = this.querySelector('a')
    if (!candidate) return

    this.anchor = candidate
    this.anchor.addEventListener('click', this.handleClick, { passive: false })
  }

  disconnectedCallback(): void {
    this.anchor?.removeEventListener('click', this.handleClick)
    this.anchor = null
  }

  private handleClick = (event: MouseEvent): void => {
    event.preventDefault()
    downloadVcard().catch((error: unknown) => {
      console.error('Failed to create vCard download', error)
    })
  }
}

if (!customElements.get('vcard-download')) {
  customElements.define('vcard-download', VcardDownloadElement)
}
