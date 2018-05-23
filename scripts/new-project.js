const fs = require('fs')
const path = require('path')
const prepend = require('prepend')
const slugify = require('slugify')
const ora = require('ora')

const templatePath = path.join(__dirname, 'new-project.yml')
const template = fs.readFileSync(templatePath).toString()

const spinner = ora('Adding new project').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new -- Title of project`')
  return
}

const title = process.argv[2]
spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const projects = path.join(__dirname, '..', 'data', 'projects.yml')
const newContents = template
  .split('TITLE')
  .join(title)
  .split('SLUG')
  .join(titleSlug)

prepend(projects, newContents, error => {
  if (error) {
    spinner.fail(error)
  }
  spinner.succeed(`Added '${title}' to top of projects.yml file.`)
})
