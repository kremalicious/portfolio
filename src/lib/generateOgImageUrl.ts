import type { ImageType } from '@/types'
import meta from '@content/meta.json'

export function generateOgImageUrl(image: ImageType | string): string {
  // If image is a string (direct path), convert it to proper format
  const imagePath = typeof image === 'string' ? image : image.src
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || meta.url

  return `${baseUrl}/_next/image?url=${encodeURIComponent(imagePath)}&w=1200&q=75`
}
