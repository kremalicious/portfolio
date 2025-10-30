import { getProjects } from './get-projects'

export async function getAllSlugs() {
  const projects = await getProjects()
  const slugs = projects.map(({ slug }) => slug)
  return slugs
}
