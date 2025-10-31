import type { ProjectType } from '../types/project'
import { getProjectImages } from './get-project-images'
import { markdownToHtml } from './markdown'

export async function enhanceProject(
  projectsOriginal: ProjectType[],
  slug: string
) {
  const project = projectsOriginal.find((item) => item.slug === slug)
  if (!project) return

  // enhance data with additional fields
  const descriptionHtml = await markdownToHtml(project.description)
  project.descriptionHtml = descriptionHtml

  const images = await getProjectImages(slug)
  project.images = images

  return project
}
