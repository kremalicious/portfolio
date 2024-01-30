'use client'

import { useEffect, useState } from 'react'

export type Location = {
  country: string
  city: string
  country_code: string
  date_start: string
  date_end: string
}

export type UseLocation = {
  now: Location
  next: Location
  previous: Location
}

export const useLocation = () => {
  const [location, setLocation] = useState<UseLocation>()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://location.kretschmann.io')
        const data = await response.json()
        if (!data) return
        setLocation(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
  }, [])

  return {
    now: location?.now,
    next: location?.next,
    previous: location?.previous
  }
}
