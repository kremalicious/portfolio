import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import classNames from 'classnames'
import { moveInTop } from '../atoms/Transitions'

import { ReactComponent as Email } from '../../images/email.svg'
import { ReactComponent as Blog } from '../../images/blog.svg'
import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'

import icons from '../atoms/Icons.module.scss'
import styles from './Networks.module.scss'

const query = graphql`
  query {
    dataYaml {
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

class NetworkIcon extends PureComponent {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    switch (this.props.title) {
      case 'Email':
        return <Email {...this.props} />
      case 'Blog':
        return <Blog {...this.props} />
      case 'Twitter':
        return <Twitter {...this.props} />
      case 'GitHub':
        return <GitHub {...this.props} />
      case 'Dribbble':
        return <Dribbble {...this.props} />
      default:
        return null
    }
  }
}

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
          const meta = data.dataYaml

          return (
            !this.props.hide && (
              <this.Animation className={this.wrapClasses}>
                {Object.keys(meta.social).map((key, i) => (
                  <a
                    className={this.linkClasses(key)}
                    href={meta.social[key]}
                    key={i}
                  >
                    <NetworkIcon title={key} className={icons.icon} />
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
