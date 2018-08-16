require('./src/styles/global.scss')

exports.onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-image (Safari, IE)
  if (typeof window.IntersectionObserver === 'undefined') {
    require('intersection-observer')
  }
}
