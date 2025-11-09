export type Location = {
  country: string
  city: string
  countryCode: string
  startDate: string
  endDate: string
}

export type UseLocation = {
  now: Location
  next: Location
}
