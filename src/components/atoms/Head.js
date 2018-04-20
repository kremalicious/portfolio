import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

const Head = ({ meta }) => {
  const { title, tagline, description } = meta

  return (
    <Helmet
      defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
    >
      <meta name="description" content={description} />
      <link rel="stylesheet" href="https://use.typekit.net/dtg3zui.css" />
    </Helmet>
  )
}

Head.propTypes = {
  meta: PropTypes.object,
}

export default Head
