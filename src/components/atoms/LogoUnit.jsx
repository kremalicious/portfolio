import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Logo } from '../../images/logo.svg'
import './LogoUnit.scss'

const LogoUnit = ({ meta, minimal }) => {
  const classes = minimal ? 'logounit logounit--minimal' : 'logounit'

  return (
    <div className={classes}>
      <Logo className="logounit__logo" />
      <h1 className="logounit__title">{meta.title.toLowerCase()}</h1>
      <p className="logounit__description">
        <span>{'{ '}</span> {meta.tagline.toLowerCase()} <span>{' }'}</span>
      </p>
    </div>
  )
}

LogoUnit.propTypes = {
  meta: PropTypes.object.isRequired,
  minimal: PropTypes.bool,
}

export default LogoUnit
