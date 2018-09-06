import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import SEO from '../atoms/SEO'
import Typekit from '../atoms/Typekit'

const query = graphql`
  query {
    dataYaml {
      title
      tagline
    }
  }
`

const Head = () => (
  <StaticQuery
    query={query}
    render={data => {
      const { title, tagline } = data.dataYaml

      return (
        <Fragment>
          <Helmet
            defaultTitle={`${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
            titleTemplate={`%s // ${title.toLowerCase()} { ${tagline.toLowerCase()} }`}
          >
            <meta
              name="apple-mobile-web-app-title"
              content={title.toLowerCase()}
            />
          </Helmet>

          <Typekit />

          <SEO />
        </Fragment>
      )
    }}
  />
)

export default Head
