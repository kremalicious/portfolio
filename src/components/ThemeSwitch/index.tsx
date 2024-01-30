'use client'

import * as Select from '@radix-ui/react-select'
import { useTheme } from 'next-themes'
import Icon from '../Icon'
import { Item } from './Item'
import styles from './index.module.css'
import { Metadata } from 'next'

export function getIconName(theme: string) {
  return theme === 'light' ? 'Sun' : theme === 'dark' ? 'Moon' : 'Contrast'
}

export const metadata: Metadata = {
  themeColor: 'var(--theme-color)'
}

export default function ThemeSwitch() {
  const { theme, themes, resolvedTheme, setTheme } = useTheme()
  const iconName = getIconName(resolvedTheme)

  return (
    <aside className={styles.themeSwitch}>
      <Select.Root
        defaultValue={theme}
        value={theme}
        onValueChange={(value) => setTheme(value)}
      >
        <Select.Trigger className={styles.trigger} aria-label="Theme Switch">
          <Select.Value asChild>
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
                .map((theme) => <Item key={theme} theme={theme}></Item>)
                .reverse()}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </aside>
  )
}
