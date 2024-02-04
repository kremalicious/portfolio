import type ImageType from '@/src/types/image'
import fs from 'fs'
import { join } from 'path'
import sharp from 'sharp'
import { rgbDataURL } from './rgbDataURL.js'

const imagesDirectory = join(process.cwd(), 'public', 'images')

export async function getProjectImages(slug: string) {
  const allImages = fs.readdirSync(imagesDirectory, 'utf8')
  const projectImages = allImages.filter((image) => image.includes(slug))

  let images: ImageType[] = []

  await Promise.all(
    projectImages.map(async (image) => {
      const file = `${imagesDirectory}/${image}`
      const transformer = sharp(file)
      const { width, height, format } = await transformer.metadata()
      const { dominant } = await transformer.stats()
      const blurDataURL = rgbDataURL(dominant.r, dominant.g, dominant.b)

      const imageType: ImageType = {
        width,
        height,
        format,
        blurDataURL,
        src: `/images/${image}`
      }
      images.push(imageType)
    })
  )
  // Sort images by sequentially numbered name to be sure
  images = images.sort((a, b) => a.src.localeCompare(b.src))
  return images
}
