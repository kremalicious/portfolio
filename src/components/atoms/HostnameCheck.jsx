import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styles from './HostnameCheck.module.scss'

export default class HostnameCheck extends PureComponent {
  static propTypes = {
    allowedHosts: PropTypes.array.isRequired
  }

  checkAllowedHost = () => {
    if (typeof window !== 'undefined' && window.location) {
      return this.props.allowedHosts.includes(window.location.hostname)
    }
  }

  state = {
    // default to true so SSR builds never show the banner
    isAllowedHost: true
  }

  componentDidMount() {
    const isAllowedHost = this.checkAllowedHost()
    this.setState({ isAllowedHost })
  }

  render() {
    // return nothing if we're on an allowed host
    if (this.state.isAllowedHost) return null

    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <aside className={styles.hostnameInfo}>
          <p>{`Hi there 👋. Please note that only the code and documentation of this
          site are open source. But my logo and the combination of typography,
          colors, and layout making up my brand identity are not. Don't just
          clone, do a remix.`}</p>
        </aside>
      </>
    )
  }
}
