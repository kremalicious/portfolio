import React, { memo } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { moveInTop } from '../atoms/Transitions'
import Icon from '../atoms/Icon'
import { useResume } from '../../hooks/use-resume'
import {
  link,
  title,
  small as styleSmall,
  networks
} from './Networks.module.css'

const linkClasses = (key) =>
  key === 'Mail' ? `u-email ${link}` : `u-url ${link}`

const NetworkLink = ({ name, url }) => (
  <a
    className={linkClasses(name)}
    href={url}
    data-testid={`network-${name.toLowerCase()}`}
  >
    <Icon name={name} />
    <span className={title}>{name}</span>
  </a>
)

NetworkLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

function Networks({ small, hide }) {
  const { basics } = useResume()
  if (hide) return null

  const Animation = posed.aside(moveInTop)

  return (
    <Animation className={small ? styleSmall : networks}>
      <NetworkLink name="Mail" url={`mailto:${basics.email}`} />

      {basics.profiles.map((profile) => (
        <NetworkLink
          key={profile.network}
          name={profile.network}
          url={profile.url}
        />
      ))}
    </Animation>
  )
}

export default memo(Networks)

Networks.propTypes = {
  small: PropTypes.bool,
  hide: PropTypes.bool
}
