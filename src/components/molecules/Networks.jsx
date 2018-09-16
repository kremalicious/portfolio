import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import { moveInTop } from '../atoms/Transitions'

import Email from '../svg/Email'
import Blog from '../svg/Blog'
import Twitter from '../svg/Twitter'
import GitHub from '../svg/Github'
import Dribbble from '../svg/Dribbble'

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

const NetworkIcon = props => {
  switch (props.title) {
    case 'Email':
      return <Email {...props} />
    case 'Blog':
      return <Blog {...props} />
    case 'Twitter':
      return <Twitter {...props} />
    case 'GitHub':
      return <GitHub {...props} />
    case 'Dribbble':
      return <Dribbble {...props} />
    default:
      return null
  }
}

const Animation = posed.aside(moveInTop)

export default class Network extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool,
    hide: PropTypes.bool
  }

  state = {
    classes: styles.networks
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
