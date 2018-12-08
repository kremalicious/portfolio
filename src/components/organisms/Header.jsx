import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../molecules/LogoUnit'
import HostnameCheck from '../atoms/HostnameCheck'
import styles from './Header.module.scss'

const query = graphql`
  query {
    dataYaml {
      availability {
        status
      }
    }
  }
`

export default class Header extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool
  }

  render() {
    const { minimal } = this.props

    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.dataYaml

          return (
            <>
              <HostnameCheck />
              <header className={minimal ? styles.minimal : styles.header}>
                <ThemeSwitch />

                <Link className={styles.header__link} to={'/'}>
                  <LogoUnit minimal={minimal} />
                </Link>

                <Networks hide={minimal} />

                <Availability hide={minimal && !meta.availability.status} />
              </header>
            </>
          )
        }}
      />
    )
  }
}
