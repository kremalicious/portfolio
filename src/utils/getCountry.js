//
// Get user location from Cloudflare's geo location HTTP header
//
// @returns country: string
//
export const getCountry = async () => {
  try {
    const data = await fetch('/cdn-cgi/trace?no-cache=1')
    const text = await data.text().replace(/ /g, '')
    const lines = text.split('\n')

    let keyValue
    let trace = []

    await lines.forEach(line => {
      keyValue = line.split('=')
      trace[keyValue[0]] = decodeURIComponent(keyValue[1] || '')
    })

    const country = trace['loc']

    if (country && country !== 'XX') {
      return country
    }
  } catch (error) {
    return null // fail silently
  }
}
