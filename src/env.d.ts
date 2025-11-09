interface ImportMetaEnv {
  readonly PUBLIC_GIPHY_API_KEY: string
  readonly PUBLIC_LOCATION_API_URL: string
}

// biome-ignore lint/correctness/noUnusedVariables: false reporting
interface ImportMeta {
  readonly env: ImportMetaEnv
}
