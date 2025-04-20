export type Location = {
  country: string
  city: string
  // biome-ignore lint/style/useNamingConvention: API response
  country_code: string
  // biome-ignore lint/style/useNamingConvention: API response
  date_start: string
  // biome-ignore lint/style/useNamingConvention: API response
  date_end: string
}

export type UseLocation = {
  now: Location
  next: Location
}
