import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import posed from 'react-pose'
import Context from '../../store/createContext'
import { fadeIn } from '../atoms/Transitions'

import { ReactComponent as Day } from '../../images/day.svg'
import { ReactComponent as Night } from '../../images/night.svg'
import styles from './ThemeSwitch.module.scss'

const Animation = posed.aside(fadeIn)

const ThemeToggle = ({ dark }) => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Day className={!dark ? null : 'active'} />
    <span className={styles.checkboxFake} />
    <Night className={dark ? 'active' : null} />
  </span>
)

ThemeToggle.propTypes = {
  dark: PropTypes.bool.isRequired
}

const ThemeToggleInput = ({ dark, toggleDark }) => (
  <input
    onChange={() => toggleDark()}
    type="checkbox"
    name="toggle"
    value="toggle"
    aria-describedby="toggle"
    checked={dark}
  />
)

ThemeToggleInput.propTypes = {
  dark: PropTypes.bool.isRequired,
  toggleDark: PropTypes.func.isRequired
}

export default function ThemeSwitch() {
  const { darkMode, toggleDark } = useContext(Context)
  const themeColor = darkMode ? '#1d2224' : '#e7eef4'

  return (
    <>
      <Helmet>
        <body className={darkMode ? 'dark' : null} />
        <meta content={themeColor} name="theme-color" />
      </Helmet>
      <Animation className={styles.themeSwitch}>
        <label className={styles.checkbox}>
          <span className={styles.label}>Toggle Night Mode</span>
          <ThemeToggleInput dark={darkMode} toggleDark={toggleDark} />
          <ThemeToggle dark={darkMode} />
        </label>
      </Animation>
    </>
  )
}
