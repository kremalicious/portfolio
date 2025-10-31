import type { ImageMetadata } from 'astro'

interface ImageModule {
  default: ImageMetadata
}

export async function getProjectImages(slug: string): Promise<ImageMetadata[]> {
  const imageModules = import.meta.glob<ImageModule>(
    '../../../_content/images/*.{png,jpg,jpeg,webp,avif}',
    { eager: true }
  )

  const projectImages = Object.values(imageModules)
    .map((module) => module.default)
    .filter((image) => image.src.includes(`/${slug}-`))
    .sort((first, second) => first.src.localeCompare(second.src))

  return projectImages
}
