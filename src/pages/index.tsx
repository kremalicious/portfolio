import { getAllProjects } from '../lib/api'
import Project from '../interfaces/project'
import meta from '../../_content/meta.json'
import resume from '../../_content/resume.json'
import Meta from '../components/Meta'
import Projects from '../components/Projects'

type Props = {
  allProjects: Project[]
}

export default function IndexPage({ allProjects }: Props) {
  const pageMeta = {
    title: `${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    description: meta.description,
    image: meta.img
  }

  return (
    <>
      <Meta {...pageMeta} />
      <Projects projects={allProjects} />
    </>
  )
}

export const getStaticProps = async () => {
  const allProjects = await getAllProjects(['title', 'images', 'slug'])

  return {
    props: { allProjects }
  }
}
