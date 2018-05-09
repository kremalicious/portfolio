import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const SEO = ({ project, meta }) => {
  const title = project.title ? project.title : meta.title
  const description = project.description
    ? project.description
    : meta.description
  const image = project.img
    ? project.img.childImageSharp.twitterImage.src
    : meta.img.childImageSharp.resize.src
  const url = project.slug ? `${meta.url}${project.slug}` : meta.url

  return (
    <Helmet>
      <html lang="en" />

      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={meta.social.Twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

SEO.propTypes = {
  project: PropTypes.object,
  meta: PropTypes.object,
}

SEO.defaultProps = {
  project: {},
  meta: {},
}

export default SEO
