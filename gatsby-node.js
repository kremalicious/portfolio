const path = require('path')

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
              previous {
                title
                slug
                img {
                  id
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 80) {
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
                    fluid(maxWidth: 500, quality: 80) {
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
                next
              }
            })
          }
        )

        resolve()
      })
    )
  })
}
