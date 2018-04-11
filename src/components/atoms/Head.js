import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Head = ({ meta }) => {
  return <Helmet defaultTitle={`${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`} titleTemplate={`%s // ${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}>
      <meta name="description" content={meta.description} />
      <link rel="stylesheet" href="https://use.typekit.net/dtg3zui.css" />
    </Helmet>
}

Head.propTypes = {
  meta: PropTypes.object,
}

export default Head
