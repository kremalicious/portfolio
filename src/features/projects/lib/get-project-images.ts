import { readFileSync } from 'node:fs'
import type { ImageMetadata } from 'astro'
import sharp from 'sharp'
import type { ProjectImage } from '../types/project'

interface ImageModule {
  default: ImageMetadata
}

export async function getProjectImages(slug: string): Promise<ProjectImage[]> {
  const allImages = import.meta.glob<ImageModule>(
    '../../../_content/images/*.{png,jpg,jpeg,webp,avif}',
    { eager: true }
  )

  const projectImages = Object.entries(allImages).filter(([, module]) =>
    module.default.src.includes(`/${slug}-`)
  )

  const enhancedImages: ProjectImage[] = []

  await Promise.all(
    projectImages.map(async ([modulePath, imageModule]) => {
      const dominantColor = await getDominantColor(modulePath)
      enhancedImages.push({
        ...imageModule.default,
        dominantColor
      })
    })
  )

  enhancedImages.sort((a, b) => a.src.localeCompare(b.src))

  return enhancedImages
}

async function getDominantColor(imagePath: string): Promise<string> {
  let dominantColor = 'rgb(128, 128, 128)' // fallback

  try {
    const buffer = readFileSync(imagePath)
    const { dominant } = await sharp(buffer).stats()
    dominantColor = `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`
  } catch {}

  return dominantColor
}
