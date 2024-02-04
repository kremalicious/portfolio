import ProjectType from '../../src/types/project'
import { getProjectImages } from './images.js'
import { markdownToHtml } from './markdown.js'

export async function transformProject(
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
