import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
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

const Animation = posed.aside(moveInTop)

export default class Networks extends PureComponent {
  state = {
    classes: styles.networks
  }

  static propTypes = {
    minimal: PropTypes.bool,
    hide: PropTypes.bool
  }

  componentDidMount() {
    this.toggleClasses()
  }

  componentDidUpdate() {
    this.toggleClasses()
  }

  toggleClasses = () => {
    if (this.props.minimal) {
      this.setState({ classes: `${styles.networks} ${styles.minimal}` })
    } else {
      this.setState({ classes: styles.networks })
    }
  }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.dataYaml

          return (
            !this.props.hide && (
              <Animation className={this.state.classes}>
                {Object.keys(meta.social).map((key, i) => (
                  <a className={styles.link} href={meta.social[key]} key={i}>
                    <NetworkIcon title={key} className={icons.icon} />
                    <span className={styles.title}>{key}</span>
                  </a>
                ))}
              </Animation>
            )
          )
        }}
      />
    )
  }
}
