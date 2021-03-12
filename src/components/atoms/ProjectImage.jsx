import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { projectImage as styleProjectImage } from './ProjectImage.module.css'

export default class ProjectImage extends PureComponent {
  static propTypes = {
    fluid: PropTypes.object.isRequired,
    alt: PropTypes.string
  }

  render() {
    return (
      <Img
        className={styleProjectImage}
        backgroundColor="transparent"
        fluid={this.props.fluid}
        alt={this.props.alt}
      />
    )
  }
}

export const projectImage = graphql`
  fragment ProjectImageFluid on ImageSharp {
    fluid(maxWidth: 1440, quality: 85) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
    }
  }
`
