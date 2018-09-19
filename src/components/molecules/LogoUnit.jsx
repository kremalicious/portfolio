import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import { moveInBottom } from '../atoms/Transitions'

import Logo from '../svg/Logo'
import styles from './LogoUnit.module.scss'

const query = graphql`
  query {
    dataYaml {
      title
      tagline
    }
  }
`

const Animation = posed.div(moveInBottom)

export default class LogoUnit extends PureComponent {
  state = { isMinimal: false }

  static propTypes = {
    minimal: PropTypes.bool
  }

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
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { title, tagline } = data.dataYaml
          const { isMinimal } = this.state

          return (
            <Animation>
              <div className={isMinimal ? styles.minimal : styles.logounit}>
                <Logo className={styles.logounit__logo} />
                <h1 className={styles.logounit__title}>
                  {title.toLowerCase()}
                </h1>
                <p className={styles.logounit__description}>
                  {tagline.toLowerCase()}
                </p>
              </div>
            </Animation>
          )
        }}
      />
    )
  }
}
