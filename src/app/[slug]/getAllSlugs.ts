import projects from '@/generated/projects.json'

export function getAllSlugs() {
  const slugs = projects.map(({ slug }: { slug: string }) => slug)
  return slugs
}
