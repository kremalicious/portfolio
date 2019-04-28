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
