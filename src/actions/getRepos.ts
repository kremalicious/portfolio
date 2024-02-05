'use server'

import { cache } from 'react'
import { getGithubRepos } from '@/lib/github'

export const getRepos = cache(async () => {
  try {
    const repos = await getGithubRepos()
    return repos
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
})
