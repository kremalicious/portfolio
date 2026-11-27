import path from 'node:path'
import type { ImageMetadata } from 'astro'
import sharp from 'sharp'
import type { ProjectImage, ProjectSource } from '../types/project'

const imagesDirectory = path.join(process.cwd(), 'src', '_content', 'images')
const dominantColorCache = new Map<string, Promise<string>>()

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
  const fallbackColor = 'rgb(128, 128, 128)'
  // only extract in production
  if (process.env.NODE_ENV !== 'production') return fallbackColor

  const cached = dominantColorCache.get(fileName)
  if (cached) return cached

  const pending = sharp(path.join(imagesDirectory, fileName))
    .stats()
    .then(({ dominant }) => `rgb(${dominant.r}, ${dominant.g}, ${dominant.b})`)
    .catch((error: unknown) => {
      const msg = error instanceof Error ? error.message : String(error)
      console.error(`Color extraction failed for ${fileName}: ${msg}`)
      return fallbackColor
    })

  dominantColorCache.set(fileName, pending)
  return pending
}
