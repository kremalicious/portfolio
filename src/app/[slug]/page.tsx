import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header/Header'
import Project from '@/components/Project'
import ProjectNav from '@/components/ProjectNav'
import meta from '@content/meta.json'
import projects from '@generated/projects.json'
import { getAllSlugs } from './getAllSlugs'
import { getProjectBySlug } from './getProjectBySlug'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  return {
    title: project.title,
    description: `${project.description.slice(0, 157)}...`,
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
  const project = getProjectBySlug(params.slug)

  if (!project) notFound()

  return (
    <>
      <Header />
      <Project project={project} />
      <ProjectNav projects={projects} currentSlug={params.slug} />
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}
