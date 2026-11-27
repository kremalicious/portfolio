export function getCanonicalUrl(pathname: string, site: URL): string {
  const normalized = pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
  return new URL(normalized, site).href
}
