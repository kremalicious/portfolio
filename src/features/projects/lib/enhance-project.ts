import type { ProjectSource, ProjectType } from '../types/project'
import { getProjectImages } from './get-project-images'
import { markdownToHtml } from './markdown'

export async function enhanceProject(
  projectsOriginal: ProjectSource[],
  slug: string
): Promise<ProjectType | undefined> {
  const project = projectsOriginal.find((item) => item.slug === slug)
  if (!project) return

  const contentHtml = await markdownToHtml(project.content)
  const images = await getProjectImages(slug)

  return {
    ...project,
    contentHtml,
    images
  }
}
