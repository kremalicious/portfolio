import { markdownToHtml } from './markdown'

describe('lib/markdown', () => {
  test('markdownToHtml', async () => {
    const markdown = '# Hello World'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<h1>Hello World</h1>')
  })
})
