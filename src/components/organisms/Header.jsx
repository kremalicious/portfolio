import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../molecules/LogoUnit'
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

  state = { isMinimal: this.props.minimal }

  checkMinimal = () => {
    const { minimal } = this.props

    this.setState({ isMinimal: minimal })
  }

  componentDidMount() {
    this.checkMinimal()
  }

  componentDidUpdate() {
    this.checkMinimal()
  }

  render() {
    const { isMinimal } = this.state

    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.dataYaml

          return (
            <header className={isMinimal ? styles.minimal : styles.header}>
              <ThemeSwitch />

              <Link className={styles.header__link} to={'/'}>
                <LogoUnit minimal={isMinimal} />
              </Link>

              <Networks hide={isMinimal} />

              <Availability hide={isMinimal && !meta.availability.status} />
            </header>
          )
        }}
      />
    )
  }
}
