import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import WebFont from 'webfontloader'

class Head extends React.Component {
  componentDidMount() {
    WebFont.load({ typekit: { id: this.props.meta.typekit } })
  }

  render() {
    const { title, tagline, description, url } = this.props.meta

    return (
      <Helmet
        defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
        titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
      >

        <meta name="description" content={description} />

        <meta content="noindex,nofollow" name="robots" />
      </Helmet>
    )
  }
}

Head.propTypes = {
  meta: PropTypes.object,
}

export default Head
