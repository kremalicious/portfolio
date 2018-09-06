import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../atoms/LogoUnit'
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
  state = { minimal: false }

  checkMinimal = () => {
    const { isHomepage } = this.props

    this.setState({ minimal: !isHomepage })
  }

  componentDidMount() {
    this.checkMinimal()
  }

  componentDidUpdate() {
    this.checkMinimal()
  }

  render() {
    const { isHomepage } = this.props
    const { minimal } = this.state

    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.dataYaml

          return (
            <header className={minimal ? styles.minimal : styles.header}>
              <ThemeSwitch />

              <Link className={styles.header__link} to={'/'}>
                <LogoUnit minimal={!isHomepage} />
              </Link>

              <Networks hide={!isHomepage} />

              <Availability hide={!isHomepage && !meta.availability.status} />
            </header>
          )
        }}
      />
    )
  }
}

Header.propTypes = {
  isHomepage: PropTypes.bool
}
