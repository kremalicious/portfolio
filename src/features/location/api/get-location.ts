export const getLocation = async () => {
  try {
    const response = await fetch('https://location.kretschmann.io')
    if (!response.ok)
      throw new Error('Network response for location was not ok.')

    const data = await response.json()
    return data
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}
