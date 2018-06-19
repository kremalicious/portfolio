const path = require('path')

// Intersection Observer polyfill
// requires `npm install intersection-observer`
// https://github.com/gatsbyjs/gatsby/issues/2288#issuecomment-334467821
exports.onCreateWebpackConfig = ({ actions, loaders, stage }) => {
  const { setWebpackConfig } = actions

  if (stage === 'build-html') {
    const nullRule = {
      test: /intersection-observer/,
      use: [loaders.null()]
    }

    setWebpackConfig({
      module: {
        rules: [nullRule]
      }
    })
  }
}

//
// Create project pages from projects.yml
//
exports.createPages = ({ actions, graphql }) => {
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
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allProjectsYaml.edges.forEach(({ node }) => {
          const slug = node.slug

          createPage({
            path: slug,
            component: template,
            context: {
              slug
            }
          })
        })

        resolve()
      })
    )
  })
}
