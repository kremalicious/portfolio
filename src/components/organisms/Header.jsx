import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { FadeIn } from '../atoms/Animations'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../atoms/LogoUnit'
import styles from './Header.module.scss'

const Header = ({ meta, isHomepage }) => (
  <header
    className={
      isHomepage ? `${styles.header}` : `${styles.header} ${styles.minimal}`
    }
  >
    <ThemeSwitch />
    <FadeIn>
      <Link className={styles.header__link} to={'/'}>
        <LogoUnit meta={meta} minimal={!isHomepage} />
      </Link>
    </FadeIn>

    <Networks meta={meta} hide={!isHomepage} />

    <Availability hide={!isHomepage && !meta.availability.status} />
  </header>
)

Header.propTypes = {
  meta: PropTypes.object,
  isHomepage: PropTypes.bool
}

export default Header
