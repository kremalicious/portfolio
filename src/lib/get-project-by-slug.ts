import type { ProjectType } from '@/types'
import { getProjects } from './get-projects'

export async function getProjectBySlug(
  slug: string
): Promise<ProjectType | undefined> {
  const projects = await getProjects()
  return projects.find((item) => item.slug === slug)
}
