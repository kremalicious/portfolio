const path = require('path')

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
