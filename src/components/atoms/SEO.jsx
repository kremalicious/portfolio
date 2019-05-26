import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query {
    metaYaml {
      title
      tagline
      description
      url
      img {
        childImageSharp {
          resize(width: 980) {
            src
          }
        }
      }
      social {
        Twitter
      }
      gpg
      addressbook
    }
  }
`

const MetaTags = ({ title, description, url, image, meta }) => {
  return (
    <Helmet
      defaultTitle={`${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}
      titleTemplate={`%s // ${meta.title.toLowerCase()} { ${meta.tagline.toLowerCase()} }`}
      title={title}
    >
      <html lang="en" />

      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={`${meta.url}${image}`} />
      <link rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${meta.url}${image}`} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={meta.social.Twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${meta.url}${image}`} />
    </Helmet>
  )
}

MetaTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.object
}

export default class SEO extends PureComponent {
  static propTypes = {
    project: PropTypes.object
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { project } = this.props
          const meta = data.metaYaml
          const title = (project && project.title) || null
          const description =
            (project && project.fields.excerpt) || meta.description
          const image =
            (project && project.img.childImageSharp.twitterImage.src) ||
            meta.img.childImageSharp.resize.src
          const url = (project && `${meta.url}${project.slug}`) || meta.url

          return (
            <MetaTags
              title={title}
              description={description}
              url={url}
              image={image}
              meta={meta}
            />
          )
        }}
      />
    )
  }
}
