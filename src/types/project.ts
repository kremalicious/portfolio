import ImageType from './image'

declare type ProjectType = {
  images: ImageType[]
  slug: string
  title: string
  description: string
  descriptionHtml: string
  techstack: string[]
  links?: any
}

export default ProjectType
