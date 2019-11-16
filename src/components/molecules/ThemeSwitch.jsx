import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import useDarkMode from '../../hooks/use-dark-mode'
import Icon from '../atoms/Icon'
import styles from './ThemeSwitch.module.scss'

const ThemeToggle = ({ dark }) => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Icon name="Sun" className={!dark ? null : 'active'} />
    <span className={styles.checkboxFake} />
    <Icon name="Moon" className={dark ? 'active' : null} />
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
  const { darkMode, toggleDark } = useDarkMode()
  const themeColor = darkMode ? '#1d2224' : '#e7eef4'

  return (
    <>
      <Helmet>
        <body className={darkMode ? 'dark' : null} />
        <meta name="theme-color" content={themeColor} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Helmet>
      <aside className={styles.themeSwitch}>
        <label className={styles.checkbox}>
          <span className={styles.label}>Toggle Night Mode</span>
          <ThemeToggleInput dark={darkMode} toggleDark={toggleDark} />
          <ThemeToggle dark={darkMode} />
        </label>
      </aside>
    </>
  )
}
