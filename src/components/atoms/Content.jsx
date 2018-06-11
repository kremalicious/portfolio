import React from 'react'
import PropTypes from 'prop-types'
import styles from './Content.module.scss'

const Content = props => (
  <div className={styles.content} {...props}>
    {props.children}
  </div>
)

Content.propTypes = {
  children: PropTypes.node
}

export default Content
