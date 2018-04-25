import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { FadeIn } from '../atoms/Animations'
import Social from '../molecules/Social'
import Availability from '../molecules/Availability'
import { ReactComponent as Logo } from '../../images/logo.svg'
import './Header.scss'

const Header = ({ meta, isHomepage }) => {
  const classes = isHomepage ? 'header' : 'header header--minimal'

  return (
    <header className={classes}>
      <FadeIn>
        <Link className="header__name" to={'/'}>
          <Logo className="header__logo" />
          <h1 className="header__title">{meta.title.toLowerCase()}</h1>
          <p className="header__description">
            <span>{'{ '}</span> {meta.tagline.toLowerCase()} <span>{' }'}</span>
          </p>
        </Link>
      </FadeIn>

      <Social meta={meta} hide={!isHomepage} />
      <Availability
        meta={meta}
        hide={!isHomepage && !meta.availability.status}
      />
    </header>
  )
}

Header.propTypes = {
  meta: PropTypes.object,
  isHomepage: PropTypes.bool,
}

export default Header
