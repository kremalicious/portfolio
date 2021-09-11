/* eslint-disable no-console */

const remark = require('remark')
const parse = require('remark-parse')
const html = require('remark-html')
const fs = require('fs')
const yaml = require('js-yaml')
const reposYaml = yaml.load(fs.readFileSync('./content/repos.yml', 'utf8'))
const { performance } = require('perf_hooks')
const chalk = require('chalk')
const { execSync } = require('child_process')
const { getGithubRepos } = require('./scripts/github')

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
// Fetch matomo.js
//
execSync(`node ./scripts/fetch-matomo-js > static/matomo.js`, {
  stdio: 'inherit'
})

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
// Add pageContext
//
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Regex for auto-attaching project images to pages based on slug.
  // Image file names follow the pattern slug-01.png.
  // Regex inspiration from https://stackoverflow.com/a/7124976
  const imageRegex = `/${page.path.replace(/\//g, '')}+?(?=-\\d)/`

  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      imageRegex,
      // Add repos only to front page's context
      ...(page.path === '/' && { repos })
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
