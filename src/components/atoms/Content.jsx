import React from 'react'
import PropTypes from 'prop-types'
import './Content.scss'

const Content = props => (
  <div className="content" {...props}>
    {props.children}
  </div>
)

Content.propTypes = {
  children: PropTypes.node
}

export default Content
