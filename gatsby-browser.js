import wrapPageElementWithLayout from './src/helpers/wrapPageElement'

// Global styles
import './src/styles/global.css'

// IntersectionObserver polyfill for gatsby-image (Safari, IE)
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  import('intersection-observer')
}

// Layout with Page Transitions
export const wrapPageElement = wrapPageElementWithLayout

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => window.scrollTo(0, 0), 200)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), 200)
  }
  return false
}

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
