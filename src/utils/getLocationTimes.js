import SunCalc from 'suncalc'
import countrycodes from './countrycode-latlong.json'

//
// All the checks to see if we should go dark or light
//
export const getLocationTimes = location => {
  // fallback times, in hours
  let sunrise = 7
  let sunset = 19

  // times based on detected country code
  if (location && location !== 'XX' && location !== 'T1') {
    const country = location.toLowerCase()
    const times = SunCalc.getTimes(
      new Date(),
      countrycodes[country][0],
      countrycodes[country][1]
    )
    sunrise = times.sunrise.getHours()
    sunset = times.sunset.getHours()
  }

  return { sunrise, sunset }
}
