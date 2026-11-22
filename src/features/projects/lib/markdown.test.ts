import { describe, expect, it } from 'bun:test'
import { markdownToHtml, markdownToText } from './markdown'

describe('lib/markdown', () => {
  it('markdownToHtml', async () => {
    const markdown = '# Hello World'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<h1>Hello World</h1>')
  })

  it('markdownToText removes link syntax and joins paragraphs', () => {
    const markdown =
      'It grew out of [Lugara](/lugara/), built with `Bun`.\n\nMy work covered the API.\n'
    expect(markdownToText(markdown)).toBe(
      'It grew out of Lugara, built with Bun. My work covered the API.'
    )
  })
})
