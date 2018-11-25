const path = require('path')
const remark = require('remark')
const markdown = require('remark-parse')
const html = require('remark-html')

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
  }
}

//
// Create project pages from projects.yml
//
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const template = path.resolve('src/templates/Project.jsx')

    resolve(
      graphql(`
        {
          allProjectsYaml {
            edges {
              node {
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) reject(result.errors)

        result.data.allProjectsYaml.edges.forEach(({ node }) => {
          const { slug } = node

          createPage({
            path: slug,
            component: template,
            context: { slug }
          })
        })

        resolve()
      })
    )
  })
}
