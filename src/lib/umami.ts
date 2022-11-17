const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

if (!UMAMI_SCRIPT_URL || !UMAMI_WEBSITE_ID) {
  throw new Error('Missing Umami environment variables')
}

export { UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID }
