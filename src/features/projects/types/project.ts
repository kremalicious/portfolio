export declare type ProjectLink = {
  title: string
  url: string
  icon?: string
}

export declare type ProjectType = {
  slug: string
  title: string
  description: string
  descriptionHtml: string
  images: ImageMetadata[]
  techstack: string[]
  links?: ProjectLink[]
}
