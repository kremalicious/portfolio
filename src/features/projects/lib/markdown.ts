import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'

type MarkdownNode = {
  type: string
  value?: string
  children?: MarkdownNode[]
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(gfm).use(html).process(markdown)
  return result.toString()
}

function nodeToText(node: MarkdownNode): string {
  if (node.type === 'text' || node.type === 'inlineCode')
    return node.value ?? ''
  if (node.type === 'break') return ' '
  return node.children?.map(nodeToText).join('') ?? ''
}

export function markdownToText(markdown: string) {
  const tree = remark().use(gfm).parse(markdown)
  return tree.children
    .map(nodeToText)
    .filter((text) => text !== '')
    .join(' ')
}
