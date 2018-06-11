import React from 'react'
import PropTypes from 'prop-types'
import styles from './FullWidth.module.scss'

const FullWidth = ({ children }) => (
  <div className={styles.fullWidth}>{children}</div>
)

FullWidth.propTypes = {
  children: PropTypes.node
}

export default FullWidth
