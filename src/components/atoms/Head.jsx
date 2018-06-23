import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import SEO from './SEO'
import Typekit from './Typekit'

const Head = ({ meta }) => {
  const { title, tagline, typekitID } = meta

  return (
    <Fragment>
      <Helmet
        defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
        titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      >
        <meta name="apple-mobile-web-app-title" content={title.toLowerCase()} />
        <meta name="theme-color" content="#e7eef4" />
      </Helmet>

      {typekitID && <Typekit id={typekitID} />}

      <SEO meta={meta} />
    </Fragment>
  )
}

Head.propTypes = {
  meta: PropTypes.object.isRequired
}

export default Head
