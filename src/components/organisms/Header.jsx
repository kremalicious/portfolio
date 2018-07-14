import React, { PureComponent } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../atoms/LogoUnit'
import styles from './Header.module.scss'

class Header extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { isHomepage, meta } = this.props

    return (
      <header
        className={
          isHomepage ? `${styles.header}` : `${styles.header} ${styles.minimal}`
        }
      >
        <ThemeSwitch />

        <Link className={styles.header__link} to={'/'}>
          <LogoUnit meta={meta} minimal={!isHomepage} />
        </Link>

        <Networks meta={meta} hide={!isHomepage} />

        <Availability hide={!isHomepage && !meta.availability.status} />
      </header>
    )
  }
}

Header.propTypes = {
  isHomepage: PropTypes.bool,
  meta: PropTypes.object
}

export default Header
