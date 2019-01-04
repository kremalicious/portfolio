const path = require('path')
const remark = require('remark')
const markdown = require('remark-parse')
const html = require('remark-html')

function truncate(n, useWordBoundary) {
  if (this.length <= n) {
    return this
  }
  const subString = this.substr(0, n - 1)
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + '...'
  )
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // Projects YAML nodes
  if (node.internal.type === 'ProjectsYaml') {
    // Add transformed Markdown descriptions
    const description = node.description
    const descriptionWithLineBreaks = description.split('\n').join('\n\n')

    let descriptionHtml

    remark()
      .use(markdown, { gfm: true, commonmark: true, pedantic: true })
      .use(html)
      .process(descriptionWithLineBreaks, (err, file) => {
        if (err) throw Error('Could not transform project description')

        descriptionHtml = file.contents
        return descriptionHtml
      })

    createNodeField({
      node,
      name: 'descriptionHtml',
      value: descriptionHtml
    })

    // Create excerpt from description
    const excerpt = truncate.apply(description, [320, true])

    createNodeField({
      node,
      name: 'excerpt',
      value: excerpt
    })
  }
}

//
// Create project pages from projects.yml
//
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const template = path.resolve('src/templates/Project.jsx')

  const result = await graphql(`
    {
      allProjectsYaml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  result.data.allProjectsYaml.edges.forEach(({ node }) => {
    const { slug } = node

    createPage({
      path: slug,
      component: template,
      context: { slug }
    })
  })
}
