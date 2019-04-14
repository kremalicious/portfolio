import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import classNames from 'classnames'
import { moveInTop } from '../atoms/Transitions'
import LinkIcon from '../atoms/LinkIcon'
import icons from '../atoms/Icons.module.scss'
import styles from './Networks.module.scss'

const query = graphql`
  query {
    contentYaml {
      social {
        Email
        Blog
        Twitter
        GitHub
        Dribbble
      }
    }
  }
`

export default class Networks extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool,
    hide: PropTypes.bool
  }

  Animation = posed.aside(moveInTop)

  linkClasses = key =>
    classNames({
      'u-url': key !== 'Email',
      'u-email': key === 'Email',
      [styles.link]: true
    })

  wrapClasses = classNames([styles.networks], {
    [styles.minimal]: this.props.minimal
  })

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.contentYaml

          return (
            !this.props.hide && (
              <this.Animation className={this.wrapClasses}>
                {Object.keys(meta.social).map((key, i) => (
                  <a
                    className={this.linkClasses(key)}
                    href={meta.social[key]}
                    key={i}
                  >
                    <LinkIcon title={key} className={icons.icon} />
                    <span className={styles.title}>{key}</span>
                  </a>
                ))}
              </this.Animation>
            )
          )
        }}
      />
    )
  }
}
