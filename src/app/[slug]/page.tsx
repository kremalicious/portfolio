import { Metadata, ResolvingMetadata } from 'next'
import meta from '../../../_content/meta.json'
import Project from '../../components/Project'
import ProjectNav from '../../components/ProjectNav'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs
} from '../../lib/content'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
  // searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return

  return {
    title: project.title,
    description: `${project.description.slice(0, 200)}...`,
    metadataBase: new URL(meta.url),
    alternates: {
      canonical: '/' + project.slug
    },
    openGraph: {
      url: '/' + project.slug,
      images: [{ url: project.images[0].src }]
    }
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)

  if (!project) notFound()

  const projects = await getAllProjects(['slug', 'title', 'images'])

  return (
    <>
      <Project project={project} />
      <ProjectNav projects={projects} currentSlug={params.slug} />
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()

  return slugs.map((slug) => ({ slug }))
}
