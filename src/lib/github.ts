import data from '../../_content/repos.json'
import Repo from '../interfaces/repo'

//
// Get GitHub repos
//
if (!process.env.GITHUB_TOKEN) {
  throw new Error('Missing GitHub environment variable')
}

const gitHubConfig = {
  headers: {
    'User-Agent': 'kremalicious/portfolio',
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
}

export async function getGithubRepos() {
  let repos: Repo[] = []

  for (let item of data) {
    const user = item.split('/')[0]
    const repoName = item.split('/')[1]
    const data = await fetch(
      `https://api.github.com/repos/${user}/${repoName}`,
      gitHubConfig
    )
    const json: Repo = await data.json()
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
}
