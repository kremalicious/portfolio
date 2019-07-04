/* eslint-disable no-console */

const path = require('path')
const remark = require('remark')
const markdown = require('remark-parse')
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
async function getGithubRepos(data) {
  const allRepos = await axios.get(
    `https://api.github.com/users/${data.user}/repos?per_page=100`,
    { headers: { 'User-Agent': 'kremalicious/portfolio' } }
  )
  const repos = allRepos.data
    // filter by what's defined in content/repos.yml
    .filter(({ name }) => data.repos.includes(name))
    // sort by pushed to, newest first
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))

  // reduce data output by reconstructing repo objects
  const reposReduced = []
  let holder = {}

  for (let repo of repos) {
    holder.name = repo.name
    holder.description = repo.description
    holder.html_url = repo.html_url
    holder.homepage = repo.homepage
    holder.stargazers_count = repo.stargazers_count
    reposReduced.push(holder)
    holder = {}
  }

  return reposReduced
}

//
// Get GitHub repos once and store for later build stages
//
let repos

exports.onPreBootstrap = async () => {
  const t0 = performance.now()

  try {
    repos = await getGithubRepos(reposYaml[0])
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
      .use(markdown, { gfm: true, commonmark: true, pedantic: true })
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

//
// Create project pages from projects.yml
//
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const template = path.resolve('src/templates/Project.jsx')

  const result = await graphql(`
    {
      allProjectsYaml {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  result.data.allProjectsYaml.edges.forEach(({ node }) => {
    const { slug } = node

    createPage({
      path: slug,
      component: template,
      context: { slug }
    })
  })
}
