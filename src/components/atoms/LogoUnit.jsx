import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
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

class LogoUnit extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { minimal: false }
  }

  checkMinimal = () => {
    const { minimal } = this.props

    this.setState({ minimal: minimal })
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
          const meta = data.dataYaml
          const { minimal } = this.state

          return (
            <div className={minimal ? styles.minimal : styles.logounit}>
              <Logo className={styles.logounit__logo} />
              <h1 className={styles.logounit__title}>
                {meta.title.toLowerCase()}
              </h1>
              <p className={styles.logounit__description}>
                <span>{'{ '}</span> {meta.tagline.toLowerCase()}{' '}
                <span>{' }'}</span>
              </p>
            </div>
          )
        }}
      />
    )
  }
}

LogoUnit.propTypes = {
  minimal: PropTypes.bool
}

export default LogoUnit
