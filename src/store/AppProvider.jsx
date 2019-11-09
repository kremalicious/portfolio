import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Context from './createContext'
import { getLocationTimes } from '../utils/getLocationTimes'
import { getCountry } from '../utils/getCountry'

export default class AppProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  state = {
    darkMode: false,
    toggleDark: () => this.toggleDark(),
    geolocation: null
  }

  store = typeof localStorage === 'undefined' ? null : localStorage

  mounted = false

  async componentDidMount() {
    this.mounted = true

    const geolocation = await getCountry()
    this.setState({ geolocation })
    this.checkDark()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  setDark(darkMode) {
    this.mounted && this.setState({ darkMode })
  }

  darkLocalStorageMode(darkLocalStorage) {
    darkLocalStorage === 'true' ? this.setDark(true) : this.setDark(false)
  }

  //
  // All the checks to see if we should go dark or light
  //
  async checkTimes() {
    const { geolocation, darkMode } = this.state
    const { sunset, sunrise } = getLocationTimes(geolocation)
    const now = new Date().getHours()
    const weWantItDarkTimes = now >= sunset || now <= sunrise

    !darkMode && weWantItDarkTimes ? this.setDark(true) : this.setDark(false)
  }

  async checkDark() {
    const darkLocalStorage = await this.store.getItem('darkMode')

    darkLocalStorage
      ? this.darkLocalStorageMode(darkLocalStorage)
      : this.checkTimes()
  }

  toggleDark = () => {
    this.setState({ darkMode: !this.state.darkMode })
    this.store && this.store.setItem('darkMode', !this.state.darkMode)
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
