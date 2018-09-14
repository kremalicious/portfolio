import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { fadeIn } from './atoms/Transitions'
import Head from './molecules/Head'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

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
      <Fragment>
        <Head />
        <PoseGroup animateOnMount={true}>
          <RoutesContainer
            key={location.pathname}
            delay={timeout}
            delayChildren={timeout}
          >
            <Header isHomepage={isHomepage} />
            <main className={styles.screen}>{children}</main>
          </RoutesContainer>
        </PoseGroup>
        <Footer />
      </Fragment>
    )
  }
}
