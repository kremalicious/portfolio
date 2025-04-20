declare global {
  interface Window {
    umami?: (eventName: string) =>
      | undefined
      | {
          trackEvent: (
            // biome-ignore lint/style/useNamingConvention: external API
            event_name: string,
            // biome-ignore lint/style/useNamingConvention: external API
            event_data?: { [key: string]: string },
            url?: string,
            // biome-ignore lint/style/useNamingConvention: external API
            website_id?: string
          ) => void
          trackView: (
            url: string,
            referrer?: string,
            // biome-ignore lint/style/useNamingConvention: external API
            website_id?: string
          ) => void
        }
  }
}

window.umami = window.umami || {}

export type {}
