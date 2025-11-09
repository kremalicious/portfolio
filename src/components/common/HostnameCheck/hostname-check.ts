export const content = `Hi there 👋. Please note that only the code and documentation of this site are open source. But my logo and the combination of typography, colors, and layout making up my brand identity are not. Don't just clone, do a remix.`

export function hostnameCheckInit(
  el: HTMLElement | null,
  allowedHosts: string[]
) {
  if (allowedHosts.length === 0 || !el) return

  const isAllowedHost = allowedHosts.includes(window.location.hostname)

  if (!isAllowedHost) {
    el.style.display = 'block'
    const paragraph = document.createElement('p')
    el.appendChild(paragraph)
    paragraph.textContent = content
  }
}
