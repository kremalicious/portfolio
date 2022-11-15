import { GetStaticPaths, GetStaticProps } from 'next/types'
import {
  getProjectBySlug,
  getAllProjects,
  getProjectSlugs
} from '../lib/content'
import type ProjectType from '../interfaces/project'
import Project from '../components/Project'
import resume from '../../_content/resume.json'
import ProjectNav from '../components/ProjectNav'
import Page from '../layouts/Page'

type Props = {
  project: ProjectType
  projects: { slug: string }[]
}

export default function ProjectPage({ project, projects }: Props) {
  const pageMeta = {
    title: `${
      project.title
    } // ${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    description: project.description,
    image: project.images[0].src,
    slug: project.slug
  }

  return (
    <Page {...pageMeta}>
      <Project project={project} />
      <ProjectNav projects={projects} currentSlug={project.slug} />
    </Page>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const project = await getProjectBySlug(params.slug, [
    'title',
    'description',
    'slug',
    'images',
    'techstack',
    'links'
  ])
  const projects = await getAllProjects(['slug', 'images'])
  return { props: { project, projects } }
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getProjectSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false
  }
}
