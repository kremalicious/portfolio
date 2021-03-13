//
// adapted from
// https://github.com/daveschumaker/react-dark-mode-hook/blob/master/useDarkMode.js
//
import { useState, useEffect, useCallback } from 'react'

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

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(getDarkMode)

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  //
  // Handle system theme change events
  //
  const handleChange = useCallback(() => {
    setDarkMode(getDarkMode())
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

  return { value: darkMode, toggle: toggleDarkMode }
}
