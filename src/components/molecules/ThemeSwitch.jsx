import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Day from '../svg/Day'
import Night from '../svg/Night'
import styles from './ThemeSwitch.module.scss'

const ThemeToggle = props => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Day className={props.dark ? null : 'active'} />
    <span className={styles.checkboxFake} />
    <Night className={props.dark ? 'active' : null} />
  </span>
)

class ThemeSwitch extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { dark: null }
  }

  isDark = () => this.state.dark === true

  darkLocalStorageMode = darkLocalStorage => {
    if (darkLocalStorage === 'true') {
      this.setState({ dark: true })
    } else {
      this.setState({ dark: false })
    }
  }

  darkMode = now => {
    if (!this.isDark() && (now >= 19 || now <= 7)) {
      this.setState({ dark: true })
    } else {
      this.setState({ dark: null })
    }
  }

  componentDidMount() {
    const now = new Date().getHours()
    const darkLocalStorage = localStorage.getItem('dark')

    if (darkLocalStorage) {
      this.darkLocalStorageMode(darkLocalStorage)
    } else {
      this.darkMode(now)
    }
  }

  handleChange = event => {
    this.setState({ dark: event.target.checked })
    localStorage.setItem('dark', event.target.checked)
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.isDark() ? 'dark' : null} />
        </Helmet>
        <aside className={styles.themeSwitch}>
          <label className={styles.checkbox}>
            <span className={styles.label}>Toggle Night Mode</span>
            <input
              onChange={this.handleChange}
              type="checkbox"
              name="toggle"
              value="toggle"
              aria-describedby="toggle"
              checked={this.isDark()}
            />
            <ThemeToggle dark={this.isDark()} />
          </label>
        </aside>
      </Fragment>
    )
  }
}

ThemeToggle.propTypes = {
  dark: PropTypes.bool
}

export default ThemeSwitch
