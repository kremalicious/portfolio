import type { ImageMetadata } from 'astro'
import { fileURLToPath } from 'bun'
import sharp from 'sharp'
import type { ProjectImage, ProjectSource } from '../types/project'

interface ImageModule {
  default: ImageMetadata
}

export async function getProjectImages(
  projectImages: ProjectSource['images']
): Promise<ProjectImage[]> {
  const allImages = import.meta.glob<ImageModule>(
    '../../../_content/images/*.{png,jpg,jpeg,webp,avif}',
    { eager: true }
  )

  const imagesByFileName = new Map(
    Object.entries(allImages).map(([modulePath, imageModule]) => [
      modulePath.split('/').pop() || '',
      imageModule.default
    ])
  )

  return Promise.all(
    projectImages.map(async ({ file, alt }) => {
      const image = imagesByFileName.get(file)
      if (!image) {
        throw new Error(`Missing project image "${file}"`)
      }

      const dominantColor = await getDominantColor(file)
      return {
        ...image,
        alt,
        dominantColor
      }
    })
  )
}

async function getDominantColor(fileName: string): Promise<string> {
  let dominantColor = 'rgb(128, 128, 128)' // fallback
  // only extract in production
  if (process.env.NODE_ENV !== 'production') return dominantColor

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
