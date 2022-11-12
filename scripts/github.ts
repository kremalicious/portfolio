//
// Get GitHub repos
//
const gitHubConfig = {
  headers: {
    'User-Agent': 'kremalicious/portfolio',
    Authorization: `token ${process.env.GATSBY_GITHUB_TOKEN}`
  }
}

type Holder = {
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: string
  pushed_at: string
}

async function getGithubRepos(data) {
  let repos = []
  let holder: Partial<Holder> = {}

  for (let item of data) {
    const user = item.split('/')[0]
    const repoName = item.split('/')[1]
    const data = await fetch(
      `https://api.github.com/repos/${user}/${repoName}`,
      gitHubConfig
    )
    const repo = await data.json()

    holder.name = repo.data.name
    holder.full_name = repo.data.full_name
    holder.description = repo.data.description
    holder.html_url = repo.data.html_url
    holder.homepage = repo.data.homepage
    holder.stargazers_count = repo.data.stargazers_count
    holder.pushed_at = repo.data.pushed_at
    repos.push(holder)
    holder = {}
  }

  // sort by pushed to, newest first
  repos = repos.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))

  return repos
}

export default getGithubRepos
