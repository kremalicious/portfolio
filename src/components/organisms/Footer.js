import React from 'react'
import PropTypes from 'prop-types'
import Social from '../molecules/Social'
import './Footer.scss'

const Footer = ({ meta }) => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Social meta={meta} minimal />
      <small>
        &copy; {year} {meta.title} &mdash; All Rights Reserved
      </small>
    </footer>
  )
}

Footer.propTypes = {
  meta: PropTypes.object,
}

export default Footer
