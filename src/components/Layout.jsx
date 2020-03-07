import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import shortid from 'shortid'
import { fadeIn } from './atoms/Transitions'
import Typekit from './atoms/Typekit'
import HostnameCheck from './atoms/HostnameCheck'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import styles from './Layout.module.css'
import { useMeta } from '../hooks/use-meta'

// https://github.com/welldone-software/why-did-you-render
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js')
  whyDidYouRender(React)
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default function Layout({ children, location }) {
  const { allowedHosts } = useMeta()
  const timeout = 200
  const RoutesContainer = posed.div(fadeIn)
  const isHomepage =
    location.pathname === '/' ||
    location.pathname === '/offline-plugin-app-shell-fallback/'
  const isResume =
    location.pathname === '/resume' || location.pathname === '/resume/'

  return (
    <>
      <Typekit />
      <HostnameCheck allowedHosts={allowedHosts} />

      <PoseGroup animateOnMount={process.env.NODE_ENV !== 'test' && true}>
        <RoutesContainer
          key={shortid.generate()}
          delay={timeout}
          delayChildren={timeout}
        >
          <Header minimal={!isHomepage} hide={isResume} />
          <main className={styles.screen}>{children}</main>
        </RoutesContainer>
      </PoseGroup>

      <Footer />
    </>
  )
}
