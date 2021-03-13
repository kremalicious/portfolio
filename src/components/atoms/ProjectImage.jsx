import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { projectImage as styleProjectImage } from './ProjectImage.module.css'

export default function ProjectImage({ image, alt }) {
  return (
    <GatsbyImage
      className={styleProjectImage}
      backgroundColor="transparent"
      image={image}
      alt={alt}
    />
  )
}

ProjectImage.propTypes = {
  image: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired
}

export const projectImage = graphql`
  fragment ProjectImageFluid on ImageSharp {
    gatsbyImageData(layout: CONSTRAINED, width: 1440, quality: 85)
  }
`

export const projectImageTeaser = graphql`
  fragment ProjectImageTeaser on ImageSharp {
    gatsbyImageData(layout: CONSTRAINED, width: 980, quality: 85)
  }
`
