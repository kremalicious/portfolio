import type { ProjectSource, ProjectType } from '../types/project'
import { getProjectImages } from './get-project-images'
import { markdownToHtml } from './markdown'

export async function enhanceProject(
  projectsOriginal: ProjectSource[],
  slug: string
): Promise<ProjectType | undefined> {
  const project = projectsOriginal.find((item) => item.slug === slug)
  if (!project) return

  const descriptionHtml = await markdownToHtml(project.description)
  const images = await getProjectImages(slug)

  return {
    ...project,
    descriptionHtml,
    images
  }
}
