import { describe, expect, it } from 'bun:test'
import { getCanonicalUrl } from './canonical-url'

const site = new URL('https://matthiaskretschmann.com')

describe('getCanonicalUrl', () => {
  it('normalizes homepage paths to the root URL', () => {
    expect(getCanonicalUrl('/', site)).toBe('https://matthiaskretschmann.com/')
    expect(getCanonicalUrl('/index.html', site)).toBe(
      'https://matthiaskretschmann.com/'
    )
  })

  it('strips .html extensions from subpages', () => {
    expect(getCanonicalUrl('/lugara', site)).toBe(
      'https://matthiaskretschmann.com/lugara'
    )
    expect(getCanonicalUrl('/lugara.html', site)).toBe(
      'https://matthiaskretschmann.com/lugara'
    )
  })
})
