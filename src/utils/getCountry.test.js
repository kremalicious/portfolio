import { getCountry } from './getCountry'

const mockFetch = data =>
  jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      Id: '123',
      text: () => data
      // json: () => data
    })
  )

describe('getCountry', () => {
  it('fetches and returns correct value', async () => {
    global.fetch = mockFetch('loc=DE')
    const country = await getCountry()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/cdn-cgi/trace?no-cache=1')
    expect(country).toBe('DE')
  })

  it('returns nothing when XX country', async () => {
    global.fetch = mockFetch('loc=XX')
    const country = await getCountry()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/cdn-cgi/trace?no-cache=1')
    expect(country).toBe(undefined)
  })
})
