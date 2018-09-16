import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './createContext'

export default class AppProvider extends Component {
  state = {
    dark: false
  }

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
