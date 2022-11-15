import React from 'react'

type Props = {
  dark: boolean
  toggleDark: () => void
}

export const ThemeToggleInput = ({ dark, toggleDark }: Props) => (
  <input
    onChange={() => toggleDark()}
    type="checkbox"
    name="toggle"
    value="toggle"
    aria-describedby="toggle"
    checked={dark}
  />
)
