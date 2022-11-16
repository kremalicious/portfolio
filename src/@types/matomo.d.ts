interface Dimensions {
  dimension1?: string
  dimension2?: string
  dimension3?: string
  dimension4?: string
  dimension5?: string
  dimension6?: string
  dimension7?: string
  dimension8?: string
  dimension9?: string
  dimension10?: string
}

declare global {
  interface Window {
    _paq?:
      | (
          | Dimensions
          | number[]
          | string[]
          | number
          | string
          | null
          | undefined
        )[][]
      | null
  }
}

window._paq = window._paq || {}

export {}
