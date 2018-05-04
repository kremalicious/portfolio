import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const SEO = ({ postMeta, meta }) => {
  const title = postMeta.title || meta.title
  const description = postMeta.description || meta.description
  const image = postMeta.img || meta.img || null
  const url = postMeta.slug ? `${meta.url}/${postMeta.slug}` : meta.url

  return (
    <Helmet>
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
  postMeta: PropTypes.object,
  meta: PropTypes.object,
}

SEO.defaultProps = {
  postMeta: {},
  meta: {},
}

export default SEO
