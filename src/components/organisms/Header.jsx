import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../molecules/LogoUnit'
import styles from './Header.module.scss'

const query = graphql`
  query {
    metaYaml {
      availability {
        status
      }
    }
  }
`

Header.propTypes = {
  minimal: PropTypes.bool
}

export default function Header({ minimal }) {
  const { metaYaml } = useStaticQuery(query)

  return (
    <header className={minimal ? styles.minimal : styles.header}>
      <ThemeSwitch />
      <LogoUnit minimal={minimal} />
      <Networks hide={minimal} />
      <Availability hide={minimal && !metaYaml.availability.status} />
    </header>
  )
}
