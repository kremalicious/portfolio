import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import ProjectImage from '../components/atoms/ProjectImage'
import FullWidth from '../components/atoms/FullWidth'
import './index.scss'

const Home = ({ data }) => {
  const projects = data.allProjectsYaml.edges

  return (
    <FullWidth id="projects" className="projects">
      {projects.map(({ node }) => {
        const { slug, title, img } = node

        return (
          <article className="projects__project" key={slug}>
            <Link to={slug}>
              <h1 className="projects__project__title">{title}</h1>
              <ProjectImage sizes={img.childImageSharp.sizes} alt={title} />
            </Link>
          </article>
        )
      })}
    </FullWidth>
  )
}

Home.propTypes = {
  data: PropTypes.object,
}

export default Home

export const IndexQuery = graphql`
  query IndexQuery {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              ...ProjectImageSizes
            }
          }
        }
      }
    }
  }
`
