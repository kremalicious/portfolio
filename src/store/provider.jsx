import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SunCalc from 'suncalc'
import { Provider } from './createContext'
import countrycodes from './countrycode-latlong.json'

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

  //
  // Get user location from Cloudflare's geo location HTTP header
  //
  getCountry = async () => {
    let trace = []

    await fetch('/cdn-cgi/trace?no-cache=1')
      .then(data => {
        let lines

        data.text().then(text => {
          lines = text.split('\n')

          let keyValue

          lines.forEach(line => {
            keyValue = line.split('=')
            trace[keyValue[0]] = decodeURIComponent(keyValue[1] || '')

            if (keyValue[0] === 'loc' && trace['loc'] !== 'XX') {
              this.setState({ location: trace['loc'] })
            } else {
              return
            }
          })
        })
      })
      .catch(() => null) // fail silently
  }

  setDark() {
    this.setState({ dark: true })
  }

  setLight() {
    this.setState({ dark: false })
  }

  darkLocalStorageMode(darkLocalStorage) {
    if (darkLocalStorage === 'true') {
      this.setDark()
    } else {
      this.setLight()
    }
  }

  //
  // All the checks to see if we should go dark or light
  //
  darkMode() {
    const now = new Date().getHours()

    // fallback times, in hours
    let sunrise = 7
    let sunset = 19

    // times based on detected country code
    if (this.state.location && this.state.location !== 'XX') {
      const country = this.state.location.toLowerCase()
      const times = SunCalc.getTimes(
        new Date(),
        countrycodes[country][0],
        countrycodes[country][1]
      )
      sunrise = times.sunrise.getHours()
      sunset = times.sunset.getHours()
    }

    if (!this.state.dark && (now >= sunset || now <= sunrise)) {
      this.setDark()
    } else {
      this.setLight()
    }
  }

  checkDark() {
    const darkLocalStorage = this.store.getItem('dark')

    if (darkLocalStorage) {
      this.darkLocalStorageMode(darkLocalStorage)
    } else {
      this.darkMode()
    }
  }

  toggleDark = () => {
    this.setState({ dark: !this.state.dark })

    if (this.store) {
      this.store.setItem('dark', !this.state.dark)
    }
  }

  componentDidMount() {
    this.getCountry().then(() => {
      this.checkDark()
    })
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
