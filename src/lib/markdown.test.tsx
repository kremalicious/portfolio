import {
  getAllProjects,
  getProjectBySlug,
  getProjectImages,
  getProjectSlugs
} from './api'
import { markdownToHtml } from './markdown'

describe('markdownToHtml', () => {
  test('markdownToHtml', async () => {
    const markdown = '# Hello World'
    const html = await markdownToHtml(markdown)
    expect(html).toContain('<h1>Hello World</h1>')
  })
})

describe('api', () => {
  test('getProjectSlugs', async () => {
    const slugs: string[] = getProjectSlugs()
    expect(slugs).toContain('ipixelpad')
  })

  test('getProjectBySlug', async () => {
    const project = await getProjectBySlug('ipixelpad', [
      'title',
      'description',
      'slug',
      'images',
      'techstack',
      'links'
    ])
    expect(project).toBeDefined()
    expect(project.images[0].src).toContain('ipixelpad')
    expect(project.images[0].blurDataURL).toBeDefined()
  })

  test('getProjectBySlug without fields', async () => {
    const project = await getProjectBySlug('ipixelpad')
    expect(project).toBeDefined()
  })

  test('getProjectImages', async () => {
    const images = await getProjectImages('ipixelpad')
    expect(images).toBeDefined()
    expect(images[0].src).toContain('ipixelpad')
    expect(images[0].blurDataURL).toBeDefined()
  })

  test('getAllProjects', async () => {
    const projects = await getAllProjects([
      'title',
      'description',
      'slug',
      'images',
      'techstack',
      'links'
    ])
    expect(projects).toBeDefined()
  })

  test('getAllProjects without fields', async () => {
    const projects = await getAllProjects()
    expect(projects).toBeDefined()
  })
})
