import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import SEO from './SEO'

const Head = ({ meta, location }) => {
  const { title, tagline } = meta

  return (
    <Fragment>
      <Helmet
        defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
        titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      >
        <meta name="apple-mobile-web-app-title" content={title.toLowerCase()} />

        {location.hostname !== 'matthiaskretschmann.com' && (
          <meta content="noindex,nofollow" name="robots" />
        )}
      </Helmet>
      <SEO meta={meta} />
    </Fragment>
  )
}

Head.propTypes = {
  meta: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Head
