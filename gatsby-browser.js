import './src/styles/global.scss'
import React from 'react'
import AppProvider from './src/store/Provider'
import wrapPageElementWithTransition from './src/helpers/wrapPageElement'

// IntersectionObserver polyfill for gatsby-image (Safari, IE)
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  import('intersection-observer')
}

// React Context in Browser
// eslint-disable-next-line
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}

// Page Transitions & Layout
export const wrapPageElement = wrapPageElementWithTransition
