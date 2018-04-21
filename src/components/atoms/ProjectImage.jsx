import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import './ProjectImage.scss'

const ProjectImage = ({ sizes, alt }) => (
  <Img
    className="project__image"
    sizes={sizes}
    alt={alt}
  />
)

ProjectImage.propTypes = {
  sizes: PropTypes.object.isRequired,
  alt: PropTypes.string,
}

export default ProjectImage
