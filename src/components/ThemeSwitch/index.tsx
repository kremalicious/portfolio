import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import useDarkMode from '../../hooks/useDarkMode'
import Head from 'next/head'
import { ThemeToggle } from './ThemeToggle'
import { ThemeToggleInput } from './ThemeToggleInput'

export default function ThemeSwitch() {
  const { value, toggle } = useDarkMode()
  const [themeColor, setThemeColor] = useState<string>()

  useEffect(() => {
    if (value === true) {
      document.querySelector('body').classList.add('dark')
      document.querySelector('body').classList.remove('light')
      setThemeColor('#1d2224')
    } else {
      document.querySelector('body').classList.add('light')
      document.querySelector('body').classList.remove('dark')
      setThemeColor('#e7eef4')
    }
  }, [value])

  return (
    <>
      <Head>
        <meta name="theme-color" content={themeColor} />
        <meta name="msapplication-TileColor" content={themeColor} />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color={themeColor}
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
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
