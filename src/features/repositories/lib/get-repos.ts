import reposFilter from '@content/repos.json'
import type { Repo } from '../types/repo'
import { readReposCache, saveReposCache } from './repos-cache'

//
// Get GitHub repos, with local cache during development
//
const gitHubConfig = {
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

export const getRepos = async () => {
  if (!process.env.GITHUB_TOKEN) {
    console.error('Missing GitHub environment variable')
    return []
  }

  try {
    if (isDevelopment) {
      const cachedRepos = await readReposCache()
      if (cachedRepos) return cachedRepos
    }

    let repos: Repo[] = []

    for (const item of reposFilter) {
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

    if (isDevelopment) await saveReposCache({ repos })

    return repos
  } catch (error: unknown) {
    console.error((error as Error).message)
  }
}
