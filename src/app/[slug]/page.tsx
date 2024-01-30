import { Metadata, ResolvingMetadata } from 'next'
import resume from '../../../_content/resume.json'
import Project from '../../components/Project'
import ProjectNav from '../../components/ProjectNav'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs
} from '../../lib/content'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)

  return {
    title: `${
      project.title
    } // ${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    description: project.description
    // image: project.images[0].src
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug)
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
