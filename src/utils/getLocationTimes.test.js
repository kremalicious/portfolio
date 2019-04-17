import { getLocationTimes } from './getLocationTimes'

describe('getLocationTimes', () => {
  it('returns values', async () => {
    const { sunset, sunrise } = await getLocationTimes('DE')
    expect(sunset).toBeDefined()
    expect(sunrise).toBeDefined()
  })
})
