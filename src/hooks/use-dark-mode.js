import { useState, useEffect } from 'react'
import { getLocationTimes } from '../utils/getLocationTimes'
import { getCountry } from '../utils/getCountry'

export default function useDarkMode() {
  const store = typeof localStorage === 'undefined' ? null : localStorage
  const darkLocalStorage = store && store.getItem('darkMode')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    darkLocalStorage
      ? darkLocalStorage === 'true'
        ? setDarkMode(true)
        : setDarkMode(false)
      : checkTimes()

    async function checkTimes() {
      const geolocation = await getCountry()
      const { sunset, sunrise } = getLocationTimes(geolocation)
      const now = new Date().getHours()
      const weWantItDarkTimes = now >= sunset || now <= sunrise
      weWantItDarkTimes && setDarkMode(true)
    }
  }, [darkLocalStorage, darkMode])

  function toggleDark() {
    setDarkMode(!darkMode)
    store && store.setItem('darkMode', !darkMode)
  }

  return { darkMode, toggleDark }
}
