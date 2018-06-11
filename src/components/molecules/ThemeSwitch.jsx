import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { FadeIn } from '../atoms/Animations'
import { ReactComponent as Day } from '../../images/day.svg'
import { ReactComponent as Night } from '../../images/night.svg'
import styles from './ThemeSwitch.module.scss'

const ThemeToggle = props => {
  return (
    <span
      id="toggle"
      className={styles.checkboxContainer}
      aria-live="assertive"
    >
      <Day className={props.dark ? null : 'active'} />
      <span className={styles.checkboxFake} />
      <Night className={props.dark ? 'active' : null} />
    </span>
  )
}

class ThemeSwitch extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { dark: false }
  }

  componentDidMount() {
    const now = new Date().getHours()

    if (now >= 19 || now <= 7) {
      this.setState({ dark: true })
    }
  }

  isDark = () => this.state.dark === true

  handleChange = () => {
    this.setState({ dark: !this.isDark() })
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <body className={this.state.dark ? 'dark' : null} />
        </Helmet>
        <FadeIn>
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
        </FadeIn>
      </Fragment>
    )
  }
}

ThemeToggle.propTypes = {
  dark: PropTypes.bool
}

export default ThemeSwitch
