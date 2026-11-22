import { YAML } from 'bun'
import { z } from 'zod'
import type { ProjectSource } from '../types/project'
import { projectsSchema } from './schemas/project'

export function parseProjects(fileContent: string): ProjectSource[] {
  const validation = projectsSchema.safeParse(YAML.parse(fileContent))
  if (!validation.success) {
    throw new Error(
      `Invalid project content\n${z.prettifyError(validation.error)}`
    )
  }

  return validation.data
}
