import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(gfm).use(html).process(markdown)
  return result.toString()
}
