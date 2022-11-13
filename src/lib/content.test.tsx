import {
  getAllProjects,
  getProjectBySlug,
  getProjectImages,
  getProjectSlugs
} from './content'

describe('lib/content', () => {
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
