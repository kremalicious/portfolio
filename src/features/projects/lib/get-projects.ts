import path from 'node:path'
import { YAML } from 'bun'
import type { ProjectSource, ProjectType } from '../types/project'
import { enhanceProject } from './enhance-project'
import { projectsSchema } from './schemas/project'

const contentDirectory = path.join(process.cwd(), 'src', '_content')
const projectsFilePath = path.join(contentDirectory, 'projects.yml')
const projectsFileContent = await Bun.file(projectsFilePath).text()

export async function getProjects(): Promise<ProjectType[]> {
  const projectsOriginal = parseProjects(projectsFileContent)
  if (projectsOriginal.length === 0) return []

  try {
    const projects: ProjectType[] = []
    const slugs = projectsOriginal.map(({ slug }) => slug)

    for (const slug of slugs) {
      const project = await enhanceProject(projectsOriginal, slug)
      if (project) projects.push(project)
    }

    return projects
  } catch (error: unknown) {
    console.error((error as Error).message)
    return []
  }
}

function parseProjects(fileContent: string): ProjectSource[] {
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
