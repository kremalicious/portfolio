import useDarkMode from '../../hooks/useDarkMode'

export const ThemeToggleInput = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  return (
    <input
      onChange={() => setIsDarkMode(!isDarkMode)}
      type="checkbox"
      name="toggle"
      value="toggle"
      aria-describedby="toggle"
      checked={isDarkMode === true}
    />
  )
}
