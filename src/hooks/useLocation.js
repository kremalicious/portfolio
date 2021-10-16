import axios from 'axios'
import { useEffect, useState } from 'react'

export const useLocation = () => {
  const [location, setLocation] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios(`/api/location`)
        if (!response) return
        setLocation(response.data)
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
