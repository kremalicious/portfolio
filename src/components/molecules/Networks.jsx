import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { FadeIn } from '../atoms/Animations'

import { ReactComponent as Email } from '../../images/email.svg'
import { ReactComponent as Blog } from '../../images/blog.svg'
import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'

import icons from '../atoms/Icons.module.scss'
import styles from './Networks.module.scss'

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

class Network extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      classes: styles.networks
    }
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
      !this.props.hide && (
        <FadeIn>
          <aside className={this.state.classes}>
            {Object.keys(this.props.meta.social).map((key, i) => (
              <OutboundLink
                className={styles.link}
                href={this.props.meta.social[key]}
                key={i}
              >
                <NetworkIcon title={key} className={icons.icon} />
                <span className={styles.title}>{key}</span>
              </OutboundLink>
            ))}
          </aside>
        </FadeIn>
      )
    )
  }
}

Network.propTypes = {
  meta: PropTypes.object,
  minimal: PropTypes.bool,
  hide: PropTypes.bool
}

export default Network
