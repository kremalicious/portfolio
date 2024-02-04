declare global {
  interface Window {
    umami?: (eventName: string) => void | {
      trackEvent: (
        event_name: string,
        event_data?: { [key: string]: string },
        url?: string,
        website_id?: string
      ) => void
      trackView: (url: string, referrer?: string, website_id?: string) => void
    }
  }
}

window.umami = window.umami || {}

export {}
