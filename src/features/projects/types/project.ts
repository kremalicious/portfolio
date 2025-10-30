import type { ImageType } from './image'

export declare type ProjectLink = {
  title: string
  url: string
  icon?: string
}

export declare type ProjectType = {
  images: ImageType[]
  slug: string
  title: string
  description: string
  descriptionHtml: string
  techstack: string[]
  links?: ProjectLink[]
}
