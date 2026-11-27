import { z } from 'zod'
import { metaDescriptionMaxLength } from '@/lib/meta-description'

export const projectLinkSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  icon: z.string().min(1).optional()
})

export const projectImageSchema = z.object({
  file: z.string().min(1),
  alt: z.string().min(1)
})

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).max(metaDescriptionMaxLength),
  content: z.string().min(1),
  images: z
    .array(projectImageSchema)
    .min(1)
    .superRefine((images, ctx) => {
      const files = new Set<string>()
      for (const [index, { file }] of images.entries()) {
        if (files.has(file)) {
          ctx.addIssue({
            code: 'custom',
            message: `Duplicate image file "${file}"`,
            path: [index, 'file']
          })
        }
        files.add(file)
      }
    }),
  techstack: z.array(z.string().min(1)).min(1),
  links: z.array(projectLinkSchema).min(1).optional()
})

export type ProjectSourceSchema = z.infer<typeof projectSchema>
export type ProjectLinkSchema = z.infer<typeof projectLinkSchema>

export const projectsSchema = projectSchema.array()
