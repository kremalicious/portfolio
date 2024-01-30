import resume from '../../../_content/resume.json'
import Project from '../../components/Project'
import ProjectNav from '../../components/ProjectNav'
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs
} from '../../lib/content'

export default async function ProjectPage(props: { params: { slug: string } }) {
  const project = await getProjectBySlug(props.params.slug)
  const projects = await getAllProjects(['slug', 'title', 'images'])

  // const pageMeta = {
  //   title: `${
  //     project.title
  //   } // ${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
  //   description: project.description,
  //   image: project.images[0].src,
  //   slug: params.slug
  // }

  return (
    <>
      <Project project={project} />
      <ProjectNav projects={projects} currentSlug={props.params.slug} />
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()

  return slugs.map((slug) => ({ slug }))
}
