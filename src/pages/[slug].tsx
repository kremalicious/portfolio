import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticPaths, GetStaticProps } from 'next/types'
import {
  getProjectBySlug,
  getAllProjects,
  getProjectSlugs
} from '../lib/content'
import type ProjectType from '../interfaces/project'
import Project from '../components/Project'
import resume from '../../_content/resume.json'
import Meta from '../components/Meta'
import ProjectNav from '../components/ProjectNav'

type Props = {
  project: ProjectType
  projects: { slug: string }[]
}

export default function ProjectPage({ project, projects }: Props) {
  const router = useRouter()
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const pageMeta = {
    title: `${
      project.title
    } // ${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    description: project.description,
    image: project.images[0].src,
    slug: project.slug
  }

  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <Meta {...pageMeta} />
          <Project project={project} />
          <ProjectNav projects={projects} currentSlug={project.slug} />
        </>
      )}
    </>
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

  return {
    props: { project, projects }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = getProjectSlugs()

  return {
    paths: slugs.map((slug) => ({
      params: { slug }
    })),
    fallback: false
  }
}
