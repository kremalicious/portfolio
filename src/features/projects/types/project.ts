import type { ImageMetadata } from 'astro'
import type {
  ProjectLinkSchema,
  ProjectSourceSchema
} from '../lib/schemas/project'

export interface ProjectLink extends ProjectLinkSchema {}

export interface ProjectSource extends ProjectSourceSchema {}

export interface ProjectType extends ProjectSource {
  descriptionHtml: string
  images: ImageMetadata[]
}
