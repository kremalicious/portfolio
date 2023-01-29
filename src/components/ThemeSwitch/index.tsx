import Icon from '../Icon'
import styles from './index.module.css'
import * as Select from '@radix-ui/react-select'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Item } from './Item'

export function getIconName(theme: string) {
  return theme === 'light' ? 'Sun' : theme === 'dark' ? 'Moon' : 'Monitor'
}

export default function ThemeSwitch() {
  const { theme, themes, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <Head>
        <meta name="theme-color" content="var(--theme-color)" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>

      <aside className={styles.themeSwitch}>
        {mounted ? (
          <Select.Root
            defaultValue={theme}
            value={theme}
            onValueChange={(value) => setTheme(value)}
          >
            <Select.Trigger
              className={styles.trigger}
              aria-label="Theme Switch"
            >
              <Select.Value>
                <Icon name={getIconName(resolvedTheme)} />
              </Select.Value>
              <Select.Icon className={styles.chevron}>
                <Icon name="ChevronDown" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className={styles.content} position="popper">
                <Select.Arrow className={styles.arrow} width={14} height={7} />
                <Select.Viewport className={styles.viewport}>
                  {themes
                    .map((theme) => <Item key={theme} theme={theme}></Item>)
                    .reverse()}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        ) : null}
      </aside>
    </>
  )
}
