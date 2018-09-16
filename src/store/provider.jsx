import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './createContext'

export default class AppProvider extends Component {
  state = {
    dark: false,
    toggleDark: () => {
      this.setState({ dark: !this.state.dark })

      if (this.store) {
        this.store.setItem('dark', !this.state.dark)
      }
    }
  }

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  store = typeof localStorage === 'undefined' ? null : localStorage

  darkLocalStorageMode = darkLocalStorage => {
    if (darkLocalStorage === 'true') {
      this.setState({ dark: true })
    } else {
      this.setState({ dark: false })
    }
  }

  darkMode = now => {
    if (!this.state.dark && (now >= 19 || now <= 7)) {
      this.setState({ dark: true })
    } else {
      this.setState({ dark: null })
    }
  }

  checkDark = () => {
    const now = new Date().getHours()
    const darkLocalStorage = this.store.getItem('dark')

    if (darkLocalStorage) {
      this.darkLocalStorageMode(darkLocalStorage)
    } else {
      this.darkMode(now)
    }
  }

  componentDidMount() {
    this.checkDark()
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
