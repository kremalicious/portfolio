import React from 'react'
import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import Social from './Social'
import './Header.scss'

const Header = ({ meta, minimal }) => {
  const classes = minimal ? 'header header--minimal' : 'header'

  return (
    <header className={classes}>
      <Link className="header__name" to="/">
        <span className="header__logo">␥</span>
        <h1 className="header__title">{meta.title}</h1>
        <p className="header__description">{meta.tagline}</p>
      </Link>

      <Social meta={meta} />
    </header>
  )
}

Header.propTypes = {
  minimal: PropTypes.bool,
  meta: PropTypes.object,
}

export default Header
