import { YAML } from 'bun'
import type { ProjectSource } from '../types/project'
import { projectsSchema } from './schemas/project'

export function parseProjects(fileContent: string): ProjectSource[] {
  try {
    const parsedProjects = YAML.parse(fileContent)
    const validation = projectsSchema.safeParse(parsedProjects)
    if (!validation.success) {
      console.error('Invalid project content', validation.error.message)
      return []
    }

    return validation.data
  } catch (error: unknown) {
    console.error('Failed to parse project content', (error as Error).message)
    return []
  }
}
