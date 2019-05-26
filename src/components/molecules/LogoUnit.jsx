import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import classNames from 'classnames'
import { moveInBottom } from '../atoms/Transitions'
import { ReactComponent as Logo } from '../../images/logo.svg'
import styles from './LogoUnit.module.scss'

const query = graphql`
  query {
    metaYaml {
      title
      tagline
    }
  }
`

export default class LogoUnit extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool
  }

  Animation = posed.div(moveInBottom)

  wrapClasses = classNames([styles.logounit], {
    [styles.minimal]: this.props.minimal
  })

  nameClasses = classNames('p-name', [styles.title])
  descriptionClasses = classNames('p-job-title', [styles.description])

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { title, tagline } = data.metaYaml

          return (
            <div className={this.wrapClasses}>
              <this.Animation>
                <Logo className={styles.logo} />
                <h1 data-testid="logo-title" className={this.nameClasses}>
                  {title.toLowerCase()}
                </h1>
                <p
                  data-testid="logo-tagline"
                  className={this.descriptionClasses}
                >
                  {tagline.toLowerCase()}
                </p>
              </this.Animation>
            </div>
          )
        }}
      />
    )
  }
}
