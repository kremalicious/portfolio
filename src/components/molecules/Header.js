import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import Social from './Social'
import './Header.scss'

const Header = ({ meta }) => {
  const isHomepage = location.pathname === '/'
  const classes = isHomepage ? 'header' : 'header header--minimal'

  return <header className={classes}>
      <Link className="header__name" to={'/'}>
        <span className="header__logo">␥</span>
        <h1 className="header__title">{meta.title}</h1>
        <p className="header__description">{meta.tagline}</p>
      </Link>

      <Social meta={meta} minimal={!isHomepage} />
    </header>
}

Header.propTypes = {
  meta: PropTypes.object,
}

export default Header
