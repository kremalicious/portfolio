import Header from '../components/Header'
import Projects from '../components/Projects'
import Repositories from '../components/Repositories'
import { getAllProjects } from '../lib/content'
import { getGithubRepos } from '../lib/github'
import { getLocation } from './actions'

export default async function IndexPage() {
  const projects = await getAllProjects(['title', 'images', 'slug'])
  const repos = await getGithubRepos()
  const location = await getLocation()

  return (
    <>
      <Header location={location} />
      <Projects projects={projects} />
      <Repositories repos={repos} />
    </>
  )
}
