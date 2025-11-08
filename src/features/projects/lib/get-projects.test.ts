import { beforeEach, describe, expect, it, mock } from 'bun:test'
import type { ProjectImage } from '../types/project'
import { getProjects } from './get-projects'

const mockImages: ProjectImage[] = [
  {
    src: '/@fs/test-01.png',
    width: 1920,
    height: 1080,
    format: 'png',
    dominantColor: 'rgb(100, 150, 200)'
  }
]

mock.module('./get-project-images', () => ({
  getProjectImages: mock(async () => mockImages)
}))

beforeEach(() => {
  mock.restore()
})

describe('getProjects', () => {
  it('returns all projects with enhanced data', async () => {
    const projects = await getProjects()

    expect(projects.length).toBeGreaterThan(0)

    // Verify first project has required fields
    const firstProject = projects[0]
    expect(firstProject.slug).toBeDefined()
    expect(firstProject.title).toBeDefined()
    expect(firstProject.description).toBeDefined()
    expect(firstProject.descriptionHtml).toBeDefined()
    expect(firstProject.techstack).toBeDefined()
    expect(firstProject.images).toBeDefined()
    expect(Array.isArray(firstProject.images)).toBe(true)
  })

  it('converts markdown description to HTML', async () => {
    const projects = await getProjects()
    const firstProject = projects[0]

    expect(firstProject.descriptionHtml).toContain('<p>')
    expect(firstProject.descriptionHtml).not.toBe(firstProject.description)
  })

  it('includes project images', async () => {
    const projects = await getProjects()

    // Find a project that should have images
    const projectWithImages = projects.find((p) => p.images.length > 0)

    expect(projectWithImages).toBeDefined()
    expect(projectWithImages?.images[0]).toHaveProperty('src')
    expect(projectWithImages?.images[0]).toHaveProperty('width')
    expect(projectWithImages?.images[0]).toHaveProperty('height')
    expect(projectWithImages?.images[0]).toHaveProperty('dominantColor')
  })

  it('preserves all project properties', async () => {
    const projects = await getProjects()
    const firstProject = projects[0]

    expect(typeof firstProject.slug).toBe('string')
    expect(typeof firstProject.title).toBe('string')
    expect(typeof firstProject.description).toBe('string')
    expect(Array.isArray(firstProject.techstack)).toBe(true)
    expect(firstProject.techstack.length).toBeGreaterThan(0)
  })

  it('handles projects with links', async () => {
    const projects = await getProjects()
    const projectWithLinks = projects.find((p) => p.links && p.links.length > 0)

    expect(projectWithLinks).toBeDefined()
    expect(projectWithLinks?.links?.[0]).toHaveProperty('title')
    expect(projectWithLinks?.links?.[0]).toHaveProperty('url')
  })

  it('returns projects in correct order', async () => {
    const projects = await getProjects()

    // Projects should be returned in the order they appear in projects.yml
    expect(projects[0].slug).toBe('vado')
    expect(projects[1].slug).toBe('oceanprotocol-market')
  })
})
