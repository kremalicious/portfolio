import fs from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'
import type { ImageType } from '@/types'
import { rgbDataUrl } from './rgbDataURL'

const imagesDirectory = join(process.cwd(), '_content', 'images')

export async function getProjectImages(slug: string): Promise<ImageType[]> {
  const allImages = fs.readdirSync(imagesDirectory, 'utf8')
  const projectImages = allImages.filter((image) => image.includes(slug))

  const images: ImageType[] = await Promise.all(
    projectImages.map(async (image) => {
      const filePath = join(imagesDirectory, image)
      const transformer = sharp(filePath)
      const { width, height, format } = await transformer.metadata()
      const { dominant } = await transformer.stats()
      const blurDataUrl = rgbDataUrl(dominant.r, dominant.g, dominant.b)

      return {
        width,
        height,
        format,
        blurDataUrl,
        src: filePath
      }
    })
  )

  // Sort images by sequentially numbered name to be sure
  return images.sort((a, b) => {
    const aName = typeof a.src === 'string' ? a.src : ''
    const bName = typeof b.src === 'string' ? b.src : ''
    return aName.localeCompare(bName)
  })
}
