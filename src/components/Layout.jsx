import React from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { fadeIn } from './atoms/Transitions'
import Typekit from './atoms/Typekit'
import HostnameCheck from './atoms/HostnameCheck'
import ThemeSwitch from './molecules/ThemeSwitch'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import { screen } from './Layout.module.css'
import { useMeta } from '../hooks/use-meta'

// https://github.com/welldone-software/why-did-you-render
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackAllPureComponents: true })
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

const timeout = 200
const RoutesContainer = posed.div(fadeIn)

export default function Layout({ children, location }) {
  const { allowedHosts } = useMeta()

  const isHomepage =
    location.pathname === '/' ||
    location.pathname === '/offline-plugin-app-shell-fallback/'
  const isResume =
    location.pathname === '/resume' || location.pathname === '/resume/'

  return (
    <>
      <Typekit />
      <HostnameCheck allowedHosts={allowedHosts} />
      <ThemeSwitch />

      <PoseGroup animateOnMount={process.env.NODE_ENV !== 'test' && true}>
        <RoutesContainer
          key={location.pathname}
          delay={timeout}
          delayChildren={timeout}
        >
          <Header minimal={!isHomepage} hide={isResume} />
          <main className={screen}>{children}</main>
        </RoutesContainer>
      </PoseGroup>

      <Footer />
    </>
  )
}
