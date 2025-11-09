export async function getLocation() {
  const apiUrl = import.meta.env.PUBLIC_LOCATION_API_URL ?? ''
  try {
    const response = await fetch(apiUrl)
    if (!response.ok)
      throw new Error('Network response for location was not ok.')

    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}
