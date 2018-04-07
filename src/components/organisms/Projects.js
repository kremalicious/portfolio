import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import FadeIn from '../atoms/FadeIn'
import images from '../../images'
import './Projects.scss'

const Projects = ({ data }) => {
  console.log(data)
  const projects = data.allProjectsJson

  return <div className="projects full-width">
      {projects.edges.map(({ node }) => <FadeIn key={node.slug}>
          <Link key={node.slug} to={`/${node.slug}`} className="projects__project">
            <h1 className="projects__project__title">{node.title}</h1>

            <img className="projects__project__image" src={images[node.img]} alt={node.title} />
          </Link>
        </FadeIn>)}
    </div>
}

Projects.propTypes = {
  data: PropTypes.object,
}

export default Projects
