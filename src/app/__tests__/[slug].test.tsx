import meta from '@content/meta.json'
import { render } from '@testing-library/react'
import projectMock from '../../../tests/__fixtures__/project.json'
import Page, { generateMetadata, generateStaticParams } from '../[slug]/page'

// Mock the generateOgImageUrl function to return a predictable URL
jest.mock('../../lib/generateOgImageUrl', () => ({
  generateOgImageUrl: jest.fn().mockImplementation((image) => {
    const src = typeof image === 'string' ? image : image.src
    return `https://optimized-image.com${src}`
  })
}))

jest.mock('../../lib/getProjectBySlug', () => ({
  getProjectBySlug: jest.fn().mockImplementation(() => projectMock)
}))

jest.mock('../../lib/getAllSlugs', () => ({
  getAllSlugs: jest.fn().mockImplementationOnce(() => ['slug1', 'slug2'])
}))

describe('app: [slug]/page', () => {
  it('renders correctly', async () => {
    render(await Page({ params: Promise.resolve({ slug: 'slug' }) }))
  })

  it('generateStaticParams()', async () => {
    const slugs = await generateStaticParams()
    expect(slugs).toEqual([{ slug: 'slug1' }, { slug: 'slug2' }])
  })

  it('generateMetadata()', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: projectMock.slug })
    })

    expect(metadata).toEqual({
      title: projectMock.title,
      description: `${projectMock.description.slice(0, 157)}...`,
      metadataBase: new URL(meta.url),
      alternates: {
        canonical: `/${projectMock.slug}`
      },
      openGraph: {
        url: `/${projectMock.slug}`,
        images: [
          {
            url: `https://optimized-image.com${projectMock.images[0].src}`,
            width: 1200,
            height: 630,
            alt: `${projectMock.title} - ${meta.author.name}`
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        images: [`https://optimized-image.com${projectMock.images[0].src}`]
      }
    })
  })
})
