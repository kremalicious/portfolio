import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import './ProjectImage.scss'

const ProjectImage = ({ fluid, alt }) => (
  <Img
    className="project__image"
    outerWrapperClassName="project__image-wrap"
    backgroundColor="#6b7f88"
    fluid={fluid}
    alt={alt}
  />
)

ProjectImage.propTypes = {
  fluid: PropTypes.object.isRequired,
  alt: PropTypes.string
}

export const projectImage = graphql`
  fragment ProjectImageFluid on ImageSharp {
    fluid(maxWidth: 1200, quality: 85) {
      ...GatsbyImageSharpFluid_noBase64
    }
  }
`

export default ProjectImage
