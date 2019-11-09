import React from 'react'
import PropTypes from 'prop-types'
import AppProvider from './src/store/AppProvider'
import wrapPageElementWithLayout from './src/helpers/wrapPageElement'

// Global styles
import './src/styles/global.scss'

// IntersectionObserver polyfill for gatsby-image (Safari, IE)
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  import('intersection-observer')
}

// React Context in Browser
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}

wrapRootElement.propTypes = {
  element: PropTypes.any
}

// Layout with Page Transitions
export const wrapPageElement = wrapPageElementWithLayout

// Display a message when a service worker updates
// https://www.gatsbyjs.org/docs/add-offline-support-with-a-service-worker/#displaying-a-message-when-a-service-worker-updates
export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    'This application has been updated. ' +
      'Reload to display the latest version?'
  )
  if (answer === true) {
    window.location.reload()
  }
}
