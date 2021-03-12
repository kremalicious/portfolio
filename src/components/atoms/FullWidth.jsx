import React from 'react'
import PropTypes from 'prop-types'
import { fullWidth } from './FullWidth.module.css'

const FullWidth = ({ children }) => <div className={fullWidth}>{children}</div>

FullWidth.propTypes = {
  children: PropTypes.node
}

export default FullWidth
