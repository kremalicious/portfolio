import { Suspense } from 'react'
import projects from '../../generated/projects.json'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Repositories from '../components/Repositories'
import { getRepos, preloadLocation } from './actions'

export default async function IndexPage() {
  const repos = await getRepos()

  preloadLocation()

  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <Suspense fallback={<p>Loading open source projects...</p>}>
        <Repositories repos={repos} />
      </Suspense>
    </>
  )
}
