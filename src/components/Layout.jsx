import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, moveInBottom } from './atoms/Transitions'
import Typekit from './atoms/Typekit'
import HostnameCheck from './atoms/HostnameCheck'
import ThemeSwitch from './molecules/ThemeSwitch'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import { screen } from './Layout.module.css'
import { useMeta } from '../hooks/use-meta'

// https://github.com/welldone-software/why-did-you-render
// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line
//   const whyDidYouRender = require('@welldone-software/why-did-you-render')
//   whyDidYouRender(React, { trackAllPureComponents: true })
// }

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

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

      <AnimatePresence>
        <motion.div
          key={location.pathname}
          variants={fadeIn}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Header minimal={!isHomepage} hide={isResume} />
          <motion.main
            key={location.pathname}
            variants={moveInBottom}
            initial="initial"
            animate="enter"
            className={screen}
          >
            {children}
          </motion.main>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  )
}
