import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
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

  nameClasses = classNames('p-name', [styles.title])
  descriptionClasses = classNames('p-job-title', [styles.description])

  render() {
    const wrapClasses = classNames([styles.logounit], {
      [styles.minimal]: this.props.minimal
    })

    return (
      <StaticQuery
        query={query}
        render={data => {
          const { title, tagline } = data.metaYaml

          return (
            <this.Animation>
              <Link className={wrapClasses} to={'/'}>
                <Logo className={styles.logo} />
                <h1 className={this.nameClasses}>{title.toLowerCase()}</h1>
                <p className={this.descriptionClasses}>
                  {tagline.toLowerCase()}
                </p>
              </Link>
            </this.Animation>
          )
        }}
      />
    )
  }
}
