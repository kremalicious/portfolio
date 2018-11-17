import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styles from './ProjectImage.module.scss'

export default class ProjectImage extends PureComponent {
  static propTypes = {
    fluid: PropTypes.object.isRequired,
    alt: PropTypes.string
  }

  render() {
    return (
      <Img
        className={styles.projectImage}
        backgroundColor="#6b7f88"
        fluid={this.props.fluid}
        alt={this.props.alt}
      />
    )
  }
}

export const projectImage = graphql`
  fragment ProjectImageFluid on ImageSharp {
    fluid(maxWidth: 1200, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`
