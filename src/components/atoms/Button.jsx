import React from 'react'
import PropTypes from 'prop-types'
import { button } from './Button.module.css'

const Button = (props) => (
  <a className={button} {...props}>
    {props.children}
  </a>
)

Button.propTypes = {
  children: PropTypes.node
}

export default Button
