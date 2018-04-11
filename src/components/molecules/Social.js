import React from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { Twitter, GitHub, Facebook } from '../atoms/Icons'
import './Social.scss'

const SocialIcon = ({ title }) => {
  if (title === 'Twitter') {
    return <Twitter />
  } else if (title === 'GitHub') {
    return <GitHub />
  } else if (title === 'Facebook') {
    return <Facebook />
  }
}

const Social = ({ meta }) => {
  const social = meta.social

  return (
    <aside className="social">
      {Object.keys(social).map((key, i) => (
        <OutboundLink className="social__link" href={social[key]} key={i} title={key}>
          <SocialIcon title={key} />
        </OutboundLink>
      ))}
    </aside>
  )
}

Social.propTypes = {
  meta: PropTypes.object,
}

export default Social
