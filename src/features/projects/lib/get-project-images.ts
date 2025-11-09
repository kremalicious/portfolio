import type { ImageMetadata } from 'astro'
import { fileURLToPath } from 'bun'
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
      const filenameWithEnding = modulePath.split('/').pop() || ''
      const dominantColor = await getDominantColor(filenameWithEnding)
      enhancedImages.push({
        ...imageModule.default,
        dominantColor
      })
    })
  )

  enhancedImages.sort((a, b) => a.src.localeCompare(b.src))

  return enhancedImages
}

async function getDominantColor(fileName: string): Promise<string> {
  let dominantColor = 'rgb(128, 128, 128)' // fallback
  if (process.env.NODE_ENV !== 'production') return dominantColor // only extract in production

  try {
    const fileUrl = new URL(
      `../../src/_content/images/${fileName}`,
      import.meta.url
    )
    const filePath = fileURLToPath(fileUrl)
    const { dominant } = await sharp(filePath).stats()
    dominantColor = `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(`Color extraction failed for ${fileName}: ${msg}`)
  }

  return dominantColor
}
