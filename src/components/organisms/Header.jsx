import React, { Component } from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types'
import { FadeIn } from '../atoms/Animations'
import Social from '../molecules/Social'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import { ReactComponent as Logo } from '../../images/logo.svg'
import './Header.scss'

class Header extends Component {
  render() {
    const isHomepage = this.props.isHomepage
    const meta = this.props.meta

    let classes = 'header'
    if (!isHomepage) classes += ' header--minimal'

    return (
      <header className={classes}>
        <ThemeSwitch />
        <FadeIn>
          <Link className="header__name" to={'/'}>
            <Logo className="header__logo" />
            <h1 className="header__title">{meta.title.toLowerCase()}</h1>
            <p className="header__description">
              <span>{'{ '}</span> {meta.tagline.toLowerCase()}{' '}
              <span>{' }'}</span>
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
}

Header.propTypes = {
  meta: PropTypes.object,
  isHomepage: PropTypes.bool,
}

export default Header
