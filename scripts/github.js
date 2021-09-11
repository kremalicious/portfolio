const axios = require('axios')

//
// Get GitHub repos
//
const gitHubConfig = {
  headers: {
    'User-Agent': 'kremalicious/portfolio',
    Authorization: `token ${process.env.GATSBY_GITHUB_TOKEN}`
  }
}

async function getGithubRepos(data) {
  let repos = []
  let holder = {}

  for (let item of data) {
    const user = item.split('/')[0]
    const repoName = item.split('/')[1]
    const repo = await axios.get(
      `https://api.github.com/repos/${user}/${repoName}`,
      gitHubConfig
    )

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

module.exports = { getGithubRepos }
