import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.scss'

const Button = props => (
  <a className={styles.button} {...props}>
    {props.children}
  </a>
)

Button.propTypes = {
  children: PropTypes.node
}

export default Button
