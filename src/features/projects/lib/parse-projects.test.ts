import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import { parseProjects } from './parse-projects'

describe('parseProjects', () => {
  const consoleErrorSpy = mock(() => {})

  beforeEach(() => {
    consoleErrorSpy.mockClear()
    console.error = consoleErrorSpy
  })

  afterEach(() => {
    mock.restore()
  })

  it('parses valid YAML content', () => {
    const yamlContent = `
- slug: test-project
  title: Test Project
  description: A test project description
  techstack:
    - TypeScript
    - React
  links:
    - title: GitHub
      url: https://github.com/test/project
      icon: GitHub
`
    const projects = parseProjects(yamlContent)

    expect(projects).toHaveLength(1)
    expect(projects[0].slug).toBe('test-project')
    expect(projects[0].title).toBe('Test Project')
    expect(projects[0].description).toBe('A test project description')
    expect(projects[0].techstack).toEqual(['TypeScript', 'React'])
    expect(projects[0].links).toHaveLength(1)
    expect(projects[0].links?.[0].title).toBe('GitHub')
  })

  it('parses projects without links', () => {
    const yamlContent = `
- slug: minimal-project
  title: Minimal Project
  description: Just a description
  techstack:
    - HTML
`
    const projects = parseProjects(yamlContent)

    expect(projects).toHaveLength(1)
    expect(projects[0].slug).toBe('minimal-project')
    expect(projects[0].links).toBeUndefined()
  })

  it('returns empty array for invalid YAML', () => {
    const yamlContent = 'invalid: [yaml: content'
    const projects = parseProjects(yamlContent)

    expect(projects).toEqual([])
  })

  it('returns empty array for invalid schema', () => {
    const yamlContent = `
- slug: invalid
  title: Missing required fields
`
    const projects = parseProjects(yamlContent)

    expect(projects).toEqual([])
  })

  it('validates required fields', () => {
    const yamlContent = `
- title: No Slug
  description: Missing slug
  techstack:
    - HTML
`
    const projects = parseProjects(yamlContent)

    expect(projects).toEqual([])
  })

  it('validates techstack is not empty', () => {
    const yamlContent = `
- slug: empty-stack
  title: Empty Stack
  description: Has empty techstack
  techstack: []
`
    const projects = parseProjects(yamlContent)

    expect(projects).toEqual([])
  })

  it('validates link URLs', () => {
    const yamlContent = `
- slug: invalid-link
  title: Invalid Link
  description: Has invalid URL
  techstack:
    - HTML
  links:
    - title: Bad URL
      url: not-a-url
`
    const projects = parseProjects(yamlContent)

    expect(projects).toEqual([])
  })
})
