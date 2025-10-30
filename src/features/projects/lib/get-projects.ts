import path from 'node:path'
import { YAML } from 'bun'
import type { ProjectType } from '../types/project'
import { transformProject } from './transformProject'

const contentDirectory = path.join(process.cwd(), '_content')
const projectsFilePath = path.join(contentDirectory, 'projects.yml')
const projectsFile = await Bun.file(projectsFilePath).text()
const projectsOriginal = YAML.parse(projectsFile) as ProjectType[]

export async function getProjects(): Promise<ProjectType[]> {
  const slugs = projectsOriginal.map(({ slug }: { slug: string }) => slug)

  try {
    const projects: ProjectType[] = []

    for (const slug of slugs) {
      const project = await transformProject(projectsOriginal, slug)
      if (project) projects.push(project)
    }

    return projects
  } catch (error: unknown) {
    console.error((error as Error).message)
    return []
  }
}
