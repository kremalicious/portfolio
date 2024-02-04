export type Location = {
  country: string
  city: string
  country_code: string
  date_start: string
  date_end: string
}

export type UseLocation = {
  now: Location
  next: Location
}
