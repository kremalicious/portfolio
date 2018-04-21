import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import WebFont from 'webfontloader'

const Head = ({ meta }) => {
  const { title, tagline, description, url, typekit } = meta

  WebFont.load({ typekit: { id: typekit } })

  return (
    <Helmet
      defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
    >
      <meta name="description" content={description} />

      {window.location.protocol + '//' + window.location.hostname !==
        `${url}` && <meta content="noindex,nofollow" name="robots" />}
    </Helmet>
  )
}

Head.propTypes = {
  meta: PropTypes.object,
}

export default Head
