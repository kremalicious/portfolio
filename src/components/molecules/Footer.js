import React from 'react'
import PropTypes from 'prop-types'
import './Footer.scss'

const Footer = ({ meta }) => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <small>© {year} {meta.title} &mdash; All Rights Reserved</small>
    </footer>
  )
}

Footer.propTypes = {
  meta: PropTypes.object,
}

export default Footer
