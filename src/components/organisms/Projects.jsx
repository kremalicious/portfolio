import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import ProjectImage from '../atoms/ProjectImage'
import './Projects.scss'

const Projects = ({ data }) => {
  const projects = data.allProjectsJson.edges
  const images = data.allImageSharp.edges

  return <div className="projects full-width" id="projects">
      {projects.map(({ node }) => {
        return (
          <Link
            key={node.slug}
            to={`/${node.slug}`}
            className="projects__project"
          >
            <h1 className="projects__project__title">{node.title}</h1>
            <ProjectImage sizes={images} alt={node.title} />
          </Link>
        )
      })}
    </div>
}

Projects.propTypes = {
  data: PropTypes.object,
}

export default Projects
