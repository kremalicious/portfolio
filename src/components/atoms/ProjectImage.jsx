import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { projectImage as styleProjectImage } from './ProjectImage.module.css'

export default function ProjectImage({ image, alt, className }) {
  return (
    <GatsbyImage
      className={`${styleProjectImage} ${className || ''}`}
      backgroundColor="transparent"
      image={image}
      alt={alt}
      as="figure"
    />
  )
}

ProjectImage.propTypes = {
  image: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
}

export const projectImage = graphql`
  fragment ProjectImageFluid on ImageSharp {
    gatsbyImageData(layout: CONSTRAINED, width: 1440, quality: 85)
  }
`

export const projectImageTeaser = graphql`
  fragment ProjectImageTeaser on ImageSharp {
    gatsbyImageData(layout: CONSTRAINED, width: 740, quality: 85)
  }
`

export const projectImageNav = graphql`
  fragment ProjectImageNav on ImageSharp {
    gatsbyImageData(layout: CONSTRAINED, width: 500, quality: 85)
  }
`
