declare module '*.yml' {
  // biome-ignore lint/suspicious/noExplicitAny: could be any data
  const data: any
  export default data
}
