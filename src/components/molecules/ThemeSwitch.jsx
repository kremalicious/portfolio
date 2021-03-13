import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Icon from '../atoms/Icon'
import {
  checkboxContainer,
  checkboxFake,
  themeSwitch,
  checkbox,
  label
} from './ThemeSwitch.module.css'
import useDarkMode from '../../hooks/useDarkMode'

const ThemeToggle = ({ dark }) => (
  <span id="toggle" className={checkboxContainer} aria-live="assertive">
    <Icon name="Sun" className={!dark ? null : 'active'} />
    <span className={checkboxFake} />
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

export default function ThemeSwitch() {
  const { value, toggle } = useDarkMode()
  const [themeColor, setThemeColor] = useState('')
  const [bodyClass, setBodyClass] = useState('')

  useEffect(() => {
    setBodyClass(value ? 'dark' : null)
    setThemeColor(value ? '#1d2224' : '#e7eef4')
  }, [value])

  return (
    <>
      <HeadItems themeColor={themeColor} bodyClass={bodyClass} />
      <aside className={themeSwitch}>
        <label className={checkbox}>
          <span className={label}>Toggle Night Mode</span>
          <ThemeToggleInput dark={value} toggleDark={toggle} />
          <ThemeToggle dark={value} />
        </label>
      </aside>
    </>
  )
}
