import { Suspense } from 'react'
import { getRepos, preloadLocation } from '@/actions'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Repositories from '@/components/Repositories'
import projects from '@generated/projects.json'

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
