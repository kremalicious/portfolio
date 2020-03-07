import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import useDarkMode from 'use-dark-mode'
import Icon from '../atoms/Icon'
import styles from './ThemeSwitch.module.css'

const ThemeToggle = memo(({ dark }) => (
  <span id="toggle" className={styles.checkboxContainer} aria-live="assertive">
    <Icon name="Sun" className={!dark ? null : 'active'} />
    <span className={styles.checkboxFake} />
    <Icon name="Moon" className={dark ? 'active' : null} />
  </span>
))

ThemeToggle.displayName = 'ThemeToggle'

ThemeToggle.propTypes = {
  dark: PropTypes.bool.isRequired
}

const ThemeToggleInput = memo(({ dark, toggleDark }) => (
  <input
    onChange={() => toggleDark()}
    type="checkbox"
    name="toggle"
    value="toggle"
    aria-describedby="toggle"
    checked={dark}
  />
))

ThemeToggleInput.displayName = 'ThemeToggleInput'

ThemeToggleInput.propTypes = {
  dark: PropTypes.bool.isRequired,
  toggleDark: PropTypes.func.isRequired
}

const HeadItems = ({ bodyClass, themeColor }) => (
  <Helmet>
    <body className={bodyClass} />
    <meta name="theme-color" content={themeColor} />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
  </Helmet>
)

HeadItems.propTypes = {
  bodyClass: PropTypes.string,
  themeColor: PropTypes.string.isRequired
}

function ThemeSwitch() {
  const { value, toggle } = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })
  const [themeColor, setThemeColor] = useState('')
  const [bodyClass, setBodyClass] = useState('')

  useEffect(() => {
    setBodyClass(value ? 'dark' : null)
    setThemeColor(value ? '#1d2224' : '#e7eef4')
  }, [value])

  return (
    <>
      <HeadItems themeColor={themeColor} bodyClass={bodyClass} />
      <aside className={styles.themeSwitch}>
        <label className={styles.checkbox}>
          <span className={styles.label}>Toggle Night Mode</span>
          <ThemeToggleInput dark={value} toggleDark={toggle} />
          <ThemeToggle dark={value} />
        </label>
      </aside>
    </>
  )
}

export default memo(ThemeSwitch)
