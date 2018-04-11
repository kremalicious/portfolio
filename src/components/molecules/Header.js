import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Social from './Social'
import { Logo } from '../atoms/Icons'
import './Header.scss'

const Header = ({ meta, isHomepage}) => {
  const classes = isHomepage ? 'header' : 'header header--minimal'

  return (
    <header className={classes}>
      <Link className="header__name" to={'/'}>
        <Logo className="header__logo" />
        <h1 className="header__title">{meta.title}</h1>
        <p className="header__description">{meta.tagline}</p>
      </Link>

      <Social meta={meta} minimal={!isHomepage} />
    </header>
  )
}

Header.propTypes = {
  meta: PropTypes.object,
  isHomepage: PropTypes.bool,
}

export default Header
