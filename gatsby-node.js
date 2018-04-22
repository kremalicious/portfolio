const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const template = path.resolve('src/templates/Project.js')

    resolve(graphql(`
        {
          allProjectsJson {
            edges {
              node {
                title
                slug
                description
                img
                img_more
                techstack
                links {
                  title
                  url
                }
              }
              previous {
                title
                slug
                img
              }
              next {
                title
                slug
                img
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allProjectsJson.edges.forEach(({ node, previous, next }) => {
            const slug = node.slug

            createPage({
              path: slug,
              component: template,
              context: {
                slug,
                previous,
                next,
              },
            })
          }
        )

        resolve()
      }))
  })
}

// https://github.com/saschajullmann/gatsby-starter-gatsbythemes/blob/master/gatsby-node.js
exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.preLoader('eslint-loader', {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      })

      break
  }
  return config
}

// https://github.com/gatsbyjs/gatsby/issues/2285#issuecomment-333343938
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-html') {
    config.loader('null', {
      test: /webfontloader/,
      loader: 'null-loader',
    })
  }
}
