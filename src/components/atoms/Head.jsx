import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import SEO from './SEO'

const Head = ({ meta }) => {
  const { title, tagline } = meta

  return (
    <Fragment>
      <Helmet
        defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
        titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      >
        <meta name="apple-mobile-web-app-title" content={title.toLowerCase()} />
      </Helmet>
      <SEO meta={meta} />
    </Fragment>
  )
}

Head.propTypes = {
  meta: PropTypes.object.isRequired,
}

export default Head
