import Projects from '../components/Projects'
import Repositories from '../components/Repositories'
import { getAllProjects } from '../lib/content'
import { getGithubRepos } from '../lib/github'

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
