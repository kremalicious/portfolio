import React from 'react'
import PropTypes from 'prop-types'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../molecules/LogoUnit'
import styles from './Header.module.scss'
import { useMeta } from '../../hooks/use-meta'

Header.propTypes = {
  minimal: PropTypes.bool
}

export default function Header({ minimal }) {
  const { availability } = useMeta()

  return (
    <header className={minimal ? styles.minimal : styles.header}>
      <ThemeSwitch />
      <LogoUnit minimal={minimal} />
      <Networks hide={minimal} />
      <Availability hide={minimal && !availability.status} />
    </header>
  )
}
