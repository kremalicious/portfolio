import meta from '@content/meta.json'

type StructuredDataNode = Record<string, unknown> & { '@type': string }

export type StructuredData = {
  '@context': 'https://schema.org'
  '@graph': StructuredDataNode[]
}

type CreativeWorkInput = {
  title: string
  description: string
  url: string
  keywords: string[]
}

const siteUrl = `${meta.url}/`
const personId = `${siteUrl}#person`
const websiteId = `${siteUrl}#website`

const person: StructuredDataNode = {
  '@type': 'Person',
  '@id': personId,
  name: meta.author.name,
  jobTitle: meta.author.label,
  url: siteUrl,
  sameAs: meta.profiles.map(({ url }) => url)
}

const website: StructuredDataNode = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: meta.author.name,
  url: siteUrl,
  publisher: { '@id': personId }
}

export function getHomeStructuredData(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        url: siteUrl,
        mainEntity: { '@id': personId },
        isPartOf: { '@id': websiteId }
      },
      website,
      person
    ]
  }
}

export function getCreativeWorkStructuredData({
  title,
  description,
  url,
  keywords
}: CreativeWorkInput): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: title,
        description,
        url,
        keywords: keywords.join(', '),
        creator: { '@id': personId },
        isPartOf: { '@id': websiteId }
      },
      website,
      person
    ]
  }
}
