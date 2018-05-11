import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { FadeIn } from '../atoms/Animations'

import { ReactComponent as Email } from '../../images/email.svg'
import { ReactComponent as Blog } from '../../images/blog.svg'
import { ReactComponent as Twitter } from '../../images/twitter.svg'
import { ReactComponent as GitHub } from '../../images/github.svg'
import { ReactComponent as Dribbble } from '../../images/dribbble.svg'

import '../atoms/Icons.scss'
import './Social.scss'

const SocialIcon = props => {
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

class Social extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { classes: 'networks' }
  }

  componentDidMount() {
    this.toggleClasses()
  }

  componentDidUpdate() {
    this.toggleClasses()
  }

  toggleClasses = () => {
    if (this.props.minimal) {
      this.setState({ classes: 'networks' })
    } else {
      this.setState({ classes: 'networks networks--minimal' })
    }
  }

  render() {
    const { social } = this.props.meta

    return (
      !this.props.hide && (
        <FadeIn timeout={{ enter: 200, exit: 0, appear: 200 }}>
          <aside className={this.state.classes}>
            {Object.keys(social).map((key, i) => (
              <OutboundLink
                className="networks__link"
                href={social[key]}
                key={i}
              >
                <SocialIcon title={key} className="icon" />
                <span className="networks__title">{key}</span>
              </OutboundLink>
            ))}
          </aside>
        </FadeIn>
      )
    )
  }
}

Social.propTypes = {
  meta: PropTypes.object,
  minimal: PropTypes.bool,
  hide: PropTypes.bool,
}

export default Social
