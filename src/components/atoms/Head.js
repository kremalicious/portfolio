import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Typekit from './Typekit'

const Head = ({ meta }) => {
  const { title, tagline, description, typekit } = meta

  return (
    <Fragment>
      <Helmet
        defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
        titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      >
        <meta name="description" content={description} />
        <meta content="noindex,nofollow" name="robots" />
      </Helmet>
      <Typekit id={typekit} />
    </Fragment>
  )
}

Head.propTypes = {
  meta: PropTypes.object,
}

export default Head
