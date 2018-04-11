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

const Social = ({ meta, minimal }) => {
  const social = meta.social
  const classes = minimal ? 'social social--minimal' : 'social'

  return (
    <aside className={classes}>
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
  minimal: PropTypes.bool,
}

export default Social
