//
// adapted from
// https://github.com/daveschumaker/react-dark-mode-hook/blob/master/useDarkMode.js
//
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'

const isClient = typeof window === 'object'

function getDarkMode() {
  //   if (localStorage.getItem('theme') === 'dark') {
  //     return true
  //   } else if (localStorage.getItem('theme') === 'light') {
  //     return false
  //   }

  if (
    isClient &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true
  } else {
    return false
  }
}

export type UseDarkMode = {
  isDarkMode: boolean
  themeColor: string
  setIsDarkMode: Dispatch<SetStateAction<boolean>>
}

export default function useDarkMode(): UseDarkMode {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getDarkMode())
  const [themeColor, setThemeColor] = useState<string>()

  const changeTheme = useCallback(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setThemeColor(isDarkMode === true ? '#1d2224' : '#e7eef4')
  }, [isDarkMode])

  //
  // Init
  //
  useEffect(() => {
    changeTheme()
  }, [changeTheme])

  //
  // Handle system theme change events
  //
  const handleChange = useCallback(() => {
    setIsDarkMode(getDarkMode())
  }, [])

  useEffect(() => {
    if (!isClient) return

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    try {
      darkModeQuery.addEventListener('change', handleChange)
    } catch (addEventListenerError) {
      console.error(addEventListenerError)
    }

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleChange)
  }, [handleChange])

  return { isDarkMode, setIsDarkMode, themeColor }
}
