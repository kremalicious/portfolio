import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import ProjectImage from '../components/atoms/ProjectImage'
import './index.scss'

const Home = ({ data }) => {
  const projects = data.allProjectsJson.edges

  return (
    <div className="projects full-width" id="projects">
      {projects.map(({ node }) => {
        const { slug, title, img } = node

        return (
          <Link
            key={slug}
            to={slug}
            className="projects__project"
          >
            <h1 className="projects__project__title">{title}</h1>
            <ProjectImage sizes={img.childImageSharp.sizes} alt={title} />
          </Link>
        )
      })}
    </div>
  )
}

Home.propTypes = {
  data: PropTypes.object,
}

export default Home

export const IndexQuery = graphql`
  query IndexQuery {
    allProjectsJson {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              sizes(maxWidth: 1440) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
