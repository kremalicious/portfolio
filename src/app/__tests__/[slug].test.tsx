import { render } from '@testing-library/react'
import meta from '../../../_content/meta.json'
import projectMock from '../../../tests/__fixtures__/project.json'
import projectsMock from '../../../tests/__fixtures__/projects.json'
import Page, { generateMetadata, generateStaticParams } from '../[slug]/page'

jest.mock('../../lib/content', () => ({
  getAllProjects: jest.fn().mockImplementation(() => projectsMock),
  getProjectBySlug: jest.fn().mockImplementation(() => projectMock),
  getProjectSlugs: jest.fn().mockImplementation(() => ['slug1', 'slug2'])
}))

describe('app: [slug]/page', () => {
  it('renders correctly', async () => {
    render(await Page({ params: { slug: 'slug' } }))
  })

  it('generateStaticParams()', async () => {
    const slugs = await generateStaticParams()
    expect(slugs).toEqual([{ slug: 'slug1' }, { slug: 'slug2' }])
  })

  it('generateMetadata()', async () => {
    const metadata = await generateMetadata({
      params: { slug: projectMock.slug }
    })

    expect(metadata).toEqual({
      title: projectMock.title,
      description: `${projectMock.description.slice(0, 157)}...`,
      metadataBase: new URL(meta.url),
      alternates: {
        canonical: '/' + projectMock.slug
      },
      openGraph: {
        url: '/' + projectMock.slug,
        images: [{ url: projectMock.images[0].src }]
      }
    })
  })
})
