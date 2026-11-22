import { describe, expect, it } from 'bun:test'
import { parseProjects } from './parse-projects'

describe('parseProjects', () => {
  it('parses valid YAML content', () => {
    const yamlContent = `
- slug: test-project
  title: Test Project
  description: A test project description
  content: A test project content
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
    expect(projects[0].content).toBe('A test project content')
    expect(projects[0].techstack).toEqual(['TypeScript', 'React'])
    expect(projects[0].links).toHaveLength(1)
    expect(projects[0].links?.[0].title).toBe('GitHub')
  })

  it('parses projects without links', () => {
    const yamlContent = `
- slug: minimal-project
  title: Minimal Project
  description: Just a description
  content: Just some content
  techstack:
    - HTML
`
    const projects = parseProjects(yamlContent)

    expect(projects).toHaveLength(1)
    expect(projects[0].slug).toBe('minimal-project')
    expect(projects[0].links).toBeUndefined()
  })

  it('throws for invalid YAML', () => {
    const yamlContent = 'invalid: [yaml: content'

    expect(() => parseProjects(yamlContent)).toThrow(
      new SyntaxError('YAML Parse error: Unexpected token')
    )
  })

  it('throws for each missing required field', () => {
    const yamlContent = `
- slug: invalid
  title: Missing required fields
`

    expect(() => parseProjects(yamlContent)).toThrow(
      new Error(
        'Invalid project content\n' +
          '✖ Invalid input: expected string, received undefined\n' +
          '  → at [0].description\n' +
          '✖ Invalid input: expected string, received undefined\n' +
          '  → at [0].content\n' +
          '✖ Invalid input: expected array, received undefined\n' +
          '  → at [0].techstack'
      )
    )
  })

  it('throws for a missing slug', () => {
    const yamlContent = `
- title: No Slug
  description: Missing slug
  content: Missing slug
  techstack:
    - HTML
`

    expect(() => parseProjects(yamlContent)).toThrow(
      new Error(
        'Invalid project content\n' +
          '✖ Invalid input: expected string, received undefined\n' +
          '  → at [0].slug'
      )
    )
  })

  it('throws for an empty techstack', () => {
    const yamlContent = `
- slug: empty-stack
  title: Empty Stack
  description: Has empty techstack
  content: Has empty techstack
  techstack: []
`

    expect(() => parseProjects(yamlContent)).toThrow(
      new Error(
        'Invalid project content\n' +
          '✖ Too small: expected array to have >=1 items\n' +
          '  → at [0].techstack'
      )
    )
  })

  it('throws for an invalid link URL', () => {
    const yamlContent = `
- slug: invalid-link
  title: Invalid Link
  description: Has invalid URL
  content: Has invalid URL
  techstack:
    - HTML
  links:
    - title: Bad URL
      url: not-a-url
`

    expect(() => parseProjects(yamlContent)).toThrow(
      new Error(
        'Invalid project content\n✖ Invalid URL\n  → at [0].links[0].url'
      )
    )
  })
})
