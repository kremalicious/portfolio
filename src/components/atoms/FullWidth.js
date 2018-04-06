import React from 'react'
import PropTypes from 'prop-types'
import './FullWidth.scss'

const FullWidth = ({ children }) => (
  <div className="full-width">
    {children}
  </div>
)

FullWidth.propTypes = {
  children: PropTypes.node
}

export default FullWidth
