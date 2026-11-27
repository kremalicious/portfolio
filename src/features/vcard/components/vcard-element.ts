import { downloadVcard } from '../lib/vcard'

class VcardDownloadElement extends HTMLElement {
  private button: HTMLButtonElement | null = null

  connectedCallback(): void {
    const candidate = this.querySelector('button')
    if (!candidate) return

    this.button = candidate
    this.button.addEventListener('click', this.handleClick)
  }

  disconnectedCallback(): void {
    this.button?.removeEventListener('click', this.handleClick)
    this.button = null
  }

  private handleClick = (): void => {
    downloadVcard().catch((error: unknown) => {
      console.error('Failed to create vCard download', error)
    })
  }
}

if (!customElements.get('vcard-download')) {
  customElements.define('vcard-download', VcardDownloadElement)
}
