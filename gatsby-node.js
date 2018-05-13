const path = require('path')

// Intersection Observer polyfill
// requires `npm install intersection-observer`
// https://github.com/gatsbyjs/gatsby/issues/2288#issuecomment-334467821
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'build-html') {
    config.loader('null', {
      test: /intersection-observer/,
      loader: 'null-loader',
    })
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

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
              previous {
                title
                slug
                img {
                  id
                  childImageSharp {
                    sizes(maxWidth: 500, quality: 80) {
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                      originalImg
                      originalName
                    }
                  }
                }
              }
              next {
                title
                slug
                img {
                  id
                  childImageSharp {
                    sizes(maxWidth: 500, quality: 80) {
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                      originalImg
                      originalName
                    }
                  }
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allProjectsYaml.edges.forEach(
          ({ node, previous, next }) => {
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
      })
    )
  })
}
