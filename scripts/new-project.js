const fs = require('fs')
const path = require('path')
const prepend = require('prepend')
const slugify = require('slugify')
const ora = require('ora')

const templatePath = path.join(__dirname, 'new-project.yml')
const template = fs.readFileSync(templatePath).toString()

const title = process.argv[2]
const titleSlug = slugify(title)
const spinner = ora(`Adding '${title}'.`).start()

const newContents = template.replace('TITLE', title).replace('SLUG', titleSlug)
const projects = path.join(__dirname, '..', 'data', 'projects.yml')

prepend(projects, newContents, error => {
  if (error) throw error
  spinner.succeed(`Added '${title}' to top of projects.yml file.`)
})
