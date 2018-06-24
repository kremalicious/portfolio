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

    if (localStorage.getItem('dark') === 'true') {
      this.state = { dark: true }
    } else if (localStorage.getItem('dark') === 'false') {
      this.state = { dark: null }
    } else {
      this.state = { dark: null }
    }
  }

  componentDidMount() {
    const now = new Date().getHours()
    const darkLocalStorage = localStorage.getItem('dark')

    if (darkLocalStorage) return

    if (now >= 19 || now <= 7) {
      this.setState({ dark: true })
    }
  }

  isDark = () => this.state.dark === true

  handleChange = () => {
    this.setState({ dark: !this.isDark() })
    localStorage.setItem('dark', !this.isDark())
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.state.dark ? 'dark' : null} />
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
              checked={this.state.dark}
            />
            <ThemeToggle dark={this.state.dark} />
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
