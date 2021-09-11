import React from 'react'
import PropTypes from 'prop-types'
import { motion, useReducedMotion } from 'framer-motion'
import { moveInBottom, getAnimationProps } from '../atoms/Transitions'
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

export default function Networks({ small, hide }) {
  const { basics } = useResume()
  const shouldReduceMotion = useReducedMotion()
  if (hide) return null

  return (
    <motion.aside
      variants={moveInBottom}
      {...getAnimationProps(shouldReduceMotion)}
      className={small ? styleSmall : networks}
    >
      <NetworkLink name="Mail" url={`mailto:${basics.email}`} />

      {basics.profiles.map((profile) => (
        <NetworkLink
          key={profile.network}
          name={profile.network}
          url={profile.url}
        />
      ))}
    </motion.aside>
  )
}

Networks.propTypes = {
  small: PropTypes.bool,
  hide: PropTypes.bool
}
