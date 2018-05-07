
// Matomo page tracking
// https://github.com/scottnonnenberg/blog/blob/master/gatsby-browser.js
let first = true

function getDuration() {
  const start = window.start || new Date()
  const now = new Date()
  const difference = now.getTime() - start.getTime()

  if (difference === 0) {
    return null
  }

  return difference
}

exports.onRouteUpdate = state => {
  window._paq = window._paq || []

  if (first) {
    first = false
    window._paq.push([
      'trackEvent',
      'javascript',
      'load',
      'duration',
      getDuration(),
    ])
  } else {
    window._paq.push(['setCustomUrl', state.pathname])
    window._paq.push(['setDocumentTitle', state.pathname])
    window._paq.push(['trackPageView'])
  }
}
