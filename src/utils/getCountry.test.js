import { getCountry } from './getCountry'

const responseMock = 'loc=DE'

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
  beforeEach(() => {
    global.fetch = mockFetch(responseMock)
  })

  it('fetches and returns correct value', async () => {
    const country = await getCountry()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/cdn-cgi/trace?no-cache=1')
    expect(country).toBe('DE')
  })
})
