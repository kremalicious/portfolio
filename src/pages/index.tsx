import { getAllProjects } from '../lib/content'
import Project from '../interfaces/project'
import meta from '../../_content/meta.json'
import resume from '../../_content/resume.json'
import Meta from '../components/Meta'
import Projects from '../components/Projects'
import { GetStaticProps } from 'next/types'
import { getGithubRepos } from '../lib/github'
import Repo from '../interfaces/repo'
import Repositories from '../components/Repositories'

type Props = {
  projects: Project[]
  repos: Repo[]
}

export default function IndexPage({ projects, repos }: Props) {
  const pageMeta = {
    title: `${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
    description: meta.description,
    image: meta.img
  }

  return (
    <>
      <Meta {...pageMeta} />
      <Projects projects={projects} />
      <Repositories repos={repos} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getAllProjects(['title', 'images', 'slug'])
  const repos = await getGithubRepos()

  return {
    props: { projects, repos }
  }
}
