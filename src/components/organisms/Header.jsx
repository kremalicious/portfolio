import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'
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
          const meta = data.metaYaml
          const headerClasses = classNames([styles.header], {
            [styles.minimal]: minimal
          })

          return (
            <header className={headerClasses}>
              <ThemeSwitch />
              <LogoUnit minimal={minimal} />
              <Networks hide={minimal} />
              <Availability hide={minimal && !meta.availability.status} />
            </header>
          )
        }}
      />
    )
  }
}
