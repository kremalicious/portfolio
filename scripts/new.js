import fs from 'fs'
import path from 'path'
import prepend from 'prepend'
import slugify from 'slugify'
import ora from 'ora'

const templatePath = path.join(__dirname, 'new.yml')
const template = fs.readFileSync(templatePath).toString()

const spinner = ora('Adding new project').start()

if (!process.argv[2]) {
  spinner.fail('Use the format `npm run new -- Title of project`')
}

const title = process.argv[2]
spinner.text = `Adding '${title}'.`

const titleSlug = slugify(title, { lower: true })
const projects = path.join(__dirname, '..', 'content', 'projects.yml')
const newContents = template
  .split('TITLE')
  .join(title)
  .split('SLUG')
  .join(titleSlug)

prepend(projects, newContents, error => {
  if (error) spinner.fail(error)
  spinner.succeed(`Added '${title}' to top of projects.yml file.`)
})
