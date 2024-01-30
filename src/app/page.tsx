import { Metadata } from 'next'
import meta from '../../_content/meta.json'
import resume from '../../_content/resume.json'
import Projects from '../components/Projects'
import Repositories from '../components/Repositories'
import { getAllProjects } from '../lib/content'
import { getGithubRepos } from '../lib/github'

export const metadata: Metadata = {
  title: `${resume.basics.name.toLowerCase()} { ${resume.basics.label.toLowerCase()} }`,
  description: meta.description
  // image: meta.img
}

export default async function IndexPage() {
  const projects = await getAllProjects(['title', 'images', 'slug'])
  const repos = await getGithubRepos()

  return (
    <>
      <Projects projects={projects} />
      <Repositories repos={repos} />
    </>
  )
}
