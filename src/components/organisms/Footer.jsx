import React from 'react'
import PropTypes from 'prop-types'
import Social from '../molecules/Social'
import './Footer.scss'

const Footer = ({ meta }) => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Social meta={meta} minimal />
      <p className="footer__actions">
        <a href={meta.addressbook}>Add to addressbook</a>
        <a href={meta.gpg}>PGP/GPG key</a>
      </p>
      <p>
        <small>
          &copy; {year} {meta.title} &mdash; All Rights Reserved
        </small>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  meta: PropTypes.object,
}

export default Footer
