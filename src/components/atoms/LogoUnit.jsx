import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed, { PoseGroup } from 'react-pose'

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

const Animation = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' }
  },
  exit: {
    opacity: 0,
    y: '2rem',
    transition: { type: 'spring' }
  }
})

class LogoUnit extends PureComponent {
  state = { minimal: false }

  static propTypes = {
    minimal: PropTypes.bool
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
            <PoseGroup animateOnMount={true}>
              <Animation>
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
              </Animation>
            </PoseGroup>
          )
        }}
      />
    )
  }
}

export default LogoUnit
