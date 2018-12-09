import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { fadeIn } from './atoms/Transitions'
import Typekit from './atoms/Typekit'
import HostnameCheck from './atoms/HostnameCheck'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

// if (process.env.NODE_ENV !== 'production') {
//   const { whyDidYouUpdate } = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

const timeout = 250

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { children, location } = this.props
    const isHomepage = location.pathname === '/'

    const RoutesContainer = posed.div(fadeIn)

    return (
      <>
        <Typekit />
        <HostnameCheck />

        <PoseGroup animateOnMount={true}>
          <RoutesContainer
            key={location.pathname}
            delay={timeout}
            delayChildren={timeout}
          >
            <Header minimal={!isHomepage} />
            <main className={styles.screen}>{children}</main>
          </RoutesContainer>
        </PoseGroup>

        <Footer />
      </>
    )
  }
}
