import Header from '@/components/Header/Header'
import Project from '@/components/Project'
import ProjectNav from '@/components/ProjectNav'
import { generateOgImageUrl } from '@/lib/generateOgImageUrl'
import { getAllSlugs } from '@/lib/getAllSlugs'
import { getProjectBySlug } from '@/lib/getProjectBySlug'
import meta from '@content/meta.json'
import projects from '@generated/projects.json'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: `${project.description.slice(0, 157)}...`,
    metadataBase: new URL(meta.url),
    alternates: {
      canonical: `/${project.slug}`
    },
    openGraph: {
      url: `/${project.slug}`,
      images: [
        {
          url: generateOgImageUrl(project.images[0]),
          width: 1200,
          height: 630,
          alt: `${project.title} - ${meta.author.name}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      images: [generateOgImageUrl(project.images[0])]
    }
  }
}

export default async function ProjectPage(props: Props) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <>
      <Header />
      <Project project={project} />
      <ProjectNav projects={projects} currentSlug={slug} />
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}
