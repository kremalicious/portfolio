import { afterEach, describe, expect, it } from 'bun:test'
import { content, hostnameCheckInit } from './hostname-check'

const originalLocation = window.location

function setWindowHostname(hostname: string): void {
  const url = new URL(`https://${hostname}`)
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: url
  })
}

describe('hostnameCheckInit', () => {
  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation
    })
  })

  it('keeps element hidden for allowed hosts', () => {
    setWindowHostname('allowed.example')
    const root = document.createElement('div')
    hostnameCheckInit(root, ['allowed.example'])

    expect(root.style.display).toBe('')
    expect(root.childElementCount).toBe(0)
  })

  it('reveals warning when host is not allowed', () => {
    setWindowHostname('not-allowed.example')
    const root = document.createElement('div')

    hostnameCheckInit(root, ['allowed.example'])

    expect(root.style.display).toBe('block')
    expect(root.childElementCount).toBe(1)
    expect(root.querySelector('p')?.textContent).toBe(content)
  })
})
