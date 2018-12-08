import React, { PureComponent } from 'react'
import styles from './HostnameCheck.module.scss'

const allowedHosts = [
  'matthiaskretschmann.com',
  'beta.matthiaskretschmann.com',
  'localhost'
]

export default class HostnameInfo extends PureComponent {
  checkAllowedHost = () => {
    if (typeof window !== 'undefined' && window.location) {
      return allowedHosts.includes(window.location.hostname)
    }
  }

  state = {
    isAllowedHost: true
  }

  componentDidMount() {
    const isAllowedHost = this.checkAllowedHost()
    this.setState({ isAllowedHost })
  }

  render() {
    if (this.state.isAllowedHost) return null

    return (
      <>
        <aside className={styles.hostnameInfo}>
          Hi there 👋. Please note that only the code and documentation of this
          site are MIT licensed. But my logo and the combination of typography,
          colors, and layout making up my brand identity are not. Likewise, if
          you know how to remove this banner you also should be able to remove
          my Typekit code and Analytics code from your published site.
        </aside>
      </>
    )
  }
}
