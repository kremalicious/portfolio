import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import 'intersection-observer'
import './ProjectImage.scss'

const ProjectImage = ({ sizes, alt }) => (
  <Img
    className="project__image"
    outerWrapperClassName="project__image-wrap"
    backgroundColor="#6b7f88"
    sizes={sizes}
    alt={alt}
  />
)

ProjectImage.propTypes = {
  sizes: PropTypes.object.isRequired,
  alt: PropTypes.string,
}

export const projectImage = graphql`
  fragment ProjectImageSizes on ImageSharp {
    sizes(maxWidth: 1200) {
      ...GatsbyImageSharpSizes_withWebp_noBase64
    }
  }
`

export default ProjectImage
