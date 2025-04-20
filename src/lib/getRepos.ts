'use server'

import type { Repo } from '@/types'
import filter from '@content/repos.json'
import { cache } from 'react'

//
// Get GitHub repos
//
if (!process.env.GITHUB_TOKEN) {
  throw new Error('Missing GitHub environment variable')
}

const gitHubConfig = {
  headers: {
    'User-Agent': 'kremalicious/portfolio',
    // biome-ignore lint/style/useNamingConvention: Fetch API
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
}

export const getRepos = cache(async () => {
  try {
    let repos: Repo[] = []

    for (const item of filter) {
      const user = item.split('/')[0]
      const repoName = item.split('/')[1]
      const response = await fetch(
        `https://api.github.com/repos/${user}/${repoName}`,
        gitHubConfig
      )
      const json: Repo = await response.json()
      if (!json?.name) return

      const {
        name,
        full_name,
        description,
        html_url,
        homepage,
        stargazers_count,
        pushed_at
      } = json

      const repo: Repo = {
        name,
        full_name,
        description,
        html_url,
        homepage,
        stargazers_count,
        pushed_at
      }
      repos.push(repo)
    }

    // sort by pushed to, newest first
    repos = repos.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))

    return repos
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
})
