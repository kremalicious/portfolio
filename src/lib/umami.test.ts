import { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID } from './umami'

describe('lib/umami', () => {
  test('exports env vars', async () => {
    expect(UMAMI_SCRIPT_URL).toBe(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL)
    expect(UMAMI_WEBSITE_ID).toBe(process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID)
  })
})
