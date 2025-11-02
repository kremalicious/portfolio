import { z } from 'zod'

export const projectLinkSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  icon: z.string().min(1).optional()
})

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  techstack: z.array(z.string().min(1)).min(1),
  links: z.array(projectLinkSchema).min(1).optional()
})

export type ProjectSourceSchema = z.infer<typeof projectSchema>
export type ProjectLinkSchema = z.infer<typeof projectLinkSchema>

export const projectsSchema = projectSchema.array()
