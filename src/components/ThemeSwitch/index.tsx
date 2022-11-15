import styles from './index.module.css'
import useDarkMode from '../../hooks/useDarkMode'
import Head from 'next/head'
import { ThemeToggle } from './ThemeToggle'
import { ThemeToggleInput } from './ThemeToggleInput'

export default function ThemeSwitch() {
  const { value, toggle, themeColor } = useDarkMode()

  return (
    <>
      <Head>
        <meta name="theme-color" content={themeColor} />
        <meta name="msapplication-TileColor" content={themeColor} />
        {/* <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color={themeColor}
        /> */}
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
