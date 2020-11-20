/* eslint-disable no-console */

// const path = require('path')
const remark = require('remark')
const parse = require('remark-parse')
const html = require('remark-html')
const axios = require('axios')
const fs = require('fs')
const yaml = require('js-yaml')
const reposYaml = yaml.load(fs.readFileSync('./content/repos.yml', 'utf8'))
const { performance } = require('perf_hooks')
const chalk = require('chalk')

function truncate(n, useWordBoundary) {
  if (this.length <= n) {
    return this
  }
  const subString = this.substr(0, n - 1)
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + '...'
  )
}

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

//
// Get GitHub repos once and store for later build stages
//
let repos

exports.onPreBootstrap = async () => {
  const t0 = performance.now()

  try {
    repos = await getGithubRepos(reposYaml)
    const t1 = performance.now()
    const ms = t1 - t0
    const s = ((ms / 1000) % 60).toFixed(3)
    console.log(
      chalk.green('success ') + `getGithubRepos: ${repos.length} repos - ${s} s`
    )
  } catch (error) {
    throw Error(error.message)
  }
}

//
// Add repos to front page's context
//
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === '/')
    createPage({
      ...page,
      context: {
        ...page.context,
        repos
      }
    })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // Projects YAML nodes
  if (node.internal.type === 'ProjectsYaml') {
    // Add transformed Markdown descriptions
    const description = node.description
    const descriptionWithLineBreaks = description.split('\n').join('\n\n')

    let descriptionHtml

    remark()
      .use(parse, { gfm: true, commonmark: true, pedantic: true })
      .use(html)
      .process(descriptionWithLineBreaks, (err, file) => {
        if (err) throw Error('Could not transform project description')

        descriptionHtml = file.contents
        return descriptionHtml
      })

    createNodeField({
      node,
      name: 'descriptionHtml',
      value: descriptionHtml
    })

    // Create excerpt from description
    const excerpt = truncate.apply(description, [320, true])

    createNodeField({
      node,
      name: 'excerpt',
      value: excerpt
    })
  }
}
