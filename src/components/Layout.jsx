import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import Head from './molecules/Head'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.scss'

const timeout = 150

export default class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { children, location } = this.props
    const isHomepage = location.pathname === '/'

    const RoutesContainer = posed.div({
      enter: {
        opacity: 1,
        delay: timeout,
        delayChildren: timeout
      },
      exit: {
        opacity: 0
      },
      initialPose: 'exit'
    })

    return (
      <Fragment>
        <Head />
        <Header isHomepage={isHomepage} />
        <PoseGroup animateOnMount={true}>
          <RoutesContainer key={location.pathname}>
            <main className={styles.screen}>{children}</main>
          </RoutesContainer>
        </PoseGroup>
        <Footer />
      </Fragment>
    )
  }
}
