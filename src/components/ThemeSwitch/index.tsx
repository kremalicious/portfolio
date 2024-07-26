'use client'

import Icon from '@/components/Icon'
import * as Select from '@radix-ui/react-select'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Item } from './Item'
import styles from './index.module.css'

export function getIconName(theme: string) {
  return theme === 'light' ? 'Sun' : theme === 'dark' ? 'Moon' : 'Contrast'
}

export default function ThemeSwitch() {
  const { theme, themes, resolvedTheme, setTheme } = useTheme()
  const iconName = getIconName(resolvedTheme || '')

  // hydration errors workaround
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <aside className={styles.themeSwitch}>
      {mounted ? (
        <Select.Root
          defaultValue={theme}
          value={theme}
          onValueChange={(value) => setTheme(value)}
        >
          <Select.Trigger className={styles.trigger} aria-label="Theme Switch">
            <Select.Value>
              <Icon name={iconName} />
            </Select.Value>
            <Select.Icon className={styles.chevron}>
              <Icon name="ChevronDown" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className={styles.content}
              position="popper"
              align="end"
            >
              <Select.Arrow className={styles.arrow} width={14} height={7} />
              <Select.Viewport className={styles.viewport}>
                {themes
                  .map((theme) => <Item key={theme} theme={theme} />)
                  .reverse()}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      ) : null}
    </aside>
  )
}
