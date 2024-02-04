import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Repositories from '../components/Repositories'
import { getAllProjects } from '../lib/content'
import { getGithubRepos } from '../lib/github'
import { preloadLocation } from './actions'

export default async function IndexPage() {
  const projects = await getAllProjects(['title', 'images', 'slug'])
  const repos = await getGithubRepos()

  preloadLocation()

  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <Repositories repos={repos} />
    </>
  )
}
