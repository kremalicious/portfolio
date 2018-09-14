import wrapPageElementWithTransition from './src/helpers/wrapPageElement'
import './src/styles/global.scss'

// IntersectionObserver polyfill for gatsby-image (Safari, IE)
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  import('intersection-observer')
}

// Page Transitions & Layout
export const wrapPageElement = wrapPageElementWithTransition
