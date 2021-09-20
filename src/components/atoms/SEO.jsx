import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useMeta } from '../../hooks/use-meta'
import { useResume } from '../../hooks/use-resume'

const MetaTags = ({ title, description, url, image }) => {
  const { basics } = useResume()
  const twitterHandle = basics.profiles.filter(
    ({ network }) => network === 'Twitter'
  )[0].username

  return (
    <Helmet
      defaultTitle={`${basics.name.toLowerCase()} { ${basics.label.toLowerCase()} }`}
      titleTemplate={`%s // ${basics.name.toLowerCase()} { ${basics.label.toLowerCase()} }`}
      title={title}
    >
      <html lang="en" />

      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={`${basics.website}${image}`} />
      <link rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${basics.website}${image}`} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${basics.website}${image}`} />
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

SEO.propTypes = {
  project: PropTypes.object
}

export default function SEO({ project }) {
  const meta = useMeta()
  const { basics } = useResume()
  const title = (project && project.title) || null
  const description = (project && project.fields.excerpt) || meta.description
  const image =
    (project && project.img.childImageSharp.twitterImage.src) ||
    meta.img.childImageSharp.resize.src
  const url = (project && `${basics.website}${project.slug}`) || basics.website

  return (
    <MetaTags
      title={title}
      description={description}
      url={url}
      image={image}
    />
  )
}
