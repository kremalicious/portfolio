import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './createContext'
import { getLocationTimes } from '../utils/getLocationTimes'
import { getCountry } from '../utils/getCountry'

export default class AppProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  state = {
    dark: false,
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

  setDark(dark) {
    this.mounted && this.setState({ dark })
  }

  darkLocalStorageMode(darkLocalStorage) {
    darkLocalStorage === 'true' ? this.setDark(true) : this.setDark(false)
  }

  //
  // All the checks to see if we should go dark or light
  //
  async checkTimes() {
    const { geolocation, dark } = this.state
    const { sunset, sunrise } = await getLocationTimes(geolocation)
    const now = new Date().getHours()
    const weWantItDarkTimes = now >= sunset || now <= sunrise

    !dark && weWantItDarkTimes ? this.setDark(true) : this.setDark(false)
  }

  async checkDark() {
    const darkLocalStorage = await this.store.getItem('dark')

    darkLocalStorage
      ? this.darkLocalStorageMode(darkLocalStorage)
      : this.checkTimes()
  }

  toggleDark = () => {
    this.setState({ dark: !this.state.dark })
    this.store && this.store.setItem('dark', !this.state.dark)
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
