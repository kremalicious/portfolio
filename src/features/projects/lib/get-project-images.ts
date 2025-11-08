import type { ImageMetadata } from 'astro'
import sharp from 'sharp'
import type { ProjectImage } from '../types/project'
import { rgbDataUrl } from './rgbDataURL'

interface ImageModule {
  default: ImageMetadata
}

export async function getProjectImages(slug: string): Promise<ProjectImage[]> {
  const imageModules = import.meta.glob<ImageModule>(
    '../../../_content/images/*.{png,jpg,jpeg,webp,avif}',
    { eager: true }
  )

  const projectImages = Object.values(imageModules)
    .map((module) => module.default)
    .filter((image) => image.src.includes(`/${slug}-`))
  // .sort((first, second) => first.src.localeCompare(second.src))

  const enhancedImages: ProjectImage[] = []

  await Promise.all(
    projectImages.map(async (image) => {
      const transformer = sharp(resolveImagePathForSharp(image.src))
      const { dominant } = await transformer.stats()
      const blurDataUrl = rgbDataUrl(dominant.r, dominant.g, dominant.b)

      const enhancedImage: ProjectImage = {
        ...image,
        blurDataUrl,
        dominantColor: `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`
      }

      enhancedImages.push(enhancedImage)
    })
  )

  // Sort images again by sequentially numbered name to be sure
  enhancedImages.sort((a, b) => a.src.localeCompare(b.src))

  return enhancedImages
}

function resolveImagePathForSharp(imageSrc: string): string {
  const FILE_SYSTEM_PREFIX = '/@fs'
  const sanitizedSrc = imageSrc.split('?')[0]
  return sanitizedSrc.slice(FILE_SYSTEM_PREFIX.length)
}
