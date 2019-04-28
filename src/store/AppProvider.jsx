import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from './createContext'
import { getLocationTimes } from '../utils/getLocationTimes'
import { getCountry } from '../utils/getCountry'

export default class AppProvider extends PureComponent {
  state = {
    dark: false,
    toggleDark: () => this.toggleDark,
    location: null
  }

  static propTypes = {
    children: PropTypes.any.isRequired
  }

  store = typeof localStorage === 'undefined' ? null : localStorage

  mounted = false

  async componentDidMount() {
    this.mounted = true
    const location = await getCountry()
    this.setState({ location })
    this.checkDark()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  setDark() {
    this.mounted && this.setState({ dark: true })
  }

  setLight() {
    this.mounted && this.setState({ dark: false })
  }

  darkLocalStorageMode(darkLocalStorage) {
    darkLocalStorage === 'true' ? this.setDark() : this.setLight()
  }

  //
  // All the checks to see if we should go dark or light
  //
  async checkTimes() {
    const { location, dark } = this.state
    const { sunset, sunrise } = await getLocationTimes(location)
    const now = new Date().getHours()
    const weWantItDarkTimes = now >= sunset || now <= sunrise

    !dark && weWantItDarkTimes ? this.setDark() : this.setLight()
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
