import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './ProjectImage.module.scss'

const ProjectImage = props => (
  <Img
    className={styles.project__image}
    outerWrapperClassName={styles.project__imagewrap}
    backgroundColor="#6b7f88"
    fluid={props.fluid}
    alt={props.alt}
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
