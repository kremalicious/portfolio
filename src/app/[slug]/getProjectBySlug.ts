import projects from '@/generated/projects.json'

export function getProjectBySlug(slug: string) {
  return projects.find((item) => item.slug === slug)
}
