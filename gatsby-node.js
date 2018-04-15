const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const template = path.resolve('src/components/organisms/Project.js')

    resolve(graphql(`
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
                  Dribbble
                  Download
                }
                description
                techstack
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

        result.data.allProjectsJson.edges.forEach(
          ({ node, previous, next }) => {
            const slug = node.slug
            const title = node.title
            const img = node.img
            const img_more = node.img_more
            const description = node.description
            const links = node.links
            const techstack = node.techstack

            createPage({
              path: slug,
              component: template,
              context: {
                title,
                slug,
                img,
                img_more,
                description,
                techstack,
                links,
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
