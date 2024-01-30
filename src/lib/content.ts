import fs from 'fs'
import yaml from 'js-yaml'
import { join } from 'path'
import sharp from 'sharp'
import type ImageType from '../interfaces/image'
import type ProjectType from '../interfaces/project'
import { markdownToHtml } from './markdown'

const imagesDirectory = join(process.cwd(), 'public', 'images')
const contentDirectory = join(process.cwd(), '_content')
const projects = yaml.load(
  fs.readFileSync(`${contentDirectory}/projects.yml`, 'utf8')
) as Partial<ProjectType>[]

export function getProjectSlugs() {
  return projects.map(({ slug }: { slug: string }) => slug)
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
// const keyStr =
//   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

// const triplet = (e1: number, e2: number, e3: number) =>
//   keyStr.charAt(e1 >> 2) +
//   keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
//   keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
//   keyStr.charAt(e3 & 63)

// export const rgbDataURL = ({ r, g, b }: { r: number; g: number; b: number }) =>
//   `data:image/gif;base64,R0lGODlhAQABAPAA${
//     triplet(0, r, g) + triplet(b, 255, 255)
//   }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export async function getProjectImages(slug: string) {
  const allImages = fs.readdirSync(imagesDirectory, 'utf8')
  const projectImages = allImages.filter((image) => image.includes(slug))

  let images: ImageType[] = []

  await Promise.all(
    projectImages.map(async (image) => {
      const file = `${imagesDirectory}/${image}`
      const transformer = sharp(file)
      const { width, height, format } = await transformer.metadata()
      // const { dominant } = await transformer.stats()
      // const blurDataURL = rgbDataURL(dominant)

      const imageType: ImageType = {
        width,
        height,
        format,
        // blurDataURL,
        src: `/images/${image}`
      }
      images.push(imageType)
    })
  )
  // Sort images by sequentially numbered name to be sure
  images = images.sort((a, b) => a.src.localeCompare(b.src))
  return images
}

export async function getProjectBySlug(slug: string, fields: string[] = []) {
  const project = projects.find((item) => item.slug === slug)

  // enhance data with additional fields
  const descriptionHtml = await markdownToHtml(project.description)
  project.descriptionHtml = descriptionHtml

  const images = await getProjectImages(slug)
  project.images = images

  return project
}

export async function getAllProjects(
  fields: string[] = []
): Promise<Partial<ProjectType>[]> {
  const slugs = getProjectSlugs()
  const projects = await Promise.all(
    slugs.map(async (slug: string) => await getProjectBySlug(slug, fields))
  )
  return projects
}
