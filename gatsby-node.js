const path = require('path')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const template = path.resolve('src/layouts/Project.js')

    resolve(
      graphql(`
        {
          allProjectsJson {
            edges {
              node {
                title
                slug
                img
                img_more
                links {
                  Link
                  GitHub
                  Info
                }
                description
                techstack
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        console.log(result)

        result.data.allProjectsJson.edges.forEach(({ node }) => {
          const slug = node.slug

          createPage({
            path: slug,
            component: template,
            context: { slug: slug },
          })
        })

        resolve()
      }))
  })
}
